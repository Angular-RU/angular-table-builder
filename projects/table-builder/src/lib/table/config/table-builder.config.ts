import { TableBuilderOptions } from '../interfaces/table-builder.external';

export class TableBuilderConfig implements TableBuilderOptions {
    public readonly bufferAmount: number = 10;
    public readonly rowHeight: number = 45;
    public readonly columnWidth: number = 200;

    /**
     * There is a bug in firefox when scrolling. To prevent faster scrolling, we set a limit
     */
    public readonly wheelMaxDelta: number = 200;

    /**
     * Only necessary for testing
     */
    public readonly enableInteractionObserver: boolean = true;
}
