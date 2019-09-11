/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { TemplateParserService } from '../template-parser/template-parser.service';
var DraggableService = /** @class */ (function () {
    function DraggableService(parser) {
        this.parser = parser;
    }
    Object.defineProperty(DraggableService.prototype, "columns", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.parser.schema.columns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} previousKey
     * @param {?} currentKey
     * @return {?}
     */
    DraggableService.prototype.drop = /**
     * @param {?} previousKey
     * @param {?} currentKey
     * @return {?}
     */
    function (previousKey, currentKey) {
        /** @type {?} */
        var previousIndex = this.columns.findIndex((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return column.key === previousKey; }));
        /** @type {?} */
        var currentIndex = this.columns.findIndex((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return column.key === currentKey; }));
        if (this.canDropped(previousIndex, currentIndex)) {
            if (currentIndex === this.columns.length - 1) {
                this.columns[currentIndex].width = this.columns[previousIndex].width;
                this.columns[previousIndex].width = null;
            }
            moveItemInArray(this.columns, previousIndex, currentIndex);
        }
    };
    /**
     * @param {?} previousIndex
     * @param {?} currentIndex
     * @return {?}
     */
    DraggableService.prototype.canDropped = /**
     * @param {?} previousIndex
     * @param {?} currentIndex
     * @return {?}
     */
    function (previousIndex, currentIndex) {
        /** @type {?} */
        var previous = this.columns[previousIndex];
        /** @type {?} */
        var current = this.columns[currentIndex];
        /** @type {?} */
        var previousIsDraggable = previous.draggable;
        /** @type {?} */
        var currentIsDraggable = current.draggable;
        /** @type {?} */
        var isSticky = previous.stickyLeft || current.stickyLeft || previous.stickyRight || current.stickyRight;
        return previousIsDraggable && currentIsDraggable && !isSticky;
    };
    DraggableService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DraggableService.ctorParameters = function () { return [
        { type: TemplateParserService }
    ]; };
    return DraggableService;
}());
export { DraggableService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DraggableService.prototype.parser;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL2RyYWdnYWJsZS9kcmFnZ2FibGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFHbkY7SUFFSSwwQkFBNkIsTUFBNkI7UUFBN0IsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7SUFBRyxDQUFDO0lBRTlELHNCQUFZLHFDQUFPOzs7OztRQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBOzs7Ozs7SUFFTSwrQkFBSTs7Ozs7SUFBWCxVQUFZLFdBQW1CLEVBQUUsVUFBa0I7O1lBQ3pDLGFBQWEsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLE1BQXFCLElBQUssT0FBQSxNQUFNLENBQUMsR0FBRyxLQUFLLFdBQVcsRUFBMUIsQ0FBMEIsRUFBQzs7WUFDckcsWUFBWSxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsTUFBcUIsSUFBSyxPQUFBLE1BQU0sQ0FBQyxHQUFHLEtBQUssVUFBVSxFQUF6QixDQUF5QixFQUFDO1FBRXpHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLEVBQUU7WUFDOUMsSUFBSSxZQUFZLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQzVDO1lBRUQsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQzlEO0lBQ0wsQ0FBQzs7Ozs7O0lBRU0scUNBQVU7Ozs7O0lBQWpCLFVBQWtCLGFBQXFCLEVBQUUsWUFBb0I7O1lBQ25ELFFBQVEsR0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7O1lBQ3JELE9BQU8sR0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7O1lBQ25ELG1CQUFtQixHQUFZLFFBQVEsQ0FBQyxTQUFTOztZQUNqRCxrQkFBa0IsR0FBWSxPQUFPLENBQUMsU0FBUzs7WUFDL0MsUUFBUSxHQUNWLFFBQVEsQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXO1FBRTVGLE9BQU8sbUJBQW1CLElBQUksa0JBQWtCLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbEUsQ0FBQzs7Z0JBL0JKLFVBQVU7Ozs7Z0JBSEYscUJBQXFCOztJQW1DOUIsdUJBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQS9CWSxnQkFBZ0I7Ozs7OztJQUNiLGtDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vdmVJdGVtSW5BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUZW1wbGF0ZVBhcnNlclNlcnZpY2UgfSBmcm9tICcuLi90ZW1wbGF0ZS1wYXJzZXIvdGVtcGxhdGUtcGFyc2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb2x1bW5zU2NoZW1hIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZVNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBwYXJzZXI6IFRlbXBsYXRlUGFyc2VyU2VydmljZSkge31cclxuXHJcbiAgICBwcml2YXRlIGdldCBjb2x1bW5zKCk6IENvbHVtbnNTY2hlbWFbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VyLnNjaGVtYS5jb2x1bW5zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcm9wKHByZXZpb3VzS2V5OiBzdHJpbmcsIGN1cnJlbnRLZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzSW5kZXg6IG51bWJlciA9IHRoaXMuY29sdW1ucy5maW5kSW5kZXgoKGNvbHVtbjogQ29sdW1uc1NjaGVtYSkgPT4gY29sdW1uLmtleSA9PT0gcHJldmlvdXNLZXkpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleDogbnVtYmVyID0gdGhpcy5jb2x1bW5zLmZpbmRJbmRleCgoY29sdW1uOiBDb2x1bW5zU2NoZW1hKSA9PiBjb2x1bW4ua2V5ID09PSBjdXJyZW50S2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FuRHJvcHBlZChwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50SW5kZXggPT09IHRoaXMuY29sdW1ucy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbnNbY3VycmVudEluZGV4XS53aWR0aCA9IHRoaXMuY29sdW1uc1twcmV2aW91c0luZGV4XS53aWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uc1twcmV2aW91c0luZGV4XS53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1vdmVJdGVtSW5BcnJheSh0aGlzLmNvbHVtbnMsIHByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5Ecm9wcGVkKHByZXZpb3VzSW5kZXg6IG51bWJlciwgY3VycmVudEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBwcmV2aW91czogQ29sdW1uc1NjaGVtYSA9IHRoaXMuY29sdW1uc1twcmV2aW91c0luZGV4XTtcclxuICAgICAgICBjb25zdCBjdXJyZW50OiBDb2x1bW5zU2NoZW1hID0gdGhpcy5jb2x1bW5zW2N1cnJlbnRJbmRleF07XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNJc0RyYWdnYWJsZTogYm9vbGVhbiA9IHByZXZpb3VzLmRyYWdnYWJsZTtcclxuICAgICAgICBjb25zdCBjdXJyZW50SXNEcmFnZ2FibGU6IGJvb2xlYW4gPSBjdXJyZW50LmRyYWdnYWJsZTtcclxuICAgICAgICBjb25zdCBpc1N0aWNreTogYm9vbGVhbiA9XHJcbiAgICAgICAgICAgIHByZXZpb3VzLnN0aWNreUxlZnQgfHwgY3VycmVudC5zdGlja3lMZWZ0IHx8IHByZXZpb3VzLnN0aWNreVJpZ2h0IHx8IGN1cnJlbnQuc3RpY2t5UmlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiBwcmV2aW91c0lzRHJhZ2dhYmxlICYmIGN1cnJlbnRJc0RyYWdnYWJsZSAmJiAhaXNTdGlja3k7XHJcbiAgICB9XHJcbn1cclxuIl19