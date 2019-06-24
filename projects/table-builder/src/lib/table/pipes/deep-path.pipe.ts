import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Any, KeyMap } from '../interfaces/table-builder.internal';
import { DefaultValuePipe } from './default-value.pipe';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
import { UtilsService } from '../services/utils/utils.service';

@Pipe({ name: 'deepPath' })
export class DeepPathPipe implements PipeTransform {
    public refCount: number = 0;
    private value: Any = null;
    private lastReference: KeyMap = null;
    private lastPath: string = null;

    constructor(
        @Inject(NGX_TABLE_OPTIONS) private readonly options: TableBuilderOptionsImpl,
        private readonly utils: UtilsService
    ) {}

    public transform(object: KeyMap, path: string): Any {
        const isInvalidCache: boolean = !this.value || this.lastReference !== object || this.lastPath !== path;

        if (isInvalidCache) {
            this.refCount++;
            this.lastReference = object;
            this.lastPath = path;

            const result: Any = this.utils.getValueByPath(object, path);
            this.value = new DefaultValuePipe(this.options, this.utils).transform(result);
        }

        return this.value;
    }
}
