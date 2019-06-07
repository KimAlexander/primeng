var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, EventEmitter, Directive, Input, Output, ContentChildren, ContentChild, TemplateRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
var Header = /** @class */ (function () {
    function Header() {
    }
    Header = __decorate([
        Component({
            selector: 'p-header',
            template: '<ng-content></ng-content>'
        })
    ], Header);
    return Header;
}());
export { Header };
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer = __decorate([
        Component({
            selector: 'p-footer',
            template: '<ng-content></ng-content>'
        })
    ], Footer);
    return Footer;
}());
export { Footer };
var PrimeTemplate = /** @class */ (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        return this.name;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PrimeTemplate.prototype, "type", void 0);
    __decorate([
        Input('pTemplate'),
        __metadata("design:type", String)
    ], PrimeTemplate.prototype, "name", void 0);
    PrimeTemplate = __decorate([
        Directive({
            selector: '[pTemplate]',
            host: {}
        }),
        __metadata("design:paramtypes", [TemplateRef])
    ], PrimeTemplate);
    return PrimeTemplate;
}());
export { PrimeTemplate };
/* Deprecated */
var Column = /** @class */ (function () {
    function Column() {
        this.filterType = 'text';
        this.exportable = true;
        this.resizable = true;
        this.sortFunction = new EventEmitter();
    }
    Column.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'filter':
                    _this.filterTemplate = item.template;
                    break;
                case 'editor':
                    _this.editorTemplate = item.template;
                    break;
                default:
                    _this.bodyTemplate = item.template;
                    break;
            }
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "field", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "colId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "sortField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "footer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "sortable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "editable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "filter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterMatchMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "excludeGlobalFilter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Column.prototype, "rowspan", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Column.prototype, "colspan", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "scope", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "exportable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "headerStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "headerStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "bodyStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "bodyStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Column.prototype, "footerStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "footerStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "hidden", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "expander", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "selectionMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Column.prototype, "filterPlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], Column.prototype, "filterMaxlength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "frozen", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "resizable", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Column.prototype, "sortFunction", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], Column.prototype, "templates", void 0);
    __decorate([
        ContentChild(TemplateRef),
        __metadata("design:type", TemplateRef)
    ], Column.prototype, "template", void 0);
    Column = __decorate([
        Component({
            selector: 'p-column',
            template: ''
        })
    ], Column);
    return Column;
}());
export { Column };
/* Deprecated */
var Row = /** @class */ (function () {
    function Row() {
    }
    __decorate([
        ContentChildren(Column),
        __metadata("design:type", QueryList)
    ], Row.prototype, "columns", void 0);
    Row = __decorate([
        Component({
            selector: 'p-row',
            template: ""
        })
    ], Row);
    return Row;
}());
export { Row };
/* Deprecated */
var HeaderColumnGroup = /** @class */ (function () {
    function HeaderColumnGroup() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeaderColumnGroup.prototype, "frozen", void 0);
    __decorate([
        ContentChildren(Row),
        __metadata("design:type", QueryList)
    ], HeaderColumnGroup.prototype, "rows", void 0);
    HeaderColumnGroup = __decorate([
        Component({
            selector: 'p-headerColumnGroup',
            template: ""
        })
    ], HeaderColumnGroup);
    return HeaderColumnGroup;
}());
export { HeaderColumnGroup };
/* Deprecated */
var FooterColumnGroup = /** @class */ (function () {
    function FooterColumnGroup() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FooterColumnGroup.prototype, "frozen", void 0);
    __decorate([
        ContentChildren(Row),
        __metadata("design:type", QueryList)
    ], FooterColumnGroup.prototype, "rows", void 0);
    FooterColumnGroup = __decorate([
        Component({
            selector: 'p-footerColumnGroup',
            template: ""
        })
    ], FooterColumnGroup);
    return FooterColumnGroup;
}());
export { FooterColumnGroup };
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Header, Footer, Column, PrimeTemplate, Row, HeaderColumnGroup, FooterColumnGroup],
            declarations: [Header, Footer, Column, PrimeTemplate, Row, HeaderColumnGroup, FooterColumnGroup]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.js.map