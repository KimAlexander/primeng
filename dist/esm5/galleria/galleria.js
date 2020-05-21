var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewChecked, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var Galleria = /** @class */ (function () {
    function Galleria(el) {
        this.el = el;
        this.panelWidth = 600;
        this.panelHeight = 400;
        this.frameWidth = 60;
        this.frameHeight = 40;
        this.activeIndex = 0;
        this.showFilmstrip = true;
        this.autoPlay = true;
        this.transitionInterval = 4000;
        this.showCaption = true;
        this.effectDuration = 500;
        this.onImageClicked = new EventEmitter();
        this.onImageChange = new EventEmitter();
        this.stripLeft = 0;
    }
    Galleria.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.imagesChanged) {
            this.stopSlideshow();
            Promise.resolve(null).then(function () {
                _this.render();
                _this.imagesChanged = false;
            });
        }
    };
    Object.defineProperty(Galleria.prototype, "images", {
        get: function () {
            return this._images;
        },
        set: function (value) {
            this._images = value;
            this.imagesChanged = true;
            if (this.initialized) {
                this.activeIndex = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Galleria.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        this.panelWrapper = DomHandler.findSingle(this.el.nativeElement, 'ul.ui-galleria-panel-wrapper');
        this.initialized = true;
        if (this.showFilmstrip) {
            this.stripWrapper = DomHandler.findSingle(this.container, 'div.ui-galleria-filmstrip-wrapper');
            this.strip = DomHandler.findSingle(this.stripWrapper, 'ul.ui-galleria-filmstrip');
        }
        if (this.images && this.images.length) {
            this.render();
        }
    };
    Galleria.prototype.render = function () {
        this.panels = DomHandler.find(this.panelWrapper, 'li.ui-galleria-panel');
        if (this.showFilmstrip) {
            this.frames = DomHandler.find(this.strip, 'li.ui-galleria-frame');
            this.stripWrapper.style.width = DomHandler.width(this.panelWrapper) - 50 + 'px';
            this.stripWrapper.style.height = this.frameHeight + 'px';
        }
        if (this.showCaption) {
            this.caption = DomHandler.findSingle(this.container, 'div.ui-galleria-caption');
            this.caption.style.bottom = this.showFilmstrip ? DomHandler.getOuterHeight(this.stripWrapper, true) + 'px' : 0 + 'px';
            this.caption.style.width = DomHandler.width(this.panelWrapper) + 'px';
        }
        if (this.autoPlay) {
            this.startSlideshow();
        }
        this.container.style.visibility = 'visible';
    };
    Galleria.prototype.startSlideshow = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.next();
        }, this.transitionInterval);
        this.slideshowActive = true;
    };
    Galleria.prototype.stopSlideshow = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.slideshowActive = false;
    };
    Galleria.prototype.clickNavRight = function () {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.next();
    };
    Galleria.prototype.clickNavLeft = function () {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.prev();
    };
    Galleria.prototype.frameClick = function (frame) {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.select(DomHandler.index(frame), false);
    };
    Galleria.prototype.prev = function () {
        if (this.activeIndex !== 0) {
            this.select(this.activeIndex - 1, true);
        }
    };
    Galleria.prototype.next = function () {
        if (this.activeIndex !== (this.panels.length - 1)) {
            this.select(this.activeIndex + 1, true);
        }
        else {
            this.select(0, false);
            this.stripLeft = 0;
        }
    };
    Galleria.prototype.select = function (index, reposition) {
        if (index !== this.activeIndex) {
            var oldPanel = this.panels[this.activeIndex], newPanel = this.panels[index];
            DomHandler.fadeIn(newPanel, this.effectDuration);
            if (this.showFilmstrip) {
                var oldFrame = this.frames[this.activeIndex], newFrame = this.frames[index];
                if (reposition === undefined || reposition === true) {
                    var frameLeft = newFrame.offsetLeft, stepFactor = this.frameWidth + parseInt(getComputedStyle(newFrame)['margin-right'], 10), stripLeft = this.strip.offsetLeft, frameViewportLeft = frameLeft + stripLeft, frameViewportRight = frameViewportLeft + this.frameWidth;
                    if (frameViewportRight > DomHandler.width(this.stripWrapper))
                        this.stripLeft -= stepFactor;
                    else if (frameViewportLeft < 0)
                        this.stripLeft += stepFactor;
                }
            }
            this.activeIndex = index;
            this.onImageChange.emit({ index: index });
        }
    };
    Galleria.prototype.clickImage = function (event, image, i) {
        this.onImageClicked.emit({ originalEvent: event, image: image, index: i });
    };
    Galleria.prototype.ngOnDestroy = function () {
        this.stopSlideshow();
    };
    Galleria.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], Galleria.prototype, "style", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "panelWidth", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "panelHeight", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "frameWidth", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "frameHeight", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "activeIndex", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "showFilmstrip", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "autoPlay", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "transitionInterval", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "showCaption", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "effectDuration", void 0);
    __decorate([
        Output()
    ], Galleria.prototype, "onImageClicked", void 0);
    __decorate([
        Output()
    ], Galleria.prototype, "onImageChange", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "images", null);
    Galleria = __decorate([
        Component({
            selector: 'p-galleria',
            template: "\n        <div [ngClass]=\"{'ui-galleria ui-widget ui-widget-content ui-corner-all':true}\" [ngStyle]=\"style\" [class]=\"styleClass\" [style.width.px]=\"panelWidth\">\n            <ul class=\"ui-galleria-panel-wrapper\" [style.width.px]=\"panelWidth\" [style.height.px]=\"panelHeight\">\n                <li *ngFor=\"let image of images;let i=index\" class=\"ui-galleria-panel\" [ngClass]=\"{'ui-helper-hidden':i!=activeIndex}\"\n                    [style.width.px]=\"panelWidth\" [style.height.px]=\"panelHeight\" (click)=\"clickImage($event,image,i)\">\n                    <img class=\"ui-panel-images\" [src]=\"image.source\" [alt]=\"image.alt\" [title]=\"image.title\"/>\n                </li>\n            </ul>\n            <div [ngClass]=\"{'ui-galleria-filmstrip-wrapper':true}\" *ngIf=\"showFilmstrip\">\n                <ul class=\"ui-galleria-filmstrip\" style=\"transition:left 1s\" [style.left.px]=\"stripLeft\">\n                    <li #frame *ngFor=\"let image of images;let i=index\" [ngClass]=\"{'ui-galleria-frame-active':i==activeIndex}\" class=\"ui-galleria-frame\" (click)=\"frameClick(frame)\"\n                        [style.width.px]=\"frameWidth\" [style.height.px]=\"frameHeight\" [style.transition]=\"'opacity 0.75s ease'\">\n                        <div class=\"ui-galleria-frame-content\">\n                            <img [src]=\"image.source\" [alt]=\"image.alt\" [title]=\"image.title\" class=\"ui-galleria-frame-image\"\n                                [style.width.px]=\"frameWidth\" [style.height.px]=\"frameHeight\">\n                        </div>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"ui-galleria-nav-prev pi pi-fw pi-chevron-left\" (click)=\"clickNavLeft()\" [style.bottom.px]=\"frameHeight/2\" *ngIf=\"activeIndex !== 0\"></div>\n            <div class=\"ui-galleria-nav-next pi pi-fw pi-chevron-right\" (click)=\"clickNavRight()\" [style.bottom.px]=\"frameHeight/2\"></div>\n            <div class=\"ui-galleria-caption\" *ngIf=\"showCaption&&images\" style=\"display:block\">\n                <h4>{{images[activeIndex]?.title}}</h4><p>{{images[activeIndex]?.alt}}</p>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Galleria);
    return Galleria;
}());
export { Galleria };
var GalleriaModule = /** @class */ (function () {
    function GalleriaModule() {
    }
    GalleriaModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Galleria],
            declarations: [Galleria]
        })
    ], GalleriaModule);
    return GalleriaModule;
}());
export { GalleriaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyaWEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2dhbGxlcmlhLyIsInNvdXJjZXMiOlsiZ2FsbGVyaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkosT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFnQ3ZDO0lBd0RJLGtCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWxEeEIsZUFBVSxHQUFXLEdBQUcsQ0FBQztRQUV6QixnQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUUxQixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBRXpCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRTlCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBRWxDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLG1CQUFjLEdBQVcsR0FBRyxDQUFDO1FBRTVCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFzQnRDLGNBQVMsR0FBVyxDQUFDLENBQUM7SUFNTyxDQUFDO0lBRXJDLHFDQUFrQixHQUFsQjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FB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QUFSLEtBQUssRUFBRTt3REFBbUM7SUFFbEM7UUFBUixLQUFLLEVBQUU7aURBQTZCO0lBRTVCO1FBQVIsS0FBSyxFQUFFO29EQUE4QjtJQUU1QjtRQUFULE1BQU0sRUFBRTtvREFBcUM7SUFFcEM7UUFBVCxNQUFNLEVBQUU7bURBQW9DO0lBd0NwQztRQUFSLEtBQUssRUFBRTswQ0FFUDtJQXRFUSxRQUFRO1FBOUJwQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsd3FFQXlCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxRQUFRLENBa05wQjtJQUFELGVBQUM7Q0FBQSxBQWxORCxJQWtOQztTQWxOWSxRQUFRO0FBeU5yQjtJQUFBO0lBQThCLENBQUM7SUFBbEIsY0FBYztRQUwxQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ25CLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUMzQixDQUFDO09BQ1csY0FBYyxDQUFJO0lBQUQscUJBQUM7Q0FBQSxBQUEvQixJQUErQjtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdDaGVja2VkLEFmdGVyVmlld0luaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1nYWxsZXJpYScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1nYWxsZXJpYSB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc6dHJ1ZX1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW3N0eWxlLndpZHRoLnB4XT1cInBhbmVsV2lkdGhcIj5cclxuICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktZ2FsbGVyaWEtcGFuZWwtd3JhcHBlclwiIFtzdHlsZS53aWR0aC5weF09XCJwYW5lbFdpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJwYW5lbEhlaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpbWFnZSBvZiBpbWFnZXM7bGV0IGk9aW5kZXhcIiBjbGFzcz1cInVpLWdhbGxlcmlhLXBhbmVsXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzppIT1hY3RpdmVJbmRleH1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJwYW5lbFdpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJwYW5lbEhlaWdodFwiIChjbGljayk9XCJjbGlja0ltYWdlKCRldmVudCxpbWFnZSxpKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJ1aS1wYW5lbC1pbWFnZXNcIiBbc3JjXT1cImltYWdlLnNvdXJjZVwiIFthbHRdPVwiaW1hZ2UuYWx0XCIgW3RpdGxlXT1cImltYWdlLnRpdGxlXCIvPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLWdhbGxlcmlhLWZpbG1zdHJpcC13cmFwcGVyJzp0cnVlfVwiICpuZ0lmPVwic2hvd0ZpbG1zdHJpcFwiPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktZ2FsbGVyaWEtZmlsbXN0cmlwXCIgc3R5bGU9XCJ0cmFuc2l0aW9uOmxlZnQgMXNcIiBbc3R5bGUubGVmdC5weF09XCJzdHJpcExlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgI2ZyYW1lICpuZ0Zvcj1cImxldCBpbWFnZSBvZiBpbWFnZXM7bGV0IGk9aW5kZXhcIiBbbmdDbGFzc109XCJ7J3VpLWdhbGxlcmlhLWZyYW1lLWFjdGl2ZSc6aT09YWN0aXZlSW5kZXh9XCIgY2xhc3M9XCJ1aS1nYWxsZXJpYS1mcmFtZVwiIChjbGljayk9XCJmcmFtZUNsaWNrKGZyYW1lKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJmcmFtZVdpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJmcmFtZUhlaWdodFwiIFtzdHlsZS50cmFuc2l0aW9uXT1cIidvcGFjaXR5IDAuNzVzIGVhc2UnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nYWxsZXJpYS1mcmFtZS1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2Uuc291cmNlXCIgW2FsdF09XCJpbWFnZS5hbHRcIiBbdGl0bGVdPVwiaW1hZ2UudGl0bGVcIiBjbGFzcz1cInVpLWdhbGxlcmlhLWZyYW1lLWltYWdlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwiZnJhbWVXaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiZnJhbWVIZWlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ2FsbGVyaWEtbmF2LXByZXYgcGkgcGktZncgcGktY2hldnJvbi1sZWZ0XCIgKGNsaWNrKT1cImNsaWNrTmF2TGVmdCgpXCIgW3N0eWxlLmJvdHRvbS5weF09XCJmcmFtZUhlaWdodC8yXCIgKm5nSWY9XCJhY3RpdmVJbmRleCAhPT0gMFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ2FsbGVyaWEtbmF2LW5leHQgcGkgcGktZncgcGktY2hldnJvbi1yaWdodFwiIChjbGljayk9XCJjbGlja05hdlJpZ2h0KClcIiBbc3R5bGUuYm90dG9tLnB4XT1cImZyYW1lSGVpZ2h0LzJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWdhbGxlcmlhLWNhcHRpb25cIiAqbmdJZj1cInNob3dDYXB0aW9uJiZpbWFnZXNcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj5cclxuICAgICAgICAgICAgICAgIDxoND57e2ltYWdlc1thY3RpdmVJbmRleF0/LnRpdGxlfX08L2g0PjxwPnt7aW1hZ2VzW2FjdGl2ZUluZGV4XT8uYWx0fX08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FsbGVyaWEgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcclxuICAgICAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHBhbmVsV2lkdGg6IG51bWJlciA9IDYwMDtcclxuXHJcbiAgICBASW5wdXQoKSBwYW5lbEhlaWdodDogbnVtYmVyID0gNDAwO1xyXG5cclxuICAgIEBJbnB1dCgpIGZyYW1lV2lkdGg6IG51bWJlciA9IDYwO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBmcmFtZUhlaWdodDogbnVtYmVyID0gNDA7XHJcblxyXG4gICAgQElucHV0KCkgYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQElucHV0KCkgc2hvd0ZpbG1zdHJpcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgYXV0b1BsYXk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25JbnRlcnZhbDogbnVtYmVyID0gNDAwMDtcclxuXHJcbiAgICBASW5wdXQoKSBzaG93Q2FwdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgZWZmZWN0RHVyYXRpb246IG51bWJlciA9IDUwMDtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uSW1hZ2VDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkltYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBfaW1hZ2VzOiBhbnlbXTtcclxuICAgIFxyXG4gICAgc2xpZGVzaG93QWN0aXZlOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY29udGFpbmVyOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBwYW5lbFdyYXBwZXI6IGFueTtcclxuICAgIFxyXG4gICAgcHVibGljIHBhbmVsczogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY2FwdGlvbjogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RyaXBXcmFwcGVyOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdHJpcDogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZnJhbWVzOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbnRlcnZhbDogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RyaXBMZWZ0OiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgaW1hZ2VzQ2hhbmdlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgcHVibGljIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuICAgIFxyXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmltYWdlc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVzaG93KCk7XHJcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlc0NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBpbWFnZXMoKTogYW55W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZXM7XHJcbiAgICB9XHJcbiAgICBzZXQgaW1hZ2VzKHZhbHVlOmFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbWFnZXNDaGFuZ2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIHRoaXMucGFuZWxXcmFwcGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VsLnVpLWdhbGxlcmlhLXBhbmVsLXdyYXBwZXInKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zaG93RmlsbXN0cmlwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaXBXcmFwcGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCdkaXYudWktZ2FsbGVyaWEtZmlsbXN0cmlwLXdyYXBwZXInKTtcclxuICAgICAgICAgICAgdGhpcy5zdHJpcCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnN0cmlwV3JhcHBlciwndWwudWktZ2FsbGVyaWEtZmlsbXN0cmlwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbHMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5wYW5lbFdyYXBwZXIsICdsaS51aS1nYWxsZXJpYS1wYW5lbCcpOyBcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zaG93RmlsbXN0cmlwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuc3RyaXAsJ2xpLnVpLWdhbGxlcmlhLWZyYW1lJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaXBXcmFwcGVyLnN0eWxlLndpZHRoID0gRG9tSGFuZGxlci53aWR0aCh0aGlzLnBhbmVsV3JhcHBlcikgLSA1MCArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaXBXcmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuZnJhbWVIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zaG93Q2FwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmNhcHRpb24gPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsJ2Rpdi51aS1nYWxsZXJpYS1jYXB0aW9uJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FwdGlvbi5zdHlsZS5ib3R0b20gPSB0aGlzLnNob3dGaWxtc3RyaXAgPyBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuc3RyaXBXcmFwcGVyLHRydWUpICsgJ3B4JyA6IDAgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmNhcHRpb24uc3R5bGUud2lkdGggPSBEb21IYW5kbGVyLndpZHRoKHRoaXMucGFuZWxXcmFwcGVyKSArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICBcclxuICAgICAgICBpZiAodGhpcy5hdXRvUGxheSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2xpZGVzaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXJ0U2xpZGVzaG93KCkge1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgIH0sIHRoaXMudHJhbnNpdGlvbkludGVydmFsKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNsaWRlc2hvd0FjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBzdG9wU2xpZGVzaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2xpZGVzaG93QWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsaWNrTmF2UmlnaHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzaG93QWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFNsaWRlc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGNsaWNrTmF2TGVmdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zbGlkZXNob3dBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVzaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJldigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmcmFtZUNsaWNrKGZyYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzaG93QWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFNsaWRlc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNlbGVjdChEb21IYW5kbGVyLmluZGV4KGZyYW1lKSwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcmV2KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuYWN0aXZlSW5kZXggLSAxLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggIT09ICh0aGlzLnBhbmVscy5sZW5ndGgtMSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QodGhpcy5hY3RpdmVJbmRleCArIDEsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnN0cmlwTGVmdCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgc2VsZWN0KGluZGV4LCByZXBvc2l0aW9uKSB7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSB0aGlzLmFjdGl2ZUluZGV4KSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBvbGRQYW5lbCA9IHRoaXMucGFuZWxzW3RoaXMuYWN0aXZlSW5kZXhdLFxyXG4gICAgICAgICAgICBuZXdQYW5lbCA9IHRoaXMucGFuZWxzW2luZGV4XTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZmFkZUluKG5ld1BhbmVsLCB0aGlzLmVmZmVjdER1cmF0aW9uKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dGaWxtc3RyaXApIHtcclxuICAgICAgICAgICAgICAgIGxldCBvbGRGcmFtZSA9IHRoaXMuZnJhbWVzW3RoaXMuYWN0aXZlSW5kZXhdLFxyXG4gICAgICAgICAgICAgICAgbmV3RnJhbWUgPSB0aGlzLmZyYW1lc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChyZXBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcmVwb3NpdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmcmFtZUxlZnQgPSBuZXdGcmFtZS5vZmZzZXRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBGYWN0b3IgPSB0aGlzLmZyYW1lV2lkdGggKyBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKG5ld0ZyYW1lKVsnbWFyZ2luLXJpZ2h0J10sIDEwKSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJpcExlZnQgPSB0aGlzLnN0cmlwLm9mZnNldExlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVWaWV3cG9ydExlZnQgPSBmcmFtZUxlZnQgKyBzdHJpcExlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVWaWV3cG9ydFJpZ2h0ID0gZnJhbWVWaWV3cG9ydExlZnQgKyB0aGlzLmZyYW1lV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lVmlld3BvcnRSaWdodCA+IERvbUhhbmRsZXIud2lkdGgodGhpcy5zdHJpcFdyYXBwZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0cmlwTGVmdCAtPSBzdGVwRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZyYW1lVmlld3BvcnRMZWZ0IDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHJpcExlZnQgKz0gc3RlcEZhY3RvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vbkltYWdlQ2hhbmdlLmVtaXQoe2luZGV4OiBpbmRleH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xpY2tJbWFnZShldmVudCwgaW1hZ2UsIGkpIHtcclxuICAgICAgICB0aGlzLm9uSW1hZ2VDbGlja2VkLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbWFnZTogaW1hZ2UsIGluZGV4OiBpfSlcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcFNsaWRlc2hvdygpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0dhbGxlcmlhXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0dhbGxlcmlhXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFNb2R1bGUgeyB9Il19