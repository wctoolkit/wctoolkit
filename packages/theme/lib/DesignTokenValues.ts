/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
import { ThemeMode, ThemeDensity, DesignTokenShape } from './Types.js';

export class DesignTokenValues {
    private _values: DesignTokenShape;
    private _valueMap: Map<string, string> = new Map<string, string>();
    private _hasDarkValue: boolean = false;

    static _convertValue(value: string): string {
        return value
            .replace(/({[^{]*?)\w(?=\})}/igm, (match) => `var(--${match.replace(/[{}]/g, '').replace(/\s*:\s*/, ', ')})`)
            .replace('{', 'var(--')
            .replace('}', ')')
            .replace(/\s*:\s*/, ', ');
    }

    constructor(values: DesignTokenShape) {
        this._values = values;
        this._valueMap = new Map();
        this._hasDarkValue = (this._values) ? (this._values['dark'] ? true : false) : false;
    }

    get hasDarkValue(): boolean {
        return this._hasDarkValue;
    }

    getValue(mode: ThemeMode = 'system', density: ThemeDensity = 'comfortable', data: DesignTokenShape = null): string | null {
        const key: string = `${mode}:${density}`;
        let result = null;

        if (this._valueMap.has(key)) {
            return this._valueMap.get(key) ?? null;
        }

        const val: any = data || this._values;

        if (typeof val === 'string') {
            result = DesignTokenValues._convertValue(val);
        } else {
            if (val.compact || val.comfortable || val.sparse) {
                if (val[density]) {
                    result = this.getValue(mode, density, val[density]);
                } else if (val.comfortable) {
                    result = this.getValue(mode, density, val.comfortable);
                }
                else if (val.compact) {
                    result = this.getValue(mode, density, val.compact);
                }
                else if (val.sparse) {
                    result = this.getValue(mode, density, val.sparse);
                }
            } else if (val.system || val.light || val.dark) {
                if (val[mode]) {
                    result = this.getValue(mode, density, val[mode]);
                } else if (val.system || val.light) {
                    result = this.getValue(mode, density, val.light);
                } else if (val.dark) {
                    result = this.getValue(mode, density, val.dark);
                }
            }
        }

        if ((result !== null) && (result !== undefined)) {
            this._valueMap.set(key, result);
        }

        return result;
    }
}