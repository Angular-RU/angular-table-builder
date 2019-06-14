import { Pipe, PipeTransform } from '@angular/core';
import { Any, KeyMap } from '../interfaces/table-builder.internal';

@Pipe({ name: 'deepPath' })
export class DeepPathPipe implements PipeTransform {
    public refCount: number = 0;
    private value: Any = null;
    private lastReference: KeyMap = null;
    private lastPath: string = null;

    public transform(object: KeyMap, path: string): Any {
        const isInvalidCache: boolean = !this.value || this.lastReference !== object || this.lastPath !== path;

        if (isInvalidCache) {
            this.refCount++;
            this.lastReference = object;
            this.lastPath = path;

            this.value = path
                ? path.split('.').reduce((value: string, key: string) => value && value[key], object)
                : object;
        }

        return this.value;
    }
}
