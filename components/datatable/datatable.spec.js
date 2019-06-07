import { TestBed } from '@angular/core/testing';
import { DataTable } from './datatable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('DataTable', function () {
    var datatable;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                DataTable
            ]
        });
        fixture = TestBed.createComponent(DataTable);
        datatable = fixture.componentInstance;
    });
});
//# sourceMappingURL=datatable.spec.js.map