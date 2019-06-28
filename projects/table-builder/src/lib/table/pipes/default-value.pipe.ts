import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Any } from '../interfaces/table-builder.internal';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
import { UtilsService } from '../services/utils/utils.service';

@Pipe({ name: 'defaultValue' })
export class DefaultValuePipe implements PipeTransform {
    private cache: Any = null;
    constructor(
        @Inject(NGX_TABLE_OPTIONS) private readonly options: TableBuilderOptionsImpl,
        private readonly utils: UtilsService
    ) {}

    public transform(value: Any): Any | string {
        if (this.cache === null) {
            let result: Any = value;

            const separator: string = this.options.defaultValueSeparator;
            if (separator) {
                result = this.utils.checkValueIsEmpty(value) ? separator : value;
            }

            this.cache = result;
        }

        return this.cache;
    }
}
