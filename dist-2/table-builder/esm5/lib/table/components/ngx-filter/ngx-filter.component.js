/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { FilterableService } from '../../services/filterable/filterable.service';
import { ModalViewLayer } from '../common/modal-view-layer';
import { UtilsService } from '../../services/utils/utils.service';
import { NgxFilterDirective } from '../../directives/ngx-filter.directive';
var NgxFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NgxFilterComponent, _super);
    function NgxFilterComponent(filterable, cd, app, utils, ngZone) {
        var _this = _super.call(this, cd, app, utils, ngZone) || this;
        _this.filterable = filterable;
        _this.cd = cd;
        _this.app = app;
        _this.utils = utils;
        _this.ngZone = ngZone;
        _this.width = 300;
        _this.height = null;
        _this.maxHeight = null;
        _this.closeTime = 150;
        _this.leftX = 10;
        _this.topY = 50;
        return _this;
    }
    Object.defineProperty(NgxFilterComponent.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this.filterable.state;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NgxFilterComponent.prototype.close = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.filterable.closeFilter();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    NgxFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.filterable.filterOpenEvents.subscribe((/**
         * @return {?}
         */
        function () { return _this.update(); }));
    };
    NgxFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-filter',
                    template: "<div class=\"table-grid__filter-menu\" *ngIf=\"state.opened\">\n    <div\n        #targetElement\n        class=\"filter-menu\"\n        (contextmenu)=\"close($event)\"\n        [ngStyle]=\"{\n            'width.px': width,\n            'min-height.px': height,\n            'max-height.px': maxHeight,\n            'top.px': state?.position?.top + leftX - overflowY,\n            'left.px': state?.position?.left - topY - overflowX,\n            visibility: state?.position ? 'visible' : 'hidden'\n        }\"\n    >\n        <ng-template [ngIf]=\"isViewed\">\n            <ng-content></ng-content>\n        </ng-template>\n    </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".table-grid__filter-menu .filter-menu{display:flex;position:fixed;background:#fff;z-index:100000000;border:1px solid #dcdcdc;box-shadow:1px 1px 2px #9c9c9c;flex-direction:column}"]
                }] }
    ];
    /** @nocollapse */
    NgxFilterComponent.ctorParameters = function () { return [
        { type: FilterableService },
        { type: ChangeDetectorRef },
        { type: ApplicationRef },
        { type: UtilsService },
        { type: NgZone }
    ]; };
    NgxFilterComponent.propDecorators = {
        width: [{ type: Input }],
        height: [{ type: Input }],
        maxHeight: [{ type: Input, args: ['max-height',] }],
        filter: [{ type: ContentChild, args: [NgxFilterDirective, { static: false },] }],
        targetElement: [{ type: ViewChild, args: ['targetElement', { static: false },] }]
    };
    return NgxFilterComponent;
}(ModalViewLayer));
export { NgxFilterComponent };
if (false) {
    /** @type {?} */
    NgxFilterComponent.prototype.width;
    /** @type {?} */
    NgxFilterComponent.prototype.height;
    /** @type {?} */
    NgxFilterComponent.prototype.maxHeight;
    /** @type {?} */
    NgxFilterComponent.prototype.closeTime;
    /** @type {?} */
    NgxFilterComponent.prototype.leftX;
    /** @type {?} */
    NgxFilterComponent.prototype.topY;
    /** @type {?} */
    NgxFilterComponent.prototype.filter;
    /**
     * @type {?}
     * @protected
     */
    NgxFilterComponent.prototype.targetElement;
    /**
     * @type {?}
     * @private
     */
    NgxFilterComponent.prototype.filterable;
    /**
     * @type {?}
     * @protected
     */
    NgxFilterComponent.prototype.cd;
    /**
     * @type {?}
     * @protected
     */
    NgxFilterComponent.prototype.app;
    /**
     * @type {?}
     * @protected
     */
    NgxFilterComponent.prototype.utils;
    /**
     * @type {?}
     * @protected
     */
    NgxFilterComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvbmd4LWZpbHRlci9uZ3gtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxjQUFjLEVBQ2QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFFakYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUUzRTtJQU93Qyw4Q0FBZ0M7SUFjcEUsNEJBQ3FCLFVBQTZCLEVBQzNCLEVBQXFCLEVBQ3JCLEdBQW1CLEVBQ25CLEtBQW1CLEVBQ25CLE1BQWM7UUFMckMsWUFPSSxrQkFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsU0FDaEM7UUFQb0IsZ0JBQVUsR0FBVixVQUFVLENBQW1CO1FBQzNCLFFBQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLFNBQUcsR0FBSCxHQUFHLENBQWdCO1FBQ25CLFdBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQWxCckIsV0FBSyxHQUFXLEdBQUcsQ0FBQztRQUNwQixZQUFNLEdBQVcsSUFBSSxDQUFDO1FBQ1YsZUFBUyxHQUFXLElBQUksQ0FBQztRQUM5QyxlQUFTLEdBQVcsR0FBRyxDQUFDO1FBQ2YsV0FBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixVQUFJLEdBQVcsRUFBRSxDQUFDOztJQWdCbEMsQ0FBQztJQUVELHNCQUFXLHFDQUFLOzs7O1FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTs7Ozs7SUFFTSxrQ0FBSzs7OztJQUFaLFVBQWEsS0FBaUI7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVNLHFDQUFROzs7SUFBZjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVM7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsTUFBTSxFQUFFLEVBQWIsQ0FBYSxFQUFDLENBQUM7SUFDeEYsQ0FBQzs7Z0JBMUNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsaXBCQUEwQztvQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDeEM7Ozs7Z0JBWlEsaUJBQWlCO2dCQVZ0QixpQkFBaUI7Z0JBRmpCLGNBQWM7Z0JBZVQsWUFBWTtnQkFSakIsTUFBTTs7O3dCQW1CTCxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSyxTQUFDLFlBQVk7eUJBS2xCLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0NBR2xELFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOztJQXlCakQseUJBQUM7Q0FBQSxBQTNDRCxDQU93QyxjQUFjLEdBb0NyRDtTQXBDWSxrQkFBa0I7OztJQUMzQixtQ0FBb0M7O0lBQ3BDLG9DQUFzQzs7SUFDdEMsdUNBQXFEOztJQUNyRCx1Q0FBK0I7O0lBQy9CLG1DQUFtQzs7SUFDbkMsa0NBQWtDOztJQUVsQyxvQ0FDa0M7Ozs7O0lBRWxDLDJDQUNvRDs7Ozs7SUFHaEQsd0NBQThDOzs7OztJQUM5QyxnQ0FBd0M7Ozs7O0lBQ3hDLGlDQUFzQzs7Ozs7SUFDdEMsbUNBQXNDOzs7OztJQUN0QyxvQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFwcGxpY2F0aW9uUmVmLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25Jbml0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbHRlcmFibGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyU3RhdGVFdmVudCB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZpbHRlcmFibGUvZmlsdGVyYWJsZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTW9kYWxWaWV3TGF5ZXIgfSBmcm9tICcuLi9jb21tb24vbW9kYWwtdmlldy1sYXllcic7XG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7IE5neEZpbHRlckRpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbmd4LWZpbHRlci5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1maWx0ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtZmlsdGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGaWx0ZXJDb21wb25lbnQgZXh0ZW5kcyBNb2RhbFZpZXdMYXllcjxGaWx0ZXJTdGF0ZUV2ZW50PiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIHdpZHRoOiBudW1iZXIgPSAzMDA7XG4gICAgQElucHV0KCkgcHVibGljIGhlaWdodDogbnVtYmVyID0gbnVsbDtcbiAgICBASW5wdXQoJ21heC1oZWlnaHQnKSBwdWJsaWMgbWF4SGVpZ2h0OiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyBjbG9zZVRpbWU6IG51bWJlciA9IDE1MDtcbiAgICBwdWJsaWMgcmVhZG9ubHkgbGVmdFg6IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyByZWFkb25seSB0b3BZOiBudW1iZXIgPSA1MDtcblxuICAgIEBDb250ZW50Q2hpbGQoTmd4RmlsdGVyRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgICBwdWJsaWMgZmlsdGVyOiBOZ3hGaWx0ZXJEaXJlY3RpdmU7XG5cbiAgICBAVmlld0NoaWxkKCd0YXJnZXRFbGVtZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gICAgcHJvdGVjdGVkIHRhcmdldEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZmlsdGVyYWJsZTogRmlsdGVyYWJsZVNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBhcHA6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdXRpbHM6IFV0aWxzU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGNkLCBhcHAsIHV0aWxzLCBuZ1pvbmUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdGUoKTogUGFydGlhbDxGaWx0ZXJTdGF0ZUV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmFibGUuc3RhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsdGVyYWJsZS5jbG9zZUZpbHRlcigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlcmFibGUuZmlsdGVyT3BlbkV2ZW50cy5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGUoKSk7XG4gICAgfVxufVxuIl19