/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ContextMenuService } from '../../../services/context-menu/context-menu.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { detectChanges } from '../../../operators/detect-changes';
var NgxContextMenuItemComponent = /** @class */ (function () {
    function NgxContextMenuItemComponent(contextMenu, cd, utils, ngZone) {
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
    Object.defineProperty(NgxContextMenuItemComponent.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this.contextMenu.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxContextMenuItemComponent.prototype, "clientRect", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.itemElement.getBoundingClientRect && this.itemElement.getBoundingClientRect()) || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxContextMenuItemComponent.prototype, "itemElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (this.itemRef && this.itemRef.nativeElement) || {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.contextMenu.events.subscribe((/**
         * @return {?}
         */
        function () { return detectChanges(_this.cd); }));
    };
    /**
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.itemRef = null;
        this.subscription.unsubscribe();
    };
    /**
     * @param {?} ref
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.calculateSubMenuPosition = /**
     * @param {?} ref
     * @return {?}
     */
    function (ref) {
        /** @type {?} */
        var contentExist = ref.innerHTML.trim().length !== 0;
        if (contentExist) {
            this.offsetX = this.clientRect.left + this.subMenuWidth - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetX = this.offsetX - this.overflowX();
            this.offsetY = this.clientRect.top - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetY = this.offsetY - this.overflowY(ref);
        }
    };
    /**
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.overflowX = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overflowX = this.subMenuWidth + this.offsetX - this.utils.bodyRect.width;
        return overflowX > 0 ? overflowX + UtilsService.SCROLLBAR_WIDTH : 0;
    };
    /**
     * @param {?} ref
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.overflowY = /**
     * @param {?} ref
     * @return {?}
     */
    function (ref) {
        /** @type {?} */
        var overflowY = ref.offsetHeight + this.offsetY - this.utils.bodyRect.height;
        return overflowY > 0 ? overflowY + UtilsService.SCROLLBAR_WIDTH : 0;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.emitClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.disable) {
            this.deferCloseMenu();
            this.onClick.emit({
                preventDefault: (/**
                 * @return {?}
                 */
                function () {
                    window.clearTimeout(_this.taskId);
                })
            });
            event.stopPropagation();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxContextMenuItemComponent.prototype.deferCloseMenu = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.taskId = window.setTimeout((/**
             * @return {?}
             */
            function () {
                _this.contextMenu.close();
            }));
        }));
    };
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
    NgxContextMenuItemComponent.ctorParameters = function () { return [
        { type: ContextMenuService },
        { type: ChangeDetectorRef },
        { type: UtilsService },
        { type: NgZone }
    ]; };
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
    return NgxContextMenuItemComponent;
}());
export { NgxContextMenuItemComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbnRleHQtbWVudS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29tcG9uZW50cy9uZ3gtY29udGV4dC1tZW51L25neC1jb250ZXh0LW1lbnUtaXRlbS9uZ3gtY29udGV4dC1tZW51LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBR3pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFbEU7SUFxQkkscUNBQ3FCLFdBQStCLEVBQy9CLEVBQXFCLEVBQ3JCLEtBQW1CLEVBQ25CLE1BQWM7UUFIZCxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBakJuQixZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUNQLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBQzFDLFlBQU8sR0FBbUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV2RSxZQUFPLEdBQVcsSUFBSSxDQUFD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Ozs7OztJQUduQixrREFBZ0Q7Ozs7O0lBQ2hELHlDQUFzQzs7Ozs7SUFDdEMsNENBQW9DOzs7OztJQUNwQyw2Q0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udGV4dE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRleHRNZW51U3RhdGUgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb250ZXh0SXRlbUV2ZW50IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcbmltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZXRlY3RDaGFuZ2VzIH0gZnJvbSAnLi4vLi4vLi4vb3BlcmF0b3JzL2RldGVjdC1jaGFuZ2VzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtY29udGV4dC1tZW51LWl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtY29udGV4dC1tZW51LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTmd4Q29udGV4dE1lbnVJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1JTl9QQURESU5HOiBudW1iZXIgPSAyNTtcbiAgICBASW5wdXQoKSBwdWJsaWMgdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcHVibGljIGNvbnRleHRUaXRsZTogYm9vbGVhbiA9IG51bGw7XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGl2aWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgnZGlzYWJsZS1zdWItbWVudScpIHB1YmxpYyBkaXNhYmxlU3ViTWVudTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgnc3ViLW1lbnUtd2lkdGgnKSBwdWJsaWMgc3ViTWVudVdpZHRoOiBudW1iZXIgPSAzMDA7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8Q29udGV4dEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQFZpZXdDaGlsZCgnaXRlbScsIHsgc3RhdGljOiBmYWxzZSB9KSBwdWJsaWMgaXRlbVJlZjogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gICAgcHVibGljIG9mZnNldFg6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIG9mZnNldFk6IG51bWJlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHRhc2tJZDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY29udGV4dE1lbnU6IENvbnRleHRNZW51U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdXRpbHM6IFV0aWxzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZVxuICAgICkge31cblxuICAgIHB1YmxpYyBnZXQgc3RhdGUoKTogUGFydGlhbDxDb250ZXh0TWVudVN0YXRlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHRNZW51LnN0YXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY2xpZW50UmVjdCgpOiBQYXJ0aWFsPENsaWVudFJlY3QgfCBET01SZWN0PiB7XG4gICAgICAgIHJldHVybiAodGhpcy5pdGVtRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgdGhpcy5pdGVtRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkgfHwge307XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgaXRlbUVsZW1lbnQoKTogUGFydGlhbDxIVE1MRGl2RWxlbWVudD4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuaXRlbVJlZiAmJiB0aGlzLml0ZW1SZWYubmF0aXZlRWxlbWVudCkgfHwge307XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuY29udGV4dE1lbnUuZXZlbnRzLnN1YnNjcmliZSgoKSA9PiBkZXRlY3RDaGFuZ2VzKHRoaXMuY2QpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbVJlZiA9IG51bGw7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbGN1bGF0ZVN1Yk1lbnVQb3NpdGlvbihyZWY6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRFeGlzdDogYm9vbGVhbiA9IHJlZi5pbm5lckhUTUwudHJpbSgpLmxlbmd0aCAhPT0gMDtcbiAgICAgICAgaWYgKGNvbnRlbnRFeGlzdCkge1xuICAgICAgICAgICAgdGhpcy5vZmZzZXRYID0gdGhpcy5jbGllbnRSZWN0LmxlZnQgKyB0aGlzLnN1Yk1lbnVXaWR0aCAtIE5neENvbnRleHRNZW51SXRlbUNvbXBvbmVudC5NSU5fUEFERElORztcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IHRoaXMub2Zmc2V0WCAtIHRoaXMub3ZlcmZsb3dYKCk7XG5cbiAgICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IHRoaXMuY2xpZW50UmVjdC50b3AgLSBOZ3hDb250ZXh0TWVudUl0ZW1Db21wb25lbnQuTUlOX1BBRERJTkc7XG4gICAgICAgICAgICB0aGlzLm9mZnNldFkgPSB0aGlzLm9mZnNldFkgLSB0aGlzLm92ZXJmbG93WShyZWYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG92ZXJmbG93WCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBvdmVyZmxvd1g6IG51bWJlciA9IHRoaXMuc3ViTWVudVdpZHRoICsgdGhpcy5vZmZzZXRYIC0gdGhpcy51dGlscy5ib2R5UmVjdC53aWR0aDtcbiAgICAgICAgcmV0dXJuIG92ZXJmbG93WCA+IDAgPyBvdmVyZmxvd1ggKyBVdGlsc1NlcnZpY2UuU0NST0xMQkFSX1dJRFRIIDogMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3ZlcmZsb3dZKHJlZjogSFRNTERpdkVsZW1lbnQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBvdmVyZmxvd1k6IG51bWJlciA9IHJlZi5vZmZzZXRIZWlnaHQgKyB0aGlzLm9mZnNldFkgLSB0aGlzLnV0aWxzLmJvZHlSZWN0LmhlaWdodDtcbiAgICAgICAgcmV0dXJuIG92ZXJmbG93WSA+IDAgPyBvdmVyZmxvd1kgKyBVdGlsc1NlcnZpY2UuU0NST0xMQkFSX1dJRFRIIDogMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW1pdENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmVyQ2xvc2VNZW51KCk7XG5cbiAgICAgICAgICAgIHRoaXMub25DbGljay5lbWl0KHtcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGFza0lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmVyQ2xvc2VNZW51KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRhc2tJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19