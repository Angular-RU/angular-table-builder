import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import { SelectionService } from '../../services/selection/selection.service';
import { ImplicitContext, TableRow } from '../../interfaces/table-builder.external';
import { TableLineRow } from '../common/table-line-row';
import { UtilsService } from '../../services/utils/utils.service';
import { detectChanges } from '../../operators/detect-changes';

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCellComponent extends TableLineRow implements OnInit, OnDestroy {
    @Input() public item: TableRow;
    @Input() public index: number;
    @Input() public parent: HTMLDivElement;
    @Input('is-filterable') public isFilterable: boolean;
    @Input('enable-filtering') public enableFiltering: boolean;

    public loaded: boolean;
    private taskId: number;
    public contextType: typeof ImplicitContext = ImplicitContext;

    constructor(
        public readonly cd: ChangeDetectorRef,
        public readonly selection: SelectionService,
        protected readonly utils: UtilsService,
        private readonly ngZone: NgZone
    ) {
        super(selection, utils);
        this.cd.reattach();
    }

    public ngOnInit(): void {
        if (this.isRendered) {
            this.loaded = true;
        } else {
            this.ngZone.runOutsideAngular(() => {
                this.taskId = window.setTimeout(() => {
                    this.loaded = true;
                    detectChanges(this.cd);
                }, this.index);
            });
        }
    }

    public ngOnDestroy(): void {
        window.clearTimeout(this.taskId);
    }
}
