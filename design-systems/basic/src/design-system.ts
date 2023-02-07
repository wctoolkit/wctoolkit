/**
@license
MIT License
Copyright (c) 2022 Paul H Mason. All rights reserved.
*/
import { DesignSystemProvider, themeProvider, ThemeMode, ThemeDensity, TextDirection } from '@wctoolkit/core';
import { Theme } from './theme/theme.js';

new DesignSystemProvider(Theme);

function provideDesignSystem() {
    return window.designSystemProvider;
}

export { provideDesignSystem, Theme, themeProvider, ThemeMode, ThemeDensity, TextDirection }