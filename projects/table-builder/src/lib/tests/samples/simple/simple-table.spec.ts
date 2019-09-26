import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableBuilderModule } from '@angular-ru/ng-table-builder';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Delay } from '@helpers/utils/delay';
import { HtmlFormatter } from '@helpers/utils/html-formatter.class';
import { SimpleMockComponent } from '@helpers/mocks/simple-mock.component';
import { SIMPLE_TABLE_TEMPLATE } from './actual';
import { Fn } from '../../../table/interfaces/table-builder.internal';

describe('[TEST]: Simple table', () => {
    let fixture: ComponentFixture<SimpleMockComponent>;
    let component: SimpleMockComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, TableBuilderModule.forRoot()],
            declarations: [SimpleMockComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SimpleMockComponent);
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

            const actualTableTemplate: string = new HtmlFormatter(SIMPLE_TABLE_TEMPLATE).prettyHtml();

            expect(tableTemplate).toEqual(actualTableTemplate);
        });
    });
});
