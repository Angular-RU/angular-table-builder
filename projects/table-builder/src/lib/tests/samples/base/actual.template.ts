import { MocksGenerator } from '@helpers/utils/mocks-generator';
import { TableColumn, TableSchema } from '../../../table/interfaces/table-builder.external';

const COLUMN: TableColumn = {
    th: {
        ...MocksGenerator.generateCell(true),
        emptyHead: null,
        headTitle: null
    },
    td: MocksGenerator.generateCell(),
    width: null,
    stickyLeft: false,
    stickyRight: false,
    cssClass: [],
    cssStyle: [],
    resizable: null,
    draggable: null,
    sortable: null,
    customColumn: false,
    verticalLine: false,
    filterable: null
};

export const ACTUAL_TEMPLATE: TableSchema = {
    displayedColumns: [],
    allRenderedColumnKeys: [],
    columnsSimpleOptions: {},
    columns: {
        position: COLUMN,
        name: COLUMN,
        weight: COLUMN
    }
};
