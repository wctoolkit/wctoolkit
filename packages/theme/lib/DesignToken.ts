/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
import { ThemeMode, ThemeDensity } from './Types.js';
import { DesignTokenValues } from './DesignTokenValues.js';

export class DesignToken {
    private _name: string;
    private _cssVariable: string;
    private _values: DesignTokenValues;

    constructor(name: string, values: any = null) {
        if (!values) {
            throw 'A design token must have a value.';
        }

        this._name = name.toLowerCase();
        this._cssVariable = `--${this._name}`;
        this._values = new DesignTokenValues(values);
    }

    get name(): string {
        return this._name;
    }

    get cssVariable(): string {
        return this._cssVariable;
    }

    get hasDarkValue(): boolean {
        return this._values.hasDarkValue;
    }

    getValue(mode: ThemeMode = 'system', density: ThemeDensity = 'comfortable') {
        return this._values.getValue(mode, density);
    }
}