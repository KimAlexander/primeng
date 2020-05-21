var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, ElementRef, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButton),
    multi: true
};
let RadioButton = class RadioButton {
    constructor(cd) {
        this.cd = cd;
        this.onClick = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    handleClick(event, radioButton, focus) {
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.select(event);
        if (focus) {
            radioButton.focus();
        }
    }
    select(event) {
        if (!this.disabled) {
            this.inputViewChild.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
            this.onClick.emit(event);
        }
    }
    writeValue(value) {
        this.checked = (value == this.value);
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.checked = this.checked;
        }
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    onChange(event) {
        this.select(event);
    }
    focus() {
        this.inputViewChild.nativeElement.focus();
    }
};
RadioButton.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], RadioButton.prototype, "value", void 0);
__decorate([
    Input()
], RadioButton.prototype, "name", void 0);
__decorate([
    Input()
], RadioButton.prototype, "disabled", void 0);
__decorate([
    Input()
], RadioButton.prototype, "label", void 0);
__decorate([
    Input()
], RadioButton.prototype, "tabindex", void 0);
__decorate([
    Input()
], RadioButton.prototype, "inputId", void 0);
__decorate([
    Input()
], RadioButton.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], RadioButton.prototype, "style", void 0);
__decorate([
    Input()
], RadioButton.prototype, "styleClass", void 0);
__decorate([
    Input()
], RadioButton.prototype, "labelStyleClass", void 0);
__decorate([
    Output()
], RadioButton.prototype, "onClick", void 0);
__decorate([
    Output()
], RadioButton.prototype, "onFocus", void 0);
__decorate([
    Output()
], RadioButton.prototype, "onBlur", void 0);
__decorate([
    ViewChild('rb')
], RadioButton.prototype, "inputViewChild", void 0);
RadioButton = __decorate([
    Component({
        selector: 'p-radioButton',
        template: `
        <div [ngStyle]="style" [ngClass]="'ui-radiobutton ui-widget'" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [attr.value]="value" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy"
                    [checked]="checked" (change)="onChange($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled">
            </div>
            <div (click)="handleClick($event, rb, true)" role="radio" [attr.aria-checked]="checked"
                [ngClass]="{'ui-radiobutton-box ui-widget ui-state-default':true,
                'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}">
                <span class="ui-radiobutton-icon ui-clickable" [ngClass]="{'pi pi-circle-on':rb.checked}"></span>
            </div>
        </div>
        <label (click)="select($event)" [class]="labelStyleClass"
            [ngClass]="{'ui-radiobutton-label':true, 'ui-label-active':rb.checked, 'ui-label-disabled':disabled, 'ui-label-focus':focused}"
            *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
        providers: [RADIO_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.Default
    })
], RadioButton);
export { RadioButton };
let RadioButtonModule = class RadioButtonModule {
};
RadioButtonModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [RadioButton],
        declarations: [RadioButton]
    })
], RadioButtonModule);
export { RadioButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3JhZGlvYnV0dG9uLyIsInNvdXJjZXMiOlsicmFkaW9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckosT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBUTtJQUNyQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQXVCRixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBc0NwQixZQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWhCL0IsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJbEQsa0JBQWEsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFNQyxDQUFDO0lBRTdDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUs7UUFDakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtR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QUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNuRCxDQUFDO0dBQ1csV0FBVyxDQXVHdkI7U0F2R1ksV0FBVztBQThHeEIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FBSSxDQUFBO0FBQXJCLGlCQUFpQjtJQUw3QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUM5QixDQUFDO0dBQ1csaUJBQWlCLENBQUk7U0FBckIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsT3V0cHV0LEVsZW1lbnRSZWYsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsVmlld0NoaWxkLENoYW5nZURldGVjdG9yUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3QgUkFESU9fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUmFkaW9CdXR0b24pLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXJhZGlvQnV0dG9uJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIid1aS1yYWRpb2J1dHRvbiB1aS13aWRnZXQnXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0ICNyYiB0eXBlPVwicmFkaW9cIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIudmFsdWVdPVwidmFsdWVcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCwgcmIsIHRydWUpXCIgcm9sZT1cInJhZGlvXCIgW2F0dHIuYXJpYS1jaGVja2VkXT1cImNoZWNrZWRcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1yYWRpb2J1dHRvbi1ib3ggdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsXHJcbiAgICAgICAgICAgICAgICAndWktc3RhdGUtYWN0aXZlJzpyYi5jaGVja2VkLCd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1c2VkfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1yYWRpb2J1dHRvbi1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2lyY2xlLW9uJzpyYi5jaGVja2VkfVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGxhYmVsIChjbGljayk9XCJzZWxlY3QoJGV2ZW50KVwiIFtjbGFzc109XCJsYWJlbFN0eWxlQ2xhc3NcIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXJhZGlvYnV0dG9uLWxhYmVsJzp0cnVlLCAndWktbGFiZWwtYWN0aXZlJzpyYi5jaGVja2VkLCAndWktbGFiZWwtZGlzYWJsZWQnOmRpc2FibGVkLCAndWktbGFiZWwtZm9jdXMnOmZvY3VzZWR9XCJcclxuICAgICAgICAgICAgKm5nSWY9XCJsYWJlbFwiIFthdHRyLmZvcl09XCJpbnB1dElkXCI+e3tsYWJlbH19PC9sYWJlbD5cclxuICAgIGAsXHJcbiAgICBwcm92aWRlcnM6IFtSQURJT19WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGxhYmVsU3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBWaWV3Q2hpbGQoJ3JiJykgaW5wdXRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICAgICAgICAgIFxyXG4gICAgcHVibGljIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcbiAgICBcclxuICAgIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICAgIFxyXG4gICAgcHVibGljIGNoZWNrZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgXHJcbiAgICBwdWJsaWMgZm9jdXNlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuICAgIFxyXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQsIHJhZGlvQnV0dG9uLCBmb2N1cykge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0KGV2ZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgICAgICAgIHJhZGlvQnV0dG9uLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZWxlY3QoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9ICh2YWx1ZSA9PSB0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBvbklucHV0Qmx1cihldmVudCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtSYWRpb0J1dHRvbl0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtSYWRpb0J1dHRvbl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uTW9kdWxlIHsgfSJdfQ==