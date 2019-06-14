import { Injectable } from '@angular/core';
import { TableBuilderOptions } from '../interfaces/table-builder.external';

@Injectable()
export class TableBuilderOptionsImpl implements TableBuilderOptions {
    public static readonly ROW_HEIGHT: number = 45;
    public defaultValueSeparator: string = '-';
    public bufferAmount: number = 5;
    public wheelMaxDelta: number = 200;
}
