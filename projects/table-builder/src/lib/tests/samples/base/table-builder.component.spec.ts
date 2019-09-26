/* tslint:disable:no-big-function */
import { fakeAsync, tick } from '@angular/core/testing';
import { ApplicationRef, ChangeDetectorRef, EventEmitter, NgZone, QueryList, SimpleChanges } from '@angular/core';
import { MocksGenerator } from '@helpers/utils/mocks-generator';

import { TemplateParserService } from '../../../table/services/template-parser/template-parser.service';
import { TableTbodyComponent } from '../../../table/components/table-tbody/table-tbody.component';
import { SelectionService } from '../../../table/services/selection/selection.service';
import { ColumnsSchema, TableEvent, TableRow } from '../../../table/interfaces/table-builder.external';
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
import { ContextMenuService } from '../../../table/services/context-menu/context-menu.service';
import { FilterableService } from '../../../table/services/filterable/filterable.service';
import { DraggableService } from '../../../table/services/draggable/draggable.service';
import { NgxTableViewChangesService } from '@angular-ru/ng-table-builder';
import { OverloadScrollService } from '../../../table/services/overload-scroll/overload-scroll.service';

interface PeriodicElement {
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
    let contextMenu: ContextMenuService;
    let resizeService: ResizableService;
    let scroll: OverloadScrollService;
    let utils: UtilsService;
    let draggable: DraggableService;
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
    const mockMouseEvent: Partial<MouseEvent> = {
        preventDefault: (): void => {
            preventDefaultInvoked++;
        }
    };

    let position: NgxColumnComponent;
    let name: NgxColumnComponent;
    let weight: NgxColumnComponent;

    beforeEach(() => {
        const zone: NgZone = mockNgZone as NgZone;
        const viewChanges: NgxTableViewChangesService = new NgxTableViewChangesService();

        utils = new UtilsService(zone);
        selection = new SelectionService(zone);
        templateParser = new TemplateParserService();
        sortable = new SortableService(new WebWorkerThreadService(), new UtilsService(zone), mockNgZone as NgZone);
        draggable = new DraggableService(templateParser);
        resizable = new ResizableService();
        contextMenu = new ContextMenuService();

        const worker: WebWorkerThreadService = new WebWorkerThreadService();
        scroll = new OverloadScrollService();
        const app: ApplicationRef = appRef as ApplicationRef;

        resizeService = new ResizableService();
        sortable = new SortableService(worker, utils, zone);

        table = new TableBuilderComponent(
            selection,
            new TemplateParserService(),
            mockChangeDetector as ChangeDetectorRef,
            zone,
            utils,
            resizeService,
            sortable,
            new ContextMenuService(),
            app,
            new FilterableService(worker, utils, zone, app),
            draggable,
            viewChanges,
            scroll
        );
    });

    beforeEach(() => {
        position = MocksGenerator.generateColumn('position');
        name = MocksGenerator.generateColumn('name');
        weight = MocksGenerator.generateColumn('weight');
    });

    beforeEach(() => {
        table.source = JSON.parse(JSON.stringify(data));
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
        table.enableSelection = true;
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
        table.ngOnChanges();
        expect(table.displayedColumns).toEqual([]);
        expect(table.dirty).toEqual(true);

        table.ngAfterContentInit();
        tick(1000); // async rendering

        expect(table.displayedColumns).toEqual(modelKeys);
        expect(table.dirty).toEqual(false);
    }));

    it('should be correct displayedColumns when set custom keys', fakeAsync(() => {
        table.keys = customKeys;
        table.ngOnChanges();
        table.ngAfterContentInit();
        tick(1000);

        expect(table.columnSchema.map((column: ColumnsSchema) => column.key)).toEqual(customKeys);
    }));

    it('should be correct displayedColumns when set custom keys and exclude keys', fakeAsync(() => {
        table.keys = customKeys;
        table.excludeKeys = ['position'];
        table.ngOnChanges();
        table.ngAfterContentInit();
        tick(1000);

        expect(table.columnSchema.map((column: ColumnsSchema) => column.key)).toEqual(['name', 'symbol', 'name']);
    }));

    it('should be correct parse template', () => {
        const templates: QueryList<NgxColumnComponent> = new QueryList();
        templates.reset([position, name, weight]);

        templateParser.initialSchema(null);
        templateParser.allowedKeyMap = table.generateColumnsKeyMap(modelKeys);
        templateParser.keyMap = table.generateColumnsKeyMap(modelKeys);
        templateParser.parse(templates);
        expect(templateParser.compiledTemplates).toEqual(ACTUAL_TEMPLATE);
    });

    it('should be correct rendered', fakeAsync(() => {
        const templates: QueryList<NgxColumnComponent> = new QueryList();
        templates.reset([position, name, weight]);
        table.columnTemplates = templates;

        table.ngOnChanges();
        table.ngAfterContentInit();

        tick(1000); // async rendering

        expect(table.displayedColumns).toEqual(['position', 'name', 'weight']);
        expect(table.isRendered).toEqual(true);
    }));

    it('should be correct clientWidth when set autoWidth=true', () => {
        table.autoWidth = true;
        expect(table.clientColWidth).toEqual(null);
    });

    it('should be correct re-render table on change', fakeAsync(() => {
        table.markTemplateContentCheck();
        table.markDirtyCheck();
        table.markForCheck();
        table.ngOnChanges();
        table.ngAfterViewChecked();

        tick(1000); // async rendering

        expect(table.displayedColumns).toEqual(modelKeys);
        expect(table.dirty).toEqual(false);
    }));

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

        table.ngOnChanges();
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
        const mySelection: SelectionService = new SelectionService(mockNgZone as NgZone);
        const tableBody: TableTbodyComponent = new TableTbodyComponent(
            mySelection,
            mockChangeDetector as ChangeDetectorRef,
            contextMenu,
            new TableBuilderOptionsImpl(),
            mockNgZone as NgZone,
            utils,
            scroll
        );

        tableBody.primaryKey = 'id';
        tableBody.source = [item];

        expect(tableBody.canSelectTextInTable).toEqual(true);

        tableBody.enableSelection = true;
        tableBody.handleOnClick(item, 'id', mockMouseEvent as MouseEvent, null);

        expect(mySelection.selectionModel.entries).toEqual({ 1: true });
        expect(mySelection.selectionModel.isAll).toEqual(true);
    });

    it('should be correct generate table body with emitter', (done: Fn<void>) => {
        table.primaryKey = 'id';
        table.ngOnInit();

        const tableBody: TableTbodyComponent = new TableTbodyComponent(
            selection,
            mockChangeDetector as ChangeDetectorRef,
            contextMenu,
            new TableBuilderOptionsImpl(),
            mockNgZone as NgZone,
            utils,
            scroll
        );

        tableBody.source = [item];

        const emitter: Partial<EventEmitter<TableEvent>> = {
            emit(value?: TableEvent): void {
                expect(value).toEqual({
                    ...value,
                    row: item,
                    event: mockMouseEvent
                });

                done();
            }
        };

        tableBody.handleOnClick(item, 'id', mockMouseEvent as MouseEvent, emitter as EventEmitter<TableEvent>);
    });

    it('should be invoke preventDefault', () => {
        const cell: TableEvent = new TableLineRow(selection, utils).generateTableCellInfo(
            item,
            'id',
            mockMouseEvent as MouseEvent
        );

        cell.preventDefault();
        expect(clearIntervalInvoked).toEqual(1);
    });

    it('should be correct work exclude keys', () => {
        table.source = [];
        table.ngOnChanges();
        expect(table.modelColumnKeys).toEqual([]);

        table.source = [{ a1: 1, a2: 2, a3: 3 }];
        table.excludeKeys = ['a3'];
        table.ngOnChanges();
        expect(table.modelColumnKeys).toEqual(['a1', 'a2']);

        table.source = [{ a1: 1, a2: 2, a3: 3, a4: { a: 1, b: 2, c: null }, a5: { c: null, d: 4, e: 5 } }];
        table.excludeKeys = ['a3', /a4/, /c/];
        table.ngOnChanges();
        expect(table.modelColumnKeys).toEqual(['a1', 'a2', 'a5.d', 'a5.e']);
    });

    it('should be correct selection entries', () => {
        table.enableSelection = true;
        expect(table.selectionEntries).toEqual({});

        table.primaryKey = 'position';
        table.ngOnInit();

        table.selection.selectRow(data[3], mockMouseEvent as MouseEvent, data);
        expect(table.selectionEntries).toEqual({ 4: true });
    });

    it('should be correct toggleFreeze', () => {
        expect(table.isFrozenView).toEqual(false);
        table.toggleFreeze();
        expect(table.isFrozenView).toEqual(true);

        table.toggleFreeze(100);
        expect(table.isFrozenView).toEqual(false);
    });

    it('should be correct get table size', () => {
        expect(table.size).toEqual(10);
        expect(table.firstItem).toEqual({ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' });
        expect(table.lastItem).toEqual({ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' });

        table.source = null;
        expect(table.size).toEqual(0);
        expect(table.firstItem).toEqual({});
        expect(table.lastItem).toEqual({});
    });
});
