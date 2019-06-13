import { TableBuilderOptions } from '../interfaces/table-builder.external';

export class TableBuilderConfig implements TableBuilderOptions {
    public readonly bufferAmount: number = 10;
    public readonly wheelMaxDelta: number = 200;
}
