import { Input, TemplateRef } from '@angular/core';
import { Any, KeyMap } from '../../interfaces/table-builder.internal';

export abstract class TemplateCellCommon {
    public type: string = null;
    public useDeepPath: boolean = null;
    @Input() public row: boolean = null;
    @Input() public bold: boolean = null;
    @Input() public nowrap: boolean = true;
    @Input() public width: number = null;
    @Input() public height: number = null;
    @Input('ng-style') public cssStyles: KeyMap<Any> = null;
    @Input('ng-class') public cssClasses: string | string[] | KeyMap<Any> = null;
    protected constructor(public template: TemplateRef<unknown>) {}
}
