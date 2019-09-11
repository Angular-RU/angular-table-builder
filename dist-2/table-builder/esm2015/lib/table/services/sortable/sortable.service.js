/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, NgZone } from '@angular/core';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { SortOrderType } from './sortable.interfaces';
import { UtilsService } from '../utils/utils.service';
import { sortWorker } from './sort.worker';
export class SortableService {
    /**
     * @param {?} thread
     * @param {?} utils
     * @param {?} zone
     */
    constructor(thread, utils, zone) {
        this.thread = thread;
        this.utils = utils;
        this.zone = zone;
        this.definition = {};
    }
    /**
     * @return {?}
     */
    get empty() {
        return Object.keys(this.definition).length === 0;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    sort(data) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            this.thread
                .run(sortWorker, { definition: this.definition, source: data })
                .then((/**
             * @param {?} sorted
             * @return {?}
             */
            (sorted) => {
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => window.setTimeout((/**
                 * @return {?}
                 */
                () => resolve(sorted)), TableBuilderOptionsImpl.TIME_IDLE)));
            }));
        }));
    }
    /**
     * @param {?} definition
     * @return {?}
     */
    setDefinition(definition) {
        this.definition = this.empty ? ((/** @type {?} */ (definition))) || {} : this.definition;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    updateSortKey(key) {
        this.definition = this.updateImmutableDefinitions(key);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    updateImmutableDefinitions(key) {
        /** @type {?} */
        const existKey = this.definition[key];
        if (existKey) {
            if (existKey === SortOrderType.ASC) {
                this.definition[key] = SortOrderType.DESC;
            }
            else {
                delete this.definition[key];
            }
        }
        else {
            this.definition[key] = SortOrderType.ASC;
        }
        return Object.assign({}, this.definition);
    }
}
SortableService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SortableService.ctorParameters = () => [
    { type: WebWorkerThreadService },
    { type: UtilsService },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    SortableService.prototype.definition;
    /**
     * @type {?}
     * @private
     */
    SortableService.prototype.thread;
    /**
     * @type {?}
     * @private
     */
    SortableService.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    SortableService.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvc2VydmljZXMvc29ydGFibGUvc29ydGFibGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHbkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDNUUsT0FBTyxFQUFtQixhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNLE9BQU8sZUFBZTs7Ozs7O0lBR3hCLFlBQ3FCLE1BQThCLEVBQzlCLEtBQW1CLEVBQ25CLElBQVk7UUFGWixXQUFNLEdBQU4sTUFBTSxDQUF3QjtRQUM5QixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQVE7UUFMMUIsZUFBVSxHQUEwQixFQUFFLENBQUM7SUFNM0MsQ0FBQzs7OztJQUVKLElBQVcsS0FBSztRQUNaLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7OztJQUVNLElBQUksQ0FBQyxJQUFnQjtRQUN4QixPQUFPLElBQUksT0FBTzs7OztRQUFDLENBQUMsT0FBNkIsRUFBUSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxNQUFNO2lCQUNOLEdBQUcsQ0FBOEIsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2lCQUMzRixJQUFJOzs7O1lBQUMsQ0FBQyxNQUFrQixFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7Z0JBQUMsR0FBRyxFQUFFLENBQzdCLE1BQU0sQ0FBQyxVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFFLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxFQUM5RSxDQUFDO1lBQ04sQ0FBQyxFQUFDLENBQUM7UUFDWCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU0sYUFBYSxDQUFDLFVBQTBCO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxVQUFVLEVBQXlCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDakcsQ0FBQzs7Ozs7SUFFTSxhQUFhLENBQUMsR0FBVztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFFTywwQkFBMEIsQ0FBQyxHQUFXOztjQUNwQyxRQUFRLEdBQWtCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBRXBELElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxRQUFRLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO2FBQzdDO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMvQjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7U0FDNUM7UUFFRCx5QkFBWSxJQUFJLENBQUMsVUFBVSxFQUFHO0lBQ2xDLENBQUM7OztZQWhESixVQUFVOzs7O1lBTkYsc0JBQXNCO1lBR3RCLFlBQVk7WUFQQSxNQUFNOzs7O0lBWXZCLHFDQUE4Qzs7Ozs7SUFHMUMsaUNBQStDOzs7OztJQUMvQyxnQ0FBb0M7Ozs7O0lBQ3BDLCtCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgS2V5TWFwLCBSZXNvbHZlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsIH0gZnJvbSAnLi4vLi4vY29uZmlnL3RhYmxlLWJ1aWxkZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IFdlYldvcmtlclRocmVhZFNlcnZpY2UgfSBmcm9tICcuLi8uLi93b3JrZXIvd29ya2VyLXRocmVhZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29ydGFibGVNZXNzYWdlLCBTb3J0T3JkZXJUeXBlIH0gZnJvbSAnLi9zb3J0YWJsZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgVGFibGVSb3cgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgc29ydFdvcmtlciB9IGZyb20gJy4vc29ydC53b3JrZXInO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU29ydGFibGVTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBkZWZpbml0aW9uOiBLZXlNYXA8U29ydE9yZGVyVHlwZT4gPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHRocmVhZDogV2ViV29ya2VyVGhyZWFkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHV0aWxzOiBVdGlsc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB6b25lOiBOZ1pvbmVcclxuICAgICkge31cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmRlZmluaXRpb24pLmxlbmd0aCA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29ydChkYXRhOiBUYWJsZVJvd1tdKTogUHJvbWlzZTxUYWJsZVJvd1tdPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBSZXNvbHZlcjxUYWJsZVJvd1tdPik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRocmVhZFxyXG4gICAgICAgICAgICAgICAgLnJ1bjxUYWJsZVJvd1tdLCBTb3J0YWJsZU1lc3NhZ2U+KHNvcnRXb3JrZXIsIHsgZGVmaW5pdGlvbjogdGhpcy5kZWZpbml0aW9uLCBzb3VyY2U6IGRhdGEgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzb3J0ZWQ6IFRhYmxlUm93W10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShzb3J0ZWQpLCBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbC5USU1FX0lETEUpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREZWZpbml0aW9uKGRlZmluaXRpb246IEtleU1hcDxzdHJpbmc+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kZWZpbml0aW9uID0gdGhpcy5lbXB0eSA/IChkZWZpbml0aW9uIGFzIEtleU1hcDxTb3J0T3JkZXJUeXBlPikgfHwge30gOiB0aGlzLmRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNvcnRLZXkoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlZmluaXRpb24gPSB0aGlzLnVwZGF0ZUltbXV0YWJsZURlZmluaXRpb25zKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVJbW11dGFibGVEZWZpbml0aW9ucyhrZXk6IHN0cmluZyk6IEtleU1hcDxTb3J0T3JkZXJUeXBlPiB7XHJcbiAgICAgICAgY29uc3QgZXhpc3RLZXk6IFNvcnRPcmRlclR5cGUgPSB0aGlzLmRlZmluaXRpb25ba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKGV4aXN0S2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChleGlzdEtleSA9PT0gU29ydE9yZGVyVHlwZS5BU0MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5pdGlvbltrZXldID0gU29ydE9yZGVyVHlwZS5ERVNDO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGVmaW5pdGlvbltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZpbml0aW9uW2tleV0gPSBTb3J0T3JkZXJUeXBlLkFTQztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IC4uLnRoaXMuZGVmaW5pdGlvbiB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==