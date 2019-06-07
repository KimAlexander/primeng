import { TestBed } from '@angular/core/testing';
import { GMap } from './gmap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('GMap', function () {
    var gmap;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                GMap
            ]
        });
        fixture = TestBed.createComponent(GMap);
        gmap = fixture.componentInstance;
    });
});
//# sourceMappingURL=gmap.spec.js.map