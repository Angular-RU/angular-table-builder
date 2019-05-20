import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableBuilderComponent } from './table/table-builder.component';
import { TableRowComponent } from './table/components/table-row/table-row.component';
import {
    TableBuilderOptions,
    THROTTLING_TIME,
    WHEEL_DELTA_LIMIT,
    WHEEL_SCROLL_LIMIT
} from './table-builder.interfaces';
import { TableBuilderConfig } from './table-builder.config';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { VirtualScrollControllerDirective } from './table/directives/virtual-scroll-controller.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InViewportModule } from 'ng-in-viewport';

@NgModule({
    imports: [CommonModule, VirtualScrollerModule, ScrollingModule, InViewportModule],
    declarations: [TableBuilderComponent, TableRowComponent, VirtualScrollControllerDirective],
    exports: [TableBuilderComponent]
})
export class TableBuilderModule {
    public static forFeature(options: Partial<TableBuilderOptions> = {}): ModuleWithProviders {
        const config: TableBuilderOptions = TableBuilderModule.getConfig(options);
        return {
            ngModule: TableBuilderModule,
            providers: [
                { provide: WHEEL_SCROLL_LIMIT, useValue: config.wheelScrollLimit },
                { provide: WHEEL_DELTA_LIMIT, useValue: config.wheelScrollDelta },
                { provide: THROTTLING_TIME, useValue: config.throttlingTime }
            ]
        };
    }

    private static getConfig(options: Partial<TableBuilderOptions>): TableBuilderOptions {
        return { ...new TableBuilderConfig(), ...options };
    }
}
