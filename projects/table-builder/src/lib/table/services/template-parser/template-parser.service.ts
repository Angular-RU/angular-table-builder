import { Injectable } from '@angular/core';

import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { ImplicitContext, TableCellOptions, TableColumn, TableSchema } from '../../interfaces/table-builder.external';
import { KeyMap, QueryListRef } from '../../interfaces/table-builder.internal';
import { TemplateCellCommon } from '../../directives/rows/template-cell.common';
import { SchemaBuilder } from './schema-builder.class';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { ColumnOptions } from '../../components/common/column-options';

@Injectable()
export class TemplateParserService {
    public schema: TableSchema;
    public templateKeys: Set<string>;
    public fullTemplateKeys: Set<string>;
    public overrideTemplateKeys: Set<string>;
    public columnOptions: ColumnOptions;

    private static templateContext(key: string, cell: TemplateCellCommon, options: ColumnOptions): TableCellOptions {
        return {
            textBold: cell.bold,
            template: cell.template,
            class: cell.cssClasses,
            style: cell.cssStyles,
            width: cell.width,
            height: cell.height,
            onClick: cell.onClick,
            dblClick: cell.dblClick,
            useDeepPath: key.includes('.'),
            context: cell.row ? ImplicitContext.ROW : ImplicitContext.CELL,
            nowrap: TemplateParserService.getValidPredicate(options.nowrap, cell.nowrap)
        };
    }

    private static getValidHtmlBooleanAttribute(attribute: boolean): boolean {
        return typeof attribute === 'string' ? true : attribute;
    }

    private static getValidPredicate<T>(leftPredicate: T, rightPredicate: T): T {
        return leftPredicate === null ? rightPredicate : leftPredicate;
    }

    public toggleColumnVisibility(key: string): void {
        this.schema.columnsAllowedKeys = {
            ...this.schema.columnsAllowedKeys,
            [key]: {
                isModel: this.schema.columnsAllowedKeys[key].isModel,
                visible: !this.schema.columnsAllowedKeys[key].visible
            }
        };
    }

    public initialSchema(columnOptions: ColumnOptions): TemplateParserService {
        this.schema = new SchemaBuilder();
        this.templateKeys = new Set<string>();
        this.overrideTemplateKeys = new Set<string>();
        this.fullTemplateKeys = new Set<string>();
        this.columnOptions = columnOptions || new ColumnOptions();
        return this;
    }

    public parse(allowedKeyMap: KeyMap<boolean>, templates: QueryListRef<NgxColumnComponent>): void {
        if (templates) {
            templates.forEach((column: NgxColumnComponent) => {
                const { key, customKey, importantTemplate }: NgxColumnComponent = column;
                const needTemplateCheck: boolean = allowedKeyMap[key] || customKey !== false;

                if (needTemplateCheck) {
                    if (importantTemplate !== false) {
                        this.templateKeys.delete(key);
                        this.compileColumnMetadata(column);
                        this.overrideTemplateKeys.add(key);
                    } else if (!this.templateKeys.has(key) && !this.overrideTemplateKeys.has(key)) {
                        this.compileColumnMetadata(column);
                        this.templateKeys.add(key);
                    }

                    this.fullTemplateKeys.add(key);
                }
            });
        }
    }

    public setAllowedKeyMap(fullyKeyList: string[], modelKeys: string[]): void {
        fullyKeyList.forEach((key: string) => {
            this.schema.columnsAllowedKeys[key] = {
                isModel: modelKeys.includes(key),
                visible:
                    this.schema.columnsAllowedKeys[key] !== undefined
                        ? this.schema.columnsAllowedKeys[key].visible
                        : true
            };
        });
    }

    public updateState(key: string, value: Partial<TableColumn>): void {
        this.schema.columns = {
            ...this.schema.columns,
            [key]: { ...this.schema.columns[key], ...value }
        };
    }

    public compileColumnMetadata(column: NgxColumnComponent): void {
        const { key, th, td, emptyHead, headTitle }: NgxColumnComponent = column;
        const thTemplate: TemplateCellCommon = th || new TemplateHeadThDirective(null);
        const tdTemplate: TemplateCellCommon = td || new TemplateBodyTdDirective(null);
        const isEmptyHead: boolean = TemplateParserService.getValidHtmlBooleanAttribute(emptyHead);
        const thOptions: TableCellOptions = TemplateParserService.templateContext(key, thTemplate, this.columnOptions);

        this.schema.columns[key] = this.schema.columns[key] || {
            th: {
                ...thOptions,
                headTitle,
                emptyHead: isEmptyHead,
                template: isEmptyHead ? null : thOptions.template
            },
            td: TemplateParserService.templateContext(key, tdTemplate, this.columnOptions),
            stickyLeft: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyLeft),
            stickyRight: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyRight),
            customColumn: TemplateParserService.getValidHtmlBooleanAttribute(column.customKey),
            width: TemplateParserService.getValidPredicate(column.width, this.columnOptions.width),
            cssClass: TemplateParserService.getValidPredicate(column.cssClass, this.columnOptions.cssClass) || [],
            cssStyle: TemplateParserService.getValidPredicate(column.cssStyle, this.columnOptions.cssStyle) || [],
            resizable: TemplateParserService.getValidPredicate(column.resizable, this.columnOptions.resizable),
            sortable: TemplateParserService.getValidPredicate(column.sortable, this.columnOptions.sortable),
            verticalLine: column.verticalLine
        };
    }
}
