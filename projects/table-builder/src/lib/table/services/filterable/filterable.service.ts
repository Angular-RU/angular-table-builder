import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

import { WebWorkerThreadService } from '../../worker/worker-thread.service';
import { UtilsService } from '../utils/utils.service';
import { TableRow } from '../../interfaces/table-builder.external';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import {
    FilterableMessage,
    FilterEvent,
    FilterStateEvent,
    TableFilterType,
    FilterWorkerEvent
} from './filterable.interface';
import { filterAllWorker } from './filter.worker';
import { KeyMap, Resolver } from '../../interfaces/table-builder.internal';

const { TIME_IDLE }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Injectable()
export class FilterableService {
    public filterValue: string = null;
    public definition: KeyMap<string> = {};
    public state: FilterStateEvent = new FilterStateEvent();
    public types: typeof TableFilterType = TableFilterType;
    public readonly filterOpenEvents: Subject<void> = new Subject();
    public readonly events: Subject<FilterEvent> = new ReplaySubject();
    public filterType: TableFilterType;
    public filterTypeDefinition: KeyMap<TableFilterType> = {};
    public filtering: boolean = false;
    private previousFiltering: boolean = false;

    constructor(
        private readonly thread: WebWorkerThreadService,
        private readonly utils: UtilsService,
        private readonly ngZone: NgZone,
        private readonly app: ApplicationRef
    ) {}

    public get globalFilterValue(): string {
        return this.filterValue ? String(this.filterValue).trim() : null;
    }

    public changeFilteringStatus(): void {
        this.filtering = this.filterValueExist;

        if (this.filtering !== this.previousFiltering) {
            this.events.next({ value: null, type: null });
        }

        this.previousFiltering = this.filtering;
    }

    public get filterValueExist(): boolean {
        const keyFilterValues: string = Object.values(this.definition).reduce(
            (acc: string, next: string) => acc + next,
            ''
        );
        return (this.globalFilterValue && this.globalFilterValue.length > 0) || keyFilterValues.length > 0;
    }

    public openFilter(key: string, event: MouseEvent): void {
        this.state = { opened: true, key, position: { left: event.clientX, top: event.clientY } };
        this.filterOpenEvents.next();
        event.stopPropagation();
        event.preventDefault();
    }

    public closeFilter(): void {
        this.state = new FilterStateEvent();
        this.filterOpenEvents.next();
    }

    public filter(source: TableRow[]): Promise<FilterWorkerEvent> {
        const type: TableFilterType = this.filterType;
        const value: string = this.globalFilterValue ? String(this.globalFilterValue).trim() : null;

        return new Promise((resolve: Resolver<FilterWorkerEvent>): void => {
            const message: FilterableMessage = {
                source,
                types: TableFilterType,
                global: { value, type },
                columns: {
                    values: this.definition,
                    types: this.filterTypeDefinition,
                    isEmpty: this.checkIsEmpty(this.definition)
                }
            };

            this.thread.run<TableRow[], FilterableMessage>(filterAllWorker, message).then((sorted: TableRow[]) => {
                this.ngZone.runOutsideAngular(() =>
                    window.setTimeout(() => {
                        resolve({
                            source: sorted,
                            fireSelection: (): void => {
                                window.setTimeout(() => {
                                    this.events.next({ value, type });
                                    this.app.tick();
                                }, TIME_IDLE);
                            }
                        });
                    }, TIME_IDLE)
                );
            });
        });
    }

    private checkIsEmpty(definition: KeyMap<string>): boolean {
        return Object.keys(this.utils.clean(definition)).length === 0;
    }
}
