import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { shallowUpdateRow, TableRow } from '@angular-ru/table-builder';

declare const hljs: Any;

const NAMES: string[] = [
    'Maia',
    'Asher',
    'Olivia',
    'Atticus',
    'Amelia',
    'Jack',
    'Charlotte',
    'Theodore',
    'Isla',
    'Oliver',
    'Isabella',
    'Jasper',
    'Cora',
    'Levi',
    'Violet',
    'Arthur',
    'Mia',
    'Thomas',
    'Elizabeth'
];

const COLORS: string[] = [
    'maroon',
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'purple',
    'fuchsia',
    'lime',
    'teal',
    'aqua',
    'blue',
    'navy',
    'black',
    'gray'
];

@Component({
    selector: 'sample-eight',
    templateUrl: './sample-eight.component.html',
    styles: [
        // tslint:disable-next-line:component-max-inline-declarations
        `
            .cost-disable {
                opacity: 0.5;
                text-decoration: line-through;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleEightComponent implements OnInit, AfterViewInit {
    public data: TableRow[];

    constructor(private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        this.data = new Array(1000).fill(0).map(() => ({
            item: 'Swim suit',
            cost: Math.floor(Math.random() * 100) + 1,
            active: true,
            name:
                NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
                ' ' +
                NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
                '.',
            weight: Math.round(Math.random() * 100).toString(),
            symbol: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
            firstName: NAMES[Math.round(Math.random() * (NAMES.length - 1))],
            lastName: NAMES[Math.round(Math.random() * (NAMES.length - 1))],
            dateOfBirth: 1985,
            spokenLanguages: {
                native: 'English',
                fluent: 'Spanish',
                intermediate: 'Chinese'
            }
        }));
    }

    public updateRow(row: TableRow, key: string, value: Any): void {
        this.data = shallowUpdateRow(this.data, row, key, value);
        this.cd.detectChanges();
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }
}
