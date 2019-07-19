import { ColumnsAllowedKeys, ColumnsSchema, TableSchema } from '../../interfaces/table-builder.external';
import { Any, KeyMap } from '../../interfaces/table-builder.internal';

export class SchemaBuilder<T = Any> implements TableSchema<T> {
    public columns: ColumnsSchema = {};
    public columnsAllowedKeys: ColumnsAllowedKeys = {};
}
