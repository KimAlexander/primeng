var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UITreeNode_1;
import { NgModule, Component, Input, AfterContentInit, OnDestroy, Output, EventEmitter, OnInit, ContentChildren, QueryList, TemplateRef, Inject, ElementRef, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import { TreeDragDropService } from 'primeng/api';
import { ObjectUtils } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';
let UITreeNode = UITreeNode_1 = class UITreeNode {
    constructor(tree) {
        this.tree = tree;
    }
    ngOnInit() {
        this.node.parent = this.parentNode;
        if (this.parentNode) {
            this.tree.syncNodeOption(this.node, this.tree.value, 'parent', this.tree.getNodeWithKey(this.parentNode.key, this.tree.value));
        }
    }
    getIcon() {
        let icon;
        if (this.node.icon)
            icon = this.node.icon;
        else
            icon = this.node.expanded && this.node.children && this.node.children.length ? this.node.expandedIcon : this.node.collapsedIcon;
        return UITreeNode_1.ICON_CLASS + ' ' + icon;
    }
    isLeaf() {
        return this.tree.isNodeLeaf(this.node);
    }
    toggle(event) {
        if (this.node.expanded)
            this.collapse(event);
        else
            this.expand(event);
    }
    expand(event) {
        this.node.expanded = true;
        this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
    }
    collapse(event) {
        this.node.expanded = false;
        this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
    }
    onNodeClick(event) {
        this.tree.onNodeClick(event, this.node);
    }
    onNodeKeydown(event) {
        if (event.which === 13) {
            this.tree.onNodeClick(event, this.node);
        }
    }
    onNodeTouchEnd() {
        this.tree.onNodeTouchEnd();
    }
    onNodeRightClick(event) {
        this.tree.onNodeRightClick(event, this.node);
    }
    isSelected() {
        return this.tree.isSelected(this.node);
    }
    onDropPoint(event, position) {
        event.preventDefault();
        let dragNode = this.tree.dragNode;
        let dragNodeIndex = this.tree.dragNodeIndex;
        let dragNodeScope = this.tree.dragNodeScope;
        let isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? (position === 1 || dragNodeIndex !== this.index - 1) : true;
        if (this.tree.allowDrop(dragNode, this.node, dragNodeScope) && isValidDropPointIndex) {
            if (this.tree.validateDrop) {
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    dropIndex: this.index,
                    accept: () => {
                        this.processPointDrop(dragNode, dragNodeIndex, position);
                    }
                });
            }
            else {
                this.processPointDrop(dragNode, dragNodeIndex, position);
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    dropIndex: this.index
                });
            }
        }
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    processPointDrop(dragNode, dragNodeIndex, position) {
        let newNodeList = this.node.parent ? this.node.parent.children : this.tree.value;
        this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
        let dropIndex = this.index;
        if (position < 0) {
            dropIndex = (this.tree.dragNodeSubNodes === newNodeList) ? ((this.tree.dragNodeIndex > this.index) ? this.index : this.index - 1) : this.index;
            newNodeList.splice(dropIndex, 0, dragNode);
        }
        else {
            dropIndex = newNodeList.length;
            newNodeList.push(dragNode);
        }
        this.tree.dragDropService.stopDrag({
            node: dragNode,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: dragNodeIndex
        });
    }
    onDropPointDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }
    onDropPointDragEnter(event, position) {
        if (this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            if (position < 0)
                this.draghoverPrev = true;
            else
                this.draghoverNext = true;
        }
    }
    onDropPointDragLeave(event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    onDragStart(event) {
        if (this.tree.draggableNodes && this.node.draggable !== false) {
            event.dataTransfer.setData("text", "data");
            this.tree.dragDropService.startDrag({
                tree: this,
                node: this.node,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: this.index,
                scope: this.tree.draggableScope
            });
        }
        else {
            event.preventDefault();
        }
    }
    onDragStop(event) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    }
    onDropNodeDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        if (this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    onDropNode(event) {
        if (this.tree.droppableNodes && this.node.droppable !== false) {
            event.preventDefault();
            event.stopPropagation();
            let dragNode = this.tree.dragNode;
            if (this.tree.allowDrop(dragNode, this.node, this.tree.dragNodeScope)) {
                if (this.tree.validateDrop) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        index: this.index,
                        accept: () => {
                            this.processNodeDrop(dragNode);
                        }
                    });
                }
                else {
                    this.processNodeDrop(dragNode);
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        index: this.index
                    });
                }
            }
        }
        this.draghoverNode = false;
    }
    processNodeDrop(dragNode) {
        let dragNodeIndex = this.tree.dragNodeIndex;
        this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
        if (this.node.children)
            this.node.children.push(dragNode);
        else
            this.node.children = [dragNode];
        this.tree.dragDropService.stopDrag({
            node: dragNode,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.tree.dragNodeIndex
        });
    }
    onDropNodeDragEnter(event) {
        if (this.tree.droppableNodes && this.node.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    }
    onDropNodeDragLeave(event) {
        if (this.tree.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
                this.draghoverNode = false;
            }
        }
    }
    onKeyDown(event) {
        const nodeElement = event.target.parentElement.parentElement;
        if (nodeElement.nodeName !== 'P-TREENODE') {
            return;
        }
        switch (event.which) {
            //down arrow
            case 40:
                const listElement = (this.tree.droppableNodes) ? nodeElement.children[1].children[1] : nodeElement.children[0].children[1];
                if (listElement && listElement.children.length > 0) {
                    this.focusNode(listElement.children[0]);
                }
                else {
                    const nextNodeElement = nodeElement.nextElementSibling;
                    if (nextNodeElement) {
                        this.focusNode(nextNodeElement);
                    }
                    else {
                        let nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);
                        if (nextSiblingAncestor) {
                            this.focusNode(nextSiblingAncestor);
                        }
                    }
                }
                event.preventDefault();
                break;
            //up arrow
            case 38:
                if (nodeElement.previousElementSibling) {
                    this.focusNode(this.findLastVisibleDescendant(nodeElement.previousElementSibling));
                }
                else {
                    let parentNodeElement = this.getParentNodeElement(nodeElement);
                    if (parentNodeElement) {
                        this.focusNode(parentNodeElement);
                    }
                }
                event.preventDefault();
                break;
            //right arrow
            case 39:
                if (!this.node.expanded) {
                    this.expand(event);
                }
                event.preventDefault();
                break;
            //left arrow
            case 37:
                if (this.node.expanded) {
                    this.collapse(event);
                }
                else {
                    let parentNodeElement = this.getParentNodeElement(nodeElement);
                    if (parentNodeElement) {
                        this.focusNode(parentNodeElement);
                    }
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.tree.onNodeClick(event, this.node);
                event.preventDefault();
                break;
            default:
                //no op
                break;
        }
    }
    findNextSiblingOfAncestor(nodeElement) {
        let parentNodeElement = this.getParentNodeElement(nodeElement);
        if (parentNodeElement) {
            if (parentNodeElement.nextElementSibling)
                return parentNodeElement.nextElementSibling;
            else
                return this.findNextSiblingOfAncestor(parentNodeElement);
        }
        else {
            return null;
        }
    }
    findLastVisibleDescendant(nodeElement) {
        const childrenListElement = nodeElement.children[0].children[1];
        if (childrenListElement && childrenListElement.children.length > 0) {
            const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
            return this.findLastVisibleDescendant(lastChildElement);
        }
        else {
            return nodeElement;
        }
    }
    getParentNodeElement(nodeElement) {
        const parentNodeElement = nodeElement.parentElement.parentElement.parentElement;
        return parentNodeElement.tagName === 'P-TREENODE' ? parentNodeElement : null;
    }
    focusNode(element) {
        if (this.tree.droppableNodes)
            element.children[1].children[0].focus();
        else
            element.children[0].children[0].focus();
    }
};
UITreeNode.ICON_CLASS = 'ui-treenode-icon ';
UITreeNode.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => Tree),] }] }
];
__decorate([
    Input()
], UITreeNode.prototype, "node", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "parentNode", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "root", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "index", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "firstChild", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "lastChild", void 0);
UITreeNode = UITreeNode_1 = __decorate([
    Component({
        selector: 'p-treeNode',
        template: `
        <ng-template [ngIf]="node">
            <li *ngIf="tree.droppableNodes" class="ui-treenode-droppoint" [ngClass]="{'ui-treenode-droppoint-active ui-state-highlight':draghoverPrev}"
            (drop)="onDropPoint($event,-1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,-1)" (dragleave)="onDropPointDragLeave($event)"></li>
            <li *ngIf="!tree.horizontal" role="treeitem" [ngClass]="['ui-treenode',node.styleClass||'', isLeaf() ? 'ui-treenode-leaf': '']">
                <div class="ui-treenode-content" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)" (touchend)="onNodeTouchEnd()"
                    (drop)="onDropNode($event)" (dragover)="onDropNodeDragOver($event)" (dragenter)="onDropNodeDragEnter($event)" (dragleave)="onDropNodeDragLeave($event)"
                    [draggable]="tree.draggableNodes" (dragstart)="onDragStart($event)" (dragend)="onDragStop($event)" [attr.tabindex]="0"
                    [ngClass]="{'ui-treenode-selectable':tree.selectionMode && node.selectable !== false,'ui-treenode-dragover':draghoverNode, 'ui-treenode-content-selected':isSelected()}"
                    (keydown)="onKeyDown($event)" [attr.aria-posinset]="this.index + 1" [attr.aria-expanded]="this.node.expanded" [attr.aria-selected]="isSelected()" [attr.aria-label]="node.label">
                    <span class="ui-tree-toggler pi pi-fw ui-unselectable-text" [ngClass]="{'pi-caret-right':!node.expanded,'pi-caret-down':node.expanded}"
                            (click)="toggle($event)"></span
                    ><div class="ui-chkbox" *ngIf="tree.selectionMode == 'checkbox'" [attr.aria-checked]="isSelected()"><div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-disabled': node.selectable === false}">
                        <span class="ui-chkbox-icon ui-clickable pi"
                            [ngClass]="{'pi-check':isSelected(),'pi-minus':node.partialSelected}"></span></div></div
                    ><span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                    ><span class="ui-treenode-label ui-corner-all"
                        [ngClass]="{'ui-state-highlight':isSelected()}">
                            <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                            <span *ngIf="tree.getTemplateForNode(node)">
                                <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                            </span>
                    </span>
                </div>
                <ul class="ui-treenode-children" style="display: none;" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'block' : 'none'" role="group">
                    <p-treeNode *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last; let index=index; trackBy: tree.nodeTrackBy" [node]="childNode" [parentNode]="node"
                        [firstChild]="firstChild" [lastChild]="lastChild" [index]="index"></p-treeNode>
                </ul>
            </li>
            <li *ngIf="tree.droppableNodes&&lastChild" class="ui-treenode-droppoint" [ngClass]="{'ui-treenode-droppoint-active ui-state-highlight':draghoverNext}"
            (drop)="onDropPoint($event,1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,1)" (dragleave)="onDropPointDragLeave($event)"></li>
            <table *ngIf="tree.horizontal" [class]="node.styleClass">
                <tbody>
                    <tr>
                        <td class="ui-treenode-connector" *ngIf="!root">
                            <table class="ui-treenode-connector-table">
                                <tbody>
                                    <tr>
                                        <td [ngClass]="{'ui-treenode-connector-line':!firstChild}"></td>
                                    </tr>
                                    <tr>
                                        <td [ngClass]="{'ui-treenode-connector-line':!lastChild}"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="ui-treenode" [ngClass]="{'ui-treenode-collapsed':!node.expanded}">
                            <div class="ui-treenode-content ui-state-default ui-corner-all" tabindex="0"
                                [ngClass]="{'ui-treenode-selectable':tree.selectionMode,'ui-state-highlight':isSelected()}" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)"
                                (touchend)="onNodeTouchEnd()" (keydown)="onNodeKeydown($event)">
                                <span class="ui-tree-toggler pi pi-fw ui-unselectable-text" [ngClass]="{'pi-plus':!node.expanded,'pi-minus':node.expanded}" *ngIf="!isLeaf()"
                                        (click)="toggle($event)"></span
                                ><span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                                ><span class="ui-treenode-label ui-corner-all">
                                        <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                                        <span *ngIf="tree.getTemplateForNode(node)">
                                        <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                                        </span>
                                </span>
                            </div>
                        </td>
                        <td class="ui-treenode-children-container" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'table-cell' : 'none'">
                            <div class="ui-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last; trackBy: tree.nodeTrackBy" [node]="childNode"
                                        [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `
    }),
    __param(0, Inject(forwardRef(() => Tree)))
], UITreeNode);
export { UITreeNode };
let Tree = class Tree {
    constructor(el, dragDropService) {
        this.el = el;
        this.dragDropService = dragDropService;
        this.selectionChange = new EventEmitter();
        this.onNodeSelect = new EventEmitter();
        this.onNodeUnselect = new EventEmitter();
        this.onNodeExpand = new EventEmitter();
        this.onNodeCollapse = new EventEmitter();
        this.onNodeContextMenuSelect = new EventEmitter();
        this.onNodeDrop = new EventEmitter();
        this.layout = 'vertical';
        this.metaKeySelection = true;
        this.propagateSelectionUp = true;
        this.propagateSelectionDown = true;
        this.loadingIcon = 'pi pi-spinner';
        this.emptyMessage = 'No records found';
        this.filterBy = 'label';
        this.filterMode = 'lenient';
        this.nodeTrackBy = (index, item) => item;
    }
    ngOnInit() {
        if (this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe(event => {
                this.dragNodeTree = event.tree;
                this.dragNode = event.node;
                this.dragNodeSubNodes = event.subNodes;
                this.dragNodeIndex = event.index;
                this.dragNodeScope = event.scope;
            });
            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe(event => {
                this.dragNodeTree = null;
                this.dragNode = null;
                this.dragNodeSubNodes = null;
                this.dragNodeIndex = null;
                this.dragNodeScope = null;
                this.dragHover = false;
            });
        }
    }
    get horizontal() {
        return this.layout == 'horizontal';
    }
    ngAfterContentInit() {
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach((item) => {
            this.templateMap[item.name] = item.template;
        });
    }
    onNodeClick(event, node) {
        let eventTarget = event.target;
        if (DomHandler.hasClass(eventTarget, 'ui-tree-toggler')) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }
            if (this.hasFilteredNodes()) {
                node = this.getNodeWithKey(node.key, this.value);
                if (!node) {
                    return;
                }
            }
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, false);
                    else
                        this.selection = this.selection.filter((val, i) => i != index);
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, false);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, true);
                    else
                        this.selection = [...this.selection || [], node];
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else {
                let metaSelection = this.nodeTouched ? false : this.metaKeySelection;
                if (metaSelection) {
                    let metaKey = (event.metaKey || event.ctrlKey);
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        }
                        else {
                            this.selection = this.selection.filter((val, i) => i != index);
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(node);
                        }
                        else if (this.isMultipleSelectionMode()) {
                            this.selection = (!metaKey) ? [] : this.selection || [];
                            this.selection = [...this.selection, node];
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = node;
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    else {
                        if (selected) {
                            this.selection = this.selection.filter((val, i) => i != index);
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = [...this.selection || [], node];
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    this.selectionChange.emit(this.selection);
                }
            }
        }
        this.nodeTouched = false;
    }
    onNodeTouchEnd() {
        this.nodeTouched = true;
    }
    onNodeRightClick(event, node) {
        if (this.contextMenu) {
            let eventTarget = event.target;
            if (eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
                return;
            }
            else {
                let index = this.findIndexInSelection(node);
                let selected = (index >= 0);
                if (!selected) {
                    if (this.isSingleSelectionMode())
                        this.selectionChange.emit(node);
                    else
                        this.selectionChange.emit([node]);
                }
                this.contextMenu.show(event);
                this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
            }
        }
    }
    findIndexInSelection(node) {
        let index = -1;
        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                let areNodesEqual = (this.selection.key && this.selection.key === node.key) || this.selection == node;
                index = areNodesEqual ? 0 : -1;
            }
            else {
                for (let i = 0; i < this.selection.length; i++) {
                    let selectedNode = this.selection[i];
                    let areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    }
    syncNodeOption(node, parentNodes, option, value) {
        // to synchronize the node option between the filtered nodes and the original nodes(this.value)
        const _node = this.hasFilteredNodes() ? this.getNodeWithKey(node.key, parentNodes) : null;
        if (_node) {
            _node[option] = value || node[option];
        }
    }
    hasFilteredNodes() {
        return this.filter && this.filteredNodes && this.filteredNodes.length;
    }
    getNodeWithKey(key, nodes) {
        for (let node of nodes) {
            if (node.key === key) {
                return node;
            }
            if (node.children) {
                let matchedNode = this.getNodeWithKey(key, node.children);
                if (matchedNode) {
                    return matchedNode;
                }
            }
        }
    }
    propagateUp(node, select) {
        if (node.children && node.children.length) {
            let selectedCount = 0;
            let childPartialSelected = false;
            for (let child of node.children) {
                if (this.isSelected(child)) {
                    selectedCount++;
                }
                else if (child.partialSelected) {
                    childPartialSelected = true;
                }
            }
            if (select && selectedCount == node.children.length) {
                this.selection = [...this.selection || [], node];
                node.partialSelected = false;
            }
            else {
                if (!select) {
                    let index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this.selection = this.selection.filter((val, i) => i != index);
                    }
                }
                if (childPartialSelected || selectedCount > 0 && selectedCount != node.children.length)
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
            this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        }
        let parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    }
    propagateDown(node, select) {
        let index = this.findIndexInSelection(node);
        if (select && index == -1) {
            this.selection = [...this.selection || [], node];
        }
        else if (!select && index > -1) {
            this.selection = this.selection.filter((val, i) => i != index);
        }
        node.partialSelected = false;
        this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateDown(child, select);
            }
        }
    }
    isSelected(node) {
        return this.findIndexInSelection(node) != -1;
    }
    isSingleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'single';
    }
    isMultipleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'multiple';
    }
    isCheckboxSelectionMode() {
        return this.selectionMode && this.selectionMode == 'checkbox';
    }
    isNodeLeaf(node) {
        return node.leaf == false ? false : !(node.children && node.children.length);
    }
    getRootNode() {
        return this.filteredNodes ? this.filteredNodes : this.value;
    }
    getTemplateForNode(node) {
        if (this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    }
    onDragOver(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    }
    onDrop(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            let dragNode = this.dragNode;
            if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                let dragNodeIndex = this.dragNodeIndex;
                this.dragNodeSubNodes.splice(dragNodeIndex, 1);
                this.value = this.value || [];
                this.value.push(dragNode);
                this.dragDropService.stopDrag({
                    node: dragNode
                });
            }
        }
    }
    onDragEnter(event) {
        if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    }
    onDragLeave(event) {
        if (this.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
                this.dragHover = false;
            }
        }
    }
    allowDrop(dragNode, dropNode, dragNodeScope) {
        if (!dragNode) {
            //prevent random html elements to be dragged
            return false;
        }
        else if (this.isValidDragScope(dragNodeScope)) {
            let allow = true;
            if (dropNode) {
                if (dragNode === dropNode) {
                    allow = false;
                }
                else {
                    let parent = dropNode.parent;
                    while (parent != null) {
                        if (parent === dragNode) {
                            allow = false;
                            break;
                        }
                        parent = parent.parent;
                    }
                }
            }
            return allow;
        }
        else {
            return false;
        }
    }
    isValidDragScope(dragScope) {
        let dropScope = this.droppableScope;
        if (dropScope) {
            if (typeof dropScope === 'string') {
                if (typeof dragScope === 'string')
                    return dropScope === dragScope;
                else if (dragScope instanceof Array)
                    return dragScope.indexOf(dropScope) != -1;
            }
            else if (dropScope instanceof Array) {
                if (typeof dragScope === 'string') {
                    return dropScope.indexOf(dragScope) != -1;
                }
                else if (dragScope instanceof Array) {
                    for (let s of dropScope) {
                        for (let ds of dragScope) {
                            if (s === ds) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
    onFilter(event) {
        let filterValue = event.target.value;
        if (filterValue === '') {
            this.filteredNodes = null;
        }
        else {
            this.filteredNodes = [];
            const searchFields = this.filterBy.split(',');
            const filterText = ObjectUtils.removeAccents(filterValue).toLocaleLowerCase(this.filterLocale);
            const isStrictMode = this.filterMode === 'strict';
            for (let node of this.value) {
                let copyNode = Object.assign({}, node);
                let paramsWithoutNode = { searchFields, filterText, isStrictMode };
                if ((isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                    (!isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))) {
                    this.filteredNodes.push(copyNode);
                }
            }
        }
    }
    findFilteredNodes(node, paramsWithoutNode) {
        if (node) {
            let matched = false;
            if (node.children) {
                let childNodes = [...node.children];
                node.children = [];
                for (let childNode of childNodes) {
                    let copyChildNode = Object.assign({}, childNode);
                    if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                        matched = true;
                        node.children.push(copyChildNode);
                    }
                }
            }
            if (matched) {
                node.expanded = true;
                return true;
            }
        }
    }
    isFilterMatched(node, { searchFields, filterText, isStrictMode }) {
        let matched = false;
        for (let field of searchFields) {
            let fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(node, field))).toLocaleLowerCase(this.filterLocale);
            if (fieldValue.indexOf(filterText) > -1) {
                matched = true;
            }
        }
        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, { searchFields, filterText, isStrictMode }) || matched;
        }
        return matched;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngOnDestroy() {
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }
        if (this.dragStopSubscription) {
            this.dragStopSubscription.unsubscribe();
        }
    }
};
Tree.ctorParameters = () => [
    { type: ElementRef },
    { type: TreeDragDropService, decorators: [{ type: Optional }] }
];
__decorate([
    Input()
], Tree.prototype, "value", void 0);
__decorate([
    Input()
], Tree.prototype, "selectionMode", void 0);
__decorate([
    Input()
], Tree.prototype, "selection", void 0);
__decorate([
    Output()
], Tree.prototype, "selectionChange", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeSelect", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeUnselect", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeExpand", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeCollapse", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeContextMenuSelect", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeDrop", void 0);
__decorate([
    Input()
], Tree.prototype, "style", void 0);
__decorate([
    Input()
], Tree.prototype, "styleClass", void 0);
__decorate([
    Input()
], Tree.prototype, "contextMenu", void 0);
__decorate([
    Input()
], Tree.prototype, "layout", void 0);
__decorate([
    Input()
], Tree.prototype, "draggableScope", void 0);
__decorate([
    Input()
], Tree.prototype, "droppableScope", void 0);
__decorate([
    Input()
], Tree.prototype, "draggableNodes", void 0);
__decorate([
    Input()
], Tree.prototype, "droppableNodes", void 0);
__decorate([
    Input()
], Tree.prototype, "metaKeySelection", void 0);
__decorate([
    Input()
], Tree.prototype, "propagateSelectionUp", void 0);
__decorate([
    Input()
], Tree.prototype, "propagateSelectionDown", void 0);
__decorate([
    Input()
], Tree.prototype, "loading", void 0);
__decorate([
    Input()
], Tree.prototype, "loadingIcon", void 0);
__decorate([
    Input()
], Tree.prototype, "emptyMessage", void 0);
__decorate([
    Input()
], Tree.prototype, "ariaLabel", void 0);
__decorate([
    Input()
], Tree.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], Tree.prototype, "validateDrop", void 0);
__decorate([
    Input()
], Tree.prototype, "filter", void 0);
__decorate([
    Input()
], Tree.prototype, "filterBy", void 0);
__decorate([
    Input()
], Tree.prototype, "filterMode", void 0);
__decorate([
    Input()
], Tree.prototype, "filterPlaceholder", void 0);
__decorate([
    Input()
], Tree.prototype, "filterLocale", void 0);
__decorate([
    Input()
], Tree.prototype, "nodeTrackBy", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], Tree.prototype, "templates", void 0);
Tree = __decorate([
    Component({
        selector: 'p-tree',
        template: `
        <div [ngClass]="{'ui-tree ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode,'ui-treenode-dragover':dragHover,'ui-tree-loading': loading}" [ngStyle]="style" [class]="styleClass" *ngIf="!horizontal"
            (drop)="onDrop($event)" (dragover)="onDragOver($event)" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)">
            <div class="ui-tree-loading-mask ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-tree-loading-content" *ngIf="loading">
                <i [class]="'ui-tree-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div *ngIf="filter" class="ui-tree-filter-container">
                <input #filter type="text" autocomplete="off" class="ui-tree-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceholder"
                    (keydown.enter)="$event.preventDefault()" (input)="onFilter($event)">
                    <span class="ui-tree-filter-icon pi pi-search"></span>
            </div>
            <ul class="ui-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                <p-treeNode *ngFor="let node of getRootNode(); let firstChild=first;let lastChild=last; let index=index; trackBy: nodeTrackBy" [node]="node"
                [firstChild]="firstChild" [lastChild]="lastChild" [index]="index"></p-treeNode>
            </ul>
            <div class="ui-tree-empty-message" *ngIf="!loading && (value == null || value.length === 0)">{{emptyMessage}}</div>
        </div>
        <div [ngClass]="{'ui-tree ui-tree-horizontal ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}"  [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <div class="ui-tree-loading ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-tree-loading-content" *ngIf="loading">
                <i [class]="'ui-tree-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <table *ngIf="value&&value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
            <div class="ui-tree-empty-message" *ngIf="!loading && (value == null || value.length === 0)">{{emptyMessage}}</div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    }),
    __param(1, Optional())
], Tree);
export { Tree };
let TreeModule = class TreeModule {
};
TreeModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Tree, SharedModule],
        declarations: [Tree, UITreeNode]
    })
], TreeModule);
export { TreeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxnQkFBZ0IsRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQ2xGLGVBQWUsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBNkV2QyxJQUFhLFVBQVUsa0JBQXZCLE1BQWEsVUFBVTtJQWtCbkIsWUFBNEMsSUFBSTtRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQVksQ0FBQztJQUM3QixDQUFDO0lBUUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFbkMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJ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RSxDQUFDLElBQUksRUFBQyxZQUFZLENBQUM7UUFDNUIsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQztLQUNsQyxDQUFDO0dBQ1csVUFBVSxDQUFJO1NBQWQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LEFmdGVyQ29udGVudEluaXQsT25EZXN0cm95LE91dHB1dCxFdmVudEVtaXR0ZXIsT25Jbml0LFxyXG4gICAgQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxUZW1wbGF0ZVJlZixJbmplY3QsRWxlbWVudFJlZixmb3J3YXJkUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1RyZWVOb2RlfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7U2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7UHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1RyZWVEcmFnRHJvcFNlcnZpY2V9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0Jsb2NrYWJsZVVJfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7T2JqZWN0VXRpbHN9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xyXG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXRyZWVOb2RlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIm5vZGVcIj5cclxuICAgICAgICAgICAgPGxpICpuZ0lmPVwidHJlZS5kcm9wcGFibGVOb2Rlc1wiIGNsYXNzPVwidWktdHJlZW5vZGUtZHJvcHBvaW50XCIgW25nQ2xhc3NdPVwieyd1aS10cmVlbm9kZS1kcm9wcG9pbnQtYWN0aXZlIHVpLXN0YXRlLWhpZ2hsaWdodCc6ZHJhZ2hvdmVyUHJldn1cIlxyXG4gICAgICAgICAgICAoZHJvcCk9XCJvbkRyb3BQb2ludCgkZXZlbnQsLTEpXCIgKGRyYWdvdmVyKT1cIm9uRHJvcFBvaW50RHJhZ092ZXIoJGV2ZW50KVwiIChkcmFnZW50ZXIpPVwib25Ecm9wUG9pbnREcmFnRW50ZXIoJGV2ZW50LC0xKVwiIChkcmFnbGVhdmUpPVwib25Ecm9wUG9pbnREcmFnTGVhdmUoJGV2ZW50KVwiPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaSAqbmdJZj1cIiF0cmVlLmhvcml6b250YWxcIiByb2xlPVwidHJlZWl0ZW1cIiBbbmdDbGFzc109XCJbJ3VpLXRyZWVub2RlJyxub2RlLnN0eWxlQ2xhc3N8fCcnLCBpc0xlYWYoKSA/ICd1aS10cmVlbm9kZS1sZWFmJzogJyddXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZW5vZGUtY29udGVudFwiIChjbGljayk9XCJvbk5vZGVDbGljaygkZXZlbnQpXCIgKGNvbnRleHRtZW51KT1cIm9uTm9kZVJpZ2h0Q2xpY2soJGV2ZW50KVwiICh0b3VjaGVuZCk9XCJvbk5vZGVUb3VjaEVuZCgpXCJcclxuICAgICAgICAgICAgICAgICAgICAoZHJvcCk9XCJvbkRyb3BOb2RlKCRldmVudClcIiAoZHJhZ292ZXIpPVwib25Ecm9wTm9kZURyYWdPdmVyKCRldmVudClcIiAoZHJhZ2VudGVyKT1cIm9uRHJvcE5vZGVEcmFnRW50ZXIoJGV2ZW50KVwiIChkcmFnbGVhdmUpPVwib25Ecm9wTm9kZURyYWdMZWF2ZSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICBbZHJhZ2dhYmxlXT1cInRyZWUuZHJhZ2dhYmxlTm9kZXNcIiAoZHJhZ3N0YXJ0KT1cIm9uRHJhZ1N0YXJ0KCRldmVudClcIiAoZHJhZ2VuZCk9XCJvbkRyYWdTdG9wKCRldmVudClcIiBbYXR0ci50YWJpbmRleF09XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXRyZWVub2RlLXNlbGVjdGFibGUnOnRyZWUuc2VsZWN0aW9uTW9kZSAmJiBub2RlLnNlbGVjdGFibGUgIT09IGZhbHNlLCd1aS10cmVlbm9kZS1kcmFnb3Zlcic6ZHJhZ2hvdmVyTm9kZSwgJ3VpLXRyZWVub2RlLWNvbnRlbnQtc2VsZWN0ZWQnOmlzU2VsZWN0ZWQoKX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCIgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJ0aGlzLmluZGV4ICsgMVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwidGhpcy5ub2RlLmV4cGFuZGVkXCIgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIm5vZGUubGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRyZWUtdG9nZ2xlciBwaSBwaS1mdyB1aS11bnNlbGVjdGFibGUtdGV4dFwiIFtuZ0NsYXNzXT1cInsncGktY2FyZXQtcmlnaHQnOiFub2RlLmV4cGFuZGVkLCdwaS1jYXJldC1kb3duJzpub2RlLmV4cGFuZGVkfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlKCRldmVudClcIj48L3NwYW5cclxuICAgICAgICAgICAgICAgICAgICA+PGRpdiBjbGFzcz1cInVpLWNoa2JveFwiICpuZ0lmPVwidHJlZS5zZWxlY3Rpb25Nb2RlID09ICdjaGVja2JveCdcIiBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiaXNTZWxlY3RlZCgpXCI+PGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOiBub2RlLnNlbGVjdGFibGUgPT09IGZhbHNlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZSBwaVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3BpLWNoZWNrJzppc1NlbGVjdGVkKCksJ3BpLW1pbnVzJzpub2RlLnBhcnRpYWxTZWxlY3RlZH1cIj48L3NwYW4+PC9kaXY+PC9kaXZcclxuICAgICAgICAgICAgICAgICAgICA+PHNwYW4gW2NsYXNzXT1cImdldEljb24oKVwiICpuZ0lmPVwibm9kZS5pY29ufHxub2RlLmV4cGFuZGVkSWNvbnx8bm9kZS5jb2xsYXBzZWRJY29uXCI+PC9zcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgPjxzcGFuIGNsYXNzPVwidWktdHJlZW5vZGUtbGFiZWwgdWktY29ybmVyLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKCl9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiF0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPnt7bm9kZS5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKTsgY29udGV4dDogeyRpbXBsaWNpdDogbm9kZX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLXRyZWVub2RlLWNoaWxkcmVuXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiICpuZ0lmPVwibm9kZS5jaGlsZHJlbiAmJiBub2RlLmV4cGFuZGVkXCIgW3N0eWxlLmRpc3BsYXldPVwibm9kZS5leHBhbmRlZCA/ICdibG9jaycgOiAnbm9uZSdcIiByb2xlPVwiZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cC10cmVlTm9kZSAqbmdGb3I9XCJsZXQgY2hpbGROb2RlIG9mIG5vZGUuY2hpbGRyZW47bGV0IGZpcnN0Q2hpbGQ9Zmlyc3Q7bGV0IGxhc3RDaGlsZD1sYXN0OyBsZXQgaW5kZXg9aW5kZXg7IHRyYWNrQnk6IHRyZWUubm9kZVRyYWNrQnlcIiBbbm9kZV09XCJjaGlsZE5vZGVcIiBbcGFyZW50Tm9kZV09XCJub2RlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZpcnN0Q2hpbGRdPVwiZmlyc3RDaGlsZFwiIFtsYXN0Q2hpbGRdPVwibGFzdENoaWxkXCIgW2luZGV4XT1cImluZGV4XCI+PC9wLXRyZWVOb2RlPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpICpuZ0lmPVwidHJlZS5kcm9wcGFibGVOb2RlcyYmbGFzdENoaWxkXCIgY2xhc3M9XCJ1aS10cmVlbm9kZS1kcm9wcG9pbnRcIiBbbmdDbGFzc109XCJ7J3VpLXRyZWVub2RlLWRyb3Bwb2ludC1hY3RpdmUgdWktc3RhdGUtaGlnaGxpZ2h0JzpkcmFnaG92ZXJOZXh0fVwiXHJcbiAgICAgICAgICAgIChkcm9wKT1cIm9uRHJvcFBvaW50KCRldmVudCwxKVwiIChkcmFnb3Zlcik9XCJvbkRyb3BQb2ludERyYWdPdmVyKCRldmVudClcIiAoZHJhZ2VudGVyKT1cIm9uRHJvcFBvaW50RHJhZ0VudGVyKCRldmVudCwxKVwiIChkcmFnbGVhdmUpPVwib25Ecm9wUG9pbnREcmFnTGVhdmUoJGV2ZW50KVwiPjwvbGk+XHJcbiAgICAgICAgICAgIDx0YWJsZSAqbmdJZj1cInRyZWUuaG9yaXpvbnRhbFwiIFtjbGFzc109XCJub2RlLnN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInVpLXRyZWVub2RlLWNvbm5lY3RvclwiICpuZ0lmPVwiIXJvb3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInVpLXRyZWVub2RlLWNvbm5lY3Rvci10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIFtuZ0NsYXNzXT1cInsndWktdHJlZW5vZGUtY29ubmVjdG9yLWxpbmUnOiFmaXJzdENoaWxkfVwiPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBbbmdDbGFzc109XCJ7J3VpLXRyZWVub2RlLWNvbm5lY3Rvci1saW5lJzohbGFzdENoaWxkfVwiPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInVpLXRyZWVub2RlXCIgW25nQ2xhc3NdPVwieyd1aS10cmVlbm9kZS1jb2xsYXBzZWQnOiFub2RlLmV4cGFuZGVkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRyZWVub2RlLWNvbnRlbnQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgdGFiaW5kZXg9XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXRyZWVub2RlLXNlbGVjdGFibGUnOnRyZWUuc2VsZWN0aW9uTW9kZSwndWktc3RhdGUtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKCl9XCIgKGNsaWNrKT1cIm9uTm9kZUNsaWNrKCRldmVudClcIiAoY29udGV4dG1lbnUpPVwib25Ob2RlUmlnaHRDbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG91Y2hlbmQpPVwib25Ob2RlVG91Y2hFbmQoKVwiIChrZXlkb3duKT1cIm9uTm9kZUtleWRvd24oJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdHJlZS10b2dnbGVyIHBpIHBpLWZ3IHVpLXVuc2VsZWN0YWJsZS10ZXh0XCIgW25nQ2xhc3NdPVwieydwaS1wbHVzJzohbm9kZS5leHBhbmRlZCwncGktbWludXMnOm5vZGUuZXhwYW5kZWR9XCIgKm5nSWY9XCIhaXNMZWFmKClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCI+PC9zcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjxzcGFuIFtjbGFzc109XCJnZXRJY29uKClcIiAqbmdJZj1cIm5vZGUuaWNvbnx8bm9kZS5leHBhbmRlZEljb258fG5vZGUuY29sbGFwc2VkSWNvblwiPjwvc3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLXRyZWVub2RlLWxhYmVsIHVpLWNvcm5lci1hbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRyZWUuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRyZWUuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidHJlZS5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSk7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG5vZGV9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInVpLXRyZWVub2RlLWNoaWxkcmVuLWNvbnRhaW5lclwiICpuZ0lmPVwibm9kZS5jaGlsZHJlbiAmJiBub2RlLmV4cGFuZGVkXCIgW3N0eWxlLmRpc3BsYXldPVwibm9kZS5leHBhbmRlZCA/ICd0YWJsZS1jZWxsJyA6ICdub25lJ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRyZWVub2RlLWNoaWxkcmVuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtdHJlZU5vZGUgKm5nRm9yPVwibGV0IGNoaWxkTm9kZSBvZiBub2RlLmNoaWxkcmVuO2xldCBmaXJzdENoaWxkPWZpcnN0O2xldCBsYXN0Q2hpbGQ9bGFzdDsgdHJhY2tCeTogdHJlZS5ub2RlVHJhY2tCeVwiIFtub2RlXT1cImNoaWxkTm9kZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlyc3RDaGlsZF09XCJmaXJzdENoaWxkXCIgW2xhc3RDaGlsZF09XCJsYXN0Q2hpbGRcIj48L3AtdHJlZU5vZGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVUlUcmVlTm9kZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgc3RhdGljIElDT05fQ0xBU1M6IHN0cmluZyA9ICd1aS10cmVlbm9kZS1pY29uICc7XHJcblxyXG4gICAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XHJcblxyXG4gICAgQElucHV0KCkgcGFyZW50Tm9kZTogVHJlZU5vZGU7XHJcblxyXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpIGZpcnN0Q2hpbGQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgbGFzdENoaWxkOiBib29sZWFuO1xyXG5cclxuICAgIHRyZWU6IFRyZWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IFRyZWUpKSB0cmVlKSB7XHJcbiAgICAgICAgdGhpcy50cmVlID0gdHJlZSBhcyBUcmVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWdob3ZlclByZXY6IGJvb2xlYW47XHJcblxyXG4gICAgZHJhZ2hvdmVyTmV4dDogYm9vbGVhbjtcclxuXHJcbiAgICBkcmFnaG92ZXJOb2RlOiBib29sZWFuXHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRyZWUuc3luY05vZGVPcHRpb24odGhpcy5ub2RlLCB0aGlzLnRyZWUudmFsdWUsICdwYXJlbnQnLCB0aGlzLnRyZWUuZ2V0Tm9kZVdpdGhLZXkodGhpcy5wYXJlbnROb2RlLmtleSwgdGhpcy50cmVlLnZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEljb24oKSB7XHJcbiAgICAgICAgbGV0IGljb246IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5pY29uKVxyXG4gICAgICAgICAgICBpY29uID0gdGhpcy5ub2RlLmljb247XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBpY29uID0gdGhpcy5ub2RlLmV4cGFuZGVkICYmIHRoaXMubm9kZS5jaGlsZHJlbiAmJiB0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoID8gdGhpcy5ub2RlLmV4cGFuZGVkSWNvbiA6IHRoaXMubm9kZS5jb2xsYXBzZWRJY29uO1xyXG5cclxuICAgICAgICByZXR1cm4gVUlUcmVlTm9kZS5JQ09OX0NMQVNTICsgJyAnICsgaWNvbjtcclxuICAgIH1cclxuXHJcbiAgICBpc0xlYWYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZS5pc05vZGVMZWFmKHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUuZXhwYW5kZWQpXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoZXZlbnQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5leHBhbmQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cGFuZChldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVFeHBhbmQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IHRoaXMubm9kZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbGxhcHNlKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVDb2xsYXBzZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogdGhpcy5ub2RlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ob2RlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnRyZWUub25Ob2RlQ2xpY2soZXZlbnQsIHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ob2RlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZUNsaWNrKGV2ZW50LCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk5vZGVUb3VjaEVuZCgpIHtcclxuICAgICAgICB0aGlzLnRyZWUub25Ob2RlVG91Y2hFbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5vZGVSaWdodENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy50cmVlLm9uTm9kZVJpZ2h0Q2xpY2soZXZlbnQsIHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNTZWxlY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmVlLmlzU2VsZWN0ZWQodGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3BQb2ludChldmVudDogRXZlbnQsIHBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGxldCBkcmFnTm9kZSA9IHRoaXMudHJlZS5kcmFnTm9kZTtcclxuICAgICAgICBsZXQgZHJhZ05vZGVJbmRleCA9IHRoaXMudHJlZS5kcmFnTm9kZUluZGV4O1xyXG4gICAgICAgIGxldCBkcmFnTm9kZVNjb3BlID0gdGhpcy50cmVlLmRyYWdOb2RlU2NvcGU7XHJcbiAgICAgICAgbGV0IGlzVmFsaWREcm9wUG9pbnRJbmRleCA9IHRoaXMudHJlZS5kcmFnTm9kZVRyZWUgPT09IHRoaXMudHJlZSA/IChwb3NpdGlvbiA9PT0gMSB8fCBkcmFnTm9kZUluZGV4ICE9PSB0aGlzLmluZGV4IC0gMSkgOiB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50cmVlLmFsbG93RHJvcChkcmFnTm9kZSwgdGhpcy5ub2RlLCBkcmFnTm9kZVNjb3BlKSAmJiBpc1ZhbGlkRHJvcFBvaW50SW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZS52YWxpZGF0ZURyb3ApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5vbk5vZGVEcm9wLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wTm9kZTogdGhpcy5ub2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BJbmRleDogdGhpcy5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBhY2NlcHQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUG9pbnREcm9wKGRyYWdOb2RlLCBkcmFnTm9kZUluZGV4LCBwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NQb2ludERyb3AoZHJhZ05vZGUsIGRyYWdOb2RlSW5kZXgsIHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5vbk5vZGVEcm9wLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wTm9kZTogdGhpcy5ub2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3BJbmRleDogdGhpcy5pbmRleFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ2hvdmVyUHJldiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZHJhZ2hvdmVyTmV4dCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NQb2ludERyb3AoZHJhZ05vZGUsIGRyYWdOb2RlSW5kZXgsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgbGV0IG5ld05vZGVMaXN0ID0gdGhpcy5ub2RlLnBhcmVudCA/IHRoaXMubm9kZS5wYXJlbnQuY2hpbGRyZW4gOiB0aGlzLnRyZWUudmFsdWU7XHJcbiAgICAgICAgdGhpcy50cmVlLmRyYWdOb2RlU3ViTm9kZXMuc3BsaWNlKGRyYWdOb2RlSW5kZXgsIDEpO1xyXG4gICAgICAgIGxldCBkcm9wSW5kZXggPSB0aGlzLmluZGV4O1xyXG5cclxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XHJcbiAgICAgICAgICAgIGRyb3BJbmRleCA9ICh0aGlzLnRyZWUuZHJhZ05vZGVTdWJOb2RlcyA9PT0gbmV3Tm9kZUxpc3QpID8gKCh0aGlzLnRyZWUuZHJhZ05vZGVJbmRleCA+IHRoaXMuaW5kZXgpID8gdGhpcy5pbmRleCA6IHRoaXMuaW5kZXggLSAxKSA6IHRoaXMuaW5kZXg7XHJcbiAgICAgICAgICAgIG5ld05vZGVMaXN0LnNwbGljZShkcm9wSW5kZXgsIDAsIGRyYWdOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRyb3BJbmRleCA9IG5ld05vZGVMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgbmV3Tm9kZUxpc3QucHVzaChkcmFnTm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRyZWUuZHJhZ0Ryb3BTZXJ2aWNlLnN0b3BEcmFnKHtcclxuICAgICAgICAgICAgbm9kZTogZHJhZ05vZGUsXHJcbiAgICAgICAgICAgIHN1Yk5vZGVzOiB0aGlzLm5vZGUucGFyZW50ID8gdGhpcy5ub2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcclxuICAgICAgICAgICAgaW5kZXg6IGRyYWdOb2RlSW5kZXhcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3BQb2ludERyYWdPdmVyKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3BQb2ludERyYWdFbnRlcihldmVudDogRXZlbnQsIHBvc2l0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy50cmVlLmFsbG93RHJvcCh0aGlzLnRyZWUuZHJhZ05vZGUsIHRoaXMubm9kZSwgdGhpcy50cmVlLmRyYWdOb2RlU2NvcGUpKSB7XHJcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdob3ZlclByZXYgPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdob3Zlck5leHQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3BQb2ludERyYWdMZWF2ZShldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRyYWdob3ZlclByZXYgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRyYWdob3Zlck5leHQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWdTdGFydChldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRyZWUuZHJhZ2dhYmxlTm9kZXMgJiYgdGhpcy5ub2RlLmRyYWdnYWJsZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIFwiZGF0YVwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHJlZS5kcmFnRHJvcFNlcnZpY2Uuc3RhcnREcmFnKHtcclxuICAgICAgICAgICAgICAgIHRyZWU6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBub2RlOiB0aGlzLm5vZGUsXHJcbiAgICAgICAgICAgICAgICBzdWJOb2RlczogdGhpcy5ub2RlLnBhcmVudCA/IHRoaXMubm9kZS5wYXJlbnQuY2hpbGRyZW4gOiB0aGlzLnRyZWUudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiB0aGlzLnRyZWUuZHJhZ2dhYmxlU2NvcGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWdTdG9wKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy50cmVlLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XHJcbiAgICAgICAgICAgIG5vZGU6IHRoaXMubm9kZSxcclxuICAgICAgICAgICAgc3ViTm9kZXM6IHRoaXMubm9kZS5wYXJlbnQgPyB0aGlzLm5vZGUucGFyZW50LmNoaWxkcmVuIDogdGhpcy50cmVlLnZhbHVlLFxyXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJvcE5vZGVEcmFnT3ZlcihldmVudCkge1xyXG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xyXG4gICAgICAgIGlmICh0aGlzLnRyZWUuZHJvcHBhYmxlTm9kZXMpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRHJvcE5vZGUoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzICYmIHRoaXMubm9kZS5kcm9wcGFibGUgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBsZXQgZHJhZ05vZGUgPSB0aGlzLnRyZWUuZHJhZ05vZGU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyZWUuYWxsb3dEcm9wKGRyYWdOb2RlLCB0aGlzLm5vZGUsIHRoaXMudHJlZS5kcmFnTm9kZVNjb3BlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJlZS52YWxpZGF0ZURyb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlRHJvcC5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE5vZGU6IHRoaXMubm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTm9kZURyb3AoZHJhZ05vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NOb2RlRHJvcChkcmFnTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZURyb3AuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnTm9kZTogZHJhZ05vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ2hvdmVyTm9kZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NOb2RlRHJvcChkcmFnTm9kZSkge1xyXG4gICAgICAgIGxldCBkcmFnTm9kZUluZGV4ID0gdGhpcy50cmVlLmRyYWdOb2RlSW5kZXg7XHJcbiAgICAgICAgdGhpcy50cmVlLmRyYWdOb2RlU3ViTm9kZXMuc3BsaWNlKGRyYWdOb2RlSW5kZXgsIDEpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4ucHVzaChkcmFnTm9kZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4gPSBbZHJhZ05vZGVdO1xyXG5cclxuICAgICAgICB0aGlzLnRyZWUuZHJhZ0Ryb3BTZXJ2aWNlLnN0b3BEcmFnKHtcclxuICAgICAgICAgICAgbm9kZTogZHJhZ05vZGUsXHJcbiAgICAgICAgICAgIHN1Yk5vZGVzOiB0aGlzLm5vZGUucGFyZW50ID8gdGhpcy5ub2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcclxuICAgICAgICAgICAgaW5kZXg6IHRoaXMudHJlZS5kcmFnTm9kZUluZGV4XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3BOb2RlRHJhZ0VudGVyKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJlZS5kcm9wcGFibGVOb2RlcyAmJiB0aGlzLm5vZGUuZHJvcHBhYmxlICE9PSBmYWxzZSAmJiB0aGlzLnRyZWUuYWxsb3dEcm9wKHRoaXMudHJlZS5kcmFnTm9kZSwgdGhpcy5ub2RlLCB0aGlzLnRyZWUuZHJhZ05vZGVTY29wZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmFnaG92ZXJOb2RlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Ecm9wTm9kZURyYWdMZWF2ZShldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRyZWUuZHJvcHBhYmxlTm9kZXMpIHtcclxuICAgICAgICAgICAgbGV0IHJlY3QgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQueCA+IHJlY3QubGVmdCArIHJlY3Qud2lkdGggfHwgZXZlbnQueCA8IHJlY3QubGVmdCB8fCBldmVudC55ID49IE1hdGguZmxvb3IocmVjdC50b3AgKyByZWN0LmhlaWdodCkgfHwgZXZlbnQueSA8IHJlY3QudG9wKSB7XHJcbiAgICAgICAgICAgICAgIHRoaXMuZHJhZ2hvdmVyTm9kZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGNvbnN0IG5vZGVFbGVtZW50ID0gKDxIVE1MRGl2RWxlbWVudD4gZXZlbnQudGFyZ2V0KS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGlmIChub2RlRWxlbWVudC5ub2RlTmFtZSAhPT0gJ1AtVFJFRU5PREUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgICAgICAgLy9kb3duIGFycm93XHJcbiAgICAgICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0RWxlbWVudCA9ICh0aGlzLnRyZWUuZHJvcHBhYmxlTm9kZXMpID8gbm9kZUVsZW1lbnQuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0gOiBub2RlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblsxXTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0RWxlbWVudCAmJiBsaXN0RWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c05vZGUobGlzdEVsZW1lbnQuY2hpbGRyZW5bMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dE5vZGVFbGVtZW50ID0gbm9kZUVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Tm9kZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c05vZGUobmV4dE5vZGVFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0U2libGluZ0FuY2VzdG9yID0gdGhpcy5maW5kTmV4dFNpYmxpbmdPZkFuY2VzdG9yKG5vZGVFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTaWJsaW5nQW5jZXN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNOb2RlKG5leHRTaWJsaW5nQW5jZXN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy91cCBhcnJvd1xyXG4gICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGVFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzTm9kZSh0aGlzLmZpbmRMYXN0VmlzaWJsZURlc2NlbmRhbnQobm9kZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudE5vZGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNOb2RlKHBhcmVudE5vZGVFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvL3JpZ2h0IGFycm93XHJcbiAgICAgICAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubm9kZS5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vbGVmdCBhcnJvd1xyXG4gICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudE5vZGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNOb2RlKHBhcmVudE5vZGVFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvL2VudGVyXHJcbiAgICAgICAgICAgIGNhc2UgMTM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlQ2xpY2soZXZlbnQsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL25vIG9wXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kTmV4dFNpYmxpbmdPZkFuY2VzdG9yKG5vZGVFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XHJcbiAgICAgICAgaWYgKHBhcmVudE5vZGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50Tm9kZUVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTmV4dFNpYmxpbmdPZkFuY2VzdG9yKHBhcmVudE5vZGVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kTGFzdFZpc2libGVEZXNjZW5kYW50KG5vZGVFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW5MaXN0RWxlbWVudCA9IG5vZGVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzFdO1xyXG4gICAgICAgIGlmIChjaGlsZHJlbkxpc3RFbGVtZW50ICYmIGNoaWxkcmVuTGlzdEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0Q2hpbGRFbGVtZW50ID0gY2hpbGRyZW5MaXN0RWxlbWVudC5jaGlsZHJlbltjaGlsZHJlbkxpc3RFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZExhc3RWaXNpYmxlRGVzY2VuZGFudChsYXN0Q2hpbGRFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlRWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFyZW50Tm9kZUVsZW1lbnQobm9kZUVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnROb2RlRWxlbWVudCA9IG5vZGVFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG5cclxuICAgICAgICByZXR1cm4gcGFyZW50Tm9kZUVsZW1lbnQudGFnTmFtZSA9PT0gJ1AtVFJFRU5PREUnID8gcGFyZW50Tm9kZUVsZW1lbnQgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZvY3VzTm9kZShlbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJlZS5kcm9wcGFibGVOb2RlcylcclxuICAgICAgICAgICAgZWxlbWVudC5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5mb2N1cygpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXS5mb2N1cygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC10cmVlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLXRyZWUgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXRyZWUtc2VsZWN0YWJsZSc6c2VsZWN0aW9uTW9kZSwndWktdHJlZW5vZGUtZHJhZ292ZXInOmRyYWdIb3ZlciwndWktdHJlZS1sb2FkaW5nJzogbG9hZGluZ31cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKm5nSWY9XCIhaG9yaXpvbnRhbFwiXHJcbiAgICAgICAgICAgIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQpXCIgKGRyYWdvdmVyKT1cIm9uRHJhZ092ZXIoJGV2ZW50KVwiIChkcmFnZW50ZXIpPVwib25EcmFnRW50ZXIoJGV2ZW50KVwiIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZS1sb2FkaW5nLW1hc2sgdWktd2lkZ2V0LW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRyZWUtbG9hZGluZy1jb250ZW50XCIgKm5nSWY9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICA8aSBbY2xhc3NdPVwiJ3VpLXRyZWUtbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImZpbHRlclwiIGNsYXNzPVwidWktdHJlZS1maWx0ZXItY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgI2ZpbHRlciB0eXBlPVwidGV4dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwidWktdHJlZS1maWx0ZXIgdWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJmaWx0ZXJQbGFjZWhvbGRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiAoaW5wdXQpPVwib25GaWx0ZXIoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdHJlZS1maWx0ZXItaWNvbiBwaSBwaS1zZWFyY2hcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJ1aS10cmVlLWNvbnRhaW5lclwiICpuZ0lmPVwiZ2V0Um9vdE5vZGUoKVwiIHJvbGU9XCJ0cmVlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIj5cclxuICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlICpuZ0Zvcj1cImxldCBub2RlIG9mIGdldFJvb3ROb2RlKCk7IGxldCBmaXJzdENoaWxkPWZpcnN0O2xldCBsYXN0Q2hpbGQ9bGFzdDsgbGV0IGluZGV4PWluZGV4OyB0cmFja0J5OiBub2RlVHJhY2tCeVwiIFtub2RlXT1cIm5vZGVcIlxyXG4gICAgICAgICAgICAgICAgW2ZpcnN0Q2hpbGRdPVwiZmlyc3RDaGlsZFwiIFtsYXN0Q2hpbGRdPVwibGFzdENoaWxkXCIgW2luZGV4XT1cImluZGV4XCI+PC9wLXRyZWVOb2RlPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhbG9hZGluZyAmJiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDApXCI+e3tlbXB0eU1lc3NhZ2V9fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS10cmVlIHVpLXRyZWUtaG9yaXpvbnRhbCB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktdHJlZS1zZWxlY3RhYmxlJzpzZWxlY3Rpb25Nb2RlfVwiICBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKm5nSWY9XCJob3Jpem9udGFsXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlLWxvYWRpbmcgdWktd2lkZ2V0LW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRyZWUtbG9hZGluZy1jb250ZW50XCIgKm5nSWY9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICA8aSBbY2xhc3NdPVwiJ3VpLXRyZWUtbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHRhYmxlICpuZ0lmPVwidmFsdWUmJnZhbHVlWzBdXCI+XHJcbiAgICAgICAgICAgICAgICA8cC10cmVlTm9kZSBbbm9kZV09XCJ2YWx1ZVswXVwiIFtyb290XT1cInRydWVcIj48L3AtdHJlZU5vZGU+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlLWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cIiFsb2FkaW5nICYmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlLmxlbmd0aCA9PT0gMClcIj57e2VtcHR5TWVzc2FnZX19PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVlIGltcGxlbWVudHMgT25Jbml0LEFmdGVyQ29udGVudEluaXQsT25EZXN0cm95LEJsb2NrYWJsZVVJIHtcclxuXHJcbiAgICBASW5wdXQoKSB2YWx1ZTogVHJlZU5vZGVbXTtcclxuXHJcbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgc2VsZWN0aW9uOiBhbnk7XHJcblxyXG4gICAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uTm9kZVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uTm9kZVVuc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Ob2RlRXhwYW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Ob2RlQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbk5vZGVDb250ZXh0TWVudVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uTm9kZURyb3A6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGNvbnRleHRNZW51OiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgbGF5b3V0OiBzdHJpbmcgPSAndmVydGljYWwnO1xyXG5cclxuICAgIEBJbnB1dCgpIGRyYWdnYWJsZVNjb3BlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgZHJvcHBhYmxlU2NvcGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBkcmFnZ2FibGVOb2RlczogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBkcm9wcGFibGVOb2RlczogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBtZXRhS2V5U2VsZWN0aW9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBwcm9wYWdhdGVTZWxlY3Rpb25VcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgcHJvcGFnYXRlU2VsZWN0aW9uRG93bjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBsb2FkaW5nSWNvbjogc3RyaW5nID0gJ3BpIHBpLXNwaW5uZXInO1xyXG5cclxuICAgIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nID0gJ05vIHJlY29yZHMgZm91bmQnO1xyXG5cclxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdmFsaWRhdGVEcm9wOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGZpbHRlcjogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJCeTogc3RyaW5nID0gJ2xhYmVsJztcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJNb2RlOiBzdHJpbmcgPSAnbGVuaWVudCc7XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyUGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBub2RlVHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgdGVtcGxhdGVNYXA6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgbm9kZVRvdWNoZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGRyYWdOb2RlVHJlZTogVHJlZTtcclxuXHJcbiAgICBwdWJsaWMgZHJhZ05vZGU6IFRyZWVOb2RlO1xyXG5cclxuICAgIHB1YmxpYyBkcmFnTm9kZVN1Yk5vZGVzOiBUcmVlTm9kZVtdO1xyXG5cclxuICAgIHB1YmxpYyBkcmFnTm9kZUluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGRyYWdOb2RlU2NvcGU6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgZHJhZ0hvdmVyOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBkcmFnU3RhcnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBwdWJsaWMgZHJhZ1N0b3BTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBwdWJsaWMgZmlsdGVyZWROb2RlczogVHJlZU5vZGVbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIEBPcHRpb25hbCgpIHB1YmxpYyBkcmFnRHJvcFNlcnZpY2U6IFRyZWVEcmFnRHJvcFNlcnZpY2UpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTm9kZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRTdWJzY3JpcHRpb24gPSB0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnU3RhcnQkLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlVHJlZSA9IGV2ZW50LnRyZWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlID0gZXZlbnQubm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVTdWJOb2RlcyA9IGV2ZW50LnN1Yk5vZGVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZUluZGV4ID0gZXZlbnQuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlU2NvcGUgPSBldmVudC5zY29wZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYWdTdG9wU3Vic2NyaXB0aW9uID0gdGhpcy5kcmFnRHJvcFNlcnZpY2UuZHJhZ1N0b3AkLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlVHJlZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVTdWJOb2RlcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlSW5kZXggPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZVNjb3BlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0hvdmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaG9yaXpvbnRhbCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT0gJ2hvcml6b250YWwnO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVNYXAgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZU1hcFtpdGVtLm5hbWVdID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk5vZGVDbGljayhldmVudCwgbm9kZTogVHJlZU5vZGUpIHtcclxuICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSAoPEVsZW1lbnQ+IGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50VGFyZ2V0LCAndWktdHJlZS10b2dnbGVyJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuc2VsZWN0YWJsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyZWROb2RlcygpKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5nZXROb2RlV2l0aEtleShub2RlLmtleSwgdGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSAoaW5kZXggPj0gMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0NoZWNrYm94U2VsZWN0aW9uTW9kZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25Eb3duKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZURvd24obm9kZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCxpKSA9PiBpIT1pbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BhZ2F0ZVNlbGVjdGlvblVwICYmIG5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlVXAobm9kZS5wYXJlbnQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BhZ2F0ZVNlbGVjdGlvbkRvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlRG93bihub2RlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gWy4uLnRoaXMuc2VsZWN0aW9ufHxbXSxub2RlXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcGFnYXRlU2VsZWN0aW9uVXAgJiYgbm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVVcChub2RlLnBhcmVudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGFTZWxlY3Rpb24gPSB0aGlzLm5vZGVUb3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YUtleSA9IChldmVudC5tZXRhS2V5fHxldmVudC5jdHJsS2V5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLGkpID0+IGkhPWluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVVuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gKCFtZXRhS2V5KSA/IFtdIDogdGhpcy5zZWxlY3Rpb258fFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb24sbm9kZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCxpKSA9PiBpIT1pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVVuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbnx8W10sbm9kZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTm9kZVRvdWNoRW5kKCkge1xyXG4gICAgICAgIHRoaXMubm9kZVRvdWNoZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTm9kZVJpZ2h0Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IFRyZWVOb2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnUpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gKDxFbGVtZW50PiBldmVudC50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTmFtZSAmJiBldmVudFRhcmdldC5jbGFzc05hbWUuaW5kZXhPZigndWktdHJlZS10b2dnbGVyJykgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSAoaW5kZXggPj0gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChbbm9kZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc2hvdyhldmVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZUNvbnRleHRNZW51U2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZTogVHJlZU5vZGUpIHtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlICYmIHRoaXMuc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJlTm9kZXNFcXVhbCA9ICh0aGlzLnNlbGVjdGlvbi5rZXkgJiYgdGhpcy5zZWxlY3Rpb24ua2V5ID09PSBub2RlLmtleSkgfHwgdGhpcy5zZWxlY3Rpb24gPT0gbm9kZTtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gYXJlTm9kZXNFcXVhbCA/IDAgOiAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpICA8IHRoaXMuc2VsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTm9kZSA9IHRoaXMuc2VsZWN0aW9uW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmVOb2Rlc0VxdWFsID0gKHNlbGVjdGVkTm9kZS5rZXkgJiYgc2VsZWN0ZWROb2RlLmtleSA9PT0gbm9kZS5rZXkpIHx8IHNlbGVjdGVkTm9kZSA9PSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmVOb2Rlc0VxdWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgc3luY05vZGVPcHRpb24obm9kZSwgcGFyZW50Tm9kZXMsIG9wdGlvbiwgdmFsdWU/OiBhbnkpIHtcclxuICAgICAgICAvLyB0byBzeW5jaHJvbml6ZSB0aGUgbm9kZSBvcHRpb24gYmV0d2VlbiB0aGUgZmlsdGVyZWQgbm9kZXMgYW5kIHRoZSBvcmlnaW5hbCBub2Rlcyh0aGlzLnZhbHVlKVxyXG4gICAgICAgIGNvbnN0IF9ub2RlID0gdGhpcy5oYXNGaWx0ZXJlZE5vZGVzKCkgPyB0aGlzLmdldE5vZGVXaXRoS2V5KG5vZGUua2V5LCBwYXJlbnROb2RlcykgOiBudWxsO1xyXG4gICAgICAgIGlmIChfbm9kZSkge1xyXG4gICAgICAgICAgICBfbm9kZVtvcHRpb25dID0gdmFsdWV8fG5vZGVbb3B0aW9uXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFzRmlsdGVyZWROb2RlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXJlZE5vZGVzICYmIHRoaXMuZmlsdGVyZWROb2Rlcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9kZVdpdGhLZXkoa2V5OiBzdHJpbmcsIG5vZGVzOiBUcmVlTm9kZVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5rZXkgPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hlZE5vZGUgPSB0aGlzLmdldE5vZGVXaXRoS2V5KGtleSwgbm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlZE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvcGFnYXRlVXAobm9kZTogVHJlZU5vZGUsIHNlbGVjdDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY2hpbGRQYXJ0aWFsU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ291bnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkLnBhcnRpYWxTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUGFydGlhbFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdCAmJiBzZWxlY3RlZENvdW50ID09IG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbnx8W10sbm9kZV07XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcnRpYWxTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9aW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRQYXJ0aWFsU2VsZWN0ZWQgfHwgc2VsZWN0ZWRDb3VudCA+IDAgJiYgc2VsZWN0ZWRDb3VudCAhPSBub2RlLmNoaWxkcmVuLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcnRpYWxTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zeW5jTm9kZU9wdGlvbihub2RlLCB0aGlzLmZpbHRlcmVkTm9kZXMsICdwYXJ0aWFsU2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudDtcclxuICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlVXAocGFyZW50LCBzZWxlY3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9wYWdhdGVEb3duKG5vZGU6IFRyZWVOb2RlLCBzZWxlY3Q6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ICYmIGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gWy4uLnRoaXMuc2VsZWN0aW9ufHxbXSxub2RlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoIXNlbGVjdCAmJiBpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9aW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zeW5jTm9kZU9wdGlvbihub2RlLCB0aGlzLmZpbHRlcmVkTm9kZXMsICdwYXJ0aWFsU2VsZWN0ZWQnKTtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZURvd24oY2hpbGQsIHNlbGVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNTZWxlY3RlZChub2RlOiBUcmVlTm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpICE9IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PSAnc2luZ2xlJztcclxuICAgIH1cclxuXHJcbiAgICBpc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PSAnbXVsdGlwbGUnO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQ2hlY2tib3hTZWxlY3Rpb25Nb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09ICdjaGVja2JveCc7XHJcbiAgICB9XHJcblxyXG4gICAgaXNOb2RlTGVhZihub2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUubGVhZiA9PSBmYWxzZSA/IGZhbHNlIDogIShub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSb290Tm9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZE5vZGVzID8gdGhpcy5maWx0ZXJlZE5vZGVzIDogdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZW1wbGF0ZUZvck5vZGUobm9kZTogVHJlZU5vZGUpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcclxuICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZU1hcClcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGUudHlwZSA/IHRoaXMudGVtcGxhdGVNYXBbbm9kZS50eXBlXSA6IHRoaXMudGVtcGxhdGVNYXBbJ2RlZmF1bHQnXTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZ092ZXIoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kcm9wcGFibGVOb2RlcyAmJiAoIXRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZS5sZW5ndGggPT09IDApKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRyb3AoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kcm9wcGFibGVOb2RlcyAmJiAoIXRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZS5sZW5ndGggPT09IDApKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGxldCBkcmFnTm9kZSA9IHRoaXMuZHJhZ05vZGU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbG93RHJvcChkcmFnTm9kZSwgbnVsbCwgdGhpcy5kcmFnTm9kZVNjb3BlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRyYWdOb2RlSW5kZXggPSB0aGlzLmRyYWdOb2RlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlU3ViTm9kZXMuc3BsaWNlKGRyYWdOb2RlSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWV8fFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKGRyYWdOb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogZHJhZ05vZGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZ0VudGVyKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTm9kZXMgJiYgdGhpcy5hbGxvd0Ryb3AodGhpcy5kcmFnTm9kZSwgbnVsbCwgdGhpcy5kcmFnTm9kZVNjb3BlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdIb3ZlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTm9kZXMpIHtcclxuICAgICAgICAgICAgbGV0IHJlY3QgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQueCA+IHJlY3QubGVmdCArIHJlY3Qud2lkdGggfHwgZXZlbnQueCA8IHJlY3QubGVmdCB8fCBldmVudC55ID4gcmVjdC50b3AgKyByZWN0LmhlaWdodCB8fCBldmVudC55IDwgcmVjdC50b3ApIHtcclxuICAgICAgICAgICAgICAgdGhpcy5kcmFnSG92ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbGxvd0Ryb3AoZHJhZ05vZGU6IFRyZWVOb2RlLCBkcm9wTm9kZTogVHJlZU5vZGUsIGRyYWdOb2RlU2NvcGU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghZHJhZ05vZGUpIHtcclxuICAgICAgICAgICAgLy9wcmV2ZW50IHJhbmRvbSBodG1sIGVsZW1lbnRzIHRvIGJlIGRyYWdnZWRcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzVmFsaWREcmFnU2NvcGUoZHJhZ05vZGVTY29wZSkpIHtcclxuICAgICAgICAgICAgbGV0IGFsbG93OiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRyb3BOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZHJhZ05vZGUgPT09IGRyb3BOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBkcm9wTm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUocGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gZHJhZ05vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFsbG93O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc1ZhbGlkRHJhZ1Njb3BlKGRyYWdTY29wZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGRyb3BTY29wZSA9IHRoaXMuZHJvcHBhYmxlU2NvcGU7XHJcblxyXG4gICAgICAgIGlmIChkcm9wU2NvcGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkcm9wU2NvcGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRyYWdTY29wZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyb3BTY29wZSA9PT0gZHJhZ1Njb3BlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZHJhZ1Njb3BlIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8QXJyYXk8YW55Pj5kcmFnU2NvcGUpLmluZGV4T2YoZHJvcFNjb3BlKSAhPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkcm9wU2NvcGUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkcmFnU2NvcGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8QXJyYXk8YW55Pj5kcm9wU2NvcGUpLmluZGV4T2YoZHJhZ1Njb3BlKSAhPSAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRyYWdTY29wZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBzIG9mIGRyb3BTY29wZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGRzIG9mIGRyYWdTY29wZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgPT09IGRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRmlsdGVyKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGZpbHRlclZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIGlmIChmaWx0ZXJWYWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZE5vZGVzID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROb2RlcyA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBzZWFyY2hGaWVsZHM6IHN0cmluZ1tdID0gdGhpcy5maWx0ZXJCeS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJUZXh0ID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXJWYWx1ZSkudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpO1xyXG4gICAgICAgICAgICBjb25zdCBpc1N0cmljdE1vZGUgPSB0aGlzLmZpbHRlck1vZGUgPT09ICdzdHJpY3QnO1xyXG4gICAgICAgICAgICBmb3IobGV0IG5vZGUgb2YgdGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvcHlOb2RlID0gey4uLm5vZGV9O1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtc1dpdGhvdXROb2RlID0ge3NlYXJjaEZpZWxkcywgZmlsdGVyVGV4dCwgaXNTdHJpY3RNb2RlfTtcclxuICAgICAgICAgICAgICAgIGlmICgoaXNTdHJpY3RNb2RlICYmICh0aGlzLmZpbmRGaWx0ZXJlZE5vZGVzKGNvcHlOb2RlLCBwYXJhbXNXaXRob3V0Tm9kZSkgfHwgdGhpcy5pc0ZpbHRlck1hdGNoZWQoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKCFpc1N0cmljdE1vZGUgJiYgKHRoaXMuaXNGaWx0ZXJNYXRjaGVkKGNvcHlOb2RlLCBwYXJhbXNXaXRob3V0Tm9kZSkgfHwgdGhpcy5maW5kRmlsdGVyZWROb2Rlcyhjb3B5Tm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkTm9kZXMucHVzaChjb3B5Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEZpbHRlcmVkTm9kZXMobm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkTm9kZXMgPSBbLi4ubm9kZS5jaGlsZHJlbl07XHJcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZE5vZGUgb2YgY2hpbGROb2Rlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3B5Q2hpbGROb2RlID0gey4uLmNoaWxkTm9kZX07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNGaWx0ZXJNYXRjaGVkKGNvcHlDaGlsZE5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKGNvcHlDaGlsZE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNGaWx0ZXJNYXRjaGVkKG5vZGUsIHtzZWFyY2hGaWVsZHMsIGZpbHRlclRleHQsIGlzU3RyaWN0TW9kZX0pIHtcclxuICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvcihsZXQgZmllbGQgb2Ygc2VhcmNoRmllbGRzKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZFZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShub2RlLCBmaWVsZCkpKS50b0xvY2FsZUxvd2VyQ2FzZSh0aGlzLmZpbHRlckxvY2FsZSk7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlLmluZGV4T2YoZmlsdGVyVGV4dCkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbWF0Y2hlZCB8fCAoaXNTdHJpY3RNb2RlICYmICF0aGlzLmlzTm9kZUxlYWYobm9kZSkpKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0aGlzLmZpbmRGaWx0ZXJlZE5vZGVzKG5vZGUsIHtzZWFyY2hGaWVsZHMsIGZpbHRlclRleHQsIGlzU3RyaWN0TW9kZX0pIHx8IG1hdGNoZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWF0Y2hlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kcmFnU3RvcFN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdTdG9wU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtUcmVlLFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtUcmVlLFVJVHJlZU5vZGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVlTW9kdWxlIHsgfVxyXG4iXX0=