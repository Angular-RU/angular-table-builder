import { ApplicationRef, ChangeDetectorRef, ElementRef, NgZone, OnInit } from '@angular/core';
import { FilterableService } from '../../services/filterable/filterable.service';
import { FilterStateEvent } from '../../services/filterable/filterable.interface';
import { ModalViewLayer } from '../common/modal-view-layer';
import { UtilsService } from '../../services/utils/utils.service';
import { NgxFilterDirective } from '../../directives/ngx-filter.directive';
export declare class NgxFilterComponent extends ModalViewLayer<FilterStateEvent> implements OnInit {
    private readonly filterable;
    protected readonly cd: ChangeDetectorRef;
    protected readonly app: ApplicationRef;
    protected readonly utils: UtilsService;
    protected readonly ngZone: NgZone;
    width: number;
    height: number;
    maxHeight: number;
    closeTime: number;
    readonly leftX: number;
    readonly topY: number;
    filter: NgxFilterDirective;
    protected targetElement: ElementRef<HTMLDivElement>;
    constructor(filterable: FilterableService, cd: ChangeDetectorRef, app: ApplicationRef, utils: UtilsService, ngZone: NgZone);
    readonly state: Partial<FilterStateEvent>;
    close(event: MouseEvent): void;
    ngOnInit(): void;
}
