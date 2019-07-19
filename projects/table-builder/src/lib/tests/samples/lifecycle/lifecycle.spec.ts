import { SelectionService } from '../../../table/services/selection/selection.service';
import { ApplicationRef, ChangeDetectorRef, NgZone, QueryList } from '@angular/core';
import { TemplateParserService } from '../../../table/services/template-parser/template-parser.service';
import { SortableService } from '../../../table/services/sortable/sortable.service';
import { WebWorkerThreadService } from '../../../table/worker/worker-thread.service';
import { UtilsService } from '../../../table/services/utils/utils.service';
import { ResizableService } from '../../../table/services/resizer/resizable.service';
import { ContextMenuService } from '../../../table/services/context-menu/context-menu.service';
import { NgxColumnComponent, TableBuilderComponent } from '@angular-ru/table-builder';
import { Any, Fn } from '../../../table/interfaces/table-builder.internal';
import { fakeAsync, tick } from '@angular/core/testing';
import { TableBuilderOptionsImpl } from '../../../table/config/table-builder-options';

// tslint:disable-next-line:no-big-function
describe('[TEST]: Lifecycle table', () => {
    let table: TableBuilderComponent;
    let selection: SelectionService;
    let templateParser: TemplateParserService;
    let resizable: ResizableService;
    let sortable: SortableService;
    let contextMenu: ContextMenuService;
    let utils: UtilsService;

    const mockChangeDetector: Partial<ChangeDetectorRef> = {
        detectChanges: (): void => {}
    };
    const appRef: Partial<ApplicationRef> = {
        tick: (): void => {}
    };
    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular: (callback: Fn): Any => callback()
    };

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

    beforeEach(() => {
        selection = new SelectionService(mockNgZone as NgZone);
        templateParser = new TemplateParserService();
        sortable = new SortableService(new WebWorkerThreadService(), new UtilsService(), mockNgZone as NgZone);
        resizable = new ResizableService();
        contextMenu = new ContextMenuService(utils);
        utils = new UtilsService();
        table = new TableBuilderComponent(
            selection,
            templateParser,
            mockChangeDetector as ChangeDetectorRef,
            mockNgZone as NgZone,
            utils,
            resizable,
            sortable,
            contextMenu,
            appRef as ApplicationRef
        );

        table.primaryKey = 'position';
    });

    it('should be unchecked state before ngOnChange', () => {
        table.source = JSON.parse(JSON.stringify(data));

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toEqual(true);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(false);
        expect(table.displayedColumns).toEqual([]);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(false);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(true);
        expect(table['renderCount']).toEqual(0);
    });

    it('should be correct generate modelColumnKeys after ngOnChange', () => {
        table.source = JSON.parse(JSON.stringify(data));
        table.ngOnChanges();
        table.ngOnInit();

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(true);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(false);
        expect(table.displayedColumns).toEqual([]);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(false);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(true);
        expect(table.selection.primaryKey).toEqual('position');
        expect(table['renderCount']).toEqual(0);
    });

    it('should be correct state after ngAfterContentInit when source empty', () => {
        table.source = null;
        table.ngOnChanges();
        table.ngOnInit();
        table.ngAfterContentInit();

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(false);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(false);
        expect(table['renderCount']).toEqual(0);
    });

    it('should be correct state after ngAfterContentInit', fakeAsync(() => {
        table.source = JSON.parse(JSON.stringify(data));
        table.ngOnChanges();
        table.ngOnInit();
        table.ngAfterContentInit();

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(false);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(true);
        expect(table['renderCount']).toEqual(0);
        expect(table['renderTaskId']).not.toBeNull();

        tick(TableBuilderOptionsImpl.TIME_IDLE);

        expect(table.rendering).toEqual(true);
        expect(table.isRendered).toEqual(false);
        expect(table.displayedColumns).toEqual([]);
        expect(table['renderTaskId']).not.toBeNull();

        tick(TableBuilderOptionsImpl.TIME_IDLE + 100);

        expect(table.rendering).toEqual(false);
        expect(table.isRendered).toEqual(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table['renderCount']).toEqual(1);
        expect(table['renderTaskId']).not.toBeNull();
    }));

    it('should be correct template changes', fakeAsync(() => {
        const templates: QueryList<NgxColumnComponent> = new QueryList();
        table.columnTemplates = templates;
        table.source = [];

        table.ngOnChanges();
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(false);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(false);
        expect(table['renderCount']).toEqual(0);

        table.source = JSON.parse(JSON.stringify(data));
        templates.reset([new NgxColumnComponent()]);
        templates.notifyOnChanges();

        tick(1000);

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(true);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(true);
        expect(table['renderCount']).toEqual(0);
    }));

    it('should be correct template changes with check renderCount', fakeAsync(() => {
        const templates: QueryList<NgxColumnComponent> = new QueryList();
        table.columnTemplates = templates;
        table.source = JSON.parse(JSON.stringify(data));

        table.ngOnChanges();
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(false);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(true);
        expect(table['renderCount']).toEqual(0);

        table.source = JSON.parse(JSON.stringify(data));
        templates.reset([new NgxColumnComponent()]);
        templates.notifyOnChanges();

        tick(1000);

        expect(table.isRendered).toEqual(true);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(true);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(true);
        expect(table['renderCount']).toEqual(1);

        templates.reset([new NgxColumnComponent(), new NgxColumnComponent()]);
        templates.notifyOnChanges();
        table.ngAfterViewChecked();

        tick(1000);

        expect(table['renderCount']).toEqual(1);
    }));

    it('should be correct template changes', fakeAsync(() => {
        const templates: QueryList<NgxColumnComponent> = new QueryList();
        table.columnTemplates = templates;
        table.source = [];

        table.ngOnChanges();
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();

        templates.reset([new NgxColumnComponent()]);
        templates.notifyOnChanges();

        table.source = JSON.parse(JSON.stringify(data));
        table.ngOnChanges();

        tick(1000);

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(true);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(true);
        expect(table['renderCount']).toEqual(0);

        table.ngAfterViewChecked();

        tick(1000);

        expect(table.isRendered).toEqual(true);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.showedCellByDefault).toEqual(true);
        expect(table.contentCheck).toEqual(false);
        expect(table.contentIsDirty).toEqual(false);
        expect(table.sourceExists).toEqual(true);
        expect(table['renderCount']).toEqual(1);
    }));

    it('should be correct ngOnDestroy', () => {
        expect(table['destroy$'].closed).toEqual(false);

        table.ngOnChanges();
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();
        table.ngOnDestroy();

        expect(table['destroy$'].closed).toEqual(true);
    });

    it('should be correct sync rendering', fakeAsync(() => {
        table.lazy = false;
        table.source = JSON.parse(JSON.stringify(data));
        expect(table.lazy).toEqual(false);

        table.ngOnChanges();
        table.renderTable();

        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
    }));

    it('should be correct async rendering', fakeAsync(() => {
        table.source = JSON.parse(JSON.stringify(data));
        expect(table.lazy).toEqual(true);

        table.ngOnChanges();
        table.renderTable();

        tick(100);

        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
    }));
});
