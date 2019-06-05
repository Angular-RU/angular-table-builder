import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Inject,
    OnChanges,
    QueryList,
    ViewEncapsulation
} from '@angular/core';

import { COL_WIDTH, ROW_HEIGHT } from './config/table-builder.tokens';
import { KeyMap, ScrollOffsetStatus } from './interfaces/table-builder.internal';
import { TableBuilderApiImpl } from './table-builder.api';
import { fadeAnimation } from './animations/fade.animation';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { TableRow } from './interfaces/table-builder.external';

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TemplateParserService],
    animations: [fadeAnimation]
})
export class TableBuilderComponent extends TableBuilderApiImpl implements OnChanges, AfterContentInit {
    public isFirstRendered: boolean = false;
    public displayedColumns: string[] = [];
    public scrollOffset: ScrollOffsetStatus = { offset: false };
    @ContentChildren(NgxColumnComponent) private readonly columnsList: QueryList<NgxColumnComponent>;

    constructor(
        @Inject(ROW_HEIGHT) public defaultRowHeight: number,
        @Inject(COL_WIDTH) public defaultColumnWidth: number,
        protected templateParser: TemplateParserService,
        protected readonly cd: ChangeDetectorRef
    ) {
        super();
    }

    public get clientRowHeight(): number {
        return Number(this.rowHeight) || this.defaultRowHeight;
    }

    public get clientColWidth(): number {
        return this.autoWidth ? null : Number(this.columnWidth) || this.defaultColumnWidth;
    }

    public get columnVirtualHeight(): number {
        return this.source.length * this.clientRowHeight;
    }

    public get columnHeight(): number {
        return this.source.length * this.clientRowHeight + this.clientRowHeight;
    }

    private get modelColumnKeys(): string[] {
        return this.excluding(Object.keys(this.rowKeyValue));
    }

    private get customModelColumnsKeys(): string[] {
        return this.excluding(this.keys);
    }

    private get rowKeyValue(): TableRow {
        return (this.source && this.source[0]);
    }

    public ngOnChanges(): void {
        if (this.isFirstRendered) {
            this.renderTable();
        }
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

    private excluding(keys: string[]): string[] {
        return keys.filter((key: string) => !this.excludeKeys.includes(key));
    }

    private renderTable(): void {
        const modelsKeyMap: KeyMap<boolean> = this.keys.length
            ? this.generateColumnsKeyMap(this.customModelColumnsKeys)
            : this.generateColumnsKeyMap(this.modelColumnKeys);

        this.templateParser.parse(modelsKeyMap, this.columnsList);
        const keysFromTemplate: string[] = this.templateParser.keysFromTemplate;

        if (this.keys.length) {
            this.displayedColumns = this.customModelColumnsKeys;
        } else if (keysFromTemplate.length) {
            this.displayedColumns = keysFromTemplate;
        } else {
            this.displayedColumns = this.modelColumnKeys;
        }
    }
}
