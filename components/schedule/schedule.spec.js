import { TestBed } from '@angular/core/testing';
import { Schedule } from './schedule';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Schedule', function () {
    var schedule;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Schedule
            ]
        });
        fixture = TestBed.createComponent(Schedule);
        schedule = fixture.componentInstance;
    });
});
//# sourceMappingURL=schedule.spec.js.map