import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TableLineRow } from '../common/table-line-row.class';
import { fadeAnimation } from '../../animations/fade.animation';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';

@Component({
    selector: 'table-thead',
    templateUrl: './table-thead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [fadeAnimation]
})
export class TableTheadComponent extends TableLineRow {
    constructor(protected templateParser: TemplateParserService) {
        super(templateParser);
    }
}
