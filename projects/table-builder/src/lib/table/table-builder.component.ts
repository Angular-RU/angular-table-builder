import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Inject,
    OnChanges,
    OnInit,
    QueryList,
    ViewEncapsulation
} from '@angular/core';

import { COL_WIDTH, ROW_HEIGHT } from './config/table-builder.tokens';
import { KeyMap, ScrollOffsetStatus } from './interfaces/table-builder.internal';
import { TableBuilderApiImpl } from './table-builder.api';
import { fadeAnimation } from './animations/fade.animation';
import { TableSchema } from './interfaces/table-builder.external';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SortableService } from './services/sortable/sortable.service';
import { SelectionService } from './services/selection/selection.service';

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TemplateParserService, SortableService, SelectionService],
    animations: [fadeAnimation]
})
export class TableBuilderComponent extends TableBuilderApiImpl implements OnChanges, OnInit, AfterContentInit {
    public isFirstRendered: boolean = false;
    public displayedColumns: string[] = [];
    public scrollOffset: ScrollOffsetStatus = { offset: false };

    @ContentChildren(NgxColumnComponent)
    private readonly columnTemplates: QueryList<NgxColumnComponent>;

    constructor(
        public selection: SelectionService,
        @Inject(ROW_HEIGHT) public defaultRowHeight: number,
        @Inject(COL_WIDTH) public defaultColumnWidth: number,
        protected templateParser: TemplateParserService,
        protected readonly cd: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnChanges(): void {
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

    public get selectionMap(): KeyMap<boolean> {
        return this.selection.selectionModel.map;
    }

    private renderTable(): void {
        const customModelColumnsKeys: string[] = this.customModelColumnsKeys;
        const modelColumnKeys: string[] = this.modelColumnKeys;
        const renderedTemplateKeys: string[] = this.compileTemplates(customModelColumnsKeys, modelColumnKeys);

        if (this.keys.length) {
            this.displayedColumns = customModelColumnsKeys;
        } else if (renderedTemplateKeys.length) {
            this.displayedColumns = renderedTemplateKeys;
        } else {
            this.displayedColumns = modelColumnKeys;
        }

        this.checkUnCompiledTemplates();
    }

    private compileTemplates(customModelColumnsKeys: string[], modelColumnKeys: string[]): string[] {
        const allowedKeyMap: KeyMap<boolean> = this.keys.length
            ? this.generateColumnsKeyMap(customModelColumnsKeys)
            : this.generateColumnsKeyMap(modelColumnKeys);

        this.templateParser.parse(allowedKeyMap, this.columnTemplates);
        return this.templateParser.renderedTemplateKeys;
    }

    private checkUnCompiledTemplates(): void {
        for (let i: number = 0; i < this.displayedColumns.length; i++) {
            const schema: TableSchema = this.templateParser.schema;
            const key: string = this.displayedColumns[i];
            const notRendered: boolean = !schema.columns[key];

            if (notRendered) {
                const column: NgxColumnComponent = new NgxColumnComponent();
                column.key = key;
                this.templateParser.compileMetadata(column);
            }
        }
    }
}
