import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[ngx-th]' })
export class TemplateHeadThDirective {
    @Input('ngx-th') public type: string = null;
    constructor(public template: TemplateRef<unknown>) {}
}
