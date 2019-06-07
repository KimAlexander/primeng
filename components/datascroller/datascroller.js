var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, Renderer2, NgZone, ViewChild, EventEmitter, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from '../common/shared';
var DataScroller = /** @class */ (function () {
    function DataScroller(el, renderer, zone) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.buffer = 0.9;
        this.trackBy = function (index, item) { return item; };
        this.onLazyLoad = new EventEmitter();
        this.dataToRender = [];
        this.first = 0;
        this.page = 0;
    }
    DataScroller.prototype.ngOnInit = function () {
        this.load();
    };
    DataScroller.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.loader) {
            this.loaderClickListener = this.renderer.listen(this.loader, 'click', function () {
                _this.load();
            });
        }
        else {
            this.bindScrollListener();
        }
    };
    DataScroller.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    DataScroller.prototype.load = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.page * this.rows,
                rows: this.rows
            });
        }
        this.page = this.page + 1;
    };
    DataScroller.prototype.shouldLoad = function () {
        if (this.lazy)
            return (this.rows * this.page < this.totalRecords);
        else
            return this.value && this.value.length && (this.rows * this.page < this.value.length);
    };
    DataScroller.prototype.reset = function () {
        this.page = 0;
    };
    DataScroller.prototype.isEmpty = function () {
        return !this.value || (this.value.length == 0);
    };
    DataScroller.prototype.bindScrollListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.inline) {
                _this.inlineScrollListener = _this.onInlineScroll.bind(_this);
                _this.contentViewChild.nativeElement.addEventListener('scroll', _this.inlineScrollListener);
            }
            else {
                _this.windowScrollListener = _this.onWindowScroll.bind(_this);
                window.addEventListener('scroll', _this.windowScrollListener);
            }
        });
    };
    DataScroller.prototype.unbindScrollListener = function () {
        if (this.inlineScrollListener) {
            this.contentViewChild.nativeElement.removeEventListener('scroll', this.inlineScrollListener);
        }
        if (this.windowScrollListener) {
            window.removeEventListener('scroll', this.windowScrollListener);
        }
        if (this.loaderClickListener) {
            this.loaderClickListener();
            this.loaderClickListener = null;
        }
    };
    DataScroller.prototype.onInlineScroll = function () {
        var _this = this;
        var scrollTop = this.contentViewChild.nativeElement.scrollTop;
        var scrollHeight = this.contentViewChild.nativeElement.scrollHeight;
        var viewportHeight = this.contentViewChild.nativeElement.clientHeight;
        if ((scrollTop >= ((scrollHeight * this.buffer) - (viewportHeight)))) {
            if (this.shouldLoad()) {
                this.zone.run(function () {
                    _this.load();
                });
            }
        }
    };
    DataScroller.prototype.onWindowScroll = function () {
        var _this = this;
        var docBody = document.body;
        var docElement = document.documentElement;
        var scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
        var winHeight = docElement.clientHeight;
        var docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);
        if (scrollTop >= ((docHeight * this.buffer) - winHeight)) {
            if (this.shouldLoad()) {
                this.zone.run(function () {
                    _this.load();
                });
            }
        }
    };
    DataScroller.prototype.ngOnDestroy = function () {
        this.unbindScrollListener();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DataScroller.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DataScroller.prototype, "rows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataScroller.prototype, "lazy", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataScroller.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataScroller.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DataScroller.prototype, "buffer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DataScroller.prototype, "inline", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataScroller.prototype, "scrollHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DataScroller.prototype, "loader", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DataScroller.prototype, "totalRecords", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], DataScroller.prototype, "trackBy", void 0);
    __decorate([
        ContentChild(Header),
        __metadata("design:type", Object)
    ], DataScroller.prototype, "header", void 0);
    __decorate([
        ContentChild(Footer),
        __metadata("design:type", Object)
    ], DataScroller.prototype, "footer", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], DataScroller.prototype, "templates", void 0);
    __decorate([
        ViewChild('content'),
        __metadata("design:type", ElementRef)
    ], DataScroller.prototype, "contentViewChild", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DataScroller.prototype, "onLazyLoad", void 0);
    DataScroller = __decorate([
        Component({
            selector: 'p-dataScroller',
            template: "\n    <div [ngClass]=\"{'ui-datascroller ui-widget': true, 'ui-datascroller-inline': inline}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n        <div class=\"ui-datascroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n            <ng-content select=\"p-header\"></ng-content>\n        </div>\n        <div #content class=\"ui-datascroller-content ui-widget-content\" [ngStyle]=\"{'max-height': scrollHeight}\">\n            <ul class=\"ui-datascroller-list\">\n                <li *ngFor=\"let item of value | slice:first:(first + (page * rows)); trackBy: trackBy; let i = index\">\n                    <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                </li>\n            </ul>\n        </div>\n        <div class=\"ui-datascroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n            <ng-content select=\"p-footer\"></ng-content>\n        </div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2, NgZone])
    ], DataScroller);
    return DataScroller;
}());
export { DataScroller };
var DataScrollerModule = /** @class */ (function () {
    function DataScrollerModule() {
    }
    DataScrollerModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [DataScroller, SharedModule],
            declarations: [DataScroller]
        })
    ], DataScrollerModule);
    return DataScrollerModule;
}());
export { DataScrollerModule };
//# sourceMappingURL=datascroller.js.map