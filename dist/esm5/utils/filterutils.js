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
import { ObjectUtils } from './objectutils';
var FilterUtils = /** @class */ (function () {
    function FilterUtils() {
    }
    FilterUtils.filter = function (value, fields, filterValue, filterMatchMode, filterLocale) {
        var e_1, _a, e_2, _b;
        var filteredItems = [];
        var filterText = ObjectUtils.removeAccents(filterValue).toLocaleLowerCase(filterLocale);
        if (value) {
            try {
                for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                    var item = value_1_1.value;
                    try {
                        for (var fields_1 = (e_2 = void 0, __values(fields)), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                            var field = fields_1_1.value;
                            var fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(item, field))).toLocaleLowerCase(filterLocale);
                            if (FilterUtils[filterMatchMode](fieldValue, filterText, filterLocale)) {
                                filteredItems.push(item);
                                break;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (fields_1_1 && !fields_1_1.done && (_b = fields_1.return)) _b.call(fields_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return filteredItems;
    };
    FilterUtils.startsWith = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        var filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.slice(0, filterValue.length) === filterValue;
    };
    FilterUtils.contains = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        var filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.indexOf(filterValue) !== -1;
    };
    FilterUtils.endsWith = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        var filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    };
    FilterUtils.equals = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() === filter.getTime();
        else
            return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
    };
    FilterUtils.notEquals = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return false;
        }
        if (value === undefined || value === null) {
            return true;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() !== filter.getTime();
        else
            return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
    };
    FilterUtils.in = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.length === 0) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        for (var i = 0; i < filter.length; i++) {
            if (ObjectUtils.equals(value, filter[i])) {
                return true;
            }
        }
        return false;
    };
    FilterUtils.lt = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() < filter.getTime();
        else
            return value < filter;
    };
    FilterUtils.lte = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() <= filter.getTime();
        else
            return value <= filter;
    };
    FilterUtils.gt = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() > filter.getTime();
        else
            return value > filter;
    };
    FilterUtils.gte = function (value, filter, filterLocale) {
        if (filter === undefined || filter === null) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() >= filter.getTime();
        else
            return value >= filter;
    };
    return FilterUtils;
}());
export { FilterUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVydXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3V0aWxzLyIsInNvdXJjZXMiOlsiZmlsdGVydXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDO0lBQUE7SUE4S0EsQ0FBQztJQTVLaUIsa0JBQU0sR0FBcEIsVUFBcUIsS0FBWSxFQUFFLE1BQWEsRUFBRSxXQUFtQixFQUFFLGVBQXVCLEVBQUUsWUFBcUI7O1FBQ2pILElBQUksYUFBYSxHQUFVLEVBQUUsQ0FBQztRQUM5QixJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXhGLElBQUksS0FBSyxFQUFFOztnQkFDUCxLQUFpQixJQUFBLFVBQUEsU0FBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7b0JBQW5CLElBQUksSUFBSSxrQkFBQTs7d0JBQ1QsS0FBa0IsSUFBQSwwQkFBQSxTQUFBLE1BQU0sQ0FBQSxDQUFBLDhCQUFBLGtEQUFFOzRCQUFyQixJQUFJLEtBQUssbUJBQUE7NEJBQ1YsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBRTlILElBQUksV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLEVBQUU7Z0NBQ3BFLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3pCLE1BQU07NkJBQ1Q7eUJBQ0o7Ozs7Ozs7OztpQkFDSjs7Ozs7Ozs7O1NBQ0o7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRWEsc0JBQVUs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QUM7O1lBRTNDLE9BQU8sS0FBSyxJQUFJLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBOUtELElBOEtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICcuL29iamVjdHV0aWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJVdGlscyB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXIodmFsdWU6IGFueVtdLCBmaWVsZHM6IGFueVtdLCBmaWx0ZXJWYWx1ZTogc3RyaW5nLCBmaWx0ZXJNYXRjaE1vZGU6IHN0cmluZywgZmlsdGVyTG9jYWxlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGZpbHRlcmVkSXRlbXM6IGFueVtdID0gW107XHJcbiAgICAgICAgbGV0IGZpbHRlclRleHQgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKGZpbHRlclZhbHVlKS50b0xvY2FsZUxvd2VyQ2FzZShmaWx0ZXJMb2NhbGUpO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGQgb2YgZmllbGRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGl0ZW0sIGZpZWxkKSkpLnRvTG9jYWxlTG93ZXJDYXNlKGZpbHRlckxvY2FsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChGaWx0ZXJVdGlsc1tmaWx0ZXJNYXRjaE1vZGVdKGZpZWxkVmFsdWUsIGZpbHRlclRleHQsIGZpbHRlckxvY2FsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmaWx0ZXJlZEl0ZW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RhcnRzV2l0aCh2YWx1ZSwgZmlsdGVyLCBmaWx0ZXJMb2NhbGU/KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHMoZmlsdGVyLnRvU3RyaW5nKCkpLnRvTG9jYWxlTG93ZXJDYXNlKGZpbHRlckxvY2FsZSk7XHJcbiAgICAgICAgbGV0IHN0cmluZ1ZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyh2YWx1ZS50b1N0cmluZygpKS50b0xvY2FsZUxvd2VyQ2FzZShmaWx0ZXJMb2NhbGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RyaW5nVmFsdWUuc2xpY2UoMCwgZmlsdGVyVmFsdWUubGVuZ3RoKSA9PT0gZmlsdGVyVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb250YWlucyh2YWx1ZSwgZmlsdGVyLCBmaWx0ZXJMb2NhbGU/KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycgJiYgZmlsdGVyLnRyaW0oKSA9PT0gJycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZpbHRlclZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXIudG9TdHJpbmcoKSkudG9Mb2NhbGVMb3dlckNhc2UoZmlsdGVyTG9jYWxlKTtcclxuICAgICAgICBsZXQgc3RyaW5nVmFsdWUgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKHZhbHVlLnRvU3RyaW5nKCkpLnRvTG9jYWxlTG93ZXJDYXNlKGZpbHRlckxvY2FsZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdHJpbmdWYWx1ZS5pbmRleE9mKGZpbHRlclZhbHVlKSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlbmRzV2l0aCh2YWx1ZSwgZmlsdGVyLCBmaWx0ZXJMb2NhbGU/KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHMoZmlsdGVyLnRvU3RyaW5nKCkpLnRvTG9jYWxlTG93ZXJDYXNlKGZpbHRlckxvY2FsZSk7XHJcbiAgICAgICAgbGV0IHN0cmluZ1ZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyh2YWx1ZS50b1N0cmluZygpKS50b0xvY2FsZUxvd2VyQ2FzZShmaWx0ZXJMb2NhbGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RyaW5nVmFsdWUuaW5kZXhPZihmaWx0ZXJWYWx1ZSwgc3RyaW5nVmFsdWUubGVuZ3RoIC0gZmlsdGVyVmFsdWUubGVuZ3RoKSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlcXVhbHModmFsdWUsIGZpbHRlciwgZmlsdGVyTG9jYWxlPyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXIgPT09IG51bGwgfHwgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnICYmIGZpbHRlci50cmltKCkgPT09ICcnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lICYmIGZpbHRlci5nZXRUaW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpID09PSBmaWx0ZXIuZ2V0VGltZSgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHModmFsdWUudG9TdHJpbmcoKSkudG9Mb2NhbGVMb3dlckNhc2UoZmlsdGVyTG9jYWxlKSA9PSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKGZpbHRlci50b1N0cmluZygpKS50b0xvY2FsZUxvd2VyQ2FzZShmaWx0ZXJMb2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbm90RXF1YWxzKHZhbHVlLCBmaWx0ZXIsIGZpbHRlckxvY2FsZT8pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsIHx8ICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJyAmJiBmaWx0ZXIudHJpbSgpID09PSAnJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUuZ2V0VGltZSAmJiBmaWx0ZXIuZ2V0VGltZSlcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmdldFRpbWUoKSAhPT0gZmlsdGVyLmdldFRpbWUoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKHZhbHVlLnRvU3RyaW5nKCkpLnRvTG9jYWxlTG93ZXJDYXNlKGZpbHRlckxvY2FsZSkgIT0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXIudG9TdHJpbmcoKSkudG9Mb2NhbGVMb3dlckNhc2UoZmlsdGVyTG9jYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluKHZhbHVlLCBmaWx0ZXI6IGFueVtdLCBmaWx0ZXJMb2NhbGU/KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWx0ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmVxdWFscyh2YWx1ZSwgZmlsdGVyW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGx0KHZhbHVlLCBmaWx0ZXIsIGZpbHRlckxvY2FsZT8pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlLmdldFRpbWUgJiYgZmlsdGVyLmdldFRpbWUpXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5nZXRUaW1lKCkgPCBmaWx0ZXIuZ2V0VGltZSgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlIDwgZmlsdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbHRlKHZhbHVlLCBmaWx0ZXIsIGZpbHRlckxvY2FsZT8pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlLmdldFRpbWUgJiYgZmlsdGVyLmdldFRpbWUpXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5nZXRUaW1lKCkgPD0gZmlsdGVyLmdldFRpbWUoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA8PSBmaWx0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBndCh2YWx1ZSwgZmlsdGVyLCBmaWx0ZXJMb2NhbGU/KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lICYmIGZpbHRlci5nZXRUaW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpID4gZmlsdGVyLmdldFRpbWUoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA+IGZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGd0ZSh2YWx1ZSwgZmlsdGVyLCBmaWx0ZXJMb2NhbGU/KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lICYmIGZpbHRlci5nZXRUaW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpID49IGZpbHRlci5nZXRUaW1lKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPj0gZmlsdGVyO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==