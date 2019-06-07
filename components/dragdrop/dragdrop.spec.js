import { TestBed } from '@angular/core/testing';
import { Draggable } from './dragdrop';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Draggable', function () {
    var draggable;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Draggable
            ]
        });
        fixture = TestBed.createComponent(Draggable);
        draggable = fixture.componentInstance;
    });
});
//# sourceMappingURL=dragdrop.spec.js.map