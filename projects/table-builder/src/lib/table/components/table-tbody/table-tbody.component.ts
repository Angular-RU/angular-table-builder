import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { TableLineRow } from '../common/table-line-row';
import { TableClickEventEmitter, TableRow } from '../../interfaces/table-builder.external';
import { SelectionService } from '../../services/selection/selection.service';
import { NGX_TABLE_OPTIONS } from '../../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { Any, KeyMap, RecalculatedStatus } from '../../interfaces/table-builder.internal';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { NgxContextMenuComponent } from '../../components/ngx-context-menu/ngx-context-menu.component';
import { OverloadScrollService } from '../../services/overload-scroll/overload-scroll.service';
import { UtilsService } from '../../services/utils/utils.service';
import { detectChanges } from '../../operators/detect-changes';

@Component({
    selector: 'table-tbody',
    templateUrl: './table-tbody.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableTbodyComponent extends TableLineRow implements OnChanges, OnInit, OnDestroy {
    @Input() public source: TableRow[];
    @Input() public striped: boolean;
    @Input('is-firefox') public isFirefox: boolean;
    @Input() public recalculated: RecalculatedStatus;
    @Input('primary-key') public primaryKey: string;
    @Input('selection-entries') public selectionEntries: KeyMap<boolean>;
    @Input('context-menu') public contextMenuTemplate: NgxContextMenuComponent;
    @Input('enable-selection') public enableSelection: boolean;
    @Input('table-viewport') public tableViewport: HTMLElement;
    @Input('column-virtual-height') public columnVirtualHeight: number;
    @Input('showed-cell-by-default') public showedCellByDefault: boolean;
    @Input('buffer-amount') public bufferAmount: number;
    @ViewChild('scroll', { static: true }) public scroll: VirtualScrollerComponent;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private reloadTaskId: number;

    constructor(
        public selection: SelectionService,
        public cd: ChangeDetectorRef,
        public contextMenu: ContextMenuService,
        @Inject(NGX_TABLE_OPTIONS) private readonly options: TableBuilderOptionsImpl,
        private readonly ngZone: NgZone,
        protected readonly utils: UtilsService,
        private readonly overload: OverloadScrollService
    ) {
        super(selection, utils);
    }

    public get clientBufferAmount(): number {
        return Number(this.bufferAmount) || this.options.bufferAmount;
    }

    public get canSelectTextInTable(): boolean {
        return !this.selection.selectionStart.status;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('recalculated' in changes && !changes['recalculated'].firstChange && this.scroll) {
            this.scroll.invalidateAllCachedMeasurements();
        }
    }

    public ngOnInit(): void {
        this.overload.scrollStatus
            .pipe(
                filter((scrolling: boolean) => !scrolling),
                takeUntil(this.destroy$)
            )
            .subscribe(() => this.refresh());
    }

    /**
     * @description: we hove some memory leak after destroy component
     * because VirtualScrollerComponent work with requestAnimationFrame
     * invalidate cache (VirtualScrollerComponent)
     */
    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        const scroll: VirtualScrollerComponent & Any = this.scroll as Any;
        scroll.removeScrollEventHandlers();
        scroll.wrapGroupDimensions = null;
        scroll.parentScroll = null;
        scroll.viewPortItems = null;
        scroll.items = null;
        scroll['invalidateAllCachedMeasurements'] = (): void => {};
        scroll['calculateViewport'] = (): Any => ({ startIndex: 0, scrollLength: 0 });
        scroll['previousViewPort'] = { startIndex: 0, scrollLength: 0 };
        scroll['invisiblePaddingElementRef'] = { nativeElement: null };
        scroll['getScrollStartPosition'] = (): number => 0;
        scroll['calculateDimensions'] = (): void => {};
        scroll['refresh_internal'] = (): void => {};
        scroll['element'] = { nativeElement: null };
        scroll['contentElementRef'] = null;
        scroll['_items'] = null;
        scroll['zone'] = null;
        this.destroy$ = null;
        this.scroll = null;
    }

    public openContextMenu(event: MouseEvent, key: string, row: TableRow): void {
        if (this.contextMenuTemplate) {
            const selectOnlyUnSelectedRow: boolean = this.enableSelection && !this.checkSelectedItem(row);

            if (selectOnlyUnSelectedRow) {
                this.selection.selectRow(row, event, this.source);
            }

            this.contextMenu.openContextMenu(event, key, row);
        }
    }

    public handleDblClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        window.clearInterval(this.selection.selectionTaskIdle);
        this.handleEventEmitter(row, key, event, emitter);
    }

    public handleOnClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        this.ngZone.runOutsideAngular(() => {
            if (this.enableSelection) {
                this.selection.selectionTaskIdle = window.setTimeout(() => {
                    this.selection.selectRow(row, event, this.source);
                    event.preventDefault();
                    detectChanges(this.cd);
                });
            }
        });

        this.handleEventEmitter(row, key, event, emitter);
    }

    public vsChange(): void {
        detectChanges(this.cd);
    }

    private refresh(): void {
        this.ngZone.runOutsideAngular(() => {
            window.clearTimeout(this.reloadTaskId);
            this.reloadTaskId = window.setTimeout(() => {
                if (this.scroll) {
                    this.scroll.invalidateAllCachedMeasurements();
                    detectChanges(this.cd);
                }
            }, TableBuilderOptionsImpl.MACRO_TIME);
        });
    }

    private handleEventEmitter(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        if (emitter) {
            this.ngZone.runOutsideAngular(() => {
                window.setTimeout(() => {
                    emitter.emit(this.generateTableCellInfo(row, key, event));
                });
            });
        }
    }

    private checkSelectedItem(row: TableRow): boolean {
        return this.selection.selectionModel.get(row[this.primaryKey]);
    }
}
