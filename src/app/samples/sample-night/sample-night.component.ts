import {
    AfterViewInit,
    ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnInit
} from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { TableRow } from '@angular-ru/table-builder';
import { MocksGenerator } from '@helpers/utils/mocks-generator';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';
import { MatDialog } from '@angular/material';

declare const hljs: Any;

@Component({
    selector: 'sample-night',
    templateUrl: './sample-night.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleNightComponent implements OnInit, AfterViewInit {
    public dataFirst: TableRow[];
    public dataSecond: TableRow[];
    public nativeScrollbar: boolean = false;

    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
        private readonly app: ApplicationRef,
        private readonly ngZone: NgZone
    ) {}

    public ngOnInit(): void {
        Promise.all([MocksGenerator.generator(11, 30), MocksGenerator.generator(10000, 30)]).then(
            ([first, second]: [TableRow[], TableRow[]]) => {
                this.dataFirst = first;
                this.dataSecond = second;
                this.cd.detectChanges();
            }
        );
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }

    public update(): void {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.cd.detectChanges();
                this.app.tick();
            });
        });
    }

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Custom layout',
                description: 'Automatic height calculation',
                code: `
<style>
    #main-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: calc(100% - 100px);
    }

    #widget1,
    #widget2 {
        flex: 1;
        flex-shrink: 0;
        overflow: auto;
        margin: 5px;
    }
</style>

<div id="main-column">
    <div id="widget1">
        <ngx-table-builder [source]="data"></ngx-table-builder>
    </div>
    <div id="widget2">
        <ngx-table-builder [source]="data"></ngx-table-builder>
    </div>
</div>

                    `
            },
            height: '750px',
            width: '700px'
        });
    }
}
