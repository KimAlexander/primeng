"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var chart_1 = require("./chart");
var animations_1 = require("@angular/platform-browser/animations");
describe('UIChart', function () {
    var chart;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
            ],
            declarations: [
                chart_1.UIChart
            ]
        });
        fixture = testing_1.TestBed.createComponent(chart_1.UIChart);
        chart = fixture.componentInstance;
    });
    it('should created', function () {
        chart.data = {
            datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        3,
                        14
                    ],
                    backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB"
                    ],
                    label: 'My dataset'
                }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ]
        };
        chart.type = "polarArea";
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css("canvas"))).toBeTruthy();
    });
    it('should call onCanvasClick', function () {
        chart.data = {
            datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        3,
                        14
                    ],
                    backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB"
                    ],
                    label: 'My dataset'
                }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ],
            responsive: true
        };
        chart.height = '200px';
        chart.width = '200px';
        chart.type = "polarArea";
        var canvasOnClickSpy = spyOn(chart, "onCanvasClick").and.callThrough();
        var canvas = fixture.debugElement.query(platform_browser_1.By.css("canvas"));
        fixture.detectChanges();
        canvas.nativeElement.click();
        expect(canvasOnClickSpy).toHaveBeenCalled();
    });
    it('should refresh chart', function () {
        chart.data = {
            datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        3,
                        14
                    ],
                    backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB"
                    ],
                    label: 'My dataset'
                }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ],
        };
        chart.type = "polarArea";
        fixture.detectChanges();
        var updateSpy = spyOn(chart.chart, "update").and.callThrough();
        chart.refresh();
        expect(updateSpy).toHaveBeenCalled();
    });
    it('should reinit chart', function () {
        chart.data = {
            datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        3,
                        14
                    ],
                    backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB"
                    ],
                    label: 'My dataset'
                }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ],
        };
        chart.type = "polarArea";
        fixture.detectChanges();
        var destroySpy = spyOn(chart.chart, "destroy").and.callThrough();
        var initChartSpy = spyOn(chart, "initChart").and.callThrough();
        chart.reinit();
        expect(destroySpy).toHaveBeenCalled();
        expect(initChartSpy).toHaveBeenCalled();
    });
    it('should get canvas, image and generateLegend', function () {
        chart.data = {
            datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        3,
                        14
                    ],
                    backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB"
                    ],
                    label: 'My dataset'
                }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ],
        };
        chart.type = "polarArea";
        fixture.detectChanges();
        var legend = chart.generateLegend();
        var image = chart.getBase64Image();
        var canvas = chart.getCanvas();
        expect(canvas.tagName).toEqual("CANVAS");
        expect(image).toContain("data");
        expect(legend).toContain("legend");
    });
});
//# sourceMappingURL=chart.spec.js.map