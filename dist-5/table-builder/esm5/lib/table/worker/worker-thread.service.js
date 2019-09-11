/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var WebWorkerThreadService = /** @class */ (function () {
    function WebWorkerThreadService() {
        this.workerFunctionToUrlMap = new WeakMap();
        this.promiseToWorkerMap = new WeakMap();
    }
    /**
     * @private
     * @param {?} resolve
     * @return {?}
     */
    WebWorkerThreadService.createWorkerUrl = /**
     * @private
     * @param {?} resolve
     * @return {?}
     */
    function (resolve) {
        /** @type {?} */
        var resolveString = resolve.toString();
        /** @type {?} */
        var webWorkerTemplate = "\n            self.addEventListener('message', function(e) {\n                postMessage((" + resolveString + ")(e.data));\n            });\n        ";
        /** @type {?} */
        var blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    };
    /**
     * @template T, K
     * @param {?} workerFunction
     * @param {?=} data
     * @return {?}
     */
    WebWorkerThreadService.prototype.run = /**
     * @template T, K
     * @param {?} workerFunction
     * @param {?=} data
     * @return {?}
     */
    function (workerFunction, data) {
        /** @type {?} */
        var url = this.getOrCreateWorkerUrl(workerFunction);
        return this.runUrl(url, data);
    };
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    WebWorkerThreadService.prototype.runUrl = /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    function (url, data) {
        /** @type {?} */
        var worker = new Worker(url);
        /** @type {?} */
        var promise = this.createPromiseForWorker(worker, data);
        /** @type {?} */
        var promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    };
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebWorkerThreadService.prototype.terminate = /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        return this.removePromise(promise);
    };
    /**
     * @param {?} promise
     * @return {?}
     */
    WebWorkerThreadService.prototype.getWorker = /**
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        return this.promiseToWorkerMap.get(promise);
    };
    /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    WebWorkerThreadService.prototype.createPromiseForWorker = /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    function (worker, data) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            worker.addEventListener('message', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return resolve(event.data); }));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        }));
    };
    /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    WebWorkerThreadService.prototype.getOrCreateWorkerUrl = /**
     * @private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            /** @type {?} */
            var url = WebWorkerThreadService.createWorkerUrl(fn);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return this.workerFunctionToUrlMap.get(fn);
    };
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebWorkerThreadService.prototype.createPromiseCleaner = /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        var _this = this;
        return (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.removePromise(promise);
            return event;
        });
    };
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebWorkerThreadService.prototype.removePromise = /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        /** @type {?} */
        var worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    };
    WebWorkerThreadService.decorators = [
        { type: Injectable }
    ];
    return WebWorkerThreadService;
}());
export { WebWorkerThreadService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyLXRocmVhZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItcnUvbmctdGFibGUtYnVpbGRlci8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS93b3JrZXIvd29ya2VyLXRocmVhZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDO0lBQUE7UUFFcUIsMkJBQXNCLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUQsdUJBQWtCLEdBQWtDLElBQUksT0FBTyxFQUFFLENBQUM7SUEwRXZGLENBQUM7Ozs7OztJQXhFa0Isc0NBQWU7Ozs7O0lBQTlCLFVBQStCLE9BQVc7O1lBQ2hDLGFBQWEsR0FBVyxPQUFPLENBQUMsUUFBUSxFQUFFOztZQUUxQyxpQkFBaUIsR0FBVyxnR0FFWCxhQUFhLDJDQUVuQzs7WUFFSyxJQUFJLEdBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUM7UUFDN0UsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7Ozs7SUFFTSxvQ0FBRzs7Ozs7O0lBQVYsVUFBaUIsY0FBK0IsRUFBRSxJQUFROztZQUNoRCxHQUFHLEdBQVcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUVNLHVDQUFNOzs7OztJQUFiLFVBQWMsR0FBVyxFQUFFLElBQVU7O1lBQzNCLE1BQU0sR0FBVyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUM7O1lBQ2hDLE9BQU8sR0FBaUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7O1lBQ2pFLGNBQWMsR0FBUSxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDO1FBRTlELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVNLDBDQUFTOzs7OztJQUFoQixVQUFvQixPQUFtQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFTSwwQ0FBUzs7OztJQUFoQixVQUFpQixPQUFxQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7Ozs7SUFFTyx1REFBc0I7Ozs7Ozs7SUFBOUIsVUFBa0MsTUFBYyxFQUFFLElBQVM7UUFDdkQsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUksVUFBQyxPQUFzQixFQUFFLE1BQXFCO1lBQ2hFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1lBQUUsVUFBQyxLQUFtQixJQUFLLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBbkIsQ0FBbUIsRUFBQyxDQUFDO1lBQ2pGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLHFEQUFvQjs7Ozs7SUFBNUIsVUFBNkIsRUFBTTtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTs7Z0JBQ2hDLEdBQUcsR0FBVyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1lBQzlELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7OztJQUVPLHFEQUFvQjs7Ozs7O0lBQTVCLFVBQWdDLE9BQW1CO1FBQW5ELGlCQUtDO1FBSkc7Ozs7UUFBTyxVQUFDLEtBQVE7WUFDWixLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsRUFBQztJQUNOLENBQUM7Ozs7Ozs7SUFFTyw4Q0FBYTs7Ozs7O0lBQXJCLFVBQXlCLE9BQW1COztZQUNsQyxNQUFNLEdBQVcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFFM0QsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDdEI7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7O2dCQTVFSixVQUFVOztJQTZFWCw2QkFBQztDQUFBLEFBN0VELElBNkVDO1NBNUVZLHNCQUFzQjs7Ozs7O0lBQy9CLHdEQUE2RTs7Ozs7SUFDN0Usb0RBQW1GIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFeGVjdXRvciwgV2ViV29ya2VyVGhyZWFkIH0gZnJvbSAnLi93b3JrZXItdGhyZWFkLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEFueSwgRm4gfSBmcm9tICcuLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyVGhyZWFkU2VydmljZSBpbXBsZW1lbnRzIFdlYldvcmtlclRocmVhZCB7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHdvcmtlckZ1bmN0aW9uVG9VcmxNYXA6IFdlYWtNYXA8Rm4sIHN0cmluZz4gPSBuZXcgV2Vha01hcCgpO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9taXNlVG9Xb3JrZXJNYXA6IFdlYWtNYXA8UHJvbWlzZTxBbnk+LCBXb3JrZXI+ID0gbmV3IFdlYWtNYXAoKTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVXb3JrZXJVcmwocmVzb2x2ZTogRm4pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVTdHJpbmc6IHN0cmluZyA9IHJlc29sdmUudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgd2ViV29ya2VyVGVtcGxhdGU6IHN0cmluZyA9IGBcclxuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoKCR7cmVzb2x2ZVN0cmluZ30pKGUuZGF0YSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb25zdCBibG9iOiBCbG9iID0gbmV3IEJsb2IoW3dlYldvcmtlclRlbXBsYXRlXSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KTtcclxuICAgICAgICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuPFQsIEs+KHdvcmtlckZ1bmN0aW9uOiAoaW5wdXQ6IEspID0+IFQsIGRhdGE/OiBLKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSB0aGlzLmdldE9yQ3JlYXRlV29ya2VyVXJsKHdvcmtlckZ1bmN0aW9uKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5ydW5VcmwodXJsLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuVXJsKHVybDogc3RyaW5nLCBkYXRhPzogQW55KTogUHJvbWlzZTxBbnk+IHtcclxuICAgICAgICBjb25zdCB3b3JrZXI6IFdvcmtlciA9IG5ldyBXb3JrZXIodXJsKTtcclxuICAgICAgICBjb25zdCBwcm9taXNlOiBQcm9taXNlPEFueT4gPSB0aGlzLmNyZWF0ZVByb21pc2VGb3JXb3JrZXIod29ya2VyLCBkYXRhKTtcclxuICAgICAgICBjb25zdCBwcm9taXNlQ2xlYW5lcjogQW55ID0gdGhpcy5jcmVhdGVQcm9taXNlQ2xlYW5lcihwcm9taXNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuc2V0KHByb21pc2UsIHdvcmtlcik7XHJcblxyXG4gICAgICAgIHByb21pc2UudGhlbihwcm9taXNlQ2xlYW5lcikuY2F0Y2gocHJvbWlzZUNsZWFuZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGVybWluYXRlPFQ+KHByb21pc2U6IFByb21pc2U8VD4pOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVQcm9taXNlKHByb21pc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXb3JrZXIocHJvbWlzZTogUHJvbWlzZTxBbnk+KTogV29ya2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuZ2V0KHByb21pc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlUHJvbWlzZUZvcldvcmtlcjxUPih3b3JrZXI6IFdvcmtlciwgZGF0YTogQW55KTogUHJvbWlzZTxUPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlOiBFeGVjdXRvcjxBbnk+LCByZWplY3Q6IEV4ZWN1dG9yPEFueT4pOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4gcmVzb2x2ZShldmVudC5kYXRhKSk7XHJcbiAgICAgICAgICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZShkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE9yQ3JlYXRlV29ya2VyVXJsKGZuOiBGbik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLndvcmtlckZ1bmN0aW9uVG9VcmxNYXAuaGFzKGZuKSkge1xyXG4gICAgICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9IFdlYldvcmtlclRocmVhZFNlcnZpY2UuY3JlYXRlV29ya2VyVXJsKGZuKTtcclxuICAgICAgICAgICAgdGhpcy53b3JrZXJGdW5jdGlvblRvVXJsTWFwLnNldChmbiwgdXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud29ya2VyRnVuY3Rpb25Ub1VybE1hcC5nZXQoZm4pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlUHJvbWlzZUNsZWFuZXI8VD4ocHJvbWlzZTogUHJvbWlzZTxUPik6IChpbnB1dDogQW55KSA9PiBUIHtcclxuICAgICAgICByZXR1cm4gKGV2ZW50OiBUKTogVCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUHJvbWlzZShwcm9taXNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVQcm9taXNlPFQ+KHByb21pc2U6IFByb21pc2U8VD4pOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICBjb25zdCB3b3JrZXI6IFdvcmtlciA9IHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLmdldChwcm9taXNlKTtcclxuXHJcbiAgICAgICAgaWYgKHdvcmtlcikge1xyXG4gICAgICAgICAgICB3b3JrZXIudGVybWluYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5kZWxldGUocHJvbWlzZSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbn1cclxuIl19