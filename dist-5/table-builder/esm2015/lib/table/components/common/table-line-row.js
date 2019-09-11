/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input } from '@angular/core';
import { getDeepValue } from '../../operators/deep-value';
export class TableLineRow {
    /**
     * @param {?} selection
     * @param {?} utils
     */
    constructor(selection, utils) {
        this.selection = selection;
        this.utils = utils;
    }
    /**
     * @param {?} item
     * @param {?} key
     * @param {?} $event
     * @return {?}
     */
    generateTableCellInfo(item, key, $event) {
        return {
            row: item,
            event: $event,
            value: getDeepValue(item, key),
            preventDefault: (/**
             * @return {?}
             */
            () => {
                window.clearInterval(this.selection.selectionTaskIdle);
            })
        };
    }
}
TableLineRow.propDecorators = {
    isRendered: [{ type: Input, args: ['is-rendered',] }],
    columnIndex: [{ type: Input, args: ['column-index',] }],
    clientRowHeight: [{ type: Input, args: ['client-row-height',] }],
    columnSchema: [{ type: Input, args: ['column-schema',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtbGluZS1yb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvY29tbW9uL3RhYmxlLWxpbmUtcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3RDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFNckIsWUFBNEIsU0FBMkIsRUFBcUIsS0FBbUI7UUFBbkUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBcUIsVUFBSyxHQUFMLEtBQUssQ0FBYztJQUFHLENBQUM7Ozs7Ozs7SUFFNUYscUJBQXFCLENBQUMsSUFBYyxFQUFFLEdBQVcsRUFBRSxNQUF5QjtRQUMvRSxPQUFPO1lBQ0gsR0FBRyxFQUFFLElBQUk7WUFDVCxLQUFLLEVBQUUsTUFBTTtZQUNiLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztZQUM5QixjQUFjOzs7WUFBRSxHQUFTLEVBQUU7Z0JBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQTtTQUNKLENBQUM7SUFDTixDQUFDOzs7eUJBaEJBLEtBQUssU0FBQyxhQUFhOzBCQUNuQixLQUFLLFNBQUMsY0FBYzs4QkFDcEIsS0FBSyxTQUFDLG1CQUFtQjsyQkFDekIsS0FBSyxTQUFDLGVBQWU7Ozs7SUFIdEIsa0NBQWlEOztJQUNqRCxtQ0FBa0Q7O0lBQ2xELHVDQUEyRDs7SUFDM0Qsb0NBQTJEOztJQUUvQyxpQ0FBMkM7Ozs7O0lBQUUsNkJBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29sdW1uc1NjaGVtYSwgVGFibGVFdmVudCwgVGFibGVSb3cgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBUYWJsZUJyb3dzZXJFdmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zZWxlY3Rpb24vc2VsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZ2V0RGVlcFZhbHVlIH0gZnJvbSAnLi4vLi4vb3BlcmF0b3JzL2RlZXAtdmFsdWUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxlTGluZVJvdyB7XHJcbiAgICBASW5wdXQoJ2lzLXJlbmRlcmVkJykgcHVibGljIGlzUmVuZGVyZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoJ2NvbHVtbi1pbmRleCcpIHB1YmxpYyBjb2x1bW5JbmRleDogbnVtYmVyO1xyXG4gICAgQElucHV0KCdjbGllbnQtcm93LWhlaWdodCcpIHB1YmxpYyBjbGllbnRSb3dIZWlnaHQ6IG51bWJlcjtcclxuICAgIEBJbnB1dCgnY29sdW1uLXNjaGVtYScpIHB1YmxpYyBjb2x1bW5TY2hlbWE6IENvbHVtbnNTY2hlbWE7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHNlbGVjdGlvbjogU2VsZWN0aW9uU2VydmljZSwgcHJvdGVjdGVkIHJlYWRvbmx5IHV0aWxzOiBVdGlsc1NlcnZpY2UpIHt9XHJcblxyXG4gICAgcHVibGljIGdlbmVyYXRlVGFibGVDZWxsSW5mbyhpdGVtOiBUYWJsZVJvdywga2V5OiBzdHJpbmcsICRldmVudDogVGFibGVCcm93c2VyRXZlbnQpOiBUYWJsZUV2ZW50IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByb3c6IGl0ZW0sXHJcbiAgICAgICAgICAgIGV2ZW50OiAkZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlOiBnZXREZWVwVmFsdWUoaXRlbSwga2V5KSxcclxuICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6ICgpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuc2VsZWN0aW9uLnNlbGVjdGlvblRhc2tJZGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl19