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
var tree_1 = require("./tree");
var animations_1 = require("@angular/platform-browser/animations");
var contextmenu_1 = require("../contextmenu/contextmenu");
var testing_2 = require("@angular/router/testing");
var core_1 = require("@angular/core");
var api_1 = require("../common/api");
var TestTreeComponent = /** @class */ (function () {
    function TestTreeComponent() {
    }
    TestTreeComponent.prototype.ngOnInit = function () {
        this.filesTree7 = [
            {
                "label": "Documents",
                "data": "Documents Folder",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [{
                        "label": "Work",
                        "data": "Work Folder",
                        "expandedIcon": "fa fa-folder-open",
                        "collapsedIcon": "fa fa-folder",
                        "children": [{ "label": "Expenses.doc", "icon": "fa fa-file-word-o", "data": "Expenses Document" }, { "label": "Resume.doc", "icon": "fa fa-file-word-o", "data": "Resume Document" }]
                    },
                    {
                        "label": "Home",
                        "data": "Home Folder",
                        "expandedIcon": "fa fa-folder-open",
                        "collapsedIcon": "fa fa-folder",
                        "children": [{ "label": "Invoices.txt", "icon": "fa fa-file-word-o", "data": "Invoices for this month" }]
                    }]
            },
            {
                "label": "Pictures",
                "data": "Pictures Folder",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [
                    { "label": "barcelona.jpg", "icon": "fa fa-file-image-o", "data": "Barcelona Photo" },
                    { "label": "logo.jpg", "icon": "fa fa-file-image-o", "data": "PrimeFaces Logo" },
                    { "label": "primeui.png", "icon": "fa fa-file-image-o", "data": "PrimeUI Logo" }
                ]
            },
            {
                "label": "Movies",
                "data": "Movies Folder",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [{
                        "label": "Al Pacino",
                        "data": "Pacino Movies",
                        "children": [{ "label": "Scarface", "icon": "fa fa-file-video-o", "data": "Scarface Movie" }, { "label": "Serpico", "icon": "fa fa-file-video-o", "data": "Serpico Movie" }]
                    },
                    {
                        "label": "Robert De Niro",
                        "data": "De Niro Movies",
                        "children": [{ "label": "Goodfellas", "icon": "fa fa-file-video-o", "data": "Goodfellas Movie" }, { "label": "Untouchables", "icon": "fa fa-file-video-o", "data": "Untouchables Movie" }]
                    }]
            }
        ];
        this.filesTree8 = [
            {
                label: "Backup",
                data: "Backup Folder",
                expandedIcon: "fa fa-folder-open",
                collapsedIcon: "fa fa-folder"
            }
        ];
        this.filesTree9 = [
            {
                label: "Storage",
                data: "Storage Folder",
                expandedIcon: "fa fa-folder-open",
                collapsedIcon: "fa fa-folder"
            }
        ];
        this.items = [
            { label: 'View', icon: 'fa fa-search' },
            { label: 'Unselect', icon: 'fa fa-close' }
        ];
    };
    __decorate([
        core_1.ViewChild('cm'),
        __metadata("design:type", core_1.ElementRef)
    ], TestTreeComponent.prototype, "cm", void 0);
    TestTreeComponent = __decorate([
        core_1.Component({
            template: "\n\t<p-tree></p-tree>\n\t<p-contextMenu #cm [model]=\"item\"></p-contextMenu>\n\t<p-tree [value]=\"filesTree7\" draggableNodes=\"true\" droppableNodes=\"true\" droppableScope=\"files\" draggableScope=\"server2\"></p-tree>\n\t<p-tree [value]=\"filesTree8\" draggableNodes=\"true\" droppableNodes=\"true\" droppableScope=\"server1\" draggableScope=\"files\"></p-tree>\n\t<p-tree [value]=\"filesTree9\" draggableNodes=\"true\" droppableNodes=\"true\" droppableScope=\"server2\" draggableScope=\"server1\"></p-tree>\n\t"
        })
    ], TestTreeComponent);
    return TestTreeComponent;
}());
describe('Tree', function () {
    var tree;
    var filesTree;
    var server1Tree;
    var server2Tree;
    var contextMenu;
    var testComponent;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                testing_2.RouterTestingModule.withRoutes([
                    { path: 'test', component: contextmenu_1.ContextMenu }
                ]),
            ],
            declarations: [
                tree_1.Tree,
                tree_1.UITreeNode,
                contextmenu_1.ContextMenu,
                contextmenu_1.ContextMenuSub,
                TestTreeComponent
            ],
            providers: [api_1.TreeDragDropService]
        });
        fixture = testing_1.TestBed.createComponent(TestTreeComponent);
        tree = fixture.debugElement.children[0].componentInstance;
        filesTree = fixture.debugElement.children[2].componentInstance;
        server1Tree = fixture.debugElement.children[3].componentInstance;
        server2Tree = fixture.debugElement.children[4].componentInstance;
        testComponent = fixture.componentInstance;
        contextMenu = fixture.debugElement.children[1].componentInstance;
        tree.value = [
            {
                "label": "Documents",
                "data": "Documents Folder",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [{
                        "label": "Work",
                        "data": "Work Folder",
                        "expandedIcon": "fa fa-folder-open",
                        "collapsedIcon": "fa fa-folder",
                        "children": [{ "label": "Expenses.doc", "icon": "fa fa-file-word-o", "data": "Expenses Document" }, { "label": "Resume.doc", "icon": "fa fa-file-word-o", "data": "Resume Document" }]
                    },
                    {
                        "label": "Home",
                        "data": "Home Folder",
                        "expandedIcon": "fa fa-folder-open",
                        "collapsedIcon": "fa fa-folder",
                        "children": [{ "label": "Invoices.txt", "icon": "fa fa-file-word-o", "data": "Invoices for this month" }]
                    }]
            },
            {
                "label": "Pictures",
                "data": "Pictures Folder",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [
                    { "label": "barcelona.jpg", "icon": "fa fa-file-image-o", "data": "Barcelona Photo" },
                    { "label": "logo.jpg", "icon": "fa fa-file-image-o", "data": "PrimeFaces Logo" },
                    { "label": "primeui.png", "icon": "fa fa-file-image-o", "data": "PrimeUI Logo" }
                ]
            },
            {
                "label": "Movies",
                "data": "Movies Folder",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [{
                        "label": "Al Pacino",
                        "data": "Pacino Movies",
                        "children": [{ "label": "Scarface", "icon": "fa fa-file-video-o", "data": "Scarface Movie" }, { "label": "Serpico", "icon": "fa fa-file-video-o", "data": "Serpico Movie" }]
                    },
                    {
                        "label": "Robert De Niro",
                        "data": "De Niro Movies",
                        "children": [{ "label": "Goodfellas", "icon": "fa fa-file-video-o", "data": "Goodfellas Movie" }, { "label": "Untouchables", "icon": "fa fa-file-video-o", "data": "Untouchables Movie" }]
                    }]
            }
        ];
    });
    it('should created', function () {
        fixture.detectChanges();
        var treeEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-tree'));
        expect(treeEl.nativeElement).toBeTruthy();
    });
    it('should call toggle and expand clicked row', function () {
        fixture.detectChanges();
        var toggleEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-tree-toggler'));
        var documentsToggleEl = toggleEls[0];
        var treeNodes = fixture.debugElement.queryAll(platform_browser_1.By.css("p-treeNode"));
        var documentsNode = treeNodes[0].componentInstance;
        var expandSpy = spyOn(documentsNode, "expand").and.callThrough();
        expect(documentsNode.node.expanded).toBeUndefined();
        documentsToggleEl.nativeElement.click();
        fixture.detectChanges();
        expect(documentsNode.node.expanded).toBeTruthy();
        expect(expandSpy).toHaveBeenCalled();
    });
    it('should call toggle and collapse clicked row', function () {
        fixture.detectChanges();
        var toggleEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-tree-toggler'));
        var documentsToggleEl = toggleEls[0];
        var treeNodes = fixture.debugElement.queryAll(platform_browser_1.By.css("p-treeNode"));
        var documentsNode = treeNodes[0].componentInstance;
        var collapseSpy = spyOn(documentsNode, "collapse").and.callThrough();
        expect(documentsNode.node.expanded).toBeUndefined();
        documentsToggleEl.nativeElement.click();
        fixture.detectChanges();
        documentsToggleEl.nativeElement.click();
        fixture.detectChanges();
        expect(documentsNode.node.expanded).toBeFalsy();
        expect(collapseSpy).toHaveBeenCalled();
    });
    it('should focused with nav keys', function () {
        fixture.detectChanges();
        var contentEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-treenode-content'));
        var firstEl = contentEls[0];
        var secondEl = contentEls[1];
        var thirdEl = contentEls[2];
        firstEl.triggerEventHandler('keydown', { 'which': 40, 'target': firstEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        var secondNode = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-treenode-content'))[1];
        var focusElement = document.activeElement;
        expect(focusElement).toEqual(secondNode.nativeElement);
        secondEl.triggerEventHandler('keydown', { 'which': 38, 'target': secondEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        var firstNode = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-treenode-content'))[0];
        focusElement = document.activeElement;
        expect(focusElement).toEqual(firstNode.nativeElement);
        firstEl.triggerEventHandler('keydown', { 'which': 38, 'target': firstEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        focusElement = document.activeElement;
        expect(focusElement).toEqual(firstNode.nativeElement);
        secondEl.triggerEventHandler('keydown', { 'which': 40, 'target': secondEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        thirdEl.triggerEventHandler('keydown', { 'which': 40, 'target': thirdEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        var thirdNode = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-treenode-content'))[2];
        focusElement = document.activeElement;
        expect(focusElement).toEqual(thirdNode.nativeElement);
    });
    it('should expand&collapse with right and left key', function () {
        fixture.detectChanges();
        var contentEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-treenode-content'));
        var treeNodes = fixture.debugElement.queryAll(platform_browser_1.By.css("p-treeNode"));
        var documentsNode = treeNodes[0].componentInstance;
        var firstEl = contentEls[0];
        firstEl.triggerEventHandler('keydown', { 'which': 39, 'target': firstEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        var firstElComponent = firstEl.componentInstance;
        expect(documentsNode.node.expanded).toBeTruthy();
        firstEl.triggerEventHandler('keydown', { 'which': 37, 'target': firstEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        expect(documentsNode.node.expanded).toBeFalsy();
        firstEl.triggerEventHandler('keydown', { 'which': 13, 'target': firstEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        expect(documentsNode.node.expanded).toBeFalsy();
        firstEl.triggerEventHandler('keydown', { 'which': 12, 'target': firstEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        expect(documentsNode.node.expanded).toBeFalsy();
    });
    it('should select single and unselect with metakey', function () {
        tree.selectionMode = 'single';
        fixture.detectChanges();
        var selectedNode;
        tree.selectionChange.subscribe(function (node) {
            selectedNode = node;
        });
        var contentEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-treenode-content"));
        var documentsContentEl = contentEls[0];
        var onNodeClickSpy = spyOn(tree, "onNodeClick").and.callThrough();
        documentsContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(onNodeClickSpy).toHaveBeenCalled();
        expect(selectedNode.label).toEqual("Documents");
        tree.selection = selectedNode;
        documentsContentEl.triggerEventHandler("click", { 'target': documentsContentEl, 'ctrlKey': true });
        fixture.detectChanges();
        expect(selectedNode).toBeNull();
    });
    it('should select single and unselect without metakey', function () {
        tree.selectionMode = 'single';
        tree.metaKeySelection = false;
        fixture.detectChanges();
        var contentEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-treenode-content"));
        var documentsContentEl = contentEls[0];
        var onNodeClickSpy = spyOn(tree, "onNodeClick").and.callThrough();
        documentsContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(onNodeClickSpy).toHaveBeenCalled();
        expect(tree.selection.label).toEqual("Documents");
        documentsContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(tree.selection).toBeNull();
    });
    it('should select multiple and unselect with metakey', function () {
        tree.selectionMode = 'multiple';
        fixture.detectChanges();
        var selectedNode;
        tree.selectionChange.subscribe(function (node) {
            selectedNode = node;
        });
        var contentEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-treenode-content"));
        var documentsContentEl = contentEls[0];
        var picturesContentEl = contentEls[1];
        var onNodeClickSpy = spyOn(tree, "onNodeClick").and.callThrough();
        documentsContentEl.nativeElement.click();
        fixture.detectChanges();
        picturesContentEl.triggerEventHandler("click", { 'target': picturesContentEl, 'ctrlKey': true });
        fixture.detectChanges();
        expect(onNodeClickSpy).toHaveBeenCalled();
        expect(selectedNode[0].label).toEqual("Documents");
        expect(selectedNode[1].label).toEqual("Pictures");
        picturesContentEl.triggerEventHandler("click", { 'target': picturesContentEl, 'ctrlKey': true });
        fixture.detectChanges();
        expect(selectedNode.length).toEqual(1);
        documentsContentEl.triggerEventHandler("click", { 'target': documentsContentEl, 'ctrlKey': true });
        fixture.detectChanges();
        expect(selectedNode).toEqual([]);
    });
    it('should select multiple and unselect without metakey', function () {
        tree.selectionMode = 'multiple';
        tree.metaKeySelection = false;
        fixture.detectChanges();
        var contentEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-treenode-content"));
        var documentsContentEl = contentEls[0];
        var picturesContentEl = contentEls[1];
        var onNodeClickSpy = spyOn(tree, "onNodeClick").and.callThrough();
        documentsContentEl.nativeElement.click();
        fixture.detectChanges();
        picturesContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(onNodeClickSpy).toHaveBeenCalled();
        expect(tree.selection[0].label).toEqual("Documents");
        expect(tree.selection[1].label).toEqual("Pictures");
        picturesContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(tree.selection.length).toEqual(1);
        documentsContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(tree.selection).toEqual([]);
    });
    it('should select with checkbox with propagateDown and propagateUp', function () {
        tree.selectionMode = 'checkbox';
        fixture.detectChanges();
        var toggleEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-tree-toggler'));
        var documentsToggleEl = toggleEls[0];
        documentsToggleEl.nativeElement.click();
        fixture.detectChanges();
        var contentEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-treenode-content"));
        var workContentEl = contentEls[1];
        var homeContentEl = contentEls[2];
        workContentEl.nativeElement.click();
        homeContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(tree.selection.length).toEqual(6);
        workContentEl.nativeElement.click();
        fixture.detectChanges();
        toggleEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-tree-toggler'));
        var workToggleEl = toggleEls[1];
        expect(tree.selection.length).toEqual(2);
        workToggleEl.nativeElement.click();
        fixture.detectChanges();
        contentEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-treenode-content"));
        var resumeContentEl = contentEls[3];
        var expensesContentEl = contentEls[2];
        resumeContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(tree.selection.length).toEqual(3);
        expensesContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(tree.selection.length).toEqual(6);
        expensesContentEl.nativeElement.click();
        resumeContentEl.nativeElement.click();
        fixture.detectChanges();
        expect(tree.selection.length).toEqual(2);
    });
    it('should select with second click and open the context menu', function () {
        tree.contextMenu = testComponent.cm;
        tree.selectionMode = 'single';
        fixture.detectChanges();
        var selectedNode;
        tree.selectionChange.subscribe(function (node) { selectedNode = node; });
        var contentEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-treenode-content"));
        var documentsContentEl = contentEls[0];
        var onNodeRightClickSpy = spyOn(tree, "onNodeRightClick").and.callThrough();
        var showSpy = spyOn(contextMenu, "show").and.callThrough();
        documentsContentEl.triggerEventHandler('contextmenu', { target: documentsContentEl.nativeElement, preventDefault: function () { } });
        fixture.detectChanges();
        expect(onNodeRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(selectedNode.label).toEqual("Documents");
    });
    it('should be filtered', function () {
        tree.filter = true;
        fixture.detectChanges();
        var filterInput = fixture.debugElement.query(platform_browser_1.By.css('.ui-tree-filter'));
        var onFilterSpy = spyOn(tree, "onFilter").and.callThrough();
        expect(filterInput).toBeTruthy();
        filterInput.triggerEventHandler("input", { target: { value: 'd' } });
        fixture.detectChanges();
        expect(onFilterSpy).toHaveBeenCalled();
        expect(tree.filteredNodes).toBeTruthy();
        expect(tree.filteredNodes.length).toEqual(2);
    });
    it('should drop item from files to server2', function () {
        fixture.detectChanges();
        var fileTreeContentEls = fixture.debugElement.children[2].queryAll(platform_browser_1.By.css('.ui-treenode-content'));
        expect(fileTreeContentEls.length).toEqual(3);
        var documentsContentEl = fileTreeContentEls[0];
        var onDragStartSpy = spyOn(documentsContentEl.componentInstance, "onDragStart").and.callThrough();
        var startDragSpy = spyOn(filesTree.dragDropService, "startDrag").and.callThrough();
        documentsContentEl.triggerEventHandler("dragstart", { dataTransfer: new DataTransfer });
        fixture.detectChanges();
        expect(onDragStartSpy).toHaveBeenCalled();
        expect(startDragSpy).toHaveBeenCalled();
        expect(documentsContentEl.componentInstance).toEqual(filesTree.dragNodeTree);
        expect(filesTree.dragNode.label).toEqual("Documents");
        expect(filesTree.dragNodeIndex).toEqual(0);
        var picturesContentEl = fileTreeContentEls[1];
        picturesContentEl.triggerEventHandler("dragenter", { dataTransfer: new DataTransfer });
        picturesContentEl.triggerEventHandler("dragleave", { currentTarget: picturesContentEl.nativeElement });
        var fileTreeEl = fixture.debugElement.children[2].query(platform_browser_1.By.css('div'));
        var server2TreeEl = fixture.debugElement.children[4].query(platform_browser_1.By.css('div'));
        var onDragLeaveSpy = spyOn(filesTree, "onDragLeave").and.callThrough();
        var onDragEnterSpy = spyOn(server2Tree, "onDragEnter").and.callThrough();
        fileTreeEl.triggerEventHandler("dragleave", { currentTarget: fileTreeEl.nativeElement });
        expect(onDragLeaveSpy).toHaveBeenCalled();
        server2TreeEl.triggerEventHandler("dragenter", { dataTransfer: new DataTransfer });
        expect(onDragEnterSpy).toHaveBeenCalled();
        var server2DropPoints = server2TreeEl.queryAll(platform_browser_1.By.css('.ui-treenode-droppoint'));
        var serverContentEl = server2TreeEl.query(platform_browser_1.By.css('.ui-treenode-content'));
        expect(server2DropPoints.length).toEqual(2);
        server2DropPoints[0].triggerEventHandler("dragenter", { dataTransfer: new DataTransfer });
        server2DropPoints[0].triggerEventHandler("dragleave", { currentTarget: fileTreeEl.nativeElement });
        serverContentEl.triggerEventHandler("dragenter", { dataTransfer: new DataTransfer });
        serverContentEl.triggerEventHandler("dragleave", { currentTarget: fileTreeEl.nativeElement });
        server2DropPoints[1].triggerEventHandler("dragenter", { dataTransfer: new DataTransfer });
        var dropEvent;
        server2Tree.onNodeDrop.subscribe(function (event) { dropEvent = event; });
        server2DropPoints[1].triggerEventHandler("drop", { preventDefault: function () { } });
        fixture.detectChanges();
        fileTreeContentEls = fixture.debugElement.children[2].queryAll(platform_browser_1.By.css('.ui-treenode-content'));
        expect(fileTreeContentEls.length).toEqual(2);
        expect(dropEvent.dragNode.label).toEqual("Documents");
        expect(dropEvent.dropNode.label).toEqual("Storage");
        expect(dropEvent.dropIndex).toEqual(0);
    });
});
//# sourceMappingURL=tree.spec.js.map