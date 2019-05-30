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

import { COL_WIDTH, ENABLE_INTERACTION_OBSERVER, ROW_HEIGHT } from './config/table-builder.tokens';
import { ScrollOffsetStatus } from './interfaces/table-builder.internal';
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
export class TableBuilderComponent extends TableBuilderApiImpl implements OnInit, OnChanges, AfterContentInit {
    public scrollOffset: ScrollOffsetStatus = { offset: false };
    public columnKeys: string[] = [];

    @ContentChildren(NgxColumnComponent)
    private readonly columnsList: QueryList<NgxColumnComponent>;

    constructor(
        @Inject(ROW_HEIGHT) public defaultRowHeight: number,
        @Inject(COL_WIDTH) public defaultColumnWidth: number,
        @Inject(ENABLE_INTERACTION_OBSERVER) public enabledObserver: boolean,
        private templateParser: TemplateParserService,
        private readonly cd: ChangeDetectorRef
    ) {
        super();
    }

    public get clientRowHeight(): number {
        return Number(this.rowHeight) || this.defaultRowHeight;
    }

    public get clientColWidth(): number {
        return Number(this.columnWidth) || this.defaultColumnWidth;
    }

    public get columnVirtualHeight(): number {
        return this.source.length * this.clientRowHeight;
    }

    public get columnHeight(): number {
        return this.source.length * this.clientRowHeight + this.clientRowHeight;
    }

    private get modelColumnKeys(): string[] {
        return Object.keys(this.rowKeyValue);
    }

    private get rowKeyValue(): TableRow {
        return (this.source && this.source[0]) || {};
    }

    public ngOnChanges(): void {
        this.setupTableColumnKeys();
    }

    public ngOnInit(): void {}

    public updateScrollOffset(offset: boolean): void {
        this.scrollOffset = { offset };
        this.cd.detectChanges();
    }

    public inViewportAction(column: HTMLDivElement, $event: { visible: boolean }): void {
        column['visible'] = $event.visible;
    }

    public ngAfterContentInit(): void {
        this.templateParser.parse(this.columnsList);
        this.setupTableColumnKeys();
    }

    private setupTableColumnKeys(): void {
        const templateColumnKeys: string[] = this.templateParser.templateColumnKeys;
        const modelColumnKeys: string[] = this.modelColumnKeys;
        this.columnKeys = templateColumnKeys.length ? templateColumnKeys.slice() : modelColumnKeys.slice();
    }
}
