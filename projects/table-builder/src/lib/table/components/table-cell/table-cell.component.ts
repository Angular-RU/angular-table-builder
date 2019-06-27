import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { TableLineRow } from '../common/table-line-row';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { SelectionService } from '../../services/selection/selection.service';
import { ImplicitContext, TableRow } from '../../interfaces/table-builder.external';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { NGX_ANIMATION } from '../../animations/fade.animation';
import { ScrollOverload } from '../../interfaces/table-builder.internal';

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableCellComponent extends TableLineRow implements OnInit {
    @Input('scroll-overload') public scrollOverload: Partial<ScrollOverload>;
    @Input() public item: TableRow;
    @Input() public index: number;

    public contextType: typeof ImplicitContext = ImplicitContext;
    public attached: boolean;

    constructor(
        public readonly cd: ChangeDetectorRef,
        protected templateParser: TemplateParserService,
        public selection: SelectionService,
        private readonly ngZone: NgZone
    ) {
        super(templateParser, selection);
        this.cd.reattach();
    }

    private get isDebounceRendering(): boolean {
        return this.scrollOverload.isOverload && this.async;
    }

    private get asyncTime(): number {
        return this.columnIndex + this.index + TableBuilderOptionsImpl.FRAME_TIME;
    }

    public ngOnInit(): void {
        if (this.isDebounceRendering) {
            window.clearTimeout(this.taskId);
            this.ngZone.runOutsideAngular(() => {
                this.taskId = window.setTimeout(() => this.reattach(), this.asyncTime);
            });
        } else {
            this.attached = true;
        }
    }

    private reattach(): void {
        this.attached = true;
        this.detectChanges();
    }
}
