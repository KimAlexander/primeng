/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./paginator";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "../common/shared";
import * as i5 from "@angular/cdk/bidi";
import * as i6 from "@angular/cdk/platform";
import * as i7 from "@angular/cdk/scrolling";
import * as i8 from "../dropdown/dropdown";
import * as i9 from "../dropdown/dropdown.ngfactory";
var PaginatorModuleNgFactory = i0.ɵcmf(i1.PaginatorModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(4608, i3.ɵangular_packages_forms_forms_o, i3.ɵangular_packages_forms_forms_o, []), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i4.SharedModule, i4.SharedModule, []), i0.ɵmpd(1073742336, i5.BidiModule, i5.BidiModule, []), i0.ɵmpd(1073742336, i6.PlatformModule, i6.PlatformModule, []), i0.ɵmpd(1073742336, i7.ScrollingModule, i7.ScrollingModule, []), i0.ɵmpd(1073742336, i8.DropdownModule, i8.DropdownModule, []), i0.ɵmpd(1073742336, i3.ɵangular_packages_forms_forms_d, i3.ɵangular_packages_forms_forms_d, []), i0.ɵmpd(1073742336, i3.FormsModule, i3.FormsModule, []), i0.ɵmpd(1073742336, i1.PaginatorModule, i1.PaginatorModule, [])]); });
export { PaginatorModuleNgFactory as PaginatorModuleNgFactory };
var styles_Paginator = [];
var RenderType_Paginator = i0.ɵcrt({ encapsulation: 2, styles: styles_Paginator, data: {} });
export { RenderType_Paginator as RenderType_Paginator };
function View_Paginator_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_Paginator_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "div", [["class", "ui-paginator-left-content"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_Paginator_3)), i0.ɵdid(2, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(3, { $implicit: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 3, 0, _co.paginatorState); var currVal_1 = _co.templateLeft; _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
function View_Paginator_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "ui-paginator-current"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.currentPageReport; _ck(_v, 1, 0, currVal_0); }); }
function View_Paginator_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, "a", [["class", "ui-paginator-page ui-paginator-element ui-state-default ui-corner-all"], ["tabindex", "0"]], null, [[null, "click"], [null, "keydown.enter"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onPageLinkClick($event, (_v.context.$implicit - 1)) !== false);
        ad = (pd_0 && ad);
    } if (("keydown.enter" === en)) {
        var pd_1 = (_co.onPageLinkClick($event, (_v.context.$implicit - 1)) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(3, { "ui-state-active": 0 }), (_l()(), i0.ɵted(4, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "ui-paginator-page ui-paginator-element ui-state-default ui-corner-all"; var currVal_1 = _ck(_v, 3, 0, ((_v.context.$implicit - 1) == _co.getPage())); _ck(_v, 2, 0, currVal_0, currVal_1); }, function (_ck, _v) { var currVal_2 = _v.context.$implicit; _ck(_v, 4, 0, currVal_2); }); }
function View_Paginator_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 6, "p-dropdown", [], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "onChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.rows = $event) !== false);
        ad = (pd_0 && ad);
    } if (("onChange" === en)) {
        var pd_1 = (_co.onRppChange($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, i9.View_Dropdown_0, i9.RenderType_Dropdown)), i0.ɵdid(1, 13877248, null, 1, i8.Dropdown, [i0.ElementRef, i0.Renderer2, i0.ChangeDetectorRef, i0.NgZone], { scrollHeight: [0, "scrollHeight"], appendTo: [1, "appendTo"], options: [2, "options"] }, { onChange: "onChange" }), i0.ɵqud(603979776, 1, { templates: 1 }), i0.ɵprd(1024, null, i3.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i8.Dropdown]), i0.ɵdid(4, 671744, null, 0, i3.NgModel, [[8, null], [8, null], [8, null], [6, i3.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i3.NgControl, null, [i3.NgModel]), i0.ɵdid(6, 16384, null, 0, i3.NgControlStatus, [[4, i3.NgControl]], null, null)], function (_ck, _v) { var _co = _v.component; var currVal_9 = _co.dropdownScrollHeight; var currVal_10 = _co.dropdownAppendTo; var currVal_11 = _co.rowsPerPageItems; _ck(_v, 1, 0, currVal_9, currVal_10, currVal_11); var currVal_12 = _co.rows; _ck(_v, 4, 0, currVal_12); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 1).filled; var currVal_1 = i0.ɵnov(_v, 1).focused; var currVal_2 = i0.ɵnov(_v, 6).ngClassUntouched; var currVal_3 = i0.ɵnov(_v, 6).ngClassTouched; var currVal_4 = i0.ɵnov(_v, 6).ngClassPristine; var currVal_5 = i0.ɵnov(_v, 6).ngClassDirty; var currVal_6 = i0.ɵnov(_v, 6).ngClassValid; var currVal_7 = i0.ɵnov(_v, 6).ngClassInvalid; var currVal_8 = i0.ɵnov(_v, 6).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
function View_Paginator_8(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_Paginator_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "div", [["class", "ui-paginator-right-content"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_Paginator_8)), i0.ɵdid(2, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(3, { $implicit: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 3, 0, _co.paginatorState); var currVal_1 = _co.templateRight; _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
function View_Paginator_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 35, "div", [], null, null, null, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵprd(512, null, i2.ɵNgStyleImpl, i2.ɵNgStyleR2Impl, [i0.ElementRef, i0.KeyValueDiffers, i0.Renderer2]), i0.ɵdid(4, 278528, null, 0, i2.NgStyle, [i2.ɵNgStyleImpl], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Paginator_2)), i0.ɵdid(6, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Paginator_4)), i0.ɵdid(8, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(9, 0, null, null, 4, "a", [["class", "ui-paginator-first ui-paginator-element ui-state-default ui-corner-all"]], [[1, "tabindex", 0], [8, "tabIndex", 0]], [[null, "click"], [null, "keydown.enter"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePageToFirst($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown.enter" === en)) {
        var pd_1 = (_co.changePageToFirst($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(11, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(12, { "ui-state-disabled": 0 }), (_l()(), i0.ɵeld(13, 0, null, null, 0, "span", [["class", "ui-paginator-icon pi pi-step-backward"]], null, null, null, null, null)), (_l()(), i0.ɵeld(14, 0, null, null, 4, "a", [["class", "ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all"], ["tabindex", "0"]], [[1, "tabindex", 0], [8, "tabIndex", 0]], [[null, "click"], [null, "keydown.enter"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePageToPrev($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown.enter" === en)) {
        var pd_1 = (_co.changePageToPrev($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(16, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(17, { "ui-state-disabled": 0 }), (_l()(), i0.ɵeld(18, 0, null, null, 0, "span", [["class", "ui-paginator-icon pi pi-caret-left"]], null, null, null, null, null)), (_l()(), i0.ɵeld(19, 0, null, null, 2, "span", [["class", "ui-paginator-pages"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Paginator_5)), i0.ɵdid(21, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵeld(22, 0, null, null, 4, "a", [["class", "ui-paginator-next ui-paginator-element ui-state-default ui-corner-all"]], [[1, "tabindex", 0], [8, "tabIndex", 0]], [[null, "click"], [null, "keydown.enter"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePageToNext($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown.enter" === en)) {
        var pd_1 = (_co.changePageToNext($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(24, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(25, { "ui-state-disabled": 0 }), (_l()(), i0.ɵeld(26, 0, null, null, 0, "span", [["class", "ui-paginator-icon pi pi-caret-right"]], null, null, null, null, null)), (_l()(), i0.ɵeld(27, 0, null, null, 4, "a", [["class", "ui-paginator-last ui-paginator-element ui-state-default ui-corner-all"]], [[1, "tabindex", 0], [8, "tabIndex", 0]], [[null, "click"], [null, "keydown.enter"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.changePageToLast($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown.enter" === en)) {
        var pd_1 = (_co.changePageToLast($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(29, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(30, { "ui-state-disabled": 0 }), (_l()(), i0.ɵeld(31, 0, null, null, 0, "span", [["class", "ui-paginator-icon pi pi-step-forward"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Paginator_6)), i0.ɵdid(33, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Paginator_7)), i0.ɵdid(35, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.styleClass; var currVal_1 = "ui-paginator ui-widget ui-widget-header ui-unselectable-text ui-helper-clearfix"; _ck(_v, 2, 0, currVal_0, currVal_1); var currVal_2 = _co.style; _ck(_v, 4, 0, currVal_2); var currVal_3 = _co.templateLeft; _ck(_v, 6, 0, currVal_3); var currVal_4 = _co.showCurrentPageReport; _ck(_v, 8, 0, currVal_4); var currVal_7 = "ui-paginator-first ui-paginator-element ui-state-default ui-corner-all"; var currVal_8 = _ck(_v, 12, 0, _co.isFirstPage()); _ck(_v, 11, 0, currVal_7, currVal_8); var currVal_11 = "ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all"; var currVal_12 = _ck(_v, 17, 0, _co.isFirstPage()); _ck(_v, 16, 0, currVal_11, currVal_12); var currVal_13 = _co.pageLinks; _ck(_v, 21, 0, currVal_13); var currVal_16 = "ui-paginator-next ui-paginator-element ui-state-default ui-corner-all"; var currVal_17 = _ck(_v, 25, 0, _co.isLastPage()); _ck(_v, 24, 0, currVal_16, currVal_17); var currVal_20 = "ui-paginator-last ui-paginator-element ui-state-default ui-corner-all"; var currVal_21 = _ck(_v, 30, 0, _co.isLastPage()); _ck(_v, 29, 0, currVal_20, currVal_21); var currVal_22 = _co.rowsPerPageOptions; _ck(_v, 33, 0, currVal_22); var currVal_23 = _co.templateRight; _ck(_v, 35, 0, currVal_23); }, function (_ck, _v) { var _co = _v.component; var currVal_5 = (_co.isFirstPage() ? null : "0"); var currVal_6 = (_co.isFirstPage() ? (0 - 1) : null); _ck(_v, 9, 0, currVal_5, currVal_6); var currVal_9 = (_co.isFirstPage() ? null : "0"); var currVal_10 = (_co.isFirstPage() ? (0 - 1) : null); _ck(_v, 14, 0, currVal_9, currVal_10); var currVal_14 = (_co.isLastPage() ? null : "0"); var currVal_15 = (_co.isLastPage() ? (0 - 1) : null); _ck(_v, 22, 0, currVal_14, currVal_15); var currVal_18 = (_co.isLastPage() ? null : "0"); var currVal_19 = (_co.isLastPage() ? (0 - 1) : null); _ck(_v, 27, 0, currVal_18, currVal_19); }); }
export function View_Paginator_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(16777216, null, null, 1, null, View_Paginator_1)), i0.ɵdid(1, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.alwaysShow ? true : (_co.pageLinks && (_co.pageLinks.length > 1))); _ck(_v, 1, 0, currVal_0); }, null); }
export function View_Paginator_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "p-paginator", [], null, null, null, View_Paginator_0, RenderType_Paginator)), i0.ɵdid(1, 114688, null, 0, i1.Paginator, [i0.ChangeDetectorRef], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var PaginatorNgFactory = i0.ɵccf("p-paginator", i1.Paginator, View_Paginator_Host_0, { pageLinkSize: "pageLinkSize", style: "style", styleClass: "styleClass", alwaysShow: "alwaysShow", templateLeft: "templateLeft", templateRight: "templateRight", dropdownAppendTo: "dropdownAppendTo", dropdownScrollHeight: "dropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: "showCurrentPageReport", totalRecords: "totalRecords", first: "first", rows: "rows", rowsPerPageOptions: "rowsPerPageOptions" }, { onPageChange: "onPageChange" }, []);
export { PaginatorNgFactory as PaginatorNgFactory };
//# sourceMappingURL=paginator.ngfactory.js.map