import { ModuleWithProviders, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InViewportModule } from 'ng-in-viewport';
import { CommonModule } from '@angular/common';

import { TableBuilderComponent } from './table/table-builder.component';
import { TableBuilderOptions } from './table-builder.interfaces';
import { TableBuilderConfig } from './table-builder.config';
import { BUFFER_AMOUNT, COL_WIDTH, OUTSIDE_ZONE, ROW_HEIGHT, WHEEL_MAX_DELTA } from './table-builder.tokens';
import { WheelThrottlingDirective } from './table/directives/wheel.directive';

@NgModule({
    imports: [CommonModule, VirtualScrollerModule, ScrollingModule, InViewportModule],
    declarations: [TableBuilderComponent, WheelThrottlingDirective],
    exports: [TableBuilderComponent]
})
export class TableBuilderModule {
    public static forRoot(options: Partial<TableBuilderOptions> = {}): ModuleWithProviders {
        const config: TableBuilderOptions = TableBuilderModule.getConfig(options);
        return {
            ngModule: TableBuilderModule,
            providers: [
                { provide: OUTSIDE_ZONE, useValue: config.outsideZone },
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
