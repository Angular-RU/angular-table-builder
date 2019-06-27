import { Injectable } from '@angular/core';

import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { ImplicitContext, TableCellOptions, TableColumn, TableSchema } from '../../interfaces/table-builder.external';
import { ColumnListRef, ColumnOptionsRef, KeyMap } from '../../interfaces/table-builder.internal';
import { TemplateCellCommon } from '../../directives/rows/template-cell.common';
import { SchemaBuilder } from './schema-builder.class';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { ColumnOptions } from '../../components/common/column-options';

@Injectable()
export class TemplateParserService {
    public schema: TableSchema;
    public renderedTemplateKeys: Set<string>;
    public columnOptions: ColumnOptionsRef;

    private static getCellTemplateContext(key: string, cellTemplate: TemplateCellCommon): TableCellOptions {
        return {
            textBold: cellTemplate.bold,
            nowrap: cellTemplate.nowrap,
            template: cellTemplate.template,
            class: cellTemplate.cssClasses,
            style: cellTemplate.cssStyles,
            useDeepPath: key.includes('.'),
            context: cellTemplate.row ? ImplicitContext.ROW : ImplicitContext.CELL,
            width: cellTemplate.width,
            height: cellTemplate.height,
            onClick: cellTemplate.onClick
        };
    }

    public initialSchema(columnOptions: ColumnOptionsRef): TemplateParserService {
        this.schema = new SchemaBuilder();
        this.renderedTemplateKeys = new Set<string>();
        this.columnOptions = columnOptions || new ColumnOptions();
        return this;
    }

    public parse(allowedKeyMap: KeyMap<boolean>, templates: ColumnListRef): void {
        if (templates) {
            templates.forEach((column: NgxColumnComponent) => {
                const { key, customKey, overridePosition }: NgxColumnComponent = column;
                const needTemplateCheck: boolean = allowedKeyMap[key] || customKey !== false;
                if (needTemplateCheck) {
                    if (overridePosition !== false && this.renderedTemplateKeys.has(key)) {
                        this.renderedTemplateKeys.delete(key);
                        this.compileColumnMetadata(column);
                    } else if (!this.renderedTemplateKeys.has(key)) {
                        this.compileColumnMetadata(column);
                    }

                    this.renderedTemplateKeys.add(key);
                }
            });
        }
    }

    public updateState(key: string, value: Partial<TableColumn>): void {
        this.schema.columns = {
            ...this.schema.columns,
            [key]: { ...this.schema.columns[key], ...value }
        };
    }

    public compileColumnMetadata(column: NgxColumnComponent): void {
        const { key, th, td }: NgxColumnComponent = column;
        const thTemplate: TemplateCellCommon = th || new TemplateHeadThDirective(null);
        const tdTemplate: TemplateCellCommon = td || new TemplateBodyTdDirective(null);

        this.schema.columns[key] = {
            customColumn: typeof column.customKey === 'string' ? true : column.customKey,
            th: TemplateParserService.getCellTemplateContext(key, thTemplate),
            td: TemplateParserService.getCellTemplateContext(key, tdTemplate),
            width: column.width || this.columnOptions.width,
            stickyLeft: column.stickyLeft,
            stickyRight: column.stickyRight,
            cssClass: column.cssClass || this.columnOptions.cssClass || [],
            cssStyle: column.cssStyle || this.columnOptions.cssStyle || [],
            resizable: column.resizable || this.columnOptions.resizable,
            sortable: column.sortable || this.columnOptions.sortable
        };
    }
}
