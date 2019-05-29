import { ApplicationRef, Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { DynamicHeightOptions } from '../../table-builder.interfaces';

@Directive({ selector: '[ngDynamicHeight]' })
export class DynamicHeightDirective implements OnInit, OnChanges, OnDestroy {
    @Input() public ngDynamicHeight: Partial<DynamicHeightOptions> = {};

    constructor(private readonly element: ElementRef, public ngZone: NgZone, public app: ApplicationRef) {
        this.ngZone = ngZone;
    }

    private get height(): number {
        return this.ngDynamicHeight.height;
    }

    public ngOnInit(): void {
        this.calculateHeight();

        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('resize', this.recalculateByResize.bind(this), true);
        });
    }

    public ngOnChanges(): void {
        this.calculateHeight();
    }

    public ngOnDestroy(): void {
        window.removeEventListener('resize', this.recalculateByResize.bind(this), true);
    }

    private recalculateByResize(): void {
        this.calculateHeight();
        this.app.tick();
    }

    private calculateHeight(): void {
        this.setHeightByParent(this.element.nativeElement);
    }

    private setHeightByParent(element: HTMLElement): void {
        element.setAttribute('style', this.getStyleHeight(element));
    }

    private getStyleHeight(element: HTMLElement): string {
        let height: string;

        if (this.height) {
            height = `${this.height}px`;
        } else if (this.ngDynamicHeight.autoHeight) {
            height = `calc(${document.body.clientHeight}px - ${element.getBoundingClientRect().top}px - 10px)`;
        }

        return height ? `display: block; height: ${height}` : '';
    }
}
