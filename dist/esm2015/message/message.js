var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
let UIMessage = class UIMessage {
    constructor() {
        this.escape = true;
    }
    get icon() {
        let icon = null;
        if (this.severity) {
            switch (this.severity) {
                case 'success':
                    icon = 'pi pi-check';
                    break;
                case 'info':
                    icon = 'pi pi-info-circle';
                    break;
                case 'error':
                    icon = 'pi pi-times';
                    break;
                case 'warn':
                    icon = 'pi pi-exclamation-triangle';
                    break;
                default:
                    icon = 'pi pi-info-circle';
                    break;
            }
        }
        return icon;
    }
};
__decorate([
    Input()
], UIMessage.prototype, "severity", void 0);
__decorate([
    Input()
], UIMessage.prototype, "text", void 0);
__decorate([
    Input()
], UIMessage.prototype, "escape", void 0);
UIMessage = __decorate([
    Component({
        selector: 'p-message',
        template: `
        <div aria-live="polite" class="ui-message ui-widget ui-corner-all" *ngIf="severity"
        [ngClass]="{'ui-message-info': (severity === 'info'),
                'ui-message-warn': (severity === 'warn'),
                'ui-message-error': (severity === 'error'),
                'ui-message-success': (severity === 'success')}">
            <span class="ui-message-icon" [ngClass]="icon"></span>
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="ui-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="ui-message-text">{{text}}</span>
            </ng-template>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], UIMessage);
export { UIMessage };
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [UIMessage],
        declarations: [UIMessage]
    })
], MessageModule);
export { MessageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVzc2FnZS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQXFCN0MsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUF0QjtRQU1hLFdBQU0sR0FBWSxJQUFJLENBQUM7SUErQnBDLENBQUM7SUE3QkcsSUFBSSxJQUFJO1FBQ0osSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLFFBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsS0FBSyxTQUFTO29CQUNWLElBQUksR0FBRyxhQUFhLENBQUM7b0JBQ3pCLE1BQU07Z0JBRU4sS0FBSyxNQUFNO29CQUNQLElBQUksR0FBRyxtQkFBbUIsQ0FBQztvQkFDL0IsTUFBTTtnQkFFTixLQUFLLE9BQU87b0JBQ1IsSUFBSSxHQUFHLGFBQWEsQ0FBQztvQkFDekIsTUFBTTtnQkFFTixLQUFLLE1BQU07b0JBQ1AsSUFBSSxHQUFHLDRCQUE0QixDQUFDO29CQUN4QyxNQUFNO2dCQUVOO29CQUNJLElBQUksR0FBRyxtQkFBbUIsQ0FBQztvQkFDL0IsTUFBTTthQUNUO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTtBQW5DWTtJQUFSLEtBQUssRUFBRTsyQ0FBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7dUNBQWM7QUFFYjtJQUFSLEtBQUssRUFBRTt5Q0FBd0I7QUFOdkIsU0FBUztJQW5CckIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztLQWNUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87S0FDbkQsQ0FBQztHQUNXLFNBQVMsQ0FxQ3JCO1NBckNZLFNBQVM7QUE0Q3RCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FBSSxDQUFBO0FBQWpCLGFBQWE7SUFMekIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7S0FDNUIsQ0FBQztHQUNXLGFBQWEsQ0FBSTtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLW1lc3NhZ2UnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGNsYXNzPVwidWktbWVzc2FnZSB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiICpuZ0lmPVwic2V2ZXJpdHlcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cInsndWktbWVzc2FnZS1pbmZvJzogKHNldmVyaXR5ID09PSAnaW5mbycpLFxyXG4gICAgICAgICAgICAgICAgJ3VpLW1lc3NhZ2Utd2Fybic6IChzZXZlcml0eSA9PT0gJ3dhcm4nKSxcclxuICAgICAgICAgICAgICAgICd1aS1tZXNzYWdlLWVycm9yJzogKHNldmVyaXR5ID09PSAnZXJyb3InKSxcclxuICAgICAgICAgICAgICAgICd1aS1tZXNzYWdlLXN1Y2Nlc3MnOiAoc2V2ZXJpdHkgPT09ICdzdWNjZXNzJyl9XCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVzc2FnZS1pY29uXCIgW25nQ2xhc3NdPVwiaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFlc2NhcGU7IGVsc2UgZXNjYXBlT3V0XCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFlc2NhcGVcIiBjbGFzcz1cInVpLW1lc3NhZ2UtdGV4dFwiIFtpbm5lckhUTUxdPVwidGV4dFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZXNjYXBlT3V0PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJlc2NhcGVcIiBjbGFzcz1cInVpLW1lc3NhZ2UtdGV4dFwiPnt7dGV4dH19PC9zcGFuPlxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVUlNZXNzYWdlIHtcclxuXHJcbiAgICBASW5wdXQoKSBzZXZlcml0eTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBlc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGdldCBpY29uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGljb246IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldmVyaXR5KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLnNldmVyaXR5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdWNjZXNzJzpcclxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWNoZWNrJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2luZm8nOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktaW5mby1jaXJjbGUnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktdGltZXMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2Fybic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS1leGNsYW1hdGlvbi10cmlhbmdsZSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktaW5mby1jaXJjbGUnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpY29uO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbVUlNZXNzYWdlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1VJTWVzc2FnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VNb2R1bGUgeyB9XHJcbiJdfQ==