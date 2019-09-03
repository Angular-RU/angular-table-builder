import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { FilterableService } from '../../services/filterable/filterable.service';
import { FilterEvent, TableFilterType } from '../../services/filterable/filterable.interface';
import { detectChanges } from '../../operators/detect-changes';

const { TIME_RELOAD }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Component({
    selector: 'ngx-filter-viewer',
    template: '<span [innerHTML]="html"></span>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxFilterViewerComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public text: string = null;
    @Input() public key: string = null;
    @Input() public index: number = 0;
    public html: string | SafeHtml;
    private subscription: Subscription;
    private taskId: number;

    constructor(
        private readonly ngZone: NgZone,
        private readonly cd: ChangeDetectorRef,
        private readonly sanitizer: DomSanitizer,
        private readonly filterable: FilterableService
    ) {
        this.cd.reattach();
    }

    private static wrapSelectedHtml(finder: string): string {
        return `<span style="background-color: #FFFF00; color: #000">${finder}</span>`;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['text'] && changes['text'].firstChange) {
            this.defaultHtmlValue();
        }
    }

    public ngOnInit(): void {
        this.subscription = this.filterable.events.subscribe((event: FilterEvent) => {
            if (this.filterable.definition[this.key] || this.filterable.globalFilterValue) {
                this.changeSelection(event);
            } else {
                this.defaultHtmlValue();
            }

            detectChanges(this.cd);
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private changeSelection(event: FilterEvent): void {
        this.ngZone.runOutsideAngular(() => {
            window.clearInterval(this.taskId);
            this.taskId = window.setTimeout(() => {
                if (event.value || this.filterable.definition[this.key]) {
                    this.selected(event);
                } else {
                    this.defaultHtmlValue();
                }

                detectChanges(this.cd);
            }, TIME_RELOAD + this.index);
        });
    }

    private selected(event: FilterEvent): void {
        const value: string = this.filterable.definition[this.key] || event.value;
        const type: TableFilterType = this.filterable.definition[this.key]
            ? this.filterable.filterTypeDefinition[this.key]
            : event.type;

        if (type === TableFilterType.DOES_NOT_EQUAL || type === TableFilterType.DOES_NOT_CONTAIN) {
            return;
        }

        let regexp: RegExp;
        const escapedValue: string = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        if (type === TableFilterType.START_WITH) {
            regexp = new RegExp(`^${escapedValue}`, 'i');
        } else if (type === TableFilterType.END_WITH) {
            regexp = new RegExp(`${escapedValue}$`, 'i');
        } else if (type === TableFilterType.EQUALS) {
            regexp = new RegExp(`^${escapedValue}$`, 'i');
        } else {
            regexp = new RegExp(`${escapedValue}`, 'ig');
        }

        const trustedHtml: string = String(this.text).replace(regexp, (finder: string) =>
            NgxFilterViewerComponent.wrapSelectedHtml(finder)
        );

        this.html = this.sanitizer.bypassSecurityTrustHtml(trustedHtml);
    }

    private defaultHtmlValue(): void {
        this.html = this.text;
    }
}
