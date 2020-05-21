var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2, AfterViewInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var Lightbox = /** @class */ (function () {
    function Lightbox(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.type = 'image';
        this.effectDuration = '500ms';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.closeOnEscape = true;
    }
    Lightbox.prototype.onImageClick = function (event, image, i, content) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.preventDocumentClickListener = true;
        this.show();
        this.displayImage(image);
        event.preventDefault();
    };
    Lightbox.prototype.ngAfterViewInit = function () {
        this.panel = DomHandler.findSingle(this.el.nativeElement, '.ui-lightbox ');
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                DomHandler.appendChild(this.panel, this.appendTo);
        }
    };
    Lightbox.prototype.onLinkClick = function (event, content) {
        this.preventDocumentClickListener = true;
        this.show();
        event.preventDefault();
    };
    Lightbox.prototype.displayImage = function (image) {
        var _this = this;
        setTimeout(function () {
            _this.cd.markForCheck();
            _this.currentImage = image;
            _this.captionText = image.title;
            _this.center();
        }, 1000);
    };
    Lightbox.prototype.show = function () {
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
    };
    Lightbox.prototype.hide = function (event) {
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
    };
    Lightbox.prototype.center = function () {
        var elementWidth = DomHandler.getOuterWidth(this.panel);
        var elementHeight = DomHandler.getOuterHeight(this.panel);
        if (elementWidth == 0 && elementHeight == 0) {
            this.panel.style.visibility = 'hidden';
            this.panel.style.display = 'block';
            elementWidth = DomHandler.getOuterWidth(this.panel);
            elementHeight = DomHandler.getOuterHeight(this.panel);
            this.panel.style.display = 'none';
            this.panel.style.visibility = 'visible';
        }
    };
    Lightbox.prototype.onImageLoad = function (event, content) {
        var _this = this;
        var image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        var imageWidth = DomHandler.getOuterWidth(image);
        var imageHeight = DomHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';
        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        this.panel.style.left = parseInt(this.panel.style.left) + (DomHandler.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
        this.panel.style.top = parseInt(this.panel.style.top) + (DomHandler.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';
        setTimeout(function () {
            _this.cd.markForCheck();
            DomHandler.fadeIn(image, 500);
            image.style.display = 'block';
            //this.captionText = this.currentImage.title;
            _this.loading = false;
        }, parseInt(this.effectDuration));
    };
    Lightbox.prototype.prev = function (placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index > 0) {
            this.displayImage(this.images[--this.index]);
        }
    };
    Lightbox.prototype.next = function (placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index <= (this.images.length - 1)) {
            this.displayImage(this.images[++this.index]);
        }
    };
    Lightbox.prototype.bindGlobalListeners = function () {
        var _this = this;
        this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
            if (!_this.preventDocumentClickListener && _this.visible) {
                _this.hide(event);
            }
            _this.preventDocumentClickListener = false;
            _this.cd.markForCheck();
        });
        if (this.closeOnEscape && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.panel.style.zIndex) === (DomHandler.zindex + _this.baseZIndex)) {
                        _this.hide(event);
                    }
                }
            });
        }
    };
    Lightbox.prototype.unbindGlobalListeners = function () {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    Object.defineProperty(Lightbox.prototype, "leftVisible", {
        get: function () {
            return this.images && this.images.length && this.index != 0 && !this.loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lightbox.prototype, "rightVisible", {
        get: function () {
            return this.images && this.images.length && this.index < (this.images.length - 1) && !this.loading;
        },
        enumerable: true,
        configurable: true
    });
    Lightbox.prototype.ngOnDestroy = function () {
        this.unbindGlobalListeners();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    };
    Lightbox.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
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
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"(type == 'image')\">\n            <a *ngFor=\"let image of images; let i = index;\" [href]=\"image.source\" (click)=\"onImageClick($event,image,i,content)\">\n                <img [src]=\"image.thumbnail\" [title]=\"image.title\" [alt]=\"image.alt\">\n            </a>\n        </div>\n        <span [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"(type == 'content')\" (click)=\"onLinkClick($event,content)\">\n            <ng-content select=\"a\"></ng-content>\n        </span>\n        <div class=\"ui-lightbox ui-widget ui-corner-all ui-shadow\" [style.display]=\"visible ? 'block' : 'none'\" [style.zIndex]=\"zindex\"\n            [ngClass]=\"{'ui-lightbox-loading': loading}\"\n            [style.transitionProperty]=\"'all'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\" (click)=\"preventDocumentClickListener=true\">\n           <div class=\"ui-lightbox-content-wrapper\">\n              <a class=\"ui-state-default ui-lightbox-nav-left ui-corner-right\" [style.zIndex]=\"zindex + 1\" (click)=\"prev(img)\"\n                [ngClass]=\"{'ui-helper-hidden':!leftVisible}\"><span class=\"ui-lightbox-nav-icon pi pi-chevron-left\"></span></a>\n              <div #content class=\"ui-lightbox-content ui-corner-all\" \n                [style.transitionProperty]=\"'width,height'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\">\n                <img #img [src]=\"currentImage ? currentImage.source||'' : ''\" (load)=\"onImageLoad($event,content)\" style=\"display:none\">\n                <ng-content></ng-content>\n              </div>\n              <a class=\"ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden\" [style.zIndex]=\"zindex + 1\" (click)=\"next(img)\"\n                [ngClass]=\"{'ui-helper-hidden':!rightVisible}\"><span class=\"ui-lightbox-nav-icon pi pi-chevron-right\"></span></a>\n           </div>\n           <div class=\"ui-lightbox-caption ui-widget-header\" [style.display]=\"captionText ? 'block' : 'none'\">\n              <span class=\"ui-lightbox-caption-text\">{{captionText}}</span><a class=\"ui-lightbox-close ui-corner-all\" tabindex=\"0\" (click)=\"hide($event)\" (keydown.enter)=\"hide($event)\"><span class=\"pi pi-times\"></span></a>\n              <div style=\"clear:both\"></div>\n           </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Lightbox);
    return Lightbox;
}());
export { Lightbox };
var LightboxModule = /** @class */ (function () {
    function LightboxModule() {
    }
    LightboxModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Lightbox],
            declarations: [Lightbox]
        })
    ], LightboxModule);
    return LightboxModule;
}());
export { LightboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2xpZ2h0Ym94LyIsInNvdXJjZXMiOlsibGlnaHRib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5SSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQW1DdkM7SUE0Q0ksa0JBQW1CLEVBQWMsRUFBUyxRQUFtQixFQUFTLEVBQXFCO1FBQXhFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUF4Q2xGLFNBQUksR0FBVyxPQUFPLENBQUM7UUFVdkIsbUJBQWMsR0FBUSxPQUFPLENBQUM7UUFFOUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGtCQUFhLEdBQVksSUFBSSxDQUFDO0lBd0J1RCxDQUFDO0lBRS9GLCtCQUFZLEdBQVosVUFBYSxLQUFLLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxPQUFPO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7UUFDekMsSUFBSSxDQUFDLElB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Q0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDOztnQkF2S3NCLFVBQVU7Z0JBQW1CLFNBQVM7Z0JBQWEsaUJBQWlCOztJQTFDbEY7UUFBUixLQUFLLEVBQUU7NENBQWU7SUFFZDtRQUFSLEtBQUssRUFBRTswQ0FBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7MkNBQVk7SUFFWDtRQUFSLEtBQUssRUFBRTtnREFBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7OENBQWU7SUFFZDtRQUFSLEtBQUssRUFBRTs0Q0FBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7b0RBQStCO0lBRTlCO1FBQVIsS0FBSyxFQUFFO2dEQUE0QjtJQUUzQjtRQUFSLEtBQUssRUFBRTtnREFBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7bURBQStCO0lBcEI5QixRQUFRO1FBakNwQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsODRFQTRCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxRQUFRLENBcU5wQjtJQUFELGVBQUM7Q0FBQSxBQXJORCxJQXFOQztTQXJOWSxRQUFRO0FBNE5yQjtJQUFBO0lBQThCLENBQUM7SUFBbEIsY0FBYztRQUwxQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ25CLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUMzQixDQUFDO09BQ1csY0FBYyxDQUFJO0lBQUQscUJBQUM7Q0FBQSxBQUEvQixJQUErQjtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixJbnB1dCxSZW5kZXJlcjIsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1saWdodGJveCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiICpuZ0lmPVwiKHR5cGUgPT0gJ2ltYWdlJylcIj5cclxuICAgICAgICAgICAgPGEgKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlczsgbGV0IGkgPSBpbmRleDtcIiBbaHJlZl09XCJpbWFnZS5zb3VyY2VcIiAoY2xpY2spPVwib25JbWFnZUNsaWNrKCRldmVudCxpbWFnZSxpLGNvbnRlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2UudGh1bWJuYWlsXCIgW3RpdGxlXT1cImltYWdlLnRpdGxlXCIgW2FsdF09XCJpbWFnZS5hbHRcIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cIih0eXBlID09ICdjb250ZW50JylcIiAoY2xpY2spPVwib25MaW5rQ2xpY2soJGV2ZW50LGNvbnRlbnQpXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImFcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saWdodGJveCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3dcIiBbc3R5bGUuZGlzcGxheV09XCJ2aXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJ1wiIFtzdHlsZS56SW5kZXhdPVwiemluZGV4XCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1saWdodGJveC1sb2FkaW5nJzogbG9hZGluZ31cIlxyXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvblByb3BlcnR5XT1cIidhbGwnXCIgW3N0eWxlLnRyYW5zaXRpb25EdXJhdGlvbl09XCJlZmZlY3REdXJhdGlvblwiIFtzdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25dPVwiZWFzaW5nXCIgKGNsaWNrKT1cInByZXZlbnREb2N1bWVudENsaWNrTGlzdGVuZXI9dHJ1ZVwiPlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saWdodGJveC1jb250ZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInVpLXN0YXRlLWRlZmF1bHQgdWktbGlnaHRib3gtbmF2LWxlZnQgdWktY29ybmVyLXJpZ2h0XCIgW3N0eWxlLnpJbmRleF09XCJ6aW5kZXggKyAxXCIgKGNsaWNrKT1cInByZXYoaW1nKVwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiFsZWZ0VmlzaWJsZX1cIj48c3BhbiBjbGFzcz1cInVpLWxpZ2h0Ym94LW5hdi1pY29uIHBpIHBpLWNoZXZyb24tbGVmdFwiPjwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInVpLWxpZ2h0Ym94LWNvbnRlbnQgdWktY29ybmVyLWFsbFwiIFxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eV09XCInd2lkdGgsaGVpZ2h0J1wiIFtzdHlsZS50cmFuc2l0aW9uRHVyYXRpb25dPVwiZWZmZWN0RHVyYXRpb25cIiBbc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uXT1cImVhc2luZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGltZyAjaW1nIFtzcmNdPVwiY3VycmVudEltYWdlID8gY3VycmVudEltYWdlLnNvdXJjZXx8JycgOiAnJ1wiIChsb2FkKT1cIm9uSW1hZ2VMb2FkKCRldmVudCxjb250ZW50KVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJ1aS1zdGF0ZS1kZWZhdWx0IHVpLWxpZ2h0Ym94LW5hdi1yaWdodCB1aS1jb3JuZXItbGVmdCB1aS1oZWxwZXItaGlkZGVuXCIgW3N0eWxlLnpJbmRleF09XCJ6aW5kZXggKyAxXCIgKGNsaWNrKT1cIm5leHQoaW1nKVwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiFyaWdodFZpc2libGV9XCI+PHNwYW4gY2xhc3M9XCJ1aS1saWdodGJveC1uYXYtaWNvbiBwaSBwaS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPjwvYT5cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktbGlnaHRib3gtY2FwdGlvbiB1aS13aWRnZXQtaGVhZGVyXCIgW3N0eWxlLmRpc3BsYXldPVwiY2FwdGlvblRleHQgPyAnYmxvY2snIDogJ25vbmUnXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1saWdodGJveC1jYXB0aW9uLXRleHRcIj57e2NhcHRpb25UZXh0fX08L3NwYW4+PGEgY2xhc3M9XCJ1aS1saWdodGJveC1jbG9zZSB1aS1jb3JuZXItYWxsXCIgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImhpZGUoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImhpZGUoJGV2ZW50KVwiPjxzcGFuIGNsYXNzPVwicGkgcGktdGltZXNcIj48L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJjbGVhcjpib3RoXCI+PC9kaXY+XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWdodGJveCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBpbWFnZXM6IGFueVtdO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAnaW1hZ2UnO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcbiAgICAgICAgXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGVhc2luZzogJ2Vhc2Utb3V0JztcclxuICAgIFxyXG4gICAgQElucHV0KCkgZWZmZWN0RHVyYXRpb246IGFueSA9ICc1MDBtcyc7XHJcblxyXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIEBJbnB1dCgpIGNsb3NlT25Fc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHB1YmxpYyB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgbG9hZGluZzogYm9vbGVhbjtcclxuICAgICAgICBcclxuICAgIHB1YmxpYyBjdXJyZW50SW1hZ2U6IGFueTtcclxuICAgIFxyXG4gICAgcHVibGljIGNhcHRpb25UZXh0OiBzdHJpbmc7XHJcbiAgICBcclxuICAgIHB1YmxpYyB6aW5kZXg6IGFueTtcclxuICAgIFxyXG4gICAgcHVibGljIHBhbmVsOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbmRleDogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgbWFzazogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgcHJldmVudERvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgcHVibGljIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIHB1YmxpYyBkb2N1bWVudEVzY2FwZUxpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgb25JbWFnZUNsaWNrKGV2ZW50LGltYWdlLGksY29udGVudCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgY29udGVudC5zdHlsZS53aWR0aCA9IDMyICsgJ3B4JztcclxuICAgICAgICBjb250ZW50LnN0eWxlLmhlaWdodCA9IDMyICsgJ3B4JztcclxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUltYWdlKGltYWdlKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICcudWktbGlnaHRib3ggJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCwgdGhpcy5hcHBlbmRUbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkxpbmtDbGljayhldmVudCxjb250ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkaXNwbGF5SW1hZ2UoaW1hZ2UpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2UgPSBpbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IGltYWdlLnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlcigpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMubWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMubWFzaywgJ3VpLXdpZGdldC1vdmVybGF5IHVpLWRpYWxvZy1tYXNrJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1hc2spO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy56aW5kZXggPSB0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFzay5zdHlsZS56SW5kZXggPSB0aGlzLnppbmRleCAtIDE7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIoKTtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYmluZEdsb2JhbExpc3RlbmVycygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoaWRlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1hc2spO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVuYmluZEdsb2JhbExpc3RlbmVycygpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNlbnRlcigpIHtcclxuICAgICAgICBsZXQgZWxlbWVudFdpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMucGFuZWwpO1xyXG4gICAgICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnBhbmVsKTtcclxuICAgICAgICBpZiAoZWxlbWVudFdpZHRoID09IDAgJiYgZWxlbWVudEhlaWdodCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBlbGVtZW50V2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5wYW5lbCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnRIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMucGFuZWwpO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBvbkltYWdlTG9hZChldmVudCxjb250ZW50KSB7XHJcbiAgICAgICAgbGV0IGltYWdlID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGltYWdlLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgICBpbWFnZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBsZXQgaW1hZ2VXaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aChpbWFnZSk7XHJcbiAgICAgICAgbGV0IGltYWdlSGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodChpbWFnZSk7XHJcbiAgICAgICAgaW1hZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBpbWFnZS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG5cclxuICAgICAgICBjb250ZW50LnN0eWxlLndpZHRoID0gaW1hZ2VXaWR0aCArICdweCc7XHJcbiAgICAgICAgY29udGVudC5zdHlsZS5oZWlnaHQgPSBpbWFnZUhlaWdodCArICdweCc7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS5sZWZ0KSArIChEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5wYW5lbCkgLSBpbWFnZVdpZHRoKSAvIDIgKyAncHgnO1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUudG9wID0gcGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS50b3ApICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5wYW5lbCkgLSBpbWFnZUhlaWdodCkgLyAyICsgJ3B4JztcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZmFkZUluKGltYWdlLCA1MDApO1xyXG4gICAgICAgICAgICBpbWFnZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgLy90aGlzLmNhcHRpb25UZXh0ID0gdGhpcy5jdXJyZW50SW1hZ2UudGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHBhcnNlSW50KHRoaXMuZWZmZWN0RHVyYXRpb24pKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJldihwbGFjZWhvbGRlcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBwbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGlmICh0aGlzLmluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJbWFnZSh0aGlzLmltYWdlc1stLXRoaXMuaW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5leHQocGxhY2Vob2xkZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2FwdGlvblRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgcGxhY2Vob2xkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBpZiAodGhpcy5pbmRleCA8PSAodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SW1hZ2UodGhpcy5pbWFnZXNbKyt0aGlzLmluZGV4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmRHbG9iYWxMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZlbnREb2N1bWVudENsaWNrTGlzdGVuZXImJnRoaXMudmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudENsaWNrTGlzdGVuZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5jbG9zZU9uRXNjYXBlICYmICF0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMjcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS56SW5kZXgpID09PSAoRG9tSGFuZGxlci56aW5kZXggKyB0aGlzLmJhc2VaSW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kR2xvYmFsTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgZ2V0IGxlZnRWaXNpYmxlKCk6Ym9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzICYmIHRoaXMuaW1hZ2VzLmxlbmd0aCAmJiB0aGlzLmluZGV4ICE9IDAgJiYgIXRoaXMubG9hZGluZzsgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCByaWdodFZpc2libGUoKTpib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZXMgJiYgdGhpcy5pbWFnZXMubGVuZ3RoICYmIHRoaXMuaW5kZXggPCAodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkgJiYgIXRoaXMubG9hZGluZzsgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICBcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0xpZ2h0Ym94XSxcclxuICAgIGRlY2xhcmF0aW9uczogW0xpZ2h0Ym94XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3hNb2R1bGUgeyB9XHJcbiJdfQ==