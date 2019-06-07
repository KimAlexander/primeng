import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MegaMenu } from './megamenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
describe('MegaMenu', function () {
    var megamenu;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'test', component: MegaMenu }
                ]),
                NoopAnimationsModule
            ],
            declarations: [
                MegaMenu
            ]
        });
        fixture = TestBed.createComponent(MegaMenu);
        megamenu = fixture.componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(megaMenuEl).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        megamenu.style = { 'primeng': 'rocks!' };
        megamenu.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(megaMenuEl.className).toContain("Primeng ROCKS!");
        expect(megaMenuEl.style.primeng).toContain("rocks!");
    });
    it('should horizontal by default', function () {
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        },
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ]
                ]
            }
        ];
        fixture.detectChanges();
        var megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        var spanIconEl = fixture.debugElement.query(By.css('a')).children[2].nativeElement;
        var menuItemCustomEl = fixture.debugElement.query(By.css('.ui-menuitem.ui-menuitem-custom'));
        expect(megaMenuEl.className).toContain("ui-megamenu-horizontal");
        expect(spanIconEl.className).toContain("pi-caret-down");
        expect(menuItemCustomEl).toBeTruthy();
    });
    it('should change orientation', function () {
        megamenu.orientation = "vertical";
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        },
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ]
                ]
            }
        ];
        fixture.detectChanges();
        var megaMenuEl = fixture.debugElement.query(By.css('div')).nativeElement;
        var spanIconEl = fixture.debugElement.query(By.css('a')).children[2].nativeElement;
        var menuItemCustomEl = fixture.debugElement.query(By.css('.ui-menuitem.ui-menuitem-custom'));
        expect(megaMenuEl.className).toContain("ui-megamenu-vertical");
        expect(spanIconEl.className).toContain("pi-caret-right");
        expect(menuItemCustomEl).toBeFalsy();
    });
    it('should call onItemMouseEnter', fakeAsync(function () {
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ]
                ]
            },
        ];
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var sportsEl = fixture.debugElement.query(By.css('ul')).children[1].nativeElement;
        var submenuEl = fixture.debugElement.query(By.css('.ui-g')).queryAll(By.css('ul'));
        var event = new Event('mouseenter');
        var mouseLeaveEvent = new Event('mouseleave');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        expect(megamenu.hideTimeout).toBeUndefined();
        tvEl.dispatchEvent(mouseLeaveEvent);
        fixture.detectChanges();
        tick(200);
        sportsEl.dispatchEvent(event);
        fixture.detectChanges();
        expect(megamenu.hideTimeout).toBeNull();
    }));
    it('should call onItemMouseEnter twice and call', function () {
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ]
                ]
            },
        ];
        var mouseenterSpy = spyOn(megamenu, 'onItemMouseEnter').and.callThrough();
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var submenuEl = fixture.debugElement.query(By.css('.ui-g')).queryAll(By.css('ul'));
        var event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        var tv1HeaderEl = submenuEl[0].query(By.css('.ui-widget-header')).nativeElement;
        var tv1FirstItemLabelEl = submenuEl[0].query(By.css('.ui-menuitem-text')).nativeElement;
        expect(mouseenterSpy).toHaveBeenCalled();
        expect(submenuEl.length).toEqual(2);
        expect(tv1HeaderEl.textContent).toContain("TV 1");
        expect(tv1FirstItemLabelEl.textContent).toContain("TV 1.1");
        expect(megamenu.activeItem).toBeTruthy();
    });
    it('should call onItemMouseLeave', fakeAsync(function () {
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ]
                ]
            },
        ];
        var mouseLeaveSpy = spyOn(megamenu, 'onItemMouseLeave').and.callThrough();
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var mouseenterEvent = new Event('mouseenter');
        var mouseLeaveEvent = new Event('mouseleave');
        tvEl.dispatchEvent(mouseenterEvent);
        fixture.detectChanges();
        tvEl.dispatchEvent(mouseLeaveEvent);
        tick(1000);
        fixture.detectChanges();
        expect(mouseLeaveSpy).toHaveBeenCalled();
        expect(megamenu.activeItem).toEqual(null);
    }));
    it('should  call itemClick ', function () {
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ]
                ]
            },
        ];
        var itemClickSpy = spyOn(megamenu, 'itemClick').and.callThrough();
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var submenuEl = fixture.debugElement.query(By.css('.ui-g')).queryAll(By.css('ul'));
        var event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        var tv1FirstItemEl = submenuEl[0].query(By.css('a')).nativeElement;
        tv1FirstItemEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
        expect(megamenu.activeItem).toEqual(null);
    });
    it('should  call onItemMouseEnter and not show submenu ', function () {
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ],
                disabled: true
            },
            {
                label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1', disabled: true }, { label: 'Sports 1.2' }],
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ]
                ]
            },
        ];
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var mouseenterSpy = spyOn(megamenu, 'onItemMouseEnter').and.callThrough();
        var event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        var disabledItems = fixture.debugElement.queryAll(By.css('.ui-state-disabled'));
        expect(megamenu.activeItem).toEqual(undefined);
        expect(disabledItems.length).toEqual(2);
        expect(mouseenterSpy).toHaveBeenCalled();
        expect(megamenu.activeItem).toBeUndefined();
    });
    it('should  call onItemMouseEnter and not show submenu ', function () {
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }],
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1', visible: false }, { label: 'TV 2.2' }],
                        }
                    ]
                ],
            },
            {
                label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ]
                ],
                visible: false
            },
        ];
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        var unVisibleItems = fixture.debugElement.queryAll(By.css('.ui-helper-hidden'));
        expect(unVisibleItems.length).toEqual(2);
    });
    it('shouldn\'t  call itemClick ', function () {
        megamenu.orientation = "vertical";
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1', disabled: true }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ],
            },
            {
                label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ]
                ]
            },
        ];
        var itemClickSpy = spyOn(megamenu, 'itemClick').and.callThrough();
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var submenuEl = fixture.debugElement.query(By.css('.ui-g')).queryAll(By.css('ul'));
        var event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        var tv1FirstItemEl = submenuEl[0].query(By.css('a')).nativeElement;
        tv1FirstItemEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
        expect(megamenu.activeItem).not.toEqual(null);
    });
    it('shouldn\'t  call itemClick ', function () {
        var item;
        megamenu.model = [
            {
                label: 'TV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1', command: function (event) {
                                        item = event.item;
                                    } }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ]
                ],
            },
            {
                label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ]
                ]
            },
        ];
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var submenuEl = fixture.debugElement.query(By.css('.ui-g')).queryAll(By.css('ul'));
        var event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        var tv1FirstItemEl = submenuEl[0].query(By.css('a')).nativeElement;
        tv1FirstItemEl.click();
        fixture.detectChanges();
        expect(item.label).toEqual("TV 1.1");
    });
    it('should item get ui-g-4', function () {
        megamenu.model = [
            {
                label: 'TVV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        }
                    ],
                ],
            }
        ];
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        var tv1Div = fixture.debugElement.query(By.css('.ui-g')).query(By.css('div')).nativeElement;
        fixture.detectChanges();
        expect(tv1Div.className).toContain("ui-g-4");
    });
    it('should item get ui-g-3', function () {
        megamenu.model = [
            {
                label: 'TVV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ]
                ],
            }
        ];
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        var tv1Div = fixture.debugElement.query(By.css('.ui-g')).query(By.css('div')).nativeElement;
        fixture.detectChanges();
        expect(tv1Div.className).toContain("ui-g-3");
    });
    it('should item get ui-g-2', function () {
        megamenu.model = [
            {
                label: 'TVV', icon: 'fa fa-fw fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 5',
                            items: [{ label: 'TV 5.1' }, { label: 'TV 5.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 6',
                            items: [{ label: 'TV 6.1' }, { label: 'TV 6.2' }]
                        }
                    ]
                ],
            }
        ];
        fixture.detectChanges();
        var tvEl = fixture.debugElement.query(By.css('ul')).children[0].nativeElement;
        var event = new Event('mouseenter');
        tvEl.dispatchEvent(event);
        fixture.detectChanges();
        var tv1Div = fixture.debugElement.query(By.css('.ui-g')).query(By.css('div')).nativeElement;
        fixture.detectChanges();
        expect(tv1Div.className).toContain("ui-g-2");
    });
});
//# sourceMappingURL=megamenu.spec.js.map