import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[ngx-td]' })
export class TemplateBodyTdDirective {
    @Input('ngx-td') public type: string = null;
    constructor(public template: TemplateRef<unknown>) {}
}
