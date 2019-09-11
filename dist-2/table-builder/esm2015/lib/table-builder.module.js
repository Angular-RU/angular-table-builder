/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NGX_TABLE_OPTIONS } from './table/config/table-builder.tokens';
import { TableBuilderComponent } from './table/table-builder.component';
import { WheelThrottlingDirective } from './table/directives/wheel.directive';
import { TableTheadComponent } from './table/components/table-thead/table-thead.component';
import { TableTbodyComponent } from './table/components/table-tbody/table-tbody.component';
import { AutoHeightDirective } from './table/directives/auto-height.directive';
import { NgxColumnComponent } from './table/components/ngx-column/ngx-column.component';
import { TemplateHeadThDirective } from './table/directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from './table/directives/rows/template-body-td.directive';
import { DeepPathPipe } from './table/pipes/deep-path.pipe';
import { UtilsService } from './table/services/utils/utils.service';
import { TableBuilderOptionsImpl } from './table/config/table-builder-options';
import { DefaultValuePipe } from './table/pipes/default-value.pipe';
import { NgxOptionsComponent } from './table/components/ngx-options/ngx-options.component';
import { WebWorkerThreadService } from './table/worker/worker-thread.service';
import { TableCellComponent } from './table/components/table-cell/table-cell.component';
import { ObserverViewDirective } from './table/directives/observer-view.directive';
import { NgxContextMenuComponent } from './table/components/ngx-context-menu/ngx-context-menu.component';
import { NgxContextMenuItemComponent } from './table/components/ngx-context-menu/ngx-context-menu-item/ngx-context-menu-item.component';
import { NgxContextMenuDividerComponent } from './table/components/ngx-context-menu/ngx-context-menu-divider/ngx-context-menu-divider.component';
import { NgxMenuContentComponent } from './table/components/ngx-context-menu/ngx-context-menu-item/ngx-menu-content-place/ngx-menu-content.component';
import { NgxEmptyComponent } from './table/components/ngx-empty/ngx-empty.component';
import { NgxHeaderComponent } from './table/components/ngx-header/ngx-header.component';
import { NgxFooterComponent } from './table/components/ngx-footer/ngx-footer.component';
import { NgxFilterViewerComponent } from './table/components/ngx-filter-viewer/ngx-filter-viewer.component';
import { NgxFilterComponent } from './table/components/ngx-filter/ngx-filter.component';
import { NgxFilterDirective } from './table/directives/ngx-filter.directive';
import { DragIconComponent } from './table/components/drag-icon/drag-icon.component';
import { NgxSourceNullComponent } from './table/components/ngx-source-null/ngx-source-null.component';
import { OverflowTooltipDirective } from './table/directives/overflow-tooltip.directive';
export class TableBuilderModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: TableBuilderModule,
            providers: [
                {
                    provide: TableBuilderModule.ROOT_OPTIONS,
                    useValue: config
                },
                {
                    provide: NGX_TABLE_OPTIONS,
                    useFactory: TableBuilderModule.loggerConfigFactory,
                    deps: [TableBuilderModule.ROOT_OPTIONS]
                }
            ]
        };
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    static loggerConfigFactory(config) {
        return Object.assign(new TableBuilderOptionsImpl(), config);
    }
}
TableBuilderModule.ROOT_OPTIONS = new InjectionToken('NGX_TABLE_OPTIONS');
TableBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, VirtualScrollerModule, DragDropModule],
                declarations: [
                    TableBuilderComponent,
                    WheelThrottlingDirective,
                    AutoHeightDirective,
                    TableTheadComponent,
                    TableTbodyComponent,
                    NgxColumnComponent,
                    TemplateHeadThDirective,
                    TemplateBodyTdDirective,
                    DeepPathPipe,
                    DefaultValuePipe,
                    NgxOptionsComponent,
                    TableCellComponent,
                    ObserverViewDirective,
                    NgxContextMenuComponent,
                    NgxContextMenuItemComponent,
                    NgxContextMenuDividerComponent,
                    NgxMenuContentComponent,
                    NgxEmptyComponent,
                    NgxHeaderComponent,
                    NgxFooterComponent,
                    NgxFilterViewerComponent,
                    NgxFilterComponent,
                    NgxFilterDirective,
                    DragIconComponent,
                    NgxSourceNullComponent,
                    OverflowTooltipDirective
                ],
                providers: [UtilsService, WebWorkerThreadService],
                exports: [
                    TableBuilderComponent,
                    TemplateHeadThDirective,
                    TemplateBodyTdDirective,
                    NgxColumnComponent,
                    NgxOptionsComponent,
                    NgxContextMenuComponent,
                    NgxContextMenuItemComponent,
                    NgxContextMenuDividerComponent,
                    NgxMenuContentComponent,
                    NgxEmptyComponent,
                    NgxHeaderComponent,
                    NgxFooterComponent,
                    NgxFilterViewerComponent,
                    NgxFilterComponent,
                    NgxFilterDirective,
                    NgxSourceNullComponent
                ]
            },] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TableBuilderModule.ROOT_OPTIONS;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWJ1aWxkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUV4RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM3RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM3RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxn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b0JBQ0wscUJBQXFCO29CQUNyQix1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsa0JBQWtCO29CQUNsQixtQkFBbUI7b0JBQ25CLHVCQUF1QjtvQkFDdkIsMkJBQTJCO29CQUMzQiw4QkFBOEI7b0JBQzlCLHVCQUF1QjtvQkFDdkIsaUJBQWlCO29CQUNqQixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsc0JBQXNCO2lCQUN6QjthQUNKOzs7Ozs7O0lBRUcsZ0NBQStHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZpcnR1YWxTY3JvbGxlck1vZHVsZSB9IGZyb20gJ25neC12aXJ0dWFsLXNjcm9sbGVyJztcclxuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IE5HWF9UQUJMRV9PUFRJT05TIH0gZnJvbSAnLi90YWJsZS9jb25maWcvdGFibGUtYnVpbGRlci50b2tlbnMnO1xyXG5pbXBvcnQgeyBUYWJsZUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL3RhYmxlLWJ1aWxkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgV2hlZWxUaHJvdHRsaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS9kaXJlY3RpdmVzL3doZWVsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRhYmxlVGhlYWRDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL2NvbXBvbmVudHMvdGFibGUtdGhlYWQvdGFibGUtdGhlYWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFibGVUYm9keUNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvY29tcG9uZW50cy90YWJsZS10Ym9keS90YWJsZS10Ym9keS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdXRvSGVpZ2h0RGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS9kaXJlY3RpdmVzL2F1dG8taGVpZ2h0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5neENvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvY29tcG9uZW50cy9uZ3gtY29sdW1uL25neC1jb2x1bW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9ucyB9IGZyb20gJy4vdGFibGUvaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuaW1wb3J0IHsgVGVtcGxhdGVIZWFkVGhEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1oZWFkLXRoLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRlbXBsYXRlQm9keVRkRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS9kaXJlY3RpdmVzL3Jvd3MvdGVtcGxhdGUtYm9keS10ZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZWVwUGF0aFBpcGUgfSBmcm9tICcuL3RhYmxlL3BpcGVzL2RlZXAtcGF0aC5waXBlJztcclxuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi90YWJsZS9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGFibGVCdWlsZGVyT3B0aW9uc0ltcGwgfSBmcm9tICcuL3RhYmxlL2NvbmZpZy90YWJsZS1idWlsZGVyLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBEZWZhdWx0VmFsdWVQaXBlIH0gZnJvbSAnLi90YWJsZS9waXBlcy9kZWZhdWx0LXZhbHVlLnBpcGUnO1xyXG5pbXBvcnQgeyBOZ3hPcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS9jb21wb25lbnRzL25neC1vcHRpb25zL25neC1vcHRpb25zLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFdlYldvcmtlclRocmVhZFNlcnZpY2UgfSBmcm9tICcuL3RhYmxlL3dvcmtlci93b3JrZXItdGhyZWFkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUYWJsZUNlbGxDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL2NvbXBvbmVudHMvdGFibGUtY2VsbC90YWJsZS1jZWxsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE9ic2VydmVyVmlld0RpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUvZGlyZWN0aXZlcy9vYnNlcnZlci12aWV3LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5neENvbnRleHRNZW51Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS9jb21wb25lbnRzL25neC1jb250ZXh0LW1lbnUvbmd4LWNvbnRleHQtbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hDb250ZXh0TWVudUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3RhYmxlL2NvbXBvbmVudHMvbmd4LWNvbnRleHQtbWVudS9uZ3gtY29udGV4dC1tZW51LWl0ZW0vbmd4LWNvbnRleHQtbWVudS1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neENvbnRleHRNZW51RGl2aWRlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvY29tcG9uZW50cy9uZ3gtY29udGV4dC1tZW51L25neC1jb250ZXh0LW1lbnUtZGl2aWRlci9uZ3gtY29udGV4dC1tZW51LWRpdmlkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4TWVudUNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL2NvbXBvbmVudHMvbmd4LWNvbnRleHQtbWVudS9uZ3gtY29udGV4dC1tZW51LWl0ZW0vbmd4LW1lbnUtY29udGVudC1wbGFjZS9uZ3gtbWVudS1jb250ZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEVtcHR5Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS9jb21wb25lbnRzL25neC1lbXB0eS9uZ3gtZW1wdHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS9jb21wb25lbnRzL25neC1oZWFkZXIvbmd4LWhlYWRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL2NvbXBvbmVudHMvbmd4LWZvb3Rlci9uZ3gtZm9vdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEZpbHRlclZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvY29tcG9uZW50cy9uZ3gtZmlsdGVyLXZpZXdlci9uZ3gtZmlsdGVyLXZpZXdlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hGaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlL2NvbXBvbmVudHMvbmd4LWZpbHRlci9uZ3gtZmlsdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEZpbHRlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUvZGlyZWN0aXZlcy9uZ3gtZmlsdGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERyYWdJY29uQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS9jb21wb25lbnRzL2RyYWctaWNvbi9kcmFnLWljb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4U291cmNlTnVsbENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUvY29tcG9uZW50cy9uZ3gtc291cmNlLW51bGwvbmd4LXNvdXJjZS1udWxsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE92ZXJmbG93VG9vbHRpcERpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUvZGlyZWN0aXZlcy9vdmVyZmxvdy10b29sdGlwLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgVmlydHVhbFNjcm9sbGVyTW9kdWxlLCBEcmFnRHJvcE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBUYWJsZUJ1aWxkZXJDb21wb25lbnQsXHJcbiAgICAgICAgV2hlZWxUaHJvdHRsaW5nRGlyZWN0aXZlLFxyXG4gICAgICAgIEF1dG9IZWlnaHREaXJlY3RpdmUsXHJcbiAgICAgICAgVGFibGVUaGVhZENvbXBvbmVudCxcclxuICAgICAgICBUYWJsZVRib2R5Q29tcG9uZW50LFxyXG4gICAgICAgIE5neENvbHVtbkNvbXBvbmVudCxcclxuICAgICAgICBUZW1wbGF0ZUhlYWRUaERpcmVjdGl2ZSxcclxuICAgICAgICBUZW1wbGF0ZUJvZHlUZERpcmVjdGl2ZSxcclxuICAgICAgICBEZWVwUGF0aFBpcGUsXHJcbiAgICAgICAgRGVmYXVsdFZhbHVlUGlwZSxcclxuICAgICAgICBOZ3hPcHRpb25zQ29tcG9uZW50LFxyXG4gICAgICAgIFRhYmxlQ2VsbENvbXBvbmVudCxcclxuICAgICAgICBPYnNlcnZlclZpZXdEaXJlY3RpdmUsXHJcbiAgICAgICAgTmd4Q29udGV4dE1lbnVDb21wb25lbnQsXHJcbiAgICAgICAgTmd4Q29udGV4dE1lbnVJdGVtQ29tcG9uZW50LFxyXG4gICAgICAgIE5neENvbnRleHRNZW51RGl2aWRlckNvbXBvbmVudCxcclxuICAgICAgICBOZ3hNZW51Q29udGVudENvbXBvbmVudCxcclxuICAgICAgICBOZ3hFbXB0eUNvbXBvbmVudCxcclxuICAgICAgICBOZ3hIZWFkZXJDb21wb25lbnQsXHJcbiAgICAgICAgTmd4Rm9vdGVyQ29tcG9uZW50LFxyXG4gICAgICAgIE5neEZpbHRlclZpZXdlckNvbXBvbmVudCxcclxuICAgICAgICBOZ3hGaWx0ZXJDb21wb25lbnQsXHJcbiAgICAgICAgTmd4RmlsdGVyRGlyZWN0aXZlLFxyXG4gICAgICAgIERyYWdJY29uQ29tcG9uZW50LFxyXG4gICAgICAgIE5neFNvdXJjZU51bGxDb21wb25lbnQsXHJcbiAgICAgICAgT3ZlcmZsb3dUb29sdGlwRGlyZWN0aXZlXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbVXRpbHNTZXJ2aWNlLCBXZWJXb3JrZXJUaHJlYWRTZXJ2aWNlXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBUYWJsZUJ1aWxkZXJDb21wb25lbnQsXHJcbiAgICAgICAgVGVtcGxhdGVIZWFkVGhEaXJlY3RpdmUsXHJcbiAgICAgICAgVGVtcGxhdGVCb2R5VGREaXJlY3RpdmUsXHJcbiAgICAgICAgTmd4Q29sdW1uQ29tcG9uZW50LFxyXG4gICAgICAgIE5neE9wdGlvbnNDb21wb25lbnQsXHJcbiAgICAgICAgTmd4Q29udGV4dE1lbnVDb21wb25lbnQsXHJcbiAgICAgICAgTmd4Q29udGV4dE1lbnVJdGVtQ29tcG9uZW50LFxyXG4gICAgICAgIE5neENvbnRleHRNZW51RGl2aWRlckNvbXBvbmVudCxcclxuICAgICAgICBOZ3hNZW51Q29udGVudENvbXBvbmVudCxcclxuICAgICAgICBOZ3hFbXB0eUNvbXBvbmVudCxcclxuICAgICAgICBOZ3hIZWFkZXJDb21wb25lbnQsXHJcbiAgICAgICAgTmd4Rm9vdGVyQ29tcG9uZW50LFxyXG4gICAgICAgIE5neEZpbHRlclZpZXdlckNvbXBvbmVudCxcclxuICAgICAgICBOZ3hGaWx0ZXJDb21wb25lbnQsXHJcbiAgICAgICAgTmd4RmlsdGVyRGlyZWN0aXZlLFxyXG4gICAgICAgIE5neFNvdXJjZU51bGxDb21wb25lbnRcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlQnVpbGRlck1vZHVsZSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBST09UX09QVElPTlM6IEluamVjdGlvblRva2VuPHN0cmluZz4gPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignTkdYX1RBQkxFX09QVElPTlMnKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlnOiBQYXJ0aWFsPFRhYmxlQnVpbGRlck9wdGlvbnM+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogVGFibGVCdWlsZGVyTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBUYWJsZUJ1aWxkZXJNb2R1bGUuUk9PVF9PUFRJT05TLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZVZhbHVlOiBjb25maWdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogTkdYX1RBQkxFX09QVElPTlMsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogVGFibGVCdWlsZGVyTW9kdWxlLmxvZ2dlckNvbmZpZ0ZhY3RvcnksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwczogW1RhYmxlQnVpbGRlck1vZHVsZS5ST09UX09QVElPTlNdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGxvZ2dlckNvbmZpZ0ZhY3RvcnkoY29uZmlnOiBQYXJ0aWFsPFRhYmxlQnVpbGRlck9wdGlvbnM+KTogVGFibGVCdWlsZGVyT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IFRhYmxlQnVpbGRlck9wdGlvbnNJbXBsKCksIGNvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuIl19