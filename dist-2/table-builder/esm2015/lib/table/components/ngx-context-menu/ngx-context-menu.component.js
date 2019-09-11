/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ModalViewLayer } from '../common/modal-view-layer';
// @dynamic
export class NgxContextMenuComponent extends ModalViewLayer {
    /**
     * @param {?} contextMenu
     * @param {?} cd
     * @param {?} app
     * @param {?} utils
     * @param {?} ngZone
     */
    constructor(contextMenu, cd, app, utils, ngZone) {
        super(cd, app, utils, ngZone);
        this.contextMenu = contextMenu;
        this.cd = cd;
        this.app = app;
        this.utils = utils;
        this.ngZone = ngZone;
        this.width = 300;
        this.height = 300;
        this.maxHeight = 400;
        this.closeTime = 0;
    }
    /**
     * @return {?}
     */
    get state() {
        return this.contextMenu.state;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.contextMenu.events.subscribe((/**
         * @return {?}
         */
        () => this.update()));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    close(event) {
        this.contextMenu.close();
        event.preventDefault();
    }
}
NgxContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-context-menu',
                template: "<div class=\"table-grid__context-menu\" *ngIf=\"state?.opened\">\r\n    <div\r\n        #targetElement\r\n        class=\"context-menu\"\r\n        (contextmenu)=\"close($event)\"\r\n        [ngStyle]=\"{\r\n            'width.px': width,\r\n            'min-height.px': height,\r\n            'max-height.px': maxHeight,\r\n            'top.px': state?.position?.top - overflowY,\r\n            'left.px': state?.position?.left - overflowX,\r\n            visibility: state?.position ? 'visible' : 'hidden'\r\n        }\"\r\n    >\r\n        <ng-content></ng-content>\r\n    </div>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["@-webkit-keyframes delayedShow{to{visibility:visible}}@keyframes delayedShow{to{visibility:visible}}.table-grid__context-menu .context-menu{display:flex;position:fixed;background:#fff;z-index:100000000;border:1px solid #dcdcdc;box-shadow:1px 1px 2px #9c9c9c;flex-direction:column}.table-grid__context-menu .context-menu__item{margin-top:0;height:48px;line-height:16px;font-size:14px;font-weight:500;display:flex;flex-flow:row;box-sizing:border-box;padding:0 16px 0 23px;align-items:center;justify-content:space-between}.table-grid__context-menu .context-menu__item .content{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:left}.table-grid__context-menu .context-menu__item .content.align-center{text-align:center}.table-grid__context-menu .context-menu__item:not(.context-menu__title):hover{cursor:pointer;background:rgba(0,0,0,.04)}.table-grid__context-menu .context-menu__item ngx-menu-content:not(.icon-place){overflow:hidden;min-width:35px;text-align:center}.table-grid__context-menu .context-menu__item ngx-menu-content:not(.icon-place):not(.content-phrase){margin:auto auto auto 10px}.table-grid__context-menu .context-menu__item--disable{opacity:.5;pointer-events:none}.table-grid__context-menu .context-menu__item:hover>.context-menu__sub-menu-place>.sub-menu__tree{visibility:visible;transition-delay:.3s;opacity:1}.table-grid__context-menu .context-menu .sub-menu__tree--content{max-height:350px;overflow:auto}.table-grid__context-menu .context-menu__sub-menu-place{margin-left:auto;line-height:15px}.table-grid__context-menu .context-menu__sub-menu-place .sub-menu__tree{opacity:0;visibility:hidden;position:fixed;background:#fff;z-index:100000;border:1px solid #dcdcdc;box-shadow:2px 1px 1px #9c9c9c;transition:visibility .1s linear,opacity .1s linear}.table-grid__context-menu .context-menu__sub-menu-place .sub-menu__arrow-icon{height:25px;width:25px;margin-right:15px}.table-grid__context-menu .context-menu .context-menu__sub-hidden{display:none}.table-grid__context-menu .context-menu__icon-place{width:25px;margin-right:5px}.table-grid__context-menu .context-menu__icon-place img{max-width:25px;max-height:25px}.table-grid__context-menu .context-menu__title{color:rgba(0,0,0,.54)}.table-grid__context-menu .context-menu__divider{display:block;margin:0;border-top:1px solid rgba(0,0,0,.12)}"]
            }] }
];
/** @nocollapse */
NgxContextMenuComponent.ctorParameters = () => [
    { type: ContextMenuService },
    { type: ChangeDetectorRef },
    { type: ApplicationRef },
    { type: UtilsService },
    { type: NgZone }
];
NgxContextMenuComponent.propDecorators = {
    width: [{ type: Input }],
    height: [{ type: Input }],
    maxHeight: [{ type: Input, args: ['max-height',] }],
    targetElement: [{ type: ViewChild, args: ['targetElement', { static: false },] }]
};
if (false) {
    /** @type {?} */
    NgxContextMenuComponent.prototype.width;
    /** @type {?} */
    NgxContextMenuComponent.prototype.height;
    /** @type {?} */
    NgxContextMenuComponent.prototype.maxHeight;
    /** @type {?} */
    NgxContextMenuComponent.prototype.closeTime;
    /**
     * @type {?}
     * @protected
     */
    NgxContextMenuComponent.prototype.targetElement;
    /**
     * @type {?}
     * @private
     */
    NgxContextMenuComponent.prototype.contextMenu;
    /**
     * @type {?}
     * @protected
     */
    NgxContextMenuComponent.prototype.cd;
    /**
     * @type {?}
     * @protected
     */
    NgxContextMenuComponent.prototype.app;
    /**
     * @type {?}
     * @protected
     */
    NgxContextMenuComponent.prototype.utils;
    /**
     * @type {?}
     * @protected
     */
    NgxContextMenuComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbnRleHQtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvbmd4LWNvbnRleHQtbWVudS9uZ3gtY29udGV4dC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILGNBQWMsRUFDZCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBRXRGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBVTVELE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxjQUFnQzs7Ozs7Ozs7SUFTekUsWUFDcUIsV0FBK0IsRUFDN0IsRUFBcUIsRUFDckIsR0FBbUIsRUFDbkIsS0FBbUIsRUFDbkIsTUFBYztRQUVqQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFOYixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDN0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBYnJCLFVBQUssR0FBVyxHQUFHLENBQUM7UUFDcEIsV0FBTSxHQUFXLEdBQUcsQ0FBQztRQUNULGNBQVMsR0FBVyxHQUFHLENBQUM7UUFDN0MsY0FBUyxHQUFXLENBQUMsQ0FBQztJQWE3QixDQUFDOzs7O0lBRUQsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUNsQyxDQUFDOzs7O0lBRU0sUUFBUTtRQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUM7SUFDL0UsQ0FBQzs7Ozs7SUFFTSxLQUFLLENBQUMsS0FBaUI7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBckNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixnbUJBQWdEO2dCQUVoRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBWlEsa0JBQWtCO1lBVnZCLGlCQUFpQjtZQUZqQixjQUFjO1lBY1QsWUFBWTtZQVJqQixNQUFNOzs7b0JBb0JMLEtBQUs7cUJBQ0wsS0FBSzt3QkFDTCxLQUFLLFNBQUMsWUFBWTs0QkFHbEIsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Ozs7SUFMN0Msd0NBQW9DOztJQUNwQyx5Q0FBcUM7O0lBQ3JDLDRDQUFvRDs7SUFDcEQsNENBQTZCOzs7OztJQUU3QixnREFDb0Q7Ozs7O0lBR2hELDhDQUFnRDs7Ozs7SUFDaEQscUNBQXdDOzs7OztJQUN4QyxzQ0FBc0M7Ozs7O0lBQ3RDLHdDQUFzQzs7Ozs7SUFDdEMseUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBcHBsaWNhdGlvblJlZixcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25Jbml0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRleHRNZW51U3RhdGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmludGVyZmFjZSc7XG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGFsVmlld0xheWVyIH0gZnJvbSAnLi4vY29tbW9uL21vZGFsLXZpZXctbGF5ZXInO1xuXG4vLyBAZHluYW1pY1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtY29udGV4dC1tZW51JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LWNvbnRleHQtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LWNvbnRleHQtbWVudS5jb21wb25lbnQuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTmd4Q29udGV4dE1lbnVDb21wb25lbnQgZXh0ZW5kcyBNb2RhbFZpZXdMYXllcjxDb250ZXh0TWVudVN0YXRlPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIHdpZHRoOiBudW1iZXIgPSAzMDA7XG4gICAgQElucHV0KCkgcHVibGljIGhlaWdodDogbnVtYmVyID0gMzAwO1xuICAgIEBJbnB1dCgnbWF4LWhlaWdodCcpIHB1YmxpYyBtYXhIZWlnaHQ6IG51bWJlciA9IDQwMDtcbiAgICBwdWJsaWMgY2xvc2VUaW1lOiBudW1iZXIgPSAwO1xuXG4gICAgQFZpZXdDaGlsZCgndGFyZ2V0RWxlbWVudCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICAgIHByb3RlY3RlZCB0YXJnZXRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRleHRNZW51OiBDb250ZXh0TWVudVNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSBhcHA6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdXRpbHM6IFV0aWxzU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGNkLCBhcHAsIHV0aWxzLCBuZ1pvbmUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdGUoKTogUGFydGlhbDxDb250ZXh0TWVudVN0YXRlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHRNZW51LnN0YXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNvbnRleHRNZW51LmV2ZW50cy5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb3NlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuY2xvc2UoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG4iXX0=