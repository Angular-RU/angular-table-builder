export const ACTUAL_TEMPLATES: string = `
<ngx-table-builder>
  <div class="table-grid__root">
    <div class="table-grid" wheelthrottling="">
      <div class="table-grid__column table-grid__column--is-visible" inviewport="">
        <table-thead>
          <div class="table-grid__cell table-grid__header-cell"><b>License</b></div>
        </table-thead>
        <table-tbody>
          <virtual-scroller class="vertical">
            <div class="total-padding"></div>
            <div class="scrollable-content">
              <div class="table-grid__cell"> SINGLE </div>
              <div class="table-grid__cell table-grid__cell-strip"> DEVELOPER </div>
              <div class="table-grid__cell"> PREMIUM </div>
              <div class="table-grid__cell table-grid__cell-strip"> ENTERPRISE </div>
            </div>
          </virtual-scroller>
        </table-tbody>
      </div>
      <div class="table-grid__column table-grid__column--is-visible" inviewport="">
        <table-thead>
          <div class="table-grid__cell table-grid__header-cell"><b>Cost</b></div>
        </table-thead>
        <table-tbody>
          <virtual-scroller class="vertical">
            <div class="total-padding"></div>
            <div class="scrollable-content">
              <div class="table-grid__cell"> $29.30 </div>
              <div class="table-grid__cell table-grid__cell-strip"> $49.80 </div>
              <div class="table-grid__cell"> $99.50 </div>
              <div class="table-grid__cell table-grid__cell-strip"> $199.00 </div>
            </div>
          </virtual-scroller>
        </table-tbody>
      </div>
    </div>
  </div>
</ngx-table-builder>
`;
