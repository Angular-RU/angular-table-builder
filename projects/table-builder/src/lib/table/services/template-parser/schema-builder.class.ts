import { ColumnsSchema, ColumnsSimpleOptions, TableSchema } from '../../interfaces/table-builder.external';
import { Any, DeepPartial } from '../../interfaces/table-builder.internal';

export class SchemaBuilder<T = Any> implements TableSchema<T> {
    public columns: ColumnsSchema = {};

    constructor(
        public displayedColumns: string[] = [],
        public allRenderedColumnKeys: string[] = [],
        public columnsSimpleOptions: ColumnsSimpleOptions = {}
    ) {}

    public toJSON(): Partial<TableSchema> {
        const convertedSchema: Partial<TableSchema> = {
            columns: {},
            displayedColumns: [...this.displayedColumns],
            columnsSimpleOptions: { ...this.columnsSimpleOptions }
        };

        for (const key of Object.keys(this.columns)) {
            convertedSchema.columns[key] = { ...this.columns[key], th: null, td: null };
            delete convertedSchema.columns[key].th;
            delete convertedSchema.columns[key].td;
        }

        return JSON.parse(JSON.stringify(convertedSchema));
    }
}
