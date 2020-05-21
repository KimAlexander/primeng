var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewChecked, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let Galleria = class Galleria {
    constructor(el) {
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
    ngAfterViewChecked() {
        if (this.imagesChanged) {
            this.stopSlideshow();
            Promise.resolve(null).then(() => {
                this.render();
                this.imagesChanged = false;
            });
        }
    }
    get images() {
        return this._images;
    }
    set images(value) {
        this._images = value;
        this.imagesChanged = true;
        if (this.initialized) {
            this.activeIndex = 0;
        }
    }
    ngAfterViewInit() {
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
    }
    render() {
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
    }
    startSlideshow() {
        this.interval = setInterval(() => {
            this.next();
        }, this.transitionInterval);
        this.slideshowActive = true;
    }
    stopSlideshow() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.slideshowActive = false;
    }
    clickNavRight() {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.next();
    }
    clickNavLeft() {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.prev();
    }
    frameClick(frame) {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.select(DomHandler.index(frame), false);
    }
    prev() {
        if (this.activeIndex !== 0) {
            this.select(this.activeIndex - 1, true);
        }
    }
    next() {
        if (this.activeIndex !== (this.panels.length - 1)) {
            this.select(this.activeIndex + 1, true);
        }
        else {
            this.select(0, false);
            this.stripLeft = 0;
        }
    }
    select(index, reposition) {
        if (index !== this.activeIndex) {
            let oldPanel = this.panels[this.activeIndex], newPanel = this.panels[index];
            DomHandler.fadeIn(newPanel, this.effectDuration);
            if (this.showFilmstrip) {
                let oldFrame = this.frames[this.activeIndex], newFrame = this.frames[index];
                if (reposition === undefined || reposition === true) {
                    let frameLeft = newFrame.offsetLeft, stepFactor = this.frameWidth + parseInt(getComputedStyle(newFrame)['margin-right'], 10), stripLeft = this.strip.offsetLeft, frameViewportLeft = frameLeft + stripLeft, frameViewportRight = frameViewportLeft + this.frameWidth;
                    if (frameViewportRight > DomHandler.width(this.stripWrapper))
                        this.stripLeft -= stepFactor;
                    else if (frameViewportLeft < 0)
                        this.stripLeft += stepFactor;
                }
            }
            this.activeIndex = index;
            this.onImageChange.emit({ index: index });
        }
    }
    clickImage(event, image, i) {
        this.onImageClicked.emit({ originalEvent: event, image: image, index: i });
    }
    ngOnDestroy() {
        this.stopSlideshow();
    }
};
Galleria.ctorParameters = () => [
    { type: ElementRef }
];
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
        template: `
        <div [ngClass]="{'ui-galleria ui-widget ui-widget-content ui-corner-all':true}" [ngStyle]="style" [class]="styleClass" [style.width.px]="panelWidth">
            <ul class="ui-galleria-panel-wrapper" [style.width.px]="panelWidth" [style.height.px]="panelHeight">
                <li *ngFor="let image of images;let i=index" class="ui-galleria-panel" [ngClass]="{'ui-helper-hidden':i!=activeIndex}"
                    [style.width.px]="panelWidth" [style.height.px]="panelHeight" (click)="clickImage($event,image,i)">
                    <img class="ui-panel-images" [src]="image.source" [alt]="image.alt" [title]="image.title"/>
                </li>
            </ul>
            <div [ngClass]="{'ui-galleria-filmstrip-wrapper':true}" *ngIf="showFilmstrip">
                <ul class="ui-galleria-filmstrip" style="transition:left 1s" [style.left.px]="stripLeft">
                    <li #frame *ngFor="let image of images;let i=index" [ngClass]="{'ui-galleria-frame-active':i==activeIndex}" class="ui-galleria-frame" (click)="frameClick(frame)"
                        [style.width.px]="frameWidth" [style.height.px]="frameHeight" [style.transition]="'opacity 0.75s ease'">
                        <div class="ui-galleria-frame-content">
                            <img [src]="image.source" [alt]="image.alt" [title]="image.title" class="ui-galleria-frame-image"
                                [style.width.px]="frameWidth" [style.height.px]="frameHeight">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="ui-galleria-nav-prev pi pi-fw pi-chevron-left" (click)="clickNavLeft()" [style.bottom.px]="frameHeight/2" *ngIf="activeIndex !== 0"></div>
            <div class="ui-galleria-nav-next pi pi-fw pi-chevron-right" (click)="clickNavRight()" [style.bottom.px]="frameHeight/2"></div>
            <div class="ui-galleria-caption" *ngIf="showCaption&&images" style="display:block">
                <h4>{{images[activeIndex]?.title}}</h4><p>{{images[activeIndex]?.alt}}</p>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Galleria);
export { Galleria };
let GalleriaModule = class GalleriaModule {
};
GalleriaModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Galleria],
        declarations: [Galleria]
    })
], GalleriaModule);
export { GalleriaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyaWEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2dhbGxlcmlhLyIsInNvdXJjZXMiOlsiZ2FsbGVyaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkosT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFnQ3ZDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUF3RGpCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBbER4QixlQUFVLEdBQVcsR0FBRyxDQUFDO1FBRXpCLGdCQUFXLEdBQVcsR0FBRyxDQUFDO1FBRTFCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFFekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFOUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6Qix1QkFBa0IsR0FBVyxJQUFJLENBQUM7UUFFbEMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsbUJBQWMsR0FBVyxHQUFHLENBQUM7UUFFNUIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXBDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXNCdEMsY0FBUyxHQUFXLENBQUMsQ0FBQztJQU1PLENBQUM7SUFFckMsa0JBQWtCO1FBQ2QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixPQUFPLENBQUMsT0FBTyxDQUFD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QUU1QjtJQUFSLEtBQUssRUFBRTtnREFBOEI7QUFFNUI7SUFBVCxNQUFNLEVBQUU7Z0RBQXFDO0FBRXBDO0lBQVQsTUFBTSxFQUFFOytDQUFvQztBQXdDcEM7SUFBUixLQUFLLEVBQUU7c0NBRVA7QUF0RVEsUUFBUTtJQTlCcEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBeUJUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87S0FDbkQsQ0FBQztHQUNXLFFBQVEsQ0FrTnBCO1NBbE5ZLFFBQVE7QUF5TnJCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBSSxDQUFBO0FBQWxCLGNBQWM7SUFMMUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdDaGVja2VkLEFmdGVyVmlld0luaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1nYWxsZXJpYScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1nYWxsZXJpYSB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc6dHJ1ZX1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW3N0eWxlLndpZHRoLnB4XT1cInBhbmVsV2lkdGhcIj5cclxuICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktZ2FsbGVyaWEtcGFuZWwtd3JhcHBlclwiIFtzdHlsZS53aWR0aC5weF09XCJwYW5lbFdpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJwYW5lbEhlaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpbWFnZSBvZiBpbWFnZXM7bGV0IGk9aW5kZXhcIiBjbGFzcz1cInVpLWdhbGxlcmlhLXBhbmVsXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzppIT1hY3RpdmVJbmRleH1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJwYW5lbFdpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJwYW5lbEhlaWdodFwiIChjbGljayk9XCJjbGlja0ltYWdlKCRldmVudCxpbWFnZSxpKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJ1aS1wYW5lbC1pbWFnZXNcIiBbc3JjXT1cImltYWdlLnNvdXJjZVwiIFthbHRdPVwiaW1hZ2UuYWx0XCIgW3RpdGxlXT1cImltYWdlLnRpdGxlXCIvPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLWdhbGxlcmlhLWZpbG1zdHJpcC13cmFwcGVyJzp0cnVlfVwiICpuZ0lmPVwic2hvd0ZpbG1zdHJpcFwiPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktZ2FsbGVyaWEtZmlsbXN0cmlwXCIgc3R5bGU9XCJ0cmFuc2l0aW9uOmxlZnQgMXNcIiBbc3R5bGUubGVmdC5weF09XCJzdHJpcExlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgI2ZyYW1lICpuZ0Zvcj1cImxldCBpbWFnZSBvZiBpbWFnZXM7bGV0IGk9aW5kZXhcIiBbbmdDbGFzc109XCJ7J3VpLWdhbGxlcmlhLWZyYW1lLWFjdGl2ZSc6aT09YWN0aXZlSW5kZXh9XCIgY2xhc3M9XCJ1aS1nYWxsZXJpYS1mcmFtZVwiIChjbGljayk9XCJmcmFtZUNsaWNrKGZyYW1lKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJmcmFtZVdpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJmcmFtZUhlaWdodFwiIFtzdHlsZS50cmFuc2l0aW9uXT1cIidvcGFjaXR5IDAuNzVzIGVhc2UnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nYWxsZXJpYS1mcmFtZS1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2Uuc291cmNlXCIgW2FsdF09XCJpbWFnZS5hbHRcIiBbdGl0bGVdPVwiaW1hZ2UudGl0bGVcIiBjbGFzcz1cInVpLWdhbGxlcmlhLWZyYW1lLWltYWdlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwiZnJhbWVXaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiZnJhbWVIZWlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ2FsbGVyaWEtbmF2LXByZXYgcGkgcGktZncgcGktY2hldnJvbi1sZWZ0XCIgKGNsaWNrKT1cImNsaWNrTmF2TGVmdCgpXCIgW3N0eWxlLmJvdHRvbS5weF09XCJmcmFtZUhlaWdodC8yXCIgKm5nSWY9XCJhY3RpdmVJbmRleCAhPT0gMFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ2FsbGVyaWEtbmF2LW5leHQgcGkgcGktZncgcGktY2hldnJvbi1yaWdodFwiIChjbGljayk9XCJjbGlja05hdlJpZ2h0KClcIiBbc3R5bGUuYm90dG9tLnB4XT1cImZyYW1lSGVpZ2h0LzJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWdhbGxlcmlhLWNhcHRpb25cIiAqbmdJZj1cInNob3dDYXB0aW9uJiZpbWFnZXNcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj5cclxuICAgICAgICAgICAgICAgIDxoND57e2ltYWdlc1thY3RpdmVJbmRleF0/LnRpdGxlfX08L2g0PjxwPnt7aW1hZ2VzW2FjdGl2ZUluZGV4XT8uYWx0fX08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FsbGVyaWEgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcclxuICAgICAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHBhbmVsV2lkdGg6IG51bWJlciA9IDYwMDtcclxuXHJcbiAgICBASW5wdXQoKSBwYW5lbEhlaWdodDogbnVtYmVyID0gNDAwO1xyXG5cclxuICAgIEBJbnB1dCgpIGZyYW1lV2lkdGg6IG51bWJlciA9IDYwO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBmcmFtZUhlaWdodDogbnVtYmVyID0gNDA7XHJcblxyXG4gICAgQElucHV0KCkgYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQElucHV0KCkgc2hvd0ZpbG1zdHJpcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgYXV0b1BsYXk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25JbnRlcnZhbDogbnVtYmVyID0gNDAwMDtcclxuXHJcbiAgICBASW5wdXQoKSBzaG93Q2FwdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgZWZmZWN0RHVyYXRpb246IG51bWJlciA9IDUwMDtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uSW1hZ2VDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkltYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBfaW1hZ2VzOiBhbnlbXTtcclxuICAgIFxyXG4gICAgc2xpZGVzaG93QWN0aXZlOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY29udGFpbmVyOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBwYW5lbFdyYXBwZXI6IGFueTtcclxuICAgIFxyXG4gICAgcHVibGljIHBhbmVsczogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY2FwdGlvbjogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RyaXBXcmFwcGVyOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdHJpcDogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZnJhbWVzOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbnRlcnZhbDogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RyaXBMZWZ0OiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgaW1hZ2VzQ2hhbmdlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgcHVibGljIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuICAgIFxyXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmltYWdlc0NoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVzaG93KCk7XHJcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlc0NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBpbWFnZXMoKTogYW55W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZXM7XHJcbiAgICB9XHJcbiAgICBzZXQgaW1hZ2VzKHZhbHVlOmFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbWFnZXNDaGFuZ2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIHRoaXMucGFuZWxXcmFwcGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VsLnVpLWdhbGxlcmlhLXBhbmVsLXdyYXBwZXInKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zaG93RmlsbXN0cmlwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaXBXcmFwcGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCdkaXYudWktZ2FsbGVyaWEtZmlsbXN0cmlwLXdyYXBwZXInKTtcclxuICAgICAgICAgICAgdGhpcy5zdHJpcCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnN0cmlwV3JhcHBlciwndWwudWktZ2FsbGVyaWEtZmlsbXN0cmlwJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbHMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5wYW5lbFdyYXBwZXIsICdsaS51aS1nYWxsZXJpYS1wYW5lbCcpOyBcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zaG93RmlsbXN0cmlwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuc3RyaXAsJ2xpLnVpLWdhbGxlcmlhLWZyYW1lJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaXBXcmFwcGVyLnN0eWxlLndpZHRoID0gRG9tSGFuZGxlci53aWR0aCh0aGlzLnBhbmVsV3JhcHBlcikgLSA1MCArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaXBXcmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuZnJhbWVIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5zaG93Q2FwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmNhcHRpb24gPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsJ2Rpdi51aS1nYWxsZXJpYS1jYXB0aW9uJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FwdGlvbi5zdHlsZS5ib3R0b20gPSB0aGlzLnNob3dGaWxtc3RyaXAgPyBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuc3RyaXBXcmFwcGVyLHRydWUpICsgJ3B4JyA6IDAgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmNhcHRpb24uc3R5bGUud2lkdGggPSBEb21IYW5kbGVyLndpZHRoKHRoaXMucGFuZWxXcmFwcGVyKSArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICBcclxuICAgICAgICBpZiAodGhpcy5hdXRvUGxheSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2xpZGVzaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXJ0U2xpZGVzaG93KCkge1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgIH0sIHRoaXMudHJhbnNpdGlvbkludGVydmFsKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNsaWRlc2hvd0FjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBzdG9wU2xpZGVzaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2xpZGVzaG93QWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsaWNrTmF2UmlnaHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzaG93QWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFNsaWRlc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGNsaWNrTmF2TGVmdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zbGlkZXNob3dBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVzaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJldigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmcmFtZUNsaWNrKGZyYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzaG93QWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFNsaWRlc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNlbGVjdChEb21IYW5kbGVyLmluZGV4KGZyYW1lKSwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcmV2KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuYWN0aXZlSW5kZXggLSAxLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggIT09ICh0aGlzLnBhbmVscy5sZW5ndGgtMSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QodGhpcy5hY3RpdmVJbmRleCArIDEsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnN0cmlwTGVmdCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgc2VsZWN0KGluZGV4LCByZXBvc2l0aW9uKSB7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSB0aGlzLmFjdGl2ZUluZGV4KSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBvbGRQYW5lbCA9IHRoaXMucGFuZWxzW3RoaXMuYWN0aXZlSW5kZXhdLFxyXG4gICAgICAgICAgICBuZXdQYW5lbCA9IHRoaXMucGFuZWxzW2luZGV4XTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZmFkZUluKG5ld1BhbmVsLCB0aGlzLmVmZmVjdER1cmF0aW9uKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dGaWxtc3RyaXApIHtcclxuICAgICAgICAgICAgICAgIGxldCBvbGRGcmFtZSA9IHRoaXMuZnJhbWVzW3RoaXMuYWN0aXZlSW5kZXhdLFxyXG4gICAgICAgICAgICAgICAgbmV3RnJhbWUgPSB0aGlzLmZyYW1lc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChyZXBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcmVwb3NpdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmcmFtZUxlZnQgPSBuZXdGcmFtZS5vZmZzZXRMZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBGYWN0b3IgPSB0aGlzLmZyYW1lV2lkdGggKyBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKG5ld0ZyYW1lKVsnbWFyZ2luLXJpZ2h0J10sIDEwKSxcclxuICAgICAgICAgICAgICAgICAgICBzdHJpcExlZnQgPSB0aGlzLnN0cmlwLm9mZnNldExlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVWaWV3cG9ydExlZnQgPSBmcmFtZUxlZnQgKyBzdHJpcExlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVWaWV3cG9ydFJpZ2h0ID0gZnJhbWVWaWV3cG9ydExlZnQgKyB0aGlzLmZyYW1lV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lVmlld3BvcnRSaWdodCA+IERvbUhhbmRsZXIud2lkdGgodGhpcy5zdHJpcFdyYXBwZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0cmlwTGVmdCAtPSBzdGVwRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZyYW1lVmlld3BvcnRMZWZ0IDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHJpcExlZnQgKz0gc3RlcEZhY3RvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vbkltYWdlQ2hhbmdlLmVtaXQoe2luZGV4OiBpbmRleH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xpY2tJbWFnZShldmVudCwgaW1hZ2UsIGkpIHtcclxuICAgICAgICB0aGlzLm9uSW1hZ2VDbGlja2VkLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbWFnZTogaW1hZ2UsIGluZGV4OiBpfSlcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcFNsaWRlc2hvdygpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0dhbGxlcmlhXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0dhbGxlcmlhXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFNb2R1bGUgeyB9Il19