import type { RefPalettes, Scheme, ToneRecipe } from "./types";

/**
 * 浅色配方。
 * 它是 M3 配色的骨架：
 * accent               40
 * on-accent            100
 * accent-container     90
 * on-accent-container  10
 * surface      neutrial 98
 * on-surface   neutrial 10
 * outline      neutrialVariant 50
 * outline      neutrialVariant 80
 */
export declare const LIGHT_RECIPE: ToneRecipe

/**
 * 深色配方。规律是【围绕 50 翻转】
 * 
 */
export declare const DARk_RECIPE: ToneRecipe

/**
 * 按配方从调色板拼出一套配色。
 */
export declare function buildScheme(palettes: RefPalettes, recipe: ToneRecipe): Scheme

export declare const lightScheme: Scheme
export declare const darkScheme: Scheme