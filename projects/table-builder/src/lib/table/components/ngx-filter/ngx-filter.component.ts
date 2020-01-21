import {
    ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    NgZone,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FilterableService } from '../../services/filterable/filterable.service';
import { FilterStateEvent } from '../../services/filterable/filterable.interface';
import { ModalViewLayer } from '../common/modal-view-layer';
import { UtilsService } from '../../services/utils/utils.service';
import { NgxFilterDirective } from '../../directives/ngx-filter.directive';

@Component({
    selector: 'ngx-filter',
    templateUrl: './ngx-filter.component.html',
    styleUrls: ['./ngx-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxFilterComponent extends ModalViewLayer<FilterStateEvent> implements OnInit {
    @Input() public width: number = 300;
    @Input() public height: number = null;
    @Input('max-height') public maxHeight: number = null;
    public readonly leftX: number = 10;
    public readonly topY: number = 50;

    @ContentChild(NgxFilterDirective, { static: false })
    public filter: NgxFilterDirective;

    constructor(
        private readonly filterable: FilterableService,
        protected readonly cd: ChangeDetectorRef,
        protected readonly app: ApplicationRef,
        protected readonly utils: UtilsService,
        protected readonly ngZone: NgZone
    ) {
        super(cd, app, utils, ngZone);
    }

    public get state(): Partial<FilterStateEvent> {
        return this.filterable.state;
    }

    public closeFilter(): void {
        this.filterable.closeFilter();
    }

    public close(event: MouseEvent): void {
        this.closeFilter();
    }

    public ngOnInit(): void {
        this.subscription = this.filterable.filterOpenEvents.subscribe(() => this.update());
    }
}
