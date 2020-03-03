import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { DragIconComponent } from './table/components/drag-icon/drag-icon.component';
import { NgxColumnComponent } from './table/components/ngx-column/ngx-column.component';
import { NgxContextMenuDividerComponent } from './table/components/ngx-context-menu/ngx-context-menu-divider/ngx-context-menu-divider.component';
import { NgxContextMenuItemComponent } from './table/components/ngx-context-menu/ngx-context-menu-item/ngx-context-menu-item.component';
import { NgxMenuContentComponent } from './table/components/ngx-context-menu/ngx-context-menu-item/ngx-menu-content-place/ngx-menu-content.component';
import { NgxContextMenuComponent } from './table/components/ngx-context-menu/ngx-context-menu.component';
import { NgxEmptyComponent } from './table/components/ngx-empty/ngx-empty.component';
import { NgxFilterViewerComponent } from './table/components/ngx-filter-viewer/ngx-filter-viewer.component';
import { NgxFilterComponent } from './table/components/ngx-filter/ngx-filter.component';
import { NgxFooterComponent } from './table/components/ngx-footer/ngx-footer.component';
import { NgxHeaderComponent } from './table/components/ngx-header/ngx-header.component';
import { NgxOptionsComponent } from './table/components/ngx-options/ngx-options.component';
import { NgxSourceNullComponent } from './table/components/ngx-source-null/ngx-source-null.component';
import { TableCellComponent } from './table/components/table-cell/table-cell.component';
import { TableTbodyComponent } from './table/components/table-tbody/table-tbody.component';
import { TableTheadComponent } from './table/components/table-thead/table-thead.component';
import { AutoHeightDirective } from './table/directives/auto-height.directive';
import { NgxFilterDirective } from './table/directives/ngx-filter.directive';
import { ObserverViewDirective } from './table/directives/observer-view.directive';
import { TemplateBodyTdDirective } from './table/directives/rows/template-body-td.directive';
import { TemplateHeadThDirective } from './table/directives/rows/template-head-th.directive';
import { DeepPathPipe } from './table/pipes/deep-path.pipe';
import { DefaultValuePipe } from './table/pipes/default-value.pipe';
import { DisableRowPipe } from './table/pipes/disable-row.pipe';
import { UtilsService } from './table/services/utils/utils.service';
import { TableBuilderComponent } from './table/table-builder.component';
import { WebWorkerThreadService } from './table/worker/worker-thread.service';

@NgModule({
    imports: [CommonModule, DragDropModule],
    declarations: [
        TableBuilderComponent,
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
        DisableRowPipe
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
    public static forRoot(): ModuleWithProviders<TableBuilderModule> {
        return {
            ngModule: TableBuilderModule,
            providers: []
        };
    }
}
