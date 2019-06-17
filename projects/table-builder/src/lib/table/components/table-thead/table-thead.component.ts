import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TableLineRow } from '../common/table-line-row.class';
import { NGX_ANIMATION } from '../../animations/fade.animation';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { SelectionService } from '../../services/selection/selection.service';

@Component({
    selector: 'table-thead',
    templateUrl: './table-thead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableTheadComponent extends TableLineRow {
    constructor(protected templateParser: TemplateParserService, public selection: SelectionService) {
        super(templateParser, selection);
    }
}
