/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function FilterGlobalOpts() { }
if (false) {
    /** @type {?} */
    FilterGlobalOpts.prototype.value;
    /** @type {?} */
    FilterGlobalOpts.prototype.type;
}
/**
 * @record
 */
export function FilterColumnsOpts() { }
if (false) {
    /** @type {?} */
    FilterColumnsOpts.prototype.isEmpty;
    /** @type {?} */
    FilterColumnsOpts.prototype.values;
    /** @type {?} */
    FilterColumnsOpts.prototype.types;
}
/**
 * @record
 */
export function FilterableMessage() { }
if (false) {
    /** @type {?} */
    FilterableMessage.prototype.source;
    /** @type {?} */
    FilterableMessage.prototype.types;
    /** @type {?} */
    FilterableMessage.prototype.global;
    /** @type {?} */
    FilterableMessage.prototype.columns;
}
/** @enum {string} */
const TableFilterType = {
    START_WITH: 'START_WITH',
    END_WITH: 'END_WITH',
    CONTAINS: 'CONTAINS',
    DOES_NOT_CONTAIN: 'DOES_NOT_CONTAIN',
    EQUALS: 'EQUALS',
    DOES_NOT_EQUAL: 'DOES_NOT_EQUAL',
};
export { TableFilterType };
/**
 * @record
 */
export function FilterEvent() { }
if (false) {
    /** @type {?} */
    FilterEvent.prototype.value;
    /** @type {?} */
    FilterEvent.prototype.type;
}
export class FilterStateEvent {
    constructor() {
        this.key = null;
        this.opened = null;
        this.position = { left: null, top: null };
    }
}
if (false) {
    /** @type {?} */
    FilterStateEvent.prototype.key;
    /** @type {?} */
    FilterStateEvent.prototype.opened;
    /** @type {?} */
    FilterStateEvent.prototype.position;
}
/**
 * @record
 */
export function FilterWorkerEvent() { }
if (false) {
    /** @type {?} */
    FilterWorkerEvent.prototype.source;
    /** @type {?} */
    FilterWorkerEvent.prototype.fireSelection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL2ZpbHRlcmFibGUvZmlsdGVyYWJsZS5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLHNDQUdDOzs7SUFGRyxpQ0FBYzs7SUFDZCxnQ0FBc0I7Ozs7O0FBRzFCLHVDQUlDOzs7SUFIRyxvQ0FBaUI7O0lBQ2pCLG1DQUF1Qjs7SUFDdkIsa0NBQStCOzs7OztBQUduQyx1Q0FLQzs7O0lBSkcsbUNBQW1COztJQUNuQixrQ0FBOEI7O0lBQzlCLG1DQUF5Qjs7SUFDekIsb0NBQTJCOzs7O0lBSTNCLFlBQWEsWUFBWTtJQUN6QixVQUFXLFVBQVU7SUFDckIsVUFBVyxVQUFVO0lBQ3JCLGtCQUFtQixrQkFBa0I7SUFDckMsUUFBUyxRQUFRO0lBQ2pCLGdCQUFpQixnQkFBZ0I7Ozs7OztBQUdyQyxpQ0FHQzs7O0lBRkcsNEJBQWM7O0lBQ2QsMkJBQXNCOztBQUcxQixNQUFNLE9BQU8sZ0JBQWdCO0lBQTdCO1FBQ1csUUFBRyxHQUFXLElBQUksQ0FBQztRQUNuQixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBa0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0NBQUE7OztJQUhHLCtCQUEwQjs7SUFDMUIsa0NBQThCOztJQUM5QixvQ0FBMkQ7Ozs7O0FBRy9ELHVDQUdDOzs7SUFGRyxtQ0FBbUI7O0lBQ25CLDBDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhYmxlUm93IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuaW1wb3J0IHsgRm4sIEtleU1hcCwgTW91c2VQb3NpdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckdsb2JhbE9wdHMge1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHR5cGU6IFRhYmxlRmlsdGVyVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJDb2x1bW5zT3B0cyB7XHJcbiAgICBpc0VtcHR5OiBib29sZWFuO1xyXG4gICAgdmFsdWVzOiBLZXlNYXA8c3RyaW5nPjtcclxuICAgIHR5cGVzOiBLZXlNYXA8VGFibGVGaWx0ZXJUeXBlPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJhYmxlTWVzc2FnZSB7XHJcbiAgICBzb3VyY2U6IFRhYmxlUm93W107XHJcbiAgICB0eXBlczogdHlwZW9mIFRhYmxlRmlsdGVyVHlwZTtcclxuICAgIGdsb2JhbDogRmlsdGVyR2xvYmFsT3B0cztcclxuICAgIGNvbHVtbnM6IEZpbHRlckNvbHVtbnNPcHRzO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBUYWJsZUZpbHRlclR5cGUge1xyXG4gICAgU1RBUlRfV0lUSCA9ICdTVEFSVF9XSVRIJyxcclxuICAgIEVORF9XSVRIID0gJ0VORF9XSVRIJyxcclxuICAgIENPTlRBSU5TID0gJ0NPTlRBSU5TJyxcclxuICAgIERPRVNfTk9UX0NPTlRBSU4gPSAnRE9FU19OT1RfQ09OVEFJTicsXHJcbiAgICBFUVVBTFMgPSAnRVFVQUxTJyxcclxuICAgIERPRVNfTk9UX0VRVUFMID0gJ0RPRVNfTk9UX0VRVUFMJ1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckV2ZW50IHtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBUYWJsZUZpbHRlclR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTdGF0ZUV2ZW50IHtcclxuICAgIHB1YmxpYyBrZXk6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgb3BlbmVkOiBib29sZWFuID0gbnVsbDtcclxuICAgIHB1YmxpYyBwb3NpdGlvbjogTW91c2VQb3NpdGlvbiA9IHsgbGVmdDogbnVsbCwgdG9wOiBudWxsIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyV29ya2VyRXZlbnQge1xyXG4gICAgc291cmNlOiBUYWJsZVJvd1tdO1xyXG4gICAgZmlyZVNlbGVjdGlvbjogRm47XHJcbn1cclxuIl19