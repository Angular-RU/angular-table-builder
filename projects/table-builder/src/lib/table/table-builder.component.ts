import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    NgZone,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import {
    ColumnListRef,
    ColumnOptionsRef,
    Fn,
    KeyMap,
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
import { TableBuilderOptionsImpl } from './config/table-builder-options';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { ResizableService } from './services/resizer/resizable.service';

const {
    COUNT_SYNC_RENDERED_COLUMNS,
    TIME_IDLE,
    SMOOTH_FPS_FRAME
}: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

const { SOURCE_KEY }: typeof TableKeys = TableKeys;

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    providers: [TemplateParserService, SortableService, SelectionService, ResizableService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableBuilderComponent extends TableBuilderApiImpl implements OnChanges, OnInit, AfterContentInit {
    @ContentChild(NgxOptionsComponent, { static: true }) public columnOptions: ColumnOptionsRef = null;
    @ContentChildren(NgxColumnComponent) public columnList: ColumnListRef = [];

    public isDirtyCheck: boolean = false;
    public displayedColumns: string[] = [];
    public scrollOffset: ScrollOffsetStatus = { offset: false };
    public isRendered: boolean = false;

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

    public ngOnChanges(changes: SimpleChanges): void {
        const sourceNotNull: boolean = SOURCE_KEY in changes && changes[SOURCE_KEY].currentValue;

        if (sourceNotNull && this.getCountKeys() !== this.renderedCountKeys) {
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
        this.detectChanges();
    }

    public updateScrollOverload(event: ScrollOverload): void {
        this.scrollOverload = { ...event };
        this.detectChanges();
    }

    public inViewportAction(column: HTMLDivElement, $event: { visible: boolean }): void {
        column['visible'] = $event.visible;
    }

    public ngAfterContentInit(): void {
        if (this.source) {
            this.renderTable();
        } else {
            this.isDirtyCheck = true;
        }
    }

    public generateColumnsKeyMap(keys: string[]): KeyMap<boolean> {
        const map: KeyMap<boolean> = {};
        keys.forEach((key: string) => (map[key] = true));
        return map;
    }

    private renderTable(): void {
        this.ngZone.runOutsideAngular(() => {
            this.displayedColumns = [];
            const columnList: string[] = this.generateDisplayedColumns();
            columnList.forEach((name: string, index: number) => {
                this.drawColumn(name, index).then((position: number) => {
                    const isLast: boolean = position + 1 === columnList.length;
                    if (isLast) {
                        this.emitRendered();
                    }
                });
            });
        });
    }

    private drawColumn(columnName: string, index: number): Promise<number> {
        return new Promise((resolve: Fn<number>): void => {
            if (index > COUNT_SYNC_RENDERED_COLUMNS) {
                window.setTimeout(() => {
                    this.displayedColumns.push(columnName);
                    this.detectChanges();
                    resolve(index);
                }, index + TIME_IDLE + SMOOTH_FPS_FRAME);
            } else {
                this.displayedColumns.push(columnName);
                resolve(index);
            }
        });
    }

    private emitRendered(): void {
        this.isRendered = true;
        this.isDirtyCheck = true;
        this.afterRendered.emit(this.isRendered);
        this.detectChanges();
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

        this.templateParser.initialSchema(this.columnOptions).parse(allowedKeyMap, this.columnList);
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
