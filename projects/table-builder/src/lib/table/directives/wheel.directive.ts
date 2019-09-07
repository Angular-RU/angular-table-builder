import { Directive, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { OverloadScrollService } from '../services/overload-scroll/overload-scroll.service';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
import { getScrollLineHeight } from '../operators/get-scroll-line-height';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';
import { isFirefox } from '../operators/is-firefox';

const { TIME_IDLE }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Directive({ selector: '[wheelThrottling]' })
export class WheelThrottlingDirective implements OnInit, OnDestroy {
    @Input() public wheelThrottling: HTMLDivElement;
    @Output() public scrollOffset: EventEmitter<boolean> = new EventEmitter();
    public scrollTopOffset: boolean = false;
    private firefoxScrollLineHeight: number;
    public isScrolling: number = null;
    private scrolling: boolean = false;
    private subscription: Subscription;
    private lastDelta: number = 0;

    constructor(
        @Inject(NGX_TABLE_OPTIONS) private readonly options: TableBuilderOptionsImpl,
        private readonly ngZone: NgZone,
        private readonly overload: OverloadScrollService
    ) {}

    private get element(): HTMLElement {
        return this.wheelThrottling;
    }

    public ngOnInit(): void {
        this.subscription = fromEvent(this.element, 'wheel').subscribe((event: WheelEvent): void =>
            this.onElementScroll(event)
        );

        if (isFirefox()) {
            this.firefoxScrollLineHeight = getScrollLineHeight();
        }
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.wheelThrottling = null;
        this.scrollOffset = null;
    }

    /**
     * Correct works only Chrome
     * @param $event
     */
    public onElementScroll($event: WheelEvent): void {
        this.preventScroll($event);
        this.scrollStart();

        this.ngZone.runOutsideAngular(() => {
            window.clearTimeout(this.isScrolling);
            this.isScrolling = window.setTimeout(() => {
                const isOffset: boolean = this.element.scrollTop > 0 && !this.scrollTopOffset;

                if (isOffset) {
                    this.scrollTopOffset = true;
                    this.scrollOffset.emit(this.scrollTopOffset);
                } else if (this.element.scrollTop === 0 && this.scrollTopOffset) {
                    this.scrollTopOffset = false;
                    this.scrollOffset.emit(this.scrollTopOffset);
                }

                this.scrollEnd();
            }, TIME_IDLE);
        });
    }

    private scrollStart(): void {
        if (!this.scrolling) {
            this.scrolling = true;
            this.overload.scrollStatus.next(this.scrolling);
        }
    }

    private scrollEnd(): void {
        this.scrolling = false;
        this.overload.scrollStatus.next(this.scrolling);
    }

    private preventScroll($event: WheelEvent): void {
        const DOM_DELTA_PIXEL: number = 0x00;
        const deltaY: number = Math.abs($event.deltaY);

        if (this.firefoxScrollLineHeight) {
            const limit: number = this.firefoxScrollLineHeight * deltaY;
            const minimalPx: number = 100;
            if (limit > minimalPx) {
                $event.preventDefault();
            }
        } else if (this.lastDelta !== deltaY && $event.deltaMode === DOM_DELTA_PIXEL) {
            this.lastDelta = deltaY;
            this.overload.scrollDelta.next(this.lastDelta);
        }
    }
}
