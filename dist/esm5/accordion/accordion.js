var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, ContentChildren, QueryList, ChangeDetectorRef, Inject, forwardRef, TemplateRef, ViewRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, PrimeTemplate } from 'primeng/api';
var idx = 0;
var AccordionTab = /** @class */ (function () {
    function AccordionTab(accordion, changeDetector) {
        this.changeDetector = changeDetector;
        this.cache = true;
        this.selectedChange = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = "ui-accordiontab-" + idx++;
        this.accordion = accordion;
    }
    Object.defineProperty(AccordionTab.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            this._selected = val;
            if (!this.loaded) {
                this.changeDetector.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionTab.prototype, "animating", {
        get: function () {
            return this._animating;
        },
        set: function (val) {
            this._animating = val;
            if (!this.changeDetector.destroyed) {
                this.changeDetector.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionTab.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'content':
                    _this.contentTemplate = item.template;
                    break;
                default:
                    _this.contentTemplate = item.template;
                    break;
            }
        });
    };
    AccordionTab.prototype.toggle = function (event) {
        if (this.disabled || this.animating) {
            return false;
        }
        this.animating = true;
        var index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                    this.accordion.tabs[i].selectedChange.emit(false);
                }
            }
            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        this.accordion.updateActiveIndex();
        event.preventDefault();
    };
    AccordionTab.prototype.findTabIndex = function () {
        var index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    };
    Object.defineProperty(AccordionTab.prototype, "hasHeaderFacet", {
        get: function () {
            return this.headerFacet && this.headerFacet.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    AccordionTab.prototype.onToggleDone = function (event) {
        this.animating = false;
    };
    AccordionTab.prototype.onKeydown = function (event) {
        if (event.which === 32 || event.which === 13) {
            this.toggle(event);
            event.preventDefault();
        }
    };
    AccordionTab.prototype.ngOnDestroy = function () {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    };
    AccordionTab.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return Accordion; }),] }] },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], AccordionTab.prototype, "header", void 0);
    __decorate([
        Input()
    ], AccordionTab.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], AccordionTab.prototype, "cache", void 0);
    __decorate([
        Output()
    ], AccordionTab.prototype, "selectedChange", void 0);
    __decorate([
        Input()
    ], AccordionTab.prototype, "transitionOptions", void 0);
    __decorate([
        ContentChildren(Header)
    ], AccordionTab.prototype, "headerFacet", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], AccordionTab.prototype, "templates", void 0);
    __decorate([
        Input()
    ], AccordionTab.prototype, "selected", null);
    AccordionTab = __decorate([
        Component({
            selector: 'p-accordionTab',
            template: "\n        <div class=\"ui-accordion-header ui-state-default ui-corner-all\" [ngClass]=\"{'ui-state-active': selected,'ui-state-disabled':disabled}\">\n            <a [attr.tabindex]=\"disabled ? -1 : 0\" [attr.id]=\"id\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"selected\" (click)=\"toggle($event)\" \n                (keydown)=\"onKeydown($event)\">\n                <span class=\"ui-accordion-toggle-icon\" [ngClass]=\"selected ? accordion.collapseIcon : accordion.expandIcon\"></span>\n                <span class=\"ui-accordion-header-text\" *ngIf=\"!hasHeaderFacet\">\n                    {{header}}\n                </span>\n                <ng-content select=\"p-header\" *ngIf=\"hasHeaderFacet\"></ng-content>\n            </a>\n        </div>\n        <div [attr.id]=\"id + '-content'\" class=\"ui-accordion-content-wrapper\" [@tabContent]=\"selected ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}\" (@tabContent.done)=\"onToggleDone($event)\"\n            [ngClass]=\"{'ui-accordion-content-wrapper-overflown': !selected||animating}\" \n            role=\"region\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id\">\n            <div class=\"ui-accordion-content ui-widget-content\">\n                <ng-content></ng-content>\n                <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    ",
            animations: [
                trigger('tabContent', [
                    state('hidden', style({
                        height: '0'
                    })),
                    state('void', style({
                        height: '{{height}}'
                    }), { params: { height: '0' } }),
                    state('visible', style({
                        height: '*'
                    })),
                    transition('visible <=> hidden', animate('{{transitionParams}}')),
                    transition('void => hidden', animate('{{transitionParams}}')),
                    transition('void => visible', animate('{{transitionParams}}'))
                ])
            ],
            changeDetection: ChangeDetectionStrategy.Default
        }),
        __param(0, Inject(forwardRef(function () { return Accordion; })))
    ], AccordionTab);
    return AccordionTab;
}());
export { AccordionTab };
var Accordion = /** @class */ (function () {
    function Accordion(el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
        this.onClose = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.expandIcon = 'pi pi-fw pi-chevron-right';
        this.collapseIcon = 'pi pi-fw pi-chevron-down';
        this.activeIndexChange = new EventEmitter();
        this.tabs = [];
    }
    Accordion.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initTabs();
        this.tabListSubscription = this.tabList.changes.subscribe(function (_) {
            _this.initTabs();
            _this.changeDetector.markForCheck();
        });
    };
    Accordion.prototype.initTabs = function () {
        this.tabs = this.tabList.toArray();
        this.updateSelectionState();
    };
    Accordion.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Object.defineProperty(Accordion.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        set: function (val) {
            this._activeIndex = val;
            if (this.preventActiveIndexPropagation) {
                this.preventActiveIndexPropagation = false;
                return;
            }
            this.updateSelectionState();
        },
        enumerable: true,
        configurable: true
    });
    Accordion.prototype.updateSelectionState = function () {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (var i = 0; i < this.tabs.length; i++) {
                var selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                var changed = selected !== this.tabs[i].selected;
                if (changed) {
                    this.tabs[i].animating = true;
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                }
            }
        }
    };
    Accordion.prototype.updateActiveIndex = function () {
        var _this = this;
        var index = this.multiple ? [] : null;
        this.tabs.forEach(function (tab, i) {
            if (tab.selected) {
                if (_this.multiple) {
                    index.push(i);
                }
                else {
                    index = i;
                    return;
                }
            }
        });
        this.preventActiveIndexPropagation = true;
        this.activeIndexChange.emit(index);
    };
    Accordion.prototype.ngOnDestroy = function () {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    };
    Accordion.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Accordion.prototype, "multiple", void 0);
    __decorate([
        Output()
    ], Accordion.prototype, "onClose", void 0);
    __decorate([
        Output()
    ], Accordion.prototype, "onOpen", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "style", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "expandIcon", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "collapseIcon", void 0);
    __decorate([
        Output()
    ], Accordion.prototype, "activeIndexChange", void 0);
    __decorate([
        ContentChildren(AccordionTab)
    ], Accordion.prototype, "tabList", void 0);
    __decorate([
        Input()
    ], Accordion.prototype, "activeIndex", null);
    Accordion = __decorate([
        Component({
            selector: 'p-accordion',
            template: "\n        <div [ngClass]=\"'ui-accordion ui-widget ui-helper-reset'\" [ngStyle]=\"style\" [class]=\"styleClass\" role=\"tablist\">\n            <ng-content></ng-content>\n        </div>\n    "
        })
    ], Accordion);
    return Accordion;
}());
export { Accordion };
var AccordionModule = /** @class */ (function () {
    function AccordionModule() {
    }
    AccordionModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Accordion, AccordionTab, SharedModule],
            declarations: [Accordion, AccordionTab]
        })
    ], AccordionModule);
    return AccordionModule;
}());
export { AccordionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9hY2NvcmRpb24vIiwic291cmNlcyI6WyJhY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDOUYsZUFBZSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0ksT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSWxFLElBQUksR0FBRyxHQUFXLENBQUMsQ0FBQztBQTRDcEI7SUFtREksc0JBQWlELFNBQVMsRUFBUyxjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUE3QzNGLFVBQUssR0FBWSxJQUFJLENBQUM7UUFFckIsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4RCxzQkFBaUIsR0FBVyxzQ0FBc0MsQ0FBQztRQW1DNUUsT0FBRSxHQUFXLHFCQUFtQixHQUFHLEVBQUksQ0FBQztRQU9wQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQXNCLENBQUM7SUFDNUMsQ0FBQztJQWpDUSxzQkFBSSxrQ0FBUTthQUFaO1lBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFhLEdBQVE7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN2QztRQUNMLENBQUM7OztPQVJBO0lBVUQsc0JBQUksbUNBQVM7YUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDO2FBQ0QsVUFBYyxHQUFZO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBRXRCLElBQUksQ0FBRSxJQUFJLENBQUMsY0FBMEIsQ0FBQyxTQUFTLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdkM7UUFDTCxDQUFDOzs7T0FQQTtJQXFCRCx5Q0FBa0IsR0FBbEI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUN4QixRQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDbkIsS0FBSyxTQUFTO29CQUNWLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDekMsTUFBTTtnQkFFTjtvQkFDSSxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3pDLE1BQU07YUFDVDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBTyxLQUFLO1FBQ1IsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN2RTthQUNJO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO2dCQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyRDthQUNKO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN0RTtRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFbkMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxtQ0FBWSxHQUFaO1FBQ0ksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUNoQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLE1BQU07YUFDVDtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHNCQUFJLHdDQUFjO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMzRCxDQUFDOzs7T0FBQTtJQUVELG1DQUFZLEdBQVosVUFBYSxLQUFZO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQ0FBUyxHQUFULFVBQVUsS0FBb0I7UUFDMUIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDOztnREE3RVksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQztnQkFBb0MsaUJBQWlCOztJQWpEM0Y7UUFBUixLQUFLLEVBQUU7Z0RBQWdCO0lBRWY7UUFBUixLQUFLLEVBQUU7a0RBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFOytDQUF1QjtJQUVyQjtRQUFULE1BQU0sRUFBRTt3REFBd0Q7SUFFeEQ7UUFBUixLQUFLLEVBQUU7MkRBQW9FO0lBRW5EO1FBQXhCLGVBQWUsQ0FBQyxNQUFNLENBQUM7cURBQWdDO0lBRXhCO1FBQS9CLGVBQWUsQ0FBQyxhQUFhLENBQUM7bURBQTJCO0lBTWpEO1FBQVIsS0FBSyxFQUFFO2dEQUVQO0lBdEJRLFlBQVk7UUExQ3hCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLDBvREFxQlQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLFlBQVksRUFBRTtvQkFDbEIsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7d0JBQ2xCLE1BQU0sRUFBRSxHQUFHO3FCQUNkLENBQUMsQ0FBQztvQkFDSCxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzt3QkFDaEIsTUFBTSxFQUFFLFlBQVk7cUJBQ3ZCLENBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFBQyxDQUFDO29CQUM1QixLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQzt3QkFDbkIsTUFBTSxFQUFFLEdBQUc7cUJBQ2QsQ0FBQyxDQUFDO29CQUNILFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDakUsVUFBVSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUM3RCxVQUFVLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7aUJBQ2pFLENBQUM7YUFDTDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7UUFvRGUsV0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDLENBQUMsQ0FBQTtPQW5EdkMsWUFBWSxDQWlJeEI7SUFBRCxtQkFBQztDQUFBLEFBaklELElBaUlDO1NBaklZLFlBQVk7QUEySXpCO0lBNEJJLG1CQUFtQixFQUFjLEVBQVMsY0FBaUM7UUFBeEQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQXhCakUsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU1oRCxlQUFVLEdBQVcsMkJBQTJCLENBQUM7UUFFakQsaUJBQVksR0FBVywwQkFBMEIsQ0FBQztRQUVqRCxzQkFBaUIsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVU3RCxTQUFJLEdBQW1CLEVBQUUsQ0FBQztJQUU2QyxDQUFDO0lBRS9FLHNDQUFrQixHQUFsQjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQ3ZELEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELHVDQUFtQixHQUFuQjtRQUNJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFUSxzQkFBSSxrQ0FBVzthQUFmO1lBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7YUFFRCxVQUFnQixHQUFRO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLDZCQUE2QixFQUFFO2dCQUNwQyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsS0FBSyxDQUFDO2dCQUMzQyxPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNoQyxDQUFDOzs7T0FWQTtJQVlELHdDQUFvQixHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtZQUM1RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pGLElBQUksT0FBTyxHQUFHLFFBQVEsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFFakQsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDOUM7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELHFDQUFpQixHQUFqQjtRQUFBLGlCQWdCQztRQWZHLElBQUksS0FBSyxHQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUNkLElBQUksS0FBSSxDQUFDLFFBQVEsRUFBRTtvQkFDZixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQjtxQkFDSTtvQkFDRCxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNWLE9BQU87aUJBQ1Y7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQztRQUMxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCwrQkFBVyxHQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFDO0lBQ0wsQ0FBQzs7Z0JBdkVzQixVQUFVO2dCQUF5QixpQkFBaUI7O0lBMUJsRTtRQUFSLEtBQUssRUFBRTsrQ0FBbUI7SUFFakI7UUFBVCxNQUFNLEVBQUU7OENBQWlEO0lBRWhEO1FBQVQsTUFBTSxFQUFFOzZDQUFnRDtJQUVoRDtRQUFSLEtBQUssRUFBRTs0Q0FBWTtJQUVYO1FBQVIsS0FBSyxFQUFFO2lEQUFvQjtJQUVuQjtRQUFSLEtBQUssRUFBRTtpREFBa0Q7SUFFakQ7UUFBUixLQUFLLEVBQUU7bURBQW1EO0lBRWpEO1FBQVQsTUFBTSxFQUFFO3dEQUEyRDtJQUVyQztRQUE5QixlQUFlLENBQUMsWUFBWSxDQUFDOzhDQUFrQztJQThCdkQ7UUFBUixLQUFLLEVBQUU7Z0RBRVA7SUFsRFEsU0FBUztRQVJyQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsaU1BSVQ7U0FDSixDQUFDO09BQ1csU0FBUyxDQW9HckI7SUFBRCxnQkFBQztDQUFBLEFBcEdELElBb0dDO1NBcEdZLFNBQVM7QUEyR3RCO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixlQUFlO1FBTDNCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztZQUM5QyxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUMsWUFBWSxDQUFDO1NBQ3pDLENBQUM7T0FDVyxlQUFlLENBQUk7SUFBRCxzQkFBQztDQUFBLEFBQWhDLElBQWdDO1NBQW5CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgXHJcbiAgICBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdCwgZm9yd2FyZFJlZiwgVGVtcGxhdGVSZWYsIFZpZXdSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSwgSGVhZGVyLCBQcmltZVRlbXBsYXRlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBCbG9ja2FibGVVSSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5sZXQgaWR4OiBudW1iZXIgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtYWNjb3JkaW9uVGFiJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWFjY29yZGlvbi1oZWFkZXIgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOiBzZWxlY3RlZCwndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgICA8YSBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/IC0xIDogMFwiIFthdHRyLmlkXT1cImlkXCIgW2F0dHIuYXJpYS1jb250cm9sc109XCJpZCArICctY29udGVudCdcIiByb2xlPVwidGFiXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJzZWxlY3RlZFwiIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiIFxyXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYWNjb3JkaW9uLXRvZ2dsZS1pY29uXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWQgPyBhY2NvcmRpb24uY29sbGFwc2VJY29uIDogYWNjb3JkaW9uLmV4cGFuZEljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWFjY29yZGlvbi1oZWFkZXItdGV4dFwiICpuZ0lmPVwiIWhhc0hlYWRlckZhY2V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3toZWFkZXJ9fVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIiAqbmdJZj1cImhhc0hlYWRlckZhY2V0XCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZCArICctY29udGVudCdcIiBjbGFzcz1cInVpLWFjY29yZGlvbi1jb250ZW50LXdyYXBwZXJcIiBbQHRhYkNvbnRlbnRdPVwic2VsZWN0ZWQgPyB7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogYW5pbWF0aW5nID8gdHJhbnNpdGlvbk9wdGlvbnMgOiAnMG1zJywgaGVpZ2h0OiAnKid9fSA6IHt2YWx1ZTogJ2hpZGRlbicsIHBhcmFtczoge3RyYW5zaXRpb25QYXJhbXM6IHRyYW5zaXRpb25PcHRpb25zLCBoZWlnaHQ6ICcwJ319XCIgKEB0YWJDb250ZW50LmRvbmUpPVwib25Ub2dnbGVEb25lKCRldmVudClcIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWFjY29yZGlvbi1jb250ZW50LXdyYXBwZXItb3ZlcmZsb3duJzogIXNlbGVjdGVkfHxhbmltYXRpbmd9XCIgXHJcbiAgICAgICAgICAgIHJvbGU9XCJyZWdpb25cIiBbYXR0ci5hcmlhLWhpZGRlbl09XCIhc2VsZWN0ZWRcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWFjY29yZGlvbi1jb250ZW50IHVpLXdpZGdldC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlICYmIChjYWNoZSA/IGxvYWRlZCA6IHNlbGVjdGVkKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcigndGFiQ29udGVudCcsIFtcclxuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzAnXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICd7e2hlaWdodH19J1xyXG4gICAgICAgICAgICB9KSwge3BhcmFtczoge2hlaWdodDogJzAnfX0pLFxyXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJyonXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA8PT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpXHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIEFjY29yZGlvblRhYiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgY2FjaGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICc0MDBtcyBjdWJpYy1iZXppZXIoMC44NiwgMCwgMC4wNywgMSknO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oSGVhZGVyKSBoZWFkZXJGYWNldDogUXVlcnlMaXN0PEhlYWRlcj47XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG5cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2FuaW1hdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0ZWQoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlbGVjdGVkKHZhbDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFuaW1hdGluZygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW5nO1xyXG4gICAgfVxyXG4gICAgc2V0IGFuaW1hdGluZyh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9hbmltYXRpbmcgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmICghKHRoaXMuY2hhbmdlRGV0ZWN0b3IgYXMgVmlld1JlZikuZGVzdHJveWVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgaWQ6IHN0cmluZyA9IGB1aS1hY2NvcmRpb250YWItJHtpZHgrK31gO1xyXG5cclxuICAgIGxvYWRlZDogYm9vbGVhbjtcclxuXHJcbiAgICBhY2NvcmRpb246IEFjY29yZGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQWNjb3JkaW9uKSkgYWNjb3JkaW9uLCBwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgdGhpcy5hY2NvcmRpb24gPSBhY2NvcmRpb24gYXMgQWNjb3JkaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmFuaW1hdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maW5kVGFiSW5kZXgoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFjY29yZGlvbi5vbkNsb3NlLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IGluZGV4IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmFjY29yZGlvbi5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjY29yZGlvbi50YWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24udGFic1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uLnRhYnNbaV0uc2VsZWN0ZWRDaGFuZ2UuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uLm9uT3Blbi5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiBpbmRleCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkKTtcclxuICAgICAgICB0aGlzLmFjY29yZGlvbi51cGRhdGVBY3RpdmVJbmRleCgpO1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRUYWJJbmRleCgpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWNjb3JkaW9uLnRhYnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWNjb3JkaW9uLnRhYnNbaV0gPT0gdGhpcykge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBoYXNIZWFkZXJGYWNldCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXJGYWNldCAmJiB0aGlzLmhlYWRlckZhY2V0Lmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub2dnbGVEb25lKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAzMiB8fCBldmVudC53aGljaCA9PT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGUoZXZlbnQpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmFjY29yZGlvbi50YWJzLnNwbGljZSh0aGlzLmZpbmRUYWJJbmRleCgpLCAxKTtcclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtYWNjb3JkaW9uJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktYWNjb3JkaW9uIHVpLXdpZGdldCB1aS1oZWxwZXItcmVzZXQnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIHJvbGU9XCJ0YWJsaXN0XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIEFjY29yZGlvbiBpbXBsZW1lbnRzIEJsb2NrYWJsZVVJLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbk9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBleHBhbmRJY29uOiBzdHJpbmcgPSAncGkgcGktZncgcGktY2hldnJvbi1yaWdodCc7XHJcblxyXG4gICAgQElucHV0KCkgY29sbGFwc2VJY29uOiBzdHJpbmcgPSAncGkgcGktZncgcGktY2hldnJvbi1kb3duJztcclxuXHJcbiAgICBAT3V0cHV0KCkgYWN0aXZlSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAQ29udGVudENoaWxkcmVuKEFjY29yZGlvblRhYikgdGFiTGlzdDogUXVlcnlMaXN0PEFjY29yZGlvblRhYj47XHJcblxyXG4gICAgdGFiTGlzdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9hY3RpdmVJbmRleDogYW55O1xyXG5cclxuICAgIHByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgdGFiczogQWNjb3JkaW9uVGFiW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy50YWJMaXN0U3Vic2NyaXB0aW9uID0gdGhpcy50YWJMaXN0LmNoYW5nZXMuc3Vic2NyaWJlKF8gPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRUYWJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFRhYnMoKTogYW55IHtcclxuICAgICAgICB0aGlzLnRhYnMgPSB0aGlzLnRhYkxpc3QudG9BcnJheSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uU3RhdGUoKTtcclxuICAgIH1cclxuICAgICAgXHJcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGdldCBhY3RpdmVJbmRleCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYWN0aXZlSW5kZXgodmFsOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxlY3Rpb25TdGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy50YWJzICYmIHRoaXMudGFicy5sZW5ndGggJiYgdGhpcy5fYWN0aXZlSW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5tdWx0aXBsZSA/IHRoaXMuX2FjdGl2ZUluZGV4LmluY2x1ZGVzKGkpIDogKGkgPT09IHRoaXMuX2FjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VkID0gc2VsZWN0ZWQgIT09IHRoaXMudGFic1tpXS5zZWxlY3RlZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFic1tpXS5hbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFic1tpXS5zZWxlY3RlZCA9IHNlbGVjdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFic1tpXS5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBY3RpdmVJbmRleCgpIHtcclxuICAgICAgICBsZXQgaW5kZXg6IGFueSA9IHRoaXMubXVsdGlwbGUgPyBbXSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYiwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGFiLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFiTGlzdFN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnRhYkxpc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtBY2NvcmRpb24sQWNjb3JkaW9uVGFiLFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtBY2NvcmRpb24sQWNjb3JkaW9uVGFiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uTW9kdWxlIHsgfVxyXG4iXX0=