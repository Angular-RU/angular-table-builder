import { ChangeDetectorRef, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FilterableService } from '../../services/filterable/filterable.service';
export declare class NgxFilterViewerComponent implements OnChanges, OnInit, OnDestroy {
    private readonly ngZone;
    private readonly cd;
    private readonly sanitizer;
    private readonly filterable;
    text: string;
    key: string;
    index: number;
    html: string | SafeHtml;
    founded: boolean;
    private subscription;
    private taskId;
    constructor(ngZone: NgZone, cd: ChangeDetectorRef, sanitizer: DomSanitizer, filterable: FilterableService);
    private static wrapSelectedHtml;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private changeSelection;
    private selected;
    private defaultHtmlValue;
}
