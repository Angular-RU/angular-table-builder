import { NgZone } from '@angular/core';
import { KeyMap } from '../../interfaces/table-builder.internal';
import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { SortOrderType } from './sortable.interfaces';
import { TableRow } from '../../interfaces/table-builder.external';
import { UtilsService } from '../utils/utils.service';
export declare class SortableService {
    private readonly thread;
    private readonly utils;
    private readonly zone;
    definition: KeyMap<SortOrderType>;
    constructor(thread: WebWorkerThreadService, utils: UtilsService, zone: NgZone);
    readonly empty: boolean;
    sort(data: TableRow[]): Promise<TableRow[]>;
    setDefinition(definition: KeyMap<string>): void;
    updateSortKey(key: string): void;
    private updateImmutableDefinitions;
}
