var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, AfterViewInit, Component, EventEmitter, Input, NgZone, OnDestroy, Output, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
let Captcha = class Captcha {
    constructor(el, _zone) {
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
    ngAfterViewInit() {
        if (window.grecaptcha) {
            if (!window.grecaptcha.render) {
                setTimeout(() => {
                    this.init();
                }, 100);
            }
            else {
                this.init();
            }
        }
        else {
            window[this.initCallback] = () => {
                this.init();
            };
        }
    }
    init() {
        this._instance = window.grecaptcha.render(this.el.nativeElement.children[0], {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabindex,
            'hl': this.language,
            'callback': (response) => { this._zone.run(() => this.recaptchaCallback(response)); },
            'expired-callback': () => { this._zone.run(() => this.recaptchaExpiredCallback()); }
        });
    }
    reset() {
        if (this._instance === null)
            return;
        window.grecaptcha.reset(this._instance);
    }
    getResponse() {
        if (this._instance === null)
            return null;
        return window.grecaptcha.getResponse(this._instance);
    }
    recaptchaCallback(response) {
        this.onResponse.emit({
            response: response
        });
    }
    recaptchaExpiredCallback() {
        this.onExpire.emit();
    }
    ngOnDestroy() {
        if (this._instance != null) {
            window.grecaptcha.reset(this._instance);
        }
    }
};
Captcha.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
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
        template: `<div></div>`,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Captcha);
export { Captcha };
let CaptchaModule = class CaptchaModule {
};
CaptchaModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Captcha],
        declarations: [Captcha]
    })
], CaptchaModule);
export { CaptchaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvY2FwdGNoYS8iLCJzb3VyY2VzIjpbImNhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdJLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQU83QyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBc0JoQixZQUFtQixFQUFjLEVBQVMsS0FBYTtRQUFwQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQXBCOUMsWUFBTyxHQUFXLElBQUksQ0FBQztRQUV2QixVQUFLLEdBQUcsT0FBTyxDQUFDO1FBRWhCLFNBQUksR0FBRyxPQUFPLENBQUM7UUFFZixTQUFJLEdBQUcsUUFBUSxDQUFDO1FBRWhCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFFYixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBRXhCLGlCQUFZLEdBQUcsZUFBZSxDQUFDO1FBRTlCLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuRCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQsY0FBUyxHQUFRLElBQUksQ0FBQztJQUU0QixDQUFDO0lBRTNELGVBQWU7UUFDWCxJQUFVLE1BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDMUIsSUFBSSxDQUFPLE1BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDO2dCQUNqQyxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ1Q7aUJBQ0k7Z0JBQ0QsSUFB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QUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUMxQixDQUFDO0dBQ1csYUFBYSxDQUFJO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLEFmdGVyVmlld0luaXQsQ29tcG9uZW50LEV2ZW50RW1pdHRlcixJbnB1dCxOZ1pvbmUsT25EZXN0cm95LE91dHB1dCxFbGVtZW50UmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1jYXB0Y2hhJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdj48L2Rpdj5gLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXB0Y2hhIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIHNpdGVLZXk6IHN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICBASW5wdXQoKSB0aGVtZSA9ICdsaWdodCc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHR5cGUgPSAnaW1hZ2UnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzaXplID0gJ25vcm1hbCc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHRhYmluZGV4ID0gMDtcclxuICAgIFxyXG4gICAgQElucHV0KCkgbGFuZ3VhZ2U6IHN0cmluZyA9IG51bGw7XHJcbiAgICAgXHJcbiAgICBASW5wdXQoKSBpbml0Q2FsbGJhY2sgPSBcImluaXRSZWNhcHRjaGFcIjtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uUmVzcG9uc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25FeHBpcmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9pbnN0YW5jZTogYW55ID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBfem9uZTogTmdab25lKSB7fVxyXG4gICAgXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKCg8YW55PndpbmRvdykuZ3JlY2FwdGNoYSkge1xyXG4gICAgICAgICAgICBpZiAoISg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5yZW5kZXIpe1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH0sMTAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICg8YW55PndpbmRvdylbdGhpcy5pbml0Q2FsbGJhY2tdID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdCgpwqB7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2UgPSAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEucmVuZGVyKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwge1xyXG4gICAgICAgICAgICAnc2l0ZWtleSc6IHRoaXMuc2l0ZUtleSxcclxuICAgICAgICAgICAgJ3RoZW1lJzogdGhpcy50aGVtZSxcclxuICAgICAgICAgICAgJ3R5cGUnOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgICdzaXplJzogdGhpcy5zaXplLFxyXG4gICAgICAgICAgICAndGFiaW5kZXgnOiB0aGlzLnRhYmluZGV4LFxyXG4gICAgICAgICAgICAnaGwnOiB0aGlzLmxhbmd1YWdlLFxyXG4gICAgICAgICAgICAnY2FsbGJhY2snOiAocmVzcG9uc2U6IHN0cmluZykgPT4ge3RoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucmVjYXB0Y2hhQ2FsbGJhY2socmVzcG9uc2UpKX0sXHJcbiAgICAgICAgICAgICdleHBpcmVkLWNhbGxiYWNrJzogKCkgPT4ge3RoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucmVjYXB0Y2hhRXhwaXJlZENhbGxiYWNrKCkpfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEucmVzZXQodGhpcy5faW5zdGFuY2UpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRSZXNwb25zZSgpOiBTdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuICg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5nZXRSZXNwb25zZSh0aGlzLl9pbnN0YW5jZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlY2FwdGNoYUNhbGxiYWNrKHJlc3BvbnNlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm9uUmVzcG9uc2UuZW1pdCh7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlY2FwdGNoYUV4cGlyZWRDYWxsYmFjaygpIHtcclxuICAgICAgICB0aGlzLm9uRXhwaXJlLmVtaXQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlICE9IG51bGwpIHtcclxuICAgICAgICAgICg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5yZXNldCh0aGlzLl9pbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbQ2FwdGNoYV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtDYXB0Y2hhXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FwdGNoYU1vZHVsZSB7IH1cclxuIl19