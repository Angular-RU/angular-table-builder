import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Any, KeyMap } from '../interfaces/table-builder.internal';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
import { UtilsService } from '../services/utils/utils.service';

@Pipe({ name: 'deepPath', pure: true })
export class DeepPathPipe implements PipeTransform {
    constructor(
        @Inject(NGX_TABLE_OPTIONS) public readonly options: TableBuilderOptionsImpl,
        public readonly utils: UtilsService
    ) {}

    public transform(item: KeyMap, path: string): Any {
        const result: Any = this.utils.getValueByPath(item, path);
        const separator: string = this.options.defaultValueSeparator;
        return this.utils.checkValueIsEmpty(result) ? separator || result : result;
    }
}
