import { TemplateParserService } from '../template-parser/template-parser.service';
export declare class DraggableService {
    private readonly parser;
    constructor(parser: TemplateParserService);
    private readonly columns;
    drop(previousKey: string, currentKey: string): void;
    canDropped(previousIndex: number, currentIndex: number): boolean;
}
