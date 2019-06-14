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

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TemplateParserService, SortableService, SelectionService],
    animations: [NGX_ANIMATION]
})
export class TableBuilderComponent extends TableBuilderApiImpl implements OnChanges, OnInit, AfterContentInit {
    @ContentChildren(NgxColumnComponent) public columnTemplates: ColumnTemplates = [];
    public isFirstRendered: boolean = false;
    public displayedColumns: string[] = [];
    public scrollOffset: ScrollOffsetStatus = { offset: false };

    constructor(
        public readonly selection: SelectionService,
        protected readonly templateParser: TemplateParserService,
        protected readonly cd: ChangeDetectorRef,
        protected readonly ngZone: NgZone,
        protected readonly utils: UtilsService
    ) {
        super();
    }

    public get selectionMap(): KeyMap<boolean> {
        return this.selection.selectionModel.map;
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

    private renderTable(): void {
        if (this.async) {
            this.ngZone.runOutsideAngular(() => {
                window.requestAnimationFrame(() => this.syncRender());
            });
        } else {
            this.syncRender();
        }
    }

    private syncRender(): void {
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
        this.cd.detectChanges();
    }

    private compileTemplates(customModelColumnsKeys: string[], modelColumnKeys: string[]): string[] {
        const allowedKeyMap: KeyMap<boolean> = this.keys.length
            ? this.generateColumnsKeyMap(customModelColumnsKeys)
            : this.generateColumnsKeyMap(modelColumnKeys);

        this.templateParser.initialSchema().parse(allowedKeyMap, this.columnTemplates);
        return this.templateParser.renderedTemplateKeys;
    }

    private checkUnCompiledTemplates(): void {
        for (const key of this.displayedColumns) {
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
