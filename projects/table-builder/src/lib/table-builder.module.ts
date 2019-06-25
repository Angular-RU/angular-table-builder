import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { InViewportModule } from 'ng-in-viewport';
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

@NgModule({
    imports: [CommonModule, VirtualScrollerModule, InViewportModule],
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
        NgxOptionsComponent
    ],
    providers: [UtilsService, WebWorkerThreadService],
    exports: [
        TableBuilderComponent,
        NgxColumnComponent,
        TemplateHeadThDirective,
        TemplateBodyTdDirective,
        NgxOptionsComponent
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
