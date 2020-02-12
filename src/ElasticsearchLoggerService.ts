import { Client }                     from '@elastic/elasticsearch';
import { Inject }                     from '@nestjs/common';
import { ElasticsearchLoggerOptions } from './ElasticsearchLoggerOptions';

export class ElasticsearchLoggerService {

    private readonly client: Client;
    private readonly prefix: string;

    public constructor(@Inject('CONFIG_OPTIONS') private readonly options: ElasticsearchLoggerOptions) {

        console.log(options);

        this.client = new Client(options.elasticsearchClientOptions);

    }

    /**
     * Primary log message handler.
     *
     * @param {string} level
     * @param message
     */
    private log(level: string, message: string): void {

        this.client.index({

            index: this.options.index,
            body: {

                date: new Date(),
                level,
                log: message

            }

        });

        if (this.options.stdout) {

            console.log(`[${ this.options.name }] ${ JSON.stringify(message) }`);

        }

    }

    public info(message: string): void {

        this.log('info', message);

    }

    public error(message: string): void {

        this.log('info', message);

    }

    public debug(message: string): void {

        this.log('info', message);

    }

    public warning(message: string): void {

        this.log('info', message);

    }

    public trace(message: string): void {

        this.log('info', message);

    }

}
