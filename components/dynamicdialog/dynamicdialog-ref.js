import { Subject } from 'rxjs';
var DynamicDialogRef = /** @class */ (function () {
    function DynamicDialogRef() {
        this._onClose = new Subject();
        this.onClose = this._onClose.asObservable();
    }
    DynamicDialogRef.prototype.close = function (result) {
        this._onClose.next(result);
    };
    return DynamicDialogRef;
}());
export { DynamicDialogRef };
//# sourceMappingURL=dynamicdialog-ref.js.map