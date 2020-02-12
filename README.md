# Nestjs Elasticsearch Logger

## Setup
First we need an elasticsearch instance (and optionally kibana for viewing logs).
This repo comes with a `docker-compose.yaml` file to make things
easy for development. Simply `docker-compose up -d`.

## Controller Request Logging

Use at the controller level:

```typescript

import { Controller, UseInterceptors } from '@nestjs/common'; 
import { ElasticsearchRequestInterceptor } from '@nestjs.pro/logger-elasticsearch/dist/ElasticsearchRequestInterceptor';

@UseInterceptors(ElasticsearchRequestInterceptor)
@Controller('/mycontroller')
export class MyController {
    
    // ...
    
}
```
