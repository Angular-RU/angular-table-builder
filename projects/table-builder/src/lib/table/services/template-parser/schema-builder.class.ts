import { ColumnsSchema, ColumnsSimpleOptions, TableSchema } from '../../interfaces/table-builder.external';
import { Any } from '../../interfaces/table-builder.internal';

export class SchemaBuilder<T = Any> implements TableSchema<T> {
    public columns: ColumnsSchema = {};
    public displayedColumns: string[] = [];
    public allRenderedColumnKeys: string[] = [];
    public columnsSimpleOptions: ColumnsSimpleOptions = {};

    public toJSON(): Partial<TableSchema> {
        const convertedSchema: Partial<TableSchema> = {
            columns: {},
            displayedColumns: [...this.displayedColumns],
            allRenderedColumnKeys: [...this.allRenderedColumnKeys],
            columnsSimpleOptions: { ...this.columnsSimpleOptions }
        };

        for (const key of Object.keys(this.columns)) {
            convertedSchema.columns[key] = {
                ...this.columns[key],
                th: {
                    ...this.columns[key].th,
                    template: null,
                    context: null,
                    onClick: null,
                    dblClick: null
                },
                td: {
                    ...this.columns[key].td,
                    template: null,
                    context: null,
                    onClick: null,
                    dblClick: null
                }
            };
        }

        return JSON.parse(JSON.stringify(convertedSchema));
    }
}
