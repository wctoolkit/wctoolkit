/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
import { BaseTheme, themeProvider, ThemeMode, ThemeDensity, TextDirection } from "@wctoolkit/theme";

declare global {
    interface Window { designSystemProvider: DesignSystemProvider; }
}

class DesignSystemProvider {
    private _themeType: typeof BaseTheme;

    constructor(themeType: typeof BaseTheme) {
        this._themeType = themeType;

        if (window.designSystemProvider) {
            throw 'A design system provider already exists';
        } else {
            window.designSystemProvider = this;
        }
    }

    get themeType() {
        return this._themeType;
    }

    registerIcons(icons: any) {
        if (this._themeType) {
            this._themeType.addIcons(icons);
        }

        return this;
    }

    registerIcon(name: string, value: any) {
        if (this._themeType) {
            this._themeType.addIcon(name, value);
        }

        return this;
    }

    registerThemes(...args: Array<BaseTheme>) {
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];

            if (arg instanceof this._themeType) {
                args[i].register();
            } else {
                console.warn('Theme is not of the correct type');
            }
        }

        return this;
    }

    registerTokens(tokens: any) {
        if (this._themeType) {
            this._themeType.addTokens(tokens);
        }
        
        return this;
    }

    useThemeBrand(name: string) {
        if (name) {
            themeProvider.use(name);
        }
        
        return this;
    }

    clearThemeBrand() {
        themeProvider.clear();
        return this;
    }

    withThemeMode(mode: ThemeMode = 'system') {
        themeProvider.mode = mode;
        return this;
    }

    withDensity(density: ThemeDensity = 'comfortable') {
        themeProvider.density = density;
        return this;
    }

    withDirection(dir: TextDirection = 'ltr') {
        themeProvider.dir = dir;
        return this;
    }

    withIconVariant(variant = 'default') {
        themeProvider.iconVariant = variant;
        return this;
    }
}

export { DesignSystemProvider, BaseTheme, themeProvider, ThemeMode, ThemeDensity, TextDirection }