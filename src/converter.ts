import { GEO_CONSTANTS } from './constants';
import { deg2rad, rad2deg, arrayA, arrayAlpha, arrayBeta, arrayDelta } from './util'

type LngLat = {
  lng: number,
  lat: number
}

export class PlaneRectangularConverter {
  phi0: number // Radian
  lambda0: number // Radian
  arrayA: number[]
  arrayAlpha: number[]
  arrayBeta: number[]
  arrayDelta: number[]
  A_: number
  S_: number

  constructor(origin: LngLat) {
    // 座標系原点
    this.phi0 = deg2rad(origin.lat)
    this.lambda0 = deg2rad(origin.lng)
    // 定数から計算できる量
    this.arrayA = arrayA(GEO_CONSTANTS.n)
    this.arrayAlpha = arrayAlpha(GEO_CONSTANTS.n)
    this.arrayBeta = arrayBeta(GEO_CONSTANTS.n)
    this.arrayDelta = arrayDelta(GEO_CONSTANTS.n)
    this.A_ = ((GEO_CONSTANTS.m0 * GEO_CONSTANTS.a) / (1 + GEO_CONSTANTS.n)) * this.arrayA[0]
    this.S_ = ((GEO_CONSTANTS.m0 * GEO_CONSTANTS.a) / (1 + GEO_CONSTANTS.n)) * (
      this.arrayA[0] * this.phi0 +
      this.arrayA.slice(1).reduce((prev, A, idx) => {
        return prev + A * Math.sin(2 * (idx + 1) * this.phi0)
      }, 0)
    )
  }

  XYToLngLat(xy: { x: number, y: number }): LngLat {
    const { x, y } = xy

    const xi = (x + this.S_) / this.A_
    const eta = y / this.A_

    const xi2 = xi - this.arrayBeta.reduce((prev, beta, idx) => (
      prev + beta * Math.sin(2 * (idx + 1) * xi) * Math.cosh(2 * (idx + 1) * eta)
    ), 0)
    const eta2 = eta - this.arrayBeta.reduce((prev, beta, idx) => (
      prev + beta * Math.cos(2 * (idx + 1) * xi) * Math.sinh(2 * (idx + 1) * eta)
    ), 0)

    const chi = Math.asin(Math.sin(xi2) / Math.cosh(eta2)) // [rad]

    const latitude = chi + this.arrayDelta.reduce((prev, delta, idx) => (
      prev + delta * Math.sin(2 * (idx + 1) * chi)
    ), 0) // [rad]
    const longitude = this.lambda0 + Math.atan2(Math.sinh(eta2), Math.cos(xi2)) // [rad]

    return { lng: rad2deg(longitude), lat: rad2deg(latitude) }
  }

  lngLatToXY(lngLat: LngLat): { x: number, y: number } {
    const { lng, lat } = lngLat
    const phi = deg2rad(lat)
    const lambda = deg2rad(lng)

    const lambdaC = Math.cos(lambda - this.lambda0)
    const lambdaS = Math.sin(lambda - this.lambda0)

    const t = Math.sinh(
      Math.atanh(Math.sin(phi)) -
      ((2 * Math.sqrt(GEO_CONSTANTS.n)) / (1 + GEO_CONSTANTS.n)) *
      Math.atanh(((2 * Math.sqrt(GEO_CONSTANTS.n)) / (1 + GEO_CONSTANTS.n)) * Math.sin(phi))
    )
    const t_ = Math.sqrt(1 + t * t)

    const xi2  = Math.atan2(t, lambdaC) // # [rad]
    const eta2 = Math.atanh(lambdaS / t_)

    const x = this.A_ * (
      xi2 + this.arrayAlpha.reduce((prev, alpha, idx) => (
        prev + alpha * Math.sin(2 * (idx + 1) * xi2) * Math.cosh(2 * (idx + 1) * eta2)
      ), 0)
    ) - this.S_
    const y = this.A_ * (
      eta2 + this.arrayAlpha.reduce((prev, alpha, idx) => (
        prev + alpha * Math.cos(2 * (idx + 1) * xi2) * Math.sinh(2 * (idx + 1) * eta2)
      ), 0)
    )
    return { x, y }
  }
}
