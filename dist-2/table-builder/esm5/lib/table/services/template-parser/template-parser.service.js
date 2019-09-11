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
     * @param {?} allowedKeyMap
     * @param {?} templates
     * @return {?}
     */
    TemplateParserService.prototype.parse = /**
     * @param {?} allowedKeyMap
     * @param {?} templates
     * @return {?}
     */
    function (allowedKeyMap, templates) {
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
            var needTemplateCheck = allowedKeyMap[key] || customKey !== false;
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
        var key = column.key, th = column.th, td = column.td, emptyHead = column.emptyHead, headTitle = column.headTitle, customKey = column.customKey;
        /** @type {?} */
        var thTemplate = th || new TemplateHeadThDirective(null);
        /** @type {?} */
        var tdTemplate = td || new TemplateBodyTdDirective(null);
        /** @type {?} */
        var isEmptyHead = TemplateParserService.getValidHtmlBooleanAttribute(emptyHead);
        /** @type {?} */
        var thOptions = TemplateParserService.templateContext(key, thTemplate, this.columnOptions);
        this.compiledTemplates[key] = {
            key: key,
            th: tslib_1.__assign({}, thOptions, { headTitle: headTitle, emptyHead: isEmptyHead, template: isEmptyHead ? null : thOptions.template }),
            td: TemplateParserService.templateContext(key, tdTemplate, this.columnOptions),
            stickyLeft: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyLeft),
            stickyRight: TemplateParserService.getValidHtmlBooleanAttribute(column.stickyRight),
            customColumn: TemplateParserService.getValidHtmlBooleanAttribute(column.customKey),
            width: TemplateParserService.getValidPredicate(column.width, this.columnOptions.width),
            cssClass: TemplateParserService.getValidPredicate(column.cssClass, this.columnOptions.cssClass) || [],
            cssStyle: TemplateParserService.getValidPredicate(column.cssStyle, this.columnOptions.cssStyle) || [],
            resizable: TemplateParserService.getValidPredicate(column.resizable, this.columnOptions.resizable),
            sortable: TemplateParserService.getValidPredicate(column.sortable, this.columnOptions.sortable),
            filterable: TemplateParserService.getValidPredicate(column.filterable, this.columnOptions.filterable),
            draggable: TemplateParserService.getValidPredicate(column.draggable, this.columnOptions.draggable),
            verticalLine: column.verticalLine,
            isModel: customKey === false,
            isVisible: true
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtcGFyc2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3RlbXBsYXRlLXBhcnNlci90ZW1wbGF0ZS1wYXJzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFpQixlQUFlLEVBQW9CLE1BQU0seUNBQXlDLENBQUM7QUFDM0csT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFJM0YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RDtJQUFBO1FBT1csc0JBQWlCLEdBQTBCLEVBQUUsQ0FBQztJQTJHekQsQ0FBQzs7Ozs7Ozs7SUF6R2tCLHFDQUFlOzs7Ozs7O0lBQTlCLFVBQStCLEdBQVcsRUFBRSxJQUF3QixFQUFFLE9BQXNCO1FBQ3hGLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFdBQVcsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM5QixPQUFPLEVBQUUs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LE9BQU8sRUFBRSxTQUFTLEtBQUssS0FBSztZQUM1QixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDO0lBQ04sQ0FBQzs7Z0JBakhKLFVBQVU7O0lBa0hYLDRCQUFDO0NBQUEsQUFsSEQsSUFrSEM7U0FqSFkscUJBQXFCOzs7SUFDOUIsdUNBQTZCOztJQUM3Qiw2Q0FBaUM7O0lBQ2pDLGlEQUFxQzs7SUFDckMscURBQXlDOztJQUN6Qyw4Q0FBb0M7O0lBQ3BDLGtEQUFxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbHVtbnNTY2hlbWEsIEltcGxpY2l0Q29udGV4dCwgVGFibGVDZWxsT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5leHRlcm5hbCc7XHJcbmltcG9ydCB7IFRlbXBsYXRlSGVhZFRoRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yb3dzL3RlbXBsYXRlLWhlYWQtdGguZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgVGVtcGxhdGVCb2R5VGREaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jvd3MvdGVtcGxhdGUtYm9keS10ZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBOZ3hDb2x1bW5Db21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL25neC1jb2x1bW4vbmd4LWNvbHVtbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBLZXlNYXAsIFF1ZXJ5TGlzdFJlZiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdGFibGUtYnVpbGRlci5pbnRlcm5hbCc7XHJcbmltcG9ydCB7IFRlbXBsYXRlQ2VsbENvbW1vbiB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1jZWxsLmNvbW1vbic7XHJcbmltcG9ydCB7IENvbHVtbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9jb2x1bW4tb3B0aW9ucyc7XHJcbmltcG9ydCB7IFNjaGVtYUJ1aWxkZXIgfSBmcm9tICcuL3NjaGVtYS1idWlsZGVyLmNsYXNzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlUGFyc2VyU2VydmljZSB7XHJcbiAgICBwdWJsaWMgc2NoZW1hOiBTY2hlbWFCdWlsZGVyO1xyXG4gICAgcHVibGljIHRlbXBsYXRlS2V5czogU2V0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgZnVsbFRlbXBsYXRlS2V5czogU2V0PHN0cmluZz47XHJcbiAgICBwdWJsaWMgb3ZlcnJpZGVUZW1wbGF0ZUtleXM6IFNldDxzdHJpbmc+O1xyXG4gICAgcHVibGljIGNvbHVtbk9wdGlvbnM6IENvbHVtbk9wdGlvbnM7XHJcbiAgICBwdWJsaWMgY29tcGlsZWRUZW1wbGF0ZXM6IEtleU1hcDxDb2x1bW5zU2NoZW1hPiA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHRlbXBsYXRlQ29udGV4dChrZXk6IHN0cmluZywgY2VsbDogVGVtcGxhdGVDZWxsQ29tbW9uLCBvcHRpb25zOiBDb2x1bW5PcHRpb25zKTogVGFibGVDZWxsT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGV4dEJvbGQ6IGNlbGwuYm9sZCxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IGNlbGwudGVtcGxhdGUsXHJcbiAgICAgICAgICAgIGNsYXNzOiBjZWxsLmNzc0NsYXNzZXMsXHJcbiAgICAgICAgICAgIHN0eWxlOiBjZWxsLmNzc1N0eWxlcyxcclxuICAgICAgICAgICAgd2lkdGg6IGNlbGwud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogY2VsbC5oZWlnaHQsXHJcbiAgICAgICAgICAgIG9uQ2xpY2s6IGNlbGwub25DbGljayxcclxuICAgICAgICAgICAgZGJsQ2xpY2s6IGNlbGwuZGJsQ2xpY2ssXHJcbiAgICAgICAgICAgIHVzZURlZXBQYXRoOiBrZXkuaW5jbHVkZXMoJy4nKSxcclxuICAgICAgICAgICAgY29udGV4dDogY2VsbC5yb3cgPyBJbXBsaWNpdENvbnRleHQuUk9XIDogSW1wbGljaXRDb250ZXh0LkNFTEwsXHJcbiAgICAgICAgICAgIG5vd3JhcDogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkUHJlZGljYXRlKG9wdGlvbnMubm93cmFwLCBjZWxsLm5vd3JhcClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFZhbGlkSHRtbEJvb2xlYW5BdHRyaWJ1dGUoYXR0cmlidXRlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBhdHRyaWJ1dGUgPT09ICdzdHJpbmcnID8gdHJ1ZSA6IGF0dHJpYnV0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRWYWxpZFByZWRpY2F0ZTxUPihsZWZ0UHJlZGljYXRlOiBULCByaWdodFByZWRpY2F0ZTogVCk6IFQge1xyXG4gICAgICAgIHJldHVybiBsZWZ0UHJlZGljYXRlID09PSBudWxsID8gcmlnaHRQcmVkaWNhdGUgOiBsZWZ0UHJlZGljYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGVDb2x1bW5WaXNpYmlsaXR5KGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY2hlbWEuY29sdW1ucyA9IHRoaXMuc2NoZW1hLmNvbHVtbnMubWFwKChjb2x1bW46IENvbHVtbnNTY2hlbWEpID0+XHJcbiAgICAgICAgICAgIGtleSA9PT0gY29sdW1uLmtleVxyXG4gICAgICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAuLi5jb2x1bW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICBpc1Zpc2libGU6ICFjb2x1bW4uaXNWaXNpYmxlXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDogY29sdW1uXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbFNjaGVtYShjb2x1bW5PcHRpb25zOiBDb2x1bW5PcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY2hlbWEgPSB0aGlzLnNjaGVtYSB8fCBuZXcgU2NoZW1hQnVpbGRlcigpO1xyXG4gICAgICAgIHRoaXMuc2NoZW1hLmNvbHVtbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbXBpbGVkVGVtcGxhdGVzID0ge307XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUtleXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgICAgICB0aGlzLm92ZXJyaWRlVGVtcGxhdGVLZXlzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgdGhpcy5mdWxsVGVtcGxhdGVLZXlzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5PcHRpb25zID0gY29sdW1uT3B0aW9ucyB8fCBuZXcgQ29sdW1uT3B0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJzZShhbGxvd2VkS2V5TWFwOiBLZXlNYXA8Ym9vbGVhbj4sIHRlbXBsYXRlczogUXVlcnlMaXN0UmVmPE5neENvbHVtbkNvbXBvbmVudD4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRlbXBsYXRlcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZW1wbGF0ZXMuZm9yRWFjaCgoY29sdW1uOiBOZ3hDb2x1bW5Db21wb25lbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyBrZXksIGN1c3RvbUtleSwgaW1wb3J0YW50VGVtcGxhdGUgfTogTmd4Q29sdW1uQ29tcG9uZW50ID0gY29sdW1uO1xyXG4gICAgICAgICAgICBjb25zdCBuZWVkVGVtcGxhdGVDaGVjazogYm9vbGVhbiA9IGFsbG93ZWRLZXlNYXBba2V5XSB8fCBjdXN0b21LZXkgIT09IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5lZWRUZW1wbGF0ZUNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1wb3J0YW50VGVtcGxhdGUgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUtleXMuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21waWxlQ29sdW1uTWV0YWRhdGEoY29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJyaWRlVGVtcGxhdGVLZXlzLmFkZChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy50ZW1wbGF0ZUtleXMuaGFzKGtleSkgJiYgIXRoaXMub3ZlcnJpZGVUZW1wbGF0ZUtleXMuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBpbGVDb2x1bW5NZXRhZGF0YShjb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVLZXlzLmFkZChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbFRlbXBsYXRlS2V5cy5hZGQoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtdXRhdGVDb2x1bW5TY2hlbWEoa2V5OiBzdHJpbmcsIHBhcnRpYWxTY2hlbWE6IFBhcnRpYWw8Q29sdW1uc1NjaGVtYT4pOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhwYXJ0aWFsU2NoZW1hKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVkVGVtcGxhdGVzW2tleV1bb3B0aW9uXSA9IHBhcnRpYWxTY2hlbWFbb3B0aW9uXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbXBpbGVDb2x1bW5NZXRhZGF0YShjb2x1bW46IE5neENvbHVtbkNvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHsga2V5LCB0aCwgdGQsIGVtcHR5SGVhZCwgaGVhZFRpdGxlLCBjdXN0b21LZXkgfTogTmd4Q29sdW1uQ29tcG9uZW50ID0gY29sdW1uO1xyXG4gICAgICAgIGNvbnN0IHRoVGVtcGxhdGU6IFRlbXBsYXRlQ2VsbENvbW1vbiA9IHRoIHx8IG5ldyBUZW1wbGF0ZUhlYWRUaERpcmVjdGl2ZShudWxsKTtcclxuICAgICAgICBjb25zdCB0ZFRlbXBsYXRlOiBUZW1wbGF0ZUNlbGxDb21tb24gPSB0ZCB8fCBuZXcgVGVtcGxhdGVCb2R5VGREaXJlY3RpdmUobnVsbCk7XHJcbiAgICAgICAgY29uc3QgaXNFbXB0eUhlYWQ6IGJvb2xlYW4gPSBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRIdG1sQm9vbGVhbkF0dHJpYnV0ZShlbXB0eUhlYWQpO1xyXG4gICAgICAgIGNvbnN0IHRoT3B0aW9uczogVGFibGVDZWxsT3B0aW9ucyA9IFRlbXBsYXRlUGFyc2VyU2VydmljZS50ZW1wbGF0ZUNvbnRleHQoa2V5LCB0aFRlbXBsYXRlLCB0aGlzLmNvbHVtbk9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuY29tcGlsZWRUZW1wbGF0ZXNba2V5XSA9IHtcclxuICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICB0aDoge1xyXG4gICAgICAgICAgICAgICAgLi4udGhPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgaGVhZFRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlIZWFkOiBpc0VtcHR5SGVhZCxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBpc0VtcHR5SGVhZCA/IG51bGwgOiB0aE9wdGlvbnMudGVtcGxhdGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGQ6IFRlbXBsYXRlUGFyc2VyU2VydmljZS50ZW1wbGF0ZUNvbnRleHQoa2V5LCB0ZFRlbXBsYXRlLCB0aGlzLmNvbHVtbk9wdGlvbnMpLFxyXG4gICAgICAgICAgICBzdGlja3lMZWZ0OiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRIdG1sQm9vbGVhbkF0dHJpYnV0ZShjb2x1bW4uc3RpY2t5TGVmdCksXHJcbiAgICAgICAgICAgIHN0aWNreVJpZ2h0OiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRIdG1sQm9vbGVhbkF0dHJpYnV0ZShjb2x1bW4uc3RpY2t5UmlnaHQpLFxyXG4gICAgICAgICAgICBjdXN0b21Db2x1bW46IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZEh0bWxCb29sZWFuQXR0cmlidXRlKGNvbHVtbi5jdXN0b21LZXkpLFxyXG4gICAgICAgICAgICB3aWR0aDogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkUHJlZGljYXRlKGNvbHVtbi53aWR0aCwgdGhpcy5jb2x1bW5PcHRpb25zLndpZHRoKSxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4uY3NzQ2xhc3MsIHRoaXMuY29sdW1uT3B0aW9ucy5jc3NDbGFzcykgfHwgW10sXHJcbiAgICAgICAgICAgIGNzc1N0eWxlOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLmNzc1N0eWxlLCB0aGlzLmNvbHVtbk9wdGlvbnMuY3NzU3R5bGUpIHx8IFtdLFxyXG4gICAgICAgICAgICByZXNpemFibGU6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4ucmVzaXphYmxlLCB0aGlzLmNvbHVtbk9wdGlvbnMucmVzaXphYmxlKSxcclxuICAgICAgICAgICAgc29ydGFibGU6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4uc29ydGFibGUsIHRoaXMuY29sdW1uT3B0aW9ucy5zb3J0YWJsZSksXHJcbiAgICAgICAgICAgIGZpbHRlcmFibGU6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4uZmlsdGVyYWJsZSwgdGhpcy5jb2x1bW5PcHRpb25zLmZpbHRlcmFibGUpLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4uZHJhZ2dhYmxlLCB0aGlzLmNvbHVtbk9wdGlvbnMuZHJhZ2dhYmxlKSxcclxuICAgICAgICAgICAgdmVydGljYWxMaW5lOiBjb2x1bW4udmVydGljYWxMaW5lLFxyXG4gICAgICAgICAgICBpc01vZGVsOiBjdXN0b21LZXkgPT09IGZhbHNlLFxyXG4gICAgICAgICAgICBpc1Zpc2libGU6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==