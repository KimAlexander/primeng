var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, HostListener, Input, OnDestroy, DoCheck, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var Password = /** @class */ (function () {
    function Password(el, zone) {
        this.el = el;
        this.zone = zone;
        this.promptLabel = 'Enter a password';
        this.weakLabel = 'Weak';
        this.mediumLabel = 'Medium';
        this.strongLabel = 'Strong';
        this.feedback = true;
    }
    Object.defineProperty(Password.prototype, "showPassword", {
        set: function (show) {
            this.el.nativeElement.type = show ? 'text' : 'password';
        },
        enumerable: true,
        configurable: true
    });
    Password.prototype.ngDoCheck = function () {
        this.updateFilledState();
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    Password.prototype.onInput = function (e) {
        this.updateFilledState();
    };
    Password.prototype.updateFilledState = function () {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    };
    Password.prototype.createPanel = function () {
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
    };
    Password.prototype.onFocus = function (e) {
        var _this = this;
        if (this.feedback) {
            if (!this.panel) {
                this.createPanel();
            }
            this.panel.style.zIndex = String(++DomHandler.zindex);
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    DomHandler.addClass(_this.panel, 'ui-password-panel-visible');
                    DomHandler.removeClass(_this.panel, 'ui-password-panel-hidden');
                }, 1);
                DomHandler.absolutePosition(_this.panel, _this.el.nativeElement);
            });
        }
    };
    Password.prototype.onBlur = function (e) {
        var _this = this;
        if (this.feedback) {
            DomHandler.addClass(this.panel, 'ui-password-panel-hidden');
            DomHandler.removeClass(this.panel, 'ui-password-panel-visible');
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.ngOnDestroy();
                }, 150);
            });
        }
    };
    Password.prototype.onKeyup = function (e) {
        if (this.feedback) {
            var value = e.target.value, label = null, meterPos = null;
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
    };
    Password.prototype.testStrength = function (str) {
        var grade = 0;
        var val;
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
    };
    Password.prototype.normalize = function (x, y) {
        var diff = x - y;
        if (diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y / 4));
    };
    Object.defineProperty(Password.prototype, "disabled", {
        get: function () {
            return this.el.nativeElement.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Password.prototype.ngOnDestroy = function () {
        if (this.panel) {
            document.body.removeChild(this.panel);
            this.panel = null;
            this.meter = null;
            this.info = null;
        }
    };
    Password.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
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
    return Password;
}());
export { Password };
var PasswordModule = /** @class */ (function () {
    function PasswordModule() {
    }
    PasswordModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Password],
            declarations: [Password]
        })
    ], PasswordModule);
    return PasswordModule;
}());
export { PasswordModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Bhc3N3b3JkLyIsInNvdXJjZXMiOlsicGFzc3dvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFZdkM7SUF3Qkksa0JBQW1CLEVBQWMsRUFBUyxJQUFZO1FBQW5DLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBdEI3QyxnQkFBVyxHQUFXLGtCQUFrQixDQUFDO1FBRXpDLGNBQVMsR0FBVyxNQUFNLENBQUM7UUFFM0IsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFFL0IsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFFL0IsYUFBUSxHQUFZLElBQUksQ0FBQztJQWN1QixDQUFDO0lBWmpELHNCQUFJLGtDQUFZO2FBQWhCLFVBQWlCLElBQWE7WUFDbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDNUQsQ0FBQzs7O09BQUE7SUFZRCw0QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELDBHQUEwRztJQUUxRywwQkFBTyxHQUFQLFVBQVEsQ0FBQztRQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxvQ0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFF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QixFQUFFLE1BQU07Z0JBQ2xDLG1CQUFtQixFQUFFLE1BQU07Z0JBQzNCLHlCQUF5QixFQUFFLFFBQVE7YUFDdEM7U0FDSixDQUFDO09BQ1csUUFBUSxDQWlLcEI7SUFBRCxlQUFDO0NBQUEsQUFqS0QsSUFpS0M7U0FqS1ksUUFBUTtBQXdLckI7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDM0IsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsRGlyZWN0aXZlLEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLElucHV0LE9uRGVzdHJveSxEb0NoZWNrLE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcFBhc3N3b3JkXScsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHRleHRdJzogJ3RydWUnLFxyXG4gICAgICAgICdbY2xhc3MudWktY29ybmVyLWFsbF0nOiAndHJ1ZScsXHJcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1kZWZhdWx0XSc6ICd0cnVlJyxcclxuICAgICAgICAnW2NsYXNzLnVpLXdpZGdldF0nOiAndHJ1ZScsXHJcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1maWxsZWRdJzogJ2ZpbGxlZCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkIGltcGxlbWVudHMgT25EZXN0cm95LERvQ2hlY2sge1xyXG5cclxuICAgIEBJbnB1dCgpIHByb21wdExhYmVsOiBzdHJpbmcgPSAnRW50ZXIgYSBwYXNzd29yZCc7XHJcblxyXG4gICAgQElucHV0KCkgd2Vha0xhYmVsOiBzdHJpbmcgPSAnV2Vhayc7XHJcblxyXG4gICAgQElucHV0KCkgbWVkaXVtTGFiZWw6IHN0cmluZyA9ICdNZWRpdW0nO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0cm9uZ0xhYmVsOiBzdHJpbmcgPSAnU3Ryb25nJztcclxuICAgIFxyXG4gICAgQElucHV0KCkgZmVlZGJhY2s6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBzaG93UGFzc3dvcmQoc2hvdzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC50eXBlID0gc2hvdyA/ICd0ZXh0JyA6ICdwYXNzd29yZCc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHBhbmVsOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIFxyXG4gICAgbWV0ZXI6IGFueTtcclxuICAgIFxyXG4gICAgaW5mbzogYW55O1xyXG4gICAgXHJcbiAgICBmaWxsZWQ6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cclxuICAgIFxyXG4gICAgbmdEb0NoZWNrKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9UbyB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gdG8gbWFuYWdlIHVpLXN0YXRlLWZpbGxlZCBmb3IgbWF0ZXJpYWwgbGFiZWxzIHdoZW4gdGhlcmUgaXMgbm8gdmFsdWUgYmluZGluZ1xyXG4gICAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKSBcclxuICAgIG9uSW5wdXQoZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5maWxsZWQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVQYW5lbCgpIHtcclxuICAgICAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5jbGFzc05hbWUgPSAndWktcGFzc3dvcmQtcGFuZWwgdWktd2lkZ2V0IHVpLXN0YXRlLWhpZ2hsaWdodCB1aS1jb3JuZXItYWxsJztcclxuICAgICAgICB0aGlzLm1ldGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5tZXRlci5jbGFzc05hbWUgPSAndWktcGFzc3dvcmQtbWV0ZXInO1xyXG4gICAgICAgIHRoaXMuaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuaW5mby5jbGFzc05hbWUgPSAndWktcGFzc3dvcmQtaW5mbyc7XHJcbiAgICAgICAgdGhpcy5pbmZvLnRleHRDb250ZW50ID0gdGhpcy5wcm9tcHRMYWJlbDtcclxuICAgICAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMubWV0ZXIpO1xyXG4gICAgICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5pbmZvKTtcclxuICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLm1pbldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCkgKyAncHgnO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pIFxyXG4gICAgb25Gb2N1cyhlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmVlZGJhY2spIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBhbmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVBhbmVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLnpJbmRleCA9IFN0cmluZygrK0RvbUhhbmRsZXIuemluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5wYW5lbCwgJ3VpLXBhc3N3b3JkLXBhbmVsLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMucGFuZWwsICd1aS1wYXNzd29yZC1wYW5lbC1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMucGFuZWwsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pIFxyXG4gICAgb25CbHVyKGUpIHsgICBcclxuICAgICAgICBpZiAodGhpcy5mZWVkYmFjaykge1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMucGFuZWwsICd1aS1wYXNzd29yZC1wYW5lbC1oaWRkZW4nKTtcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnBhbmVsLCAndWktcGFzc3dvcmQtcGFuZWwtdmlzaWJsZScpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH0sIDE1MCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pXHJcbiAgICBvbktleXVwKGUpIHtcclxuICAgICAgICBpZiAodGhpcy5mZWVkYmFjaykge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcclxuICAgICAgICAgICAgbGFiZWwgPSBudWxsLFxyXG4gICAgICAgICAgICBtZXRlclBvcyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMucHJvbXB0TGFiZWw7XHJcbiAgICAgICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggMHB4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IHRoaXMudGVzdFN0cmVuZ3RoKHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPCAzMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy53ZWFrTGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0ZXJQb3MgPSAnMHB4IC0xMHB4JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjb3JlID49IDMwICYmIHNjb3JlIDwgODApIHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMubWVkaXVtTGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0ZXJQb3MgPSAnMHB4IC0yMHB4JztcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzY29yZSA+PSA4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5zdHJvbmdMYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggLTMwcHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1ldGVyLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IG1ldGVyUG9zO1xyXG4gICAgICAgICAgICB0aGlzLmluZm8udGV4dENvbnRlbnQgPSBsYWJlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRlc3RTdHJlbmd0aChzdHI6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBncmFkZTogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgdmFsO1xyXG5cclxuICAgICAgICB2YWwgPSBzdHIubWF0Y2goJ1swLTldJyk7XHJcbiAgICAgICAgZ3JhZGUgKz0gdGhpcy5ub3JtYWxpemUodmFsID8gdmFsLmxlbmd0aCA6IDEvNCwgMSkgKiAyNTtcclxuXHJcbiAgICAgICAgdmFsID0gc3RyLm1hdGNoKCdbYS16QS1aXScpO1xyXG4gICAgICAgIGdyYWRlICs9IHRoaXMubm9ybWFsaXplKHZhbCA/IHZhbC5sZW5ndGggOiAxLzIsIDMpICogMTA7XHJcblxyXG4gICAgICAgIHZhbCA9IHN0ci5tYXRjaCgnWyFAIyQlXiYqP19+Liw7PV0nKTtcclxuICAgICAgICBncmFkZSArPSB0aGlzLm5vcm1hbGl6ZSh2YWwgPyB2YWwubGVuZ3RoIDogMS82LCAxKSAqIDM1O1xyXG5cclxuICAgICAgICB2YWwgPSBzdHIubWF0Y2goJ1tBLVpdJyk7XHJcbiAgICAgICAgZ3JhZGUgKz0gdGhpcy5ub3JtYWxpemUodmFsID8gdmFsLmxlbmd0aCA6IDEvNiwgMSkgKiAzMDtcclxuXHJcbiAgICAgICAgZ3JhZGUgKj0gc3RyLmxlbmd0aCAvIDg7XHJcblxyXG4gICAgICAgIHJldHVybiBncmFkZSA+IDEwMCA/IDEwMCA6IGdyYWRlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBub3JtYWxpemUoeCwgeSkge1xyXG4gICAgICAgIGxldCBkaWZmID0geCAtIHk7XHJcblxyXG4gICAgICAgIGlmIChkaWZmIDw9IDApXHJcbiAgICAgICAgICAgIHJldHVybiB4IC8geTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAxICsgMC41ICogKHggLyAoeCArIHkvNCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kaXNhYmxlZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFuZWwpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBhbmVsKTtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubWV0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmluZm8gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1Bhc3N3b3JkXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1Bhc3N3b3JkXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNb2R1bGUgeyB9XHJcbiJdfQ==