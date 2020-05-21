var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2, AfterViewInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let Lightbox = class Lightbox {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.type = 'image';
        this.effectDuration = '500ms';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.closeOnEscape = true;
    }
    onImageClick(event, image, i, content) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.preventDocumentClickListener = true;
        this.show();
        this.displayImage(image);
        event.preventDefault();
    }
    ngAfterViewInit() {
        this.panel = DomHandler.findSingle(this.el.nativeElement, '.ui-lightbox ');
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                DomHandler.appendChild(this.panel, this.appendTo);
        }
    }
    onLinkClick(event, content) {
        this.preventDocumentClickListener = true;
        this.show();
        event.preventDefault();
    }
    displayImage(image) {
        setTimeout(() => {
            this.cd.markForCheck();
            this.currentImage = image;
            this.captionText = image.title;
            this.center();
        }, 1000);
    }
    show() {
        this.mask = document.createElement('div');
        DomHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
        document.body.appendChild(this.mask);
        if (this.autoZIndex) {
            this.zindex = this.baseZIndex + (++DomHandler.zindex);
        }
        this.mask.style.zIndex = this.zindex - 1;
        this.center();
        this.visible = true;
        this.bindGlobalListeners();
    }
    hide(event) {
        this.captionText = null;
        this.index = null;
        this.currentImage = null;
        this.visible = false;
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
        this.unbindGlobalListeners();
        event.preventDefault();
    }
    center() {
        let elementWidth = DomHandler.getOuterWidth(this.panel);
        let elementHeight = DomHandler.getOuterHeight(this.panel);
        if (elementWidth == 0 && elementHeight == 0) {
            this.panel.style.visibility = 'hidden';
            this.panel.style.display = 'block';
            elementWidth = DomHandler.getOuterWidth(this.panel);
            elementHeight = DomHandler.getOuterHeight(this.panel);
            this.panel.style.display = 'none';
            this.panel.style.visibility = 'visible';
        }
    }
    onImageLoad(event, content) {
        let image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        let imageWidth = DomHandler.getOuterWidth(image);
        let imageHeight = DomHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';
        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        this.panel.style.left = parseInt(this.panel.style.left) + (DomHandler.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
        this.panel.style.top = parseInt(this.panel.style.top) + (DomHandler.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';
        setTimeout(() => {
            this.cd.markForCheck();
            DomHandler.fadeIn(image, 500);
            image.style.display = 'block';
            //this.captionText = this.currentImage.title;
            this.loading = false;
        }, parseInt(this.effectDuration));
    }
    prev(placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index > 0) {
            this.displayImage(this.images[--this.index]);
        }
    }
    next(placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index <= (this.images.length - 1)) {
            this.displayImage(this.images[++this.index]);
        }
    }
    bindGlobalListeners() {
        this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
            if (!this.preventDocumentClickListener && this.visible) {
                this.hide(event);
            }
            this.preventDocumentClickListener = false;
            this.cd.markForCheck();
        });
        if (this.closeOnEscape && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
                if (event.which == 27) {
                    if (parseInt(this.panel.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                        this.hide(event);
                    }
                }
            });
        }
    }
    unbindGlobalListeners() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    get leftVisible() {
        return this.images && this.images.length && this.index != 0 && !this.loading;
    }
    get rightVisible() {
        return this.images && this.images.length && this.index < (this.images.length - 1) && !this.loading;
    }
    ngOnDestroy() {
        this.unbindGlobalListeners();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    }
};
Lightbox.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Lightbox.prototype, "images", void 0);
__decorate([
    Input()
], Lightbox.prototype, "type", void 0);
__decorate([
    Input()
], Lightbox.prototype, "style", void 0);
__decorate([
    Input()
], Lightbox.prototype, "styleClass", void 0);
__decorate([
    Input()
], Lightbox.prototype, "appendTo", void 0);
__decorate([
    Input()
], Lightbox.prototype, "easing", void 0);
__decorate([
    Input()
], Lightbox.prototype, "effectDuration", void 0);
__decorate([
    Input()
], Lightbox.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], Lightbox.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], Lightbox.prototype, "closeOnEscape", void 0);
Lightbox = __decorate([
    Component({
        selector: 'p-lightbox',
        template: `
        <div [ngStyle]="style" [class]="styleClass" *ngIf="(type == 'image')">
            <a *ngFor="let image of images; let i = index;" [href]="image.source" (click)="onImageClick($event,image,i,content)">
                <img [src]="image.thumbnail" [title]="image.title" [alt]="image.alt">
            </a>
        </div>
        <span [ngStyle]="style" [class]="styleClass" *ngIf="(type == 'content')" (click)="onLinkClick($event,content)">
            <ng-content select="a"></ng-content>
        </span>
        <div class="ui-lightbox ui-widget ui-corner-all ui-shadow" [style.display]="visible ? 'block' : 'none'" [style.zIndex]="zindex"
            [ngClass]="{'ui-lightbox-loading': loading}"
            [style.transitionProperty]="'all'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing" (click)="preventDocumentClickListener=true">
           <div class="ui-lightbox-content-wrapper">
              <a class="ui-state-default ui-lightbox-nav-left ui-corner-right" [style.zIndex]="zindex + 1" (click)="prev(img)"
                [ngClass]="{'ui-helper-hidden':!leftVisible}"><span class="ui-lightbox-nav-icon pi pi-chevron-left"></span></a>
              <div #content class="ui-lightbox-content ui-corner-all" 
                [style.transitionProperty]="'width,height'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing">
                <img #img [src]="currentImage ? currentImage.source||'' : ''" (load)="onImageLoad($event,content)" style="display:none">
                <ng-content></ng-content>
              </div>
              <a class="ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden" [style.zIndex]="zindex + 1" (click)="next(img)"
                [ngClass]="{'ui-helper-hidden':!rightVisible}"><span class="ui-lightbox-nav-icon pi pi-chevron-right"></span></a>
           </div>
           <div class="ui-lightbox-caption ui-widget-header" [style.display]="captionText ? 'block' : 'none'">
              <span class="ui-lightbox-caption-text">{{captionText}}</span><a class="ui-lightbox-close ui-corner-all" tabindex="0" (click)="hide($event)" (keydown.enter)="hide($event)"><span class="pi pi-times"></span></a>
              <div style="clear:both"></div>
           </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Lightbox);
export { Lightbox };
let LightboxModule = class LightboxModule {
};
LightboxModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Lightbox],
        declarations: [Lightbox]
    })
], LightboxModule);
export { LightboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2xpZ2h0Ym94LyIsInNvdXJjZXMiOlsibGlnaHRib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5SSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQW1DdkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQTRDakIsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVMsRUFBcUI7UUFBeEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXhDbEYsU0FBSSxHQUFXLE9BQU8sQ0FBQztRQVV2QixtQkFBYyxHQUFRLE9BQU8sQ0FBQztRQUU5QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsa0JBQWEsR0FBWSxJQUFJLENBQUM7SUF3QnVELENBQUM7SUFFL0YsWUFBWSxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE9BQU87UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FB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RUosQ0FBQTs7WUF6SzBCLFVBQVU7WUFBbUIsU0FBUztZQUFhLGlCQUFpQjs7QUExQ2xGO0lBQVIsS0FBSyxFQUFFO3dDQUFlO0FBRWQ7SUFBUixLQUFLLEVBQUU7c0NBQXdCO0FBRXZCO0lBQVIsS0FBSyxFQUFFO3VDQUFZO0FBRVg7SUFBUixLQUFLLEVBQUU7NENBQW9CO0FBRW5CO0lBQVIsS0FBSyxFQUFFOzBDQUFlO0FBRWQ7SUFBUixLQUFLLEVBQUU7d0NBQW9CO0FBRW5CO0lBQVIsS0FBSyxFQUFFO2dEQUErQjtBQUU5QjtJQUFSLEtBQUssRUFBRTs0Q0FBNEI7QUFFM0I7SUFBUixLQUFLLEVBQUU7NENBQXdCO0FBRXZCO0lBQVIsS0FBSyxFQUFFOytDQUErQjtBQXBCOUIsUUFBUTtJQWpDcEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNEJUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87S0FDbkQsQ0FBQztHQUNXLFFBQVEsQ0FxTnBCO1NBck5ZLFFBQVE7QUE0TnJCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBSSxDQUFBO0FBQWxCLGNBQWM7SUFMMUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixJbnB1dCxSZW5kZXJlcjIsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1saWdodGJveCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiICpuZ0lmPVwiKHR5cGUgPT0gJ2ltYWdlJylcIj5cclxuICAgICAgICAgICAgPGEgKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlczsgbGV0IGkgPSBpbmRleDtcIiBbaHJlZl09XCJpbWFnZS5zb3VyY2VcIiAoY2xpY2spPVwib25JbWFnZUNsaWNrKCRldmVudCxpbWFnZSxpLGNvbnRlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2UudGh1bWJuYWlsXCIgW3RpdGxlXT1cImltYWdlLnRpdGxlXCIgW2FsdF09XCJpbWFnZS5hbHRcIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cIih0eXBlID09ICdjb250ZW50JylcIiAoY2xpY2spPVwib25MaW5rQ2xpY2soJGV2ZW50LGNvbnRlbnQpXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImFcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saWdodGJveCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3dcIiBbc3R5bGUuZGlzcGxheV09XCJ2aXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJ1wiIFtzdHlsZS56SW5kZXhdPVwiemluZGV4XCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1saWdodGJveC1sb2FkaW5nJzogbG9hZGluZ31cIlxyXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvblByb3BlcnR5XT1cIidhbGwnXCIgW3N0eWxlLnRyYW5zaXRpb25EdXJhdGlvbl09XCJlZmZlY3REdXJhdGlvblwiIFtzdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25dPVwiZWFzaW5nXCIgKGNsaWNrKT1cInByZXZlbnREb2N1bWVudENsaWNrTGlzdGVuZXI9dHJ1ZVwiPlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saWdodGJveC1jb250ZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInVpLXN0YXRlLWRlZmF1bHQgdWktbGlnaHRib3gtbmF2LWxlZnQgdWktY29ybmVyLXJpZ2h0XCIgW3N0eWxlLnpJbmRleF09XCJ6aW5kZXggKyAxXCIgKGNsaWNrKT1cInByZXYoaW1nKVwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiFsZWZ0VmlzaWJsZX1cIj48c3BhbiBjbGFzcz1cInVpLWxpZ2h0Ym94LW5hdi1pY29uIHBpIHBpLWNoZXZyb24tbGVmdFwiPjwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInVpLWxpZ2h0Ym94LWNvbnRlbnQgdWktY29ybmVyLWFsbFwiIFxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eV09XCInd2lkdGgsaGVpZ2h0J1wiIFtzdHlsZS50cmFuc2l0aW9uRHVyYXRpb25dPVwiZWZmZWN0RHVyYXRpb25cIiBbc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uXT1cImVhc2luZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGltZyAjaW1nIFtzcmNdPVwiY3VycmVudEltYWdlID8gY3VycmVudEltYWdlLnNvdXJjZXx8JycgOiAnJ1wiIChsb2FkKT1cIm9uSW1hZ2VMb2FkKCRldmVudCxjb250ZW50KVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJ1aS1zdGF0ZS1kZWZhdWx0IHVpLWxpZ2h0Ym94LW5hdi1yaWdodCB1aS1jb3JuZXItbGVmdCB1aS1oZWxwZXItaGlkZGVuXCIgW3N0eWxlLnpJbmRleF09XCJ6aW5kZXggKyAxXCIgKGNsaWNrKT1cIm5leHQoaW1nKVwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiFyaWdodFZpc2libGV9XCI+PHNwYW4gY2xhc3M9XCJ1aS1saWdodGJveC1uYXYtaWNvbiBwaSBwaS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPjwvYT5cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktbGlnaHRib3gtY2FwdGlvbiB1aS13aWRnZXQtaGVhZGVyXCIgW3N0eWxlLmRpc3BsYXldPVwiY2FwdGlvblRleHQgPyAnYmxvY2snIDogJ25vbmUnXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1saWdodGJveC1jYXB0aW9uLXRleHRcIj57e2NhcHRpb25UZXh0fX08L3NwYW4+PGEgY2xhc3M9XCJ1aS1saWdodGJveC1jbG9zZSB1aS1jb3JuZXItYWxsXCIgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImhpZGUoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImhpZGUoJGV2ZW50KVwiPjxzcGFuIGNsYXNzPVwicGkgcGktdGltZXNcIj48L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJjbGVhcjpib3RoXCI+PC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWdodGJveCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBpbWFnZXM6IGFueVtdO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAnaW1hZ2UnO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcbiAgICAgICAgXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGVhc2luZzogJ2Vhc2Utb3V0JztcclxuICAgIFxyXG4gICAgQElucHV0KCkgZWZmZWN0RHVyYXRpb246IGFueSA9ICc1MDBtcyc7XHJcblxyXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIEBJbnB1dCgpIGNsb3NlT25Fc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbjtcclxuICAgICAgICBcclxuICAgIHB1YmxpYyBjdXJyZW50SW1hZ2U6IGFueTtcclxuICAgIFxyXG4gICAgcHVibGljIGNhcHRpb25UZXh0OiBzdHJpbmc7XHJcbiAgICBcclxuICAgIHB1YmxpYyB6aW5kZXg6IGFueTtcclxuICAgIFxyXG4gICAgcHVibGljIHBhbmVsOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbmRleDogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgbWFzazogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgcHJldmVudERvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgcHVibGljIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIHB1YmxpYyBkb2N1bWVudEVzY2FwZUxpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgb25JbWFnZUNsaWNrKGV2ZW50LGltYWdlLGksY29udGVudCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY29udGVudC5zdHlsZS53aWR0aCA9IDMyICsgJ3B4JztcclxuICAgICAgICBjb250ZW50LnN0eWxlLmhlaWdodCA9IDMyICsgJ3B4JztcclxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUltYWdlKGltYWdlKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICcudWktbGlnaHRib3ggJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCwgdGhpcy5hcHBlbmRUbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkxpbmtDbGljayhldmVudCxjb250ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkaXNwbGF5SW1hZ2UoaW1hZ2UpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IGltYWdlLnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlcigpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMubWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMubWFzaywgJ3VpLXdpZGdldC1vdmVybGF5IHVpLWRpYWxvZy1tYXNrJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1hc2spO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy56aW5kZXggPSB0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFzay5zdHlsZS56SW5kZXggPSB0aGlzLnppbmRleCAtIDE7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIoKTtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYmluZEdsb2JhbExpc3RlbmVycygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoaWRlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1hc2spO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVuYmluZEdsb2JhbExpc3RlbmVycygpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNlbnRlcigpIHtcclxuICAgICAgICBsZXQgZWxlbWVudFdpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMucGFuZWwpO1xyXG4gICAgICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnBhbmVsKTtcclxuICAgICAgICBpZiAoZWxlbWVudFdpZHRoID09IDAgJiYgZWxlbWVudEhlaWdodCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBlbGVtZW50V2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5wYW5lbCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnRIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMucGFuZWwpO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBvbkltYWdlTG9hZChldmVudCxjb250ZW50KSB7XHJcbiAgICAgICAgbGV0IGltYWdlID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGltYWdlLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgICBpbWFnZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBsZXQgaW1hZ2VXaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aChpbWFnZSk7XHJcbiAgICAgICAgbGV0IGltYWdlSGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodChpbWFnZSk7XHJcbiAgICAgICAgaW1hZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBpbWFnZS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG5cclxuICAgICAgICBjb250ZW50LnN0eWxlLndpZHRoID0gaW1hZ2VXaWR0aCArICdweCc7XHJcbiAgICAgICAgY29udGVudC5zdHlsZS5oZWlnaHQgPSBpbWFnZUhlaWdodCArICdweCc7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS5sZWZ0KSArIChEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5wYW5lbCkgLSBpbWFnZVdpZHRoKSAvIDIgKyAncHgnO1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUudG9wID0gcGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS50b3ApICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5wYW5lbCkgLSBpbWFnZUhlaWdodCkgLyAyICsgJ3B4JztcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZmFkZUluKGltYWdlLCA1MDApO1xyXG4gICAgICAgICAgICBpbWFnZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgLy90aGlzLmNhcHRpb25UZXh0ID0gdGhpcy5jdXJyZW50SW1hZ2UudGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHBhcnNlSW50KHRoaXMuZWZmZWN0RHVyYXRpb24pKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJldihwbGFjZWhvbGRlcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBwbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGlmICh0aGlzLmluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJbWFnZSh0aGlzLmltYWdlc1stLXRoaXMuaW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5leHQocGxhY2Vob2xkZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2FwdGlvblRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgcGxhY2Vob2xkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBpZiAodGhpcy5pbmRleCA8PSAodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SW1hZ2UodGhpcy5pbWFnZXNbKyt0aGlzLmluZGV4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmRHbG9iYWxMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZlbnREb2N1bWVudENsaWNrTGlzdGVuZXImJnRoaXMudmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudENsaWNrTGlzdGVuZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5jbG9zZU9uRXNjYXBlICYmICF0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMjcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS56SW5kZXgpID09PSAoRG9tSGFuZGxlci56aW5kZXggKyB0aGlzLmJhc2VaSW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kR2xvYmFsTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgZ2V0IGxlZnRWaXNpYmxlKCk6Ym9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzICYmIHRoaXMuaW1hZ2VzLmxlbmd0aCAmJiB0aGlzLmluZGV4ICE9IDAgJiYgIXRoaXMubG9hZGluZzsgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCByaWdodFZpc2libGUoKTpib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZXMgJiYgdGhpcy5pbWFnZXMubGVuZ3RoICYmIHRoaXMuaW5kZXggPCAodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkgJiYgIXRoaXMubG9hZGluZzsgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICBcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0xpZ2h0Ym94XSxcclxuICAgIGRlY2xhcmF0aW9uczogW0xpZ2h0Ym94XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3hNb2R1bGUgeyB9XHJcbiJdfQ==