var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, Component, ElementRef, EventEmitter, AfterViewInit, Output, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { CommonModule } from '@angular/common';
var ButtonDirective = /** @class */ (function () {
    function ButtonDirective(el) {
        this.el = el;
        this.iconPos = 'left';
        this.cornerStyleClass = 'ui-corner-all';
    }
    ButtonDirective.prototype.ngAfterViewInit = function () {
        DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
        if (this.icon) {
            var iconElement = document.createElement("span");
            iconElement.setAttribute("aria-hidden", "true");
            var iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
            iconElement.className = iconPosClass + ' ui-clickable ' + this.icon;
            this.el.nativeElement.appendChild(iconElement);
        }
        var labelElement = document.createElement("span");
        if (this.icon && !this.label) {
            labelElement.setAttribute('aria-hidden', 'true');
        }
        labelElement.className = 'ui-button-text ui-clickable';
        labelElement.appendChild(document.createTextNode(this.label || 'ui-btn'));
        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    };
    ButtonDirective.prototype.getStyleClass = function () {
        var styleClass = 'ui-button ui-widget ui-state-default ' + this.cornerStyleClass;
        if (this.icon) {
            if (this.label != null && this.label != undefined) {
                if (this.iconPos == 'left')
                    styleClass = styleClass + ' ui-button-text-icon-left';
                else
                    styleClass = styleClass + ' ui-button-text-icon-right';
            }
            else {
                styleClass = styleClass + ' ui-button-icon-only';
            }
        }
        else {
            if (this.label) {
                styleClass = styleClass + ' ui-button-text-only';
            }
            else {
                styleClass = styleClass + ' ui-button-text-empty';
            }
        }
        return styleClass;
    };
    Object.defineProperty(ButtonDirective.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (val) {
            this._label = val;
            if (this.initialized) {
                DomHandler.findSingle(this.el.nativeElement, '.ui-button-text').textContent = this._label;
                if (!this.icon) {
                    if (this._label) {
                        DomHandler.removeClass(this.el.nativeElement, 'ui-button-text-empty');
                        DomHandler.addClass(this.el.nativeElement, 'ui-button-text-only');
                    }
                    else {
                        DomHandler.addClass(this.el.nativeElement, 'ui-button-text-empty');
                        DomHandler.removeClass(this.el.nativeElement, 'ui-button-text-only');
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (val) {
            this._icon = val;
            if (this.initialized) {
                var iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
                DomHandler.findSingle(this.el.nativeElement, '.ui-clickable').className =
                    iconPosClass + ' ui-clickable ' + this.icon;
            }
        },
        enumerable: true,
        configurable: true
    });
    ButtonDirective.prototype.ngOnDestroy = function () {
        while (this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }
        this.initialized = false;
    };
    ButtonDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], ButtonDirective.prototype, "iconPos", void 0);
    __decorate([
        Input()
    ], ButtonDirective.prototype, "cornerStyleClass", void 0);
    __decorate([
        Input()
    ], ButtonDirective.prototype, "label", null);
    __decorate([
        Input()
    ], ButtonDirective.prototype, "icon", null);
    ButtonDirective = __decorate([
        Directive({
            selector: '[pButton]'
        })
    ], ButtonDirective);
    return ButtonDirective;
}());
export { ButtonDirective };
var Button = /** @class */ (function () {
    function Button() {
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
    }
    __decorate([
        Input()
    ], Button.prototype, "type", void 0);
    __decorate([
        Input()
    ], Button.prototype, "iconPos", void 0);
    __decorate([
        Input()
    ], Button.prototype, "icon", void 0);
    __decorate([
        Input()
    ], Button.prototype, "label", void 0);
    __decorate([
        Input()
    ], Button.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Button.prototype, "style", void 0);
    __decorate([
        Input()
    ], Button.prototype, "styleClass", void 0);
    __decorate([
        Output()
    ], Button.prototype, "onClick", void 0);
    __decorate([
        Output()
    ], Button.prototype, "onFocus", void 0);
    __decorate([
        Output()
    ], Button.prototype, "onBlur", void 0);
    Button = __decorate([
        Component({
            selector: 'p-button',
            template: "\n        <button [attr.type]=\"type\" [class]=\"styleClass\" [ngStyle]=\"style\" [disabled]=\"disabled\"\n            [ngClass]=\"{'ui-button ui-widget ui-state-default ui-corner-all':true,\n                        'ui-button-icon-only': (icon && !label),\n                        'ui-button-text-icon-left': (icon && label && iconPos === 'left'),\n                        'ui-button-text-icon-right': (icon && label && iconPos === 'right'),\n                        'ui-button-text-only': (!icon && label),\n                        'ui-button-text-empty': (!icon && !label),\n                        'ui-state-disabled': disabled}\"\n                        (click)=\"onClick.emit($event)\" (focus)=\"onFocus.emit($event)\" (blur)=\"onBlur.emit($event)\">\n            <ng-content></ng-content>\n            <span [ngClass]=\"{'ui-clickable': true,\n                        'ui-button-icon-left': (iconPos === 'left'), \n                        'ui-button-icon-right': (iconPos === 'right')}\"\n                        [class]=\"icon\" *ngIf=\"icon\" [attr.aria-hidden]=\"true\"></span>\n            <span class=\"ui-button-text ui-clickable\" [attr.aria-hidden]=\"icon && !label\">{{label||'ui-btn'}}</span>\n        </button>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Button);
    return Button;
}());
export { Button };
var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ButtonDirective, Button],
            declarations: [ButtonDirective, Button]
        })
    ], ButtonModule);
    return ButtonModule;
}());
export { ButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9idXR0b24vIiwic291cmNlcyI6WyJidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hKLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBSzdDO0lBWUkseUJBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBVnhCLFlBQU8sR0FBcUIsTUFBTSxDQUFDO1FBRW5DLHFCQUFnQixHQUFXLGVBQWUsQ0FBQztJQVFoQixDQUFDO0lBRXJDLHlDQUFlLEdBQWY7UUFDSSxVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDM0UsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRCxXQUFXLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNoRCxJQUFJLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFBLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztZQUM3RixXQUFXLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFD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QUViO1FBQVIsS0FBSyxFQUFFO3lDQUFlO0lBRWQ7UUFBUixLQUFLLEVBQUU7NENBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFO3lDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7OENBQW9CO0lBRWxCO1FBQVQsTUFBTSxFQUFFOzJDQUFpRDtJQUVoRDtRQUFULE1BQU0sRUFBRTsyQ0FBaUQ7SUFFaEQ7UUFBVCxNQUFNLEVBQUU7MENBQWdEO0lBcEJoRCxNQUFNO1FBdEJsQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUscXRDQWlCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxNQUFNLENBcUJsQjtJQUFELGFBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQXJCWSxNQUFNO0FBNEJuQjtJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQUx4QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFDLE1BQU0sQ0FBQztZQUNqQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUMsTUFBTSxDQUFDO1NBQ3pDLENBQUM7T0FDVyxZQUFZLENBQUk7SUFBRCxtQkFBQztDQUFBLEFBQTdCLElBQTZCO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLERpcmVjdGl2ZSxDb21wb25lbnQsRWxlbWVudFJlZixFdmVudEVtaXR0ZXIsQWZ0ZXJWaWV3SW5pdCxPdXRwdXQsT25EZXN0cm95LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twQnV0dG9uXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgaWNvblBvczogJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdsZWZ0JztcclxuICAgIFxyXG4gICAgQElucHV0KCkgY29ybmVyU3R5bGVDbGFzczogc3RyaW5nID0gJ3VpLWNvcm5lci1hbGwnO1xyXG4gICAgICAgIFxyXG4gICAgcHVibGljIF9sYWJlbDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgX2ljb246IHN0cmluZztcclxuICAgICAgICAgICAgXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxyXG4gICAgXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXModGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmdldFN0eWxlQ2xhc3MoKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaWNvbikge1xyXG4gICAgICAgICAgICBsZXQgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgaWNvblBvc0NsYXNzID0gKHRoaXMuaWNvblBvcyA9PSAncmlnaHQnKSA/ICd1aS1idXR0b24taWNvbi1yaWdodCc6ICd1aS1idXR0b24taWNvbi1sZWZ0JztcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NOYW1lID0gaWNvblBvc0NsYXNzICArICcgdWktY2xpY2thYmxlICcgKyB0aGlzLmljb247XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChpY29uRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBsYWJlbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBpZiAodGhpcy5pY29uICYmICF0aGlzLmxhYmVsKSB7XHJcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFiZWxFbGVtZW50LmNsYXNzTmFtZSA9ICd1aS1idXR0b24tdGV4dCB1aS1jbGlja2FibGUnO1xyXG4gICAgICAgIGxhYmVsRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmxhYmVsfHwndWktYnRuJykpO1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgZ2V0U3R5bGVDbGFzcygpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdHlsZUNsYXNzID0gJ3VpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCAnICsgdGhpcy5jb3JuZXJTdHlsZUNsYXNzO1xyXG4gICAgICAgIGlmICh0aGlzLmljb24pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGFiZWwgIT0gbnVsbCAmJiB0aGlzLmxhYmVsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaWNvblBvcyA9PSAnbGVmdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyAnIHVpLWJ1dHRvbi10ZXh0LWljb24tbGVmdCc7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyAnIHVpLWJ1dHRvbi10ZXh0LWljb24tcmlnaHQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyAnIHVpLWJ1dHRvbi1pY29uLW9ubHknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyAnIHVpLWJ1dHRvbi10ZXh0LW9ubHknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyAnIHVpLWJ1dHRvbi10ZXh0LWVtcHR5JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gc3R5bGVDbGFzcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgQElucHV0KCkgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBsYWJlbCh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2xhYmVsID0gdmFsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICcudWktYnV0dG9uLXRleHQnKS50ZXh0Q29udGVudCA9IHRoaXMuX2xhYmVsO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmljb24pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktYnV0dG9uLXRleHQtZW1wdHknKTtcclxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VpLWJ1dHRvbi10ZXh0LW9ubHknKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktYnV0dG9uLXRleHQtZW1wdHknKTtcclxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VpLWJ1dHRvbi10ZXh0LW9ubHknKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQElucHV0KCkgZ2V0IGljb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWNvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaWNvbih2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2ljb24gPSB2YWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgbGV0IGljb25Qb3NDbGFzcyA9ICh0aGlzLmljb25Qb3MgPT0gJ3JpZ2h0JykgPyAndWktYnV0dG9uLWljb24tcmlnaHQnOiAndWktYnV0dG9uLWljb24tbGVmdCc7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICcudWktY2xpY2thYmxlJykuY2xhc3NOYW1lID1cclxuICAgICAgICAgICAgICAgIGljb25Qb3NDbGFzcyArICcgdWktY2xpY2thYmxlICcgKyB0aGlzLmljb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgd2hpbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50Lmxhc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtYnV0dG9uJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGJ1dHRvbiBbYXR0ci50eXBlXT1cInR5cGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1pY29uLW9ubHknOiAoaWNvbiAmJiAhbGFiZWwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXRleHQtaWNvbi1sZWZ0JzogKGljb24gJiYgbGFiZWwgJiYgaWNvblBvcyA9PT0gJ2xlZnQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWljb24tcmlnaHQnOiAoaWNvbiAmJiBsYWJlbCAmJiBpY29uUG9zID09PSAncmlnaHQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LW9ubHknOiAoIWljb24gJiYgbGFiZWwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXRleHQtZW1wdHknOiAoIWljb24gJiYgIWxhYmVsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWRpc2FibGVkJzogZGlzYWJsZWR9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2suZW1pdCgkZXZlbnQpXCIgKGZvY3VzKT1cIm9uRm9jdXMuZW1pdCgkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyLmVtaXQoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsndWktY2xpY2thYmxlJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1pY29uLWxlZnQnOiAoaWNvblBvcyA9PT0gJ2xlZnQnKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24taWNvbi1yaWdodCc6IChpY29uUG9zID09PSAncmlnaHQnKX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiaWNvblwiICpuZ0lmPVwiaWNvblwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYnV0dG9uLXRleHQgdWktY2xpY2thYmxlXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiaWNvbiAmJiAhbGFiZWxcIj57e2xhYmVsfHwndWktYnRuJ319PC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcclxuXHJcbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgaWNvblBvczogc3RyaW5nID0gJ2xlZnQnO1xyXG5cclxuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtCdXR0b25EaXJlY3RpdmUsQnV0dG9uXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0J1dHRvbkRpcmVjdGl2ZSxCdXR0b25dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCdXR0b25Nb2R1bGUgeyB9XHJcbiJdfQ==