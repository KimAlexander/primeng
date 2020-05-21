/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./chips";
import * as i2 from "@angular/common";
import * as i3 from "../inputtext/inputtext";
import * as i4 from "../common/shared";
import * as i5 from "@angular/forms";
var ChipsModuleNgFactory = i0.ɵcmf(i1.ChipsModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i3.InputTextModule, i3.InputTextModule, []), i0.ɵmpd(1073742336, i4.SharedModule, i4.SharedModule, []), i0.ɵmpd(1073742336, i1.ChipsModule, i1.ChipsModule, [])]); });
export { ChipsModuleNgFactory as ChipsModuleNgFactory };
var styles_Chips = [];
var RenderType_Chips = i0.ɵcrt({ encapsulation: 2, styles: styles_Chips, data: {} });
export { RenderType_Chips as RenderType_Chips };
function View_Chips_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "span", [["class", "ui-chips-token-icon pi pi-fw pi-times"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeItem($event, _v.parent.context.index) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, null); }
function View_Chips_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [["class", "ui-chips-token-label"]], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.field ? _co.resolveFieldData(_v.parent.context.$implicit, _co.field) : _v.parent.context.$implicit); _ck(_v, 1, 0, currVal_0); }); }
function View_Chips_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_Chips_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [["token", 1]], null, 7, "li", [["class", "ui-chips-token ui-state-highlight ui-corner-all"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onItemClick($event, _v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Chips_2)), i0.ɵdid(2, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Chips_3)), i0.ɵdid(4, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_Chips_4)), i0.ɵdid(6, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(7, { $implicit: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.disabled; _ck(_v, 2, 0, currVal_0); var currVal_1 = !_co.itemTemplate; _ck(_v, 4, 0, currVal_1); var currVal_2 = _ck(_v, 7, 0, _v.context.$implicit); var currVal_3 = _co.itemTemplate; _ck(_v, 6, 0, currVal_2, currVal_3); }, null); }
export function View_Chips_0(_l) { return i0.ɵvid(0, [i0.ɵqud(671088640, 1, { inputViewChild: 0 }), (_l()(), i0.ɵeld(1, 0, null, null, 14, "div", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onClick($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(3, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵprd(512, null, i2.ɵNgStyleImpl, i2.ɵNgStyleR2Impl, [i0.ElementRef, i0.KeyValueDiffers, i0.Renderer2]), i0.ɵdid(5, 278528, null, 0, i2.NgStyle, [i2.ɵNgStyleImpl], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵeld(6, 0, null, null, 9, "ul", [], null, null, null, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(8, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { ngClass: [0, "ngClass"] }, null), i0.ɵpod(9, { "ui-inputtext ui-state-default ui-corner-all": 0, "ui-state-focus": 1, "ui-state-disabled": 2 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Chips_1)), i0.ɵdid(11, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵeld(12, 0, null, null, 3, "li", [["class", "ui-chips-input-token"]], null, null, null, null, null)), (_l()(), i0.ɵeld(13, 0, [[1, 0], ["inputtext", 1]], null, 2, "input", [["type", "text"]], [[1, "id", 0], [1, "placeholder", 0], [1, "tabindex", 0], [8, "disabled", 0], [8, "className", 0]], [[null, "keydown"], [null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keydown" === en)) {
        var pd_0 = (_co.onKeydown($event) !== false);
        ad = (pd_0 && ad);
    } if (("focus" === en)) {
        var pd_1 = (_co.onInputFocus($event) !== false);
        ad = (pd_1 && ad);
    } if (("blur" === en)) {
        var pd_2 = (_co.onInputBlur($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i2.ɵNgStyleImpl, i2.ɵNgStyleR2Impl, [i0.ElementRef, i0.KeyValueDiffers, i0.Renderer2]), i0.ɵdid(15, 278528, null, 0, i2.NgStyle, [i2.ɵNgStyleImpl], { ngStyle: [0, "ngStyle"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.styleClass; var currVal_1 = "ui-chips ui-widget"; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_2 = _co.style; _ck(_v, 5, 0, currVal_2); var currVal_3 = _ck(_v, 9, 0, true, _co.focus, _co.disabled); _ck(_v, 8, 0, currVal_3); var currVal_4 = _co.value; _ck(_v, 11, 0, currVal_4); var currVal_10 = _co.inputStyle; _ck(_v, 15, 0, currVal_10); }, function (_ck, _v) { var _co = _v.component; var currVal_5 = _co.inputId; var currVal_6 = ((_co.value && _co.value.length) ? null : _co.placeholder); var currVal_7 = _co.tabindex; var currVal_8 = _co.disabled; var currVal_9 = _co.inputStyleClass; _ck(_v, 13, 0, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
export function View_Chips_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "p-chips", [], null, null, null, View_Chips_0, RenderType_Chips)), i0.ɵprd(5120, null, i5.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i1.Chips]), i0.ɵdid(2, 1097728, null, 1, i1.Chips, [i0.ElementRef], null, null), i0.ɵqud(603979776, 1, { templates: 1 })], null, null); }
var ChipsNgFactory = i0.ɵccf("p-chips", i1.Chips, View_Chips_Host_0, { style: "style", styleClass: "styleClass", disabled: "disabled", field: "field", placeholder: "placeholder", max: "max", tabindex: "tabindex", inputId: "inputId", allowDuplicate: "allowDuplicate", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", addOnTab: "addOnTab", addOnBlur: "addOnBlur" }, { onAdd: "onAdd", onRemove: "onRemove", onFocus: "onFocus", onBlur: "onBlur", onChipClick: "onChipClick" }, []);
export { ChipsNgFactory as ChipsNgFactory };
//# sourceMappingURL=chips.ngfactory.js.map