import { Injectable, NgZone } from '@angular/core';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';
import { TableRow } from '../../interfaces/table-builder.external';
import { KeyMap, Resolver } from '../../interfaces/table-builder.internal';
import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { UtilsService } from '../utils/utils.service';
import { sortWorker } from './sort.worker';
import { SortableMessage, SortOrderType } from './sortable.interfaces';

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

    public get notEmpty(): boolean {
        return !this.empty;
    }

    public sort(data: TableRow[]): Promise<TableRow[]> {
        return new Promise(
            (resolve: Resolver<TableRow[]>): void => {
                this.thread
                    .run<TableRow[], SortableMessage>(sortWorker, { definition: this.definition, source: data })
                    .then(
                        (sorted: TableRow[]): void => {
                            this.zone.runOutsideAngular(
                                (): void => {
                                    window.setTimeout((): void => resolve(sorted), TABLE_GLOBAL_OPTIONS.TIME_IDLE);
                                }
                            );
                        }
                    );
            }
        );
    }

    public setDefinition(definition: KeyMap<string>): void {
        this.definition = this.empty ? (definition as KeyMap<SortOrderType>) || {} : this.definition;
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
