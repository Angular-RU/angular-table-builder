import { TableBuilderComponent, TableRow, TableSchema } from '@angular-ru/table-builder';
import { fakeAsync, tick } from '@angular/core/testing';
import { SelectionService } from '../../table/services/selection/selection.service';
import { ApplicationRef, ChangeDetectorRef, NgZone, SimpleChanges } from '@angular/core';
import { TemplateParserService } from '../../table/services/template-parser/template-parser.service';
import { ResizableService } from '../../table/services/resizer/resizable.service';
import { UtilsService } from '../../table/services/utils/utils.service';
import { Any, Fn } from '../../table/interfaces/table-builder.internal';
import { MocksGenerator } from '@helpers/utils/mocks-generator';
import { SortableService } from '../../table/services/sortable/sortable.service';
import { WebWorkerThreadService } from '../../table/worker/worker-thread.service';
import { ContextMenuService } from '../../table/services/context-menu/context-menu.service';
import { FilterableService } from '../../table/services/filterable/filterable.service';
import { DraggableService } from '../../table/services/draggable/draggable.service';

const source: TableRow[] = [{ id: 1, value: 'hello world' }];

describe('[TEST]: Resizable service', () => {
    let table: TableBuilderComponent;
    let removeAll: number = 0;
    let documentEmpty: number = 0;
    let resizeService: ResizableService;
    let draggable: DraggableService;
    let sortable: SortableService;
    const columnWidth: number = 200;
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

    const column: Partial<HTMLDivElement> = {
        offsetWidth: columnWidth
    };

    beforeEach(() => {
        const worker: WebWorkerThreadService = new WebWorkerThreadService();
        const utils: UtilsService = new UtilsService();
        const zone: NgZone = mockNgZone as NgZone;
        const app: ApplicationRef = appRef as ApplicationRef;
        const parser: TemplateParserService = new TemplateParserService();

        resizeService = new ResizableService();
        draggable = new DraggableService(parser);
        sortable = new SortableService(worker, utils, zone);

        table = new TableBuilderComponent(
            new SelectionService(zone, utils),
            parser,
            mockChangeDetector as ChangeDetectorRef,
            zone,
            utils,
            resizeService,
            sortable,
            new ContextMenuService(utils),
            app,
            new FilterableService(worker, utils, zone, app),
            draggable
        );
    });

    beforeEach(fakeAsync(() => {
        table.source = source;
        changes = {
            source: {
                currentValue: table.source,
                firstChange: false,
                previousValue: undefined,
                isFirstChange: (): boolean => false
            }
        };

        table.ngAfterContentInit();
        table.ngOnChanges(changes);
        tick(1000); // async rendering
    }));

    beforeEach(() => {
        removeAll = 0;
        documentEmpty = 0;
        window['getSelection'] = null;
    });

    it('should be correct listen mousemove and mouseup', fakeAsync(() => {
        Object.defineProperty(window, 'getSelection', {
            value: (): Any => ({
                removeAllRanges: (): Any => {
                    removeAll++;
                }
            })
        });

        let schema: TableSchema = null;

        table.resizeColumn(
            {
                key: 'id',
                event: MocksGenerator.dispatchMouseEvent('mousemove', 0, 0)
            },
            column as HTMLDivElement
        );

        expect(resizeService.startWidth).toEqual(columnWidth);
        expect(resizeService.startX).toEqual(0);
        expect(table.templateParser.schema.columns['id'].width).toEqual(null);

        // ColumnWidth { 200 } + pageX { 140 }
        MocksGenerator.dispatchMouseEvent('mousemove', 140, 0);
        expect(table.templateParser.schema.columns['id'].width).toEqual(340);

        tick(100);

        // ColumnWidth { 200 } + pageX { 210 }
        MocksGenerator.dispatchMouseEvent('mousemove', 210, 0);
        expect(table.templateParser.schema.columns['id'].width).toEqual(410);

        table.schemaChanges.subscribe((data: TableSchema) => (schema = data));
        MocksGenerator.dispatchMouseEvent('mouseup', 210, 0);

        tick(1000);

        expect(schema.columns['id'].width).toEqual(410);
        expect(removeAll).toEqual(2);
    }));

    it('should be correct selection empty', fakeAsync(() => {
        document['selection'] = {
            empty: (): number => documentEmpty++
        };

        table.resizeColumn(
            {
                key: 'id',
                event: MocksGenerator.dispatchMouseEvent('mousemove', 0, 0)
            },
            column as HTMLDivElement
        );

        MocksGenerator.dispatchMouseEvent('mousemove', -50, 0);

        tick(100);

        expect(table.templateParser.schema.columns['id'].width).toEqual(150);
        expect(documentEmpty).toEqual(1);

        MocksGenerator.dispatchMouseEvent('mousemove', -350, 0);
        expect(table.templateParser.schema.columns['id'].width).toEqual(150);
    }));
});
