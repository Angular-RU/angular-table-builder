import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Fn } from '../../../table/interfaces/table-builder.internal';
import { TableBuilderModule } from '../../../table-builder.module';
import { ACTUAL_TEMPLATES } from './actual';
import { TemplateMockComponent } from '../../../../../../../helpers/mocks/template-mock.component';
import { HtmlFormatter } from '../../../../../../../helpers/utils/html-formatter.class';
import { Delay } from '../../../../../../../helpers/utils/delay';

describe('[TEST]: Template mock table', () => {
    let fixture: ComponentFixture<TemplateMockComponent>;
    let component: TemplateMockComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, TableBuilderModule.forRoot()],
            declarations: [TemplateMockComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TemplateMockComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
    });

    it('should be correct create table', (done: Fn) => {
        expect(component).toBeDefined();
        Delay.timeout(done, () => {
            const html: HTMLDivElement = fixture.debugElement.nativeElement;
            const tableTemplate: string = new HtmlFormatter(html.innerHTML)
                .removeNgAttr(['style'])
                .removeComments()
                .prettyHtml();

            const actualTableTemplate: string = new HtmlFormatter(ACTUAL_TEMPLATES).prettyHtml();
            expect(tableTemplate).toEqual(actualTableTemplate);
        });
    });
});
