import React, { ReactNode } from "react";
import { PaletteState } from "./usePalette";
export declare type PaletteProps = {
    src: string;
    children(palette: PaletteState): ReactNode;
};
export declare const Palette: React.FC<PaletteProps>;
