import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

import { TableLineRow } from '../common/table-line-row';
import { NGX_ANIMATION } from '../../animations/fade.animation';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { SelectionService } from '../../services/selection/selection.service';
import { ResizeEvent } from '../../interfaces/table-builder.internal';

@Component({
    selector: 'table-thead',
    templateUrl: './table-thead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableTheadComponent extends TableLineRow {
    @Output() public resize: EventEmitter<ResizeEvent> = new EventEmitter();

    constructor(protected templateParser: TemplateParserService, public selection: SelectionService) {
        super(templateParser, selection);
    }
}
