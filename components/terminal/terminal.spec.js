"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var terminal_1 = require("./terminal");
var animations_1 = require("@angular/platform-browser/animations");
var terminalservice_1 = require("./terminalservice");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var TestTerminalComponent = /** @class */ (function () {
    function TestTerminalComponent(terminalService) {
        var _this = this;
        this.terminalService = terminalService;
        this.terminalService.commandHandler.subscribe(function (command) {
            var response = (command === 'd') ? "Command succeed" : 'Unknown command: ' + command;
            _this.terminalService.sendResponse(response);
        });
    }
    TestTerminalComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TestTerminalComponent = __decorate([
        core_1.Component({
            template: "<p-terminal welcomeMessage=\"Welcome to PrimeNG\" prompt=\"primeng $\"></p-terminal>"
        }),
        __metadata("design:paramtypes", [terminalservice_1.TerminalService])
    ], TestTerminalComponent);
    return TestTerminalComponent;
}());
describe('Terminal', function () {
    var terminal;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                forms_1.FormsModule
            ],
            declarations: [
                terminal_1.Terminal,
                TestTerminalComponent
            ],
            providers: [terminalservice_1.TerminalService]
        });
        fixture = testing_1.TestBed.createComponent(TestTerminalComponent);
        terminal = fixture.debugElement.children[0].componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var terminalEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(terminalEl.nativeElement).toBeTruthy();
    });
    it('should handle command', function () {
        fixture.detectChanges();
        terminal.command = 'd';
        var event = { 'keyCode': 13 };
        terminal.handleCommand(event);
        fixture.detectChanges();
        expect(terminal.command).toEqual('');
        var commandEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-terminal-command'));
        var responseEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-terminal-content')).queryAll(platform_browser_1.By.css('div'))[1];
        expect(commandEl.nativeElement.textContent).toEqual('d');
        expect(responseEl.nativeElement.textContent).toEqual('Command succeed');
    });
    it('should not handle command', function () {
        fixture.detectChanges();
        terminal.command = 'dd';
        var event = { 'keyCode': 13 };
        terminal.handleCommand(event);
        fixture.detectChanges();
        expect(terminal.command).toEqual('');
        var commandEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-terminal-command'));
        var responseEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-terminal-content')).queryAll(platform_browser_1.By.css('div'))[1];
        expect(commandEl.nativeElement.textContent).toEqual('dd');
        expect(responseEl.nativeElement.textContent).toEqual('Unknown command: dd');
    });
});
//# sourceMappingURL=terminal.spec.js.map