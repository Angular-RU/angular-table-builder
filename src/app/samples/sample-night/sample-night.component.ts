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
    public data: TableRow[];
    public nativeScrollbar: boolean = false;

    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
        private readonly app: ApplicationRef,
        private readonly ngZone: NgZone
    ) {}

    public ngOnInit(): void {
        MocksGenerator.generator(1000, 30).then((data: TableRow[]) => {
            this.data = data;
            this.cd.detectChanges();
        });
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
    #main-column,
    #widget1,
    #widget2 {
        border: 1px dotted darkgray;
        padding: 10px;
    }

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
