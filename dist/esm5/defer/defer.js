var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, AfterViewInit, OnDestroy, TemplateRef, EmbeddedViewRef, ViewContainerRef, Renderer2, EventEmitter, Output, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
var DeferredLoader = /** @class */ (function () {
    function DeferredLoader(el, renderer, viewContainer) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.onLoad = new EventEmitter();
    }
    DeferredLoader.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.shouldLoad()) {
            this.load();
        }
        if (!this.isLoaded()) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', function () {
                if (_this.shouldLoad()) {
                    _this.load();
                    _this.documentScrollListener();
                    _this.documentScrollListener = null;
                }
            });
        }
    };
    DeferredLoader.prototype.shouldLoad = function () {
        if (this.isLoaded()) {
            return false;
        }
        else {
            var rect = this.el.nativeElement.getBoundingClientRect();
            var docElement = document.documentElement;
            var winHeight = docElement.clientHeight;
            return (winHeight >= rect.top);
        }
    };
    DeferredLoader.prototype.load = function () {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
    };
    DeferredLoader.prototype.isLoaded = function () {
        return this.view != null;
    };
    DeferredLoader.prototype.ngOnDestroy = function () {
        this.view = null;
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    };
    DeferredLoader.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ViewContainerRef }
    ]; };
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
    return DeferredLoader;
}());
export { DeferredLoader };
var DeferModule = /** @class */ (function () {
    function DeferModule() {
    }
    DeferModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [DeferredLoader],
            declarations: [DeferredLoader]
        })
    ], DeferModule);
    return DeferModule;
}());
export { DeferModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2RlZmVyLyIsInNvdXJjZXMiOlsiZGVmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLGVBQWUsRUFDakYsZ0JBQWdCLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUs3QztJQVVJLHdCQUFtQixFQUFjLEVBQVMsUUFBbUIsRUFBUyxhQUErQjtRQUFsRixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQVIzRixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFRK0MsQ0FBQztJQUV6Ryx3Q0FBZSxHQUFmO1FBQUEsaUJBY0M7UUFiRyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUU7Z0JBQ25FLElBQUksS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO29CQUNuQixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1osS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7aUJBQ3RDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxtQ0FBVSxHQUFWO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUM7U0FDaEI7YUFDSTtZQUNELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDekQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztZQUMxQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBRXhDLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELDZCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCxvQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDOztnQkE5Q3NCLFVBQVU7Z0JBQW1CLFNBQVM7Z0JBQXdCLGdCQUFnQjs7SUFSM0Y7UUFBVCxNQUFNLEVBQUU7a0RBQWdEO0lBRTlCO1FBQTFCLFlBQVksQ0FBQyxXQUFXLENBQUM7b0RBQTRCO0lBSjdDLGNBQWM7UUFIMUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7U0FDdkIsQ0FBQztPQUNXLGNBQWMsQ0F5RDFCO0lBQUQscUJBQUM7Q0FBQSxBQXpERCxJQXlEQztTQXpEWSxjQUFjO0FBZ0UzQjtJQUFBO0lBQTJCLENBQUM7SUFBZixXQUFXO1FBTHZCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDekIsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQ2pDLENBQUM7T0FDVyxXQUFXLENBQUk7SUFBRCxrQkFBQztDQUFBLEFBQTVCLElBQTRCO1NBQWYsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsRGlyZWN0aXZlLEVsZW1lbnRSZWYsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksVGVtcGxhdGVSZWYsRW1iZWRkZWRWaWV3UmVmLFxyXG4gICAgICAgIFZpZXdDb250YWluZXJSZWYsUmVuZGVyZXIyLEV2ZW50RW1pdHRlcixPdXRwdXQsQ29udGVudENoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3BEZWZlcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZWZlcnJlZExvYWRlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcclxuICAgICAgICBcclxuICAgIEBPdXRwdXQoKSBvbkxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgICAgICBcclxuICAgIGRvY3VtZW50U2Nyb2xsTGlzdGVuZXI6IEZ1bmN0aW9uO1xyXG4gICAgXHJcbiAgICB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcclxuICAgICAgICAgICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cclxuICAgIFxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3VsZExvYWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9hZGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFNjcm9sbExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ3dpbmRvdycsICdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRMb2FkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNob3VsZExvYWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNMb2FkZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgbGV0IGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGxldCB3aW5IZWlnaHQgPSBkb2NFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiAod2luSGVpZ2h0ID49IHJlY3QudG9wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxvYWQoKTogdm9pZCB7IFxyXG4gICAgICAgIHRoaXMudmlldyA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSk7XHJcbiAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpc0xvYWRlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52aWV3ICE9IG51bGw7XHJcbiAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFNjcm9sbExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0RlZmVycmVkTG9hZGVyXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0RlZmVycmVkTG9hZGVyXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGVmZXJNb2R1bGUgeyB9Il19