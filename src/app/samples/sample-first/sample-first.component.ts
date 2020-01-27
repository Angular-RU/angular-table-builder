import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { TableRow } from '@angular-ru/ng-table-builder';
import { MatDialog } from '@angular/material/dialog';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';
import { MocksGenerator } from '../../../../helpers/utils/mocks-generator';

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstComponent implements OnInit, OnDestroy {
    public width: string = '100%';
    public height: number;
    public rowHeight: string;
    public columnWidth: string;
    public dataSize: string = '10x5';
    public loading: boolean = false;
    public simple: TableRow[] = [];
    public regenerate: boolean = true;
    private idInterval: number = null;

    constructor(
        private readonly cd: ChangeDetectorRef,
        public readonly dialog: MatDialog,
        private readonly ngZone: NgZone
    ) {}

    public ngOnInit(): void {
        this.updateTable();

        this.ngZone.runOutsideAngular(() => {
            this.idInterval = window.setInterval(() => {
                if (this.regenerate) {
                    this.updateTable();
                }
            }, 14500);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.idInterval);
    }

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview simple table',
                description: 'If you want enabled virtual scroll, you need use auto-height or height attribute.',
                code:
                    `<!-- simple - is Array any objects -->\n` +
                    `<ngx-table-builder [source]="simple"></ngx-table-builder>\n\n\n` +
                    `<!-- also you can set height, width for cell in table -->\n` +
                    `<ngx-table-builder\n` +
                    `   [source]="simple"\n` +
                    `   [width]="width"\n` +
                    `   [height]="height"\n` +
                    `   [row-height]="rowHeight"\n` +
                    `   [column-width]="columnWidth"\n` +
                    `></ngx-table-builder>\n`
            },
            height: '450px',
            width: '600px'
        });
    }

    public updateTable(): void {
        this.loading = true;
        switch (this.dataSize) {
            case '10x5':
                MocksGenerator.generator(10, 5).then((data: TableRow[]) => this.setData(data));
                break;

            case '100x20':
                MocksGenerator.generator(100, 20).then((data: TableRow[]) => this.setData(data));
                break;

            case '1000x30':
                MocksGenerator.generator(1000, 30).then((data: TableRow[]) => this.setData(data));
                break;

            case '10000x50':
                MocksGenerator.generator(10000, 50).then((data: TableRow[]) => this.setData(data));
                break;

            case '100000x100':
                MocksGenerator.generator(100000, 100).then((data: TableRow[]) => this.setData(data));
                break;
        }
        this.cd.detectChanges();
    }

    private setData(data: TableRow[]): void {
        this.simple = data;
        window.setTimeout(() => {
            this.loading = false;
            this.cd.detectChanges();
        }, 500);
    }
}
