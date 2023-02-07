import { DesignTokenShape } from '@wctoolkit/theme';

export const Transitions: DesignTokenShape = {
    'theme-transition-duration': '0.2s',
    'theme-transition': `
        color {theme-transition-duration} linear, 
        background-color {theme-transition-duration} linear, 
        border-color {theme-transition-duration} linear,
        fill {theme-transition-duration} linear,
        border-radius {theme-transition-duration} linear
    `,
}