/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class WebWorkerThreadService {
    constructor() {
        this.workerFunctionToUrlMap = new WeakMap();
        this.promiseToWorkerMap = new WeakMap();
    }
    /**
     * @private
     * @param {?} resolve
     * @return {?}
     */
    static createWorkerUrl(resolve) {
        /** @type {?} */
        const resolveString = resolve.toString();
        /** @type {?} */
        const webWorkerTemplate = `
            self.addEventListener('message', function(e) {
                postMessage((${resolveString})(e.data));
            });
        `;
        /** @type {?} */
        const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    }
    /**
     * @template T, K
     * @param {?} workerFunction
     * @param {?=} data
     * @return {?}
     */
    run(workerFunction, data) {
        /** @type {?} */
        const url = this.getOrCreateWorkerUrl(workerFunction);
        return this.runUrl(url, data);
    }
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    runUrl(url, data) {
        /** @type {?} */
        const worker = new Worker(url);
        /** @type {?} */
        const promise = this.createPromiseForWorker(worker, data);
        /** @type {?} */
        const promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    }
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    terminate(promise) {
        return this.removePromise(promise);
    }
    /**
     * @param {?} promise
     * @return {?}
     */
    getWorker(promise) {
        return this.promiseToWorkerMap.get(promise);
    }
    /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    createPromiseForWorker(worker, data) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            worker.addEventListener('message', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => resolve(event.data)));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        }));
    }
    /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    getOrCreateWorkerUrl(fn) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            /** @type {?} */
            const url = WebWorkerThreadService.createWorkerUrl(fn);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return this.workerFunctionToUrlMap.get(fn);
    }
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    createPromiseCleaner(promise) {
        return (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.removePromise(promise);
            return event;
        });
    }
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    removePromise(promise) {
        /** @type {?} */
        const worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    }
}
WebWorkerThreadService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebWorkerThreadService.prototype.workerFunctionToUrlMap;
    /**
     * @type {?}
     * @private
     */
    WebWorkerThreadService.prototype.promiseToWorkerMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyLXRocmVhZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS93b3JrZXIvd29ya2VyLXRocmVhZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE1BQU0sT0FBTyxzQkFBc0I7SUFEbkM7UUFFcUIsMkJBQXNCLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUQsdUJBQWtCLEdBQWtDLElBQUksT0FBTyxFQUFFLENBQUM7SUEwRXZGLENBQUM7Ozs7OztJQXhFVyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQVc7O2NBQ2hDLGFBQWEsR0FBVyxPQUFPLENBQUMsUUFBUSxFQUFFOztjQUUxQyxpQkFBaUIsR0FBVzs7K0JBRVgsYUFBYTs7U0FFbkM7O2NBRUssSUFBSSxHQUFTLElBQUksSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDO1FBQzdFLE9BQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7O0lBRU0sR0FBRyxDQUFPLGNBQStCLEVBQUUsSUFBUTs7Y0FDaEQsR0FBRyxHQUFXLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUM7UUFDN0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7SUFFTSxNQUFNLENBQUMsR0FBVyxFQUFFLElBQVU7O2NBQzNCLE1BQU0sR0FBVyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUM7O2NBQ2hDLE9BQU8sR0FBaUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7O2NBQ2pFLGNBQWMsR0FBUSxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDO1FBRTlELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVNLFNBQVMsQ0FBSSxPQUFtQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFTSxTQUFTLENBQUMsT0FBcUI7UUFDbEMsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7Ozs7O0lBRU8sc0JBQXNCLENBQUksTUFBYyxFQUFFLElBQVM7UUFDdkQsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUksQ0FBQyxPQUFzQixFQUFFLE1BQXFCLEVBQVEsRUFBRTtZQUMxRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7OztZQUFFLENBQUMsS0FBbUIsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO1lBQ2pGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLG9CQUFvQixDQUFDLEVBQU07UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7O2tCQUNoQyxHQUFHLEdBQVcsc0JBQXNCLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztZQUM5RCxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QyxPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7Ozs7SUFFTyxvQkFBb0IsQ0FBSSxPQUFtQjtRQUMvQzs7OztRQUFPLENBQUMsS0FBUSxFQUFLLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLEVBQUM7SUFDTixDQUFDOzs7Ozs7O0lBRU8sYUFBYSxDQUFJLE9BQW1COztjQUNsQyxNQUFNLEdBQVcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFFM0QsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDdEI7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7OztZQTVFSixVQUFVOzs7Ozs7O0lBRVAsd0RBQTZFOzs7OztJQUM3RSxvREFBbUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV4ZWN1dG9yLCBXZWJXb3JrZXJUaHJlYWQgfSBmcm9tICcuL3dvcmtlci10aHJlYWQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQW55LCBGbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJUaHJlYWRTZXJ2aWNlIGltcGxlbWVudHMgV2ViV29ya2VyVGhyZWFkIHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgd29ya2VyRnVuY3Rpb25Ub1VybE1hcDogV2Vha01hcDxGbiwgc3RyaW5nPiA9IG5ldyBXZWFrTWFwKCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHByb21pc2VUb1dvcmtlck1hcDogV2Vha01hcDxQcm9taXNlPEFueT4sIFdvcmtlcj4gPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVdvcmtlclVybChyZXNvbHZlOiBGbik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZVN0cmluZzogc3RyaW5nID0gcmVzb2x2ZS50b1N0cmluZygpO1xyXG5cclxuICAgICAgICBjb25zdCB3ZWJXb3JrZXJUZW1wbGF0ZTogc3RyaW5nID0gYFxyXG4gICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSgoJHtyZXNvbHZlU3RyaW5nfSkoZS5kYXRhKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbnN0IGJsb2I6IEJsb2IgPSBuZXcgQmxvYihbd2ViV29ya2VyVGVtcGxhdGVdLCB7IHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnIH0pO1xyXG4gICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW48VCwgSz4od29ya2VyRnVuY3Rpb246IChpbnB1dDogSykgPT4gVCwgZGF0YT86IEspOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0T3JDcmVhdGVXb3JrZXJVcmwod29ya2VyRnVuY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJ1blVybCh1cmwsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW5VcmwodXJsOiBzdHJpbmcsIGRhdGE/OiBBbnkpOiBQcm9taXNlPEFueT4ge1xyXG4gICAgICAgIGNvbnN0IHdvcmtlcjogV29ya2VyID0gbmV3IFdvcmtlcih1cmwpO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2U6IFByb21pc2U8QW55PiA9IHRoaXMuY3JlYXRlUHJvbWlzZUZvcldvcmtlcih3b3JrZXIsIGRhdGEpO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VDbGVhbmVyOiBBbnkgPSB0aGlzLmNyZWF0ZVByb21pc2VDbGVhbmVyKHByb21pc2UpO1xyXG5cclxuICAgICAgICB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5zZXQocHJvbWlzZSwgd29ya2VyKTtcclxuXHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHByb21pc2VDbGVhbmVyKS5jYXRjaChwcm9taXNlQ2xlYW5lcik7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0ZXJtaW5hdGU8VD4ocHJvbWlzZTogUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVByb21pc2UocHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdvcmtlcihwcm9taXNlOiBQcm9taXNlPEFueT4pOiBXb3JrZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5nZXQocHJvbWlzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVQcm9taXNlRm9yV29ya2VyPFQ+KHdvcmtlcjogV29ya2VyLCBkYXRhOiBBbnkpOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmU6IEV4ZWN1dG9yPEFueT4sIHJlamVjdDogRXhlY3V0b3I8QW55Pik6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudDogTWVzc2FnZUV2ZW50KSA9PiByZXNvbHZlKGV2ZW50LmRhdGEpKTtcclxuICAgICAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgcmVqZWN0KTtcclxuICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T3JDcmVhdGVXb3JrZXJVcmwoZm46IEZuKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIXRoaXMud29ya2VyRnVuY3Rpb25Ub1VybE1hcC5oYXMoZm4pKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gV2ViV29ya2VyVGhyZWFkU2VydmljZS5jcmVhdGVXb3JrZXJVcmwoZm4pO1xyXG4gICAgICAgICAgICB0aGlzLndvcmtlckZ1bmN0aW9uVG9VcmxNYXAuc2V0KGZuLCB1cmwpO1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy53b3JrZXJGdW5jdGlvblRvVXJsTWFwLmdldChmbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVQcm9taXNlQ2xlYW5lcjxUPihwcm9taXNlOiBQcm9taXNlPFQ+KTogKGlucHV0OiBBbnkpID0+IFQge1xyXG4gICAgICAgIHJldHVybiAoZXZlbnQ6IFQpOiBUID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcm9taXNlKHByb21pc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVByb21pc2U8VD4ocHJvbWlzZTogUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIGNvbnN0IHdvcmtlcjogV29ya2VyID0gdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuZ2V0KHByb21pc2UpO1xyXG5cclxuICAgICAgICBpZiAod29ya2VyKSB7XHJcbiAgICAgICAgICAgIHdvcmtlci50ZXJtaW5hdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLmRlbGV0ZShwcm9taXNlKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxufVxyXG4iXX0=