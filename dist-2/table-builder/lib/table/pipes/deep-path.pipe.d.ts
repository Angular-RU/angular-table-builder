import { PipeTransform } from '@angular/core';
import { Any, KeyMap } from '../interfaces/table-builder.internal';
export declare class DeepPathPipe implements PipeTransform {
    transform(item: KeyMap, path: string): Any;
}
