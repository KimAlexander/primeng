import { TestBed } from '@angular/core/testing';
import { DataScroller } from './datascroller';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('DataScroller', function () {
    var datascroller;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                DataScroller
            ]
        });
        fixture = TestBed.createComponent(DataScroller);
        datascroller = fixture.componentInstance;
    });
});
//# sourceMappingURL=datascroller.spec.js.map