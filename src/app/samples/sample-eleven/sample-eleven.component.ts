import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { TableRow } from '@angular-ru/table-builder';
import { MocksGenerator } from '@helpers/utils/mocks-generator';
import { NGX_ANIMATION } from '../../../../projects/table-builder/src/lib/table/animations/fade.animation';

declare const hljs: Any;

@Component({
    selector: 'sample-eleven',
    templateUrl: './sample-eleven.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION],
    styles: [
        // tslint:disable-next-line:component-max-inline-declarations
        `
            .night {
                position: relative;
                margin: auto;
            }

            /*noinspection CssUnusedSymbol*/
            .night .mat-tab-body-content {
                padding: 5px 0;
                height: calc(100% - 10px);
                overflow: hidden;
            }

            /*noinspection ALL*/
            .night .mat-tab-body-wrapper .mat-tab-body.mat-tab-body-active {
                overflow: visible;
                max-width: 100%;
            }
        `
    ]
})
export class SampleElevenComponent implements OnInit, AfterViewInit {
    public data: TableRow[];

    public licences: TableRow[] = [
        {
            id: 1,
            name: 'single',
            price: 29.3
        },
        {
            id: 2,
            name: 'developer',
            price: 49.8
        },
        {
            id: 3,
            name: 'premium',
            price: 99.5
        },
        {
            id: 4,
            name: 'enterprise',
            price: 199
        }
    ];

    constructor(private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        MocksGenerator.generator(50, 15).then((data: TableRow[]) => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        this.update();
    }

    public update(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }

    public exportExcel(data: TableRow[]): void {
        window.alert('export excel - ' + JSON.stringify(data));
    }

    public showLine(key: string, item: TableRow): void {
        window.alert('key - ' + key + ' item - ' + JSON.stringify(item));
    }

    public copyId(id: string): void {
        window.alert('Copy on buffer - ' + id);
    }
}
