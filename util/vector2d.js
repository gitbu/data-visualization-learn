export default class Vector2d {
  constructor(x = 1, y = 0) {
    this.x = x;
    this.y = y;
  }

  set x(v) {
    this[0] = v;
  }

  get x() {
    return this[0]
  }

  set y(v) {
    this[1] = v
  }

  get y() {
    return this[1]
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }

  get dir() {
    return Math.atan2(this.x, this.y);
  }

  copy() {
    return new Vector2d(this.x, this.y)
  }

  add(v) {
    this.x += v.x
    this.y += v.y

    return this
  }

  sub(v) {
    this.x -= v.x
    this.y -= v.y

    return this
  }

  cross(v) {
    return this.x * v.x - this.y * v.y
  }

  dot(v) {
    return this.x * v.x + this.y * v.y
  }

  rotate(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const {x, y} = this;

    this.x = x * c - y * s
    this.y = x * s + y * c

    return this;
  }
}