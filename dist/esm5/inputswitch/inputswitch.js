var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, forwardRef, EventEmitter, Output, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var INPUTSWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return InputSwitch; }),
    multi: true
};
var InputSwitch = /** @class */ (function () {
    function InputSwitch(cd) {
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.checked = false;
        this.focused = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    InputSwitch.prototype.onClick = function (event, cb) {
        if (!this.disabled && !this.readonly) {
            event.preventDefault();
            this.toggle(event);
            cb.focus();
        }
    };
    InputSwitch.prototype.onInputChange = function (event) {
        if (!this.readonly) {
            var inputChecked = event.target.checked;
            this.updateModel(event, inputChecked);
        }
    };
    InputSwitch.prototype.toggle = function (event) {
        this.updateModel(event, !this.checked);
    };
    InputSwitch.prototype.updateModel = function (event, value) {
        this.checked = value;
        this.onModelChange(this.checked);
        this.onChange.emit({
            originalEvent: event,
            checked: this.checked
        });
    };
    InputSwitch.prototype.onFocus = function (event) {
        this.focused = true;
    };
    InputSwitch.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    InputSwitch.prototype.writeValue = function (checked) {
        this.checked = checked;
        this.cd.markForCheck();
    };
    InputSwitch.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    InputSwitch.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    InputSwitch.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    InputSwitch.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], InputSwitch.prototype, "style", void 0);
    __decorate([
        Input()
    ], InputSwitch.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], InputSwitch.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], InputSwitch.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], InputSwitch.prototype, "name", void 0);
    __decorate([
        Input()
    ], InputSwitch.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], InputSwitch.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], InputSwitch.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Output()
    ], InputSwitch.prototype, "onChange", void 0);
    InputSwitch = __decorate([
        Component({
            selector: 'p-inputSwitch',
            template: "\n        <div [ngClass]=\"{'ui-inputswitch ui-widget': true, 'ui-inputswitch-checked': checked, 'ui-state-disabled': disabled, 'ui-inputswitch-readonly': readonly, 'ui-inputswitch-focus': focused}\" \n            [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onClick($event, cb)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.tabindex]=\"tabindex\" [checked]=\"checked\" (change)=\"onInputChange($event)\"\n                    (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" [disabled]=\"disabled\" role=\"switch\" [attr.aria-checked]=\"checked\" [attr.aria-labelledby]=\"ariaLabelledBy\"/>\n            </div>\n            <span class=\"ui-inputswitch-slider\"></span>\n        </div>\n    ",
            providers: [INPUTSWITCH_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], InputSwitch);
    return InputSwitch;
}());
export { InputSwitch };
var InputSwitchModule = /** @class */ (function () {
    function InputSwitchModule() {
    }
    InputSwitchModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [InputSwitch],
            declarations: [InputSwitch]
        })
    ], InputSwitchModule);
    return InputSwitchModule;
}());
export { InputSwitchModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRzd2l0Y2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2lucHV0c3dpdGNoLyIsInNvdXJjZXMiOlsiaW5wdXRzd2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQXNCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEUsTUFBTSxDQUFDLElBQU0sMEJBQTBCLEdBQVE7SUFDN0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxXQUFXLEVBQVgsQ0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQWlCRjtJQTRCSSxxQkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFWL0IsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTNELFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixrQkFBYSxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsY0FBTyxDQUFDLENBQUM7SUFFUSxDQUFDO0lBRTdDLDZCQUFPLEdBQVAsVUFBUSxLQUFZLEVBQUUsRUFBb0I7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztT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bnRFbWl0dGVyLE91dHB1dCxDaGFuZ2VEZXRlY3RvclJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3QgSU5QVVRTV0lUQ0hfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dFN3aXRjaCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWlucHV0U3dpdGNoJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLWlucHV0c3dpdGNoIHVpLXdpZGdldCc6IHRydWUsICd1aS1pbnB1dHN3aXRjaC1jaGVja2VkJzogY2hlY2tlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzogZGlzYWJsZWQsICd1aS1pbnB1dHN3aXRjaC1yZWFkb25seSc6IHJlYWRvbmx5LCAndWktaW5wdXRzd2l0Y2gtZm9jdXMnOiBmb2N1c2VkfVwiIFxyXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50LCBjYilcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0ICNjYiB0eXBlPVwiY2hlY2tib3hcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgKGNoYW5nZSk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIHJvbGU9XCJzd2l0Y2hcIiBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiY2hlY2tlZFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktaW5wdXRzd2l0Y2gtc2xpZGVyXCI+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHByb3ZpZGVyczogW0lOUFVUU1dJVENIX1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRTd2l0Y2ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG5cclxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50LCBjYjogSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XHJcbiAgICAgICAgICAgIGNiLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0Q2hlY2tlZCA9ICg8SFRNTElucHV0RWxlbWVudD4gZXZlbnQudGFyZ2V0KS5jaGVja2VkO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50LCBpbnB1dENoZWNrZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCwgIXRoaXMuY2hlY2tlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTW9kZWwoZXZlbnQ6IEV2ZW50LCB2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmNoZWNrZWQpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICBjaGVja2VkOiB0aGlzLmNoZWNrZWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkZvY3VzKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25CbHVyKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKGNoZWNrZWQ6IGFueSkgOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xyXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0lucHV0U3dpdGNoXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0lucHV0U3dpdGNoXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRTd2l0Y2hNb2R1bGUgeyB9XHJcbiJdfQ==