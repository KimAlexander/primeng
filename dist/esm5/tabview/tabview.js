var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, TemplateRef, EmbeddedViewRef, ViewContainerRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule, PrimeTemplate } from 'primeng/api';
var idx = 0;
var TabViewNav = /** @class */ (function () {
    function TabViewNav() {
        this.orientation = 'top';
        this.onTabClick = new EventEmitter();
        this.onTabCloseClick = new EventEmitter();
    }
    TabViewNav.prototype.getDefaultHeaderClass = function (tab) {
        var styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    };
    TabViewNav.prototype.clickTab = function (event, tab) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        });
    };
    TabViewNav.prototype.clickClose = function (event, tab) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        });
    };
    __decorate([
        Input()
    ], TabViewNav.prototype, "tabs", void 0);
    __decorate([
        Input()
    ], TabViewNav.prototype, "orientation", void 0);
    __decorate([
        Output()
    ], TabViewNav.prototype, "onTabClick", void 0);
    __decorate([
        Output()
    ], TabViewNav.prototype, "onTabCloseClick", void 0);
    TabViewNav = __decorate([
        Component({
            selector: '[p-tabViewNav]',
            host: {
                '[class.ui-tabview-nav]': 'true',
                '[class.ui-helper-reset]': 'true',
                '[class.ui-helper-clearfix]': 'true',
                '[class.ui-widget-header]': 'true',
                '[class.ui-corner-all]': 'true'
            },
            template: "\n        <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n            <li [class]=\"getDefaultHeaderClass(tab)\" [ngStyle]=\"tab.headerStyle\" role=\"presentation\"\n                [ngClass]=\"{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}\"\n                (click)=\"clickTab($event,tab)\" *ngIf=\"!tab.closed\" tabindex=\"0\" (keydown.enter)=\"clickTab($event,tab)\">\n                <a [attr.id]=\"tab.id + '-label'\" role=\"tab\" [attr.aria-selected]=\"tab.selected\" [attr.aria-controls]=\"tab.id\" [pTooltip]=\"tab.tooltip\" [tooltipPosition]=\"tab.tooltipPosition\"\n                    [attr.aria-selected]=\"tab.selected\" [positionStyle]=\"tab.tooltipPositionStyle\" [tooltipStyleClass]=\"tab.tooltipStyleClass\">\n                    <ng-container *ngIf=\"!tab.headerTemplate\" >\n                        <span class=\"ui-tabview-left-icon\" [ngClass]=\"tab.leftIcon\" *ngIf=\"tab.leftIcon\"></span>\n                        <span class=\"ui-tabview-title\">{{tab.header}}</span>\n                        <span class=\"ui-tabview-right-icon\" [ngClass]=\"tab.rightIcon\" *ngIf=\"tab.rightIcon\"></span>\n                    </ng-container>\n                    <ng-container *ngIf=\"tab.headerTemplate\">\n                        <ng-container *ngTemplateOutlet=\"tab.headerTemplate\"></ng-container>\n                    </ng-container>\n                </a>\n                <span *ngIf=\"tab.closable\" class=\"ui-tabview-close pi pi-times\" (click)=\"clickClose($event,tab)\"></span>\n            </li>\n        </ng-template>\n    "
        })
    ], TabViewNav);
    return TabViewNav;
}());
export { TabViewNav };
var TabPanel = /** @class */ (function () {
    function TabPanel(viewContainer, cd) {
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.cache = true;
        this.tooltipPosition = 'top';
        this.tooltipPositionStyle = 'absolute';
        this.id = "ui-tabpanel-" + idx++;
    }
    TabPanel.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'content':
                    _this.contentTemplate = item.template;
                    break;
                default:
                    _this.contentTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(TabPanel.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            this._selected = val;
            if (!this.loaded) {
                this.cd.detectChanges();
            }
            this.loaded = true;
        },
        enumerable: true,
        configurable: true
    });
    TabPanel.prototype.ngOnDestroy = function () {
        this.view = null;
    };
    TabPanel.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], TabPanel.prototype, "header", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "closable", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "headerStyle", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "headerStyleClass", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "leftIcon", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "rightIcon", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "cache", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "tooltip", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "tooltipPosition", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "tooltipPositionStyle", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "tooltipStyleClass", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], TabPanel.prototype, "templates", void 0);
    __decorate([
        Input()
    ], TabPanel.prototype, "selected", null);
    TabPanel = __decorate([
        Component({
            selector: 'p-tabPanel',
            template: "\n        <div [attr.id]=\"id\" class=\"ui-tabview-panel ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': !selected}\"\n            role=\"tabpanel\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id + '-label'\" *ngIf=\"!closed\">\n            <ng-content></ng-content>\n            <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </ng-container>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], TabPanel);
    return TabPanel;
}());
export { TabPanel };
var TabView = /** @class */ (function () {
    function TabView(el) {
        this.el = el;
        this.orientation = 'top';
        this.onChange = new EventEmitter();
        this.onClose = new EventEmitter();
        this.activeIndexChange = new EventEmitter();
    }
    TabView.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initTabs();
        this.tabPanels.changes.subscribe(function (_) {
            _this.initTabs();
        });
    };
    TabView.prototype.initTabs = function () {
        this.tabs = this.tabPanels.toArray();
        var selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
        }
    };
    TabView.prototype.open = function (event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            var selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            tab.selected = true;
            var selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
        }
        if (event) {
            event.preventDefault();
        }
    };
    TabView.prototype.close = function (event, tab) {
        var _this = this;
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: function () {
                    _this.closeTab(tab);
                }
            });
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
        event.stopPropagation();
    };
    TabView.prototype.closeTab = function (tab) {
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            tab.selected = false;
            for (var i = 0; i < this.tabs.length; i++) {
                var tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
    };
    TabView.prototype.findSelectedTab = function () {
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    };
    TabView.prototype.findTabIndex = function (tab) {
        var index = -1;
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    };
    TabView.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Object.defineProperty(TabView.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (val) {
            this._activeIndex = val;
            if (this.preventActiveIndexPropagation) {
                this.preventActiveIndexPropagation = false;
                return;
            }
            if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
                this.findSelectedTab().selected = false;
                this.tabs[this._activeIndex].selected = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    TabView.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], TabView.prototype, "orientation", void 0);
    __decorate([
        Input()
    ], TabView.prototype, "style", void 0);
    __decorate([
        Input()
    ], TabView.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], TabView.prototype, "controlClose", void 0);
    __decorate([
        ContentChildren(TabPanel)
    ], TabView.prototype, "tabPanels", void 0);
    __decorate([
        Output()
    ], TabView.prototype, "onChange", void 0);
    __decorate([
        Output()
    ], TabView.prototype, "onClose", void 0);
    __decorate([
        Output()
    ], TabView.prototype, "activeIndexChange", void 0);
    __decorate([
        Input()
    ], TabView.prototype, "activeIndex", null);
    TabView = __decorate([
        Component({
            selector: 'p-tabView',
            template: "\n        <div [ngClass]=\"'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation!='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\"\n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n            <div class=\"ui-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation=='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\"\n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n        </div>\n    "
        })
    ], TabView);
    return TabView;
}());
export { TabView };
var TabViewModule = /** @class */ (function () {
    function TabViewModule() {
    }
    TabViewModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, TooltipModule],
            exports: [TabView, TabPanel, TabViewNav, SharedModule],
            declarations: [TabView, TabPanel, TabViewNav]
        })
    ], TabViewModule);
    return TabViewModule;
}());
export { TabViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdGFidmlldy8iLCJzb3VyY2VzIjpbInRhYnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxnQkFBZ0IsRUFDbEYsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHdkQsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0FBZ0NwQjtJQUFBO1FBSWEsZ0JBQVcsR0FBVyxLQUFLLENBQUM7UUFFM0IsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF1QnRFLENBQUM7SUFyQkcsMENBQXFCLEdBQXJCLFVBQXNCLEdBQVk7UUFDOUIsSUFBSSxVQUFVLEdBQUcsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNsRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN0QixVQUFVLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7U0FDeEQ7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsNkJBQVEsR0FBUixVQUFTLEtBQUssRUFBRSxHQUFhO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ2pCLGFBQWEs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cG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQWZ0ZXJDb250ZW50SW5pdCxcclxuICAgICAgICBDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLEVtYmVkZGVkVmlld1JlZixWaWV3Q29udGFpbmVyUmVmLENoYW5nZURldGVjdG9yUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7VG9vbHRpcE1vZHVsZX0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcclxuaW1wb3J0IHtTaGFyZWRNb2R1bGUsUHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge0Jsb2NrYWJsZVVJfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcblxyXG5sZXQgaWR4OiBudW1iZXIgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ1twLXRhYlZpZXdOYXZdJyxcclxuICAgIGhvc3Q6e1xyXG4gICAgICAgICdbY2xhc3MudWktdGFidmlldy1uYXZdJzogJ3RydWUnLFxyXG4gICAgICAgICdbY2xhc3MudWktaGVscGVyLXJlc2V0XSc6ICd0cnVlJyxcclxuICAgICAgICAnW2NsYXNzLnVpLWhlbHBlci1jbGVhcmZpeF0nOiAndHJ1ZScsXHJcbiAgICAgICAgJ1tjbGFzcy51aS13aWRnZXQtaGVhZGVyXSc6ICd0cnVlJyxcclxuICAgICAgICAnW2NsYXNzLnVpLWNvcm5lci1hbGxdJzogJ3RydWUnXHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXRhYiBbbmdGb3JPZl09XCJ0YWJzXCI+XHJcbiAgICAgICAgICAgIDxsaSBbY2xhc3NdPVwiZ2V0RGVmYXVsdEhlYWRlckNsYXNzKHRhYilcIiBbbmdTdHlsZV09XCJ0YWIuaGVhZGVyU3R5bGVcIiByb2xlPVwicHJlc2VudGF0aW9uXCJcclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktdGFidmlldy1zZWxlY3RlZCB1aS1zdGF0ZS1hY3RpdmUnOiB0YWIuc2VsZWN0ZWQsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IHRhYi5kaXNhYmxlZH1cIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsaWNrVGFiKCRldmVudCx0YWIpXCIgKm5nSWY9XCIhdGFiLmNsb3NlZFwiIHRhYmluZGV4PVwiMFwiIChrZXlkb3duLmVudGVyKT1cImNsaWNrVGFiKCRldmVudCx0YWIpXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBbYXR0ci5pZF09XCJ0YWIuaWQgKyAnLWxhYmVsJ1wiIHJvbGU9XCJ0YWJcIiBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInRhYi5zZWxlY3RlZFwiIFthdHRyLmFyaWEtY29udHJvbHNdPVwidGFiLmlkXCIgW3BUb29sdGlwXT1cInRhYi50b29sdGlwXCIgW3Rvb2x0aXBQb3NpdGlvbl09XCJ0YWIudG9vbHRpcFBvc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInRhYi5zZWxlY3RlZFwiIFtwb3NpdGlvblN0eWxlXT1cInRhYi50b29sdGlwUG9zaXRpb25TdHlsZVwiIFt0b29sdGlwU3R5bGVDbGFzc109XCJ0YWIudG9vbHRpcFN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRhYi5oZWFkZXJUZW1wbGF0ZVwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS10YWJ2aWV3LWxlZnQtaWNvblwiIFtuZ0NsYXNzXT1cInRhYi5sZWZ0SWNvblwiICpuZ0lmPVwidGFiLmxlZnRJY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRhYnZpZXctdGl0bGVcIj57e3RhYi5oZWFkZXJ9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS10YWJ2aWV3LXJpZ2h0LWljb25cIiBbbmdDbGFzc109XCJ0YWIucmlnaHRJY29uXCIgKm5nSWY9XCJ0YWIucmlnaHRJY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWIuaGVhZGVyVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRhYi5oZWFkZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0YWIuY2xvc2FibGVcIiBjbGFzcz1cInVpLXRhYnZpZXctY2xvc2UgcGkgcGktdGltZXNcIiAoY2xpY2spPVwiY2xpY2tDbG9zZSgkZXZlbnQsdGFiKVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYlZpZXdOYXYge1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB0YWJzOiBUYWJQYW5lbFtdO1xyXG5cclxuICAgIEBJbnB1dCgpIG9yaWVudGF0aW9uOiBzdHJpbmcgPSAndG9wJztcclxuXHJcbiAgICBAT3V0cHV0KCkgb25UYWJDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvblRhYkNsb3NlQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBnZXREZWZhdWx0SGVhZGVyQ2xhc3ModGFiOlRhYlBhbmVsKSB7XHJcbiAgICAgICAgbGV0IHN0eWxlQ2xhc3MgPSAndWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItJyArIHRoaXMub3JpZW50YXRpb247XHJcbiAgICAgICAgaWYgKHRhYi5oZWFkZXJTdHlsZUNsYXNzKSB7XHJcbiAgICAgICAgICAgIHN0eWxlQ2xhc3MgPSBzdHlsZUNsYXNzICsgXCIgXCIgKyB0YWIuaGVhZGVyU3R5bGVDbGFzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlQ2xhc3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsaWNrVGFiKGV2ZW50LCB0YWI6IFRhYlBhbmVsKSB7XHJcbiAgICAgICAgdGhpcy5vblRhYkNsaWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgdGFiOiB0YWJcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGlja0Nsb3NlKGV2ZW50LCB0YWI6IFRhYlBhbmVsKSB7XHJcbiAgICAgICAgdGhpcy5vblRhYkNsb3NlQ2xpY2suZW1pdCh7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICB0YWI6IHRhYlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXRhYlBhbmVsJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZFwiIGNsYXNzPVwidWktdGFidmlldy1wYW5lbCB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6ICFzZWxlY3RlZH1cIlxyXG4gICAgICAgICAgICByb2xlPVwidGFicGFuZWxcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCIhc2VsZWN0ZWRcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWQgKyAnLWxhYmVsJ1wiICpuZ0lmPVwiIWNsb3NlZFwiPlxyXG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGUgJiYgKGNhY2hlID8gbG9hZGVkIDogc2VsZWN0ZWQpXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFiUGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgaGVhZGVyU3R5bGU6IGFueTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgaGVhZGVyU3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBsZWZ0SWNvbjogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSByaWdodEljb246IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgY2FjaGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHRvb2x0aXA6IGFueTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uOiBzdHJpbmcgPSAndG9wJztcclxuXHJcbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb25TdHlsZTogc3RyaW5nID0gJ2Fic29sdXRlJztcclxuXHJcbiAgICBASW5wdXQoKSB0b29sdGlwU3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG4gICAgXHJcbiAgICBjbG9zZWQ6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xyXG4gICAgXHJcbiAgICBfc2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIGxvYWRlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgaWQ6IHN0cmluZyA9IGB1aS10YWJwYW5lbC0ke2lkeCsrfWA7XHJcbiAgICBcclxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIFxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQElucHV0KCkgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0ZWQodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtdGFiVmlldycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLXRhYnZpZXcgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktdGFidmlldy0nICsgb3JpZW50YXRpb25cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDx1bCBwLXRhYlZpZXdOYXYgcm9sZT1cInRhYmxpc3RcIiAqbmdJZj1cIm9yaWVudGF0aW9uIT0nYm90dG9tJ1wiIFt0YWJzXT1cInRhYnNcIiBbb3JpZW50YXRpb25dPVwib3JpZW50YXRpb25cIlxyXG4gICAgICAgICAgICAgICAgKG9uVGFiQ2xpY2spPVwib3BlbigkZXZlbnQub3JpZ2luYWxFdmVudCwgJGV2ZW50LnRhYilcIiAob25UYWJDbG9zZUNsaWNrKT1cImNsb3NlKCRldmVudC5vcmlnaW5hbEV2ZW50LCAkZXZlbnQudGFiKVwiPjwvdWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10YWJ2aWV3LXBhbmVsc1wiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHVsIHAtdGFiVmlld05hdiByb2xlPVwidGFibGlzdFwiICpuZ0lmPVwib3JpZW50YXRpb249PSdib3R0b20nXCIgW3RhYnNdPVwidGFic1wiIFtvcmllbnRhdGlvbl09XCJvcmllbnRhdGlvblwiXHJcbiAgICAgICAgICAgICAgICAob25UYWJDbGljayk9XCJvcGVuKCRldmVudC5vcmlnaW5hbEV2ZW50LCAkZXZlbnQudGFiKVwiIChvblRhYkNsb3NlQ2xpY2spPVwiY2xvc2UoJGV2ZW50Lm9yaWdpbmFsRXZlbnQsICRldmVudC50YWIpXCI+PC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJWaWV3IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCxCbG9ja2FibGVVSSB7XHJcblxyXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246IHN0cmluZyA9ICd0b3AnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGNvbnRyb2xDbG9zZTogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihUYWJQYW5lbCkgdGFiUGFuZWxzOiBRdWVyeUxpc3Q8VGFiUGFuZWw+O1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICB0YWJzOiBUYWJQYW5lbFtdO1xyXG4gICAgXHJcbiAgICBfYWN0aXZlSW5kZXg6IG51bWJlcjtcclxuICAgIFxyXG4gICAgcHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb246IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxyXG4gICAgICBcclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmluaXRUYWJzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy50YWJQYW5lbHMuY2hhbmdlcy5zdWJzY3JpYmUoXyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdFRhYnMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YWJzID0gdGhpcy50YWJQYW5lbHMudG9BcnJheSgpO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZFRhYjogVGFiUGFuZWwgPSB0aGlzLmZpbmRTZWxlY3RlZFRhYigpO1xyXG4gICAgICAgIGlmICghc2VsZWN0ZWRUYWIgJiYgdGhpcy50YWJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLmFjdGl2ZUluZGV4KVxyXG4gICAgICAgICAgICAgICAgdGhpcy50YWJzW3RoaXMuYWN0aXZlSW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy50YWJzWzBdLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9wZW4oZXZlbnQ6IEV2ZW50LCB0YWI6IFRhYlBhbmVsKSB7XHJcbiAgICAgICAgaWYgKHRhYi5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXRhYi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRUYWI6IFRhYlBhbmVsID0gdGhpcy5maW5kU2VsZWN0ZWRUYWIoKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGFiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRhYi5zZWxlY3RlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRhYkluZGV4ID0gdGhpcy5maW5kVGFiSW5kZXgodGFiKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChzZWxlY3RlZFRhYkluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IHNlbGVjdGVkVGFiSW5kZXh9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbG9zZShldmVudDogRXZlbnQsIHRhYjogVGFiUGFuZWwpIHtcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sQ2xvc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5maW5kVGFiSW5kZXgodGFiKSxcclxuICAgICAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VUYWIodGFiKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5maW5kVGFiSW5kZXgodGFiKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsb3NlVGFiKHRhYjogVGFiUGFuZWwpIHtcclxuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhYi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0YWIuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhYlBhbmVsID0gdGhpcy50YWJzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YWJQYW5lbC5jbG9zZWQmJiF0YWIuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJQYW5lbC5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGFiLmNsb3NlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZpbmRTZWxlY3RlZFRhYigpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYnNbaV0uc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYnNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZpbmRUYWJJbmRleCh0YWI6IFRhYlBhbmVsKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YWJzW2ldID09IHRhYikge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBhY3RpdmVJbmRleCh2YWw6bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSB2YWw7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50YWJzICYmIHRoaXMudGFicy5sZW5ndGggJiYgdGhpcy5fYWN0aXZlSW5kZXggIT0gbnVsbCAmJiB0aGlzLnRhYnMubGVuZ3RoID4gdGhpcy5fYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0ZWRUYWIoKS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRhYnNbdGhpcy5fYWN0aXZlSW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxTaGFyZWRNb2R1bGUsVG9vbHRpcE1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbVGFiVmlldyxUYWJQYW5lbCxUYWJWaWV3TmF2LFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtUYWJWaWV3LFRhYlBhbmVsLFRhYlZpZXdOYXZdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJWaWV3TW9kdWxlIHsgfVxyXG4iXX0=