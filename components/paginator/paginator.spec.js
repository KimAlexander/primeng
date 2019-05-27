"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scrolling_1 = require("@angular/cdk/scrolling");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var paginator_1 = require("./paginator");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var dropdown_1 = require("../dropdown/dropdown");
describe('Paginator', function () {
    var paginator;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                forms_1.FormsModule,
                scrolling_1.ScrollingModule
            ],
            declarations: [
                paginator_1.Paginator,
                dropdown_1.Dropdown,
                dropdown_1.DropdownItem
            ]
        });
        fixture = testing_1.TestBed.createComponent(paginator_1.Paginator);
        paginator = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var paginatorEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-paginator'));
        expect(paginatorEl).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        paginator.style = { 'primeng': 'rocks!' };
        paginator.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var paginatorEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-paginator'));
        expect(paginatorEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(paginatorEl.nativeElement.style.primeng).toEqual("rocks!");
    });
    it('should use alwaysShow false', function () {
        paginator.alwaysShow = false;
        fixture.detectChanges();
        var paginatorEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-paginator'));
        expect(paginatorEl).toBeFalsy();
    });
    it('should not show dropdown', function () {
        paginator.rows = 10;
        paginator.totalRecords = 120;
        fixture.detectChanges();
        var dropdownEl = fixture.debugElement.query(platform_browser_1.By.css('p-dropdown'));
        expect(dropdownEl).toBeFalsy();
    });
    it('should use dropdownAppendTo', function () {
        paginator.dropdownAppendTo = 'body';
        paginator.rows = 10;
        paginator.totalRecords = 120;
        paginator.rowsPerPageOptions = [10, 20, 30];
        fixture.detectChanges();
        var dropdownEl = fixture.debugElement.query(platform_browser_1.By.css('p-dropdown'));
        expect(dropdownEl.componentInstance.appendTo).toEqual('body');
    });
    it('should have a 5 page link, 4 paginator element and 1 dropdown with 3 option', function () {
        paginator.rows = 10;
        paginator.totalRecords = 120;
        paginator.rowsPerPageOptions = [10, 20, 30];
        var updatePaginatorStateSpy = spyOn(paginator, 'updatePaginatorState').and.callThrough();
        fixture.detectChanges();
        var pageEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        var dropdownEl = fixture.debugElement.query(platform_browser_1.By.css('p-dropdown'));
        var paginatorElemntEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        expect(dropdownEl).toBeTruthy();
        expect(dropdownEl.componentInstance.options.length).toEqual(3);
        expect(updatePaginatorStateSpy).toHaveBeenCalled();
        expect(paginator.pageLinks.length).toEqual(5);
        expect(pageEls.length).toEqual(5);
        expect(paginatorElemntEls.length).toEqual(5);
    });
    it('should called onPageLinkClick and go to clicked page', function () {
        paginator.rows = 10;
        paginator.totalRecords = 120;
        paginator.rowsPerPageOptions = [10, 20, 30];
        var onPageLinkClickSpy = spyOn(paginator, 'onPageLinkClick').and.callThrough();
        fixture.detectChanges();
        var pageEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        var pickedPage = pageEls[3];
        pageEls[3].nativeElement.click();
        fixture.detectChanges();
        var pageElsAfterClick = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        var activePage = fixture.debugElement.query(platform_browser_1.By.css('.ui-state-active'));
        expect(onPageLinkClickSpy);
        expect(activePage.nativeElement.textContent).toEqual("4");
        expect((paginator.getPage() + 1).toString()).toEqual(pickedPage.nativeElement.textContent);
        var pageValue = paginator.getPage() - 1;
        for (var _i = 0, _a = paginator.pageLinks; _i < _a.length; _i++) {
            var link = _a[_i];
            expect(link).toEqual(pageValue);
            pageValue++;
        }
        expect(pageElsAfterClick[2]).toEqual(activePage);
    });
    it('should called changePageToNext and go to next page', function () {
        paginator.rows = 10;
        paginator.totalRecords = 120;
        paginator.rowsPerPageOptions = [10, 20, 30];
        var changePageToNextSpy = spyOn(paginator, 'changePageToNext').and.callThrough();
        fixture.detectChanges();
        var pageEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        var pageNextEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-paginator-next'));
        var nextPageEl = pageEls[1];
        pageNextEl.nativeElement.click();
        fixture.detectChanges();
        var pageElsAfterClick = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        var activePage = fixture.debugElement.query(platform_browser_1.By.css('.ui-state-active'));
        expect(changePageToNextSpy);
        expect(activePage.nativeElement.textContent).toEqual("2");
        expect((paginator.getPage() + 1).toString()).toEqual(nextPageEl.nativeElement.textContent);
        var pageValue = paginator.getPage();
        for (var _i = 0, _a = paginator.pageLinks; _i < _a.length; _i++) {
            var link = _a[_i];
            expect(link).toEqual(pageValue);
            pageValue++;
        }
        expect(pageElsAfterClick[paginator.getPage()]).toEqual(activePage);
    });
    it('should called changePageToPrev and go to prev page', function () {
        paginator.rows = 10;
        paginator.totalRecords = 120;
        paginator.rowsPerPageOptions = [10, 20, 30];
        var changePageToPrevSpy = spyOn(paginator, 'changePageToPrev').and.callThrough();
        fixture.detectChanges();
        var pageEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        var pageNextEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-paginator-next'));
        var pagePrevEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-paginator-prev'));
        var prevPageEl = pageEls[0];
        pageNextEl.nativeElement.click();
        fixture.detectChanges();
        pagePrevEl.nativeElement.click();
        fixture.detectChanges();
        var pageElsAfterClick = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        var activePage = fixture.debugElement.query(platform_browser_1.By.css('.ui-state-active'));
        expect(changePageToPrevSpy);
        expect(activePage.nativeElement.textContent).toEqual("1");
        expect((paginator.getPage() + 1).toString()).toEqual(prevPageEl.nativeElement.textContent);
        var pageValue = paginator.getPage() + 1;
        for (var _i = 0, _a = paginator.pageLinks; _i < _a.length; _i++) {
            var link = _a[_i];
            expect(link).toEqual(pageValue);
            pageValue++;
        }
        expect(pageElsAfterClick[0]).toEqual(activePage);
    });
    it('should called changePageToLast and go to last page', function () {
        paginator.rows = 10;
        paginator.totalRecords = 120;
        paginator.rowsPerPageOptions = [10, 20, 30];
        var changePageToLastSpy = spyOn(paginator, 'changePageToLast').and.callThrough();
        fixture.detectChanges();
        var pageLastEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-paginator-last'));
        pageLastEl.nativeElement.click();
        fixture.detectChanges();
        var pageElsAfterClick = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        var activePage = fixture.debugElement.query(platform_browser_1.By.css('.ui-state-active'));
        expect(changePageToLastSpy);
        expect(activePage.nativeElement.textContent).toEqual("12");
        var pageValue = paginator.getPage() - 3;
        for (var _i = 0, _a = paginator.pageLinks; _i < _a.length; _i++) {
            var link = _a[_i];
            expect(link).toEqual(pageValue);
            pageValue++;
        }
        expect(pageElsAfterClick[4]).toEqual(activePage);
        expect(pageLastEl.nativeElement.className).toContain('ui-state-disabled');
    });
    it('should called changePageToFirst and go to first page', function () {
        paginator.rows = 10;
        paginator.totalRecords = 120;
        paginator.rowsPerPageOptions = [10, 20, 30];
        var changePageToFirstSpy = spyOn(paginator, 'changePageToFirst').and.callThrough();
        fixture.detectChanges();
        var pageLastEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-paginator-last'));
        var pageFirstEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-paginator-first'));
        pageLastEl.nativeElement.click();
        fixture.detectChanges();
        pageFirstEl.nativeElement.click();
        fixture.detectChanges();
        var pageElsAfterClick = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        var activePage = fixture.debugElement.query(platform_browser_1.By.css('.ui-state-active'));
        expect(changePageToFirstSpy);
        expect(activePage.nativeElement.textContent).toEqual("1");
        var pageValue = paginator.getPage() + 1;
        for (var _i = 0, _a = paginator.pageLinks; _i < _a.length; _i++) {
            var link = _a[_i];
            expect(link).toEqual(pageValue);
            pageValue++;
        }
        expect(pageElsAfterClick[0]).toEqual(activePage);
        expect(pageFirstEl.nativeElement.className).toContain('ui-state-disabled');
    });
    it('should called onRppChange and change page count', function () {
        paginator.rows = 10;
        paginator.totalRecords = 120;
        paginator.rowsPerPageOptions = [10, 20, 30];
        var onRppChangeSpy = spyOn(paginator, 'onRppChange').and.callThrough();
        fixture.detectChanges();
        var dropdownEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown'));
        dropdownEl.nativeElement.click();
        fixture.detectChanges();
        var dropdownItemsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-dropdown-item'));
        dropdownItemsEl[1].nativeElement.click();
        fixture.detectChanges();
        expect(onRppChangeSpy).toHaveBeenCalled();
        expect(paginator.getPageCount()).toEqual(6);
    });
    it('should listen onPageChange', function () {
        paginator.rows = 10;
        paginator.totalRecords = 120;
        paginator.rowsPerPageOptions = [10, 20, 30];
        fixture.detectChanges();
        var data;
        paginator.onPageChange.subscribe(function (value) { return data = value; });
        var pageEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-paginator-page'));
        pageEls[3].nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.page).toEqual(3);
        expect(data.rows).toEqual(10);
        expect(data.pageCount).toEqual(12);
    });
});
//# sourceMappingURL=paginator.spec.js.map