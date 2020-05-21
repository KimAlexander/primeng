var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, ElementRef, AfterViewChecked, DoCheck, Input, Output, EventEmitter, IterableDiffers, ChangeDetectorRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
var GMap = /** @class */ (function () {
    function GMap(el, differs, cd, zone) {
        this.el = el;
        this.cd = cd;
        this.zone = zone;
        this.onMapClick = new EventEmitter();
        this.onOverlayClick = new EventEmitter();
        this.onOverlayDblClick = new EventEmitter();
        this.onOverlayDragStart = new EventEmitter();
        this.onOverlayDrag = new EventEmitter();
        this.onOverlayDragEnd = new EventEmitter();
        this.onMapReady = new EventEmitter();
        this.onMapDragEnd = new EventEmitter();
        this.onZoomChanged = new EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    GMap.prototype.ngAfterViewChecked = function () {
        if (!this.map && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    };
    GMap.prototype.initialize = function () {
        var e_1, _a;
        var _this = this;
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        this.onMapReady.emit({
            map: this.map
        });
        if (this.overlays) {
            try {
                for (var _b = __values(this.overlays), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var overlay = _c.value;
                    overlay.setMap(this.map);
                    this.bindOverlayEvents(overlay);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.map.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onMapClick.emit(event);
            });
        });
        this.map.addListener('dragend', function (event) {
            _this.zone.run(function () {
                _this.onMapDragEnd.emit(event);
            });
        });
        this.map.addListener('zoom_changed', function (event) {
            _this.zone.run(function () {
                _this.onZoomChanged.emit(event);
            });
        });
    };
    GMap.prototype.bindOverlayEvents = function (overlay) {
        var _this = this;
        overlay.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onOverlayClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('dblclick', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDblClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: _this.map
                });
            });
        });
        if (overlay.getDraggable()) {
            this.bindDragEvents(overlay);
        }
    };
    GMap.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.overlays);
        if (changes && this.map) {
            changes.forEachRemovedItem(function (record) {
                google.maps.event.clearInstanceListeners(record.item);
                record.item.setMap(null);
            });
            changes.forEachAddedItem(function (record) {
                record.item.setMap(_this.map);
                record.item.addListener('click', function (event) {
                    _this.zone.run(function () {
                        _this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: record.item,
                            map: _this.map
                        });
                    });
                });
                if (record.item.getDraggable()) {
                    _this.bindDragEvents(record.item);
                }
            });
        }
    };
    GMap.prototype.bindDragEvents = function (overlay) {
        var _this = this;
        overlay.addListener('dragstart', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragStart.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('drag', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDrag.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('dragend', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragEnd.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
    };
    GMap.prototype.getMap = function () {
        return this.map;
    };
    GMap.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], GMap.prototype, "style", void 0);
    __decorate([
        Input()
    ], GMap.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], GMap.prototype, "options", void 0);
    __decorate([
        Input()
    ], GMap.prototype, "overlays", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onMapClick", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayClick", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDblClick", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDragStart", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDrag", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDragEnd", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onMapReady", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onMapDragEnd", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onZoomChanged", void 0);
    GMap = __decorate([
        Component({
            selector: 'p-gmap',
            template: "<div [ngStyle]=\"style\" [class]=\"styleClass\"></div>",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], GMap);
    return GMap;
}());
export { GMap };
var GMapModule = /** @class */ (function () {
    function GMapModule() {
    }
    GMapModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [GMap],
            declarations: [GMap]
        })
    ], GMapModule);
    return GMapModule;
}());
export { GMapModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ21hcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZ21hcC8iLCJzb3VyY2VzIjpbImdtYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsZ0JBQWdCLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEwsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBUzdDO0lBZ0NJLGNBQW1CLEVBQWMsRUFBQyxPQUF3QixFQUFTLEVBQXFCLEVBQVMsSUFBVztRQUF6RixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQWtDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBTztRQXRCbEcsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdkQsc0JBQWlCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQsdUJBQWtCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFM0Qsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0RCxxQkFBZ0IsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVyRCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTzVELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJ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RVg7UUFBUixLQUFLLEVBQUU7NENBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFO3lDQUFjO0lBRWI7UUFBUixLQUFLLEVBQUU7MENBQWlCO0lBRWY7UUFBVCxNQUFNLEVBQUU7NENBQW9EO0lBRW5EO1FBQVQsTUFBTSxFQUFFO2dEQUF3RDtJQUV2RDtRQUFULE1BQU0sRUFBRTttREFBMkQ7SUFFMUQ7UUFBVCxNQUFNLEVBQUU7b0RBQTREO0lBRTNEO1FBQVQsTUFBTSxFQUFFOytDQUF1RDtJQUV0RDtRQUFULE1BQU0sRUFBRTtrREFBMEQ7SUFFekQ7UUFBVCxNQUFNLEVBQUU7NENBQW9EO0lBRW5EO1FBQVQsTUFBTSxFQUFFOzhDQUFzRDtJQUVyRDtRQUFULE1BQU0sRUFBRTsrQ0FBdUQ7SUExQnZELElBQUk7UUFMaEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLHdEQUFvRDtZQUM5RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO09BQ1csSUFBSSxDQW1LaEI7SUFBRCxXQUFDO0NBQUEsQUFuS0QsSUFtS0M7U0FuS1ksSUFBSTtBQTBLakI7SUFBQTtJQUEwQixDQUFDO0lBQWQsVUFBVTtRQUx0QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2YsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO1NBQ3ZCLENBQUM7T0FDVyxVQUFVLENBQUk7SUFBRCxpQkFBQztDQUFBLEFBQTNCLElBQTJCO1NBQWQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3Q2hlY2tlZCxEb0NoZWNrLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsSXRlcmFibGVEaWZmZXJzLENoYW5nZURldGVjdG9yUmVmLE5nWm9uZSxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1nbWFwJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+PC9kaXY+YCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR01hcCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsRG9DaGVjayB7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuICAgICAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBvdmVybGF5czogYW55W107XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvbk1hcENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uT3ZlcmxheUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25PdmVybGF5RGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25PdmVybGF5RHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uT3ZlcmxheURyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25PdmVybGF5RHJhZ0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvbk1hcFJlYWR5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25NYXBEcmFnRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgXHJcbiAgICBAT3V0cHV0KCkgb25ab29tQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgZGlmZmVyOiBhbnk7XHJcbiAgICBcclxuICAgIG1hcDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZixkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyB6b25lOk5nWm9uZSkge1xyXG4gICAgICAgIHRoaXMuZGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMubWFwICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5vbk1hcFJlYWR5LmVtaXQoe1xyXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheXMpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBvdmVybGF5IG9mIHRoaXMub3ZlcmxheXMpIHtcclxuICAgICAgICAgICAgICAgIG92ZXJsYXkuc2V0TWFwKHRoaXMubWFwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZE92ZXJsYXlFdmVudHMob3ZlcmxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1hcENsaWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAuYWRkTGlzdGVuZXIoJ2RyYWdlbmQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWFwRHJhZ0VuZC5lbWl0KGV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubWFwLmFkZExpc3RlbmVyKCd6b29tX2NoYW5nZWQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uWm9vbUNoYW5nZWQuZW1pdChldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBiaW5kT3ZlcmxheUV2ZW50cyhvdmVybGF5OiBhbnkpIHtcclxuICAgICAgICBvdmVybGF5LmFkZExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5Q2xpY2suZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ292ZXJsYXknOiBvdmVybGF5LFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgb3ZlcmxheS5hZGRMaXN0ZW5lcignZGJsY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheURibENsaWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICdvdmVybGF5Jzogb3ZlcmxheSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG92ZXJsYXkuZ2V0RHJhZ2dhYmxlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRHJhZ0V2ZW50cyhvdmVybGF5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nRG9DaGVjaygpIHtcclxuICAgICAgICBsZXQgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5vdmVybGF5cyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNoYW5nZXMgJiYgdGhpcy5tYXApIHtcclxuICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuY2xlYXJJbnN0YW5jZUxpc3RlbmVycyhyZWNvcmQuaXRlbSk7XHJcbiAgICAgICAgICAgICAgICByZWNvcmQuaXRlbS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChyZWNvcmQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlY29yZC5pdGVtLnNldE1hcCh0aGlzLm1hcCk7XHJcbiAgICAgICAgICAgICAgICByZWNvcmQuaXRlbS5hZGRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlDbGljay5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogcmVjb3JkLml0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChyZWNvcmQuaXRlbS5nZXREcmFnZ2FibGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERyYWdFdmVudHMocmVjb3JkLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGJpbmREcmFnRXZlbnRzKG92ZXJsYXkpIHtcclxuICAgICAgICBvdmVybGF5LmFkZExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheURyYWdTdGFydC5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5OiBvdmVybGF5LFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5tYXBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBvdmVybGF5LmFkZExpc3RlbmVyKCdkcmFnJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlEcmFnLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXk6IG92ZXJsYXksXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiB0aGlzLm1hcFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG92ZXJsYXkuYWRkTGlzdGVuZXIoJ2RyYWdlbmQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheURyYWdFbmQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogb3ZlcmxheSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMubWFwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldE1hcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXA7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtHTWFwXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0dNYXBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHTWFwTW9kdWxlIHsgfSJdfQ==