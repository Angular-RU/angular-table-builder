/* tslint:disable */
export const SIMPLE_TABLE_TEMPLATE: string = `
<ngx-table-builder>
  <div class="table-grid__root table-grid__with-vertical-line table-grid__root-auto-height">
    <div class="table-grid" wheelthrottling="">
      <div class="table-grid__column table-grid__column--default-width table-grid__column--is-visible" inviewport="">
        <table-thead>
          <div class="table-grid__cell table-grid__header-cell table-grid__cell--text-bold table-grid__cell--nowrap">Id</div>
        </table-thead>
        <table-tbody>
          <virtual-scroller class="vertical">
            <div class="total-padding"></div>
            <div class="scrollable-content">
              <div class="table-grid__cell table-grid__cell--nowrap"> 1 </div>
              <div class="table-grid__cell table-grid__cell--strip table-grid__cell--nowrap"> 2 </div>
              <div class="table-grid__cell table-grid__cell--nowrap"> 3 </div>
            </div>
          </virtual-scroller>
        </table-tbody>
      </div>
      <div class="table-grid__column table-grid__column--default-width table-grid__column--is-visible" inviewport="">
        <table-thead>
          <div class="table-grid__cell table-grid__header-cell table-grid__cell--text-bold table-grid__cell--nowrap">Name</div>
        </table-thead>
        <table-tbody>
          <virtual-scroller class="vertical">
            <div class="total-padding"></div>
            <div class="scrollable-content">
              <div class="table-grid__cell table-grid__cell--nowrap"> Max </div>
              <div class="table-grid__cell table-grid__cell--strip table-grid__cell--nowrap"> Ivan </div>
              <div class="table-grid__cell table-grid__cell--nowrap"> Petr </div>
            </div>
          </virtual-scroller>
        </table-tbody>
      </div>
      <div class="table-grid__column table-grid__column--default-width table-grid__column--is-visible" inviewport="">
        <table-thead>
          <div class="table-grid__cell table-grid__header-cell table-grid__cell--text-bold table-grid__cell--nowrap">Lastname</div>
        </table-thead>
        <table-tbody>
          <virtual-scroller class="vertical">
            <div class="total-padding"></div>
            <div class="scrollable-content">
              <div class="table-grid__cell table-grid__cell--nowrap"> Ivanov </div>
              <div class="table-grid__cell table-grid__cell--strip table-grid__cell--nowrap"> Petrov </div>
              <div class="table-grid__cell table-grid__cell--nowrap"> Sidorov </div>
            </div>
          </virtual-scroller>
        </table-tbody>
      </div>
    </div>
  </div>
</ngx-table-builder>
`;
