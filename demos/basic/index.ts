/**
@license
MIT License
Copyright (c) 2023 Paul H Mason. All rights reserved.
*/
import { provideDesignSystem, Theme} from '@wctoolkit/basic';

const defaultThemeBrand = new Theme('default');

provideDesignSystem()
    .registerThemes(
        defaultThemeBrand
    )
    .useThemeBrand(
        defaultThemeBrand.name
    );