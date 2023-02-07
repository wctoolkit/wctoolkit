/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
export type ThemeDensity = 'compact' | 'comfortable' | 'sparse';
export type ThemeMode = 'system' | 'light' | 'dark';
export type TextDirection = 'ltr' | 'rtl';

export type IconShape = null | {
    [key: string]: string | {
        icon: string;
        size?: number;
    } | {
        default?: string;
        variants: {
            [key: string]: string | {
                icon: string;
                size?: number;
            }
        };
    };
}

export type DesignTokenShape = null | {
    [key: string]: string | {
        [property in keyof { light?: string; dark?: string }]: string | {
            [property in keyof { compact?: string; comfortable?: string; sparse?: string }]: string;
        };
    } | {
        [property in keyof { compact?: string; comfortable?: string; sparse?: string }]: string;
    }
}