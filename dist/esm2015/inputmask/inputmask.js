var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*
    Port of jQuery MaskedInput by DigitalBush as a Native Angular2 Component in Typescript without jQuery
    https://github.com/digitalBush/jquery.maskedinput/

    Copyright (c) 2007-2014 Josh Bush (digitalbush.com)

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/
import { NgModule, Component, ElementRef, OnInit, OnDestroy, Input, forwardRef, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const INPUTMASK_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputMask),
    multi: true
};
let InputMask = class InputMask {
    constructor(el) {
        this.el = el;
        this.type = 'text';
        this.slotChar = '_';
        this.autoClear = true;
        this.characterPattern = '[A-Za-z]';
        this.onComplete = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onInput = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        let ua = DomHandler.getUserAgent();
        this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
        this.initMask();
    }
    get mask() {
        return this._mask;
    }
    set mask(val) {
        this._mask = val;
        this.initMask();
        this.writeValue('');
        this.onModelChange(this.value);
    }
    initMask() {
        this.tests = [];
        this.partialPosition = this.mask.length;
        this.len = this.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            'a': this.characterPattern,
            '*': `${this.characterPattern}|[0-9]`
        };
        let maskTokens = this.mask.split('');
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c == '?') {
                this.len--;
                this.partialPosition = i;
            }
            else if (this.defs[c]) {
                this.tests.push(new RegExp(this.defs[c]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (i < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            }
            else {
                this.tests.push(null);
            }
        }
        this.buffer = [];
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c != '?') {
                if (this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
    }
    writeValue(value) {
        this.value = value;
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.value == undefined || this.value == null)
                this.inputViewChild.nativeElement.value = '';
            else
                this.inputViewChild.nativeElement.value = this.value;
            this.checkVal();
            this.focusText = this.inputViewChild.nativeElement.value;
            this.updateFilledState();
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
    caret(first, last) {
        let range, begin, end;
        if (!this.inputViewChild.nativeElement.offsetParent || this.inputViewChild.nativeElement !== document.activeElement) {
            return;
        }
        if (typeof first == 'number') {
            begin = first;
            end = (typeof last === 'number') ? last : begin;
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                this.inputViewChild.nativeElement.setSelectionRange(begin, end);
            }
            else if (this.inputViewChild.nativeElement['createTextRange']) {
                range = this.inputViewChild.nativeElement['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        }
        else {
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                begin = this.inputViewChild.nativeElement.selectionStart;
                end = this.inputViewChild.nativeElement.selectionEnd;
            }
            else if (document['selection'] && document['selection'].createRange) {
                range = document['selection'].createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { begin: begin, end: end };
        }
    }
    isCompleted() {
        let completed;
        for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return false;
            }
        }
        return true;
    }
    getPlaceholder(i) {
        if (i < this.slotChar.length) {
            return this.slotChar.charAt(i);
        }
        return this.slotChar.charAt(0);
    }
    seekNext(pos) {
        while (++pos < this.len && !this.tests[pos])
            ;
        return pos;
    }
    seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos])
            ;
        return pos;
    }
    shiftL(begin, end) {
        let i, j;
        if (begin < 0) {
            return;
        }
        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                }
                else {
                    break;
                }
                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    }
    shiftR(pos) {
        let i, c, j, t;
        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                }
                else {
                    break;
                }
            }
        }
    }
    handleAndroidInput(e) {
        var curVal = this.inputViewChild.nativeElement.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin - 1])
                pos.begin--;
            if (pos.begin === 0) {
                while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                    pos.begin++;
            }
            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
        else {
            this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin])
                pos.begin++;
            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
    }
    onInputBlur(e) {
        this.focused = false;
        this.onModelTouched();
        this.checkVal();
        this.updateFilledState();
        this.onBlur.emit(e);
        if (this.inputViewChild.nativeElement.value != this.focusText || this.inputViewChild.nativeElement.value != this.value) {
            this.updateModel(e);
            let event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.inputViewChild.nativeElement.dispatchEvent(event);
        }
    }
    onKeyDown(e) {
        if (this.readonly) {
            return;
        }
        let k = e.which || e.keyCode, pos, begin, end;
        let iPhone = /iphone/i.test(DomHandler.getUserAgent());
        this.oldVal = this.inputViewChild.nativeElement.value;
        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;
            if (end - begin === 0) {
                begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === 46 ? this.seekNext(end) : end;
            }
            this.clearBuffer(begin, end);
            this.shiftL(begin, end - 1);
            this.updateModel(e);
            this.onInput.emit(e);
            e.preventDefault();
        }
        else if (k === 13) { // enter
            this.onInputBlur(e);
            this.updateModel(e);
        }
        else if (k === 27) { // escape
            this.inputViewChild.nativeElement.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);
            e.preventDefault();
        }
    }
    onKeyPress(e) {
        if (this.readonly) {
            return;
        }
        var k = e.which || e.keyCode, pos = this.caret(), p, c, next, completed;
        if (e.ctrlKey || e.altKey || e.metaKey || k < 32 || (k > 34 && k < 41)) { //Ignore
            return;
        }
        else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }
            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);
                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);
                    if (/android/i.test(DomHandler.getUserAgent())) {
                        //Path for CSP Violation on FireFox OS 1.1
                        let proxy = () => {
                            this.caret(next);
                        };
                        setTimeout(proxy, 0);
                    }
                    else {
                        this.caret(next);
                    }
                    if (pos.begin <= this.lastRequiredNonMaskPos) {
                        completed = this.isCompleted();
                    }
                    this.onInput.emit(e);
                }
            }
            e.preventDefault();
        }
        this.updateModel(e);
        this.updateFilledState();
        if (completed) {
            this.onComplete.emit();
        }
    }
    clearBuffer(start, end) {
        let i;
        for (i = start; i < end && i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
            }
        }
    }
    writeBuffer() {
        this.inputViewChild.nativeElement.value = this.buffer.join('');
    }
    checkVal(allow) {
        //try to place characters where they belong
        let test = this.inputViewChild.nativeElement.value, lastMatch = -1, i, c, pos;
        for (i = 0, pos = 0; i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        this.buffer[i] = c;
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len);
                    break;
                }
            }
            else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if (i < this.partialPosition) {
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        }
        else if (lastMatch + 1 < this.partialPosition) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (this.inputViewChild.nativeElement.value)
                    this.inputViewChild.nativeElement.value = '';
                this.clearBuffer(0, this.len);
            }
            else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        }
        else {
            this.writeBuffer();
            this.inputViewChild.nativeElement.value = this.inputViewChild.nativeElement.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    }
    onInputFocus(event) {
        if (this.readonly) {
            return;
        }
        this.focused = true;
        clearTimeout(this.caretTimeoutId);
        let pos;
        this.focusText = this.inputViewChild.nativeElement.value;
        pos = this.checkVal();
        this.caretTimeoutId = setTimeout(() => {
            if (this.inputViewChild.nativeElement !== document.activeElement) {
                return;
            }
            this.writeBuffer();
            if (pos == this.mask.replace("?", "").length) {
                this.caret(0, pos);
            }
            else {
                this.caret(pos);
            }
        }, 10);
        this.onFocus.emit(event);
    }
    onInputChange(event) {
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);
        this.onInput.emit(event);
    }
    handleInputChange(event) {
        if (this.readonly) {
            return;
        }
        setTimeout(() => {
            var pos = this.checkVal(true);
            this.caret(pos);
            this.updateModel(event);
            if (this.isCompleted()) {
                this.onComplete.emit();
            }
        }, 0);
    }
    getUnmaskedValue() {
        let unmaskedBuffer = [];
        for (let i = 0; i < this.buffer.length; i++) {
            let c = this.buffer[i];
            if (this.tests[i] && c != this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }
        return unmaskedBuffer.join('');
    }
    updateModel(e) {
        const updatedValue = this.unmask ? this.getUnmaskedValue() : e.target.value;
        if (updatedValue !== null || updatedValue !== undefined) {
            this.value = updatedValue;
            this.onModelChange(this.value);
        }
    }
    updateFilledState() {
        this.filled = this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '';
    }
    focus() {
        this.inputViewChild.nativeElement.focus();
    }
    ngOnDestroy() {
    }
};
InputMask.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], InputMask.prototype, "type", void 0);
__decorate([
    Input()
], InputMask.prototype, "slotChar", void 0);
__decorate([
    Input()
], InputMask.prototype, "autoClear", void 0);
__decorate([
    Input()
], InputMask.prototype, "style", void 0);
__decorate([
    Input()
], InputMask.prototype, "inputId", void 0);
__decorate([
    Input()
], InputMask.prototype, "styleClass", void 0);
__decorate([
    Input()
], InputMask.prototype, "placeholder", void 0);
__decorate([
    Input()
], InputMask.prototype, "size", void 0);
__decorate([
    Input()
], InputMask.prototype, "maxlength", void 0);
__decorate([
    Input()
], InputMask.prototype, "tabindex", void 0);
__decorate([
    Input()
], InputMask.prototype, "title", void 0);
__decorate([
    Input()
], InputMask.prototype, "ariaLabel", void 0);
__decorate([
    Input()
], InputMask.prototype, "ariaRequired", void 0);
__decorate([
    Input()
], InputMask.prototype, "disabled", void 0);
__decorate([
    Input()
], InputMask.prototype, "readonly", void 0);
__decorate([
    Input()
], InputMask.prototype, "unmask", void 0);
__decorate([
    Input()
], InputMask.prototype, "name", void 0);
__decorate([
    Input()
], InputMask.prototype, "required", void 0);
__decorate([
    Input()
], InputMask.prototype, "characterPattern", void 0);
__decorate([
    Input()
], InputMask.prototype, "autoFocus", void 0);
__decorate([
    Input()
], InputMask.prototype, "autocomplete", void 0);
__decorate([
    ViewChild('input')
], InputMask.prototype, "inputViewChild", void 0);
__decorate([
    Output()
], InputMask.prototype, "onComplete", void 0);
__decorate([
    Output()
], InputMask.prototype, "onFocus", void 0);
__decorate([
    Output()
], InputMask.prototype, "onBlur", void 0);
__decorate([
    Output()
], InputMask.prototype, "onInput", void 0);
__decorate([
    Input()
], InputMask.prototype, "mask", null);
InputMask = __decorate([
    Component({
        selector: 'p-inputMask',
        template: `<input #input pInputText [attr.id]="inputId" [attr.type]="type" [attr.name]="name" [ngStyle]="style" [ngClass]="styleClass" [attr.placeholder]="placeholder" [attr.title]="title"
        [attr.size]="size" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel" [attr.aria-required]="ariaRequired" [disabled]="disabled" [readonly]="readonly" [attr.required]="required"
        (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (keydown)="onKeyDown($event)" (keypress)="onKeyPress($event)" [attr.autofocus]="autoFocus"
        (input)="onInputChange($event)" (paste)="handleInputChange($event)">`,
        host: {
            '[class.ui-inputwrapper-filled]': 'filled',
            '[class.ui-inputwrapper-focus]': 'focused'
        },
        providers: [INPUTMASK_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.Default
    })
], InputMask);
export { InputMask };
let InputMaskModule = class InputMaskModule {
};
InputMaskModule = __decorate([
    NgModule({
        imports: [CommonModule, InputTextModule],
        exports: [InputMask],
        declarations: [InputMask]
    })
], InputMaskModule);
export { InputMaskModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRtYXNrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9pbnB1dG1hc2svIiwic291cmNlcyI6WyJpbnB1dG1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMEJFO0FBQ0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwSixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDeEMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBZUYsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQTRGbEIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUExRnhCLFNBQUksR0FBVyxNQUFNLENBQUM7UUFFdEIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUV2QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBZ0MxQixxQkFBZ0IsR0FBVyxVQUFVLENBQUM7UUFRckMsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxXQUFNLEdBQXNCLElBQUksWUFB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eUNBQWdEO0FBRS9DO0lBQVQsTUFBTSxFQUFFOzBDQUFpRDtBQWlEakQ7SUFBUixLQUFLLEVBQUU7cUNBRVA7QUF2R1EsU0FBUztJQWJyQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUU7Ozs2RUFHK0Q7UUFDekUsSUFBSSxFQUFFO1lBQ0YsZ0NBQWdDLEVBQUUsUUFBUTtZQUMxQywrQkFBK0IsRUFBRSxTQUFTO1NBQzdDO1FBQ0QsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7UUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87S0FDbkQsQ0FBQztHQUNXLFNBQVMsQ0FrbEJyQjtTQWxsQlksU0FBUztBQXlsQnRCLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7Q0FBSSxDQUFBO0FBQW5CLGVBQWU7SUFMM0IsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLGVBQWUsQ0FBQztRQUN2QyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDcEIsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO0tBQzVCLENBQUM7R0FDVyxlQUFlLENBQUk7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAgICBQb3J0IG9mIGpRdWVyeSBNYXNrZWRJbnB1dCBieSBEaWdpdGFsQnVzaCBhcyBhIE5hdGl2ZSBBbmd1bGFyMiBDb21wb25lbnQgaW4gVHlwZXNjcmlwdCB3aXRob3V0IGpRdWVyeVxyXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2RpZ2l0YWxCdXNoL2pxdWVyeS5tYXNrZWRpbnB1dC9cclxuXHJcbiAgICBDb3B5cmlnaHQgKGMpIDIwMDctMjAxNCBKb3NoIEJ1c2ggKGRpZ2l0YWxidXNoLmNvbSlcclxuXHJcbiAgICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxyXG4gICAgb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cclxuICAgIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxyXG4gICAgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXHJcbiAgICBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gICAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXHJcbiAgICBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xyXG4gICAgY29uZGl0aW9uczpcclxuXHJcbiAgICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxyXG4gICAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcclxuICAgIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xyXG4gICAgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcclxuICAgIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXHJcbiAgICBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcclxuICAgIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xyXG4gICAgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxyXG4gICAgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5pbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uSW5pdCxPbkRlc3Ryb3ksSW5wdXQsZm9yd2FyZFJlZixPdXRwdXQsRXZlbnRFbWl0dGVyLFZpZXdDaGlsZCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHtJbnB1dFRleHRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcclxuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBjb25zdCBJTlBVVE1BU0tfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dE1hc2spLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1pbnB1dE1hc2snLFxyXG4gICAgdGVtcGxhdGU6IGA8aW5wdXQgI2lucHV0IHBJbnB1dFRleHQgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLnR5cGVdPVwidHlwZVwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwic3R5bGVDbGFzc1wiIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW2F0dHIudGl0bGVdPVwidGl0bGVcIlxyXG4gICAgICAgIFthdHRyLnNpemVdPVwic2l6ZVwiIFthdHRyLmF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIiBbYXR0ci5tYXhsZW5ndGhdPVwibWF4bGVuZ3RoXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIFthdHRyLmFyaWEtcmVxdWlyZWRdPVwiYXJpYVJlcXVpcmVkXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCIgW2F0dHIucmVxdWlyZWRdPVwicmVxdWlyZWRcIlxyXG4gICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIiAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiIChrZXlwcmVzcyk9XCJvbktleVByZXNzKCRldmVudClcIiBbYXR0ci5hdXRvZm9jdXNdPVwiYXV0b0ZvY3VzXCJcclxuICAgICAgICAoaW5wdXQpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCIgKHBhc3RlKT1cImhhbmRsZUlucHV0Q2hhbmdlKCRldmVudClcIj5gLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkJyxcclxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXNlZCdcclxuICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IFtJTlBVVE1BU0tfVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnB1dE1hc2sgaW1wbGVtZW50cyBPbkluaXQsT25EZXN0cm95LENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XHJcblxyXG4gICAgQElucHV0KCkgc2xvdENoYXI6IHN0cmluZyA9ICdfJztcclxuXHJcbiAgICBASW5wdXQoKSBhdXRvQ2xlYXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBtYXhsZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSB0YWJpbmRleDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXJpYVJlcXVpcmVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHVubWFzazogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgY2hhcmFjdGVyUGF0dGVybjogc3RyaW5nID0gJ1tBLVphLXpdJztcclxuXHJcbiAgICBASW5wdXQoKSBhdXRvRm9jdXM6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgYXV0b2NvbXBsZXRlOiBzdHJpbmc7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Db21wbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbklucHV0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICB2YWx1ZTogYW55O1xyXG5cclxuICAgIF9tYXNrOiBzdHJpbmc7XHJcblxyXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuXHJcbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgICBmaWxsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgZGVmczogYW55O1xyXG5cclxuICAgIHRlc3RzOiBhbnlbXTtcclxuXHJcbiAgICBwYXJ0aWFsUG9zaXRpb246IGFueTtcclxuXHJcbiAgICBmaXJzdE5vbk1hc2tQb3M6IG51bWJlcjtcclxuXHJcbiAgICBsYXN0UmVxdWlyZWROb25NYXNrUG9zOiBhbnk7XHJcblxyXG4gICAgbGVuOiBudW1iZXI7XHJcblxyXG4gICAgb2xkVmFsOiBzdHJpbmc7XHJcblxyXG4gICAgYnVmZmVyOiBhbnk7XHJcblxyXG4gICAgZGVmYXVsdEJ1ZmZlcjogc3RyaW5nO1xyXG5cclxuICAgIGZvY3VzVGV4dDogc3RyaW5nO1xyXG5cclxuICAgIGNhcmV0VGltZW91dElkOiBhbnk7XHJcblxyXG4gICAgYW5kcm9pZENocm9tZTogYm9vbGVhbjtcclxuXHJcbiAgICBmb2N1c2VkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBsZXQgdWEgPSBEb21IYW5kbGVyLmdldFVzZXJBZ2VudCgpO1xyXG4gICAgICAgIHRoaXMuYW5kcm9pZENocm9tZSA9IC9jaHJvbWUvaS50ZXN0KHVhKSAmJiAvYW5kcm9pZC9pLnRlc3QodWEpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRNYXNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IG1hc2soKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFzaztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWFzayh2YWw6c3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fbWFzayA9IHZhbDtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0TWFzaygpO1xyXG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSgnJyk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRNYXNrKCkge1xyXG4gICAgICAgIHRoaXMudGVzdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnBhcnRpYWxQb3NpdGlvbiA9IHRoaXMubWFzay5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5sZW4gPSB0aGlzLm1hc2subGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuZmlyc3ROb25NYXNrUG9zID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRlZnMgPSB7XHJcbiAgICAgICAgICAgICc5JzogJ1swLTldJyxcclxuICAgICAgICAgICAgJ2EnOiB0aGlzLmNoYXJhY3RlclBhdHRlcm4sXHJcbiAgICAgICAgICAgICcqJzogYCR7dGhpcy5jaGFyYWN0ZXJQYXR0ZXJufXxbMC05XWBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgbWFza1Rva2VucyA9IHRoaXMubWFzay5zcGxpdCgnJyk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1hc2tUb2tlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSBtYXNrVG9rZW5zW2ldO1xyXG4gICAgICAgICAgICBpZiAoYyA9PSAnPycpIHtcclxuXHRcdFx0XHR0aGlzLmxlbi0tO1xyXG5cdFx0XHRcdHRoaXMucGFydGlhbFBvc2l0aW9uID0gaTtcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmRlZnNbY10pIHtcclxuXHRcdFx0XHR0aGlzLnRlc3RzLnB1c2gobmV3IFJlZ0V4cCh0aGlzLmRlZnNbY10pKTtcclxuXHRcdFx0XHRpZiAodGhpcy5maXJzdE5vbk1hc2tQb3MgPT09IG51bGwpIHtcclxuXHQgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vbk1hc2tQb3MgPSB0aGlzLnRlc3RzLmxlbmd0aCAtIDE7XHJcblx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCB0aGlzLnBhcnRpYWxQb3NpdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0UmVxdWlyZWROb25NYXNrUG9zID0gdGhpcy50ZXN0cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudGVzdHMucHVzaChudWxsKTtcclxuXHRcdFx0fVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbWFza1Rva2Vucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYyA9IG1hc2tUb2tlbnNbaV07XHJcbiAgICAgICAgICAgIGlmIChjICE9ICc/Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVmc1tjXSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnB1c2goYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0QnVmZmVyID0gdGhpcy5idWZmZXIuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlID09IHVuZGVmaW5lZCB8fCB0aGlzLnZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tWYWwoKTtcclxuICAgICAgICAgICAgdGhpcy5mb2N1c1RleHQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGNhcmV0KGZpcnN0PzogbnVtYmVyLCBsYXN0PzogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJhbmdlLCBiZWdpbiwgZW5kO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnR8fHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGZpcnN0ID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGJlZ2luID0gZmlyc3Q7XHJcbiAgICAgICAgICAgIGVuZCA9ICh0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicpID8gbGFzdCA6IGJlZ2luO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoYmVnaW4sIGVuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50WydjcmVhdGVUZXh0UmFuZ2UnXSkge1xyXG4gICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbJ2NyZWF0ZVRleHRSYW5nZSddKCk7XHJcbiAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIGJlZ2luKTtcclxuICAgICAgICAgICAgICAgIHJhbmdlLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKSB7XHJcbiAgICBcdFx0XHRiZWdpbiA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcclxuICAgIFx0XHRcdGVuZCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XHJcbiAgICBcdFx0fVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudFsnc2VsZWN0aW9uJ10gJiYgZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmNyZWF0ZVJhbmdlKSB7XHJcbiAgICBcdFx0XHRyYW5nZSA9IGRvY3VtZW50WydzZWxlY3Rpb24nXS5jcmVhdGVSYW5nZSgpO1xyXG4gICAgXHRcdFx0YmVnaW4gPSAwIC0gcmFuZ2UuZHVwbGljYXRlKCkubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtMTAwMDAwKTtcclxuICAgIFx0XHRcdGVuZCA9IGJlZ2luICsgcmFuZ2UudGV4dC5sZW5ndGg7XHJcbiAgICBcdFx0fVxyXG5cclxuICAgIFx0XHRyZXR1cm4ge2JlZ2luOiBiZWdpbiwgZW5kOiBlbmR9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0NvbXBsZXRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29tcGxldGVkOiBib29sZWFuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmZpcnN0Tm9uTWFza1BvczsgaSA8PSB0aGlzLmxhc3RSZXF1aXJlZE5vbk1hc2tQb3M7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSAmJiB0aGlzLmJ1ZmZlcltpXSA9PT0gdGhpcy5nZXRQbGFjZWhvbGRlcihpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQbGFjZWhvbGRlcihpOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoaSA8IHRoaXMuc2xvdENoYXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNsb3RDaGFyLmNoYXJBdChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xvdENoYXIuY2hhckF0KDApO1xyXG4gICAgfVxyXG5cclxuICAgIHNlZWtOZXh0KHBvcykge1xyXG4gICAgICAgIHdoaWxlICgrK3BvcyA8IHRoaXMubGVuICYmICF0aGlzLnRlc3RzW3Bvc10pO1xyXG4gICAgICAgIHJldHVybiBwb3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2Vla1ByZXYocG9zKSB7XHJcbiAgICAgICAgd2hpbGUgKC0tcG9zID49IDAgJiYgIXRoaXMudGVzdHNbcG9zXSk7XHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxuXHJcbiAgICBzaGlmdEwoYmVnaW46bnVtYmVyLGVuZDpudW1iZXIpIHtcclxuICAgICAgICBsZXQgaSwgajtcclxuXHJcbiAgICAgICAgaWYgKGJlZ2luPDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChpID0gYmVnaW4sIGogPSB0aGlzLnNlZWtOZXh0KGVuZCk7IGkgPCB0aGlzLmxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaiA8IHRoaXMubGVuICYmIHRoaXMudGVzdHNbaV0udGVzdCh0aGlzLmJ1ZmZlcltqXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuYnVmZmVyW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2pdID0gdGhpcy5nZXRQbGFjZWhvbGRlcihqKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaiA9IHRoaXMuc2Vla05leHQoaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIHRoaXMuY2FyZXQoTWF0aC5tYXgodGhpcy5maXJzdE5vbk1hc2tQb3MsIGJlZ2luKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hpZnRSKHBvcykge1xyXG4gICAgICAgIGxldCBpLCBjLCBqLCB0O1xyXG5cclxuICAgICAgICBmb3IgKGkgPSBwb3MsIGMgPSB0aGlzLmdldFBsYWNlaG9sZGVyKHBvcyk7IGkgPCB0aGlzLmxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBqID0gdGhpcy5zZWVrTmV4dChpKTtcclxuICAgICAgICAgICAgICAgIHQgPSB0aGlzLmJ1ZmZlcltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gYztcclxuICAgICAgICAgICAgICAgIGlmIChqIDwgdGhpcy5sZW4gJiYgdGhpcy50ZXN0c1tqXS50ZXN0KHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYyA9IHQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUFuZHJvaWRJbnB1dChlKSB7XHJcbiAgICAgICAgdmFyIGN1clZhbCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICB2YXIgcG9zID0gdGhpcy5jYXJldCgpO1xyXG4gICAgICAgIGlmICh0aGlzLm9sZFZhbCAmJiB0aGlzLm9sZFZhbC5sZW5ndGggJiYgdGhpcy5vbGRWYWwubGVuZ3RoID4gY3VyVmFsLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgLy8gYSBkZWxldGlvbiBvciBiYWNrc3BhY2UgaGFwcGVuZWRcclxuICAgICAgICAgICAgdGhpcy5jaGVja1ZhbCh0cnVlKTtcclxuICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA+IDAgJiYgIXRoaXMudGVzdHNbcG9zLmJlZ2luLTFdKVxyXG4gICAgICAgICAgICAgICAgICBwb3MuYmVnaW4tLTtcclxuICAgICAgICAgICAgaWYgKHBvcy5iZWdpbiA9PT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICB3aGlsZSAocG9zLmJlZ2luIDwgdGhpcy5maXJzdE5vbk1hc2tQb3MgJiYgIXRoaXMudGVzdHNbcG9zLmJlZ2luXSlcclxuICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldChwb3MuYmVnaW4sIHBvcy5iZWdpbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wbGV0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tWYWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIHdoaWxlIChwb3MuYmVnaW4gPCB0aGlzLmxlbiAmJiAhdGhpcy50ZXN0c1twb3MuYmVnaW5dKVxyXG4gICAgICAgICAgICAgICAgcG9zLmJlZ2luKys7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZXQocG9zLmJlZ2luLCBwb3MuYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ29tcGxldGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dEJsdXIoZSkge1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgICAgICB0aGlzLmNoZWNrVmFsKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgIT0gdGhpcy5mb2N1c1RleHQgfHwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlICE9IHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcclxuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcclxuICAgICAgICAgICAgZXZlbnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlEb3duKGUpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgayA9IGUud2hpY2h8fGUua2V5Q29kZSxcclxuICAgICAgICAgICAgcG9zLFxyXG4gICAgICAgICAgICBiZWdpbixcclxuICAgICAgICAgICAgZW5kO1xyXG4gICAgICAgIGxldCBpUGhvbmUgPSAvaXBob25lL2kudGVzdChEb21IYW5kbGVyLmdldFVzZXJBZ2VudCgpKTtcclxuICAgICAgICB0aGlzLm9sZFZhbCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICAgICAgLy9iYWNrc3BhY2UsIGRlbGV0ZSwgYW5kIGVzY2FwZSBnZXQgc3BlY2lhbCB0cmVhdG1lbnRcclxuICAgICAgICBpZiAoayA9PT0gOCB8fCBrID09PSA0NiB8fCAoaVBob25lICYmIGsgPT09IDEyNykpIHtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5jYXJldCgpO1xyXG4gICAgICAgICAgICBiZWdpbiA9IHBvcy5iZWdpbjtcclxuICAgICAgICAgICAgZW5kID0gcG9zLmVuZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbmQgLSBiZWdpbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYmVnaW49ayE9PTQ2P3RoaXMuc2Vla1ByZXYoYmVnaW4pOihlbmQ9dGhpcy5zZWVrTmV4dChiZWdpbi0xKSk7XHJcbiAgICAgICAgICAgICAgICBlbmQ9az09PTQ2P3RoaXMuc2Vla05leHQoZW5kKTplbmQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJCdWZmZXIoYmVnaW4sIGVuZCk7XHJcblx0XHRcdHRoaXMuc2hpZnRMKGJlZ2luLCBlbmQgLSAxKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcclxuICAgICAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoZSk7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmICggayA9PT0gMTMgKSB7IC8vIGVudGVyXHJcbiAgICAgICAgICAgIHRoaXMub25JbnB1dEJsdXIoZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmIChrID09PSAyNykgeyAvLyBlc2NhcGVcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5mb2N1c1RleHQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyZXQoMCwgdGhpcy5jaGVja1ZhbCgpKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcclxuXHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlQcmVzcyhlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgayA9IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxyXG4gICAgICAgICAgICBwb3MgPSB0aGlzLmNhcmV0KCksXHJcbiAgICAgICAgICAgIHAsXHJcbiAgICAgICAgICAgIGMsXHJcbiAgICAgICAgICAgIG5leHQsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlZDtcclxuXHJcbiAgICAgICAgaWYgKGUuY3RybEtleSB8fCBlLmFsdEtleSB8fCBlLm1ldGFLZXkgfHwgayA8IDMyICB8fCAoayA+IDM0ICYmIGsgPCA0MSkpIHsvL0lnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmICggayAmJiBrICE9PSAxMyApIHtcclxuICAgICAgICAgICAgaWYgKHBvcy5lbmQgLSBwb3MuYmVnaW4gIT09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihwb3MuYmVnaW4sIHBvcy5lbmQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdEwocG9zLmJlZ2luLCBwb3MuZW5kLTEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwID0gdGhpcy5zZWVrTmV4dChwb3MuYmVnaW4gLSAxKTtcclxuICAgICAgICAgICAgaWYgKHAgPCB0aGlzLmxlbikge1xyXG4gICAgICAgICAgICAgICAgYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoayk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0c1twXS50ZXN0KGMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlmdFIocCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW3BdID0gYztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuc2Vla05leHQocCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgvYW5kcm9pZC9pLnRlc3QoRG9tSGFuZGxlci5nZXRVc2VyQWdlbnQoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9QYXRoIGZvciBDU1AgVmlvbGF0aW9uIG9uIEZpcmVGb3ggT1MgMS4xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm94eSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZXQobmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHByb3h5LDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJldChuZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3MuYmVnaW4gPD0gdGhpcy5sYXN0UmVxdWlyZWROb25NYXNrUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZCA9IHRoaXMuaXNDb21wbGV0ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckJ1ZmZlcihzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQgJiYgaSA8IHRoaXMubGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gdGhpcy5nZXRQbGFjZWhvbGRlcihpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3cml0ZUJ1ZmZlcigpIHtcclxuICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmJ1ZmZlci5qb2luKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1ZhbChhbGxvdz86IGJvb2xlYW4pIHtcclxuICAgICAgICAvL3RyeSB0byBwbGFjZSBjaGFyYWN0ZXJzIHdoZXJlIHRoZXkgYmVsb25nXHJcbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUsXHJcbiAgICAgICAgICAgIGxhc3RNYXRjaCA9IC0xLFxyXG4gICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICBjLFxyXG4gICAgICAgICAgICBwb3M7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDAsIHBvcyA9IDA7IGkgPCB0aGlzLmxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAocG9zKysgPCB0ZXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGMgPSB0ZXN0LmNoYXJBdChwb3MgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXS50ZXN0KGMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gYztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE1hdGNoID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+IHRlc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihpICsgMSwgdGhpcy5sZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYnVmZmVyW2ldID09PSB0ZXN0LmNoYXJBdChwb3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIGkgPCB0aGlzLnBhcnRpYWxQb3NpdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdE1hdGNoID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxsb3cpIHtcclxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGFzdE1hdGNoICsgMSA8IHRoaXMucGFydGlhbFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9DbGVhciB8fCB0aGlzLmJ1ZmZlci5qb2luKCcnKSA9PT0gdGhpcy5kZWZhdWx0QnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIHZhbHVlLiBSZW1vdmUgaXQgYW5kIHJlcGxhY2UgaXQgd2l0aCB0aGVcclxuICAgICAgICAgICAgICAgIC8vIG1hc2ssIHdoaWNoIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yLlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSkgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQnVmZmVyKDAsIHRoaXMubGVuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEludmFsaWQgdmFsdWUsIGJ1dCB3ZSBvcHQgdG8gc2hvdyB0aGUgdmFsdWUgdG8gdGhlXHJcbiAgICAgICAgICAgICAgICAvLyB1c2VyIGFuZCBhbGxvdyB0aGVtIHRvIGNvcnJlY3QgdGhlaXIgbWlzdGFrZS5cclxuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBsYXN0TWF0Y2ggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnBhcnRpYWxQb3NpdGlvbiA/IGkgOiB0aGlzLmZpcnN0Tm9uTWFza1Bvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jYXJldFRpbWVvdXRJZCk7XHJcbiAgICAgICAgbGV0IHBvcztcclxuXHJcbiAgICAgICAgdGhpcy5mb2N1c1RleHQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XHJcblxyXG4gICAgICAgIHBvcyA9IHRoaXMuY2hlY2tWYWwoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYXJldFRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgIGlmIChwb3MgPT0gdGhpcy5tYXNrLnJlcGxhY2UoXCI/XCIsXCJcIikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KDAsIHBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMCk7XHJcblxyXG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBvbklucHV0Q2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5kcm9pZENocm9tZSlcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBbmRyb2lkSW5wdXQoZXZlbnQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZShldmVudCk7XHJcblxyXG4gICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVJbnB1dENoYW5nZShldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5KXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmNoZWNrVmFsKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcmV0KHBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0NvbXBsZXRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VW5tYXNrZWRWYWx1ZSgpIHtcclxuICAgICAgICBsZXQgdW5tYXNrZWRCdWZmZXIgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSB0aGlzLmJ1ZmZlcltpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0gJiYgYyAhPSB0aGlzLmdldFBsYWNlaG9sZGVyKGkpKSB7XHJcbiAgICAgICAgICAgICAgICB1bm1hc2tlZEJ1ZmZlci5wdXNoKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5tYXNrZWRCdWZmZXIuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTW9kZWwoZSkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRWYWx1ZSA9IHRoaXMudW5tYXNrID8gdGhpcy5nZXRVbm1hc2tlZFZhbHVlKCkgOiBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICBpZiAodXBkYXRlZFZhbHVlICE9PSBudWxsIHx8IHVwZGF0ZWRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB1cGRhdGVkVmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5maWxsZWQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlICE9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsSW5wdXRUZXh0TW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtJbnB1dE1hc2tdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXRNYXNrXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRNYXNrTW9kdWxlIHsgfVxyXG4iXX0=