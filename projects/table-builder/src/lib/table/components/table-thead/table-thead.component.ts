import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TableLineRow } from '../common/table-line-row.class';
import { fadeAnimation } from '../../core/fade.animation';

@Component({
    selector: 'table-thead',
    templateUrl: './table-thead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [fadeAnimation]
})
export class TableTheadComponent extends TableLineRow {}
