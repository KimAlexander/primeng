import { TestBed } from '@angular/core/testing';
import { DataGrid } from './datagrid';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('DataGrid', function () {
    var datagrid;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                DataGrid
            ]
        });
        fixture = TestBed.createComponent(DataGrid);
        datagrid = fixture.componentInstance;
    });
});
//# sourceMappingURL=datagrid.spec.js.map