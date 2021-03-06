# Nestjs Elasticsearch Logger

## Installation

```bash
npm install @nestjs.pro/logger-elasticsearch
```

or

```bash
yarn add @nestjs.pro/logger-elasticsearch
```

## Setup

### Elasticsearch

First we need an elasticsearch instance (and optionally kibana for viewing logs).This repo comes with a `docker-compose.yaml` file to make things
easy for development. Simply `docker-compose up -d`.

### Bootstrapping

Import the `ElasticsearchLoggerModule` in your `AppModule` passing it a few configuration options:

```typescript
@Module({

    imports: [

        ElasticsearchLoggerModule.forRoot({

            name: 'my-awesome-app',
            index: 'logs',
            stdout: true,
            elasticsearchClientOptions: { nodes: 'http://localhost:9200' }

        })

    ]

})
export class AppModule {

}
```

For more configuration options see https://github.com/nestjspro/module-logger-elasticsearch/blob/master/src/ElasticsearchLoggerOptions.ts.

## Usage

## Method Logging

Before we can log messages you simply need to inject the `ElasticsearchLoggerService` wherever you need to log messages at.

Example:

```typescript
@Injectable()
export class MyServiceOrController {

    public constructor(private readonly elasticsearchLoggerService: ElasticsearchLoggerService) {

    }

    public someMethod(): void {

        // do work
        this.elasticsearchLoggerService.info('someMethod() called!');

    }

}
```

## Controller Request Logging

You can optionally configure an interceptor and use the `ElasticsearchRequestInterceptor` to automagically log all of 
your http requests. You can declare this at the global/app level or use at the controller level:

```typescript

import { Controller, UseInterceptors } from '@nestjs/common';
import { ElasticsearchRequestInterceptor } from '@nestjs.pro/logger-elasticsearch/dist/ElasticsearchRequestInterceptor';

@UseInterceptors(ElasticsearchRequestInterceptor)
@Controller('/mycontroller')
export class MyController {

    // ...

}
```
