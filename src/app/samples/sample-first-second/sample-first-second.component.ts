import { TableRow } from '@angular-ru/ng-table-builder';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MocksGenerator } from '../../../../helpers/utils/mocks-generator';
import { detectChanges } from '../../../../projects/table-builder/src/lib/table/operators/detect-changes';
import { DialogTemplateComponent } from '../../shared/dialog-template/dialog-template.component';

@Component({
    selector: 'sample-first-second',
    templateUrl: './sample-first-second.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstSecondComponent implements OnInit, OnDestroy {
    public data: TableRow[] = [];
    private idInterval: number = null;

    constructor(
        private readonly cd: ChangeDetectorRef,
        public readonly dialog: MatDialog,
        private readonly ngZone: NgZone
    ) {}

    public ngOnInit(): void {
        const DEFAULT_TIMEOUT: number = 14500;
        this.ngZone.runOutsideAngular(() => {
            this.idInterval = window.setInterval(() => {
                this.updateTable();
            }, DEFAULT_TIMEOUT);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.idInterval);
    }

    public add(): void {
        this.updateTable();
    }

    public edit(row: TableRow): void {
        this.ngZone.run(() => {
            this.dialog
                .open(DialogTemplateComponent, { data: row, width: '1024px' })
                .afterClosed()
                .subscribe((data: TableRow) => {
                    if (data) {
                        this.data = this.data.map((val: TableRow) => (val.id === data.id ? data : val));
                        detectChanges(this.cd);
                    }
                });
        });
    }

    public updateTable(): void {
        const rows: number = 1;
        const cols: number = 10;
        MocksGenerator.generator(rows, cols, this.data.length).then((row: TableRow[]) => {
            this.data = this.data.concat(row);
            this.cd.detectChanges();
        });
    }
}
