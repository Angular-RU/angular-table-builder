/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { SortOrderType } from './sortable.interfaces';
import { UtilsService } from '../utils/utils.service';
import { sortWorker } from './sort.worker';
var SortableService = /** @class */ (function () {
    function SortableService(thread, utils, zone) {
        this.thread = thread;
        this.utils = utils;
        this.zone = zone;
        this.definition = {};
    }
    Object.defineProperty(SortableService.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () {
            return Object.keys(this.definition).length === 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} data
     * @return {?}
     */
    SortableService.prototype.sort = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.thread
                .run(sortWorker, { definition: _this.definition, source: data })
                .then((/**
             * @param {?} sorted
             * @return {?}
             */
            function (sorted) {
                _this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    return window.setTimeout((/**
                     * @return {?}
                     */
                    function () { return resolve(sorted); }), TableBuilderOptionsImpl.TIME_IDLE);
                }));
            }));
        }));
    };
    /**
     * @param {?} definition
     * @return {?}
     */
    SortableService.prototype.setDefinition = /**
     * @param {?} definition
     * @return {?}
     */
    function (definition) {
        this.definition = this.empty ? ((/** @type {?} */ (definition))) || {} : this.definition;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    SortableService.prototype.updateSortKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.definition = this.updateImmutableDefinitions(key);
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    SortableService.prototype.updateImmutableDefinitions = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var existKey = this.definition[key];
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
        return tslib_1.__assign({}, this.definition);
    };
    SortableService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SortableService.ctorParameters = function () { return [
        { type: WebWorkerThreadService },
        { type: UtilsService },
        { type: NgZone }
    ]; };
    return SortableService;
}());
export { SortableService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvc2VydmljZXMvc29ydGFibGUvc29ydGFibGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBbUIsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0M7SUFJSSx5QkFDcUIsTUFBOEIsRUFDOUIsS0FBbUIsRUFDbkIsSUFBWTtRQUZaLFdBQU0sR0FBTixNQUFNLENBQXdCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUwxQixlQUFVLEdBQTBCLEVBQUUsQ0FBQztJQU0zQyxDQUFDO0lBRUosc0JBQVcsa0NBQUs7Ozs7UUFBaEI7WUFDSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7Ozs7O0lBRU0sOEJBQUk7Ozs7SUFBWCxVQUFZLElBQWdCO1FBQTVCLGlCQVVDO1FBVEcsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxVQUFDLE9BQTZCO1lBQzdDLEtBQUksQ0FBQyxNQUFNO2lCQUNOLEdBQUcsQ0FBOEIsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2lCQUMzRixJQUFJOzs7O1lBQUMsVUFBQyxNQUFrQjtnQkFDckIsS0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7OztnQkFBQztvQkFDeEIsT0FBQSxNQUFNLENBQUMsVUFBVTs7O29CQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQWYsQ0FBZSxHQUFFLHVCQUF1QixDQUFDLFNBQVMsQ0FBQztnQkFBM0UsQ0FBMkUsRUFDOUUsQ0FBQztZQUNOLENBQUMsRUFBQyxDQUFDO1FBQ1gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVNLHVDQUFhOzs7O0lBQXBCLFVBQXFCLFVBQTBCO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxVQUFVLEVBQXlCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDakcsQ0FBQzs7Ozs7SUFFTSx1Q0FBYTs7OztJQUFwQixVQUFxQixHQUFXO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7OztJQUVPLG9EQUEwQjs7Ozs7SUFBbEMsVUFBbUMsR0FBVzs7WUFDcEMsUUFBUSxHQUFrQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUVwRCxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksUUFBUSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQzthQUM3QztpQkFBTTtnQkFDSCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0I7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDO1NBQzVDO1FBRUQsNEJBQVksSUFBSSxDQUFDLFVBQVUsRUFBRztJQUNsQyxDQUFDOztnQkFoREosVUFBVTs7OztnQkFORixzQkFBc0I7Z0JBR3RCLFlBQVk7Z0JBUEEsTUFBTTs7SUEyRDNCLHNCQUFDO0NBQUEsQUFqREQsSUFpREM7U0FoRFksZUFBZTs7O0lBQ3hCLHFDQUE4Qzs7Ozs7SUFHMUMsaUNBQStDOzs7OztJQUMvQyxnQ0FBb0M7Ozs7O0lBQ3BDLCtCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgS2V5TWFwLCBSZXNvbHZlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsIH0gZnJvbSAnLi4vLi4vY29uZmlnL3RhYmxlLWJ1aWxkZXItb3B0aW9ucyc7XHJcbmltcG9ydCB7IFdlYldvcmtlclRocmVhZFNlcnZpY2UgfSBmcm9tICcuLi8uLi93b3JrZXIvd29ya2VyLXRocmVhZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29ydGFibGVNZXNzYWdlLCBTb3J0T3JkZXJUeXBlIH0gZnJvbSAnLi9zb3J0YWJsZS5pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgVGFibGVSb3cgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgc29ydFdvcmtlciB9IGZyb20gJy4vc29ydC53b3JrZXInO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU29ydGFibGVTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBkZWZpbml0aW9uOiBLZXlNYXA8U29ydE9yZGVyVHlwZT4gPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHRocmVhZDogV2ViV29ya2VyVGhyZWFkU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHV0aWxzOiBVdGlsc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB6b25lOiBOZ1pvbmVcclxuICAgICkge31cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmRlZmluaXRpb24pLmxlbmd0aCA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29ydChkYXRhOiBUYWJsZVJvd1tdKTogUHJvbWlzZTxUYWJsZVJvd1tdPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBSZXNvbHZlcjxUYWJsZVJvd1tdPik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRocmVhZFxyXG4gICAgICAgICAgICAgICAgLnJ1bjxUYWJsZVJvd1tdLCBTb3J0YWJsZU1lc3NhZ2U+KHNvcnRXb3JrZXIsIHsgZGVmaW5pdGlvbjogdGhpcy5kZWZpbml0aW9uLCBzb3VyY2U6IGRhdGEgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzb3J0ZWQ6IFRhYmxlUm93W10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShzb3J0ZWQpLCBUYWJsZUJ1aWxkZXJPcHRpb25zSW1wbC5USU1FX0lETEUpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREZWZpbml0aW9uKGRlZmluaXRpb246IEtleU1hcDxzdHJpbmc+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kZWZpbml0aW9uID0gdGhpcy5lbXB0eSA/IChkZWZpbml0aW9uIGFzIEtleU1hcDxTb3J0T3JkZXJUeXBlPikgfHwge30gOiB0aGlzLmRlZmluaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNvcnRLZXkoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlZmluaXRpb24gPSB0aGlzLnVwZGF0ZUltbXV0YWJsZURlZmluaXRpb25zKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVJbW11dGFibGVEZWZpbml0aW9ucyhrZXk6IHN0cmluZyk6IEtleU1hcDxTb3J0T3JkZXJUeXBlPiB7XHJcbiAgICAgICAgY29uc3QgZXhpc3RLZXk6IFNvcnRPcmRlclR5cGUgPSB0aGlzLmRlZmluaXRpb25ba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKGV4aXN0S2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChleGlzdEtleSA9PT0gU29ydE9yZGVyVHlwZS5BU0MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5pdGlvbltrZXldID0gU29ydE9yZGVyVHlwZS5ERVNDO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGVmaW5pdGlvbltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZpbml0aW9uW2tleV0gPSBTb3J0T3JkZXJUeXBlLkFTQztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IC4uLnRoaXMuZGVmaW5pdGlvbiB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==