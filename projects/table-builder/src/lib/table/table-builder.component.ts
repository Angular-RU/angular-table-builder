import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
    Fn,
    KeyMap,
    QueryListColumns,
    ScrollOffsetStatus,
    ScrollOverload,
    TableKeys
} from './interfaces/table-builder.internal';
import { TableBuilderApiImpl } from './table-builder.api';
import { NGX_ANIMATION } from './animations/fade.animation';
import { TableSchema } from './interfaces/table-builder.external';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SortableService } from './services/sortable/sortable.service';
import { SelectionService } from './services/selection/selection.service';
import { UtilsService } from './services/utils/utils.service';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { ResizableService } from './services/resizer/resizable.service';
import { TableBuilderOptionsImpl } from './config/table-builder-options';
import { ColumnOptions } from './components/common/column-options';

const { SOURCE_KEY }: typeof TableKeys = TableKeys;
const { TIME_IDLE, TIME_RELOAD, TIME_REFRESH }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    providers: [TemplateParserService, SortableService, SelectionService, ResizableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableBuilderComponent extends TableBuilderApiImpl
    implements OnChanges, OnInit, AfterContentInit, AfterViewChecked, OnDestroy {
    @ContentChild(NgxOptionsComponent, { static: false })
    public columnOptions: ColumnOptions = null;

    @ContentChildren(NgxColumnComponent)
    public columnTemplates: QueryListColumns = null;

    public contentInit: boolean = false;
    public isDirtyCheck: boolean = false;
    public displayedColumns: string[] = [];
    public showedCellByDefault: boolean = true;
    public scrollOffset: ScrollOffsetStatus = { offset: false };
    public isRendered: boolean = false;
    public detectOverload: boolean = false;
    private readonly destroy$: Subject<boolean> = new Subject<boolean>();
    private checkedUnCompiledTaskId: number;
    private debugRenderCount: number = 0;

    constructor(
        public readonly selection: SelectionService,
        public readonly templateParser: TemplateParserService,
        protected readonly cd: ChangeDetectorRef,
        protected readonly ngZone: NgZone,
        protected readonly utils: UtilsService,
        protected readonly resize: ResizableService,
        public readonly sortable: SortableService
    ) {
        super(cd, ngZone);
    }

    public get selectionEntries(): KeyMap<boolean> {
        return this.selection.selectionModel.entries;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        const sourceNotNull: boolean = SOURCE_KEY in changes && changes[SOURCE_KEY].currentValue;
        const nonIdenticalStructure: boolean = sourceNotNull && this.getCountKeys() !== this.renderedCountKeys;

        if (nonIdenticalStructure) {
            this.renderedCountKeys = this.getCountKeys();
            this.customModelColumnsKeys = this.generateCustomModelColumnsKeys();
            this.modelColumnKeys = this.generateModelColumnKeys();
            this.originalSource = this.source;

            if (this.isDirtyCheck) {
                this.ngZone.runOutsideAngular(() => {
                    window.requestAnimationFrame(() => {
                        this.renderTable();
                        this.detectChanges();
                    });
                });
            }
        }
    }

    public ngOnInit(): void {
        this.selection.primaryKey = this.primaryKey;
    }

    public updateScrollOffset(offset: boolean): void {
        this.scrollOffset = { offset };
        this.detectChanges({ async: false });
    }

    public scrollEnd(): void {
        this.invalidateThrottleCache();
    }

    public updateScrollOverload(event: ScrollOverload): void {
        this.scrollOverload = { ...event };

        if (event.isOverload) {
            this.detectOverload = event.isOverload;
        }

        this.detectChanges({ async: false });
    }

    public onVisibleColumn(column: HTMLDivElement, visible: boolean): void {
        column['visible'] = visible;
        this.detectChanges();
    }

    public ngAfterContentInit(): void {
        if (this.columnTemplates) {
            if (!this.columnTemplates.length) {
                this.contentInit = true;
            }

            this.columnTemplates.changes
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.synchronizeRenderedTemplates());
        }

        if (this.source) {
            this.contentInit = true;
            this.renderTable();
        } else {
            this.isDirtyCheck = true;
        }
    }

    public ngAfterViewChecked(): void {
        if (!this.isRendered) {
            window.clearTimeout(this.checkedUnCompiledTaskId);
            this.ngZone.runOutsideAngular(() => {
                this.checkedUnCompiledTaskId = window.setTimeout(() => {
                    if (this.needRecheckTemplates) {
                        this.contentInit = true;
                        this.renderTable();
                    }
                }, TIME_REFRESH);
            });
        }
    }

    private get needRecheckTemplates(): boolean {
        return this.isDirtyCheck && !this.contentInit && (this.source && this.source.length > 0);
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public generateColumnsKeyMap(keys: string[]): KeyMap<boolean> {
        const map: KeyMap<boolean> = {};
        keys.forEach((key: string) => (map[key] = true));
        return map;
    }

    private synchronizeRenderedTemplates(): void {
        window.requestAnimationFrame(() => {
            this.contentInit = true;
            this.renderTable();
        });
    }

    private invalidateThrottleCache(): void {
        if (this.detectOverload && this.throttling) {
            this.showedCellByDefault = false;
            this.freezeTable = true;
            this.detectChanges({ async: false });
            this.ngZone.runOutsideAngular(() => {
                window.requestAnimationFrame(() => {
                    this.showedCellByDefault = true;
                    this.detectChanges({ async: false });
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
        this.contentInit &&
            this.ngZone.runOutsideAngular(() => {
                this.debugRenderCount++;
                const columnList: string[] = this.generateDisplayedColumns();
                const canInvalidate: boolean = columnList.length !== this.displayedColumns.length;
                if (canInvalidate) {
                    this.displayedColumns = [];
                    this.draw(columnList, (): void => this.emitRendered());
                }
            });
    }

    private draw(originList: string[], resolve: Fn<void>, startIndex: number = 0): void {
        window.requestAnimationFrame(() => {
            const columnName: string = originList[startIndex];
            this.displayedColumns.push(columnName);
            this.detectChanges();

            const isNotLastElement: boolean = startIndex + 1 !== originList.length;

            if (isNotLastElement) {
                this.draw(originList, resolve, startIndex + 1);
            } else {
                resolve();
            }
        });
    }

    private emitRendered(): void {
        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                this.isRendered = true;
                this.isDirtyCheck = true;
                this.afterRendered.emit(this.isRendered);
                this.detectChanges();
            }, TIME_IDLE);
        });
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
