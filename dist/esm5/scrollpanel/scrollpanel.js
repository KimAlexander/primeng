var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, NgZone, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var ScrollPanel = /** @class */ (function () {
    function ScrollPanel(el, zone) {
        this.el = el;
        this.zone = zone;
        this.timeoutFrame = function (fn) { return setTimeout(fn, 0); };
    }
    ScrollPanel.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.moveBar();
            _this.moveBar = _this.moveBar.bind(_this);
            _this.onXBarMouseDown = _this.onXBarMouseDown.bind(_this);
            _this.onYBarMouseDown = _this.onYBarMouseDown.bind(_this);
            _this.onDocumentMouseMove = _this.onDocumentMouseMove.bind(_this);
            _this.onDocumentMouseUp = _this.onDocumentMouseUp.bind(_this);
            window.addEventListener('resize', _this.moveBar);
            _this.contentViewChild.nativeElement.addEventListener('scroll', _this.moveBar);
            _this.contentViewChild.nativeElement.addEventListener('mouseenter', _this.moveBar);
            _this.xBarViewChild.nativeElement.addEventListener('mousedown', _this.onXBarMouseDown);
            _this.yBarViewChild.nativeElement.addEventListener('mousedown', _this.onYBarMouseDown);
            _this.calculateContainerHeight();
            _this.initialized = true;
        });
    };
    ScrollPanel.prototype.calculateContainerHeight = function () {
        var container = this.containerViewChild.nativeElement;
        var content = this.contentViewChild.nativeElement;
        var xBar = this.xBarViewChild.nativeElement;
        var containerStyles = getComputedStyle(container), xBarStyles = getComputedStyle(xBar), pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
        if (containerStyles['max-height'] != "none" && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            }
            else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
            }
        }
    };
    ScrollPanel.prototype.moveBar = function () {
        var _this = this;
        var container = this.containerViewChild.nativeElement;
        var content = this.contentViewChild.nativeElement;
        /* horizontal scroll */
        var xBar = this.xBarViewChild.nativeElement;
        var totalWidth = content.scrollWidth;
        var ownWidth = content.clientWidth;
        var bottom = (container.clientHeight - xBar.clientHeight) * -1;
        this.scrollXRatio = ownWidth / totalWidth;
        /* vertical scroll */
        var yBar = this.yBarViewChild.nativeElement;
        var totalHeight = content.scrollHeight;
        var ownHeight = content.clientHeight;
        var right = (container.clientWidth - yBar.clientWidth) * -1;
        this.scrollYRatio = ownHeight / totalHeight;
        this.requestAnimationFrame(function () {
            if (_this.scrollXRatio >= 1) {
                DomHandler.addClass(xBar, 'ui-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(xBar, 'ui-scrollpanel-hidden');
                var xBarWidth = Math.max(_this.scrollXRatio * 100, 10);
                var xBarLeft = content.scrollLeft * (100 - xBarWidth) / (totalWidth - ownWidth);
                xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }
            if (_this.scrollYRatio >= 1) {
                DomHandler.addClass(yBar, 'ui-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(yBar, 'ui-scrollpanel-hidden');
                var yBarHeight = Math.max(_this.scrollYRatio * 100, 10);
                var yBarTop = content.scrollTop * (100 - yBarHeight) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
    };
    ScrollPanel.prototype.onYBarMouseDown = function (e) {
        this.isYBarClicked = true;
        this.lastPageY = e.pageY;
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    };
    ScrollPanel.prototype.onXBarMouseDown = function (e) {
        this.isXBarClicked = true;
        this.lastPageX = e.pageX;
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    };
    ScrollPanel.prototype.onDocumentMouseMove = function (e) {
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
    };
    ScrollPanel.prototype.onMouseMoveForXBar = function (e) {
        var _this = this;
        var deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;
        this.requestAnimationFrame(function () {
            _this.contentViewChild.nativeElement.scrollLeft += deltaX / _this.scrollXRatio;
        });
    };
    ScrollPanel.prototype.onMouseMoveForYBar = function (e) {
        var _this = this;
        var deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;
        this.requestAnimationFrame(function () {
            _this.contentViewChild.nativeElement.scrollTop += deltaY / _this.scrollYRatio;
        });
    };
    ScrollPanel.prototype.scrollTop = function (scrollTop) {
        var scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    };
    ScrollPanel.prototype.onDocumentMouseUp = function (e) {
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        DomHandler.removeClass(document.body, 'ui-scrollpanel-grabbed');
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    };
    ScrollPanel.prototype.requestAnimationFrame = function (f) {
        var frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    };
    ScrollPanel.prototype.ngOnDestroy = function () {
        if (this.initialized) {
            window.removeEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.removeEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.removeEventListener('mousedown', this.onYBarMouseDown);
        }
    };
    ScrollPanel.prototype.refresh = function () {
        this.moveBar();
    };
    ScrollPanel.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
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
            template: "\n        <div #container [ngClass]=\"'ui-scrollpanel ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-scrollpanel-wrapper\">\n                <div #content class=\"ui-scrollpanel-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n            <div #xBar class=\"ui-scrollpanel-bar ui-scrollpanel-bar-x\"></div>\n            <div #yBar class=\"ui-scrollpanel-bar ui-scrollpanel-bar-y\"></div>   \n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], ScrollPanel);
    return ScrollPanel;
}());
export { ScrollPanel };
var ScrollPanelModule = /** @class */ (function () {
    function ScrollPanelModule() {
    }
    ScrollPanelModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ScrollPanel],
            declarations: [ScrollPanel]
        })
    ], ScrollPanelModule);
    return ScrollPanelModule;
}());
export { ScrollPanelModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xscGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Njcm9sbHBhbmVsLyIsInNvdXJjZXMiOlsic2Nyb2xscGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0ksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFpQnpDO0lBTUkscUJBQW1CLEVBQWMsRUFBUyxJQUFZO1FBQW5DLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBY3RELGlCQUFZLEdBQVEsVUFBQyxFQUFFLElBQUssT0FBQSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFqQixDQUFpQixDQUFDO0lBZFcsQ0FBQztJQTBCMUQscUNBQWUsR0FBZjtRQUFBLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ3hCLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQztZQUN2RCxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1lBQ3ZELEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FB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QUo3QztRQUFSLEtBQUssRUFBRTs4Q0FBWTtJQUVYO1FBQVIsS0FBSyxFQUFFO21EQUFvQjtJQUlKO1FBQXZCLFNBQVMsQ0FBQyxXQUFXLENBQUM7MkRBQWdDO0lBRWpDO1FBQXJCLFNBQVMsQ0FBQyxTQUFTLENBQUM7eURBQThCO0lBRWhDO1FBQWxCLFNBQVMsQ0FBQyxNQUFNLENBQUM7c0RBQTJCO0lBRTFCO1FBQWxCLFNBQVMsQ0FBQyxNQUFNLENBQUM7c0RBQTJCO0lBZHBDLFdBQVc7UUFmdkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLDJoQkFVVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxXQUFXLENBK012QjtJQUFELGtCQUFDO0NBQUEsQUEvTUQsSUErTUM7U0EvTVksV0FBVztBQXNOeEI7SUFBQTtJQUFpQyxDQUFDO0lBQXJCLGlCQUFpQjtRQUw3QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUM5QixDQUFDO09BQ1csaUJBQWlCLENBQUk7SUFBRCx3QkFBQztDQUFBLEFBQWxDLElBQWtDO1NBQXJCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIE5nWm9uZSwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Atc2Nyb2xsUGFuZWwnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwiJ3VpLXNjcm9sbHBhbmVsIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJ1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXNjcm9sbHBhbmVsLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJ1aS1zY3JvbGxwYW5lbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2ICN4QmFyIGNsYXNzPVwidWktc2Nyb2xscGFuZWwtYmFyIHVpLXNjcm9sbHBhbmVsLWJhci14XCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgI3lCYXIgY2xhc3M9XCJ1aS1zY3JvbGxwYW5lbC1iYXIgdWktc2Nyb2xscGFuZWwtYmFyLXlcIj48L2Rpdj4gICBcclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFNjcm9sbFBhbmVsIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd4QmFyJykgeEJhclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuICAgIFxyXG4gICAgQFZpZXdDaGlsZCgneUJhcicpIHlCYXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgc2Nyb2xsWVJhdGlvOiBudW1iZXI7XHJcblxyXG4gICAgc2Nyb2xsWFJhdGlvOiBudW1iZXI7XHJcblxyXG4gICAgdGltZW91dEZyYW1lOiBhbnkgPSAoZm4pID0+IHNldFRpbWVvdXQoZm4sIDApO1xyXG5cclxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG5cclxuICAgIGxhc3RQYWdlWTogbnVtYmVyO1xyXG5cclxuICAgIGxhc3RQYWdlWDogbnVtYmVyO1xyXG5cclxuICAgIGlzWEJhckNsaWNrZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgaXNZQmFyQ2xpY2tlZDogYm9vbGVhbjtcclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUJhciA9IHRoaXMubW92ZUJhci5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uWEJhck1vdXNlRG93biA9IHRoaXMub25YQmFyTW91c2VEb3duLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25ZQmFyTW91c2VEb3duID0gdGhpcy5vbllCYXJNb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlID0gdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlVXAgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5tb3ZlQmFyKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tb3ZlQmFyKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW92ZUJhcik7XHJcbiAgICAgICAgICAgIHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25YQmFyTW91c2VEb3duKTtcclxuICAgICAgICAgICAgdGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbllCYXJNb3VzZURvd24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxldCB4QmFyID0gdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGxldCBjb250YWluZXJTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lciksXHJcbiAgICAgICAgeEJhclN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoeEJhciksXHJcbiAgICAgICAgcHVyZUNvbnRhaW5lckhlaWdodCA9IERvbUhhbmRsZXIuZ2V0SGVpZ2h0KGNvbnRhaW5lcikgLSBwYXJzZUludCh4QmFyU3R5bGVzWydoZWlnaHQnXSwgMTApO1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J10gIT0gXCJub25lXCIgJiYgcHVyZUNvbnRhaW5lckhlaWdodCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50Lm9mZnNldEhlaWdodCArIHBhcnNlSW50KHhCYXJTdHlsZXNbJ2hlaWdodCddLCAxMCkgPiBwYXJzZUludChjb250YWluZXJTdHlsZXNbJ21heC1oZWlnaHQnXSwgMTApKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY29udGVudC5vZmZzZXRIZWlnaHQgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5wYWRkaW5nVG9wKSArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLnBhZGRpbmdCb3R0b20pICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMuYm9yZGVyQm90dG9tV2lkdGgpICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVCYXIoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgLyogaG9yaXpvbnRhbCBzY3JvbGwgKi9cclxuICAgICAgICBsZXQgeEJhciA9IHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxldCB0b3RhbFdpZHRoID0gY29udGVudC5zY3JvbGxXaWR0aDtcclxuICAgICAgICBsZXQgb3duV2lkdGggPSBjb250ZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgIGxldCBib3R0b20gPSAoY29udGFpbmVyLmNsaWVudEhlaWdodCAtIHhCYXIuY2xpZW50SGVpZ2h0KSAqIC0xO1xyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbFhSYXRpbyA9IG93bldpZHRoIC8gdG90YWxXaWR0aDtcclxuXHJcbiAgICAgICAgLyogdmVydGljYWwgc2Nyb2xsICovXHJcbiAgICAgICAgbGV0IHlCYXIgPSB0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsZXQgdG90YWxIZWlnaHQgPSBjb250ZW50LnNjcm9sbEhlaWdodDtcclxuICAgICAgICBsZXQgb3duSGVpZ2h0ID0gY29udGVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IHJpZ2h0ID0gKGNvbnRhaW5lci5jbGllbnRXaWR0aCAtIHlCYXIuY2xpZW50V2lkdGgpICogLTE7XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsWVJhdGlvID0gb3duSGVpZ2h0IC8gdG90YWxIZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsWFJhdGlvID49IDEpIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoeEJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoeEJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeEJhcldpZHRoID0gTWF0aC5tYXgodGhpcy5zY3JvbGxYUmF0aW8gKiAxMDAsIDEwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhCYXJMZWZ0ID0gY29udGVudC5zY3JvbGxMZWZ0ICogKDEwMCAtIHhCYXJXaWR0aCkgLyAodG90YWxXaWR0aCAtIG93bldpZHRoKTtcclxuICAgICAgICAgICAgICAgIHhCYXIuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDonICsgeEJhcldpZHRoICsgJyU7IGxlZnQ6JyArIHhCYXJMZWZ0ICsgJyU7Ym90dG9tOicgKyBib3R0b20gKyAncHg7JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsWVJhdGlvID49IDEpIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoeUJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoeUJhciwgJ3VpLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeUJhckhlaWdodCA9IE1hdGgubWF4KHRoaXMuc2Nyb2xsWVJhdGlvICogMTAwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5QmFyVG9wID0gY29udGVudC5zY3JvbGxUb3AgKiAoMTAwIC0geUJhckhlaWdodCkgLyAodG90YWxIZWlnaHQgLSBvd25IZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgeUJhci5zdHlsZS5jc3NUZXh0ID0gJ2hlaWdodDonICsgeUJhckhlaWdodCArICclOyB0b3A6IGNhbGMoJyArIHlCYXJUb3AgKyAnJSAtICcgKyB4QmFyLmNsaWVudEhlaWdodCArICdweCk7cmlnaHQ6JyArIHJpZ2h0ICsgJ3B4Oyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbllCYXJNb3VzZURvd24oZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNZQmFyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xyXG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd1aS1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25YQmFyTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmlzWEJhckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZS5wYWdlWDtcclxuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xyXG5cclxuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICd1aS1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Eb2N1bWVudE1vdXNlVXApO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRvY3VtZW50TW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1hCYXJDbGlja2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JYQmFyKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzWUJhckNsaWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvcllCYXIoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWEJhcihlKTtcclxuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvcllCYXIoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VNb3ZlRm9yWEJhcihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGRlbHRhWCA9IGUucGFnZVggLSB0aGlzLmxhc3RQYWdlWDtcclxuICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGUucGFnZVg7XHJcblxyXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVggLyB0aGlzLnNjcm9sbFhSYXRpbztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vdXNlTW92ZUZvcllCYXIoZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGxldCBkZWx0YVkgPSBlLnBhZ2VZIC0gdGhpcy5sYXN0UGFnZVk7XHJcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xyXG5cclxuICAgICAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArPSBkZWx0YVkgLyB0aGlzLnNjcm9sbFlSYXRpbztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsYWJsZUhlaWdodCA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCAtIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICBzY3JvbGxUb3AgPSBzY3JvbGxUb3AgPiBzY3JvbGxhYmxlSGVpZ2h0ID8gc2Nyb2xsYWJsZUhlaWdodCA6IHNjcm9sbFRvcCA+IDAgPyBzY3JvbGxUb3AgOiAwO1xyXG4gICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgIH1cclxuXHJcbiAgICBvbkRvY3VtZW50TW91c2VVcChlOiBFdmVudCkge1xyXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd1aS1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XHJcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcclxuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Eb2N1bWVudE1vdXNlVXApO1xyXG4gICAgICAgIHRoaXMuaXNYQmFyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNZQmFyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBmcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHzCoHRoaXMudGltZW91dEZyYW1lO1xyXG4gICAgICAgIGZyYW1lKGYpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm1vdmVCYXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1vdmVCYXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5tb3ZlQmFyKTtcclxuICAgICAgICAgICAgdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vblhCYXJNb3VzZURvd24pO1xyXG4gICAgICAgICAgICB0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uWUJhck1vdXNlRG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlQmFyKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbU2Nyb2xsUGFuZWxdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbU2Nyb2xsUGFuZWxdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTY3JvbGxQYW5lbE1vZHVsZSB7IH1cclxuIl19