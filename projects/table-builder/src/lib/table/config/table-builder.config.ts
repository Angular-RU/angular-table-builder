import { TableBuilderOptions } from '../interfaces/table-builder.external';

export class TableBuilderConfig implements TableBuilderOptions {
    public static readonly ROW_HEIGHT: number = 45;
    public readonly BUFFER_AMOUNT: number = 10;
    public readonly WHEEL_MAX_DELTA: number = 200;
}
