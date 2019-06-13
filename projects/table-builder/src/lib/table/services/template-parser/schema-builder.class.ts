import { ColumnsSchema, TableSchema } from '../../interfaces/table-builder.external';
import { Any } from '../../interfaces/table-builder.internal';

export class SchemaBuilder<T = Any> implements TableSchema<T> {
    public columns: ColumnsSchema = {};
}
