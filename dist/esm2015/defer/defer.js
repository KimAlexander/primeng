var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, AfterViewInit, OnDestroy, TemplateRef, EmbeddedViewRef, ViewContainerRef, Renderer2, EventEmitter, Output, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
let DeferredLoader = class DeferredLoader {
    constructor(el, renderer, viewContainer) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.onLoad = new EventEmitter();
    }
    ngAfterViewInit() {
        if (this.shouldLoad()) {
            this.load();
        }
        if (!this.isLoaded()) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', () => {
                if (this.shouldLoad()) {
                    this.load();
                    this.documentScrollListener();
                    this.documentScrollListener = null;
                }
            });
        }
    }
    shouldLoad() {
        if (this.isLoaded()) {
            return false;
        }
        else {
            let rect = this.el.nativeElement.getBoundingClientRect();
            let docElement = document.documentElement;
            let winHeight = docElement.clientHeight;
            return (winHeight >= rect.top);
        }
    }
    load() {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
    }
    isLoaded() {
        return this.view != null;
    }
    ngOnDestroy() {
        this.view = null;
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    }
};
DeferredLoader.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef }
];
__decorate([
    Output()
], DeferredLoader.prototype, "onLoad", void 0);
__decorate([
    ContentChild(TemplateRef)
], DeferredLoader.prototype, "template", void 0);
DeferredLoader = __decorate([
    Directive({
        selector: '[pDefer]'
    })
], DeferredLoader);
export { DeferredLoader };
let DeferModule = class DeferModule {
};
DeferModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [DeferredLoader],
        declarations: [DeferredLoader]
    })
], DeferModule);
export { DeferModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2RlZmVyLyIsInNvdXJjZXMiOlsiZGVmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLGVBQWUsRUFDakYsZ0JBQWdCLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUs3QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBVXZCLFlBQW1CLEVBQWMsRUFBUyxRQUFtQixFQUFTLGFBQStCO1FBQWxGLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBUjNGLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVErQyxDQUFDO0lBRXpHLGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUN4RSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO29CQUM5QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO2lCQUN0QztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQ0k7WUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3pELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDMUMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztZQUV4QyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzdCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztDQUNKLENBQUE7O1lBL0MwQixVQUFVO1lBQW1CLFNBQVM7WUFBd0IsZ0JBQWdCOztBQVIzRjtJQUFULE1BQU0sRUFBRTs4Q0FBZ0Q7QUFFOUI7SUFBMUIsWUFBWSxDQUFDLFdBQVcsQ0FBQztnREFBNEI7QUFKN0MsY0FBYztJQUgxQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtLQUN2QixDQUFDO0dBQ1csY0FBYyxDQXlEMUI7U0F6RFksY0FBYztBQWdFM0IsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztDQUFJLENBQUE7QUFBZixXQUFXO0lBTHZCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDekIsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO0tBQ2pDLENBQUM7R0FDVyxXQUFXLENBQUk7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxEaXJlY3RpdmUsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uRGVzdHJveSxUZW1wbGF0ZVJlZixFbWJlZGRlZFZpZXdSZWYsXHJcbiAgICAgICAgVmlld0NvbnRhaW5lclJlZixSZW5kZXJlcjIsRXZlbnRFbWl0dGVyLE91dHB1dCxDb250ZW50Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcERlZmVyXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERlZmVycmVkTG9hZGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kge1xyXG4gICAgICAgIFxyXG4gICAgQE91dHB1dCgpIG9uTG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgICAgIFxyXG4gICAgZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcjogRnVuY3Rpb247XHJcbiAgICBcclxuICAgIHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xyXG4gICAgICAgICAgICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxyXG4gICAgXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkTG9hZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXRoaXMuaXNMb2FkZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZExvYWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvdWxkTG9hZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0xvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBsZXQgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICAgICAgbGV0IHdpbkhlaWdodCA9IGRvY0VsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuICh3aW5IZWlnaHQgPj0gcmVjdC50b3ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgbG9hZCgpOiB2b2lkIHsgXHJcbiAgICAgICAgdGhpcy52aWV3ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlKTtcclxuICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzTG9hZGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcgIT0gbnVsbDtcclxuICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnZpZXcgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFNjcm9sbExpc3RlbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbRGVmZXJyZWRMb2FkZXJdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbRGVmZXJyZWRMb2FkZXJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZWZlck1vZHVsZSB7IH0iXX0=