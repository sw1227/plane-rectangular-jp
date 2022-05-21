# plane-rectangular-jp
Converter of {lng, lat} <-> {x, y} (Plane rectangular coordinate system).

https://www.npmjs.com/package/plane-rectangular-jp


```ts
import { PlaneRectangularConverter, ORIGINS } from 'plane-rectangular-jp'

const prc = new PlaneRectangularConverter(ORIGINS.IX)
const { x, y } = prc.lngLatToXY({ lng: 139, lat: 36 })
const { lng, lat } = prc.XYToLngLat({ x: 10, y: 20 })
```

## Install
[Install using npm](https://www.npmjs.com/package/plane-rectangular-jp).

```
npm i plane-rectangular-jp
```

```ts
import { PlaneRectangularConverter, ORIGINS } from 'plane-rectangular-jp'
```
