"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var chips_1 = require("./chips");
var animations_1 = require("@angular/platform-browser/animations");
describe('Chips', function () {
    var chips;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                chips_1.Chips
            ]
        });
        fixture = testing_1.TestBed.createComponent(chips_1.Chips);
        chips = fixture.componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var chipsEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(chipsEl.nativeElement).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        chips.style = { 'primeng': 'rocks!' };
        chips.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var chipsEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(chipsEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(chipsEl.nativeElement.style.primeng).toEqual('rocks!');
    });
    it('should change inputStyle inputStyleClass inputId placeholder and tabIndex', function () {
        chips.inputStyle = { 'primeng': 'rocks!' };
        chips.inputStyleClass = "Primeng ROCKS!";
        chips.inputId = "primeng";
        chips.tabindex = 13;
        chips.placeholder = "rocks!";
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        expect(inputEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(inputEl.nativeElement.style.primeng).toEqual('rocks!');
        expect(inputEl.nativeElement.id).toEqual('primeng');
        expect(inputEl.nativeElement.tabIndex).toEqual(13);
        expect(inputEl.nativeElement.placeholder).toEqual('rocks!');
    });
    it('should disabled', function () {
        chips.disabled = true;
        fixture.detectChanges();
        var listEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        var tokenIconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chips-token-icon'));
        expect(listEl.nativeElement.className).toContain("ui-state-disabled");
        expect(tokenIconEl).toBeFalsy();
        expect(inputEl.nativeElement.disabled).toEqual(true);
    });
    it('should call onInputFocus and onInputBlur', function () {
        chips.placeholder = "rocks!";
        fixture.detectChanges();
        var focusData;
        var blurData;
        chips.onFocus.subscribe(function (value) { return focusData = value; });
        chips.onBlur.subscribe(function (value) { return blurData = value; });
        var onInputFocusSpy = spyOn(chips, 'onInputFocus').and.callThrough();
        var onInputBlurSpy = spyOn(chips, 'onInputBlur').and.callThrough();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        expect(onInputFocusSpy).toHaveBeenCalled();
        expect(chips.focus).toEqual(true);
        expect(focusData).toBeTruthy();
        inputEl.nativeElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(onInputBlurSpy).toHaveBeenCalled();
        expect(chips.focus).toEqual(false);
        expect(blurData).toBeTruthy();
    });
    it('should add item and change placeholder "rocks!" to null', function () {
        chips.placeholder = "rocks!";
        fixture.detectChanges();
        var data;
        chips.onAdd.subscribe(function (value) { return data = value; });
        var addItemSpy = spyOn(chips, 'addItem').and.callThrough();
        var onKeydownSpy = spyOn(chips, 'onKeydown').and.callThrough();
        var updateMaxedOutSpy = spyOn(chips, 'updateMaxedOut').and.callThrough();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.value = "primeng";
        fixture.detectChanges();
        var event = { 'which': 13, preventDefault: function () { } };
        chips.onKeydown(event);
        fixture.detectChanges();
        expect(addItemSpy).toHaveBeenCalled();
        expect(data).toBeTruthy();
        expect(onKeydownSpy).toHaveBeenCalled();
        expect(updateMaxedOutSpy).toHaveBeenCalled();
        expect(chips.value.length).toEqual(1);
        expect(chips.value[0]).toEqual("primeng");
        expect(inputEl.nativeElement.placeholder).toEqual('');
    });
    it('should add duplicate item', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.value = "primeng";
        fixture.detectChanges();
        var event = { 'which': 13, preventDefault: function () { } };
        chips.onKeydown(event);
        fixture.detectChanges();
        inputEl.nativeElement.value = "primeng";
        fixture.detectChanges();
        chips.onKeydown(event);
        fixture.detectChanges();
        expect(chips.value.length).toEqual(2);
        expect(chips.value[0]).toEqual("primeng");
        expect(chips.value[1]).toEqual("primeng");
    });
    it('should not add duplicate item', function () {
        chips.allowDuplicate = false;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.value = "primeng";
        fixture.detectChanges();
        var event = { 'which': 13, preventDefault: function () { } };
        chips.onKeydown(event);
        fixture.detectChanges();
        inputEl.nativeElement.value = "primeng";
        fixture.detectChanges();
        chips.onKeydown(event);
        fixture.detectChanges();
        expect(chips.value.length).toEqual(1);
        expect(chips.value[0]).toEqual("primeng");
    });
    it('should add item with tab key', function () {
        chips.addOnTab = true;
        fixture.detectChanges();
        var addItemSpy = spyOn(chips, 'addItem').and.callThrough();
        var onKeydownSpy = spyOn(chips, 'onKeydown').and.callThrough();
        var updateMaxedOutSpy = spyOn(chips, 'updateMaxedOut').and.callThrough();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.value = "primeng";
        fixture.detectChanges();
        var event = { 'which': 9, preventDefault: function () { } };
        chips.onKeydown(event);
        fixture.detectChanges();
        expect(addItemSpy).toHaveBeenCalled();
        expect(onKeydownSpy).toHaveBeenCalled();
        expect(updateMaxedOutSpy).toHaveBeenCalled();
        expect(chips.value.length).toEqual(1);
        expect(chips.value[0]).toEqual("primeng");
    });
    it('should add item with blur', function () {
        chips.addOnBlur = true;
        fixture.detectChanges();
        var addItemSpy = spyOn(chips, 'addItem').and.callThrough();
        var updateMaxedOutSpy = spyOn(chips, 'updateMaxedOut').and.callThrough();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.value = "primeng";
        fixture.detectChanges();
        inputEl.nativeElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(addItemSpy).toHaveBeenCalled();
        expect(updateMaxedOutSpy).toHaveBeenCalled();
        expect(chips.value.length).toEqual(1);
        expect(chips.value[0]).toEqual("primeng");
    });
    it('should change max', function () {
        chips.max = 2;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.value = "primeng";
        fixture.detectChanges();
        var event = { 'which': 13, preventDefault: function () { } };
        chips.onKeydown(event);
        fixture.detectChanges();
        inputEl.nativeElement.value = "primeng";
        fixture.detectChanges();
        chips.onKeydown(event);
        fixture.detectChanges();
        event.which = 81;
        chips.onKeydown(event);
        fixture.detectChanges();
        expect(chips.value.length).toEqual(2);
        expect(chips.value[0]).toEqual("primeng");
        expect(chips.value[1]).toEqual("primeng");
        expect(inputEl.nativeElement.disabled).toEqual(true);
        event.which = 8;
        chips.onKeydown(event);
        chips.updateMaxedOut();
        fixture.detectChanges();
        expect(inputEl.nativeElement.disabled).toEqual(false);
    });
    it('should delete item', function () {
        chips.value = ["primeng"];
        fixture.detectChanges();
        var data;
        chips.onRemove.subscribe(function (value) { return data = value; });
        expect(chips.value.length).toEqual(1);
        expect(chips.value[0]).toEqual("primeng");
        fixture.detectChanges();
        var event = { 'which': 8, preventDefault: function () { } };
        chips.onKeydown(event);
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(chips.value.length).toEqual(0);
        expect(chips.value[0]).toEqual(undefined);
    });
    it('should delete item with icon', function () {
        chips.value = ["primeng"];
        fixture.detectChanges();
        var data;
        chips.onRemove.subscribe(function (value) { return data = value; });
        expect(chips.value.length).toEqual(1);
        expect(chips.value[0]).toEqual("primeng");
        fixture.detectChanges();
        var tokenIconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chips-token-icon'));
        tokenIconEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(chips.value.length).toEqual(0);
        expect(chips.value[0]).toEqual(undefined);
    });
    it('should not delete item', function () {
        chips.value = ["primeng"];
        fixture.detectChanges();
        expect(chips.value.length).toEqual(1);
        expect(chips.value[0]).toEqual("primeng");
        fixture.detectChanges();
        chips.disabled = true;
        fixture.detectChanges();
        chips.removeItem(event, 0);
        fixture.detectChanges();
        expect(chips.value.length).toEqual(1);
        expect(chips.value[0]).toEqual("primeng");
    });
    it('should use field varaible', function () {
        chips.field = "name";
        chips.value = [{ 'name': 'primeng' }];
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chips-token-label'));
        expect(labelEl.nativeElement.textContent).toEqual("primeng");
        expect(chips.value[0].name).toEqual("primeng");
    });
    it('should use field varaible (2)', function () {
        chips.field = "name.primeng";
        chips.value = [{ 'name': {
                    'primeng': 'rocks'
                } }];
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chips-token-label'));
        expect(labelEl.nativeElement.textContent).toEqual("rocks");
        expect(chips.value[0].name.primeng).toEqual("rocks");
    });
});
//# sourceMappingURL=chips.spec.js.map