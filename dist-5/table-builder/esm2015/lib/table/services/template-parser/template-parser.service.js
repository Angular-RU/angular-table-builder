/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ImplicitContext } from '../../interfaces/table-builder.external';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { ColumnOptions } from '../../components/common/column-options';
import { SchemaBuilder } from './schema-builder.class';
export class TemplateParserService {
    constructor() {
        this.compiledTemplates = {};
        /**
         * \@description: the custom names of the column list to be displayed in the view.
         * \@example:
         *    <table-builder #table
         *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
         *        [exclude]="[ 'description' ]">
         *    </table-builder>
         *    ------------------------
         *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true }
         */
        this.allowedKeyMap = {};
        /**
         * \@description: the custom names of the column list to be displayed in the view.
         * \@example:
         *    <table-builder #table
         *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
         *        [exclude]="[ 'description' ]">
         *    </table-builder>
         *    ------------------------
         *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true, 'description': false }
         */
        this.keyMap = {};
    }
    /**
     * @private
     * @param {?} key
     * @param {?} cell
     * @param {?} options
     * @return {?}
     */
    static templateContext(key, cell, options) {
        return {
            textBold: cell.bold,
            template: cell.template,
            class: cell.cssClasses,
            style: cell.cssStyles,
            width: cell.width,
            height: cell.height,
            onClick: cell.onClick,
            dblClick: cell.dblClick,
            useDeepPath: key.includes('.'),
            context: cell.row ? ImplicitContext.ROW : ImplicitContext.CELL,
            nowrap: TemplateParserService.getValidPredicate(options.nowrap, cell.nowrap)
        };
    }
    /**
     * @private
     * @param {?} attribute
     * @return {?}
     */
    static getValidHtmlBooleanAttribute(attribute) {
        return typeof attribute === 'string' ? true : attribute;
    }
    /**
     * @private
     * @template T
     * @param {?} leftPredicate
     * @param {?} rightPredicate
     * @return {?}
     */
    static getValidPredicate(leftPredicate, rightPredicate) {
        return leftPredicate === null ? rightPredicate : leftPredicate;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    toggleColumnVisibility(key) {
        this.schema.columns = this.schema.columns.map((/**
         * @param {?} column
         * @return {?}
         */
        (column) => key === column.key
            ? Object.assign({}, column, { isVisible: !column.isVisible }) : column));
    }
    /**
     * @param {?} columnOptions
     * @return {?}
     */
    initialSchema(columnOptions) {
        this.schema = this.schema || new SchemaBuilder();
        this.schema.columns = [];
        this.compiledTemplates = {};
        this.templateKeys = new Set();
        this.overrideTemplateKeys = new Set();
        this.fullTemplateKeys = new Set();
        this.columnOptions = columnOptions || new ColumnOptions();
    }
    /**
     * @param {?} templates
     * @return {?}
     */
    parse(templates) {
        if (!templates) {
            return;
        }
        templates.forEach((/**
         * @param {?} column
         * @return {?}
         */
        (column) => {
            const { key, customKey, importantTemplate } = column;
            /** @type {?} */
            const needTemplateCheck = this.allowedKeyMap[key] || customKey !== false;
            if (needTemplateCheck) {
                if (importantTemplate !== false) {
                    this.templateKeys.delete(key);
                    this.compileColumnMetadata(column);
                    this.overrideTemplateKeys.add(key);
                }
                else if (!this.templateKeys.has(key) && !this.overrideTemplateKeys.has(key)) {
                    this.compileColumnMetadata(column);
                    this.templateKeys.add(key);
                }
                this.fullTemplateKeys.add(key);
            }
        }));
    }
    /**
     * @param {?} key
     * @param {?} partialSchema
     * @return {?}
     */
    mutateColumnSchema(key, partialSchema) {
        for (const option of Object.keys(partialSchema)) {
            this.compiledTemplates[key][option] = partialSchema[option];
        }
    }
    /**
     * @param {?} column
     * @return {?}
     */
    compileColumnMetadata(column) {
        const { key, th, td, emptyHead, headTitle } = column;
        /** @type {?} */
        const thTemplate = th || new TemplateHeadThDirective(null);
        /** @type {?} */
        const tdTemplate = td || new TemplateBodyTdDirective(null);
        /** @type {?} */
        const isEmptyHead = TemplateParserService.getValidHtmlBooleanAttribute(emptyHead);
        /** @type {?} */
        const thOptions = TemplateParserService.templateContext(key, thTemplate, this.columnOptions);
        /** @type {?} */
        const stickyLeft = TemplateParserService.getValidHtmlBooleanAttribute(column.stickyLeft);
        /** @type {?} */
        const stickyRight = TemplateParserService.getValidHtmlBooleanAttribute(column.stickyRight);
        /** @type {?} */
        const canBeAddDraggable = !(stickyLeft || stickyRight);
        /** @type {?} */
        const isModel = this.keyMap[key];
        this.compiledTemplates[key] = {
            key,
            isModel,
            isVisible: true,
            th: Object.assign({}, thOptions, { headTitle, emptyHead: isEmptyHead, template: isEmptyHead ? null : thOptions.template }),
            td: TemplateParserService.templateContext(key, tdTemplate, this.columnOptions),
            stickyLeft: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyLeft),
            stickyRight: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyRight),
            customColumn: TemplateParserService.getValidHtmlBooleanAttribute(column.customKey),
            width: TemplateParserService.getValidPredicate(column.width, this.columnOptions.width),
            cssClass: TemplateParserService.getValidPredicate(column.cssClass, this.columnOptions.cssClass) || [],
            cssStyle: TemplateParserService.getValidPredicate(column.cssStyle, this.columnOptions.cssStyle) || [],
            resizable: TemplateParserService.getValidPredicate(column.resizable, this.columnOptions.resizable),
            verticalLine: column.verticalLine,
            excluded: !this.allowedKeyMap[key],
            filterable: TemplateParserService.getValidPredicate(column.filterable, this.columnOptions.filterable),
            sortable: isModel
                ? TemplateParserService.getValidPredicate(column.sortable, this.columnOptions.sortable)
                : false,
            draggable: canBeAddDraggable
                ? TemplateParserService.getValidPredicate(column.draggable, this.columnOptions.draggable)
                : false
        };
    }
}
TemplateParserService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    TemplateParserService.prototype.schema;
    /** @type {?} */
    TemplateParserService.prototype.templateKeys;
    /** @type {?} */
    TemplateParserService.prototype.fullTemplateKeys;
    /** @type {?} */
    TemplateParserService.prototype.overrideTemplateKeys;
    /** @type {?} */
    TemplateParserService.prototype.columnOptions;
    /** @type {?} */
    TemplateParserService.prototype.compiledTemplates;
    /**
     * \@description: the custom names of the column list to be displayed in the view.
     * \@example:
     *    <table-builder #table
     *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
     *        [exclude]="[ 'description' ]">
     *    </table-builder>
     *    ------------------------
     *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true }
     * @type {?}
     */
    TemplateParserService.prototype.allowedKeyMap;
    /**
     * \@description: the custom names of the column list to be displayed in the view.
     * \@example:
     *    <table-builder #table
     *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
     *        [exclude]="[ 'description' ]">
     *    </table-builder>
     *    ------------------------
     *    allowedKeyMap === { 'id': true, 'hello': true, 'value': true, 'description': false }
     * @type {?}
     */
    TemplateParserService.prototype.keyMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtcGFyc2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3RlbXBsYXRlLXBhcnNlci90ZW1wbGF0ZS1wYXJzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWlCLGVBQWUsRUFBb0IsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUkzRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3ZELE1BQU0sT0FBTyxxQkFBcUI7SUFEbEM7UUFPVyxzQkFBaUIsR0FBMEIsRUFBRSxDQUFDOzs7Ozs7Ozs7OztRQVk5QyxrQkFBYSxHQUFvQixFQUFFLENBQUM7Ozs7Ozs7Ozs7O1FBWXBDLFdBQU0sR0FBb0IsRUFBRSxDQUFDO0lBcUh4QyxDQUFDOzs7Ozs7OztJQW5IVyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQVcsRUFBRSxJQUF3QixFQUFFLE9BQXNCO1FBQ3hGLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIs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Q0FBQztZQUNsQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztZQUNyRyxRQUFRLEVBQUUsT0FBTztnQkFDYixDQUFDLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztnQkFDdkYsQ0FBQyxDQUFDLEtBQUs7WUFDWCxTQUFTLEVBQUUsaUJBQWlCO2dCQUN4QixDQUFDLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztnQkFDekYsQ0FBQyxDQUFDLEtBQUs7U0FDZCxDQUFDO0lBQ04sQ0FBQzs7O1lBbkpKLFVBQVU7Ozs7SUFFUCx1Q0FBNkI7O0lBQzdCLDZDQUFpQzs7SUFDakMsaURBQXFDOztJQUNyQyxxREFBeUM7O0lBQ3pDLDhDQUFvQzs7SUFDcEMsa0RBQXFEOzs7Ozs7Ozs7Ozs7SUFZckQsOENBQTJDOzs7Ozs7Ozs7Ozs7SUFZM0MsdUNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29sdW1uc1NjaGVtYSwgSW1wbGljaXRDb250ZXh0LCBUYWJsZUNlbGxPcHRpb25zIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmV4dGVybmFsJztcclxuaW1wb3J0IHsgVGVtcGxhdGVIZWFkVGhEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jvd3MvdGVtcGxhdGUtaGVhZC10aC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZUJvZHlUZERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1ib2R5LXRkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5neENvbHVtbkNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbmd4LWNvbHVtbi9uZ3gtY29sdW1uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEtleU1hcCwgUXVlcnlMaXN0UmVmIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90YWJsZS1idWlsZGVyLmludGVybmFsJztcclxuaW1wb3J0IHsgVGVtcGxhdGVDZWxsQ29tbW9uIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yb3dzL3RlbXBsYXRlLWNlbGwuY29tbW9uJztcclxuaW1wb3J0IHsgQ29sdW1uT3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2NvbHVtbi1vcHRpb25zJztcclxuaW1wb3J0IHsgU2NoZW1hQnVpbGRlciB9IGZyb20gJy4vc2NoZW1hLWJ1aWxkZXIuY2xhc3MnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVQYXJzZXJTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBzY2hlbWE6IFNjaGVtYUJ1aWxkZXI7XHJcbiAgICBwdWJsaWMgdGVtcGxhdGVLZXlzOiBTZXQ8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBmdWxsVGVtcGxhdGVLZXlzOiBTZXQ8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBvdmVycmlkZVRlbXBsYXRlS2V5czogU2V0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgY29sdW1uT3B0aW9uczogQ29sdW1uT3B0aW9ucztcclxuICAgIHB1YmxpYyBjb21waWxlZFRlbXBsYXRlczogS2V5TWFwPENvbHVtbnNTY2hlbWE+ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHRoZSBjdXN0b20gbmFtZXMgb2YgdGhlIGNvbHVtbiBsaXN0IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdmlldy5cclxuICAgICAqIEBleGFtcGxlOlxyXG4gICAgICogICAgPHRhYmxlLWJ1aWxkZXIgI3RhYmxlXHJcbiAgICAgKiAgICAgICAgW3NvdXJjZV09XCJbeyBpZDogMSwgbmFtZTogJ2hlbGxvJywgdmFsdWU6ICd3b3JsZCcsIGRlc2NyaXB0aW9uOiAndGV4dCcgfSwgLi4uXVwiXHJcbiAgICAgKiAgICAgICAgW2V4Y2x1ZGVdPVwiWyAnZGVzY3JpcHRpb24nIF1cIj5cclxuICAgICAqICAgIDwvdGFibGUtYnVpbGRlcj5cclxuICAgICAqICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICogICAgYWxsb3dlZEtleU1hcCA9PT0geyAnaWQnOiB0cnVlLCAnaGVsbG8nOiB0cnVlLCAndmFsdWUnOiB0cnVlIH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFsbG93ZWRLZXlNYXA6IEtleU1hcDxib29sZWFuPiA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiB0aGUgY3VzdG9tIG5hbWVzIG9mIHRoZSBjb2x1bW4gbGlzdCB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXcuXHJcbiAgICAgKiBAZXhhbXBsZTpcclxuICAgICAqICAgIDx0YWJsZS1idWlsZGVyICN0YWJsZVxyXG4gICAgICogICAgICAgIFtzb3VyY2VdPVwiW3sgaWQ6IDEsIG5hbWU6ICdoZWxsbycsIHZhbHVlOiAnd29ybGQnLCBkZXNjcmlwdGlvbjogJ3RleHQnIH0sIC4uLl1cIlxyXG4gICAgICogICAgICAgIFtleGNsdWRlXT1cIlsgJ2Rlc2NyaXB0aW9uJyBdXCI+XHJcbiAgICAgKiAgICA8L3RhYmxlLWJ1aWxkZXI+XHJcbiAgICAgKiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAqICAgIGFsbG93ZWRLZXlNYXAgPT09IHsgJ2lkJzogdHJ1ZSwgJ2hlbGxvJzogdHJ1ZSwgJ3ZhbHVlJzogdHJ1ZSwgJ2Rlc2NyaXB0aW9uJzogZmFsc2UgfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMga2V5TWFwOiBLZXlNYXA8Ym9vbGVhbj4gPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0ZW1wbGF0ZUNvbnRleHQoa2V5OiBzdHJpbmcsIGNlbGw6IFRlbXBsYXRlQ2VsbENvbW1vbiwgb3B0aW9uczogQ29sdW1uT3B0aW9ucyk6IFRhYmxlQ2VsbE9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRleHRCb2xkOiBjZWxsLmJvbGQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBjZWxsLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICBjbGFzczogY2VsbC5jc3NDbGFzc2VzLFxyXG4gICAgICAgICAgICBzdHlsZTogY2VsbC5jc3NTdHlsZXMsXHJcbiAgICAgICAgICAgIHdpZHRoOiBjZWxsLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGNlbGwuaGVpZ2h0LFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBjZWxsLm9uQ2xpY2ssXHJcbiAgICAgICAgICAgIGRibENsaWNrOiBjZWxsLmRibENsaWNrLFxyXG4gICAgICAgICAgICB1c2VEZWVwUGF0aDoga2V5LmluY2x1ZGVzKCcuJyksXHJcbiAgICAgICAgICAgIGNvbnRleHQ6IGNlbGwucm93ID8gSW1wbGljaXRDb250ZXh0LlJPVyA6IEltcGxpY2l0Q29udGV4dC5DRUxMLFxyXG4gICAgICAgICAgICBub3dyYXA6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShvcHRpb25zLm5vd3JhcCwgY2VsbC5ub3dyYXApXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRWYWxpZEh0bWxCb29sZWFuQXR0cmlidXRlKGF0dHJpYnV0ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgYXR0cmlidXRlID09PSAnc3RyaW5nJyA/IHRydWUgOiBhdHRyaWJ1dGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VmFsaWRQcmVkaWNhdGU8VD4obGVmdFByZWRpY2F0ZTogVCwgcmlnaHRQcmVkaWNhdGU6IFQpOiBUIHtcclxuICAgICAgICByZXR1cm4gbGVmdFByZWRpY2F0ZSA9PT0gbnVsbCA/IHJpZ2h0UHJlZGljYXRlIDogbGVmdFByZWRpY2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlQ29sdW1uVmlzaWJpbGl0eShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NoZW1hLmNvbHVtbnMgPSB0aGlzLnNjaGVtYS5jb2x1bW5zLm1hcCgoY29sdW1uOiBDb2x1bW5zU2NoZW1hKSA9PlxyXG4gICAgICAgICAgICBrZXkgPT09IGNvbHVtbi5rZXlcclxuICAgICAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uY29sdW1uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaXNWaXNpYmxlOiAhY29sdW1uLmlzVmlzaWJsZVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA6IGNvbHVtblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxTY2hlbWEoY29sdW1uT3B0aW9uczogQ29sdW1uT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NoZW1hID0gdGhpcy5zY2hlbWEgfHwgbmV3IFNjaGVtYUJ1aWxkZXIoKTtcclxuICAgICAgICB0aGlzLnNjaGVtYS5jb2x1bW5zID0gW107XHJcbiAgICAgICAgdGhpcy5jb21waWxlZFRlbXBsYXRlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVLZXlzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgdGhpcy5vdmVycmlkZVRlbXBsYXRlS2V5cyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMuZnVsbFRlbXBsYXRlS2V5cyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMuY29sdW1uT3B0aW9ucyA9IGNvbHVtbk9wdGlvbnMgfHwgbmV3IENvbHVtbk9wdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFyc2UodGVtcGxhdGVzOiBRdWVyeUxpc3RSZWY8Tmd4Q29sdW1uQ29tcG9uZW50Pik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGVtcGxhdGVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRlbXBsYXRlcy5mb3JFYWNoKChjb2x1bW46IE5neENvbHVtbkNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB7IGtleSwgY3VzdG9tS2V5LCBpbXBvcnRhbnRUZW1wbGF0ZSB9OiBOZ3hDb2x1bW5Db21wb25lbnQgPSBjb2x1bW47XHJcbiAgICAgICAgICAgIGNvbnN0IG5lZWRUZW1wbGF0ZUNoZWNrOiBib29sZWFuID0gdGhpcy5hbGxvd2VkS2V5TWFwW2tleV0gfHwgY3VzdG9tS2V5ICE9PSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZWVkVGVtcGxhdGVDaGVjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGltcG9ydGFudFRlbXBsYXRlICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVLZXlzLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZUNvbHVtbk1ldGFkYXRhKGNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVycmlkZVRlbXBsYXRlS2V5cy5hZGQoa2V5KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudGVtcGxhdGVLZXlzLmhhcyhrZXkpICYmICF0aGlzLm92ZXJyaWRlVGVtcGxhdGVLZXlzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21waWxlQ29sdW1uTWV0YWRhdGEoY29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlS2V5cy5hZGQoa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxUZW1wbGF0ZUtleXMuYWRkKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbXV0YXRlQ29sdW1uU2NoZW1hKGtleTogc3RyaW5nLCBwYXJ0aWFsU2NoZW1hOiBQYXJ0aWFsPENvbHVtbnNTY2hlbWE+KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgT2JqZWN0LmtleXMocGFydGlhbFNjaGVtYSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21waWxlZFRlbXBsYXRlc1trZXldW29wdGlvbl0gPSBwYXJ0aWFsU2NoZW1hW29wdGlvbl07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb21waWxlQ29sdW1uTWV0YWRhdGEoY29sdW1uOiBOZ3hDb2x1bW5Db21wb25lbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB7IGtleSwgdGgsIHRkLCBlbXB0eUhlYWQsIGhlYWRUaXRsZSB9OiBOZ3hDb2x1bW5Db21wb25lbnQgPSBjb2x1bW47XHJcbiAgICAgICAgY29uc3QgdGhUZW1wbGF0ZTogVGVtcGxhdGVDZWxsQ29tbW9uID0gdGggfHwgbmV3IFRlbXBsYXRlSGVhZFRoRGlyZWN0aXZlKG51bGwpO1xyXG4gICAgICAgIGNvbnN0IHRkVGVtcGxhdGU6IFRlbXBsYXRlQ2VsbENvbW1vbiA9IHRkIHx8IG5ldyBUZW1wbGF0ZUJvZHlUZERpcmVjdGl2ZShudWxsKTtcclxuICAgICAgICBjb25zdCBpc0VtcHR5SGVhZDogYm9vbGVhbiA9IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZEh0bWxCb29sZWFuQXR0cmlidXRlKGVtcHR5SGVhZCk7XHJcbiAgICAgICAgY29uc3QgdGhPcHRpb25zOiBUYWJsZUNlbGxPcHRpb25zID0gVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLnRlbXBsYXRlQ29udGV4dChrZXksIHRoVGVtcGxhdGUsIHRoaXMuY29sdW1uT3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3Qgc3RpY2t5TGVmdDogYm9vbGVhbiA9IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZEh0bWxCb29sZWFuQXR0cmlidXRlKGNvbHVtbi5zdGlja3lMZWZ0KTtcclxuICAgICAgICBjb25zdCBzdGlja3lSaWdodDogYm9vbGVhbiA9IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZEh0bWxCb29sZWFuQXR0cmlidXRlKGNvbHVtbi5zdGlja3lSaWdodCk7XHJcbiAgICAgICAgY29uc3QgY2FuQmVBZGREcmFnZ2FibGU6IGJvb2xlYW4gPSAhKHN0aWNreUxlZnQgfHwgc3RpY2t5UmlnaHQpO1xyXG4gICAgICAgIGNvbnN0IGlzTW9kZWw6IGJvb2xlYW4gPSB0aGlzLmtleU1hcFtrZXldO1xyXG5cclxuICAgICAgICB0aGlzLmNvbXBpbGVkVGVtcGxhdGVzW2tleV0gPSB7XHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgaXNNb2RlbCxcclxuICAgICAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB0aDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgaGVhZFRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlIZWFkOiBpc0VtcHR5SGVhZCxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBpc0VtcHR5SGVhZCA/IG51bGwgOiB0aE9wdGlvbnMudGVtcGxhdGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGQ6IFRlbXBsYXRlUGFyc2VyU2VydmljZS50ZW1wbGF0ZUNvbnRleHQoa2V5LCB0ZFRlbXBsYXRlLCB0aGlzLmNvbHVtbk9wdGlvbnMpLFxyXG4gICAgICAgICAgICBzdGlja3lMZWZ0OiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRIdG1sQm9vbGVhbkF0dHJpYnV0ZShjb2x1bW4uc3RpY2t5TGVmdCksXHJcbiAgICAgICAgICAgIHN0aWNreVJpZ2h0OiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRIdG1sQm9vbGVhbkF0dHJpYnV0ZShjb2x1bW4uc3RpY2t5UmlnaHQpLFxyXG4gICAgICAgICAgICBjdXN0b21Db2x1bW46IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZEh0bWxCb29sZWFuQXR0cmlidXRlKGNvbHVtbi5jdXN0b21LZXkpLFxyXG4gICAgICAgICAgICB3aWR0aDogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkUHJlZGljYXRlKGNvbHVtbi53aWR0aCwgdGhpcy5jb2x1bW5PcHRpb25zLndpZHRoKSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4uY3NzQ2xhc3MsIHRoaXMuY29sdW1uT3B0aW9ucy5jc3NDbGFzcykgfHwgW10sXHJcbiAgICAgICAgICAgIGNzc1N0eWxlOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLmNzc1N0eWxlLCB0aGlzLmNvbHVtbk9wdGlvbnMuY3NzU3R5bGUpIHx8IFtdLFxyXG4gICAgICAgICAgICByZXNpemFibGU6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4ucmVzaXphYmxlLCB0aGlzLmNvbHVtbk9wdGlvbnMucmVzaXphYmxlKSxcclxuICAgICAgICAgICAgdmVydGljYWxMaW5lOiBjb2x1bW4udmVydGljYWxMaW5lLFxyXG4gICAgICAgICAgICBleGNsdWRlZDogIXRoaXMuYWxsb3dlZEtleU1hcFtrZXldLFxyXG4gICAgICAgICAgICBmaWx0ZXJhYmxlOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLmZpbHRlcmFibGUsIHRoaXMuY29sdW1uT3B0aW9ucy5maWx0ZXJhYmxlKSxcclxuICAgICAgICAgICAgc29ydGFibGU6IGlzTW9kZWxcclxuICAgICAgICAgICAgICAgID8gVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkUHJlZGljYXRlKGNvbHVtbi5zb3J0YWJsZSwgdGhpcy5jb2x1bW5PcHRpb25zLnNvcnRhYmxlKVxyXG4gICAgICAgICAgICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBjYW5CZUFkZERyYWdnYWJsZVxyXG4gICAgICAgICAgICAgICAgPyBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLmRyYWdnYWJsZSwgdGhpcy5jb2x1bW5PcHRpb25zLmRyYWdnYWJsZSlcclxuICAgICAgICAgICAgICAgIDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==