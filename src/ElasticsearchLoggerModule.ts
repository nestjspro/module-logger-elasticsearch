import { DynamicModule, Module }      from '@nestjs/common';
import { ElasticsearchLoggerOptions } from './ElasticsearchLoggerOptions';
import { ElasticsearchLoggerService } from './ElasticsearchLoggerService';

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

        console.log(options);

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
