import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    NgZone,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ContextMenuService } from '../../../services/context-menu/context-menu.service';

@Component({
    selector: 'ngx-context-menu-item',
    templateUrl: './ngx-context-menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxContextMenuItemComponent {
    private static readonly IDLE_TIME: number = 100;
    @Input() public contextTitle: boolean = null;
    @Input() public disable: boolean = false;
    @Output() public onClick: EventEmitter<void> = new EventEmitter();

    constructor(private readonly ngZone: NgZone, private readonly contextMenu: ContextMenuService) {}

    public click(): void {
        if (!this.disable) {
            this.onClick.emit();
            this.ngZone.runOutsideAngular(() => {
                window.setTimeout(() => this.contextMenu.close(), NgxContextMenuItemComponent.IDLE_TIME);
            });
        }
    }
}
