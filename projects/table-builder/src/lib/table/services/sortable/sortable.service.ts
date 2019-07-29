import { Injectable, NgZone } from '@angular/core';

import { KeyMap, Resolver } from '../../interfaces/table-builder.internal';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { SortableMessage, SortOrderType } from './sortable.interfaces';
import { TableRow } from '../../interfaces/table-builder.external';
import { UtilsService } from '../utils/utils.service';
import { sortWorker } from './sort.worker';

@Injectable()
export class SortableService {
    public definition: KeyMap<SortOrderType> = {};

    constructor(
        private readonly thread: WebWorkerThreadService,
        private readonly utils: UtilsService,
        private readonly zone: NgZone
    ) {}

    public get empty(): boolean {
        return Object.keys(this.definition).length === 0;
    }

    public sort(data: TableRow[]): Promise<TableRow[]> {
        return new Promise((resolve: Resolver<TableRow[]>): void => {
            this.thread
                .run<TableRow[], SortableMessage>(sortWorker, { definition: this.definition, source: data })
                .then((sorted: TableRow[]) => {
                    this.zone.runOutsideAngular(() =>
                        window.setTimeout(() => resolve(sorted), TableBuilderOptionsImpl.TIME_IDLE)
                    );
                });
        });
    }

    public setDefinition(definition: KeyMap<string>): void {
        this.definition = (definition as KeyMap<SortOrderType>) || {};
    }

    public updateSortKey(key: string): void {
        this.definition = this.updateImmutableDefinitions(key);
    }

    private updateImmutableDefinitions(key: string): KeyMap<SortOrderType> {
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
