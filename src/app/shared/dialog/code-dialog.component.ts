import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

declare const hljs: any;

@Component({
    selector: 'code-dialog',
    templateUrl: './code-dialog.template.html'
})
export class CodeDialogComponent implements AfterViewInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) {}

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: any) => {
            hljs.highlightBlock(block);
        });
    }

    public close(): void {
        this.dialogRef.close();
    }
}
