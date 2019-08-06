/* tslint:disable */
export const SIMPLE_TABLE_TEMPLATE: string = `
<ngx-table-builder>
  <div class="table-grid__root table-grid__root-auto-height table-grid__root--content-is-init" observerview="">
    <div class="table-grid cdk-drop-list" cdkdroplist="" cdkdroplistorientation="horizontal" wheelthrottling="" id="cdk-drop-list-0">
      <div class="table-grid__column-area-content">
        <div cdkdrag="" cdkdragboundary=".table-grid__column-area-content" class="table-grid__column cdk-drag table-grid__column--vertical-line table-grid__column--default-width cdk-drag-disabled table-grid__column--is-visible" observerview="" column-id="id">
          <div class="table-grid__column-area">
             <table-thead>
                <div class="table-grid__cell table-grid__header-cell table-grid__cell--text-bold">
                  <div class="table-grid__cell--content table-grid__header-cell--content table-grid__cell--nowrap"> Id </div>
                </div>
              </table-thead>
              <table-tbody>
                <virtual-scroller class="vertical">
                  <div class="total-padding"></div>
                  <div class="scrollable-content">
                    <div class="table-grid__cell table-grid__cell--strip">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>1</table-cell>
                      </div>
                    </div>
                    <div class="table-grid__cell">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>2</table-cell>
                      </div>
                    </div>
                    <div class="table-grid__cell table-grid__cell--strip">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>3</table-cell>
                      </div>
                    </div>
                  </div>
                </virtual-scroller>
              </table-tbody>
          </div>
        </div>
        <div cdkdrag="" cdkdragboundary=".table-grid__column-area-content" class="table-grid__column cdk-drag table-grid__column--vertical-line table-grid__column--default-width cdk-drag-disabled table-grid__column--is-visible" observerview="" column-id="name">
          <div class="table-grid__column-area">
             <table-thead>
                <div class="table-grid__cell table-grid__header-cell table-grid__cell--text-bold">
                  <div class="table-grid__cell--content table-grid__header-cell--content table-grid__cell--nowrap"> Name </div>
                </div>
              </table-thead>
              <table-tbody>
                <virtual-scroller class="vertical">
                  <div class="total-padding"></div>
                  <div class="scrollable-content">
                    <div class="table-grid__cell table-grid__cell--strip">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>Max</table-cell>
                      </div>
                    </div>
                    <div class="table-grid__cell">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>Ivan</table-cell>
                      </div>
                    </div>
                    <div class="table-grid__cell table-grid__cell--strip">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>Petr</table-cell>
                      </div>
                    </div>
                  </div>
                </virtual-scroller>
              </table-tbody>
            </div>
        </div>
        <div cdkdrag="" cdkdragboundary=".table-grid__column-area-content" class="table-grid__column cdk-drag table-grid__column--vertical-line table-grid__column--default-width cdk-drag-disabled table-grid__column--is-visible" observerview="" column-id="lastName">
          <div class="table-grid__column-area">
            <table-thead>
              <div class="table-grid__cell table-grid__header-cell table-grid__cell--text-bold">
                <div class="table-grid__cell--content table-grid__header-cell--content table-grid__cell--nowrap"> Lastname </div>
              </div>
            </table-thead>
            <table-tbody>
              <virtual-scroller class="vertical">
                <div class="total-padding"></div>
                <div class="scrollable-content">
                  <div class="table-grid__cell table-grid__cell--strip">
                    <div class="table-grid__cell--content table-grid__cell--nowrap">
                      <table-cell>Ivanov</table-cell>
                    </div>
                  </div>
                  <div class="table-grid__cell">
                    <div class="table-grid__cell--content table-grid__cell--nowrap">
                      <table-cell>Petrov</table-cell>
                    </div>
                  </div>
                  <div class="table-grid__cell table-grid__cell--strip">
                    <div class="table-grid__cell--content table-grid__cell--nowrap">
                      <table-cell>Sidorov</table-cell>
                    </div>
                  </div>
                </div>
              </virtual-scroller>
            </table-tbody>
          </div>
        </div>
      </div>
    </div>
  </div>
</ngx-table-builder>
`;
