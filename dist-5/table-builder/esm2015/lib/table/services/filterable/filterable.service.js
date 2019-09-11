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
const { TIME_IDLE } = TableBuilderOptionsImpl;
export class FilterableService {
    /**
     * @param {?} thread
     * @param {?} utils
     * @param {?} ngZone
     * @param {?} app
     */
    constructor(thread, utils, ngZone, app) {
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
    /**
     * @return {?}
     */
    get globalFilterValue() {
        return this.filterValue ? String(this.filterValue).trim() : null;
    }
    /**
     * @return {?}
     */
    changeFilteringStatus() {
        this.filtering = this.filterValueExist;
        if (this.filtering !== this.previousFiltering) {
            this.events.next({ value: null, type: null });
        }
        this.previousFiltering = this.filtering;
    }
    /**
     * @return {?}
     */
    get filterValueExist() {
        /** @type {?} */
        const keyFilterValues = Object.values(this.definition).reduce((/**
         * @param {?} acc
         * @param {?} next
         * @return {?}
         */
        (acc, next) => acc + next), '');
        return (this.globalFilterValue && this.globalFilterValue.length > 0) || keyFilterValues.length > 0;
    }
    /**
     * @param {?} key
     * @param {?} event
     * @return {?}
     */
    openFilter(key, event) {
        this.state = { opened: true, key, position: { left: event.clientX, top: event.clientY } };
        this.filterOpenEvents.next();
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    closeFilter() {
        this.state = new FilterStateEvent();
        this.filterOpenEvents.next();
    }
    /**
     * @param {?} source
     * @return {?}
     */
    filter(source) {
        /** @type {?} */
        const type = this.filterType;
        /** @type {?} */
        const value = this.globalFilterValue ? String(this.globalFilterValue).trim() : null;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            /** @type {?} */
            const message = {
                source,
                types: TableFilterType,
                global: { value, type },
                columns: {
                    values: this.definition,
                    types: this.filterTypeDefinition,
                    isEmpty: this.checkIsEmpty(this.definition)
                }
            };
            this.thread.run(filterAllWorker, message).then((/**
             * @param {?} sorted
             * @return {?}
             */
            (sorted) => {
                this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    resolve({
                        source: sorted,
                        fireSelection: (/**
                         * @return {?}
                         */
                        () => {
                            window.setTimeout((/**
                             * @return {?}
                             */
                            () => {
                                this.events.next({ value, type });
                                this.app.tick();
                            }), TIME_IDLE);
                        })
                    });
                }), TIME_IDLE)));
            }));
        }));
    }
    /**
     * @private
     * @param {?} definition
     * @return {?}
     */
    checkIsEmpty(definition) {
        return Object.keys(this.utils.clean(definition)).length === 0;
    }
}
FilterableService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilterableService.ctorParameters = () => [
    { type: WebWorkerThreadService },
    { type: UtilsService },
    { type: NgZone },
    { type: ApplicationRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy9maWx0ZXJhYmxlL2ZpbHRlcmFibGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBR0gsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFFbEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7TUFHNUMsRUFBRSxTQUFTLEVBQUUsR0FBbUMsdUJBQXVCO0FBRzdFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7Ozs7SUFZMUIsWUFDcUIsTUFBOEIsRUFDOUIsS0FBbUIsRUFDbkIsTUFBYyxFQUNkLEdBQW1CO1FBSG5CLFdBQU0sR0FBTixNQUFNLENBQXdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFFBQUcsR0FBSCxHQUFHLENBQWdCO1FBZmpDLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGVBQVUsR0FBbUIsRUFBRSxDQUFDO1FBQ2hDLFVBQUssR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pELFVBQUssR0FBMkIsZUFBZSxDQUFDO1FBQ3ZDLHFCQUFnQixHQUFrQixJQUFJLE9BQU8s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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgV2ViV29ya2VyVGhyZWFkU2VydmljZSB9IGZyb20gJy4uLy4uL3dvcmtlci93b3JrZXItdGhyZWFkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFibGVSb3cgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCB9IGZyb20gJy4uLy4uL2NvbmZpZy90YWJsZS1idWlsZGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQge1xyXG4gICAgRmlsdGVyYWJsZU1lc3NhZ2UsXHJcbiAgICBGaWx0ZXJFdmVudCxcclxuICAgIEZpbHRlclN0YXRlRXZlbnQsXHJcbiAgICBUYWJsZUZpbHRlclR5cGUsXHJcbiAgICBGaWx0ZXJXb3JrZXJFdmVudFxyXG59IGZyb20gJy4vZmlsdGVyYWJsZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBmaWx0ZXJBbGxXb3JrZXIgfSBmcm9tICcuL2ZpbHRlci53b3JrZXInO1xyXG5pbXBvcnQgeyBLZXlNYXAsIFJlc29sdmVyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuXHJcbmNvbnN0IHsgVElNRV9JRExFIH06IHR5cGVvZiBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbCA9IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyYWJsZVNlcnZpY2Uge1xyXG4gICAgcHVibGljIGZpbHRlclZhbHVlOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIGRlZmluaXRpb246IEtleU1hcDxzdHJpbmc+ID0ge307XHJcbiAgICBwdWJsaWMgc3RhdGU6IEZpbHRlclN0YXRlRXZlbnQgPSBuZXcgRmlsdGVyU3RhdGVFdmVudCgpO1xyXG4gICAgcHVibGljIHR5cGVzOiB0eXBlb2YgVGFibGVGaWx0ZXJUeXBlID0gVGFibGVGaWx0ZXJUeXBlO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGZpbHRlck9wZW5FdmVudHM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGV2ZW50czogU3ViamVjdDxGaWx0ZXJFdmVudD4gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xyXG4gICAgcHVibGljIGZpbHRlclR5cGU6IFRhYmxlRmlsdGVyVHlwZTtcclxuICAgIHB1YmxpYyBmaWx0ZXJUeXBlRGVmaW5pdGlvbjogS2V5TWFwPFRhYmxlRmlsdGVyVHlwZT4gPSB7fTtcclxuICAgIHB1YmxpYyBmaWx0ZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcHJldmlvdXNGaWx0ZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHRocmVhZDogV2ViV29ya2VyVGhyZWFkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHV0aWxzOiBVdGlsc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGFwcDogQXBwbGljYXRpb25SZWZcclxuICAgICkge31cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdsb2JhbEZpbHRlclZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyVmFsdWUgPyBTdHJpbmcodGhpcy5maWx0ZXJWYWx1ZSkudHJpbSgpIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlRmlsdGVyaW5nU3RhdHVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyaW5nID0gdGhpcy5maWx0ZXJWYWx1ZUV4aXN0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJpbmcgIT09IHRoaXMucHJldmlvdXNGaWx0ZXJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7IHZhbHVlOiBudWxsLCB0eXBlOiBudWxsIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0ZpbHRlcmluZyA9IHRoaXMuZmlsdGVyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZmlsdGVyVmFsdWVFeGlzdCgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBrZXlGaWx0ZXJWYWx1ZXM6IHN0cmluZyA9IE9iamVjdC52YWx1ZXModGhpcy5kZWZpbml0aW9uKS5yZWR1Y2UoXHJcbiAgICAgICAgICAgIChhY2M6IHN0cmluZywgbmV4dDogc3RyaW5nKSA9PiBhY2MgKyBuZXh0LFxyXG4gICAgICAgICAgICAnJ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmdsb2JhbEZpbHRlclZhbHVlICYmIHRoaXMuZ2xvYmFsRmlsdGVyVmFsdWUubGVuZ3RoID4gMCkgfHwga2V5RmlsdGVyVmFsdWVzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5GaWx0ZXIoa2V5OiBzdHJpbmcsIGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgb3BlbmVkOiB0cnVlLCBrZXksIHBvc2l0aW9uOiB7IGxlZnQ6IGV2ZW50LmNsaWVudFgsIHRvcDogZXZlbnQuY2xpZW50WSB9IH07XHJcbiAgICAgICAgdGhpcy5maWx0ZXJPcGVuRXZlbnRzLm5leHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUZpbHRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IEZpbHRlclN0YXRlRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmZpbHRlck9wZW5FdmVudHMubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXIoc291cmNlOiBUYWJsZVJvd1tdKTogUHJvbWlzZTxGaWx0ZXJXb3JrZXJFdmVudD4ge1xyXG4gICAgICAgIGNvbnN0IHR5cGU6IFRhYmxlRmlsdGVyVHlwZSA9IHRoaXMuZmlsdGVyVHlwZTtcclxuICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5nbG9iYWxGaWx0ZXJWYWx1ZSA/IFN0cmluZyh0aGlzLmdsb2JhbEZpbHRlclZhbHVlKS50cmltKCkgOiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IFJlc29sdmVyPEZpbHRlcldvcmtlckV2ZW50Pik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlOiBGaWx0ZXJhYmxlTWVzc2FnZSA9IHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgICAgICAgIHR5cGVzOiBUYWJsZUZpbHRlclR5cGUsXHJcbiAgICAgICAgICAgICAgICBnbG9iYWw6IHsgdmFsdWUsIHR5cGUgfSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHRoaXMuZGVmaW5pdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlczogdGhpcy5maWx0ZXJUeXBlRGVmaW5pdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBpc0VtcHR5OiB0aGlzLmNoZWNrSXNFbXB0eSh0aGlzLmRlZmluaXRpb24pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRocmVhZC5ydW48VGFibGVSb3dbXSwgRmlsdGVyYWJsZU1lc3NhZ2U+KGZpbHRlckFsbFdvcmtlciwgbWVzc2FnZSkudGhlbigoc29ydGVkOiBUYWJsZVJvd1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHNvcnRlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVTZWxlY3Rpb246ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQoeyB2YWx1ZSwgdHlwZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAudGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFRJTUVfSURMRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIFRJTUVfSURMRSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJc0VtcHR5KGRlZmluaXRpb246IEtleU1hcDxzdHJpbmc+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMudXRpbHMuY2xlYW4oZGVmaW5pdGlvbikpLmxlbmd0aCA9PT0gMDtcclxuICAgIH1cclxufVxyXG4iXX0=