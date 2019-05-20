import { ElementRef, ViewChild } from '@angular/core';

export class TableBase {
    @ViewChild('header', { read: ElementRef }) private header: ElementRef;
    private clientHeaderSize: string;

    public get headerSize(): string {
        if (!this.clientHeaderSize) {
            const header: HTMLDivElement = this.header.nativeElement;
            this.clientHeaderSize = `${-1 * header.clientHeight}px`;
        }

        return this.clientHeaderSize;
    }
}
