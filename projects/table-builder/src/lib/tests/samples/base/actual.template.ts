import { FakeGeneratorTable } from '@helpers/utils/fake-generator-table.class';
import { TableColumn, TableSchema } from '../../../table/interfaces/table-builder.external';

const COLUMN: TableColumn = {
    th: FakeGeneratorTable.generateCell(true),
    td: FakeGeneratorTable.generateCell(),
    width: null,
    stickyLeft: null,
    stickyRight: null,
    cssClass: [],
    cssStyle: []
};

export const ACTUAL_TEMPLATE: TableSchema = {
    columns: {
        position: COLUMN,
        name: COLUMN,
        weight: COLUMN
    }
};
