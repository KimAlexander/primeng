/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./inputswitch";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
var InputSwitchModuleNgFactory = i0.ɵcmf(i1.InputSwitchModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i1.InputSwitchModule, i1.InputSwitchModule, [])]); });
export { InputSwitchModuleNgFactory as InputSwitchModuleNgFactory };
var styles_InputSwitch = [];
var RenderType_InputSwitch = i0.ɵcrt({ encapsulation: 2, styles: styles_InputSwitch, data: {} });
export { RenderType_InputSwitch as RenderType_InputSwitch };
export function View_InputSwitch_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 8, "div", [["role", "checkbox"]], [[1, "aria-checked", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onClick($event, i0.ɵnov(_v, 7)) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(3, { "ui-inputswitch ui-widget": 0, "ui-inputswitch-checked": 1, "ui-state-disabled": 2, "ui-inputswitch-readonly": 3, "ui-inputswitch-focus": 4 }), i0.ɵprd(512, null, i2.ɵNgStyleImpl, i2.ɵNgStyleR2Impl, [i0.ElementRef, i0.KeyValueDiffers, i0.Renderer2]), i0.ɵdid(5, 278528, null, 0, i2.NgStyle, [i2.ɵNgStyleImpl], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵeld(6, 0, null, null, 1, "div", [["class", "ui-helper-hidden-accessible"]], null, null, null, null, null)), (_l()(), i0.ɵeld(7, 0, [["cb", 1]], null, 0, "input", [["type", "checkbox"]], [[1, "id", 0], [1, "name", 0], [1, "tabindex", 0], [8, "checked", 0], [8, "disabled", 0]], [[null, "change"], [null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.onInputChange($event) !== false);
        ad = (pd_0 && ad);
    } if (("focus" === en)) {
        var pd_1 = (_co.onFocus($event) !== false);
        ad = (pd_1 && ad);
    } if (("blur" === en)) {
        var pd_2 = (_co.onBlur($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(8, 0, null, null, 0, "span", [["class", "ui-inputswitch-slider"]], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.styleClass; var currVal_2 = _ck(_v, 3, 0, true, _co.checked, _co.disabled, _co.readonly, _co.focused); _ck(_v, 2, 0, currVal_1, currVal_2); var currVal_3 = _co.style; _ck(_v, 5, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.checked; _ck(_v, 0, 0, currVal_0); var currVal_4 = _co.inputId; var currVal_5 = _co.name; var currVal_6 = _co.tabindex; var currVal_7 = _co.checked; var currVal_8 = _co.disabled; _ck(_v, 7, 0, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
export function View_InputSwitch_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "p-inputSwitch", [], null, null, null, View_InputSwitch_0, RenderType_InputSwitch)), i0.ɵprd(5120, null, i3.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i1.InputSwitch]), i0.ɵdid(2, 49152, null, 0, i1.InputSwitch, [i0.ChangeDetectorRef], null, null)], null, null); }
var InputSwitchNgFactory = i0.ɵccf("p-inputSwitch", i1.InputSwitch, View_InputSwitch_Host_0, { style: "style", styleClass: "styleClass", tabindex: "tabindex", inputId: "inputId", name: "name", disabled: "disabled", readonly: "readonly" }, { onChange: "onChange" }, []);
export { InputSwitchNgFactory as InputSwitchNgFactory };
//# sourceMappingURL=inputswitch.ngfactory.js.map