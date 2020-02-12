import { ClientOptions } from '@elastic/elasticsearch';

export class ElasticsearchLoggerOptions {

    public name: string;
    public index: string;
    public stdout: boolean;
    public elasticsearchClientOptions: ClientOptions;

}
