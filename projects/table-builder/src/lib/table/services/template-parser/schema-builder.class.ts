import { ColumnsSchema, TableSchema } from '../../interfaces/table-builder.external';

export class SchemaBuilder<T = any> implements TableSchema<T> {
    public columns: ColumnsSchema = {};
}
