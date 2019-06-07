import { Injectable } from '@angular/core';

import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { ImplicitContext, TableSchema } from '../../interfaces/table-builder.external';
import { KeyMap, ColumnTemplates } from '../../interfaces/table-builder.internal';
import { SchemaBuilder } from './schema-builder.class';

@Injectable()
export class TemplateParserService {
    public schema: TableSchema = new SchemaBuilder();
    public renderedTemplateKeys: string[] = [];

    public parse(allowedKeyMap: KeyMap<boolean>, templates: ColumnTemplates): void {
        if (templates) {
            templates.forEach((column: NgxColumnComponent) => {
                const { key, customKey }: NgxColumnComponent = column;
                const needTemplateCheck: boolean = allowedKeyMap[key] || customKey !== false;
                if (needTemplateCheck) {
                    this.compileMetadata(column);
                    this.renderedTemplateKeys.push(key);
                }
            });
        }
    }

    public compileMetadata(column: NgxColumnComponent): void {
        const { key, th, td }: NgxColumnComponent = column;
        this.schema.columns[key] = {
            th: {
                textBold: th.bold,
                nowrap: th.nowrap,
                template: th.template,
                useDeepPath: null,
                context: th.row ? ImplicitContext.ROW : ImplicitContext.CELL,
            },
            td: {
                textBold: td.bold,
                nowrap: td.nowrap,
                template: td.template,
                useDeepPath: td.useDeepPath,
                context: td.row ? ImplicitContext.ROW : ImplicitContext.CELL
            },
            width: column.width || null,
            stickyLeft: column.stickyLeft || null,
            stickyRight: column.stickyRight || null,
            cssClass: column.cssClass || [],
            cssStyle: column.cssStyle || []
        };
    }
}
