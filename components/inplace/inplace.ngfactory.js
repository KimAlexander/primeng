/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./inplace";
import * as i2 from "@angular/common";
import * as i3 from "../button/button";
var InplaceModuleNgFactory = i0.ɵcmf(i1.InplaceModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i3.ButtonModule, i3.ButtonModule, []), i0.ɵmpd(1073742336, i1.InplaceModule, i1.InplaceModule, [])]); });
export { InplaceModuleNgFactory as InplaceModuleNgFactory };
var styles_InplaceDisplay = [];
var RenderType_InplaceDisplay = i0.ɵcrt({ encapsulation: 2, styles: styles_InplaceDisplay, data: {} });
export { RenderType_InplaceDisplay as RenderType_InplaceDisplay };
export function View_InplaceDisplay_0(_l) { return i0.ɵvid(0, [i0.ɵncd(null, 0)], null, null); }
export function View_InplaceDisplay_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "p-inplaceDisplay", [], null, null, null, View_InplaceDisplay_0, RenderType_InplaceDisplay)), i0.ɵdid(1, 49152, null, 0, i1.InplaceDisplay, [], null, null)], null, null); }
var InplaceDisplayNgFactory = i0.ɵccf("p-inplaceDisplay", i1.InplaceDisplay, View_InplaceDisplay_Host_0, {}, {}, ["*"]);
export { InplaceDisplayNgFactory as InplaceDisplayNgFactory };
var styles_InplaceContent = [];
var RenderType_InplaceContent = i0.ɵcrt({ encapsulation: 2, styles: styles_InplaceContent, data: {} });
export { RenderType_InplaceContent as RenderType_InplaceContent };
export function View_InplaceContent_0(_l) { return i0.ɵvid(0, [i0.ɵncd(null, 0)], null, null); }
export function View_InplaceContent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "p-inplaceContent", [], null, null, null, View_InplaceContent_0, RenderType_InplaceContent)), i0.ɵdid(1, 49152, null, 0, i1.InplaceContent, [], null, null)], null, null); }
var InplaceContentNgFactory = i0.ɵccf("p-inplaceContent", i1.InplaceContent, View_InplaceContent_Host_0, {}, {}, ["*"]);
export { InplaceContentNgFactory as InplaceContentNgFactory };
var styles_Inplace = [];
var RenderType_Inplace = i0.ɵcrt({ encapsulation: 2, styles: styles_Inplace, data: {} });
export { RenderType_Inplace as RenderType_Inplace };
function View_Inplace_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, "div", [["class", "ui-inplace-display"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.activate($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(3, { "ui-state-disabled": 0 }), i0.ɵncd(null, 0)], function (_ck, _v) { var _co = _v.component; var currVal_0 = "ui-inplace-display"; var currVal_1 = _ck(_v, 3, 0, _co.disabled); _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
function View_Inplace_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "button", [["icon", "pi pi-times"], ["pButton", ""], ["type", "button"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.deactivate($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 4341760, null, 0, i3.ButtonDirective, [i0.ElementRef], { icon: [0, "icon"] }, null)], function (_ck, _v) { var currVal_0 = "pi pi-times"; _ck(_v, 1, 0, currVal_0); }, null); }
function View_Inplace_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "div", [["class", "ui-inplace-content"]], null, null, null, null, null)), i0.ɵncd(null, 1), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Inplace_3)), i0.ɵdid(3, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.closable; _ck(_v, 3, 0, currVal_0); }, null); }
export function View_Inplace_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 9, "div", [], null, null, null, null, null)), i0.ɵprd(512, null, i2.ɵNgClassImpl, i2.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i2.NgClass, [i2.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(3, { "ui-inplace ui-widget": 0, "ui-inplace-closable": 1 }), i0.ɵprd(512, null, i2.ɵNgStyleImpl, i2.ɵNgStyleR2Impl, [i0.ElementRef, i0.KeyValueDiffers, i0.Renderer2]), i0.ɵdid(5, 278528, null, 0, i2.NgStyle, [i2.ɵNgStyleImpl], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Inplace_1)), i0.ɵdid(7, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Inplace_2)), i0.ɵdid(9, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.styleClass; var currVal_1 = _ck(_v, 3, 0, true, _co.closable); _ck(_v, 2, 0, currVal_0, currVal_1); var currVal_2 = _co.style; _ck(_v, 5, 0, currVal_2); var currVal_3 = !_co.active; _ck(_v, 7, 0, currVal_3); var currVal_4 = _co.active; _ck(_v, 9, 0, currVal_4); }, null); }
export function View_Inplace_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "p-inplace", [], null, null, null, View_Inplace_0, RenderType_Inplace)), i0.ɵdid(1, 49152, null, 0, i1.Inplace, [], null, null)], null, null); }
var InplaceNgFactory = i0.ɵccf("p-inplace", i1.Inplace, View_Inplace_Host_0, { active: "active", closable: "closable", disabled: "disabled", style: "style", styleClass: "styleClass" }, { onActivate: "onActivate", onDeactivate: "onDeactivate" }, ["[pInplaceDisplay]", "[pInplaceContent]"]);
export { InplaceNgFactory as InplaceNgFactory };
//# sourceMappingURL=inplace.ngfactory.js.map