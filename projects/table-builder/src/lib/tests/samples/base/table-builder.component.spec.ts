/* tslint:disable:no-big-function */
import { ApplicationRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { FakeGeneratorTable } from '@helpers/utils/fake-generator-table.class';

import { TemplateParserService } from '../../../table/services/template-parser/template-parser.service';
import { TableTbodyComponent } from '../../../table/components/table-tbody/table-tbody.component';
import { SelectionService } from '../../../table/services/selection/selection.service';
import { TableCellInfo, TableRow } from '../../../table/interfaces/table-builder.external';
import { NgxColumnComponent } from '../../../table/components/ngx-column/ngx-column.component';
import { TableBuilderComponent } from '../../../table/table-builder.component';
import { Any, Fn } from '../../../table/interfaces/table-builder.internal';
import { ACTUAL_TEMPLATE } from './actual.template';
import { UtilsService } from '../../../table/services/utils/utils.service';
import { TableBuilderOptionsImpl } from '../../../table/config/table-builder-options';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const data: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

const modelKeys: string[] = ['position', 'name', 'weight', 'symbol'];
const customKeys: string[] = ['position', 'name', 'symbol', 'position', 'name'];

describe('[TEST]: TableBuilder', () => {
    let table: TableBuilderComponent;
    let selection: SelectionService;
    let templateParser: TemplateParserService;
    let preventDefaultInvoked: number = 0;
    let clearIntervalInvoked: number = 0;
    const mockChangeDetector: Partial<ChangeDetectorRef> = {
        detectChanges: (): void => {}
    };
    const appRef: Partial<ApplicationRef> = {
        tick: (): void => {}
    };
    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular: (callback: Fn): Any => callback()
    };
    const mockPreventDefault: Partial<MouseEvent> = {
        preventDefault: (): void => {
            preventDefaultInvoked++;
        }
    };

    Object.defineProperty(window, 'setTimeout', {
        value: (callback: Fn): Any => callback()
    });

    Object.defineProperty(window, 'clearInterval', {
        value: (): Any => {
            clearIntervalInvoked++;
        }
    });

    let position: NgxColumnComponent;
    let name: NgxColumnComponent;
    let weight: NgxColumnComponent;

    beforeEach(() => {
        selection = new SelectionService(appRef as ApplicationRef, mockNgZone as NgZone);
        templateParser = new TemplateParserService();
        table = new TableBuilderComponent(
            selection,
            templateParser,
            mockChangeDetector as ChangeDetectorRef,
            mockNgZone as NgZone,
            new UtilsService()
        );
        table.async = false;
    });

    beforeEach(() => {
        position = FakeGeneratorTable.generateColumn('position');
        name = FakeGeneratorTable.generateColumn('name');
        weight = FakeGeneratorTable.generateColumn('weight');
    });

    beforeEach(() => (table.source = JSON.parse(JSON.stringify(data))));

    it('should be correct height columns and width rows', () => {
        expect(table.columnHeight).toEqual(495);
        expect(table.columnVirtualHeight).toEqual(450);

        table.rowHeight = 80;
        table.columnWidth = 100;

        expect(table.clientColWidth).toEqual(100);
        expect(table.clientRowHeight).toEqual(80);
        expect(table.columnWidth).toEqual(100);
        expect(table.columnHeight).toEqual(880);
        expect(table.columnVirtualHeight).toEqual(800);
    });

    it('should be correct displayedColumns', () => {
        table.ngOnChanges();
        expect(table.displayedColumns).toEqual([]);
        expect(table.isFirstRendered).toEqual(false);
        table.ngAfterContentInit();
        expect(table.displayedColumns).toEqual(modelKeys);
        expect(table.isFirstRendered).toEqual(true);
    });

    it('should be correct displayedColumns when set custom keys', () => {
        table.keys = customKeys;
        table.ngAfterContentInit();
        expect(table.displayedColumns).toEqual(customKeys);
    });

    it('should be correct displayedColumns when set custom keys and exclude keys', () => {
        table.keys = customKeys;
        table.excludeKeys = ['position'];
        table.ngAfterContentInit();
        expect(table.displayedColumns).toEqual(['name', 'symbol', 'name']);
    });

    it('should be correct parse template', () => {
        templateParser.initialSchema().parse(table.generateColumnsKeyMap(modelKeys), [position, name, weight]);
        expect(templateParser.schema).toEqual(ACTUAL_TEMPLATE);
    });

    it('should be correct sync render', () => {
        table.columnTemplates = [position, name, weight];
        table.ngAfterContentInit();
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight']);
    });

    it('should be correct clientWidth when set autoWidth=true', () => {
        table.autoWidth = true;
        expect(table.clientColWidth).toEqual(null);
    });

    it('should be correct re-render table on change', () => {
        table.isFirstRendered = true;
        table.ngOnChanges();
        expect(table.displayedColumns).toEqual(modelKeys);
        expect(table.isFirstRendered).toEqual(true);
    });

    it('should be correct invoke updateScrollOffset', () => {
        table.updateScrollOffset(true);
        expect(table.scrollOffset).toEqual({ offset: true });
    });

    it('should be correct displayedColumns when set undefined source', () => {
        table.source = undefined;
        expect(table.source).toEqual(undefined);
        expect(table.displayedColumns).toEqual([]);
    });

    it('should be correct generate table body', () => {
        const index: number = 0;
        const item: TableRow = { id: 1, value: 'hello world' };
        table.primaryKey = 'id';

        table.ngOnInit();

        const tableBody: TableTbodyComponent = new TableTbodyComponent(
            selection,
            mockChangeDetector as ChangeDetectorRef,
            new TableBuilderOptionsImpl(),
            null,
            mockNgZone as NgZone
        );

        tableBody.source = [item];
        expect(tableBody.trackByIdx(index, item)).toEqual(index);

        tableBody.primaryKey = 'id';
        expect(tableBody.trackByIdx(index, item)).toEqual(1);

        expect(tableBody.canSelectTextInTable).toEqual(true);

        tableBody.enableSelection = true;
        tableBody.handleRowIdleCallback(item, mockPreventDefault as MouseEvent, null);

        expect(table.selectionModel.entries).toEqual({ 1: true });
        expect(table.selectionModel.isAll).toEqual(true);

        const info: TableCellInfo = tableBody.generateTableCellInfo(item, mockPreventDefault as MouseEvent);
        expect(info).toEqual({
            ...info,
            row: { id: 1, value: 'hello world' },
            event: mockPreventDefault
        });

        info.preventDefault();
        expect(clearIntervalInvoked).toEqual(1);
    });

    it('should be correct selected items', () => {
        table.primaryKey = 'position';
        table.ngOnInit();

        table.selection.selectRow(data[0], { ctrlKey: true } as MouseEvent, data);
        table.selection.selectRow(data[1], { ctrlKey: true } as MouseEvent, data);
        table.selection.selectRow(data[2], { ctrlKey: true } as MouseEvent, data);

        expect(table.selectedItems).toEqual([
            { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
            { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
            { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' }
        ]);
    });
});
