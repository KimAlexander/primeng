var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, OnInit, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';
var FullCalendar = /** @class */ (function () {
    function FullCalendar(el) {
        this.el = el;
    }
    FullCalendar.prototype.ngOnInit = function () {
        this.config = {
            theme: true
        };
        if (this.options) {
            for (var prop in this.options) {
                this.config[prop] = this.options[prop];
            }
        }
    };
    FullCalendar.prototype.ngAfterViewChecked = function () {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    };
    Object.defineProperty(FullCalendar.prototype, "events", {
        get: function () {
            return this._events;
        },
        set: function (value) {
            this._events = value;
            if (this._events && this.calendar) {
                this.calendar.removeAllEventSources();
                this.calendar.addEventSource(this._events);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullCalendar.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
            if (this._options && this.calendar) {
                for (var prop in this._options) {
                    var optionValue = this._options[prop];
                    this.config[prop] = optionValue;
                    this.calendar.setOption(prop, optionValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    FullCalendar.prototype.initialize = function () {
        this.calendar = new Calendar(this.el.nativeElement.children[0], this.config);
        this.calendar.render();
        this.initialized = true;
        if (this.events) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this.events);
        }
    };
    FullCalendar.prototype.getCalendar = function () {
        return this.calendar;
    };
    FullCalendar.prototype.ngOnDestroy = function () {
        if (this.calendar) {
            this.calendar.destroy();
            this.initialized = false;
            this.calendar = null;
        }
    };
    FullCalendar.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], FullCalendar.prototype, "style", void 0);
    __decorate([
        Input()
    ], FullCalendar.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], FullCalendar.prototype, "events", null);
    __decorate([
        Input()
    ], FullCalendar.prototype, "options", null);
    FullCalendar = __decorate([
        Component({
            selector: 'p-fullCalendar',
            template: '<div [ngStyle]="style" [class]="styleClass"></div>',
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], FullCalendar);
    return FullCalendar;
}());
export { FullCalendar };
var FullCalendarModule = /** @class */ (function () {
    function FullCalendarModule() {
    }
    FullCalendarModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [FullCalendar],
            declarations: [FullCalendar]
        })
    ], FullCalendarModule);
    return FullCalendarModule;
}());
export { FullCalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbGNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9mdWxsY2FsZW5kYXIvIiwic291cmNlcyI6WyJmdWxsY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFPNUM7SUFnQkksc0JBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUVyQywrQkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFDO1NBQ0o7SUFDTCxDQUFDO0lBRUQseUNBQWtCLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQ3pELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFUSxzQkFBSSxnQ0FBTTthQUFWO1lBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFXLEtBQVU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlDO1FBQ0wsQ0FBQzs7O09BVEE7SUFXUSxzQkFBSSxpQ0FBTzthQUFYO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFZLEtBQVU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFFdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hDLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDNUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDOUM7YUFDSjtRQUNMLENBQUM7OztPQVpBO0lBY0QsaUNBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDOztnQkF0RXNCLFVBQVU7O0lBZHhCO1FBQVIsS0FBSyxFQUFFOytDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7b0RBQW9CO0lBZ0NuQjtRQUFSLEtBQUssRUFBRTs4Q0FFUDtJQVdRO1FBQVIsS0FBSyxFQUFFOytDQUVQO0lBbkRRLFlBQVk7UUFMeEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsb0RBQW9EO1lBQzlELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxZQUFZLENBdUZ4QjtJQUFELG1CQUFDO0NBQUEsQUF2RkQsSUF1RkM7U0F2RlksWUFBWTtBQThGekI7SUFBQTtJQUFrQyxDQUFDO0lBQXRCLGtCQUFrQjtRQUw5QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQztTQUMvQixDQUFDO09BQ1csa0JBQWtCLENBQUk7SUFBRCx5QkFBQztDQUFBLEFBQW5DLElBQW1DO1NBQXRCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LElucHV0LE9uSW5pdCxBZnRlclZpZXdDaGVja2VkLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Q2FsZW5kYXJ9IGZyb20gJ0BmdWxsY2FsZW5kYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1mdWxsQ2FsZW5kYXInLFxyXG4gICAgdGVtcGxhdGU6ICc8ZGl2IFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj48L2Rpdj4nLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGdWxsQ2FsZW5kYXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksT25Jbml0LEFmdGVyVmlld0NoZWNrZWQge1xyXG4gICAgICAgIFxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICBcclxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgICAgICAgICBcclxuICAgIGNhbGVuZGFyOiBhbnk7XHJcbiAgICBcclxuICAgIGNvbmZpZzogYW55O1xyXG5cclxuICAgIF9vcHRpb25zOiBhbnk7XHJcblxyXG4gICAgX2V2ZW50czogYW55W107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxyXG4gICAgXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgICAgICAgdGhlbWU6IHRydWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1twcm9wXSA9IHRoaXMub3B0aW9uc1twcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQElucHV0KCkgZ2V0IGV2ZW50cygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGV2ZW50cyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudHMgJiYgdGhpcy5jYWxlbmRhcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLnJlbW92ZUFsbEV2ZW50U291cmNlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFkZEV2ZW50U291cmNlKHRoaXMuX2V2ZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBvcHRpb25zKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG9wdGlvbnModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMgJiYgdGhpcy5jYWxlbmRhcikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHRoaXMuX29wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb25WYWx1ZSA9IHRoaXMuX29wdGlvbnNbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1twcm9wXSA9IG9wdGlvblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5zZXRPcHRpb24ocHJvcCwgb3B0aW9uVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IG5ldyBDYWxlbmRhcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB0aGlzLmNhbGVuZGFyLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50cykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLnJlbW92ZUFsbEV2ZW50U291cmNlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFkZEV2ZW50U291cmNlKHRoaXMuZXZlbnRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2FsZW5kYXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXI7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jYWxlbmRhcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gbnVsbDtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0Z1bGxDYWxlbmRhcl0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtGdWxsQ2FsZW5kYXJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGdWxsQ2FsZW5kYXJNb2R1bGUgeyB9XHJcbiJdfQ==