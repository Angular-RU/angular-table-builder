import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { shallowUpdateRow, TableRow } from '@angular-ru/ng-table-builder';

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
                color: red;
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
        this.data = new Array(1000).fill(0).map((_: TableRow, index: number) => ({
            id: index,
            symbol: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
            item:
                'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of' +
                ' classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin' +
                ' professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ' +
                'consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical ' +
                'literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 ' +
                'of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.' +
                ' This book is a treatise on the theory of ethics, very popular during the Renaissance. The first' +
                ' line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
                '\n' +
                'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ' +
                'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in' +
                ' their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            cost: Math.floor(Math.random() * 100) + 1,
            active: true,
            name:
                NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
                ' ' +
                NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
                '.',
            weight: Math.round(Math.random() * 100).toString(),
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
