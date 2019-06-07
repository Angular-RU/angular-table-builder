import { Input, TemplateRef } from '@angular/core';

export abstract class TemplateCommon {
    @Input() public row: boolean = null;
    @Input() public bold: boolean = null;
    @Input() public nowrap: boolean = true;
    protected constructor(public template: TemplateRef<unknown>) {}
}
