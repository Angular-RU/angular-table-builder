import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableRow } from '@angular-ru/table-builder';
import { MatDialog } from '@angular/material';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';
import { FakeGenerator } from '../../shared/fake-generator.class';

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstComponent implements OnInit {
    public width: string = '100%';
    public height: number;
    public rowHeight: string;
    public columnWidth: string;
    public dataSize: string = '100x20';
    public loading: boolean = false;
    public simple: TableRow[];

    constructor(private readonly cd: ChangeDetectorRef, public readonly dialog: MatDialog) {}

    public ngOnInit(): void {
        this.updateTable();
    }

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview simple table',
                description: 'If you want enabled virtual scroll, you need use auto-height or height attribute.',
                code:
                    `<!-- simple - is Array any objects -->\n` +
                    `<ngx-table-builder\n` +
                    `   [source]="simple"\n` +
                    `   [auto-height]="true"\n` +
                    `></ngx-table-builder>\n\n\n` +
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
        switch (this.dataSize) {
            case '10x5':
                this.simple = FakeGenerator.generateTable(10, 5);
                break;

            case '100x20':
                this.simple = FakeGenerator.generateTable(100, 20);
                break;

            case '1000x30':
                this.simple = FakeGenerator.generateTable(1000, 30);
                break;

            case '10000x50':
                this.simple = FakeGenerator.generateTable(10000, 50);
                break;

            case '100000x100':
                this.loading = true;
                this.cd.detectChanges();
                setTimeout(() => {
                    this.simple = FakeGenerator.generateTable(100000, 100);
                    this.loading = false;
                    this.cd.detectChanges();
                }, 1000);

                break;
        }

        setTimeout(() => this.cd.detectChanges(), 100);
    }
}
