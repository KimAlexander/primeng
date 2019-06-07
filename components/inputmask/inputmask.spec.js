import { TestBed } from '@angular/core/testing';
import { InputMask } from './inputmask';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('InputMask', function () {
    var inputmask;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                InputMask
            ]
        });
        fixture = TestBed.createComponent(InputMask);
        inputmask = fixture.componentInstance;
    });
});
//# sourceMappingURL=inputmask.spec.js.map