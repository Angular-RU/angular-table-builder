import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

interface LicenseSample {
    id: number;
    name: string;
    price: number;
}

declare const hljs: any;

@Component({
    selector: 'sample-second',
    templateUrl: './sample-second.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSecondComponent implements AfterViewInit {
    public licenses: LicenseSample[] = [
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

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: any) => {
            hljs.highlightBlock(block);
        });
    }
}
