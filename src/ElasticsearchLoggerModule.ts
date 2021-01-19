import { DynamicModule, Global, Module } from '@nestjs/common';
import { ElasticsearchLoggerOptions } from './ElasticsearchLoggerOptions';
import { ElasticsearchLoggerService } from './ElasticsearchLoggerService';
@Global()
@Module({

    providers: [

        ElasticsearchLoggerService

    ],

    exports: [

        ElasticsearchLoggerService

    ]
})
export class ElasticsearchLoggerModule {

    public static forRoot(options: ElasticsearchLoggerOptions): DynamicModule {

        return {

            module: ElasticsearchLoggerModule,
            providers: [

                {

                    provide: 'CONFIG_OPTIONS',
                    useValue: options

                },

                ElasticsearchLoggerService

            ],
            exports: [ ElasticsearchLoggerService ]

        };

    }

}
