import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    Output,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';

import { ScrollStatus, TableRow } from '../../../table-builder.interfaces';
import { BUFFER_AMOUNT, OUTSIDE_ZONE } from '../../../table-builder.tokens';
import { fadeAnimation } from '../../core/fade.animation';
import { TableLineRow } from '../common/table-line-row.class';

@Component({
    selector: 'table-tbody',
    templateUrl: './table-tbody.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [fadeAnimation]
})
export class TableTbodyComponent extends TableLineRow {
    @Input() public source: TableRow[];
    @Input('primary-key') public primaryKey: string;
    @Input('scroll-status') public scrollStatus: ScrollStatus;
    @Input('table-viewport') public tableViewport: HTMLElement;
    @Input('column-virtual-height') public columnVirtualHeight: number;
    @Input('buffer-amount') public bufferAmount: number;
    @Output() public outsideZoneUpdated: EventEmitter<void> = new EventEmitter();

    private idThrottle: number = null;

    constructor(
        @Inject(OUTSIDE_ZONE) public outsideZone: boolean,
        @Inject(BUFFER_AMOUNT) public defaultBufferAmount: number,
        private cd: ChangeDetectorRef,
        private zone: NgZone
    ) {
        super();
    }

    public get clientBufferAmount(): number {
        return Number(this.bufferAmount) || this.defaultBufferAmount;
    }

    public trackByIdx(index: number, item: TableRow): number {
        return item[this.primaryKey] ? item[this.primaryKey] : index;
    }

    public updateViewport(): void {
        if (this.outsideZone) {
            this.markForCheck();

            if (!this.scrollStatus.overload) {
                this.detectChanges();
            } else {
                this.throttleUpdateViewport();
            }
        }
    }

    private throttleUpdateViewport(): void {
        clearInterval(this.idThrottle);
        this.zone.runOutsideAngular(() => {
            this.idThrottle = setTimeout(() => this.detectChanges(), 100);
        });
    }

    private markForCheck(): void {
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.markForCheck();
        }
    }

    private detectChanges(): void {
        this.outsideZoneUpdated.emit();
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
        }
    }
}
