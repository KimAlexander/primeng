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
let idx = 0;
let TabViewNav = class TabViewNav {
    constructor() {
        this.orientation = 'top';
        this.onTabClick = new EventEmitter();
        this.onTabCloseClick = new EventEmitter();
    }
    getDefaultHeaderClass(tab) {
        let styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    }
    clickTab(event, tab) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        });
    }
    clickClose(event, tab) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        });
    }
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
        template: `
        <ng-template ngFor let-tab [ngForOf]="tabs">
            <li [class]="getDefaultHeaderClass(tab)" [ngStyle]="tab.headerStyle" role="presentation"
                [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}"
                (click)="clickTab($event,tab)" *ngIf="!tab.closed" tabindex="0" (keydown.enter)="clickTab($event,tab)">
                <a [attr.id]="tab.id + '-label'" role="tab" [attr.aria-selected]="tab.selected" [attr.aria-controls]="tab.id" [pTooltip]="tab.tooltip" [tooltipPosition]="tab.tooltipPosition"
                    [attr.aria-selected]="tab.selected" [positionStyle]="tab.tooltipPositionStyle" [tooltipStyleClass]="tab.tooltipStyleClass">
                    <ng-container *ngIf="!tab.headerTemplate" >
                        <span class="ui-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                        <span class="ui-tabview-title">{{tab.header}}</span>
                        <span class="ui-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                    </ng-container>
                    <ng-container *ngIf="tab.headerTemplate">
                        <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                    </ng-container>
                </a>
                <span *ngIf="tab.closable" class="ui-tabview-close pi pi-times" (click)="clickClose($event,tab)"></span>
            </li>
        </ng-template>
    `
    })
], TabViewNav);
export { TabViewNav };
let TabPanel = class TabPanel {
    constructor(viewContainer, cd) {
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.cache = true;
        this.tooltipPosition = 'top';
        this.tooltipPositionStyle = 'absolute';
        this.id = `ui-tabpanel-${idx++}`;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    get selected() {
        return this._selected;
    }
    set selected(val) {
        this._selected = val;
        if (!this.loaded) {
            this.cd.detectChanges();
        }
        this.loaded = true;
    }
    ngOnDestroy() {
        this.view = null;
    }
};
TabPanel.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ChangeDetectorRef }
];
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
        template: `
        <div [attr.id]="id" class="ui-tabview-panel ui-widget-content" [ngClass]="{'ui-helper-hidden': !selected}"
            role="tabpanel" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id + '-label'" *ngIf="!closed">
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], TabPanel);
export { TabPanel };
let TabView = class TabView {
    constructor(el) {
        this.el = el;
        this.orientation = 'top';
        this.onChange = new EventEmitter();
        this.onClose = new EventEmitter();
        this.activeIndexChange = new EventEmitter();
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabPanels.changes.subscribe(_ => {
            this.initTabs();
        });
    }
    initTabs() {
        this.tabs = this.tabPanels.toArray();
        let selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
        }
    }
    open(event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            let selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
        }
        if (event) {
            event.preventDefault();
        }
    }
    close(event, tab) {
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: () => {
                    this.closeTab(tab);
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
    }
    closeTab(tab) {
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            tab.selected = false;
            for (let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
    }
    findSelectedTab() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }
    findTabIndex(tab) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(val) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }
        if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
        }
    }
};
TabView.ctorParameters = () => [
    { type: ElementRef }
];
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
        template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" [ngStyle]="style" [class]="styleClass">
            <ul p-tabViewNav role="tablist" *ngIf="orientation!='bottom'" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"></ul>
            <div class="ui-tabview-panels">
                <ng-content></ng-content>
            </div>
            <ul p-tabViewNav role="tablist" *ngIf="orientation=='bottom'" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"></ul>
        </div>
    `
    })
], TabView);
export { TabView };
let TabViewModule = class TabViewModule {
};
TabViewModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, TooltipModule],
        exports: [TabView, TabPanel, TabViewNav, SharedModule],
        declarations: [TabView, TabPanel, TabViewNav]
    })
], TabViewModule);
export { TabViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdGFidmlldy8iLCJzb3VyY2VzIjpbInRhYnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxnQkFBZ0IsRUFDbEYsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHdkQsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0FBZ0NwQixJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBQXZCO1FBSWEsZ0JBQVcsR0FBVyxLQUFLLENBQUM7UUFFM0IsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF1QnRFLENBQUM7SUFyQkcscUJBQXFCLENBQUMsR0FBWTtRQUM5QixJQUFJLFVBQVUsR0FBRyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xFLElBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQ3RCLFVBQVUsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztTQUN4RDtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQWE7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDakIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsR0FBRyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFhO1FBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3RCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLEdBQUcsRUFBRSxHQUFHO1NBQ1gsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKLENBQUE7QUE3Qlk7SUFBUixLQUFLLEVBQUU7d0NBQWtCO0FBRWpCO0lBQVIsS0FBSyxFQUFFOytDQUE2QjtBQUUzQjtJQUFULE1BQU0sRUFBRTs4Q0FBb0Q7QUFFbkQ7SUFBVCxNQUFNLEVBQUU7bURBQXlEO0FBUnpELFVBQVU7SUE5QnRCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsSUFBSSxFQUFDO1lBQ0Qsd0JBQXdCLEVBQUUsTUFBTTtZQUNoQyx5QkFBeUIsRUFBRSxNQUFNO1lBQ2pDLDRCQUE0QixFQUFFLE1BQU07WUFDcEMsMEJBQTBCLEVBQUUsTUFBTTtZQUNsQyx1QkFBdUIsRUFBRSxNQUFNO1NBQ2xDO1FBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJUO0tBQ0osQ0FBQztHQUNXLFVBQVUsQ0ErQnRCO1NBL0JZLFVBQVU7QUE4Q3ZCLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUE0QmpCLFlBQW1CLGFBQStCLEVBQVUsRUFBcUI7UUFBOUQsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFaeEUsVUFBSyxHQUFZLElBQUksQ0FBQztRQUl0QixvQkFBZSxHQUFXLEtBQUssQ0FBQztRQUVoQyx5QkFBb0IsR0FBVyxVQUFVLENBQUM7UUFnQm5ELE9BQUUsR0FBVyxlQUFlLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFWZ0QsQ0FBQztJQWdCckYsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QixRQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDbkIsS0FBSyxRQUFRO29CQUNULElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDeEMsTUFBTTtnQkFFTixLQUFLLFNBQVM7b0JBQ1YsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUN6QyxNQUFNO2dCQUVOO29CQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDekMsTUFBTTthQUNUO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVEsSUFBSSxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsR0FBWTtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSixDQUFBOztZQW5EcUMsZ0JBQWdCO1lBQWMsaUJBQWlCOztBQTFCeEU7SUFBUixLQUFLLEVBQUU7d0NBQWdCO0FBRWY7SUFBUixLQUFLLEVBQUU7MENBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFOzBDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTs2Q0FBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7a0RBQTBCO0FBRXpCO0lBQVIsS0FBSyxFQUFFOzBDQUFrQjtBQUVqQjtJQUFSLEtBQUssRUFBRTsyQ0FBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7dUNBQXVCO0FBRXRCO0lBQVIsS0FBSyxFQUFFO3lDQUFjO0FBRWI7SUFBUixLQUFLLEVBQUU7aURBQWlDO0FBRWhDO0lBQVIsS0FBSyxFQUFFO3NEQUEyQztBQUUxQztJQUFSLEtBQUssRUFBRTttREFBMkI7QUFFSDtJQUEvQixlQUFlLENBQUMsYUFBYSxDQUFDOzJDQUEyQjtBQW9DakQ7SUFBUixLQUFLLEVBQUU7d0NBRVA7QUFoRVEsUUFBUTtJQWJwQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUU7Ozs7Ozs7O0tBUVQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNuRCxDQUFDO0dBQ1csUUFBUSxDQStFcEI7U0EvRVksUUFBUTtBQStGckIsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBTztJQTBCaEIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUF4QnhCLGdCQUFXLEdBQVcsS0FBSyxDQUFDO1FBVTNCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsc0JBQWlCLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFVbkMsQ0FBQztJQUVyQyxrQkFBa0I7UUFDZCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksV0FBVyxHQUFhLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2xDLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVc7Z0JBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7O2dCQUU1QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQVksRUFBRSxHQUFhO1FBQzVCLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNkLElBQUksS0FBSyxFQUFFO2dCQUNQLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMxQjtZQUNELE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxXQUFXLEdBQWEsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ25ELElBQUksV0FBVyxFQUFFO2dCQUNiLFdBQVcsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO2FBQy9CO1lBRUQsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7WUFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQVksRUFBRSxHQUFhO1FBQzdCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDZCxhQUFhLEVBQUUsS0FBSztnQkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO2dCQUM3QixLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUM7YUFBQyxDQUNMLENBQUM7U0FDTDthQUNJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDZCxhQUFhLEVBQUUsS0FBSztnQkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO2FBQ2hDLENBQUMsQ0FBQztTQUNOO1FBRUQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBYTtRQUNsQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDZCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDZCxHQUFHLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtvQkFDakMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3pCLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO1FBRUQsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELGVBQWU7UUFDWCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsWUFBWSxDQUFDLEdBQWE7UUFDdEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDZixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDckIsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDVixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtQkFBbUI7UUFDZixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRVEsSUFBSSxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxXQUFXLENBQUMsR0FBVTtRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyw2QkFBNkIsRUFBRTtZQUNwQyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsS0FBSyxDQUFDO1lBQzNDLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDaEQ7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUE5SDBCLFVBQVU7O0FBeEJ4QjtJQUFSLEtBQUssRUFBRTs0Q0FBNkI7QUFFNUI7SUFBUixLQUFLLEVBQUU7c0NBQVk7QUFFWDtJQUFSLEtBQUssRUFBRTsyQ0FBb0I7QUFFbkI7SUFBUixLQUFLLEVBQUU7NkNBQXVCO0FBRUo7SUFBMUIsZUFBZSxDQUFDLFFBQVEsQ0FBQzswQ0FBZ0M7QUFFaEQ7SUFBVCxNQUFNLEVBQUU7eUNBQWtEO0FBRWpEO0lBQVQsTUFBTSxFQUFFO3dDQUFpRDtBQUVoRDtJQUFULE1BQU0sRUFBRTtrREFBOEQ7QUF3SDlEO0lBQVIsS0FBSyxFQUFFOzBDQUVQO0FBMUlRLE9BQU87SUFkbkIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0tBVVQ7S0FDSixDQUFDO0dBQ1csT0FBTyxDQXdKbkI7U0F4SlksT0FBTztBQWdLcEIsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUFJLENBQUE7QUFBakIsYUFBYTtJQUx6QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQztRQUNsRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxZQUFZLENBQUM7UUFDbkQsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxVQUFVLENBQUM7S0FDOUMsQ0FBQztHQUNXLGFBQWEsQ0FBSTtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgICAgIENvbnRlbnRDaGlsZHJlbixRdWVyeUxpc3QsVGVtcGxhdGVSZWYsRW1iZWRkZWRWaWV3UmVmLFZpZXdDb250YWluZXJSZWYsQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtUb29sdGlwTW9kdWxlfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xyXG5pbXBvcnQge1NoYXJlZE1vZHVsZSxQcmltZVRlbXBsYXRlfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuXHJcbmxldCBpZHg6IG51bWJlciA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnW3AtdGFiVmlld05hdl0nLFxyXG4gICAgaG9zdDp7XHJcbiAgICAgICAgJ1tjbGFzcy51aS10YWJ2aWV3LW5hdl0nOiAndHJ1ZScsXHJcbiAgICAgICAgJ1tjbGFzcy51aS1oZWxwZXItcmVzZXRdJzogJ3RydWUnLFxyXG4gICAgICAgICdbY2xhc3MudWktaGVscGVyLWNsZWFyZml4XSc6ICd0cnVlJyxcclxuICAgICAgICAnW2NsYXNzLnVpLXdpZGdldC1oZWFkZXJdJzogJ3RydWUnLFxyXG4gICAgICAgICdbY2xhc3MudWktY29ybmVyLWFsbF0nOiAndHJ1ZSdcclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtdGFiIFtuZ0Zvck9mXT1cInRhYnNcIj5cclxuICAgICAgICAgICAgPGxpIFtjbGFzc109XCJnZXREZWZhdWx0SGVhZGVyQ2xhc3ModGFiKVwiIFtuZ1N0eWxlXT1cInRhYi5oZWFkZXJTdHlsZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS10YWJ2aWV3LXNlbGVjdGVkIHVpLXN0YXRlLWFjdGl2ZSc6IHRhYi5zZWxlY3RlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzogdGFiLmRpc2FibGVkfVwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xpY2tUYWIoJGV2ZW50LHRhYilcIiAqbmdJZj1cIiF0YWIuY2xvc2VkXCIgdGFiaW5kZXg9XCIwXCIgKGtleWRvd24uZW50ZXIpPVwiY2xpY2tUYWIoJGV2ZW50LHRhYilcIj5cclxuICAgICAgICAgICAgICAgIDxhIFthdHRyLmlkXT1cInRhYi5pZCArICctbGFiZWwnXCIgcm9sZT1cInRhYlwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwidGFiLnNlbGVjdGVkXCIgW2F0dHIuYXJpYS1jb250cm9sc109XCJ0YWIuaWRcIiBbcFRvb2x0aXBdPVwidGFiLnRvb2x0aXBcIiBbdG9vbHRpcFBvc2l0aW9uXT1cInRhYi50b29sdGlwUG9zaXRpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwidGFiLnNlbGVjdGVkXCIgW3Bvc2l0aW9uU3R5bGVdPVwidGFiLnRvb2x0aXBQb3NpdGlvblN0eWxlXCIgW3Rvb2x0aXBTdHlsZUNsYXNzXT1cInRhYi50b29sdGlwU3R5bGVDbGFzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGFiLmhlYWRlclRlbXBsYXRlXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRhYnZpZXctbGVmdC1pY29uXCIgW25nQ2xhc3NdPVwidGFiLmxlZnRJY29uXCIgKm5nSWY9XCJ0YWIubGVmdEljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdGFidmlldy10aXRsZVwiPnt7dGFiLmhlYWRlcn19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRhYnZpZXctcmlnaHQtaWNvblwiIFtuZ0NsYXNzXT1cInRhYi5yaWdodEljb25cIiAqbmdJZj1cInRhYi5yaWdodEljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRhYi5oZWFkZXJUZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRhYi5jbG9zYWJsZVwiIGNsYXNzPVwidWktdGFidmlldy1jbG9zZSBwaSBwaS10aW1lc1wiIChjbGljayk9XCJjbGlja0Nsb3NlKCRldmVudCx0YWIpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICBgLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFiVmlld05hdiB7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHRhYnM6IFRhYlBhbmVsW107XHJcblxyXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246IHN0cmluZyA9ICd0b3AnO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblRhYkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uVGFiQ2xvc2VDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIGdldERlZmF1bHRIZWFkZXJDbGFzcyh0YWI6VGFiUGFuZWwpIHtcclxuICAgICAgICBsZXQgc3R5bGVDbGFzcyA9ICd1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci0nICsgdGhpcy5vcmllbnRhdGlvbjtcclxuICAgICAgICBpZiAodGFiLmhlYWRlclN0eWxlQ2xhc3MpIHtcclxuICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyBcIiBcIiArIHRhYi5oZWFkZXJTdHlsZUNsYXNzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3R5bGVDbGFzcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xpY2tUYWIoZXZlbnQsIHRhYjogVGFiUGFuZWwpIHtcclxuICAgICAgICB0aGlzLm9uVGFiQ2xpY2suZW1pdCh7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICB0YWI6IHRhYlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsaWNrQ2xvc2UoZXZlbnQsIHRhYjogVGFiUGFuZWwpIHtcclxuICAgICAgICB0aGlzLm9uVGFiQ2xvc2VDbGljay5lbWl0KHtcclxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgIHRhYjogdGFiXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtdGFiUGFuZWwnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFthdHRyLmlkXT1cImlkXCIgY2xhc3M9XCJ1aS10YWJ2aWV3LXBhbmVsIHVpLXdpZGdldC1jb250ZW50XCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzogIXNlbGVjdGVkfVwiXHJcbiAgICAgICAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiIFthdHRyLmFyaWEtaGlkZGVuXT1cIiFzZWxlY3RlZFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJpZCArICctbGFiZWwnXCIgKm5nSWY9XCIhY2xvc2VkXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRlbnRUZW1wbGF0ZSAmJiAoY2FjaGUgPyBsb2FkZWQgOiBzZWxlY3RlZClcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJQYW5lbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZTogYW55O1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGxlZnRJY29uOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHJpZ2h0SWNvbjogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBjYWNoZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgdG9vbHRpcDogYW55O1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xyXG5cclxuICAgIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvblN0eWxlOiBzdHJpbmcgPSAnYWJzb2x1dGUnO1xyXG5cclxuICAgIEBJbnB1dCgpIHRvb2x0aXBTdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcbiAgICBcclxuICAgIGNsb3NlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgdmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT47XHJcbiAgICBcclxuICAgIF9zZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgbG9hZGVkOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBpZDogc3RyaW5nID0gYHVpLXRhYnBhbmVsLSR7aWR4Kyt9YDtcclxuICAgIFxyXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2goaXRlbS5nZXRUeXBlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RlZCh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnZpZXcgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC10YWJWaWV3JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktdGFidmlldyB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS10YWJ2aWV3LScgKyBvcmllbnRhdGlvblwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPHVsIHAtdGFiVmlld05hdiByb2xlPVwidGFibGlzdFwiICpuZ0lmPVwib3JpZW50YXRpb24hPSdib3R0b20nXCIgW3RhYnNdPVwidGFic1wiIFtvcmllbnRhdGlvbl09XCJvcmllbnRhdGlvblwiXHJcbiAgICAgICAgICAgICAgICAob25UYWJDbGljayk9XCJvcGVuKCRldmVudC5vcmlnaW5hbEV2ZW50LCAkZXZlbnQudGFiKVwiIChvblRhYkNsb3NlQ2xpY2spPVwiY2xvc2UoJGV2ZW50Lm9yaWdpbmFsRXZlbnQsICRldmVudC50YWIpXCI+PC91bD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRhYnZpZXctcGFuZWxzXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8dWwgcC10YWJWaWV3TmF2IHJvbGU9XCJ0YWJsaXN0XCIgKm5nSWY9XCJvcmllbnRhdGlvbj09J2JvdHRvbSdcIiBbdGFic109XCJ0YWJzXCIgW29yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCJcclxuICAgICAgICAgICAgICAgIChvblRhYkNsaWNrKT1cIm9wZW4oJGV2ZW50Lm9yaWdpbmFsRXZlbnQsICRldmVudC50YWIpXCIgKG9uVGFiQ2xvc2VDbGljayk9XCJjbG9zZSgkZXZlbnQub3JpZ2luYWxFdmVudCwgJGV2ZW50LnRhYilcIj48L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYlZpZXcgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LEJsb2NrYWJsZVVJIHtcclxuXHJcbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nID0gJ3RvcCc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgY29udHJvbENsb3NlOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFRhYlBhbmVsKSB0YWJQYW5lbHM6IFF1ZXJ5TGlzdDxUYWJQYW5lbD47XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIGFjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIHRhYnM6IFRhYlBhbmVsW107XHJcbiAgICBcclxuICAgIF9hY3RpdmVJbmRleDogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBwcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XHJcbiAgICAgIFxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRhYlBhbmVscy5jaGFuZ2VzLnN1YnNjcmliZShfID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0VGFicygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbml0VGFicygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRhYnMgPSB0aGlzLnRhYlBhbmVscy50b0FycmF5KCk7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVGFiOiBUYWJQYW5lbCA9IHRoaXMuZmluZFNlbGVjdGVkVGFiKCk7XHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZFRhYiAmJiB0aGlzLnRhYnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9IG51bGwgJiYgdGhpcy50YWJzLmxlbmd0aCA+IHRoaXMuYWN0aXZlSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhYnNbdGhpcy5hY3RpdmVJbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhYnNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgb3BlbihldmVudDogRXZlbnQsIHRhYjogVGFiUGFuZWwpIHtcclxuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghdGFiLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRhYjogVGFiUGFuZWwgPSB0aGlzLmZpbmRTZWxlY3RlZFRhYigpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRUYWIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVGFiLnNlbGVjdGVkID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGFiLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkVGFiSW5kZXggPSB0aGlzLmZpbmRUYWJJbmRleCh0YWIpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleENoYW5nZS5lbWl0KHNlbGVjdGVkVGFiSW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogc2VsZWN0ZWRUYWJJbmRleH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsb3NlKGV2ZW50OiBFdmVudCwgdGFiOiBUYWJQYW5lbCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xDbG9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmZpbmRUYWJJbmRleCh0YWIpLFxyXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVGFiKHRhYik7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmZpbmRUYWJJbmRleCh0YWIpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xvc2VUYWIodGFiOiBUYWJQYW5lbCkge1xyXG4gICAgICAgIGlmICh0YWIuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGFiLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFiUGFuZWwgPSB0aGlzLnRhYnNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRhYlBhbmVsLmNsb3NlZCYmIXRhYi5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlBhbmVsLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0YWIuY2xvc2VkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZmluZFNlbGVjdGVkVGFiKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFic1tpXS5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFic1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZmluZFRhYkluZGV4KHRhYjogVGFiUGFuZWwpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYnNbaV0gPT0gdGFiKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnTCoHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASW5wdXQoKSBnZXQgYWN0aXZlSW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGFjdGl2ZUluZGV4KHZhbDpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRhYnMgJiYgdGhpcy50YWJzLmxlbmd0aCAmJiB0aGlzLl9hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLl9hY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RlZFRhYigpLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudGFic1t0aGlzLl9hY3RpdmVJbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFNoYXJlZE1vZHVsZSxUb29sdGlwTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtUYWJWaWV3LFRhYlBhbmVsLFRhYlZpZXdOYXYsU2hhcmVkTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1RhYlZpZXcsVGFiUGFuZWwsVGFiVmlld05hdl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYlZpZXdNb2R1bGUgeyB9XHJcbiJdfQ==