import { Injectable } from '@angular/core';
import { TableBuilderOptions } from '../interfaces/table-builder.external';

@Injectable()
export class TableBuilderOptionsImpl implements TableBuilderOptions {
    public static readonly COUNT_SYNC_RENDERED_COLUMNS: number = 10;
    public static readonly ROW_HEIGHT: number = 45;
    public static readonly TIME_IDLE: number = 100;
    public defaultValueSeparator: string = '-';
    public bufferAmount: number = 5;
    public wheelMaxDelta: number = 200;
}
