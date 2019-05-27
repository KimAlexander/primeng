"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var treetable_1 = require("./treetable");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var scrolling_1 = require("@angular/cdk/scrolling");
var core_1 = require("@angular/core");
var TestTreeTableComponent = /** @class */ (function () {
    function TestTreeTableComponent() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
        this.files = [
            {
                "data": {
                    "name": "Applications",
                    "size": "200mb",
                    "type": "Folder"
                },
                "children": [
                    {
                        "data": {
                            "name": "Angular",
                            "size": "25mb",
                            "type": "Folder"
                        },
                        "children": [
                            {
                                "data": {
                                    "name": "angular.app",
                                    "size": "10mb",
                                    "type": "Application"
                                }
                            },
                            {
                                "data": {
                                    "name": "cli.app",
                                    "size": "10mb",
                                    "type": "Application"
                                }
                            },
                            {
                                "data": {
                                    "name": "mobile.app",
                                    "size": "5mb",
                                    "type": "Application"
                                }
                            }
                        ]
                    },
                    {
                        "data": {
                            "name": "editor.app",
                            "size": "25mb",
                            "type": "Application"
                        }
                    },
                    {
                        "data": {
                            "name": "settings.app",
                            "size": "50mb",
                            "type": "Application"
                        }
                    }
                ]
            },
            {
                "data": {
                    "name": "Cloud",
                    "size": "20mb",
                    "type": "Folder"
                },
                "children": [
                    {
                        "data": {
                            "name": "backup-1.zip",
                            "size": "10mb",
                            "type": "Zip"
                        }
                    },
                    {
                        "data": {
                            "name": "backup-2.zip",
                            "size": "10mb",
                            "type": "Zip"
                        }
                    }
                ]
            },
            {
                "data": {
                    "name": "Desktop",
                    "size": "150kb",
                    "type": "Folder"
                },
                "children": [
                    {
                        "data": {
                            "name": "note-meeting.txt",
                            "size": "50kb",
                            "type": "Text"
                        }
                    },
                    {
                        "data": {
                            "name": "note-todo.txt",
                            "size": "100kb",
                            "type": "Text"
                        }
                    }
                ]
            },
            {
                "data": {
                    "name": "Documents",
                    "size": "75kb",
                    "type": "Folder"
                },
                "children": [
                    {
                        "data": {
                            "name": "Work",
                            "size": "55kb",
                            "type": "Folder"
                        },
                        "children": [
                            {
                                "data": {
                                    "name": "Expenses.doc",
                                    "size": "30kb",
                                    "type": "Document"
                                }
                            },
                            {
                                "data": {
                                    "name": "Resume.doc",
                                    "size": "25kb",
                                    "type": "Resume"
                                }
                            }
                        ]
                    },
                    {
                        "data": {
                            "name": "Home",
                            "size": "20kb",
                            "type": "Folder"
                        },
                        "children": [
                            {
                                "data": {
                                    "name": "Invoices",
                                    "size": "20kb",
                                    "type": "Text"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "data": {
                    "name": "Downloads",
                    "size": "25mb",
                    "type": "Folder"
                },
                "children": [
                    {
                        "data": {
                            "name": "Spanish",
                            "size": "10mb",
                            "type": "Folder"
                        },
                        "children": [
                            {
                                "data": {
                                    "name": "tutorial-a1.txt",
                                    "size": "5mb",
                                    "type": "Text"
                                }
                            },
                            {
                                "data": {
                                    "name": "tutorial-a2.txt",
                                    "size": "5mb",
                                    "type": "Text"
                                }
                            }
                        ]
                    },
                    {
                        "data": {
                            "name": "Travel",
                            "size": "15mb",
                            "type": "Text"
                        },
                        "children": [
                            {
                                "data": {
                                    "name": "Hotel.pdf",
                                    "size": "10mb",
                                    "type": "PDF"
                                }
                            },
                            {
                                "data": {
                                    "name": "Flight.pdf",
                                    "size": "5mb",
                                    "type": "PDF"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "data": {
                    "name": "Main",
                    "size": "50mb",
                    "type": "Folder"
                },
                "children": [
                    {
                        "data": {
                            "name": "bin",
                            "size": "50kb",
                            "type": "Link"
                        }
                    },
                    {
                        "data": {
                            "name": "etc",
                            "size": "100kb",
                            "type": "Link"
                        }
                    },
                    {
                        "data": {
                            "name": "var",
                            "size": "100kb",
                            "type": "Link"
                        }
                    }
                ]
            },
            {
                "data": {
                    "name": "Other",
                    "size": "5mb",
                    "type": "Folder"
                },
                "children": [
                    {
                        "data": {
                            "name": "todo.txt",
                            "size": "3mb",
                            "type": "Text"
                        }
                    },
                    {
                        "data": {
                            "name": "logo.png",
                            "size": "2mb",
                            "type": "Picture"
                        }
                    }
                ]
            },
            {
                "data": {
                    "name": "Pictures",
                    "size": "150kb",
                    "type": "Folder"
                },
                "children": [
                    {
                        "data": {
                            "name": "barcelona.jpg",
                            "size": "90kb",
                            "type": "Picture"
                        }
                    },
                    {
                        "data": {
                            "name": "primeng.png",
                            "size": "30kb",
                            "type": "Picture"
                        }
                    },
                    {
                        "data": {
                            "name": "prime.jpg",
                            "size": "30kb",
                            "type": "Picture"
                        }
                    }
                ]
            },
            {
                "data": {
                    "name": "Videos",
                    "size": "1500mb",
                    "type": "Folder"
                },
                "children": [
                    {
                        "data": {
                            "name": "primefaces.mkv",
                            "size": "1000mb",
                            "type": "Video"
                        }
                    },
                    {
                        "data": {
                            "name": "intro.avi",
                            "size": "500mb",
                            "type": "Video"
                        }
                    }
                ]
            }
        ];
    }
    TestTreeTableComponent = __decorate([
        core_1.Component({
            template: "\n        <p-treeTable class=\"basicTreeTable\" [value]=\"files\" [columns]=\"cols\">\n            <ng-template pTemplate=\"caption\">\n                FileSystem\n            </ng-template>\n            <ng-template pTemplate=\"header\" let-columns>\n                <tr>\n                    <th *ngFor=\"let col of columns\">\n                        {{col.header}}\n                    </th>\n                </tr>\n            </ng-template>\n            <ng-template pTemplate=\"body\" let-rowNode let-rowData=\"rowData\" let-columns=\"columns\">\n                <tr [ttRow]=\"rowNode\">\n                    <td *ngFor=\"let col of columns; let i = index\">\n                        <p-treeTableToggler [rowNode]=\"rowNode\" *ngIf=\"i == 0\"></p-treeTableToggler>\n                        {{rowData[col.field]}}\n                    </td>\n                </tr>\n            </ng-template>\n            <ng-template pTemplate=\"footer\" let-columns>\n                <tr>\n                    <td *ngFor=\"let col of columns\">\n                        {{col.header}}\n                    </td>\n                </tr>\n            </ng-template>\n            <ng-template pTemplate=\"summary\">\n                Summary\n            </ng-template>\n        </p-treeTable>\n        <p-treeTable class=\"paginationTreeTable\" [value]=\"files\" [columns]=\"cols\" [paginator]=\"true\" [rows]=\"3\">\n            <ng-template pTemplate=\"header\" let-columns>\n                <tr>\n                    <th *ngFor=\"let col of columns\">\n                        {{col.header}}\n                    </th>\n                </tr>\n            </ng-template>\n            <ng-template pTemplate=\"body\" let-rowNode let-rowData=\"rowData\" let-columns=\"columns\">\n                <tr>\n                    <td *ngFor=\"let col of columns; let i = index\">\n                        <p-treeTableToggler [rowNode]=\"rowNode\" *ngIf=\"i == 0\"></p-treeTableToggler>\n                        {{rowData[col.field]}}\n                    </td>\n                </tr>\n            </ng-template>\n        </p-treeTable>\n"
        })
    ], TestTreeTableComponent);
    return TestTreeTableComponent;
}());
describe('TreeTable', function () {
    var basicTreetable;
    var paginationTreeTable;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                forms_1.FormsModule,
                scrolling_1.ScrollingModule,
                treetable_1.TreeTableModule
            ],
            declarations: [
                TestTreeTableComponent
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestTreeTableComponent);
        basicTreetable = fixture.debugElement.children[0].componentInstance;
        paginationTreeTable = fixture.debugElement.children[1].componentInstance;
    });
    it('should show 11 rows', function () {
        fixture.detectChanges();
        var basicTreeTableEl = fixture.debugElement.query(platform_browser_1.By.css(".basicTreeTable"));
        var rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        var toggleEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("p-treeTableToggler"));
        expect(rowEls.length).toEqual(11);
        expect(toggleEls.length).toEqual(9);
    });
    it('should expand first row', function () {
        fixture.detectChanges();
        var basicTreeTableEl = fixture.debugElement.query(platform_browser_1.By.css(".basicTreeTable"));
        var rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(rowEls.length).toEqual(11);
        var toggleEls = basicTreeTableEl.queryAll(platform_browser_1.By.css(".ui-treetable-toggler"));
        var firstToggleComp = toggleEls[0].componentInstance;
        var onClickSpy = spyOn(firstToggleComp, "onClick").and.callThrough();
        toggleEls[0].nativeElement.click();
        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(onClickSpy).toHaveBeenCalled();
        expect(rowEls.length).toEqual(14);
    });
    it('should expand and collapse first row', function () {
        fixture.detectChanges();
        var basicTreeTableEl = fixture.debugElement.query(platform_browser_1.By.css(".basicTreeTable"));
        var rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(rowEls.length).toEqual(11);
        var toggleEls = basicTreeTableEl.queryAll(platform_browser_1.By.css(".ui-treetable-toggler"));
        var firstToggleComp = toggleEls[0].componentInstance;
        var onClickSpy = spyOn(firstToggleComp, "onClick").and.callThrough();
        toggleEls[0].nativeElement.click();
        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(rowEls.length).toEqual(14);
        toggleEls = basicTreeTableEl.queryAll(platform_browser_1.By.css(".ui-treetable-toggler"));
        toggleEls[0].nativeElement.click();
        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(rowEls.length).toEqual(11);
    });
    it('should focus next row', function () {
        fixture.detectChanges();
        var basicTreeTableEl = fixture.debugElement.query(platform_browser_1.By.css(".basicTreeTable"));
        var rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.initEvent('keydown', true, true);
        rowEls[2].nativeElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(rowEls[3].nativeElement).toEqual(document.activeElement);
    });
    it('should focus previous row', function () {
        fixture.detectChanges();
        var basicTreeTableEl = fixture.debugElement.query(platform_browser_1.By.css(".basicTreeTable"));
        var rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 38;
        keydownEvent.initEvent('keydown', true, true);
        rowEls[3].nativeElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(rowEls[2].nativeElement).toEqual(document.activeElement);
    });
    it('should expand and collapse row with nav keys', function () {
        fixture.detectChanges();
        var basicTreeTableEl = fixture.debugElement.query(platform_browser_1.By.css(".basicTreeTable"));
        var rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(rowEls.length).toEqual(11);
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 39;
        keydownEvent.initEvent('keydown', true, true);
        rowEls[0].nativeElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(rowEls.length).toEqual(11);
        keydownEvent.which = 37;
        rowEls[0].nativeElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        rowEls = basicTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(rowEls.length).toEqual(11);
    });
    it('should create sections (caption footer summary)', function () {
        fixture.detectChanges();
        var basicTreeTableEl = fixture.debugElement.query(platform_browser_1.By.css(".basicTreeTable"));
        var captionEl = basicTreeTableEl.query(platform_browser_1.By.css(".ui-treetable-caption"));
        var summaryEl = basicTreeTableEl.query(platform_browser_1.By.css(".ui-treetable-summary"));
        var footerEl = basicTreeTableEl.query(platform_browser_1.By.css(".ui-treetable-tfoot"));
        expect(captionEl).toBeTruthy();
        expect(summaryEl).toBeTruthy();
        expect(footerEl).toBeTruthy();
    });
    it('should create paginator and 4 rows', function () {
        fixture.detectChanges();
        var paginationTreeTableEl = fixture.debugElement.query(platform_browser_1.By.css(".paginationTreeTable"));
        var rowEls = paginationTreeTableEl.queryAll(platform_browser_1.By.css("tr"));
        var paginatorEl = paginationTreeTableEl.query(platform_browser_1.By.css("p-paginator"));
        var pages = paginationTreeTableEl.queryAll(platform_browser_1.By.css(".ui-paginator-page"));
        expect(rowEls.length).toEqual(4);
        expect(paginatorEl).toBeTruthy();
        expect(pages.length).toEqual(3);
    });
    it('should change page', function () {
        fixture.detectChanges();
        var paginationTreeTableEl = fixture.debugElement.query(platform_browser_1.By.css(".paginationTreeTable"));
        var pages = paginationTreeTableEl.queryAll(platform_browser_1.By.css(".ui-paginator-page"));
        expect(paginationTreeTable.first).toEqual(0);
        var onPageChangeSpy = spyOn(paginationTreeTable, "onPageChange").and.callThrough();
        pages[1].nativeElement.click();
        fixture.detectChanges();
        expect(onPageChangeSpy).toHaveBeenCalled();
        expect(paginationTreeTable.first).toEqual(3);
    });
});
//# sourceMappingURL=treetable.spec.js.map