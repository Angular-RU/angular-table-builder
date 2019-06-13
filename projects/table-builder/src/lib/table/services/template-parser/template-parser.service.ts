import { Injectable } from '@angular/core';

import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { ImplicitContext, TableColumnOptions, TableSchema } from '../../interfaces/table-builder.external';
import { ColumnTemplates, KeyMap } from '../../interfaces/table-builder.internal';
import { TemplateCellCommon } from '../../directives/rows/template-cell.common';
import { SchemaBuilder } from './schema-builder.class';

@Injectable()
export class TemplateParserService {
    public schema: TableSchema = new SchemaBuilder();
    public renderedTemplateKeys: string[] = [];

    private static getCellTemplateContext(cellTemplate: TemplateCellCommon): TableColumnOptions<unknown> {
        return {
            textBold: cellTemplate.bold,
            nowrap: cellTemplate.nowrap,
            template: cellTemplate.template,
            class: cellTemplate.cssClasses,
            style: cellTemplate.cssStyles,
            useDeepPath: cellTemplate.useDeepPath,
            context: cellTemplate.row ? ImplicitContext.ROW : ImplicitContext.CELL,
            width: cellTemplate.width,
            height: cellTemplate.height
        };
    }

    public parse(allowedKeyMap: KeyMap<boolean>, templates: ColumnTemplates): void {
        if (templates) {
            templates.forEach((column: NgxColumnComponent) => {
                const { key, customKey }: NgxColumnComponent = column;
                const needTemplateCheck: boolean = allowedKeyMap[key] || customKey !== false;
                if (needTemplateCheck) {
                    this.compileColumnMetadata(column);
                    this.renderedTemplateKeys.push(key);
                }
            });
        }
    }

    public compileColumnMetadata(column: NgxColumnComponent): void {
        const { key, th, td }: NgxColumnComponent = column;
        this.schema.columns[key] = {
            th: TemplateParserService.getCellTemplateContext(th),
            td: TemplateParserService.getCellTemplateContext(td),
            width: column.width || null,
            stickyLeft: column.stickyLeft || null,
            stickyRight: column.stickyRight || null,
            cssClass: column.cssClass || [],
            cssStyle: column.cssStyle || []
        };
    }
}
