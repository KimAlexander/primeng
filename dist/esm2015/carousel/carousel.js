var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Input, ElementRef, ViewChild, AfterContentInit, TemplateRef, ContentChildren, QueryList, NgModule, NgZone, EventEmitter, Output, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { PrimeTemplate, SharedModule, Header, Footer } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UniqueComponentId } from 'primeng/utils';
let Carousel = class Carousel {
    constructor(el, zone) {
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
    get page() {
        return this._page;
    }
    set page(val) {
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
    }
    get numVisible() {
        return this._numVisible;
    }
    set numVisible(val) {
        this._numVisible = val;
    }
    get numScroll() {
        return this._numVisible;
    }
    set numScroll(val) {
        this._numScroll = val;
    }
    get value() {
        return this._value;
    }
    ;
    set value(val) {
        this._value = val;
        if (this.circular && this._value) {
            this.setCloneItems();
        }
    }
    ngAfterContentInit() {
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
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterContentChecked() {
        const isCircular = this.isCircular();
        let totalShiftedItems = this.totalShiftedItems;
        if (this.value && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
            this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;
            let page = this._page;
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
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
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
    }
    createStyle() {
        if (!this.carouselStyle) {
            this.carouselStyle = document.createElement('style');
            this.carouselStyle.type = 'text/css';
            document.body.appendChild(this.carouselStyle);
        }
        let innerHTML = `
            #${this.id} .ui-carousel-item {
				flex: 1 0 ${(100 / this.numVisible)}%
			}
        `;
        if (this.responsiveOptions) {
            this.responsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;
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
            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];
                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .ui-carousel-item {
                            flex: 1 0 ${(100 / res.numVisible)}%
                        }
                    }
                `;
            }
        }
        this.carouselStyle.innerHTML = innerHTML;
    }
    calculatePosition() {
        if (this.itemsContainer && this.responsiveOptions) {
            let windowWidth = window.innerWidth;
            let matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };
            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this._numScroll !== matchedResponsiveData.numScroll) {
                let page = this._page;
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);
                let totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;
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
    }
    setCloneItems() {
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
        if (this.isCircular()) {
            this.clonedItemsForStarting.push(...this.value.slice(-1 * this._numVisible));
            this.clonedItemsForFinishing.push(...this.value.slice(0, this._numVisible));
        }
    }
    firstIndex() {
        return this.isCircular() ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
    }
    lastIndex() {
        return this.firstIndex() + this.numVisible - 1;
    }
    totalDots() {
        return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    }
    totalDotsArray() {
        const totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array(totalDots).fill(0);
    }
    containerClass() {
        return {
            'ui-carousel ui-widget': true,
            'ui-carousel-vertical': this.isVertical(),
            'ui-carousel-horizontal': !this.isVertical()
        };
    }
    contentClasses() {
        return 'ui-carousel-content ' + this.contentClass;
    }
    dotsContentClasses() {
        return 'ui-carousel-dots-container ui-helper-reset ' + this.dotsContainerClass;
    }
    isVertical() {
        return this.orientation === 'vertical';
    }
    isCircular() {
        return this.circular && this.value && this.value.length >= this.numVisible;
    }
    isAutoplay() {
        return this.autoplayInterval && this.allowAutoplay;
    }
    isForwardNavDisabled() {
        return this.isEmpty() || (this._page >= (this.totalDots() - 1) && !this.isCircular());
    }
    isBackwardNavDisabled() {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
    }
    isEmpty() {
        return !this.value || this.value.length === 0;
    }
    navForward(e, index) {
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
    }
    navBackward(e, index) {
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
    }
    onDotClick(e, index) {
        let page = this._page;
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
    }
    step(dir, page) {
        let totalShiftedItems = this.totalShiftedItems;
        const isCircular = this.isCircular();
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
            let originalShiftedItems = isCircular ? (totalShiftedItems + this._numVisible) : totalShiftedItems;
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
            this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.onPage.emit({
            page: this.page
        });
    }
    startAutoplay() {
        this.interval = setInterval(() => {
            if (this.totalDots() > 0) {
                if (this.page === (this.totalDots() - 1)) {
                    this.step(-1, 0);
                }
                else {
                    this.step(-1, this.page + 1);
                }
            }
        }, this.autoplayInterval);
    }
    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    onTransitionEnd() {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';
            if ((this.page === 0 || this.page === (this.totalDots() - 1)) && this.isCircular()) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${this.totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${this.totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            }
        }
    }
    onTouchStart(e) {
        let touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }
    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];
        if (this.isVertical()) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    }
    changePageOnTouch(e, diff) {
        if (Math.abs(diff) > this.swipeThreshold) {
            if (diff < 0) {
                this.navForward(e);
            }
            else {
                this.navBackward(e);
            }
        }
    }
    bindDocumentListeners() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = (e) => {
                this.calculatePosition();
            };
            window.addEventListener('resize', this.documentResizeListener);
        }
    }
    unbindDocumentListeners() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    }
};
Carousel.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
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
        template: `
		<div [attr.id]="id" [ngClass]="containerClass()" [ngStyle]="style" [class]="styleClass">
			<div class="ui-carousel-header" *ngIf="headerFacet">
				<ng-content select="p-header"></ng-content>
			</div>
			<div [class]="contentClasses()">
				<div class="ui-carousel-container">
					<button [ngClass]="{'ui-carousel-prev ui-button ui-widget ui-state-default ui-corner-all':true, 'ui-state-disabled': isBackwardNavDisabled()}" [disabled]="isBackwardNavDisabled()" (click)="navBackward($event)">
						<span [ngClass]="{'ui-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}"></span>
					</button>
					<div class="ui-carousel-items-content" [ngStyle]="{'height': isVertical() ? verticalViewPortHeight : 'auto'}">
						<div #itemsContainer class="ui-carousel-items-container" (transitionend)="onTransitionEnd()" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
							<div *ngFor="let item of clonedItemsForStarting; let index = index" [ngClass]= "{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': (totalShiftedItems * -1) === (value.length),
							'ui-carousel-item-start': 0 === index,
							'ui-carousel-item-end': (clonedItemsForStarting.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
							<div *ngFor="let item of value; let index = index" [ngClass]= "{'ui-carousel-item': true,'ui-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),
							'ui-carousel-item-start': firstIndex() === index,
							'ui-carousel-item-end': lastIndex() === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
							<div *ngFor="let item of clonedItemsForFinishing; let index = index" [ngClass]= "{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': ((totalShiftedItems *-1) === numVisible),
							'ui-carousel-item-start': 0 === index,
							'ui-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
						</div>
					</div>
					<button [ngClass]="{'ui-carousel-next ui-button ui-widget ui-state-default ui-corner-all': true, 'ui-state-disabled': isForwardNavDisabled()}" [disabled]="isForwardNavDisabled()" (click)="navForward($event)">
						<span [ngClass]="{'ui-carousel-next-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}"></span>
					</button>
				</div>
				<ul [class]="dotsContentClasses()">
					<li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{'ui-carousel-dot-item':true,'ui-state-highlight': _page === i}">
						<button class="ui-button ui-widget ui-state-default ui-corner-all" (click)="onDotClick($event, i)">
							<span [ngClass]="{'ui-carousel-dot-icon pi':true, 'pi-circle-on': _page === i, 'pi-circle-off': !(_page === i)}"></span>
						</button>
					</li>
				</ul>
			</div>
			<div class="ui-carousel-footer" *ngIf="footerFacet">
				<ng-content select="p-footer"></ng-content>
			</div>
		</div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Carousel);
export { Carousel };
let CarouselModule = class CarouselModule {
};
CarouselModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        exports: [CommonModule, Carousel, SharedModule],
        declarations: [Carousel]
    })
], CarouselModule);
export { CarouselModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2Nhcm91c2VsLyIsInNvdXJjZXMiOlsiY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xOLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQW9EbEQsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQWlJcEIsWUFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUExRjdDLGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBRTNCLDJCQUFzQixHQUFHLE9BQU8sQ0FBQztRQUVqQyxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFZaEMsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUV6QixxQkFBZ0IsR0FBVSxDQUFDLENBQUM7UUFNeEIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBVTVELGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsY0FBUyxHQUFRO1lBQ2hCLFNBQVMsRUFBQyxDQUFDO1lBQ1gsVUFBVSxF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O0FBQWxCLGNBQWM7SUFMMUIsUUFBUSxDQUFDO1FBQ1QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztRQUNyQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQztRQUMvQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDeEIsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIE5nTW9kdWxlLCBOZ1pvbmUsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBDb250ZW50Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSwgSGVhZGVyLCBGb290ZXIgfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ3AtY2Fyb3VzZWwnLFxyXG5cdHRlbXBsYXRlOiBgXHJcblx0XHQ8ZGl2IFthdHRyLmlkXT1cImlkXCIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cInVpLWNhcm91c2VsLWhlYWRlclwiICpuZ0lmPVwiaGVhZGVyRmFjZXRcIj5cclxuXHRcdFx0XHQ8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgW2NsYXNzXT1cImNvbnRlbnRDbGFzc2VzKClcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidWktY2Fyb3VzZWwtY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtcHJldiB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6dHJ1ZSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogaXNCYWNrd2FyZE5hdkRpc2FibGVkKCl9XCIgW2Rpc2FibGVkXT1cImlzQmFja3dhcmROYXZEaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKCRldmVudClcIj5cclxuXHRcdFx0XHRcdFx0PHNwYW4gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1wcmV2LWljb24gcGknOiB0cnVlLCAncGktY2hldnJvbi1sZWZ0JzogIWlzVmVydGljYWwoKSwgJ3BpLWNoZXZyb24tdXAnOiBpc1ZlcnRpY2FsKCl9XCI+PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidWktY2Fyb3VzZWwtaXRlbXMtY29udGVudFwiIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaXNWZXJ0aWNhbCgpID8gdmVydGljYWxWaWV3UG9ydEhlaWdodCA6ICdhdXRvJ31cIj5cclxuXHRcdFx0XHRcdFx0PGRpdiAjaXRlbXNDb250YWluZXIgY2xhc3M9XCJ1aS1jYXJvdXNlbC1pdGVtcy1jb250YWluZXJcIiAodHJhbnNpdGlvbmVuZCk9XCJvblRyYW5zaXRpb25FbmQoKVwiICh0b3VjaGVuZCk9XCJvblRvdWNoRW5kKCRldmVudClcIiAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50KVwiICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgY2xvbmVkSXRlbXNGb3JTdGFydGluZzsgbGV0IGluZGV4ID0gaW5kZXhcIiBbbmdDbGFzc109IFwieyd1aS1jYXJvdXNlbC1pdGVtIHVpLWNhcm91c2VsLWl0ZW0tY2xvbmVkJzogdHJ1ZSwndWktY2Fyb3VzZWwtaXRlbS1hY3RpdmUnOiAodG90YWxTaGlmdGVkSXRlbXMgKiAtMSkgPT09ICh2YWx1ZS5sZW5ndGgpLFxyXG5cdFx0XHRcdFx0XHRcdCd1aS1jYXJvdXNlbC1pdGVtLXN0YXJ0JzogMCA9PT0gaW5kZXgsXHJcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tZW5kJzogKGNsb25lZEl0ZW1zRm9yU3RhcnRpbmcubGVuZ3RoIC0gMSkgPT09IGluZGV4fVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIHZhbHVlOyBsZXQgaW5kZXggPSBpbmRleFwiIFtuZ0NsYXNzXT0gXCJ7J3VpLWNhcm91c2VsLWl0ZW0nOiB0cnVlLCd1aS1jYXJvdXNlbC1pdGVtLWFjdGl2ZSc6IChmaXJzdEluZGV4KCkgPD0gaW5kZXggJiYgbGFzdEluZGV4KCkgPj0gaW5kZXgpLFxyXG5cdFx0XHRcdFx0XHRcdCd1aS1jYXJvdXNlbC1pdGVtLXN0YXJ0JzogZmlyc3RJbmRleCgpID09PSBpbmRleCxcclxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1lbmQnOiBsYXN0SW5kZXgoKSA9PT0gaW5kZXh9XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmc7IGxldCBpbmRleCA9IGluZGV4XCIgW25nQ2xhc3NdPSBcInsndWktY2Fyb3VzZWwtaXRlbSB1aS1jYXJvdXNlbC1pdGVtLWNsb25lZCc6IHRydWUsJ3VpLWNhcm91c2VsLWl0ZW0tYWN0aXZlJzogKCh0b3RhbFNoaWZ0ZWRJdGVtcyAqLTEpID09PSBudW1WaXNpYmxlKSxcclxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1zdGFydCc6IDAgPT09IGluZGV4LFxyXG5cdFx0XHRcdFx0XHRcdCd1aS1jYXJvdXNlbC1pdGVtLWVuZCc6IChjbG9uZWRJdGVtc0ZvckZpbmlzaGluZy5sZW5ndGggLSAxKSA9PT0gaW5kZXh9XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsLW5leHQgdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktc3RhdGUtZGlzYWJsZWQnOiBpc0ZvcndhcmROYXZEaXNhYmxlZCgpfVwiIFtkaXNhYmxlZF09XCJpc0ZvcndhcmROYXZEaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm5hdkZvcndhcmQoJGV2ZW50KVwiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsLW5leHQtaWNvbiBwaSc6IHRydWUsICdwaS1jaGV2cm9uLXJpZ2h0JzogIWlzVmVydGljYWwoKSwgJ3BpLWNoZXZyb24tZG93bic6IGlzVmVydGljYWwoKX1cIj48L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8dWwgW2NsYXNzXT1cImRvdHNDb250ZW50Q2xhc3NlcygpXCI+XHJcblx0XHRcdFx0XHQ8bGkgKm5nRm9yPVwibGV0IHRvdGFsRG90IG9mIHRvdGFsRG90c0FycmF5KCk7IGxldCBpID0gaW5kZXhcIiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsLWRvdC1pdGVtJzp0cnVlLCd1aS1zdGF0ZS1oaWdobGlnaHQnOiBfcGFnZSA9PT0gaX1cIj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cInVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgKGNsaWNrKT1cIm9uRG90Q2xpY2soJGV2ZW50LCBpKVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtZG90LWljb24gcGknOnRydWUsICdwaS1jaXJjbGUtb24nOiBfcGFnZSA9PT0gaSwgJ3BpLWNpcmNsZS1vZmYnOiAhKF9wYWdlID09PSBpKX1cIj48L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cInVpLWNhcm91c2VsLWZvb3RlclwiICpuZ0lmPVwiZm9vdGVyRmFjZXRcIj5cclxuXHRcdFx0XHQ8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG5cdEBJbnB1dCgpIGdldCBwYWdlKCk6bnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl9wYWdlO1xyXG5cdH1cclxuXHRzZXQgcGFnZSh2YWw6bnVtYmVyKSB7XHJcblx0XHRpZiAodGhpcy5pc0NyZWF0ZWQgJiYgdmFsICE9PSB0aGlzLl9wYWdlKSB7XHJcblx0XHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcclxuXHRcdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xyXG5cdFx0XHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodmFsID4gdGhpcy5fcGFnZSAmJiB2YWwgPCAodGhpcy50b3RhbERvdHMoKSAtIDEpKSB7XHJcblx0XHRcdFx0dGhpcy5zdGVwKC0xLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHZhbCA8IHRoaXMuX3BhZ2UgJiYgdmFsICE9PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5zdGVwKDEsIHZhbCk7XHJcblx0XHRcdH1cclxuXHRcdH0gXHJcblxyXG5cdFx0dGhpcy5fcGFnZSA9IHZhbDtcclxuXHR9XHJcblx0XHRcclxuXHRASW5wdXQoKSBnZXQgbnVtVmlzaWJsZSgpOm51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbnVtVmlzaWJsZTtcclxuXHR9XHJcblx0c2V0IG51bVZpc2libGUodmFsOm51bWJlcikge1xyXG5cdFx0dGhpcy5fbnVtVmlzaWJsZSA9IHZhbDtcclxuXHR9XHJcblx0XHRcclxuXHRASW5wdXQoKSBnZXQgbnVtU2Nyb2xsKCk6bnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl9udW1WaXNpYmxlO1xyXG5cdH1cclxuXHRzZXQgbnVtU2Nyb2xsKHZhbDpudW1iZXIpIHtcclxuXHRcdHRoaXMuX251bVNjcm9sbCA9IHZhbDtcclxuXHR9XHJcblx0XHJcblx0QElucHV0KCkgcmVzcG9uc2l2ZU9wdGlvbnM6IGFueVtdO1xyXG5cdFxyXG5cdEBJbnB1dCgpIG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCI7XHJcblx0XHJcblx0QElucHV0KCkgdmVydGljYWxWaWV3UG9ydEhlaWdodCA9IFwiMzAwcHhcIjtcclxuXHRcclxuXHRASW5wdXQoKSBjb250ZW50Q2xhc3M6IFN0cmluZyA9IFwiXCI7XHJcblxyXG5cdEBJbnB1dCgpIGRvdHNDb250YWluZXJDbGFzczogU3RyaW5nID0gXCJcIjtcclxuXHJcblx0QElucHV0KCkgZ2V0IHZhbHVlKCkgOmFueVtdIHtcclxuXHRcdHJldHVybiB0aGlzLl92YWx1ZTtcclxuXHR9O1xyXG5cdHNldCB2YWx1ZSh2YWwpIHtcclxuXHRcdHRoaXMuX3ZhbHVlID0gdmFsO1xyXG5cdFx0aWYgKHRoaXMuY2lyY3VsYXIgJiYgdGhpcy5fdmFsdWUpIHtcclxuXHRcdFx0dGhpcy5zZXRDbG9uZUl0ZW1zKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdEBJbnB1dCgpIGNpcmN1bGFyOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0QElucHV0KCkgYXV0b3BsYXlJbnRlcnZhbDpudW1iZXIgPSAwO1xyXG5cclxuXHRASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuXHRASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblx0XHJcbiAgICBAT3V0cHV0KCkgb25QYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0QFZpZXdDaGlsZCgnaXRlbXNDb250YWluZXInKSBpdGVtc0NvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuXHJcblx0QENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlckZhY2V0O1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXJGYWNldDtcclxuXHJcblx0QENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG5cclxuXHRfbnVtVmlzaWJsZTogbnVtYmVyID0gMTtcclxuXHJcblx0X251bVNjcm9sbDogbnVtYmVyID0gMTtcclxuXHJcblx0X29sZE51bVNjcm9sbDogbnVtYmVyID0gMDtcclxuXHJcblx0cHJldlN0YXRlOiBhbnkgPSB7XHJcblx0XHRudW1TY3JvbGw6MCxcclxuXHRcdG51bVZpc2libGU6MCxcclxuXHRcdHZhbHVlOiBbXVxyXG5cdH07XHJcblxyXG5cdGRlZmF1bHROdW1TY3JvbGw6bnVtYmVyID0gMTtcclxuXHJcblx0ZGVmYXVsdE51bVZpc2libGU6bnVtYmVyID0gMTtcclxuXHJcblx0X3BhZ2U6IG51bWJlciA9IDA7XHJcblxyXG5cdF92YWx1ZTogYW55W107XHJcblxyXG5cdGNhcm91c2VsU3R5bGU6YW55O1xyXG5cclxuXHRpZDpzdHJpbmc7XHJcblxyXG5cdHRvdGFsU2hpZnRlZEl0ZW1zO1xyXG5cclxuXHRpc1JlbWFpbmluZ0l0ZW1zQWRkZWQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRhbmltYXRpb25UaW1lb3V0OmFueTtcclxuXHJcblx0dHJhbnNsYXRlVGltZW91dDphbnk7XHJcblxyXG5cdHJlbWFpbmluZ0l0ZW1zOiBudW1iZXIgPSAwO1xyXG5cclxuXHRfaXRlbXM6IGFueVtdO1xyXG5cclxuXHRzdGFydFBvczogYW55O1xyXG5cclxuXHRkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XHJcblxyXG5cdGNsb25lZEl0ZW1zRm9yU3RhcnRpbmc6IGFueVtdO1xyXG5cclxuXHRjbG9uZWRJdGVtc0ZvckZpbmlzaGluZzogYW55W107XHJcblxyXG5cdGFsbG93QXV0b3BsYXk6IGJvb2xlYW47XHJcblxyXG5cdGludGVydmFsOiBhbnk7XHJcblxyXG5cdGlzQ3JlYXRlZDogYm9vbGVhbjtcclxuXHJcblx0c3dpcGVUaHJlc2hvbGQ6IG51bWJlciA9IDIwO1xyXG5cclxuXHRwdWJsaWMgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHsgXHJcblx0XHR0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy5wYWdlICogdGhpcy5udW1TY3JvbGwgKiAtMTsgXHJcblx0fVxyXG5cclxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcblx0XHR0aGlzLmlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcclxuXHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9ICEhdGhpcy5hdXRvcGxheUludGVydmFsO1xyXG5cclxuXHRcdGlmICh0aGlzLmNpcmN1bGFyKSB7XHJcblx0XHRcdHRoaXMuc2V0Q2xvbmVJdGVtcygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuZGVmYXVsdE51bVNjcm9sbCA9IHRoaXMuX251bVNjcm9sbDtcclxuXHRcdFx0dGhpcy5kZWZhdWx0TnVtVmlzaWJsZSA9IHRoaXMuX251bVZpc2libGU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jcmVhdGVTdHlsZSgpO1xyXG5cdFx0dGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xyXG5cclxuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuYmluZERvY3VtZW50TGlzdGVuZXJzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cdFx0XHRzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcblx0XHRcdFx0Y2FzZSAnaXRlbSc6XHJcblx0XHRcdFx0XHR0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcclxuXHRcdGNvbnN0IGlzQ2lyY3VsYXIgPSB0aGlzLmlzQ2lyY3VsYXIoKTtcclxuXHRcdGxldCB0b3RhbFNoaWZ0ZWRJdGVtcyA9IHRoaXMudG90YWxTaGlmdGVkSXRlbXM7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLnZhbHVlICYmICh0aGlzLnByZXZTdGF0ZS5udW1TY3JvbGwgIT09IHRoaXMuX251bVNjcm9sbCB8fCB0aGlzLnByZXZTdGF0ZS5udW1WaXNpYmxlICE9PSB0aGlzLl9udW1WaXNpYmxlIHx8IHRoaXMucHJldlN0YXRlLnZhbHVlLmxlbmd0aCAhPT0gdGhpcy52YWx1ZS5sZW5ndGgpKSB7XHJcblx0XHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcclxuXHRcdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnJlbWFpbmluZ0l0ZW1zID0gKHRoaXMudmFsdWUubGVuZ3RoIC0gdGhpcy5fbnVtVmlzaWJsZSkgJSB0aGlzLl9udW1TY3JvbGw7XHJcblxyXG5cdFx0XHRsZXQgcGFnZSA9IHRoaXMuX3BhZ2U7XHJcblx0XHRcdGlmICh0aGlzLnRvdGFsRG90cygpICE9PSAwICYmIHBhZ2UgPj0gdGhpcy50b3RhbERvdHMoKSkge1xyXG4gICAgICAgICAgICAgICAgcGFnZSA9IHRoaXMudG90YWxEb3RzKCkgLSAxO1xyXG5cdFx0XHRcdHRoaXMuX3BhZ2UgPSBwYWdlO1xyXG5cdFx0XHRcdHRoaXMub25QYWdlLmVtaXQoe1xyXG5cdFx0XHRcdFx0cGFnZTogdGhpcy5wYWdlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zID0gKHBhZ2UgKiB0aGlzLl9udW1TY3JvbGwpICogLTE7XHJcbiAgICAgICAgICAgIGlmIChpc0NpcmN1bGFyKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyAtPSB0aGlzLl9udW1WaXNpYmxlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cdFx0XHRpZiAocGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSAmJiB0aGlzLnJlbWFpbmluZ0l0ZW1zID4gMCkge1xyXG5cdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zICs9ICgtMSAqIHRoaXMucmVtYWluaW5nSXRlbXMpICsgdGhpcy5fbnVtU2Nyb2xsO1xyXG5cdFx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodG90YWxTaGlmdGVkSXRlbXMgIT09IHRoaXMudG90YWxTaGlmdGVkSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcclxuICAgICAgICAgICAgfVxyXG5cclxuXHRcdFx0dGhpcy5fb2xkTnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xyXG5cdFx0XHR0aGlzLnByZXZTdGF0ZS5udW1TY3JvbGwgPSB0aGlzLl9udW1TY3JvbGw7XHJcblx0XHRcdHRoaXMucHJldlN0YXRlLm51bVZpc2libGUgPSB0aGlzLl9udW1WaXNpYmxlO1xyXG5cdFx0XHR0aGlzLnByZXZTdGF0ZS52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudG90YWxEb3RzKCkgPiAwICYmIHRoaXMuaXRlbXNDb250YWluZXIgJiYgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50KSB7XHJcblx0XHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDAsIDApYDtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5pc0NyZWF0ZWQgPSB0cnVlO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCAmJiB0aGlzLmlzQXV0b3BsYXkoKSkge1xyXG5cdFx0XHRcdHRoaXMuc3RhcnRBdXRvcGxheSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlzQ2lyY3VsYXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAtMSAqIHRoaXMuX251bVZpc2libGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodG90YWxTaGlmdGVkSXRlbXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gLTEgKiB0aGlzLnZhbHVlLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlbWFpbmluZ0l0ZW1zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRvdGFsU2hpZnRlZEl0ZW1zICE9PSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zKSB7XHJcblx0XHRcdFx0dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xyXG4gICAgICAgICAgICB9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVTdHlsZSgpIHtcclxuXHRcdFx0aWYgKCF0aGlzLmNhcm91c2VsU3R5bGUpIHtcclxuXHRcdFx0XHR0aGlzLmNhcm91c2VsU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG5cdFx0XHRcdHRoaXMuY2Fyb3VzZWxTdHlsZS50eXBlID0gJ3RleHQvY3NzJztcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2Fyb3VzZWxTdHlsZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBpbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICMke3RoaXMuaWR9IC51aS1jYXJvdXNlbC1pdGVtIHtcclxuXHRcdFx0XHRmbGV4OiAxIDAgJHsgKDEwMC8gdGhpcy5udW1WaXNpYmxlKSB9JVxyXG5cdFx0XHR9XHJcbiAgICAgICAgYDtcclxuXHJcblx0XHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XHJcblx0XHRcdFx0dGhpcy5yZXNwb25zaXZlT3B0aW9ucy5zb3J0KChkYXRhMSwgZGF0YTIpID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlMSA9IGRhdGExLmJyZWFrcG9pbnQ7XHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZTIgPSBkYXRhMi5icmVha3BvaW50O1xyXG5cdFx0XHRcdFx0bGV0IHJlc3VsdCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKVxyXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAtMTtcclxuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxyXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAxO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpXHJcblx0XHRcdFx0XHRcdHJlc3VsdCA9IDA7XHJcblx0XHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUyID09PSAnc3RyaW5nJylcclxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdmFsdWUxLmxvY2FsZUNvbXBhcmUodmFsdWUyLCB1bmRlZmluZWQsIHsgbnVtZXJpYzogdHJ1ZSB9KTtcclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gKHZhbHVlMSA8IHZhbHVlMikgPyAtMSA6ICh2YWx1ZTEgPiB2YWx1ZTIpID8gMSA6IDA7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIC0xICogcmVzdWx0O1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGxldCByZXMgPSB0aGlzLnJlc3BvbnNpdmVPcHRpb25zW2ldO1xyXG5cclxuXHRcdFx0XHRcdGlubmVySFRNTCArPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtyZXMuYnJlYWtwb2ludH0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIyR7dGhpcy5pZH0gLnVpLWNhcm91c2VsLWl0ZW0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogMSAwICR7ICgxMDAvIHJlcy5udW1WaXNpYmxlKSB9JVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5jYXJvdXNlbFN0eWxlLmlubmVySFRNTCA9IGlubmVySFRNTDtcclxuXHRcdH1cclxuXHJcblx0Y2FsY3VsYXRlUG9zaXRpb24oKSB7XHJcblx0XHRpZiAodGhpcy5pdGVtc0NvbnRhaW5lciAmJiB0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XHJcblx0XHRcdGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cdFx0XHRsZXQgbWF0Y2hlZFJlc3BvbnNpdmVEYXRhID0ge1xyXG5cdFx0XHRcdG51bVZpc2libGU6IHRoaXMuZGVmYXVsdE51bVZpc2libGUsXHJcblx0XHRcdFx0bnVtU2Nyb2xsOiB0aGlzLmRlZmF1bHROdW1TY3JvbGxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZXNwb25zaXZlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCByZXMgPSB0aGlzLnJlc3BvbnNpdmVPcHRpb25zW2ldO1xyXG5cclxuXHRcdFx0XHRpZiAocGFyc2VJbnQocmVzLmJyZWFrcG9pbnQsIDEwKSA+PSB3aW5kb3dXaWR0aCkge1xyXG5cdFx0XHRcdFx0bWF0Y2hlZFJlc3BvbnNpdmVEYXRhID0gcmVzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuX251bVNjcm9sbCAhPT0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVNjcm9sbCkge1xyXG5cdFx0XHRcdGxldCBwYWdlID0gdGhpcy5fcGFnZTtcclxuXHRcdFx0XHRwYWdlID0gTWF0aC5mbG9vcigocGFnZSAqIHRoaXMuX251bVNjcm9sbCkgLyBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtU2Nyb2xsKTtcclxuXHJcblx0XHRcdFx0bGV0IHRvdGFsU2hpZnRlZEl0ZW1zID0gKG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGwgKiB0aGlzLnBhZ2UpICogLTE7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLmlzQ2lyY3VsYXIoKSkge1xyXG5cdFx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgLT0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVZpc2libGU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XHJcblx0XHRcdFx0dGhpcy5fbnVtU2Nyb2xsID0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVNjcm9sbDtcclxuXHJcblx0XHRcdFx0dGhpcy5fcGFnZSA9IHBhZ2U7XHJcblx0XHRcdFx0dGhpcy5vblBhZ2UuZW1pdCh7XHJcblx0XHRcdFx0XHRwYWdlOiB0aGlzLnBhZ2VcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuX251bVZpc2libGUgIT09IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlKSB7XHJcblx0XHRcdFx0dGhpcy5fbnVtVmlzaWJsZSA9IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlO1xyXG5cdFx0XHRcdHRoaXMuc2V0Q2xvbmVJdGVtcygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHNldENsb25lSXRlbXMoKSB7XHJcblx0XHR0aGlzLmNsb25lZEl0ZW1zRm9yU3RhcnRpbmcgPSBbXTtcclxuXHRcdHRoaXMuY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmcgPSBbXTtcclxuXHRcdGlmICh0aGlzLmlzQ2lyY3VsYXIoKSkge1xyXG5cdFx0XHR0aGlzLmNsb25lZEl0ZW1zRm9yU3RhcnRpbmcucHVzaCguLi50aGlzLnZhbHVlLnNsaWNlKC0xICogdGhpcy5fbnVtVmlzaWJsZSkpO1xyXG5cdFx0XHR0aGlzLmNsb25lZEl0ZW1zRm9yRmluaXNoaW5nLnB1c2goLi4udGhpcy52YWx1ZS5zbGljZSgwLCB0aGlzLl9udW1WaXNpYmxlKSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmaXJzdEluZGV4KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaXNDaXJjdWxhcigpID8gKC0xICogKHRoaXMudG90YWxTaGlmdGVkSXRlbXMgKyB0aGlzLm51bVZpc2libGUpKSA6ICh0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICogLTEpO1xyXG5cdH1cclxuXHJcblx0bGFzdEluZGV4KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZmlyc3RJbmRleCgpICsgdGhpcy5udW1WaXNpYmxlIC0gMTtcclxuXHR9XHJcblxyXG5cdHRvdGFsRG90cygpIHtcclxuXHRcdHJldHVybiB0aGlzLnZhbHVlID8gTWF0aC5jZWlsKCh0aGlzLnZhbHVlLmxlbmd0aCAtIHRoaXMuX251bVZpc2libGUpIC8gdGhpcy5fbnVtU2Nyb2xsKSArIDEgOiAwO1xyXG5cdH1cclxuXHJcblx0dG90YWxEb3RzQXJyYXkoKSB7XHJcblx0XHRjb25zdCB0b3RhbERvdHMgPSB0aGlzLnRvdGFsRG90cygpO1xyXG5cdFx0cmV0dXJuIHRvdGFsRG90cyA8PSAwID8gW10gOiBBcnJheSh0b3RhbERvdHMpLmZpbGwoMCk7XHJcblx0fVxyXG5cclxuXHRjb250YWluZXJDbGFzcygpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCd1aS1jYXJvdXNlbCB1aS13aWRnZXQnOnRydWUsIFxyXG5cdFx0XHQndWktY2Fyb3VzZWwtdmVydGljYWwnOiB0aGlzLmlzVmVydGljYWwoKSxcclxuXHRcdFx0J3VpLWNhcm91c2VsLWhvcml6b250YWwnOiAhdGhpcy5pc1ZlcnRpY2FsKClcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb250ZW50Q2xhc3NlcygpIHtcclxuXHRcdHJldHVybiAndWktY2Fyb3VzZWwtY29udGVudCAnKyB0aGlzLmNvbnRlbnRDbGFzcztcclxuXHR9XHJcblxyXG5cdGRvdHNDb250ZW50Q2xhc3NlcygpIHtcclxuXHRcdHJldHVybiAndWktY2Fyb3VzZWwtZG90cy1jb250YWluZXIgdWktaGVscGVyLXJlc2V0ICcgKyB0aGlzLmRvdHNDb250YWluZXJDbGFzcztcclxuXHR9XHJcblxyXG5cdGlzVmVydGljYWwoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJztcclxuXHR9XHJcblxyXG5cdGlzQ2lyY3VsYXIoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jaXJjdWxhciAmJiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID49IHRoaXMubnVtVmlzaWJsZTtcclxuXHR9XHJcblxyXG5cdGlzQXV0b3BsYXkoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hdXRvcGxheUludGVydmFsICYmIHRoaXMuYWxsb3dBdXRvcGxheTtcclxuXHR9XHJcblxyXG5cdGlzRm9yd2FyZE5hdkRpc2FibGVkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaXNFbXB0eSgpIHx8ICh0aGlzLl9wYWdlID49ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgIXRoaXMuaXNDaXJjdWxhcigpKTtcclxuXHR9XHJcblxyXG5cdGlzQmFja3dhcmROYXZEaXNhYmxlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmlzRW1wdHkoKSB8fCAodGhpcy5fcGFnZSA8PSAwICAmJiAhdGhpcy5pc0NpcmN1bGFyKCkpO1xyXG5cdH1cclxuXHJcblx0aXNFbXB0eSgpIHtcclxuXHRcdHJldHVybiAhdGhpcy52YWx1ZSB8fCB0aGlzLnZhbHVlLmxlbmd0aCA9PT0gMDtcclxuXHR9XHJcblxyXG5cdG5hdkZvcndhcmQoZSxpbmRleD8pIHtcclxuXHRcdGlmICh0aGlzLmlzQ2lyY3VsYXIoKSB8fCB0aGlzLl9wYWdlIDwgKHRoaXMudG90YWxEb3RzKCkgLSAxKSkge1xyXG5cdFx0XHR0aGlzLnN0ZXAoLTEsIGluZGV4KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XHJcblx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XHJcblx0XHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlICYmIGUuY2FuY2VsYWJsZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRuYXZCYWNrd2FyZChlLGluZGV4Pykge1xyXG5cdFx0aWYgKHRoaXMuaXNDaXJjdWxhcigpIHx8IHRoaXMuX3BhZ2UgIT09IDApIHtcclxuXHRcdFx0dGhpcy5zdGVwKDEsIGluZGV4KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XHJcblx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XHJcblx0XHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAoZSAmJiBlLmNhbmNlbGFibGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25Eb3RDbGljayhlLCBpbmRleCkge1xyXG5cdFx0bGV0IHBhZ2UgPSB0aGlzLl9wYWdlO1xyXG5cclxuXHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcclxuXHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcclxuXHRcdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmIChpbmRleCA+IHBhZ2UpIHtcclxuXHRcdFx0dGhpcy5uYXZGb3J3YXJkKGUsIGluZGV4KTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGluZGV4IDwgcGFnZSkge1xyXG5cdFx0XHR0aGlzLm5hdkJhY2t3YXJkKGUsIGluZGV4KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0ZXAoZGlyLCBwYWdlKSB7XHJcblx0XHRsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xyXG5cdFx0Y29uc3QgaXNDaXJjdWxhciA9IHRoaXMuaXNDaXJjdWxhcigpO1xyXG5cclxuXHRcdGlmIChwYWdlICE9IG51bGwpIHtcclxuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAodGhpcy5fbnVtU2Nyb2xsICogcGFnZSkgKiAtMTtcclxuXHJcblx0XHRcdGlmIChpc0NpcmN1bGFyKSB7XHJcblx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgLT0gdGhpcy5fbnVtVmlzaWJsZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyArPSAodGhpcy5fbnVtU2Nyb2xsICogZGlyKTtcclxuXHRcdFx0aWYgKHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkKSB7XHJcblx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gdGhpcy5yZW1haW5pbmdJdGVtcyAtICh0aGlzLl9udW1TY3JvbGwgKiBkaXIpO1xyXG5cdFx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBvcmlnaW5hbFNoaWZ0ZWRJdGVtcyA9IGlzQ2lyY3VsYXIgPyAodG90YWxTaGlmdGVkSXRlbXMgKyB0aGlzLl9udW1WaXNpYmxlKSA6IHRvdGFsU2hpZnRlZEl0ZW1zO1xyXG5cdFx0XHRwYWdlID0gTWF0aC5hYnMoTWF0aC5mbG9vcigob3JpZ2luYWxTaGlmdGVkSXRlbXMgLyB0aGlzLl9udW1TY3JvbGwpKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlzQ2lyY3VsYXIgJiYgdGhpcy5wYWdlID09PSAodGhpcy50b3RhbERvdHMoKSAtIDEpICYmIGRpciA9PT0gLTEpIHtcclxuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAtMSAqICh0aGlzLnZhbHVlLmxlbmd0aCArIHRoaXMuX251bVZpc2libGUpO1xyXG5cdFx0XHRwYWdlID0gMDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGlzQ2lyY3VsYXIgJiYgdGhpcy5wYWdlID09PSAwICYmIGRpciA9PT0gMSkge1xyXG5cdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyA9IDA7XHJcblx0XHRcdHBhZ2UgPSAodGhpcy50b3RhbERvdHMoKSAtIDEpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSAmJiB0aGlzLnJlbWFpbmluZ0l0ZW1zID4gMCkge1xyXG5cdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyArPSAoKHRoaXMucmVtYWluaW5nSXRlbXMgKiAtMSkgLSAodGhpcy5fbnVtU2Nyb2xsICogZGlyKSk7XHJcblx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5pdGVtc0NvbnRhaW5lcikge1xyXG5cdFx0XHR0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5pc1ZlcnRpY2FsKCkgPyBgdHJhbnNsYXRlM2QoMCwgJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDApYCA6IGB0cmFuc2xhdGUzZCgke3RvdGFsU2hpZnRlZEl0ZW1zICogKDEwMC8gdGhpcy5fbnVtVmlzaWJsZSl9JSwgMCwgMClgO1xyXG5cdFx0XHR0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gNTAwbXMgZWFzZSAwcyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xyXG5cdFx0dGhpcy5fcGFnZSA9IHBhZ2U7XHJcblx0XHR0aGlzLm9uUGFnZS5lbWl0KHtcclxuXHRcdFx0cGFnZTogdGhpcy5wYWdlXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXJ0QXV0b3BsYXkoKSB7XHJcblx0XHR0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy50b3RhbERvdHMoKSA+IDApIHtcclxuXHRcdFx0XHRpZiAodGhpcy5wYWdlID09PSAodGhpcy50b3RhbERvdHMoKSAtIDEpKSB7XHJcblx0XHRcdFx0XHR0aGlzLnN0ZXAoLTEsIDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuc3RlcCgtMSwgdGhpcy5wYWdlICsgMSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LCBcclxuXHRcdHRoaXMuYXV0b3BsYXlJbnRlcnZhbCk7XHJcblx0fVxyXG5cclxuXHRzdG9wQXV0b3BsYXkoKSB7XHJcblx0XHRpZiAodGhpcy5pbnRlcnZhbCkge1xyXG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25UcmFuc2l0aW9uRW5kKCkge1xyXG5cdFx0aWYgKHRoaXMuaXRlbXNDb250YWluZXIpIHtcclxuXHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnJztcclxuXHJcblx0XHRcdGlmICgodGhpcy5wYWdlID09PSAwIHx8IHRoaXMucGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSkgJiYgdGhpcy5pc0NpcmN1bGFyKCkpIHtcclxuXHRcdFx0XHR0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5pc1ZlcnRpY2FsKCkgPyBgdHJhbnNsYXRlM2QoMCwgJHt0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICogKDEwMC8gdGhpcy5fbnVtVmlzaWJsZSl9JSwgMClgIDogYHRyYW5zbGF0ZTNkKCR7dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDAsIDApYDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25Ub3VjaFN0YXJ0KGUpIHtcclxuXHRcdGxldCB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XHJcblxyXG5cdFx0dGhpcy5zdGFydFBvcyA9IHtcclxuXHRcdFx0eDogdG91Y2hvYmoucGFnZVgsXHJcblx0XHRcdHk6IHRvdWNob2JqLnBhZ2VZXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0b25Ub3VjaE1vdmUoZSkge1xyXG5cdFx0aWYgKGUuY2FuY2VsYWJsZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdG9uVG91Y2hFbmQoZSkge1xyXG5cdFx0bGV0IHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcclxuXHJcblx0XHRpZiAodGhpcy5pc1ZlcnRpY2FsKCkpIHtcclxuXHRcdFx0dGhpcy5jaGFuZ2VQYWdlT25Ub3VjaChlLCAodG91Y2hvYmoucGFnZVkgLSB0aGlzLnN0YXJ0UG9zLnkpKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNoYW5nZVBhZ2VPblRvdWNoKGUsICh0b3VjaG9iai5wYWdlWCAtIHRoaXMuc3RhcnRQb3MueCkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2hhbmdlUGFnZU9uVG91Y2goZSwgZGlmZikge1xyXG5cdFx0aWYgKE1hdGguYWJzKGRpZmYpID4gdGhpcy5zd2lwZVRocmVzaG9sZCkge1xyXG5cdFx0XHRpZiAoZGlmZiA8IDApIHtcclxuXHRcdFx0XHR0aGlzLm5hdkZvcndhcmQoZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5uYXZCYWNrd2FyZChlKTtcclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGJpbmREb2N1bWVudExpc3RlbmVycygpIHtcclxuXHRcdGlmICghdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XHJcblx0XHRcdHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IChlKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1bmJpbmREb2N1bWVudExpc3RlbmVycygpIHtcclxuXHRcdGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XHJcblx0XHRcdHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRuZ09uRGVzdHJveSgpIHtcclxuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XHJcblx0XHRcdHRoaXMudW5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcclxuXHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcblx0aW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcclxuXHRleHBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDYXJvdXNlbCwgU2hhcmVkTW9kdWxlXSxcclxuXHRkZWNsYXJhdGlvbnM6IFtDYXJvdXNlbF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcm91c2VsTW9kdWxlIHsgfVxyXG4iXX0=