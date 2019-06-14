import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Any } from '../interfaces/table-builder.internal';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
import { UtilsService } from '../services/utils/utils.service';

@Pipe({ name: 'defaultValue' })
export class DefaultValuePipe implements PipeTransform {
    constructor(@Inject(NGX_TABLE_OPTIONS) private options: TableBuilderOptionsImpl, private utils: UtilsService) {}
    public transform(value: Any): Any | string {
        const separator: string = this.options.defaultValueSeparator;
        let result: Any = value;

        if (separator) {
            result = this.utils.checkValueIsEmpty(value) ? separator : value;
        }

        return result;
    }
}
