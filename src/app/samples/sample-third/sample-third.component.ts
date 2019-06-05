/* tslint:disable:no-unused-css */
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';

declare const hljs: Any;

@Component({
    selector: 'sample-second',
    templateUrl: './sample-third.component.html',
    styles: [
        // tslint:disable-next-line:component-max-inline-declarations
        ``
    ],
    // Use to disable CSS Encapsulation for this component
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleThirdComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }
}
