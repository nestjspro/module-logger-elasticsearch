import { ClientOptions } from '@elastic/elasticsearch';
import { ROLLING_INDEX_MODE } from './ElasticsearchLoggerUtilities';

export class ElasticsearchLoggerOptions {

    public name: string;
    public indexPrefix: string;
    public rollingOffsetMode: ROLLING_INDEX_MODE;
    public stdout: boolean;
    public elasticsearchClientOptions: ClientOptions;

}
