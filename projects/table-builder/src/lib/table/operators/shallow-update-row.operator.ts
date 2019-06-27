import { TableRow } from '../interfaces/table-builder.external';
import { Any } from '../interfaces/table-builder.internal';

export function shallowUpdateRow(data: TableRow[], row: TableRow, key: string, value: Any): TableRow[] {
    const index: number = data.indexOf(row);
    return [...data.slice(0, index), { ...data[index], [key]: value }, ...data.slice(index + 1, data.length)];
}
