import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { DeepPartial } from '../../interfaces/table-builder.internal';
export declare class SchemaBuilder {
    columns: ColumnsSchema[];
    constructor(columns?: ColumnsSchema[]);
    exportColumns(): Array<DeepPartial<ColumnsSchema>>;
}
