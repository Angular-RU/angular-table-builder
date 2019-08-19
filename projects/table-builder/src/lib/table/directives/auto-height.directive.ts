import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { Any, DynamicHeightOptions, Fn } from '../interfaces/table-builder.internal';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';

interface BoxView {
    paddingTop: string;
    paddingBottom: string;
}

@Directive({ selector: '[autoHeight]' })
export class AutoHeightDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    private static readonly DEFAULT_VALUE: number = 0;
    private static readonly HEAD_TOP: string = '10px';
    private static readonly DELAY: number = 100;

    @Input() public headerHeight: number = 0;
    @Input() public footerHeight: number = 0;
    @Input() public autoHeight: Partial<DynamicHeightOptions> = {};
    @Output() public recalculatedHeight: EventEmitter<void> = new EventEmitter();

    private useOnlyAutoViewPort: boolean = false;
    private isDirtyCheck: boolean;
    private taskId: number;
    private handler: Fn;

    constructor(private readonly element: ElementRef, public ngZone: NgZone) {
        this.ngZone = ngZone;
    }

    private get height(): number {
        return this.autoHeight.height;
    }

    private get canCalculated(): boolean {
        return this.autoHeight.inViewport && this.autoHeight.sourceLength > 0;
    }

    private get style(): string {
        let height: string;

        if (this.height) {
            height = `${this.height}px`;
        } else if (this.autoHeight.detect) {
            const paddingTop: string = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-top');
            const paddingBottom: string = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-bottom');

            if (this.useOnlyAutoViewPort && this.columnHeight > this.parentOffsetHeight) {
                height = this.getHeightByViewPort({ paddingTop, paddingBottom });
            } else if (this.parentOffsetHeight > this.columnHeight) {
                height = this.getDefaultHeight();
            } else if (!this.isEmptyParentHeight) {
                height = this.getHeightByParent({ paddingTop, paddingBottom });
            } else {
                height = this.getHeightByViewPort({ paddingTop, paddingBottom });
            }
        }

        return height ? `display: block; height: ${height}` : '';
    }

    private get isEmptyParentHeight(): boolean {
        return this.parentOffsetHeight < parseInt(AutoHeightDirective.HEAD_TOP);
    }

    private get parentOffsetHeight(): number {
        return this.rootCurrentElement.offsetHeight || AutoHeightDirective.DEFAULT_VALUE;
    }

    private get currentElement(): HTMLDivElement {
        return this.element.nativeElement;
    }

    private get childElement(): Partial<HTMLDivElement> {
        return ((this.element.nativeElement as HTMLDivElement).firstChild as HTMLDivElement) || {};
    }

    private get rootCurrentElement(): Partial<HTMLElement> {
        return (this.currentElement.parentNode && this.currentElement.parentNode.parentElement) || {};
    }

    private get columnHeight(): number {
        return this.autoHeight.columnHeight || 0;
    }

    private get autoViewHeight(): number {
        return document.body.clientHeight - this.currentElement.getBoundingClientRect().top;
    }

    private static getStyle(element: Element | Any, strCssRule: string): string {
        let strValue: string = '';

        if (document.defaultView && document.defaultView.getComputedStyle) {
            try {
                strValue = document.defaultView.getComputedStyle(element, '').getPropertyValue(strCssRule);
            } catch (e) {
                strValue = '0px';
            }
        } else if (element.currentStyle) {
            strCssRule = strCssRule.replace(/\-(\w)/g, (strMatch: string, p1: string): string => p1.toUpperCase());
            strValue = element.currentStyle[strCssRule];
        }

        return strValue;
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.handler = (): void => this.recalculateTableSize();
            window.addEventListener('resize', this.handler, { passive: true });
        });
    }

    public ngAfterViewInit(): void {
        this.markForCheck();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('autoHeight' in changes) {
            this.recalculateTableSize();
        }
    }

    public ngOnDestroy(): void {
        window.removeEventListener('resize', this.handler);
    }

    public recalculateTableSize(): void {
        this.ngZone.runOutsideAngular(() => {
            clearTimeout(this.taskId);
            this.taskId = window.setTimeout(() => {
                if (this.isDirtyCheck && this.autoHeight.inViewport) {
                    this.calculateHeight();
                    this.recalculatedHeight.emit();
                }
            }, AutoHeightDirective.DELAY);
        });
    }

    public calculateHeight(): void {
        if (this.canCalculated) {
            this.setHeightByParent();
        }
    }

    public markForCheck(): void {
        this.isDirtyCheck = true;

        if (this.parentOffsetHeight <= TableBuilderOptionsImpl.ROW_HEIGHT) {
            this.useOnlyAutoViewPort = true;
        }
    }

    private getDefaultHeight(): string {
        const scrollbarHeight: number = this.childElement.offsetHeight - this.childElement.clientHeight || 0;
        return `calc(${this.columnHeight + scrollbarHeight + this.headerHeight + this.footerHeight}px)`;
    }

    private getHeightByParent({ paddingTop, paddingBottom }: BoxView): string {
        const viewportHeight: number = this.parentOffsetHeight - parseInt(AutoHeightDirective.HEAD_TOP);
        return `calc(${viewportHeight}px - ${paddingTop} - ${paddingBottom})`;
    }

    private getHeightByViewPort({ paddingTop, paddingBottom }: BoxView): string {
        const viewportHeight: number = this.autoViewHeight - parseInt(AutoHeightDirective.HEAD_TOP);
        return this.columnHeight > viewportHeight
            ? `calc(${viewportHeight}px - ${paddingTop} - ${paddingBottom})`
            : this.getDefaultHeight();
    }

    private setHeightByParent(): void {
        this.currentElement.setAttribute('style', this.style);
    }
}
