import { Injectable } from '@angular/core';
import { TableBuilderOptions } from '../interfaces/table-builder.external';

@Injectable()
export class TableBuilderOptionsImpl implements TableBuilderOptions {
    public static readonly ROW_HEIGHT: number = 45;
    public bufferAmount: number = 10;
    public wheelMaxDelta: number = 200;
}
