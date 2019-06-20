export class SelectionRange {
    public start: number = null;
    public end: number = null;

    public put(index: number): void {
        if (this.start === null) {
            this.start = index;
        } else {
            this.end = index;
        }
    }

    public clear(): void {
        this.start = null;
        this.end = null;
    }

    public sortKeys(): SelectionRange {
        const [start, end]: number[] = [this.start, this.end].sort((a: number, b: number) => a - b);
        this.start = start;
        this.end = end;

        return this;
    }

    public selectedRange(): boolean {
        return this.start !== null && this.end !== null;
    }
}
