var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, AfterViewInit, Component, EventEmitter, Input, NgZone, OnDestroy, Output, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
var Captcha = /** @class */ (function () {
    function Captcha(el, _zone) {
        this.el = el;
        this._zone = _zone;
        this.siteKey = null;
        this.theme = 'light';
        this.type = 'image';
        this.size = 'normal';
        this.tabindex = 0;
        this.language = null;
        this.initCallback = "initRecaptcha";
        this.onResponse = new EventEmitter();
        this.onExpire = new EventEmitter();
        this._instance = null;
    }
    Captcha.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (window.grecaptcha) {
            if (!window.grecaptcha.render) {
                setTimeout(function () {
                    _this.init();
                }, 100);
            }
            else {
                this.init();
            }
        }
        else {
            window[this.initCallback] = function () {
                _this.init();
            };
        }
    };
    Captcha.prototype.init = function () {
        var _this = this;
        this._instance = window.grecaptcha.render(this.el.nativeElement.children[0], {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabindex,
            'hl': this.language,
            'callback': function (response) { _this._zone.run(function () { return _this.recaptchaCallback(response); }); },
            'expired-callback': function () { _this._zone.run(function () { return _this.recaptchaExpiredCallback(); }); }
        });
    };
    Captcha.prototype.reset = function () {
        if (this._instance === null)
            return;
        window.grecaptcha.reset(this._instance);
    };
    Captcha.prototype.getResponse = function () {
        if (this._instance === null)
            return null;
        return window.grecaptcha.getResponse(this._instance);
    };
    Captcha.prototype.recaptchaCallback = function (response) {
        this.onResponse.emit({
            response: response
        });
    };
    Captcha.prototype.recaptchaExpiredCallback = function () {
        this.onExpire.emit();
    };
    Captcha.prototype.ngOnDestroy = function () {
        if (this._instance != null) {
            window.grecaptcha.reset(this._instance);
        }
    };
    Captcha.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], Captcha.prototype, "siteKey", void 0);
    __decorate([
        Input()
    ], Captcha.prototype, "theme", void 0);
    __decorate([
        Input()
    ], Captcha.prototype, "type", void 0);
    __decorate([
        Input()
    ], Captcha.prototype, "size", void 0);
    __decorate([
        Input()
    ], Captcha.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], Captcha.prototype, "language", void 0);
    __decorate([
        Input()
    ], Captcha.prototype, "initCallback", void 0);
    __decorate([
        Output()
    ], Captcha.prototype, "onResponse", void 0);
    __decorate([
        Output()
    ], Captcha.prototype, "onExpire", void 0);
    Captcha = __decorate([
        Component({
            selector: 'p-captcha',
            template: "<div></div>",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Captcha);
    return Captcha;
}());
export { Captcha };
var CaptchaModule = /** @class */ (function () {
    function CaptchaModule() {
    }
    CaptchaModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Captcha],
            declarations: [Captcha]
        })
    ], CaptchaModule);
    return CaptchaModule;
}());
export { CaptchaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvY2FwdGNoYS8iLCJzb3VyY2VzIjpbImNhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdJLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQU83QztJQXNCSSxpQkFBbUIsRUFBYyxFQUFTLEtBQWE7UUFBcEMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7UUFwQjlDLFlBQU8sR0FBVyxJQUFJLENBQUM7UUFFdkIsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUVoQixTQUFJLEdBQUcsT0FBTyxDQUFDO1FBRWYsU0FBSSxHQUFHLFFBQVEsQ0FBQztRQUVoQixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWIsYUFBUSxHQUFXLElBQUksQ0FBQztRQUV4QixpQkFBWSxHQUFHLGVBQWUsQ0FBQztRQUU5QixlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELGNBQVMsR0FBUSxJQUFJLENBQUM7SUFFNEIsQ0FBQztJQUUzRCxpQ0FBZSxHQUFmO1FBQUEsaUJBZ0JDO1FBZkcsSUFBVSxNQUFPLENBQUMsVUFBVSxFQUFFO1lBQzFCLElBQUksQ0FBTyxNQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQztnQkFDakMsVUFBVSxDQUFDO29CQUNQLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ1Q7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxD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QUx6QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUMxQixDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxBZnRlclZpZXdJbml0LENvbXBvbmVudCxFdmVudEVtaXR0ZXIsSW5wdXQsTmdab25lLE9uRGVzdHJveSxPdXRwdXQsRWxlbWVudFJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtY2FwdGNoYScsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXY+PC9kaXY+YCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FwdGNoYSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBzaXRlS2V5OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgQElucHV0KCkgdGhlbWUgPSAnbGlnaHQnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB0eXBlID0gJ2ltYWdlJztcclxuICAgIFxyXG4gICAgQElucHV0KCkgc2l6ZSA9ICdub3JtYWwnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB0YWJpbmRleCA9IDA7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGxhbmd1YWdlOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgIFxyXG4gICAgQElucHV0KCkgaW5pdENhbGxiYWNrID0gXCJpbml0UmVjYXB0Y2hhXCI7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvblJlc3BvbnNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uRXhwaXJlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfaW5zdGFuY2U6IGFueSA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgX3pvbmU6IE5nWm9uZSkge31cclxuICAgIFxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICgoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEpIHtcclxuICAgICAgICAgICAgaWYgKCEoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEucmVuZGVyKXtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICB9LDEwMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAoPGFueT53aW5kb3cpW3RoaXMuaW5pdENhbGxiYWNrXSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXQoKcKge1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlID0gKDxhbnk+d2luZG93KS5ncmVjYXB0Y2hhLnJlbmRlcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sIHtcclxuICAgICAgICAgICAgJ3NpdGVrZXknOiB0aGlzLnNpdGVLZXksXHJcbiAgICAgICAgICAgICd0aGVtZSc6IHRoaXMudGhlbWUsXHJcbiAgICAgICAgICAgICd0eXBlJzogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICAnc2l6ZSc6IHRoaXMuc2l6ZSxcclxuICAgICAgICAgICAgJ3RhYmluZGV4JzogdGhpcy50YWJpbmRleCxcclxuICAgICAgICAgICAgJ2hsJzogdGhpcy5sYW5ndWFnZSxcclxuICAgICAgICAgICAgJ2NhbGxiYWNrJzogKHJlc3BvbnNlOiBzdHJpbmcpID0+IHt0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLnJlY2FwdGNoYUNhbGxiYWNrKHJlc3BvbnNlKSl9LFxyXG4gICAgICAgICAgICAnZXhwaXJlZC1jYWxsYmFjayc6ICgpID0+IHt0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLnJlY2FwdGNoYUV4cGlyZWRDYWxsYmFjaygpKX1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgKDxhbnk+d2luZG93KS5ncmVjYXB0Y2hhLnJlc2V0KHRoaXMuX2luc3RhbmNlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0UmVzcG9uc2UoKTogU3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEuZ2V0UmVzcG9uc2UodGhpcy5faW5zdGFuY2UpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZWNhcHRjaGFDYWxsYmFjayhyZXNwb25zZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5vblJlc3BvbnNlLmVtaXQoe1xyXG4gICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWNhcHRjaGFFeHBpcmVkQ2FsbGJhY2soKSB7XHJcbiAgICAgICAgdGhpcy5vbkV4cGlyZS5lbWl0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEucmVzZXQodGhpcy5faW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0NhcHRjaGFdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbQ2FwdGNoYV1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcHRjaGFNb2R1bGUgeyB9XHJcbiJdfQ==