var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, NgZone, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let ScrollPanel = class ScrollPanel {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.timeoutFrame = (fn) => setTimeout(fn, 0);
    }
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            this.moveBar();
            this.moveBar = this.moveBar.bind(this);
            this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
            this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
            this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
            this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
            window.addEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.addEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.addEventListener('mousedown', this.onYBarMouseDown);
            this.calculateContainerHeight();
            this.initialized = true;
        });
    }
    calculateContainerHeight() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let xBar = this.xBarViewChild.nativeElement;
        let containerStyles = getComputedStyle(container), xBarStyles = getComputedStyle(xBar), pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
        if (containerStyles['max-height'] != "none" && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            }
            else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
            }
        }
    }
    moveBar() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        /* horizontal scroll */
        let xBar = this.xBarViewChild.nativeElement;
        let totalWidth = content.scrollWidth;
        let ownWidth = content.clientWidth;
        let bottom = (container.clientHeight - xBar.clientHeight) * -1;
        this.scrollXRatio = ownWidth / totalWidth;
        /* vertical scroll */
        let yBar = this.yBarViewChild.nativeElement;
        let totalHeight = content.scrollHeight;
        let ownHeight = content.clientHeight;
        let right = (container.clientWidth - yBar.clientWidth) * -1;
        this.scrollYRatio = ownHeight / totalHeight;
        this.requestAnimationFrame(() => {
            if (this.scrollXRatio >= 1) {
                DomHandler.addClass(xBar, 'ui-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(xBar, 'ui-scrollpanel-hidden');
                const xBarWidth = Math.max(this.scrollXRatio * 100, 10);
                const xBarLeft = content.scrollLeft * (100 - xBarWidth) / (totalWidth - ownWidth);
                xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }
            if (this.scrollYRatio >= 1) {
                DomHandler.addClass(yBar, 'ui-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(yBar, 'ui-scrollpanel-hidden');
                const yBarHeight = Math.max(this.scrollYRatio * 100, 10);
                const yBarTop = content.scrollTop * (100 - yBarHeight) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
    }
    onYBarMouseDown(e) {
        this.isYBarClicked = true;
        this.lastPageY = e.pageY;
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }
    onXBarMouseDown(e) {
        this.isXBarClicked = true;
        this.lastPageX = e.pageX;
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }
    onDocumentMouseMove(e) {
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        }
        else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        }
        else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }
    }
    onMouseMoveForXBar(e) {
        let deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollLeft += deltaX / this.scrollXRatio;
        });
    }
    onMouseMoveForYBar(e) {
        let deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += deltaY / this.scrollYRatio;
        });
    }
    scrollTop(scrollTop) {
        let scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    }
    onDocumentMouseUp(e) {
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.removeClass(document.body, 'ui-scrollpanel-grabbed');
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    }
    requestAnimationFrame(f) {
        let frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    }
    ngOnDestroy() {
        if (this.initialized) {
            window.removeEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.removeEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.removeEventListener('mousedown', this.onYBarMouseDown);
        }
    }
    refresh() {
        this.moveBar();
    }
};
ScrollPanel.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input()
], ScrollPanel.prototype, "style", void 0);
__decorate([
    Input()
], ScrollPanel.prototype, "styleClass", void 0);
__decorate([
    ViewChild('container')
], ScrollPanel.prototype, "containerViewChild", void 0);
__decorate([
    ViewChild('content')
], ScrollPanel.prototype, "contentViewChild", void 0);
__decorate([
    ViewChild('xBar')
], ScrollPanel.prototype, "xBarViewChild", void 0);
__decorate([
    ViewChild('yBar')
], ScrollPanel.prototype, "yBarViewChild", void 0);
ScrollPanel = __decorate([
    Component({
        selector: 'p-scrollPanel',
        template: `
        <div #container [ngClass]="'ui-scrollpanel ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-scrollpanel-wrapper">
                <div #content class="ui-scrollpanel-content">
                    <ng-content></ng-content>
                </div>
            </div>
            <div #xBar class="ui-scrollpanel-bar ui-scrollpanel-bar-x"></div>
            <div #yBar class="ui-scrollpanel-bar ui-scrollpanel-bar-y"></div>   
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], ScrollPanel);
export { ScrollPanel };
let ScrollPanelModule = class ScrollPanelModule {
};
ScrollPanelModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ScrollPanel],
        declarations: [ScrollPanel]
    })
], ScrollPanelModule);
export { ScrollPanelModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xscGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Njcm9sbHBhbmVsLyIsInNvdXJjZXMiOlsic2Nyb2xscGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0ksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFpQnpDLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFNcEIsWUFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFjdEQsaUJBQVksR0FBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQWRXLENBQUM7SUEwQjFELGVBQWU7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FB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QUFTLENBQUMsV0FBVyxDQUFDO3VEQUFnQztBQUVqQztJQUFyQixTQUFTLENBQUMsU0FBUyxDQUFDO3FEQUE4QjtBQUVoQztJQUFsQixTQUFTLENBQUMsTUFBTSxDQUFDO2tEQUEyQjtBQUUxQjtJQUFsQixTQUFTLENBQUMsTUFBTSxDQUFDO2tEQUEyQjtBQWRwQyxXQUFXO0lBZnZCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7OztLQVVUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87S0FDbkQsQ0FBQztHQUNXLFdBQVcsQ0ErTXZCO1NBL01ZLFdBQVc7QUFzTnhCLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0NBQUksQ0FBQTtBQUFyQixpQkFBaUI7SUFMN0IsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUN0QixZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7S0FDOUIsQ0FBQztHQUNXLGlCQUFpQixDQUFJO1NBQXJCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIE5nWm9uZSwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Atc2Nyb2xsUGFuZWwnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwiJ3VpLXNjcm9sbHBhbmVsIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJ1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXNjcm9sbHBhbmVsLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJ1aS1zY3JvbGxwYW5lbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2ICN4QmFyIGNsYXNzPVwidWktc2Nyb2xscGFuZWwtYmFyIHVpLXNjcm9sbHBhbmVsLWJhci14XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgI3lCYXIgY2xhc3M9XCJ1aS1zY3JvbGxwYW5lbC1iYXIgdWktc2Nyb2xscGFuZWwtYmFyLXlcIj48L2Rpdj4gICBcclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFNjcm9sbFBhbmVsIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd4QmFyJykgeEJhclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuICAgIFxyXG4gICAgQFZpZXdDaGlsZCgneUJhcicpIHlCYXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgc2Nyb2xsWVJhdGlvOiBudW1iZXI7XHJcblxyXG4gICAgc2Nyb2xsWFJhdGlvOiBudW1iZXI7XHJcblxyXG4gICAgdGltZW91dEZyYW1lOiBhbnkgPSAoZm4pID0+IHNldFRpbWVvdXQoZm4sIDApO1xyXG5cclxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG5cclxuICAgIGxhc3RQYWdlWTogbnVtYmVyO1xyXG5cclxuICAgIGxhc3RQYWdlWDogbnVtYmVyO1xyXG5cclxuICAgIGlzWEJhckNsaWNrZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgaXNZQmFyQ2xpY2tlZDogYm9vbGVhbjtcclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUJhciA9IHRoaXMubW92ZUJhci5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uWEJhck1vdXNlRG93biA9IHRoaXMub25YQmFyTW91c2VEb3duLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25ZQmFyTW91c2VEb3duID0gdGhpcy5vbllCYXJNb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlID0gdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlVXAgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5tb3ZlQmFyKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tb3ZlQmFyKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW92ZUJhcik7XHJcbiAgICAgICAgICAgIHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25YQmFyTW91c2VEb3duKTtcclxuICAgICAgICAgICAgdGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbllCYXJNb3VzZURvd24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxldCB4QmFyID0gdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBjb250YWluZXJTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lciksXHJcbiAgICAgICAgeEJhclN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoeEJhciksXHJcbiAgICAgICAgcHVyZUNvbnRhaW5lckhlaWdodCA9IERvbUhhbmRsZXIuZ2V0SGVpZ2h0KGNvbnRhaW5lcikgLSBwYXJzZUludCh4QmFyU3R5bGVzWydoZWlnaHQnXSwgMTApO1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J10gIT0gXCJub25lXCIgJiYgcHVyZUNvbnRhaW5lckhlaWdodCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50Lm9mZnNldEhlaWdodCArIHBhcnNlSW50KHhCYXJTdHlsZXNbJ2hlaWdodCddLCAxMCkgPiBwYXJzZUludChjb250YWluZXJTdHlsZXNbJ21heC1oZWlnaHQnXSwgMTApKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY29udGVudC5vZmZzZXRIZWlnaHQgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5wYWRkaW5nVG9wKSArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLnBhZGRpbmdCb3R0b20pICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgpICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVCYXIoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgLyogaG9yaXpvbnRhbCBzY3JvbGwgKi9cclxuICAgICAgICBsZXQgeEJhciA9IHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxldCB0b3RhbFdpZHRoID0gY29udGVudC5zY3JvbGxXaWR0aDtcclxuICAgICAgICBsZXQgb3duV2lkdGggPSBjb250ZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgIGxldCBib3R0b20gPSAoY29udGFpbmVyLmNsaWVudEhlaWdodCAtIHhCYXIuY2xpZW50SGVpZ2h0KSAqIC0xO1xyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbFhSYXRpbyA9IG93bldpZHRoIC8gdG90YWxXaWR0aDtcclxuXHJcbiAgICAgICAgLyogdmVydGljYWwgc2Nyb2xsICovXHJcbiAgICAgICAgbGV0IHlCYXIgPSB0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsZXQgdG90YWxIZWlnaHQgPSBjb250ZW50LnNjcm9sbEhlaWdodDtcclxuICAgICAgICBsZXQgb3duSGVpZ2h0ID0gY29udGVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IHJpZ2h0ID0gKGNvbnRhaW5lci5jbGllbnRXaWR0aCAtIHlCYXIuY2xpZW50V2lkdGgpICogLTE7XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsWVJhdGlvID0gb3duSGVpZ2h0IC8gdG90YWxIZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsWFJhdGlvID49IDEpIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoeEJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoeEJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeEJhcldpZHRoID0gTWF0aC5tYXgodGhpcy5zY3JvbGxYUmF0aW8gKiAxMDAsIDEwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhCYXJMZWZ0ID0gY29udGVudC5zY3JvbGxMZWZ0ICogKDEwMCAtIHhCYXJXaWR0aCkgLyAodG90YWxXaWR0aCAtIG93bldpZHRoKTtcclxuICAgICAgICAgICAgICAgIHhCYXIuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDonICsgeEJhcldpZHRoICsgJyU7IGxlZnQ6JyArIHhCYXJMZWZ0ICsgJyU7Ym90dG9tOicgKyBib3R0b20gKyAncHg7JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsWVJhdGlvID49IDEpIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoeUJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoeUJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeUJhckhlaWdodCA9IE1hdGgubWF4KHRoaXMuc2Nyb2xsWVJhdGlvICogMTAwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5QmFyVG9wID0gY29udGVudC5zY3JvbGxUb3AgKiAoMTAwIC0geUJhckhlaWdodCkgLyAodG90YWxIZWlnaHQgLSBvd25IZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgeUJhci5zdHlsZS5jc3NUZXh0ID0gJ2hlaWdodDonICsgeUJhckhlaWdodCArICclOyB0b3A6IGNhbGMoJyArIHlCYXJUb3AgKyAnJSAtICcgKyB4QmFyLmNsaWVudEhlaWdodCArICdweCk7cmlnaHQ6JyArIHJpZ2h0ICsgJ3B4Oyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbllCYXJNb3VzZURvd24oZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNZQmFyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xyXG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd1aS1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25YQmFyTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzWEJhckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZS5wYWdlWDtcclxuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xyXG5cclxuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICd1aS1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Eb2N1bWVudE1vdXNlVXApO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRvY3VtZW50TW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1hCYXJDbGlja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JYQmFyKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzWUJhckNsaWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvcllCYXIoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWEJhcihlKTtcclxuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvcllCYXIoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VNb3ZlRm9yWEJhcihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGRlbHRhWCA9IGUucGFnZVggLSB0aGlzLmxhc3RQYWdlWDtcclxuICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGUucGFnZVg7XHJcblxyXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVggLyB0aGlzLnNjcm9sbFhSYXRpbztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vdXNlTW92ZUZvcllCYXIoZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGxldCBkZWx0YVkgPSBlLnBhZ2VZIC0gdGhpcy5sYXN0UGFnZVk7XHJcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xyXG5cclxuICAgICAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArPSBkZWx0YVkgLyB0aGlzLnNjcm9sbFlSYXRpbztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsYWJsZUhlaWdodCA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICBzY3JvbGxUb3AgPSBzY3JvbGxUb3AgPiBzY3JvbGxhYmxlSGVpZ2h0ID8gc2Nyb2xsYWJsZUhlaWdodCA6IHNjcm9sbFRvcCA+IDAgPyBzY3JvbGxUb3AgOiAwO1xyXG4gICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgIH1cclxuXHJcbiAgICBvbkRvY3VtZW50TW91c2VVcChlOiBFdmVudCkge1xyXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd1aS1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XHJcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcclxuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Eb2N1bWVudE1vdXNlVXApO1xyXG4gICAgICAgIHRoaXMuaXNYQmFyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNZQmFyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBmcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHzCoHRoaXMudGltZW91dEZyYW1lO1xyXG4gICAgICAgIGZyYW1lKGYpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm1vdmVCYXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1vdmVCYXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5tb3ZlQmFyKTtcclxuICAgICAgICAgICAgdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblhCYXJNb3VzZURvd24pO1xyXG4gICAgICAgICAgICB0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uWUJhck1vdXNlRG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlQmFyKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbU2Nyb2xsUGFuZWxdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbU2Nyb2xsUGFuZWxdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTY3JvbGxQYW5lbE1vZHVsZSB7IH1cclxuIl19