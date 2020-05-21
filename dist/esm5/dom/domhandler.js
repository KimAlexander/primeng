var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * @dynamic is for runtime initializing DomHandler.browser
 *
 * If delete below comment, we can see this error message:
 *  Metadata collected contains an error that will be reported at runtime:
 *  Only initialized variables and constants can be referenced
 *  because the value of this variable is needed by the template compiler.
 */
// @dynamic
var DomHandler = /** @class */ (function () {
    function DomHandler() {
    }
    DomHandler.addClass = function (element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    };
    DomHandler.addMultipleClasses = function (element, className) {
        if (element.classList) {
            var styles = className.split(' ');
            for (var i = 0; i < styles.length; i++) {
                element.classList.add(styles[i]);
            }
        }
        else {
            var styles = className.split(' ');
            for (var i = 0; i < styles.length; i++) {
                element.className += ' ' + styles[i];
            }
        }
    };
    DomHandler.removeClass = function (element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };
    DomHandler.hasClass = function (element, className) {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    };
    DomHandler.siblings = function (element) {
        return Array.prototype.filter.call(element.parentNode.children, function (child) {
            return child !== element;
        });
    };
    DomHandler.find = function (element, selector) {
        return Array.from(element.querySelectorAll(selector));
    };
    DomHandler.findSingle = function (element, selector) {
        if (element) {
            return element.querySelector(selector);
        }
        return null;
    };
    DomHandler.index = function (element) {
        var children = element.parentNode.childNodes;
        var num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == element)
                return num;
            if (children[i].nodeType == 1)
                num++;
        }
        return -1;
    };
    DomHandler.indexWithinGroup = function (element, attributeName) {
        var children = element.parentNode ? element.parentNode.childNodes : [];
        var num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == element)
                return num;
            if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType == 1)
                num++;
        }
        return -1;
    };
    DomHandler.relativePosition = function (element, target) {
        var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        var targetHeight = target.offsetHeight;
        var targetOffset = target.getBoundingClientRect();
        var viewport = this.getViewport();
        var top, left;
        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
            top = -1 * (elementDimensions.height);
            if (targetOffset.top + top < 0) {
                top = -1 * targetOffset.top;
            }
        }
        else {
            top = targetHeight;
        }
        if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = targetOffset.left * -1;
        }
        else if ((targetOffset.left + elementDimensions.width) > viewport.width) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
        }
        else {
            // element fits on screen (align with target)
            left = 0;
        }
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    };
    DomHandler.absolutePosition = function (element, target) {
        var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        var elementOuterHeight = elementDimensions.height;
        var elementOuterWidth = elementDimensions.width;
        var targetOuterHeight = target.offsetHeight;
        var targetOuterWidth = target.offsetWidth;
        var targetOffset = target.getBoundingClientRect();
        var windowScrollTop = this.getWindowScrollTop();
        var windowScrollLeft = this.getWindowScrollLeft();
        var viewport = this.getViewport();
        var top, left;
        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            if (top < 0) {
                top = windowScrollTop;
            }
        }
        else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        }
        if (targetOffset.left + elementOuterWidth > viewport.width)
            left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
        else
            left = targetOffset.left + windowScrollLeft;
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    };
    DomHandler.getHiddenElementOuterHeight = function (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        var elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementHeight;
    };
    DomHandler.getHiddenElementOuterWidth = function (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        var elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementWidth;
    };
    DomHandler.getHiddenElementDimensions = function (element) {
        var dimensions = {};
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return dimensions;
    };
    DomHandler.scrollInView = function (container, item) {
        var borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
        var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
        var paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
        var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        var containerRect = container.getBoundingClientRect();
        var itemRect = item.getBoundingClientRect();
        var offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        var scroll = container.scrollTop;
        var elementHeight = container.clientHeight;
        var itemHeight = this.getOuterHeight(item);
        if (offset < 0) {
            container.scrollTop = scroll + offset;
        }
        else if ((offset + itemHeight) > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    };
    DomHandler.fadeIn = function (element, duration) {
        element.style.opacity = 0;
        var last = +new Date();
        var opacity = 0;
        var tick = function () {
            opacity = +element.style.opacity.replace(",", ".") + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();
            if (+opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    };
    DomHandler.fadeOut = function (element, ms) {
        var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
        var fading = setInterval(function () {
            opacity = opacity - gap;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }
            element.style.opacity = opacity;
        }, interval);
    };
    DomHandler.getWindowScrollTop = function () {
        var doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    };
    DomHandler.getWindowScrollLeft = function () {
        var doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    };
    DomHandler.matches = function (element, selector) {
        var p = Element.prototype;
        var f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(element, selector);
    };
    DomHandler.getOuterWidth = function (el, margin) {
        var width = el.offsetWidth;
        if (margin) {
            var style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }
        return width;
    };
    DomHandler.getHorizontalPadding = function (el) {
        var style = getComputedStyle(el);
        return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    };
    DomHandler.getHorizontalMargin = function (el) {
        var style = getComputedStyle(el);
        return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    };
    DomHandler.innerWidth = function (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    };
    DomHandler.width = function (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    };
    DomHandler.getInnerHeight = function (el) {
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
        height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        return height;
    };
    DomHandler.getOuterHeight = function (el, margin) {
        var height = el.offsetHeight;
        if (margin) {
            var style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }
        return height;
    };
    DomHandler.getHeight = function (el) {
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
        height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        return height;
    };
    DomHandler.getWidth = function (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        return width;
    };
    DomHandler.getViewport = function () {
        var win = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
        return { width: w, height: h };
    };
    DomHandler.getOffset = function (el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    };
    DomHandler.replaceElementWith = function (element, replacementElement) {
        var parentNode = element.parentNode;
        if (!parentNode)
            throw "Can't replace element";
        return parentNode.replaceChild(replacementElement, element);
    };
    DomHandler.getUserAgent = function () {
        return navigator.userAgent;
    };
    DomHandler.isIE = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return true;
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return true;
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return true;
        }
        // other browser
        return false;
    };
    DomHandler.isIOS = function () {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    };
    DomHandler.isAndroid = function () {
        return /(android)/i.test(navigator.userAgent);
    };
    DomHandler.appendChild = function (element, target) {
        if (this.isElement(target))
            target.appendChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.appendChild(element);
        else
            throw 'Cannot append ' + target + ' to ' + element;
    };
    DomHandler.removeChild = function (element, target) {
        if (this.isElement(target))
            target.removeChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.removeChild(element);
        else
            throw 'Cannot remove ' + element + ' from ' + target;
    };
    DomHandler.isElement = function (obj) {
        return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
            obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string");
    };
    DomHandler.calculateScrollbarWidth = function (el) {
        if (el) {
            var style = getComputedStyle(el);
            return (el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth));
        }
        else {
            if (this.calculatedScrollbarWidth !== null)
                return this.calculatedScrollbarWidth;
            var scrollDiv = document.createElement("div");
            scrollDiv.className = "ui-scrollbar-measure";
            document.body.appendChild(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            this.calculatedScrollbarWidth = scrollbarWidth;
            return scrollbarWidth;
        }
    };
    DomHandler.calculateScrollbarHeight = function () {
        if (this.calculatedScrollbarHeight !== null)
            return this.calculatedScrollbarHeight;
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "ui-scrollbar-measure";
        document.body.appendChild(scrollDiv);
        var scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
        document.body.removeChild(scrollDiv);
        this.calculatedScrollbarWidth = scrollbarHeight;
        return scrollbarHeight;
    };
    DomHandler.invokeElementMethod = function (element, methodName, args) {
        element[methodName].apply(element, args);
    };
    DomHandler.clearSelection = function () {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
                window.getSelection().removeAllRanges();
            }
        }
        else if (document['selection'] && document['selection'].empty) {
            try {
                document['selection'].empty();
            }
            catch (error) {
                //ignore IE bug
            }
        }
    };
    DomHandler.getBrowser = function () {
        if (!this.browser) {
            var matched = this.resolveUserAgent();
            this.browser = {};
            if (matched.browser) {
                this.browser[matched.browser] = true;
                this.browser['version'] = matched.version;
            }
            if (this.browser['chrome']) {
                this.browser['webkit'] = true;
            }
            else if (this.browser['webkit']) {
                this.browser['safari'] = true;
            }
        }
        return this.browser;
    };
    DomHandler.resolveUserAgent = function () {
        var ua = navigator.userAgent.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };
    DomHandler.isInteger = function (value) {
        if (Number.isInteger) {
            return Number.isInteger(value);
        }
        else {
            return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
        }
    };
    DomHandler.isHidden = function (element) {
        return element.offsetParent === null;
    };
    DomHandler.getFocusableElements = function (element) {
        var e_1, _a;
        var focusableElements = DomHandler.find(element, "button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), \n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), \n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), \n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), \n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])");
        var visibleFocusableElements = [];
        try {
            for (var focusableElements_1 = __values(focusableElements), focusableElements_1_1 = focusableElements_1.next(); !focusableElements_1_1.done; focusableElements_1_1 = focusableElements_1.next()) {
                var focusableElement = focusableElements_1_1.value;
                if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden")
                    visibleFocusableElements.push(focusableElement);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (focusableElements_1_1 && !focusableElements_1_1.done && (_a = focusableElements_1.return)) _a.call(focusableElements_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return visibleFocusableElements;
    };
    DomHandler.zindex = 1000;
    DomHandler.calculatedScrollbarWidth = null;
    DomHandler.calculatedScrollbarHeight = null;
    return DomHandler;
}());
export { DomHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZG9tLyIsInNvdXJjZXMiOlsiZG9taGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSCxXQUFXO0FBQ1g7SUFBQTtJQTRoQkEsQ0FBQztJQWxoQmlCLG1CQUFRLEdBQXRCLFVBQXVCLE9BQVksRUFBRSxTQUFpQjtRQUNsRCxJQUFJLE9BQU8sQ0FBQyxTQUFTO1lBQ2pCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztZQUVqQyxPQUFPLENBQUMsU0FBUyxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7SUFDN0MsQ0FBQztJQUVhLDZCQUFrQixHQUFoQyxVQUFpQyxPQUFZLEVBQUUsU0FBaUI7UUFDNUQsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksTUFBTSxHQUFhLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDO1NBRUo7YUFDSTtZQUNELElBQUksTUFBTSxHQUFhLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLE9BQU8sQ0FBQyxTQUFTLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QztTQUNKO0lBQ0wsQ0FBQztJQUVhLHNCQUFXLEdBQXpCLFVBQTBCLE9BQVksRUFBRSxT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bUhhbmRsZXIuYnJvd3NlclxyXG4gKlxyXG4gKiBJZiBkZWxldGUgYmVsb3cgY29tbWVudCwgd2UgY2FuIHNlZSB0aGlzIGVycm9yIG1lc3NhZ2U6XHJcbiAqICBNZXRhZGF0YSBjb2xsZWN0ZWQgY29udGFpbnMgYW4gZXJyb3IgdGhhdCB3aWxsIGJlIHJlcG9ydGVkIGF0IHJ1bnRpbWU6XHJcbiAqICBPbmx5IGluaXRpYWxpemVkIHZhcmlhYmxlcyBhbmQgY29uc3RhbnRzIGNhbiBiZSByZWZlcmVuY2VkXHJcbiAqICBiZWNhdXNlIHRoZSB2YWx1ZSBvZiB0aGlzIHZhcmlhYmxlIGlzIG5lZWRlZCBieSB0aGUgdGVtcGxhdGUgY29tcGlsZXIuXHJcbiAqL1xyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgRG9tSGFuZGxlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB6aW5kZXg6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNhbGN1bGF0ZWRTY3JvbGxiYXJIZWlnaHQ6IG51bWJlciA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYnJvd3NlcjogYW55O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdClcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhZGRNdWx0aXBsZUNsYXNzZXMoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVzOiBzdHJpbmdbXSA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0eWxlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVzOiBzdHJpbmdbXSA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gJyAnICsgc3R5bGVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdClcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIGNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGhhc0NsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpXHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWxlbWVudC5jbGFzc05hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2libGluZ3MoZWxlbWVudDogYW55KTogYW55IHtcclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZCAhPT0gZWxlbWVudDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmQoZWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYW55W10ge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZFNpbmdsZShlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZGV4KGVsZW1lbnQ6IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgbGV0IG51bSA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0gPT0gZWxlbWVudCkgcmV0dXJuIG51bTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldLm5vZGVUeXBlID09IDEpIG51bSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgaW5kZXhXaXRoaW5Hcm91cChlbGVtZW50OiBhbnksIGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gZWxlbWVudC5wYXJlbnROb2RlID8gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXMgOiBbXTtcclxuICAgICAgICBsZXQgbnVtID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXSA9PSBlbGVtZW50KSByZXR1cm4gbnVtO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0uYXR0cmlidXRlcyAmJiBjaGlsZHJlbltpXS5hdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdICYmIGNoaWxkcmVuW2ldLm5vZGVUeXBlID09IDEpIG51bSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWxhdGl2ZVBvc2l0aW9uKGVsZW1lbnQ6IGFueSwgdGFyZ2V0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZWxlbWVudERpbWVuc2lvbnMgPSBlbGVtZW50Lm9mZnNldFBhcmVudCA/IHsgd2lkdGg6IGVsZW1lbnQub2Zmc2V0V2lkdGgsIGhlaWdodDogZWxlbWVudC5vZmZzZXRIZWlnaHQgfSA6IHRoaXMuZ2V0SGlkZGVuRWxlbWVudERpbWVuc2lvbnMoZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBjb25zdCB0YXJnZXRPZmZzZXQgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3Qgdmlld3BvcnQgPSB0aGlzLmdldFZpZXdwb3J0KCk7XHJcbiAgICAgICAgbGV0IHRvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXI7XHJcblxyXG4gICAgICAgIGlmICgodGFyZ2V0T2Zmc2V0LnRvcCArIHRhcmdldEhlaWdodCArIGVsZW1lbnREaW1lbnNpb25zLmhlaWdodCkgPiB2aWV3cG9ydC5oZWlnaHQpIHtcclxuICAgICAgICAgICAgdG9wID0gLTEgKiAoZWxlbWVudERpbWVuc2lvbnMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldE9mZnNldC50b3AgKyB0b3AgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b3AgPSAtMSAqIHRhcmdldE9mZnNldC50b3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRvcCA9IHRhcmdldEhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50RGltZW5zaW9ucy53aWR0aCA+IHZpZXdwb3J0LndpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vIGVsZW1lbnQgd2lkZXIgdGhlbiB2aWV3cG9ydCBhbmQgY2Fubm90IGZpdCBvbiBzY3JlZW4gKGFsaWduIGF0IGxlZnQgc2lkZSBvZiB2aWV3cG9ydClcclxuICAgICAgICAgICAgbGVmdCA9IHRhcmdldE9mZnNldC5sZWZ0ICogLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCh0YXJnZXRPZmZzZXQubGVmdCArIGVsZW1lbnREaW1lbnNpb25zLndpZHRoKSA+IHZpZXdwb3J0LndpZHRoKSB7XHJcbiAgICAgICAgICAgIC8vIGVsZW1lbnQgd2lkZXIgdGhlbiB2aWV3cG9ydCBidXQgY2FuIGJlIGZpdCBvbiBzY3JlZW4gKGFsaWduIGF0IHJpZ2h0IHNpZGUgb2Ygdmlld3BvcnQpXHJcbiAgICAgICAgICAgIGxlZnQgPSAodGFyZ2V0T2Zmc2V0LmxlZnQgKyBlbGVtZW50RGltZW5zaW9ucy53aWR0aCAtIHZpZXdwb3J0LndpZHRoKSAqIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZWxlbWVudCBmaXRzIG9uIHNjcmVlbiAoYWxpZ24gd2l0aCB0YXJnZXQpXHJcbiAgICAgICAgICAgIGxlZnQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYWJzb2x1dGVQb3NpdGlvbihlbGVtZW50OiBhbnksIHRhcmdldDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnREaW1lbnNpb25zID0gZWxlbWVudC5vZmZzZXRQYXJlbnQgPyB7IHdpZHRoOiBlbGVtZW50Lm9mZnNldFdpZHRoLCBoZWlnaHQ6IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IH0gOiB0aGlzLmdldEhpZGRlbkVsZW1lbnREaW1lbnNpb25zKGVsZW1lbnQpO1xyXG4gICAgICAgIGxldCBlbGVtZW50T3V0ZXJIZWlnaHQgPSBlbGVtZW50RGltZW5zaW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRPdXRlcldpZHRoID0gZWxlbWVudERpbWVuc2lvbnMud2lkdGg7XHJcbiAgICAgICAgbGV0IHRhcmdldE91dGVySGVpZ2h0ID0gdGFyZ2V0Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgdGFyZ2V0T3V0ZXJXaWR0aCA9IHRhcmdldC5vZmZzZXRXaWR0aDtcclxuICAgICAgICBsZXQgdGFyZ2V0T2Zmc2V0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGxldCB3aW5kb3dTY3JvbGxUb3AgPSB0aGlzLmdldFdpbmRvd1Njcm9sbFRvcCgpO1xyXG4gICAgICAgIGxldCB3aW5kb3dTY3JvbGxMZWZ0ID0gdGhpcy5nZXRXaW5kb3dTY3JvbGxMZWZ0KCk7XHJcbiAgICAgICAgbGV0IHZpZXdwb3J0ID0gdGhpcy5nZXRWaWV3cG9ydCgpO1xyXG4gICAgICAgIGxldCB0b3AsIGxlZnQ7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXRPZmZzZXQudG9wICsgdGFyZ2V0T3V0ZXJIZWlnaHQgKyBlbGVtZW50T3V0ZXJIZWlnaHQgPiB2aWV3cG9ydC5oZWlnaHQpIHtcclxuICAgICAgICAgICAgdG9wID0gdGFyZ2V0T2Zmc2V0LnRvcCArIHdpbmRvd1Njcm9sbFRvcCAtIGVsZW1lbnRPdXRlckhlaWdodDtcclxuICAgICAgICAgICAgaWYgKHRvcCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRvcCA9IHdpbmRvd1Njcm9sbFRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRvcCA9IHRhcmdldE91dGVySGVpZ2h0ICsgdGFyZ2V0T2Zmc2V0LnRvcCArIHdpbmRvd1Njcm9sbFRvcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXRPZmZzZXQubGVmdCArIGVsZW1lbnRPdXRlcldpZHRoID4gdmlld3BvcnQud2lkdGgpXHJcbiAgICAgICAgICAgIGxlZnQgPSBNYXRoLm1heCgwLCB0YXJnZXRPZmZzZXQubGVmdCArIHdpbmRvd1Njcm9sbExlZnQgKyB0YXJnZXRPdXRlcldpZHRoIC0gZWxlbWVudE91dGVyV2lkdGgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgbGVmdCA9IHRhcmdldE9mZnNldC5sZWZ0ICsgd2luZG93U2Nyb2xsTGVmdDtcclxuXHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SGlkZGVuRWxlbWVudE91dGVySGVpZ2h0KGVsZW1lbnQ6IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBsZXQgZWxlbWVudEhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SGlkZGVuRWxlbWVudE91dGVyV2lkdGgoZWxlbWVudDogYW55KTogbnVtYmVyIHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGxldCBlbGVtZW50V2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50V2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRIaWRkZW5FbGVtZW50RGltZW5zaW9ucyhlbGVtZW50OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCBkaW1lbnNpb25zOiBhbnkgPSB7fTtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGRpbWVuc2lvbnMud2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpbWVuc2lvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzY3JvbGxJblZpZXcoY29udGFpbmVyLCBpdGVtKSB7XHJcbiAgICAgICAgbGV0IGJvcmRlclRvcFZhbHVlOiBzdHJpbmcgPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikuZ2V0UHJvcGVydHlWYWx1ZSgnYm9yZGVyVG9wV2lkdGgnKTtcclxuICAgICAgICBsZXQgYm9yZGVyVG9wOiBudW1iZXIgPSBib3JkZXJUb3BWYWx1ZSA/IHBhcnNlRmxvYXQoYm9yZGVyVG9wVmFsdWUpIDogMDtcclxuICAgICAgICBsZXQgcGFkZGluZ1RvcFZhbHVlOiBzdHJpbmcgPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcikuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZ1RvcCcpO1xyXG4gICAgICAgIGxldCBwYWRkaW5nVG9wOiBudW1iZXIgPSBwYWRkaW5nVG9wVmFsdWUgPyBwYXJzZUZsb2F0KHBhZGRpbmdUb3BWYWx1ZSkgOiAwO1xyXG4gICAgICAgIGxldCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGxldCBpdGVtUmVjdCA9IGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IChpdGVtUmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgLSAoY29udGFpbmVyUmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgLSBib3JkZXJUb3AgLSBwYWRkaW5nVG9wO1xyXG4gICAgICAgIGxldCBzY3JvbGwgPSBjb250YWluZXIuc2Nyb2xsVG9wO1xyXG4gICAgICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gY29udGFpbmVyLmNsaWVudEhlaWdodDtcclxuICAgICAgICBsZXQgaXRlbUhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQoaXRlbSk7XHJcblxyXG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSBzY3JvbGwgKyBvZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChvZmZzZXQgKyBpdGVtSGVpZ2h0KSA+IGVsZW1lbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IHNjcm9sbCArIG9mZnNldCAtIGVsZW1lbnRIZWlnaHQgKyBpdGVtSGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZhZGVJbihlbGVtZW50LCBkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHJcbiAgICAgICAgbGV0IGxhc3QgPSArbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgb3BhY2l0eSA9IDA7XHJcbiAgICAgICAgbGV0IHRpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9wYWNpdHkgPSArZWxlbWVudC5zdHlsZS5vcGFjaXR5LnJlcGxhY2UoXCIsXCIsIFwiLlwiKSArIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxhc3QpIC8gZHVyYXRpb247XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHk7XHJcbiAgICAgICAgICAgIGxhc3QgPSArbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgrb3BhY2l0eSA8IDEpIHtcclxuICAgICAgICAgICAgICAgICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICYmIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKSkgfHwgc2V0VGltZW91dCh0aWNrLCAxNik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmYWRlT3V0KGVsZW1lbnQsIG1zKSB7XHJcbiAgICAgICAgdmFyIG9wYWNpdHkgPSAxLFxyXG4gICAgICAgICAgICBpbnRlcnZhbCA9IDUwLFxyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IG1zLFxyXG4gICAgICAgICAgICBnYXAgPSBpbnRlcnZhbCAvIGR1cmF0aW9uO1xyXG5cclxuICAgICAgICBsZXQgZmFkaW5nID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBvcGFjaXR5ID0gb3BhY2l0eSAtIGdhcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcGFjaXR5IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChmYWRpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5O1xyXG4gICAgICAgIH0sIGludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFdpbmRvd1Njcm9sbFRvcCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFdpbmRvd1Njcm9sbExlZnQoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICAgIHJldHVybiAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBwID0gRWxlbWVudC5wcm90b3R5cGU7XHJcbiAgICAgICAgdmFyIGYgPSBwWydtYXRjaGVzJ10gfHwgcC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgcFsnbW96TWF0Y2hlc1NlbGVjdG9yJ10gfHwgcFsnbXNNYXRjaGVzU2VsZWN0b3InXSB8fCBmdW5jdGlvbiAocykge1xyXG4gICAgICAgICAgICByZXR1cm4gW10uaW5kZXhPZi5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocyksIHRoaXMpICE9PSAtMTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBmLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T3V0ZXJXaWR0aChlbCwgbWFyZ2luPykge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xyXG5cclxuICAgICAgICBpZiAobWFyZ2luKSB7XHJcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgICAgICAgICB3aWR0aCArPSBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkxlZnQpICsgcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5SaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRIb3Jpem9udGFsUGFkZGluZyhlbCkge1xyXG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1JpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEhvcml6b250YWxNYXJnaW4oZWwpIHtcclxuICAgICAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5MZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luUmlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5uZXJXaWR0aChlbCkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG5cclxuICAgICAgICB3aWR0aCArPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1JpZ2h0KTtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB3aWR0aChlbCkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG5cclxuICAgICAgICB3aWR0aCAtPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1JpZ2h0KTtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5uZXJIZWlnaHQoZWwpIHtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG5cclxuICAgICAgICBoZWlnaHQgKz0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSk7XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE91dGVySGVpZ2h0KGVsLCBtYXJnaW4/KSB7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IGVsLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKG1hcmdpbikge1xyXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuICAgICAgICAgICAgaGVpZ2h0ICs9IHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luQm90dG9tKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRIZWlnaHQoZWwpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XHJcblxyXG4gICAgICAgIGhlaWdodCAtPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nQm90dG9tKSArIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XHJcblxyXG4gICAgICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRXaWR0aChlbCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XHJcblxyXG4gICAgICAgIHdpZHRoIC09IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0xlZnQpICsgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nUmlnaHQpICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJMZWZ0V2lkdGgpICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJSaWdodFdpZHRoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Vmlld3BvcnQoKTogYW55IHtcclxuICAgICAgICBsZXQgd2luID0gd2luZG93LFxyXG4gICAgICAgICAgICBkID0gZG9jdW1lbnQsXHJcbiAgICAgICAgICAgIGUgPSBkLmRvY3VtZW50RWxlbWVudCxcclxuICAgICAgICAgICAgZyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSxcclxuICAgICAgICAgICAgdyA9IHdpbi5pbm5lcldpZHRoIHx8IGUuY2xpZW50V2lkdGggfHwgZy5jbGllbnRXaWR0aCxcclxuICAgICAgICAgICAgaCA9IHdpbi5pbm5lckhlaWdodCB8fCBlLmNsaWVudEhlaWdodCB8fCBnLmNsaWVudEhlaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHcsIGhlaWdodDogaCB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE9mZnNldChlbCkge1xyXG4gICAgICAgIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVwbGFjZUVsZW1lbnRXaXRoKGVsZW1lbnQ6IGFueSwgcmVwbGFjZW1lbnRFbGVtZW50OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgICAgIGlmICghcGFyZW50Tm9kZSkgXHJcbiAgICAgICAgICAgIHRocm93IGBDYW4ndCByZXBsYWNlIGVsZW1lbnRgO1xyXG4gICAgICAgIHJldHVybiBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZChyZXBsYWNlbWVudEVsZW1lbnQsIGVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyAgaXNJRSgpIHtcclxuICAgICAgICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuXHJcbiAgICAgICAgdmFyIG1zaWUgPSB1YS5pbmRleE9mKCdNU0lFICcpO1xyXG4gICAgICAgIGlmIChtc2llID4gMCkge1xyXG4gICAgICAgICAgICAvLyBJRSAxMCBvciBvbGRlciA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdHJpZGVudCA9IHVhLmluZGV4T2YoJ1RyaWRlbnQvJyk7XHJcbiAgICAgICAgaWYgKHRyaWRlbnQgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIElFIDExID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxyXG4gICAgICAgICAgICB2YXIgcnYgPSB1YS5pbmRleE9mKCdydjonKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZWRnZSA9IHVhLmluZGV4T2YoJ0VkZ2UvJyk7XHJcbiAgICAgICAgaWYgKGVkZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgLy8gRWRnZSAoSUUgMTIrKSA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcclxuICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG90aGVyIGJyb3dzZXJcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0lPUygpIHtcclxuICAgICAgICByZXR1cm4gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIXdpbmRvd1snTVNTdHJlYW0nXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzQW5kcm9pZCgpIHtcclxuICAgICAgICByZXR1cm4gLyhhbmRyb2lkKS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGFwcGVuZENoaWxkKGVsZW1lbnQ6IGFueSwgdGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VsZW1lbnQodGFyZ2V0KSlcclxuICAgICAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC5lbCAmJiB0YXJnZXQuZWwubmF0aXZlRWxlbWVudClcclxuICAgICAgICAgICAgdGFyZ2V0LmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aHJvdyAnQ2Fubm90IGFwcGVuZCAnICsgdGFyZ2V0ICsgJyB0byAnICsgZWxlbWVudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVDaGlsZChlbGVtZW50OiBhbnksIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbGVtZW50KHRhcmdldCkpXHJcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgICBlbHNlIGlmICh0YXJnZXQuZWwgJiYgdGFyZ2V0LmVsLm5hdGl2ZUVsZW1lbnQpXHJcbiAgICAgICAgICAgIHRhcmdldC5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhyb3cgJ0Nhbm5vdCByZW1vdmUgJyArIGVsZW1lbnQgKyAnIGZyb20gJyArIHRhcmdldDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBpc0VsZW1lbnQob2JqOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gKHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gXCJvYmplY3RcIiA/IG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IDpcclxuICAgICAgICAgICAgb2JqICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgb2JqICE9PSBudWxsICYmIG9iai5ub2RlVHlwZSA9PT0gMSAmJiB0eXBlb2Ygb2JqLm5vZGVOYW1lID09PSBcInN0cmluZ1wiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBjYWxjdWxhdGVTY3JvbGxiYXJXaWR0aChlbD86IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZWwub2Zmc2V0V2lkdGggLSBlbC5jbGllbnRXaWR0aCAtIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyTGVmdFdpZHRoKSAtIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyUmlnaHRXaWR0aCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIHNjcm9sbERpdi5jbGFzc05hbWUgPSBcInVpLXNjcm9sbGJhci1tZWFzdXJlXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxiYXJXaWR0aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjYWxjdWxhdGVTY3JvbGxiYXJIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0ICE9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHNjcm9sbERpdi5jbGFzc05hbWUgPSBcInVpLXNjcm9sbGJhci1tZWFzdXJlXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsYmFySGVpZ2h0ID0gc2Nyb2xsRGl2Lm9mZnNldEhlaWdodCAtIHNjcm9sbERpdi5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCA9IHNjcm9sbGJhckhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gc2Nyb2xsYmFySGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGludm9rZUVsZW1lbnRNZXRob2QoZWxlbWVudDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M/OiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIChlbGVtZW50IGFzIGFueSlbbWV0aG9kTmFtZV0uYXBwbHkoZWxlbWVudCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJTZWxlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLmVtcHR5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcyAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmFuZ2VDb3VudCA+IDAgJiYgd2luZG93LmdldFNlbGVjdGlvbigpLmdldFJhbmdlQXQoMCkuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnRbJ3NlbGVjdGlvbiddICYmIGRvY3VtZW50WydzZWxlY3Rpb24nXS5lbXB0eSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmVtcHR5KCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vaWdub3JlIElFIGJ1Z1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QnJvd3NlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYnJvd3Nlcikge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IHRoaXMucmVzb2x2ZVVzZXJBZ2VudCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJyb3dzZXIgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaGVkLmJyb3dzZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnJvd3NlclttYXRjaGVkLmJyb3dzZXJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnJvd3NlclsndmVyc2lvbiddID0gbWF0Y2hlZC52ZXJzaW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5icm93c2VyWydjaHJvbWUnXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icm93c2VyWyd3ZWJraXQnXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5icm93c2VyWyd3ZWJraXQnXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5icm93c2VyWydzYWZhcmknXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmJyb3dzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXNvbHZlVXNlckFnZW50KCkge1xyXG4gICAgICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBsZXQgbWF0Y2ggPSAvKGNocm9tZSlbIFxcL10oW1xcdy5dKykvLmV4ZWModWEpIHx8XHJcbiAgICAgICAgICAgIC8od2Via2l0KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHxcclxuICAgICAgICAgICAgLyhvcGVyYSkoPzouKnZlcnNpb258KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHxcclxuICAgICAgICAgICAgLyhtc2llKSAoW1xcdy5dKykvLmV4ZWModWEpIHx8XHJcbiAgICAgICAgICAgIHVhLmluZGV4T2YoXCJjb21wYXRpYmxlXCIpIDwgMCAmJiAvKG1vemlsbGEpKD86Lio/IHJ2OihbXFx3Ll0rKXwpLy5leGVjKHVhKSB8fFxyXG4gICAgICAgICAgICBbXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYnJvd3NlcjogbWF0Y2hbMV0gfHwgXCJcIixcclxuICAgICAgICAgICAgdmVyc2lvbjogbWF0Y2hbMl0gfHwgXCIwXCJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNJbnRlZ2VyKHZhbHVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0hpZGRlbihlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50Lm9mZnNldFBhcmVudCA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEZvY3VzYWJsZUVsZW1lbnRzKGVsZW1lbnQ6SFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSBEb21IYW5kbGVyLmZpbmQoZWxlbWVudCxgYnV0dG9uOm5vdChbdGFiaW5kZXggPSBcIi0xXCJdKTpub3QoW2Rpc2FibGVkXSk6bm90KFtzdHlsZSo9XCJkaXNwbGF5Om5vbmVcIl0pOm5vdChbaGlkZGVuXSksIFxyXG4gICAgICAgICAgICAgICAgW2hyZWZdW2NsaWVudEhlaWdodF1bY2xpZW50V2lkdGhdOm5vdChbdGFiaW5kZXggPSBcIi0xXCJdKTpub3QoW2Rpc2FibGVkXSk6bm90KFtzdHlsZSo9XCJkaXNwbGF5Om5vbmVcIl0pOm5vdChbaGlkZGVuXSksIFxyXG4gICAgICAgICAgICAgICAgaW5wdXQ6bm90KFt0YWJpbmRleCA9IFwiLTFcIl0pOm5vdChbZGlzYWJsZWRdKTpub3QoW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXSk6bm90KFtoaWRkZW5dKSwgc2VsZWN0Om5vdChbdGFiaW5kZXggPSBcIi0xXCJdKTpub3QoW2Rpc2FibGVkXSk6bm90KFtzdHlsZSo9XCJkaXNwbGF5Om5vbmVcIl0pOm5vdChbaGlkZGVuXSksIFxyXG4gICAgICAgICAgICAgICAgdGV4dGFyZWE6bm90KFt0YWJpbmRleCA9IFwiLTFcIl0pOm5vdChbZGlzYWJsZWRdKTpub3QoW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXSk6bm90KFtoaWRkZW5dKSwgW3RhYkluZGV4XTpub3QoW3RhYkluZGV4ID0gXCItMVwiXSk6bm90KFtkaXNhYmxlZF0pOm5vdChbc3R5bGUqPVwiZGlzcGxheTpub25lXCJdKTpub3QoW2hpZGRlbl0pLCBcclxuICAgICAgICAgICAgICAgIFtjb250ZW50ZWRpdGFibGVdOm5vdChbdGFiSW5kZXggPSBcIi0xXCJdKTpub3QoW2Rpc2FibGVkXSk6bm90KFtzdHlsZSo9XCJkaXNwbGF5Om5vbmVcIl0pOm5vdChbaGlkZGVuXSlgXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZUZvY3VzYWJsZUVsZW1lbnRzID0gW107XHJcbiAgICAgICAgICAgIGZvcihsZXQgZm9jdXNhYmxlRWxlbWVudCBvZiBmb2N1c2FibGVFbGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUoZm9jdXNhYmxlRWxlbWVudCkuZGlzcGxheSAhPSBcIm5vbmVcIiAmJiBnZXRDb21wdXRlZFN0eWxlKGZvY3VzYWJsZUVsZW1lbnQpLnZpc2liaWxpdHkgIT0gXCJoaWRkZW5cIilcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlRm9jdXNhYmxlRWxlbWVudHMucHVzaChmb2N1c2FibGVFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2aXNpYmxlRm9jdXNhYmxlRWxlbWVudHM7XHJcbiAgICB9XHJcbn1cclxuIl19