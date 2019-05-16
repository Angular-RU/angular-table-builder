import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TableRow } from '../table-builder.interface';

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableBuilderComponent implements OnInit {
    @Input() public source: TableRow[] = [];
    @Input() public height: string;
    @Input() public width: string;
    @Input() public cellWidth: string;
    @Input() public rowHeight: string;
    @Input() public cellFullWidth: boolean;

    public columnKeys: string[] = [];

    public ngOnInit(): void {
        const value: TableRow = this.source[0];
        this.columnKeys = Object.keys(value);
    }
}
