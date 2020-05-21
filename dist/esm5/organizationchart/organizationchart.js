var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, ElementRef, Input, Output, AfterContentInit, EventEmitter, TemplateRef, Inject, forwardRef, ContentChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
var OrganizationChartNode = /** @class */ (function () {
    function OrganizationChartNode(chart) {
        this.chart = chart;
    }
    Object.defineProperty(OrganizationChartNode.prototype, "leaf", {
        get: function () {
            return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrganizationChartNode.prototype, "colspan", {
        get: function () {
            return (this.node.children && this.node.children.length) ? this.node.children.length * 2 : null;
        },
        enumerable: true,
        configurable: true
    });
    OrganizationChartNode.prototype.onNodeClick = function (event, node) {
        this.chart.onNodeClick(event, node);
    };
    OrganizationChartNode.prototype.toggleNode = function (event, node) {
        node.expanded = !node.expanded;
        if (node.expanded)
            this.chart.onNodeExpand.emit({ originalEvent: event, node: this.node });
        else
            this.chart.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        event.preventDefault();
    };
    OrganizationChartNode.prototype.isSelected = function () {
        return this.chart.isSelected(this.node);
    };
    OrganizationChartNode.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return OrganizationChart; }),] }] }
    ]; };
    __decorate([
        Input()
    ], OrganizationChartNode.prototype, "node", void 0);
    __decorate([
        Input()
    ], OrganizationChartNode.prototype, "root", void 0);
    __decorate([
        Input()
    ], OrganizationChartNode.prototype, "first", void 0);
    __decorate([
        Input()
    ], OrganizationChartNode.prototype, "last", void 0);
    OrganizationChartNode = __decorate([
        Component({
            selector: '[pOrganizationChartNode]',
            template: "\n        <tr *ngIf=\"node\">\n            <td [attr.colspan]=\"colspan\">\n                <div class=\"ui-organizationchart-node-content ui-widget-content ui-corner-all {{node.styleClass}}\" \n                    [ngClass]=\"{'ui-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false,'ui-state-highlight':isSelected()}\"\n                    (click)=\"onNodeClick($event,node)\">\n                    <div *ngIf=\"!chart.getTemplateForNode(node)\">{{node.label}}</div>\n                    <div *ngIf=\"chart.getTemplateForNode(node)\">\n                        <ng-container *ngTemplateOutlet=\"chart.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                    </div>\n                    <a *ngIf=\"!leaf\" tabindex=\"0\" class=\"ui-node-toggler\" (click)=\"toggleNode($event, node)\" (keydown.enter)=\"toggleNode($event, node)\">\n                        <i class=\"ui-node-toggler-icon pi\" [ngClass]=\"{'pi-chevron-down': node.expanded, 'pi-chevron-up': !node.expanded}\"></i>\n                    </a>\n                </div>\n            </td>\n        </tr>\n        <tr [ngClass]=\"!leaf&&node.expanded ? 'ui-organizationchart-node-visible' : 'ui-organizationchart-node-hidden'\" class=\"ui-organizationchart-lines\" [@childState]=\"'in'\">\n            <td [attr.colspan]=\"colspan\">\n                <div class=\"ui-organizationchart-line-down\"></div>\n            </td>\n        </tr>\n        <tr [ngClass]=\"!leaf&&node.expanded ? 'ui-organizationchart-node-visible' : 'ui-organizationchart-node-hidden'\" class=\"ui-organizationchart-lines\" [@childState]=\"'in'\">\n            <ng-container *ngIf=\"node.children && node.children.length === 1\">\n                <td [attr.colspan]=\"colspan\">\n                    <div class=\"ui-organizationchart-line-down\"></div>\n                </td>\n            </ng-container>\n            <ng-container *ngIf=\"node.children && node.children.length > 1\">\n                <ng-template ngFor let-child [ngForOf]=\"node.children\" let-first=\"first\" let-last=\"last\">\n                    <td class=\"ui-organizationchart-line-left\" [ngClass]=\"{'ui-organizationchart-line-top':!first}\">&nbsp;</td>\n                    <td class=\"ui-organizationchart-line-right\" [ngClass]=\"{'ui-organizationchart-line-top':!last}\">&nbsp;</td>\n                </ng-template>\n            </ng-container>\n        </tr>\n        <tr [ngClass]=\"!leaf&&node.expanded ? 'ui-organizationchart-node-visible' : 'ui-organizationchart-node-hidden'\" class=\"ui-organizationchart-nodes\" [@childState]=\"'in'\">\n            <td *ngFor=\"let child of node.children\" colspan=\"2\">\n                <table class=\"ui-organizationchart-table\" pOrganizationChartNode [node]=\"child\"></table>\n            </td>\n        </tr>\n    ",
            animations: [
                trigger('childState', [
                    state('in', style({ opacity: 1 })),
                    transition('void => *', [
                        style({ opacity: 0 }),
                        animate(150)
                    ]),
                    transition('* => void', [
                        animate(150, style({ opacity: 0 }))
                    ])
                ])
            ]
        }),
        __param(0, Inject(forwardRef(function () { return OrganizationChart; })))
    ], OrganizationChartNode);
    return OrganizationChartNode;
}());
export { OrganizationChartNode };
var OrganizationChart = /** @class */ (function () {
    function OrganizationChart(el) {
        this.el = el;
        this.preserveSpace = true;
        this.selectionChange = new EventEmitter();
        this.onNodeSelect = new EventEmitter();
        this.onNodeUnselect = new EventEmitter();
        this.onNodeExpand = new EventEmitter();
        this.onNodeCollapse = new EventEmitter();
    }
    Object.defineProperty(OrganizationChart.prototype, "root", {
        get: function () {
            return this.value && this.value.length ? this.value[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    OrganizationChart.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach(function (item) {
            _this.templateMap[item.getType()] = item.template;
        });
    };
    OrganizationChart.prototype.getTemplateForNode = function (node) {
        if (this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    };
    OrganizationChart.prototype.onNodeClick = function (event, node) {
        var eventTarget = event.target;
        if (eventTarget.className && (eventTarget.className.indexOf('ui-node-toggler') !== -1 || eventTarget.className.indexOf('ui-node-toggler-icon') !== -1)) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }
            var index_1 = this.findIndexInSelection(node);
            var selected = (index_1 >= 0);
            if (this.selectionMode === 'single') {
                if (selected) {
                    this.selection = null;
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = node;
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else if (this.selectionMode === 'multiple') {
                if (selected) {
                    this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = __spread(this.selection || [], [node]);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            this.selectionChange.emit(this.selection);
        }
    };
    OrganizationChart.prototype.findIndexInSelection = function (node) {
        var index = -1;
        if (this.selectionMode && this.selection) {
            if (this.selectionMode === 'single') {
                index = (this.selection == node) ? 0 : -1;
            }
            else if (this.selectionMode === 'multiple') {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == node) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    OrganizationChart.prototype.isSelected = function (node) {
        return this.findIndexInSelection(node) != -1;
    };
    OrganizationChart.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], OrganizationChart.prototype, "value", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "style", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "selectionMode", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "selection", void 0);
    __decorate([
        Input()
    ], OrganizationChart.prototype, "preserveSpace", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "selectionChange", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "onNodeSelect", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "onNodeUnselect", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "onNodeExpand", void 0);
    __decorate([
        Output()
    ], OrganizationChart.prototype, "onNodeCollapse", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], OrganizationChart.prototype, "templates", void 0);
    OrganizationChart = __decorate([
        Component({
            selector: 'p-organizationChart',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"{'ui-organizationchart ui-widget': true, 'ui-organizationchart-preservespace': preserveSpace}\">\n            <table class=\"ui-organizationchart-table\" pOrganizationChartNode [node]=\"root\" *ngIf=\"root\"></table>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], OrganizationChart);
    return OrganizationChart;
}());
export { OrganizationChart };
var OrganizationChartModule = /** @class */ (function () {
    function OrganizationChartModule() {
    }
    OrganizationChartModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [OrganizationChart, SharedModule],
            declarations: [OrganizationChart, OrganizationChartNode]
        })
    ], OrganizationChartModule);
    return OrganizationChartModule;
}());
export { OrganizationChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uY2hhcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL29yZ2FuaXphdGlvbmNoYXJ0LyIsInNvdXJjZXMiOlsib3JnYW5pemF0aW9uY2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUNwRixNQUFNLEVBQUMsVUFBVSxFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBeUQxQztJQVlJLCtCQUF5RCxLQUFLO1FBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBMEIsQ0FBQztJQUM1QyxDQUFDO0lBRUQsc0JBQUksdUNBQUk7YUFBUjtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBDQUFPO2FBQVg7WUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxD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QVIsS0FBSyxFQUFFO3dEQUFnQjtJQUVmO1FBQVIsS0FBSyxFQUFFOzREQUErQjtJQUU3QjtRQUFULE1BQU0sRUFBRTs4REFBeUQ7SUFFeEQ7UUFBVCxNQUFNLEVBQUU7MkRBQXNEO0lBRXJEO1FBQVQsTUFBTSxFQUFFOzZEQUF3RDtJQUV2RDtRQUFULE1BQU0sRUFBRTsyREFBc0Q7SUFFckQ7UUFBVCxNQUFNLEVBQUU7NkRBQXdEO0lBRWpDO1FBQS9CLGVBQWUsQ0FBQyxhQUFhLENBQUM7d0RBQTJCO0lBeEJqRCxpQkFBaUI7UUFUN0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsc1RBSVQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO09BQ1csaUJBQWlCLENBaUg3QjtJQUFELHdCQUFDO0NBQUEsQUFqSEQsSUFpSEM7U0FqSFksaUJBQWlCO0FBd0g5QjtJQUFBO0lBQXVDLENBQUM7SUFBM0IsdUJBQXVCO1FBTG5DLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBQyxZQUFZLENBQUM7WUFDekMsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUMscUJBQXFCLENBQUM7U0FDMUQsQ0FBQztPQUNXLHVCQUF1QixDQUFJO0lBQUQsOEJBQUM7Q0FBQSxBQUF4QyxJQUF3QztTQUEzQix1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLElucHV0LE91dHB1dCxBZnRlckNvbnRlbnRJbml0LEV2ZW50RW1pdHRlcixUZW1wbGF0ZVJlZixcclxuICAgICAgICBJbmplY3QsZm9yd2FyZFJlZixDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1NoYXJlZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1RyZWVOb2RlfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7UHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ1twT3JnYW5pemF0aW9uQ2hhcnROb2RlXScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDx0ciAqbmdJZj1cIm5vZGVcIj5cclxuICAgICAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwiY29sc3BhblwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLW9yZ2FuaXphdGlvbmNoYXJ0LW5vZGUtY29udGVudCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHt7bm9kZS5zdHlsZUNsYXNzfX1cIiBcclxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW9yZ2FuaXphdGlvbmNoYXJ0LXNlbGVjdGFibGUtbm9kZSc6IGNoYXJ0LnNlbGVjdGlvbk1vZGUgJiYgbm9kZS5zZWxlY3RhYmxlICE9PSBmYWxzZSwndWktc3RhdGUtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKCl9XCJcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25Ob2RlQ2xpY2soJGV2ZW50LG5vZGUpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFjaGFydC5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSlcIj57e25vZGUubGFiZWx9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJjaGFydC5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNoYXJ0LmdldFRlbXBsYXRlRm9yTm9kZShub2RlKTsgY29udGV4dDogeyRpbXBsaWNpdDogbm9kZX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFsZWFmXCIgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJ1aS1ub2RlLXRvZ2dsZXJcIiAoY2xpY2spPVwidG9nZ2xlTm9kZSgkZXZlbnQsIG5vZGUpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlTm9kZSgkZXZlbnQsIG5vZGUpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwidWktbm9kZS10b2dnbGVyLWljb24gcGlcIiBbbmdDbGFzc109XCJ7J3BpLWNoZXZyb24tZG93bic6IG5vZGUuZXhwYW5kZWQsICdwaS1jaGV2cm9uLXVwJzogIW5vZGUuZXhwYW5kZWR9XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgPHRyIFtuZ0NsYXNzXT1cIiFsZWFmJiZub2RlLmV4cGFuZGVkID8gJ3VpLW9yZ2FuaXphdGlvbmNoYXJ0LW5vZGUtdmlzaWJsZScgOiAndWktb3JnYW5pemF0aW9uY2hhcnQtbm9kZS1oaWRkZW4nXCIgY2xhc3M9XCJ1aS1vcmdhbml6YXRpb25jaGFydC1saW5lc1wiIFtAY2hpbGRTdGF0ZV09XCInaW4nXCI+XHJcbiAgICAgICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImNvbHNwYW5cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1vcmdhbml6YXRpb25jaGFydC1saW5lLWRvd25cIj48L2Rpdj5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIDx0ciBbbmdDbGFzc109XCIhbGVhZiYmbm9kZS5leHBhbmRlZCA/ICd1aS1vcmdhbml6YXRpb25jaGFydC1ub2RlLXZpc2libGUnIDogJ3VpLW9yZ2FuaXphdGlvbmNoYXJ0LW5vZGUtaGlkZGVuJ1wiIGNsYXNzPVwidWktb3JnYW5pemF0aW9uY2hhcnQtbGluZXNcIiBbQGNoaWxkU3RhdGVdPVwiJ2luJ1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMVwiPlxyXG4gICAgICAgICAgICAgICAgPHRkIFthdHRyLmNvbHNwYW5dPVwiY29sc3BhblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1vcmdhbml6YXRpb25jaGFydC1saW5lLWRvd25cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDFcIj5cclxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgW25nRm9yT2ZdPVwibm9kZS5jaGlsZHJlblwiIGxldC1maXJzdD1cImZpcnN0XCIgbGV0LWxhc3Q9XCJsYXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidWktb3JnYW5pemF0aW9uY2hhcnQtbGluZS1sZWZ0XCIgW25nQ2xhc3NdPVwieyd1aS1vcmdhbml6YXRpb25jaGFydC1saW5lLXRvcCc6IWZpcnN0fVwiPiZuYnNwOzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidWktb3JnYW5pemF0aW9uY2hhcnQtbGluZS1yaWdodFwiIFtuZ0NsYXNzXT1cInsndWktb3JnYW5pemF0aW9uY2hhcnQtbGluZS10b3AnOiFsYXN0fVwiPiZuYnNwOzwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIDx0ciBbbmdDbGFzc109XCIhbGVhZiYmbm9kZS5leHBhbmRlZCA/ICd1aS1vcmdhbml6YXRpb25jaGFydC1ub2RlLXZpc2libGUnIDogJ3VpLW9yZ2FuaXphdGlvbmNoYXJ0LW5vZGUtaGlkZGVuJ1wiIGNsYXNzPVwidWktb3JnYW5pemF0aW9uY2hhcnQtbm9kZXNcIiBbQGNoaWxkU3RhdGVdPVwiJ2luJ1wiPlxyXG4gICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW5cIiBjb2xzcGFuPVwiMlwiPlxyXG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidWktb3JnYW5pemF0aW9uY2hhcnQtdGFibGVcIiBwT3JnYW5pemF0aW9uQ2hhcnROb2RlIFtub2RlXT1cImNoaWxkXCI+PC90YWJsZT5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgYCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdjaGlsZFN0YXRlJywgW1xyXG4gICAgICAgICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7b3BhY2l0eTogMX0pKSxcclxuICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXHJcbiAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxyXG4gICAgICAgICAgICAgYW5pbWF0ZSgxNTApXHJcbiAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xyXG4gICAgICAgICAgICAgYW5pbWF0ZSgxNTAsIHN0eWxlKHtvcGFjaXR5OjB9KSlcclxuICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25DaGFydE5vZGUge1xyXG5cclxuICAgIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xyXG4gICAgICAgIFxyXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgZmlyc3Q6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGxhc3Q6IGJvb2xlYW47XHJcblxyXG4gICAgY2hhcnQ6IE9yZ2FuaXphdGlvbkNoYXJ0O1xyXG4gICAgICAgIFxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE9yZ2FuaXphdGlvbkNoYXJ0KSkgY2hhcnQpIHtcclxuICAgICAgICB0aGlzLmNoYXJ0ID0gY2hhcnQgYXMgT3JnYW5pemF0aW9uQ2hhcnQ7XHJcbiAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIGdldCBsZWFmKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUubGVhZiA9PSBmYWxzZSA/IGZhbHNlIDogISh0aGlzLm5vZGUuY2hpbGRyZW4mJnRoaXMubm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgY29sc3BhbigpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubm9kZS5jaGlsZHJlbiAmJiB0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoKSA/IHRoaXMubm9kZS5jaGlsZHJlbi5sZW5ndGggKiAyOiBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbk5vZGVDbGljayhldmVudDogRXZlbnQsIG5vZGU6IFRyZWVOb2RlKSB7XHJcbiAgICAgICAgdGhpcy5jaGFydC5vbk5vZGVDbGljayhldmVudCwgbm9kZSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgdG9nZ2xlTm9kZShldmVudDogRXZlbnQsIG5vZGU6IFRyZWVOb2RlKSB7XHJcbiAgICAgICAgbm9kZS5leHBhbmRlZCA9ICFub2RlLmV4cGFuZGVkO1xyXG4gICAgICAgIGlmIChub2RlLmV4cGFuZGVkKVxyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Lm9uTm9kZUV4cGFuZC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogdGhpcy5ub2RlfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0Lm9uTm9kZUNvbGxhcHNlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiB0aGlzLm5vZGV9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaXNTZWxlY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFydC5pc1NlbGVjdGVkKHRoaXMubm9kZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLW9yZ2FuaXphdGlvbkNoYXJ0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwieyd1aS1vcmdhbml6YXRpb25jaGFydCB1aS13aWRnZXQnOiB0cnVlLCAndWktb3JnYW5pemF0aW9uY2hhcnQtcHJlc2VydmVzcGFjZSc6IHByZXNlcnZlU3BhY2V9XCI+XHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInVpLW9yZ2FuaXphdGlvbmNoYXJ0LXRhYmxlXCIgcE9yZ2FuaXphdGlvbkNoYXJ0Tm9kZSBbbm9kZV09XCJyb290XCIgKm5nSWY9XCJyb290XCI+PC90YWJsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIE9yZ2FuaXphdGlvbkNoYXJ0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgQElucHV0KCkgdmFsdWU6IFRyZWVOb2RlW107ICAgICAgICAgICAgXHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgc2VsZWN0aW9uOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgcHJlc2VydmVTcGFjZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25Ob2RlU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uTm9kZVVuc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Ob2RlRXhwYW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Ob2RlQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XHJcbiAgICBcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZU1hcDogYW55O1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XHJcbiAgICBcclxuICAgIGdldCByb290KCk6IFRyZWVOb2RlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA/IHRoaXMudmFsdWVbMF0gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlTWFwID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZU1hcFtpdGVtLmdldFR5cGUoKV0gPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRUZW1wbGF0ZUZvck5vZGUobm9kZTogVHJlZU5vZGUpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcclxuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZU1hcClcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGUudHlwZSA/IHRoaXMudGVtcGxhdGVNYXBbbm9kZS50eXBlXSA6IHRoaXMudGVtcGxhdGVNYXBbJ2RlZmF1bHQnXTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbk5vZGVDbGljayhldmVudDogRXZlbnQsIG5vZGU6IFRyZWVOb2RlKSB7XHJcbiAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gKDxFbGVtZW50PiBldmVudC50YXJnZXQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChldmVudFRhcmdldC5jbGFzc05hbWUgJiYgKGV2ZW50VGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCd1aS1ub2RlLXRvZ2dsZXInKSAhPT0gLTEgfHzCoGV2ZW50VGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCd1aS1ub2RlLXRvZ2dsZXItaWNvbicpICE9PSAtMSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuc2VsZWN0YWJsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihub2RlKTtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gKGluZGV4ID49IDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVVuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZScpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9aW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gWy4uLnRoaXMuc2VsZWN0aW9ufHxbXSxub2RlXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGU6IFRyZWVOb2RlKSB7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSAmJiB0aGlzLnNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAodGhpcy5zZWxlY3Rpb24gPT0gbm9kZSkgPyAwIDogLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpcGxlJykge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSAgPCB0aGlzLnNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbltpXSA9PSBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzU2VsZWN0ZWQobm9kZTogVHJlZU5vZGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihub2RlKSAhPSAtMTsgICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW09yZ2FuaXphdGlvbkNoYXJ0LFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtPcmdhbml6YXRpb25DaGFydCxPcmdhbml6YXRpb25DaGFydE5vZGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25DaGFydE1vZHVsZSB7IH0iXX0=