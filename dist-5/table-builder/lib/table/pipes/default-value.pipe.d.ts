import { PipeTransform } from '@angular/core';
import { Any, KeyMap } from '../interfaces/table-builder.internal';
export declare class DefaultValuePipe implements PipeTransform {
    transform(item: KeyMap, key: string): Any;
}
