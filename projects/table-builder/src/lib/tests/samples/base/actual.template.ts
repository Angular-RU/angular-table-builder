import { MocksGenerator } from '@helpers/utils/mocks-generator';
import { ColumnsSchema } from '../../../table/interfaces/table-builder.external';
import { KeyMap } from '../../../table/interfaces/table-builder.internal';

const COLUMN: ColumnsSchema = {
    key: null,
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
    filterable: null,
    isModel: true,
    isVisible: null,
    th: {
        ...MocksGenerator.generateCell(true),
        emptyHead: null,
        headTitle: null
    },
    td: MocksGenerator.generateCell()
};

export const ACTUAL_TEMPLATE: KeyMap<ColumnsSchema> = {
    position: { ...COLUMN, key: 'position' },
    name: { ...COLUMN, key: 'name' },
    weight: { ...COLUMN, key: 'weight' }
};
