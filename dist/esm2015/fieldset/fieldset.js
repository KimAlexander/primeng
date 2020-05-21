var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
let idx = 0;
let Fieldset = class Fieldset {
    constructor(el) {
        this.el = el;
        this.collapsed = false;
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `ui-fieldset-${idx++}`;
    }
    toggle(event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.collapsed)
            this.expand(event);
        else
            this.collapse(event);
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        event.preventDefault();
    }
    expand(event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }
    collapse(event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    onToggleDone(event) {
        this.animating = false;
    }
};
Fieldset.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Fieldset.prototype, "legend", void 0);
__decorate([
    Input()
], Fieldset.prototype, "toggleable", void 0);
__decorate([
    Input()
], Fieldset.prototype, "collapsed", void 0);
__decorate([
    Output()
], Fieldset.prototype, "collapsedChange", void 0);
__decorate([
    Output()
], Fieldset.prototype, "onBeforeToggle", void 0);
__decorate([
    Output()
], Fieldset.prototype, "onAfterToggle", void 0);
__decorate([
    Input()
], Fieldset.prototype, "style", void 0);
__decorate([
    Input()
], Fieldset.prototype, "styleClass", void 0);
__decorate([
    Input()
], Fieldset.prototype, "transitionOptions", void 0);
Fieldset = __decorate([
    Component({
        selector: 'p-fieldset',
        template: `
        <fieldset [attr.id]="id" [ngClass]="{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <legend class="ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a tabindex="0" (click)="toggle($event)" (keydown.enter)="toggle($event)" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="!collapsed">
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="ui-fieldset-toggler pi" *ngIf="toggleable" [ngClass]="{'pi-minus': !collapsed,'pi-plus':collapsed}"></span>
                    <span class="ui-fieldset-legend-text">{{legend}}</span>
                    <ng-content select="p-header"></ng-content>
                </ng-template>
            </legend>
            <div [attr.id]="id + '-content'" class="ui-fieldset-content-wrapper" [@fieldsetContent]="collapsed ? {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}}" 
                        [attr.aria-labelledby]="id" [ngClass]="{'ui-fieldset-content-wrapper-overflown': collapsed||animating}" [attr.aria-hidden]="collapsed"
                         (@fieldsetContent.done)="onToggleDone($event)" role="region">
                <div class="ui-fieldset-content">
                    <ng-content></ng-content>
                </div>
            </div>
        </fieldset>
    `,
        animations: [
            trigger('fieldsetContent', [
                state('hidden', style({
                    height: '0'
                })),
                state('void', style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('{{transitionParams}}')),
                transition('hidden => visible', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ],
        changeDetection: ChangeDetectionStrategy.Default
    })
], Fieldset);
export { Fieldset };
let FieldsetModule = class FieldsetModule {
};
FieldsetModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Fieldset, SharedModule],
        declarations: [Fieldset]
    })
], FieldsetModule);
export { FieldsetModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2ZpZWxkc2V0LyIsInNvdXJjZXMiOlsiZmllbGRzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHekMsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0FBOENwQixJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBc0JqQixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWhCekIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUxQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdkQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU12RCxzQkFBaUIsR0FBVyxzQ0FBc0MsQ0FBQztRQU01RSxPQUFFLEdBQVcsZUFBZSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBRkMsQ0FBQztJQUl0QyxNQUFNLENBQUMsS0FBSztRQUNSLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxT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QU8sRUFBRSxDQUFDLFFBQVEsRUFBQyxZQUFZLENBQUM7UUFDaEMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQzNCLENBQUM7R0FDVyxjQUFjLENBQUk7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsRWxlbWVudFJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtCbG9ja2FibGVVSX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5cclxubGV0IGlkeDogbnVtYmVyID0gMDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWZpZWxkc2V0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGZpZWxkc2V0IFthdHRyLmlkXT1cImlkXCIgW25nQ2xhc3NdPVwieyd1aS1maWVsZHNldCB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc6IHRydWUsICd1aS1maWVsZHNldC10b2dnbGVhYmxlJzogdG9nZ2xlYWJsZX1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxsZWdlbmQgY2xhc3M9XCJ1aS1maWVsZHNldC1sZWdlbmQgdWktY29ybmVyLWFsbCB1aS1zdGF0ZS1kZWZhdWx0IHVpLXVuc2VsZWN0YWJsZS10ZXh0XCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidG9nZ2xlYWJsZTsgZWxzZSBsZWdlbmRDb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlKCRldmVudClcIiBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cImlkICsgJy1jb250ZW50J1wiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiIWNvbGxhcHNlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibGVnZW5kQ29udGVudFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNsZWdlbmRDb250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktZmllbGRzZXQtdG9nZ2xlciBwaVwiICpuZ0lmPVwidG9nZ2xlYWJsZVwiIFtuZ0NsYXNzXT1cInsncGktbWludXMnOiAhY29sbGFwc2VkLCdwaS1wbHVzJzpjb2xsYXBzZWR9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktZmllbGRzZXQtbGVnZW5kLXRleHRcIj57e2xlZ2VuZH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPC9sZWdlbmQ+XHJcbiAgICAgICAgICAgIDxkaXYgW2F0dHIuaWRdPVwiaWQgKyAnLWNvbnRlbnQnXCIgY2xhc3M9XCJ1aS1maWVsZHNldC1jb250ZW50LXdyYXBwZXJcIiBbQGZpZWxkc2V0Q29udGVudF09XCJjb2xsYXBzZWQgPyB7dmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiB0cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnMCd9fSA6IHt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiBhbmltYXRpbmcgPyB0cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcqJ319XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJpZFwiIFtuZ0NsYXNzXT1cInsndWktZmllbGRzZXQtY29udGVudC13cmFwcGVyLW92ZXJmbG93bic6IGNvbGxhcHNlZHx8YW5pbWF0aW5nfVwiIFthdHRyLmFyaWEtaGlkZGVuXT1cImNvbGxhcHNlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAoQGZpZWxkc2V0Q29udGVudC5kb25lKT1cIm9uVG9nZ2xlRG9uZSgkZXZlbnQpXCIgcm9sZT1cInJlZ2lvblwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWZpZWxkc2V0LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9maWVsZHNldD5cclxuICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcignZmllbGRzZXRDb250ZW50JywgW1xyXG4gICAgICAgICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJ3t7aGVpZ2h0fX0nXHJcbiAgICAgICAgICAgIH0pLCB7cGFyYW1zOiB7aGVpZ2h0OiAnMCd9fSksXHJcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gdmlzaWJsZScsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWVsZHNldCBpbXBsZW1lbnRzIEJsb2NrYWJsZVVJIHtcclxuXHJcbiAgICBASW5wdXQoKSBsZWdlbmQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0b2dnbGVhYmxlOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGNvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBPdXRwdXQoKSBjb2xsYXBzZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25CZWZvcmVUb2dnbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkFmdGVyVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuICAgICAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKSc7XHJcbiAgICBcclxuICAgIHB1YmxpYyBhbmltYXRpbmc6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XHJcbiAgICBcclxuICAgIGlkOiBzdHJpbmcgPSBgdWktZmllbGRzZXQtJHtpZHgrK31gO1xyXG4gICAgICAgIFxyXG4gICAgdG9nZ2xlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25CZWZvcmVUb2dnbGUuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZWR9KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWQpXHJcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kKGV2ZW50KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoZXZlbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB0aGlzLm9uQWZ0ZXJUb2dnbGUuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZWR9KTsgICBcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBhbmQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29sbGFwc2VkQ2hhbmdlLmVtaXQodGhpcy5jb2xsYXBzZWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb2xsYXBzZShldmVudCkge1xyXG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbGxhcHNlZENoYW5nZS5lbWl0KHRoaXMuY29sbGFwc2VkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uVG9nZ2xlRG9uZShldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0ZpZWxkc2V0LFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtGaWVsZHNldF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZpZWxkc2V0TW9kdWxlIHsgfSJdfQ==