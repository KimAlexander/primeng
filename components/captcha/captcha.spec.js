import { TestBed } from '@angular/core/testing';
import { Captcha } from './captcha';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Captcha', function () {
    var captcha;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Captcha
            ]
        });
        fixture = TestBed.createComponent(Captcha);
        captcha = fixture.componentInstance;
    });
});
//# sourceMappingURL=captcha.spec.js.map