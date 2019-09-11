/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ContextMenuState = /** @class */ (function () {
    function ContextMenuState(state) {
        if (state === void 0) { state = null; }
        this.opened = false;
        this.position = { left: null, top: null };
        this.key = null;
        this.item = null;
        this.value = null;
        if (state) {
            this.opened = state.opened;
            this.position = state.position;
            this.key = state.key;
            this.item = state.item;
            this.value = state.value;
        }
    }
    return ContextMenuState;
}());
export { ContextMenuState };
if (false) {
    /** @type {?} */
    ContextMenuState.prototype.opened;
    /** @type {?} */
    ContextMenuState.prototype.position;
    /** @type {?} */
    ContextMenuState.prototype.key;
    /** @type {?} */
    ContextMenuState.prototype.item;
    /** @type {?} */
    ContextMenuState.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLXJ1L25nLXRhYmxlLWJ1aWxkZXIvIiwic291cmNlcyI6WyJsaWIvdGFibGUvc2VydmljZXMvY29udGV4dC1tZW51L2NvbnRleHQtbWVudS5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBO0lBT0ksMEJBQVksS0FBdUM7UUFBdkMsc0JBQUEsRUFBQSxZQUF1QztRQU41QyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBa0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNwRCxRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFNBQUksR0FBYSxJQUFJLENBQUM7UUFDdEIsVUFBSyxHQUFRLElBQUksQ0FBQztRQUdyQixJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDOzs7O0lBZkcsa0NBQStCOztJQUMvQixvQ0FBMkQ7O0lBQzNELCtCQUEwQjs7SUFDMUIsZ0NBQTZCOztJQUM3QixpQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWJsZVJvdyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IEFueSwgTW91c2VQb3NpdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnVTdGF0ZSB7XHJcbiAgICBwdWJsaWMgb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgcG9zaXRpb246IE1vdXNlUG9zaXRpb24gPSB7IGxlZnQ6IG51bGwsIHRvcDogbnVsbCB9O1xyXG4gICAgcHVibGljIGtleTogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBpdGVtOiBUYWJsZVJvdyA9IG51bGw7XHJcbiAgICBwdWJsaWMgdmFsdWU6IEFueSA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGU6IFBhcnRpYWw8Q29udGV4dE1lbnVTdGF0ZT4gPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbmVkID0gc3RhdGUub3BlbmVkO1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gc3RhdGUucG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMua2V5ID0gc3RhdGUua2V5O1xyXG4gICAgICAgICAgICB0aGlzLml0ZW0gPSBzdGF0ZS5pdGVtO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gc3RhdGUudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==