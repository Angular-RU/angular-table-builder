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
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { ContextMenuState } from '../../services/context-menu/context-menu.interface';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ngx-context-menu',
    templateUrl: './ngx-context-menu.component.html',
    styleUrls: ['./ngx-context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxContextMenuComponent implements OnInit, OnDestroy {
    private static readonly SCROLLBAR_WIDTH: number = 10;
    @Input() public width: number = 300;
    @Input() public height: number = 300;
    public state: Partial<ContextMenuState> = {};
    private subscription: Subscription = null;

    constructor(
        private readonly contextMenu: ContextMenuService,
        private readonly cd: ChangeDetectorRef,
        private readonly app: ApplicationRef
    ) {}

    public ngOnInit(): void {
        this.subscription = this.contextMenu.state.subscribe((state: ContextMenuState) => {
            this.state = state;
            this.cd.detectChanges();
            this.app.tick();
        });
    }

    public closeMenu(event: MouseEvent): void {
        this.contextMenu.close();
        event.preventDefault();
    }

    private static get bodyRect(): ClientRect | DOMRect {
        return document.querySelector('body').getBoundingClientRect();
    }

    public get left(): number {
        return (this.state.position && this.state.position.left) || 0;
    }

    public get top(): number {
        return (this.state.position && this.state.position.top) || 0;
    }

    public get overflowX(): number {
        const overflowX: number = this.width + this.left - NgxContextMenuComponent.bodyRect.width;
        return overflowX > 0 ? overflowX + NgxContextMenuComponent.SCROLLBAR_WIDTH : 0;
    }

    public get overflowY(): number {
        const overflowY: number = this.height + this.top - NgxContextMenuComponent.bodyRect.height;
        return overflowY > 0 ? overflowY + NgxContextMenuComponent.SCROLLBAR_WIDTH : 0;
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
