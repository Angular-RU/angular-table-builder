/* tslint:disable:no-big-function */
import { fakeAsync, tick } from '@angular/core/testing';
import { ApplicationRef, ChangeDetectorRef, EventEmitter, NgZone, SimpleChanges } from '@angular/core';
import { MocksGenerator } from '@helpers/utils/mocks-generator';

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
import { ResizableService } from '../../../table/services/resizer/resizable.service';
import { TableLineRow } from '../../../table/components/common/table-line-row';
import { SortableService } from '../../../table/services/sortable/sortable.service';
import { WebWorkerThreadService } from '../../../table/worker/worker-thread.service';

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
const item: TableRow = { id: 1, value: 'hello world' };

describe('[TEST]: TableBuilder', () => {
    let table: TableBuilderComponent;
    let selection: SelectionService;
    let templateParser: TemplateParserService;
    let resizable: ResizableService;
    let sortable: SortableService;
    let utils: UtilsService;
    let preventDefaultInvoked: number = 0;
    let clearIntervalInvoked: number = 0;
    let changes: SimpleChanges;
    const mockChangeDetector: Partial<ChangeDetectorRef> = {
        detectChanges: (): void => {}
    };
    const appRef: Partial<ApplicationRef> = {
        tick: (): void => {}
    };
    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular: (callback: Fn): Any => callback()
    };
    const mockMouseEvent: Partial<MouseEvent> = {
        preventDefault: (): void => {
            preventDefaultInvoked++;
        }
    };

    let position: NgxColumnComponent;
    let name: NgxColumnComponent;
    let weight: NgxColumnComponent;

    beforeEach(() => {
        selection = new SelectionService(appRef as ApplicationRef, mockNgZone as NgZone);
        templateParser = new TemplateParserService();
        sortable = new SortableService(new WebWorkerThreadService(), new UtilsService(), mockNgZone as NgZone);
        resizable = new ResizableService();
        utils = new UtilsService();
        table = new TableBuilderComponent(
            selection,
            templateParser,
            mockChangeDetector as ChangeDetectorRef,
            mockNgZone as NgZone,
            utils,
            resizable,
            sortable
        );
    });

    beforeEach(() => {
        position = MocksGenerator.generateColumn('position');
        name = MocksGenerator.generateColumn('name');
        weight = MocksGenerator.generateColumn('weight');
    });

    beforeEach(() => {
        table.source = JSON.parse(JSON.stringify(data));
        changes = {
            source: {
                currentValue: table.source,
                firstChange: false,
                previousValue: undefined,
                isFirstChange: (): boolean => false
            }
        };
    });

    beforeEach(() => {
        Object.defineProperty(window, 'setTimeout', {
            value: (callback: Fn): Any => {
                callback();
            }
        });

        Object.defineProperty(window, 'requestAnimationFrame', {
            value: (callback: Fn): Any => {
                callback();
            }
        });

        Object.defineProperty(window, 'clearInterval', {
            value: (): Any => {
                clearIntervalInvoked++;
            }
        });
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

    it('should be correct displayedColumns', fakeAsync(() => {
        table.ngOnChanges(changes);
        expect(table.displayedColumns).toEqual([]);
        expect(table.isDirtyCheck).toEqual(false);
        table.ngAfterContentInit();
        expect(table.displayedColumns).toEqual(modelKeys);

        tick(1000); // async rendering
        expect(table.isDirtyCheck).toEqual(true);
    }));

    it('should be correct displayedColumns when set custom keys', () => {
        table.keys = customKeys;
        table.ngOnChanges(changes);
        table.ngAfterContentInit();
        expect(table.displayedColumns).toEqual(customKeys);
    });

    it('should be correct displayedColumns when set custom keys and exclude keys', () => {
        table.keys = customKeys;
        table.excludeKeys = ['position'];
        table.ngOnChanges(changes);
        table.ngAfterContentInit();
        expect(table.displayedColumns).toEqual(['name', 'symbol', 'name']);
    });

    it('should be correct parse template', () => {
        templateParser.initialSchema(null).parse(table.generateColumnsKeyMap(modelKeys), [position, name, weight]);
        expect(templateParser.schema).toEqual(ACTUAL_TEMPLATE);
    });

    it('should be correct rendered', fakeAsync(() => {
        table.columnList = [position, name, weight];
        table.ngOnChanges(changes);
        table.ngAfterContentInit();

        tick(100);

        expect(table.displayedColumns).toEqual(['position', 'name', 'weight']);
        expect(table.isRendered).toEqual(true);
    }));

    it('should be correct clientWidth when set autoWidth=true', () => {
        table.autoWidth = true;
        expect(table.clientColWidth).toEqual(null);
    });

    it('should be correct re-render table on change', () => {
        table.isDirtyCheck = true;
        table.ngOnChanges(changes);
        expect(table.displayedColumns).toEqual(modelKeys);
        expect(table.isDirtyCheck).toEqual(true);
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

    it('should be correct lazy rendering', fakeAsync(() => {
        table.source = [{ a1: 1, a2: 2, a3: 3, a4: 4, a5: 5, a6: 6, a7: 7, a8: 8, a9: 9, a10: 10, a11: 11, a12: 12 }];
        expect(table.isRendered).toEqual(false);

        table.ngOnChanges(changes);
        table.ngAfterContentInit();

        tick(1000);

        expect(table.isRendered).toEqual(true);
        expect(table.displayedColumns).toEqual([
            'a1',
            'a2',
            'a3',
            'a4',
            'a5',
            'a6',
            'a7',
            'a8',
            'a9',
            'a10',
            'a11',
            'a12'
        ]);
    }));

    it('should be correct generate table body without emitter', () => {
        const index: number = 0;
        table.primaryKey = 'id';
        table.ngOnInit();

        const mySelection: SelectionService = new SelectionService(appRef as ApplicationRef, mockNgZone as NgZone);
        const tableBody: TableTbodyComponent = new TableTbodyComponent(
            mySelection,
            mockChangeDetector as ChangeDetectorRef,
            new TableBuilderOptionsImpl(),
            null,
            mockNgZone as NgZone,
            utils
        );

        tableBody.source = [item];
        expect(tableBody.trackByIdx(index, item)).toEqual(index);

        tableBody.primaryKey = 'id';
        expect(tableBody.trackByIdx(index, item)).toEqual(1);

        expect(tableBody.canSelectTextInTable).toEqual(true);

        tableBody.enableSelection = true;
        tableBody.handleRowIdleCallback(item, mockMouseEvent as MouseEvent, null);

        expect(mySelection.selectionModel.entries).toEqual({ 1: true });
        expect(mySelection.selectionModel.isAll).toEqual(true);
    });

    it('should be correct generate table body with emitter', (done: Fn<void>) => {
        table.primaryKey = 'id';
        table.ngOnInit();

        const tableBody: TableTbodyComponent = new TableTbodyComponent(
            selection,
            mockChangeDetector as ChangeDetectorRef,
            new TableBuilderOptionsImpl(),
            null,
            mockNgZone as NgZone,
            utils
        );

        tableBody.source = [item];

        const emitter: Partial<EventEmitter<TableCellInfo>> = {
            emit(value?: TableCellInfo): void {
                expect(value).toEqual({
                    ...value,
                    row: item,
                    event: mockMouseEvent
                });

                done();
            }
        };

        tableBody.handleRowIdleCallback(item, mockMouseEvent as MouseEvent, emitter as EventEmitter<TableCellInfo>);
    });

    it('should be invoke preventDefault', () => {
        const cell: TableCellInfo = new TableLineRow(templateParser, selection).generateTableCellInfo(
            item,
            mockMouseEvent as MouseEvent
        );

        cell.preventDefault();
        expect(clearIntervalInvoked).toEqual(1);
    });
});
