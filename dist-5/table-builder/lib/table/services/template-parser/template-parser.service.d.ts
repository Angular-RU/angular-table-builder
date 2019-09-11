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
    /**
     * @description: the custom names of the column list to be displayed in the view.
     * @example:
     *    <table-builder #table
     *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
     *        [exclude]="[ 'description' ]">
     *    </table-builder>
     *    ------------------------
     *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true }
     */
    allowedKeyMap: KeyMap<boolean>;
    /**
     * @description: the custom names of the column list to be displayed in the view.
     * @example:
     *    <table-builder #table
     *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
     *        [exclude]="[ 'description' ]">
     *    </table-builder>
     *    ------------------------
     *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true, 'description': false }
     */
    keyMap: KeyMap<boolean>;
    private static templateContext;
    private static getValidHtmlBooleanAttribute;
    private static getValidPredicate;
    toggleColumnVisibility(key: string): void;
    initialSchema(columnOptions: ColumnOptions): void;
    parse(templates: QueryListRef<NgxColumnComponent>): void;
    mutateColumnSchema(key: string, partialSchema: Partial<ColumnsSchema>): void;
    compileColumnMetadata(column: NgxColumnComponent): void;
}
