import { Pipe, PipeTransform } from '@angular/core';
import { PlainObject } from '../interfaces/table-builder.internal';

@Pipe({ name: 'deepPath' })
export class DeepPathPipe implements PipeTransform {
    public transform(object: PlainObject, path: string): any {
        return path ? path.split('.').reduce((value: string, key: string) => value && value[key], object) : object;
    }
}
