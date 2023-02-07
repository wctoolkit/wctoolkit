/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
import { DesignToken } from './design-token.js';
import { Icon } from './icon.js';
import { ThemeMode, ThemeDensity, IconShape } from './types.js';

export { DesignToken, Icon }

export class BaseTheme {
    static tokens? : any;
    static icons? : any;

    private static _globalTokensLoaded: boolean = false;
    private static _globalIconsLoaded: boolean = false;
    private static _globalTokens:  Map<string, DesignToken> = new Map<string, DesignToken>();
    private static _globalIcons: Map<string, Icon> = new Map<string, Icon>();

    private _styleSheet: string = null;
    private _tokensDirty: boolean = true;
    private _name: string;
    private _mode: ThemeMode = 'system';
    private _density: ThemeDensity = 'comfortable';
    private _iconVariant: string = 'default';
    private _localTokens: Map<string, DesignToken> = new Map<string, DesignToken>();
    private _localIcons: Map<string, Icon> = new Map<string, Icon>();
    private _allTokens: Array<DesignToken>;

    constructor(name: string) {
        this._name = name;
        this._localTokens = new Map();
        this._localIcons = new Map();
        this._loadGlobalTokens();
        this._loadGlobalIcons();
    }

    get name(): string {
        return this._name;
    }

    get mode(): ThemeMode {
        return this._mode;
    }

    set mode(value: ThemeMode) {
        if (this._mode !== value) {
            this._mode = value;
            this._tokensDirty = true;
        }
    }

    get density(): ThemeDensity {
        return this._density;
    }

    set density(value: ThemeDensity) {
        if (this._density !== value) {
            this._density = value;
            this._tokensDirty = true;
        }
    }

    get iconVariant(): string {
        return this._iconVariant;
    }

    set iconVariant(value: string) {
        if (this._iconVariant !== value) {
            this._iconVariant = value;
        }
    }

    get iconVariants(): Array<string> {
        return [...new Set([...this.localIcons.values(), ...BaseTheme.globalIcons.values()].map(icon => icon.variants).flat())].sort();
    }

    get styleSheet(): string {
        if (this._tokensDirty) {
            this._styleSheet = this._createStyleSheet();
        }

        return this._styleSheet;
    }

    register(): BaseTheme {
        window.themeManager.register(this);
        return this;
    }

    unregister(): BaseTheme {
        window.themeManager.unregister(this.name);
        return this;
    }

    use(): BaseTheme {
        window.themeManager.use(this.name);
        return this;
    }

    makeDefault(): BaseTheme {
        window.themeManager.makeDefault(this.name);
        return this;
    }

    // TOKENS
    /**
     * Gets all the global (static) tokens.
     */
    static get globalTokens(): Map<string, DesignToken> {
        return this._globalTokens;
    }

    /**
     * Gets all the local (instance) tokens.
     */
    get localTokens(): Map<string, DesignToken> {
        return this._localTokens;
    }

    /**
     * Gets all the local (instance) and global (static) token names.
     */
    get tokenNames(): Array<string> {
        return [...new Set([...this.localTokens.keys(), ...BaseTheme.globalTokens.keys()])].sort();
    }

    static addToken(name: string, values: any) {
        BaseTheme.globalTokens.set(name, new DesignToken(name, values));
    }

    static addTokens(tokens: any = null) {
        if (!tokens) return;

        const tokenNames = Object.getOwnPropertyNames(tokens);

        for (let i = 0; i < tokenNames.length; i++) {
            const tokenName = tokenNames[i];
            const tokenContent = tokens[tokenName];

            if (tokenContent) {
                BaseTheme.globalTokens.set(tokenName, new DesignToken(tokenName, tokenContent));
            }
        } 
    }

    addToken(name: string, values: any) {
        this.localTokens.set(name, new DesignToken(name, values));
        this._styleSheet = null;
        this._tokensDirty = true;
    }

    addTokens(tokens: any = null) {
        if (!tokens) return;

        const tokenNames = Object.getOwnPropertyNames(tokens);

        for (let i = 0; i < tokenNames.length; i++) {
            const tokenName = tokenNames[i];
            const tokenContent = tokens[tokenName];

            if (tokenContent) {
                this.localTokens.set(tokenName, new DesignToken(tokenName, tokenContent));
            }
        }

        this._styleSheet = null;
        this._tokensDirty = true;
    }

    _loadGlobalTokens() {
        if (!BaseTheme._globalTokensLoaded) {
            const constructor = this.constructor as typeof BaseTheme;
            const { tokens } = constructor;

            if (tokens) {
                const tokenNames = Object.getOwnPropertyNames(tokens);

                for (let i = 0; i < tokenNames.length; i++) {
                    const tokenName = tokenNames[i];
                    const tokenContent = tokens[tokenName];

                    if (tokenContent) {
                        BaseTheme.addToken(tokenName, tokenContent);
                    }
                }
            }

            BaseTheme._globalTokensLoaded = true;
        }
    }

    // ICONS
    /**
     * Gets all the global (static) icons.
     */
    static get globalIcons(): Map<string, Icon> {
        return this._globalIcons;
    }

    /**
     * Gets all the local (instance) icons.
     */
    get localIcons(): Map<string, Icon> {
        return this._localIcons;
    }

    /**
     * Gets all the instance and global (static) icon names.
     */
    get iconNames(): Array<string> {
        return [...new Set([...this.localIcons.keys(), ...BaseTheme.globalIcons.keys()])].sort();
    }

    static addIcon(name: string, value: any) {
        if (name && value) {
            BaseTheme.globalIcons.set(name, new Icon(name, value));
        }
    }

    static addIcons(icons: IconShape) {
        const iconNames = Object.getOwnPropertyNames(icons);

        for (let i = 0; i < iconNames.length; i++) {
            const iconName = iconNames[i];
            const iconContent = icons[iconName];
            BaseTheme.globalIcons.set(iconName, new Icon(iconName, iconContent));
        }
    }

    addIcon(name: string, value: any) {
        if (name && value) {
            this.localIcons.set(name, new Icon(name, value));
        }
    }

    addIcons(icons: IconShape) {
        const iconNames = Object.getOwnPropertyNames(icons);

        for (let i = 0; i < iconNames.length; i++) {
            const iconName = iconNames[i];
            const iconContent = icons[iconName];
            this.localIcons.set(iconName, new Icon(iconName, iconContent));
        }
    }

    static aliasIcon(name: string, alias: string) {
        if (name && alias && name !== alias) {
            const icon = BaseTheme.globalIcons.get(name);

            if (icon) {
                BaseTheme.globalIcons.set(alias, icon);
            }
        }
    }

    aliasIcon(name: string, alias: string) {
        if (name && alias && name !== alias) {
            const icon = this.getIcon(name);

            if (icon) {
                this.localIcons.set(alias, icon);
            }
        }
    }

    renameIcon(name: string, newName: string) {
        this._renameMapIcon(name, newName, this.localIcons);
        this._renameMapIcon(name, newName, BaseTheme.globalIcons);
    }

    getIcon(name: string): Icon {
        return (this.localIcons.has(name) ? this.localIcons.get(name) : BaseTheme.globalIcons.get(name)) || null;
    }

    getIconContent(name: string) : string{
        const icon = this.getIcon(name);
        return icon ? icon.getContent(this.iconVariant) : null;
    }

    _loadGlobalIcons() {
        if (!BaseTheme._globalIconsLoaded) {
            const constructor = this.constructor as typeof BaseTheme;
            const { icons } = constructor;

            if (icons) {
                const iconNames = Object.getOwnPropertyNames(icons);

                for (let i = 0; i < iconNames.length; i++) {
                    const iconName = iconNames[i];
                    const iconContent = icons[iconName];
                    BaseTheme.globalIcons.set(iconName, new Icon(iconName, iconContent));
                }
            }

            BaseTheme._globalIconsLoaded = true;
        }
    }

    _renameMapIcon(name: string, newName: string, map: Map<string, Icon>) {
        if ((map.has(name)) && (!map.has(newName))) {
            const iconData = map.get(name);
            map.delete(name);
            map.set(newName, iconData);
        }
    }

    _createStyleSheet() {
        if (!this._allTokens || this._tokensDirty) {
            this._allTokens = [...new Map([...BaseTheme.globalTokens, ...this.localTokens]).values()];
        }

        //console.time('Create Stylesheet');
        this._tokensDirty = false;
        const themeLightCssVariablesArray = [];
        const themeDarkCssVariablesArray = [];
        const themeAllCssVariablesArray = [];
        
        for (let i = 0; i < this._allTokens.length; i++) {
            const token = this._allTokens[i];
            const light = `${token.cssVariable}: ${token.getValue('light', this.density)}`;

            themeLightCssVariablesArray.push(light);

            if (this.mode !== 'light') {
                if (token.hasDarkValue) {
                    const dark = `${token.cssVariable}: ${token.getValue('dark', this.density)}`;
                    themeDarkCssVariablesArray.push(dark);
                    themeAllCssVariablesArray.push(dark);
                } else {
                    
                    if (this.mode === 'dark') {
                        
                        themeAllCssVariablesArray.push(light);
                    }
                }
            }
        }
        
        const themeLightCssVariables = themeLightCssVariablesArray.join(';\n');
        const themeDarkCssVariables = themeDarkCssVariablesArray.join(';\n');
        const themeAllCssVariables = themeAllCssVariablesArray.join(';\n');
        //console.timeEnd('Create Stylesheet');

        switch (this.mode) {
            case 'light': return `:root {${themeLightCssVariables}}`;
            case 'dark': return `:root {${themeAllCssVariables}}`;
            default: return `:root {${themeLightCssVariables}} @media (prefers-color-scheme: dark) {:root {${themeDarkCssVariables}}}`;
        }
    }
}