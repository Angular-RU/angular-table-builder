import { ColumnsSchema, TableSchema } from '../../interfaces/table-builder.external';

export class SchemaBuilder<T = unknown> implements TableSchema<T> {
    public columns: ColumnsSchema = {};
}
