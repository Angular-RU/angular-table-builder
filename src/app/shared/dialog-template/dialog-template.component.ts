import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dialog-template',
    templateUrl: './dialog-template.template.html'
})
export class DialogTemplateComponent implements OnInit {
    public form: FormGroup;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: object,
        public dialogRef: MatDialogRef<unknown>,
        private readonly fb: FormBuilder
    ) {}

    public ngOnInit(): void {
        this.form = this.fb.group({ ...this.data, id: new FormControl({ value: this.data['id'], disabled: true }) });
    }

    public save(): void {
        this.dialogRef.close(this.form.getRawValue());
    }
}
