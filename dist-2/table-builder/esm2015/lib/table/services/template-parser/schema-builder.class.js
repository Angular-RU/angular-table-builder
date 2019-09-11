/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class SchemaBuilder {
    /**
     * @param {?=} columns
     */
    constructor(columns = []) {
        this.columns = columns;
    }
    /**
     * @return {?}
     */
    exportColumns() {
        return this.columns.map((/**
         * @param {?} column
         * @return {?}
         */
        (column) => ({
            key: column.key,
            width: column.width,
            isVisible: column.isVisible,
            isModel: column.isModel
        })));
    }
}
if (false) {
    /** @type {?} */
    SchemaBuilder.prototype.columns;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWJ1aWxkZXIuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3RlbXBsYXRlLXBhcnNlci9zY2hlbWEtYnVpbGRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsTUFBTSxPQUFPLGFBQWE7Ozs7SUFDdEIsWUFBbUIsVUFBMkIsRUFBRTtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtJQUFHLENBQUM7Ozs7SUFFN0MsYUFBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztRQUFDLENBQUMsTUFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoRCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDZixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzNCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztTQUMxQixDQUFDLEVBQUMsQ0FBQztJQUNSLENBQUM7Q0FDSjs7O0lBVmUsZ0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uc1NjaGVtYSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IERlZXBQYXJ0aWFsIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTY2hlbWFCdWlsZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb2x1bW5zOiBDb2x1bW5zU2NoZW1hW10gPSBbXSkge31cclxuXHJcbiAgICBwdWJsaWMgZXhwb3J0Q29sdW1ucygpOiBBcnJheTxEZWVwUGFydGlhbDxDb2x1bW5zU2NoZW1hPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbHVtbnMubWFwKChjb2x1bW46IENvbHVtbnNTY2hlbWEpID0+ICh7XHJcbiAgICAgICAgICAgIGtleTogY29sdW1uLmtleSxcclxuICAgICAgICAgICAgd2lkdGg6IGNvbHVtbi53aWR0aCxcclxuICAgICAgICAgICAgaXNWaXNpYmxlOiBjb2x1bW4uaXNWaXNpYmxlLFxyXG4gICAgICAgICAgICBpc01vZGVsOiBjb2x1bW4uaXNNb2RlbFxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=