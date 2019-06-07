var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, IterableDiffers } from '@angular/core';
import { CommonModule } from '@angular/common';
var Schedule = /** @class */ (function () {
    function Schedule(el, differs) {
        this.el = el;
        this.aspectRatio = 1.35;
        this.defaultView = 'month';
        this.allDaySlot = true;
        this.allDayText = 'all-day';
        this.slotDuration = '00:30:00';
        this.scrollTime = '06:00:00';
        this.minTime = '00:00:00';
        this.maxTime = '24:00:00';
        this.slotEventOverlap = true;
        this.dragRevertDuration = 500;
        this.dragOpacity = .75;
        this.dragScroll = true;
        this.timezone = false;
        this.timeFormat = null;
        this.onDayClick = new EventEmitter();
        this.onDrop = new EventEmitter();
        this.onEventClick = new EventEmitter();
        this.onEventMouseover = new EventEmitter();
        this.onEventMouseout = new EventEmitter();
        this.onEventDragStart = new EventEmitter();
        this.onEventDragStop = new EventEmitter();
        this.onEventDrop = new EventEmitter();
        this.onEventResizeStart = new EventEmitter();
        this.onEventResizeStop = new EventEmitter();
        this.onEventResize = new EventEmitter();
        this.onViewRender = new EventEmitter();
        this.onViewDestroy = new EventEmitter();
        this.onNavLinkDayClick = new EventEmitter();
        this.onNavLinkWeekClick = new EventEmitter();
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }
    Schedule.prototype.ngOnInit = function () {
        var _this = this;
        this.config = {
            theme: true,
            header: this.header,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
            fixedWeekCount: this.fixedWeekCount,
            weekNumbers: this.weekNumbers,
            businessHours: this.businessHours,
            height: this.height,
            contentHeight: this.contentHeight,
            aspectRatio: this.aspectRatio,
            eventLimit: this.eventLimit,
            defaultDate: this.defaultDate,
            locale: this.locale,
            timezone: this.timezone,
            timeFormat: this.timeFormat,
            editable: this.editable,
            droppable: this.droppable,
            eventStartEditable: this.eventStartEditable,
            eventDurationEditable: this.eventDurationEditable,
            defaultView: this.defaultView,
            allDaySlot: this.allDaySlot,
            allDayText: this.allDayText,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotLabelInterval,
            snapDuration: this.snapDuration,
            scrollTime: this.scrollTime,
            minTime: this.minTime,
            maxTime: this.maxTime,
            slotEventOverlap: this.slotEventOverlap,
            nowIndicator: this.nowIndicator,
            dragRevertDuration: this.dragRevertDuration,
            dragOpacity: this.dragOpacity,
            dragScroll: this.dragScroll,
            eventOverlap: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            eventRender: this.eventRender,
            dayRender: this.dayRender,
            navLinks: this.navLinks,
            dayClick: function (date, jsEvent, view) {
                _this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            drop: function (date, jsEvent, ui, resourceId) {
                _this.onDrop.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'ui': ui,
                    'resourceId': resourceId
                });
            },
            eventClick: function (calEvent, jsEvent, view) {
                _this.onEventClick.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: function (calEvent, jsEvent, view) {
                _this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: function (calEvent, jsEvent, view) {
                _this.onEventMouseout.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: function (event, jsEvent, ui, view) {
                _this.onEventDragStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: function (event, jsEvent, ui, view) {
                _this.onEventDragStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                _this._updateEvent(event);
                _this.onEventDrop.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: function (event, jsEvent, ui, view) {
                _this.onEventResizeStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: function (event, jsEvent, ui, view) {
                _this.onEventResizeStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
                _this._updateEvent(event);
                _this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            viewRender: function (view, element) {
                _this.onViewRender.emit({
                    'view': view,
                    'element': element
                });
            },
            viewDestroy: function (view, element) {
                _this.onViewDestroy.emit({
                    'view': view,
                    'element': element
                });
            },
            navLinkDayClick: function (weekStart, jsEvent) {
                _this.onNavLinkDayClick.emit({
                    'weekStart': weekStart,
                    'event': jsEvent
                });
            },
            navLinkWeekClick: function (weekStart, jsEvent) {
                _this.onNavLinkWeekClick.emit({
                    'weekStart': weekStart,
                    'event': jsEvent
                });
            }
        };
        if (this.options) {
            for (var prop in this.options) {
                this.config[prop] = this.options[prop];
            }
        }
    };
    Schedule.prototype.ngAfterViewChecked = function () {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    };
    Schedule.prototype.ngOnChanges = function (changes) {
        if (this.calendar) {
            for (var propName in changes) {
                if (propName !== 'options' && propName !== 'events') {
                    this.calendar.option(propName, changes[propName].currentValue);
                }
            }
        }
    };
    Object.defineProperty(Schedule.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
            if (this._options && this.calendar) {
                for (var prop in this._options) {
                    var optionValue = this._options[prop];
                    this.config[prop] = optionValue;
                    this.calendar.option(prop, optionValue);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Schedule.prototype.initialize = function () {
        this.calendar = new FullCalendar.Calendar(this.el.nativeElement.children[0], this.config);
        this.calendar.render();
        this.initialized = true;
        if (this.events) {
            this.calendar.addEventSource(this.events);
        }
    };
    Schedule.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.events);
        if (this.calendar && changes) {
            this.calendar.removeEventSources();
            if (this.events) {
                this.calendar.addEventSource(this.events);
            }
        }
    };
    Schedule.prototype.ngOnDestroy = function () {
        if (this.calendar) {
            this.calendar.destroy;
            this.initialized = false;
            this.calendar = null;
        }
    };
    Schedule.prototype.gotoDate = function (date) {
        this.calendar.gotoDate(date);
    };
    Schedule.prototype.prev = function () {
        this.calendar.prev();
    };
    Schedule.prototype.next = function () {
        this.calendar.next();
    };
    Schedule.prototype.prevYear = function () {
        this.calendar.prevYear();
    };
    Schedule.prototype.nextYear = function () {
        this.calendar.nextYear();
    };
    Schedule.prototype.today = function () {
        this.calendar.today();
    };
    Schedule.prototype.incrementDate = function (duration) {
        this.calendar.incrementDate(duration);
    };
    Schedule.prototype.changeView = function (viewName, dateOrRange) {
        this.calendar.changeView(viewName, dateOrRange);
    };
    Schedule.prototype.getDate = function () {
        return this.calendar.getDate();
    };
    Schedule.prototype.updateEvent = function (event) {
        this.calendar.updateEvent(event);
    };
    Schedule.prototype._findEvent = function (id) {
        var event;
        if (this.events) {
            for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.id === id) {
                    event = e;
                    break;
                }
            }
        }
        return event;
    };
    Schedule.prototype._updateEvent = function (event) {
        var sourceEvent = this._findEvent(event.id);
        if (sourceEvent) {
            sourceEvent.start = event.start.format();
            if (event.end) {
                sourceEvent.end = event.end.format();
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], Schedule.prototype, "events", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Schedule.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "rtl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "weekends", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], Schedule.prototype, "hiddenDays", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "fixedWeekCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "weekNumbers", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "businessHours", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "contentHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Schedule.prototype, "aspectRatio", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "eventLimit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "defaultDate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "editable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "droppable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "eventStartEditable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "eventDurationEditable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Schedule.prototype, "defaultView", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "allDaySlot", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Schedule.prototype, "allDayText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "slotDuration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "slotLabelInterval", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "snapDuration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "scrollTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "minTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "maxTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "slotEventOverlap", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "nowIndicator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Schedule.prototype, "dragRevertDuration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Schedule.prototype, "dragOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "dragScroll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "eventOverlap", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "eventConstraint", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Schedule.prototype, "locale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Schedule.prototype, "timezone", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Schedule.prototype, "timeFormat", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], Schedule.prototype, "eventRender", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], Schedule.prototype, "dayRender", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Schedule.prototype, "navLinks", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onDayClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onDrop", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onEventClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onEventMouseover", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onEventMouseout", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onEventDragStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onEventDragStop", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onEventDrop", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onEventResizeStart", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onEventResizeStop", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onEventResize", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onViewRender", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onViewDestroy", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onNavLinkDayClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Schedule.prototype, "onNavLinkWeekClick", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Schedule.prototype, "options", null);
    Schedule = __decorate([
        Component({
            selector: 'p-schedule',
            template: '<div [ngStyle]="style" [class]="styleClass"></div>'
        }),
        __metadata("design:paramtypes", [ElementRef, IterableDiffers])
    ], Schedule);
    return Schedule;
}());
export { Schedule };
var ScheduleModule = /** @class */ (function () {
    function ScheduleModule() {
    }
    ScheduleModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Schedule],
            declarations: [Schedule]
        })
    ], ScheduleModule);
    return ScheduleModule;
}());
export { ScheduleModule };
//# sourceMappingURL=schedule.js.map