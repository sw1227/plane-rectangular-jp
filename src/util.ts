// Degree <-> Radian
export const deg2rad = (deg: number): number => {
  return (Math.PI / 180) * deg
}
export const rad2deg = (rad: number): number => {
  return (180 / Math.PI) * rad
}

// Functions used in converter
export const arrayA = (n: number) => {
  const A0 = 1 + n ** 2 / 4 + n ** 4 / 64
  const A1 = -(3 / 2) * (n - n ** 3 / 8 - n ** 5 / 64)
  const A2 = (15 / 16) * (n ** 2 - n ** 4 / 4)
  const A3 = -(35 / 48) * (n ** 3 - (5 / 16) * n ** 5)
  const A4 = (315 / 512) * n ** 4
  const A5 = -(693 / 1280) * n ** 5
  return [A0, A1, A2, A3, A4, A5]
}

export const arrayAlpha = (n: number) => {
  const a1 =
    (1 / 2) * n - (2 / 3) * n ** 2 + (5 / 16) * n ** 3 + (41 / 180) * n ** 4 - (127 / 288) * n ** 5
  const a2 = (13 / 48) * n ** 2 - (3 / 5) * n ** 3 + (557 / 1440) * n ** 4 + (281 / 630) * n ** 5
  const a3 = (61 / 240) * n ** 3 - (103 / 140) * n ** 4 + (15061 / 26880) * n ** 5
  const a4 = (49561 / 161280) * n ** 4 - (179 / 168) * n ** 5
  const a5 = (34729 / 80640) * n ** 5
  return [a1, a2, a3, a4, a5]
}

export const arrayBeta = (n: number) => {
  const b1 =
    (1 / 2) * n - (2 / 3) * n ** 2 + (37 / 96) * n ** 3 - (1 / 360) * n ** 4 - (81 / 512) * n ** 5
  const b2 = (1 / 48) * n ** 2 + (1 / 15) * n ** 3 - (437 / 1440) * n ** 4 + (46 / 105) * n ** 5
  const b3 = (17 / 480) * n ** 3 - (37 / 840) * n ** 4 - (209 / 4480) * n ** 5
  const b4 = (4397 / 161280) * n ** 4 - (11 / 504) * n ** 5
  const b5 = (4583 / 161280) * n ** 5
  return [b1, b2, b3, b4, b5]
}

export const arrayDelta = (n: number) => {
  const d1 =
    2 * n -
    (2 / 3) * n ** 2 -
    2 * n ** 3 +
    (116 / 45) * n ** 4 +
    (26 / 45) * n ** 5 -
    (2854 / 675) * n ** 6
  const d2 =
    (7 / 3) * n ** 2 -
    (8 / 5) * n ** 3 -
    (227 / 45) * n ** 4 +
    (2704 / 315) * n ** 5 +
    (2323 / 945) * n ** 6
  const d3 =
    (56 / 15) * n ** 3 - (136 / 35) * n ** 4 - (1262 / 105) * n ** 5 + (73814 / 2835) * n ** 6
  const d4 = (4279 / 630) * n ** 4 - (332 / 35) * n ** 5 - (399572 / 14175) * n ** 6
  const d5 = (4174 / 315) * n ** 5 - (144838 / 6237) * n ** 6
  const d6 = (601676 / 22275) * n ** 6
  return [d1, d2, d3, d4, d5, d6]
}
