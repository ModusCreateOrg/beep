import { convertFormatToKey, convertToArrayOfNumbers, convertToArrayOfStrings, dateDataSortValue, dateSortValue, dateValueRange, daysInMonth, getValueFromFormat, parseDate, parseTemplate, renderDatetime, renderTextFormat, updateDate } from './datetime-util';
import { clamp, deferEvent } from '../../utils/helpers';
export class Datetime {
    constructor() {
        this.inputId = `ion-dt-${datetimeIds++}`;
        this.labelId = `${this.inputId}-lbl`;
        this.locale = {};
        this.datetimeMin = {};
        this.datetimeMax = {};
        this.datetimeValue = {};
        /**
         * If true, the user cannot interact with the datetime. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * The display format of the date and time as text that shows
         * within the item. When the `pickerFormat` input is not used, then the
         * `displayFormat` is used for both display the formatted text, and determining
         * the datetime picker's columns. See the `pickerFormat` input description for
         * more info. Defaults to `MMM D, YYYY`.
         */
        this.displayFormat = 'MMM D, YYYY';
        /**
         * The text to display on the picker's cancel button. Default: `Cancel`.
         */
        this.cancelText = 'Cancel';
        /**
         * The text to display on the picker's "Done" button. Default: `Done`.
         */
        this.doneText = 'Done';
        /**
         * Any additional options that the picker interface can accept.
         * See the [Picker API docs](../../picker/Picker) for the picker options.
         */
        this.pickerOptions = {
            buttons: [],
            columns: []
        };
    }
    disabledChanged() {
        this.emitStyle();
    }
    /**
     * Update the datetime value when the value changes
     */
    valueChanged() {
        this.updateValue();
        this.emitStyle();
    }
    componentWillLoad() {
        // first see if locale names were provided in the inputs
        // then check to see if they're in the config
        // if neither were provided then it will use default English names
        this.ionStyle = deferEvent(this.ionStyle);
        this.locale = {
            // this.locale[type] = convertToArrayOfStrings((this[type] ? this[type] : this.config.get(type), type);
            monthNames: convertToArrayOfStrings(this.monthNames, 'monthNames'),
            monthShortNames: convertToArrayOfStrings(this.monthShortNames, 'monthShortNames'),
            dayNames: convertToArrayOfStrings(this.dayNames, 'dayNames'),
            dayShortNames: convertToArrayOfStrings(this.dayShortNames, 'dayShortNames')
        };
        this.updateValue();
    }
    componentDidLoad() {
        this.emitStyle();
    }
    emitStyle() {
        this.ionStyle.emit({
            'interactive': true,
            'datetime': true,
            'datetime-disabled': this.disabled,
            'input-has-value': this.hasValue()
        });
    }
    updateValue() {
        updateDate(this.datetimeValue, this.value);
        this.updateText();
    }
    buildPicker(pickerOptions) {
        console.debug('Build Datetime: Picker with', pickerOptions);
        // If the user has not passed in picker buttons,
        // add a cancel and ok button to the picker
        const buttons = pickerOptions.buttons;
        if (!buttons || buttons.length === 0) {
            pickerOptions.buttons = [
                {
                    text: this.cancelText,
                    role: 'cancel',
                    handler: () => this.ionCancel.emit()
                },
                {
                    text: this.doneText,
                    handler: (data) => this.value = data,
                }
            ];
        }
        pickerOptions.columns = this.generateColumns();
        const picker = this.pickerCtrl.create(pickerOptions);
        console.debug('Built Datetime: Picker with', pickerOptions);
        return picker;
    }
    async open() {
        // TODO check this.isFocus() || this.disabled
        if (this.disabled) {
            return;
        }
        const pickerOptions = Object.assign({}, this.pickerOptions);
        this.picker = await this.buildPicker(pickerOptions);
        this.validate();
        await this.picker.present();
    }
    generateColumns() {
        let columns = [];
        // if a picker format wasn't provided, then fallback
        // to use the display format
        let template = this.pickerFormat || this.displayFormat || DEFAULT_FORMAT;
        if (template) {
            // make sure we've got up to date sizing information
            this.calcMinMax();
            // does not support selecting by day name
            // automaticallly remove any day name formats
            template = template.replace('DDDD', '{~}').replace('DDD', '{~}');
            if (template.indexOf('D') === -1) {
                // there is not a day in the template
                // replace the day name with a numeric one if it exists
                template = template.replace('{~}', 'D');
            }
            // make sure no day name replacer is left in the string
            template = template.replace(/{~}/g, '');
            // parse apart the given template into an array of "formats"
            parseTemplate(template).forEach((format) => {
                // loop through each format in the template
                // create a new picker column to build up with data
                const key = convertFormatToKey(format);
                let values;
                // check if they have exact values to use for this date part
                // otherwise use the default date part values
                values = this[key + 'Values']
                    ? convertToArrayOfNumbers(this[key + 'Values'], key)
                    : dateValueRange(format, this.datetimeMin, this.datetimeMax);
                const column = {
                    name: key,
                    selectedIndex: 0,
                    options: values.map(val => {
                        return {
                            value: val,
                            text: renderTextFormat(format, val, null, this.locale),
                        };
                    })
                };
                // cool, we've loaded up the columns with options
                // preselect the option for this column
                const optValue = getValueFromFormat(this.datetimeValue, format);
                const selectedIndex = column.options.findIndex(opt => opt.value === optValue);
                if (selectedIndex >= 0) {
                    // set the select index for this column's options
                    column.selectedIndex = selectedIndex;
                }
                // add our newly created column to the picker
                columns.push(column);
            });
            // Normalize min/max
            const min = this.datetimeMin;
            const max = this.datetimeMax;
            ['month', 'day', 'hour', 'minute']
                .filter(name => !columns.find(column => column.name === name))
                .forEach(name => {
                min[name] = 0;
                max[name] = 0;
            });
            columns = this.divyColumns(columns);
        }
        return columns;
    }
    validate() {
        const today = new Date();
        const minCompareVal = dateDataSortValue(this.datetimeMin);
        const maxCompareVal = dateDataSortValue(this.datetimeMax);
        const yearCol = this.picker.getColumn('year');
        let selectedYear = today.getFullYear();
        if (yearCol) {
            // default to the first value if the current year doesn't exist in the options
            if (!yearCol.options.find(col => col.value === today.getFullYear())) {
                selectedYear = yearCol.options[0].value;
            }
            const selectedIndex = yearCol.selectedIndex;
            if (selectedIndex != null) {
                const yearOpt = yearCol.options[selectedIndex];
                if (yearOpt) {
                    // they have a selected year value
                    selectedYear = yearOpt.value;
                }
            }
        }
        const selectedMonth = this.validateColumn('month', 1, minCompareVal, maxCompareVal, [selectedYear, 0, 0, 0, 0], [selectedYear, 12, 31, 23, 59]);
        const numDaysInMonth = daysInMonth(selectedMonth, selectedYear);
        const selectedDay = this.validateColumn('day', 2, minCompareVal, maxCompareVal, [selectedYear, selectedMonth, 0, 0, 0], [selectedYear, selectedMonth, numDaysInMonth, 23, 59]);
        const selectedHour = this.validateColumn('hour', 3, minCompareVal, maxCompareVal, [selectedYear, selectedMonth, selectedDay, 0, 0], [selectedYear, selectedMonth, selectedDay, 23, 59]);
        this.validateColumn('minute', 4, minCompareVal, maxCompareVal, [selectedYear, selectedMonth, selectedDay, selectedHour, 0], [selectedYear, selectedMonth, selectedDay, selectedHour, 59]);
    }
    calcMinMax(now) {
        const todaysYear = (now || new Date()).getFullYear();
        if (this.yearValues) {
            const years = convertToArrayOfNumbers(this.yearValues, 'year');
            if (this.min == null) {
                this.min = Math.min.apply(Math, years);
            }
            if (this.max == null) {
                this.max = Math.max.apply(Math, years);
            }
        }
        else {
            if (this.min == null) {
                this.min = (todaysYear - 100).toString();
            }
            if (this.max == null) {
                this.max = todaysYear.toString();
            }
        }
        const min = this.datetimeMin = parseDate(this.min);
        const max = this.datetimeMax = parseDate(this.max);
        min.year = min.year || todaysYear;
        max.year = max.year || todaysYear;
        min.month = min.month || 1;
        max.month = max.month || 12;
        min.day = min.day || 1;
        max.day = max.day || 31;
        min.hour = min.hour || 0;
        max.hour = max.hour || 23;
        min.minute = min.minute || 0;
        max.minute = max.minute || 59;
        min.second = min.second || 0;
        max.second = max.second || 59;
        // Ensure min/max constraits
        if (min.year > max.year) {
            console.error('min.year > max.year');
            min.year = max.year - 100;
        }
        if (min.year === max.year) {
            if (min.month > max.month) {
                console.error('min.month > max.month');
                min.month = 1;
            }
            else if (min.month === max.month && min.day > max.day) {
                console.error('min.day > max.day');
                min.day = 1;
            }
        }
    }
    validateColumn(name, index, min, max, lowerBounds, upperBounds) {
        const column = this.picker.getColumn(name);
        if (!column) {
            return 0;
        }
        const lb = lowerBounds.slice();
        const ub = upperBounds.slice();
        const options = column.options;
        let indexMin = options.length - 1;
        let indexMax = 0;
        for (let i = 0; i < options.length; i++) {
            const opt = options[i];
            const value = opt.value;
            lb[index] = opt.value;
            ub[index] = opt.value;
            const disabled = opt.disabled = (value < lowerBounds[index] ||
                value > upperBounds[index] ||
                dateSortValue(ub[0], ub[1], ub[2], ub[3], ub[4]) < min ||
                dateSortValue(lb[0], lb[1], lb[2], lb[3], lb[4]) > max);
            if (!disabled) {
                indexMin = Math.min(indexMin, i);
                indexMax = Math.max(indexMax, i);
            }
        }
        const selectedIndex = column.selectedIndex = clamp(indexMin, column.selectedIndex, indexMax);
        const opt = column.options[selectedIndex];
        if (opt) {
            return opt.value;
        }
        return 0;
    }
    divyColumns(columns) {
        const pickerColumns = columns;
        const columnsWidth = [];
        let col;
        let width;
        for (let i = 0; i < pickerColumns.length; i++) {
            col = pickerColumns[i];
            columnsWidth.push(0);
            for (let j = 0; j < col.options.length; j++) {
                width = col.options[j].text.length;
                if (width > columnsWidth[i]) {
                    columnsWidth[i] = width;
                }
            }
        }
        if (columnsWidth.length === 2) {
            width = Math.max(columnsWidth[0], columnsWidth[1]);
            pickerColumns[0].align = 'right';
            pickerColumns[1].align = 'left';
            pickerColumns[0].optionsWidth = pickerColumns[1].optionsWidth = `${width * 17}px`;
        }
        else if (columnsWidth.length === 3) {
            width = Math.max(columnsWidth[0], columnsWidth[2]);
            pickerColumns[0].align = 'right';
            pickerColumns[1].columnWidth = `${columnsWidth[1] * 17}px`;
            pickerColumns[0].optionsWidth = pickerColumns[2].optionsWidth = `${width * 17}px`;
            pickerColumns[2].align = 'left';
        }
        return columns;
    }
    /**
     */
    updateText() {
        // create the text of the formatted data
        const template = this.displayFormat || this.pickerFormat || DEFAULT_FORMAT;
        // debugger;
        this.text = renderDatetime(template, this.datetimeValue, this.locale);
    }
    /**
     */
    hasValue() {
        const val = this.datetimeValue;
        return val
            && typeof val === 'object'
            && Object.keys(val).length > 0;
    }
    hostData() {
        return {
            class: {
                'datetime-disabled': this.disabled
            }
        };
    }
    render() {
        let addPlaceholderClass = false;
        // If selected text has been passed in, use that first
        let datetimeText = this.text;
        if (datetimeText == null) {
            if (this.placeholder) {
                datetimeText = this.placeholder;
                addPlaceholderClass = true;
            }
            else {
                datetimeText = '';
            }
        }
        const datetimeTextClasses = {
            'datetime-text': true,
            'datetime-placeholder': addPlaceholderClass
        };
        return [
            h("div", { class: datetimeTextClasses }, datetimeText),
            h("button", { type: "button", "aria-haspopup": "true", id: this.datetimeId, "aria-labelledby": this.labelId, "aria-disabled": this.disabled ? 'true' : false, onClick: this.open.bind(this), class: "datetime-cover" }, this.mode === 'md' && h("ion-ripple-effect", { tapClick: true }))
        ];
    }
    static get is() { return "ion-datetime"; }
    static get host() { return {
        "theme": "datetime"
    }; }
    static get properties() { return {
        "cancelText": {
            "type": String,
            "attr": "cancel-text"
        },
        "dayNames": {
            "type": String,
            "attr": "day-names"
        },
        "dayShortNames": {
            "type": String,
            "attr": "day-short-names"
        },
        "dayValues": {
            "type": "Any",
            "attr": "day-values"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "watchCallbacks": ["disabledChanged"]
        },
        "displayFormat": {
            "type": String,
            "attr": "display-format"
        },
        "doneText": {
            "type": String,
            "attr": "done-text"
        },
        "hourValues": {
            "type": "Any",
            "attr": "hour-values"
        },
        "max": {
            "type": String,
            "attr": "max",
            "mutable": true
        },
        "min": {
            "type": String,
            "attr": "min",
            "mutable": true
        },
        "minuteValues": {
            "type": "Any",
            "attr": "minute-values"
        },
        "monthNames": {
            "type": String,
            "attr": "month-names"
        },
        "monthShortNames": {
            "type": String,
            "attr": "month-short-names"
        },
        "monthValues": {
            "type": "Any",
            "attr": "month-values"
        },
        "pickerCtrl": {
            "connect": "ion-picker-controller"
        },
        "pickerFormat": {
            "type": String,
            "attr": "picker-format"
        },
        "pickerOptions": {
            "type": "Any",
            "attr": "picker-options"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "text": {
            "state": true
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["valueChanged"]
        },
        "yearValues": {
            "type": "Any",
            "attr": "year-values"
        }
    }; }
    static get events() { return [{
            "name": "ionCancel",
            "method": "ionCancel",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionStyle",
            "method": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ion-datetime:**/"; }
    static get styleMode() { return "/**style-id-placeholder:ion-datetime:**/"; }
}
let datetimeIds = 0;
const DEFAULT_FORMAT = 'MMM D, YYYY';
