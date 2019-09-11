import { TableBuilderOptions } from '../interfaces/table-builder.external';
export declare class TableBuilderOptionsImpl implements TableBuilderOptions {
    static readonly MACRO_TIME: number;
    static readonly TIME_RELOAD: number;
    static readonly COLUMN_RESIZE_MIN_WIDTH: number;
    static readonly FRAME_TIME: number;
    static readonly ROW_HEIGHT: number;
    static readonly TIME_IDLE: number;
    wheelMaxDelta: number;
    bufferAmount: number;
}
