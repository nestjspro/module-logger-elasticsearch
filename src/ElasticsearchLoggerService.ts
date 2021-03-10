import { Client }                     from '@elastic/elasticsearch';
import { Inject }                     from '@nestjs/common';
import { ElasticsearchLoggerOptions } from './ElasticsearchLoggerOptions';
import * as os from 'os';
import { Search } from '@elastic/elasticsearch/api/requestParams';

export class ElasticsearchLoggerService {

    private readonly client: Client;

    public constructor(@Inject('CONFIG_OPTIONS') private readonly options: ElasticsearchLoggerOptions) {

        this.client = new Client(options.elasticsearchClientOptions);

    }

    public async createIndexIfNotExists(index: string, body?: any) {

        console.log(index);
        const result = await this.client.indices.exists({ index });
        console.log(result);

        if(result.statusCode !== 200) {

            console.log(await this.client.indices.create({

                index,

                body

            }))

        }

    }

    /**
     * Primary log message handler.
     *
     * @param {string} level
     * @param message
     * @param indice
     */
    public async log<T>(level: string, message: T, indice?: string): Promise<void> {

        await this.createIndexIfNotExists(indice);

       const result = await this.client.index({

            index: indice? indice:this.options.index,
            body: {

                date: new Date(),
                hostname: os.hostname(),
                level,
                body: message

            }

        });

        console.log(result);

        if (this.options.stdout) {

            console.log(`[${ this.options.name }] ${ JSON.stringify(message) }`);

        }

    }

    public raw(message: any, indice?: string): void {

        this.client.index({

            index: indice? indice:this.options.index,
            body: message

        });

        if (this.options.stdout) {

            console.log(`[${ this.options.name }] ${ JSON.stringify(message) }`);

        }

    }

    public async info<T>(message: any, indice?: string): void {

        this.log('info', message, indice);

    }

    public async error<T>(message: any, indice?: string): void {

        this.log('error', message, indice);

    }

    public async debug<T>(message: any, indice?: string): void {

        this.log('debug', message, indice);

    }

    public async warning<T>(message: any, indice?: string): void {

        this.log('warning', message, indice);

    }

    public async trace<T>(message: any, indice?: string): void {

        this.log('trace', message, indice);

    }

    public async search(obj: Search) {

       return this.client.search(obj);

    }

}
