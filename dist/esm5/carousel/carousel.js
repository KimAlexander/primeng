var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import { Component, Input, ElementRef, ViewChild, AfterContentInit, TemplateRef, ContentChildren, QueryList, NgModule, NgZone, EventEmitter, Output, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { PrimeTemplate, SharedModule, Header, Footer } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UniqueComponentId } from 'primeng/utils';
var Carousel = /** @class */ (function () {
    function Carousel(el, zone) {
        this.el = el;
        this.zone = zone;
        this.orientation = "horizontal";
        this.verticalViewPortHeight = "300px";
        this.contentClass = "";
        this.dotsContainerClass = "";
        this.circular = false;
        this.autoplayInterval = 0;
        this.onPage = new EventEmitter();
        this._numVisible = 1;
        this._numScroll = 1;
        this._oldNumScroll = 0;
        this.prevState = {
            numScroll: 0,
            numVisible: 0,
            value: []
        };
        this.defaultNumScroll = 1;
        this.defaultNumVisible = 1;
        this._page = 0;
        this.isRemainingItemsAdded = false;
        this.remainingItems = 0;
        this.swipeThreshold = 20;
        this.totalShiftedItems = this.page * this.numScroll * -1;
    }
    Object.defineProperty(Carousel.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (val) {
            if (this.isCreated && val !== this._page) {
                if (this.autoplayInterval) {
                    this.stopAutoplay();
                    this.allowAutoplay = false;
                }
                if (val > this._page && val < (this.totalDots() - 1)) {
                    this.step(-1, val);
                }
                else if (val < this._page && val !== 0) {
                    this.step(1, val);
                }
            }
            this._page = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "numVisible", {
        get: function () {
            return this._numVisible;
        },
        set: function (val) {
            this._numVisible = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "numScroll", {
        get: function () {
            return this._numVisible;
        },
        set: function (val) {
            this._numScroll = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (this.circular && this._value) {
                this.setCloneItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Carousel.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.id = UniqueComponentId();
        this.allowAutoplay = !!this.autoplayInterval;
        if (this.circular) {
            this.setCloneItems();
        }
        if (this.responsiveOptions) {
            this.defaultNumScroll = this._numScroll;
            this.defaultNumVisible = this._numVisible;
        }
        this.createStyle();
        this.calculatePosition();
        if (this.responsiveOptions) {
            this.bindDocumentListeners();
        }
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
    Carousel.prototype.ngAfterContentChecked = function () {
        var isCircular = this.isCircular();
        var totalShiftedItems = this.totalShiftedItems;
        if (this.value && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
            this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;
            var page = this._page;
            if (this.totalDots() !== 0 && page >= this.totalDots()) {
                page = this.totalDots() - 1;
                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }
            totalShiftedItems = (page * this._numScroll) * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }
            if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
                totalShiftedItems += (-1 * this.remainingItems) + this._numScroll;
                this.isRemainingItemsAdded = true;
            }
            else {
                this.isRemainingItemsAdded = false;
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
            this._oldNumScroll = this._numScroll;
            this.prevState.numScroll = this._numScroll;
            this.prevState.numVisible = this._numVisible;
            this.prevState.value = this._value;
            if (this.totalDots() > 0 && this.itemsContainer && this.itemsContainer.nativeElement) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
            }
            this.isCreated = true;
            if (this.autoplayInterval && this.isAutoplay()) {
                this.startAutoplay();
            }
        }
        if (isCircular) {
            if (this.page === 0) {
                totalShiftedItems = -1 * this._numVisible;
            }
            else if (totalShiftedItems === 0) {
                totalShiftedItems = -1 * this.value.length;
                if (this.remainingItems > 0) {
                    this.isRemainingItemsAdded = true;
                }
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
        }
    };
    Carousel.prototype.createStyle = function () {
        if (!this.carouselStyle) {
            this.carouselStyle = document.createElement('style');
            this.carouselStyle.type = 'text/css';
            document.body.appendChild(this.carouselStyle);
        }
        var innerHTML = "\n            #" + this.id + " .ui-carousel-item {\n\t\t\t\tflex: 1 0 " + (100 / this.numVisible) + "%\n\t\t\t}\n        ";
        if (this.responsiveOptions) {
            this.responsiveOptions.sort(function (data1, data2) {
                var value1 = data1.breakpoint;
                var value2 = data2.breakpoint;
                var result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return -1 * result;
            });
            for (var i = 0; i < this.responsiveOptions.length; i++) {
                var res = this.responsiveOptions[i];
                innerHTML += "\n                    @media screen and (max-width: " + res.breakpoint + ") {\n                        #" + this.id + " .ui-carousel-item {\n                            flex: 1 0 " + (100 / res.numVisible) + "%\n                        }\n                    }\n                ";
            }
        }
        this.carouselStyle.innerHTML = innerHTML;
    };
    Carousel.prototype.calculatePosition = function () {
        if (this.itemsContainer && this.responsiveOptions) {
            var windowWidth = window.innerWidth;
            var matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };
            for (var i = 0; i < this.responsiveOptions.length; i++) {
                var res = this.responsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this._numScroll !== matchedResponsiveData.numScroll) {
                var page = this._page;
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);
                var totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;
                if (this.isCircular()) {
                    totalShiftedItems -= matchedResponsiveData.numVisible;
                }
                this.totalShiftedItems = totalShiftedItems;
                this._numScroll = matchedResponsiveData.numScroll;
                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }
            if (this._numVisible !== matchedResponsiveData.numVisible) {
                this._numVisible = matchedResponsiveData.numVisible;
                this.setCloneItems();
            }
        }
    };
    Carousel.prototype.setCloneItems = function () {
        var _a, _b;
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
        if (this.isCircular()) {
            (_a = this.clonedItemsForStarting).push.apply(_a, __spread(this.value.slice(-1 * this._numVisible)));
            (_b = this.clonedItemsForFinishing).push.apply(_b, __spread(this.value.slice(0, this._numVisible)));
        }
    };
    Carousel.prototype.firstIndex = function () {
        return this.isCircular() ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
    };
    Carousel.prototype.lastIndex = function () {
        return this.firstIndex() + this.numVisible - 1;
    };
    Carousel.prototype.totalDots = function () {
        return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    };
    Carousel.prototype.totalDotsArray = function () {
        var totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array(totalDots).fill(0);
    };
    Carousel.prototype.containerClass = function () {
        return {
            'ui-carousel ui-widget': true,
            'ui-carousel-vertical': this.isVertical(),
            'ui-carousel-horizontal': !this.isVertical()
        };
    };
    Carousel.prototype.contentClasses = function () {
        return 'ui-carousel-content ' + this.contentClass;
    };
    Carousel.prototype.dotsContentClasses = function () {
        return 'ui-carousel-dots-container ui-helper-reset ' + this.dotsContainerClass;
    };
    Carousel.prototype.isVertical = function () {
        return this.orientation === 'vertical';
    };
    Carousel.prototype.isCircular = function () {
        return this.circular && this.value && this.value.length >= this.numVisible;
    };
    Carousel.prototype.isAutoplay = function () {
        return this.autoplayInterval && this.allowAutoplay;
    };
    Carousel.prototype.isForwardNavDisabled = function () {
        return this.isEmpty() || (this._page >= (this.totalDots() - 1) && !this.isCircular());
    };
    Carousel.prototype.isBackwardNavDisabled = function () {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
    };
    Carousel.prototype.isEmpty = function () {
        return !this.value || this.value.length === 0;
    };
    Carousel.prototype.navForward = function (e, index) {
        if (this.isCircular() || this._page < (this.totalDots() - 1)) {
            this.step(-1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    };
    Carousel.prototype.navBackward = function (e, index) {
        if (this.isCircular() || this._page !== 0) {
            this.step(1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    };
    Carousel.prototype.onDotClick = function (e, index) {
        var page = this._page;
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (index > page) {
            this.navForward(e, index);
        }
        else if (index < page) {
            this.navBackward(e, index);
        }
    };
    Carousel.prototype.step = function (dir, page) {
        var totalShiftedItems = this.totalShiftedItems;
        var isCircular = this.isCircular();
        if (page != null) {
            totalShiftedItems = (this._numScroll * page) * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }
            this.isRemainingItemsAdded = false;
        }
        else {
            totalShiftedItems += (this._numScroll * dir);
            if (this.isRemainingItemsAdded) {
                totalShiftedItems += this.remainingItems - (this._numScroll * dir);
                this.isRemainingItemsAdded = false;
            }
            var originalShiftedItems = isCircular ? (totalShiftedItems + this._numVisible) : totalShiftedItems;
            page = Math.abs(Math.floor((originalShiftedItems / this._numScroll)));
        }
        if (isCircular && this.page === (this.totalDots() - 1) && dir === -1) {
            totalShiftedItems = -1 * (this.value.length + this._numVisible);
            page = 0;
        }
        else if (isCircular && this.page === 0 && dir === 1) {
            totalShiftedItems = 0;
            page = (this.totalDots() - 1);
        }
        else if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
            totalShiftedItems += ((this.remainingItems * -1) - (this._numScroll * dir));
            this.isRemainingItemsAdded = true;
        }
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.onPage.emit({
            page: this.page
        });
    };
    Carousel.prototype.startAutoplay = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.totalDots() > 0) {
                if (_this.page === (_this.totalDots() - 1)) {
                    _this.step(-1, 0);
                }
                else {
                    _this.step(-1, _this.page + 1);
                }
            }
        }, this.autoplayInterval);
    };
    Carousel.prototype.stopAutoplay = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    Carousel.prototype.onTransitionEnd = function () {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';
            if ((this.page === 0 || this.page === (this.totalDots() - 1)) && this.isCircular()) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + this.totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + this.totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
            }
        }
    };
    Carousel.prototype.onTouchStart = function (e) {
        var touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    };
    Carousel.prototype.onTouchMove = function (e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    };
    Carousel.prototype.onTouchEnd = function (e) {
        var touchobj = e.changedTouches[0];
        if (this.isVertical()) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    };
    Carousel.prototype.changePageOnTouch = function (e, diff) {
        if (Math.abs(diff) > this.swipeThreshold) {
            if (diff < 0) {
                this.navForward(e);
            }
            else {
                this.navBackward(e);
            }
        }
    };
    Carousel.prototype.bindDocumentListeners = function () {
        var _this = this;
        if (!this.documentResizeListener) {
            this.documentResizeListener = function (e) {
                _this.calculatePosition();
            };
            window.addEventListener('resize', this.documentResizeListener);
        }
    };
    Carousel.prototype.unbindDocumentListeners = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    Carousel.prototype.ngOnDestroy = function () {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    };
    Carousel.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], Carousel.prototype, "page", null);
    __decorate([
        Input()
    ], Carousel.prototype, "numVisible", null);
    __decorate([
        Input()
    ], Carousel.prototype, "numScroll", null);
    __decorate([
        Input()
    ], Carousel.prototype, "responsiveOptions", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "orientation", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "verticalViewPortHeight", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "contentClass", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "dotsContainerClass", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "value", null);
    __decorate([
        Input()
    ], Carousel.prototype, "circular", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "autoplayInterval", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "style", void 0);
    __decorate([
        Input()
    ], Carousel.prototype, "styleClass", void 0);
    __decorate([
        Output()
    ], Carousel.prototype, "onPage", void 0);
    __decorate([
        ViewChild('itemsContainer')
    ], Carousel.prototype, "itemsContainer", void 0);
    __decorate([
        ContentChild(Header)
    ], Carousel.prototype, "headerFacet", void 0);
    __decorate([
        ContentChild(Footer)
    ], Carousel.prototype, "footerFacet", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Carousel.prototype, "templates", void 0);
    Carousel = __decorate([
        Component({
            selector: 'p-carousel',
            template: "\n\t\t<div [attr.id]=\"id\" [ngClass]=\"containerClass()\" [ngStyle]=\"style\" [class]=\"styleClass\">\n\t\t\t<div class=\"ui-carousel-header\" *ngIf=\"headerFacet\">\n\t\t\t\t<ng-content select=\"p-header\"></ng-content>\n\t\t\t</div>\n\t\t\t<div [class]=\"contentClasses()\">\n\t\t\t\t<div class=\"ui-carousel-container\">\n\t\t\t\t\t<button [ngClass]=\"{'ui-carousel-prev ui-button ui-widget ui-state-default ui-corner-all':true, 'ui-state-disabled': isBackwardNavDisabled()}\" [disabled]=\"isBackwardNavDisabled()\" (click)=\"navBackward($event)\">\n\t\t\t\t\t\t<span [ngClass]=\"{'ui-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"ui-carousel-items-content\" [ngStyle]=\"{'height': isVertical() ? verticalViewPortHeight : 'auto'}\">\n\t\t\t\t\t\t<div #itemsContainer class=\"ui-carousel-items-container\" (transitionend)=\"onTransitionEnd()\" (touchend)=\"onTouchEnd($event)\" (touchstart)=\"onTouchStart($event)\" (touchmove)=\"onTouchMove($event)\">\n\t\t\t\t\t\t\t<div *ngFor=\"let item of clonedItemsForStarting; let index = index\" [ngClass]= \"{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': (totalShiftedItems * -1) === (value.length),\n\t\t\t\t\t\t\t'ui-carousel-item-start': 0 === index,\n\t\t\t\t\t\t\t'ui-carousel-item-end': (clonedItemsForStarting.length - 1) === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngFor=\"let item of value; let index = index\" [ngClass]= \"{'ui-carousel-item': true,'ui-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),\n\t\t\t\t\t\t\t'ui-carousel-item-start': firstIndex() === index,\n\t\t\t\t\t\t\t'ui-carousel-item-end': lastIndex() === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngFor=\"let item of clonedItemsForFinishing; let index = index\" [ngClass]= \"{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': ((totalShiftedItems *-1) === numVisible),\n\t\t\t\t\t\t\t'ui-carousel-item-start': 0 === index,\n\t\t\t\t\t\t\t'ui-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button [ngClass]=\"{'ui-carousel-next ui-button ui-widget ui-state-default ui-corner-all': true, 'ui-state-disabled': isForwardNavDisabled()}\" [disabled]=\"isForwardNavDisabled()\" (click)=\"navForward($event)\">\n\t\t\t\t\t\t<span [ngClass]=\"{'ui-carousel-next-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<ul [class]=\"dotsContentClasses()\">\n\t\t\t\t\t<li *ngFor=\"let totalDot of totalDotsArray(); let i = index\" [ngClass]=\"{'ui-carousel-dot-item':true,'ui-state-highlight': _page === i}\">\n\t\t\t\t\t\t<button class=\"ui-button ui-widget ui-state-default ui-corner-all\" (click)=\"onDotClick($event, i)\">\n\t\t\t\t\t\t\t<span [ngClass]=\"{'ui-carousel-dot-icon pi':true, 'pi-circle-on': _page === i, 'pi-circle-off': !(_page === i)}\"></span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class=\"ui-carousel-footer\" *ngIf=\"footerFacet\">\n\t\t\t\t<ng-content select=\"p-footer\"></ng-content>\n\t\t\t</div>\n\t\t</div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Carousel);
    return Carousel;
}());
export { Carousel };
var CarouselModule = /** @class */ (function () {
    function CarouselModule() {
    }
    CarouselModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            exports: [CommonModule, Carousel, SharedModule],
            declarations: [Carousel]
        })
    ], CarouselModule);
    return CarouselModule;
}());
export { CarouselModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2Nhcm91c2VsLyIsInNvdXJjZXMiOlsiY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbE4sT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBb0RsRDtJQWlJQyxrQkFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUExRjdDLGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBRTNCLDJCQUFzQixHQUFHLE9BQU8sQ0FBQztRQUVqQyxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFZaEMsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUV6QixxQkFBZ0IsR0FBVSxDQUFDLENBQUM7UUFNeEIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBVTVELGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsY0FBUyxHQUFRO1lBQ2hCLFNBQVMsRUFBQyxDQUFDO1lBQ1gsVUFBVSxFQUFDLENBQUM7WUFDWixLQUFLLEVBQUUsRUFBRTtTQUNULENBQUM7UUFFRixxQkFBZ0IsR0FBVSxDQUFDLENBQUM7UUFFNUIsc0JBQWlCLEdBQVUsQ0FBQyxDQUFDO1FBRTdCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFVbEIsMEJBQXFCLEdBQVcsS0FBSyxDQUFDO1FBTXRDLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBa0IzQixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUszQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFqSVEsc0JBQUksMEJBQUk7YUFBUjtZQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQixDQUFDO2FBQ0QsVUFBUyxHQUFVO1lBQ2xCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDekMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7aUJBQzNCO2dCQUVELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtxQkFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQjthQUNEO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbEIsQ0FBQzs7O09BakJBO0lBbUJRLHNCQUFJLGdDQUFVO2FBQWQ7WUFDUixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekIsQ0FBQzthQUNELFVBQWUsR0FBVTtZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN4QixDQUFDOzs7T0FIQTtJQUtRLHNCQUFJLCtCQUFTO2FBQWI7WUFDUixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekIsQ0FBQzthQUNELFVBQWMsR0FBVTtZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUN2QixDQUFDOzs7T0FIQTtJQWVRLHNCQUFJLDJCQUFLO2FBQVQ7WUFDUixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEIsQ0FBQzthQUNELFVBQVUsR0FBRztZQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDckI7UUFDRixDQUFDOzs7T0FOQTtJQUFBLENBQUM7SUFvRkYscUNBQWtCLEdBQWxCO1FBQUEsaUJBK0JDO1FBOUJBLElBQUksQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFFN0MsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNyQjtRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQzNCLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN2QixLQUFLLE1BQU07b0JBQ1YsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNsQyxNQUFNO2dCQUVQO29CQUNDLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDbEMsTUFBTTthQUNQO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsd0NBQXFCLEdBQXJCO1FBQ0MsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3JDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4SyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3BCO1lBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBRS9FLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDZixDQUFDLENBQUM7YUFDSDtZQUVELGlCQUFpQixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLFVBQVUsRUFBRTtnQkFDWixpQkFBaUIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3pDO1lBRVYsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUU7Z0JBQy9ELGlCQUFpQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7YUFDbEM7aUJBQ0k7Z0JBQ0osSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQzthQUNuQztZQUVELElBQUksaUJBQWlCLEtBQUssSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUNyQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7YUFDOUM7WUFFVixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFbkMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7Z0JBQ3JGLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBa0IsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLEdBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFlLGlCQUFpQixHQUFHLENBQUMsR0FBRyxHQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBVSxDQUFDO2FBQ3BOO1lBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFFdEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUMvQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDckI7U0FDRDtRQUVELElBQUksVUFBVSxFQUFFO1lBQ04sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDakIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUM3QztpQkFDSSxJQUFJLGlCQUFpQixLQUFLLENBQUMsRUFBRTtnQkFDOUIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQzNDLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7aUJBQ3JDO2FBQ0o7WUFFRCxJQUFJLGlCQUFpQixLQUFLLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO2FBQ2xDO1NBQ1Y7SUFDRixDQUFDO0lBRUQsOEJBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsSUFBSSxTQUFTLEdBQUcsb0JBQ0osSUFBSSxDQUFDLEVBQUUsZ0RBQ0wsQ0FBQyxHQUFHLEdBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFFOUIsQ0FBQztRQUVQLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUUsS0FBSztnQkFDeEMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztnQkFDaEMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztnQkFDaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUVsQixJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUk7b0JBQ25DLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDUixJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUk7b0JBQ3hDLE1BQU0sR0FBRyxDQUFDLENBQUM7cUJBQ1AsSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJO29CQUN4QyxNQUFNLEdBQUcsQ0FBQyxDQUFDO3FCQUNQLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7b0JBQ2hFLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7b0JBRXBFLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFN0QsT0FBTyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVwQyxTQUFTLElBQUkseURBQ2tDLEdBQUcsQ0FBQyxVQUFVLHNDQUN2QyxJQUFJLENBQUMsRUFBRSxvRUFDTyxDQUFDLEdBQUcsR0FBRSxHQUFHLENBQUMsVUFBVSxDQUFDLDBFQUc3QyxDQUFBO2FBQ1o7U0FDRDtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMxQyxDQUFDO0lBRUYsb0NBQWlCLEdBQWpCO1FBQ0MsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNsRCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3BDLElBQUkscUJBQXFCLEdBQUc7Z0JBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCO2dCQUNsQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjthQUNoQyxDQUFDO1lBRUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxXQUFXLEVBQUU7b0JBQ2hELHFCQUFxQixHQUFHLEdBQUcsQ0FBQztpQkFDNUI7YUFDRDtZQUVELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFOUUsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRTNFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO29CQUN0QixpQkFBaUIsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLENBQUM7aUJBQ3REO2dCQUVELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLENBQUM7Z0JBRWxELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2lCQUNmLENBQUMsQ0FBQzthQUNIO1lBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLHFCQUFxQixDQUFDLFVBQVUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNyQjtTQUNEO0lBQ0YsQ0FBQztJQUVELGdDQUFhLEdBQWI7O1FBQ0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3RCLENBQUEsS0FBQSxJQUFJLENBQUMsc0JBQXNCLENBQUEsQ0FBQyxJQUFJLG9CQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRTtZQUM3RSxDQUFBLEtBQUEsSUFBSSxDQUFDLHVCQUF1QixDQUFBLENBQUMsSUFBSSxvQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFFO1NBQzVFO0lBQ0YsQ0FBQztJQUVELDZCQUFVLEdBQVY7UUFDQyxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQyxPQUFPLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNDLE9BQU87WUFDTix1QkFBdUIsRUFBQyxJQUFJO1lBQzVCLHNCQUFzQixFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDekMsd0JBQXdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1NBQzVDLENBQUM7SUFDSCxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNDLE9BQU8sc0JBQXNCLEdBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNsRCxDQUFDO0lBRUQscUNBQWtCLEdBQWxCO1FBQ0MsT0FBTyw2Q0FBNkMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDaEYsQ0FBQztJQUVELDZCQUFVLEdBQVY7UUFDQyxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxDQUFDO0lBQ3hDLENBQUM7SUFFRCw2QkFBVSxHQUFWO1FBQ0MsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUM1RSxDQUFDO0lBRUQsNkJBQVUsR0FBVjtRQUNDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDcEQsQ0FBQztJQUVELHVDQUFvQixHQUFwQjtRQUNDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCx3Q0FBcUIsR0FBckI7UUFDQyxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELDBCQUFPLEdBQVA7UUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxDQUFDLEVBQUMsS0FBTTtRQUNsQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckI7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFO1lBQ3RCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNuQjtJQUNGLENBQUM7SUFFRCw4QkFBVyxHQUFYLFVBQVksQ0FBQyxFQUFDLEtBQU07UUFDbkIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDcEI7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFO1lBQ3RCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNuQjtJQUNGLENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsQ0FBQyxFQUFFLEtBQUs7UUFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV0QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDM0I7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUI7YUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0I7SUFDRixDQUFDO0lBRUQsdUJBQUksR0FBSixVQUFLLEdBQUcsRUFBRSxJQUFJO1FBQ2IsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDL0MsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXJDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNqQixpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFbEQsSUFBSSxVQUFVLEVBQUU7Z0JBQ2YsaUJBQWlCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUN0QztZQUVELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7U0FDbkM7YUFDSTtZQUNKLGlCQUFpQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDL0IsaUJBQWlCLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7YUFDbkM7WUFFRCxJQUFJLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBQ25HLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDckUsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEUsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNUO2FBQ0ksSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtZQUNwRCxpQkFBaUIsR0FBRyxDQUFDLENBQUM7WUFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzlCO2FBQ0ksSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUU7WUFDcEUsaUJBQWlCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBa0IsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHLEdBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFlLGlCQUFpQixHQUFHLENBQUMsR0FBRyxHQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBVSxDQUFDO1lBQ3BOLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcseUJBQXlCLENBQUM7U0FDL0U7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFBQSxpQkFZQztRQVhBLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1lBQzNCLElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDekIsSUFBSSxLQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUN6QyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNqQjtxQkFDSTtvQkFDSixLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzdCO2FBQ0Q7UUFDRixDQUFDLEVBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELCtCQUFZLEdBQVo7UUFDQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QjtJQUNGLENBQUM7SUFFRCxrQ0FBZSxHQUFmO1FBQ0MsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBRXhELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUNuRixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQWtCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsR0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQU8sQ0FBQyxDQUFDLENBQUMsaUJBQWUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsR0FBRyxHQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBVSxDQUFDO2FBQzlOO1NBQ0Q7SUFDRixDQUFDO0lBRUQsK0JBQVksR0FBWixVQUFhLENBQUM7UUFDYixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZixDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDakIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLO1NBQ2pCLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQVcsR0FBWCxVQUFZLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7WUFDakIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ25CO0lBQ0YsQ0FBQztJQUNELDZCQUFVLEdBQVYsVUFBVyxDQUFDO1FBQ1gsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7YUFDSTtZQUNKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RDtJQUNGLENBQUM7SUFFRCxvQ0FBaUIsR0FBakIsVUFBa0IsQ0FBQyxFQUFFLElBQUk7UUFDeEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDekMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkI7aUJBQ0k7Z0JBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUVwQjtTQUNEO0lBQ0YsQ0FBQztJQUVELHdDQUFxQixHQUFyQjtRQUFBLGlCQVFDO1FBUEEsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNqQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsVUFBQyxDQUFDO2dCQUMvQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUM7WUFFRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQy9EO0lBQ0YsQ0FBQztJQUVELDBDQUF1QixHQUF2QjtRQUNDLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztTQUNuQztJQUNGLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0MsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDcEI7SUFDQyxDQUFDOztnQkFsY21CLFVBQVU7Z0JBQWUsTUFBTTs7SUEvSDdDO1FBQVIsS0FBSyxFQUFFO3dDQUVQO0lBbUJRO1FBQVIsS0FBSyxFQUFFOzhDQUVQO0lBS1E7UUFBUixLQUFLLEVBQUU7NkNBRVA7SUFLUTtRQUFSLEtBQUssRUFBRTt1REFBMEI7SUFFekI7UUFBUixLQUFLLEVBQUU7aURBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFOzREQUFrQztJQUVqQztRQUFSLEtBQUssRUFBRTtrREFBMkI7SUFFMUI7UUFBUixLQUFLLEVBQUU7d0RBQWlDO0lBRWhDO1FBQVIsS0FBSyxFQUFFO3lDQUVQO0lBUVE7UUFBUixLQUFLLEVBQUU7OENBQTBCO0lBRXpCO1FBQVIsS0FBSyxFQUFFO3NEQUE2QjtJQUU1QjtRQUFSLEtBQUssRUFBRTsyQ0FBWTtJQUVYO1FBQVIsS0FBSyxFQUFFO2dEQUFvQjtJQUVmO1FBQVQsTUFBTSxFQUFFOzRDQUFnRDtJQUUvQjtRQUE1QixTQUFTLENBQUMsZ0JBQWdCLENBQUM7b0RBQTRCO0lBRWxDO1FBQXJCLFlBQVksQ0FBQyxNQUFNLENBQUM7aURBQWE7SUFFVDtRQUFyQixZQUFZLENBQUMsTUFBTSxDQUFDO2lEQUFhO0lBRUw7UUFBL0IsZUFBZSxDQUFDLGFBQWEsQ0FBQzsrQ0FBMkI7SUF6RTlDLFFBQVE7UUFsRHBCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSwraEhBNkNOO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDbkQsQ0FBQztPQUNXLFFBQVEsQ0Fxa0JwQjtJQUFELGVBQUM7Q0FBQSxBQXJrQkQsSUFxa0JDO1NBcmtCWSxRQUFRO0FBNGtCckI7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ1QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztZQUNyQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQztZQUMvQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDeEIsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgQWZ0ZXJDb250ZW50SW5pdCwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBOZ01vZHVsZSwgTmdab25lLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgQ29udGVudENoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUsIEhlYWRlciwgRm9vdGVyIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdwLWNhcm91c2VsJyxcclxuXHR0ZW1wbGF0ZTogYFxyXG5cdFx0PGRpdiBbYXR0ci5pZF09XCJpZFwiIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1oZWFkZXJcIiAqbmdJZj1cImhlYWRlckZhY2V0XCI+XHJcblx0XHRcdFx0PG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IFtjbGFzc109XCJjb250ZW50Q2xhc3NlcygpXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz1cInVpLWNhcm91c2VsLWNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsLXByZXYgdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOnRydWUsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IGlzQmFja3dhcmROYXZEaXNhYmxlZCgpfVwiIFtkaXNhYmxlZF09XCJpc0JhY2t3YXJkTmF2RGlzYWJsZWQoKVwiIChjbGljayk9XCJuYXZCYWNrd2FyZCgkZXZlbnQpXCI+XHJcblx0XHRcdFx0XHRcdDxzcGFuIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtcHJldi1pY29uIHBpJzogdHJ1ZSwgJ3BpLWNoZXZyb24tbGVmdCc6ICFpc1ZlcnRpY2FsKCksICdwaS1jaGV2cm9uLXVwJzogaXNWZXJ0aWNhbCgpfVwiPjwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInVpLWNhcm91c2VsLWl0ZW1zLWNvbnRlbnRcIiBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IGlzVmVydGljYWwoKSA/IHZlcnRpY2FsVmlld1BvcnRIZWlnaHQgOiAnYXV0byd9XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgI2l0ZW1zQ29udGFpbmVyIGNsYXNzPVwidWktY2Fyb3VzZWwtaXRlbXMtY29udGFpbmVyXCIgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIiAodG91Y2hlbmQpPVwib25Ub3VjaEVuZCgkZXZlbnQpXCIgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudClcIiAodG91Y2htb3ZlKT1cIm9uVG91Y2hNb3ZlKCRldmVudClcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNsb25lZEl0ZW1zRm9yU3RhcnRpbmc7IGxldCBpbmRleCA9IGluZGV4XCIgW25nQ2xhc3NdPSBcInsndWktY2Fyb3VzZWwtaXRlbSB1aS1jYXJvdXNlbC1pdGVtLWNsb25lZCc6IHRydWUsJ3VpLWNhcm91c2VsLWl0ZW0tYWN0aXZlJzogKHRvdGFsU2hpZnRlZEl0ZW1zICogLTEpID09PSAodmFsdWUubGVuZ3RoKSxcclxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1zdGFydCc6IDAgPT09IGluZGV4LFxyXG5cdFx0XHRcdFx0XHRcdCd1aS1jYXJvdXNlbC1pdGVtLWVuZCc6IChjbG9uZWRJdGVtc0ZvclN0YXJ0aW5nLmxlbmd0aCAtIDEpID09PSBpbmRleH1cIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiB2YWx1ZTsgbGV0IGluZGV4ID0gaW5kZXhcIiBbbmdDbGFzc109IFwieyd1aS1jYXJvdXNlbC1pdGVtJzogdHJ1ZSwndWktY2Fyb3VzZWwtaXRlbS1hY3RpdmUnOiAoZmlyc3RJbmRleCgpIDw9IGluZGV4ICYmIGxhc3RJbmRleCgpID49IGluZGV4KSxcclxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1zdGFydCc6IGZpcnN0SW5kZXgoKSA9PT0gaW5kZXgsXHJcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tZW5kJzogbGFzdEluZGV4KCkgPT09IGluZGV4fVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNsb25lZEl0ZW1zRm9yRmluaXNoaW5nOyBsZXQgaW5kZXggPSBpbmRleFwiIFtuZ0NsYXNzXT0gXCJ7J3VpLWNhcm91c2VsLWl0ZW0gdWktY2Fyb3VzZWwtaXRlbS1jbG9uZWQnOiB0cnVlLCd1aS1jYXJvdXNlbC1pdGVtLWFjdGl2ZSc6ICgodG90YWxTaGlmdGVkSXRlbXMgKi0xKSA9PT0gbnVtVmlzaWJsZSksXHJcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tc3RhcnQnOiAwID09PSBpbmRleCxcclxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1lbmQnOiAoY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmcubGVuZ3RoIC0gMSkgPT09IGluZGV4fVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxidXR0b24gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1uZXh0IHVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogaXNGb3J3YXJkTmF2RGlzYWJsZWQoKX1cIiBbZGlzYWJsZWRdPVwiaXNGb3J3YXJkTmF2RGlzYWJsZWQoKVwiIChjbGljayk9XCJuYXZGb3J3YXJkKCRldmVudClcIj5cclxuXHRcdFx0XHRcdFx0PHNwYW4gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1uZXh0LWljb24gcGknOiB0cnVlLCAncGktY2hldnJvbi1yaWdodCc6ICFpc1ZlcnRpY2FsKCksICdwaS1jaGV2cm9uLWRvd24nOiBpc1ZlcnRpY2FsKCl9XCI+PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PHVsIFtjbGFzc109XCJkb3RzQ29udGVudENsYXNzZXMoKVwiPlxyXG5cdFx0XHRcdFx0PGxpICpuZ0Zvcj1cImxldCB0b3RhbERvdCBvZiB0b3RhbERvdHNBcnJheSgpOyBsZXQgaSA9IGluZGV4XCIgW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1kb3QtaXRlbSc6dHJ1ZSwndWktc3RhdGUtaGlnaGxpZ2h0JzogX3BhZ2UgPT09IGl9XCI+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJ1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIChjbGljayk9XCJvbkRvdENsaWNrKCRldmVudCwgaSlcIj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsLWRvdC1pY29uIHBpJzp0cnVlLCAncGktY2lyY2xlLW9uJzogX3BhZ2UgPT09IGksICdwaS1jaXJjbGUtb2ZmJzogIShfcGFnZSA9PT0gaSl9XCI+PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0PC91bD5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1mb290ZXJcIiAqbmdJZj1cImZvb3RlckZhY2V0XCI+XHJcblx0XHRcdFx0PG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuXHRASW5wdXQoKSBnZXQgcGFnZSgpOm51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcGFnZTtcclxuXHR9XHJcblx0c2V0IHBhZ2UodmFsOm51bWJlcikge1xyXG5cdFx0aWYgKHRoaXMuaXNDcmVhdGVkICYmIHZhbCAhPT0gdGhpcy5fcGFnZSkge1xyXG5cdFx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XHJcblx0XHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcclxuXHRcdFx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHZhbCA+IHRoaXMuX3BhZ2UgJiYgdmFsIDwgKHRoaXMudG90YWxEb3RzKCkgLSAxKSkge1xyXG5cdFx0XHRcdHRoaXMuc3RlcCgtMSwgdmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICh2YWwgPCB0aGlzLl9wYWdlICYmIHZhbCAhPT0gMCkge1xyXG5cdFx0XHRcdHRoaXMuc3RlcCgxLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9IFxyXG5cclxuXHRcdHRoaXMuX3BhZ2UgPSB2YWw7XHJcblx0fVxyXG5cdFx0XHJcblx0QElucHV0KCkgZ2V0IG51bVZpc2libGUoKTpudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX251bVZpc2libGU7XHJcblx0fVxyXG5cdHNldCBudW1WaXNpYmxlKHZhbDpudW1iZXIpIHtcclxuXHRcdHRoaXMuX251bVZpc2libGUgPSB2YWw7XHJcblx0fVxyXG5cdFx0XHJcblx0QElucHV0KCkgZ2V0IG51bVNjcm9sbCgpOm51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbnVtVmlzaWJsZTtcclxuXHR9XHJcblx0c2V0IG51bVNjcm9sbCh2YWw6bnVtYmVyKSB7XHJcblx0XHR0aGlzLl9udW1TY3JvbGwgPSB2YWw7XHJcblx0fVxyXG5cdFxyXG5cdEBJbnB1dCgpIHJlc3BvbnNpdmVPcHRpb25zOiBhbnlbXTtcclxuXHRcclxuXHRASW5wdXQoKSBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xyXG5cdFxyXG5cdEBJbnB1dCgpIHZlcnRpY2FsVmlld1BvcnRIZWlnaHQgPSBcIjMwMHB4XCI7XHJcblx0XHJcblx0QElucHV0KCkgY29udGVudENsYXNzOiBTdHJpbmcgPSBcIlwiO1xyXG5cclxuXHRASW5wdXQoKSBkb3RzQ29udGFpbmVyQ2xhc3M6IFN0cmluZyA9IFwiXCI7XHJcblxyXG5cdEBJbnB1dCgpIGdldCB2YWx1ZSgpIDphbnlbXSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmFsdWU7XHJcblx0fTtcclxuXHRzZXQgdmFsdWUodmFsKSB7XHJcblx0XHR0aGlzLl92YWx1ZSA9IHZhbDtcclxuXHRcdGlmICh0aGlzLmNpcmN1bGFyICYmIHRoaXMuX3ZhbHVlKSB7XHJcblx0XHRcdHRoaXMuc2V0Q2xvbmVJdGVtcygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRASW5wdXQoKSBjaXJjdWxhcjpib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdEBJbnB1dCgpIGF1dG9wbGF5SW50ZXJ2YWw6bnVtYmVyID0gMDtcclxuXHJcblx0QElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcblx0QElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cdFxyXG4gICAgQE91dHB1dCgpIG9uUGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdEBWaWV3Q2hpbGQoJ2l0ZW1zQ29udGFpbmVyJykgaXRlbXNDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcblxyXG5cdEBDb250ZW50Q2hpbGQoSGVhZGVyKSBoZWFkZXJGYWNldDtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyRmFjZXQ7XHJcblxyXG5cdEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcclxuXHJcblx0X251bVZpc2libGU6IG51bWJlciA9IDE7XHJcblxyXG5cdF9udW1TY3JvbGw6IG51bWJlciA9IDE7XHJcblxyXG5cdF9vbGROdW1TY3JvbGw6IG51bWJlciA9IDA7XHJcblxyXG5cdHByZXZTdGF0ZTogYW55ID0ge1xyXG5cdFx0bnVtU2Nyb2xsOjAsXHJcblx0XHRudW1WaXNpYmxlOjAsXHJcblx0XHR2YWx1ZTogW11cclxuXHR9O1xyXG5cclxuXHRkZWZhdWx0TnVtU2Nyb2xsOm51bWJlciA9IDE7XHJcblxyXG5cdGRlZmF1bHROdW1WaXNpYmxlOm51bWJlciA9IDE7XHJcblxyXG5cdF9wYWdlOiBudW1iZXIgPSAwO1xyXG5cclxuXHRfdmFsdWU6IGFueVtdO1xyXG5cclxuXHRjYXJvdXNlbFN0eWxlOmFueTtcclxuXHJcblx0aWQ6c3RyaW5nO1xyXG5cclxuXHR0b3RhbFNoaWZ0ZWRJdGVtcztcclxuXHJcblx0aXNSZW1haW5pbmdJdGVtc0FkZGVkOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0YW5pbWF0aW9uVGltZW91dDphbnk7XHJcblxyXG5cdHRyYW5zbGF0ZVRpbWVvdXQ6YW55O1xyXG5cclxuXHRyZW1haW5pbmdJdGVtczogbnVtYmVyID0gMDtcclxuXHJcblx0X2l0ZW1zOiBhbnlbXTtcclxuXHJcblx0c3RhcnRQb3M6IGFueTtcclxuXHJcblx0ZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xyXG5cclxuXHRjbG9uZWRJdGVtc0ZvclN0YXJ0aW5nOiBhbnlbXTtcclxuXHJcblx0Y2xvbmVkSXRlbXNGb3JGaW5pc2hpbmc6IGFueVtdO1xyXG5cclxuXHRhbGxvd0F1dG9wbGF5OiBib29sZWFuO1xyXG5cclxuXHRpbnRlcnZhbDogYW55O1xyXG5cclxuXHRpc0NyZWF0ZWQ6IGJvb2xlYW47XHJcblxyXG5cdHN3aXBlVGhyZXNob2xkOiBudW1iZXIgPSAyMDtcclxuXHJcblx0cHVibGljIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcblx0Y29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7IFxyXG5cdFx0dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRoaXMucGFnZSAqIHRoaXMubnVtU2Nyb2xsICogLTE7IFxyXG5cdH1cclxuXHJcblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG5cdFx0dGhpcy5pZCA9IFVuaXF1ZUNvbXBvbmVudElkKCk7XHJcblx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSAhIXRoaXMuYXV0b3BsYXlJbnRlcnZhbDtcclxuXHJcblx0XHRpZiAodGhpcy5jaXJjdWxhcikge1xyXG5cdFx0XHR0aGlzLnNldENsb25lSXRlbXMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLmRlZmF1bHROdW1TY3JvbGwgPSB0aGlzLl9udW1TY3JvbGw7XHJcblx0XHRcdHRoaXMuZGVmYXVsdE51bVZpc2libGUgPSB0aGlzLl9udW1WaXNpYmxlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY3JlYXRlU3R5bGUoKTtcclxuXHRcdHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcclxuXHJcblx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLmJpbmREb2N1bWVudExpc3RlbmVycygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHRcdFx0c3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xyXG5cdFx0XHRcdGNhc2UgJ2l0ZW0nOlxyXG5cdFx0XHRcdFx0dGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XHJcblx0XHRjb25zdCBpc0NpcmN1bGFyID0gdGhpcy5pc0NpcmN1bGFyKCk7XHJcblx0XHRsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy52YWx1ZSAmJiAodGhpcy5wcmV2U3RhdGUubnVtU2Nyb2xsICE9PSB0aGlzLl9udW1TY3JvbGwgfHwgdGhpcy5wcmV2U3RhdGUubnVtVmlzaWJsZSAhPT0gdGhpcy5fbnVtVmlzaWJsZSB8fCB0aGlzLnByZXZTdGF0ZS52YWx1ZS5sZW5ndGggIT09IHRoaXMudmFsdWUubGVuZ3RoKSkge1xyXG5cdFx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XHJcblx0XHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5yZW1haW5pbmdJdGVtcyA9ICh0aGlzLnZhbHVlLmxlbmd0aCAtIHRoaXMuX251bVZpc2libGUpICUgdGhpcy5fbnVtU2Nyb2xsO1xyXG5cclxuXHRcdFx0bGV0IHBhZ2UgPSB0aGlzLl9wYWdlO1xyXG5cdFx0XHRpZiAodGhpcy50b3RhbERvdHMoKSAhPT0gMCAmJiBwYWdlID49IHRoaXMudG90YWxEb3RzKCkpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2UgPSB0aGlzLnRvdGFsRG90cygpIC0gMTtcclxuXHRcdFx0XHR0aGlzLl9wYWdlID0gcGFnZTtcclxuXHRcdFx0XHR0aGlzLm9uUGFnZS5lbWl0KHtcclxuXHRcdFx0XHRcdHBhZ2U6IHRoaXMucGFnZVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyA9IChwYWdlICogdGhpcy5fbnVtU2Nyb2xsKSAqIC0xO1xyXG4gICAgICAgICAgICBpZiAoaXNDaXJjdWxhcikge1xyXG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgLT0gdGhpcy5fbnVtVmlzaWJsZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHRcdFx0aWYgKHBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgdGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcclxuXHRcdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyArPSAoLTEgKiB0aGlzLnJlbWFpbmluZ0l0ZW1zKSArIHRoaXMuX251bVNjcm9sbDtcclxuXHRcdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRvdGFsU2hpZnRlZEl0ZW1zICE9PSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblx0XHRcdHRoaXMuX29sZE51bVNjcm9sbCA9IHRoaXMuX251bVNjcm9sbDtcclxuXHRcdFx0dGhpcy5wcmV2U3RhdGUubnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xyXG5cdFx0XHR0aGlzLnByZXZTdGF0ZS5udW1WaXNpYmxlID0gdGhpcy5fbnVtVmlzaWJsZTtcclxuXHRcdFx0dGhpcy5wcmV2U3RhdGUudmFsdWUgPSB0aGlzLl92YWx1ZTtcclxuXHJcblx0XHRcdGlmICh0aGlzLnRvdGFsRG90cygpID4gMCAmJiB0aGlzLml0ZW1zQ29udGFpbmVyICYmIHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCkge1xyXG5cdFx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSB0aGlzLmlzVmVydGljYWwoKSA/IGB0cmFuc2xhdGUzZCgwLCAke3RvdGFsU2hpZnRlZEl0ZW1zICogKDEwMC8gdGhpcy5fbnVtVmlzaWJsZSl9JSwgMClgIDogYHRyYW5zbGF0ZTNkKCR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuaXNDcmVhdGVkID0gdHJ1ZTtcclxuXHJcblx0XHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwgJiYgdGhpcy5pc0F1dG9wbGF5KCkpIHtcclxuXHRcdFx0XHR0aGlzLnN0YXJ0QXV0b3BsYXkoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpc0NpcmN1bGFyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gLTEgKiB0aGlzLl9udW1WaXNpYmxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRvdGFsU2hpZnRlZEl0ZW1zID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9IC0xICogdGhpcy52YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0b3RhbFNoaWZ0ZWRJdGVtcyAhPT0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcykge1xyXG5cdFx0XHRcdHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcclxuICAgICAgICAgICAgfVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3R5bGUoKSB7XHJcblx0XHRcdGlmICghdGhpcy5jYXJvdXNlbFN0eWxlKSB7XHJcblx0XHRcdFx0dGhpcy5jYXJvdXNlbFN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHRcdFx0XHR0aGlzLmNhcm91c2VsU3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNhcm91c2VsU3R5bGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAjJHt0aGlzLmlkfSAudWktY2Fyb3VzZWwtaXRlbSB7XHJcblx0XHRcdFx0ZmxleDogMSAwICR7ICgxMDAvIHRoaXMubnVtVmlzaWJsZSkgfSVcclxuXHRcdFx0fVxyXG4gICAgICAgIGA7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xyXG5cdFx0XHRcdHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMuc29ydCgoZGF0YTEsIGRhdGEyKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZTEgPSBkYXRhMS5icmVha3BvaW50O1xyXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUyID0gZGF0YTIuYnJlYWtwb2ludDtcclxuXHRcdFx0XHRcdGxldCByZXN1bHQgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRcdGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgIT0gbnVsbClcclxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gLTE7XHJcblx0XHRcdFx0XHRlbHNlIGlmICh2YWx1ZTEgIT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbClcclxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gMTtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxyXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAwO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHZhbHVlMSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlMiA9PT0gJ3N0cmluZycpXHJcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMiwgdW5kZWZpbmVkLCB7IG51bWVyaWM6IHRydWUgfSk7XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAodmFsdWUxID4gdmFsdWUyKSA/IDEgOiAwO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiAtMSAqIHJlc3VsdDtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlc3BvbnNpdmVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRsZXQgcmVzID0gdGhpcy5yZXNwb25zaXZlT3B0aW9uc1tpXTtcclxuXHJcblx0XHRcdFx0XHRpbm5lckhUTUwgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7cmVzLmJyZWFrcG9pbnR9KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICMke3RoaXMuaWR9IC51aS1jYXJvdXNlbC1pdGVtIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEgMCAkeyAoMTAwLyByZXMubnVtVmlzaWJsZSkgfSVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGBcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuY2Fyb3VzZWxTdHlsZS5pbm5lckhUTUwgPSBpbm5lckhUTUw7XHJcblx0XHR9XHJcblxyXG5cdGNhbGN1bGF0ZVBvc2l0aW9uKCkge1xyXG5cdFx0aWYgKHRoaXMuaXRlbXNDb250YWluZXIgJiYgdGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xyXG5cdFx0XHRsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHRcdFx0bGV0IG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHtcclxuXHRcdFx0XHRudW1WaXNpYmxlOiB0aGlzLmRlZmF1bHROdW1WaXNpYmxlLFxyXG5cdFx0XHRcdG51bVNjcm9sbDogdGhpcy5kZWZhdWx0TnVtU2Nyb2xsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRsZXQgcmVzID0gdGhpcy5yZXNwb25zaXZlT3B0aW9uc1tpXTtcclxuXHJcblx0XHRcdFx0aWYgKHBhcnNlSW50KHJlcy5icmVha3BvaW50LCAxMCkgPj0gd2luZG93V2lkdGgpIHtcclxuXHRcdFx0XHRcdG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHJlcztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLl9udW1TY3JvbGwgIT09IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGwpIHtcclxuXHRcdFx0XHRsZXQgcGFnZSA9IHRoaXMuX3BhZ2U7XHJcblx0XHRcdFx0cGFnZSA9IE1hdGguZmxvb3IoKHBhZ2UgKiB0aGlzLl9udW1TY3JvbGwpIC8gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVNjcm9sbCk7XHJcblxyXG5cdFx0XHRcdGxldCB0b3RhbFNoaWZ0ZWRJdGVtcyA9IChtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtU2Nyb2xsICogdGhpcy5wYWdlKSAqIC0xO1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5pc0NpcmN1bGFyKCkpIHtcclxuXHRcdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zIC09IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xyXG5cdFx0XHRcdHRoaXMuX251bVNjcm9sbCA9IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGw7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3BhZ2UgPSBwYWdlO1xyXG5cdFx0XHRcdHRoaXMub25QYWdlLmVtaXQoe1xyXG5cdFx0XHRcdFx0cGFnZTogdGhpcy5wYWdlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLl9udW1WaXNpYmxlICE9PSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtVmlzaWJsZSkge1xyXG5cdFx0XHRcdHRoaXMuX251bVZpc2libGUgPSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtVmlzaWJsZTtcclxuXHRcdFx0XHR0aGlzLnNldENsb25lSXRlbXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRzZXRDbG9uZUl0ZW1zKCkge1xyXG5cdFx0dGhpcy5jbG9uZWRJdGVtc0ZvclN0YXJ0aW5nID0gW107XHJcblx0XHR0aGlzLmNsb25lZEl0ZW1zRm9yRmluaXNoaW5nID0gW107XHJcblx0XHRpZiAodGhpcy5pc0NpcmN1bGFyKCkpIHtcclxuXHRcdFx0dGhpcy5jbG9uZWRJdGVtc0ZvclN0YXJ0aW5nLnB1c2goLi4udGhpcy52YWx1ZS5zbGljZSgtMSAqIHRoaXMuX251bVZpc2libGUpKTtcclxuXHRcdFx0dGhpcy5jbG9uZWRJdGVtc0ZvckZpbmlzaGluZy5wdXNoKC4uLnRoaXMudmFsdWUuc2xpY2UoMCwgdGhpcy5fbnVtVmlzaWJsZSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Zmlyc3RJbmRleCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmlzQ2lyY3VsYXIoKSA/ICgtMSAqICh0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICsgdGhpcy5udW1WaXNpYmxlKSkgOiAodGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAqIC0xKTtcclxuXHR9XHJcblxyXG5cdGxhc3RJbmRleCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmZpcnN0SW5kZXgoKSArIHRoaXMubnVtVmlzaWJsZSAtIDE7XHJcblx0fVxyXG5cclxuXHR0b3RhbERvdHMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy52YWx1ZSA/IE1hdGguY2VpbCgodGhpcy52YWx1ZS5sZW5ndGggLSB0aGlzLl9udW1WaXNpYmxlKSAvIHRoaXMuX251bVNjcm9sbCkgKyAxIDogMDtcclxuXHR9XHJcblxyXG5cdHRvdGFsRG90c0FycmF5KCkge1xyXG5cdFx0Y29uc3QgdG90YWxEb3RzID0gdGhpcy50b3RhbERvdHMoKTtcclxuXHRcdHJldHVybiB0b3RhbERvdHMgPD0gMCA/IFtdIDogQXJyYXkodG90YWxEb3RzKS5maWxsKDApO1xyXG5cdH1cclxuXHJcblx0Y29udGFpbmVyQ2xhc3MoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQndWktY2Fyb3VzZWwgdWktd2lkZ2V0Jzp0cnVlLCBcclxuXHRcdFx0J3VpLWNhcm91c2VsLXZlcnRpY2FsJzogdGhpcy5pc1ZlcnRpY2FsKCksXHJcblx0XHRcdCd1aS1jYXJvdXNlbC1ob3Jpem9udGFsJzogIXRoaXMuaXNWZXJ0aWNhbCgpXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Y29udGVudENsYXNzZXMoKSB7XHJcblx0XHRyZXR1cm4gJ3VpLWNhcm91c2VsLWNvbnRlbnQgJysgdGhpcy5jb250ZW50Q2xhc3M7XHJcblx0fVxyXG5cclxuXHRkb3RzQ29udGVudENsYXNzZXMoKSB7XHJcblx0XHRyZXR1cm4gJ3VpLWNhcm91c2VsLWRvdHMtY29udGFpbmVyIHVpLWhlbHBlci1yZXNldCAnICsgdGhpcy5kb3RzQ29udGFpbmVyQ2xhc3M7XHJcblx0fVxyXG5cclxuXHRpc1ZlcnRpY2FsKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCc7XHJcblx0fVxyXG5cclxuXHRpc0NpcmN1bGFyKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2lyY3VsYXIgJiYgdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA+PSB0aGlzLm51bVZpc2libGU7XHJcblx0fVxyXG5cclxuXHRpc0F1dG9wbGF5KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYXV0b3BsYXlJbnRlcnZhbCAmJiB0aGlzLmFsbG93QXV0b3BsYXk7XHJcblx0fVxyXG5cclxuXHRpc0ZvcndhcmROYXZEaXNhYmxlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmlzRW1wdHkoKSB8fCAodGhpcy5fcGFnZSA+PSAodGhpcy50b3RhbERvdHMoKSAtIDEpICYmICF0aGlzLmlzQ2lyY3VsYXIoKSk7XHJcblx0fVxyXG5cclxuXHRpc0JhY2t3YXJkTmF2RGlzYWJsZWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pc0VtcHR5KCkgfHwgKHRoaXMuX3BhZ2UgPD0gMCAgJiYgIXRoaXMuaXNDaXJjdWxhcigpKTtcclxuXHR9XHJcblxyXG5cdGlzRW1wdHkoKSB7XHJcblx0XHRyZXR1cm4gIXRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZS5sZW5ndGggPT09IDA7XHJcblx0fVxyXG5cclxuXHRuYXZGb3J3YXJkKGUsaW5kZXg/KSB7XHJcblx0XHRpZiAodGhpcy5pc0NpcmN1bGFyKCkgfHwgdGhpcy5fcGFnZSA8ICh0aGlzLnRvdGFsRG90cygpIC0gMSkpIHtcclxuXHRcdFx0dGhpcy5zdGVwKC0xLCBpbmRleCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xyXG5cdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xyXG5cdFx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZSAmJiBlLmNhbmNlbGFibGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmF2QmFja3dhcmQoZSxpbmRleD8pIHtcclxuXHRcdGlmICh0aGlzLmlzQ2lyY3VsYXIoKSB8fCB0aGlzLl9wYWdlICE9PSAwKSB7XHJcblx0XHRcdHRoaXMuc3RlcCgxLCBpbmRleCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xyXG5cdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xyXG5cdFx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKGUgJiYgZS5jYW5jZWxhYmxlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uRG90Q2xpY2soZSwgaW5kZXgpIHtcclxuXHRcdGxldCBwYWdlID0gdGhpcy5fcGFnZTtcclxuXHJcblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XHJcblx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XHJcblx0XHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAoaW5kZXggPiBwYWdlKSB7XHJcblx0XHRcdHRoaXMubmF2Rm9yd2FyZChlLCBpbmRleCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChpbmRleCA8IHBhZ2UpIHtcclxuXHRcdFx0dGhpcy5uYXZCYWNrd2FyZChlLCBpbmRleCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGVwKGRpciwgcGFnZSkge1xyXG5cdFx0bGV0IHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcztcclxuXHRcdGNvbnN0IGlzQ2lyY3VsYXIgPSB0aGlzLmlzQ2lyY3VsYXIoKTtcclxuXHJcblx0XHRpZiAocGFnZSAhPSBudWxsKSB7XHJcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zID0gKHRoaXMuX251bVNjcm9sbCAqIHBhZ2UpICogLTE7XHJcblxyXG5cdFx0XHRpZiAoaXNDaXJjdWxhcikge1xyXG5cdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zIC09IHRoaXMuX251bVZpc2libGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gKHRoaXMuX251bVNjcm9sbCAqIGRpcik7XHJcblx0XHRcdGlmICh0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCkge1xyXG5cdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zICs9IHRoaXMucmVtYWluaW5nSXRlbXMgLSAodGhpcy5fbnVtU2Nyb2xsICogZGlyKTtcclxuXHRcdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgb3JpZ2luYWxTaGlmdGVkSXRlbXMgPSBpc0NpcmN1bGFyID8gKHRvdGFsU2hpZnRlZEl0ZW1zICsgdGhpcy5fbnVtVmlzaWJsZSkgOiB0b3RhbFNoaWZ0ZWRJdGVtcztcclxuXHRcdFx0cGFnZSA9IE1hdGguYWJzKE1hdGguZmxvb3IoKG9yaWdpbmFsU2hpZnRlZEl0ZW1zIC8gdGhpcy5fbnVtU2Nyb2xsKSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpc0NpcmN1bGFyICYmIHRoaXMucGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSAmJiBkaXIgPT09IC0xKSB7XHJcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zID0gLTEgKiAodGhpcy52YWx1ZS5sZW5ndGggKyB0aGlzLl9udW1WaXNpYmxlKTtcclxuXHRcdFx0cGFnZSA9IDA7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChpc0NpcmN1bGFyICYmIHRoaXMucGFnZSA9PT0gMCAmJiBkaXIgPT09IDEpIHtcclxuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAwO1xyXG5cdFx0XHRwYWdlID0gKHRoaXMudG90YWxEb3RzKCkgLSAxKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgdGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcclxuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gKCh0aGlzLnJlbWFpbmluZ0l0ZW1zICogLTEpIC0gKHRoaXMuX251bVNjcm9sbCAqIGRpcikpO1xyXG5cdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaXRlbXNDb250YWluZXIpIHtcclxuXHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDAsIDApYDtcclxuXHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAndHJhbnNmb3JtIDUwMG1zIGVhc2UgMHMnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcclxuXHRcdHRoaXMuX3BhZ2UgPSBwYWdlO1xyXG5cdFx0dGhpcy5vblBhZ2UuZW1pdCh7XHJcblx0XHRcdHBhZ2U6IHRoaXMucGFnZVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGFydEF1dG9wbGF5KCkge1xyXG5cdFx0dGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMudG90YWxEb3RzKCkgPiAwKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zdGVwKC0xLCAwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnN0ZXAoLTEsIHRoaXMucGFnZSArIDEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSwgXHJcblx0XHR0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpO1xyXG5cdH1cclxuXHJcblx0c3RvcEF1dG9wbGF5KCkge1xyXG5cdFx0aWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuXHRcdGlmICh0aGlzLml0ZW1zQ29udGFpbmVyKSB7XHJcblx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJyc7XHJcblxyXG5cdFx0XHRpZiAoKHRoaXMucGFnZSA9PT0gMCB8fCB0aGlzLnBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkpICYmIHRoaXMuaXNDaXJjdWxhcigpKSB7XHJcblx0XHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDApYCA6IGB0cmFuc2xhdGUzZCgke3RoaXMudG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uVG91Y2hTdGFydChlKSB7XHJcblx0XHRsZXQgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xyXG5cclxuXHRcdHRoaXMuc3RhcnRQb3MgPSB7XHJcblx0XHRcdHg6IHRvdWNob2JqLnBhZ2VYLFxyXG5cdFx0XHR5OiB0b3VjaG9iai5wYWdlWVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdG9uVG91Y2hNb3ZlKGUpIHtcclxuXHRcdGlmIChlLmNhbmNlbGFibGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRvblRvdWNoRW5kKGUpIHtcclxuXHRcdGxldCB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XHJcblxyXG5cdFx0aWYgKHRoaXMuaXNWZXJ0aWNhbCgpKSB7XHJcblx0XHRcdHRoaXMuY2hhbmdlUGFnZU9uVG91Y2goZSwgKHRvdWNob2JqLnBhZ2VZIC0gdGhpcy5zdGFydFBvcy55KSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5jaGFuZ2VQYWdlT25Ub3VjaChlLCAodG91Y2hvYmoucGFnZVggLSB0aGlzLnN0YXJ0UG9zLngpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNoYW5nZVBhZ2VPblRvdWNoKGUsIGRpZmYpIHtcclxuXHRcdGlmIChNYXRoLmFicyhkaWZmKSA+IHRoaXMuc3dpcGVUaHJlc2hvbGQpIHtcclxuXHRcdFx0aWYgKGRpZmYgPCAwKSB7XHJcblx0XHRcdFx0dGhpcy5uYXZGb3J3YXJkKGUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMubmF2QmFja3dhcmQoZSk7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRiaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKSB7XHJcblx0XHRpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xyXG5cdFx0XHR0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSAoZSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dW5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKSB7XHJcblx0XHRpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XHJcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xyXG5cdFx0XHR0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmdPbkRlc3Ryb3koKSB7XHJcblx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLnVuYmluZERvY3VtZW50TGlzdGVuZXJzKCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XHJcblx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG5cdGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZV0sXHJcblx0ZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgQ2Fyb3VzZWwsIFNoYXJlZE1vZHVsZV0sXHJcblx0ZGVjbGFyYXRpb25zOiBbQ2Fyb3VzZWxdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbE1vZHVsZSB7IH1cclxuIl19