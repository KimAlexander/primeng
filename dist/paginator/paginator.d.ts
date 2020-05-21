import { OnInit, ChangeDetectorRef, EventEmitter, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
export declare class Paginator implements OnInit, OnChanges {
    private cd;
    pageLinkSize: number;
    onPageChange: EventEmitter<any>;
    style: any;
    styleClass: string;
    alwaysShow: boolean;
    templateLeft: TemplateRef<any>;
    templateRight: TemplateRef<any>;
    dropdownAppendTo: any;
    dropdownScrollHeight: string;
    currentPageReportTemplate: string;
    showCurrentPageReport: boolean;
    totalRecords: number;
    rows: number;
    rowsPerPageOptions: any[];
    pageLinks: number[];
    rowsPerPageItems: SelectItem[];
    paginatorState: any;
    _first: number;
    constructor(cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(simpleChange: SimpleChanges): void;
    first: number;
    updateRowsPerPageOptions(): void;
    isFirstPage(): boolean;
    isLastPage(): boolean;
    getPageCount(): number;
    calculatePageLinkBoundaries(): number[];
    updatePageLinks(): void;
    changePage(p: number): void;
    updateFirst(): void;
    getPage(): number;
    changePageToFirst(event: any): void;
    changePageToPrev(event: any): void;
    changePageToNext(event: any): void;
    changePageToLast(event: any): void;
    onPageLinkClick(event: any, page: any): void;
    onRppChange(event: any): void;
    updatePaginatorState(): void;
    readonly currentPageReport: string;
}
export declare class PaginatorModule {
}
