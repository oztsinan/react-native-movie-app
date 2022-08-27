export declare type PaletteColors = {
    vibrant?: string;
    muted?: string;
    darkVibrant?: string;
    darkMuted?: string;
    lightVibrant?: string;
    lightMuted?: string;
    [name: string]: string | undefined;
};
export declare function getPalette(src: string): Promise<PaletteColors>;
