import { ApplicationRef, ChangeDetectorRef, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from '../../services/utils/utils.service';
import { MousePosition } from '../../interfaces/table-builder.internal';
export interface PositionState {
    key: string;
    opened: boolean;
    position: MousePosition;
}
export declare abstract class ModalViewLayer<T extends PositionState> implements OnDestroy {
    protected readonly cd: ChangeDetectorRef;
    protected readonly app: ApplicationRef;
    protected readonly utils: UtilsService;
    protected readonly ngZone: NgZone;
    width: number;
    height: number;
    isViewed: boolean;
    abstract closeTime: number;
    protected subscription: Subscription;
    protected abstract targetElement: ElementRef<HTMLDivElement>;
    protected taskId: number;
    private clickListener;
    protected constructor(cd: ChangeDetectorRef, app: ApplicationRef, utils: UtilsService, ngZone: NgZone);
    readonly left: number;
    readonly top: number;
    readonly overflowX: number;
    readonly overflowY: number;
    abstract readonly state: Partial<T>;
    abstract close(event: MouseEvent): void;
    updateView(): void;
    ngOnDestroy(): void;
    protected update(): void;
    private listenInsideClick;
    private removeListener;
    private removeEventListener;
    preventClose(): void;
}
