var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, OnInit, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';
let FullCalendar = class FullCalendar {
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        this.config = {
            theme: true
        };
        if (this.options) {
            for (let prop in this.options) {
                this.config[prop] = this.options[prop];
            }
        }
    }
    ngAfterViewChecked() {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    }
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = value;
        if (this._events && this.calendar) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this._events);
        }
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
        if (this._options && this.calendar) {
            for (let prop in this._options) {
                let optionValue = this._options[prop];
                this.config[prop] = optionValue;
                this.calendar.setOption(prop, optionValue);
            }
        }
    }
    initialize() {
        this.calendar = new Calendar(this.el.nativeElement.children[0], this.config);
        this.calendar.render();
        this.initialized = true;
        if (this.events) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this.events);
        }
    }
    getCalendar() {
        return this.calendar;
    }
    ngOnDestroy() {
        if (this.calendar) {
            this.calendar.destroy();
            this.initialized = false;
            this.calendar = null;
        }
    }
};
FullCalendar.ctorParameters = () => [
    { type: ElementRef }
];
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
export { FullCalendar };
let FullCalendarModule = class FullCalendarModule {
};
FullCalendarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [FullCalendar],
        declarations: [FullCalendar]
    })
], FullCalendarModule);
export { FullCalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbGNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9mdWxsY2FsZW5kYXIvIiwic291cmNlcyI6WyJmdWxsY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFPNUMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQWdCckIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDO0lBRXJDLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7U0FDSjtJQUNMLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7WUFDekQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVRLElBQUksTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBVTtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVyQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVRLElBQUksT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM1QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQzlDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUF2RTBCLFVBQVU7O0FBZHhCO0lBQVIsS0FBSyxFQUFFOzJDQUFZO0FBRVg7SUFBUixLQUFLLEVBQUU7Z0RBQW9CO0FBZ0NuQjtJQUFSLEtBQUssRUFBRTswQ0FFUDtBQVdRO0lBQVIsS0FBSyxFQUFFOzJDQUVQO0FBbkRRLFlBQVk7SUFMeEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUUsb0RBQW9EO1FBQzlELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxZQUFZLENBdUZ4QjtTQXZGWSxZQUFZO0FBOEZ6QixJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFJLENBQUE7QUFBdEIsa0JBQWtCO0lBTDlCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsWUFBWSxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQy9CLENBQUM7R0FDVyxrQkFBa0IsQ0FBSTtTQUF0QixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxJbnB1dCxPbkluaXQsQWZ0ZXJWaWV3Q2hlY2tlZCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0NhbGVuZGFyfSBmcm9tICdAZnVsbGNhbGVuZGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtZnVsbENhbGVuZGFyJyxcclxuICAgIHRlbXBsYXRlOiAnPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+PC9kaXY+JyxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnVsbENhbGVuZGFyIGltcGxlbWVudHMgT25EZXN0cm95LE9uSW5pdCxBZnRlclZpZXdDaGVja2VkIHtcclxuICAgICAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgICAgICAgICAgXHJcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgICAgICAgICAgXHJcbiAgICBjYWxlbmRhcjogYW55O1xyXG4gICAgXHJcbiAgICBjb25maWc6IGFueTtcclxuXHJcbiAgICBfb3B0aW9uczogYW55O1xyXG5cclxuICAgIF9ldmVudHM6IGFueVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuICAgIFxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB7XHJcbiAgICAgICAgICAgIHRoZW1lOiB0cnVlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdbcHJvcF0gPSB0aGlzLm9wdGlvbnNbcHJvcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGdldCBldmVudHMoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBldmVudHModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZXZlbnRzICYmIHRoaXMuY2FsZW5kYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5yZW1vdmVBbGxFdmVudFNvdXJjZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5hZGRFdmVudFNvdXJjZSh0aGlzLl9ldmVudHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBvcHRpb25zKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zICYmIHRoaXMuY2FsZW5kYXIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLl9vcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uVmFsdWUgPSB0aGlzLl9vcHRpb25zW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdbcHJvcF0gPSBvcHRpb25WYWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuc2V0T3B0aW9uKHByb3AsIG9wdGlvblZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhci5yZW5kZXIoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5ldmVudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5yZW1vdmVBbGxFdmVudFNvdXJjZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5hZGRFdmVudFNvdXJjZSh0aGlzLmV2ZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENhbGVuZGFyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyO1xyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhciA9IG51bGw7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtGdWxsQ2FsZW5kYXJdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbRnVsbENhbGVuZGFyXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnVsbENhbGVuZGFyTW9kdWxlIHsgfVxyXG4iXX0=