var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ElementRef, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Footer } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
var idx = 0;
var Panel = /** @class */ (function () {
    function Panel(el) {
        this.el = el;
        this.collapsed = false;
        this.expandIcon = 'pi pi-plus';
        this.collapseIcon = 'pi pi-minus';
        this.showHeader = true;
        this.toggler = "icon";
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = "ui-panel-" + idx++;
    }
    Panel.prototype.onHeaderClick = function (event) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    };
    Panel.prototype.onIconClick = function (event) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    };
    Panel.prototype.toggle = function (event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        event.preventDefault();
    };
    Panel.prototype.expand = function (event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.collapse = function (event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Panel.prototype.onToggleDone = function (event) {
        this.animating = false;
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    };
    Panel.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], Panel.prototype, "toggleable", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "header", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "collapsed", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "style", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "expandIcon", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "collapseIcon", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "showHeader", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "toggler", void 0);
    __decorate([
        Output()
    ], Panel.prototype, "collapsedChange", void 0);
    __decorate([
        Output()
    ], Panel.prototype, "onBeforeToggle", void 0);
    __decorate([
        Output()
    ], Panel.prototype, "onAfterToggle", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "transitionOptions", void 0);
    __decorate([
        ContentChild(Footer)
    ], Panel.prototype, "footerFacet", void 0);
    Panel = __decorate([
        Component({
            selector: 'p-panel',
            template: "\n        <div [attr.id]=\"id\" [ngClass]=\"'ui-panel ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div [ngClass]=\"{'ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all': true, 'ui-panel-titlebar-clickable': (toggleable && toggler === 'header')}\" \n                *ngIf=\"showHeader\" (click)=\"onHeaderClick($event)\" [attr.id]=\"id + '-titlebar'\">\n                <span class=\"ui-panel-title\" *ngIf=\"header\" [attr.id]=\"id + '_header'\">{{header}}</span>\n                <ng-content select=\"p-header\"></ng-content>\n                <a *ngIf=\"toggleable\" [attr.id]=\"id + '-label'\" class=\"ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default\" tabindex=\"0\"\n                    (click)=\"onIconClick($event)\" (keydown.enter)=\"onIconClick($event)\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"!collapsed\">\n                    <span [class]=\"collapsed ? expandIcon : collapseIcon\"></span>\n                </a>\n            </div>\n            <div [attr.id]=\"id + '-content'\" class=\"ui-panel-content-wrapper\" [@panelContent]=\"collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}\" (@panelContent.done)=\"onToggleDone($event)\"\n                [ngClass]=\"{'ui-panel-content-wrapper-overflown': collapsed||animating}\"\n                role=\"region\" [attr.aria-hidden]=\"collapsed\" [attr.aria-labelledby]=\"id  + '-titlebar'\">\n                <div class=\"ui-panel-content ui-widget-content\">\n                    <ng-content></ng-content>\n                </div>\n                \n                <div class=\"ui-panel-footer ui-widget-content\" *ngIf=\"footerFacet\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                trigger('panelContent', [
                    state('hidden', style({
                        height: '0',
                        opacity: 0
                    })),
                    state('void', style({
                        height: '{{height}}',
                        opacity: '{{opacity}}'
                    }), { params: { height: '0', opacity: '0' } }),
                    state('visible', style({
                        height: '*',
                        opacity: 1
                    })),
                    transition('visible <=> hidden', animate('{{transitionParams}}')),
                    transition('void => hidden', animate('{{transitionParams}}')),
                    transition('void => visible', animate('{{transitionParams}}'))
                ])
            ],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Panel);
    return Panel;
}());
export { Panel };
var PanelModule = /** @class */ (function () {
    function PanelModule() {
    }
    PanelModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Panel, SharedModule],
            declarations: [Panel]
        })
    ], PanelModule);
    return PanelModule;
}());
export { PanelModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3BhbmVsLyIsInNvdXJjZXMiOlsicGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFaEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUzRSxJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUM7QUFpRHBCO0lBa0NJLGVBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBNUJ6QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBTTNCLGVBQVUsR0FBVyxZQUFZLENBQUM7UUFFbEMsaUJBQVksR0FBVyxhQUFhLENBQUM7UUFFckMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixZQUFPLEdBQVcsTUFBTSxDQUFDO1FBRXhCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEQsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV2RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZELHNCQUFpQixHQUFXLHNDQUFzQyxDQUFDO1FBTTVFLE9BQUUsR0FBVyxjQUFZLEdBQUcsRUFBSSxDQUFDO0lBRUksQ0FBQztJQUV0Qyw2QkFBYSxHQUFiLFVBQWMsS0FBWTtRQUN0QixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLENB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QUFhO3FCQUN6QixDQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUMsRUFBQyxDQUFDO29CQUMxQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQzt3QkFDbkIsTUFBTSxFQUFFLEdBQUc7d0JBQ1gsT0FBTyxFQUFFLENBQUM7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDakUsVUFBVSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUM3RCxVQUFVLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7aUJBQ2pFLENBQUM7YUFDTDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxLQUFLLENBcUZqQjtJQUFELFlBQUM7Q0FBQSxBQXJGRCxJQXFGQztTQXJGWSxLQUFLO0FBNEZsQjtJQUFBO0lBQTJCLENBQUM7SUFBZixXQUFXO1FBTHZCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUMsWUFBWSxDQUFDO1lBQzdCLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQztTQUN4QixDQUFDO09BQ1csV0FBVyxDQUFJO0lBQUQsa0JBQUM7Q0FBQSxBQUE1QixJQUE0QjtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLEVsZW1lbnRSZWYsQ29udGVudENoaWxkLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7U2hhcmVkTW9kdWxlLEZvb3Rlcn0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge0Jsb2NrYWJsZVVJfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxubGV0IGlkeDogbnVtYmVyID0gMDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXBhbmVsJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZFwiIFtuZ0NsYXNzXT1cIid1aS1wYW5lbCB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1wYW5lbC10aXRsZWJhciB1aS13aWRnZXQtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLXBhbmVsLXRpdGxlYmFyLWNsaWNrYWJsZSc6ICh0b2dnbGVhYmxlICYmIHRvZ2dsZXIgPT09ICdoZWFkZXInKX1cIiBcclxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0hlYWRlclwiIChjbGljayk9XCJvbkhlYWRlckNsaWNrKCRldmVudClcIiBbYXR0ci5pZF09XCJpZCArICctdGl0bGViYXInXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhbmVsLXRpdGxlXCIgKm5nSWY9XCJoZWFkZXJcIiBbYXR0ci5pZF09XCJpZCArICdfaGVhZGVyJ1wiPnt7aGVhZGVyfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwidG9nZ2xlYWJsZVwiIFthdHRyLmlkXT1cImlkICsgJy1sYWJlbCdcIiBjbGFzcz1cInVpLXBhbmVsLXRpdGxlYmFyLWljb24gdWktcGFuZWwtdGl0bGViYXItdG9nZ2xlciB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIiB0YWJpbmRleD1cIjBcIlxyXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkljb25DbGljaygkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwib25JY29uQ2xpY2soJGV2ZW50KVwiIFthdHRyLmFyaWEtY29udHJvbHNdPVwiaWQgKyAnLWNvbnRlbnQnXCIgcm9sZT1cInRhYlwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiIWNvbGxhcHNlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjb2xsYXBzZWQgPyBleHBhbmRJY29uIDogY29sbGFwc2VJY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZCArICctY29udGVudCdcIiBjbGFzcz1cInVpLXBhbmVsLWNvbnRlbnQtd3JhcHBlclwiIFtAcGFuZWxDb250ZW50XT1cImNvbGxhcHNlZCA/IHt2YWx1ZTogJ2hpZGRlbicsIHBhcmFtczoge3RyYW5zaXRpb25QYXJhbXM6IGFuaW1hdGluZyA/IHRyYW5zaXRpb25PcHRpb25zIDogJzBtcycsIGhlaWdodDogJzAnLCBvcGFjaXR5OicwJ319IDoge3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zaXRpb25QYXJhbXM6IGFuaW1hdGluZyA/IHRyYW5zaXRpb25PcHRpb25zIDogJzBtcycsIGhlaWdodDogJyonLCBvcGFjaXR5OiAnMSd9fVwiIChAcGFuZWxDb250ZW50LmRvbmUpPVwib25Ub2dnbGVEb25lKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1wYW5lbC1jb250ZW50LXdyYXBwZXItb3ZlcmZsb3duJzogY29sbGFwc2VkfHxhbmltYXRpbmd9XCJcclxuICAgICAgICAgICAgICAgIHJvbGU9XCJyZWdpb25cIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJjb2xsYXBzZWRcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWQgICsgJy10aXRsZWJhcidcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYW5lbC1jb250ZW50IHVpLXdpZGdldC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYW5lbC1mb290ZXIgdWktd2lkZ2V0LWNvbnRlbnRcIiAqbmdJZj1cImZvb3RlckZhY2V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ3BhbmVsQ29udGVudCcsIFtcclxuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzAnLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAne3toZWlnaHR9fScsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAne3tvcGFjaXR5fX0nXHJcbiAgICAgICAgICAgIH0pLCB7cGFyYW1zOiB7aGVpZ2h0OiAnMCcsIG9wYWNpdHk6ICcwJ319KSxcclxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlIDw9PiBoaWRkZW4nLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBoaWRkZW4nLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSlcclxuICAgICAgICBdKVxyXG4gICAgXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFuZWwgaW1wbGVtZW50cyBCbG9ja2FibGVVSSB7XHJcblxyXG4gICAgQElucHV0KCkgdG9nZ2xlYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBjb2xsYXBzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBleHBhbmRJY29uOiBzdHJpbmcgPSAncGkgcGktcGx1cyc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGNvbGxhcHNlSWNvbjogc3RyaW5nID0gJ3BpIHBpLW1pbnVzJztcclxuICBcclxuICAgIEBJbnB1dCgpIHNob3dIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHRvZ2dsZXI6IHN0cmluZyA9IFwiaWNvblwiO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgY29sbGFwc2VkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25CZWZvcmVUb2dnbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkFmdGVyVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICc0MDBtcyBjdWJpYy1iZXppZXIoMC44NiwgMCwgMC4wNywgMSknO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXJGYWNldDtcclxuICAgIFxyXG4gICAgYW5pbWF0aW5nOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gYHVpLXBhbmVsLSR7aWR4Kyt9YDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgICBvbkhlYWRlckNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZXIgPT09ICdoZWFkZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25JY29uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlciA9PT0gJ2ljb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5hbmltYXRpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vbkJlZm9yZVRvZ2dsZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZWFibGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmQoZXZlbnQpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwYW5kKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbGxhcHNlZENoYW5nZS5lbWl0KHRoaXMuY29sbGFwc2VkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29sbGFwc2UoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRDaGFuZ2UuZW1pdCh0aGlzLmNvbGxhcHNlZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnTCoHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblRvZ2dsZURvbmUoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uQWZ0ZXJUb2dnbGUuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZWR9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtQYW5lbCxTaGFyZWRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbUGFuZWxdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYW5lbE1vZHVsZSB7IH1cclxuIl19