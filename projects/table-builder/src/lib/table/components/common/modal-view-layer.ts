import { ApplicationRef, ChangeDetectorRef, Injector, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MousePosition } from '../../interfaces/table-builder.internal';
import { detectChanges } from '../../operators/detect-changes';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { FilterableService } from '../../services/filterable/filterable.service';
import { UtilsService } from '../../services/utils/utils.service';
import { SCROLLBAR_WIDTH } from '../../symbols';

export interface PositionState {
    key: string;
    opened: boolean;
    position: MousePosition;
}

export abstract class ModalViewLayer<T extends PositionState> implements OnDestroy {
    public width: number = null;
    public height: number = null;
    public isViewed: boolean = false;
    protected subscription: Subscription = null;
    protected readonly app: ApplicationRef;
    protected readonly utils: UtilsService;
    protected readonly filterable: FilterableService;
    protected readonly ngZone: NgZone;
    protected readonly contextMenu: ContextMenuService;

    protected constructor(protected readonly cd: ChangeDetectorRef, injector: Injector) {
        this.app = injector.get<ApplicationRef>(ApplicationRef);
        this.utils = injector.get<UtilsService>(UtilsService);
        this.filterable = injector.get<FilterableService>(FilterableService);
        this.ngZone = injector.get<NgZone>(NgZone);
        this.contextMenu = injector.get<ContextMenuService>(ContextMenuService);
    }

    public get left(): number {
        return (this.state.position && this.state.position.left) || 0;
    }

    public get top(): number {
        return (this.state.position && this.state.position.top) || 0;
    }

    public get overflowX(): number {
        const overflowX: number = this.width + this.left - this.utils.bodyRect.width;
        return overflowX > 0 ? overflowX + SCROLLBAR_WIDTH : 0;
    }

    public get overflowY(): number {
        const overflowY: number = this.height + this.top - this.utils.bodyRect.height;
        return overflowY > 0 ? overflowY + SCROLLBAR_WIDTH : 0;
    }

    public abstract get state(): Partial<T>;

    public updateView(): void {
        detectChanges(this.cd);
        this.ngZone.runOutsideAngular(
            (): void => {
                window.requestAnimationFrame((): void => this.app.tick());
            }
        );
    }

    public ngOnDestroy(): void {
        if (!this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    public abstract close(event: MouseEvent): void;

    protected update(): void {
        this.ngZone.runOutsideAngular(
            (): void => {
                window.setTimeout(
                    (): void => {
                        this.isViewed = this.state.opened;
                        this.updateView();
                        window.setTimeout((): void => this.updateView());
                    }
                );
            }
        );
    }
}
