import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableBuilderModule, TableRow } from '@angular-ru/table-builder';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HtmlFormatter } from '../../../../../helpers/html-formatter.class';

describe('[TEST]: Simple table', () => {
    @Component({
        selector: 'app',
        template: `
            <ngx-table-builder [source]="data" [height]="300"></ngx-table-builder>
        `
    })
    class AppMockComponent {
        public data: TableRow[] = [
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' }
        ];
    }

    let fixture: ComponentFixture<AppMockComponent>;
    let component: AppMockComponent;

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                TableBuilderModule.forRoot({
                    enableInteractionObserver: false
                })
            ],
            declarations: [AppMockComponent]
        });
        fixture = TestBed.createComponent(AppMockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create ngx-table', (done: DoneFn) => {
        expect(component).toBeDefined();
        fixture.detectChanges();

        setTimeout(() => {
            fixture.detectChanges();
            // wait table animation
            const html: HTMLDivElement = fixture.nativeElement as HTMLDivElement;

            // get first column
            const columnFirst: HTMLDivElement = html.querySelector('.table-grid__column');

            const columnFirstHtml: string = new HtmlFormatter(columnFirst.innerHTML)
                .removeNgAttr(['style'])
                .removeComments()
                .prettyHtml();

            const actualColumnHtml: string = new HtmlFormatter(`
              <table-thead>
                <div class="table-grid__cell table-grid__header-cell"><strong class="cell-nowrap">id</strong></div>
              </table-thead>
              <table-tbody>
                <virtual-scroller class="vertical">
                  <div class="total-padding"></div>
                  <div class="scrollable-content">
                    <div class="table-grid__cell"> 1 </div>
                    <div class="table-grid__cell table-grid__cell-strip"> 2 </div>
                    <div class="table-grid__cell"> 3 </div>
                  </div>
                </virtual-scroller>
              </table-tbody>
            `).prettyHtml();

            expect(columnFirstHtml).toEqual(actualColumnHtml);

            done();
        }, 1000);
    });
});
