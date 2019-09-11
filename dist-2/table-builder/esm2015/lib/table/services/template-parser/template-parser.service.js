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
     * @param {?} allowedKeyMap
     * @param {?} templates
     * @return {?}
     */
    parse(allowedKeyMap, templates) {
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
            const needTemplateCheck = allowedKeyMap[key] || customKey !== false;
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
        const { key, th, td, emptyHead, headTitle, customKey } = column;
        /** @type {?} */
        const thTemplate = th || new TemplateHeadThDirective(null);
        /** @type {?} */
        const tdTemplate = td || new TemplateBodyTdDirective(null);
        /** @type {?} */
        const isEmptyHead = TemplateParserService.getValidHtmlBooleanAttribute(emptyHead);
        /** @type {?} */
        const thOptions = TemplateParserService.templateContext(key, thTemplate, this.columnOptions);
        this.compiledTemplates[key] = {
            key,
            th: Object.assign({}, thOptions, { headTitle, emptyHead: isEmptyHead, template: isEmptyHead ? null : thOptions.template }),
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtcGFyc2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1ydS9uZy10YWJsZS1idWlsZGVyLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3NlcnZpY2VzL3RlbXBsYXRlLXBhcnNlci90ZW1wbGF0ZS1wYXJzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWlCLGVBQWUsRUFBb0IsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUkzRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3ZELE1BQU0sT0FBTyxxQkFBcUI7SUFEbEM7UUFPVyxzQkFBaUIsR0FBMEIsRUFBRSxDQUFDO0lBMkd6RCxDQUFDOzs7Ozs7OztJQXpHVyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQVcsRUFBRSxJQUF3QixFQUFFLE9BQXNCO1FBQ3hGLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFdBQVcsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM5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OztJQUVQLHVDQUE2Qjs7SUFDN0IsNkNBQWlDOztJQUNqQyxpREFBcUM7O0lBQ3JDLHFEQUF5Qzs7SUFDekMsOENBQW9DOztJQUNwQyxrREFBcUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDb2x1bW5zU2NoZW1hLCBJbXBsaWNpdENvbnRleHQsIFRhYmxlQ2VsbE9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuZXh0ZXJuYWwnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZUhlYWRUaERpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcm93cy90ZW1wbGF0ZS1oZWFkLXRoLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFRlbXBsYXRlQm9keVRkRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yb3dzL3RlbXBsYXRlLWJvZHktdGQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTmd4Q29sdW1uQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uZ3gtY29sdW1uL25neC1jb2x1bW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgS2V5TWFwLCBRdWVyeUxpc3RSZWYgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RhYmxlLWJ1aWxkZXIuaW50ZXJuYWwnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZUNlbGxDb21tb24gfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jvd3MvdGVtcGxhdGUtY2VsbC5jb21tb24nO1xyXG5pbXBvcnQgeyBDb2x1bW5PcHRpb25zIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vY29sdW1uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBTY2hlbWFCdWlsZGVyIH0gZnJvbSAnLi9zY2hlbWEtYnVpbGRlci5jbGFzcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVBhcnNlclNlcnZpY2Uge1xyXG4gICAgcHVibGljIHNjaGVtYTogU2NoZW1hQnVpbGRlcjtcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZUtleXM6IFNldDxzdHJpbmc+O1xyXG4gICAgcHVibGljIGZ1bGxUZW1wbGF0ZUtleXM6IFNldDxzdHJpbmc+O1xyXG4gICAgcHVibGljIG92ZXJyaWRlVGVtcGxhdGVLZXlzOiBTZXQ8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBjb2x1bW5PcHRpb25zOiBDb2x1bW5PcHRpb25zO1xyXG4gICAgcHVibGljIGNvbXBpbGVkVGVtcGxhdGVzOiBLZXlNYXA8Q29sdW1uc1NjaGVtYT4gPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0ZW1wbGF0ZUNvbnRleHQoa2V5OiBzdHJpbmcsIGNlbGw6IFRlbXBsYXRlQ2VsbENvbW1vbiwgb3B0aW9uczogQ29sdW1uT3B0aW9ucyk6IFRhYmxlQ2VsbE9wdGlvbnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRleHRCb2xkOiBjZWxsLmJvbGQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBjZWxsLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICBjbGFzczogY2VsbC5jc3NDbGFzc2VzLFxyXG4gICAgICAgICAgICBzdHlsZTogY2VsbC5jc3NTdHlsZXMsXHJcbiAgICAgICAgICAgIHdpZHRoOiBjZWxsLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGNlbGwuaGVpZ2h0LFxyXG4gICAgICAgICAgICBvbkNsaWNrOiBjZWxsLm9uQ2xpY2ssXHJcbiAgICAgICAgICAgIGRibENsaWNrOiBjZWxsLmRibENsaWNrLFxyXG4gICAgICAgICAgICB1c2VEZWVwUGF0aDoga2V5LmluY2x1ZGVzKCcuJyksXHJcbiAgICAgICAgICAgIGNvbnRleHQ6IGNlbGwucm93ID8gSW1wbGljaXRDb250ZXh0LlJPVyA6IEltcGxpY2l0Q29udGV4dC5DRUxMLFxyXG4gICAgICAgICAgICBub3dyYXA6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShvcHRpb25zLm5vd3JhcCwgY2VsbC5ub3dyYXApXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRWYWxpZEh0bWxCb29sZWFuQXR0cmlidXRlKGF0dHJpYnV0ZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgYXR0cmlidXRlID09PSAnc3RyaW5nJyA/IHRydWUgOiBhdHRyaWJ1dGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VmFsaWRQcmVkaWNhdGU8VD4obGVmdFByZWRpY2F0ZTogVCwgcmlnaHRQcmVkaWNhdGU6IFQpOiBUIHtcclxuICAgICAgICByZXR1cm4gbGVmdFByZWRpY2F0ZSA9PT0gbnVsbCA/IHJpZ2h0UHJlZGljYXRlIDogbGVmdFByZWRpY2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9nZ2xlQ29sdW1uVmlzaWJpbGl0eShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NoZW1hLmNvbHVtbnMgPSB0aGlzLnNjaGVtYS5jb2x1bW5zLm1hcCgoY29sdW1uOiBDb2x1bW5zU2NoZW1hKSA9PlxyXG4gICAgICAgICAgICBrZXkgPT09IGNvbHVtbi5rZXlcclxuICAgICAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uY29sdW1uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaXNWaXNpYmxlOiAhY29sdW1uLmlzVmlzaWJsZVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA6IGNvbHVtblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxTY2hlbWEoY29sdW1uT3B0aW9uczogQ29sdW1uT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NoZW1hID0gdGhpcy5zY2hlbWEgfHwgbmV3IFNjaGVtYUJ1aWxkZXIoKTtcclxuICAgICAgICB0aGlzLnNjaGVtYS5jb2x1bW5zID0gW107XHJcbiAgICAgICAgdGhpcy5jb21waWxlZFRlbXBsYXRlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVLZXlzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgdGhpcy5vdmVycmlkZVRlbXBsYXRlS2V5cyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMuZnVsbFRlbXBsYXRlS2V5cyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMuY29sdW1uT3B0aW9ucyA9IGNvbHVtbk9wdGlvbnMgfHwgbmV3IENvbHVtbk9wdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFyc2UoYWxsb3dlZEtleU1hcDogS2V5TWFwPGJvb2xlYW4+LCB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdFJlZjxOZ3hDb2x1bW5Db21wb25lbnQ+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0ZW1wbGF0ZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGVtcGxhdGVzLmZvckVhY2goKGNvbHVtbjogTmd4Q29sdW1uQ29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsga2V5LCBjdXN0b21LZXksIGltcG9ydGFudFRlbXBsYXRlIH06IE5neENvbHVtbkNvbXBvbmVudCA9IGNvbHVtbjtcclxuICAgICAgICAgICAgY29uc3QgbmVlZFRlbXBsYXRlQ2hlY2s6IGJvb2xlYW4gPSBhbGxvd2VkS2V5TWFwW2tleV0gfHwgY3VzdG9tS2V5ICE9PSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZWVkVGVtcGxhdGVDaGVjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGltcG9ydGFudFRlbXBsYXRlICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVLZXlzLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZUNvbHVtbk1ldGFkYXRhKGNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVycmlkZVRlbXBsYXRlS2V5cy5hZGQoa2V5KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudGVtcGxhdGVLZXlzLmhhcyhrZXkpICYmICF0aGlzLm92ZXJyaWRlVGVtcGxhdGVLZXlzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21waWxlQ29sdW1uTWV0YWRhdGEoY29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlS2V5cy5hZGQoa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxUZW1wbGF0ZUtleXMuYWRkKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbXV0YXRlQ29sdW1uU2NoZW1hKGtleTogc3RyaW5nLCBwYXJ0aWFsU2NoZW1hOiBQYXJ0aWFsPENvbHVtbnNTY2hlbWE+KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgT2JqZWN0LmtleXMocGFydGlhbFNjaGVtYSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21waWxlZFRlbXBsYXRlc1trZXldW29wdGlvbl0gPSBwYXJ0aWFsU2NoZW1hW29wdGlvbl07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb21waWxlQ29sdW1uTWV0YWRhdGEoY29sdW1uOiBOZ3hDb2x1bW5Db21wb25lbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB7IGtleSwgdGgsIHRkLCBlbXB0eUhlYWQsIGhlYWRUaXRsZSwgY3VzdG9tS2V5IH06IE5neENvbHVtbkNvbXBvbmVudCA9IGNvbHVtbjtcclxuICAgICAgICBjb25zdCB0aFRlbXBsYXRlOiBUZW1wbGF0ZUNlbGxDb21tb24gPSB0aCB8fCBuZXcgVGVtcGxhdGVIZWFkVGhEaXJlY3RpdmUobnVsbCk7XHJcbiAgICAgICAgY29uc3QgdGRUZW1wbGF0ZTogVGVtcGxhdGVDZWxsQ29tbW9uID0gdGQgfHwgbmV3IFRlbXBsYXRlQm9keVRkRGlyZWN0aXZlKG51bGwpO1xyXG4gICAgICAgIGNvbnN0IGlzRW1wdHlIZWFkOiBib29sZWFuID0gVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkSHRtbEJvb2xlYW5BdHRyaWJ1dGUoZW1wdHlIZWFkKTtcclxuICAgICAgICBjb25zdCB0aE9wdGlvbnM6IFRhYmxlQ2VsbE9wdGlvbnMgPSBUZW1wbGF0ZVBhcnNlclNlcnZpY2UudGVtcGxhdGVDb250ZXh0KGtleSwgdGhUZW1wbGF0ZSwgdGhpcy5jb2x1bW5PcHRpb25zKTtcclxuICAgICAgICB0aGlzLmNvbXBpbGVkVGVtcGxhdGVzW2tleV0gPSB7XHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgdGg6IHtcclxuICAgICAgICAgICAgICAgIC4uLnRoT3B0aW9ucyxcclxuICAgICAgICAgICAgICAgIGhlYWRUaXRsZSxcclxuICAgICAgICAgICAgICAgIGVtcHR5SGVhZDogaXNFbXB0eUhlYWQsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogaXNFbXB0eUhlYWQgPyBudWxsIDogdGhPcHRpb25zLnRlbXBsYXRlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRkOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UudGVtcGxhdGVDb250ZXh0KGtleSwgdGRUZW1wbGF0ZSwgdGhpcy5jb2x1bW5PcHRpb25zKSxcclxuICAgICAgICAgICAgc3RpY2t5TGVmdDogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkSHRtbEJvb2xlYW5BdHRyaWJ1dGUoY29sdW1uLnN0aWNreUxlZnQpLFxyXG4gICAgICAgICAgICBzdGlja3lSaWdodDogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkSHRtbEJvb2xlYW5BdHRyaWJ1dGUoY29sdW1uLnN0aWNreVJpZ2h0KSxcclxuICAgICAgICAgICAgY3VzdG9tQ29sdW1uOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRIdG1sQm9vbGVhbkF0dHJpYnV0ZShjb2x1bW4uY3VzdG9tS2V5KSxcclxuICAgICAgICAgICAgd2lkdGg6IFRlbXBsYXRlUGFyc2VyU2VydmljZS5nZXRWYWxpZFByZWRpY2F0ZShjb2x1bW4ud2lkdGgsIHRoaXMuY29sdW1uT3B0aW9ucy53aWR0aCksXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLmNzc0NsYXNzLCB0aGlzLmNvbHVtbk9wdGlvbnMuY3NzQ2xhc3MpIHx8IFtdLFxyXG4gICAgICAgICAgICBjc3NTdHlsZTogVGVtcGxhdGVQYXJzZXJTZXJ2aWNlLmdldFZhbGlkUHJlZGljYXRlKGNvbHVtbi5jc3NTdHlsZSwgdGhpcy5jb2x1bW5PcHRpb25zLmNzc1N0eWxlKSB8fCBbXSxcclxuICAgICAgICAgICAgcmVzaXphYmxlOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLnJlc2l6YWJsZSwgdGhpcy5jb2x1bW5PcHRpb25zLnJlc2l6YWJsZSksXHJcbiAgICAgICAgICAgIHNvcnRhYmxlOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLnNvcnRhYmxlLCB0aGlzLmNvbHVtbk9wdGlvbnMuc29ydGFibGUpLFxyXG4gICAgICAgICAgICBmaWx0ZXJhYmxlOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLmZpbHRlcmFibGUsIHRoaXMuY29sdW1uT3B0aW9ucy5maWx0ZXJhYmxlKSxcclxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBUZW1wbGF0ZVBhcnNlclNlcnZpY2UuZ2V0VmFsaWRQcmVkaWNhdGUoY29sdW1uLmRyYWdnYWJsZSwgdGhpcy5jb2x1bW5PcHRpb25zLmRyYWdnYWJsZSksXHJcbiAgICAgICAgICAgIHZlcnRpY2FsTGluZTogY29sdW1uLnZlcnRpY2FsTGluZSxcclxuICAgICAgICAgICAgaXNNb2RlbDogY3VzdG9tS2V5ID09PSBmYWxzZSxcclxuICAgICAgICAgICAgaXNWaXNpYmxlOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXX0=