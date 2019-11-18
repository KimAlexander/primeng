/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./splitbutton";
import * as i2 from "../../../../node_modules/@angular/router/router.ngfactory";
import * as i3 from "@angular/common";
import * as i4 from "../button/button";
import * as i5 from "@angular/router";
var SplitButtonModuleNgFactory = i0.ɵcmf(i1.SplitButtonModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i2.ɵangular_packages_router_router_lNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i3.NgLocalization, i3.NgLocaleLocalization, [i0.LOCALE_ID, [2, i3.ɵangular_packages_common_common_a]]), i0.ɵmpd(1073742336, i3.CommonModule, i3.CommonModule, []), i0.ɵmpd(1073742336, i4.ButtonModule, i4.ButtonModule, []), i0.ɵmpd(1073742336, i5.RouterModule, i5.RouterModule, [[2, i5.ɵangular_packages_router_router_a], [2, i5.Router]]), i0.ɵmpd(1073742336, i1.SplitButtonModule, i1.SplitButtonModule, [])]); });
export { SplitButtonModuleNgFactory as SplitButtonModuleNgFactory };
var styles_SplitButton = [];
var RenderType_SplitButton = i0.ɵcrt({ encapsulation: 2, styles: styles_SplitButton, data: { "animation": [{ type: 7, name: "overlayAnimation", definitions: [{ type: 0, name: "void", styles: { type: 6, styles: { transform: "translateY(5%)", opacity: 0 }, offset: null }, options: undefined }, { type: 0, name: "visible", styles: { type: 6, styles: { transform: "translateY(0)", opacity: 1 }, offset: null }, options: undefined }, { type: 1, expr: "void => visible", animation: { type: 4, styles: null, timings: "{{showTransitionParams}}" }, options: null }, { type: 1, expr: "visible => void", animation: { type: 4, styles: null, timings: "{{hideTransitionParams}}" }, options: null }], options: {} }] } });
export { RenderType_SplitButton as RenderType_SplitButton };
function View_SplitButton_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "span", [], null, null, null, null, null)), i0.ɵprd(512, null, i3.ɵNgClassImpl, i3.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i3.NgClass, [i3.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.parent.parent.context.$implicit.icon; var currVal_1 = "ui-menuitem-icon"; _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
function View_SplitButton_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "a", [["class", "ui-menuitem-link ui-corner-all"]], [[1, "href", 4], [1, "target", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.itemClick($event, _v.parent.parent.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i3.ɵNgClassImpl, i3.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i3.NgClass, [i3.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(3, { "ui-state-disabled": 0 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SplitButton_5)), i0.ɵdid(5, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(6, 0, null, null, 1, "span", [["class", "ui-menuitem-text"]], null, null, null, null, null)), (_l()(), i0.ɵted(7, null, ["", ""]))], function (_ck, _v) { var currVal_2 = "ui-menuitem-link ui-corner-all"; var currVal_3 = _ck(_v, 3, 0, _v.parent.parent.context.$implicit.disabled); _ck(_v, 2, 0, currVal_2, currVal_3); var currVal_4 = _v.parent.parent.context.$implicit.icon; _ck(_v, 5, 0, currVal_4); }, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.url; var currVal_1 = _v.parent.parent.context.$implicit.target; _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_5 = _v.parent.parent.context.$implicit.label; _ck(_v, 7, 0, currVal_5); }); }
function View_SplitButton_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "span", [], null, null, null, null, null)), i0.ɵprd(512, null, i3.ɵNgClassImpl, i3.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i3.NgClass, [i3.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null)], function (_ck, _v) { var currVal_0 = _v.parent.parent.parent.context.$implicit.icon; var currVal_1 = "ui-menuitem-icon"; _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
function View_SplitButton_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 8, "a", [["class", "ui-menuitem-link ui-corner-all"]], [[1, "target", 0], [1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (i0.ɵnov(_v, 4).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.itemClick($event, _v.parent.parent.context.$implicit) !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i3.ɵNgClassImpl, i3.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i3.NgClass, [i3.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(3, { "ui-state-disabled": 0 }), i0.ɵdid(4, 671744, null, 0, i5.RouterLinkWithHref, [i5.Router, i5.ActivatedRoute, i3.LocationStrategy], { queryParams: [0, "queryParams"], routerLink: [1, "routerLink"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SplitButton_7)), i0.ɵdid(6, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(7, 0, null, null, 1, "span", [["class", "ui-menuitem-text"]], null, null, null, null, null)), (_l()(), i0.ɵted(8, null, ["", ""]))], function (_ck, _v) { var currVal_3 = "ui-menuitem-link ui-corner-all"; var currVal_4 = _ck(_v, 3, 0, _v.parent.parent.context.$implicit.disabled); _ck(_v, 2, 0, currVal_3, currVal_4); var currVal_5 = _v.parent.parent.context.$implicit.queryParams; var currVal_6 = _v.parent.parent.context.$implicit.routerLink; _ck(_v, 4, 0, currVal_5, currVal_6); var currVal_7 = _v.parent.parent.context.$implicit.icon; _ck(_v, 6, 0, currVal_7); }, function (_ck, _v) { var currVal_0 = _v.parent.parent.context.$implicit.target; var currVal_1 = i0.ɵnov(_v, 4).target; var currVal_2 = i0.ɵnov(_v, 4).href; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); var currVal_8 = _v.parent.parent.context.$implicit.label; _ck(_v, 8, 0, currVal_8); }); }
function View_SplitButton_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, "li", [["class", "ui-menuitem ui-widget ui-corner-all"], ["role", "menuitem"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SplitButton_4)), i0.ɵdid(2, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SplitButton_6)), i0.ɵdid(4, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var currVal_0 = !_v.parent.context.$implicit.routerLink; _ck(_v, 2, 0, currVal_0); var currVal_1 = _v.parent.context.$implicit.routerLink; _ck(_v, 4, 0, currVal_1); }, null); }
function View_SplitButton_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(16777216, null, null, 1, null, View_SplitButton_3)), i0.ɵdid(1, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(0, null, null, 0))], function (_ck, _v) { var currVal_0 = (_v.context.$implicit.visible !== false); _ck(_v, 1, 0, currVal_0); }, null); }
function View_SplitButton_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [["overlay", 1]], null, 9, "div", [], [[24, "@overlayAnimation", 0]], [[null, "@overlayAnimation.start"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("@overlayAnimation.start" === en)) {
        var pd_0 = (_co.onOverlayAnimationStart($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵprd(512, null, i3.ɵNgClassImpl, i3.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(2, 278528, null, 0, i3.NgClass, [i3.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵprd(512, null, i3.ɵNgStyleImpl, i3.ɵNgStyleR2Impl, [i0.ElementRef, i0.KeyValueDiffers, i0.Renderer2]), i0.ɵdid(4, 278528, null, 0, i3.NgStyle, [i3.ɵNgStyleImpl], { ngStyle: [0, "ngStyle"] }, null), i0.ɵpod(5, { showTransitionParams: 0, hideTransitionParams: 1 }), i0.ɵpod(6, { value: 0, params: 1 }), (_l()(), i0.ɵeld(7, 0, null, null, 2, "ul", [["class", "ui-menu-list ui-helper-reset"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SplitButton_2)), i0.ɵdid(9, 278528, null, 0, i3.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.menuStyleClass; var currVal_2 = "ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow"; _ck(_v, 2, 0, currVal_1, currVal_2); var currVal_3 = _co.menuStyle; _ck(_v, 4, 0, currVal_3); var currVal_4 = _co.model; _ck(_v, 9, 0, currVal_4); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 6, 0, "visible", _ck(_v, 5, 0, _co.showTransitionOptions, _co.hideTransitionOptions)); _ck(_v, 0, 0, currVal_0); }); }
export function View_SplitButton_0(_l) { return i0.ɵvid(0, [i0.ɵqud(671088640, 1, { containerViewChild: 0 }), i0.ɵqud(671088640, 2, { buttonViewChild: 0 }), (_l()(), i0.ɵeld(2, 0, [[1, 0], ["container", 1]], null, 11, "div", [], null, null, null, null, null)), i0.ɵprd(512, null, i3.ɵNgClassImpl, i3.ɵNgClassR2Impl, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2]), i0.ɵdid(4, 278528, null, 0, i3.NgClass, [i3.ɵNgClassImpl], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(5, { "ui-splitbutton ui-buttonset ui-widget": 0, "ui-state-disabled": 1 }), i0.ɵprd(512, null, i3.ɵNgStyleImpl, i3.ɵNgStyleR2Impl, [i0.ElementRef, i0.KeyValueDiffers, i0.Renderer2]), i0.ɵdid(7, 278528, null, 0, i3.NgStyle, [i3.ɵNgStyleImpl], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵeld(8, 0, [[2, 0], ["defaultbtn", 1]], null, 1, "button", [["pButton", ""], ["type", "button"]], [[8, "disabled", 0], [1, "tabindex", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onDefaultButtonClick($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(9, 4341760, null, 0, i4.ButtonDirective, [i0.ElementRef], { iconPos: [0, "iconPos"], cornerStyleClass: [1, "cornerStyleClass"], label: [2, "label"], icon: [3, "icon"] }, null), (_l()(), i0.ɵeld(10, 0, null, null, 1, "button", [["class", "ui-splitbutton-menubutton"], ["icon", "pi pi-chevron-down"], ["pButton", ""], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onDropdownButtonClick($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(11, 4341760, null, 0, i4.ButtonDirective, [i0.ElementRef], { cornerStyleClass: [0, "cornerStyleClass"], icon: [1, "icon"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SplitButton_1)), i0.ɵdid(13, 16384, null, 0, i3.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.styleClass; var currVal_1 = _ck(_v, 5, 0, true, _co.disabled); _ck(_v, 4, 0, currVal_0, currVal_1); var currVal_2 = _co.style; _ck(_v, 7, 0, currVal_2); var currVal_5 = _co.iconPos; var currVal_6 = ((_co.dir === "rtl") ? "ui-corner-right" : "ui-corner-left"); var currVal_7 = _co.label; var currVal_8 = _co.icon; _ck(_v, 9, 0, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_10 = ((_co.dir === "rtl") ? "ui-corner-left" : "ui-corner-right"); var currVal_11 = "pi pi-chevron-down"; _ck(_v, 11, 0, currVal_10, currVal_11); var currVal_12 = _co.overlayVisible; _ck(_v, 13, 0, currVal_12); }, function (_ck, _v) { var _co = _v.component; var currVal_3 = _co.disabled; var currVal_4 = _co.tabindex; _ck(_v, 8, 0, currVal_3, currVal_4); var currVal_9 = _co.disabled; _ck(_v, 10, 0, currVal_9); }); }
export function View_SplitButton_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "p-splitButton", [], null, null, null, View_SplitButton_0, RenderType_SplitButton)), i0.ɵdid(1, 180224, null, 0, i1.SplitButton, [i0.ElementRef, i0.Renderer2, i5.Router, i0.ChangeDetectorRef], null, null)], null, null); }
var SplitButtonNgFactory = i0.ɵccf("p-splitButton", i1.SplitButton, View_SplitButton_Host_0, { model: "model", icon: "icon", iconPos: "iconPos", label: "label", style: "style", styleClass: "styleClass", menuStyle: "menuStyle", menuStyleClass: "menuStyleClass", disabled: "disabled", tabindex: "tabindex", appendTo: "appendTo", dir: "dir", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, { onClick: "onClick", onDropdownClick: "onDropdownClick" }, []);
export { SplitButtonNgFactory as SplitButtonNgFactory };
//# sourceMappingURL=splitbutton.ngfactory.js.map