import { ApplicationRef, ChangeDetectorRef, ElementRef, NgZone, OnInit } from '@angular/core';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { ContextMenuState } from '../../services/context-menu/context-menu.interface';
import { UtilsService } from '../../services/utils/utils.service';
import { ModalViewLayer } from '../common/modal-view-layer';
export declare class NgxContextMenuComponent extends ModalViewLayer<ContextMenuState> implements OnInit {
    private readonly contextMenu;
    protected readonly cd: ChangeDetectorRef;
    protected readonly app: ApplicationRef;
    protected readonly utils: UtilsService;
    protected readonly ngZone: NgZone;
    width: number;
    height: number;
    maxHeight: number;
    closeTime: number;
    protected targetElement: ElementRef<HTMLDivElement>;
    constructor(contextMenu: ContextMenuService, cd: ChangeDetectorRef, app: ApplicationRef, utils: UtilsService, ngZone: NgZone);
    readonly state: Partial<ContextMenuState>;
    ngOnInit(): void;
    close(event: MouseEvent): void;
}
