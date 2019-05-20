import { InjectionToken } from '@angular/core';

export interface TableRow<T = any> {
    [key: string]: T;
}

export interface TableBuilderOptions {
    wheelScrollLimit: number;
    wheelScrollDelta: number;
    throttlingTime: number;
}

export enum PrimaryKey {
    ID = 'id'
}

export const WHEEL_SCROLL_LIMIT: InjectionToken<string> = new InjectionToken('WHEEL_SCROLL_LIMIT');
export const WHEEL_DELTA_LIMIT: InjectionToken<string> = new InjectionToken('WHEEL_DELTA_LIMIT');
export const THROTTLING_TIME: InjectionToken<string> = new InjectionToken('THROTTLING_TIME');
