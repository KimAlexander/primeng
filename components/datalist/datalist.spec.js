import { TestBed } from '@angular/core/testing';
import { DataList } from './datalist';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('DataList', function () {
    var datalist;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                DataList
            ]
        });
        fixture = TestBed.createComponent(DataList);
        datalist = fixture.componentInstance;
    });
});
//# sourceMappingURL=datalist.spec.js.map