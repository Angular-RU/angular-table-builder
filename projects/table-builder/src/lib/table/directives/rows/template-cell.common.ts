import { Input, TemplateRef } from '@angular/core';
import { ObjectKeyMap } from '../../../../../../../src/app/shared/symbol';
import { Any } from '../../interfaces/table-builder.internal';

export abstract class TemplateCellCommon {
    public type: string = null;
    public useDeepPath: boolean = null;
    @Input() public row: boolean = null;
    @Input() public bold: boolean = null;
    @Input() public nowrap: boolean = true;
    @Input('ng-style') public cssStyles: ObjectKeyMap<Any> = null;
    @Input('ng-class') public cssClasses: string | string[] | ObjectKeyMap<Any> = null;
    protected constructor(public template: TemplateRef<unknown>) {}
}
