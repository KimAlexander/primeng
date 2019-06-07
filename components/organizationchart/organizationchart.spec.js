import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrganizationChart, OrganizationChartNode } from './organizationchart';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('OrganizationChart', function () {
    var organizationchart;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                OrganizationChart,
                OrganizationChartNode
            ]
        });
        fixture = TestBed.createComponent(OrganizationChart);
        organizationchart = fixture.componentInstance;
        organizationchart.value = [{
                label: 'F.C Barcelona',
                expanded: true,
                children: [
                    {
                        label: 'F.C Barcelona',
                        expanded: true,
                        children: [
                            {
                                label: 'Chelsea FC'
                            },
                            {
                                label: 'F.C. Barcelona'
                            }
                        ]
                    },
                    {
                        label: 'Real Madrid',
                        expanded: true,
                        children: [
                            {
                                label: 'Bayern Munich'
                            },
                            {
                                label: 'Real Madrid'
                            }
                        ]
                    }
                ]
            }];
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var organizationchartEl = fixture.debugElement.query(By.css('.ui-organizationchart'));
        expect(organizationchartEl.nativeElement).toBeTruthy();
    });
    it('should select single', function () {
        organizationchart.selectionMode = "single";
        fixture.detectChanges();
        var nodeEls = fixture.debugElement.queryAll(By.css('.ui-organizationchart-node-content'));
        var barcelonaEl = nodeEls[0];
        var chelseaEl = nodeEls[2];
        barcelonaEl.nativeElement.click();
        fixture.detectChanges();
        expect(organizationchart.selection.label).toEqual("F.C Barcelona");
        chelseaEl.nativeElement.click();
        fixture.detectChanges();
        expect(organizationchart.selection.label).toEqual("Chelsea FC");
        chelseaEl.nativeElement.click();
        fixture.detectChanges();
        expect(organizationchart.selection).toBeNull();
    });
    it('should select single', function () {
        organizationchart.selectionMode = "multiple";
        fixture.detectChanges();
        var nodeEls = fixture.debugElement.queryAll(By.css('.ui-organizationchart-node-content'));
        var barcelonaEl = nodeEls[0];
        var chelseaEl = nodeEls[2];
        barcelonaEl.nativeElement.click();
        fixture.detectChanges();
        expect(organizationchart.selection[0].label).toEqual("F.C Barcelona");
        chelseaEl.nativeElement.click();
        fixture.detectChanges();
        expect(organizationchart.selection.length).toEqual(2);
        expect(organizationchart.selection[1].label).toEqual("Chelsea FC");
        chelseaEl.nativeElement.click();
        fixture.detectChanges();
        expect(organizationchart.selection.length).toEqual(1);
    });
    it('should toggle the node', function () {
        organizationchart.selectionMode = "single";
        fixture.detectChanges();
        var nodeEls = fixture.debugElement.queryAll(By.css('.ui-organizationchart-node-content'));
        var barcelonaEl = nodeEls[0];
        barcelonaEl.nativeElement.click();
        fixture.detectChanges();
        var toggelEl = fixture.debugElement.query(By.css('.ui-node-toggler'));
        toggelEl.nativeElement.click();
        fixture.detectChanges();
        expect(organizationchart.selection.label).toEqual("F.C Barcelona");
        expect(toggelEl.componentInstance.node.expanded).toEqual(false);
    });
    it('should not select when node is non selectable', function () {
        organizationchart.selectionMode = "single";
        organizationchart.value = organizationchart.value = [{
                label: 'F.C Barcelona',
                expanded: true,
                children: [
                    {
                        label: 'F.C Barcelona',
                        expanded: true,
                        children: [
                            {
                                label: 'Chelsea FC'
                            },
                            {
                                label: 'F.C. Barcelona',
                                selectable: false
                            }
                        ],
                        selectable: false
                    },
                    {
                        label: 'Real Madrid',
                        expanded: true,
                        children: [
                            {
                                label: 'Bayern Munich'
                            },
                            {
                                label: 'Real Madrid'
                            }
                        ]
                    }
                ],
                selectable: false
            }];
        fixture.detectChanges();
        var nodeEls = fixture.debugElement.queryAll(By.css('.ui-organizationchart-node-content'));
        var barcelonaEl = nodeEls[0];
        barcelonaEl.nativeElement.click();
        fixture.detectChanges();
        expect(organizationchart.selection).toBeUndefined();
    });
});
//# sourceMappingURL=organizationchart.spec.js.map