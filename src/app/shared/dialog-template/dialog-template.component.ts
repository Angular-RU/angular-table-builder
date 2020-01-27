import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'dialog-template',
    templateUrl: './dialog-template.template.html'
})
export class DialogTemplateComponent {
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
