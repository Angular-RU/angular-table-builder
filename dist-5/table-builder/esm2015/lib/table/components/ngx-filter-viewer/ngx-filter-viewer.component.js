/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { FilterableService } from '../../services/filterable/filterable.service';
import { TableFilterType } from '../../services/filterable/filterable.interface';
import { detectChanges } from '../../operators/detect-changes';
const { TIME_RELOAD } = TableBuilderOptionsImpl;
export class NgxFilterViewerComponent {
    /**
     * @param {?} ngZone
     * @param {?} cd
     * @param {?} sanitizer
     * @param {?} filterable
     */
    constructor(ngZone, cd, sanitizer, filterable) {
        this.ngZone = ngZone;
        this.cd = cd;
        this.sanitizer = sanitizer;
        this.filterable = filterable;
        this.text = null;
        this.key = null;
        this.index = 0;
        this.founded = false;
        this.cd.reattach();
    }
    /**
     * @private
     * @param {?} finder
     * @return {?}
     */
    static wrapSelectedHtml(finder) {
        return `<span style="background-color: #FFFF00; color: #000">${finder}</span>`;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['text'] && changes['text'].firstChange) {
            this.defaultHtmlValue();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription = this.filterable.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.filterable.definition[this.key] || this.filterable.globalFilterValue) {
                this.changeSelection(event);
            }
            else {
                this.defaultHtmlValue();
            }
            detectChanges(this.cd);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    changeSelection(event) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            window.clearInterval(this.taskId);
            this.taskId = window.setTimeout((/**
             * @return {?}
             */
            () => {
                if (event.value || this.filterable.definition[this.key]) {
                    this.selected(event);
                }
                else {
                    this.defaultHtmlValue();
                }
                detectChanges(this.cd);
            }), TIME_RELOAD + this.index);
        }));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    selected(event) {
        /** @type {?} */
        const value = this.filterable.definition[this.key] || event.value;
        /** @type {?} */
        const type = this.filterable.definition[this.key]
            ? this.filterable.filterTypeDefinition[this.key]
            : event.type;
        if (type === TableFilterType.DOES_NOT_EQUAL || type === TableFilterType.DOES_NOT_CONTAIN) {
            return;
        }
        /** @type {?} */
        let regexp;
        /** @type {?} */
        const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (type === TableFilterType.START_WITH) {
            regexp = new RegExp(`^${escapedValue}`, 'i');
        }
        else if (type === TableFilterType.END_WITH) {
            regexp = new RegExp(`${escapedValue}$`, 'i');
        }
        else if (type === TableFilterType.EQUALS) {
            regexp = new RegExp(`^${escapedValue}$`, 'i');
        }
        else {
            regexp = new RegExp(`${escapedValue}`, 'ig');
        }
        /** @type {?} */
        const trustedHtml = String(this.text).replace(regexp, (/**
         * @param {?} finder
         * @return {?}
         */
        (finder) => NgxFilterViewerComponent.wrapSelectedHtml(finder)));
        this.html = this.sanitizer.bypassSecurityTrustHtml(trustedHtml);
        if (trustedHtml.includes('span')) {
            this.founded = true;
        }
    }
    /**
     * @private
     * @return {?}
     */
    defaultHtmlValue() {
        this.html = this.text;
        this.founded = false;
    }
}
NgxFilterViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-filter-viewer',
                template: '<span [class.filter-founded]="founded" [innerHTML]="html"></span>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
NgxFilterViewerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: DomSanitizer },
    { type: FilterableService }
];
NgxFilterViewerComponent.propDecorators = {
    text: [{ type: Input }],
    key: [{ type: Input }],
    index: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgxFilterViewerComponent.prototype.text;
    /** @type {?} */
    NgxFilterViewerComponent.prototype.key;
    /** @type {?} */
    NgxFilterViewerComponent.prototype.index;
    /** @type {?} */
    NgxFilterViewerComponent.prototype.html;
    /** @type {?} */
    NgxFilterViewerComponent.prototype.founded;
    /**
     * @type {?}
     * @private
     */
    NgxFilterViewerComponent.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    NgxFilterViewerComponent.prototype.taskId;
    /**
     * @type {?}
     * @private
     */
    NgxFilterViewerComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    NgxFilterViewerComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    NgxFilterViewerComponent.prototype.sanitizer;
    /**
     * @type {?}
     * @private
     */
    NgxFilterViewerComponent.prototype.filterable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci12aWV3ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb21wb25lbnRzL25neC1maWx0ZXItdmlld2VyL25neC1maWx0ZXItdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBS04saUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNqRixPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDOUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO01BRXpELEVBQUUsV0FBVyxFQUFFLEdBQW1DLHVCQUF1QjtBQVEvRSxNQUFNLE9BQU8sd0JBQXdCOzs7Ozs7O0lBU2pDLFlBQ3FCLE1BQWMsRUFDZCxFQUFxQixFQUNyQixTQUF1QixFQUN2QixVQUE2QjtRQUg3QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQVpsQyxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLFFBQUcsR0FBVyxJQUFJLENBQUM7UUFDbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUUzQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBVTVCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFD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Qjs7SUFDL0IsMkNBQWdDOzs7OztJQUNoQyxnREFBbUM7Ozs7O0lBQ25DLDBDQUF1Qjs7Ozs7SUFHbkIsMENBQStCOzs7OztJQUMvQixzQ0FBc0M7Ozs7O0lBQ3RDLDZDQUF3Qzs7Ozs7SUFDeEMsOENBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgfSBmcm9tICcuLi8uLi9jb25maWcvdGFibGUtYnVpbGRlci1vcHRpb25zJztcbmltcG9ydCB7IEZpbHRlcmFibGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyRXZlbnQsIFRhYmxlRmlsdGVyVHlwZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZpbHRlcmFibGUvZmlsdGVyYWJsZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgZGV0ZWN0Q2hhbmdlcyB9IGZyb20gJy4uLy4uL29wZXJhdG9ycy9kZXRlY3QtY2hhbmdlcyc7XG5cbmNvbnN0IHsgVElNRV9SRUxPQUQgfTogdHlwZW9mIFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsID0gVGFibGVCdWlsZGVyT3B0aW9uc0ltcGw7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWZpbHRlci12aWV3ZXInLFxuICAgIHRlbXBsYXRlOiAnPHNwYW4gW2NsYXNzLmZpbHRlci1mb3VuZGVkXT1cImZvdW5kZWRcIiBbaW5uZXJIVE1MXT1cImh0bWxcIj48L3NwYW4+JyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE5neEZpbHRlclZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHB1YmxpYyB0ZXh0OiBzdHJpbmcgPSBudWxsO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBrZXk6IHN0cmluZyA9IG51bGw7XG4gICAgQElucHV0KCkgcHVibGljIGluZGV4OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBodG1sOiBzdHJpbmcgfCBTYWZlSHRtbDtcbiAgICBwdWJsaWMgZm91bmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSB0YXNrSWQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBmaWx0ZXJhYmxlOiBGaWx0ZXJhYmxlU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmNkLnJlYXR0YWNoKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgd3JhcFNlbGVjdGVkSHRtbChmaW5kZXI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRjAwOyBjb2xvcjogIzAwMFwiPiR7ZmluZGVyfTwvc3Bhbj5gO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzWyd0ZXh0J10gJiYgY2hhbmdlc1sndGV4dCddLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRIdG1sVmFsdWUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmZpbHRlcmFibGUuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQ6IEZpbHRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJhYmxlLmRlZmluaXRpb25bdGhpcy5rZXldIHx8IHRoaXMuZmlsdGVyYWJsZS5nbG9iYWxGaWx0ZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2VsZWN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0SHRtbFZhbHVlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRldGVjdENoYW5nZXModGhpcy5jZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVNlbGVjdGlvbihldmVudDogRmlsdGVyRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy50YXNrSWQpO1xuICAgICAgICAgICAgdGhpcy50YXNrSWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnZhbHVlIHx8IHRoaXMuZmlsdGVyYWJsZS5kZWZpbml0aW9uW3RoaXMua2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRIdG1sVmFsdWUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZXRlY3RDaGFuZ2VzKHRoaXMuY2QpO1xuICAgICAgICAgICAgfSwgVElNRV9SRUxPQUQgKyB0aGlzLmluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3RlZChldmVudDogRmlsdGVyRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRoaXMuZmlsdGVyYWJsZS5kZWZpbml0aW9uW3RoaXMua2V5XSB8fCBldmVudC52YWx1ZTtcbiAgICAgICAgY29uc3QgdHlwZTogVGFibGVGaWx0ZXJUeXBlID0gdGhpcy5maWx0ZXJhYmxlLmRlZmluaXRpb25bdGhpcy5rZXldXG4gICAgICAgICAgICA/IHRoaXMuZmlsdGVyYWJsZS5maWx0ZXJUeXBlRGVmaW5pdGlvblt0aGlzLmtleV1cbiAgICAgICAgICAgIDogZXZlbnQudHlwZTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gVGFibGVGaWx0ZXJUeXBlLkRPRVNfTk9UX0VRVUFMIHx8IHR5cGUgPT09IFRhYmxlRmlsdGVyVHlwZS5ET0VTX05PVF9DT05UQUlOKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVnZXhwOiBSZWdFeHA7XG4gICAgICAgIGNvbnN0IGVzY2FwZWRWYWx1ZTogc3RyaW5nID0gdmFsdWUucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gVGFibGVGaWx0ZXJUeXBlLlNUQVJUX1dJVEgpIHtcbiAgICAgICAgICAgIHJlZ2V4cCA9IG5ldyBSZWdFeHAoYF4ke2VzY2FwZWRWYWx1ZX1gLCAnaScpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFRhYmxlRmlsdGVyVHlwZS5FTkRfV0lUSCkge1xuICAgICAgICAgICAgcmVnZXhwID0gbmV3IFJlZ0V4cChgJHtlc2NhcGVkVmFsdWV9JGAsICdpJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gVGFibGVGaWx0ZXJUeXBlLkVRVUFMUykge1xuICAgICAgICAgICAgcmVnZXhwID0gbmV3IFJlZ0V4cChgXiR7ZXNjYXBlZFZhbHVlfSRgLCAnaScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVnZXhwID0gbmV3IFJlZ0V4cChgJHtlc2NhcGVkVmFsdWV9YCwgJ2lnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cnVzdGVkSHRtbDogc3RyaW5nID0gU3RyaW5nKHRoaXMudGV4dCkucmVwbGFjZShyZWdleHAsIChmaW5kZXI6IHN0cmluZykgPT5cbiAgICAgICAgICAgIE5neEZpbHRlclZpZXdlckNvbXBvbmVudC53cmFwU2VsZWN0ZWRIdG1sKGZpbmRlcilcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmh0bWwgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0cnVzdGVkSHRtbCk7XG5cbiAgICAgICAgaWYgKHRydXN0ZWRIdG1sLmluY2x1ZGVzKCdzcGFuJykpIHtcbiAgICAgICAgICAgIHRoaXMuZm91bmRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmF1bHRIdG1sVmFsdWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaHRtbCA9IHRoaXMudGV4dDtcbiAgICAgICAgdGhpcy5mb3VuZGVkID0gZmFsc2U7XG4gICAgfVxufVxuIl19