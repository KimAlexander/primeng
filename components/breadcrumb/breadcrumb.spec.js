import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Breadcrumb } from './breadcrumb';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
describe('Breadcrumb', function () {
    var breadcrumb;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'test', component: Breadcrumb }
                ]),
                NoopAnimationsModule
            ],
            declarations: [
                Breadcrumb,
            ]
        });
        fixture = TestBed.createComponent(Breadcrumb);
        breadcrumb = fixture.componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var breadcrumbEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(breadcrumbEl).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        breadcrumb.style = { 'primeng': 'rocks!' };
        breadcrumb.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var breadcrumbEl = fixture.debugElement.query(By.css('div'));
        expect(breadcrumbEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(breadcrumbEl.styles.primeng).toEqual("rocks!");
    });
    it('should display the home', function () {
        breadcrumb.home = { icon: 'pi pi-home' };
        fixture.detectChanges();
        var homeEl = fixture.debugElement.query(By.css('.ui-breadcrumb-home'));
        expect(homeEl).toBeTruthy();
    });
    it('should change home icon', function () {
        breadcrumb.home = { icon: 'primeng' };
        fixture.detectChanges();
        var homeEl = fixture.debugElement.query(By.css('.ui-breadcrumb-home')).query(By.css('span')).nativeElement;
        expect(homeEl.className).toContain('primeng');
    });
    it('should display items', function () {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            { label: 'Squad' },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();
        var itemsEl = fixture.debugElement.query(By.css('ul'));
        expect(itemsEl.children[2].children[0]).toBeTruthy();
        expect(itemsEl.children[2].children[0].nativeElement.textContent).toEqual("Squad");
        expect(itemsEl.children.length).toEqual(5);
    });
    it('should call itemClick when click home ', function () {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            { label: 'Squad' },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();
        var itemClickSpy = spyOn(breadcrumb, 'itemClick').and.callThrough();
        var homeEl = fixture.debugElement.query(By.css('.ui-breadcrumb-home')).query(By.css('a')).nativeElement;
        homeEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('should call itemClick when click item ', function () {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            { label: 'Squad' },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();
        var itemClickSpy = spyOn(breadcrumb, 'itemClick').and.callThrough();
        var squadEl = fixture.debugElement.query(By.css('ul')).children[2].children[0].nativeElement;
        squadEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('should call itemClick(routerLink) when click item ', function () {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            { label: 'Squad' },
            { label: 'Lionel Messi', routerLink: 'test', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();
        var itemClickSpy = spyOn(breadcrumb, 'itemClick').and.callThrough();
        var messiEl = fixture.debugElement.query(By.css('ul')).children[4].children[0].nativeElement;
        messiEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('should call itemClick and do nothing (item disabled) ', function () {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            { label: 'Squad', disabled: true },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();
        var itemClickSpy = spyOn(breadcrumb, 'itemClick').and.callThrough();
        var squadEl = fixture.debugElement.query(By.css('ul')).children[2].children[0].nativeElement;
        squadEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('should run command', function () {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            { label: 'Squad', command: function () { breadcrumb.styleClass = "primengRocks!"; } },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();
        var itemClickSpy = spyOn(breadcrumb, 'itemClick').and.callThrough();
        var squadEl = fixture.debugElement.query(By.css('ul')).children[2].children[0].nativeElement;
        squadEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
        expect(breadcrumb.styleClass).toEqual("primengRocks!");
    });
    it('should call itemClick with home item', function () {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            { label: 'Squad', command: function () { breadcrumb.styleClass = "primengRocks!"; } },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();
        var itemClickSpy = spyOn(breadcrumb, 'itemClick').and.callThrough();
        var squadEl = fixture.debugElement.query(By.css('ul')).children[2].children[0].nativeElement;
        var event = new Event("click");
        breadcrumb.onHomeClick(event);
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
    });
});
//# sourceMappingURL=breadcrumb.spec.js.map