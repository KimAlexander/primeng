var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, OnInit, Input, Output, EventEmitter, forwardRef, Renderer2, ViewChild, ChangeDetectorRef, TemplateRef, ContentChildren, QueryList, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const CALENDAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Calendar),
    multi: true
};
let Calendar = class Calendar {
    constructor(el, renderer, cd, zone) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.dateFormat = 'mm/dd/yy';
        this.multipleSeparator = ',';
        this.rangeSeparator = '-';
        this.inline = false;
        this.showOtherMonths = true;
        this.icon = 'pi pi-calendar';
        this.shortYearCutoff = '+10';
        this.hourFormat = '24';
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.showSeconds = false;
        this.showOnFocus = true;
        this.showWeek = false;
        this.dataType = 'date';
        this.selectionMode = 'single';
        this.todayButtonStyleClass = 'ui-button-secondary';
        this.clearButtonStyleClass = 'ui-button-secondary';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.keepInvalid = false;
        this.hideOnDateTimeSelect = true;
        this.numberOfMonths = 1;
        this.view = 'date';
        this.timeSeparator = ":";
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onInput = new EventEmitter();
        this.onTodayClick = new EventEmitter();
        this.onClearClick = new EventEmitter();
        this.onMonthChange = new EventEmitter();
        this.onYearChange = new EventEmitter();
        this.onClickOutside = new EventEmitter();
        this.onShow = new EventEmitter();
        this._locale = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.inputFieldValue = null;
        this.navigationState = null;
        this.convertTo24Hour = function (hours, pm) {
            if (this.hourFormat == '12') {
                if (hours === 12) {
                    return (pm ? 12 : 0);
                }
                else {
                    return (pm ? hours + 12 : hours);
                }
            }
            return hours;
        };
    }
    set content(content) {
        this.contentViewChild = content;
        if (this.contentViewChild) {
            if (this.isMonthNavigate) {
                Promise.resolve(null).then(() => this.updateFocus());
                this.isMonthNavigate = false;
            }
            else {
                this.initFocusableCell();
            }
        }
    }
    ;
    get minDate() {
        return this._minDate;
    }
    set minDate(date) {
        this._minDate = date;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(date) {
        this._maxDate = date;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    get disabledDates() {
        return this._disabledDates;
    }
    set disabledDates(disabledDates) {
        this._disabledDates = disabledDates;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    get disabledDays() {
        return this._disabledDays;
    }
    set disabledDays(disabledDays) {
        this._disabledDays = disabledDays;
        if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    get yearRange() {
        return this._yearRange;
    }
    set yearRange(yearRange) {
        this._yearRange = yearRange;
        if (yearRange) {
            const years = yearRange.split(':');
            const yearStart = parseInt(years[0]);
            const yearEnd = parseInt(years[1]);
            this.populateYearOptions(yearStart, yearEnd);
        }
    }
    get showTime() {
        return this._showTime;
    }
    set showTime(showTime) {
        this._showTime = showTime;
        if (this.currentHour === undefined) {
            this.initTime(this.value || new Date());
        }
        this.updateInputfield();
    }
    get locale() {
        return this._locale;
    }
    set locale(newLocale) {
        this._locale = newLocale;
        if (this.view === 'date') {
            this.createWeekDays();
            this.createMonths(this.currentMonth, this.currentYear);
        }
        else if (this.view === 'month') {
            this.createMonthPickerValues();
        }
    }
    ngOnInit() {
        const date = this.defaultDate || new Date();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
        }
        else if (this.view === 'month') {
            this.createMonthPickerValues();
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'date':
                    this.dateTemplate = item.template;
                    break;
                case 'disabledDate':
                    this.disabledDateTemplate = item.template;
                    break;
                default:
                    this.dateTemplate = item.template;
                    break;
            }
        });
    }
    populateYearOptions(start, end) {
        this.yearOptions = [];
        for (let i = start; i <= end; i++) {
            this.yearOptions.push(i);
        }
    }
    createWeekDays() {
        this.weekDays = [];
        let dayIndex = this.locale.firstDayOfWeek;
        for (let i = 0; i < 7; i++) {
            this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
        }
    }
    createMonthPickerValues() {
        this.monthPickerValues = [];
        for (let i = 0; i <= 11; i++) {
            this.monthPickerValues.push(this.locale.monthNamesShort[i]);
        }
    }
    createMonths(month, year) {
        this.months = this.months = [];
        for (let i = 0; i < this.numberOfMonths; i++) {
            let m = month + i;
            let y = year;
            if (m > 11) {
                m = m % 11 - 1;
                y = year + 1;
            }
            this.months.push(this.createMonth(m, y));
        }
    }
    getWeekNumber(date) {
        let checkDate = new Date(date.getTime());
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        let time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    }
    createMonth(month, year) {
        let dates = [];
        let firstDay = this.getFirstDayOfMonthIndex(month, year);
        let daysLength = this.getDaysCountInMonth(month, year);
        let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let dayNo = 1;
        let today = new Date();
        let weekNumbers = [];
        let monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (let i = 0; i < monthRows; i++) {
            let week = [];
            if (i == 0) {
                for (let j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    let prev = this.getPreviousMonthAndYear(month, year);
                    week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
                }
                let remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(dayNo, month, year, false) });
                    dayNo++;
                }
            }
            else {
                for (let j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        let next = this.getNextMonthAndYear(month, year);
                        week.push({ day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year, true) });
                    }
                    else {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false) });
                    }
                    dayNo++;
                }
            }
            if (this.showWeek) {
                weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
            }
            dates.push(week);
        }
        return {
            month: month,
            year: year,
            dates: dates,
            weekNumbers: weekNumbers
        };
    }
    initTime(date) {
        this.pm = date.getHours() > 11;
        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            this.setCurrentHourPM(date.getHours());
        }
        else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
    }
    navBackward(event) {
        event.stopPropagation();
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.isMonthNavigate = true;
        if (this.view === 'month') {
            this.decrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.decrementYear();
            }
            else {
                this.currentMonth--;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    navForward(event) {
        event.stopPropagation();
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        this.isMonthNavigate = true;
        if (this.view === 'month') {
            this.incrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        }
        else {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.incrementYear();
            }
            else {
                this.currentMonth++;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    decrementYear() {
        this.currentYear--;
        if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
            let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
            this.populateYearOptions(this.yearOptions[0] - difference, this.yearOptions[this.yearOptions.length - 1] - difference);
        }
    }
    incrementYear() {
        this.currentYear++;
        if (this.yearNavigator && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
            let difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
            this.populateYearOptions(this.yearOptions[0] + difference, this.yearOptions[this.yearOptions.length - 1] + difference);
        }
    }
    onDateSelect(event, dateMeta) {
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
            this.value = this.value.filter((date, i) => {
                return !this.isDateEquals(date, dateMeta);
            });
            this.updateModel(this.value);
        }
        else {
            if (this.shouldSelectDate(dateMeta)) {
                this.selectDate(dateMeta);
            }
        }
        if (this.isSingleSelection() && this.hideOnDateTimeSelect) {
            setTimeout(() => {
                event.preventDefault();
                this.hideOverlay();
                if (this.mask) {
                    this.disableModality();
                }
                this.cd.markForCheck();
            }, 150);
        }
        this.updateInputfield();
        event.preventDefault();
    }
    shouldSelectDate(dateMeta) {
        if (this.isMultipleSelection())
            return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
        else
            return true;
    }
    onMonthSelect(event, index) {
        if (!DomHandler.hasClass(event.target, 'ui-state-disabled')) {
            this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
        }
    }
    updateInputfield() {
        let formattedValue = '';
        if (this.value) {
            if (this.isSingleSelection()) {
                formattedValue = this.formatDateTime(this.value);
            }
            else if (this.isMultipleSelection()) {
                for (let i = 0; i < this.value.length; i++) {
                    let dateAsString = this.formatDateTime(this.value[i]);
                    formattedValue += dateAsString;
                    if (i !== (this.value.length - 1)) {
                        formattedValue += this.multipleSeparator + ' ';
                    }
                }
            }
            else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    let startDate = this.value[0];
                    let endDate = this.value[1];
                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
                    }
                }
            }
        }
        this.inputFieldValue = formattedValue;
        this.updateFilledState();
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
        }
    }
    formatDateTime(date) {
        let formattedValue = null;
        if (date) {
            if (this.timeOnly) {
                formattedValue = this.formatTime(date);
            }
            else {
                formattedValue = this.formatDate(date, this.getDateFormat());
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        }
        return formattedValue;
    }
    setCurrentHourPM(hours) {
        if (this.hourFormat == '12') {
            this.pm = hours > 11;
            if (hours >= 12) {
                this.currentHour = (hours == 12) ? 12 : hours - 12;
            }
            else {
                this.currentHour = (hours == 0) ? 12 : hours;
            }
        }
        else {
            this.currentHour = hours;
        }
    }
    selectDate(dateMeta) {
        let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        if (this.showTime) {
            if (this.hourFormat == '12') {
                if (this.currentHour === 12)
                    date.setHours(this.pm ? 12 : 0);
                else
                    date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
            }
            else {
                date.setHours(this.currentHour);
            }
            date.setMinutes(this.currentMinute);
            date.setSeconds(this.currentSecond);
        }
        if (this.minDate && this.minDate > date) {
            date = this.minDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.maxDate && this.maxDate < date) {
            date = this.maxDate;
            this.setCurrentHourPM(date.getHours());
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.isSingleSelection()) {
            this.updateModel(date);
        }
        else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? [...this.value, date] : [date]);
        }
        else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                let startDate = this.value[0];
                let endDate = this.value[1];
                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                }
                else {
                    startDate = date;
                    endDate = null;
                }
                this.updateModel([startDate, endDate]);
            }
            else {
                this.updateModel([date, null]);
            }
        }
        this.onSelect.emit(date);
    }
    updateModel(value) {
        this.value = value;
        if (this.dataType == 'date') {
            this.onModelChange(this.value);
        }
        else if (this.dataType == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            }
            else {
                let stringArrValue = null;
                if (this.value) {
                    stringArrValue = this.value.map(date => this.formatDateTime(date));
                }
                this.onModelChange(stringArrValue);
            }
        }
    }
    getFirstDayOfMonthIndex(month, year) {
        let day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);
        let dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    }
    getDaysCountInMonth(month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    }
    getDaysCountInPrevMonth(month, year) {
        let prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    }
    getPreviousMonthAndYear(month, year) {
        let m, y;
        if (month === 0) {
            m = 11;
            y = year - 1;
        }
        else {
            m = month - 1;
            y = year;
        }
        return { 'month': m, 'year': y };
    }
    getNextMonthAndYear(month, year) {
        let m, y;
        if (month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
            y = year;
        }
        return { 'month': m, 'year': y };
    }
    getSundayIndex() {
        return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
    }
    isSelected(dateMeta) {
        if (this.value) {
            if (this.isSingleSelection()) {
                return this.isDateEquals(this.value, dateMeta);
            }
            else if (this.isMultipleSelection()) {
                let selected = false;
                for (let date of this.value) {
                    selected = this.isDateEquals(date, dateMeta);
                    if (selected) {
                        break;
                    }
                }
                return selected;
            }
            else if (this.isRangeSelection()) {
                if (this.value[1])
                    return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                else
                    return this.isDateEquals(this.value[0], dateMeta);
            }
        }
        else {
            return false;
        }
    }
    isMonthSelected(month) {
        let day = this.value ? (Array.isArray(this.value) ? this.value[0].getDate() : this.value.getDate()) : 1;
        return this.isSelected({ year: this.currentYear, month: month, day: day, selectable: true });
    }
    isDateEquals(value, dateMeta) {
        if (value)
            return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else
            return false;
    }
    isDateBetween(start, end, dateMeta) {
        let between = false;
        if (start && end) {
            let date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
            return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
        }
        return between;
    }
    isSingleSelection() {
        return this.selectionMode === 'single';
    }
    isRangeSelection() {
        return this.selectionMode === 'range';
    }
    isMultipleSelection() {
        return this.selectionMode === 'multiple';
    }
    isToday(today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    }
    isSelectable(day, month, year, otherMonth) {
        let validMin = true;
        let validMax = true;
        let validDate = true;
        let validDay = true;
        if (otherMonth && !this.selectOtherMonths) {
            return false;
        }
        if (this.minDate) {
            if (this.minDate.getFullYear() > year) {
                validMin = false;
            }
            else if (this.minDate.getFullYear() === year) {
                if (this.minDate.getMonth() > month) {
                    validMin = false;
                }
                else if (this.minDate.getMonth() === month) {
                    if (this.minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }
        if (this.maxDate) {
            if (this.maxDate.getFullYear() < year) {
                validMax = false;
            }
            else if (this.maxDate.getFullYear() === year) {
                if (this.maxDate.getMonth() < month) {
                    validMax = false;
                }
                else if (this.maxDate.getMonth() === month) {
                    if (this.maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }
        if (this.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }
        if (this.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year);
        }
        return validMin && validMax && validDate && validDay;
    }
    isDateDisabled(day, month, year) {
        if (this.disabledDates) {
            for (let disabledDate of this.disabledDates) {
                if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                    return true;
                }
            }
        }
        return false;
    }
    isDayDisabled(day, month, year) {
        if (this.disabledDays) {
            let weekday = new Date(year, month, day);
            let weekdayNumber = weekday.getDay();
            return this.disabledDays.indexOf(weekdayNumber) !== -1;
        }
        return false;
    }
    onInputFocus(event) {
        this.focus = true;
        if (this.showOnFocus) {
            this.showOverlay();
        }
        this.onFocus.emit(event);
    }
    onInputClick(event) {
        if (this.overlay && this.autoZIndex) {
            this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        if (this.showOnFocus && !this.overlayVisible) {
            this.showOverlay();
        }
    }
    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit(event);
        if (!this.keepInvalid) {
            this.updateInputfield();
        }
        this.onModelTouched();
    }
    onButtonClick(event, inputfield) {
        if (!this.overlayVisible) {
            inputfield.focus();
            this.showOverlay();
        }
        else {
            this.hideOverlay();
        }
    }
    onPrevButtonClick(event) {
        this.navigationState = { backward: true, button: true };
        this.navBackward(event);
    }
    onNextButtonClick(event) {
        this.navigationState = { backward: false, button: true };
        this.navForward(event);
    }
    onContainerButtonKeydown(event) {
        switch (event.which) {
            //tab
            case 9:
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            //escape
            case 27:
                this.overlayVisible = false;
                event.preventDefault();
                break;
            default:
                //Noop
                break;
        }
    }
    onInputKeydown(event) {
        this.isKeydown = true;
        if (event.keyCode === 9 && this.contentViewChild) {
            this.trapFocus(event);
        }
        else if (event.keyCode === 27) {
            if (this.overlayVisible) {
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
    }
    onDateCellKeydown(event, date, groupIndex) {
        const cellContent = event.currentTarget;
        const cell = cellContent.parentElement;
        switch (event.which) {
            //down arrow
            case 40: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    let focusCell = nextRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'ui-state-disabled')) {
                        this.navigationState = { backward: false };
                        this.navForward(event);
                    }
                    else {
                        nextRow.children[cellIndex].children[0].tabIndex = '0';
                        nextRow.children[cellIndex].children[0].focus();
                    }
                }
                else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }
            //up arrow
            case 38: {
                cellContent.tabIndex = '-1';
                let cellIndex = DomHandler.index(cell);
                let prevRow = cell.parentElement.previousElementSibling;
                if (prevRow) {
                    let focusCell = prevRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'ui-state-disabled')) {
                        this.navigationState = { backward: true };
                        this.navBackward(event);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cellContent.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    let focusCell = prevCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'ui-state-disabled') || DomHandler.hasClass(focusCell.parentElement, 'ui-datepicker-weeknumber')) {
                        this.navigateToMonth(true, groupIndex);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(true, groupIndex);
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cellContent.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    let focusCell = nextCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'ui-state-disabled')) {
                        this.navigateToMonth(false, groupIndex);
                    }
                    else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                }
                else {
                    this.navigateToMonth(false, groupIndex);
                }
                event.preventDefault();
                break;
            }
            //enter
            case 13: {
                this.onDateSelect(event, date);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }
            default:
                //no op
                break;
        }
    }
    onMonthCellKeydown(event, index) {
        const cell = event.currentTarget;
        switch (event.which) {
            //arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                var cells = cell.parentElement.children;
                var cellIndex = DomHandler.index(cell);
                let nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }
            //left arrow
            case 37: {
                cell.tabIndex = '-1';
                let prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                }
                event.preventDefault();
                break;
            }
            //right arrow
            case 39: {
                cell.tabIndex = '-1';
                let nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }
            //enter
            case 13: {
                this.onMonthSelect(event, index);
                event.preventDefault();
                break;
            }
            //escape
            case 27: {
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }
            //tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }
            default:
                //no op
                break;
        }
    }
    navigateToMonth(prev, groupIndex) {
        if (prev) {
            if (this.numberOfMonths === 1 || (groupIndex === 0)) {
                this.navigationState = { backward: true };
                this.navBackward(event);
            }
            else {
                let prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
                let cells = DomHandler.find(prevMonthContainer, '.ui-datepicker-calendar td a');
                let focusCell = cells[cells.length - 1];
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
        else {
            if (this.numberOfMonths === 1 || (groupIndex === this.numberOfMonths - 1)) {
                this.navigationState = { backward: false };
                this.navForward(event);
            }
            else {
                let nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
                let focusCell = DomHandler.findSingle(nextMonthContainer, '.ui-datepicker-calendar td a');
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
    }
    updateFocus() {
        let cell;
        if (this.navigationState) {
            if (this.navigationState.button) {
                this.initFocusableCell();
                if (this.navigationState.backward)
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-datepicker-prev').focus();
                else
                    DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-datepicker-next').focus();
            }
            else {
                if (this.navigationState.backward) {
                    let cells = DomHandler.find(this.contentViewChild.nativeElement, '.ui-datepicker-calendar td a');
                    cell = cells[cells.length - 1];
                }
                else {
                    cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-datepicker-calendar td a');
                }
                if (cell) {
                    cell.tabIndex = '0';
                    cell.focus();
                }
            }
            this.navigationState = null;
        }
        else {
            this.initFocusableCell();
        }
    }
    initFocusableCell() {
        let cell;
        if (this.view === 'month') {
            let cells = DomHandler.find(this.contentViewChild.nativeElement, '.ui-monthpicker .ui-monthpicker-month:not(.ui-state-disabled)');
            let selectedCell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-monthpicker .ui-monthpicker-month.ui-state-highlight');
            cells.forEach(cell => cell.tabIndex = -1);
            cell = selectedCell || cells[0];
            if (cells.length === 0) {
                let disabledCells = DomHandler.find(this.contentViewChild.nativeElement, '.ui-monthpicker .ui-monthpicker-month.ui-state-disabled[tabindex = "0"]');
                disabledCells.forEach(cell => cell.tabIndex = -1);
            }
        }
        else {
            cell = DomHandler.findSingle(this.contentViewChild.nativeElement, 'a.ui-state-active');
            if (!cell) {
                let todayCell = DomHandler.findSingle(this.contentViewChild.nativeElement, 'td.ui-datepicker-today a:not(.ui-state-disabled)');
                if (todayCell)
                    cell = todayCell;
                else
                    cell = DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-datepicker-calendar td a');
            }
        }
        if (cell) {
            cell.tabIndex = '0';
        }
    }
    trapFocus(event) {
        event.preventDefault();
        let focusableElements = DomHandler.getFocusableElements(this.contentViewChild.nativeElement);
        if (focusableElements && focusableElements.length > 0) {
            if (!document.activeElement) {
                focusableElements[0].focus();
            }
            else {
                let focusedIndex = focusableElements.indexOf(document.activeElement);
                if (event.shiftKey) {
                    if (focusedIndex == -1 || focusedIndex === 0)
                        focusableElements[focusableElements.length - 1].focus();
                    else
                        focusableElements[focusedIndex - 1].focus();
                }
                else {
                    if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                        focusableElements[0].focus();
                    else
                        focusableElements[focusedIndex + 1].focus();
                }
            }
        }
    }
    onMonthDropdownChange(m) {
        this.currentMonth = parseInt(m);
        this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }
    onYearDropdownChange(y) {
        this.currentYear = parseInt(y);
        this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    }
    validateTime(hour, minute, second, pm) {
        let value = this.value;
        const convertedHour = this.convertTo24Hour(hour, pm);
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        const valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (this.minDate.getHours() > convertedHour) {
                return false;
            }
            if (this.minDate.getHours() === convertedHour) {
                if (this.minDate.getMinutes() > minute) {
                    return false;
                }
                if (this.minDate.getMinutes() === minute) {
                    if (this.minDate.getSeconds() > second) {
                        return false;
                    }
                }
            }
        }
        if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (this.maxDate.getHours() < convertedHour) {
                return false;
            }
            if (this.maxDate.getHours() === convertedHour) {
                if (this.maxDate.getMinutes() < minute) {
                    return false;
                }
                if (this.maxDate.getMinutes() === minute) {
                    if (this.maxDate.getSeconds() < second) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    incrementHour(event) {
        const prevHour = this.currentHour;
        let newHour = this.currentHour + this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24')
            newHour = (newHour >= 24) ? (newHour - 24) : newHour;
        else if (this.hourFormat == '12') {
            // Before the AM/PM break, now after
            if (prevHour < 12 && newHour > 11) {
                newPM = !this.pm;
            }
            newHour = (newHour >= 13) ? (newHour - 12) : newHour;
        }
        if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
            this.currentHour = newHour;
            this.pm = newPM;
        }
        event.preventDefault();
    }
    onTimePickerElementMouseDown(event, type, direction) {
        if (!this.disabled) {
            this.repeat(event, null, type, direction);
            event.preventDefault();
        }
    }
    onTimePickerElementMouseUp(event) {
        if (!this.disabled) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }
    onTimePickerElementMouseOut(event) {
        if (!this.disabled) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }
    repeat(event, interval, type, direction) {
        let i = interval || 500;
        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(() => {
            this.repeat(event, 100, type, direction);
        }, i);
        switch (type) {
            case 0:
                if (direction === 1)
                    this.incrementHour(event);
                else
                    this.decrementHour(event);
                break;
            case 1:
                if (direction === 1)
                    this.incrementMinute(event);
                else
                    this.decrementMinute(event);
                break;
            case 2:
                if (direction === 1)
                    this.incrementSecond(event);
                else
                    this.decrementSecond(event);
                break;
        }
        this.updateInputfield();
    }
    clearTimePickerTimer() {
        if (this.timePickerTimer) {
            clearTimeout(this.timePickerTimer);
        }
    }
    decrementHour(event) {
        let newHour = this.currentHour - this.stepHour;
        let newPM = this.pm;
        if (this.hourFormat == '24')
            newHour = (newHour < 0) ? (24 + newHour) : newHour;
        else if (this.hourFormat == '12') {
            // If we were at noon/midnight, then switch
            if (this.currentHour === 12) {
                newPM = !this.pm;
            }
            newHour = (newHour <= 0) ? (12 + newHour) : newHour;
        }
        if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
            this.currentHour = newHour;
            this.pm = newPM;
        }
        event.preventDefault();
    }
    incrementMinute(event) {
        let newMinute = this.currentMinute + this.stepMinute;
        newMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
        if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
            this.currentMinute = newMinute;
        }
        event.preventDefault();
    }
    decrementMinute(event) {
        let newMinute = this.currentMinute - this.stepMinute;
        newMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
        if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
            this.currentMinute = newMinute;
        }
        event.preventDefault();
    }
    incrementSecond(event) {
        let newSecond = this.currentSecond + this.stepSecond;
        newSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
        if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
            this.currentSecond = newSecond;
        }
        event.preventDefault();
    }
    decrementSecond(event) {
        let newSecond = this.currentSecond - this.stepSecond;
        newSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
        if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
            this.currentSecond = newSecond;
        }
        event.preventDefault();
    }
    updateTime() {
        let value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        value = value ? new Date(value.getTime()) : new Date();
        if (this.hourFormat == '12') {
            if (this.currentHour === 12)
                value.setHours(this.pm ? 12 : 0);
            else
                value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
        }
        else {
            value.setHours(this.currentHour);
        }
        value.setMinutes(this.currentMinute);
        value.setSeconds(this.currentSecond);
        if (this.isRangeSelection()) {
            if (this.value[1])
                value = [this.value[0], value];
            else
                value = [value, null];
        }
        if (this.isMultipleSelection()) {
            value = [...this.value.slice(0, -1), value];
        }
        this.updateModel(value);
        this.onSelect.emit(value);
        this.updateInputfield();
    }
    toggleAMPM(event) {
        const newPM = !this.pm;
        if (this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, newPM)) {
            this.pm = newPM;
            this.updateTime();
        }
        event.preventDefault();
    }
    onUserInput(event) {
        // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;
        let val = event.target.value;
        try {
            let value = this.parseValueFromString(val);
            if (this.isValidSelection(value)) {
                this.updateModel(value);
                this.updateUI();
            }
        }
        catch (err) {
            //invalid date
            this.updateModel(null);
        }
        this.filled = val != null && val.length;
        this.onInput.emit(event);
    }
    isValidSelection(value) {
        let isValid = true;
        if (this.isSingleSelection()) {
            if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
                isValid = false;
            }
        }
        else if (value.every(v => this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false))) {
            if (this.isRangeSelection()) {
                isValid = value.length > 1 && value[1] > value[0] ? true : false;
            }
        }
        return isValid;
    }
    parseValueFromString(text) {
        if (!text || text.trim().length === 0) {
            return null;
        }
        let value;
        if (this.isSingleSelection()) {
            value = this.parseDateTime(text);
        }
        else if (this.isMultipleSelection()) {
            let tokens = text.split(this.multipleSeparator);
            value = [];
            for (let token of tokens) {
                value.push(this.parseDateTime(token.trim()));
            }
        }
        else if (this.isRangeSelection()) {
            let tokens = text.split(' ' + this.rangeSeparator + ' ');
            value = [];
            for (let i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }
        return value;
    }
    parseDateTime(text) {
        let date;
        let parts = text.split(' ');
        if (this.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        }
        else {
            const dateFormat = this.getDateFormat();
            if (this.showTime) {
                let ampm = this.hourFormat == '12' ? parts.pop() : null;
                let timeString = parts.pop();
                date = this.parseDate(parts.join(' '), dateFormat);
                this.populateTime(date, timeString, ampm);
            }
            else {
                date = this.parseDate(text, dateFormat);
            }
        }
        return date;
    }
    populateTime(value, timeString, ampm) {
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }
        this.pm = (ampm === 'PM' || ampm === 'pm');
        let time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    }
    updateUI() {
        let val = this.value || this.defaultDate || new Date();
        if (Array.isArray(val)) {
            val = val[0];
        }
        this.currentMonth = val.getMonth();
        this.currentYear = val.getFullYear();
        this.createMonths(this.currentMonth, this.currentYear);
        if (this.showTime || this.timeOnly) {
            this.setCurrentHourPM(val.getHours());
            this.currentMinute = val.getMinutes();
            this.currentSecond = val.getSeconds();
        }
    }
    showOverlay() {
        if (!this.overlayVisible) {
            this.updateUI();
            this.overlayVisible = true;
        }
    }
    hideOverlay() {
        this.overlayVisible = false;
        this.clearTimePickerTimer();
        if (this.touchUI) {
            this.disableModality();
        }
    }
    toggle() {
        if (!this.inline) {
            if (!this.overlayVisible) {
                this.showOverlay();
                this.inputfieldViewChild.nativeElement.focus();
            }
            else {
                this.hideOverlay();
            }
        }
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                    }
                    this.alignOverlay();
                    this.onShow.emit(event);
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onClose.emit(event);
                break;
        }
    }
    onOverlayAnimationDone(event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    alignOverlay() {
        if (this.touchUI) {
            this.enableModality(this.overlay);
        }
        else {
            if (this.appendTo)
                DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild.nativeElement);
            else
                DomHandler.relativePosition(this.overlay, this.inputfieldViewChild.nativeElement);
        }
    }
    enableModality(element) {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(element.style.zIndex) - 1);
            let maskStyleClass = 'ui-widget-overlay ui-datepicker-mask ui-datepicker-mask-scrollblocker';
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);
            this.maskClickListener = this.renderer.listen(this.mask, 'click', (event) => {
                this.disableModality();
            });
            document.body.appendChild(this.mask);
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    }
    disableModality() {
        if (this.mask) {
            document.body.removeChild(this.mask);
            let bodyChildren = document.body.children;
            let hasBlockerMasks;
            for (let i = 0; i < bodyChildren.length; i++) {
                let bodyChild = bodyChildren[i];
                if (DomHandler.hasClass(bodyChild, 'ui-datepicker-mask-scrollblocker')) {
                    hasBlockerMasks = true;
                    break;
                }
            }
            if (!hasBlockerMasks) {
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.unbindMaskClickListener();
            this.mask = null;
        }
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    writeValue(value) {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            this.value = this.parseValueFromString(this.value);
        }
        this.updateInputfield();
        this.updateUI();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
    getDateFormat() {
        return this.dateFormat || this.locale.dateFormat;
    }
    // Ported from jquery-ui datepicker formatDate
    formatDate(date, format) {
        if (!date) {
            return '';
        }
        let iFormat;
        const lookAhead = (match) => {
            const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, formatNumber = (match, value, len) => {
            let num = '' + value;
            if (lookAhead(match)) {
                while (num.length < len) {
                    num = '0' + num;
                }
            }
            return num;
        }, formatName = (match, value, shortNames, longNames) => {
            return (lookAhead(match) ? longNames[value] : shortNames[value]);
        };
        let output = '';
        let literal = false;
        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                        literal = false;
                    }
                    else {
                        output += format.charAt(iFormat);
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), this.locale.dayNamesShort, this.locale.dayNames);
                            break;
                        case 'o':
                            output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
                                new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames);
                            break;
                        case 'y':
                            output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case '\'':
                            if (lookAhead('\'')) {
                                output += '\'';
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    }
    formatTime(date) {
        if (!date) {
            return '';
        }
        let output = '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (this.hourFormat == '12' && hours > 11 && hours != 12) {
            hours -= 12;
        }
        if (this.hourFormat == '12') {
            output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
        }
        else {
            output += (hours < 10) ? '0' + hours : hours;
        }
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;
        if (this.showSeconds) {
            output += ':';
            output += (seconds < 10) ? '0' + seconds : seconds;
        }
        if (this.hourFormat == '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }
        return output;
    }
    parseTime(value) {
        let tokens = value.split(':');
        let validTokenLength = this.showSeconds ? 3 : 2;
        if (tokens.length !== validTokenLength) {
            throw "Invalid time";
        }
        let h = parseInt(tokens[0]);
        let m = parseInt(tokens[1]);
        let s = this.showSeconds ? parseInt(tokens[2]) : null;
        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
            throw "Invalid time";
        }
        else {
            if (this.hourFormat == '12') {
                if (h !== 12 && this.pm) {
                    h += 12;
                }
                else if (!this.pm && h === 12) {
                    h -= 12;
                }
            }
            return { hour: h, minute: m, second: s };
        }
    }
    // Ported from jquery-ui datepicker parseDate
    parseDate(value, format) {
        if (format == null || value == null) {
            throw "Invalid arguments";
        }
        value = (typeof value === "object" ? value.toString() : value + "");
        if (value === "") {
            return null;
        }
        let iFormat, dim, extra, iValue = 0, shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = (match) => {
            let matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, getNumber = (match) => {
            let isDoubled = lookAhead(match), size = (match === "@" ? 14 : (match === "!" ? 20 :
                (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))), minSize = (match === "y" ? size : 1), digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
            if (!num) {
                throw "Missing number at position " + iValue;
            }
            iValue += num[0].length;
            return parseInt(num[0], 10);
        }, getName = (match, shortNames, longNames) => {
            let index = -1;
            let arr = lookAhead(match) ? longNames : shortNames;
            let names = [];
            for (let i = 0; i < arr.length; i++) {
                names.push([i, arr[i]]);
            }
            names.sort((a, b) => {
                return -(a[1].length - b[1].length);
            });
            for (let i = 0; i < names.length; i++) {
                let name = names[i][1];
                if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                    index = names[i][0];
                    iValue += name.length;
                    break;
                }
            }
            if (index !== -1) {
                return index + 1;
            }
            else {
                throw "Unknown name at position " + iValue;
            }
        }, checkLiteral = () => {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
                throw "Unexpected literal at position " + iValue;
            }
            iValue++;
        };
        if (this.view === 'month') {
            day = 1;
        }
        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                }
                else {
                    checkLiteral();
                }
            }
            else {
                switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", this.locale.dayNamesShort, this.locale.dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", this.locale.monthNamesShort, this.locale.monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "!":
                        date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral();
                        }
                        else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }
        if (iValue < value.length) {
            extra = value.substr(iValue);
            if (!/^\s+/.test(extra)) {
                throw "Extra/unparsed characters found in date: " + extra;
            }
        }
        if (year === -1) {
            year = new Date().getFullYear();
        }
        else if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }
        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw "Invalid date"; // E.g. 31/02/00
        }
        return date;
    }
    daylightSavingAdjust(date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    }
    updateFilledState() {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
    }
    onTodayButtonClick(event) {
        let date = new Date();
        let dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };
        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(event);
    }
    onClearButtonClick(event) {
        this.updateModel(null);
        this.updateInputfield();
        this.hideOverlay();
        this.onClearClick.emit(event);
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.zone.runOutsideAngular(() => {
                this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event) && this.overlayVisible) {
                        this.zone.run(() => {
                            this.hideOverlay();
                            this.onClickOutside.emit(event);
                            this.cd.markForCheck();
                        });
                    }
                });
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        if (!this.documentResizeListener && !this.touchUI) {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) ||
            this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
    }
    isNavIconClicked(event) {
        return (DomHandler.hasClass(event.target, 'ui-datepicker-prev') || DomHandler.hasClass(event.target, 'ui-datepicker-prev-icon')
            || DomHandler.hasClass(event.target, 'ui-datepicker-next') || DomHandler.hasClass(event.target, 'ui-datepicker-next-icon'));
    }
    onWindowResize() {
        if (this.overlayVisible && !DomHandler.isAndroid()) {
            this.hideOverlay();
        }
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindMaskClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
        this.disableModality();
    }
    ngOnDestroy() {
        this.clearTimePickerTimer();
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
};
Calendar.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
__decorate([
    Input()
], Calendar.prototype, "defaultDate", void 0);
__decorate([
    Input()
], Calendar.prototype, "style", void 0);
__decorate([
    Input()
], Calendar.prototype, "styleClass", void 0);
__decorate([
    Input()
], Calendar.prototype, "inputStyle", void 0);
__decorate([
    Input()
], Calendar.prototype, "inputId", void 0);
__decorate([
    Input()
], Calendar.prototype, "name", void 0);
__decorate([
    Input()
], Calendar.prototype, "inputStyleClass", void 0);
__decorate([
    Input()
], Calendar.prototype, "placeholder", void 0);
__decorate([
    Input()
], Calendar.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], Calendar.prototype, "disabled", void 0);
__decorate([
    Input()
], Calendar.prototype, "dateFormat", void 0);
__decorate([
    Input()
], Calendar.prototype, "multipleSeparator", void 0);
__decorate([
    Input()
], Calendar.prototype, "rangeSeparator", void 0);
__decorate([
    Input()
], Calendar.prototype, "inline", void 0);
__decorate([
    Input()
], Calendar.prototype, "showOtherMonths", void 0);
__decorate([
    Input()
], Calendar.prototype, "selectOtherMonths", void 0);
__decorate([
    Input()
], Calendar.prototype, "showIcon", void 0);
__decorate([
    Input()
], Calendar.prototype, "icon", void 0);
__decorate([
    Input()
], Calendar.prototype, "appendTo", void 0);
__decorate([
    Input()
], Calendar.prototype, "readonlyInput", void 0);
__decorate([
    Input()
], Calendar.prototype, "shortYearCutoff", void 0);
__decorate([
    Input()
], Calendar.prototype, "monthNavigator", void 0);
__decorate([
    Input()
], Calendar.prototype, "yearNavigator", void 0);
__decorate([
    Input()
], Calendar.prototype, "hourFormat", void 0);
__decorate([
    Input()
], Calendar.prototype, "timeOnly", void 0);
__decorate([
    Input()
], Calendar.prototype, "stepHour", void 0);
__decorate([
    Input()
], Calendar.prototype, "stepMinute", void 0);
__decorate([
    Input()
], Calendar.prototype, "stepSecond", void 0);
__decorate([
    Input()
], Calendar.prototype, "showSeconds", void 0);
__decorate([
    Input()
], Calendar.prototype, "required", void 0);
__decorate([
    Input()
], Calendar.prototype, "showOnFocus", void 0);
__decorate([
    Input()
], Calendar.prototype, "showWeek", void 0);
__decorate([
    Input()
], Calendar.prototype, "dataType", void 0);
__decorate([
    Input()
], Calendar.prototype, "selectionMode", void 0);
__decorate([
    Input()
], Calendar.prototype, "maxDateCount", void 0);
__decorate([
    Input()
], Calendar.prototype, "showButtonBar", void 0);
__decorate([
    Input()
], Calendar.prototype, "todayButtonStyleClass", void 0);
__decorate([
    Input()
], Calendar.prototype, "clearButtonStyleClass", void 0);
__decorate([
    Input()
], Calendar.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], Calendar.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], Calendar.prototype, "panelStyleClass", void 0);
__decorate([
    Input()
], Calendar.prototype, "panelStyle", void 0);
__decorate([
    Input()
], Calendar.prototype, "keepInvalid", void 0);
__decorate([
    Input()
], Calendar.prototype, "hideOnDateTimeSelect", void 0);
__decorate([
    Input()
], Calendar.prototype, "numberOfMonths", void 0);
__decorate([
    Input()
], Calendar.prototype, "view", void 0);
__decorate([
    Input()
], Calendar.prototype, "touchUI", void 0);
__decorate([
    Input()
], Calendar.prototype, "timeSeparator", void 0);
__decorate([
    Input()
], Calendar.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], Calendar.prototype, "hideTransitionOptions", void 0);
__decorate([
    Output()
], Calendar.prototype, "onFocus", void 0);
__decorate([
    Output()
], Calendar.prototype, "onBlur", void 0);
__decorate([
    Output()
], Calendar.prototype, "onClose", void 0);
__decorate([
    Output()
], Calendar.prototype, "onSelect", void 0);
__decorate([
    Output()
], Calendar.prototype, "onInput", void 0);
__decorate([
    Output()
], Calendar.prototype, "onTodayClick", void 0);
__decorate([
    Output()
], Calendar.prototype, "onClearClick", void 0);
__decorate([
    Output()
], Calendar.prototype, "onMonthChange", void 0);
__decorate([
    Output()
], Calendar.prototype, "onYearChange", void 0);
__decorate([
    Output()
], Calendar.prototype, "onClickOutside", void 0);
__decorate([
    Output()
], Calendar.prototype, "onShow", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], Calendar.prototype, "templates", void 0);
__decorate([
    Input()
], Calendar.prototype, "tabindex", void 0);
__decorate([
    ViewChild('inputfield', { static: false })
], Calendar.prototype, "inputfieldViewChild", void 0);
__decorate([
    ViewChild('contentWrapper', { static: false })
], Calendar.prototype, "content", null);
__decorate([
    Input()
], Calendar.prototype, "minDate", null);
__decorate([
    Input()
], Calendar.prototype, "maxDate", null);
__decorate([
    Input()
], Calendar.prototype, "disabledDates", null);
__decorate([
    Input()
], Calendar.prototype, "disabledDays", null);
__decorate([
    Input()
], Calendar.prototype, "yearRange", null);
__decorate([
    Input()
], Calendar.prototype, "showTime", null);
__decorate([
    Input()
], Calendar.prototype, "locale", null);
Calendar = __decorate([
    Component({
        selector: 'p-calendar',
        template: `
        <span [ngClass]="{'ui-calendar':true, 'ui-calendar-w-btn': showIcon, 'ui-calendar-timeonly': timeOnly}" [ngStyle]="style" [class]="styleClass">
            <ng-template [ngIf]="!inline">
                <input #inputfield type="text" [attr.id]="inputId" [attr.name]="name" [attr.required]="required" [attr.aria-required]="required" [value]="inputFieldValue" (focus)="onInputFocus($event)" (keydown)="onInputKeydown($event)" (click)="onInputClick($event)" (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput" (input)="onUserInput($event)" [ngStyle]="inputStyle" [class]="inputStyleClass" [placeholder]="placeholder||''" [disabled]="disabled" [attr.tabindex]="tabindex"
                    [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all'" autocomplete="off" [attr.aria-labelledby]="ariaLabelledBy"
                    ><button type="button" [icon]="icon" pButton *ngIf="showIcon" (click)="onButtonClick($event,inputfield)" class="ui-datepicker-trigger ui-calendar-button"
                    [ngClass]="{'ui-state-disabled':disabled}" [disabled]="disabled" tabindex="0"></button>
            </ng-template>
            <div #contentWrapper [class]="panelStyleClass" [ngStyle]="panelStyle" [ngClass]="{'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all': true, 'ui-datepicker-inline':inline,'ui-shadow':!inline,
                'ui-state-disabled':disabled,'ui-datepicker-timeonly':timeOnly,'ui-datepicker-multiple-month': this.numberOfMonths > 1, 'ui-datepicker-monthpicker': (view === 'month'), 'ui-datepicker-touch-ui': touchUI}"
                [@overlayAnimation]="touchUI ? {value: 'visibleTouchUI', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}: 
                                            {value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" 
                                            [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)" *ngIf="inline || overlayVisible">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngIf="!timeOnly">
                    <div class="ui-datepicker-group ui-widget-content" *ngFor="let month of months; let i = index;">
                        <div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
                            <a class="ui-datepicker-prev ui-corner-all" (click)="onPrevButtonClick($event)" (keydown.enter)="onPrevButtonClick($event)" *ngIf="i === 0" tabindex="0" (keydown)="onInputKeydown($event)">
                                <span class="ui-datepicker-prev-icon pi pi-chevron-left"></span>
                            </a>
                            <div class="ui-datepicker-title">
                                <span class="ui-datepicker-month" *ngIf="!monthNavigator && (view !== 'month')">{{locale.monthNames[month.month]}}</span>
                                <select tabindex="0" class="ui-datepicker-month" *ngIf="monthNavigator && (view !== 'month') && numberOfMonths === 1" (change)="onMonthDropdownChange($event.target.value)">
                                    <option [value]="i" *ngFor="let monthName of locale.monthNames;let i = index" [selected]="i === month.month">{{monthName}}</option>
                                </select>
                                <select tabindex="0" class="ui-datepicker-year" *ngIf="yearNavigator && numberOfMonths === 1" (change)="onYearDropdownChange($event.target.value)">
                                    <option [value]="year" *ngFor="let year of yearOptions" [selected]="year === currentYear">{{year}}</option>
                                </select>
                                <span class="ui-datepicker-year" *ngIf="!yearNavigator">{{view === 'month' ? currentYear : month.year}}</span>
                            </div>
                            <a class="ui-datepicker-next ui-corner-all" (click)="onNextButtonClick($event)" (keydown.enter)="onNextButtonClick($event)" *ngIf="numberOfMonths === 1 ? true : (i === numberOfMonths -1)" tabindex="0" (keydown)="onInputKeydown($event)">
                                <span class="ui-datepicker-next-icon pi pi-chevron-right"></span>
                            </a>
                        </div>
                        <div class="ui-datepicker-calendar-container" *ngIf="view ==='date'">
                            <table class="ui-datepicker-calendar">
                                <thead>
                                    <tr>
                                        <th *ngIf="showWeek" class="ui-datepicker-weekheader">
                                            <span>{{locale['weekHeader']}}</span>
                                        </th>
                                        <th scope="col" *ngFor="let weekDay of weekDays;let begin = first; let end = last">
                                            <span>{{weekDay}}</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let week of month.dates; let j = index;">
                                        <td *ngIf="showWeek" class="ui-datepicker-weeknumber ui-state-disabled">
                                            <span>
                                                {{month.weekNumbers[j]}}
                                            </span>
                                        </td>
                                        <td *ngFor="let date of week" [ngClass]="{'ui-datepicker-other-month': date.otherMonth,
                                            'ui-datepicker-current-day':isSelected(date),'ui-datepicker-today':date.today}">
                                            <ng-container *ngIf="date.otherMonth ? showOtherMonths : true">
                                                <a class="ui-state-default" *ngIf="date.selectable" [ngClass]="{'ui-state-active':isSelected(date), 'ui-state-highlight':date.today}"
                                                    (click)="onDateSelect($event,date)" draggable="false" (keydown)="onDateCellKeydown($event,date,i)">
                                                    <ng-container *ngIf="!dateTemplate">{{date.day}}</ng-container>
                                                    <ng-container *ngTemplateOutlet="dateTemplate; context: {$implicit: date}"></ng-container>
                                                </a>
                                                <span class="ui-state-default ui-state-disabled" [ngClass]="{'ui-state-active':isSelected(date), 'ui-state-highlight':date.today}" *ngIf="!date.selectable">
                                                    <ng-container *ngIf="!disabledDateTemplate">{{date.day}}</ng-container>
                                                    <ng-container *ngTemplateOutlet="disabledDateTemplate; context: {$implicit: date}"></ng-container>
                                                </span>
                                            </ng-container>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="ui-monthpicker" *ngIf="view === 'month'">
                        <a  *ngFor="let m of monthPickerValues; let i = index" (click)="onMonthSelect($event, i)" (keydown)="onMonthCellKeydown($event,i)" class="ui-monthpicker-month" [ngClass]="{'ui-state-active': isMonthSelected(i), 'ui-state-disabled':!isSelectable(1, i, this.currentYear, false)}">
                            {{m}}
                        </a>
                    </div>
                </ng-container>
                <div class="ui-timepicker ui-widget-header ui-corner-all" *ngIf="showTime||timeOnly">
                    <div class="ui-hour-picker">
                        <a tabindex="0" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)">
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span [ngStyle]="{'display': currentHour < 10 ? 'inline': 'none'}">0</span><span>{{currentHour}}</span>
                        <a tabindex="0" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementHour($event)" (mousedown)="onTimePickerElementMouseDown($event, 0, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)">
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-separator">
                        <a>
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span>{{timeSeparator}}</span>
                        <a>
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-minute-picker">
                        <a tabindex="0" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)">
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span [ngStyle]="{'display': currentMinute < 10 ? 'inline': 'none'}">0</span><span>{{currentMinute}}</span>
                        <a tabindex="0" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementMinute($event)" (mousedown)="onTimePickerElementMouseDown($event, 1, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)">
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-separator" *ngIf="showSeconds">
                        <a>
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span>{{timeSeparator}}</span>
                        <a>
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-second-picker" *ngIf="showSeconds">
                        <a tabindex="0" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="incrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, 1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)">
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span [ngStyle]="{'display': currentSecond < 10 ? 'inline': 'none'}">0</span><span>{{currentSecond}}</span>
                        <a tabindex="0" (keydown)="onContainerButtonKeydown($event)" (keydown.enter)="decrementSecond($event)" (mousedown)="onTimePickerElementMouseDown($event, 2, -1)" (mouseup)="onTimePickerElementMouseUp($event)" (mouseout)="onTimePickerElementMouseOut($event)">
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-ampm-picker" *ngIf="hourFormat=='12'">
                        <a tabindex="0" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)">
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span>{{pm ? 'PM' : 'AM'}}</span>
                        <a tabindex="0" (keydown)="onContainerButtonKeydown($event)" (click)="toggleAMPM($event)" (keydown.enter)="toggleAMPM($event)">
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                </div>
                <div class="ui-datepicker-buttonbar ui-widget-header" *ngIf="showButtonBar">
                    <div class="ui-g">
                        <div class="ui-g-6">
                            <button type="button" tabindex="0" [label]="_locale.today" (keydown)="onContainerButtonKeydown($event)" (click)="onTodayButtonClick($event)" pButton [ngClass]="[todayButtonStyleClass]"></button>
                        </div>
                        <div class="ui-g-6">
                            <button type="button" tabindex="0" [label]="_locale.clear" (keydown)="onContainerButtonKeydown($event)" (click)="onClearButtonClick($event)" pButton [ngClass]="[clearButtonStyleClass]"></button>
                        </div>
                    </div>
                </div>
                <ng-content select="p-footer"></ng-content>
            </div>
        </span>
    `,
        animations: [
            trigger('overlayAnimation', [
                state('visible', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                state('visibleTouchUI', style({
                    transform: 'translate(-50%,-50%)',
                    opacity: 1
                })),
                transition('void => visible', [
                    style({ transform: 'translateY(5%)', opacity: 0 }),
                    animate('{{showTransitionParams}}')
                ]),
                transition('visible => void', [
                    animate(('{{hideTransitionParams}}'), style({
                        opacity: 0,
                        transform: 'translateY(5%)'
                    }))
                ]),
                transition('void => visibleTouchUI', [
                    style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
                    animate('{{showTransitionParams}}')
                ]),
                transition('visibleTouchUI => void', [
                    animate(('{{hideTransitionParams}}'), style({
                        opacity: 0,
                        transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                    }))
                ])
            ])
        ],
        host: {
            '[class.ui-inputwrapper-filled]': 'filled',
            '[class.ui-inputwrapper-focus]': 'focus'
        },
        providers: [CALENDAR_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.Default
    })
], Calendar);
export { Calendar };
let CalendarModule = class CalendarModule {
};
CalendarModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule, SharedModule],
        exports: [Calendar, ButtonModule, SharedModule],
        declarations: [Calendar]
    })
], CalendarModule);
export { CalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NhbGVuZGFyLyIsInNvdXJjZXMiOlsiY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFDN0YsU0FBUyxFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDdkMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBK01GLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUErVWpCLFlBQW1CLEVBQWMsRUFBUyxRQUFtQixFQUFTLEVBQXFCLEVBQVUsSUFBWTtRQUE5RixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsYUFBUSxHQUFS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R0FDVyxRQUFRLENBeXZFcEI7U0F6dkVZLFFBQVE7QUFnd0VyQixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBQUksQ0FBQTtBQUFsQixjQUFjO0lBTDFCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1FBQ2pELE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1FBQzdDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztLQUMzQixDQUFDO0dBQ1csY0FBYyxDQUFJO1NBQWxCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxPbkluaXQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixmb3J3YXJkUmVmLFJlbmRlcmVyMixcclxuICAgICAgICBWaWV3Q2hpbGQsQ2hhbmdlRGV0ZWN0b3JSZWYsVGVtcGxhdGVSZWYsQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxOZ1pvbmUsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlLEFuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7QnV0dG9uTW9kdWxlfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XHJcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5pbXBvcnQge1NoYXJlZE1vZHVsZSxQcmltZVRlbXBsYXRlfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3QgQ0FMRU5EQVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2FsZW5kYXIpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9jYWxlU2V0dGluZ3Mge1xyXG4gICAgZmlyc3REYXlPZldlZWs/OiBudW1iZXI7XHJcbiAgICBkYXlOYW1lczogc3RyaW5nW107XHJcbiAgICBkYXlOYW1lc1Nob3J0OiBzdHJpbmdbXTtcclxuICAgIGRheU5hbWVzTWluOiBzdHJpbmdbXTtcclxuICAgIG1vbnRoTmFtZXM6IHN0cmluZ1tdO1xyXG4gICAgbW9udGhOYW1lc1Nob3J0OiBzdHJpbmdbXTtcclxuICAgIHRvZGF5OiBzdHJpbmc7XHJcbiAgICBjbGVhcjogc3RyaW5nO1xyXG4gICAgZGF0ZUZvcm1hdD86IHN0cmluZztcclxuICAgIHdlZWtIZWFkZXI/OiBzdHJpbmc7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWNhbGVuZGFyJyxcclxuICAgIHRlbXBsYXRlOiAgYFxyXG4gICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsndWktY2FsZW5kYXInOnRydWUsICd1aS1jYWxlbmRhci13LWJ0bic6IHNob3dJY29uLCAndWktY2FsZW5kYXItdGltZW9ubHknOiB0aW1lT25seX1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhaW5saW5lXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgI2lucHV0ZmllbGQgdHlwZT1cInRleHRcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIucmVxdWlyZWRdPVwicmVxdWlyZWRcIiBbYXR0ci5hcmlhLXJlcXVpcmVkXT1cInJlcXVpcmVkXCIgW3ZhbHVlXT1cImlucHV0RmllbGRWYWx1ZVwiIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uSW5wdXRLZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwib25JbnB1dENsaWNrKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dFwiIChpbnB1dCk9XCJvblVzZXJJbnB1dCgkZXZlbnQpXCIgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJ8fCcnXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIid1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCdcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxyXG4gICAgICAgICAgICAgICAgICAgID48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbaWNvbl09XCJpY29uXCIgcEJ1dHRvbiAqbmdJZj1cInNob3dJY29uXCIgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soJGV2ZW50LGlucHV0ZmllbGQpXCIgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLXRyaWdnZXIgdWktY2FsZW5kYXItYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiB0YWJpbmRleD1cIjBcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPGRpdiAjY29udGVudFdyYXBwZXIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiBbbmdDbGFzc109XCJ7J3VpLWRhdGVwaWNrZXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWhlbHBlci1jbGVhcmZpeCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLWRhdGVwaWNrZXItaW5saW5lJzppbmxpbmUsJ3VpLXNoYWRvdyc6IWlubGluZSxcclxuICAgICAgICAgICAgICAgICd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3VpLWRhdGVwaWNrZXItdGltZW9ubHknOnRpbWVPbmx5LCd1aS1kYXRlcGlja2VyLW11bHRpcGxlLW1vbnRoJzogdGhpcy5udW1iZXJPZk1vbnRocyA+IDEsICd1aS1kYXRlcGlja2VyLW1vbnRocGlja2VyJzogKHZpZXcgPT09ICdtb250aCcpLCAndWktZGF0ZXBpY2tlci10b3VjaC11aSc6IHRvdWNoVUl9XCJcclxuICAgICAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ0b3VjaFVJID8ge3ZhbHVlOiAndmlzaWJsZVRvdWNoVUknLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX06IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbQC5kaXNhYmxlZF09XCJpbmxpbmUgPT09IHRydWVcIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAb3ZlcmxheUFuaW1hdGlvbi5kb25lKT1cIm9uT3ZlcmxheUFuaW1hdGlvbkRvbmUoJGV2ZW50KVwiICpuZ0lmPVwiaW5saW5lIHx8IG92ZXJsYXlWaXNpYmxlXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGltZU9ubHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0ZXBpY2tlci1ncm91cCB1aS13aWRnZXQtY29udGVudFwiICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb250aHM7IGxldCBpID0gaW5kZXg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLWhlYWRlciB1aS13aWRnZXQtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeCB1aS1jb3JuZXItYWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInVpLWRhdGVwaWNrZXItcHJldiB1aS1jb3JuZXItYWxsXCIgKGNsaWNrKT1cIm9uUHJldkJ1dHRvbkNsaWNrKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJvblByZXZCdXR0b25DbGljaygkZXZlbnQpXCIgKm5nSWY9XCJpID09PSAwXCIgdGFiaW5kZXg9XCIwXCIgKGtleWRvd24pPVwib25JbnB1dEtleWRvd24oJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktZGF0ZXBpY2tlci1wcmV2LWljb24gcGkgcGktY2hldnJvbi1sZWZ0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWRhdGVwaWNrZXItbW9udGhcIiAqbmdJZj1cIiFtb250aE5hdmlnYXRvciAmJiAodmlldyAhPT0gJ21vbnRoJylcIj57e2xvY2FsZS5tb250aE5hbWVzW21vbnRoLm1vbnRoXX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLW1vbnRoXCIgKm5nSWY9XCJtb250aE5hdmlnYXRvciAmJiAodmlldyAhPT0gJ21vbnRoJykgJiYgbnVtYmVyT2ZNb250aHMgPT09IDFcIiAoY2hhbmdlKT1cIm9uTW9udGhEcm9wZG93bkNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIFt2YWx1ZV09XCJpXCIgKm5nRm9yPVwibGV0IG1vbnRoTmFtZSBvZiBsb2NhbGUubW9udGhOYW1lcztsZXQgaSA9IGluZGV4XCIgW3NlbGVjdGVkXT1cImkgPT09IG1vbnRoLm1vbnRoXCI+e3ttb250aE5hbWV9fTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLXllYXJcIiAqbmdJZj1cInllYXJOYXZpZ2F0b3IgJiYgbnVtYmVyT2ZNb250aHMgPT09IDFcIiAoY2hhbmdlKT1cIm9uWWVhckRyb3Bkb3duQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gW3ZhbHVlXT1cInllYXJcIiAqbmdGb3I9XCJsZXQgeWVhciBvZiB5ZWFyT3B0aW9uc1wiIFtzZWxlY3RlZF09XCJ5ZWFyID09PSBjdXJyZW50WWVhclwiPnt7eWVhcn19PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1kYXRlcGlja2VyLXllYXJcIiAqbmdJZj1cIiF5ZWFyTmF2aWdhdG9yXCI+e3t2aWV3ID09PSAnbW9udGgnID8gY3VycmVudFllYXIgOiBtb250aC55ZWFyfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwidWktZGF0ZXBpY2tlci1uZXh0IHVpLWNvcm5lci1hbGxcIiAoY2xpY2spPVwib25OZXh0QnV0dG9uQ2xpY2soJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cIm9uTmV4dEJ1dHRvbkNsaWNrKCRldmVudClcIiAqbmdJZj1cIm51bWJlck9mTW9udGhzID09PSAxID8gdHJ1ZSA6IChpID09PSBudW1iZXJPZk1vbnRocyAtMSlcIiB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bik9XCJvbklucHV0S2V5ZG93bigkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1kYXRlcGlja2VyLW5leHQtaWNvbiBwaSBwaS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItY2FsZW5kYXItY29udGFpbmVyXCIgKm5nSWY9XCJ2aWV3ID09PSdkYXRlJ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidWktZGF0ZXBpY2tlci1jYWxlbmRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0lmPVwic2hvd1dlZWtcIiBjbGFzcz1cInVpLWRhdGVwaWNrZXItd2Vla2hlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7bG9jYWxlWyd3ZWVrSGVhZGVyJ119fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgd2Vla0RheSBvZiB3ZWVrRGF5cztsZXQgYmVnaW4gPSBmaXJzdDsgbGV0IGVuZCA9IGxhc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e3dlZWtEYXl9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgd2VlayBvZiBtb250aC5kYXRlczsgbGV0IGogPSBpbmRleDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdJZj1cInNob3dXZWVrXCIgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLXdlZWtudW1iZXIgdWktc3RhdGUtZGlzYWJsZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ttb250aC53ZWVrTnVtYmVyc1tqXX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB3ZWVrXCIgW25nQ2xhc3NdPVwieyd1aS1kYXRlcGlja2VyLW90aGVyLW1vbnRoJzogZGF0ZS5vdGhlck1vbnRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1aS1kYXRlcGlja2VyLWN1cnJlbnQtZGF5Jzppc1NlbGVjdGVkKGRhdGUpLCd1aS1kYXRlcGlja2VyLXRvZGF5JzpkYXRlLnRvZGF5fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRlLm90aGVyTW9udGggPyBzaG93T3RoZXJNb250aHMgOiB0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwidWktc3RhdGUtZGVmYXVsdFwiICpuZ0lmPVwiZGF0ZS5zZWxlY3RhYmxlXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOmlzU2VsZWN0ZWQoZGF0ZSksICd1aS1zdGF0ZS1oaWdobGlnaHQnOmRhdGUudG9kYXl9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50LGRhdGUpXCIgZHJhZ2dhYmxlPVwiZmFsc2VcIiAoa2V5ZG93bik9XCJvbkRhdGVDZWxsS2V5ZG93bigkZXZlbnQsZGF0ZSxpKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkYXRlVGVtcGxhdGVcIj57e2RhdGUuZGF5fX08L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkYXRlVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGRhdGV9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdGF0ZS1kZWZhdWx0IHVpLXN0YXRlLWRpc2FibGVkXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOmlzU2VsZWN0ZWQoZGF0ZSksICd1aS1zdGF0ZS1oaWdobGlnaHQnOmRhdGUudG9kYXl9XCIgKm5nSWY9XCIhZGF0ZS5zZWxlY3RhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWRpc2FibGVkRGF0ZVRlbXBsYXRlXCI+e3tkYXRlLmRheX19PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzYWJsZWREYXRlVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGRhdGV9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tb250aHBpY2tlclwiICpuZ0lmPVwidmlldyA9PT0gJ21vbnRoJ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAgKm5nRm9yPVwibGV0IG0gb2YgbW9udGhQaWNrZXJWYWx1ZXM7IGxldCBpID0gaW5kZXhcIiAoY2xpY2spPVwib25Nb250aFNlbGVjdCgkZXZlbnQsIGkpXCIgKGtleWRvd24pPVwib25Nb250aENlbGxLZXlkb3duKCRldmVudCxpKVwiIGNsYXNzPVwidWktbW9udGhwaWNrZXItbW9udGhcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6IGlzTW9udGhTZWxlY3RlZChpKSwgJ3VpLXN0YXRlLWRpc2FibGVkJzohaXNTZWxlY3RhYmxlKDEsIGksIHRoaXMuY3VycmVudFllYXIsIGZhbHNlKX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7bX19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRpbWVwaWNrZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsXCIgKm5nSWY9XCJzaG93VGltZXx8dGltZU9ubHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaG91ci1waWNrZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJpbmNyZW1lbnRIb3VyKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAxKVwiIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIiAobW91c2VvdXQpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlT3V0KCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi11cFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7J2Rpc3BsYXknOiBjdXJyZW50SG91ciA8IDEwID8gJ2lubGluZSc6ICdub25lJ31cIj4wPC9zcGFuPjxzcGFuPnt7Y3VycmVudEhvdXJ9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJkZWNyZW1lbnRIb3VyKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAtMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZU91dCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1zZXBhcmF0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3t0aW1lU2VwYXJhdG9yfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktbWludXRlLXBpY2tlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImluY3JlbWVudE1pbnV0ZSgkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMSwgMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZU91dCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nU3R5bGVdPVwieydkaXNwbGF5JzogY3VycmVudE1pbnV0ZSA8IDEwID8gJ2lubGluZSc6ICdub25lJ31cIj4wPC9zcGFuPjxzcGFuPnt7Y3VycmVudE1pbnV0ZX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImRlY3JlbWVudE1pbnV0ZSgkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMSwgLTEpXCIgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VPdXQoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktc2VwYXJhdG9yXCIgKm5nSWY9XCJzaG93U2Vjb25kc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi11cFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e3RpbWVTZXBhcmF0b3J9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1zZWNvbmQtcGlja2VyXCIgKm5nSWY9XCJzaG93U2Vjb25kc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImluY3JlbWVudFNlY29uZCgkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMiwgMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZU91dCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nU3R5bGVdPVwieydkaXNwbGF5JzogY3VycmVudFNlY29uZCA8IDEwID8gJ2lubGluZSc6ICdub25lJ31cIj4wPC9zcGFuPjxzcGFuPnt7Y3VycmVudFNlY29uZH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImRlY3JlbWVudFNlY29uZCgkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMiwgLTEpXCIgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VPdXQoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktYW1wbS1waWNrZXJcIiAqbmdJZj1cImhvdXJGb3JtYXQ9PScxMidcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgKGtleWRvd24pPVwib25Db250YWluZXJCdXR0b25LZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3twbSA/ICdQTScgOiAnQU0nfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIHRhYmluZGV4PVwiMFwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cInRvZ2dsZUFNUE0oJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cInRvZ2dsZUFNUE0oJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItYnV0dG9uYmFyIHVpLXdpZGdldC1oZWFkZXJcIiAqbmdJZj1cInNob3dCdXR0b25CYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBbbGFiZWxdPVwiX2xvY2FsZS50b2RheVwiIChrZXlkb3duKT1cIm9uQ29udGFpbmVyQnV0dG9uS2V5ZG93bigkZXZlbnQpXCIgKGNsaWNrKT1cIm9uVG9kYXlCdXR0b25DbGljaygkZXZlbnQpXCIgcEJ1dHRvbiBbbmdDbGFzc109XCJbdG9kYXlCdXR0b25TdHlsZUNsYXNzXVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWctNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgW2xhYmVsXT1cIl9sb2NhbGUuY2xlYXJcIiAoa2V5ZG93bik9XCJvbkNvbnRhaW5lckJ1dHRvbktleWRvd24oJGV2ZW50KVwiIChjbGljayk9XCJvbkNsZWFyQnV0dG9uQ2xpY2soJGV2ZW50KVwiIHBCdXR0b24gW25nQ2xhc3NdPVwiW2NsZWFyQnV0dG9uU3R5bGVDbGFzc11cIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXHJcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGVUb3VjaFVJJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsLTUwJSknLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIFtcclxuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUlKScsIG9wYWNpdHk6IDB9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBbXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKCgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JyksIFxyXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg1JSknXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZVRvdWNoVUknLCBbXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTUwJSwgLTQwJSwgMCkgc2NhbGUoMC45KSd9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlVG91Y2hVSSA9PiB2b2lkJywgW1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScpLCBcclxuICAgICAgICAgICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsIC00MCUsIDApIHNjYWxlKDAuOSknXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKVxyXG4gICAgXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXHJcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzJ1xyXG4gICAgfSxcclxuICAgIHByb3ZpZGVyczogW0NBTEVOREFSX1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXIgaW1wbGVtZW50cyBPbkluaXQsT25EZXN0cm95LENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAgIFxyXG4gICAgQElucHV0KCkgZGVmYXVsdERhdGU6IERhdGU7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYW55O1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBkYXRlRm9ybWF0OiBzdHJpbmcgPSAnbW0vZGQveXknO1xyXG5cclxuICAgIEBJbnB1dCgpIG11bHRpcGxlU2VwYXJhdG9yOiBzdHJpbmcgPSAnLCc7XHJcblxyXG4gICAgQElucHV0KCkgcmFuZ2VTZXBhcmF0b3I6IHN0cmluZyA9ICctJztcclxuICAgIFxyXG4gICAgQElucHV0KCkgaW5saW5lOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHNob3dPdGhlck1vbnRoczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgc2VsZWN0T3RoZXJNb250aHM6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHNob3dJY29uOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmcgPSAncGkgcGktY2FsZW5kYXInO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSByZWFkb25seUlucHV0OiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzaG9ydFllYXJDdXRvZmY6IGFueSA9ICcrMTAnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBtb250aE5hdmlnYXRvcjogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSB5ZWFyTmF2aWdhdG9yOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBob3VyRm9ybWF0OiBzdHJpbmcgPSAnMjQnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB0aW1lT25seTogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc3RlcEhvdXI6IG51bWJlciA9IDE7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0ZXBNaW51dGU6IG51bWJlciA9IDE7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0ZXBTZWNvbmQ6IG51bWJlciA9IDE7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHNob3dTZWNvbmRzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgc2hvd09uRm9jdXM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dXZWVrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGRhdGFUeXBlOiBzdHJpbmcgPSAnZGF0ZSc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6IHN0cmluZyA9ICdzaW5nbGUnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBtYXhEYXRlQ291bnQ6IG51bWJlcjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc2hvd0J1dHRvbkJhcjogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgdG9kYXlCdXR0b25TdHlsZUNsYXNzOiBzdHJpbmcgPSAndWktYnV0dG9uLXNlY29uZGFyeSc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGNsZWFyQnV0dG9uU3R5bGVDbGFzczogc3RyaW5nID0gJ3VpLWJ1dHRvbi1zZWNvbmRhcnknO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZTogYW55O1xyXG4gIFxyXG4gICAgQElucHV0KCkga2VlcEludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSBoaWRlT25EYXRlVGltZVNlbGVjdDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgbnVtYmVyT2ZNb250aHM6IG51bWJlciA9IDE7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHZpZXc6IHN0cmluZyA9ICdkYXRlJztcclxuXHJcbiAgICBASW5wdXQoKSB0b3VjaFVJOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHRpbWVTZXBhcmF0b3I6IHN0cmluZyA9IFwiOlwiO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzIyNW1zIGVhc2Utb3V0JztcclxuXHJcbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxOTVtcyBlYXNlLWluJztcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25JbnB1dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvblRvZGF5Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25DbGVhckNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uTW9udGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25ZZWFyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25DbGlja091dHNpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG4gICAgXHJcbiAgICBfbG9jYWxlOiBMb2NhbGVTZXR0aW5ncyA9IHtcclxuICAgICAgICBmaXJzdERheU9mV2VlazogMCxcclxuICAgICAgICBkYXlOYW1lczogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXHJcbiAgICAgICAgZGF5TmFtZXNTaG9ydDogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxyXG4gICAgICAgIGRheU5hbWVzTWluOiBbXCJTdVwiLFwiTW9cIixcIlR1XCIsXCJXZVwiLFwiVGhcIixcIkZyXCIsXCJTYVwiXSxcclxuICAgICAgICBtb250aE5hbWVzOiBbIFwiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCIgXSxcclxuICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsgXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIixcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiIF0sXHJcbiAgICAgICAgdG9kYXk6ICdUb2RheScsXHJcbiAgICAgICAgY2xlYXI6ICdDbGVhcicsXHJcbiAgICAgICAgZGF0ZUZvcm1hdDogJ21tL2RkL3l5JyxcclxuICAgICAgICB3ZWVrSGVhZGVyOiAnV2snXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0ZmllbGQnLCB7IHN0YXRpYzogZmFsc2UgfSkgaW5wdXRmaWVsZFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjb250ZW50V3JhcHBlcicsIHsgc3RhdGljOiBmYWxzZSB9KSBzZXQgY29udGVudCAoY29udGVudDogRWxlbWVudFJlZikge1xyXG4gICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb250aE5hdmlnYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLnVwZGF0ZUZvY3VzKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc01vbnRoTmF2aWdhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdEZvY3VzYWJsZUNlbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgY29udGVudFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgXHJcbiAgICBkYXRlczogYW55W107XHJcblxyXG4gICAgbW9udGhzOiBhbnlbXTtcclxuXHJcbiAgICBtb250aFBpY2tlclZhbHVlczogYW55W107XHJcbiAgICBcclxuICAgIHdlZWtEYXlzOiBzdHJpbmdbXTtcclxuICAgIFxyXG4gICAgY3VycmVudE1vbnRoOiBudW1iZXI7XHJcbiAgICBcclxuICAgIGN1cnJlbnRZZWFyOiBudW1iZXI7XHJcbiAgICBcclxuICAgIGN1cnJlbnRIb3VyOiBudW1iZXI7XHJcbiAgICBcclxuICAgIGN1cnJlbnRNaW51dGU6IG51bWJlcjtcclxuICAgIFxyXG4gICAgY3VycmVudFNlY29uZDogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBwbTogYm9vbGVhbjtcclxuXHJcbiAgICBtYXNrOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBtYXNrQ2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XHJcbiAgICBcclxuICAgIG92ZXJsYXk6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgXHJcbiAgICBvdmVybGF5VmlzaWJsZTogYm9vbGVhbjtcclxuICAgICAgICAgICAgXHJcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG4gICAgXHJcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICAgIFxyXG4gICAgY2FsZW5kYXJFbGVtZW50OiBhbnk7XHJcbiAgICBcclxuICAgIHRpbWVQaWNrZXJUaW1lcjphbnk7XHJcbiAgICBcclxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xyXG4gICAgXHJcbiAgICB0aWNrc1RvMTk3MDogbnVtYmVyO1xyXG4gICAgXHJcbiAgICB5ZWFyT3B0aW9uczogbnVtYmVyW107XHJcbiAgICBcclxuICAgIGZvY3VzOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBpc0tleWRvd246IGJvb2xlYW47XHJcbiAgICBcclxuICAgIGZpbGxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBpbnB1dEZpZWxkVmFsdWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBcclxuICAgIF9taW5EYXRlOiBEYXRlO1xyXG4gICAgXHJcbiAgICBfbWF4RGF0ZTogRGF0ZTtcclxuICAgIFxyXG4gICAgX3Nob3dUaW1lOiBib29sZWFuO1xyXG5cclxuICAgIF95ZWFyUmFuZ2U6IHN0cmluZztcclxuICAgIFxyXG4gICAgcHJldmVudERvY3VtZW50TGlzdGVuZXI6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIGRhdGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBkaXNhYmxlZERhdGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIFxyXG4gICAgX2Rpc2FibGVkRGF0ZXM6IEFycmF5PERhdGU+O1xyXG4gICAgXHJcbiAgICBfZGlzYWJsZWREYXlzOiBBcnJheTxudW1iZXI+O1xyXG4gICAgXHJcbiAgICBzZWxlY3RFbGVtZW50OiBhbnk7XHJcbiAgICBcclxuICAgIHRvZGF5RWxlbWVudDogYW55O1xyXG4gICAgXHJcbiAgICBmb2N1c0VsZW1lbnQ6IGFueTtcclxuXHJcbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgbmF2aWdhdGlvblN0YXRlOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIGlzTW9udGhOYXZpZ2F0ZTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBnZXQgbWluRGF0ZSgpOiBEYXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IG1pbkRhdGUoZGF0ZTogRGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSBkYXRlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgJiYgdGhpcy5jdXJyZW50WWVhcikge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASW5wdXQoKSBnZXQgbWF4RGF0ZSgpOiBEYXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IG1heERhdGUoZGF0ZTogRGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX21heERhdGUgPSBkYXRlO1xyXG4gICAgICBcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgICYmIHRoaXMuY3VycmVudFllYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQElucHV0KCkgZ2V0IGRpc2FibGVkRGF0ZXMoKTogRGF0ZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWREYXRlcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IGRpc2FibGVkRGF0ZXMoZGlzYWJsZWREYXRlczogRGF0ZVtdKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzYWJsZWREYXRlcyA9IGRpc2FibGVkRGF0ZXM7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE1vbnRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLmN1cnJlbnRNb250aCAhPSBudWxsICAmJiB0aGlzLmN1cnJlbnRZZWFyKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWREYXlzKCk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWREYXlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXQgZGlzYWJsZWREYXlzKGRpc2FibGVkRGF5czogbnVtYmVyW10pIHtcclxuICAgICAgICB0aGlzLl9kaXNhYmxlZERheXMgPSBkaXNhYmxlZERheXM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5jdXJyZW50TW9udGggIT0gbnVsbCAgJiYgdGhpcy5jdXJyZW50WWVhcikge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASW5wdXQoKSBnZXQgeWVhclJhbmdlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3llYXJSYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgeWVhclJhbmdlKHllYXJSYW5nZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5feWVhclJhbmdlID0geWVhclJhbmdlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh5ZWFyUmFuZ2UpIHtcclxuICAgICAgICAgICAgY29uc3QgeWVhcnMgPSB5ZWFyUmFuZ2Uuc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgY29uc3QgeWVhclN0YXJ0ID0gcGFyc2VJbnQoeWVhcnNbMF0pO1xyXG4gICAgICAgICAgICBjb25zdCB5ZWFyRW5kID0gcGFyc2VJbnQoeWVhcnNbMV0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKHllYXJTdGFydCwgeWVhckVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBzaG93VGltZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd1RpbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldCBzaG93VGltZShzaG93VGltZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Nob3dUaW1lID0gc2hvd1RpbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRUaW1lKHRoaXMudmFsdWV8fG5ldyBEYXRlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IGxvY2FsZSgpIHtcclxuICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBsb2NhbGUobmV3TG9jYWxlOiBMb2NhbGVTZXR0aW5ncykge1xyXG4gICAgICAgdGhpcy5fbG9jYWxlID0gbmV3TG9jYWxlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnZGF0ZScpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVXZWVrRGF5cygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XHJcbiAgICAgICB9XHJcbiAgICAgICBlbHNlIGlmICh0aGlzLnZpZXcgPT09ICdtb250aCcpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aFBpY2tlclZhbHVlcygpO1xyXG4gICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgem9uZTogTmdab25lKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRlZmF1bHREYXRlfHxuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09ICdkYXRlJykge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVdlZWtEYXlzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFRpbWUoZGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcclxuICAgICAgICAgICAgdGhpcy50aWNrc1RvMTk3MCA9ICgoKDE5NzAgLSAxKSAqIDM2NSArIE1hdGguZmxvb3IoMTk3MCAvIDQpIC0gTWF0aC5mbG9vcigxOTcwIC8gMTAwKSArIE1hdGguZmxvb3IoMTk3MCAvIDQwMCkpICogMjQgKiA2MCAqIDYwICogMTAwMDAwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnZpZXcgPT09ICdtb250aCcpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aFBpY2tlclZhbHVlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdkaXNhYmxlZERhdGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWREYXRlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwb3B1bGF0ZVllYXJPcHRpb25zKHN0YXJ0LCBlbmQpIHtcclxuICAgICAgICB0aGlzLnllYXJPcHRpb25zID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnllYXJPcHRpb25zLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVdlZWtEYXlzKCkge1xyXG4gICAgICAgIHRoaXMud2Vla0RheXMgPSBbXTtcclxuICAgICAgICBsZXQgZGF5SW5kZXggPSB0aGlzLmxvY2FsZS5maXJzdERheU9mV2VlaztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLndlZWtEYXlzLnB1c2godGhpcy5sb2NhbGUuZGF5TmFtZXNNaW5bZGF5SW5kZXhdKTtcclxuICAgICAgICAgICAgZGF5SW5kZXggPSAoZGF5SW5kZXggPT0gNikgPyAwIDogKytkYXlJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTW9udGhQaWNrZXJWYWx1ZXMoKSB7XHJcbiAgICAgICAgdGhpcy5tb250aFBpY2tlclZhbHVlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDExOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5tb250aFBpY2tlclZhbHVlcy5wdXNoKHRoaXMubG9jYWxlLm1vbnRoTmFtZXNTaG9ydFtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU1vbnRocyhtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1vbnRocyA9IHRoaXMubW9udGhzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdGhpcy5udW1iZXJPZk1vbnRoczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtID0gbW9udGggKyBpO1xyXG4gICAgICAgICAgICBsZXQgeSA9IHllYXI7XHJcbiAgICAgICAgICAgIGlmIChtID4gMTEpIHtcclxuICAgICAgICAgICAgICAgIG0gPSBtICUgMTEgLSAxO1xyXG4gICAgICAgICAgICAgICAgeSA9IHllYXIgKyAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vbnRocy5wdXNoKHRoaXMuY3JlYXRlTW9udGgobSwgeSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRXZWVrTnVtYmVyKGRhdGU6IERhdGUpIHtcclxuICAgICAgICBsZXQgY2hlY2tEYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xyXG5cdFx0Y2hlY2tEYXRlLnNldERhdGUoY2hlY2tEYXRlLmdldERhdGUoKSArIDQgLSAoIGNoZWNrRGF0ZS5nZXREYXkoKSB8fCA3ICkpO1xyXG5cdFx0bGV0IHRpbWUgPSBjaGVja0RhdGUuZ2V0VGltZSgpO1xyXG5cdFx0Y2hlY2tEYXRlLnNldE1vbnRoKCAwICk7XHJcblx0XHRjaGVja0RhdGUuc2V0RGF0ZSggMSApO1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoIE1hdGgucm91bmQoKHRpbWUgLSBjaGVja0RhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwICkgLyA3ICkgKyAxO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZGF0ZXMgPSBbXTtcclxuICAgICAgICBsZXQgZmlyc3REYXkgPSB0aGlzLmdldEZpcnN0RGF5T2ZNb250aEluZGV4KG1vbnRoLCB5ZWFyKTtcclxuICAgICAgICBsZXQgZGF5c0xlbmd0aCA9IHRoaXMuZ2V0RGF5c0NvdW50SW5Nb250aChtb250aCwgeWVhcik7XHJcbiAgICAgICAgbGV0IHByZXZNb250aERheXNMZW5ndGggPSB0aGlzLmdldERheXNDb3VudEluUHJldk1vbnRoKG1vbnRoLCB5ZWFyKTtcclxuICAgICAgICBsZXQgZGF5Tm8gPSAxO1xyXG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IHdlZWtOdW1iZXJzID0gW107XHJcbiAgICAgICAgbGV0IG1vbnRoUm93cyA9IE1hdGguY2VpbCgoZGF5c0xlbmd0aCArIGZpcnN0RGF5KSAvIDcpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vbnRoUm93czsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB3ZWVrID0gW107XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gKHByZXZNb250aERheXNMZW5ndGggLSBmaXJzdERheSArIDEpOyBqIDw9IHByZXZNb250aERheXNMZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2ID0gdGhpcy5nZXRQcmV2aW91c01vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHtkYXk6IGosIG1vbnRoOiBwcmV2Lm1vbnRoLCB5ZWFyOiBwcmV2LnllYXIsIG90aGVyTW9udGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBqLCBwcmV2Lm1vbnRoLCBwcmV2LnllYXIpLCBzZWxlY3RhYmxlOiB0aGlzLmlzU2VsZWN0YWJsZShqLCBwcmV2Lm1vbnRoLCBwcmV2LnllYXIsIHRydWUpfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdEYXlzTGVuZ3RoID0gNyAtIHdlZWsubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZW1haW5pbmdEYXlzTGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZWVrLnB1c2goe2RheTogZGF5Tm8sIG1vbnRoOiBtb250aCwgeWVhcjogeWVhciwgdG9kYXk6IHRoaXMuaXNUb2RheSh0b2RheSwgZGF5Tm8sIG1vbnRoLCB5ZWFyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKGRheU5vLCBtb250aCwgeWVhciwgZmFsc2UpfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5Tm8rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheU5vID4gZGF5c0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHRoaXMuZ2V0TmV4dE1vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF5OiBkYXlObyAtIGRheXNMZW5ndGgsIG1vbnRoOiBuZXh0Lm1vbnRoLCB5ZWFyOiBuZXh0LnllYXIsIG90aGVyTW9udGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGRheU5vIC0gZGF5c0xlbmd0aCwgbmV4dC5tb250aCwgbmV4dC55ZWFyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogdGhpcy5pc1NlbGVjdGFibGUoKGRheU5vIC0gZGF5c0xlbmd0aCksIG5leHQubW9udGgsIG5leHQueWVhciwgdHJ1ZSl9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF5OiBkYXlObywgbW9udGg6IG1vbnRoLCB5ZWFyOiB5ZWFyLCB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBkYXlObywgbW9udGgsIHllYXIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogdGhpcy5pc1NlbGVjdGFibGUoZGF5Tm8sIG1vbnRoLCB5ZWFyLCBmYWxzZSl9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGF5Tm8rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWspIHtcclxuICAgICAgICAgICAgICAgIHdlZWtOdW1iZXJzLnB1c2godGhpcy5nZXRXZWVrTnVtYmVyKG5ldyBEYXRlKHdlZWtbMF0ueWVhciwgd2Vla1swXS5tb250aCwgd2Vla1swXS5kYXkpKSk7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRlcy5wdXNoKHdlZWspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbW9udGg6IG1vbnRoLFxyXG4gICAgICAgICAgICB5ZWFyOiB5ZWFyLFxyXG4gICAgICAgICAgICBkYXRlczogZGF0ZXMsXHJcbiAgICAgICAgICAgIHdlZWtOdW1iZXJzOiB3ZWVrTnVtYmVyc1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRUaW1lKGRhdGU6IERhdGUpIHtcclxuICAgICAgICB0aGlzLnBtID0gZGF0ZS5nZXRIb3VycygpID4gMTE7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50SG91clBNKGRhdGUuZ2V0SG91cnMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudGltZU9ubHkpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuYXZCYWNrd2FyZChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNNb250aE5hdmlnYXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xyXG4gICAgICAgICAgICB0aGlzLmRlY3JlbWVudFllYXIoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoKTtcclxuICAgICAgICAgICAgfSwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSAxMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50WWVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGgtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuYXZGb3J3YXJkKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNNb250aE5hdmlnYXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xyXG4gICAgICAgICAgICB0aGlzLmluY3JlbWVudFllYXIoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRm9jdXMoKTtcclxuICAgICAgICAgICAgfSwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCA9PT0gMTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50WWVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoe21vbnRoOiB0aGlzLmN1cnJlbnRNb250aCArIDEsIHllYXI6IHRoaXMuY3VycmVudFllYXJ9KTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWNyZW1lbnRZZWFyKCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFllYXItLTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy55ZWFyTmF2aWdhdG9yICYmIHRoaXMuY3VycmVudFllYXIgPCB0aGlzLnllYXJPcHRpb25zWzBdKSB7XHJcbiAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gdGhpcy55ZWFyT3B0aW9uc1t0aGlzLnllYXJPcHRpb25zLmxlbmd0aCAtIDFdIC0gdGhpcy55ZWFyT3B0aW9uc1swXTtcclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKHRoaXMueWVhck9wdGlvbnNbMF0gLSBkaWZmZXJlbmNlLCB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSBkaWZmZXJlbmNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5jcmVtZW50WWVhcigpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyKys7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMueWVhck5hdmlnYXRvciAmJiB0aGlzLmN1cnJlbnRZZWFyID4gdGhpcy55ZWFyT3B0aW9uc1t0aGlzLnllYXJPcHRpb25zLmxlbmd0aCAtIDFdKSB7XHJcbiAgICAgICAgICAgIGxldCBkaWZmZXJlbmNlID0gdGhpcy55ZWFyT3B0aW9uc1t0aGlzLnllYXJPcHRpb25zLmxlbmd0aCAtIDFdIC0gdGhpcy55ZWFyT3B0aW9uc1swXTtcclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKHRoaXMueWVhck9wdGlvbnNbMF0gKyBkaWZmZXJlbmNlLCB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gKyBkaWZmZXJlbmNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uRGF0ZVNlbGVjdChldmVudCwgZGF0ZU1ldGEpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhZGF0ZU1ldGEuc2VsZWN0YWJsZSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSAmJiB0aGlzLmlzU2VsZWN0ZWQoZGF0ZU1ldGEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcigoZGF0ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmlzRGF0ZUVxdWFscyhkYXRlLCBkYXRlTWV0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkU2VsZWN0RGF0ZShkYXRlTWV0YSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlTWV0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSAmJiB0aGlzLmhpZGVPbkRhdGVUaW1lU2VsZWN0KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICB9LCAxNTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvdWxkU2VsZWN0RGF0ZShkYXRlTWV0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF4RGF0ZUNvdW50ICE9IG51bGwgP8KgdGhpcy5tYXhEYXRlQ291bnQgPiAodGhpcy52YWx1ZSA/IHRoaXMudmFsdWUubGVuZ3RoIDogMCkgOiB0cnVlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb250aFNlbGVjdChldmVudCwgaW5kZXgpIHtcclxuICAgICAgICBpZiAoIURvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndWktc3RhdGUtZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdChldmVudCwge3llYXI6IHRoaXMuY3VycmVudFllYXIsIG1vbnRoOiBpbmRleCwgZGF5OiAxLCBzZWxlY3RhYmxlOiB0cnVlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVJbnB1dGZpZWxkKCkge1xyXG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZVRpbWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlQXNTdHJpbmcgPSB0aGlzLmZvcm1hdERhdGVUaW1lKHRoaXMudmFsdWVbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlICs9IGRhdGVBc1N0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gKHRoaXMudmFsdWUubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gdGhpcy5tdWx0aXBsZVNlcGFyYXRvcisnICc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydERhdGUgPSB0aGlzLnZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmREYXRlID0gdGhpcy52YWx1ZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZVRpbWUoc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSAnICcrdGhpcy5yYW5nZVNlcGFyYXRvciArJyAnICsgdGhpcy5mb3JtYXREYXRlVGltZShlbmREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbnB1dEZpZWxkVmFsdWUgPSBmb3JtYXR0ZWRWYWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZCAmJiB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuaW5wdXRGaWVsZFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZm9ybWF0RGF0ZVRpbWUoZGF0ZSkge1xyXG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKGRhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGltZU9ubHkpIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXRUaW1lKGRhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdERhdGUoZGF0ZSwgdGhpcy5nZXREYXRlRm9ybWF0KCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSAnICcgKyB0aGlzLmZvcm1hdFRpbWUoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1cnJlbnRIb3VyUE0oaG91cnM6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xyXG4gICAgICAgICAgICB0aGlzLnBtID0gaG91cnMgPiAxMTtcclxuICAgICAgICAgICAgaWYgKGhvdXJzID49IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gKGhvdXJzID09IDEyKSA/IDEyIDogaG91cnMgLSAxMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSAoaG91cnMgPT0gMCkgPyAxMiA6IGhvdXJzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gaG91cnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdERhdGUoZGF0ZU1ldGEpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGVNZXRhLnllYXIsIGRhdGVNZXRhLm1vbnRoLCBkYXRlTWV0YS5kYXkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IDEyKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnModGhpcy5wbSA/IDEyIDogMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3Vycyh0aGlzLnBtID8gdGhpcy5jdXJyZW50SG91ciArIDEyIDogdGhpcy5jdXJyZW50SG91cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRoaXMuY3VycmVudEhvdXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXModGhpcy5jdXJyZW50TWludXRlKTtcclxuICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKHRoaXMuY3VycmVudFNlY29uZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdGhpcy5taW5EYXRlID4gZGF0ZSkge1xyXG4gICAgICAgICAgICBkYXRlID0gdGhpcy5taW5EYXRlO1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRIb3VyUE0oZGF0ZS5nZXRIb3VycygpKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHRoaXMubWF4RGF0ZSA8IGRhdGUpIHtcclxuICAgICAgICAgICAgZGF0ZSA9IHRoaXMubWF4RGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50SG91clBNKGRhdGUuZ2V0SG91cnMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHRoaXMudmFsdWUgPyBbLi4udGhpcy52YWx1ZSwgZGF0ZV0gOiBbZGF0ZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IHRoaXMudmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMudmFsdWVbMV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghZW5kRGF0ZSAmJiBkYXRlLmdldFRpbWUoKSA+PSBzdGFydERhdGUuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBkYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKFtzdGFydERhdGUsIGVuZERhdGVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoW2RhdGUsIG51bGxdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZGF0ZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZU1vZGVsKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmRhdGFUeXBlID09ICdkYXRlJykge1xyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuZm9ybWF0RGF0ZVRpbWUodGhpcy52YWx1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmluZ0FyclZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nQXJyVmFsdWUgPSB0aGlzLnZhbHVlLm1hcChkYXRlID0+IHRoaXMuZm9ybWF0RGF0ZVRpbWUoZGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHN0cmluZ0FyclZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0Rmlyc3REYXlPZk1vbnRoSW5kZXgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGRheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZGF5LnNldERhdGUoMSk7XHJcbiAgICAgICAgZGF5LnNldE1vbnRoKG1vbnRoKTtcclxuICAgICAgICBkYXkuc2V0RnVsbFllYXIoeWVhcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRheUluZGV4ID0gZGF5LmdldERheSgpICsgdGhpcy5nZXRTdW5kYXlJbmRleCgpO1xyXG4gICAgICAgIHJldHVybiBkYXlJbmRleCA+PSA3ID8gZGF5SW5kZXggLSA3IDogZGF5SW5kZXg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldERheXNDb3VudEluTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIDMyIC0gdGhpcy5kYXlsaWdodFNhdmluZ0FkanVzdChuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMzIpKS5nZXREYXRlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldERheXNDb3VudEluUHJldk1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwcmV2ID0gdGhpcy5nZXRQcmV2aW91c01vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF5c0NvdW50SW5Nb250aChwcmV2Lm1vbnRoLCBwcmV2LnllYXIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRQcmV2aW91c01vbnRoQW5kWWVhcihtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbSwgeTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAobW9udGggPT09IDApIHtcclxuICAgICAgICAgICAgbSA9IDExO1xyXG4gICAgICAgICAgICB5ID0geWVhciAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtID0gbW9udGggLSAxO1xyXG4gICAgICAgICAgICB5ID0geWVhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHsnbW9udGgnOm0sJ3llYXInOnl9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXROZXh0TW9udGhBbmRZZWFyKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBtLCB5O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChtb250aCA9PT0gMTEpIHtcclxuICAgICAgICAgICAgbSA9IDA7XHJcbiAgICAgICAgICAgIHkgPSB5ZWFyICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG0gPSBtb250aCArIDE7XHJcbiAgICAgICAgICAgIHkgPSB5ZWFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4geydtb250aCc6bSwneWVhcic6eX07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldFN1bmRheUluZGV4KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZS5maXJzdERheU9mV2VlayA+IDAgPyA3IC0gdGhpcy5sb2NhbGUuZmlyc3REYXlPZldlZWsgOiAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpc1NlbGVjdGVkKGRhdGVNZXRhKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWUsIGRhdGVNZXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBkYXRlIG9mIHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMuaXNEYXRlRXF1YWxzKGRhdGUsIGRhdGVNZXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlWzFdKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRGF0ZUVxdWFscyh0aGlzLnZhbHVlWzBdLCBkYXRlTWV0YSkgfHwgdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZVsxXSwgZGF0ZU1ldGEpIHx8IHRoaXMuaXNEYXRlQmV0d2Vlbih0aGlzLnZhbHVlWzBdLCB0aGlzLnZhbHVlWzFdLCBkYXRlTWV0YSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWVbMF0sIGRhdGVNZXRhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzTW9udGhTZWxlY3RlZChtb250aDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGRheSA9IHRoaXMudmFsdWUgPyAoQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSA/IHRoaXMudmFsdWVbMF0uZ2V0RGF0ZSgpIDogdGhpcy52YWx1ZS5nZXREYXRlKCkpIDogMTsgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTZWxlY3RlZCh7eWVhcjogdGhpcy5jdXJyZW50WWVhciwgbW9udGg6IG1vbnRoLCBkYXk6IGRheSwgc2VsZWN0YWJsZTogdHJ1ZX0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpc0RhdGVFcXVhbHModmFsdWUsIGRhdGVNZXRhKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZ2V0RGF0ZSgpID09PSBkYXRlTWV0YS5kYXkgJiYgdmFsdWUuZ2V0TW9udGgoKSA9PT0gZGF0ZU1ldGEubW9udGggJiYgdmFsdWUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZU1ldGEueWVhcjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaXNEYXRlQmV0d2VlbihzdGFydCwgZW5kLCBkYXRlTWV0YSkge1xyXG4gICAgICAgIGxldCBiZXR3ZWVuIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChzdGFydCAmJiBlbmQpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZShkYXRlTWV0YS55ZWFyLCBkYXRlTWV0YS5tb250aCwgZGF0ZU1ldGEuZGF5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXJ0LmdldFRpbWUoKSA8PSBkYXRlLmdldFRpbWUoKSAmJiBlbmQuZ2V0VGltZSgpID49IGRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYmV0d2VlbjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaXNTaW5nbGVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZSc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzUmFuZ2VTZWxlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3JhbmdlJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgaXNNdWx0aXBsZVNlbGVjdGlvbigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpc1RvZGF5KHRvZGF5LCBkYXksIG1vbnRoLCB5ZWFyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRvZGF5LmdldERhdGUoKSA9PT0gZGF5ICYmIHRvZGF5LmdldE1vbnRoKCkgPT09IG1vbnRoICYmIHRvZGF5LmdldEZ1bGxZZWFyKCkgPT09IHllYXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzU2VsZWN0YWJsZShkYXksIG1vbnRoLCB5ZWFyLCBvdGhlck1vbnRoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHZhbGlkTWluID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdmFsaWRNYXggPSB0cnVlO1xyXG4gICAgICAgIGxldCB2YWxpZERhdGUgPSB0cnVlO1xyXG4gICAgICAgIGxldCB2YWxpZERheSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChvdGhlck1vbnRoICYmICF0aGlzLnNlbGVjdE90aGVyTW9udGhzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSkge1xyXG4gICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRGdWxsWWVhcigpID4geWVhcikge1xyXG4gICAgICAgICAgICAgICAgIHZhbGlkTWluID0gZmFsc2U7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1pbkRhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhcikge1xyXG4gICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0TW9udGgoKSA+IG1vbnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhbGlkTWluID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWluRGF0ZS5nZXRNb250aCgpID09PSBtb250aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldERhdGUoKSA+IGRheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSkge1xyXG4gICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRGdWxsWWVhcigpIDwgeWVhcikge1xyXG4gICAgICAgICAgICAgICAgIHZhbGlkTWF4ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1heERhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhcikge1xyXG4gICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0TW9udGgoKSA8IG1vbnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhbGlkTWF4ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWF4RGF0ZS5nZXRNb250aCgpID09PSBtb250aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldERhdGUoKSA8IGRheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNYXggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXRlcykge1xyXG4gICAgICAgICAgIHZhbGlkRGF0ZSA9ICF0aGlzLmlzRGF0ZURpc2FibGVkKGRheSxtb250aCx5ZWFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERheXMpIHtcclxuICAgICAgICAgICB2YWxpZERheSA9ICF0aGlzLmlzRGF5RGlzYWJsZWQoZGF5LG1vbnRoLHllYXIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB2YWxpZE1pbiAmJiB2YWxpZE1heCAmJiB2YWxpZERhdGUgJiYgdmFsaWREYXk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzRGF0ZURpc2FibGVkKGRheTpudW1iZXIsIG1vbnRoOm51bWJlciwgeWVhcjpudW1iZXIpOmJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF0ZXMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGlzYWJsZWREYXRlIG9mIHRoaXMuZGlzYWJsZWREYXRlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkRGF0ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyICYmIGRpc2FibGVkRGF0ZS5nZXRNb250aCgpID09PSBtb250aCAmJiBkaXNhYmxlZERhdGUuZ2V0RGF0ZSgpID09PSBkYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzRGF5RGlzYWJsZWQoZGF5Om51bWJlciwgbW9udGg6bnVtYmVyLCB5ZWFyOm51bWJlcik6Ym9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXlzKSB7XHJcbiAgICAgICAgICAgIGxldCB3ZWVrZGF5ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XHJcbiAgICAgICAgICAgIGxldCB3ZWVrZGF5TnVtYmVyID0gd2Vla2RheS5nZXREYXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWREYXlzLmluZGV4T2Yod2Vla2RheU51bWJlcikgIT09IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uSW5wdXRGb2N1cyhldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5zaG93T25Gb2N1cykge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25JbnB1dENsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hdXRvWkluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd09uRm9jdXMgJiYgIXRoaXMub3ZlcmxheVZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgb25JbnB1dEJsdXIoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xyXG4gICAgICAgIGlmICghdGhpcy5rZWVwSW52YWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkJ1dHRvbkNsaWNrKGV2ZW50LCBpbnB1dGZpZWxkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIGlucHV0ZmllbGQuZm9jdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblByZXZCdXR0b25DbGljayhldmVudCkge1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0ge2JhY2t3YXJkOiB0cnVlLCBidXR0b246IHRydWV9O1xyXG4gICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmV4dEJ1dHRvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7YmFja3dhcmQ6IGZhbHNlLCBidXR0b246IHRydWV9O1xyXG4gICAgICAgIHRoaXMubmF2Rm9yd2FyZChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db250YWluZXJCdXR0b25LZXlkb3duKGV2ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICAgICAgIC8vdGFiXHJcbiAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlubGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhcEZvY3VzKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgLy9lc2NhcGVcclxuICAgICAgICAgICBjYXNlIDI3OlxyXG4gICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgIC8vTm9vcFxyXG4gICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgfVxyXG4gICAgXHJcbiAgICBvbklucHV0S2V5ZG93bihldmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNLZXlkb3duID0gdHJ1ZTtcclxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gOSAmJiB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRhdGVDZWxsS2V5ZG93bihldmVudCwgZGF0ZSwgZ3JvdXBJbmRleCkge1xyXG4gICAgICAgIGNvbnN0IGNlbGxDb250ZW50ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBjb25zdCBjZWxsID0gY2VsbENvbnRlbnQucGFyZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICAgICAgICAvL2Rvd24gYXJyb3dcclxuICAgICAgICAgICAgY2FzZSA0MDoge1xyXG4gICAgICAgICAgICAgICAgY2VsbENvbnRlbnQudGFiSW5kZXggPSAnLTEnO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY2VsbCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFJvdyA9IGNlbGwucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dFJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBuZXh0Um93LmNoaWxkcmVuW2NlbGxJbmRleF0uY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZm9jdXNDZWxsLCAndWktc3RhdGUtZGlzYWJsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogZmFsc2V9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvdy5jaGlsZHJlbltjZWxsSW5kZXhdLmNoaWxkcmVuWzBdLnRhYkluZGV4ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0Um93LmNoaWxkcmVuW2NlbGxJbmRleF0uY2hpbGRyZW5bMF0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogZmFsc2V9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2Rm9yd2FyZChldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vdXAgYXJyb3dcclxuICAgICAgICAgICAgY2FzZSAzODoge1xyXG4gICAgICAgICAgICAgICAgY2VsbENvbnRlbnQudGFiSW5kZXggPSAnLTEnO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY2VsbCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldlJvdyA9IGNlbGwucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZSb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gcHJldlJvdy5jaGlsZHJlbltjZWxsSW5kZXhdLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGZvY3VzQ2VsbCwgJ3VpLXN0YXRlLWRpc2FibGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7YmFja3dhcmQ6IHRydWV9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdkJhY2t3YXJkKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7YmFja3dhcmQ6IHRydWV9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2QmFja3dhcmQoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xlZnQgYXJyb3dcclxuICAgICAgICAgICAgY2FzZSAzNzoge1xyXG4gICAgICAgICAgICAgICAgY2VsbENvbnRlbnQudGFiSW5kZXggPSAnLTEnO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZDZWxsID0gY2VsbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZDZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzQ2VsbCA9IHByZXZDZWxsLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGZvY3VzQ2VsbCwgJ3VpLXN0YXRlLWRpc2FibGVkJykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhmb2N1c0NlbGwucGFyZW50RWxlbWVudCwgJ3VpLWRhdGVwaWNrZXItd2Vla251bWJlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb01vbnRoKHRydWUsIGdyb3VwSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNDZWxsLnRhYkluZGV4ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0NlbGwuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9Nb250aCh0cnVlLCBncm91cEluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9yaWdodCBhcnJvd1xyXG4gICAgICAgICAgICBjYXNlIDM5OiB7XHJcbiAgICAgICAgICAgICAgICBjZWxsQ29udGVudC50YWJJbmRleCA9ICctMSc7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBuZXh0Q2VsbC5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhmb2N1c0NlbGwsICd1aS1zdGF0ZS1kaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb01vbnRoKGZhbHNlLCBncm91cEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNDZWxsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTW9udGgoZmFsc2UsIGdyb3VwSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2VudGVyXHJcbiAgICAgICAgICAgIGNhc2UgMTM6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25EYXRlU2VsZWN0KGV2ZW50LCBkYXRlKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9lc2NhcGVcclxuICAgICAgICAgICAgY2FzZSAyNzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3RhYlxyXG4gICAgICAgICAgICBjYXNlIDk6IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYXBGb2N1cyhldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vbm8gb3BcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTW9udGhDZWxsS2V5ZG93bihldmVudCwgaW5kZXgpIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgICAgIC8vYXJyb3dzXHJcbiAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgIGNhc2UgNDA6IHtcclxuICAgICAgICAgICAgICAgIGNlbGwudGFiSW5kZXggPSAnLTEnO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gY2VsbC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGxJbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY2VsbCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsc1tldmVudC53aGljaCA9PT0gNDAgPyBjZWxsSW5kZXggKyAzIDogY2VsbEluZGV4IC0zXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLnRhYkluZGV4ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vbGVmdCBhcnJvd1xyXG4gICAgICAgICAgICBjYXNlIDM3OiB7XHJcbiAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJy0xJztcclxuICAgICAgICAgICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIGlmIChwcmV2Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZDZWxsLnRhYkluZGV4ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZDZWxsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcmlnaHQgYXJyb3dcclxuICAgICAgICAgICAgY2FzZSAzOToge1xyXG4gICAgICAgICAgICAgICAgY2VsbC50YWJJbmRleCA9ICctMSc7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBjZWxsLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLnRhYkluZGV4ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRDZWxsLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZW50ZXJcclxuICAgICAgICAgICAgY2FzZSAxMzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vbnRoU2VsZWN0KGV2ZW50LCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZXNjYXBlXHJcbiAgICAgICAgICAgIGNhc2UgMjc6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy90YWJcclxuICAgICAgICAgICAgY2FzZSA5OiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL25vIG9wXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvTW9udGgocHJldiwgZ3JvdXBJbmRleCkge1xyXG4gICAgICAgIGlmIChwcmV2KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm51bWJlck9mTW9udGhzID09PSAxIHx8IChncm91cEluZGV4ID09PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSB7YmFja3dhcmQ6IHRydWV9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldk1vbnRoQ29udGFpbmVyID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bZ3JvdXBJbmRleCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbGxzID0gRG9tSGFuZGxlci5maW5kKHByZXZNb250aENvbnRhaW5lciwgJy51aS1kYXRlcGlja2VyLWNhbGVuZGFyIHRkIGEnKTtcclxuICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGwgPSBjZWxsc1tjZWxscy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcclxuICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5udW1iZXJPZk1vbnRocyA9PT0gMSB8fCAoZ3JvdXBJbmRleCA9PT0gdGhpcy5udW1iZXJPZk1vbnRocyAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IHtiYWNrd2FyZDogZmFsc2V9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZGb3J3YXJkKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0TW9udGhDb250YWluZXIgPSB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5jaGlsZHJlbltncm91cEluZGV4ICsgMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKG5leHRNb250aENvbnRhaW5lciwgJy51aS1kYXRlcGlja2VyLWNhbGVuZGFyIHRkIGEnKTtcclxuICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC50YWJJbmRleCA9ICcwJztcclxuICAgICAgICAgICAgICAgIGZvY3VzQ2VsbC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUZvY3VzKCkge1xyXG4gICAgICAgIGxldCBjZWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5hdmlnYXRpb25TdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uYXZpZ2F0aW9uU3RhdGUuYnV0dG9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRGb2N1c2FibGVDZWxsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmJhY2t3YXJkKVxyXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy51aS1kYXRlcGlja2VyLXByZXYnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy51aS1kYXRlcGlja2VyLW5leHQnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF2aWdhdGlvblN0YXRlLmJhY2t3YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnVpLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgYScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGwgPSBjZWxsc1tjZWxscy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcudWktZGF0ZXBpY2tlci1jYWxlbmRhciB0ZCBhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGwuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0Rm9jdXNhYmxlQ2VsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0Rm9jdXNhYmxlQ2VsbCgpIHtcclxuICAgICAgICBsZXQgY2VsbDtcclxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XHJcbiAgICAgICAgICAgIGxldCBjZWxscyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy51aS1tb250aHBpY2tlciAudWktbW9udGhwaWNrZXItbW9udGg6bm90KC51aS1zdGF0ZS1kaXNhYmxlZCknKTtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ2VsbD0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnVpLW1vbnRocGlja2VyIC51aS1tb250aHBpY2tlci1tb250aC51aS1zdGF0ZS1oaWdobGlnaHQnKTtcclxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwudGFiSW5kZXggPSAtMSk7XHJcbiAgICAgICAgICAgIGNlbGwgPSBzZWxlY3RlZENlbGwgfHwgY2VsbHNbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAoY2VsbHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWRDZWxscyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy51aS1tb250aHBpY2tlciAudWktbW9udGhwaWNrZXItbW9udGgudWktc3RhdGUtZGlzYWJsZWRbdGFiaW5kZXggPSBcIjBcIl0nKTtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkQ2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwudGFiSW5kZXggPSAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdhLnVpLXN0YXRlLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBpZiAoIWNlbGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2RheUNlbGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd0ZC51aS1kYXRlcGlja2VyLXRvZGF5IGE6bm90KC51aS1zdGF0ZS1kaXNhYmxlZCknKTtcclxuICAgICAgICAgICAgICAgIGlmICh0b2RheUNlbGwpXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9IHRvZGF5Q2VsbDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBjZWxsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnVpLWRhdGVwaWNrZXItY2FsZW5kYXIgdGQgYScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2VsbCkge1xyXG4gICAgICAgICAgICBjZWxsLnRhYkluZGV4ID0gJzAnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0cmFwRm9jdXMoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50cyA9IERvbUhhbmRsZXIuZ2V0Rm9jdXNhYmxlRWxlbWVudHModGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xyXG5cclxuICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMgJiYgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNlZEluZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCAtIDFdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNlZEluZGV4ICsgMV0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgb25Nb250aERyb3Bkb3duQ2hhbmdlKG06IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gcGFyc2VJbnQobSk7XHJcbiAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25ZZWFyRHJvcGRvd25DaGFuZ2UoeTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IHBhcnNlSW50KHkpO1xyXG4gICAgICAgIHRoaXMub25ZZWFyQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0VG8yNEhvdXIgPSBmdW5jdGlvbiAoaG91cnM6IG51bWJlciwgcG06IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcclxuICAgICAgICAgICAgaWYgKGhvdXJzID09PSAxMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChwbSA/IDEyIDogMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHBtID8gaG91cnMgKyAxMiA6IGhvdXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaG91cnM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdGVUaW1lKGhvdXI6IG51bWJlciwgbWludXRlOiBudW1iZXIsIHNlY29uZDogbnVtYmVyLCBwbTogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgY29uc3QgY29udmVydGVkSG91ciA9IHRoaXMuY29udmVydFRvMjRIb3VyKGhvdXIsIHBtKTtcclxuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlWzFdIHx8IHRoaXMudmFsdWVbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVbdGhpcy52YWx1ZS5sZW5ndGggLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmFsdWVEYXRlU3RyaW5nID0gdmFsdWUgPyB2YWx1ZS50b0RhdGVTdHJpbmcoKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB2YWx1ZURhdGVTdHJpbmcgJiYgdGhpcy5taW5EYXRlLnRvRGF0ZVN0cmluZygpID09PSB2YWx1ZURhdGVTdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRIb3VycygpID4gY29udmVydGVkSG91cikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0SG91cnMoKSA9PT0gY29udmVydGVkSG91cikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRNaW51dGVzKCkgPiBtaW51dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldE1pbnV0ZXMoKSA9PT0gbWludXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXRTZWNvbmRzKCkgPiBzZWNvbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdmFsdWVEYXRlU3RyaW5nICYmIHRoaXMubWF4RGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gdmFsdWVEYXRlU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0SG91cnMoKSA8IGNvbnZlcnRlZEhvdXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldEhvdXJzKCkgPT09IGNvbnZlcnRlZEhvdXIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0TWludXRlcygpIDwgbWludXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRNaW51dGVzKCkgPT09IG1pbnV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldFNlY29uZHMoKSA8IHNlY29uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBpbmNyZW1lbnRIb3VyKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgcHJldkhvdXIgPSB0aGlzLmN1cnJlbnRIb3VyO1xyXG4gICAgICAgIGxldCBuZXdIb3VyID0gdGhpcy5jdXJyZW50SG91ciArIHRoaXMuc3RlcEhvdXI7XHJcbiAgICAgICAgbGV0IG5ld1BNID0gdGhpcy5wbTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMjQnKVxyXG4gICAgICAgICAgICBuZXdIb3VyID0gKG5ld0hvdXIgPj0gMjQpID8gKG5ld0hvdXIgLSAyNCkgOiBuZXdIb3VyO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XHJcbiAgICAgICAgICAgIC8vIEJlZm9yZSB0aGUgQU0vUE0gYnJlYWssIG5vdyBhZnRlclxyXG4gICAgICAgICAgICBpZiAocHJldkhvdXIgPCAxMiAmJiBuZXdIb3VyID4gMTEpIHtcclxuICAgICAgICAgICAgICAgIG5ld1BNPSAhdGhpcy5wbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdIb3VyID0gKG5ld0hvdXIgPj0gMTMpID8gKG5ld0hvdXIgLSAxMikgOiBuZXdIb3VyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVUaW1lKG5ld0hvdXIsIHRoaXMuY3VycmVudE1pbnV0ZSwgdGhpcy5jdXJyZW50U2Vjb25kLCBuZXdQTSkpIHtcclxuICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBuZXdIb3VyO1xyXG4gICAgICAgICAgdGhpcy5wbSA9IG5ld1BNO1xyXG4gICAgICAgIH1cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oZXZlbnQ6IEV2ZW50LCB0eXBlOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCB0eXBlLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcChldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25UaW1lUGlja2VyRWxlbWVudE1vdXNlT3V0KGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXBlYXQoZXZlbnQ6IEV2ZW50LCBpbnRlcnZhbDogbnVtYmVyLCB0eXBlOiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGkgPSBpbnRlcnZhbHx8NTAwO1xyXG5cclxuICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy50aW1lUGlja2VyVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIDEwMCwgdHlwZSwgZGlyZWN0aW9uKTtcclxuICAgICAgICB9LCBpKTtcclxuXHJcbiAgICAgICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudEhvdXIoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50SG91cihldmVudCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudE1pbnV0ZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRNaW51dGUoZXZlbnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRTZWNvbmQoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50U2Vjb25kKGV2ZW50KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclRpbWVQaWNrZXJUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyVGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZVBpY2tlclRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRlY3JlbWVudEhvdXIoZXZlbnQpIHtcclxuICAgICAgICBsZXQgbmV3SG91ciA9IHRoaXMuY3VycmVudEhvdXIgLSB0aGlzLnN0ZXBIb3VyO1xyXG4gICAgICAgIGxldCBuZXdQTSA9IHRoaXMucG1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMjQnKVxyXG4gICAgICAgICAgICBuZXdIb3VyID0gKG5ld0hvdXIgPCAwKSA/ICgyNCArIG5ld0hvdXIpIDogbmV3SG91cjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xyXG4gICAgICAgICAgICAvLyBJZiB3ZSB3ZXJlIGF0IG5vb24vbWlkbmlnaHQsIHRoZW4gc3dpdGNoXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3VyID09PSAxMikge1xyXG4gICAgICAgICAgICAgICAgbmV3UE0gPSAhdGhpcy5wbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdIb3VyID0gKG5ld0hvdXIgPD0gMCkgPyAoMTIgKyBuZXdIb3VyKSA6IG5ld0hvdXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZShuZXdIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZCwgbmV3UE0pKSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gbmV3SG91cjtcclxuICAgICAgICAgIHRoaXMucG0gPSBuZXdQTTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluY3JlbWVudE1pbnV0ZShldmVudCkge1xyXG4gICAgICAgIGxldCBuZXdNaW51dGUgPSB0aGlzLmN1cnJlbnRNaW51dGUgKyB0aGlzLnN0ZXBNaW51dGU7XHJcbiAgICAgICAgbmV3TWludXRlID0gKG5ld01pbnV0ZSA+IDU5KSA/IG5ld01pbnV0ZSAtIDYwIDogbmV3TWludXRlO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSh0aGlzLmN1cnJlbnRIb3VyLCBuZXdNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZCwgdGhpcy5wbSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gbmV3TWludXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWNyZW1lbnRNaW51dGUoZXZlbnQpIHtcclxuICAgICAgICBsZXQgbmV3TWludXRlID0gdGhpcy5jdXJyZW50TWludXRlIC0gdGhpcy5zdGVwTWludXRlO1xyXG4gICAgICAgIG5ld01pbnV0ZSA9IChuZXdNaW51dGUgPCAwKSA/IDYwICsgbmV3TWludXRlIDogbmV3TWludXRlO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSh0aGlzLmN1cnJlbnRIb3VyLCBuZXdNaW51dGUsIHRoaXMuY3VycmVudFNlY29uZCwgdGhpcy5wbSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gbmV3TWludXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbmNyZW1lbnRTZWNvbmQoZXZlbnQpIHtcclxuICAgICAgICBsZXQgbmV3U2Vjb25kID0gdGhpcy5jdXJyZW50U2Vjb25kICsgdGhpcy5zdGVwU2Vjb25kO1xyXG4gICAgICAgIG5ld1NlY29uZCA9IChuZXdTZWNvbmQgPiA1OSkgPyBuZXdTZWNvbmQgLSA2MCA6IG5ld1NlY29uZDtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUodGhpcy5jdXJyZW50SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCBuZXdTZWNvbmQsIHRoaXMucG0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IG5ld1NlY29uZDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkZWNyZW1lbnRTZWNvbmQoZXZlbnQpIHtcclxuICAgICAgICBsZXQgbmV3U2Vjb25kID0gdGhpcy5jdXJyZW50U2Vjb25kIC0gdGhpcy5zdGVwU2Vjb25kO1xyXG4gICAgICAgIG5ld1NlY29uZCA9IChuZXdTZWNvbmQgPCAwKSA/IDYwICsgbmV3U2Vjb25kIDogbmV3U2Vjb25kO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlVGltZSh0aGlzLmN1cnJlbnRIb3VyLCB0aGlzLmN1cnJlbnRNaW51dGUsIG5ld1NlY29uZCwgdGhpcy5wbSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gbmV3U2Vjb25kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVUaW1lKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsxXSB8fCB0aGlzLnZhbHVlWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhbHVlID0gdmFsdWUgPyBuZXcgRGF0ZSh2YWx1ZS5nZXRUaW1lKCkpIDogbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3VyID09PSAxMilcclxuICAgICAgICAgICAgICAgIHZhbHVlLnNldEhvdXJzKHRoaXMucG0gPyAxMiA6IDApO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zZXRIb3Vycyh0aGlzLnBtID8gdGhpcy5jdXJyZW50SG91ciArIDEyIDogdGhpcy5jdXJyZW50SG91cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZS5zZXRIb3Vycyh0aGlzLmN1cnJlbnRIb3VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFsdWUuc2V0TWludXRlcyh0aGlzLmN1cnJlbnRNaW51dGUpO1xyXG4gICAgICAgIHZhbHVlLnNldFNlY29uZHModGhpcy5jdXJyZW50U2Vjb25kKTtcclxuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0pXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFt0aGlzLnZhbHVlWzBdLCB2YWx1ZV07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gW3ZhbHVlLCBudWxsXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSl7XHJcbiAgICAgICAgICAgIHZhbHVlID0gWy4uLnRoaXMudmFsdWUuc2xpY2UoMCwgLTEpLCB2YWx1ZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlKTtcclxuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodmFsdWUpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0b2dnbGVBTVBNKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgbmV3UE0gPSAhdGhpcy5wbTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVRpbWUodGhpcy5jdXJyZW50SG91ciwgdGhpcy5jdXJyZW50TWludXRlLCB0aGlzLmN1cnJlbnRTZWNvbmQsIG5ld1BNKSkge1xyXG4gICAgICAgICAgdGhpcy5wbSA9IG5ld1BNO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Vc2VySW5wdXQoZXZlbnQpIHtcclxuICAgICAgICAvLyBJRSAxMSBXb3JrYXJvdW5kIGZvciBpbnB1dCBwbGFjZWhvbGRlciA6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcmltZWZhY2VzL3ByaW1lbmcvaXNzdWVzLzIwMjZcclxuICAgICAgICBpZiAoIXRoaXMuaXNLZXlkb3duKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0tleWRvd24gPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZUZyb21TdHJpbmcodmFsKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFNlbGVjdGlvbih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICAvL2ludmFsaWQgZGF0ZVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmZpbGxlZCA9IHZhbCAhPSBudWxsICYmIHZhbC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVmFsaWRTZWxlY3Rpb24odmFsdWUpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RhYmxlKHZhbHVlLmdldERhdGUoKSwgdmFsdWUuZ2V0TW9udGgoKSwgdmFsdWUuZ2V0RnVsbFllYXIoKSwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLmV2ZXJ5KHYgPT4gdGhpcy5pc1NlbGVjdGFibGUodi5nZXREYXRlKCksIHYuZ2V0TW9udGgoKSwgdi5nZXRGdWxsWWVhcigpLCBmYWxzZSkpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IHZhbHVlLmxlbmd0aCA+IDEgJiYgdmFsdWVbMV0gPiB2YWx1ZVswXSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcGFyc2VWYWx1ZUZyb21TdHJpbmcodGV4dDogc3RyaW5nKTogRGF0ZSB8IERhdGVbXXtcclxuICAgICAgICBpZiAoIXRleHQgfHwgdGV4dC50cmltKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgdmFsdWU6IGFueTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZURhdGVUaW1lKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gdGV4dC5zcGxpdCh0aGlzLm11bHRpcGxlU2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgdmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgdG9rZW4gb2YgdG9rZW5zKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKHRoaXMucGFyc2VEYXRlVGltZSh0b2tlbi50cmltKCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gdGV4dC5zcGxpdCgnICcrdGhpcy5yYW5nZVNlcGFyYXRvciArJyAnKTtcclxuICAgICAgICAgICAgdmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlW2ldID0gdGhpcy5wYXJzZURhdGVUaW1lKHRva2Vuc1tpXS50cmltKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcGFyc2VEYXRlVGltZSh0ZXh0KTogRGF0ZSB7XHJcbiAgICAgICAgbGV0IGRhdGU6IERhdGU7XHJcbiAgICAgICAgbGV0IHBhcnRzOiBzdHJpbmdbXSA9IHRleHQuc3BsaXQoJyAnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy50aW1lT25seSkge1xyXG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRpbWUoZGF0ZSwgcGFydHNbMF0sIHBhcnRzWzFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSB0aGlzLmdldERhdGVGb3JtYXQoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhbXBtID0gdGhpcy5ob3VyRm9ybWF0ID09ICcxMicgPyBwYXJ0cy5wb3AoKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZVN0cmluZyA9IHBhcnRzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkYXRlID0gdGhpcy5wYXJzZURhdGUocGFydHMuam9pbignICcpLCBkYXRlRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVUaW1lKGRhdGUsIHRpbWVTdHJpbmcsIGFtcG0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLnBhcnNlRGF0ZSh0ZXh0LCBkYXRlRm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcG9wdWxhdGVUaW1lKHZhbHVlLCB0aW1lU3RyaW5nLCBhbXBtKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInICYmICFhbXBtKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdJbnZhbGlkIFRpbWUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBtID0gKGFtcG0gPT09ICdQTScgfHwgYW1wbSA9PT0gJ3BtJyk7XHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnBhcnNlVGltZSh0aW1lU3RyaW5nKTtcclxuICAgICAgICB2YWx1ZS5zZXRIb3Vycyh0aW1lLmhvdXIpO1xyXG4gICAgICAgIHZhbHVlLnNldE1pbnV0ZXModGltZS5taW51dGUpO1xyXG4gICAgICAgIHZhbHVlLnNldFNlY29uZHModGltZS5zZWNvbmQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVVSSgpIHtcclxuICAgICAgICBsZXQgdmFsID0gdGhpcy52YWx1ZXx8dGhpcy5kZWZhdWx0RGF0ZXx8bmV3IERhdGUoKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKXtcclxuICAgICAgICAgICAgdmFsID0gdmFsWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSB2YWwuZ2V0TW9udGgoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gdmFsLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lfHx0aGlzLnRpbWVPbmx5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudEhvdXJQTSh2YWwuZ2V0SG91cnMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IHZhbC5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IHZhbC5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgc2hvd092ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGVPdmVybGF5KCkge1xyXG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsZWFyVGltZVBpY2tlclRpbWVyKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRvdWNoVUkpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbmxpbmUpe1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxyXG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlVG91Y2hVSSc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gZXZlbnQuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZE92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcclxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoZXZlbnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25PdmVybGF5QW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVUb3VjaFVJJzpcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmRPdmVybGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5LCB0aGlzLmFwcGVuZFRvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSAmJiB0aGlzLmFwcGVuZFRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgYWxpZ25PdmVybGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvdWNoVUkpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVNb2RhbGl0eSh0aGlzLm92ZXJsYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pXHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVsYXRpdmVQb3NpdGlvbih0aGlzLm92ZXJsYXksIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlTW9kYWxpdHkoZWxlbWVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5tYXNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2suc3R5bGUuekluZGV4ID0gU3RyaW5nKHBhcnNlSW50KGVsZW1lbnQuc3R5bGUuekluZGV4KSAtIDEpO1xyXG4gICAgICAgICAgICBsZXQgbWFza1N0eWxlQ2xhc3MgPSAndWktd2lkZ2V0LW92ZXJsYXkgdWktZGF0ZXBpY2tlci1tYXNrIHVpLWRhdGVwaWNrZXItbWFzay1zY3JvbGxibG9ja2VyJztcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXModGhpcy5tYXNrLCBtYXNrU3R5bGVDbGFzcyk7XHJcbiAgICAgICAgICAgIFxyXG5cdFx0XHR0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5tYXNrLCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrKTtcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMubWFzayk7XHJcbiAgICAgICAgICAgIGxldCBib2R5Q2hpbGRyZW4gPSBkb2N1bWVudC5ib2R5LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBsZXQgaGFzQmxvY2tlck1hc2tzOiBib29sZWFuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvZHlDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvZHlDaGlsZCA9IGJvZHlDaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGJvZHlDaGlsZCwgJ3VpLWRhdGVwaWNrZXItbWFzay1zY3JvbGxibG9ja2VyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNCbG9ja2VyTWFza3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIWhhc0Jsb2NrZXJNYXNrcykge1xyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFzayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1hc2tDbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tYXNrQ2xpY2tMaXN0ZW5lciA9IG51bGw7XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZUZyb21TdHJpbmcodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0ZUZvcm1hdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0IHx8IHRoaXMubG9jYWxlLmRhdGVGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFBvcnRlZCBmcm9tIGpxdWVyeS11aSBkYXRlcGlja2VyIGZvcm1hdERhdGVcclxuICAgIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpRm9ybWF0O1xyXG4gICAgICAgIGNvbnN0IGxvb2tBaGVhZCA9IChtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtYXRjaGVzID0gKGlGb3JtYXQgKyAxIDwgZm9ybWF0Lmxlbmd0aCAmJiBmb3JtYXQuY2hhckF0KGlGb3JtYXQgKyAxKSA9PT0gbWF0Y2gpO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgaUZvcm1hdCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZvcm1hdE51bWJlciA9IChtYXRjaCwgdmFsdWUsIGxlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bSA9ICcnICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKG1hdGNoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChudW0ubGVuZ3RoIDwgbGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9ICcwJyArIG51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmb3JtYXROYW1lID0gKG1hdGNoLCB2YWx1ZSwgc2hvcnROYW1lcywgbG9uZ05hbWVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGxvb2tBaGVhZChtYXRjaCkgPyBsb25nTmFtZXNbdmFsdWVdIDogc2hvcnROYW1lc1t2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgICAgICBsZXQgbGl0ZXJhbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZGF0ZSkge1xyXG4gICAgICAgICAgICBmb3IgKGlGb3JtYXQgPSAwOyBpRm9ybWF0IDwgZm9ybWF0Lmxlbmd0aDsgaUZvcm1hdCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGl0ZXJhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09PSAnXFwnJyAmJiAhbG9va0FoZWFkKCdcXCcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXRlcmFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TnVtYmVyKCdkJywgZGF0ZS5nZXREYXRlKCksIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE5hbWUoJ0QnLCBkYXRlLmdldERheSgpLCB0aGlzLmxvY2FsZS5kYXlOYW1lc1Nob3J0LCB0aGlzLmxvY2FsZS5kYXlOYW1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TnVtYmVyKCdvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSkuZ2V0VGltZSgpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIDAsIDApLmdldFRpbWUoKSkgLyA4NjQwMDAwMCksIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE51bWJlcignbScsIGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE5hbWUoJ00nLGRhdGUuZ2V0TW9udGgoKSwgdGhpcy5sb2NhbGUubW9udGhOYW1lc1Nob3J0LCB0aGlzLmxvY2FsZS5tb250aE5hbWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd5JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBsb29rQWhlYWQoJ3knKSA/IGRhdGUuZ2V0RnVsbFllYXIoKSA6IChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDAgPCAxMCA/ICcwJyA6ICcnKSArIChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0AnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJyEnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0VGltZSgpICogMTAwMDAgKyB0aGlzLnRpY2tzVG8xOTcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1xcJyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKCdcXCcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSAnXFwnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXQuY2hhckF0KGlGb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmb3JtYXRUaW1lKGRhdGUpIHtcclxuICAgICAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICAgICAgbGV0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgIGxldCBtaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgbGV0IHNlY29uZHMgPSBkYXRlLmdldFNlY29uZHMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicgJiYgaG91cnMgPiAxMSAmJiBob3VycyAhPSAxMikge1xyXG4gICAgICAgICAgICBob3Vycy09MTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gaG91cnMgPT09IDAgPyAxMiA6IChob3VycyA8IDEwKSA/ICcwJyArIGhvdXJzIDogaG91cnM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9IChob3VycyA8IDEwKSA/ICcwJyArIGhvdXJzIDogaG91cnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dHB1dCArPSAnOic7XHJcbiAgICAgICAgb3V0cHV0ICs9IChtaW51dGVzIDwgMTApID8gJzAnICsgbWludXRlcyA6IG1pbnV0ZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1NlY29uZHMpIHtcclxuICAgICAgICAgICAgb3V0cHV0ICs9ICc6JztcclxuICAgICAgICAgICAgb3V0cHV0ICs9IChzZWNvbmRzIDwgMTApID8gJzAnICsgc2Vjb25kcyA6IHNlY29uZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xyXG4gICAgICAgICAgICBvdXRwdXQgKz0gZGF0ZS5nZXRIb3VycygpID4gMTEgPyAnIFBNJyA6ICcgQU0nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwYXJzZVRpbWUodmFsdWUpIHtcclxuICAgICAgICBsZXQgdG9rZW5zOiBzdHJpbmdbXSA9IHZhbHVlLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgbGV0IHZhbGlkVG9rZW5MZW5ndGggPSB0aGlzLnNob3dTZWNvbmRzID8gMyA6IDI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggIT09IHZhbGlkVG9rZW5MZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHRpbWVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGggPSBwYXJzZUludCh0b2tlbnNbMF0pO1xyXG4gICAgICAgIGxldCBtID0gcGFyc2VJbnQodG9rZW5zWzFdKTtcclxuICAgICAgICBsZXQgcyA9IHRoaXMuc2hvd1NlY29uZHMgPyBwYXJzZUludCh0b2tlbnNbMl0pIDogbnVsbDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXNOYU4oaCkgfHwgaXNOYU4obSkgfHwgaCA+IDIzIHx8IG0gPiA1OSB8fCAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicgJiYgaCA+IDEyKSB8fCAodGhpcy5zaG93U2Vjb25kcyAmJiAoaXNOYU4ocykgfHwgcyA+IDU5KSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHRpbWVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGggIT09IDEyICYmIHRoaXMucG0pIHtcclxuICAgICAgICAgICAgICAgICAgICBoICs9IDEyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMucG0gJiYgaCA9PT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICBoIC09IDEyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4ge2hvdXI6IGgsIG1pbnV0ZTogbSwgc2Vjb25kOiBzfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFBvcnRlZCBmcm9tIGpxdWVyeS11aSBkYXRlcGlja2VyIHBhcnNlRGF0ZVxyXG4gICAgcGFyc2VEYXRlKHZhbHVlLCBmb3JtYXQpIHtcclxuICAgICAgICBpZiAoZm9ybWF0ID09IG51bGwgfHwgdmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgYXJndW1lbnRzXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWUgKyBcIlwiKTtcclxuICAgICAgICBpZiAodmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaUZvcm1hdCwgZGltLCBleHRyYSxcclxuICAgICAgICBpVmFsdWUgPSAwLFxyXG4gICAgICAgIHNob3J0WWVhckN1dG9mZiA9ICh0eXBlb2YgdGhpcy5zaG9ydFllYXJDdXRvZmYgIT09IFwic3RyaW5nXCIgPyB0aGlzLnNob3J0WWVhckN1dG9mZiA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAlIDEwMCArIHBhcnNlSW50KHRoaXMuc2hvcnRZZWFyQ3V0b2ZmLCAxMCkpLFxyXG4gICAgICAgIHllYXIgPSAtMSxcclxuICAgICAgICBtb250aCA9IC0xLFxyXG4gICAgICAgIGRheSA9IC0xLFxyXG4gICAgICAgIGRveSA9IC0xLFxyXG4gICAgICAgIGxpdGVyYWwgPSBmYWxzZSxcclxuICAgICAgICBkYXRlLFxyXG4gICAgICAgIGxvb2tBaGVhZCA9IChtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IChpRm9ybWF0ICsgMSA8IGZvcm1hdC5sZW5ndGggJiYgZm9ybWF0LmNoYXJBdChpRm9ybWF0ICsgMSkgPT09IG1hdGNoKTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgIGlGb3JtYXQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE51bWJlciA9IChtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXNEb3VibGVkID0gbG9va0FoZWFkKG1hdGNoKSxcclxuICAgICAgICAgICAgICAgIHNpemUgPSAobWF0Y2ggPT09IFwiQFwiID8gMTQgOiAobWF0Y2ggPT09IFwiIVwiID8gMjAgOlxyXG4gICAgICAgICAgICAgICAgKG1hdGNoID09PSBcInlcIiAmJiBpc0RvdWJsZWQgPyA0IDogKG1hdGNoID09PSBcIm9cIiA/IDMgOiAyKSkpKSxcclxuICAgICAgICAgICAgICAgIG1pblNpemUgPSAobWF0Y2ggPT09IFwieVwiID8gc2l6ZSA6IDEpLFxyXG4gICAgICAgICAgICAgICAgZGlnaXRzID0gbmV3IFJlZ0V4cChcIl5cXFxcZHtcIiArIG1pblNpemUgKyBcIixcIiArIHNpemUgKyBcIn1cIiksXHJcbiAgICAgICAgICAgICAgICBudW0gPSB2YWx1ZS5zdWJzdHJpbmcoaVZhbHVlKS5tYXRjaChkaWdpdHMpO1xyXG4gICAgICAgICAgICBpZiAoIW51bSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJNaXNzaW5nIG51bWJlciBhdCBwb3NpdGlvbiBcIiArIGlWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpVmFsdWUgKz0gbnVtWyAwIF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQobnVtWyAwIF0sIDEwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE5hbWUgPSAobWF0Y2gsIHNob3J0TmFtZXMsIGxvbmdOYW1lcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgICAgICAgbGV0IGFyciA9IGxvb2tBaGVhZChtYXRjaCkgPyBsb25nTmFtZXMgOiBzaG9ydE5hbWVzO1xyXG4gICAgICAgICAgICBsZXQgbmFtZXMgPSBbXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKFtpLGFycltpXV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5hbWVzLnNvcnQoKGEsYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0oYVsgMSBdLmxlbmd0aCAtIGJbIDEgXS5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gbmFtZXNbaV1bMV07XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyKGlWYWx1ZSwgbmFtZS5sZW5ndGgpLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gbmFtZXNbaV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgaVZhbHVlICs9IG5hbWUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJVbmtub3duIG5hbWUgYXQgcG9zaXRpb24gXCIgKyBpVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoZWNrTGl0ZXJhbCA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmNoYXJBdChpVmFsdWUpICE9PSBmb3JtYXQuY2hhckF0KGlGb3JtYXQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVuZXhwZWN0ZWQgbGl0ZXJhbCBhdCBwb3NpdGlvbiBcIiArIGlWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpVmFsdWUrKztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XHJcbiAgICAgICAgICAgIGRheSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAoaUZvcm1hdCA9IDA7IGlGb3JtYXQgPCBmb3JtYXQubGVuZ3RoOyBpRm9ybWF0KyspIHtcclxuICAgICAgICAgICAgaWYgKGxpdGVyYWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09PSBcIidcIiAmJiAhbG9va0FoZWFkKFwiJ1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXkgPSBnZXROdW1iZXIoXCJkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXROYW1lKFwiRFwiLCB0aGlzLmxvY2FsZS5kYXlOYW1lc1Nob3J0LCB0aGlzLmxvY2FsZS5kYXlOYW1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRveSA9IGdldE51bWJlcihcIm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZ2V0TnVtYmVyKFwibVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk1cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBnZXROYW1lKFwiTVwiLCB0aGlzLmxvY2FsZS5tb250aE5hbWVzU2hvcnQsIHRoaXMubG9jYWxlLm1vbnRoTmFtZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyID0gZ2V0TnVtYmVyKFwieVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkBcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGdldE51bWJlcihcIkBcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiIVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKGdldE51bWJlcihcIiFcIikgLSB0aGlzLnRpY2tzVG8xOTcwKSAvIDEwMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIidcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvb2tBaGVhZChcIidcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrTGl0ZXJhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpVmFsdWUgPCB2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZXh0cmEgPSB2YWx1ZS5zdWJzdHIoaVZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKCEvXlxccysvLnRlc3QoZXh0cmEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkV4dHJhL3VucGFyc2VkIGNoYXJhY3RlcnMgZm91bmQgaW4gZGF0ZTogXCIgKyBleHRyYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHllYXIgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDwgMTAwKSB7XHJcbiAgICAgICAgICAgIHllYXIgKz0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICUgMTAwICtcclxuICAgICAgICAgICAgICAgICh5ZWFyIDw9IHNob3J0WWVhckN1dG9mZiA/IDAgOiAtMTAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkb3kgPiAtMSkge1xyXG4gICAgICAgICAgICBtb250aCA9IDE7XHJcbiAgICAgICAgICAgIGRheSA9IGRveTtcclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgZGltID0gdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKHllYXIsIG1vbnRoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF5IDw9IGRpbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW9udGgrKztcclxuICAgICAgICAgICAgICAgIGRheSAtPSBkaW07XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0ZSA9IHRoaXMuZGF5bGlnaHRTYXZpbmdBZGp1c3QobmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRlLmdldEZ1bGxZZWFyKCkgIT09IHllYXIgfHwgZGF0ZS5nZXRNb250aCgpICsgMSAhPT0gbW9udGggfHwgZGF0ZS5nZXREYXRlKCkgIT09IGRheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiSW52YWxpZCBkYXRlXCI7IC8vIEUuZy4gMzEvMDIvMDBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRheWxpZ2h0U2F2aW5nQWRqdXN0KGRhdGUpIHtcclxuICAgICAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSA+IDEyID8gZGF0ZS5nZXRIb3VycygpICsgMiA6IDApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmZpbGxlZCA9IHRoaXMuaW5wdXRGaWVsZFZhbHVlICYmIHRoaXMuaW5wdXRGaWVsZFZhbHVlICE9ICcnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblRvZGF5QnV0dG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBsZXQgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGRhdGVNZXRhID0ge2RheTogZGF0ZS5nZXREYXRlKCksIG1vbnRoOiBkYXRlLmdldE1vbnRoKCksIHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSwgb3RoZXJNb250aDogZGF0ZS5nZXRNb250aCgpICE9PSB0aGlzLmN1cnJlbnRNb250aCB8fCBkYXRlLmdldEZ1bGxZZWFyKCkgIT09IHRoaXMuY3VycmVudFllYXIsIHRvZGF5OiB0cnVlLCBzZWxlY3RhYmxlOiB0cnVlfTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdChldmVudCwgZGF0ZU1ldGEpO1xyXG4gICAgICAgIHRoaXMub25Ub2RheUNsaWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkNsZWFyQnV0dG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKG51bGwpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xyXG4gICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcclxuICAgICAgICB0aGlzLm9uQ2xlYXJDbGljay5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0c2lkZUNsaWNrZWQoZXZlbnQpICYmIHRoaXMub3ZlcmxheVZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tPdXRzaWRlLmVtaXQoZXZlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciAmJiAhdGhpcy50b3VjaFVJKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzT3V0c2lkZUNsaWNrZWQoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICEodGhpcy5lbC5uYXRpdmVFbGVtZW50LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLmlzTmF2SWNvbkNsaWNrZWQoZXZlbnQpIHx8wqBcclxuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIHx8ICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LmNvbnRhaW5zKDxOb2RlPiBldmVudC50YXJnZXQpKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzTmF2SWNvbkNsaWNrZWQoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3VpLWRhdGVwaWNrZXItcHJldicpIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndWktZGF0ZXBpY2tlci1wcmV2LWljb24nKVxyXG4gICAgICAgICAgICAgICAgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICd1aS1kYXRlcGlja2VyLW5leHQnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3VpLWRhdGVwaWNrZXItbmV4dC1pY29uJykpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmICFEb21IYW5kbGVyLmlzQW5kcm9pZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25PdmVybGF5SGlkZSgpIHtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcclxuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XHJcbiAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZSxTaGFyZWRNb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0NhbGVuZGFyLEJ1dHRvbk1vZHVsZSxTaGFyZWRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbQ2FsZW5kYXJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7IH1cclxuIl19