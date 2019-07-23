import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { SelectionService } from '../../services/selection/selection.service';
import { ImplicitContext, TableRow } from '../../interfaces/table-builder.external';
import { NGX_ANIMATION } from '../../animations/fade.animation';
import { TableLineRow } from '../common/table-line-row';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableCellComponent extends TableLineRow {
    @Input() public item: TableRow;
    @Input() public index: number;

    public contextType: typeof ImplicitContext = ImplicitContext;

    constructor(
        public readonly cd: ChangeDetectorRef,
        protected readonly templateParser: TemplateParserService,
        public readonly selection: SelectionService,
        protected readonly utils: UtilsService
    ) {
        super(templateParser, selection, utils);
        this.cd.reattach();
    }
}
