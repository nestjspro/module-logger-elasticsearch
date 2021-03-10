export enum ROLLING_INDEX_MODE {

    YEARLY=4,
    MONTHLY=7,
    DAILY=10

}

export class ElasticsearchLoggerUtilities {

    public static getRollingIndex(prefix: string, mode: ROLLING_INDEX_MODE): string {

        return `${ prefix }-${ new Date().toISOString().slice(0, mode) }`;

    }

}
