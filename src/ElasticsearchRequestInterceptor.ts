import { ElasticsearchLoggerService }                                 from '@nestjs.pro/logger-elasticsearch/dist/ElasticsearchLoggerService';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of }                                             from 'rxjs';

/**
 * Interceptor to log HTTP requests.
 */
@Injectable()
export class ElasticsearchRequestInterceptor implements NestInterceptor {

    /**
     * Constructor.
     *
     * @param {ElasticsearchLoggerService} elasticsearchLoggerService
     */
    public constructor(private readonly elasticsearchLoggerService: ElasticsearchLoggerService) {

    }

    /**
     * Handle the http request and log to elasticsearch.
     *
     * @param {ExecutionContext} context
     * @param {CallHandler<any>} next
     *
     * @return {Observable<any> | Promise<Observable<any>>}
     */
    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const req = context.switchToHttp().getRequest();

        this.elasticsearchLoggerService.info(JSON.stringify({

            url: req[ 'url' ],
            query: req[ 'query' ],
            body: req[ 'body' ],
            headers: req[ 'headers' ]

        }));

        return of(null);

    }

}
