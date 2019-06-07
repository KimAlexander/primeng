import { TestBed } from '@angular/core/testing';
import { Growl } from './growl';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Growl', function () {
    var growl;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Growl
            ]
        });
        fixture = TestBed.createComponent(Growl);
        growl = fixture.componentInstance;
    });
});
//# sourceMappingURL=growl.spec.js.map