import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableRow } from '@angular-ru/table-builder';

import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';

declare const hljs: Any;

@Component({
    selector: 'sample-fourth',
    templateUrl: './sample-fourth.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFourthComponent implements OnInit, AfterViewInit {
    public data: TableRow[];

    public ngOnInit(): void {
        this.data = [
            {
                toppings: ['tomato sauce', 'mozzarella cheese'],
                prices: {
                    small: '5.00',
                    medium: '6.00',
                    large: '7.00'
                }
            },
            {
                toppings: ['tomato sauce', 'mozzarella cheese', 'ham'],
                prices: {
                    small: '6.50',
                    medium: '7.50',
                    large: '8.50'
                }
            }
        ];
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }

    public showSample(): void {}
}
