var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let BlockUI = class BlockUI {
    constructor(el) {
        this.el = el;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    get blocked() {
        return this._blocked;
    }
    set blocked(val) {
        this._blocked = val;
        if (this.mask && this.mask.nativeElement) {
            if (this._blocked)
                this.block();
            else
                this.unblock();
        }
    }
    ngAfterViewInit() {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    }
    block() {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            let style = this.target.style || {};
            style.position = 'relative';
            this.target.style = style;
        }
        else {
            document.body.appendChild(this.mask.nativeElement);
        }
        if (this.autoZIndex) {
            this.mask.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    unblock() {
        this.el.nativeElement.appendChild(this.mask.nativeElement);
    }
    ngOnDestroy() {
        this.unblock();
    }
};
BlockUI.ctorParameters = () => [
    { type: ElementRef }
];
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
        template: `
        <div #mask [class]="styleClass" [ngClass]="{'ui-blockui-document':!target, 'ui-blockui ui-widget-overlay': true}" [ngStyle]="{display: blocked ? 'block' : 'none'}">
            <ng-content></ng-content>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], BlockUI);
export { BlockUI };
let BlockUIModule = class BlockUIModule {
};
BlockUIModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [BlockUI],
        declarations: [BlockUI]
    })
], BlockUIModule);
export { BlockUIModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2t1aS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYmxvY2t1aS8iLCJzb3VyY2VzIjpbImJsb2NrdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQVd2QyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBY2hCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBVnhCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztJQVFJLENBQUM7SUFFNUIsSUFBSSxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsR0FBWTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFDYixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O2dCQUViLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTtZQUNqRCxNQUFNLHdEQUF3RCxDQUFDO1NBQ2xFO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUUsRUFBRSxDQUFDO1lBQ2xDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUM3QjthQUNJO1lBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUMxRjtJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNKLENBQUE7O1lBOUMwQixVQUFVOztBQVp4QjtJQUFSLEtBQUssRUFBRTt1Q0FBYTtBQUVaO0lBQVIsS0FBSyxFQUFFOzJDQUE0QjtBQUUzQjtJQUFSLEtBQUssRUFBRTsyQ0FBd0I7QUFFdkI7SUFBUixLQUFLLEVBQUU7MkNBQW9CO0FBRVQ7SUFBbEIsU0FBUyxDQUFDLE1BQU0sQ0FBQztxQ0FBa0I7QUFNM0I7SUFBUixLQUFLLEVBQUU7c0NBRVA7QUFsQlEsT0FBTztJQVRuQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUU7Ozs7S0FJVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxPQUFPLENBNERuQjtTQTVEWSxPQUFPO0FBbUVwQixJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQUksQ0FBQTtBQUFqQixhQUFhO0lBTHpCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQzFCLENBQUM7R0FDVyxhQUFhLENBQUk7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LEFmdGVyVmlld0luaXQsT25EZXN0cm95LEVsZW1lbnRSZWYsVmlld0NoaWxkLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtYmxvY2tVSScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgI21hc2sgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdDbGFzc109XCJ7J3VpLWJsb2NrdWktZG9jdW1lbnQnOiF0YXJnZXQsICd1aS1ibG9ja3VpIHVpLXdpZGdldC1vdmVybGF5JzogdHJ1ZX1cIiBbbmdTdHlsZV09XCJ7ZGlzcGxheTogYmxvY2tlZCA/ICdibG9jaycgOiAnbm9uZSd9XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIEJsb2NrVUkgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgdGFyZ2V0OiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBWaWV3Q2hpbGQoJ21hc2snKSBtYXNrOiBFbGVtZW50UmVmO1xyXG4gICAgXHJcbiAgICBfYmxvY2tlZDogYm9vbGVhbjtcclxuICAgICAgICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuICAgIFxyXG4gICAgQElucHV0KCkgZ2V0IGJsb2NrZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2NrZWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldCBibG9ja2VkKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2Jsb2NrZWQgPSB2YWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMubWFzayAmJiB0aGlzLm1hc2submF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYmxvY2tlZClcclxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2soKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJsb2NrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICYmICF0aGlzLnRhcmdldC5nZXRCbG9ja2FibGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRocm93ICdUYXJnZXQgb2YgQmxvY2tVSSBtdXN0IGltcGxlbWVudCBCbG9ja2FibGVVSSBpbnRlcmZhY2UnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICBcclxuICAgIGJsb2NrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5nZXRCbG9ja2FibGVFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB0aGlzLnRhcmdldC5zdHlsZXx8e307XHJcbiAgICAgICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuc3R5bGUgPSBzdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFzay5uYXRpdmVFbGVtZW50LnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdW5ibG9jaygpIHtcclxuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuYmxvY2soKTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0Jsb2NrVUldLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbQmxvY2tVSV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJsb2NrVUlNb2R1bGUgeyB9Il19