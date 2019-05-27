import { TableBuilderOptions } from './table-builder.interfaces';

export class TableBuilderConfig implements TableBuilderOptions {
    public readonly bufferAmount: number = 10;
    public readonly outsideZone: boolean = true;
    public readonly rowHeight: number = 45;
    public readonly columnWidth: number = 200;
    public readonly wheelMaxDelta: number = 100;
}
