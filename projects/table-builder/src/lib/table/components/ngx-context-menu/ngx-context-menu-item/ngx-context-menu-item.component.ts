import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { ContextMenuService } from '../../../services/context-menu/context-menu.service';
import { ContextMenuState } from '../../../services/context-menu/context-menu.interface';
import { ContextItemEvent } from '../../../interfaces/table-builder.external';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
    selector: 'ngx-context-menu-item',
    templateUrl: './ngx-context-menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxContextMenuItemComponent implements OnInit {
    private static readonly MIN_PADDING: number = 25;
    @Input() public visible: boolean = true;
    @Input() public contextTitle: boolean = null;
    @Input() public disable: boolean = false;
    @Input() public divider: boolean = false;
    @Input('sub-menu-width') public subMenuWidth: number = 300;
    @Output() public onClick: EventEmitter<ContextItemEvent> = new EventEmitter();
    @ViewChild('item', { static: false }) public itemRef: ElementRef<HTMLDivElement>;

    private taskId: number;

    public offsetX: number = null;
    public offsetY: number = null;

    constructor(
        private readonly contextMenu: ContextMenuService,
        private readonly cd: ChangeDetectorRef,
        private readonly utils: UtilsService,
        private readonly ngZone: NgZone
    ) {}

    public get state(): Partial<ContextMenuState> {
        return this.contextMenu.state;
    }

    public ngOnInit(): void {
        this.contextMenu.events.subscribe(() => this.detectChanges());
    }

    private detectChanges(): void {
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
        }
    }

    public calculateSubMenuPosition(ref: HTMLDivElement): void {
        const contentExist: boolean = ref.innerHTML.trim().length !== 0;
        if (contentExist) {
            this.offsetX = this.clientRect.left + this.subMenuWidth - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetX = this.offsetX - this.overflowX();

            this.offsetY = this.clientRect.top - NgxContextMenuItemComponent.MIN_PADDING;
            this.offsetY = this.offsetY - this.overflowY(ref);
        }
    }

    public overflowX(): number {
        const overflowX: number = this.subMenuWidth + this.offsetX - this.utils.bodyRect.width;
        return overflowX > 0 ? overflowX + UtilsService.SCROLLBAR_WIDTH : 0;
    }

    public overflowY(ref: HTMLDivElement): number {
        const overflowY: number = ref.offsetHeight + this.offsetY - this.utils.bodyRect.height;
        return overflowY > 0 ? overflowY + UtilsService.SCROLLBAR_WIDTH : 0;
    }

    public get clientRect(): Partial<ClientRect | DOMRect> {
        return (this.itemElement.getBoundingClientRect && this.itemElement.getBoundingClientRect()) || {};
    }

    private get itemElement(): Partial<HTMLDivElement> {
        return (this.itemRef && this.itemRef.nativeElement) || {};
    }

    public emitClick(event: MouseEvent): void {
        if (!this.disable) {
            this.deferCloseMenu();

            this.onClick.emit({
                preventDefault: (): void => {
                    window.clearTimeout(this.taskId);
                }
            });

            event.stopPropagation();
        }
    }

    private deferCloseMenu(): void {
        this.ngZone.runOutsideAngular(() => {
            this.taskId = window.setTimeout(() => {
                this.contextMenu.close();
            });
        });
    }
}
