import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableRow } from '@angular-ru/table-builder';

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    styleUrls: ['./sample-first.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstComponent implements OnInit {
    public width: string = '100%';
    public height: number = 500;
    public rowHeight: string;
    public columnWidth: string;
    public dataSize: string = '100x20';
    public loading: boolean = false;
    public simple: TableRow[];

    constructor(private cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        this.updateTable();
    }

    public updateTable(): void {
        switch (this.dataSize) {
            case '10x5':
                this.simple = this.generateTable(10, 5);
                break;

            case '100x20':
                this.simple = this.generateTable(100, 20);
                break;

            case '1000x30':
                this.simple = this.generateTable(1000, 30);
                break;

            case '10000x50':
                this.simple = this.generateTable(10000, 50);
                break;

            case '100000x100':
                this.loading = true;
                this.cd.detectChanges();
                setTimeout(() => {
                    this.simple = this.generateTable(100000, 100);
                    this.loading = false;
                    this.cd.detectChanges();
                }, 1000);

                break;
        }

        setTimeout(() => this.cd.detectChanges(), 100);
    }

    private generateTable(rows: number, cols: number): TableRow[] {
        return new Array(rows).fill(0).map((_: any, index: number) => {
            const idx: number = index + 1;

            const baseRow: TableRow = {
                id: idx,
                name: 'Hello - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                description: 'World - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                _id: '5cdae5b2ba0a57f709b72142' + '__' + idx,
                ['About Big Text And More Powerful Label Fugiat tempor sunt nostrud']: `
                 Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam.
                 Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam.
                 Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam
                 `
            };

            if (cols > 5) {
                for (let i: number = 6; i <= cols; i++) {
                    baseRow['column-' + i] = `$row-${idx} $col-${i}`;
                }
            }

            return baseRow;
        });
    }
}
