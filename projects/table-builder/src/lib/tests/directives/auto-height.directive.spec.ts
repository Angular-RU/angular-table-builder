import { ElementRef, NgZone } from '@angular/core';

import { Any, Fn } from '../../table/interfaces/table-builder.internal';
import { AutoHeightDirective } from '../../table/directives/auto-height.directive';

describe('[TEST]: auto height', () => {
    let directive: AutoHeightDirective;
    let recalculateDispatcher: Fn;
    let addedEvent: boolean = false;
    let removeEvent: boolean = false;
    let ticked: number = 0;
    let style: string;

    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular<T = Any>(fn: Fn): T {
            return fn();
        }
    };

    const mockElementRef: ElementRef = {
        nativeElement: {
            setAttribute: (_: string, styleResult: string): void => {
                style = styleResult;
            },
            getBoundingClientRect: (): Partial<ClientRect> => {
                return { top: 10 };
            }
        }
    };

    Object.defineProperty(document.body, 'clientHeight', {
        value: 1000
    });

    Object.defineProperty(window, 'setTimeout', {
        value: (callback: Fn<void, void>): void => callback()
    });

    Object.defineProperty(window, 'requestAnimationFrame', {
        value: (callback: Fn): unknown => callback()
    });

    Object.defineProperties(window, {
        addEventListener: {
            value: (_: string, fn: Fn): void => {
                recalculateDispatcher = fn;
                addedEvent = true;
            }
        },
        removeEventListener: {
            value: (): void => {
                recalculateDispatcher = null;
                removeEvent = true;
            }
        }
    });

    beforeEach(() => {
        directive = new AutoHeightDirective(mockElementRef, mockNgZone as NgZone);
        style = '';
        ticked = 0;
    });

    it('should be correct invoke ngOnInit', () => {
        directive.ngOnInit();
        expect(addedEvent).toEqual(true);
    });

    it('should be correct invoke ngOnInit', () => {
        directive.ngOnDestroy();
        expect(removeEvent).toEqual(true);
    });

    it('should be correct calculate auto height', () => {
        directive.autoHeight = { detect: true, inViewport: true, sourceLength: 1 };
        directive.calculateHeight();
        expect(style).toEqual(`display: block; height: calc(980px - 0px - 0px)`);
    });

    it('should be correct hide height not in viewport', () => {
        directive.autoHeight = { detect: true, inViewport: false };
        directive.calculateHeight();
        expect(style).toEqual(``);

        directive.autoHeight = { detect: false, height: 200, inViewport: false, sourceLength: 1 };
        directive.calculateHeight();
        expect(style).toEqual(``);
    });

    it('should be correct calculate custom height', () => {
        directive.autoHeight = { detect: true, height: 500, inViewport: true, sourceLength: 1 };
        directive.calculateHeight();
        expect(style).toEqual(`display: block; height: 500px`);
    });

    it('should be correct empty style when autoHeight not called', () => {
        directive.autoHeight = { detect: false, height: null, inViewport: true, sourceLength: 1 };
        directive.calculateHeight();
        expect(style).toEqual(``);
    });

    it('should be correct recalculate height', () => {
        directive.autoHeight = { height: 200, inViewport: true, sourceLength: 1 };
        directive.recalculateByResize();
        expect(style).toEqual(`display: block; height: 200px`);
    });
});
