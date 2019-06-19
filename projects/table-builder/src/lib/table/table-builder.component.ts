import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    NgZone,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import { ColumnTemplates, KeyMap, ScrollOffsetStatus } from './interfaces/table-builder.internal';
import { TableBuilderApiImpl } from './table-builder.api';
import { NGX_ANIMATION } from './animations/fade.animation';
import { TableSchema } from './interfaces/table-builder.external';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SortableService } from './services/sortable/sortable.service';
import { SelectionService } from './services/selection/selection.service';
import { UtilsService } from './services/utils/utils.service';
import { TableBuilderOptionsImpl } from './config/table-builder-options';

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    providers: [TemplateParserService, SortableService, SelectionService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableBuilderComponent extends TableBuilderApiImpl implements OnChanges, OnInit, AfterContentInit {
    @ContentChildren(NgxColumnComponent) public columnTemplates: ColumnTemplates = [];
    public isFirstRendered: boolean = false;
    public displayedColumns: string[] = [];
    public scrollOffset: ScrollOffsetStatus = { offset: false };
    public isRendered: boolean = false;

    constructor(
        public readonly selection: SelectionService,
        protected readonly templateParser: TemplateParserService,
        protected readonly cd: ChangeDetectorRef,
        protected readonly ngZone: NgZone,
        protected readonly utils: UtilsService
    ) {
        super();
    }

    public get selectionEntries(): KeyMap<boolean> {
        return this.selection.selectionModel.entries;
    }

    public ngOnChanges(): void {
        this.customModelColumnsKeys = this.generateCustomModelColumnsKeys();
        this.modelColumnKeys = this.generateModelColumnKeys();

        if (this.isFirstRendered) {
            this.renderTable();
        }
    }

    public ngOnInit(): void {
        this.selection.primaryKey = this.primaryKey;
    }

    public updateScrollOffset(offset: boolean): void {
        this.scrollOffset = { offset };
        this.cd.detectChanges();
    }

    public inViewportAction(column: HTMLDivElement, $event: { visible: boolean }): void {
        column['visible'] = $event.visible;
    }

    public ngAfterContentInit(): void {
        this.renderTable();
        this.isFirstRendered = true;
    }

    public generateColumnsKeyMap(keys: string[]): KeyMap<boolean> {
        const map: KeyMap<boolean> = {};
        keys.forEach((key: string) => (map[key] = true));
        return map;
    }

    private renderTable(): void {
        this.displayedColumns = [];
        const columnList: string[] = this.generateDisplayedColumns();
        this.ngZone.runOutsideAngular(() => {
            columnList.forEach((columnName: string, position: number) =>
                this.drawColumn(columnList, columnName, position)
            );
        });
    }

    private drawColumn(list: string[], columnName: string, position: number): void {
        const timeIdle: number = position + TableBuilderOptionsImpl.TIME_IDLE;
        if (position > TableBuilderOptionsImpl.COUNT_SYNC_RENDERED_COLUMNS) {
            window.setTimeout(() => {
                this.displayedColumns.push(columnName);
                this.cd.detectChanges();

                const isLast: boolean = position + 1 === list.length;
                if (isLast) {
                    this.emitRendered();
                }
            }, timeIdle);
        } else {
            this.displayedColumns.push(columnName);
            this.emitRendered();
        }
    }

    private emitRendered(): void {
        this.isRendered = true;
        this.afterRendered.emit(this.isRendered);
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

        this.templateParser.initialSchema().parse(allowedKeyMap, this.columnTemplates);
        return this.templateParser.renderedTemplateKeys;
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
