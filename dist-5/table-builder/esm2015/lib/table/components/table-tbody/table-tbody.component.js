/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { TableLineRow } from '../common/table-line-row';
import { SelectionService } from '../../services/selection/selection.service';
import { NGX_TABLE_OPTIONS } from '../../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { NgxContextMenuComponent } from '../../components/ngx-context-menu/ngx-context-menu.component';
import { OverloadScrollService } from '../../services/overload-scroll/overload-scroll.service';
import { UtilsService } from '../../services/utils/utils.service';
import { detectChanges } from '../../operators/detect-changes';
export class TableTbodyComponent extends TableLineRow {
    /**
     * @param {?} selection
     * @param {?} cd
     * @param {?} contextMenu
     * @param {?} options
     * @param {?} ngZone
     * @param {?} utils
     * @param {?} overload
     */
    constructor(selection, cd, contextMenu, options, ngZone, utils, overload) {
        super(selection, utils);
        this.selection = selection;
        this.cd = cd;
        this.contextMenu = contextMenu;
        this.options = options;
        this.ngZone = ngZone;
        this.utils = utils;
        this.overload = overload;
        this.destroy$ = new Subject();
    }
    /**
     * @return {?}
     */
    get clientBufferAmount() {
        return Number(this.bufferAmount) || this.options.bufferAmount;
    }
    /**
     * @return {?}
     */
    get canSelectTextInTable() {
        return !this.selection.selectionStart.status;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('recalculated' in changes && !changes['recalculated'].firstChange && this.scroll) {
            this.scroll.invalidateAllCachedMeasurements();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.overload.scrollStatus
            .pipe(filter((/**
         * @param {?} scrolling
         * @return {?}
         */
        (scrolling) => !scrolling)), takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.refresh()));
    }
    /**
     * \@description: we hove some memory leak after destroy component
     * because VirtualScrollerComponent work with requestAnimationFrame
     * invalidate cache (VirtualScrollerComponent)
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        /** @type {?} */
        const scroll = (/** @type {?} */ (this.scroll));
        scroll.removeScrollEventHandlers();
        scroll.wrapGroupDimensions = null;
        scroll.parentScroll = null;
        scroll.viewPortItems = null;
        scroll.items = null;
        scroll['invalidateAllCachedMeasurements'] = (/**
         * @return {?}
         */
        () => { });
        scroll['calculateViewport'] = (/**
         * @return {?}
         */
        () => ({ startIndex: 0, scrollLength: 0 }));
        scroll['previousViewPort'] = { startIndex: 0, scrollLength: 0 };
        scroll['invisiblePaddingElementRef'] = { nativeElement: null };
        scroll['getScrollStartPosition'] = (/**
         * @return {?}
         */
        () => 0);
        scroll['calculateDimensions'] = (/**
         * @return {?}
         */
        () => { });
        scroll['refresh_internal'] = (/**
         * @return {?}
         */
        () => { });
        scroll['element'] = { nativeElement: null };
        scroll['contentElementRef'] = null;
        scroll['_items'] = null;
        scroll['zone'] = null;
        this.destroy$ = null;
        this.scroll = null;
    }
    /**
     * @param {?} event
     * @param {?} key
     * @param {?} row
     * @return {?}
     */
    openContextMenu(event, key, row) {
        if (this.contextMenuTemplate) {
            /** @type {?} */
            const selectOnlyUnSelectedRow = this.enableSelection && !this.checkSelectedItem(row);
            if (selectOnlyUnSelectedRow) {
                this.selection.selectRow(row, event, this.source);
            }
            this.contextMenu.openContextMenu(event, key, row);
        }
    }
    /**
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    handleDblClick(row, key, event, emitter) {
        window.clearInterval(this.selection.selectionTaskIdle);
        this.handleEventEmitter(row, key, event, emitter);
    }
    /**
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    handleOnClick(row, key, event, emitter) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            if (this.enableSelection) {
                this.selection.selectionTaskIdle = window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.selection.selectRow(row, event, this.source);
                    event.preventDefault();
                    detectChanges(this.cd);
                }));
            }
        }));
        this.handleEventEmitter(row, key, event, emitter);
    }
    /**
     * @return {?}
     */
    vsChange() {
        detectChanges(this.cd);
    }
    /**
     * @private
     * @return {?}
     */
    refresh() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.clearTimeout(this.reloadTaskId);
            this.reloadTaskId = window.setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.scroll) {
                    this.scroll.invalidateAllCachedMeasurements();
                    detectChanges(this.cd);
                }
            }), TableBuilderOptionsImpl.MACRO_TIME);
        }));
    }
    /**
     * @private
     * @param {?} row
     * @param {?} key
     * @param {?} event
     * @param {?} emitter
     * @return {?}
     */
    handleEventEmitter(row, key, event, emitter) {
        if (emitter) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    emitter.emit(this.generateTableCellInfo(row, key, event));
                }));
            }));
        }
    }
    /**
     * @private
     * @param {?} row
     * @return {?}
     */
    checkSelectedItem(row) {
        return this.selection.selectionModel.get(row[this.primaryKey]);
    }
}
TableTbodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'table-tbody',
                template: "<virtual-scroller\r\n    #scroll\r\n    [items]=\"source\"\r\n    [stripedTable]=\"true\"\r\n    [checkResizeInterval]=\"0\"\r\n    [parentScroll]=\"tableViewport\"\r\n    [enableUnequalChildrenSizes]=\"true\"\r\n    [bufferAmount]=\"clientBufferAmount\"\r\n    [resizeBypassRefreshThreshold]=\"0\"\r\n    [useMarginInsteadOfTranslate]=\"true\"\r\n    [executeRefreshOutsideAngularZone]=\"true\"\r\n    [modifyOverflowStyleOfParentScroll]=\"false\"\r\n    [style.height.px]=\"columnVirtualHeight\"\r\n    (vsChange)=\"vsChange()\"\r\n>\r\n    <div\r\n        #parent\r\n        class=\"table-grid__cell\"\r\n        *ngFor=\"let item of scroll.viewPortItems; let index = index\"\r\n        (selectstart)=\"(canSelectTextInTable)\"\r\n        (contextmenu)=\"openContextMenu($event, columnSchema.key, item)\"\r\n        (click)=\"handleOnClick(item, columnSchema.key, $event, columnSchema?.td?.onClick)\"\r\n        (dblclick)=\"handleDblClick(item, columnSchema.key, $event, columnSchema?.td?.dblClick)\"\r\n        [style.min-height.px]=\"columnSchema?.td?.height || clientRowHeight\"\r\n        [style.max-height.px]=\"columnSchema?.td?.height || clientRowHeight\"\r\n        [class.table-grid__cell--resizable]=\"columnSchema?.resizable\"\r\n        [class.table-grid__cell--custom-cell]=\"columnSchema?.customColumn\"\r\n        [class.table-grid__cell--strip]=\"striped ? index % 2 === 0 : null\"\r\n        [class.table-grid__cell--enable-selection]=\"enableSelection\"\r\n        [class.table-grid__cell--selected]=\"selectionEntries[item[primaryKey]]\"\r\n        [class.table-grid__cell--text-bold]=\"columnSchema?.td?.textBold\"\r\n        [ngClass]=\"columnSchema?.td?.class\"\r\n        [ngStyle]=\"columnSchema?.td?.style\"\r\n    >\r\n        <div\r\n            class=\"table-grid__cell--content\"\r\n            [class.table-grid__cell--nowrap]=\"!columnSchema?.customColumn && columnSchema?.td?.nowrap\"\r\n        >\r\n            <table-cell\r\n                [item]=\"item\"\r\n                [index]=\"index\"\r\n                [parent]=\"parent\"\r\n                [is-rendered]=\"isRendered\"\r\n                *ngIf=\"showedCellByDefault\"\r\n                [column-index]=\"columnIndex\"\r\n                [column-schema]=\"columnSchema\"\r\n                [is-filterable]=\"columnSchema?.filterable\"\r\n            ></table-cell>\r\n        </div>\r\n    </div>\r\n</virtual-scroller>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
TableTbodyComponent.ctorParameters = () => [
    { type: SelectionService },
    { type: ChangeDetectorRef },
    { type: ContextMenuService },
    { type: TableBuilderOptionsImpl, decorators: [{ type: Inject, args: [NGX_TABLE_OPTIONS,] }] },
    { type: NgZone },
    { type: UtilsService },
    { type: OverloadScrollService }
];
TableTbodyComponent.propDecorators = {
    source: [{ type: Input }],
    striped: [{ type: Input }],
    isFirefox: [{ type: Input, args: ['is-firefox',] }],
    recalculated: [{ type: Input }],
    primaryKey: [{ type: Input, args: ['primary-key',] }],
    selectionEntries: [{ type: Input, args: ['selection-entries',] }],
    contextMenuTemplate: [{ type: Input, args: ['context-menu',] }],
    enableSelection: [{ type: Input, args: ['enable-selection',] }],
    tableViewport: [{ type: Input, args: ['table-viewport',] }],
    columnVirtualHeight: [{ type: Input, args: ['column-virtual-height',] }],
    showedCellByDefault: [{ type: Input, args: ['showed-cell-by-default',] }],
    bufferAmount: [{ type: Input, args: ['buffer-amount',] }],
    scroll: [{ type: ViewChild, args: ['scroll', { static: true },] }]
};
if (false) {
    /** @type {?} */
    TableTbodyComponent.prototype.source;
    /** @type {?} */
    TableTbodyComponent.prototype.striped;
    /** @type {?} */
    TableTbodyComponent.prototype.isFirefox;
    /** @type {?} */
    TableTbodyComponent.prototype.recalculated;
    /** @type {?} */
    TableTbodyComponent.prototype.primaryKey;
    /** @type {?} */
    TableTbodyComponent.prototype.selectionEntries;
    /** @type {?} */
    TableTbodyComponent.prototype.contextMenuTemplate;
    /** @type {?} */
    TableTbodyComponent.prototype.enableSelection;
    /** @type {?} */
    TableTbodyComponent.prototype.tableViewport;
    /** @type {?} */
    TableTbodyComponent.prototype.columnVirtualHeight;
    /** @type {?} */
    TableTbodyComponent.prototype.showedCellByDefault;
    /** @type {?} */
    TableTbodyComponent.prototype.bufferAmount;
    /** @type {?} */
    TableTbodyComponent.prototype.scroll;
    /**
     * @type {?}
     * @private
     */
    TableTbodyComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    TableTbodyComponent.prototype.reloadTaskId;
    /** @type {?} */
    TableTbodyComponent.prototype.selection;
    /** @type {?} */
    TableTbodyComponent.prototype.cd;
    /** @type {?} */
    TableTbodyComponent.prototype.contextMenu;
    /**
     * @type {?}
     * @private
     */
    TableTbodyComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    TableTbodyComponent.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    TableTbodyComponent.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    TableTbodyComponent.prototype.overload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdGJvZHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb21wb25lbnRzL3RhYmxlLXRib2R5L3RhYmxlLXRib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFLTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUU3RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUN2RyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBUS9ELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxZQUFZOzs7Ozs7Ozs7O0lBaUJq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Q3JCLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzs7O0lBWnJDLHFDQUFtQzs7SUFDbkMsc0NBQWlDOztJQUNqQyx3Q0FBK0M7O0lBQy9DLDJDQUFpRDs7SUFDakQseUNBQWdEOztJQUNoRCwrQ0FBcUU7O0lBQ3JFLGtEQUEyRTs7SUFDM0UsOENBQTJEOztJQUMzRCw0Q0FBMkQ7O0lBQzNELGtEQUFtRTs7SUFDbkUsa0RBQXFFOztJQUNyRSwyQ0FBb0Q7O0lBQ3BELHFDQUErRTs7Ozs7SUFDL0UsdUNBQTREOzs7OztJQUM1RCwyQ0FBNkI7O0lBR3pCLHdDQUFrQzs7SUFDbEMsaUNBQTRCOztJQUM1QiwwQ0FBc0M7Ozs7O0lBQ3RDLHNDQUE0RTs7Ozs7SUFDNUUscUNBQStCOzs7OztJQUMvQixvQ0FBc0M7Ozs7O0lBQ3RDLHVDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpcnR1YWxTY3JvbGxlckNvbXBvbmVudCB9IGZyb20gJ25neC12aXJ0dWFsLXNjcm9sbGVyJztcclxuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE5nWm9uZSxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIFNpbXBsZUNoYW5nZXMsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVMaW5lUm93IH0gZnJvbSAnLi4vY29tbW9uL3RhYmxlLWxpbmUtcm93JztcclxuaW1wb3J0IHsgVGFibGVDbGlja0V2ZW50RW1pdHRlciwgVGFibGVSb3cgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTkdYX1RBQkxFX09QVElPTlMgfSBmcm9tICcuLi8uLi9jb25maWcvdGFibGUtYnVpbGRlci50b2tlbnMnO1xyXG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCB9IGZyb20gJy4uLy4uL2NvbmZpZy90YWJsZS1idWlsZGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBBbnksIEtleU1hcCwgUmVjYWxjdWxhdGVkU3RhdHVzIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmd4Q29udGV4dE1lbnVDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL25neC1jb250ZXh0LW1lbnUvbmd4LWNvbnRleHQtbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPdmVybG9hZFNjcm9sbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vdmVybG9hZC1zY3JvbGwvb3ZlcmxvYWQtc2Nyb2xsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZGV0ZWN0Q2hhbmdlcyB9IGZyb20gJy4uLy4uL29wZXJhdG9ycy9kZXRlY3QtY2hhbmdlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFibGUtdGJvZHknLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLXRib2R5LmNvbXBvbmVudC5odG1sJyxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVUYm9keUNvbXBvbmVudCBleHRlbmRzIFRhYmxlTGluZVJvdyBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgQElucHV0KCkgcHVibGljIHNvdXJjZTogVGFibGVSb3dbXTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBzdHJpcGVkOiBib29sZWFuO1xyXG4gICAgQElucHV0KCdpcy1maXJlZm94JykgcHVibGljIGlzRmlyZWZveDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyByZWNhbGN1bGF0ZWQ6IFJlY2FsY3VsYXRlZFN0YXR1cztcclxuICAgIEBJbnB1dCgncHJpbWFyeS1rZXknKSBwdWJsaWMgcHJpbWFyeUtleTogc3RyaW5nO1xyXG4gICAgQElucHV0KCdzZWxlY3Rpb24tZW50cmllcycpIHB1YmxpYyBzZWxlY3Rpb25FbnRyaWVzOiBLZXlNYXA8Ym9vbGVhbj47XHJcbiAgICBASW5wdXQoJ2NvbnRleHQtbWVudScpIHB1YmxpYyBjb250ZXh0TWVudVRlbXBsYXRlOiBOZ3hDb250ZXh0TWVudUNvbXBvbmVudDtcclxuICAgIEBJbnB1dCgnZW5hYmxlLXNlbGVjdGlvbicpIHB1YmxpYyBlbmFibGVTZWxlY3Rpb246IGJvb2xlYW47XHJcbiAgICBASW5wdXQoJ3RhYmxlLXZpZXdwb3J0JykgcHVibGljIHRhYmxlVmlld3BvcnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgQElucHV0KCdjb2x1bW4tdmlydHVhbC1oZWlnaHQnKSBwdWJsaWMgY29sdW1uVmlydHVhbEhlaWdodDogbnVtYmVyO1xyXG4gICAgQElucHV0KCdzaG93ZWQtY2VsbC1ieS1kZWZhdWx0JykgcHVibGljIHNob3dlZENlbGxCeURlZmF1bHQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoJ2J1ZmZlci1hbW91bnQnKSBwdWJsaWMgYnVmZmVyQW1vdW50OiBudW1iZXI7XHJcbiAgICBAVmlld0NoaWxkKCdzY3JvbGwnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwdWJsaWMgc2Nyb2xsOiBWaXJ0dWFsU2Nyb2xsZXJDb21wb25lbnQ7XHJcbiAgICBwcml2YXRlIGRlc3Ryb3kkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuICAgIHByaXZhdGUgcmVsb2FkVGFza0lkOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHNlbGVjdGlvbjogU2VsZWN0aW9uU2VydmljZSxcclxuICAgICAgICBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIHB1YmxpYyBjb250ZXh0TWVudTogQ29udGV4dE1lbnVTZXJ2aWNlLFxyXG4gICAgICAgIEBJbmplY3QoTkdYX1RBQkxFX09QVElPTlMpIHByaXZhdGUgcmVhZG9ubHkgb3B0aW9uczogVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdXRpbHM6IFV0aWxzU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG92ZXJsb2FkOiBPdmVybG9hZFNjcm9sbFNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKHNlbGVjdGlvbiwgdXRpbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xpZW50QnVmZmVyQW1vdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmJ1ZmZlckFtb3VudCkgfHwgdGhpcy5vcHRpb25zLmJ1ZmZlckFtb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNhblNlbGVjdFRleHRJblRhYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uU3RhcnQuc3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCdyZWNhbGN1bGF0ZWQnIGluIGNoYW5nZXMgJiYgIWNoYW5nZXNbJ3JlY2FsY3VsYXRlZCddLmZpcnN0Q2hhbmdlICYmIHRoaXMuc2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsLmludmFsaWRhdGVBbGxDYWNoZWRNZWFzdXJlbWVudHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3ZlcmxvYWQuc2Nyb2xsU3RhdHVzXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyKChzY3JvbGxpbmc6IGJvb2xlYW4pID0+ICFzY3JvbGxpbmcpLFxyXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlZnJlc2goKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHdlIGhvdmUgc29tZSBtZW1vcnkgbGVhayBhZnRlciBkZXN0cm95IGNvbXBvbmVudFxyXG4gICAgICogYmVjYXVzZSBWaXJ0dWFsU2Nyb2xsZXJDb21wb25lbnQgd29yayB3aXRoIHJlcXVlc3RBbmltYXRpb25GcmFtZVxyXG4gICAgICogaW52YWxpZGF0ZSBjYWNoZSAoVmlydHVhbFNjcm9sbGVyQ29tcG9uZW50KVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95JC5uZXh0KHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICBjb25zdCBzY3JvbGw6IFZpcnR1YWxTY3JvbGxlckNvbXBvbmVudCAmIEFueSA9IHRoaXMuc2Nyb2xsIGFzIEFueTtcclxuICAgICAgICBzY3JvbGwucmVtb3ZlU2Nyb2xsRXZlbnRIYW5kbGVycygpO1xyXG4gICAgICAgIHNjcm9sbC53cmFwR3JvdXBEaW1lbnNpb25zID0gbnVsbDtcclxuICAgICAgICBzY3JvbGwucGFyZW50U2Nyb2xsID0gbnVsbDtcclxuICAgICAgICBzY3JvbGwudmlld1BvcnRJdGVtcyA9IG51bGw7XHJcbiAgICAgICAgc2Nyb2xsLml0ZW1zID0gbnVsbDtcclxuICAgICAgICBzY3JvbGxbJ2ludmFsaWRhdGVBbGxDYWNoZWRNZWFzdXJlbWVudHMnXSA9ICgpOiB2b2lkID0+IHt9O1xyXG4gICAgICAgIHNjcm9sbFsnY2FsY3VsYXRlVmlld3BvcnQnXSA9ICgpOiBBbnkgPT4gKHsgc3RhcnRJbmRleDogMCwgc2Nyb2xsTGVuZ3RoOiAwIH0pO1xyXG4gICAgICAgIHNjcm9sbFsncHJldmlvdXNWaWV3UG9ydCddID0geyBzdGFydEluZGV4OiAwLCBzY3JvbGxMZW5ndGg6IDAgfTtcclxuICAgICAgICBzY3JvbGxbJ2ludmlzaWJsZVBhZGRpbmdFbGVtZW50UmVmJ10gPSB7IG5hdGl2ZUVsZW1lbnQ6IG51bGwgfTtcclxuICAgICAgICBzY3JvbGxbJ2dldFNjcm9sbFN0YXJ0UG9zaXRpb24nXSA9ICgpOiBudW1iZXIgPT4gMDtcclxuICAgICAgICBzY3JvbGxbJ2NhbGN1bGF0ZURpbWVuc2lvbnMnXSA9ICgpOiB2b2lkID0+IHt9O1xyXG4gICAgICAgIHNjcm9sbFsncmVmcmVzaF9pbnRlcm5hbCddID0gKCk6IHZvaWQgPT4ge307XHJcbiAgICAgICAgc2Nyb2xsWydlbGVtZW50J10gPSB7IG5hdGl2ZUVsZW1lbnQ6IG51bGwgfTtcclxuICAgICAgICBzY3JvbGxbJ2NvbnRlbnRFbGVtZW50UmVmJ10gPSBudWxsO1xyXG4gICAgICAgIHNjcm9sbFsnX2l0ZW1zJ10gPSBudWxsO1xyXG4gICAgICAgIHNjcm9sbFsnem9uZSddID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlc3Ryb3kkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNjcm9sbCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5Db250ZXh0TWVudShldmVudDogTW91c2VFdmVudCwga2V5OiBzdHJpbmcsIHJvdzogVGFibGVSb3cpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0TWVudVRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9ubHlVblNlbGVjdGVkUm93OiBib29sZWFuID0gdGhpcy5lbmFibGVTZWxlY3Rpb24gJiYgIXRoaXMuY2hlY2tTZWxlY3RlZEl0ZW0ocm93KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RPbmx5VW5TZWxlY3RlZFJvdykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24uc2VsZWN0Um93KHJvdywgZXZlbnQsIHRoaXMuc291cmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5vcGVuQ29udGV4dE1lbnUoZXZlbnQsIGtleSwgcm93KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZURibENsaWNrKHJvdzogVGFibGVSb3csIGtleTogc3RyaW5nLCBldmVudDogTW91c2VFdmVudCwgZW1pdHRlcjogVGFibGVDbGlja0V2ZW50RW1pdHRlcik6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblRhc2tJZGxlKTtcclxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50RW1pdHRlcihyb3csIGtleSwgZXZlbnQsIGVtaXR0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVPbkNsaWNrKHJvdzogVGFibGVSb3csIGtleTogc3RyaW5nLCBldmVudDogTW91c2VFdmVudCwgZW1pdHRlcjogVGFibGVDbGlja0V2ZW50RW1pdHRlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZW5hYmxlU2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25UYXNrSWRsZSA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3RSb3cocm93LCBldmVudCwgdGhpcy5zb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0ZWN0Q2hhbmdlcyh0aGlzLmNkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRFbWl0dGVyKHJvdywga2V5LCBldmVudCwgZW1pdHRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZzQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGRldGVjdENoYW5nZXModGhpcy5jZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnJlbG9hZFRhc2tJZCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkVGFza0lkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGwuaW52YWxpZGF0ZUFsbENhY2hlZE1lYXN1cmVtZW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRldGVjdENoYW5nZXModGhpcy5jZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsLk1BQ1JPX1RJTUUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXZlbnRFbWl0dGVyKHJvdzogVGFibGVSb3csIGtleTogc3RyaW5nLCBldmVudDogTW91c2VFdmVudCwgZW1pdHRlcjogVGFibGVDbGlja0V2ZW50RW1pdHRlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbWl0dGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQodGhpcy5nZW5lcmF0ZVRhYmxlQ2VsbEluZm8ocm93LCBrZXksIGV2ZW50KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tTZWxlY3RlZEl0ZW0ocm93OiBUYWJsZVJvdyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi5zZWxlY3Rpb25Nb2RlbC5nZXQocm93W3RoaXMucHJpbWFyeUtleV0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==