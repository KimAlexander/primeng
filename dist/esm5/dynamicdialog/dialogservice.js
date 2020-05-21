var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
var DialogService = /** @class */ (function () {
    function DialogService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    DialogService.prototype.open = function (componentType, config) {
        var dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRef.instance.childComponentType = componentType;
        return dialogRef;
    };
    DialogService.prototype.appendDialogComponentToBody = function (config) {
        var _this = this;
        var map = new WeakMap();
        map.set(DynamicDialogConfig, config);
        var dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);
        var sub = dialogRef.onClose.subscribe(function () {
            _this.dialogComponentRef.instance.close();
        });
        var destroySub = dialogRef.onDestroy.subscribe(function () {
            _this.removeDialogComponentFromBody();
            destroySub.unsubscribe();
            sub.unsubscribe();
        });
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        var componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));
        this.appRef.attachView(componentRef.hostView);
        var domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        this.dialogComponentRef = componentRef;
        return dialogRef;
    };
    DialogService.prototype.removeDialogComponentFromBody = function () {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
    };
    DialogService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector }
    ]; };
    DialogService = __decorate([
        Injectable()
    ], DialogService);
    return DialogService;
}());
export { DialogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZHluYW1pY2RpYWxvZy8iLCJzb3VyY2VzIjpbImRpYWxvZ3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3ZEO0lBSUksdUJBQW9CLHdCQUFrRCxFQUFVLE1BQXNCLEVBQVUsUUFBa0I7UUFBOUcsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFJLENBQUM7SUFFaEksNEJBQUksR0FBWCxVQUFZLGFBQXdCLEVBQUUsTUFBMkI7UUFDN0QsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsYUFBYSxDQUFDO1FBRXBFLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxtREFBMkIsR0FBbkMsVUFBb0MsTUFBMkI7UUFBL0QsaUJBNEJDO1FBM0JHLElBQU0sR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyQyxJQUFNLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyQyxJQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUNwQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDN0MsS0FBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDckMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdkcsSUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTVGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5QyxJQUFNLE9BQU8sR0FBSSxZQUFZLENBQUMsUUFBaUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFnQixDQUFDO1FBQzVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxZQUFZLENBQUM7UUFFdkMsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLHFEQUE2QixHQUFyQztRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7Z0JBM0M2Qyx3QkFBd0I7Z0JBQWtCLGNBQWM7Z0JBQW9CLFFBQVE7O0lBSnpILGFBQWE7UUFEekIsVUFBVSxFQUFFO09BQ0EsYUFBYSxDQWdEekI7SUFBRCxvQkFBQztDQUFBLEFBaERELElBZ0RDO1NBaERZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEFwcGxpY2F0aW9uUmVmLCBJbmplY3RvciwgVHlwZSwgRW1iZWRkZWRWaWV3UmVmLCBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHluYW1pY0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pY2RpYWxvZyc7XHJcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dJbmplY3RvciB9IGZyb20gJy4vZHluYW1pY2RpYWxvZy1pbmplY3Rvcic7XHJcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dDb25maWcgfSBmcm9tICcuL2R5bmFtaWNkaWFsb2ctY29uZmlnJztcclxuaW1wb3J0IHsgRHluYW1pY0RpYWxvZ1JlZiB9IGZyb20gJy4vZHluYW1pY2RpYWxvZy1yZWYnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGlhbG9nU2VydmljZSB7XHJcbiAgICBcclxuICAgIGRpYWxvZ0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPER5bmFtaWNEaWFsb2dDb21wb25lbnQ+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuKGNvbXBvbmVudFR5cGU6IFR5cGU8YW55PiwgY29uZmlnOiBEeW5hbWljRGlhbG9nQ29uZmlnKSB7XHJcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5hcHBlbmREaWFsb2dDb21wb25lbnRUb0JvZHkoY29uZmlnKTtcclxuXHJcbiAgICAgICAgdGhpcy5kaWFsb2dDb21wb25lbnRSZWYuaW5zdGFuY2UuY2hpbGRDb21wb25lbnRUeXBlID0gY29tcG9uZW50VHlwZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFwcGVuZERpYWxvZ0NvbXBvbmVudFRvQm9keShjb25maWc6IER5bmFtaWNEaWFsb2dDb25maWcpIHtcclxuICAgICAgICBjb25zdCBtYXAgPSBuZXcgV2Vha01hcCgpO1xyXG4gICAgICAgIG1hcC5zZXQoRHluYW1pY0RpYWxvZ0NvbmZpZywgY29uZmlnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gbmV3IER5bmFtaWNEaWFsb2dSZWYoKTtcclxuICAgICAgICBtYXAuc2V0KER5bmFtaWNEaWFsb2dSZWYsIGRpYWxvZ1JlZik7XHJcblxyXG4gICAgICAgIGNvbnN0IHN1YiA9IGRpYWxvZ1JlZi5vbkNsb3NlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nQ29tcG9uZW50UmVmLmluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlc3Ryb3lTdWIgPSBkaWFsb2dSZWYub25EZXN0cm95LnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRGlhbG9nQ29tcG9uZW50RnJvbUJvZHkoKTtcclxuICAgICAgICAgICAgZGVzdHJveVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KER5bmFtaWNEaWFsb2dDb21wb25lbnQpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEeW5hbWljRGlhbG9nSW5qZWN0b3IodGhpcy5pbmplY3RvciwgbWFwKSk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuXHJcbiAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG5cclxuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZiA9IGNvbXBvbmVudFJlZjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZURpYWxvZ0NvbXBvbmVudEZyb21Cb2R5KCkge1xyXG4gICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5kaWFsb2dDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgICAgIHRoaXMuZGlhbG9nQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgIH1cclxufVxyXG4iXX0=