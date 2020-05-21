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
let DialogService = class DialogService {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    open(componentType, config) {
        const dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRef.instance.childComponentType = componentType;
        return dialogRef;
    }
    appendDialogComponentToBody(config) {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);
        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);
        const sub = dialogRef.onClose.subscribe(() => {
            this.dialogComponentRef.instance.close();
        });
        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody();
            destroySub.unsubscribe();
            sub.unsubscribe();
        });
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        this.dialogComponentRef = componentRef;
        return dialogRef;
    }
    removeDialogComponentFromBody() {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
    }
};
DialogService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];
DialogService = __decorate([
    Injectable()
], DialogService);
export { DialogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZHluYW1pY2RpYWxvZy8iLCJzb3VyY2VzIjpbImRpYWxvZ3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3ZELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFJdEIsWUFBb0Isd0JBQWtELEVBQVUsTUFBc0IsRUFBVSxRQUFrQjtRQUE5Ryw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUksQ0FBQztJQUVoSSxJQUFJLENBQUMsYUFBd0IsRUFBRSxNQUEyQjtRQUM3RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUM7UUFFcEUsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLDJCQUEyQixDQUFDLE1BQTJCO1FBQzNELE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNsRCxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUNyQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekIsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN2RyxNQUFNLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFNUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sT0FBTyxHQUFJLFlBQVksQ0FBQyxRQUFpQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQWdCLENBQUM7UUFDNUYsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztRQUV2QyxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU8sNkJBQTZCO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUNKLENBQUE7O1lBNUNpRCx3QkFBd0I7WUFBa0IsY0FBYztZQUFvQixRQUFROztBQUp6SCxhQUFhO0lBRHpCLFVBQVUsRUFBRTtHQUNBLGFBQWEsQ0FnRHpCO1NBaERZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEFwcGxpY2F0aW9uUmVmLCBJbmplY3RvciwgVHlwZSwgRW1iZWRkZWRWaWV3UmVmLCBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHluYW1pY0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pY2RpYWxvZyc7XHJcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dJbmplY3RvciB9IGZyb20gJy4vZHluYW1pY2RpYWxvZy1pbmplY3Rvcic7XHJcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dDb25maWcgfSBmcm9tICcuL2R5bmFtaWNkaWFsb2ctY29uZmlnJztcclxuaW1wb3J0IHsgRHluYW1pY0RpYWxvZ1JlZiB9IGZyb20gJy4vZHluYW1pY2RpYWxvZy1yZWYnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGlhbG9nU2VydmljZSB7XHJcbiAgICBcclxuICAgIGRpYWxvZ0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPER5bmFtaWNEaWFsb2dDb21wb25lbnQ+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuKGNvbXBvbmVudFR5cGU6IFR5cGU8YW55PiwgY29uZmlnOiBEeW5hbWljRGlhbG9nQ29uZmlnKSB7XHJcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5hcHBlbmREaWFsb2dDb21wb25lbnRUb0JvZHkoY29uZmlnKTtcclxuXHJcbiAgICAgICAgdGhpcy5kaWFsb2dDb21wb25lbnRSZWYuaW5zdGFuY2UuY2hpbGRDb21wb25lbnRUeXBlID0gY29tcG9uZW50VHlwZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFwcGVuZERpYWxvZ0NvbXBvbmVudFRvQm9keShjb25maWc6IER5bmFtaWNEaWFsb2dDb25maWcpIHtcclxuICAgICAgICBjb25zdCBtYXAgPSBuZXcgV2Vha01hcCgpO1xyXG4gICAgICAgIG1hcC5zZXQoRHluYW1pY0RpYWxvZ0NvbmZpZywgY29uZmlnKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gbmV3IER5bmFtaWNEaWFsb2dSZWYoKTtcclxuICAgICAgICBtYXAuc2V0KER5bmFtaWNEaWFsb2dSZWYsIGRpYWxvZ1JlZik7XHJcblxyXG4gICAgICAgIGNvbnN0IHN1YiA9IGRpYWxvZ1JlZi5vbkNsb3NlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nQ29tcG9uZW50UmVmLmluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlc3Ryb3lTdWIgPSBkaWFsb2dSZWYub25EZXN0cm95LnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRGlhbG9nQ29tcG9uZW50RnJvbUJvZHkoKTtcclxuICAgICAgICAgICAgZGVzdHJveVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KER5bmFtaWNEaWFsb2dDb21wb25lbnQpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEeW5hbWljRGlhbG9nSW5qZWN0b3IodGhpcy5pbmplY3RvciwgbWFwKSk7XHJcblxyXG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuXHJcbiAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xyXG5cclxuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZiA9IGNvbXBvbmVudFJlZjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZURpYWxvZ0NvbXBvbmVudEZyb21Cb2R5KCkge1xyXG4gICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5kaWFsb2dDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgICAgIHRoaXMuZGlhbG9nQ29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgIH1cclxufVxyXG4iXX0=