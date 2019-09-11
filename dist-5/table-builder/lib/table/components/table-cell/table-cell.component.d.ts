import { ChangeDetectorRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { SelectionService } from '../../services/selection/selection.service';
import { ImplicitContext, TableRow } from '../../interfaces/table-builder.external';
import { TableLineRow } from '../common/table-line-row';
import { UtilsService } from '../../services/utils/utils.service';
export declare class TableCellComponent extends TableLineRow implements OnInit, OnDestroy {
    readonly cd: ChangeDetectorRef;
    readonly selection: SelectionService;
    protected readonly utils: UtilsService;
    private readonly ngZone;
    item: TableRow;
    index: number;
    parent: HTMLDivElement;
    isFilterable: boolean;
    loaded: boolean;
    private taskId;
    contextType: typeof ImplicitContext;
    constructor(cd: ChangeDetectorRef, selection: SelectionService, utils: UtilsService, ngZone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
