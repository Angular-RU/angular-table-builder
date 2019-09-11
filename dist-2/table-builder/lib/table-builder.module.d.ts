import { ModuleWithProviders } from '@angular/core';
import { TableBuilderOptions } from './table/interfaces/table-builder.external';
export declare class TableBuilderModule {
    private static readonly ROOT_OPTIONS;
    static forRoot(config?: Partial<TableBuilderOptions>): ModuleWithProviders;
    private static loggerConfigFactory;
}
