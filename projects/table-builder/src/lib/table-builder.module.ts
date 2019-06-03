import { ModuleWithProviders, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { InViewportModule } from 'ng-in-viewport';
import { CommonModule } from '@angular/common';

import { BUFFER_AMOUNT, COL_WIDTH, ROW_HEIGHT, WHEEL_MAX_DELTA } from './table/config/table-builder.tokens';
import { TableBuilderComponent } from './table/table-builder.component';
import { TableBuilderConfig } from './table/config/table-builder.config';
import { WheelThrottlingDirective } from './table/directives/wheel.directive';
import { TableTheadComponent } from './table/components/table-thead/table-thead.component';
import { TableTbodyComponent } from './table/components/table-tbody/table-tbody.component';
import { AutoHeightDirective } from './table/directives/auto-height.directive';
import { NgxColumnComponent } from './table/components/ngx-column/ngx-column.component';
import { TableBuilderOptions } from './table/interfaces/table-builder.external';
import { TemplateHeadThDirective } from './table/directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from './table/directives/rows/template-body-td.directive';
import { DeepPathPipe } from './table/pipes/deep-path.pipe';

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
    DeepPathPipe
  ],
  exports: [TableBuilderComponent, NgxColumnComponent, TemplateHeadThDirective, TemplateBodyTdDirective]
})
export class TableBuilderModule {
  public static forRoot(options: Partial<TableBuilderOptions> = {}): ModuleWithProviders {
    const config: TableBuilderOptions = TableBuilderModule.getConfig(options);
    return {
      ngModule: TableBuilderModule,
      providers: [
        { provide: ROW_HEIGHT, useValue: config.rowHeight },
        { provide: COL_WIDTH, useValue: config.columnWidth },
        { provide: BUFFER_AMOUNT, useValue: config.bufferAmount },
        { provide: WHEEL_MAX_DELTA, useValue: config.wheelMaxDelta }
      ]
    };
  }

  private static getConfig(options: Partial<TableBuilderOptions>): TableBuilderOptions {
    return { ...new TableBuilderConfig(), ...options };
  }
}
