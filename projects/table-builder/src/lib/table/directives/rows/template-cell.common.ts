import { EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { TableEvent } from '../../interfaces/table-builder.external';
import { KeyMap } from '../../interfaces/table-builder.internal';

export abstract class TemplateCellCommon {
    public type: string = null;
    @Input() public row: boolean = false;
    @Input() public bold: boolean = false;
    @Input() public nowrap: boolean = true;
    @Input() public width: number = null;
    @Input() public height: number = null;
    @Input('ng-style') public cssStyles: KeyMap = null;
    @Input('ng-class') public cssClasses: string | string[] | KeyMap = null;
    @Output() public onClick: EventEmitter<TableEvent> = new EventEmitter();
    @Output() public dblClick: EventEmitter<TableEvent> = new EventEmitter();

    protected constructor(public template: TemplateRef<unknown>) {}
}
