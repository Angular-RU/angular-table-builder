/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ImplicitContext } from '../../interfaces/table-builder.external';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { ColumnOptions } from '../../components/common/column-options';
import { SchemaBuilder } from './schema-builder.class';
var TemplateParserService = /** @class */ (function () {
    function TemplateParserService() {
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
    TemplateParserService.templateContext = /**
     * @private
     * @param {?} key
     * @param {?} cell
     * @param {?} options
     * @return {?}
     */
    function (key, cell, options) {
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
    };
    /**
     * @private
     * @param {?} attribute
     * @return {?}
     */
    TemplateParserService.getValidHtmlBooleanAttribute = /**
     * @private
     * @param {?} attribute
     * @return {?}
     */
    function (attribute) {
        return typeof attribute === 'string' ? true : attribute;
    };
    /**
     * @private
     * @template T
     * @param {?} leftPredicate
     * @param {?} rightPredicate
     * @return {?}
     */
    TemplateParserService.getValidPredicate = /**
     * @private
     * @template T
     * @param {?} leftPredicate
     * @param {?} rightPredicate
     * @return {?}
     */
    function (leftPredicate, rightPredicate) {
        return leftPredicate === null ? rightPredicate : leftPredicate;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    TemplateParserService.prototype.toggleColumnVisibility = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.schema.columns = this.schema.columns.map((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            return key === column.key
                ? tslib_1.__assign({}, column, { isVisible: !column.isVisible }) : column;
        }));
    };
    /**
     * @param {?} columnOptions
     * @return {?}
     */
    TemplateParserService.prototype.initialSchema = /**
     * @param {?} columnOptions
     * @return {?}
     */
    function (columnOptions) {
        this.schema = this.schema || new SchemaBuilder();
        this.schema.columns = [];
        this.compiledTemplates = {};
        this.templateKeys = new Set();
        this.overrideTemplateKeys = new Set();
        this.fullTemplateKeys = new Set();
        this.columnOptions = columnOptions || new ColumnOptions();
    };
    /**
     * @param {?} templates
     * @return {?}
     */
    TemplateParserService.prototype.parse = /**
     * @param {?} templates
     * @return {?}
     */
    function (templates) {
        var _this = this;
        if (!templates) {
            return;
        }
        templates.forEach((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            var key = column.key, customKey = column.customKey, importantTemplate = column.importantTemplate;
            /** @type {?} */
            var needTemplateCheck = _this.allowedKeyMap[key] || customKey !== false;
            if (needTemplateCheck) {
                if (importantTemplate !== false) {
                    _this.templateKeys.delete(key);
                    _this.compileColumnMetadata(column);
                    _this.overrideTemplateKeys.add(key);
                }
                else if (!_this.templateKeys.has(key) && !_this.overrideTemplateKeys.has(key)) {
                    _this.compileColumnMetadata(column);
                    _this.templateKeys.add(key);
                }
                _this.fullTemplateKeys.add(key);
            }
        }));
    };
    /**
     * @param {?} key
     * @param {?} partialSchema
     * @return {?}
     */
    TemplateParserService.prototype.mutateColumnSchema = /**
     * @param {?} key
     * @param {?} partialSchema
     * @return {?}
     */
    function (key, partialSchema) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(Object.keys(partialSchema)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var option = _c.value;
                this.compiledTemplates[key][option] = partialSchema[option];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @param {?} column
     * @return {?}
     */
    TemplateParserService.prototype.compileColumnMetadata = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        var key = column.key, th = column.th, td = column.td, emptyHead = column.emptyHead, headTitle = column.headTitle;
        /** @type {?} */
        var thTemplate = th || new TemplateHeadThDirective(null);
        /** @type {?} */
        var tdTemplate = td || new TemplateBodyTdDirective(null);
        /** @type {?} */
        var isEmptyHead = TemplateParserService.getValidHtmlBooleanAttribute(emptyHead);
        /** @type {?} */
        var thOptions = TemplateParserService.templateContext(key, thTemplate, this.columnOptions);
        /** @type {?} */
        var stickyLeft = TemplateParserService.getValidHtmlBooleanAttribute(column.stickyLeft);
        /** @type {?} */
        var stickyRight = TemplateParserService.getValidHtmlBooleanAttribute(column.stickyRight);
        /** @type {?} */
        var canBeAddDraggable = !(stickyLeft || stickyRight);
        /** @type {?} */
        var isModel = this.keyMap[key];
        this.compiledTemplates[key] = {
            key: key,
            isModel: isModel,
            isVisible: true,
            th: tslib_1.__assign({}, thOptions, { headTitle: headTitle, emptyHead: isEmptyHead, template: isEmptyHead ? null : thOptions.template }),
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
    };
    TemplateParserService.decorators = [
        { type: Injectable }
    ];
    return TemplateParserService;
}());
export { TemplateParserService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtcGFyc2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3RlbXBsYXRlLXBhcnNlci90ZW1wbGF0ZS1wYXJzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFpQixlQUFlLEVBQW9CLE1BQU0seUNBQXlDLENBQUM7QUFDM0csT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFJM0YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RDtJQUFBO1FBT1csc0JBQWlCLEdBQTBCLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7UUFZOUMsa0JBQWEsR0FBb0IsRUFBRSxDQUFDOzs7Ozs7Ozs7OztRQVlwQyxXQUFNLEdBQW9CLEVBQUUsQ0FBQztJQXFIeEMsQ0FBQzs7Ozs7Ozs7SUFuSGtCLHFDQUFlOzs7Ozs7O0lBQTlCLFVBQStCLEdBQVcsRUFBRSxJQUF3QixFQUFFLE9BQXNCO1FBQ3hGLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLElB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QVMsQ0FBQztZQUNsRyxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7WUFDakMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDbEMsVUFBVSxFQUFFLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7WUFDckcsUUFBUSxFQUFFLE9BQU87Z0JBQ2IsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZGLENBQUMsQ0FBQyxLQUFLO1lBQ1gsU0FBUyxFQUFFLGlCQUFpQjtnQkFDeEIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7Z0JBQ3pGLENBQUMsQ0FBQyxLQUFLO1NBQ2QsQ0FBQztJQUNOLENBQUM7O2dCQW5KSixVQUFVOztJQW9KWCw0QkFBQztDQUFBLEFBcEpELElBb0pDO1NBbkpZLHFCQUFxQjs7O0lBQzlCLHVDQUE2Qjs7SUFDN0IsNkNBQWlDOztJQUNqQyxpREFBcUM7O0lBQ3JDLHFEQUF5Qzs7SUFDekMsOENBQW9DOztJQUNwQyxrREFBcUQ7Ozs7Ozs7Ozs7OztJQVlyRCw4Q0FBMkM7Ozs7Ozs7Ozs7OztJQVkzQyx1Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb2x1bW5zU2NoZW1hLCBJbXBsaWNpdENvbnRleHQsIFRhYmxlQ2VsbE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZUhlYWRUaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1oZWFkLXRoLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRlbXBsYXRlQm9keVRkRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yb3dzL3RlbXBsYXRlLWJvZHktdGQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd4Q29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uZ3gtY29sdW1uL25neC1jb2x1bW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgS2V5TWFwLCBRdWVyeUxpc3RSZWYgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZUNlbGxDb21tb24gfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jvd3MvdGVtcGxhdGUtY2VsbC5jb21tb24nO1xyXG5pbXBvcnQgeyBDb2x1bW5PcHRpb25zIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vY29sdW1uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBTY2hlbWFCdWlsZGVyIH0gZnJvbSAnLi9zY2hlbWEtYnVpbGRlci5jbGFzcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVBhcnNlclNlcnZpY2Uge1xyXG4gICAgcHVibGljIHNjaGVtYTogU2NoZW1hQnVpbGRlcjtcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZUtleXM6IFNldDxzdHJpbmc+O1xyXG4gICAgcHVibGljIGZ1bGxUZW1wbGF0ZUtleXM6IFNldDxzdHJpbmc+O1xyXG4gICAgcHVibGljIG92ZXJyaWRlVGVtcGxhdGVLZXlzOiBTZXQ8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBjb2x1bW5PcHRpb25zOiBDb2x1bW5PcHRpb25zO1xyXG4gICAgcHVibGljIGNvbXBpbGVkVGVtcGxhdGVzOiBLZXlNYXA8Q29sdW1uc1NjaGVtYT4gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbjogdGhlIGN1c3RvbSBuYW1lcyBvZiB0aGUgY29sdW1uIGxpc3QgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB2aWV3LlxyXG4gICAgICogQGV4YW1wbGU6XHJcbiAgICAgKiAgICA8dGFibGUtYnVpbGRlciAjdGFibGVcclxuICAgICAqICAgICAgICBbc291cmNlXT1cIlt7IGlkOiAxLCBuYW1lOiAnaGVsbG8nLCB2YWx1ZTogJ3dvcmxkJywgZGVzY3JpcHRpb246ICd0ZXh0JyB9LCAuLi5dXCJcclxuICAgICAqICAgICAgICBbZXhjbHVkZV09XCJbICdkZXNjcmlwdGlvbicgXVwiPlxyXG4gICAgICogICAgPC90YWJsZS1idWlsZGVyPlxyXG4gICAgICogICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgKiAgICBhbGxvd2VkS2V5TWFwID09PSB7ICdpZCc6IHRydWUsICdoZWxsbyc6IHRydWUsICd2YWx1ZSc6IHRydWUgfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWxsb3dlZEtleU1hcDogS2V5TWFwPGJvb2xlYW4+ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IHRoZSBjdXN0b20gbmFtZXMgb2YgdGhlIGNvbHVtbiBsaXN0IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgdmlldy5cclxuICAgICAqIEBleGFtcGxlOlxyXG4gICAgICogICAgPHRhYmxlLWJ1aWxkZXIgI3RhYmxlXHJcbiAgICAgKiAgICAgICAgW3NvdXJjZV09XCJbeyBpZDogMSwgbmFtZTogJ2hlbGxvJywgdmFsdWU6ICd3b3JsZCcsIGRlc2NyaXB0aW9uOiAndGV4dCcgfSwgLi4uXVwiXHJcbiAgICAgKiAgICAgICAgW2V4Y2x1ZGVdPVwiWyAnZGVzY3JpcHRpb24nIF1cIj5cclxuICAgICAqICAgIDwvdGFibGUtYnVpbGRlcj5cclxuICAgICAqICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICogICAgYWxsb3dlZEtleU1hcCA9PT0geyAnaWQnOiB0cnVlLCAnaGVsbG8nOiB0cnVlLCAndmFsdWUnOiB0cnVlLCAnZGVzY3JpcHRpb24nOiBmYWxzZSB9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBrZXlNYXA6IEtleU1hcDxib29sZWFuPiA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHRlbXBsYXRlQ29udGV4dChrZXk6IHN0cmluZywgY2VsbDogVGVtcGxhdGVDZWxsQ29tbW9uLCBvcHRpb25zOiBDb2x1bW5PcHRpb25zKTogVGFibGVDZWxsT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGV4dEJvbGQ6IGNlbGwuYm9sZCxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IGNlbGwudGVtcGxhdGUsXHJcbiAgICAgICAgICAgIGNsYXNzOiBjZWxsLmNzc0NsYXNzZXMsXHJcbiAgICAgICAgICAgIHN0eWxlOiBjZWxsLmNzc1N0eWxlcyxcclxuICAgICAgICAgICAgd2lkdGg6IGNlbGwud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogY2VsbC5oZWlnaHQsXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGNlbGwub25DbGljayxcclxuICAgICAgICAgICAgZGJsQ2xpY2s6IGNlbGwuZGJsQ2xpY2ssXHJcbiAgICAgICAgICAgIHVzZURlZXBQYXRoOiBrZXkuaW5jbHVkZXMoJy4nKSxcclxuICAgICAgICAgICAgY29udGV4dDogY2VsbC5yb3cgPyBJbXBsaWNpdENvbnRleHQuUk9XIDogSW1wbGljaXRDb250ZXh0LkNFTEwsXHJcbiAgICAgICAgICAgIG5vd3JhcDogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkUHJlZGljYXRlKG9wdGlvbnMubm93cmFwLCBjZWxsLm5vd3JhcClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFZhbGlkSHRtbEJvb2xlYW5BdHRyaWJ1dGUoYXR0cmlidXRlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhdHRyaWJ1dGUgPT09ICdzdHJpbmcnID8gdHJ1ZSA6IGF0dHJpYnV0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRWYWxpZFByZWRpY2F0ZTxUPihsZWZ0UHJlZGljYXRlOiBULCByaWdodFByZWRpY2F0ZTogVCk6IFQge1xyXG4gICAgICAgIHJldHVybiBsZWZ0UHJlZGljYXRlID09PSBudWxsID8gcmlnaHRQcmVkaWNhdGUgOiBsZWZ0UHJlZGljYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGVDb2x1bW5WaXNpYmlsaXR5KGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY2hlbWEuY29sdW1ucyA9IHRoaXMuc2NoZW1hLmNvbHVtbnMubWFwKChjb2x1bW46IENvbHVtbnNTY2hlbWEpID0+XHJcbiAgICAgICAgICAgIGtleSA9PT0gY29sdW1uLmtleVxyXG4gICAgICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAuLi5jb2x1bW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBpc1Zpc2libGU6ICFjb2x1bW4uaXNWaXNpYmxlXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDogY29sdW1uXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbFNjaGVtYShjb2x1bW5PcHRpb25zOiBDb2x1bW5PcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY2hlbWEgPSB0aGlzLnNjaGVtYSB8fCBuZXcgU2NoZW1hQnVpbGRlcigpO1xyXG4gICAgICAgIHRoaXMuc2NoZW1hLmNvbHVtbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbXBpbGVkVGVtcGxhdGVzID0ge307XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUtleXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgICAgICB0aGlzLm92ZXJyaWRlVGVtcGxhdGVLZXlzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgdGhpcy5mdWxsVGVtcGxhdGVLZXlzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5PcHRpb25zID0gY29sdW1uT3B0aW9ucyB8fCBuZXcgQ29sdW1uT3B0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJzZSh0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdFJlZjxOZ3hDb2x1bW5Db21wb25lbnQ+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0ZW1wbGF0ZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGVtcGxhdGVzLmZvckVhY2goKGNvbHVtbjogTmd4Q29sdW1uQ29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsga2V5LCBjdXN0b21LZXksIGltcG9ydGFudFRlbXBsYXRlIH06IE5neENvbHVtbkNvbXBvbmVudCA9IGNvbHVtbjtcclxuICAgICAgICAgICAgY29uc3QgbmVlZFRlbXBsYXRlQ2hlY2s6IGJvb2xlYW4gPSB0aGlzLmFsbG93ZWRLZXlNYXBba2V5XSB8fCBjdXN0b21LZXkgIT09IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5lZWRUZW1wbGF0ZUNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1wb3J0YW50VGVtcGxhdGUgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUtleXMuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21waWxlQ29sdW1uTWV0YWRhdGEoY29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJyaWRlVGVtcGxhdGVLZXlzLmFkZChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy50ZW1wbGF0ZUtleXMuaGFzKGtleSkgJiYgIXRoaXMub3ZlcnJpZGVUZW1wbGF0ZUtleXMuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBpbGVDb2x1bW5NZXRhZGF0YShjb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVLZXlzLmFkZChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbFRlbXBsYXRlS2V5cy5hZGQoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtdXRhdGVDb2x1bW5TY2hlbWEoa2V5OiBzdHJpbmcsIHBhcnRpYWxTY2hlbWE6IFBhcnRpYWw8Q29sdW1uc1NjaGVtYT4pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhwYXJ0aWFsU2NoZW1hKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVkVGVtcGxhdGVzW2tleV1bb3B0aW9uXSA9IHBhcnRpYWxTY2hlbWFbb3B0aW9uXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbXBpbGVDb2x1bW5NZXRhZGF0YShjb2x1bW46IE5neENvbHVtbkNvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHsga2V5LCB0aCwgdGQsIGVtcHR5SGVhZCwgaGVhZFRpdGxlIH06IE5neENvbHVtbkNvbXBvbmVudCA9IGNvbHVtbjtcclxuICAgICAgICBjb25zdCB0aFRlbXBsYXRlOiBUZW1wbGF0ZUNlbGxDb21tb24gPSB0aCB8fCBuZXcgVGVtcGxhdGVIZWFkVGhEaXJlY3RpdmUobnVsbCk7XHJcbiAgICAgICAgY29uc3QgdGRUZW1wbGF0ZTogVGVtcGxhdGVDZWxsQ29tbW9uID0gdGQgfHwgbmV3IFRlbXBsYXRlQm9keVRkRGlyZWN0aXZlKG51bGwpO1xyXG4gICAgICAgIGNvbnN0IGlzRW1wdHlIZWFkOiBib29sZWFuID0gVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkSHRtbEJvb2xlYW5BdHRyaWJ1dGUoZW1wdHlIZWFkKTtcclxuICAgICAgICBjb25zdCB0aE9wdGlvbnM6IFRhYmxlQ2VsbE9wdGlvbnMgPSBUZW1wbGF0ZVBhcnNlclNlcnZpY2UudGVtcGxhdGVDb250ZXh0KGtleSwgdGhUZW1wbGF0ZSwgdGhpcy5jb2x1bW5PcHRpb25zKTtcclxuICAgICAgICBjb25zdCBzdGlja3lMZWZ0OiBib29sZWFuID0gVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkSHRtbEJvb2xlYW5BdHRyaWJ1dGUoY29sdW1uLnN0aWNreUxlZnQpO1xyXG4gICAgICAgIGNvbnN0IHN0aWNreVJpZ2h0OiBib29sZWFuID0gVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkSHRtbEJvb2xlYW5BdHRyaWJ1dGUoY29sdW1uLnN0aWNreVJpZ2h0KTtcclxuICAgICAgICBjb25zdCBjYW5CZUFkZERyYWdnYWJsZTogYm9vbGVhbiA9ICEoc3RpY2t5TGVmdCB8fCBzdGlja3lSaWdodCk7XHJcbiAgICAgICAgY29uc3QgaXNNb2RlbDogYm9vbGVhbiA9IHRoaXMua2V5TWFwW2tleV07XHJcblxyXG4gICAgICAgIHRoaXMuY29tcGlsZWRUZW1wbGF0ZXNba2V5XSA9IHtcclxuICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICBpc01vZGVsLFxyXG4gICAgICAgICAgICBpc1Zpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIHRoOiB7XHJcbiAgICAgICAgICAgICAgICAuLi50aE9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBoZWFkVGl0bGUsXHJcbiAgICAgICAgICAgICAgICBlbXB0eUhlYWQ6IGlzRW1wdHlIZWFkLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGlzRW1wdHlIZWFkID8gbnVsbCA6IHRoT3B0aW9ucy50ZW1wbGF0ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZDogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLnRlbXBsYXRlQ29udGV4dChrZXksIHRkVGVtcGxhdGUsIHRoaXMuY29sdW1uT3B0aW9ucyksXHJcbiAgICAgICAgICAgIHN0aWNreUxlZnQ6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZEh0bWxCb29sZWFuQXR0cmlidXRlKGNvbHVtbi5zdGlja3lMZWZ0KSxcclxuICAgICAgICAgICAgc3RpY2t5UmlnaHQ6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZEh0bWxCb29sZWFuQXR0cmlidXRlKGNvbHVtbi5zdGlja3lSaWdodCksXHJcbiAgICAgICAgICAgIGN1c3RvbUNvbHVtbjogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkSHRtbEJvb2xlYW5BdHRyaWJ1dGUoY29sdW1uLmN1c3RvbUtleSksXHJcbiAgICAgICAgICAgIHdpZHRoOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLndpZHRoLCB0aGlzLmNvbHVtbk9wdGlvbnMud2lkdGgpLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkUHJlZGljYXRlKGNvbHVtbi5jc3NDbGFzcywgdGhpcy5jb2x1bW5PcHRpb25zLmNzc0NsYXNzKSB8fCBbXSxcclxuICAgICAgICAgICAgY3NzU3R5bGU6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4uY3NzU3R5bGUsIHRoaXMuY29sdW1uT3B0aW9ucy5jc3NTdHlsZSkgfHwgW10sXHJcbiAgICAgICAgICAgIHJlc2l6YWJsZTogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkUHJlZGljYXRlKGNvbHVtbi5yZXNpemFibGUsIHRoaXMuY29sdW1uT3B0aW9ucy5yZXNpemFibGUpLFxyXG4gICAgICAgICAgICB2ZXJ0aWNhbExpbmU6IGNvbHVtbi52ZXJ0aWNhbExpbmUsXHJcbiAgICAgICAgICAgIGV4Y2x1ZGVkOiAhdGhpcy5hbGxvd2VkS2V5TWFwW2tleV0sXHJcbiAgICAgICAgICAgIGZpbHRlcmFibGU6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4uZmlsdGVyYWJsZSwgdGhpcy5jb2x1bW5PcHRpb25zLmZpbHRlcmFibGUpLFxyXG4gICAgICAgICAgICBzb3J0YWJsZTogaXNNb2RlbFxyXG4gICAgICAgICAgICAgICAgPyBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLnNvcnRhYmxlLCB0aGlzLmNvbHVtbk9wdGlvbnMuc29ydGFibGUpXHJcbiAgICAgICAgICAgICAgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGNhbkJlQWRkRHJhZ2dhYmxlXHJcbiAgICAgICAgICAgICAgICA/IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4uZHJhZ2dhYmxlLCB0aGlzLmNvbHVtbk9wdGlvbnMuZHJhZ2dhYmxlKVxyXG4gICAgICAgICAgICAgICAgOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl19