var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Directive, ElementRef, HostListener, Input, Output, DoCheck, EventEmitter, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
let InputTextarea = class InputTextarea {
    constructor(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
        this.onResize = new EventEmitter();
    }
    ngDoCheck() {
        this.updateFilledState();
        if (this.autoResize) {
            this.resize();
        }
    }
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    onInput(e) {
        this.updateFilledState();
        if (this.autoResize) {
            this.resize(e);
        }
    }
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
    }
    onFocus(e) {
        if (this.autoResize) {
            this.resize(e);
        }
    }
    onBlur(e) {
        if (this.autoResize) {
            this.resize(e);
        }
    }
    resize(event) {
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
        if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = "scroll";
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
        }
        else {
            this.el.nativeElement.style.overflow = "hidden";
        }
        this.onResize.emit(event || {});
    }
};
InputTextarea.ctorParameters = () => [
    { type: ElementRef },
    { type: NgModel, decorators: [{ type: Optional }] }
];
__decorate([
    Input()
], InputTextarea.prototype, "autoResize", void 0);
__decorate([
    Output()
], InputTextarea.prototype, "onResize", void 0);
__decorate([
    HostListener('input', ['$event'])
], InputTextarea.prototype, "onInput", null);
__decorate([
    HostListener('focus', ['$event'])
], InputTextarea.prototype, "onFocus", null);
__decorate([
    HostListener('blur', ['$event'])
], InputTextarea.prototype, "onBlur", null);
InputTextarea = __decorate([
    Directive({
        selector: '[pInputTextarea]',
        host: {
            '[class.ui-inputtext]': 'true',
            '[class.ui-corner-all]': 'true',
            '[class.ui-inputtextarea-resizable]': 'autoResize',
            '[class.ui-state-default]': 'true',
            '[class.ui-widget]': 'true',
            '[class.ui-state-filled]': 'filled'
        }
    }),
    __param(1, Optional())
], InputTextarea);
export { InputTextarea };
let InputTextareaModule = class InputTextareaModule {
};
InputTextareaModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [InputTextarea],
        declarations: [InputTextarea]
    })
], InputTextareaModule);
export { InputTextareaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXR0ZXh0YXJlYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvaW5wdXR0ZXh0YXJlYS8iLCJzb3VyY2VzIjpbImlucHV0dGV4dGFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFhN0MsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVV0QixZQUFtQixFQUFjLEVBQXFCLE9BQWdCO1FBQW5ELE9BQUUsR0FBRixFQUFFLENBQVk7UUFBcUIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQU41RCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFNYyxDQUFDO0lBRTFFLFNBQVM7UUFDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVELDBHQUEwRztJQUUxRyxPQUFPLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FB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T3V0cHV0LERvQ2hlY2ssRXZlbnRFbWl0dGVyLE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ01vZGVsfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twSW5wdXRUZXh0YXJlYV0nLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR0ZXh0XSc6ICd0cnVlJyxcclxuICAgICAgICAnW2NsYXNzLnVpLWNvcm5lci1hbGxdJzogJ3RydWUnLFxyXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR0ZXh0YXJlYS1yZXNpemFibGVdJzogJ2F1dG9SZXNpemUnLFxyXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZGVmYXVsdF0nOiAndHJ1ZScsXHJcbiAgICAgICAgJ1tjbGFzcy51aS13aWRnZXRdJzogJ3RydWUnLFxyXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZmlsbGVkXSc6ICdmaWxsZWQnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnB1dFRleHRhcmVhIGltcGxlbWVudHMgRG9DaGVjayB7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGF1dG9SZXNpemU6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvblJlc2l6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICBmaWxsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY2FjaGVkU2Nyb2xsSGVpZ2h0Om51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIEBPcHRpb25hbCgpIHB1YmxpYyBuZ01vZGVsOiBOZ01vZGVsKSB7fVxyXG4gICAgICAgIFxyXG4gICAgbmdEb0NoZWNrKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5hdXRvUmVzaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL1RvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiB0byBtYW5hZ2UgdWktc3RhdGUtZmlsbGVkIGZvciBtYXRlcmlhbCBsYWJlbHMgd2hlbiB0aGVyZSBpcyBubyB2YWx1ZSBiaW5kaW5nXHJcbiAgICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXHJcbiAgICBvbklucHV0KGUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZShlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuZmlsbGVkID0gKHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoKSB8fCAodGhpcy5uZ01vZGVsICYmIHRoaXMubmdNb2RlbC5tb2RlbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSlcclxuICAgIG9uRm9jdXMoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemUoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcclxuICAgIG9uQmx1cihlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZShlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlc2l6ZShldmVudD86IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9ICdhdXRvJztcclxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCArICdweCc7XHJcblxyXG4gICAgICAgIGlmIChwYXJzZUZsb2F0KHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQpID49IHBhcnNlRmxvYXQodGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLm1heEhlaWdodCkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLm92ZXJmbG93WSA9IFwic2Nyb2xsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25SZXNpemUuZW1pdChldmVudHx8e30pO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbSW5wdXRUZXh0YXJlYV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtJbnB1dFRleHRhcmVhXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0YXJlYU1vZHVsZSB7IH1cclxuIl19