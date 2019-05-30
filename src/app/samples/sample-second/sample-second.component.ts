import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

interface Data {
    id: number;
    name: string;
    description: string;
}

declare const hljs: any;

@Component({
    selector: 'sample-second',
    templateUrl: './sample-second.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSecondComponent implements AfterViewInit {
    public data: Data[] = [
        {
            id: 1,
            name: 'Hello',
            description: 'World'
        },
        {
            id: 2,
            name: 'Lorem',
            description: 'Ipsum'
        },
        {
            id: 3,
            name: 'Angular',
            description: 'The best'
        },
        {
            id: 4,
            name: 'React, Vue',
            description: 'Losers'
        }
    ];

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: any) => {
            hljs.highlightBlock(block);
        });
    }
}
