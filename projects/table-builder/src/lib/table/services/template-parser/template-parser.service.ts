import { Injectable } from '@angular/core';

import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { TableSchema } from '../../interfaces/table-builder.external';
import { KeyMap, ColumnList } from '../../interfaces/table-builder.internal';
import { SchemaBuilder } from './schema-builder.class';

@Injectable()
export class TemplateParserService {
    public schema: TableSchema = new SchemaBuilder();

    public get keysFromTemplate(): string[] {
        return Object.keys(this.schema.columns);
    }

    public parse(modelKeys: KeyMap<boolean>, columns: ColumnList): void {
        (columns || []).forEach((column: NgxColumnComponent) => {
            if (modelKeys[column.key]) {
                this.compileMetadata(column);
            }
        });
    }

    private compileMetadata(column: NgxColumnComponent): void {
        const { key, th, td }: NgxColumnComponent = column;
        this.schema.columns[key] = {
            th: { template: th && th.template },
            td: { template: td && td.template },
            width: column.width || null,
            stickyLeft: column.stickyLeft || null,
            stickyRight: column.stickyRight || null,
            cssClass: column.cssClass || [],
            cssStyle: column.cssStyle || []
        };
    }
}
