/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { TemplateParserService } from '../template-parser/template-parser.service';
export class DraggableService {
    /**
     * @param {?} parser
     */
    constructor(parser) {
        this.parser = parser;
    }
    /**
     * @private
     * @return {?}
     */
    get columns() {
        return this.parser.schema.columns;
    }
    /**
     * @param {?} previousKey
     * @param {?} currentKey
     * @return {?}
     */
    drop(previousKey, currentKey) {
        /** @type {?} */
        const previousIndex = this.columns.findIndex((/**
         * @param {?} column
         * @return {?}
         */
        (column) => column.key === previousKey));
        /** @type {?} */
        const currentIndex = this.columns.findIndex((/**
         * @param {?} column
         * @return {?}
         */
        (column) => column.key === currentKey));
        if (this.canDropped(previousIndex, currentIndex)) {
            if (currentIndex === this.columns.length - 1) {
                this.columns[currentIndex].width = this.columns[previousIndex].width;
                this.columns[previousIndex].width = null;
            }
            moveItemInArray(this.columns, previousIndex, currentIndex);
        }
    }
    /**
     * @param {?} previousIndex
     * @param {?} currentIndex
     * @return {?}
     */
    canDropped(previousIndex, currentIndex) {
        /** @type {?} */
        const previous = this.columns[previousIndex];
        /** @type {?} */
        const current = this.columns[currentIndex];
        /** @type {?} */
        const previousIsDraggable = previous.draggable;
        /** @type {?} */
        const currentIsDraggable = current.draggable;
        /** @type {?} */
        const isSticky = previous.stickyLeft || current.stickyLeft || previous.stickyRight || current.stickyRight;
        return previousIsDraggable && currentIsDraggable && !isSticky;
    }
}
DraggableService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DraggableService.ctorParameters = () => [
    { type: TemplateParserService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DraggableService.prototype.parser;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL2RyYWdnYWJsZS9kcmFnZ2FibGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFJbkYsTUFBTSxPQUFPLGdCQUFnQjs7OztJQUN6QixZQUE2QixNQUE2QjtRQUE3QixXQUFNLEdBQU4sTUFBTSxDQUF1QjtJQUFHLENBQUM7Ozs7O0lBRTlELElBQVksT0FBTztRQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3RDLENBQUM7Ozs7OztJQUVNLElBQUksQ0FBQyxXQUFtQixFQUFFLFVBQWtCOztjQUN6QyxhQUFhLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxNQUFxQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLFdBQVcsRUFBQzs7Y0FDckcsWUFBWSxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLENBQUMsTUFBcUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxVQUFVLEVBQUM7UUFFekcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsRUFBRTtZQUM5QyxJQUFJLFlBQVksS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDNUM7WUFFRCxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDOzs7Ozs7SUFFTSxVQUFVLENBQUMsYUFBcUIsRUFBRSxZQUFvQjs7Y0FDbkQsUUFBUSxHQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQzs7Y0FDckQsT0FBTyxHQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQzs7Y0FDbkQsbUJBQW1CLEdBQVksUUFBUSxDQUFDLFNBQVM7O2NBQ2pELGtCQUFrQixHQUFZLE9BQU8sQ0FBQyxTQUFTOztjQUMvQyxRQUFRLEdBQ1YsUUFBUSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLFdBQVc7UUFFNUYsT0FBTyxtQkFBbUIsSUFBSSxrQkFBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNsRSxDQUFDOzs7WUEvQkosVUFBVTs7OztZQUhGLHFCQUFxQjs7Ozs7OztJQUtkLGtDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vdmVJdGVtSW5BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUZW1wbGF0ZVBhcnNlclNlcnZpY2UgfSBmcm9tICcuLi90ZW1wbGF0ZS1wYXJzZXIvdGVtcGxhdGUtcGFyc2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb2x1bW5zU2NoZW1hIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZVNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBwYXJzZXI6IFRlbXBsYXRlUGFyc2VyU2VydmljZSkge31cclxuXHJcbiAgICBwcml2YXRlIGdldCBjb2x1bW5zKCk6IENvbHVtbnNTY2hlbWFbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VyLnNjaGVtYS5jb2x1bW5zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcm9wKHByZXZpb3VzS2V5OiBzdHJpbmcsIGN1cnJlbnRLZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzSW5kZXg6IG51bWJlciA9IHRoaXMuY29sdW1ucy5maW5kSW5kZXgoKGNvbHVtbjogQ29sdW1uc1NjaGVtYSkgPT4gY29sdW1uLmtleSA9PT0gcHJldmlvdXNLZXkpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleDogbnVtYmVyID0gdGhpcy5jb2x1bW5zLmZpbmRJbmRleCgoY29sdW1uOiBDb2x1bW5zU2NoZW1hKSA9PiBjb2x1bW4ua2V5ID09PSBjdXJyZW50S2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FuRHJvcHBlZChwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50SW5kZXggPT09IHRoaXMuY29sdW1ucy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbnNbY3VycmVudEluZGV4XS53aWR0aCA9IHRoaXMuY29sdW1uc1twcmV2aW91c0luZGV4XS53aWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uc1twcmV2aW91c0luZGV4XS53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1vdmVJdGVtSW5BcnJheSh0aGlzLmNvbHVtbnMsIHByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5Ecm9wcGVkKHByZXZpb3VzSW5kZXg6IG51bWJlciwgY3VycmVudEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBwcmV2aW91czogQ29sdW1uc1NjaGVtYSA9IHRoaXMuY29sdW1uc1twcmV2aW91c0luZGV4XTtcclxuICAgICAgICBjb25zdCBjdXJyZW50OiBDb2x1bW5zU2NoZW1hID0gdGhpcy5jb2x1bW5zW2N1cnJlbnRJbmRleF07XHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNJc0RyYWdnYWJsZTogYm9vbGVhbiA9IHByZXZpb3VzLmRyYWdnYWJsZTtcclxuICAgICAgICBjb25zdCBjdXJyZW50SXNEcmFnZ2FibGU6IGJvb2xlYW4gPSBjdXJyZW50LmRyYWdnYWJsZTtcclxuICAgICAgICBjb25zdCBpc1N0aWNreTogYm9vbGVhbiA9XHJcbiAgICAgICAgICAgIHByZXZpb3VzLnN0aWNreUxlZnQgfHwgY3VycmVudC5zdGlja3lMZWZ0IHx8IHByZXZpb3VzLnN0aWNreVJpZ2h0IHx8IGN1cnJlbnQuc3RpY2t5UmlnaHQ7XHJcblxyXG4gICAgICAgIHJldHVybiBwcmV2aW91c0lzRHJhZ2dhYmxlICYmIGN1cnJlbnRJc0RyYWdnYWJsZSAmJiAhaXNTdGlja3k7XHJcbiAgICB9XHJcbn1cclxuIl19