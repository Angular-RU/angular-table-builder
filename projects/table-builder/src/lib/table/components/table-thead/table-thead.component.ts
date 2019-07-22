import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { TableLineRow } from '../common/table-line-row';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { SelectionService } from '../../services/selection/selection.service';
import { KeyMap, ResizeEvent } from '../../interfaces/table-builder.internal';
import { SortOrderType } from '../../services/sortable/sortable.interfaces';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
    selector: 'table-thead',
    templateUrl: './table-thead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableTheadComponent extends TableLineRow {
    @Input('header-top') public headerTop: number;
    @Input() public definition: KeyMap<SortOrderType>;
    @Output() public resize: EventEmitter<ResizeEvent> = new EventEmitter();
    @Output() public sortByKey: EventEmitter<string> = new EventEmitter();
    public orderType: typeof SortOrderType = SortOrderType;

    constructor(
        protected readonly templateParser: TemplateParserService,
        public readonly selection: SelectionService,
        protected readonly utils: UtilsService
    ) {
        super(templateParser, selection, utils);
    }
}
