var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ToggleButton; }),
    multi: true
};
var ToggleButton = /** @class */ (function () {
    function ToggleButton() {
        this.onLabel = 'Yes';
        this.offLabel = 'No';
        this.iconPos = 'left';
        this.onChange = new EventEmitter();
        this.checked = false;
        this.focus = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    ToggleButton.prototype.ngAfterViewInit = function () {
        if (this.checkboxViewChild) {
            this.checkbox = this.checkboxViewChild.nativeElement;
        }
    };
    ToggleButton.prototype.toggle = function (event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            if (this.checkbox) {
                this.checkbox.focus();
            }
        }
    };
    ToggleButton.prototype.onFocus = function () {
        this.focus = true;
    };
    ToggleButton.prototype.onBlur = function () {
        this.focus = false;
        this.onModelTouched();
    };
    ToggleButton.prototype.writeValue = function (value) {
        this.checked = value;
    };
    ToggleButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ToggleButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    ToggleButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Object.defineProperty(ToggleButton.prototype, "hasOnLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleButton.prototype, "hasOffLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], ToggleButton.prototype, "onLabel", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "offLabel", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "onIcon", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "offIcon", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "style", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "iconPos", void 0);
    __decorate([
        Output()
    ], ToggleButton.prototype, "onChange", void 0);
    __decorate([
        ViewChild('checkbox')
    ], ToggleButton.prototype, "checkboxViewChild", void 0);
    ToggleButton = __decorate([
        Component({
            selector: 'p-toggleButton',
            template: "\n        <div [ngClass]=\"{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon && !offIcon), \n                'ui-button-text-icon-left': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'left'), \n                'ui-button-text-icon-right': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'right'),'ui-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),\n                'ui-state-active': checked,'ui-state-focus':focus,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\" \n                (click)=\"toggle($event)\" (keydown.enter)=\"toggle($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #checkbox type=\"checkbox\" [attr.id]=\"inputId\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.tabindex]=\"tabindex\"\n                    role=\"button\" [attr.aria-pressed]=\"checked\" [attr.aria-labelledby]=\"ariaLabelledBy\">\n            </div>\n            <span *ngIf=\"onIcon||offIcon\" class=\"ui-button-icon-left\" [class]=\"checked ? this.onIcon : this.offIcon\" [ngClass]=\"{'ui-button-icon-left': (iconPos === 'left'), \n            'ui-button-icon-right': (iconPos === 'right')}\"></span>\n            <span class=\"ui-button-text ui-unselectable-text\">{{checked ? hasOnLabel ? onLabel : 'ui-btn' : hasOffLabel ? offLabel : 'ui-btn'}}</span>\n        </div>\n    ",
            providers: [TOGGLEBUTTON_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], ToggleButton);
    return ToggleButton;
}());
export { ToggleButton };
var ToggleButtonModule = /** @class */ (function () {
    function ToggleButtonModule() {
    }
    ToggleButtonModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ToggleButton],
            declarations: [ToggleButton]
        })
    ], ToggleButtonModule);
    return ToggleButtonModule;
}());
export { ToggleButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy90b2dnbGVidXR0b24vIiwic291cmNlcyI6WyJ0b2dnbGVidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFlLFNBQVMsRUFBWSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqSixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxJQUFNLDJCQUEyQixHQUFRO0lBQzlDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsWUFBWSxFQUFaLENBQVksQ0FBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFzQkY7SUFBQTtRQUVhLFlBQU8sR0FBVyxLQUFLLENBQUM7UUFFeEIsYUFBUSxHQUFXLElBQUksQ0FBQztRQWtCeEIsWUFBTyxHQUFXLE1BQU0sQ0FBQztRQUV4QixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNM0QsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBRXZCLGtCQUFhLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxjQUFPLENBQUMsQ0FBQztJQXVEeEMsQ0FBQztJQXJERyxzQ0FBZSxHQUFmO1FBQ0ksSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBc0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQU8sS0FBWTtRQUNmLElBQUksQ0FB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SUFBbUM7U0FBdEIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixmb3J3YXJkUmVmLEFmdGVyVmlld0luaXQsVmlld0NoaWxkLEVsZW1lbnRSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBjb25zdCBUT0dHTEVCVVRUT05fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUb2dnbGVCdXR0b24pLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC10b2dnbGVCdXR0b24nLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktYnV0dG9uIHVpLXRvZ2dsZWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLWJ1dHRvbi10ZXh0LW9ubHknOiAoIW9uSWNvbiAmJiAhb2ZmSWNvbiksIFxyXG4gICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWljb24tbGVmdCc6IChvbkljb24gJiYgb2ZmSWNvbiAmJiBoYXNPbkxhYmVsICYmIGhhc09mZkxhYmVsICYmIGljb25Qb3MgPT09ICdsZWZ0JyksIFxyXG4gICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWljb24tcmlnaHQnOiAob25JY29uICYmIG9mZkljb24gJiYgaGFzT25MYWJlbCAmJiBoYXNPZmZMYWJlbCAmJiBpY29uUG9zID09PSAncmlnaHQnKSwndWktYnV0dG9uLWljb24tb25seSc6IChvbkljb24gJiYgb2ZmSWNvbiAmJiAhaGFzT25MYWJlbCAmJiAhaGFzT2ZmTGFiZWwpLFxyXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWFjdGl2ZSc6IGNoZWNrZWQsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1cywndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cInRvZ2dsZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCAjY2hlY2tib3ggdHlwZT1cImNoZWNrYm94XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFtjaGVja2VkXT1cImNoZWNrZWRcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiIFthdHRyLmFyaWEtcHJlc3NlZF09XCJjaGVja2VkXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm9uSWNvbnx8b2ZmSWNvblwiIGNsYXNzPVwidWktYnV0dG9uLWljb24tbGVmdFwiIFtjbGFzc109XCJjaGVja2VkID8gdGhpcy5vbkljb24gOiB0aGlzLm9mZkljb25cIiBbbmdDbGFzc109XCJ7J3VpLWJ1dHRvbi1pY29uLWxlZnQnOiAoaWNvblBvcyA9PT0gJ2xlZnQnKSwgXHJcbiAgICAgICAgICAgICd1aS1idXR0b24taWNvbi1yaWdodCc6IChpY29uUG9zID09PSAncmlnaHQnKX1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYnV0dG9uLXRleHQgdWktdW5zZWxlY3RhYmxlLXRleHRcIj57e2NoZWNrZWQgPyBoYXNPbkxhYmVsID8gb25MYWJlbCA6ICd1aS1idG4nIDogaGFzT2ZmTGFiZWwgPyBvZmZMYWJlbCA6ICd1aS1idG4nfX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgcHJvdmlkZXJzOiBbVE9HR0xFQlVUVE9OX1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9nZ2xlQnV0dG9uIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgQElucHV0KCkgb25MYWJlbDogc3RyaW5nID0gJ1llcyc7XHJcblxyXG4gICAgQElucHV0KCkgb2ZmTGFiZWw6IHN0cmluZyA9ICdObyc7XHJcblxyXG4gICAgQElucHV0KCkgb25JY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgb2ZmSWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgaWNvblBvczogc3RyaW5nID0gJ2xlZnQnO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBWaWV3Q2hpbGQoJ2NoZWNrYm94JykgY2hlY2tib3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICBcclxuICAgIGNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgXHJcbiAgICBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgZm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICAgIFxyXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcbiAgICBcclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2JveFZpZXdDaGlsZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3ggPSA8SFRNTElucHV0RWxlbWVudD4gdGhpcy5jaGVja2JveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5jaGVja2VkKTtcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLmNoZWNrZWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrYm94LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Gb2N1cygpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25CbHVyKCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGhhc09uTGFiZWwoKTpib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vbkxhYmVsICYmIHRoaXMub25MYWJlbC5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgaGFzT2ZmTGFiZWwoKTpib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vbkxhYmVsICYmIHRoaXMub25MYWJlbC5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbVG9nZ2xlQnV0dG9uXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1RvZ2dsZUJ1dHRvbl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRvZ2dsZUJ1dHRvbk1vZHVsZSB7IH1cclxuIl19