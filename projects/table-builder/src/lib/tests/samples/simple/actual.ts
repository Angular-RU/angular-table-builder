export const SIMPLE_TABLE_TEMPLATE: string = `
<ngx-table-builder>
  <div class="table-grid__root table-grid__root-auto-height">
    <div class="table-grid" wheelthrottling="">
      <div class="table-grid__column table-grid__column--is-visible" inviewport="">
        <table-thead>
          <div class="table-grid__cell table-grid__header-cell"><strong class="cell-nowrap">Id</strong></div>
        </table-thead>
        <table-tbody>
          <virtual-scroller class="vertical">
            <div class="total-padding"></div>
            <div class="scrollable-content">
              <div class="table-grid__cell">1</div>
              <div class="table-grid__cell table-grid__cell-strip">2</div>
              <div class="table-grid__cell">3</div>
            </div>
          </virtual-scroller>
        </table-tbody>
      </div>
      <div class="table-grid__column table-grid__column--is-visible" inviewport="">
        <table-thead>
          <div class="table-grid__cell table-grid__header-cell"><strong class="cell-nowrap">Name</strong></div>
        </table-thead>
        <table-tbody>
          <virtual-scroller class="vertical">
            <div class="total-padding"></div>
            <div class="scrollable-content">
              <div class="table-grid__cell">Max</div>
              <div class="table-grid__cell table-grid__cell-strip">Ivan</div>
              <div class="table-grid__cell">Petr</div>
            </div>
          </virtual-scroller>
        </table-tbody>
      </div>
      <div class="table-grid__column table-grid__column--is-visible" inviewport="">
        <table-thead>
          <div class="table-grid__cell table-grid__header-cell"><strong class="cell-nowrap">Lastname</strong></div>
        </table-thead>
        <table-tbody>
          <virtual-scroller class="vertical">
            <div class="total-padding"></div>
            <div class="scrollable-content">
              <div class="table-grid__cell">Ivanov</div>
              <div class="table-grid__cell table-grid__cell-strip">Petrov</div>
              <div class="table-grid__cell">Sidorov</div>
            </div>
          </virtual-scroller>
        </table-tbody>
      </div>
    </div>
  </div>
</ngx-table-builder>
`;
