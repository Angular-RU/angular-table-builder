import { ApplicationRef, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UtilsService } from '../../services/utils/utils.service';
import { MousePosition } from '../../interfaces/table-builder.internal';
import { SCROLLBAR_WIDTH } from '../../symbols';
import { detectChanges } from '../../operators/detect-changes';

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
        return overflowX > 0 ? overflowX + SCROLLBAR_WIDTH : 0;
    }

    public get overflowY(): number {
        const overflowY: number = this.height + this.top - this.utils.bodyRect.height;
        return overflowY > 0 ? overflowY + SCROLLBAR_WIDTH : 0;
    }

    public abstract get state(): Partial<T>;

    public abstract close(event: MouseEvent): void;

    protected update(): void {
        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                this.isViewed = this.state.opened;
                this.updateView();
                window.setTimeout(() => this.updateView());
            });
        });
    }
    public updateView(): void {
        detectChanges(this.cd);
        this.app.tick();
    }

    public ngOnDestroy(): void {
        if (!this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }
}
