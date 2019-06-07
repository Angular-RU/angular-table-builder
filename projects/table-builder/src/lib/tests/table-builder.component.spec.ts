import { ApplicationRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { FakeGeneratorTable } from '@helpers/utils/fake-generator-table.class';

import { TemplateParserService } from '../table/services/template-parser/template-parser.service';
import { TableTbodyComponent } from '../table/components/table-tbody/table-tbody.component';
import { SelectionService } from '../table/services/selection/selection.service';
import { ImplicitContext, TableRow } from '../table/interfaces/table-builder.external';
import { NgxColumnComponent } from '../table/components/ngx-column/ngx-column.component';
import { TableBuilderComponent } from '../table/table-builder.component';
import { Any } from '../table/interfaces/table-builder.internal';

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
    let templateParser: TemplateParserService;

    const rowHeight: number = 40;
    const columnWidth: number = 200;

    const mockChangeDetector: Partial<ChangeDetectorRef> = {
        detectChanges: (): void => {}
    };

    const appRef: Partial<ApplicationRef> = {
        tick: (): void => {}
    };

    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular: (): Any => {}
    };

    const selection: SelectionService = new SelectionService(appRef as ApplicationRef, mockNgZone as NgZone);

    beforeEach(() => {
        templateParser = new TemplateParserService();
        table = new TableBuilderComponent(
            selection,
            rowHeight,
            columnWidth,
            templateParser,
            mockChangeDetector as ChangeDetectorRef
        );

        table.source = data;
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
        const position: NgxColumnComponent = FakeGeneratorTable.generateColumn('position');
        const name: NgxColumnComponent = FakeGeneratorTable.generateColumn('name');
        const weight: NgxColumnComponent = FakeGeneratorTable.generateColumn('weight');

        templateParser.parse(table.generateColumnsKeyMap(modelKeys), [position, name, weight] as Any);

        expect(templateParser.schema).toEqual({
            columns: {
                position: {
                    th: {
                        template: null,
                        context: ImplicitContext.CELL,
                        nowrap: true,
                        textBold: true,
                        useDeepPath: null
                    },
                    td: {
                        template: null,
                        context: ImplicitContext.CELL,
                        nowrap: true,
                        textBold: null,
                        useDeepPath: null
                    },
                    width: null,
                    stickyLeft: null,
                    stickyRight: null,
                    cssClass: [],
                    cssStyle: []
                },
                name: {
                    th: {
                        template: null,
                        context: ImplicitContext.CELL,
                        nowrap: true,
                        textBold: true,
                        useDeepPath: null
                    },
                    td: {
                        template: null,
                        context: ImplicitContext.CELL,
                        nowrap: true,
                        textBold: null,
                        useDeepPath: null
                    },
                    width: null,
                    stickyLeft: null,
                    stickyRight: null,
                    cssClass: [],
                    cssStyle: []
                },
                weight: {
                    th: {
                        template: null,
                        context: ImplicitContext.CELL,
                        nowrap: true,
                        textBold: true,
                        useDeepPath: null
                    },
                    td: {
                        template: null,
                        context: ImplicitContext.CELL,
                        nowrap: true,
                        textBold: null,
                        useDeepPath: null
                    },
                    width: null,
                    stickyLeft: null,
                    stickyRight: null,
                    cssClass: [],
                    cssStyle: []
                }
            }
        });

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

    it('should be correct table body', () => {
        const index: number = 0;
        const DEFAULT_BUFFER_AMOUNT: number = 10;
        const item: TableRow = { id: 1, value: 'hello world' };
        const tableBody: TableTbodyComponent = new TableTbodyComponent(
            selection,
            mockChangeDetector as ChangeDetectorRef,
            DEFAULT_BUFFER_AMOUNT,
            null
        );

        tableBody.source = [item];
        expect(tableBody.trackByIdx(index, item)).toEqual(index);

        tableBody.primaryKey = 'id';
        expect(tableBody.trackByIdx(index, item)).toEqual(1);
    });
});
