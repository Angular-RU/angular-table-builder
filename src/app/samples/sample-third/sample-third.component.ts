import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { TableRow } from '@angular-ru/table-builder';
import { FakeGenerator } from '../../shared/fake-generator.class';

declare const hljs: Any;

@Component({
    selector: 'sample-second',
    templateUrl: './sample-third.component.html',
    styles: [
        `
            .show-simple {
                margin-left: 20px;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleThirdComponent implements OnInit, AfterViewInit {
    public data: TableRow[];

    public ngOnInit(): void {
        this.data = FakeGenerator.generateTable(1000, 59);
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }

    public showSample(): void {}
}
