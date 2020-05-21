var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var BlockUI = /** @class */ (function () {
    function BlockUI(el) {
        this.el = el;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    Object.defineProperty(BlockUI.prototype, "blocked", {
        get: function () {
            return this._blocked;
        },
        set: function (val) {
            this._blocked = val;
            if (this.mask && this.mask.nativeElement) {
                if (this._blocked)
                    this.block();
                else
                    this.unblock();
            }
        },
        enumerable: true,
        configurable: true
    });
    BlockUI.prototype.ngAfterViewInit = function () {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    };
    BlockUI.prototype.block = function () {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            var style = this.target.style || {};
            style.position = 'relative';
            this.target.style = style;
        }
        else {
            document.body.appendChild(this.mask.nativeElement);
        }
        if (this.autoZIndex) {
            this.mask.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    };
    BlockUI.prototype.unblock = function () {
        this.el.nativeElement.appendChild(this.mask.nativeElement);
    };
    BlockUI.prototype.ngOnDestroy = function () {
        this.unblock();
    };
    BlockUI.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], BlockUI.prototype, "target", void 0);
    __decorate([
        Input()
    ], BlockUI.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], BlockUI.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], BlockUI.prototype, "styleClass", void 0);
    __decorate([
        ViewChild('mask')
    ], BlockUI.prototype, "mask", void 0);
    __decorate([
        Input()
    ], BlockUI.prototype, "blocked", null);
    BlockUI = __decorate([
        Component({
            selector: 'p-blockUI',
            template: "\n        <div #mask [class]=\"styleClass\" [ngClass]=\"{'ui-blockui-document':!target, 'ui-blockui ui-widget-overlay': true}\" [ngStyle]=\"{display: blocked ? 'block' : 'none'}\">\n            <ng-content></ng-content>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], BlockUI);
    return BlockUI;
}());
export { BlockUI };
var BlockUIModule = /** @class */ (function () {
    function BlockUIModule() {
    }
    BlockUIModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [BlockUI],
            declarations: [BlockUI]
        })
    ], BlockUIModule);
    return BlockUIModule;
}());
export { BlockUIModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2t1aS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYmxvY2t1aS8iLCJzb3VyY2VzIjpbImJsb2NrdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQVd2QztJQWNJLGlCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQVZ4QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7SUFRSSxDQUFDO0lBRTVCLHNCQUFJLDRCQUFPO2FBQVg7WUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQVksR0FBWTtZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUVwQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVE7b0JBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztvQkFFYixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdEI7UUFDTCxDQUFDOzs7T0FYQTtJQWFELGlDQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFO1lBQ2pELE1BQU0sd0RBQXdELENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBRUQsdUJBQUssR0FBTDtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBRSxFQUFFLENBQUM7WUFDbEMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQzdCO2FBQ0k7WUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzFGO0lBQ0wsQ0FBQztJQUVELHlCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDOztnQkE3Q3NCLFVBQVU7O0lBWnhCO1FBQVIsS0FBSyxFQUFFOzJDQUFhO0lBRVo7UUFBUixLQUFLLEVBQUU7K0NBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFOytDQUF3QjtJQUV2QjtRQUFSLEtBQUssRUFBRTsrQ0FBb0I7SUFFVDtRQUFsQixTQUFTLENBQUMsTUFBTSxDQUFDO3lDQUFrQjtJQU0zQjtRQUFSLEtBQUssRUFBRTswQ0FFUDtJQWxCUSxPQUFPO1FBVG5CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxtUEFJVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxPQUFPLENBNERuQjtJQUFELGNBQUM7Q0FBQSxBQTVERCxJQTREQztTQTVEWSxPQUFPO0FBbUVwQjtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQUx6QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUMxQixDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksRWxlbWVudFJlZixWaWV3Q2hpbGQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1ibG9ja1VJJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiAjbWFzayBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cInsndWktYmxvY2t1aS1kb2N1bWVudCc6IXRhcmdldCwgJ3VpLWJsb2NrdWkgdWktd2lkZ2V0LW92ZXJsYXknOiB0cnVlfVwiIFtuZ1N0eWxlXT1cIntkaXNwbGF5OiBibG9ja2VkID8gJ2Jsb2NrJyA6ICdub25lJ31cIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmxvY2tVSSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSB0YXJnZXQ6IGFueTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQFZpZXdDaGlsZCgnbWFzaycpIG1hc2s6IEVsZW1lbnRSZWY7XHJcbiAgICBcclxuICAgIF9ibG9ja2VkOiBib29sZWFuO1xyXG4gICAgICAgIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxyXG4gICAgXHJcbiAgICBASW5wdXQoKSBnZXQgYmxvY2tlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmxvY2tlZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IGJsb2NrZWQodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fYmxvY2tlZCA9IHZhbDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5tYXNrICYmIHRoaXMubWFzay5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ibG9ja2VkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ibG9jaygpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmxvY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgIXRoaXMudGFyZ2V0LmdldEJsb2NrYWJsZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhyb3cgJ1RhcmdldCBvZiBCbG9ja1VJIG11c3QgaW1wbGVtZW50IEJsb2NrYWJsZVVJIGludGVyZmFjZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgYmxvY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmdldEJsb2NrYWJsZUVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLm1hc2submF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHRoaXMudGFyZ2V0LnN0eWxlfHx7fTtcclxuICAgICAgICAgICAgc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1hc2submF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1bmJsb2NrKCkge1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm1hc2submF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5ibG9jaygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbQmxvY2tVSV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtCbG9ja1VJXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmxvY2tVSU1vZHVsZSB7IH0iXX0=