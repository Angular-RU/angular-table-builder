import { ModuleWithProviders, NgModule } from '@angular/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { InViewportModule } from 'ng-in-viewport';
import { CommonModule } from '@angular/common';

import {
    BUFFER_AMOUNT,
    COL_WIDTH,
    ENABLE_INTERACTION_OBSERVER,
    OUTSIDE_ZONE,
    ROW_HEIGHT,
    WHEEL_MAX_DELTA
} from './table-builder.tokens';
import { TableBuilderComponent } from './table/table-builder.component';
import { TableBuilderOptions } from './table-builder.interfaces';
import { TableBuilderConfig } from './table-builder.config';
import { WheelThrottlingDirective } from './table/directives/wheel.directive';
import { TableTheadComponent } from './table/components/table-thead/table-thead.component';
import { TableTbodyComponent } from './table/components/table-tbody/table-tbody.component';

@NgModule({
    imports: [CommonModule, VirtualScrollerModule, InViewportModule],
    declarations: [TableBuilderComponent, WheelThrottlingDirective, TableTheadComponent, TableTbodyComponent],
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
                { provide: WHEEL_MAX_DELTA, useValue: config.wheelMaxDelta },
                { provide: ENABLE_INTERACTION_OBSERVER, useValue: config.enableInteractionObserver }
            ]
        };
    }

    private static getConfig(options: Partial<TableBuilderOptions>): TableBuilderOptions {
        return { ...new TableBuilderConfig(), ...options };
    }
}
