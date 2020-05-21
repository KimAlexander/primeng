var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, TemplateRef, forwardRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Chips),
    multi: true
};
let Chips = class Chips {
    constructor(el) {
        this.el = el;
        this.allowDuplicate = true;
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onChipClick = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    onClick() {
        this.inputViewChild.nativeElement.focus();
    }
    onInput() {
        this.updateFilledState();
    }
    onPaste(event) {
        if (this.separator) {
            let pastedData = (event.clipboardData || window['clipboardData']).getData('Text');
            pastedData.split(this.separator).forEach(val => {
                this.addItem(event, val, true);
            });
            this.inputViewChild.nativeElement.value = '';
        }
        this.updateFilledState();
    }
    updateFilledState() {
        if (!this.value || this.value.length === 0) {
            this.filled = (this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '');
        }
        else {
            this.filled = true;
        }
    }
    onItemClick(event, item) {
        this.onChipClick.emit({
            originalEvent: event,
            value: item
        });
    }
    writeValue(value) {
        this.value = value;
        this.updateMaxedOut();
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
    resolveFieldData(data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields = field.split('.');
                let value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focus = false;
        if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
            this.addItem(event, this.inputViewChild.nativeElement.value, false);
        }
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    removeItem(event, index) {
        if (this.disabled) {
            return;
        }
        let removedItem = this.value[index];
        this.value = this.value.filter((val, i) => i != index);
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.updateFilledState();
        this.updateMaxedOut();
    }
    addItem(event, item, preventDefault) {
        this.value = this.value || [];
        if (item && item.trim().length) {
            if (this.allowDuplicate || this.value.indexOf(item) === -1) {
                this.value = [...this.value, item];
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
        this.updateFilledState();
        this.updateMaxedOut();
        this.inputViewChild.nativeElement.value = '';
        if (preventDefault) {
            event.preventDefault();
        }
    }
    onKeydown(event) {
        switch (event.which) {
            //backspace
            case 8:
                if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
                    this.value = [...this.value];
                    let removedItem = this.value.pop();
                    this.onModelChange(this.value);
                    this.onRemove.emit({
                        originalEvent: event,
                        value: removedItem
                    });
                    this.updateFilledState();
                }
                break;
            //enter
            case 13:
                this.addItem(event, this.inputViewChild.nativeElement.value, true);
                break;
            case 9:
                if (this.addOnTab && this.inputViewChild.nativeElement.value !== '') {
                    this.addItem(event, this.inputViewChild.nativeElement.value, true);
                }
                break;
            default:
                if (this.max && this.value && this.max === this.value.length) {
                    event.preventDefault();
                }
                else if (this.separator) {
                    if (this.separator === ',' && event.which === 188) {
                        this.addItem(event, this.inputViewChild.nativeElement.value, true);
                    }
                }
                break;
        }
    }
    updateMaxedOut() {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.max && this.value && this.max === this.value.length)
                this.inputViewChild.nativeElement.disabled = true;
            else
                this.inputViewChild.nativeElement.disabled = this.disabled || false;
        }
    }
};
Chips.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Chips.prototype, "style", void 0);
__decorate([
    Input()
], Chips.prototype, "styleClass", void 0);
__decorate([
    Input()
], Chips.prototype, "disabled", void 0);
__decorate([
    Input()
], Chips.prototype, "field", void 0);
__decorate([
    Input()
], Chips.prototype, "placeholder", void 0);
__decorate([
    Input()
], Chips.prototype, "max", void 0);
__decorate([
    Input()
], Chips.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], Chips.prototype, "tabindex", void 0);
__decorate([
    Input()
], Chips.prototype, "inputId", void 0);
__decorate([
    Input()
], Chips.prototype, "allowDuplicate", void 0);
__decorate([
    Input()
], Chips.prototype, "inputStyle", void 0);
__decorate([
    Input()
], Chips.prototype, "inputStyleClass", void 0);
__decorate([
    Input()
], Chips.prototype, "addOnTab", void 0);
__decorate([
    Input()
], Chips.prototype, "addOnBlur", void 0);
__decorate([
    Input()
], Chips.prototype, "separator", void 0);
__decorate([
    Output()
], Chips.prototype, "onAdd", void 0);
__decorate([
    Output()
], Chips.prototype, "onRemove", void 0);
__decorate([
    Output()
], Chips.prototype, "onFocus", void 0);
__decorate([
    Output()
], Chips.prototype, "onBlur", void 0);
__decorate([
    Output()
], Chips.prototype, "onChipClick", void 0);
__decorate([
    ViewChild('inputtext')
], Chips.prototype, "inputViewChild", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], Chips.prototype, "templates", void 0);
Chips = __decorate([
    Component({
        selector: 'p-chips',
        template: `
        <div [ngClass]="'ui-chips ui-widget'" [ngStyle]="style" [class]="styleClass" (click)="onClick()">
            <ul [ngClass]="{'ui-inputtext ui-state-default ui-corner-all':true,'ui-state-focus':focus,'ui-state-disabled':disabled}">
                <li #token *ngFor="let item of value; let i = index;" class="ui-chips-token ui-state-highlight ui-corner-all" (click)="onItemClick($event, item)">
                    <span *ngIf="!disabled" class="ui-chips-token-icon pi pi-fw pi-times" (click)="removeItem($event,i)"></span>
                    <span *ngIf="!itemTemplate" class="ui-chips-token-label">{{field ? resolveFieldData(item,field) : item}}</span>
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                </li>
                <li class="ui-chips-input-token">
                    <input #inputtext type="text" [attr.id]="inputId" [attr.placeholder]="(value && value.length ? null : placeholder)" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)"
                    (input)="onInput()" (paste)="onPaste($event)" [attr.aria-labelledby]="ariaLabelledBy" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled" [ngStyle]="inputStyle" [class]="inputStyleClass">
                </li>
            </ul>
        </div>
    `,
        host: {
            '[class.ui-inputwrapper-filled]': 'filled',
            '[class.ui-inputwrapper-focus]': 'focus'
        },
        providers: [CHIPS_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.Default
    })
], Chips);
export { Chips };
let ChipsModule = class ChipsModule {
};
ChipsModule = __decorate([
    NgModule({
        imports: [CommonModule, InputTextModule, SharedModule],
        exports: [Chips, InputTextModule, SharedModule],
        declarations: [Chips]
    })
], ChipsModule);
export { ChipsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NoaXBzLyIsInNvdXJjZXMiOlsiY2hpcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLGdCQUFnQixFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUwsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQVE7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNwQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUEwQkYsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBSztJQTREZCxZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXhDeEIsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFZOUIsVUFBSyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRS9DLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFVOUQsa0JB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QztRQUM3QyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDeEIsQ0FBQztHQUNXLFdBQVcsQ0FBSTtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQWZ0ZXJDb250ZW50SW5pdCxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLGZvcndhcmRSZWYsVmlld0NoaWxkLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtJbnB1dFRleHRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcclxuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBjb25zdCBDSElQU19WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENoaXBzKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtY2hpcHMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS1jaGlwcyB1aS13aWRnZXQnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIChjbGljayk9XCJvbkNsaWNrKClcIj5cclxuICAgICAgICAgICAgPHVsIFtuZ0NsYXNzXT1cInsndWktaW5wdXR0ZXh0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktc3RhdGUtZm9jdXMnOmZvY3VzLCd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWR9XCI+XHJcbiAgICAgICAgICAgICAgICA8bGkgI3Rva2VuICpuZ0Zvcj1cImxldCBpdGVtIG9mIHZhbHVlOyBsZXQgaSA9IGluZGV4O1wiIGNsYXNzPVwidWktY2hpcHMtdG9rZW4gdWktc3RhdGUtaGlnaGxpZ2h0IHVpLWNvcm5lci1hbGxcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWRpc2FibGVkXCIgY2xhc3M9XCJ1aS1jaGlwcy10b2tlbi1pY29uIHBpIHBpLWZ3IHBpLXRpbWVzXCIgKGNsaWNrKT1cInJlbW92ZUl0ZW0oJGV2ZW50LGkpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWl0ZW1UZW1wbGF0ZVwiIGNsYXNzPVwidWktY2hpcHMtdG9rZW4tbGFiZWxcIj57e2ZpZWxkID8gcmVzb2x2ZUZpZWxkRGF0YShpdGVtLGZpZWxkKSA6IGl0ZW19fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLWNoaXBzLWlucHV0LXRva2VuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0ICNpbnB1dHRleHQgdHlwZT1cInRleHRcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwiKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IG51bGwgOiBwbGFjZWhvbGRlcilcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAoaW5wdXQpPVwib25JbnB1dCgpXCIgKHBhc3RlKT1cIm9uUGFzdGUoJGV2ZW50KVwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCIgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxyXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcclxuICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IFtDSElQU19WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIENoaXBzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZmllbGQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYWxsb3dEdXBsaWNhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGlucHV0U3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBhZGRPblRhYjogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBhZGRPbkJsdXI6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgc2VwYXJhdG9yOiBzdHJpbmc7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQWRkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25SZW1vdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25DaGlwQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0dGV4dCcpIGlucHV0Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIHZhbHVlOiBhbnk7XHJcblxyXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuXHJcbiAgICB2YWx1ZUNoYW5nZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgZm9jdXM6IGJvb2xlYW47XHJcblxyXG4gICAgZmlsbGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXQoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGFzdGUoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5zZXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgbGV0IHBhc3RlZERhdGEgPSAoZXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3dbJ2NsaXBib2FyZERhdGEnXSkuZ2V0RGF0YSgnVGV4dCcpO1xyXG4gICAgICAgICAgICBwYXN0ZWREYXRhLnNwbGl0KHRoaXMuc2VwYXJhdG9yKS5mb3JFYWNoKHZhbCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oZXZlbnQsIHZhbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy52YWx1ZSB8fCB0aGlzLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbGxlZCA9ICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlICE9ICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsbGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25JdGVtQ2xpY2soZXZlbnQ6IEV2ZW50LCBpdGVtOiBhbnkpIHtcclxuICAgICAgICB0aGlzLm9uQ2hpcENsaWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgdmFsdWU6IGl0ZW1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWF4ZWRPdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzb2x2ZUZpZWxkRGF0YShkYXRhOiBhbnksIGZpZWxkOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGlmIChkYXRhICYmIGZpZWxkKSB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZC5pbmRleE9mKCcuJykgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ZpZWxkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZHM6IHN0cmluZ1tdID0gZmllbGQuc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBmaWVsZHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW2ZpZWxkc1tpXV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbklucHV0Rm9jdXMoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dEJsdXIoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkT25CbHVyICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEl0ZW0oZXZlbnQsIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XHJcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSXRlbShldmVudDogRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVtb3ZlZEl0ZW0gPSB0aGlzLnZhbHVlW2luZGV4XTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIoKHZhbCwgaSkgPT4gaSE9aW5kZXgpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQoe1xyXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgdmFsdWU6IHJlbW92ZWRJdGVtXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWF4ZWRPdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJdGVtKGV2ZW50OiBFdmVudCwgaXRlbTogc3RyaW5nLCBwcmV2ZW50RGVmYXVsdDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlfHxbXTtcclxuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLnRyaW0oKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWxsb3dEdXBsaWNhdGUgfHwgdGhpcy52YWx1ZS5pbmRleE9mKGl0ZW0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLnZhbHVlLCBpdGVtXTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25BZGQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1heGVkT3V0KCk7XHJcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2goZXZlbnQud2hpY2gpIHtcclxuICAgICAgICAgICAgLy9iYWNrc3BhY2VcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGggPT09IDAgJiYgdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1vdmVkSXRlbSA9IHRoaXMudmFsdWUucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25SZW1vdmUuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcmVtb3ZlZEl0ZW1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy9lbnRlclxyXG4gICAgICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGV2ZW50LCB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUsIHRydWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkZE9uVGFiICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oZXZlbnQsIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heCAmJiB0aGlzLnZhbHVlICYmIHRoaXMubWF4ID09PSB0aGlzLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNlcGFyYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlcGFyYXRvciA9PT0gJywnICYmIGV2ZW50LndoaWNoID09PSAxODgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGV2ZW50LCB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1heGVkT3V0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXggJiYgdGhpcy52YWx1ZSAmJiB0aGlzLm1heCA9PT0gdGhpcy52YWx1ZS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkIHx8IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsSW5wdXRUZXh0TW9kdWxlLFNoYXJlZE1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbQ2hpcHMsSW5wdXRUZXh0TW9kdWxlLFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtDaGlwc11cclxufSlcclxuZXhwb3J0IGNsYXNzIENoaXBzTW9kdWxlIHsgfVxyXG4iXX0=