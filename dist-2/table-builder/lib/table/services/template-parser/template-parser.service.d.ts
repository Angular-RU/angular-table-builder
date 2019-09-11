import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { KeyMap, QueryListRef } from '../../interfaces/table-builder.internal';
import { ColumnOptions } from '../../components/common/column-options';
import { SchemaBuilder } from './schema-builder.class';
export declare class TemplateParserService {
    schema: SchemaBuilder;
    templateKeys: Set<string>;
    fullTemplateKeys: Set<string>;
    overrideTemplateKeys: Set<string>;
    columnOptions: ColumnOptions;
    compiledTemplates: KeyMap<ColumnsSchema>;
    private static templateContext;
    private static getValidHtmlBooleanAttribute;
    private static getValidPredicate;
    toggleColumnVisibility(key: string): void;
    initialSchema(columnOptions: ColumnOptions): void;
    parse(allowedKeyMap: KeyMap<boolean>, templates: QueryListRef<NgxColumnComponent>): void;
    mutateColumnSchema(key: string, partialSchema: Partial<ColumnsSchema>): void;
    compileColumnMetadata(column: NgxColumnComponent): void;
}
