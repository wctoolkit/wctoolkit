/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import './components';
import { Theme, themeManager } from '@wctoolkit/theme';
import { Icons, Colors, Typography, Transitions, Border, Spacing } from './theme';
/**
This is based on the "Wireframe Web Kit (desktop)" for Adobe XD.
 */
class TestTheme extends Theme {
    static override get icons() {
        return Icons;
    }

    static override get tokens() {
        return {
            ...Transitions,
            ...Border,
            ...Colors,
            ...Typography,
            ...Spacing
        }
    }

    constructor(name: string, primaryLight: string, primary: string, primaryDark: string) {
        super(name);
        
        // Override primary colors per theme.
        this.addToken('theme-primary-light-color', primaryLight); // 200
        this.addToken('theme-primary-color', primary); // 700
        this.addToken('theme-primary-dark-color', primaryDark); // 900
    }
}

// 200, 700, 900
const blueThemeBrand = new TestTheme('blue', '#90CAF9', '#1976D2', '#0D47A1');
const redThemeBrand = new TestTheme('red', '#EF9A9A', '#F44336', '#B71C1C');
const greenThemeBrand = new TestTheme('green', '#A5D6A7', '#388E3C', '#1B5E20');


//blueThemeBrand.aliasIcon('chevron-left', 'foo-bar');
//TestTheme.aliasIcon('chevron-left', 'thing-icon');
//redThemeBrand.addIcon('chevron-right', '<g><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>');

redThemeBrand.addToken('theme-typography-title-font', '{theme-typography-font-serif}');
greenThemeBrand.addToken('theme-border-radius-m', '25px');

themeManager.register(blueThemeBrand);
themeManager.register(redThemeBrand);
themeManager.register(greenThemeBrand);
themeManager.mode = 'system';
//themeManager.iconVariant = 'twoTone';
themeManager.use(blueThemeBrand.name);

export { themeManager }
