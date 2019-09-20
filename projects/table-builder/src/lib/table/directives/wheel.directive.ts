import { Directive, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { OverloadScrollService } from '../services/overload-scroll/overload-scroll.service';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';

const { TIME_IDLE }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Directive({ selector: '[wheelThrottling]' })
export class WheelThrottlingDirective implements OnInit, OnDestroy {
    @Input() public wheelThrottling: HTMLDivElement;
    @Output() public scrollOffset: EventEmitter<boolean> = new EventEmitter();
    public scrollTopOffset: boolean = false;
    public isScrolling: number = null;
    private scrolling: boolean = false;
    private subscription: Subscription;

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
        this.scrollStart();

        this.ngZone.runOutsideAngular(() => {
            window.clearTimeout(this.isScrolling);
            this.isScrolling = window.setTimeout(() => {
                if (!this.element) {
                    return;
                }

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
}
