import { EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Any, KeyMap } from '../../interfaces/table-builder.internal';
import { TableCellInfo } from '../../interfaces/table-builder.external';

export abstract class TemplateCellCommon {
    public type: string = null;
    @Input() public row: boolean = null;
    @Input() public bold: boolean = null;
    @Input() public nowrap: boolean = true;
    @Input() public width: number = null;
    @Input() public height: number = null;
    @Input('ng-style') public cssStyles: KeyMap<Any> = null;
    @Input('ng-class') public cssClasses: string | string[] | KeyMap<Any> = null;
    @Output() public onClick: EventEmitter<TableCellInfo> = new EventEmitter();
    protected constructor(public template: TemplateRef<unknown>) {}
}
