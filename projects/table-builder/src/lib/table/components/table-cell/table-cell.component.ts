import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnInit,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { SelectionService } from '../../services/selection/selection.service';
import { ImplicitContext, TableRow } from '../../interfaces/table-builder.external';
import { TableLineRow } from '../common/table-line-row';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCellComponent extends TableLineRow implements OnInit {
    @Input() public item: TableRow;
    @Input() public index: number;
    @Input('is-filterable') public isFilterable: boolean;

    public contextType: typeof ImplicitContext = ImplicitContext;
    public loaded: boolean;

    constructor(
        public readonly cd: ChangeDetectorRef,
        protected readonly templateParser: TemplateParserService,
        public readonly selection: SelectionService,
        protected readonly utils: UtilsService,
        private readonly ngZone: NgZone
    ) {
        super(templateParser, selection, utils);
        this.cd.reattach();
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                this.loaded = true;
                this.detectChanges();
            }, this.index);
        });
    }

    public detectChanges(): void {
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
        }
    }
}
