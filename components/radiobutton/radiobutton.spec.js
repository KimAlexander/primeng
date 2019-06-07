import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadioButton } from './radiobutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('RadioButton', function () {
    var radiobutton;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                RadioButton
            ]
        });
        fixture = TestBed.createComponent(RadioButton);
        radiobutton = fixture.componentInstance;
    });
    it('should change name inputId value style styleClass label labelStyleClass and tabIndex', function () {
        radiobutton.name = "primeng";
        radiobutton.inputId = "prime";
        radiobutton.value = "Primeng";
        radiobutton.style = { 'primeng': 'rocks!' };
        radiobutton.styleClass = "Primeng ROCKS!";
        radiobutton.label = "Prime";
        radiobutton.labelStyleClass = "Primeng ROCKS";
        radiobutton.tabindex = 13;
        fixture.detectChanges();
        var radiobuttonEl = fixture.debugElement.query(By.css('div'));
        var inputEl = fixture.debugElement.query(By.css('input'));
        var labelEl = fixture.debugElement.query(By.css('label'));
        expect(inputEl.nativeElement.name).toEqual("primeng");
        expect(inputEl.nativeElement.value).toEqual("Primeng");
        expect(inputEl.nativeElement.id).toEqual("prime");
        expect(inputEl.nativeElement.tabIndex).toEqual(13);
        expect(radiobuttonEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(radiobuttonEl.nativeElement.style.primeng).toEqual("rocks!");
        expect(labelEl.nativeElement.className).toContain("Primeng ROCKS");
        expect(labelEl.nativeElement.textContent).toEqual("Prime");
        expect(labelEl.nativeElement.htmlFor).toEqual("prime");
    });
    it('should display active state initially when checked by default', function () {
        radiobutton.checked = true;
        radiobutton.inputViewChild.nativeElement.checked = true;
        fixture.detectChanges();
        var boxEl = fixture.nativeElement.querySelector('.ui-radiobutton-box');
        expect(boxEl.className).toContain('ui-state-active');
    });
    it('should disabled', function () {
        radiobutton.disabled = true;
        radiobutton.label = "prime";
        fixture.detectChanges();
        var handleClickSpy = spyOn(radiobutton, 'handleClick').and.callThrough();
        var selectSpy = spyOn(radiobutton, 'select').and.callThrough();
        var radiobuttonEl = fixture.debugElement.queryAll(By.css('div'))[2];
        var inputEl = fixture.debugElement.query(By.css('input'));
        var labelEl = fixture.debugElement.query(By.css('label'));
        expect(inputEl.nativeElement.disabled).toEqual(true);
        expect(radiobuttonEl.nativeElement.className).toContain("ui-state-disabled");
        expect(labelEl.nativeElement.className).toContain("ui-label-disabled");
        radiobuttonEl.nativeElement.click();
        fixture.detectChanges();
        expect(handleClickSpy).toHaveBeenCalled();
        expect(selectSpy).not.toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(undefined);
        labelEl.nativeElement.click();
        fixture.detectChanges();
        expect(handleClickSpy).toHaveBeenCalledTimes(1);
        expect(selectSpy).toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(undefined);
    });
    it('should click checkbox', function () {
        fixture.detectChanges();
        var value;
        radiobutton.onClick.subscribe(function (event) { return value = 5; });
        var handleClickSpy = spyOn(radiobutton, 'handleClick').and.callThrough();
        var selectSpy = spyOn(radiobutton, 'select').and.callThrough();
        var onFocusSpy = spyOn(radiobutton, 'onInputFocus').and.callThrough();
        var radiobuttonEl = fixture.debugElement.queryAll(By.css('div'))[2];
        var inputEl = fixture.debugElement.query(By.css('input'));
        var iconEl = fixture.debugElement.query(By.css('span'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        radiobuttonEl.nativeElement.click();
        fixture.detectChanges();
        expect(handleClickSpy).toHaveBeenCalled();
        expect(selectSpy).toHaveBeenCalled();
        expect(onFocusSpy).toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(true);
        expect(value).toEqual(5);
        expect(radiobutton.focused).toEqual(true);
        expect(radiobuttonEl.nativeElement.className).toContain("ui-state-focus");
        expect(iconEl.nativeElement.className).toContain("pi pi-circle-on");
    });
    it('should click label', function () {
        radiobutton.label = "prime";
        fixture.detectChanges();
        var value;
        radiobutton.onClick.subscribe(function (event) { return value = 5; });
        var handleClickSpy = spyOn(radiobutton, 'handleClick').and.callThrough();
        var selectSpy = spyOn(radiobutton, 'select').and.callThrough();
        var onFocusSpy = spyOn(radiobutton, 'onInputFocus').and.callThrough();
        var onBlurSpy = spyOn(radiobutton, 'onInputBlur').and.callThrough();
        var inputEl = fixture.debugElement.query(By.css('input'));
        var labelEl = fixture.debugElement.query(By.css('label'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        labelEl.nativeElement.click();
        fixture.detectChanges();
        expect(handleClickSpy).not.toHaveBeenCalled();
        expect(selectSpy).toHaveBeenCalled();
        expect(onFocusSpy).toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(true);
        expect(labelEl.nativeElement.className).toContain("ui-label-focus");
        expect(value).toEqual(5);
        inputEl.nativeElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(radiobutton.focused).toEqual(false);
        expect(onBlurSpy).toHaveBeenCalled();
    });
    it('should call writeValue', function () {
        radiobutton.label = "prime";
        radiobutton.value = "prime";
        fixture.detectChanges();
        var writeValueSpy = spyOn(radiobutton, 'writeValue').and.callThrough();
        radiobutton.writeValue("prime");
        fixture.detectChanges();
        expect(writeValueSpy).toHaveBeenCalled();
        expect(radiobutton.checked).toEqual(true);
    });
});
//# sourceMappingURL=radiobutton.spec.js.map