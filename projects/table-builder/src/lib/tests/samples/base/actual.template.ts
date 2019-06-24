import { MocksGenerator } from '@helpers/utils/mocks-generator';
import { TableColumn, TableSchema } from '../../../table/interfaces/table-builder.external';

const COLUMN: TableColumn = {
    th: MocksGenerator.generateCell(true),
    td: MocksGenerator.generateCell(),
    width: null,
    stickyLeft: false,
    stickyRight: false,
    cssClass: [],
    cssStyle: [],
    resizable: false,
    customColumn: false,
    sortable: false
};

export const ACTUAL_TEMPLATE: TableSchema = {
    columns: {
        position: COLUMN,
        name: COLUMN,
        weight: COLUMN
    }
};
