"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var slider_1 = require("./slider");
var animations_1 = require("@angular/platform-browser/animations");
describe('Slider', function () {
    var slider;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                slider_1.Slider
            ]
        });
        fixture = testing_1.TestBed.createComponent(slider_1.Slider);
        slider = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var sliderEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(sliderEl).toBeTruthy();
    });
    it('should disabled', function () {
        slider.disabled = true;
        fixture.detectChanges();
        var sliderEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        var clickSpy = spyOn(slider, 'updateDomData').and.callThrough();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-slider-handle"));
        spanEl.nativeElement.dispatchEvent(new Event("mousedown"));
        sliderEl.click();
        fixture.detectChanges();
        expect(sliderEl.className).toContain('ui-state-disabled');
        expect(clickSpy).not.toHaveBeenCalled();
        expect(slider.dragging).not.toEqual(true);
    });
    it('should animate', function () {
        slider.animate = true;
        fixture.detectChanges();
        var sliderEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        sliderEl.click();
        expect(sliderEl.className).toContain('ui-slider-animate');
    });
    it('should change styles', function () {
        slider.style = { 'primeng': 'rocks!' };
        slider.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var sliderEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(sliderEl.className).toContain("Primeng ROCKS!");
        expect(sliderEl.style.primeng).toEqual("rocks!");
    });
    it('should change orientation', function () {
        slider.orientation = "vertical";
        fixture.detectChanges();
        var sliderEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(sliderEl.className).toContain("ui-slider-vertical");
    });
    it('should have a range', function () {
        slider.range = true;
        fixture.detectChanges();
        var sliderEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(sliderEl.children.length).toEqual(3);
    });
    it('should set min', function () {
        slider.min = 20;
        fixture.detectChanges();
        slider.updateValue(19);
        fixture.detectChanges();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
        expect(slider.handleValue).toEqual(0);
        expect(spanEl.style.width).toEqual('0%');
    });
    it('should set max', function () {
        slider.max = 90;
        fixture.detectChanges();
        slider.updateValue(91);
        fixture.detectChanges();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
        expect(slider.handleValue).toEqual(100);
        expect(spanEl.style.width).toEqual('100%');
    });
    it('should listen onChange', function () {
        var value = 1;
        slider.onChange.subscribe(function (data) { return value = data.value; });
        slider.updateValue(91);
        fixture.detectChanges();
        expect(value).toEqual(91);
    });
    it('should change value with touch events (horizontal)', function () {
        slider.updateValue(91);
        slider.handleValue = 91;
        fixture.detectChanges();
        var touchstartEvent = document.createEvent('CustomEvent');
        touchstartEvent.changedTouches = [{
                'clientX': 450,
            }];
        touchstartEvent.initEvent('touchstart', true, true);
        var touchmoveEvent = document.createEvent('CustomEvent');
        touchmoveEvent.changedTouches = [{
                'clientX': 400,
            }];
        touchmoveEvent.initEvent('touchmove', true, true);
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-slider-handle"));
        spanEl.nativeElement.dispatchEvent(touchstartEvent);
        fixture.detectChanges();
        spanEl.nativeElement.dispatchEvent(touchmoveEvent);
        fixture.detectChanges();
        expect(slider.value).toBeLessThan(91);
    });
    it('should change value with touch events (vertical)', function () {
        slider.orientation = "vertical";
        slider.updateValue(91);
        slider.handleValue = 91;
        fixture.detectChanges();
        var touchstartEvent = document.createEvent('CustomEvent');
        touchstartEvent.changedTouches = [{
                'clientY': 400,
            }];
        touchstartEvent.initEvent('touchstart', true, true);
        var touchmoveEvent = document.createEvent('CustomEvent');
        touchmoveEvent.changedTouches = [{
                'clientY': 450,
            }];
        touchmoveEvent.initEvent('touchmove', true, true);
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-slider-handle"));
        spanEl.nativeElement.dispatchEvent(touchstartEvent);
        fixture.detectChanges();
        spanEl.nativeElement.dispatchEvent(touchmoveEvent);
        fixture.detectChanges();
        expect(slider.value).toBeLessThan(91);
    });
    it('should change value with mouse events (horizontal)', function () {
        fixture.detectChanges();
        var bindDragListenersSpy = spyOn(slider, "bindDragListeners").and.callThrough();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-slider-handle"));
        spanEl.nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(bindDragListenersSpy).toHaveBeenCalled();
        expect(slider.dragging).toEqual(true);
        var mousemoveEvent = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent);
        fixture.detectChanges();
        expect(slider.value).toBeGreaterThan(0);
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(false);
        var unbindDragListenersSpy = spyOn(slider, "unbindDragListeners").and.callThrough();
        slider.ngOnDestroy();
        fixture.detectChanges();
        expect(unbindDragListenersSpy).toHaveBeenCalled();
    });
    it('should change value with mouse events (vertical)', function () {
        slider.orientation = "vertical";
        fixture.detectChanges();
        var bindDragListenersSpy = spyOn(slider, "bindDragListeners").and.callThrough();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-slider-handle"));
        spanEl.nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(bindDragListenersSpy).toHaveBeenCalled();
        expect(slider.dragging).toEqual(true);
        var mousemoveEvent = document.createEvent('CustomEvent');
        mousemoveEvent.pageY = 115;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent);
        fixture.detectChanges();
        expect(slider.value).toBeGreaterThan(0);
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(false);
        var unbindDragListenersSpy = spyOn(slider, "unbindDragListeners").and.callThrough();
        slider.ngOnDestroy();
        fixture.detectChanges();
        expect(unbindDragListenersSpy).toHaveBeenCalled();
    });
    it('should increment value with step', function () {
        slider.value = 0;
        slider.step = 2;
        fixture.detectChanges();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-slider-handle"));
        spanEl.nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(true);
        var mousemoveEvent = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent);
        fixture.detectChanges();
        expect(slider.value).toBeGreaterThan(0);
        expect(slider.value % 2).toEqual(0);
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(false);
        slider.ngOnDestroy();
        fixture.detectChanges();
    });
    it('should increment value with decimal step and decimal max', function () {
        slider.value = 0.02;
        slider.step = 0.01;
        slider.max = 2.5;
        fixture.detectChanges();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-slider-handle"));
        spanEl.nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(true);
        var mousemoveEvent = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent);
        fixture.detectChanges();
        expect(slider.value).toBeGreaterThan(0.02);
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(false);
        slider.ngOnDestroy();
        fixture.detectChanges();
    });
    it('should decrement value with step', function () {
        slider.value = 90;
        slider.step = 2;
        fixture.detectChanges();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-slider-handle"));
        spanEl.nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(true);
        var mousemoveEvent = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent);
        fixture.detectChanges();
        expect(slider.value).toBeGreaterThan(0);
        expect(slider.value % 2).toEqual(0);
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(false);
        slider.ngOnDestroy();
        fixture.detectChanges();
    });
    it('should decrement value with decimal step and decimal max', function () {
        slider.value = 2.4;
        slider.step = 0.01;
        slider.max = 2.5;
        fixture.detectChanges();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-slider-handle"));
        spanEl.nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(true);
        var mousemoveEvent = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        document.dispatchEvent(mousemoveEvent);
        fixture.detectChanges();
        expect(slider.value).toBeGreaterThan(0);
        expect(slider.value).toBeLessThan(2.4);
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
        expect(slider.dragging).toEqual(false);
        slider.ngOnDestroy();
        fixture.detectChanges();
    });
    it('should select range', function () {
        slider.range = true;
        slider.handleValues = [20, 80];
        slider.values = [20, 80];
        slider.style = { 'width': '600px' };
        fixture.detectChanges();
        var sliderHandlers = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-slider-handle"));
        var firstSliderHandler = sliderHandlers[0];
        firstSliderHandler.nativeElement.dispatchEvent(new Event("mousedown"));
        expect(slider.dragging).toEqual(true);
        var mousemoveEvent = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        fixture.detectChanges();
        expect(slider.values[0]).toBeGreaterThan(20);
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
    });
    it('should select range with step', function () {
        slider.range = true;
        slider.step = 2;
        slider.handleValues = [20, 80];
        slider.style = { 'width': '600px' };
        slider.values = [20, 80];
        fixture.detectChanges();
        var sliderHandlers = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-slider-handle"));
        var firstSliderHandler = sliderHandlers[0];
        firstSliderHandler.nativeElement.dispatchEvent(new Event("mousedown"));
        expect(slider.dragging).toEqual(true);
        var mousemoveEvent = document.createEvent('CustomEvent');
        mousemoveEvent.pageX = 300;
        mousemoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mousemoveEvent);
        fixture.detectChanges();
        expect(slider.values[0]).toBeGreaterThan(20);
        expect(slider.values[0] % 2).toEqual(0);
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
    });
    it('should select range with min and max options', function () {
        slider.range = true;
        slider.handleValues = [20, 80];
        slider.values = [20, 80];
        slider.min = 19;
        slider.max = 81;
        fixture.detectChanges();
        slider.handleIndex = 0;
        slider.updateValue(15);
        fixture.detectChanges();
        expect(slider.values[0]).toEqual(19);
        slider.updateValue(85);
        fixture.detectChanges();
        expect(slider.values[0]).toEqual(80);
        slider.handleIndex = 1;
        slider.updateValue(85);
        fixture.detectChanges();
        expect(slider.values[1]).toEqual(81);
        slider.updateValue(78);
        fixture.detectChanges();
        expect(slider.values[1]).toEqual(80);
    });
});
//# sourceMappingURL=slider.spec.js.map