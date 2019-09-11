/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input } from '@angular/core';
import { getDeepValue } from '../../operators/deep-value';
var TableLineRow = /** @class */ (function () {
    function TableLineRow(selection, utils) {
        this.selection = selection;
        this.utils = utils;
    }
    /**
     * @param {?} item
     * @param {?} key
     * @param {?} $event
     * @return {?}
     */
    TableLineRow.prototype.generateTableCellInfo = /**
     * @param {?} item
     * @param {?} key
     * @param {?} $event
     * @return {?}
     */
    function (item, key, $event) {
        var _this = this;
        return {
            row: item,
            event: $event,
            value: getDeepValue(item, key),
            preventDefault: (/**
             * @return {?}
             */
            function () {
                window.clearInterval(_this.selection.selectionTaskIdle);
            })
        };
    };
    TableLineRow.propDecorators = {
        isRendered: [{ type: Input, args: ['is-rendered',] }],
        columnIndex: [{ type: Input, args: ['column-index',] }],
        clientRowHeight: [{ type: Input, args: ['client-row-height',] }],
        columnSchema: [{ type: Input, args: ['column-schema',] }]
    };
    return TableLineRow;
}());
export { TableLineRow };
if (false) {
    /** @type {?} */
    TableLineRow.prototype.isRendered;
    /** @type {?} */
    TableLineRow.prototype.columnIndex;
    /** @type {?} */
    TableLineRow.prototype.clientRowHeight;
    /** @type {?} */
    TableLineRow.prototype.columnSchema;
    /** @type {?} */
    TableLineRow.prototype.selection;
    /**
     * @type {?}
     * @protected
     */
    TableLineRow.prototype.utils;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtbGluZS1yb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvY29tbW9uL3RhYmxlLWxpbmUtcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3RDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRDtJQU1JLHNCQUE0QixTQUEyQixFQUFxQixLQUFtQjtRQUFuRSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFxQixVQUFLLEdBQUwsS0FBSyxDQUFjO0lBQUcsQ0FBQzs7Ozs7OztJQUU1Riw0Q0FBcUI7Ozs7OztJQUE1QixVQUE2QixJQUFjLEVBQUUsR0FBVyxFQUFFLE1BQXlCO1FBQW5GLGlCQVNDO1FBUkcsT0FBTztZQUNILEdBQUcsRUFBRSxJQUFJO1lBQ1QsS0FBSyxFQUFFLE1BQU07WUFDYixLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7WUFDOUIsY0FBYzs7O1lBQUU7Z0JBQ1osTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFBO1NBQ0osQ0FBQztJQUNOLENBQUM7OzZCQWhCQSxLQUFLLFNBQUMsYUFBYTs4QkFDbkIsS0FBSyxTQUFDLGNBQWM7a0NBQ3BCLEtBQUssU0FBQyxtQkFBbUI7K0JBQ3pCLEtBQUssU0FBQyxlQUFlOztJQWMxQixtQkFBQztDQUFBLEFBbEJELElBa0JDO1NBbEJZLFlBQVk7OztJQUNyQixrQ0FBaUQ7O0lBQ2pELG1DQUFrRDs7SUFDbEQsdUNBQTJEOztJQUMzRCxvQ0FBMkQ7O0lBRS9DLGlDQUEyQzs7Ozs7SUFBRSw2QkFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2x1bW5zU2NoZW1hLCBUYWJsZUV2ZW50LCBUYWJsZVJvdyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IFRhYmxlQnJvd3NlckV2ZW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3NlbGVjdGlvbi9zZWxlY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBnZXREZWVwVmFsdWUgfSBmcm9tICcuLi8uLi9vcGVyYXRvcnMvZGVlcC12YWx1ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVMaW5lUm93IHtcclxuICAgIEBJbnB1dCgnaXMtcmVuZGVyZWQnKSBwdWJsaWMgaXNSZW5kZXJlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgnY29sdW1uLWluZGV4JykgcHVibGljIGNvbHVtbkluZGV4OiBudW1iZXI7XHJcbiAgICBASW5wdXQoJ2NsaWVudC1yb3ctaGVpZ2h0JykgcHVibGljIGNsaWVudFJvd0hlaWdodDogbnVtYmVyO1xyXG4gICAgQElucHV0KCdjb2x1bW4tc2NoZW1hJykgcHVibGljIGNvbHVtblNjaGVtYTogQ29sdW1uc1NjaGVtYTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgc2VsZWN0aW9uOiBTZWxlY3Rpb25TZXJ2aWNlLCBwcm90ZWN0ZWQgcmVhZG9ubHkgdXRpbHM6IFV0aWxzU2VydmljZSkge31cclxuXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGVUYWJsZUNlbGxJbmZvKGl0ZW06IFRhYmxlUm93LCBrZXk6IHN0cmluZywgJGV2ZW50OiBUYWJsZUJyb3dzZXJFdmVudCk6IFRhYmxlRXZlbnQge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJvdzogaXRlbSxcclxuICAgICAgICAgICAgZXZlbnQ6ICRldmVudCxcclxuICAgICAgICAgICAgdmFsdWU6IGdldERlZXBWYWx1ZShpdGVtLCBrZXkpLFxyXG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5zZWxlY3Rpb24uc2VsZWN0aW9uVGFza0lkbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXX0=