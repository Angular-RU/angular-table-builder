import { ApplicationRef, ChangeDetectorRef, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UtilsService } from '../../services/utils/utils.service';
import { Fn, MousePosition } from '../../interfaces/table-builder.internal';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';

export interface PositionState {
    key: string;
    opened: boolean;
    position: MousePosition;
}

export abstract class ModalViewLayer<T extends PositionState> implements OnDestroy {
    public width: number = null;
    public height: number = null;
    public isViewed: boolean = false;
    public abstract closeTime: number;
    protected subscription: Subscription = null;
    protected abstract targetElement: ElementRef<HTMLDivElement>;
    protected taskId: number;
    private listener: Fn;

    protected constructor(
        protected readonly cd: ChangeDetectorRef,
        protected readonly app: ApplicationRef,
        protected readonly utils: UtilsService,
        protected readonly ngZone: NgZone
    ) {}

    public get left(): number {
        return (this.state.position && this.state.position.left) || 0;
    }

    public get top(): number {
        return (this.state.position && this.state.position.top) || 0;
    }

    public get overflowX(): number {
        const overflowX: number = this.width + this.left - this.utils.bodyRect.width;
        return overflowX > 0 ? overflowX + UtilsService.SCROLLBAR_WIDTH : 0;
    }

    public get overflowY(): number {
        const overflowY: number = this.height + this.top - this.utils.bodyRect.height;
        return overflowY > 0 ? overflowY + UtilsService.SCROLLBAR_WIDTH : 0;
    }

    public abstract get state(): Partial<T>;

    public abstract close(event: MouseEvent): void;

    public updateView(): void {
        this.cd.detectChanges();
        this.app.tick();
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    protected update(): void {
        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                this.isViewed = this.state.opened;

                this.updateView();

                if (this.state.opened) {
                    window.removeEventListener('click', this.listener, true);
                    this.preventClose();
                    this.listenInsideClick();
                }

                window.setTimeout(() => this.updateView());
            });
        });
    }

    private listenInsideClick(): void {
        this.ngZone.runOutsideAngular(() => {
            this.listener = (event: MouseEvent): void => {
                const origin: Node = this.targetElement.nativeElement as Node;
                const target: Node = event.target as Node;
                if (!origin.contains(target)) {
                    this.taskId = window.setTimeout(() => this.removeListener(event), this.closeTime);
                }
            };

            window.addEventListener('click', this.listener, true);
        });
    }

    private removeListener(event: MouseEvent): void {
        window.removeEventListener('click', this.listener, true);
        this.close(event);
        this.cd.detectChanges();
    }

    public preventClose(): void {
        window.clearTimeout(this.taskId);
    }
}
