/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, ViewEncapsulation } from '@angular/core';
import { SelectionService } from '../../services/selection/selection.service';
import { ImplicitContext } from '../../interfaces/table-builder.external';
import { TableLineRow } from '../common/table-line-row';
import { UtilsService } from '../../services/utils/utils.service';
import { detectChanges } from '../../operators/detect-changes';
var TableCellComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TableCellComponent, _super);
    function TableCellComponent(cd, selection, utils, ngZone) {
        var _this = _super.call(this, selection, utils) || this;
        _this.cd = cd;
        _this.selection = selection;
        _this.utils = utils;
        _this.ngZone = ngZone;
        _this.contextType = ImplicitContext;
        _this.cd.reattach();
        return _this;
    }
    /**
     * @return {?}
     */
    TableCellComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isRendered) {
            this.loaded = true;
        }
        else {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.taskId = window.setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.loaded = true;
                    detectChanges(_this.cd);
                }), _this.index);
            }));
        }
    };
    /**
     * @return {?}
     */
    TableCellComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        window.clearTimeout(this.taskId);
    };
    TableCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'table-cell',
                    template: "<div #divElement class=\"table-grid__cell--inner-content\" [overflowTooltip]=\"divElement\" [parent]=\"parent\" [class.loaded]=\"loaded\">\r\n    <ng-template [ngIf]=\"columnSchema?.td?.template\" [ngIfElse]=\"defaultTd\">\r\n        <ng-template\r\n            [ngTemplateOutlet]=\"columnSchema?.td?.template\"\r\n            [ngTemplateOutletContext]=\"{\r\n                $implicit:\r\n                    columnSchema?.td?.context === contextType.CELL\r\n                        ? columnSchema?.td?.useDeepPath\r\n                            ? (item | deepPath: columnSchema.key)\r\n                            : (item | defaultValue: columnSchema.key)\r\n                        : item\r\n            }\"\r\n        ></ng-template>\r\n    </ng-template>\r\n    <ng-template #defaultTd>\r\n        <ng-template [ngIf]=\"isFilterable\" [ngIfElse]=\"simple\">\r\n            <ngx-filter-viewer\r\n                [index]=\"index\"\r\n                [key]=\"columnSchema.key\"\r\n                [text]=\"\r\n                    columnSchema?.td?.useDeepPath\r\n                        ? (item | deepPath: columnSchema.key)\r\n                        : (item | defaultValue: columnSchema.key)\r\n                \"\r\n            ></ngx-filter-viewer>\r\n        </ng-template>\r\n        <ng-template #simple>{{\r\n            columnSchema?.td?.useDeepPath\r\n                ? (item | deepPath: columnSchema.key)\r\n                : (item | defaultValue: columnSchema.key)\r\n        }}</ng-template>\r\n    </ng-template>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    TableCellComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: SelectionService },
        { type: UtilsService },
        { type: NgZone }
    ]; };
    TableCellComponent.propDecorators = {
        item: [{ type: Input }],
        index: [{ type: Input }],
        parent: [{ type: Input }],
        isFilterable: [{ type: Input, args: ['is-filterable',] }]
    };
    return TableCellComponent;
}(TableLineRow));
export { TableCellComponent };
if (false) {
    /** @type {?} */
    TableCellComponent.prototype.item;
    /** @type {?} */
    TableCellComponent.prototype.index;
    /** @type {?} */
    TableCellComponent.prototype.parent;
    /** @type {?} */
    TableCellComponent.prototype.isFilterable;
    /** @type {?} */
    TableCellComponent.prototype.loaded;
    /**
     * @type {?}
     * @private
     */
    TableCellComponent.prototype.taskId;
    /** @type {?} */
    TableCellComponent.prototype.contextType;
    /** @type {?} */
    TableCellComponent.prototype.cd;
    /** @type {?} */
    TableCellComponent.prototype.selection;
    /**
     * @type {?}
     * @protected
     */
    TableCellComponent.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    TableCellComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvdGFibGUtY2VsbC90YWJsZS1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUdOLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFZLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFL0Q7SUFNd0MsOENBQVk7SUFVaEQsNEJBQ29CLEVBQXFCLEVBQ3JCLFNBQTJCLEVBQ3hCLEtBQW1CLEVBQ3JCLE1BQWM7UUFKbkMsWUFNSSxrQkFBTSxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBRTFCO1FBUG1CLFFBQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLGVBQVMsR0FBVCxTQUFTLENBQWtCO1FBQ3hCLFdBQUssR0FBTCxLQUFLLENBQWM7UUFDckIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQU41QixpQkFBVyxHQUEyQixlQUFlLENBQUM7UUFTekQsS0FBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7SUFDdkIsQ0FBQzs7OztJQUVNLHFDQUFROzs7SUFBZjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQjs7O1lBQUM7Z0JBQzFCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVU7OztnQkFBQztvQkFDNUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ25CLGFBQWEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNCLENBQUMsR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7SUFFTSx3Q0FBVzs7O0lBQWxCO1FBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Z0JBekNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsa2hEQUEwQztvQkFDMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7OztnQkFwQkcsaUJBQWlCO2dCQVNaLGdCQUFnQjtnQkFHaEIsWUFBWTtnQkFUakIsTUFBTTs7O3VCQW1CTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzsrQkFDTCxLQUFLLFNBQUMsZUFBZTs7SUFnQzFCLHlCQUFDO0NBQUEsQUExQ0QsQ0FNd0MsWUFBWSxHQW9DbkQ7U0FwQ1ksa0JBQWtCOzs7SUFDM0Isa0NBQStCOztJQUMvQixtQ0FBOEI7O0lBQzlCLG9DQUF1Qzs7SUFDdkMsMENBQXFEOztJQUVyRCxvQ0FBdUI7Ozs7O0lBQ3ZCLG9DQUF1Qjs7SUFDdkIseUNBQTZEOztJQUd6RCxnQ0FBcUM7O0lBQ3JDLHVDQUEyQzs7Ozs7SUFDM0MsbUNBQXNDOzs7OztJQUN0QyxvQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LFxyXG4gICAgTmdab25lLFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbXBsaWNpdENvbnRleHQsIFRhYmxlUm93IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuaW1wb3J0IHsgVGFibGVMaW5lUm93IH0gZnJvbSAnLi4vY29tbW9uL3RhYmxlLWxpbmUtcm93JztcclxuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XHJcbmltcG9ydCB7IGRldGVjdENoYW5nZXMgfSBmcm9tICcuLi8uLi9vcGVyYXRvcnMvZGV0ZWN0LWNoYW5nZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RhYmxlLWNlbGwnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLWNlbGwuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUNlbGxDb21wb25lbnQgZXh0ZW5kcyBUYWJsZUxpbmVSb3cgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbTogVGFibGVSb3c7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaW5kZXg6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgQElucHV0KCdpcy1maWx0ZXJhYmxlJykgcHVibGljIGlzRmlsdGVyYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgbG9hZGVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSB0YXNrSWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb250ZXh0VHlwZTogdHlwZW9mIEltcGxpY2l0Q29udGV4dCA9IEltcGxpY2l0Q29udGV4dDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBzZWxlY3Rpb246IFNlbGVjdGlvblNlcnZpY2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHV0aWxzOiBVdGlsc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZVxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoc2VsZWN0aW9uLCB1dGlscyk7XHJcbiAgICAgICAgdGhpcy5jZC5yZWF0dGFjaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0ZWN0Q2hhbmdlcyh0aGlzLmNkKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy50YXNrSWQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==