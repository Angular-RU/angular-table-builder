import {
    ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { ContextMenuState } from '../../services/context-menu/context-menu.interface';
import { UtilsService } from '../../services/utils/utils.service';

interface MouseNext {
    next(x: number, y: number): void;
}

// @dynamic
@Component({
    selector: 'ngx-context-menu',
    templateUrl: './ngx-context-menu.component.html',
    styleUrls: ['./ngx-context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxContextMenuComponent implements OnInit, OnDestroy, MouseNext {
    @Input() public width: number = 300;
    @Input() public height: number = 300;
    @Input('max-height') public maxHeight: number = 400;
    private subscription: Subscription = null;

    constructor(
        private readonly contextMenu: ContextMenuService,
        private readonly cd: ChangeDetectorRef,
        private readonly app: ApplicationRef,
        private readonly utils: UtilsService
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

    public get state(): Partial<ContextMenuState> {
        return this.contextMenu.state;
    }

    public ngOnInit(): void {
        this.subscription = this.contextMenu.events.subscribe(() => {
            this.cd.detectChanges();
            this.app.tick();
        });
    }

    public closeMenu(event: MouseEvent, nextPropagation: boolean = false): void {
        this.contextMenu.close();
        event.preventDefault();

        if (nextPropagation) {
            this.next(event.x, event.y);
        }
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public next(x: number, y: number): void {
        const event: MouseEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            screenX: x,
            screenY: y
        });

        document.elementFromPoint(x, y).dispatchEvent(event);
    }
}
