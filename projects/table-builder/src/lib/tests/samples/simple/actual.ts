/* tslint:disable */
export const SIMPLE_TABLE_TEMPLATE: string = `
<ngx-table-builder>
  <div class="table-grid__root table-grid__root-auto-height table-grid__root--content-is-init table-grid__root--is-rendered" observerview="">
    <div class="table-grid cdk-drop-list cdk-drop-list-disabled" cdkdroplist="" cdkdroplistorientation="horizontal" id="cdk-drop-list-0">
      <div class="table-grid__column-area-content">
        <div 
          cdkdrag="" 
          cdkdragboundary=".table-grid__column-area-content" 
          cdkdraghandle="" 
          class="table-grid__column cdk-drag cdk-drag-handle table-grid__column--vertical-line table-grid__column--default-width cdk-drag-disabled table-grid__column--is-visible" 
          observerview="" 
          column-id="id">
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
                        <table-cell>
                            <div class="table-grid__cell--inner-content loaded">1</div>
                        </table-cell>
                      </div>
                    </div>
                    <div class="table-grid__cell">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>
                            <div class="table-grid__cell--inner-content loaded">2</div>
                        </table-cell>
                      </div>
                    </div>
                    <div class="table-grid__cell table-grid__cell--strip">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>
                            <div class="table-grid__cell--inner-content loaded">3</div>
                        </table-cell>
                      </div>
                    </div>
                  </div>
                </virtual-scroller>
              </table-tbody>
          </div>
        </div>
        <div 
          cdkdrag="" 
          cdkdragboundary=".table-grid__column-area-content" 
          cdkdraghandle=""
          class="table-grid__column cdk-drag cdk-drag-handle table-grid__column--vertical-line table-grid__column--default-width cdk-drag-disabled table-grid__column--is-visible" 
          observerview="" 
          column-id="name">
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
                        <table-cell>
                            <div class="table-grid__cell--inner-content loaded">Max</div>
                        </table-cell>
                      </div>
                    </div>
                    <div class="table-grid__cell">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>
                            <div class="table-grid__cell--inner-content loaded">Ivan</div>
                        </table-cell>
                      </div>
                    </div>
                    <div class="table-grid__cell table-grid__cell--strip">
                      <div class="table-grid__cell--content table-grid__cell--nowrap">
                        <table-cell>
                            <div class="table-grid__cell--inner-content loaded">Petr</div>
                        </table-cell>
                      </div>
                    </div>
                  </div>
                </virtual-scroller>
              </table-tbody>
            </div>
        </div>
        <div 
          cdkdrag="" 
          cdkdragboundary=".table-grid__column-area-content"
          cdkdraghandle="" 
          class="table-grid__column cdk-drag cdk-drag-handle table-grid__column--vertical-line table-grid__column--default-width cdk-drag-disabled table-grid__column--is-visible" 
          observerview="" 
          column-id="lastName">
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
                      <table-cell>
                        <div class="table-grid__cell--inner-content loaded">Ivanov</div>
                      </table-cell>
                    </div>
                  </div>
                  <div class="table-grid__cell">
                    <div class="table-grid__cell--content table-grid__cell--nowrap">
                      <table-cell>
                        <div class="table-grid__cell--inner-content loaded">Petrov</div>
                      </table-cell>
                    </div>
                  </div>
                  <div class="table-grid__cell table-grid__cell--strip">
                    <div class="table-grid__cell--content table-grid__cell--nowrap">
                      <table-cell>
                        <div class="table-grid__cell--inner-content loaded">Sidorov</div>
                      </table-cell>
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
