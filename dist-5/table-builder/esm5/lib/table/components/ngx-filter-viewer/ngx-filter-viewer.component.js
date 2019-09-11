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
var TIME_RELOAD = TableBuilderOptionsImpl.TIME_RELOAD;
var NgxFilterViewerComponent = /** @class */ (function () {
    function NgxFilterViewerComponent(ngZone, cd, sanitizer, filterable) {
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
    NgxFilterViewerComponent.wrapSelectedHtml = /**
     * @private
     * @param {?} finder
     * @return {?}
     */
    function (finder) {
        return "<span style=\"background-color: #FFFF00; color: #000\">" + finder + "</span>";
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['text'] && changes['text'].firstChange) {
            this.defaultHtmlValue();
        }
    };
    /**
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.filterable.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.filterable.definition[_this.key] || _this.filterable.globalFilterValue) {
                _this.changeSelection(event);
            }
            else {
                _this.defaultHtmlValue();
            }
            detectChanges(_this.cd);
        }));
    };
    /**
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.changeSelection = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            window.clearInterval(_this.taskId);
            _this.taskId = window.setTimeout((/**
             * @return {?}
             */
            function () {
                if (event.value || _this.filterable.definition[_this.key]) {
                    _this.selected(event);
                }
                else {
                    _this.defaultHtmlValue();
                }
                detectChanges(_this.cd);
            }), TIME_RELOAD + _this.index);
        }));
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.selected = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = this.filterable.definition[this.key] || event.value;
        /** @type {?} */
        var type = this.filterable.definition[this.key]
            ? this.filterable.filterTypeDefinition[this.key]
            : event.type;
        if (type === TableFilterType.DOES_NOT_EQUAL || type === TableFilterType.DOES_NOT_CONTAIN) {
            return;
        }
        /** @type {?} */
        var regexp;
        /** @type {?} */
        var escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (type === TableFilterType.START_WITH) {
            regexp = new RegExp("^" + escapedValue, 'i');
        }
        else if (type === TableFilterType.END_WITH) {
            regexp = new RegExp(escapedValue + "$", 'i');
        }
        else if (type === TableFilterType.EQUALS) {
            regexp = new RegExp("^" + escapedValue + "$", 'i');
        }
        else {
            regexp = new RegExp("" + escapedValue, 'ig');
        }
        /** @type {?} */
        var trustedHtml = String(this.text).replace(regexp, (/**
         * @param {?} finder
         * @return {?}
         */
        function (finder) {
            return NgxFilterViewerComponent.wrapSelectedHtml(finder);
        }));
        this.html = this.sanitizer.bypassSecurityTrustHtml(trustedHtml);
        if (trustedHtml.includes('span')) {
            this.founded = true;
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxFilterViewerComponent.prototype.defaultHtmlValue = /**
     * @private
     * @return {?}
     */
    function () {
        this.html = this.text;
        this.founded = false;
    };
    NgxFilterViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-filter-viewer',
                    template: '<span [class.filter-founded]="founded" [innerHTML]="html"></span>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    NgxFilterViewerComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
        { type: FilterableService }
    ]; };
    NgxFilterViewerComponent.propDecorators = {
        text: [{ type: Input }],
        key: [{ type: Input }],
        index: [{ type: Input }]
    };
    return NgxFilterViewerComponent;
}());
export { NgxFilterViewerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZpbHRlci12aWV3ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb21wb25lbnRzL25neC1maWx0ZXItdmlld2VyL25neC1maWx0ZXItdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBS04saUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNqRixPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDOUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXZELElBQUEsaURBQVc7QUFFbkI7SUFlSSxrQ0FDcUIsTUFBYyxFQUNkLEVBQXFCLEVBQ3JCLFNBQXVCLEVBQ3ZCLFVBQTZCO1FBSDdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBWmxDLFNBQUksR0FBVyxJQUFJLENBQUM7UUFDcEIsUUFBRyxHQUFXLElBQUksQ0FBQztRQUNuQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRTNCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFVNUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFFYyx5Q0FBZ0I7Ozs7O0lBQS9CLFVBQWdD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SUFDakMsd0NBQW9DOztJQUNwQyx1Q0FBbUM7O0lBQ25DLHlDQUFrQzs7SUFDbEMsd0NBQStCOztJQUMvQiwyQ0FBZ0M7Ozs7O0lBQ2hDLGdEQUFtQzs7Ozs7SUFDbkMsMENBQXVCOzs7OztJQUduQiwwQ0FBK0I7Ozs7O0lBQy9CLHNDQUFzQzs7Ozs7SUFDdEMsNkNBQXdDOzs7OztJQUN4Qyw4Q0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCB9IGZyb20gJy4uLy4uL2NvbmZpZy90YWJsZS1idWlsZGVyLW9wdGlvbnMnO1xuaW1wb3J0IHsgRmlsdGVyYWJsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maWx0ZXJhYmxlL2ZpbHRlcmFibGUuc2VydmljZSc7XG5pbXBvcnQgeyBGaWx0ZXJFdmVudCwgVGFibGVGaWx0ZXJUeXBlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlsdGVyYWJsZS9maWx0ZXJhYmxlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBkZXRlY3RDaGFuZ2VzIH0gZnJvbSAnLi4vLi4vb3BlcmF0b3JzL2RldGVjdC1jaGFuZ2VzJztcblxuY29uc3QgeyBUSU1FX1JFTE9BRCB9OiB0eXBlb2YgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgPSBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtZmlsdGVyLXZpZXdlcicsXG4gICAgdGVtcGxhdGU6ICc8c3BhbiBbY2xhc3MuZmlsdGVyLWZvdW5kZWRdPVwiZm91bmRlZFwiIFtpbm5lckhUTUxdPVwiaHRtbFwiPjwvc3Bhbj4nLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTmd4RmlsdGVyVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgcHVibGljIHRleHQ6IHN0cmluZyA9IG51bGw7XG4gICAgQElucHV0KCkgcHVibGljIGtleTogc3RyaW5nID0gbnVsbDtcbiAgICBASW5wdXQoKSBwdWJsaWMgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgcHVibGljIGh0bWw6IHN0cmluZyB8IFNhZmVIdG1sO1xuICAgIHB1YmxpYyBmb3VuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHRhc2tJZDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGZpbHRlcmFibGU6IEZpbHRlcmFibGVTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2QucmVhdHRhY2goKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB3cmFwU2VsZWN0ZWRIdG1sKGZpbmRlcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNGRkZGMDA7IGNvbG9yOiAjMDAwXCI+JHtmaW5kZXJ9PC9zcGFuPmA7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3RleHQnXSAmJiBjaGFuZ2VzWyd0ZXh0J10uZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEh0bWxWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZmlsdGVyYWJsZS5ldmVudHMuc3Vic2NyaWJlKChldmVudDogRmlsdGVyRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcmFibGUuZGVmaW5pdGlvblt0aGlzLmtleV0gfHwgdGhpcy5maWx0ZXJhYmxlLmdsb2JhbEZpbHRlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3Rpb24oZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRIdG1sVmFsdWUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGV0ZWN0Q2hhbmdlcyh0aGlzLmNkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hhbmdlU2VsZWN0aW9uKGV2ZW50OiBGaWx0ZXJFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLnRhc2tJZCk7XG4gICAgICAgICAgICB0aGlzLnRhc2tJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudmFsdWUgfHwgdGhpcy5maWx0ZXJhYmxlLmRlZmluaXRpb25bdGhpcy5rZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEh0bWxWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRldGVjdENoYW5nZXModGhpcy5jZCk7XG4gICAgICAgICAgICB9LCBUSU1FX1JFTE9BRCArIHRoaXMuaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdGVkKGV2ZW50OiBGaWx0ZXJFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5maWx0ZXJhYmxlLmRlZmluaXRpb25bdGhpcy5rZXldIHx8IGV2ZW50LnZhbHVlO1xuICAgICAgICBjb25zdCB0eXBlOiBUYWJsZUZpbHRlclR5cGUgPSB0aGlzLmZpbHRlcmFibGUuZGVmaW5pdGlvblt0aGlzLmtleV1cbiAgICAgICAgICAgID8gdGhpcy5maWx0ZXJhYmxlLmZpbHRlclR5cGVEZWZpbml0aW9uW3RoaXMua2V5XVxuICAgICAgICAgICAgOiBldmVudC50eXBlO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBUYWJsZUZpbHRlclR5cGUuRE9FU19OT1RfRVFVQUwgfHwgdHlwZSA9PT0gVGFibGVGaWx0ZXJUeXBlLkRPRVNfTk9UX0NPTlRBSU4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZWdleHA6IFJlZ0V4cDtcbiAgICAgICAgY29uc3QgZXNjYXBlZFZhbHVlOiBzdHJpbmcgPSB2YWx1ZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBUYWJsZUZpbHRlclR5cGUuU1RBUlRfV0lUSCkge1xuICAgICAgICAgICAgcmVnZXhwID0gbmV3IFJlZ0V4cChgXiR7ZXNjYXBlZFZhbHVlfWAsICdpJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gVGFibGVGaWx0ZXJUeXBlLkVORF9XSVRIKSB7XG4gICAgICAgICAgICByZWdleHAgPSBuZXcgUmVnRXhwKGAke2VzY2FwZWRWYWx1ZX0kYCwgJ2knKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBUYWJsZUZpbHRlclR5cGUuRVFVQUxTKSB7XG4gICAgICAgICAgICByZWdleHAgPSBuZXcgUmVnRXhwKGBeJHtlc2NhcGVkVmFsdWV9JGAsICdpJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWdleHAgPSBuZXcgUmVnRXhwKGAke2VzY2FwZWRWYWx1ZX1gLCAnaWcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRydXN0ZWRIdG1sOiBzdHJpbmcgPSBTdHJpbmcodGhpcy50ZXh0KS5yZXBsYWNlKHJlZ2V4cCwgKGZpbmRlcjogc3RyaW5nKSA9PlxuICAgICAgICAgICAgTmd4RmlsdGVyVmlld2VyQ29tcG9uZW50LndyYXBTZWxlY3RlZEh0bWwoZmluZGVyKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuaHRtbCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRydXN0ZWRIdG1sKTtcblxuICAgICAgICBpZiAodHJ1c3RlZEh0bWwuaW5jbHVkZXMoJ3NwYW4nKSkge1xuICAgICAgICAgICAgdGhpcy5mb3VuZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdEh0bWxWYWx1ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5odG1sID0gdGhpcy50ZXh0O1xuICAgICAgICB0aGlzLmZvdW5kZWQgPSBmYWxzZTtcbiAgICB9XG59XG4iXX0=