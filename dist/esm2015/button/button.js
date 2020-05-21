var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, Component, ElementRef, EventEmitter, AfterViewInit, Output, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { CommonModule } from '@angular/common';
let ButtonDirective = class ButtonDirective {
    constructor(el) {
        this.el = el;
        this.iconPos = 'left';
        this.cornerStyleClass = 'ui-corner-all';
    }
    ngAfterViewInit() {
        DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
        if (this.icon) {
            let iconElement = document.createElement("span");
            iconElement.setAttribute("aria-hidden", "true");
            let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
            iconElement.className = iconPosClass + ' ui-clickable ' + this.icon;
            this.el.nativeElement.appendChild(iconElement);
        }
        let labelElement = document.createElement("span");
        if (this.icon && !this.label) {
            labelElement.setAttribute('aria-hidden', 'true');
        }
        labelElement.className = 'ui-button-text ui-clickable';
        labelElement.appendChild(document.createTextNode(this.label || 'ui-btn'));
        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    }
    getStyleClass() {
        let styleClass = 'ui-button ui-widget ui-state-default ' + this.cornerStyleClass;
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
    }
    get label() {
        return this._label;
    }
    set label(val) {
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
    }
    get icon() {
        return this._icon;
    }
    set icon(val) {
        this._icon = val;
        if (this.initialized) {
            let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
            DomHandler.findSingle(this.el.nativeElement, '.ui-clickable').className =
                iconPosClass + ' ui-clickable ' + this.icon;
        }
    }
    ngOnDestroy() {
        while (this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }
        this.initialized = false;
    }
};
ButtonDirective.ctorParameters = () => [
    { type: ElementRef }
];
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
export { ButtonDirective };
let Button = class Button {
    constructor() {
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
    }
};
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
        template: `
        <button [attr.type]="type" [class]="styleClass" [ngStyle]="style" [disabled]="disabled"
            [ngClass]="{'ui-button ui-widget ui-state-default ui-corner-all':true,
                        'ui-button-icon-only': (icon && !label),
                        'ui-button-text-icon-left': (icon && label && iconPos === 'left'),
                        'ui-button-text-icon-right': (icon && label && iconPos === 'right'),
                        'ui-button-text-only': (!icon && label),
                        'ui-button-text-empty': (!icon && !label),
                        'ui-state-disabled': disabled}"
                        (click)="onClick.emit($event)" (focus)="onFocus.emit($event)" (blur)="onBlur.emit($event)">
            <ng-content></ng-content>
            <span [ngClass]="{'ui-clickable': true,
                        'ui-button-icon-left': (iconPos === 'left'), 
                        'ui-button-icon-right': (iconPos === 'right')}"
                        [class]="icon" *ngIf="icon" [attr.aria-hidden]="true"></span>
            <span class="ui-button-text ui-clickable" [attr.aria-hidden]="icon && !label">{{label||'ui-btn'}}</span>
        </button>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Button);
export { Button };
let ButtonModule = class ButtonModule {
};
ButtonModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ButtonDirective, Button],
        declarations: [ButtonDirective, Button]
    })
], ButtonModule);
export { ButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9idXR0b24vIiwic291cmNlcyI6WyJidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hKLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBSzdDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFZeEIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFWeEIsWUFBTyxHQUFxQixNQUFNLENBQUM7UUFFbkMscUJBQWdCLEdBQVcsZUFBZSxDQUFDO0lBUWhCLENBQUM7SUFFckMsZUFBZTtRQUNYLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELFdBQVcsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELElBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO1lBQzdGLFdBQVcsQ0FBQyxTQUFTLEdBQUcsWUFBWSxHQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckUsSUFBSSxDQUFD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QUFFO29DQUFjO0FBRWI7SUFBUixLQUFLLEVBQUU7cUNBQWU7QUFFZDtJQUFSLEtBQUssRUFBRTt3Q0FBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7cUNBQVk7QUFFWDtJQUFSLEtBQUssRUFBRTswQ0FBb0I7QUFFbEI7SUFBVCxNQUFNLEVBQUU7dUNBQWlEO0FBRWhEO0lBQVQsTUFBTSxFQUFFO3VDQUFpRDtBQUVoRDtJQUFULE1BQU0sRUFBRTtzQ0FBZ0Q7QUFwQmhELE1BQU07SUF0QmxCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpQlQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNuRCxDQUFDO0dBQ1csTUFBTSxDQXFCbEI7U0FyQlksTUFBTTtBQTRCbkIsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQUFJLENBQUE7QUFBaEIsWUFBWTtJQUx4QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFDLE1BQU0sQ0FBQztRQUNqQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUMsTUFBTSxDQUFDO0tBQ3pDLENBQUM7R0FDVyxZQUFZLENBQUk7U0FBaEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsRGlyZWN0aXZlLENvbXBvbmVudCxFbGVtZW50UmVmLEV2ZW50RW1pdHRlcixBZnRlclZpZXdJbml0LE91dHB1dCxPbkRlc3Ryb3ksSW5wdXQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3BCdXR0b25dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQnV0dG9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBpY29uUG9zOiAnbGVmdCcgfCAncmlnaHQnID0gJ2xlZnQnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBjb3JuZXJTdHlsZUNsYXNzOiBzdHJpbmcgPSAndWktY29ybmVyLWFsbCc7XHJcbiAgICAgICAgXHJcbiAgICBwdWJsaWMgX2xhYmVsOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIHB1YmxpYyBfaWNvbjogc3RyaW5nO1xyXG4gICAgICAgICAgICBcclxuICAgIHB1YmxpYyBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XHJcbiAgICBcclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBEb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3Nlcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZ2V0U3R5bGVDbGFzcygpKTtcclxuICAgICAgICBpZiAodGhpcy5pY29uKSB7XHJcbiAgICAgICAgICAgIGxldCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgIGxldCBpY29uUG9zQ2xhc3MgPSAodGhpcy5pY29uUG9zID09ICdyaWdodCcpID8gJ3VpLWJ1dHRvbi1pY29uLXJpZ2h0JzogJ3VpLWJ1dHRvbi1pY29uLWxlZnQnO1xyXG4gICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSBpY29uUG9zQ2xhc3MgICsgJyB1aS1jbGlja2FibGUgJyArIHRoaXMuaWNvbjtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLmljb24gJiYgIXRoaXMubGFiZWwpIHtcclxuICAgICAgICAgICAgbGFiZWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYWJlbEVsZW1lbnQuY2xhc3NOYW1lID0gJ3VpLWJ1dHRvbi10ZXh0IHVpLWNsaWNrYWJsZSc7XHJcbiAgICAgICAgbGFiZWxFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMubGFiZWx8fCd1aS1idG4nKSk7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsRWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBnZXRTdHlsZUNsYXNzKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHN0eWxlQ2xhc3MgPSAndWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0ICcgKyB0aGlzLmNvcm5lclN0eWxlQ2xhc3M7XHJcbiAgICAgICAgaWYgKHRoaXMuaWNvbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sYWJlbCAhPSBudWxsICYmIHRoaXMubGFiZWwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pY29uUG9zID09ICdsZWZ0JylcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArICcgdWktYnV0dG9uLXRleHQtaWNvbi1sZWZ0JztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArICcgdWktYnV0dG9uLXRleHQtaWNvbi1yaWdodCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArICcgdWktYnV0dG9uLWljb24tb25seSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArICcgdWktYnV0dG9uLXRleHQtb25seSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArICcgdWktYnV0dG9uLXRleHQtZW1wdHknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBzdHlsZUNsYXNzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASW5wdXQoKSBnZXQgbGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGxhYmVsKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbGFiZWwgPSB2YWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy51aS1idXR0b24tdGV4dCcpLnRleHRDb250ZW50ID0gdGhpcy5fbGFiZWw7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaWNvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd1aS1idXR0b24tdGV4dC1lbXB0eScpO1xyXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktYnV0dG9uLXRleHQtb25seScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd1aS1idXR0b24tdGV4dC1lbXB0eScpO1xyXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktYnV0dG9uLXRleHQtb25seScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASW5wdXQoKSBnZXQgaWNvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pY29uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBpY29uKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faWNvbiA9IHZhbDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICBsZXQgaWNvblBvc0NsYXNzID0gKHRoaXMuaWNvblBvcyA9PSAncmlnaHQnKSA/ICd1aS1idXR0b24taWNvbi1yaWdodCc6ICd1aS1idXR0b24taWNvbi1sZWZ0JztcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy51aS1jbGlja2FibGUnKS5jbGFzc05hbWUgPVxyXG4gICAgICAgICAgICAgICAgaWNvblBvc0NsYXNzICsgJyB1aS1jbGlja2FibGUgJyArIHRoaXMuaWNvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB3aGlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQubGFzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1idXR0b24nLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8YnV0dG9uIFthdHRyLnR5cGVdPVwidHlwZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsJzp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLWljb24tb25seSc6IChpY29uICYmICFsYWJlbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tdGV4dC1pY29uLWxlZnQnOiAoaWNvbiAmJiBsYWJlbCAmJiBpY29uUG9zID09PSAnbGVmdCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXRleHQtaWNvbi1yaWdodCc6IChpY29uICYmIGxhYmVsICYmIGljb25Qb3MgPT09ICdyaWdodCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXRleHQtb25seSc6ICghaWNvbiAmJiBsYWJlbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1idXR0b24tdGV4dC1lbXB0eSc6ICghaWNvbiAmJiAhbGFiZWwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DbGljay5lbWl0KCRldmVudClcIiAoZm9jdXMpPVwib25Gb2N1cy5lbWl0KCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIuZW1pdCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwieyd1aS1jbGlja2FibGUnOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLWljb24tbGVmdCc6IChpY29uUG9zID09PSAnbGVmdCcpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1pY29uLXJpZ2h0JzogKGljb25Qb3MgPT09ICdyaWdodCcpfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJpY29uXCIgKm5nSWY9XCJpY29uXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1idXR0b24tdGV4dCB1aS1jbGlja2FibGVcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJpY29uICYmICFsYWJlbFwiPnt7bGFiZWx8fCd1aS1idG4nfX08L3NwYW4+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCdXR0b24ge1xyXG5cclxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBpY29uUG9zOiBzdHJpbmcgPSAnbGVmdCc7XHJcblxyXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0J1dHRvbkRpcmVjdGl2ZSxCdXR0b25dLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbQnV0dG9uRGlyZWN0aXZlLEJ1dHRvbl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbk1vZHVsZSB7IH1cclxuIl19