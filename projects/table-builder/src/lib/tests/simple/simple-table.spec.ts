import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableBuilderModule } from '@angular-ru/table-builder';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HtmlFormatter } from '../../../../../../helpers/html-formatter.class';
import { SpecTest } from '../../../../../../helpers/spec-test';
import { SIMPLE_TABLE_TEMPLATE } from './actual';
import { SimpleMockComponent } from './simple-mock.component';

describe('[TEST]: Simple table', () => {
    let fixture: ComponentFixture<SimpleMockComponent>;
    let component: SimpleMockComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, TableBuilderModule.forRoot({})],
            declarations: [SimpleMockComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleMockComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
    });

    it('should be correct create table', (done: any) => {
        expect(component).toBeDefined();
        SpecTest.tick(done, () => {
            const html: HTMLDivElement = fixture.debugElement.nativeElement;
            const tableTemplate: string = new HtmlFormatter(html.innerHTML)
                .removeNgAttr(['style'])
                .removeComments()
                .prettyHtml();

            const actualTableTemplate: string = new HtmlFormatter(SIMPLE_TABLE_TEMPLATE).prettyHtml();
            expect(tableTemplate).toEqual(actualTableTemplate);
        });
    });
});
