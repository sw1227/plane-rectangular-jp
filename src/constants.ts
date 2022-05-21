// 定数 (a, F: 世界測地系-測地基準系1980（GRS80）楕円体)
const m0 = 0.9999
const a = 6378137
const F = 298.257222101
const n = 1 / (2 * F - 1)
export const GEO_CONSTANTS = { m0, a, F, n } as const

// 平面直角座標系（平成十四年国土交通省告示第九号）
// https://www.gsi.go.jp/LAW/heimencho.html
export const ORIGINS: { [system: string]: { lng: number, lat: number } } = {
  IX: { lng: 139+50/60, lat: 36 }
}
