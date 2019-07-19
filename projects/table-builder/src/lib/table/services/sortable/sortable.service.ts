import { Injectable, NgZone } from '@angular/core';

import { KeyMap } from '../../interfaces/table-builder.internal';
import { SortableMessage, SortableResolver, SortOrderType } from './sortable.interfaces';
import { TableRow } from '../../interfaces/table-builder.external';
import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { UtilsService } from '../utils/utils.service';
import { sortWorker } from './sort.worker';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';

@Injectable()
export class SortableService {
    public definition: KeyMap<SortOrderType> = {};

    constructor(
        private readonly thread: WebWorkerThreadService,
        private readonly utils: UtilsService,
        private readonly zone: NgZone
    ) {}

    public sort(data: TableRow[], key: string = null): Promise<TableRow[]> {
        if (key) {
            this.updateSortKey(key);
        }

        return new Promise((resolve: SortableResolver<TableRow[]>): void => {
            this.thread
                .run<TableRow[], SortableMessage>(sortWorker, { definition: this.definition, source: data })
                .then((sorted: TableRow[]) => {
                    this.zone.runOutsideAngular(() =>
                        setTimeout(() => resolve(sorted), TableBuilderOptionsImpl.TIME_IDLE)
                    );
                });
        });
    }

    public get empty(): boolean {
        return Object.keys(this.definition).length === 0;
    }

    public setDefinition(definition: KeyMap<string>): void {
        this.definition = (definition as KeyMap<SortOrderType>) || {};
    }

    private updateSortKey(key: string): void {
        this.definition = this.getImmutableDefinitionWithKey(key);
    }

    private getImmutableDefinitionWithKey(key: string): KeyMap<SortOrderType> {
        const existKey: SortOrderType = this.definition[key];

        if (existKey) {
            if (existKey === SortOrderType.ASC) {
                this.definition[key] = SortOrderType.DESC;
            } else {
                delete this.definition[key];
            }
        } else {
            this.definition[key] = SortOrderType.ASC;
        }

        return { ...this.definition };
    }
}
