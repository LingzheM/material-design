// ─── ref 层 ────────────────────────────────────────────────

/** M3 规定的 13 级色调。注意是数字字面量联合，不是 number */
export type Tone = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 99 | 100

export type PaletteName =
  | 'primary' | 'secondary' | 'tertiary'
  | 'neutral' | 'neutralVariant' | 'error'

/**
 * 一条完整色调板。
 * 契约：必须是穷举 Record 而非 { [k: number]: string }，
 *       否则 noUncheckedIndexedAccess 会让每次取值都返回 string | undefined。
 */
export type Palette = Readonly<Record<Tone, string>>
export type RefPalettes = Readonly<Record<PaletteName, Palette>>


// ─── sys.color 层：用模板字面量类型派生角色名 ────────────────

/** 有 container 变体的四组强调色 */
type AccentGroup = 'primary' | 'secondary' | 'tertiary' | 'error'

/**
 * 练习点：不要手写 16 个字符串。
 * 用 AccentGroup 通过模板字面量派生出：
 *   primary | on-primary | primary-container | on-primary-container | ...
 */
export type AccentRole =
  | AccentGroup
  | `on-${AccentGroup}`
  | `${AccentGroup}-container`
  | `on-${AccentGroup}-container`

export type SurfaceRole =
  | 'surface' | 'on-surface'
  | 'surface-variant' | 'on-surface-variant'
  | 'surface-dim' | 'surface-bright'
  | 'surface-container-lowest' | 'surface-container-low'
  | 'surface-container' | 'surface-container-high' | 'surface-container-highest'
  | 'background' | 'on-background'
  | 'inverse-surface' | 'inverse-on-surface' | 'inverse-primary'

export type UtilityRole = 'outline' | 'outline-variant' | 'shadow' | 'scrim'

export type ColorRole = AccentRole | SurfaceRole | UtilityRole

/** 一套完整配色。浅色与深色是同一个类型的两个实例 */
export type Scheme = Readonly<Record<ColorRole, string>>


// ─── 配方：M3 明暗切换的全部秘密 ──────────────────────────

/**
 * 把「角色」映射到「哪条调色板的哪一级」。
 * 例：'primary' → ['primary', 40] (light) / ['primary', 80] (dark)
 * readonly 元组，不是数组 —— 保证长度固定为 2。
 */
export type ToneRecipe = Readonly<Record<ColorRole, readonly [PaletteName, Tone]>>


// ─── 静态 token（不随主题变化的那些）────────────────────

export type ShapeScale = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5
export type StateName = 'hover' | 'focus' | 'pressed' | 'dragged'
export type EasingName = 'standard' | 'standard-accelerate' | 'standard-decelerate'
                       | 'emphasized' | 'emphasized-accelerate' | 'emphasized-decelerate'
export type DurationName = 'short1' | 'short2' | 'short3' | 'short4'
                         | 'medium1' | 'medium2' | 'medium3' | 'medium4'
                         | 'long1' | 'long2' | 'long3' | 'long4'


// ─── CSS 变量名：编译期拼错就报错 ──────────────────────────

export type CssTokenName =
  | `--md-sys-color-${ColorRole}`
  | `--md-sys-shape-corner-${ShapeScale}`
  | `--md-sys-elevation-level${ElevationLevel}`
  | `--md-sys-state-${StateName}-opacity`
  | `--md-sys-motion-easing-${EasingName}`
  | `--md-sys-motion-duration-${DurationName}`