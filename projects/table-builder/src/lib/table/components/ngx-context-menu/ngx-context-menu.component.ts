import {
    ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { ContextMenuState } from '../../services/context-menu/context-menu.interface';
import { UtilsService } from '../../services/utils/utils.service';
import { ModalViewLayer } from '../common/modal-view-layer';

// @dynamic
@Component({
    selector: 'ngx-context-menu',
    templateUrl: './ngx-context-menu.component.html',
    styleUrls: ['./ngx-context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxContextMenuComponent extends ModalViewLayer<ContextMenuState> implements OnInit {
    @Input() public width: number = 300;
    @Input() public height: number = 300;
    @Input('max-height') public maxHeight: number = 400;

    constructor(
        private readonly contextMenu: ContextMenuService,
        protected readonly cd: ChangeDetectorRef,
        protected readonly app: ApplicationRef,
        protected readonly utils: UtilsService,
        protected readonly ngZone: NgZone
    ) {
        super(cd, app, utils, ngZone);
    }

    public get state(): Partial<ContextMenuState> {
        return this.contextMenu.state;
    }

    public ngOnInit(): void {
        this.subscription = this.contextMenu.events.subscribe(() => this.update());
    }

    public close(event: MouseEvent): void {
        this.contextMenu.close();
        event.preventDefault();
    }
}
