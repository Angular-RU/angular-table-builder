import { Injectable } from '@angular/core';

@Injectable()
export class TableBuilderOptionsImpl {
    public static readonly MACRO_TIME: number = 1000;
    public static readonly TIME_RELOAD: number = 400;
    public static readonly COLUMN_RESIZE_MIN_WIDTH: number = 50;
    public static readonly FRAME_TIME: number = 66;
    public static readonly ROW_HEIGHT: number = 45;
    public static readonly TIME_IDLE: number = 200;
}
