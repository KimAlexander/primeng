var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, HostListener, Input, OnDestroy, DoCheck, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let Password = class Password {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.promptLabel = 'Enter a password';
        this.weakLabel = 'Weak';
        this.mediumLabel = 'Medium';
        this.strongLabel = 'Strong';
        this.feedback = true;
    }
    set showPassword(show) {
        this.el.nativeElement.type = show ? 'text' : 'password';
    }
    ngDoCheck() {
        this.updateFilledState();
    }
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    onInput(e) {
        this.updateFilledState();
    }
    updateFilledState() {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    }
    createPanel() {
        this.panel = document.createElement('div');
        this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all';
        this.meter = document.createElement('div');
        this.meter.className = 'ui-password-meter';
        this.info = document.createElement('div');
        this.info.className = 'ui-password-info';
        this.info.textContent = this.promptLabel;
        this.panel.appendChild(this.meter);
        this.panel.appendChild(this.info);
        this.panel.style.minWidth = DomHandler.getOuterWidth(this.el.nativeElement) + 'px';
        document.body.appendChild(this.panel);
    }
    onFocus(e) {
        if (this.feedback) {
            if (!this.panel) {
                this.createPanel();
            }
            this.panel.style.zIndex = String(++DomHandler.zindex);
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    DomHandler.addClass(this.panel, 'ui-password-panel-visible');
                    DomHandler.removeClass(this.panel, 'ui-password-panel-hidden');
                }, 1);
                DomHandler.absolutePosition(this.panel, this.el.nativeElement);
            });
        }
    }
    onBlur(e) {
        if (this.feedback) {
            DomHandler.addClass(this.panel, 'ui-password-panel-hidden');
            DomHandler.removeClass(this.panel, 'ui-password-panel-visible');
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.ngOnDestroy();
                }, 150);
            });
        }
    }
    onKeyup(e) {
        if (this.feedback) {
            let value = e.target.value, label = null, meterPos = null;
            if (value.length === 0) {
                label = this.promptLabel;
                meterPos = '0px 0px';
            }
            else {
                var score = this.testStrength(value);
                if (score < 30) {
                    label = this.weakLabel;
                    meterPos = '0px -10px';
                }
                else if (score >= 30 && score < 80) {
                    label = this.mediumLabel;
                    meterPos = '0px -20px';
                }
                else if (score >= 80) {
                    label = this.strongLabel;
                    meterPos = '0px -30px';
                }
            }
            this.meter.style.backgroundPosition = meterPos;
            this.info.textContent = label;
        }
    }
    testStrength(str) {
        let grade = 0;
        let val;
        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
        grade *= str.length / 8;
        return grade > 100 ? 100 : grade;
    }
    normalize(x, y) {
        let diff = x - y;
        if (diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y / 4));
    }
    get disabled() {
        return this.el.nativeElement.disabled;
    }
    ngOnDestroy() {
        if (this.panel) {
            document.body.removeChild(this.panel);
            this.panel = null;
            this.meter = null;
            this.info = null;
        }
    }
};
Password.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input()
], Password.prototype, "promptLabel", void 0);
__decorate([
    Input()
], Password.prototype, "weakLabel", void 0);
__decorate([
    Input()
], Password.prototype, "mediumLabel", void 0);
__decorate([
    Input()
], Password.prototype, "strongLabel", void 0);
__decorate([
    Input()
], Password.prototype, "feedback", void 0);
__decorate([
    Input()
], Password.prototype, "showPassword", null);
__decorate([
    HostListener('input', ['$event'])
], Password.prototype, "onInput", null);
__decorate([
    HostListener('focus', ['$event'])
], Password.prototype, "onFocus", null);
__decorate([
    HostListener('blur', ['$event'])
], Password.prototype, "onBlur", null);
__decorate([
    HostListener('keyup', ['$event'])
], Password.prototype, "onKeyup", null);
Password = __decorate([
    Directive({
        selector: '[pPassword]',
        host: {
            '[class.ui-inputtext]': 'true',
            '[class.ui-corner-all]': 'true',
            '[class.ui-state-default]': 'true',
            '[class.ui-widget]': 'true',
            '[class.ui-state-filled]': 'filled'
        }
    })
], Password);
export { Password };
let PasswordModule = class PasswordModule {
};
PasswordModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Password],
        declarations: [Password]
    })
], PasswordModule);
export { PasswordModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Bhc3N3b3JkLyIsInNvdXJjZXMiOlsicGFzc3dvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFZdkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQXdCakIsWUFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUF0QjdDLGdCQUFXLEdBQVcsa0JBQWtCLENBQUM7UUFFekMsY0FBUyxHQUFXLE1BQU0sQ0FBQztRQUUzQixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUUvQixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUUvQixhQUFRLEdBQVksSUFBSSxDQUFDO0lBY3VCLENBQUM7SUFaakQsSUFBSSxZQUFZLENBQUMsSUFBYTtRQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUM1RCxDQUFDO0lBWUQsU0FBUztRQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwwR0FBMEc7SUFFMUcsT0FBTyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFB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QkFBeUIsRUFBRSxRQUFRO1NBQ3RDO0tBQ0osQ0FBQztHQUNXLFFBQVEsQ0FpS3BCO1NBaktZLFFBQVE7QUF3S3JCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBSSxDQUFBO0FBQWxCLGNBQWM7SUFMMUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxEaXJlY3RpdmUsRWxlbWVudFJlZixIb3N0TGlzdGVuZXIsSW5wdXQsT25EZXN0cm95LERvQ2hlY2ssTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twUGFzc3dvcmRdJyxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0dGV4dF0nOiAndHJ1ZScsXHJcbiAgICAgICAgJ1tjbGFzcy51aS1jb3JuZXItYWxsXSc6ICd0cnVlJyxcclxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWRlZmF1bHRdJzogJ3RydWUnLFxyXG4gICAgICAgICdbY2xhc3MudWktd2lkZ2V0XSc6ICd0cnVlJyxcclxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWZpbGxlZF0nOiAnZmlsbGVkJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksRG9DaGVjayB7XHJcblxyXG4gICAgQElucHV0KCkgcHJvbXB0TGFiZWw6IHN0cmluZyA9ICdFbnRlciBhIHBhc3N3b3JkJztcclxuXHJcbiAgICBASW5wdXQoKSB3ZWFrTGFiZWw6IHN0cmluZyA9ICdXZWFrJztcclxuXHJcbiAgICBASW5wdXQoKSBtZWRpdW1MYWJlbDogc3RyaW5nID0gJ01lZGl1bSc7XHJcblxyXG4gICAgQElucHV0KCkgc3Ryb25nTGFiZWw6IHN0cmluZyA9ICdTdHJvbmcnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBmZWVkYmFjazogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgc2V0IHNob3dQYXNzd29yZChzaG93OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnR5cGUgPSBzaG93ID8gJ3RleHQnIDogJ3Bhc3N3b3JkJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcGFuZWw6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgXHJcbiAgICBtZXRlcjogYW55O1xyXG4gICAgXHJcbiAgICBpbmZvOiBhbnk7XHJcbiAgICBcclxuICAgIGZpbGxlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxyXG4gICAgXHJcbiAgICBuZ0RvQ2hlY2soKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL1RvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiB0byBtYW5hZ2UgdWktc3RhdGUtZmlsbGVkIGZvciBtYXRlcmlhbCBsYWJlbHMgd2hlbiB0aGVyZSBpcyBubyB2YWx1ZSBiaW5kaW5nXHJcbiAgICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pIFxyXG4gICAgb25JbnB1dChlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmZpbGxlZCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVBhbmVsKCkge1xyXG4gICAgICAgIHRoaXMucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSA9ICd1aS1wYXNzd29yZC1wYW5lbCB1aS13aWRnZXQgdWktc3RhdGUtaGlnaGxpZ2h0IHVpLWNvcm5lci1hbGwnO1xyXG4gICAgICAgIHRoaXMubWV0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLm1ldGVyLmNsYXNzTmFtZSA9ICd1aS1wYXNzd29yZC1tZXRlcic7XHJcbiAgICAgICAgdGhpcy5pbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5pbmZvLmNsYXNzTmFtZSA9ICd1aS1wYXNzd29yZC1pbmZvJztcclxuICAgICAgICB0aGlzLmluZm8udGV4dENvbnRlbnQgPSB0aGlzLnByb21wdExhYmVsO1xyXG4gICAgICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5tZXRlcik7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmluZm8pO1xyXG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUubWluV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5lbC5uYXRpdmVFbGVtZW50KSArICdweCc7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsKTtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSkgXHJcbiAgICBvbkZvY3VzKGUpIHtcclxuICAgICAgICBpZiAodGhpcy5mZWVkYmFjaykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGFuZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUGFuZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3R5bGUuekluZGV4ID0gU3RyaW5nKCsrRG9tSGFuZGxlci56aW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLnBhbmVsLCAndWktcGFzc3dvcmQtcGFuZWwtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5wYW5lbCwgJ3VpLXBhc3N3b3JkLXBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5wYW5lbCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSkgXHJcbiAgICBvbkJsdXIoZSkgeyAgIFxyXG4gICAgICAgIGlmICh0aGlzLmZlZWRiYWNrKSB7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5wYW5lbCwgJ3VpLXBhc3N3b3JkLXBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMucGFuZWwsICd1aS1wYXNzd29yZC1wYW5lbC12aXNpYmxlJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTUwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSlcclxuICAgIG9uS2V5dXAoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmZlZWRiYWNrKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlLFxyXG4gICAgICAgICAgICBsYWJlbCA9IG51bGwsXHJcbiAgICAgICAgICAgIG1ldGVyUG9zID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5wcm9tcHRMYWJlbDtcclxuICAgICAgICAgICAgICAgIG1ldGVyUG9zID0gJzBweCAwcHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gdGhpcy50ZXN0U3RyZW5ndGgodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY29yZSA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLndlYWtMYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggLTEwcHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NvcmUgPj0gMzAgJiYgc2NvcmUgPCA4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5tZWRpdW1MYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggLTIwcHgnO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjb3JlID49IDgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnN0cm9uZ0xhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGVyUG9zID0gJzBweCAtMzBweCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWV0ZXIuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gbWV0ZXJQb3M7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mby50ZXh0Q29udGVudCA9IGxhYmVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdGVzdFN0cmVuZ3RoKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGdyYWRlOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCB2YWw7XHJcblxyXG4gICAgICAgIHZhbCA9IHN0ci5tYXRjaCgnWzAtOV0nKTtcclxuICAgICAgICBncmFkZSArPSB0aGlzLm5vcm1hbGl6ZSh2YWwgPyB2YWwubGVuZ3RoIDogMS80LCAxKSAqIDI1O1xyXG5cclxuICAgICAgICB2YWwgPSBzdHIubWF0Y2goJ1thLXpBLVpdJyk7XHJcbiAgICAgICAgZ3JhZGUgKz0gdGhpcy5ub3JtYWxpemUodmFsID8gdmFsLmxlbmd0aCA6IDEvMiwgMykgKiAxMDtcclxuXHJcbiAgICAgICAgdmFsID0gc3RyLm1hdGNoKCdbIUAjJCVeJio/X34uLDs9XScpO1xyXG4gICAgICAgIGdyYWRlICs9IHRoaXMubm9ybWFsaXplKHZhbCA/IHZhbC5sZW5ndGggOiAxLzYsIDEpICogMzU7XHJcblxyXG4gICAgICAgIHZhbCA9IHN0ci5tYXRjaCgnW0EtWl0nKTtcclxuICAgICAgICBncmFkZSArPSB0aGlzLm5vcm1hbGl6ZSh2YWwgPyB2YWwubGVuZ3RoIDogMS82LCAxKSAqIDMwO1xyXG5cclxuICAgICAgICBncmFkZSAqPSBzdHIubGVuZ3RoIC8gODtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdyYWRlID4gMTAwID8gMTAwIDogZ3JhZGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5vcm1hbGl6ZSh4LCB5KSB7XHJcbiAgICAgICAgbGV0IGRpZmYgPSB4IC0geTtcclxuXHJcbiAgICAgICAgaWYgKGRpZmYgPD0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHggLyB5O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIDEgKyAwLjUgKiAoeCAvICh4ICsgeS80KSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRpc2FibGVkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucGFuZWwpO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5tZXRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mbyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbUGFzc3dvcmRdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbUGFzc3dvcmRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1vZHVsZSB7IH1cclxuIl19