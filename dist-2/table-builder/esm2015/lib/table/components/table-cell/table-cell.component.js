/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, ViewEncapsulation } from '@angular/core';
import { SelectionService } from '../../services/selection/selection.service';
import { ImplicitContext } from '../../interfaces/table-builder.external';
import { TableLineRow } from '../common/table-line-row';
import { UtilsService } from '../../services/utils/utils.service';
import { detectChanges } from '../../operators/detect-changes';
export class TableCellComponent extends TableLineRow {
    /**
     * @param {?} cd
     * @param {?} selection
     * @param {?} utils
     * @param {?} ngZone
     */
    constructor(cd, selection, utils, ngZone) {
        super(selection, utils);
        this.cd = cd;
        this.selection = selection;
        this.utils = utils;
        this.ngZone = ngZone;
        this.contextType = ImplicitContext;
        this.cd.reattach();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.isRendered) {
            this.loaded = true;
        }
        else {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.taskId = window.setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.loaded = true;
                    detectChanges(this.cd);
                }), this.index);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        window.clearTimeout(this.taskId);
    }
}
TableCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'table-cell',
                template: "<div #divElement class=\"table-grid__cell--inner-content\" [overflowTooltip]=\"divElement\" [parent]=\"parent\" [class.loaded]=\"loaded\">\r\n    <ng-template [ngIf]=\"columnSchema?.td?.template\" [ngIfElse]=\"defaultTd\">\r\n        <ng-template\r\n            [ngTemplateOutlet]=\"columnSchema?.td?.template\"\r\n            [ngTemplateOutletContext]=\"{\r\n                $implicit:\r\n                    columnSchema?.td?.context === contextType.CELL\r\n                        ? columnSchema?.td?.useDeepPath\r\n                            ? (item | deepPath: columnSchema.key)\r\n                            : (item | defaultValue: columnSchema.key)\r\n                        : item\r\n            }\"\r\n        ></ng-template>\r\n    </ng-template>\r\n    <ng-template #defaultTd>\r\n        <ng-template [ngIf]=\"isFilterable\" [ngIfElse]=\"simple\">\r\n            <ngx-filter-viewer\r\n                [index]=\"index\"\r\n                [key]=\"columnSchema.key\"\r\n                [text]=\"\r\n                    columnSchema?.td?.useDeepPath\r\n                        ? (item | deepPath: columnSchema.key)\r\n                        : (item | defaultValue: columnSchema.key)\r\n                \"\r\n            ></ngx-filter-viewer>\r\n        </ng-template>\r\n        <ng-template #simple>{{\r\n            columnSchema?.td?.useDeepPath\r\n                ? (item | deepPath: columnSchema.key)\r\n                : (item | defaultValue: columnSchema.key)\r\n        }}</ng-template>\r\n    </ng-template>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
TableCellComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: SelectionService },
    { type: UtilsService },
    { type: NgZone }
];
TableCellComponent.propDecorators = {
    item: [{ type: Input }],
    index: [{ type: Input }],
    parent: [{ type: Input }],
    isFilterable: [{ type: Input, args: ['is-filterable',] }]
};
if (false) {
    /** @type {?} */
    TableCellComponent.prototype.item;
    /** @type {?} */
    TableCellComponent.prototype.index;
    /** @type {?} */
    TableCellComponent.prototype.parent;
    /** @type {?} */
    TableCellComponent.prototype.isFilterable;
    /** @type {?} */
    TableCellComponent.prototype.loaded;
    /**
     * @type {?}
     * @private
     */
    TableCellComponent.prototype.taskId;
    /** @type {?} */
    TableCellComponent.prototype.contextType;
    /** @type {?} */
    TableCellComponent.prototype.cd;
    /** @type {?} */
    TableCellComponent.prototype.selection;
    /**
     * @type {?}
     * @protected
     */
    TableCellComponent.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    TableCellComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbXBvbmVudHMvdGFibGUtY2VsbC90YWJsZS1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBR04saUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxlQUFlLEVBQVksTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVEvRCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsWUFBWTs7Ozs7OztJQVVoRCxZQUNvQixFQUFxQixFQUNyQixTQUEyQixFQUN4QixLQUFtQixFQUNyQixNQUFjO1FBRS9CLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFMUixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFONUIsZ0JBQVcsR0FBMkIsZUFBZSxDQUFDO1FBU3pELElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVNLFFBQVE7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEI7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVU7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNuQixhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQixDQUFDLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7O0lBRU0sV0FBVztRQUNkLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7OztZQXpDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLGtoREFBMEM7Z0JBQzFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7OztZQXBCRyxpQkFBaUI7WUFTWixnQkFBZ0I7WUFHaEIsWUFBWTtZQVRqQixNQUFNOzs7bUJBbUJMLEtBQUs7b0JBQ0wsS0FBSztxQkFDTCxLQUFLOzJCQUNMLEtBQUssU0FBQyxlQUFlOzs7O0lBSHRCLGtDQUErQjs7SUFDL0IsbUNBQThCOztJQUM5QixvQ0FBdUM7O0lBQ3ZDLDBDQUFxRDs7SUFFckQsb0NBQXVCOzs7OztJQUN2QixvQ0FBdUI7O0lBQ3ZCLHlDQUE2RDs7SUFHekQsZ0NBQXFDOztJQUNyQyx1Q0FBMkM7Ozs7O0lBQzNDLG1DQUFzQzs7Ozs7SUFDdEMsb0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIE5nWm9uZSxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW1wbGljaXRDb250ZXh0LCBUYWJsZVJvdyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IFRhYmxlTGluZVJvdyB9IGZyb20gJy4uL2NvbW1vbi90YWJsZS1saW5lLXJvdyc7XHJcbmltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBkZXRlY3RDaGFuZ2VzIH0gZnJvbSAnLi4vLi4vb3BlcmF0b3JzL2RldGVjdC1jaGFuZ2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0YWJsZS1jZWxsJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1jZWxsLmNvbXBvbmVudC5odG1sJyxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVDZWxsQ29tcG9uZW50IGV4dGVuZHMgVGFibGVMaW5lUm93IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW06IFRhYmxlUm93O1xyXG4gICAgQElucHV0KCkgcHVibGljIGluZGV4OiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFyZW50OiBIVE1MRGl2RWxlbWVudDtcclxuICAgIEBJbnB1dCgnaXMtZmlsdGVyYWJsZScpIHB1YmxpYyBpc0ZpbHRlcmFibGU6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGxvYWRlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgdGFza0lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY29udGV4dFR5cGU6IHR5cGVvZiBJbXBsaWNpdENvbnRleHQgPSBJbXBsaWNpdENvbnRleHQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0aW9uOiBTZWxlY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIHByb3RlY3RlZCByZWFkb25seSB1dGlsczogVXRpbHNTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmVcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKHNlbGVjdGlvbiwgdXRpbHMpO1xyXG4gICAgICAgIHRoaXMuY2QucmVhdHRhY2goKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZW5kZXJlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrSWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRldGVjdENoYW5nZXModGhpcy5jZCk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGFza0lkKTtcclxuICAgIH1cclxufVxyXG4iXX0=