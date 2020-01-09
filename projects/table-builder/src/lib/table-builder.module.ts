import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

import { NGX_TABLE_OPTIONS } from './table/config/table-builder.tokens';
import { TableBuilderComponent } from './table/table-builder.component';
import { WheelThrottlingDirective } from './table/directives/wheel.directive';
import { TableTheadComponent } from './table/components/table-thead/table-thead.component';
import { TableTbodyComponent } from './table/components/table-tbody/table-tbody.component';
import { AutoHeightDirective } from './table/directives/auto-height.directive';
import { NgxColumnComponent } from './table/components/ngx-column/ngx-column.component';
import { TableBuilderOptions } from './table/interfaces/table-builder.external';
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
import { NgxTableRowComponent } from './table/components/ngx-table-row/ngx-table-row.component';
import { NgxLoadingComponent } from './table/components/ngx-loading/ngx-loading.component';
import { NgxTableHeadComponent } from './table/components/ngx-table-head/ngx-table-head.component';

@NgModule({
    imports: [CommonModule, VirtualScrollerModule, DragDropModule, ScrollingModule, ExperimentalScrollingModule],
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
        NgxTableHeadComponent,
        NgxTableRowComponent,
        DragIconComponent,
        NgxSourceNullComponent,
        OverflowTooltipDirective,
        NgxLoadingComponent
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
})
export class TableBuilderModule {
    private static readonly ROOT_OPTIONS: InjectionToken<string> = new InjectionToken<string>('NGX_TABLE_OPTIONS');

    public static forRoot(config: Partial<TableBuilderOptions> = {}): ModuleWithProviders {
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

    private static loggerConfigFactory(config: Partial<TableBuilderOptions>): TableBuilderOptions {
        return Object.assign(new TableBuilderOptionsImpl(), config);
    }
}
