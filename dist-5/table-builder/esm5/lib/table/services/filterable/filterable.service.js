/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { UtilsService } from '../utils/utils.service';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { FilterStateEvent, TableFilterType } from './filterable.interface';
import { filterAllWorker } from './filter.worker';
var TIME_IDLE = TableBuilderOptionsImpl.TIME_IDLE;
var FilterableService = /** @class */ (function () {
    function FilterableService(thread, utils, ngZone, app) {
        this.thread = thread;
        this.utils = utils;
        this.ngZone = ngZone;
        this.app = app;
        this.filterValue = null;
        this.definition = {};
        this.state = new FilterStateEvent();
        this.types = TableFilterType;
        this.filterOpenEvents = new Subject();
        this.events = new ReplaySubject();
        this.filterTypeDefinition = {};
        this.filtering = false;
        this.previousFiltering = false;
    }
    Object.defineProperty(FilterableService.prototype, "globalFilterValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.filterValue ? String(this.filterValue).trim() : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FilterableService.prototype.changeFilteringStatus = /**
     * @return {?}
     */
    function () {
        this.filtering = this.filterValueExist;
        if (this.filtering !== this.previousFiltering) {
            this.events.next({ value: null, type: null });
        }
        this.previousFiltering = this.filtering;
    };
    Object.defineProperty(FilterableService.prototype, "filterValueExist", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var keyFilterValues = Object.values(this.definition).reduce((/**
             * @param {?} acc
             * @param {?} next
             * @return {?}
             */
            function (acc, next) { return acc + next; }), '');
            return (this.globalFilterValue && this.globalFilterValue.length > 0) || keyFilterValues.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    FilterableService.prototype.openFilter = /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    function (key, event) {
        this.state = { opened: true, key: key, position: { left: event.clientX, top: event.clientY } };
        this.filterOpenEvents.next();
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    FilterableService.prototype.closeFilter = /**
     * @return {?}
     */
    function () {
        this.state = new FilterStateEvent();
        this.filterOpenEvents.next();
    };
    /**
     * @param {?} source
     * @return {?}
     */
    FilterableService.prototype.filter = /**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        var _this = this;
        /** @type {?} */
        var type = this.filterType;
        /** @type {?} */
        var value = this.globalFilterValue ? String(this.globalFilterValue).trim() : null;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            /** @type {?} */
            var message = {
                source: source,
                types: TableFilterType,
                global: { value: value, type: type },
                columns: {
                    values: _this.definition,
                    types: _this.filterTypeDefinition,
                    isEmpty: _this.checkIsEmpty(_this.definition)
                }
            };
            _this.thread.run(filterAllWorker, message).then((/**
             * @param {?} sorted
             * @return {?}
             */
            function (sorted) {
                _this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    return window.setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        resolve({
                            source: sorted,
                            fireSelection: (/**
                             * @return {?}
                             */
                            function () {
                                window.setTimeout((/**
                                 * @return {?}
                                 */
                                function () {
                                    _this.events.next({ value: value, type: type });
                                    _this.app.tick();
                                }), TIME_IDLE);
                            })
                        });
                    }), TIME_IDLE);
                }));
            }));
        }));
    };
    /**
     * @private
     * @param {?} definition
     * @return {?}
     */
    FilterableService.prototype.checkIsEmpty = /**
     * @private
     * @param {?} definition
     * @return {?}
     */
    function (definition) {
        return Object.keys(this.utils.clean(definition)).length === 0;
    };
    FilterableService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilterableService.ctorParameters = function () { return [
        { type: WebWorkerThreadService },
        { type: UtilsService },
        { type: NgZone },
        { type: ApplicationRef }
    ]; };
    return FilterableService;
}());
export { FilterableService };
if (false) {
    /** @type {?} */
    FilterableService.prototype.filterValue;
    /** @type {?} */
    FilterableService.prototype.definition;
    /** @type {?} */
    FilterableService.prototype.state;
    /** @type {?} */
    FilterableService.prototype.types;
    /** @type {?} */
    FilterableService.prototype.filterOpenEvents;
    /** @type {?} */
    FilterableService.prototype.events;
    /** @type {?} */
    FilterableService.prototype.filterType;
    /** @type {?} */
    FilterableService.prototype.filterTypeDefinition;
    /** @type {?} */
    FilterableService.prototype.filtering;
    /**
     * @type {?}
     * @private
     */
    FilterableService.prototype.previousFiltering;
    /**
     * @type {?}
     * @private
     */
    FilterableService.prototype.thread;
    /**
     * @type {?}
     * @private
     */
    FilterableService.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    FilterableService.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    FilterableService.prototype.app;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy9maWx0ZXJhYmxlL2ZpbHRlcmFibGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBR0gsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFFbEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHMUMsSUFBQSw2Q0FBUztBQUVqQjtJQWFJLDJCQUNxQixNQUE4QixFQUM5QixLQUFtQixFQUNuQixNQUFjLEVBQ2QsR0FBbUI7UUFIbkIsV0FBTSxHQUFOLE1BQU0sQ0FBd0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7UUFmakMsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsZUFBVSxHQUFtQixFQUFFLENBQUM7UUFDaEMsVUFBSyxHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDakQsVUFBSyxHQUEyQixlQUFlLENBQUM7UUFDdkMscUJBQWdCLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDaEQsV0FBTSxHQUF5QixJQUFJLGFBQWEsRUFB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QUNsQyw4Q0FBMkM7Ozs7O0lBR3ZDLG1DQUErQzs7Ozs7SUFDL0Msa0NBQW9DOzs7OztJQUNwQyxtQ0FBK0I7Ozs7O0lBQy9CLGdDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgV2ViV29ya2VyVGhyZWFkU2VydmljZSB9IGZyb20gJy4uLy4uL3dvcmtlci93b3JrZXItdGhyZWFkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFibGVSb3cgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCB9IGZyb20gJy4uLy4uL2NvbmZpZy90YWJsZS1idWlsZGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQge1xyXG4gICAgRmlsdGVyYWJsZU1lc3NhZ2UsXHJcbiAgICBGaWx0ZXJFdmVudCxcclxuICAgIEZpbHRlclN0YXRlRXZlbnQsXHJcbiAgICBUYWJsZUZpbHRlclR5cGUsXHJcbiAgICBGaWx0ZXJXb3JrZXJFdmVudFxyXG59IGZyb20gJy4vZmlsdGVyYWJsZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBmaWx0ZXJBbGxXb3JrZXIgfSBmcm9tICcuL2ZpbHRlci53b3JrZXInO1xyXG5pbXBvcnQgeyBLZXlNYXAsIFJlc29sdmVyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuXHJcbmNvbnN0IHsgVElNRV9JRExFIH06IHR5cGVvZiBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCA9IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyYWJsZVNlcnZpY2Uge1xyXG4gICAgcHVibGljIGZpbHRlclZhbHVlOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIGRlZmluaXRpb246IEtleU1hcDxzdHJpbmc+ID0ge307XHJcbiAgICBwdWJsaWMgc3RhdGU6IEZpbHRlclN0YXRlRXZlbnQgPSBuZXcgRmlsdGVyU3RhdGVFdmVudCgpO1xyXG4gICAgcHVibGljIHR5cGVzOiB0eXBlb2YgVGFibGVGaWx0ZXJUeXBlID0gVGFibGVGaWx0ZXJUeXBlO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGZpbHRlck9wZW5FdmVudHM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGV2ZW50czogU3ViamVjdDxGaWx0ZXJFdmVudD4gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xyXG4gICAgcHVibGljIGZpbHRlclR5cGU6IFRhYmxlRmlsdGVyVHlwZTtcclxuICAgIHB1YmxpYyBmaWx0ZXJUeXBlRGVmaW5pdGlvbjogS2V5TWFwPFRhYmxlRmlsdGVyVHlwZT4gPSB7fTtcclxuICAgIHB1YmxpYyBmaWx0ZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcHJldmlvdXNGaWx0ZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHRocmVhZDogV2ViV29ya2VyVGhyZWFkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHV0aWxzOiBVdGlsc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGFwcDogQXBwbGljYXRpb25SZWZcclxuICAgICkge31cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdsb2JhbEZpbHRlclZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyVmFsdWUgPyBTdHJpbmcodGhpcy5maWx0ZXJWYWx1ZSkudHJpbSgpIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlRmlsdGVyaW5nU3RhdHVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyaW5nID0gdGhpcy5maWx0ZXJWYWx1ZUV4aXN0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJpbmcgIT09IHRoaXMucHJldmlvdXNGaWx0ZXJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7IHZhbHVlOiBudWxsLCB0eXBlOiBudWxsIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0ZpbHRlcmluZyA9IHRoaXMuZmlsdGVyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZmlsdGVyVmFsdWVFeGlzdCgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBrZXlGaWx0ZXJWYWx1ZXM6IHN0cmluZyA9IE9iamVjdC52YWx1ZXModGhpcy5kZWZpbml0aW9uKS5yZWR1Y2UoXHJcbiAgICAgICAgICAgIChhY2M6IHN0cmluZywgbmV4dDogc3RyaW5nKSA9PiBhY2MgKyBuZXh0LFxyXG4gICAgICAgICAgICAnJ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmdsb2JhbEZpbHRlclZhbHVlICYmIHRoaXMuZ2xvYmFsRmlsdGVyVmFsdWUubGVuZ3RoID4gMCkgfHwga2V5RmlsdGVyVmFsdWVzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5GaWx0ZXIoa2V5OiBzdHJpbmcsIGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgb3BlbmVkOiB0cnVlLCBrZXksIHBvc2l0aW9uOiB7IGxlZnQ6IGV2ZW50LmNsaWVudFgsIHRvcDogZXZlbnQuY2xpZW50WSB9IH07XHJcbiAgICAgICAgdGhpcy5maWx0ZXJPcGVuRXZlbnRzLm5leHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUZpbHRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IEZpbHRlclN0YXRlRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmZpbHRlck9wZW5FdmVudHMubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXIoc291cmNlOiBUYWJsZVJvd1tdKTogUHJvbWlzZTxGaWx0ZXJXb3JrZXJFdmVudD4ge1xyXG4gICAgICAgIGNvbnN0IHR5cGU6IFRhYmxlRmlsdGVyVHlwZSA9IHRoaXMuZmlsdGVyVHlwZTtcclxuICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5nbG9iYWxGaWx0ZXJWYWx1ZSA/IFN0cmluZyh0aGlzLmdsb2JhbEZpbHRlclZhbHVlKS50cmltKCkgOiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IFJlc29sdmVyPEZpbHRlcldvcmtlckV2ZW50Pik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlOiBGaWx0ZXJhYmxlTWVzc2FnZSA9IHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgICAgICAgIHR5cGVzOiBUYWJsZUZpbHRlclR5cGUsXHJcbiAgICAgICAgICAgICAgICBnbG9iYWw6IHsgdmFsdWUsIHR5cGUgfSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHRoaXMuZGVmaW5pdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlczogdGhpcy5maWx0ZXJUeXBlRGVmaW5pdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBpc0VtcHR5OiB0aGlzLmNoZWNrSXNFbXB0eSh0aGlzLmRlZmluaXRpb24pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRocmVhZC5ydW48VGFibGVSb3dbXSwgRmlsdGVyYWJsZU1lc3NhZ2U+KGZpbHRlckFsbFdvcmtlciwgbWVzc2FnZSkudGhlbigoc29ydGVkOiBUYWJsZVJvd1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHNvcnRlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVTZWxlY3Rpb246ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQoeyB2YWx1ZSwgdHlwZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAudGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFRJTUVfSURMRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIFRJTUVfSURMRSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJc0VtcHR5KGRlZmluaXRpb246IEtleU1hcDxzdHJpbmc+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMudXRpbHMuY2xlYW4oZGVmaW5pdGlvbikpLmxlbmd0aCA9PT0gMDtcclxuICAgIH1cclxufVxyXG4iXX0=