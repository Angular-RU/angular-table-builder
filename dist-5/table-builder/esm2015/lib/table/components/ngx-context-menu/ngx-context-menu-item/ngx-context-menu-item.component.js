/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContextMenuService } from '../../../services/context-menu/context-menu.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { detectChanges } from '../../../operators/detect-changes';
export class NgxContextMenuItemComponent {
    /**
     * @param {?} contextMenu
     * @param {?} cd
     * @param {?} utils
     * @param {?} ngZone
     */
    constructor(contextMenu, cd, utils, ngZone) {
        this.contextMenu = contextMenu;
        this.cd = cd;
        this.utils = utils;
        this.ngZone = ngZone;
        this.visible = true;
        this.contextTitle = null;
        this.disable = false;
        this.divider = false;
        this.disableSubMenu = false;
        this.subMenuWidth = 300;
        this.onClick = new EventEmitter();
        this.offsetX = null;
        this.offsetY = null;
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
    get clientRect() {
        return (this.itemElement.getBoundingClientRect && this.itemElement.getBoundingClientRect()) || {};
    }
    /**
     * @private
     * @return {?}
     */
    get itemElement() {
        return (this.itemRef && this.itemRef.nativeElement) || {};
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.contextMenu.events.subscribe((/**
         * @return {?}
         */
        () => detectChanges(this.cd)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.itemRef = null;
        this.subscription.unsubscribe();
    }
    /**
     * @param {?} ref
     * @return {?}
     */
    calculateSubMenuPosition(ref) {
        /** @type {?} */
        const contentExist = ref.innerHTML.trim().length !== 0;
        if (contentExist) {
            this.offsetX = this.clientRect.left + this.subMenuWidth - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetX = this.offsetX - this.overflowX();
            this.offsetY = this.clientRect.top - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetY = this.offsetY - this.overflowY(ref);
        }
    }
    /**
     * @return {?}
     */
    overflowX() {
        /** @type {?} */
        const overflowX = this.subMenuWidth + this.offsetX - this.utils.bodyRect.width;
        return overflowX > 0 ? overflowX + UtilsService.SCROLLBAR_WIDTH : 0;
    }
    /**
     * @param {?} ref
     * @return {?}
     */
    overflowY(ref) {
        /** @type {?} */
        const overflowY = ref.offsetHeight + this.offsetY - this.utils.bodyRect.height;
        return overflowY > 0 ? overflowY + UtilsService.SCROLLBAR_WIDTH : 0;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    emitClick(event) {
        if (!this.disable) {
            this.deferCloseMenu();
            this.onClick.emit({
                preventDefault: (/**
                 * @return {?}
                 */
                () => {
                    window.clearTimeout(this.taskId);
                })
            });
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @return {?}
     */
    deferCloseMenu() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.taskId = window.setTimeout((/**
             * @return {?}
             */
            () => {
                this.contextMenu.close();
            }));
        }));
    }
}
NgxContextMenuItemComponent.MIN_PADDING = 25;
NgxContextMenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-context-menu-item',
                template: "<ng-template [ngIf]=\"visible\">\n    <div\n        #item\n        class=\"context-menu__item\"\n        (mouseenter)=\"calculateSubMenuPosition(ref)\"\n        [class.context-menu__title]=\"contextTitle !== null\"\n        [class.context-menu__item--disable]=\"disable\"\n        (click)=\"emitClick($event)\"\n    >\n        <ng-content select=\"ngx-menu-content\"></ng-content>\n\n        <div\n            class=\"context-menu__sub-menu-place\"\n            [class.context-menu__sub-hidden]=\"ref.innerHTML.trim().length === 0 || disableSubMenu !== false\"\n        >\n            <img\n                class=\"sub-menu__arrow-icon\"\n                src='data:image/svg+xml;utf8,<svg height=\"48\" viewBox=\"0 0 48 48\" width=\"48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z\"/><path d=\"M0-.25h48v48h-48z\" fill=\"none\"/></svg>'\n                alt=\"arrow\"\n            />\n\n            <div\n                class=\"sub-menu__tree\"\n                [style.width.px]=\"subMenuWidth\"\n                [style.left.px]=\"offsetX\"\n                [style.top.px]=\"offsetY\"\n            >\n                <div class=\"sub-menu__tree--content\" #ref>\n                    <ng-content select=\"ngx-context-menu-item\"></ng-content>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <ng-template [ngIf]=\"divider !== false\">\n        <ngx-context-menu-divider></ngx-context-menu-divider>\n    </ng-template>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
NgxContextMenuItemComponent.ctorParameters = () => [
    { type: ContextMenuService },
    { type: ChangeDetectorRef },
    { type: UtilsService },
    { type: NgZone }
];
NgxContextMenuItemComponent.propDecorators = {
    visible: [{ type: Input }],
    contextTitle: [{ type: Input }],
    disable: [{ type: Input }],
    divider: [{ type: Input }],
    disableSubMenu: [{ type: Input, args: ['disable-sub-menu',] }],
    subMenuWidth: [{ type: Input, args: ['sub-menu-width',] }],
    onClick: [{ type: Output }],
    itemRef: [{ type: ViewChild, args: ['item', { static: false },] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxContextMenuItemComponent.MIN_PADDING;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.visible;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.contextTitle;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.disable;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.divider;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.disableSubMenu;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.subMenuWidth;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.onClick;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.itemRef;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.offsetX;
    /** @type {?} */
    NgxContextMenuItemComponent.prototype.offsetY;
    /**
     * @type {?}
     * @private
     */
    NgxContextMenuItemComponent.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    NgxContextMenuItemComponent.prototype.taskId;
    /**
     * @type {?}
     * @private
     */
    NgxContextMenuItemComponent.prototype.contextMenu;
    /**
     * @type {?}
     * @private
     */
    NgxContextMenuItemComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    NgxContextMenuItemComponent.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    NgxContextMenuItemComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbnRleHQtbWVudS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29tcG9uZW50cy9uZ3gtY29udGV4dC1tZW51L25neC1jb250ZXh0LW1lbnUtaXRlbS9uZ3gtY29udGV4dC1tZW51LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBR3pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFRbEUsTUFBTSxPQUFPLDJCQUEyQjs7Ozs7OztJQWVwQyxZQUNxQixXQUErQixFQUMvQixFQUFxQixFQUNyQixLQUFtQixFQUNuQixNQUFjO1FBSGQsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWpCbkIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDUCxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNsQyxpQkFBWSxHQUFXLEdBQUcsQ0FBQztRQUMxQyxZQUFPLEdBQW1DLElBQUksWUFBWSxFQUFFLENBQUM7UUFF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Q2xCLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCOzs7UUFBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzdCLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOztBQW5GdUIsdUNBQVcsR0FBVyxFQUFFLENBQUM7O1lBUHBELFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxpZ0RBQXFEO2dCQUNyRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozs7WUFaUSxrQkFBa0I7WUFadkIsaUJBQWlCO1lBZVosWUFBWTtZQVZqQixNQUFNOzs7c0JBc0JMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7NkJBQ0wsS0FBSyxTQUFDLGtCQUFrQjsyQkFDeEIsS0FBSyxTQUFDLGdCQUFnQjtzQkFDdEIsTUFBTTtzQkFDTixTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7Ozs7OztJQVJwQyx3Q0FBaUQ7O0lBQ2pELDhDQUF3Qzs7SUFDeEMsbURBQTZDOztJQUM3Qyw4Q0FBeUM7O0lBQ3pDLDhDQUF5Qzs7SUFDekMscURBQWtFOztJQUNsRSxtREFBMkQ7O0lBQzNELDhDQUE4RTs7SUFDOUUsOENBQWlGOztJQUNqRiw4Q0FBOEI7O0lBQzlCLDhDQUE4Qjs7Ozs7SUFDOUIsbURBQW1DOzs7OztJQUNuQyw2Q0FBdUI7Ozs7O0lBR25CLGtEQUFnRDs7Ozs7SUFDaEQseUNBQXNDOzs7OztJQUN0Qyw0Q0FBb0M7Ozs7O0lBQ3BDLDZDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250ZXh0TWVudVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVTdGF0ZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2NvbnRleHQtbWVudS9jb250ZXh0LW1lbnUuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbnRleHRJdGVtRXZlbnQgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRldGVjdENoYW5nZXMgfSBmcm9tICcuLi8uLi8uLi9vcGVyYXRvcnMvZGV0ZWN0LWNoYW5nZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1jb250ZXh0LW1lbnUtaXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1jb250ZXh0LW1lbnUtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hDb250ZXh0TWVudUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUlOX1BBRERJTkc6IG51bWJlciA9IDI1O1xuICAgIEBJbnB1dCgpIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgY29udGV4dFRpdGxlOiBib29sZWFuID0gbnVsbDtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBkaXZpZGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCdkaXNhYmxlLXN1Yi1tZW51JykgcHVibGljIGRpc2FibGVTdWJNZW51OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCdzdWItbWVudS13aWR0aCcpIHB1YmxpYyBzdWJNZW51V2lkdGg6IG51bWJlciA9IDMwMDtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxDb250ZXh0SXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAVmlld0NoaWxkKCdpdGVtJywgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBpdGVtUmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcbiAgICBwdWJsaWMgb2Zmc2V0WDogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgb2Zmc2V0WTogbnVtYmVyID0gbnVsbDtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgdGFza0lkOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjb250ZXh0TWVudTogQ29udGV4dE1lbnVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1dGlsczogVXRpbHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZTogTmdab25lXG4gICAgKSB7fVxuXG4gICAgcHVibGljIGdldCBzdGF0ZSgpOiBQYXJ0aWFsPENvbnRleHRNZW51U3RhdGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dE1lbnUuc3RhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjbGllbnRSZWN0KCk6IFBhcnRpYWw8Q2xpZW50UmVjdCB8IERPTVJlY3Q+IHtcbiAgICAgICAgcmV0dXJuICh0aGlzLml0ZW1FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCAmJiB0aGlzLml0ZW1FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSB8fCB7fTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBpdGVtRWxlbWVudCgpOiBQYXJ0aWFsPEhUTUxEaXZFbGVtZW50PiB7XG4gICAgICAgIHJldHVybiAodGhpcy5pdGVtUmVmICYmIHRoaXMuaXRlbVJlZi5uYXRpdmVFbGVtZW50KSB8fCB7fTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jb250ZXh0TWVudS5ldmVudHMuc3Vic2NyaWJlKCgpID0+IGRldGVjdENoYW5nZXModGhpcy5jZCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtUmVmID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FsY3VsYXRlU3ViTWVudVBvc2l0aW9uKHJlZjogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29udGVudEV4aXN0OiBib29sZWFuID0gcmVmLmlubmVySFRNTC50cmltKCkubGVuZ3RoICE9PSAwO1xuICAgICAgICBpZiAoY29udGVudEV4aXN0KSB7XG4gICAgICAgICAgICB0aGlzLm9mZnNldFggPSB0aGlzLmNsaWVudFJlY3QubGVmdCArIHRoaXMuc3ViTWVudVdpZHRoIC0gTmd4Q29udGV4dE1lbnVJdGVtQ29tcG9uZW50Lk1JTl9QQURESU5HO1xuICAgICAgICAgICAgdGhpcy5vZmZzZXRYID0gdGhpcy5vZmZzZXRYIC0gdGhpcy5vdmVyZmxvd1goKTtcblxuICAgICAgICAgICAgdGhpcy5vZmZzZXRZID0gdGhpcy5jbGllbnRSZWN0LnRvcCAtIE5neENvbnRleHRNZW51SXRlbUNvbXBvbmVudC5NSU5fUEFERElORztcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IHRoaXMub2Zmc2V0WSAtIHRoaXMub3ZlcmZsb3dZKHJlZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb3ZlcmZsb3dYKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG92ZXJmbG93WDogbnVtYmVyID0gdGhpcy5zdWJNZW51V2lkdGggKyB0aGlzLm9mZnNldFggLSB0aGlzLnV0aWxzLmJvZHlSZWN0LndpZHRoO1xuICAgICAgICByZXR1cm4gb3ZlcmZsb3dYID4gMCA/IG92ZXJmbG93WCArIFV0aWxzU2VydmljZS5TQ1JPTExCQVJfV0lEVEggOiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBvdmVyZmxvd1kocmVmOiBIVE1MRGl2RWxlbWVudCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG92ZXJmbG93WTogbnVtYmVyID0gcmVmLm9mZnNldEhlaWdodCArIHRoaXMub2Zmc2V0WSAtIHRoaXMudXRpbHMuYm9keVJlY3QuaGVpZ2h0O1xuICAgICAgICByZXR1cm4gb3ZlcmZsb3dZID4gMCA/IG92ZXJmbG93WSArIFV0aWxzU2VydmljZS5TQ1JPTExCQVJfV0lEVEggOiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbWl0Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmZXJDbG9zZU1lbnUoKTtcblxuICAgICAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoe1xuICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy50YXNrSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVmZXJDbG9zZU1lbnUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGFza0lkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=