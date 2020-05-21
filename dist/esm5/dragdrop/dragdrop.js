var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, OnDestroy, AfterViewInit, ElementRef, HostListener, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var Draggable = /** @class */ (function () {
    function Draggable(el, zone) {
        this.el = el;
        this.zone = zone;
        this.onDragStart = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        this.onDrag = new EventEmitter();
    }
    Object.defineProperty(Draggable.prototype, "pDraggableDisabled", {
        get: function () {
            return this._pDraggableDisabled;
        },
        set: function (_pDraggableDisabled) {
            this._pDraggableDisabled = _pDraggableDisabled;
            if (this._pDraggableDisabled) {
                this.unbindMouseListeners();
            }
            else {
                this.el.nativeElement.draggable = true;
                this.bindMouseListeners();
            }
        },
        enumerable: true,
        configurable: true
    });
    Draggable.prototype.ngAfterViewInit = function () {
        if (!this.pDraggableDisabled) {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    };
    Draggable.prototype.bindDragListener = function () {
        var _this = this;
        if (!this.dragListener) {
            this.zone.runOutsideAngular(function () {
                _this.dragListener = _this.drag.bind(_this);
                _this.el.nativeElement.addEventListener('drag', _this.dragListener);
            });
        }
    };
    Draggable.prototype.unbindDragListener = function () {
        var _this = this;
        if (this.dragListener) {
            this.zone.runOutsideAngular(function () {
                _this.el.nativeElement.removeEventListener('drag', _this.dragListener);
                _this.dragListener = null;
            });
        }
    };
    Draggable.prototype.bindMouseListeners = function () {
        var _this = this;
        if (!this.mouseDownListener && !this.mouseUpListener) {
            this.zone.runOutsideAngular(function () {
                _this.mouseDownListener = _this.mousedown.bind(_this);
                _this.mouseUpListener = _this.mouseup.bind(_this);
                _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
                _this.el.nativeElement.addEventListener('mouseup', _this.mouseUpListener);
            });
        }
    };
    Draggable.prototype.unbindMouseListeners = function () {
        var _this = this;
        if (this.mouseDownListener && this.mouseUpListener) {
            this.zone.runOutsideAngular(function () {
                _this.el.nativeElement.removeEventListener('mousedown', _this.mouseDownListener);
                _this.el.nativeElement.removeEventListener('mouseup', _this.mouseUpListener);
                _this.mouseDownListener = null;
                _this.mouseUpListener = null;
            });
        }
    };
    Draggable.prototype.drag = function (event) {
        this.onDrag.emit(event);
    };
    Draggable.prototype.dragStart = function (event) {
        if (this.allowDrag() && !this.pDraggableDisabled) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData('text', this.scope);
            this.onDragStart.emit(event);
            this.bindDragListener();
        }
        else {
            event.preventDefault();
        }
    };
    Draggable.prototype.dragEnd = function (event) {
        this.onDragEnd.emit(event);
        this.unbindDragListener();
    };
    Draggable.prototype.mousedown = function (event) {
        this.handle = event.target;
    };
    Draggable.prototype.mouseup = function (event) {
        this.handle = null;
    };
    Draggable.prototype.allowDrag = function () {
        if (this.dragHandle && this.handle)
            return DomHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    };
    Draggable.prototype.ngOnDestroy = function () {
        this.unbindDragListener();
        this.unbindMouseListeners();
    };
    Draggable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input('pDraggable')
    ], Draggable.prototype, "scope", void 0);
    __decorate([
        Input()
    ], Draggable.prototype, "dragEffect", void 0);
    __decorate([
        Input()
    ], Draggable.prototype, "dragHandle", void 0);
    __decorate([
        Output()
    ], Draggable.prototype, "onDragStart", void 0);
    __decorate([
        Output()
    ], Draggable.prototype, "onDragEnd", void 0);
    __decorate([
        Output()
    ], Draggable.prototype, "onDrag", void 0);
    __decorate([
        Input()
    ], Draggable.prototype, "pDraggableDisabled", null);
    __decorate([
        HostListener('dragstart', ['$event'])
    ], Draggable.prototype, "dragStart", null);
    __decorate([
        HostListener('dragend', ['$event'])
    ], Draggable.prototype, "dragEnd", null);
    Draggable = __decorate([
        Directive({
            selector: '[pDraggable]'
        })
    ], Draggable);
    return Draggable;
}());
export { Draggable };
var Droppable = /** @class */ (function () {
    function Droppable(el, zone) {
        this.el = el;
        this.zone = zone;
        this.onDragEnter = new EventEmitter();
        this.onDragLeave = new EventEmitter();
        this.onDrop = new EventEmitter();
    }
    Droppable.prototype.ngAfterViewInit = function () {
        if (!this.pDroppableDisabled) {
            this.bindDragOverListener();
        }
    };
    Droppable.prototype.bindDragOverListener = function () {
        var _this = this;
        if (!this.dragOverListener) {
            this.zone.runOutsideAngular(function () {
                _this.dragOverListener = _this.dragOver.bind(_this);
                _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            });
        }
    };
    Droppable.prototype.unbindDragOverListener = function () {
        var _this = this;
        if (this.dragOverListener) {
            this.zone.runOutsideAngular(function () {
                _this.el.nativeElement.removeEventListener('dragover', _this.dragOverListener);
                _this.dragOverListener = null;
            });
        }
    };
    Droppable.prototype.dragOver = function (event) {
        event.preventDefault();
    };
    Droppable.prototype.drop = function (event) {
        if (this.allowDrop(event)) {
            event.preventDefault();
            this.onDrop.emit(event);
        }
    };
    Droppable.prototype.dragEnter = function (event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        this.onDragEnter.emit(event);
    };
    Droppable.prototype.dragLeave = function (event) {
        event.preventDefault();
        this.onDragLeave.emit(event);
    };
    Droppable.prototype.allowDrop = function (event) {
        var dragScope = event.dataTransfer.getData('text');
        if (typeof (this.scope) == "string" && dragScope == this.scope) {
            return true;
        }
        else if (this.scope instanceof Array) {
            for (var j = 0; j < this.scope.length; j++) {
                if (dragScope == this.scope[j]) {
                    return true;
                }
            }
        }
        return false;
    };
    Droppable.prototype.ngOnDestroy = function () {
        this.unbindDragOverListener();
    };
    Droppable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input('pDroppable')
    ], Droppable.prototype, "scope", void 0);
    __decorate([
        Input()
    ], Droppable.prototype, "pDroppableDisabled", void 0);
    __decorate([
        Input()
    ], Droppable.prototype, "dropEffect", void 0);
    __decorate([
        Output()
    ], Droppable.prototype, "onDragEnter", void 0);
    __decorate([
        Output()
    ], Droppable.prototype, "onDragLeave", void 0);
    __decorate([
        Output()
    ], Droppable.prototype, "onDrop", void 0);
    __decorate([
        HostListener('drop', ['$event'])
    ], Droppable.prototype, "drop", null);
    __decorate([
        HostListener('dragenter', ['$event'])
    ], Droppable.prototype, "dragEnter", null);
    __decorate([
        HostListener('dragleave', ['$event'])
    ], Droppable.prototype, "dragLeave", null);
    Droppable = __decorate([
        Directive({
            selector: '[pDroppable]'
        })
    ], Droppable);
    return Droppable;
}());
export { Droppable };
var DragDropModule = /** @class */ (function () {
    function DragDropModule() {
    }
    DragDropModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Draggable, Droppable],
            declarations: [Draggable, Droppable]
        })
    ], DragDropModule);
    return DragDropModule;
}());
export { DragDropModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2Ryb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2RyYWdkcm9wLyIsInNvdXJjZXMiOlsiZHJhZ2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsSSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUt2QztJQXdCSSxtQkFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFoQjVDLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFcEQsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVlBLENBQUM7SUFFakQsc0JBQUkseUNBQWtCO2FBQXRCO1lBQ0wsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDcEMsQ0FBQzthQUNELFVBQXVCLG1CQUEyQjtZQUM5QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7WUFFL0MsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQy9CO2lCQUNJO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQzdCO1FBQ0wsQ0FBQzs7O09BWEE7SUFhRCxtQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLElB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LEVBQUUsY0FBYztTQUMzQixDQUFDO09BQ1csU0FBUyxDQTBGckI7SUFBRCxnQkFBQztDQUFBLEFBMUZELElBMEZDO1NBMUZZLFNBQVM7QUFpR3RCO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixjQUFjO1FBTDFCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUMsU0FBUyxDQUFDO1lBQzlCLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUM7U0FDdEMsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsRGlyZWN0aXZlLE9uRGVzdHJveSxBZnRlclZpZXdJbml0LEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twRHJhZ2dhYmxlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgICBcclxuICAgIEBJbnB1dCgncERyYWdnYWJsZScpIHNjb3BlOiBzdHJpbmc7XHJcbiAgICAgICAgXHJcbiAgICBASW5wdXQoKSBkcmFnRWZmZWN0OiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGRyYWdIYW5kbGU6IHN0cmluZztcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvbkRyYWc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBoYW5kbGU6IGFueTtcclxuXHJcbiAgICBkcmFnTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBtb3VzZURvd25MaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIG1vdXNlVXBMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIF9wRHJhZ2dhYmxlRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHBEcmFnZ2FibGVEaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcERyYWdnYWJsZURpc2FibGVkO1xyXG4gICAgfVxyXG4gICAgc2V0IHBEcmFnZ2FibGVEaXNhYmxlZChfcERyYWdnYWJsZURpc2FibGVkOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9wRHJhZ2dhYmxlRGlzYWJsZWQgPSBfcERyYWdnYWJsZURpc2FibGVkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLl9wRHJhZ2dhYmxlRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51bmJpbmRNb3VzZUxpc3RlbmVycygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZE1vdXNlTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBEcmFnZ2FibGVEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZERyYWdMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZHJhZ0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lciA9IHRoaXMuZHJhZy5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCB0aGlzLmRyYWdMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmREcmFnTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZycsIHRoaXMuZHJhZ0xpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmRNb3VzZUxpc3RlbmVycygpIHtcclxuICAgICAgICBpZiAoIXRoaXMubW91c2VEb3duTGlzdGVuZXIgJiYgIXRoaXMubW91c2VVcExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5tb3VzZWRvd24uYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gdGhpcy5tb3VzZXVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25MaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZE1vdXNlTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkxpc3RlbmVyICYmIHRoaXMubW91c2VVcExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25MaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZyhldmVudCkge1xyXG4gICAgICAgIHRoaXMub25EcmFnLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pIFxyXG4gICAgZHJhZ1N0YXJ0KGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dEcmFnKCkgJiYgIXRoaXMucERyYWdnYWJsZURpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdFZmZlY3QpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gdGhpcy5kcmFnRWZmZWN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgdGhpcy5zY29wZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm9uRHJhZ1N0YXJ0LmVtaXQoZXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iaW5kRHJhZ0xpc3RlbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSkgXHJcbiAgICBkcmFnRW5kKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5vbkRyYWdFbmQuZW1pdChldmVudCk7XHJcbiAgICAgICAgdGhpcy51bmJpbmREcmFnTGlzdGVuZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbW91c2Vkb3duKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGUgPSBldmVudC50YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbW91c2V1cChldmVudCkge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlID0gbnVsbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWxsb3dEcmFnKCkgOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5kcmFnSGFuZGxlICYmIHRoaXMuaGFuZGxlKVxyXG4gICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5tYXRjaGVzKHRoaXMuaGFuZGxlLCB0aGlzLmRyYWdIYW5kbGUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy51bmJpbmREcmFnTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnVuYmluZE1vdXNlTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twRHJvcHBhYmxlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERyb3BwYWJsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgICBcclxuICAgIEBJbnB1dCgncERyb3BwYWJsZScpIHNjb3BlOiBzdHJpbmd8c3RyaW5nW107XHJcblxyXG4gICAgQElucHV0KCkgcERyb3BwYWJsZURpc2FibGVkOiBib29sZWFuO1xyXG4gICAgICAgIFxyXG4gICAgQElucHV0KCkgZHJvcEVmZmVjdDogc3RyaW5nO1xyXG4gICAgICAgIFxyXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uRHJhZ0xlYXZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uRHJvcDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cclxuXHJcbiAgICBkcmFnT3Zlckxpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wRHJvcHBhYmxlRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRHJhZ092ZXJMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kRHJhZ092ZXJMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZHJhZ092ZXJMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gdGhpcy5kcmFnT3Zlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3Zlckxpc3RlbmVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERyYWdPdmVyTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ092ZXJMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3Zlckxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkcmFnT3ZlcihldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXHJcbiAgICBkcm9wKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dEcm9wKGV2ZW50KSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uRHJvcC5lbWl0KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbnRlcicsIFsnJGV2ZW50J10pIFxyXG4gICAgZHJhZ0VudGVyKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5kcm9wRWZmZWN0KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gdGhpcy5kcm9wRWZmZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMub25EcmFnRW50ZXIuZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pIFxyXG4gICAgZHJhZ0xlYXZlKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMub25EcmFnTGVhdmUuZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBhbGxvd0Ryb3AoZXZlbnQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgZHJhZ1Njb3BlID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKTtcclxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLnNjb3BlKSA9PSBcInN0cmluZ1wiICYmIGRyYWdTY29wZSA9PSB0aGlzLnNjb3BlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnNjb3BlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuc2NvcGUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChkcmFnU2NvcGUgPT0gdGhpcy5zY29wZVtqXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuYmluZERyYWdPdmVyTGlzdGVuZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0RyYWdnYWJsZSxEcm9wcGFibGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbRHJhZ2dhYmxlLERyb3BwYWJsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIERyYWdEcm9wTW9kdWxlIHsgfSJdfQ==