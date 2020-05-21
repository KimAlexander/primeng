var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Directive, ElementRef, HostListener, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { NG_VALIDATORS } from '@angular/forms';
export var KEYFILTER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return KeyFilter; }),
    multi: true
};
var DEFAULT_MASKS = {
    pint: /[\d]/,
    'int': /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
};
var KEYS = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
};
var SAFARI_KEYS = {
    63234: 37,
    63235: 39,
    63232: 38,
    63233: 40,
    63276: 33,
    63277: 34,
    63272: 46,
    63273: 36,
    63275: 35 // end
};
var KeyFilter = /** @class */ (function () {
    function KeyFilter(el) {
        this.el = el;
        this.ngModelChange = new EventEmitter();
        this.isAndroid = DomHandler.isAndroid();
    }
    Object.defineProperty(KeyFilter.prototype, "pattern", {
        get: function () {
            return this._pattern;
        },
        set: function (_pattern) {
            this._pattern = _pattern;
            this.regex = DEFAULT_MASKS[this._pattern] || this._pattern;
        },
        enumerable: true,
        configurable: true
    });
    KeyFilter.prototype.isNavKeyPress = function (e) {
        var k = e.keyCode;
        k = DomHandler.getBrowser().safari ? (SAFARI_KEYS[k] || k) : k;
        return (k >= 33 && k <= 40) || k == KEYS.RETURN || k == KEYS.TAB || k == KEYS.ESC;
    };
    ;
    KeyFilter.prototype.isSpecialKey = function (e) {
        var k = e.keyCode || e.charCode;
        return k == 9 || k == 13 || k == 27 || k == 16 || k == 17 || (k >= 18 && k <= 20) ||
            (DomHandler.getBrowser().opera && !e.shiftKey && (k == 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)));
    };
    KeyFilter.prototype.getKey = function (e) {
        var k = e.keyCode || e.charCode;
        return DomHandler.getBrowser().safari ? (SAFARI_KEYS[k] || k) : k;
    };
    KeyFilter.prototype.getCharCode = function (e) {
        return e.charCode || e.keyCode || e.which;
    };
    KeyFilter.prototype.findDelta = function (value, prevValue) {
        var delta = '';
        for (var i = 0; i < value.length; i++) {
            var str = value.substr(0, i) + value.substr(i + value.length - prevValue.length);
            if (str === prevValue)
                delta = value.substr(i, value.length - prevValue.length);
        }
        return delta;
    };
    KeyFilter.prototype.isValidChar = function (c) {
        return this.regex.test(c);
    };
    KeyFilter.prototype.isValidString = function (str) {
        for (var i = 0; i < str.length; i++) {
            if (!this.isValidChar(str.substr(i, 1))) {
                return false;
            }
        }
        return true;
    };
    KeyFilter.prototype.onInput = function (e) {
        if (this.isAndroid && !this.pValidateOnly) {
            var val = this.el.nativeElement.value;
            var lastVal = this.lastValue || '';
            var inserted = this.findDelta(val, lastVal);
            var removed = this.findDelta(lastVal, val);
            var pasted = inserted.length > 1 || (!inserted && !removed);
            if (pasted) {
                if (!this.isValidString(val)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            }
            else if (!removed) {
                if (!this.isValidChar(inserted)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            }
            val = this.el.nativeElement.value;
            if (this.isValidString(val)) {
                this.lastValue = val;
            }
        }
    };
    KeyFilter.prototype.onKeyPress = function (e) {
        if (this.isAndroid || this.pValidateOnly) {
            return;
        }
        var browser = DomHandler.getBrowser();
        var k = this.getKey(e);
        if (browser.mozilla && (e.ctrlKey || e.altKey)) {
            return;
        }
        else if (k == 17 || k == 18) {
            return;
        }
        var c = this.getCharCode(e);
        var cc = String.fromCharCode(c);
        var ok = true;
        if (!browser.mozilla && (this.isSpecialKey(e) || !cc)) {
            return;
        }
        ok = this.regex.test(cc);
        if (!ok) {
            e.preventDefault();
        }
    };
    KeyFilter.prototype.onPaste = function (e) {
        var e_1, _a;
        var clipboardData = e.clipboardData || window.clipboardData.getData('text');
        if (clipboardData) {
            var pastedText = clipboardData.getData('text');
            try {
                for (var _b = __values(pastedText.toString()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var char = _c.value;
                    if (!this.regex.test(char)) {
                        e.preventDefault();
                        return;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    KeyFilter.prototype.validate = function (c) {
        if (this.pValidateOnly) {
            var value = this.el.nativeElement.value;
            if (value && !this.regex.test(value)) {
                return {
                    validatePattern: false
                };
            }
        }
    };
    KeyFilter.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], KeyFilter.prototype, "pValidateOnly", void 0);
    __decorate([
        Output()
    ], KeyFilter.prototype, "ngModelChange", void 0);
    __decorate([
        Input('pKeyFilter')
    ], KeyFilter.prototype, "pattern", null);
    __decorate([
        HostListener('input', ['$event'])
    ], KeyFilter.prototype, "onInput", null);
    __decorate([
        HostListener('keypress', ['$event'])
    ], KeyFilter.prototype, "onKeyPress", null);
    __decorate([
        HostListener('paste', ['$event'])
    ], KeyFilter.prototype, "onPaste", null);
    KeyFilter = __decorate([
        Directive({
            selector: '[pKeyFilter]',
            providers: [KEYFILTER_VALIDATOR]
        })
    ], KeyFilter);
    return KeyFilter;
}());
export { KeyFilter };
var KeyFilterModule = /** @class */ (function () {
    function KeyFilterModule() {
    }
    KeyFilterModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [KeyFilter],
            declarations: [KeyFilter]
        })
    ], KeyFilterModule);
    return KeyFilterModule;
}());
export { KeyFilterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9rZXlmaWx0ZXIvIiwic291cmNlcyI6WyJrZXlmaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQThCLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNFLE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFRO0lBQ3BDLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLFNBQVMsRUFBVCxDQUFTLENBQUM7SUFDeEMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBRUYsSUFBTSxhQUFhLEdBQUc7SUFDbEIsSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsUUFBUTtJQUNmLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLFdBQVc7SUFDbEIsR0FBRyxFQUFFLFVBQVU7SUFDZixHQUFHLEVBQUUsV0FBVztJQUNoQixLQUFLLEVBQUUsaUJBQWlCO0lBQ3hCLEtBQUssRUFBRSxTQUFTO0lBQ2hCLFFBQVEsRUFBRSxZQUFZO0NBQ3pCLENBQUM7QUFFRixJQUFNLElBQUksR0FBRztJQUNULEdBQUcsRUFBRSxDQUFDO0lBQ04sTUFBTSxFQUFFLEVBQUU7SUFDVixHQUFHLEVBQUUsRUFBRTtJQUNQLFNBQVMsRUFBRSxDQUFDO0lBQ1osTUFBTSxFQUFFLEVBQUU7Q0FDYixDQUFDO0FBRUYsSUFBTSxXQUFXLEdBQUc7SUFDaEIsS0FBSyxF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QUwzQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3BCLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUM1QixDQUFDO09BQ1csZUFBZSxDQUFJO0lBQUQsc0JBQUM7Q0FBQSxBQUFoQyxJQUFnQztTQUFuQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3QgS0VZRklMVEVSX1ZBTElEQVRPUjogYW55ID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEtleUZpbHRlciksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuY29uc3QgREVGQVVMVF9NQVNLUyA9IHtcclxuICAgIHBpbnQ6IC9bXFxkXS8sXHJcbiAgICAnaW50JzogL1tcXGRcXC1dLyxcclxuICAgIHBudW06IC9bXFxkXFwuXS8sXHJcbiAgICBtb25leTogL1tcXGRcXC5cXHMsXS8sXHJcbiAgICBudW06IC9bXFxkXFwtXFwuXS8sXHJcbiAgICBoZXg6IC9bMC05YS1mXS9pLFxyXG4gICAgZW1haWw6IC9bYS16MC05X1xcLlxcLUBdL2ksXHJcbiAgICBhbHBoYTogL1thLXpfXS9pLFxyXG4gICAgYWxwaGFudW06IC9bYS16MC05X10vaVxyXG59O1xyXG5cclxuY29uc3QgS0VZUyA9IHtcclxuICAgIFRBQjogOSxcclxuICAgIFJFVFVSTjogMTMsXHJcbiAgICBFU0M6IDI3LFxyXG4gICAgQkFDS1NQQUNFOiA4LFxyXG4gICAgREVMRVRFOiA0NlxyXG59O1xyXG5cclxuY29uc3QgU0FGQVJJX0tFWVMgPSB7XHJcbiAgICA2MzIzNDogMzcsIC8vIGxlZnRcclxuICAgIDYzMjM1OiAzOSwgLy8gcmlnaHRcclxuICAgIDYzMjMyOiAzOCwgLy8gdXBcclxuICAgIDYzMjMzOiA0MCwgLy8gZG93blxyXG4gICAgNjMyNzY6IDMzLCAvLyBwYWdlIHVwXHJcbiAgICA2MzI3NzogMzQsIC8vIHBhZ2UgZG93blxyXG4gICAgNjMyNzI6IDQ2LCAvLyBkZWxldGVcclxuICAgIDYzMjczOiAzNiwgLy8gaG9tZVxyXG4gICAgNjMyNzU6IDM1ICAvLyBlbmRcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcEtleUZpbHRlcl0nLFxyXG4gICAgcHJvdmlkZXJzOiBbS0VZRklMVEVSX1ZBTElEQVRPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEtleUZpbHRlciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gICAgQElucHV0KCkgcFZhbGlkYXRlT25seTogYm9vbGVhbjtcclxuXHJcbiAgICBAT3V0cHV0KCkgbmdNb2RlbENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgcmVnZXg6IFJlZ0V4cDtcclxuXHJcbiAgICBfcGF0dGVybjogYW55O1xyXG5cclxuICAgIGlzQW5kcm9pZDogYm9vbGVhbjtcclxuXHJcbiAgICBsYXN0VmFsdWU6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgICAgICB0aGlzLmlzQW5kcm9pZCA9IERvbUhhbmRsZXIuaXNBbmRyb2lkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhdHRlcm4oKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0dGVybjtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoJ3BLZXlGaWx0ZXInKSBzZXQgcGF0dGVybihfcGF0dGVybjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fcGF0dGVybiA9IF9wYXR0ZXJuO1xyXG4gICAgICAgIHRoaXMucmVnZXggPSBERUZBVUxUX01BU0tTW3RoaXMuX3BhdHRlcm5dIHx8IHRoaXMuX3BhdHRlcm47XHJcbiAgICB9XHJcblxyXG4gICAgaXNOYXZLZXlQcmVzcyhlOiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGsgPSBlLmtleUNvZGU7XHJcbiAgICAgICAgayA9IERvbUhhbmRsZXIuZ2V0QnJvd3NlcigpLnNhZmFyaSA/IChTQUZBUklfS0VZU1trXSB8fCBrKSA6IGs7XHJcblxyXG4gICAgICAgIHJldHVybiAoayA+PSAzMyAmJiBrIDw9IDQwKSB8fCBrID09IEtFWVMuUkVUVVJOIHx8IGsgPT0gS0VZUy5UQUIgfHwgayA9PSBLRVlTLkVTQztcclxuICAgIH07XHJcblxyXG4gICAgaXNTcGVjaWFsS2V5KGU6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICBsZXQgayA9IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xyXG5cclxuICAgICAgICByZXR1cm4gayA9PSA5IHx8IGsgPT0gMTMgfHwgayA9PSAyNyB8fCBrID09IDE2IHx8IGsgPT0gMTcgfHwoayA+PSAxOCAmJiBrIDw9IDIwKSB8fFxyXG4gICAgICAgICAgICAoRG9tSGFuZGxlci5nZXRCcm93c2VyKCkub3BlcmEgJiYgIWUuc2hpZnRLZXkgJiYgKGsgPT0gOCB8fCAoayA+PSAzMyAmJiBrIDw9IDM1KSB8fCAoayA+PSAzNiAmJiBrIDw9IDM5KSB8fCAoayA+PSA0NCAmJiBrIDw9IDQ1KSkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRLZXkoZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGxldCBrID0gZS5rZXlDb2RlIHx8IGUuY2hhckNvZGU7XHJcbiAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuZ2V0QnJvd3NlcigpLnNhZmFyaSA/IChTQUZBUklfS0VZU1trXSB8fCBrKSA6IGs7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhckNvZGUoZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIHJldHVybiBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZSB8fCBlLndoaWNoO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmREZWx0YSh2YWx1ZTogc3RyaW5nLCBwcmV2VmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkZWx0YSA9ICcnO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSB2YWx1ZS5zdWJzdHIoMCwgaSkgKyB2YWx1ZS5zdWJzdHIoaSArIHZhbHVlLmxlbmd0aCAtIHByZXZWYWx1ZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0ciA9PT0gcHJldlZhbHVlKVxyXG4gICAgICAgICAgICAgICAgZGVsdGEgPSB2YWx1ZS5zdWJzdHIoaSwgdmFsdWUubGVuZ3RoIC0gcHJldlZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGVsdGE7XHJcbiAgICB9XHJcblxyXG4gICAgaXNWYWxpZENoYXIoYzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnZXgudGVzdChjKTtcclxuICAgIH1cclxuXHJcbiAgICBpc1ZhbGlkU3RyaW5nKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRDaGFyKHN0ci5zdWJzdHIoaSwgMSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcclxuICAgIG9uSW5wdXQoZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQW5kcm9pZCAmJiAhdGhpcy5wVmFsaWRhdGVPbmx5KSB7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBsYXN0VmFsID0gdGhpcy5sYXN0VmFsdWUgfHwgJyc7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5zZXJ0ZWQgPSB0aGlzLmZpbmREZWx0YSh2YWwsIGxhc3RWYWwpO1xyXG4gICAgICAgICAgICBsZXQgcmVtb3ZlZCA9IHRoaXMuZmluZERlbHRhKGxhc3RWYWwsIHZhbCk7XHJcbiAgICAgICAgICAgIGxldCBwYXN0ZWQgPSBpbnNlcnRlZC5sZW5ndGggPiAxIHx8ICghaW5zZXJ0ZWQgJiYgIXJlbW92ZWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhc3RlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRTdHJpbmcodmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IGxhc3RWYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ01vZGVsQ2hhbmdlLmVtaXQobGFzdFZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoIXJlbW92ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkQ2hhcihpbnNlcnRlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBsYXN0VmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KGxhc3RWYWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTdHJpbmcodmFsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudCddKVxyXG4gICAgb25LZXlQcmVzcyhlOiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNBbmRyb2lkIHx8IHRoaXMucFZhbGlkYXRlT25seSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYnJvd3NlciA9IERvbUhhbmRsZXIuZ2V0QnJvd3NlcigpO1xyXG4gICAgICAgIGxldCBrID0gdGhpcy5nZXRLZXkoZSk7XHJcblxyXG4gICAgICAgIGlmIChicm93c2VyLm1vemlsbGEgJiYgKGUuY3RybEtleSB8fCBlLmFsdEtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChrID09IDE3IHx8IGsgPT0gMTgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGMgPSB0aGlzLmdldENoYXJDb2RlKGUpO1xyXG4gICAgICAgIGxldCBjYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XHJcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFicm93c2VyLm1vemlsbGEgJiYgKHRoaXMuaXNTcGVjaWFsS2V5KGUpIHx8ICFjYykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2sgPSB0aGlzLnJlZ2V4LnRlc3QoY2MpO1xyXG5cclxuICAgICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigncGFzdGUnLCBbJyRldmVudCddKVxyXG4gICAgb25QYXN0ZShlKSB7XHJcbiAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGUuY2xpcGJvYXJkRGF0YSB8fCAoPGFueT53aW5kb3cpLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpO1xyXG4gICAgICAgIGlmIChjbGlwYm9hcmREYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3RlZFRleHQgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY2hhciBvZiBwYXN0ZWRUZXh0LnRvU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZWdleC50ZXN0KGNoYXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgICAgICBpZiAodGhpcy5wVmFsaWRhdGVPbmx5KSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICYmICF0aGlzLnJlZ2V4LnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUGF0dGVybjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtLZXlGaWx0ZXJdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbS2V5RmlsdGVyXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgS2V5RmlsdGVyTW9kdWxlIHsgfVxyXG4iXX0=