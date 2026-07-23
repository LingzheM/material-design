// src/tokens/sys.color.ts
import type { ColorRole, RefPalettes, Scheme, ToneRecipe } from './types'
import { refPalettes } from './ref.palette'

/**
 * 类型安全的 Object.entries 辅助函数
 * 解决 TS 默认 Object.entries 丢失键字面量类型（退化为 string）的问题，无需使用 as any
 */
function typedEntries<T extends Record<string, unknown>>(
  obj: T
): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}

/**
 * M3 浅色模式完整配方 (Light Tone Recipe)
 */
export const LIGHT_RECIPE: ToneRecipe = {
  // Primary
  'primary': ['primary', 40],
  'on-primary': ['primary', 100],
  'primary-container': ['primary', 90],
  'on-primary-container': ['primary', 10],

  // Secondary
  'secondary': ['secondary', 40],
  'on-secondary': ['secondary', 100],
  'secondary-container': ['secondary', 90],
  'on-secondary-container': ['secondary', 10],

  // Tertiary
  'tertiary': ['tertiary', 40],
  'on-tertiary': ['tertiary', 100],
  'tertiary-container': ['tertiary', 90],
  'on-tertiary-container': ['tertiary', 10],

  // Error
  'error': ['error', 40],
  'on-error': ['error', 100],
  'error-container': ['error', 90],
  'on-error-container': ['error', 10],

  // Background & Base Surface
  'background': ['neutral', 98],
  'on-background': ['neutral', 10],
  'surface': ['neutral', 98],
  'on-surface': ['neutral', 10],
  'surface-variant': ['neutralVariant', 90],
  'on-surface-variant': ['neutralVariant', 30],

  // Utility
  'outline': ['neutralVariant', 50],
  'outline-variant': ['neutralVariant', 80],
  'shadow': ['neutral', 0],
  'scrim': ['neutral', 0],

  // Inverse
  'inverse-surface': ['neutral', 20],
  'inverse-on-surface': ['neutral', 95],
  'inverse-primary': ['primary', 80],

  // M3 Surface Container Ramps (Light Mode)
  'surface-dim': ['neutral', 87],
  'surface-bright': ['neutral', 98],
  'surface-container-lowest': ['neutral', 100],
  'surface-container-low': ['neutral', 96],
  'surface-container': ['neutral', 94],
  'surface-container-high': ['neutral', 92],
  'surface-container-highest': ['neutral', 90],
} satisfies ToneRecipe

/**
 * M3 深色模式完整配方 (Dark Tone Recipe)
 * 核心逻辑：围绕 Tone 50 进行对称反转 (40↔80, 100↔20, 90↔30, 10↔90)
 */
export const DARK_RECIPE: ToneRecipe = {
  // Primary
  'primary': ['primary', 80],
  'on-primary': ['primary', 20],
  'primary-container': ['primary', 30],
  'on-primary-container': ['primary', 90],

  // Secondary
  'secondary': ['secondary', 80],
  'on-secondary': ['secondary', 20],
  'secondary-container': ['secondary', 30],
  'on-secondary-container': ['secondary', 90],

  // Tertiary
  'tertiary': ['tertiary', 80],
  'on-tertiary': ['tertiary', 20],
  'tertiary-container': ['tertiary', 30],
  'on-tertiary-container': ['tertiary', 90],

  // Error
  'error': ['error', 80],
  'on-error': ['error', 20],
  'error-container': ['error', 30],
  'on-error-container': ['error', 90],

  // Background & Base Surface
  'background': ['neutral', 6],
  'on-background': ['neutral', 90],
  'surface': ['neutral', 6],
  'on-surface': ['neutral', 90],
  'surface-variant': ['neutralVariant', 30],
  'on-surface-variant': ['neutralVariant', 80],

  // Utility
  'outline': ['neutralVariant', 60],
  'outline-variant': ['neutralVariant', 30],
  'shadow': ['neutral', 0],
  'scrim': ['neutral', 0],

  // Inverse
  'inverse-surface': ['neutral', 90],
  'inverse-on-surface': ['neutral', 20],
  'inverse-primary': ['primary', 40],

  // M3 Surface Container Ramps (Dark Mode - 靠 4/6/10/12/17/22/24 微小阶梯建立层级)
  'surface-dim': ['neutral', 6],
  'surface-bright': ['neutral', 24],
  'surface-container-lowest': ['neutral', 4],
  'surface-container-low': ['neutral', 10],
  'surface-container': ['neutral', 12],
  'surface-container-high': ['neutral', 17],
  'surface-container-highest': ['neutral', 22],
} satisfies ToneRecipe

/**
 * 纯函数：根据 Recipe 从 RefPalettes 拼装最终的 Scheme
 */
export function buildScheme(palettes: RefPalettes, recipe: ToneRecipe): Scheme {
  const result = {} as Record<ColorRole, string>

  for (const [role, [paletteName, tone]] of typedEntries(recipe)) {
    result[role] = palettes[paletteName][tone]
  }

  return result as Scheme
}

// 预编译产出默认 Light / Dark Scheme 实例
export const lightScheme: Scheme = buildScheme(refPalettes, LIGHT_RECIPE)
export const darkScheme: Scheme = buildScheme(refPalettes, DARK_RECIPE)