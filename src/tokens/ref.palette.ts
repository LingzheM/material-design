import type { RefPalettes } from "./types";

/**
 * M3 Baseline 调色板 （种子色 #6750A4）
 * 
 * 填写规则：
 * - tone 0 恒为 #000000， tone 100 恒为 #ffffff
 * - neutral 与 neutralVariant 的中间调彩度极低，肉眼接近灰
 * - error 用 M3 固定的红色版，不参与 P8 动态取色
 * 
 * 类型写法要求：用 `satisfies RefPalettes` 而不是 `: RefPalettes`
 */
export declare const refPalettes: RefPalettes