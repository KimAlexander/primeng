var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ElementRef, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, Footer } from 'primeng/api';
let Card = class Card {
    constructor(el) {
        this.el = el;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
};
Card.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Card.prototype, "header", void 0);
__decorate([
    Input()
], Card.prototype, "subheader", void 0);
__decorate([
    Input()
], Card.prototype, "style", void 0);
__decorate([
    Input()
], Card.prototype, "styleClass", void 0);
__decorate([
    ContentChild(Header)
], Card.prototype, "headerFacet", void 0);
__decorate([
    ContentChild(Footer)
], Card.prototype, "footerFacet", void 0);
Card = __decorate([
    Component({
        selector: 'p-card',
        template: `
        <div [ngClass]="'ui-card ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-card-header" *ngIf="headerFacet">
               <ng-content select="p-header"></ng-content>
            </div>
            <div class="ui-card-body">
                <div class="ui-card-title" *ngIf="header">{{header}}</div>
                <div class="ui-card-subtitle" *ngIf="subheader">{{subheader}}</div>
                <div class="ui-card-content">
                    <ng-content></ng-content>
                </div>
                <div class="ui-card-footer" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Card);
export { Card };
let CardModule = class CardModule {
};
CardModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Card, SharedModule],
        declarations: [Card]
    })
], CardModule);
export { CardModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvY2FyZC8iLCJzb3VyY2VzIjpbImNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQXdCM0QsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSTtJQWNiLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUksQ0FBQztJQUV2QyxtQkFBbUI7UUFDZixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBRUosQ0FBQTs7WUFOMkIsVUFBVTs7QUFaekI7SUFBUixLQUFLLEVBQUU7b0NBQWdCO0FBRWY7SUFBUixLQUFLLEVBQUU7dUNBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFO21DQUFZO0FBRVg7SUFBUixLQUFLLEVBQUU7d0NBQW9CO0FBRU47SUFBckIsWUFBWSxDQUFDLE1BQU0sQ0FBQzt5Q0FBYTtBQUVaO0lBQXJCLFlBQVksQ0FBQyxNQUFNLENBQUM7eUNBQWE7QUFaekIsSUFBSTtJQXJCaEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFFBQVE7UUFDbEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87S0FDbkQsQ0FBQztHQUNXLElBQUksQ0FvQmhCO1NBcEJZLElBQUk7QUEyQmpCLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7Q0FBSSxDQUFBO0FBQWQsVUFBVTtJQUx0QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztRQUM3QixZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUM7S0FDdkIsQ0FBQztHQUNXLFVBQVUsQ0FBSTtTQUFkLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgQ29udGVudENoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUsIEhlYWRlciwgRm9vdGVyIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBCbG9ja2FibGVVSSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWNhcmQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS1jYXJkIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJ1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNhcmQtaGVhZGVyXCIgKm5nSWY9XCJoZWFkZXJGYWNldFwiPlxyXG4gICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jYXJkLXRpdGxlXCIgKm5nSWY9XCJoZWFkZXJcIj57e2hlYWRlcn19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2FyZC1zdWJ0aXRsZVwiICpuZ0lmPVwic3ViaGVhZGVyXCI+e3tzdWJoZWFkZXJ9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNhcmQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNhcmQtZm9vdGVyXCIgKm5nSWY9XCJmb290ZXJGYWNldFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FyZCBpbXBsZW1lbnRzIEJsb2NrYWJsZVVJIHtcclxuXHJcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBzdWJoZWFkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBAQ29udGVudENoaWxkKEhlYWRlcikgaGVhZGVyRmFjZXQ7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIpIGZvb3RlckZhY2V0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQgwqB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtDYXJkLCBTaGFyZWRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbQ2FyZF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENhcmRNb2R1bGUgeyB9XHJcbiJdfQ==