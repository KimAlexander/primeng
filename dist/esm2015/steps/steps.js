var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
let Steps = class Steps {
    constructor() {
        this.activeIndex = 0;
        this.readonly = true;
        this.activeIndexChange = new EventEmitter();
    }
    itemClick(event, item, i) {
        if (this.readonly || item.disabled) {
            event.preventDefault();
            return;
        }
        this.activeIndexChange.emit(i);
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item,
                index: i
            });
        }
    }
};
__decorate([
    Input()
], Steps.prototype, "activeIndex", void 0);
__decorate([
    Input()
], Steps.prototype, "model", void 0);
__decorate([
    Input()
], Steps.prototype, "readonly", void 0);
__decorate([
    Input()
], Steps.prototype, "style", void 0);
__decorate([
    Input()
], Steps.prototype, "styleClass", void 0);
__decorate([
    Output()
], Steps.prototype, "activeIndexChange", void 0);
Steps = __decorate([
    Component({
        selector: 'p-steps',
        template: `
        <div [ngClass]="{'ui-steps ui-widget ui-helper-clearfix':true,'ui-steps-readonly':readonly}" [ngStyle]="style" [class]="styleClass">
            <ul role="tablist">
                <li *ngFor="let item of model; let i = index" class="ui-steps-item" #menuitem [ngStyle]="item.style" [class]="item.styleClass" role="tab" [attr.aria-selected]="i === activeIndex" [attr.aria-expanded]="i === activeIndex"
                    [ngClass]="{'ui-state-highlight ui-steps-current':(i === activeIndex),
                        'ui-state-default':(i !== activeIndex),
                        'ui-state-complete':(i < activeIndex),
                        'ui-state-disabled ui-steps-incomplete':item.disabled||(i !== activeIndex && readonly)}">
                    <a *ngIf="!item.routerLink" [attr.href]="item.url" class="ui-menuitem-link" role="presentation" (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" 
                        [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                        <span class="ui-steps-number">{{i + 1}}</span>
                        <span class="ui-steps-title">{{item.label}}</span>
                    </a>
                    <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" role="presentation" [routerLinkActive]="'ui-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link" 
                        (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                        <span class="ui-steps-number">{{i + 1}}</span>
                        <span class="ui-steps-title">{{item.label}}</span>
                    </a>
                </li>
            </ul>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Steps);
export { Steps };
let StepsModule = class StepsModule {
};
StepsModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [Steps, RouterModule],
        declarations: [Steps]
    })
], StepsModule);
export { StepsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3N0ZXBzLyIsInNvdXJjZXMiOlsic3RlcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQTZCN0MsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBSztJQUFsQjtRQUVhLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBSXhCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFNekIsc0JBQWlCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF1QnhFLENBQUM7SUFyQkcsU0FBUyxDQUFDLEtBQVksRUFBRSxJQUFjLEVBQUUsQ0FBUztRQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLElBQUksRUFBRSxJQUFJO2dCQUNWLEtBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBRUosQ0FBQTtBQWpDWTtJQUFSLEtBQUssRUFBRTswQ0FBeUI7QUFFeEI7SUFBUixLQUFLLEVBQUU7b0NBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFO3VDQUEyQjtBQUUxQjtJQUFSLEtBQUssRUFBRTtvQ0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFO3lDQUFvQjtBQUVsQjtJQUFULE1BQU0sRUFBRTtnREFBMkQ7QUFaM0QsS0FBSztJQTNCakIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFNBQVM7UUFDbkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0JUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87S0FDbkQsQ0FBQztHQUNXLEtBQUssQ0FtQ2pCO1NBbkNZLEtBQUs7QUEwQ2xCLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7Q0FBSSxDQUFBO0FBQWYsV0FBVztJQUx2QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1FBQ3BDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBQyxZQUFZLENBQUM7UUFDN0IsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDO0tBQ3hCLENBQUM7R0FDVyxXQUFXLENBQUk7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Atc3RlcHMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktc3RlcHMgdWktd2lkZ2V0IHVpLWhlbHBlci1jbGVhcmZpeCc6dHJ1ZSwndWktc3RlcHMtcmVhZG9ubHknOnJlYWRvbmx5fVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPHVsIHJvbGU9XCJ0YWJsaXN0XCI+XHJcbiAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWw7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cInVpLXN0ZXBzLWl0ZW1cIiAjbWVudWl0ZW0gW25nU3R5bGVdPVwiaXRlbS5zdHlsZVwiIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIiByb2xlPVwidGFiXCIgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpID09PSBhY3RpdmVJbmRleFwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaSA9PT0gYWN0aXZlSW5kZXhcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtaGlnaGxpZ2h0IHVpLXN0ZXBzLWN1cnJlbnQnOihpID09PSBhY3RpdmVJbmRleCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1zdGF0ZS1kZWZhdWx0JzooaSAhPT0gYWN0aXZlSW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc3RhdGUtY29tcGxldGUnOihpIDwgYWN0aXZlSW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQgdWktc3RlcHMtaW5jb21wbGV0ZSc6aXRlbS5kaXNhYmxlZHx8KGkgIT09IGFjdGl2ZUluZGV4ICYmIHJlYWRvbmx5KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFpdGVtLnJvdXRlckxpbmtcIiBbYXR0ci5ocmVmXT1cIml0ZW0udXJsXCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBpKVwiIChrZXlkb3duLmVudGVyKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0sIGkpXCIgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJpdGVtLmRpc2FibGVkfHwoaSAhPT0gYWN0aXZlSW5kZXggJiYgcmVhZG9ubHkpID8gbnVsbCA6IChpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICcwJylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdGVwcy1udW1iZXJcIj57e2kgKyAxfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3RlcHMtdGl0bGVcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJpdGVtLnJvdXRlckxpbmtcIiBbcm91dGVyTGlua109XCJpdGVtLnJvdXRlckxpbmtcIiBbcXVlcnlQYXJhbXNdPVwiaXRlbS5xdWVyeVBhcmFtc1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmtcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0sIGkpXCIgKGtleWRvd24uZW50ZXIpPVwiaXRlbUNsaWNrKCRldmVudCwgaXRlbSwgaSlcIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZHx8KGkgIT09IGFjdGl2ZUluZGV4ICYmIHJlYWRvbmx5KSA/IG51bGwgOiAoaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCcpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdGVwcy1udW1iZXJcIj57e2kgKyAxfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3RlcHMtdGl0bGVcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RlcHMge1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuID0gIHRydWU7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcbiAgICAgICAgXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIGl0ZW1DbGljayhldmVudDogRXZlbnQsIGl0ZW06IE1lbnVJdGVtLCBpOiBudW1iZXIpwqB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgaXRlbS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChpKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGlmICghaXRlbS51cmwpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJvdXRlck1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbU3RlcHMsUm91dGVyTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1N0ZXBzXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RlcHNNb2R1bGUgeyB9Il19