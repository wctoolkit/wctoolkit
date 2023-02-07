/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
import { ThemeMode, ThemeDensity, TextDirection } from './types.js';
import { BaseTheme } from './theme.js';
import { Icon } from './icon.js';

declare global {
    interface Window { themeManager: ThemeManager; }
}

declare global {
    interface Navigator { userAgentData: any; }
}

export class ThemeManager {
    private _themes: Map<string, BaseTheme> = new Map<string, BaseTheme>();
    private _activeTheme: BaseTheme = null;
    private _defaultThemeName: string = null;
    private _mode: ThemeMode;
    private _density: ThemeDensity = 'comfortable';
    private _iconVariant: string = 'default';
    private _dir: TextDirection = 'ltr';

    constructor(mode: ThemeMode = 'system') {
        this._mode = mode;
        this._iconVariant = 'default';
    }

    get dir(): TextDirection {
        return this._dir;
    }

    set dir(value: TextDirection) {
        if (value !== this._dir) {
            this._dir = value;
            document.documentElement.dir = this._dir;
        }
    }

    get iconVariant(): string {
        return this._iconVariant;
    }

    set iconVariant(value: string) {
        if (this._iconVariant !== value) {
            this._iconVariant = value;

            if (this._activeTheme) {
                this.use(this._activeTheme.name);
            }
        }
    }

    get iconVariants(): Array<string> {
        return this._activeTheme ? this._activeTheme.iconVariants : [];
    }

    get mode(): ThemeMode {
        return this._mode;
    }

    set mode(value: ThemeMode) {
        if (this._mode !== value) {
            this._mode = value;

            if (this._activeTheme) {
                this.use(this._activeTheme.name);
            }
        }
    }

    get density(): ThemeDensity {
        return this._density;
    }

    set density(value: ThemeDensity) {
        if (this._density !== value) {
            this._density = value;

            if (this._activeTheme) {
                this.use(this._activeTheme.name);
            }
        }
    }

    get themeNames(): Array<string> {
        return Array.from(this._themes.keys());
    }

    get defaultThemeName(): string {
        return this._defaultThemeName;
    }

    get activeThemeName(): string {
        return this._activeTheme ? this._activeTheme.name : null;
    }

    register(theme: BaseTheme) {
        this._themes.set(theme.name, theme);
    }

    unregister(name: string) {
        this._themes.delete(name);

        if (this.activeThemeName === name) {
            this.clear();
        }
    }

    unregisterAll() {
        this._themes.clear();
        this._activeTheme = null;
        this.clear();
    }

    has(name: string): boolean {
        return this._themes.has(name);
    }

    makeDefault(name: string) {
        this._defaultThemeName = name;
    }

    use(name: string = null) {
        const theme = this._themes.get(name ?? (this._defaultThemeName ?? 'default'));

        if (theme) {
            theme.mode = this.mode;
            theme.density = this.density;
            theme.iconVariant = this.iconVariant;
            this._addStylesToDocument(theme.styleSheet);
            this._activeTheme = theme;

            const event = new CustomEvent('theme-changed', {
                bubbles: true,
                composed: true
            });

            window.dispatchEvent(event)
        }
    }

    clear() {
        this._removeStylesFromDocument();
        this._activeTheme = null;
    }

    // ICONS
    getIcon(name: string): Icon {
        return this._activeTheme ? this._activeTheme.getIcon(name) : null;
    }

    getIconContent(name: string): string {
        return this._activeTheme ? this._activeTheme.getIconContent(name) : null;
    }

    get iconNames(): Array<string> {
        return this._activeTheme ? this._activeTheme.iconNames : [];
    }

    _addStylesToDocument(styles: string) {
        this._removeStylesFromDocument();

        if (styles) {
            const style = document.createElement('style');
            style.setAttribute('quark-theme', '');
            style.textContent = styles;
            document.documentElement.appendChild(style);
        }
    }

    _removeStylesFromDocument() {
        const styles = document.documentElement.querySelectorAll('style[quark-theme]');

        for (let i = 0; i < styles.length; i++) {
            document.documentElement.removeChild(styles[i]);
        }
    }
}

export const themeManager = window.themeManager = window.themeManager || new ThemeManager();