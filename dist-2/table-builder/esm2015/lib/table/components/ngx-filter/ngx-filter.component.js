/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { FilterableService } from '../../services/filterable/filterable.service';
import { ModalViewLayer } from '../common/modal-view-layer';
import { UtilsService } from '../../services/utils/utils.service';
import { NgxFilterDirective } from '../../directives/ngx-filter.directive';
export class NgxFilterComponent extends ModalViewLayer {
    /**
     * @param {?} filterable
     * @param {?} cd
     * @param {?} app
     * @param {?} utils
     * @param {?} ngZone
     */
    constructor(filterable, cd, app, utils, ngZone) {
        super(cd, app, utils, ngZone);
        this.filterable = filterable;
        this.cd = cd;
        this.app = app;
        this.utils = utils;
        this.ngZone = ngZone;
        this.width = 300;
        this.height = null;
        this.maxHeight = null;
        this.closeTime = 150;
        this.leftX = 10;
        this.topY = 50;
    }
    /**
     * @return {?}
     */
    get state() {
        return this.filterable.state;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    close(event) {
        this.filterable.closeFilter();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.filterable.filterOpenEvents.subscribe((/**
         * @return {?}
         */
        () => this.update()));
    }
}
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
NgxFilterComponent.ctorParameters = () => [
    { type: FilterableService },
    { type: ChangeDetectorRef },
    { type: ApplicationRef },
    { type: UtilsService },
    { type: NgZone }
];
NgxFilterComponent.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }],
    maxHeight: [{ type: Input, args: ['max-height',] }],
    filter: [{ type: ContentChild, args: [NgxFilterDirective, { static: false },] }],
    targetElement: [{ type: ViewChild, args: ['targetElement', { static: false },] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvbmd4LWZpbHRlci9uZ3gtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVqRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBUzNFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFnQzs7Ozs7Ozs7SUFjcEUsWUFDcUIsVUFBNkIsRUFDM0IsRUFBcUIsRUFDckIsR0FBbUIsRUFDbkIsS0FBbUIsRUFDbkIsTUFBYztRQUVqQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFOYixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUMzQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixRQUFHLEdBQUgsR0FBRyxDQUFnQjtRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFsQnJCLFVBQUssR0FBVyxHQUFHLENBQUM7UUFDcEIsV0FBTSxHQUFXLElBQUksQ0FBQztRQUNWLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFDOUMsY0FBUyxHQUFXLEdBQUcsQ0FBQztRQUNmLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsU0FBSSxHQUFXLEVBQUUsQ0FBQztJQWdCbEMsQ0FBQzs7OztJQUVELElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFTSxLQUFLLENBQUMsS0FBaUI7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUM7SUFDeEYsQ0FBQzs7O1lBMUNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsaXBCQUEwQztnQkFFMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7OztZQVpRLGlCQUFpQjtZQVZ0QixpQkFBaUI7WUFGakIsY0FBYztZQWVULFlBQVk7WUFSakIsTUFBTTs7O29CQW1CTCxLQUFLO3FCQUNMLEtBQUs7d0JBQ0wsS0FBSyxTQUFDLFlBQVk7cUJBS2xCLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7NEJBR2xELFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzs7O0lBVjdDLG1DQUFvQzs7SUFDcEMsb0NBQXNDOztJQUN0Qyx1Q0FBcUQ7O0lBQ3JELHVDQUErQjs7SUFDL0IsbUNBQW1DOztJQUNuQyxrQ0FBa0M7O0lBRWxDLG9DQUNrQzs7Ozs7SUFFbEMsMkNBQ29EOzs7OztJQUdoRCx3Q0FBOEM7Ozs7O0lBQzlDLGdDQUF3Qzs7Ozs7SUFDeEMsaUNBQXNDOzs7OztJQUN0QyxtQ0FBc0M7Ozs7O0lBQ3RDLG9DQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQXBwbGljYXRpb25SZWYsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkluaXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyYWJsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maWx0ZXJhYmxlL2ZpbHRlcmFibGUuc2VydmljZSc7XG5pbXBvcnQgeyBGaWx0ZXJTdGF0ZUV2ZW50IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNb2RhbFZpZXdMYXllciB9IGZyb20gJy4uL2NvbW1vbi9tb2RhbC12aWV3LWxheWVyJztcbmltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmd4RmlsdGVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9uZ3gtZmlsdGVyLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWZpbHRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC1maWx0ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbHRlckNvbXBvbmVudCBleHRlbmRzIE1vZGFsVmlld0xheWVyPEZpbHRlclN0YXRlRXZlbnQ+IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBwdWJsaWMgd2lkdGg6IG51bWJlciA9IDMwMDtcbiAgICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBudW1iZXIgPSBudWxsO1xuICAgIEBJbnB1dCgnbWF4LWhlaWdodCcpIHB1YmxpYyBtYXhIZWlnaHQ6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIGNsb3NlVGltZTogbnVtYmVyID0gMTUwO1xuICAgIHB1YmxpYyByZWFkb25seSBsZWZ0WDogbnVtYmVyID0gMTA7XG4gICAgcHVibGljIHJlYWRvbmx5IHRvcFk6IG51bWJlciA9IDUwO1xuXG4gICAgQENvbnRlbnRDaGlsZChOZ3hGaWx0ZXJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxuICAgIHB1YmxpYyBmaWx0ZXI6IE5neEZpbHRlckRpcmVjdGl2ZTtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhcmdldEVsZW1lbnQnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBmaWx0ZXJhYmxlOiBGaWx0ZXJhYmxlU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IGFwcDogQXBwbGljYXRpb25SZWYsXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSB1dGlsczogVXRpbHNTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmVcbiAgICApIHtcbiAgICAgICAgc3VwZXIoY2QsIGFwcCwgdXRpbHMsIG5nWm9uZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdGF0ZSgpOiBQYXJ0aWFsPEZpbHRlclN0YXRlRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyYWJsZS5zdGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWx0ZXJhYmxlLmNsb3NlRmlsdGVyKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyYWJsZS5maWx0ZXJPcGVuRXZlbnRzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcbiAgICB9XG59XG4iXX0=