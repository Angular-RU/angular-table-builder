import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Fn, KeyMap, ScrollOffsetStatus, ScrollOverload } from './interfaces/table-builder.internal';
import { TableBuilderApiImpl } from './table-builder.api';
import { NGX_ANIMATION } from './animations/fade.animation';
import { TableSchema } from './interfaces/table-builder.external';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SortableService } from './services/sortable/sortable.service';
import { SelectionService } from './services/selection/selection.service';
import { UtilsService } from './services/utils/utils.service';
import { ResizableService } from './services/resizer/resizable.service';
import { TableBuilderOptionsImpl } from './config/table-builder-options';

const { TIME_IDLE, TIME_RELOAD, FRAME_TIME }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TemplateParserService, SortableService, SelectionService, ResizableService],
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableBuilderComponent extends TableBuilderApiImpl
    implements OnChanges, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {
    public dirty: boolean = true;
    public rendering: boolean = false;
    public isRendered: boolean = false;
    public contentInit: boolean = false;
    public displayedColumns: string[] = [];
    public detectOverload: boolean = false;
    public showedCellByDefault: boolean = true;
    public scrollOffset: ScrollOffsetStatus = { offset: false };
    private contentCheck: boolean = false;
    private readonly destroy$: Subject<boolean> = new Subject<boolean>();
    private checkedTaskId: number;
    private renderCount: number = 0;
    private renderTaskId: number;

    constructor(
        public readonly selection: SelectionService,
        public readonly templateParser: TemplateParserService,
        protected readonly cd: ChangeDetectorRef,
        protected readonly ngZone: NgZone,
        protected readonly utils: UtilsService,
        protected readonly resize: ResizableService,
        public readonly sortable: SortableService
    ) {
        super(cd);
    }

    public get selectionEntries(): KeyMap<boolean> {
        return this.selection.selectionModel.entries;
    }

    private get contentIsDirty(): boolean {
        return !this.contentInit && this.renderCount > 0;
    }

    private get emptySourceList(): boolean {
        return this.source && this.source.length > 0;
    }

    public ngOnChanges(): void {
        const nonIdenticalStructure: boolean = this.emptySourceList && this.getCountKeys() !== this.renderedCountKeys;

        if (nonIdenticalStructure) {
            this.renderedCountKeys = this.getCountKeys();
            this.customModelColumnsKeys = this.generateCustomModelColumnsKeys();
            this.modelColumnKeys = this.generateModelColumnKeys();
            this.originalSource = this.source;
            if (!this.dirty) {
                this.markForCheck();
            }
        }
    }

    public markForCheck(): void {
        this.contentCheck = true;
    }

    public ngOnInit(): void {
        this.selection.primaryKey = this.primaryKey;
    }

    public updateScrollOffset(offset: boolean): void {
        this.scrollOffset = { offset };
        this.detectChanges();
    }

    public scrollEnd(): void {
        this.invalidateThrottleCache();
    }

    public updateScrollOverload(event: ScrollOverload): void {
        this.scrollOverload = { ...event };

        if (event.isOverload) {
            this.detectOverload = event.isOverload;
        }

        this.detectChanges();
    }

    public markVisibleColumn(column: HTMLDivElement, visible: boolean): void {
        column['visible'] = visible;
        this.detectChanges();
    }

    public ngAfterContentInit(): void {
        this.markDirtyCheck();
        this.markTemplateContentCheck();

        if (this.emptySourceList) {
            this.render();
        }
    }

    public ngAfterViewInit(): void {
        this.listenTemplateChanges();
    }

    public ngAfterViewChecked(): void {
        if (this.viewIsDirty) {
            this.viewRefresh();
        }
    }

    private get viewIsDirty(): boolean {
        return this.contentIsDirty || this.contentCheck;
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public markTemplateContentCheck(): void {
        this.contentInit = !!this.source || !this.columnTemplates.length;
    }

    public markDirtyCheck(): void {
        this.dirty = false;
    }

    public generateColumnsKeyMap(keys: string[]): KeyMap<boolean> {
        const map: KeyMap<boolean> = {};
        keys.forEach((key: string) => (map[key] = true));
        return map;
    }

    public render(): void {
        this.contentCheck = false;
        this.ngZone.runOutsideAngular(() => {
            window.clearTimeout(this.renderTaskId);
            this.renderTaskId = window.setTimeout(() => this.renderTable(), TIME_IDLE);
        });
    }

    private viewRefresh(): void {
        this.ngZone.runOutsideAngular(() => {
            window.clearTimeout(this.checkedTaskId);
            this.checkedTaskId = window.setTimeout(() => {
                this.markTemplateContentCheck();
                this.render();
            }, FRAME_TIME);
        });
    }

    private listenTemplateChanges(): void {
        this.columnTemplates.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.markTemplateContentCheck();
            this.markForCheck();
        });
    }

    private invalidateThrottleCache(): void {
        if (this.detectOverload && this.throttling) {
            this.freezeTable = true;
            this.showedCellByDefault = false;
            this.detectChanges();
            this.ngZone.runOutsideAngular(() => {
                window.requestAnimationFrame(() => {
                    this.showedCellByDefault = true;
                    this.detectChanges();
                    window.setTimeout(() => {
                        this.freezeTable = false;
                        this.detectChanges();
                    }, TIME_RELOAD);
                });
            });
        }

        this.detectOverload = false;
    }

    private renderTable(): void {
        if (!this.rendering) {
            this.rendering = true;
            const columnList: string[] = this.generateDisplayedColumns();
            const canInvalidate: boolean = columnList.length !== this.displayedColumns.length;

            if (canInvalidate) {
                this.renderCount++;
                this.displayedColumns = [];
                this.draw(columnList, (): void => this.emitRendered());
            }
        }
    }

    private draw(originList: string[], emitRender: Fn<void>, startIndex: number = 0): void {
        this.ngZone.runOutsideAngular(() => {
            const drawTask: Fn = (): void => {
                const columnName: string = originList[startIndex];
                this.displayedColumns.push(columnName);

                this.detectChanges();
                const isNotLastElement: boolean = startIndex + 1 !== originList.length;

                if (isNotLastElement) {
                    this.draw(originList, emitRender, startIndex + 1);
                } else {
                    emitRender();
                }
            };

            if (this.lazy) {
                window.requestAnimationFrame(() => drawTask());
            } else {
                drawTask();
            }
        });
    }

    private emitRendered(): void {
        const emit: Fn = (): void => {
            this.isRendered = true;
            this.rendering = false;
            this.afterRendered.emit(this.isRendered);
            this.detectChanges();
        };

        if (this.lazy) {
            this.ngZone.runOutsideAngular(() => {
                window.setTimeout(() => emit(), TIME_IDLE);
            });
        } else {
            emit();
        }
    }

    private generateDisplayedColumns(): string[] {
        let generatedList: string[] = [];
        const renderedTemplateKeys: string[] = this.compileTemplates(this.customModelColumnsKeys, this.modelColumnKeys);

        if (this.keys.length) {
            generatedList = this.customModelColumnsKeys;
        } else if (renderedTemplateKeys.length) {
            generatedList = renderedTemplateKeys;
        } else {
            generatedList = this.modelColumnKeys;
        }

        this.checkUnCompiledTemplates(generatedList);
        return generatedList;
    }

    private compileTemplates(customModelColumnsKeys: string[], modelColumnKeys: string[]): string[] {
        const allowedKeyMap: KeyMap<boolean> = this.keys.length
            ? this.generateColumnsKeyMap(customModelColumnsKeys)
            : this.generateColumnsKeyMap(modelColumnKeys);

        this.templateParser.initialSchema(this.columnOptions).parse(allowedKeyMap, this.columnTemplates);
        return Array.from(this.templateParser.renderedTemplateKeys);
    }

    private checkUnCompiledTemplates(generatedList: string[]): void {
        for (const key of generatedList) {
            const schema: TableSchema = this.templateParser.schema;
            const notRendered: boolean = !schema.columns[key];

            if (notRendered) {
                const column: NgxColumnComponent = new NgxColumnComponent();
                column.key = key;
                this.templateParser.compileColumnMetadata(column);
            }
        }
    }
}
