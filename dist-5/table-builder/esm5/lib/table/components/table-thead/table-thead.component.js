/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TableLineRow } from '../common/table-line-row';
import { SelectionService } from '../../services/selection/selection.service';
import { SortOrderType } from '../../services/sortable/sortable.interfaces';
import { UtilsService } from '../../services/utils/utils.service';
import { FilterableService } from '../../services/filterable/filterable.service';
var TableTheadComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TableTheadComponent, _super);
    function TableTheadComponent(selection, utils, filterable) {
        var _this = _super.call(this, selection, utils) || this;
        _this.selection = selection;
        _this.utils = utils;
        _this.filterable = filterable;
        _this.resize = new EventEmitter();
        _this.sortByKey = new EventEmitter();
        _this.orderType = SortOrderType;
        return _this;
    }
    /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    TableTheadComponent.prototype.openFilter = /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    function (key, event) {
        this.filterable.openFilter(key, event);
    };
    TableTheadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'table-thead',
                    template: "<div\r\n    #parent\r\n    [style.top.px]=\"headerTop\"\r\n    class=\"table-grid__cell table-grid__header-cell\"\r\n    [class.table-grid__cell--custom-cell]=\"columnSchema?.customColumn\"\r\n    [class.table-grid__cell--is-model-cell]=\"columnSchema?.isModel\"\r\n    [class.table-grid__cell--text-bold]=\"columnSchema?.th?.textBold\"\r\n    [class.table-grid__cell--resizable]=\"columnSchema?.resizable\"\r\n    [style.min-height.px]=\"columnSchema?.th?.height || clientRowHeight\"\r\n    [style.max-height.px]=\"columnSchema?.th?.height || clientRowHeight\"\r\n    [ngClass]=\"columnSchema?.th?.class\"\r\n    [ngStyle]=\"columnSchema?.th?.style\"\r\n>\r\n    <div\r\n        #divElement\r\n        [parent]=\"parent\"\r\n        [text-center]=\"true\"\r\n        [overflowTooltip]=\"divElement\"\r\n        class=\"table-grid__cell--content table-grid__header-cell--content\"\r\n        [class.table-grid__cell--content-sortable]=\"columnSchema?.sortable\"\r\n        [class.table-grid__cell--nowrap]=\"columnSchema?.th?.nowrap\"\r\n        (click)=\"columnSchema?.sortable ? sortByKey.emit(columnSchema.key) : null\"\r\n    >\r\n        <ng-template\r\n            [ngIf]=\"columnSchema?.th?.template\"\r\n            [ngTemplateOutlet]=\"columnSchema?.th?.template\"\r\n            [ngIfElse]=\"defaultTh\"\r\n        ></ng-template>\r\n        <ng-template #defaultTh>\r\n            <ng-template [ngIf]=\"!columnSchema?.th?.emptyHead\">\r\n                {{ columnSchema?.th?.headTitle || (columnSchema.key | titlecase) }}\r\n            </ng-template>\r\n        </ng-template>\r\n    </div>\r\n\r\n    <div\r\n        *ngIf=\"columnSchema?.isModel && columnSchema?.sortable\"\r\n        class=\"table-grid__column--sortable\"\r\n        [class.table-grid__column--sortable-active]=\"sortableDefinition[columnSchema.key]\"\r\n        [class.table-grid__column--sortable-asc]=\"sortableDefinition[columnSchema.key] === orderType.ASC\"\r\n        [class.table-grid__column--sortable-desc]=\"sortableDefinition[columnSchema.key] === orderType.DESC\"\r\n        (click)=\"columnSchema?.sortable ? sortByKey.emit(columnSchema.key) : null\"\r\n    >\r\n        <img\r\n            class=\"table-grid-icon--sortable\"\r\n            src='data:image/svg+xml;utf8,<svg id=\"Layer_1\" style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 512 512\" width=\"512px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path d=\"M128.4,189.3L233.4,89c5.8-6,13.7-9,22.4-9c8.7,0,16.5,3,22.4,9l105.4,100.3c12.5,11.9,12.5,31.3,0,43.2  c-12.5,11.9-32.7,11.9-45.2,0L288,184.4v217c0,16.9-14.3,30.6-32,30.6c-17.7,0-32-13.7-32-30.6v-217l-50.4,48.2  c-12.5,11.9-32.7,11.9-45.2,0C115.9,220.6,115.9,201.3,128.4,189.3z\"/></svg>'\r\n            alt=\"sort\"\r\n        />\r\n    </div>\r\n\r\n    <div\r\n        class=\"table-grid__column--filterable\"\r\n        [class.table-grid__column--filterable-active]=\"filterableDefinition[columnSchema.key]\"\r\n        *ngIf=\"columnSchema?.isModel && columnSchema?.filterable\"\r\n        (click)=\"columnSchema?.filterable ? openFilter(columnSchema.key, $event) : null\"\r\n    >\r\n        <svg\r\n            class=\"table-grid-icon--filterable\"\r\n            fill=\"none\"\r\n            height=\"24\"\r\n            stroke=\"#000\"\r\n            stroke-linecap=\"round\"\r\n            stroke-linejoin=\"round\"\r\n            stroke-width=\"2\"\r\n            viewBox=\"0 0 24 24\"\r\n            width=\"24\"\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n        >\r\n            <polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"></polygon>\r\n        </svg>\r\n    </div>\r\n\r\n    <ng-template [ngIf]=\"columnSchema?.isModel && columnSchema?.draggable\">\r\n        <ng-content select=\"[slot=draggable]\"></ng-content>\r\n    </ng-template>\r\n\r\n    <div\r\n        class=\"table-grid__column--resize\"\r\n        *ngIf=\"columnSchema?.isModel && columnSchema?.resizable\"\r\n        (mousedown)=\"resize.emit({ event: $event, key: columnSchema.key })\"\r\n    >\r\n        <div class=\"table-grid__column--resize--line\"></div>\r\n    </div>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    TableTheadComponent.ctorParameters = function () { return [
        { type: SelectionService },
        { type: UtilsService },
        { type: FilterableService }
    ]; };
    TableTheadComponent.propDecorators = {
        headerTop: [{ type: Input, args: ['header-top',] }],
        sortableDefinition: [{ type: Input, args: ['sortable-definition',] }],
        filterableDefinition: [{ type: Input, args: ['filterable-definition',] }],
        resize: [{ type: Output }],
        sortByKey: [{ type: Output }]
    };
    return TableTheadComponent;
}(TableLineRow));
export { TableTheadComponent };
if (false) {
    /** @type {?} */
    TableTheadComponent.prototype.headerTop;
    /** @type {?} */
    TableTheadComponent.prototype.sortableDefinition;
    /** @type {?} */
    TableTheadComponent.prototype.filterableDefinition;
    /** @type {?} */
    TableTheadComponent.prototype.resize;
    /** @type {?} */
    TableTheadComponent.prototype.sortByKey;
    /** @type {?} */
    TableTheadComponent.prototype.orderType;
    /** @type {?} */
    TableTheadComponent.prototype.selection;
    /**
     * @type {?}
     * @protected
     */
    TableTheadComponent.prototype.utils;
    /**
     * @type {?}
     * @protected
     */
    TableTheadComponent.prototype.filterable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdGhlYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb21wb25lbnRzL3RhYmxlLXRoZWFkL3RhYmxlLXRoZWFkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFakY7SUFNeUMsK0NBQVk7SUFRakQsNkJBQ29CLFNBQTJCLEVBQ3hCLEtBQW1CLEVBQ25CLFVBQTZCO1FBSHBELFlBS0ksa0JBQU0sU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUMxQjtRQUxtQixlQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUN4QixXQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLGdCQUFVLEdBQVYsVUFBVSxDQUFtQjtRQVBuQyxZQUFNLEdBQThCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsZUFBUyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9ELGVBQVMsR0FBeUIsYUFBYSxDQUFDOztJQVF2RCxDQUFDOzs7Ozs7SUFFTSx3Q0FBVTs7Ozs7SUFBakIsVUFBa0IsR0FBVyxFQUFFLEtBQWlCO1FBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDOztnQkF4QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixzbklBQTJDO29CQUMzQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOzs7O2dCQVhRLGdCQUFnQjtnQkFHaEIsWUFBWTtnQkFDWixpQkFBaUI7Ozs0QkFTckIsS0FBSyxTQUFDLFlBQVk7cUNBQ2xCLEtBQUssU0FBQyxxQkFBcUI7dUNBQzNCLEtBQUssU0FBQyx1QkFBdUI7eUJBQzdCLE1BQU07NEJBQ04sTUFBTTs7SUFjWCwwQkFBQztDQUFBLEFBekJELENBTXlDLFlBQVksR0FtQnBEO1NBbkJZLG1CQUFtQjs7O0lBQzVCLHdDQUE4Qzs7SUFDOUMsaURBQStFOztJQUMvRSxtREFBNEU7O0lBQzVFLHFDQUF3RTs7SUFDeEUsd0NBQXNFOztJQUN0RSx3Q0FBdUQ7O0lBR25ELHdDQUEyQzs7Ozs7SUFDM0Msb0NBQXNDOzs7OztJQUN0Qyx5Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRhYmxlTGluZVJvdyB9IGZyb20gJy4uL2NvbW1vbi90YWJsZS1saW5lLXJvdyc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBLZXlNYXAsIFJlc2l6ZUV2ZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgU29ydE9yZGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3NvcnRhYmxlL3NvcnRhYmxlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsdGVyYWJsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maWx0ZXJhYmxlL2ZpbHRlcmFibGUuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGFibGUtdGhlYWQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLXRoZWFkLmNvbXBvbmVudC5odG1sJyxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVUaGVhZENvbXBvbmVudCBleHRlbmRzIFRhYmxlTGluZVJvdyB7XHJcbiAgICBASW5wdXQoJ2hlYWRlci10b3AnKSBwdWJsaWMgaGVhZGVyVG9wOiBudW1iZXI7XHJcbiAgICBASW5wdXQoJ3NvcnRhYmxlLWRlZmluaXRpb24nKSBwdWJsaWMgc29ydGFibGVEZWZpbml0aW9uOiBLZXlNYXA8U29ydE9yZGVyVHlwZT47XHJcbiAgICBASW5wdXQoJ2ZpbHRlcmFibGUtZGVmaW5pdGlvbicpIHB1YmxpYyBmaWx0ZXJhYmxlRGVmaW5pdGlvbjogS2V5TWFwPHN0cmluZz47XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIHJlc2l6ZTogRXZlbnRFbWl0dGVyPFJlc2l6ZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgc29ydEJ5S2V5OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHB1YmxpYyBvcmRlclR5cGU6IHR5cGVvZiBTb3J0T3JkZXJUeXBlID0gU29ydE9yZGVyVHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0aW9uOiBTZWxlY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSB1dGlsczogVXRpbHNTZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBmaWx0ZXJhYmxlOiBGaWx0ZXJhYmxlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoc2VsZWN0aW9uLCB1dGlscyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5GaWx0ZXIoa2V5OiBzdHJpbmcsIGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJhYmxlLm9wZW5GaWx0ZXIoa2V5LCBldmVudCk7XHJcbiAgICB9XHJcbn1cclxuIl19