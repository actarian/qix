/**
 * @license qix-js v0.0.1
 * (c) 2020 Renaud Ninauve
 * License:
 */

(function () {
	'use strict';

	var Vector2 = function () {
	  function Vector2(x, y) {
	    if (x === void 0) {
	      x = 0;
	    }

	    if (y === void 0) {
	      y = 0;
	    }

	    this.x = x;
	    this.y = y;
	  }

	  var _proto = Vector2.prototype;

	  _proto.set = function set(x, y) {
	    this.x = x;
	    this.y = y;
	    return this;
	  };

	  _proto.setScalar = function setScalar(scalar) {
	    this.x = scalar;
	    this.y = scalar;
	    return this;
	  };

	  _proto.setX = function setX(x) {
	    this.x = x;
	    return this;
	  };

	  _proto.setY = function setY(y) {
	    this.y = y;
	    return this;
	  };

	  _proto.setComponent = function setComponent(index, value) {
	    switch (index) {
	      case 0:
	        this.x = value;
	        break;

	      case 1:
	        this.y = value;
	        break;

	      default:
	        throw new Error('index is out of range: ' + index);
	    }

	    return this;
	  };

	  _proto.getComponent = function getComponent(index) {
	    switch (index) {
	      case 0:
	        return this.x;

	      case 1:
	        return this.y;

	      default:
	        throw new Error('index is out of range: ' + index);
	    }
	  };

	  _proto.clone = function clone() {
	    return new this.constructor(this.x, this.y);
	  };

	  _proto.copy = function copy(v) {
	    this.x = v.x;
	    this.y = v.y;
	    return this;
	  };

	  _proto.add = function add(v, w) {
	    if (w !== undefined) {
	      console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
	      return this.addVectors(v, w);
	    }

	    this.x += v.x;
	    this.y += v.y;
	    return this;
	  };

	  _proto.addScalar = function addScalar(s) {
	    this.x += s;
	    this.y += s;
	    return this;
	  };

	  _proto.addVectors = function addVectors(a, b) {
	    this.x = a.x + b.x;
	    this.y = a.y + b.y;
	    return this;
	  };

	  _proto.addScaledVector = function addScaledVector(v, s) {
	    this.x += v.x * s;
	    this.y += v.y * s;
	    return this;
	  };

	  _proto.sub = function sub(v, w) {
	    if (w !== undefined) {
	      console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
	      return this.subVectors(v, w);
	    }

	    this.x -= v.x;
	    this.y -= v.y;
	    return this;
	  };

	  _proto.subScalar = function subScalar(s) {
	    this.x -= s;
	    this.y -= s;
	    return this;
	  };

	  _proto.subVectors = function subVectors(a, b) {
	    this.x = a.x - b.x;
	    this.y = a.y - b.y;
	    return this;
	  };

	  _proto.multiply = function multiply(v) {
	    this.x *= v.x;
	    this.y *= v.y;
	    return this;
	  };

	  _proto.multiplyScalar = function multiplyScalar(scalar) {
	    this.x *= scalar;
	    this.y *= scalar;
	    return this;
	  };

	  _proto.divide = function divide(v) {
	    this.x /= v.x;
	    this.y /= v.y;
	    return this;
	  };

	  _proto.divideScalar = function divideScalar(scalar) {
	    return this.multiplyScalar(1 / scalar);
	  };

	  _proto.applyMatrix3 = function applyMatrix3(m) {
	    var x = this.x,
	        y = this.y;
	    var e = m.elements;
	    this.x = e[0] * x + e[3] * y + e[6];
	    this.y = e[1] * x + e[4] * y + e[7];
	    return this;
	  };

	  _proto.min = function min(v) {
	    this.x = Math.min(this.x, v.x);
	    this.y = Math.min(this.y, v.y);
	    return this;
	  };

	  _proto.max = function max(v) {
	    this.x = Math.max(this.x, v.x);
	    this.y = Math.max(this.y, v.y);
	    return this;
	  };

	  _proto.clamp = function clamp(min, max) {
	    this.x = Math.max(min.x, Math.min(max.x, this.x));
	    this.y = Math.max(min.y, Math.min(max.y, this.y));
	    return this;
	  };

	  _proto.clampScalar = function clampScalar(minVal, maxVal) {
	    this.x = Math.max(minVal, Math.min(maxVal, this.x));
	    this.y = Math.max(minVal, Math.min(maxVal, this.y));
	    return this;
	  };

	  _proto.clampLength = function clampLength(min, max) {
	    var length = this.length();
	    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
	  };

	  _proto.floor = function floor() {
	    this.x = Math.floor(this.x);
	    this.y = Math.floor(this.y);
	    return this;
	  };

	  _proto.ceil = function ceil() {
	    this.x = Math.ceil(this.x);
	    this.y = Math.ceil(this.y);
	    return this;
	  };

	  _proto.round = function round() {
	    this.x = Math.round(this.x);
	    this.y = Math.round(this.y);
	    return this;
	  };

	  _proto.roundToZero = function roundToZero() {
	    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
	    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
	    return this;
	  };

	  _proto.negate = function negate() {
	    this.x = -this.x;
	    this.y = -this.y;
	    return this;
	  };

	  _proto.dot = function dot(v) {
	    return this.x * v.x + this.y * v.y;
	  };

	  _proto.cross = function cross(v) {
	    return this.x * v.y - this.y * v.x;
	  };

	  _proto.lengthSq = function lengthSq() {
	    return this.x * this.x + this.y * this.y;
	  };

	  _proto.length = function length() {
	    return Math.sqrt(this.x * this.x + this.y * this.y);
	  };

	  _proto.manhattanLength = function manhattanLength() {
	    return Math.abs(this.x) + Math.abs(this.y);
	  };

	  _proto.normalize = function normalize() {
	    return this.divideScalar(this.length() || 1);
	  };

	  _proto.angle = function angle() {
	    var angle = Math.atan2(-this.y, -this.x) + Math.PI;
	    return angle;
	  };

	  _proto.distanceTo = function distanceTo(v) {
	    return Math.sqrt(this.distanceToSquared(v));
	  };

	  _proto.distanceToSquared = function distanceToSquared(v) {
	    var dx = this.x - v.x,
	        dy = this.y - v.y;
	    return dx * dx + dy * dy;
	  };

	  _proto.manhattanDistanceTo = function manhattanDistanceTo(v) {
	    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
	  };

	  _proto.setLength = function setLength(length) {
	    return this.normalize().multiplyScalar(length);
	  };

	  _proto.lerp = function lerp(v, alpha) {
	    this.x += (v.x - this.x) * alpha;
	    this.y += (v.y - this.y) * alpha;
	    return this;
	  };

	  _proto.lerpVectors = function lerpVectors(v1, v2, alpha) {
	    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
	  };

	  _proto.equals = function equals(v) {
	    return v.x === this.x && v.y === this.y;
	  };

	  _proto.fromArray = function fromArray(array, offset) {
	    if (offset === undefined) offset = 0;
	    this.x = array[offset];
	    this.y = array[offset + 1];
	    return this;
	  };

	  _proto.toArray = function toArray(array, offset) {
	    if (array === undefined) array = [];
	    if (offset === undefined) offset = 0;
	    array[offset] = this.x;
	    array[offset + 1] = this.y;
	    return array;
	  };

	  _proto.fromBufferAttribute = function fromBufferAttribute(attribute, index, offset) {
	    if (offset !== undefined) {
	      console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');
	    }

	    this.x = attribute.getX(index);
	    this.y = attribute.getY(index);
	    return this;
	  };

	  _proto.rotateAround = function rotateAround(center, angle) {
	    var c = Math.cos(angle),
	        s = Math.sin(angle);
	    var x = this.x - center.x;
	    var y = this.y - center.y;
	    this.x = x * c - y * s + center.x;
	    this.y = x * s + y * c + center.y;
	    return this;
	  };

	  _proto.random = function random() {
	    this.x = Math.random();
	    this.y = Math.random();
	    return this;
	  };

	  return Vector2;
	}();

	var Canvas = function () {
	  function Canvas() {
	    var canvas = this.canvas = document.querySelector('.game .canvas');
	    var size = this.size = new Vector2(canvas.offsetWidth, canvas.offsetHeight);
	    canvas.width = size.x;
	    canvas.height = size.y;
	    this.ctx = canvas.getContext('2d');
	  }

	  var _proto = Canvas.prototype;

	  _proto.update = function update() {
	    var size = this.size;
	    var ctx = this.ctx;
	    ctx.clearRect(0, 0, size.x, size.y);
	  };

	  _proto.drawPoint = function drawPoint(p) {
	    var ctx = this.ctx;
	    ctx.beginPath();
	    ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
	    ctx.lineWidth = 2;
	    ctx.strokeStyle = "red";
	    ctx.stroke();
	  };

	  _proto.drawSegment = function drawSegment(s) {
	    var ctx = this.ctx;
	    ctx.beginPath();
	    ctx.moveTo(s.a.x, s.a.y);
	    ctx.lineTo(s.b.x, s.b.y);
	    ctx.lineWidth = 2;
	    ctx.strokeStyle = "white";
	    ctx.stroke();
	  };

	  _proto.drawImage = function drawImage(image, x, y, scale, rotation) {
	    var ctx = this.ctx;
	    ctx.setTransform(scale, 0, 0, scale, x, y);
	    ctx.rotate(rotation);
	    ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalWidth / 2);
	    ctx.setTransform(1, 0, 0, 1, 0, 0);
	  };

	  _proto.drawImageCenter = function drawImageCenter(image, x, y, cx, cy, scale, rotation) {
	    var ctx = this.ctx;
	    ctx.setTransform(scale, 0, 0, scale, x, y);
	    ctx.rotate(rotation);
	    ctx.drawImage(image, -cx, -cy);
	    ctx.setTransform(1, 0, 0, 1, 0, 0);
	  };

	  return Canvas;
	}();

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var inheritsLoose = _inheritsLoose;

	var State = {
	  ended: false,
	  won: false,
	  paused: false,
	  then: Date.now(),
	  soundtrack: null,
	  gameWon: null,
	  gameLost: null,
	  timer: 30,
	  frameCount: 0,
	  keys: {},
	  score: 0,
	  area: 0
	};

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var Segment = function () {
	  createClass(Segment, [{
	    key: "ax",
	    get: function get() {
	      return this.a.x;
	    },
	    set: function set(x) {
	      this.a.x = x;
	    }
	  }, {
	    key: "ay",
	    get: function get() {
	      return this.a.y;
	    },
	    set: function set(y) {
	      this.a.y = y;
	    }
	  }, {
	    key: "bx",
	    get: function get() {
	      return this.b.x;
	    },
	    set: function set(x) {
	      this.b.x = x;
	    }
	  }, {
	    key: "by",
	    get: function get() {
	      return this.b.y;
	    },
	    set: function set(y) {
	      this.b.y = y;
	    }
	  }]);

	  function Segment(ax, ay, bx, by) {
	    if (ax === void 0) {
	      ax = 0;
	    }

	    if (ay === void 0) {
	      ay = 0;
	    }

	    if (bx === void 0) {
	      bx = 0;
	    }

	    if (by === void 0) {
	      by = 0;
	    }

	    this.a = new Vector2(ax, ay);
	    this.b = new Vector2(bx, by);
	  }

	  var _proto = Segment.prototype;

	  _proto.draw = function draw() {
	    drawSegment(this);
	  };

	  _proto.update = function update() {
	    this.draw();
	  };

	  _proto.bounce = function bounce(s) {
	    var i = this.intersect(s);

	    if (i) {
	      var r = this.reflect(i, s.b);
	      var d = new Vector2(r.x - i.x, r.y - i.y).normalize();
	      return {
	        r: r,
	        d: d
	      };
	    }
	  };

	  _proto.intersect = function intersect(s) {
	    var i = this.getIntersection(s);

	    if (i && i.intersectA && i.intersectB) {
	      return i;
	    }
	  };

	  _proto.reflect = function reflect(intersection, rayTip) {
	    var n = this.normal();
	    var v = new Vector2(rayTip.x - intersection.x, rayTip.y - intersection.y);
	    var d = n.dot(v);
	    var dotNormal = new Vector2(d * n.x, d * n.y);
	    var reflection = new Vector2(rayTip.x - dotNormal.x * 2, rayTip.y - dotNormal.y * 2);
	    return reflection;
	  };

	  _proto.normal = function normal(p) {
	    var dx = this.b.x - this.a.x;
	    var dy = this.b.y - this.a.y;
	    var n = new Vector2(dy, -dx);
	    return n.normalize();
	  };

	  _proto.vector = function vector(iX, iY, rayTipX, rayTipY) {
	    var rayX = rayTipX - iX;
	    var rayY = rayTipY - iY;
	    return new Vector2(rayX, rayY);
	  };

	  _proto.getIntersection = function getIntersection(s) {
	    var denominator,
	        a,
	        b,
	        numerator1,
	        numerator2,
	        result = new Vector2();
	    denominator = (this.b.y - this.a.y) * (s.b.x - s.a.x) - (this.b.x - this.a.x) * (s.b.y - s.a.y);

	    if (denominator === 0) {
	      return result;
	    }

	    a = s.a.y - this.a.y;
	    b = s.a.x - this.a.x;
	    numerator1 = (this.b.x - this.a.x) * a - (this.b.y - this.a.y) * b;
	    numerator2 = (s.b.x - s.a.x) * a - (s.b.y - s.a.y) * b;
	    a = numerator1 / denominator;
	    b = numerator2 / denominator;
	    result.x = s.a.x + a * (s.b.x - s.a.x);
	    result.y = s.a.y + a * (s.b.y - s.a.y);

	    if (a > 0 && a < 1) {
	      result.intersectA = true;
	    }

	    if (b > 0 && b < 1) {
	      result.intersectB = true;
	    }

	    return result;
	  };

	  _proto.hit = function hit(actor, tolerance) {
	    var hit = Segment.calcIsInsideThickLineSegment(actor.segment.b.x, actor.segment.b.y, this.ax, this.ay, this.bx, this.by, tolerance);

	    if (hit) {
	      return this;
	    }
	  };

	  Segment.calcIsInsideThickLineSegment = function calcIsInsideThickLineSegment(px, py, ax, ay, bx, by, tolerance) {
	    if (tolerance === void 0) {
	      tolerance = 0.1;
	    }

	    var L2 = (bx - ax) * (bx - ax) + (by - ay) * (by - ay);
	    if (L2 == 0) return false;
	    var r = ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / L2;

	    if (r < 0) {
	      return Math.sqrt((ax - px) * (ax - px) + (ay - py) * (ay - py)) <= tolerance;
	    } else if (0 <= r && r <= 1) {
	      var s = ((ay - py) * (bx - ax) - (ax - px) * (by - ay)) / L2;
	      return Math.abs(s) * Math.sqrt(L2) <= tolerance;
	    } else {
	      return Math.sqrt((bx - px) * (bx - px) + (by - py) * (by - py)) <= tolerance;
	    }
	  };

	  return Segment;
	}();

	var Polygon = function () {
	  function Polygon(points) {
	    var _this = this;

	    this.segments = [];

	    if (points && points.length > 1) {
	      points.forEach(function (p, i) {
	        if (i < points.length - 2) {
	          _this.segments.push(new Segment(p[0], p[1], points[i + 1][0], points[i + 1][1]));
	        }
	      });
	    }
	  }

	  var _proto = Polygon.prototype;

	  _proto.rebuild = function rebuild(points) {
	    var segments = [];

	    for (var i = 0; i < points.length - 1; i++) {
	      var p = points[i];
	      segments.push(new Segment(p.x, p.y, points[i + 1].x, points[i + 1].y));
	    }

	    this.segments = segments;
	    console.log('segments', segments);
	  };

	  _proto.hit = function hit(actor, tolerance) {
	    for (var i = 0; i < this.segments.length; i++) {
	      var s = this.segments[i].hit(actor, tolerance);

	      if (s) {
	        return s;
	      }
	    }
	  };

	  _proto.hitSegments = function hitSegments(actor, tolerance) {
	    for (var i = 0; i < this.segments.length - 1; i++) {
	      var s = this.segments[i].hit(actor, tolerance);

	      if (s) {
	        return s;
	      }
	    }
	  };

	  _proto.intersect = function intersect(actor) {
	    return this.segments.reduce(function (p, c) {
	      return p || c.intersect(actor.segment);
	    }, false);
	  };

	  _proto.inside = function inside(actor) {
	    var points = this.getPoints();
	    return this.isPointInside(actor.segment.b, points);
	  };

	  _proto.bounce = function bounce(segment) {
	    for (var i = 0; i < this.segments.length; i++) {
	      var bounce = this.segments[i].bounce(segment);

	      if (bounce) {
	        return bounce;
	      }
	    }
	  };

	  _proto.update = function update() {
	    this.draw();
	  };

	  _proto.draw = function draw() {
	    var canvas = State.canvas;
	    var ctx = canvas.ctx;
	    ctx.beginPath();
	    ctx.lineWidth = "5";
	    ctx.strokeStyle = "green";
	    ctx.fillStyle = "black";
	    var t = this.segments.length;

	    for (var i = 0; i < t; i++) {
	      var s = this.segments[i];

	      if (i === 0) {
	        ctx.moveTo(s.a.x, s.a.y);
	      } else {
	        ctx.lineTo(s.a.x, s.a.y);
	      }

	      if (i === t - 1) {
	        ctx.lineTo(s.b.x, s.b.y);
	      }
	    }

	    ctx.stroke();
	    ctx.fill();
	  };

	  _proto.getPoints = function getPoints(closed) {
	    var points = [];

	    for (var i = 0; i < this.segments.length; i++) {
	      var s = this.segments[i];
	      points.push(s.a);
	    }

	    if (this.segments.length && closed) {
	      points.push(this.segments[this.segments.length - 1].b);
	    }

	    return points;
	  };

	  _proto.isPointInside = function isPointInside(p, points) {
	    var inside = false;
	    var minX = points[0].x,
	        maxX = points[0].x;
	    var minY = points[0].y,
	        maxY = points[0].y;

	    for (var n = 1; n < points.length; n++) {
	      var q = points[n];
	      minX = Math.min(q.x, minX);
	      maxX = Math.max(q.x, maxX);
	      minY = Math.min(q.y, minY);
	      maxY = Math.max(q.y, maxY);
	    }

	    if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
	      return false;
	    }

	    var i = 0,
	        j = points.length - 1;

	    for (j; i < points.length; j = i++) {
	      if (points[i].y > p.y != points[j].y > p.y && p.x < (points[j].x - points[i].x) * (p.y - points[i].y) / (points[j].y - points[i].y) + points[i].x) {
	        inside = !inside;
	      }
	    }

	    return inside;
	  };

	  return Polygon;
	}();

	var Cut = function (_Polygon) {
	  inheritsLoose(Cut, _Polygon);

	  function Cut() {
	    var _this;

	    _this = _Polygon.call(this) || this;
	    _this.direction = new Vector2();
	    _this.start = new Vector2();
	    _this.end = new Vector2();
	    return _this;
	  }

	  var _proto = Cut.prototype;

	  _proto.move = function move(actor) {
	    var segment;

	    if (!this.segments.length) {
	      this.start.copy(actor.position);
	      segment = new Segment(actor.position.x, actor.position.y, actor.nx, actor.ny);
	      this.segments.push(segment);
	    } else if (Math.abs(this.direction.x) !== Math.abs(actor.direction.x)) {
	      var s = this.segments[this.segments.length - 1];
	      segment = new Segment(s.b.x, s.b.y, actor.nx, actor.ny);
	      this.segments.push(segment);
	    } else {
	      segment = this.segments[this.segments.length - 1];
	      segment.b.x = actor.nx;
	      segment.b.y = actor.ny;
	    }

	    this.end.x = segment.b.x;
	    this.end.y = segment.b.y;
	    this.direction.x = actor.direction.x;
	    this.direction.y = actor.direction.y;
	  };

	  _proto.close = function close(actor) {
	    this.segments = [];
	  };

	  _proto.reset = function reset(actor) {
	    actor.position.copy(this.start);
	    this.direction.x = 0;
	    this.direction.y = 0;
	    this.segments = [];
	  };

	  _proto.draw = function draw() {
	    var canvas = State.canvas;
	    var ctx = canvas.ctx;
	    ctx.beginPath();
	    ctx.lineWidth = "5";
	    ctx.strokeStyle = "white";
	    var t = this.segments.length;

	    for (var i = 0; i < t; i++) {
	      var s = this.segments[i];

	      if (i === 0) {
	        ctx.moveTo(s.a.x, s.a.y);
	      } else {
	        ctx.lineTo(s.a.x, s.a.y);
	      }

	      if (i === t - 1) {
	        ctx.lineTo(s.b.x, s.b.y);
	      }
	    }

	    ctx.stroke();
	  };

	  return Cut;
	}(Polygon);

	var Enemy = function () {
	  createClass(Enemy, [{
	    key: "nx",
	    get: function get() {
	      return this.position.x + this.direction.x * this.speed;
	    }
	  }, {
	    key: "ny",
	    get: function get() {
	      return this.position.y + this.direction.y * this.speed;
	    }
	  }]);

	  function Enemy() {
	    var ground = State.ground;
	    this.position = new Vector2(ground.x(0.5), ground.y(0.5));
	    this.direction = new Vector2(0.5 + Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1), 0.5 + Math.random() * 0.5 * (Math.random() > 0.5 ? 1 : -1)).normalize();
	    this.speed = 3 + Math.random() * 2;
	    this.segment = new Segment();
	  }

	  var _proto = Enemy.prototype;

	  _proto.update = function update() {
	    if (!this.checkCollision()) {
	      this.move();
	    }

	    this.draw();
	  };

	  _proto.draw = function draw() {
	    var canvas = State.canvas;
	    var ctx = canvas.ctx;
	    var mouth = State.resources.get(State.assets.mouth);
	    ctx.drawImage(mouth, this.position.x - mouth.naturalWidth / 2, this.position.y - mouth.naturalHeight / 2);
	  };

	  _proto.checkCollision = function checkCollision() {
	    var ground = State.ground;
	    var cut = State.cut;
	    var nx = this.nx;
	    var ny = this.ny;
	    var mouth = State.resources.get(State.assets.mouth);
	    var segment = this.segment;
	    segment.a.set(this.position.x, this.position.y);
	    segment.b.set(this.position.x + this.direction.x * (mouth.naturalHeight / 2 + this.speed), this.position.y + this.direction.y * (mouth.naturalHeight / 2 + this.speed));

	    if (cut.hit(this, mouth.naturalHeight / 2)) {
	      var player = State.player;
	      cut.reset(player);
	    } else {
	      var bounce = ground.bounce(segment);

	      if (bounce) {
	        this.direction.copy(bounce.d);
	      }

	      return bounce;
	    }
	  };

	  _proto.move = function move() {
	    this.position.x = this.nx;
	    this.position.y = this.ny;
	  };

	  return Enemy;
	}();

	var Rect = function () {
	  function Rect(x, y, width, height) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.set();
	  }

	  var _proto = Rect.prototype;

	  _proto.set = function set() {
	    this.top = this.y;
	    this.left = this.x;
	    this.right = this.left + this.width;
	    this.bottom = this.top + this.height;
	    this.setCenter();
	  };

	  Rect.contains = function contains(rect, left, top) {
	    return rect.top <= top && top <= rect.bottom && rect.left <= left && left <= rect.right;
	  };

	  Rect.intersectRect = function intersectRect(r1, r2) {
	    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
	  };

	  Rect.fromNode = function fromNode(node) {
	    if (!node) {
	      return;
	    }

	    var rect = node.rect_ || (node.rect_ = new Rect());
	    var rects = node.getClientRects();

	    if (!rects.length) {
	      return rect;
	    }

	    var boundingRect = node.getBoundingClientRect();
	    rect.x = boundingRect.left;
	    rect.y = boundingRect.top;
	    rect.top = boundingRect.top;
	    rect.left = boundingRect.left;
	    rect.width = boundingRect.width;
	    rect.height = boundingRect.height;
	    rect.right = rect.left + rect.width;
	    rect.bottom = rect.top + rect.height;
	    rect.setCenter();
	    return rect;
	  };

	  _proto.setSize = function setSize(w, h) {
	    this.width = w;
	    this.height = h;
	    this.right = this.left + this.width;
	    this.bottom = this.top + this.height;
	    this.setCenter();
	  };

	  _proto.setCenter = function setCenter() {
	    var center = this.center || (this.center = {});
	    center.top = this.top + this.height / 2;
	    center.left = this.left + this.width / 2;
	    center.x = center.left;
	    center.y = center.top;
	  };

	  _proto.contains = function contains(left, top) {
	    return Rect.contains(this, left, top);
	  };

	  _proto.intersect = function intersect(rect) {
	    return Rect.intersectRect(this, rect);
	  };

	  _proto.intersection = function intersection(rect) {
	    var intersection = this.intersection_ || (this.intersection_ = {
	      left: 0,
	      top: 0,
	      width: 0,
	      height: 0,
	      x: 0,
	      y: 0,
	      pow: {
	        x: -1,
	        y: -1
	      },
	      offset: function offset(_offset) {
	        _offset = _offset || 0;
	        var pow = (this.top - this.rect.height / 2 + _offset) / -this.height;
	        return pow;
	      },
	      scroll: function scroll(offset) {
	        offset = offset || 0;
	        var pow = (this.top - this.rect.height / 2 + offset) / -this.height;
	        return pow;
	      }
	    });
	    intersection.left = this.left;
	    intersection.top = this.top;
	    intersection.width = this.width;
	    intersection.height = this.height;
	    intersection.x = this.left + this.width / 2;
	    intersection.y = this.top + this.height / 2;
	    intersection.rect = rect;
	    var pow = intersection.offset(0);
	    intersection.pow.y = pow;
	    return intersection;
	  };

	  return Rect;
	}();

	var Ground = function (_Polygon) {
	  inheritsLoose(Ground, _Polygon);

	  function Ground() {
	    var _this;

	    _this = _Polygon.call(this) || this;
	    var canvas = State.canvas;
	    _this.rect = new Rect(20, 20, canvas.size.x - 40, canvas.size.y - 40);

	    _this.init();

	    return _this;
	  }

	  var _proto = Ground.prototype;

	  _proto.init = function init() {
	    var rect = this.rect;
	    this.segments = [new Segment(rect.left, rect.top, rect.right, rect.top), new Segment(rect.right, rect.top, rect.right, rect.bottom), new Segment(rect.right, rect.bottom, rect.left, rect.bottom), new Segment(rect.left, rect.bottom, rect.left, rect.top)];
	  };

	  _proto.remove = function remove(polygon, firstSegment, lastSegment) {
	    if (polygon.segments.length) {
	      console.log(firstSegment, lastSegment);
	      var i1 = this.segments.indexOf(firstSegment);
	      var i2 = this.segments.indexOf(lastSegment);

	      if (i1 !== -1 && i2 !== -1) {
	        console.log('close!', i1, i2);
	        var cutPoints = polygon.getPoints(true);
	        console.log('cutPoints.length', cutPoints.length, polygon.segments.length);
	        var min = Math.min(i1, i2);
	        var max = Math.max(i1, i2);
	        var points = [];

	        for (var i = 0; i <= min; i++) {
	          var s = this.segments[i];
	          points.push(s.a);
	        }

	        var first = cutPoints[0];
	        var last = cutPoints[cutPoints.length - 1];

	        if (last.distanceTo(points[points.length - 1]) < first.distanceTo(points[points.length - 1])) {
	          cutPoints.reverse();
	        }

	        points.push.apply(points, cutPoints);

	        for (var _i = max + 1; _i < this.segments.length; _i++) {
	          var _s = this.segments[_i];
	          points.push(_s.a);
	        }

	        points.push(points[0]);
	        this.rebuild(points);
	      }
	    }
	  };

	  _proto.draw = function draw() {
	    var canvas = State.canvas;
	    var ctx = canvas.ctx;
	    var packaging = State.resources.get(State.assets.packaging);
	    ctx.drawImage(packaging, 0, 0, packaging.naturalWidth, packaging.naturalHeight, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
	    ctx.beginPath();
	    ctx.lineWidth = "3";
	    ctx.strokeStyle = "black";
	    var t = this.segments.length;

	    for (var i = 0; i < t; i++) {
	      var s = this.segments[i];

	      if (i === 0) {
	        ctx.moveTo(s.a.x, s.a.y);
	      } else {
	        ctx.lineTo(s.a.x, s.a.y);
	      }
	    }

	    ctx.closePath();
	    ctx.save();
	    ctx.clip();
	    var designer = State.resources.get(State.assets.designer);
	    ctx.drawImage(designer, 0, 0, designer.naturalWidth, designer.naturalHeight, this.rect.x, this.rect.y, this.rect.width, this.rect.height);
	    ctx.restore();
	    ctx.stroke();
	    ctx.strokeRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
	  };

	  _proto.x = function x(_x) {
	    return this.rect.left + _x * this.rect.width;
	  };

	  _proto.y = function y(_y) {
	    return this.rect.top + _y * this.rect.height;
	  };

	  return Ground;
	}(Polygon);

	var Player = function () {
	  createClass(Player, [{
	    key: "nx",
	    get: function get() {
	      return this.position.x + this.direction.x * this.speed;
	    }
	  }, {
	    key: "ny",
	    get: function get() {
	      return this.position.y + this.direction.y * this.speed;
	    }
	  }]);

	  function Player() {
	    var ground = State.ground;
	    this.position = new Vector2(ground.x(0.5), ground.y(1));
	    this.direction = new Vector2(0, 0);
	    this.speed = 5;
	    this.segment = new Segment();
	    this.active = false;
	  }

	  var _proto = Player.prototype;

	  _proto.update = function update() {
	    this.checkDirection();
	    this.move();
	    this.draw();
	  };

	  _proto.draw = function draw() {
	    var canvas = State.canvas;
	    var ctx = canvas.ctx;
	    var diamond = State.resources.get(State.assets.diamond);
	    canvas.drawImage(diamond, this.position.x, this.position.y, 1, this.getOrientation() === 0 ? Math.PI / 2 : 0);
	  };

	  _proto.getOrientation = function getOrientation() {
	    var o = 0;

	    if (this.currentSegment && Math.abs(this.currentSegment.a.x - this.currentSegment.b.x) < 1) {
	      o = 1;
	    }

	    return o;
	  };

	  _proto.checkDirection = function checkDirection() {
	    this.active = State.keys.shift || State.keys.space;
	    var direction = this.direction;

	    if (State.keys.left) {
	      direction.x = -1;
	      direction.y = 0;
	    } else if (State.keys.right) {
	      direction.x = 1;
	      direction.y = 0;
	    } else if (State.keys.up) {
	      direction.x = 0;
	      direction.y = -1;
	    } else if (State.keys.down) {
	      direction.x = 0;
	      direction.y = 1;
	    } else {
	      direction.x = 0;
	      direction.y = 0;
	    }
	  };

	  _proto.move = function move() {
	    var ground = State.ground;
	    var cut = State.cut;
	    var nx = this.nx;
	    var ny = this.ny;
	    var segment = this.segment;
	    segment.a.set(this.position.x, this.position.y);
	    segment.b.set(nx, ny);
	    var hitted;

	    if (this.active && (this.direction.x || this.direction.y)) {
	      if (hitted = ground.hit(this, 2)) {
	        console.log('hitted');

	        if (hitted instanceof Segment && cut.segments.length) {
	          var i = hitted.getIntersection(this.segment);

	          if (i && (i.intersectA || i.intersectB)) {
	            this.position.x = i.x;
	            this.position.y = i.y;
	          }

	          var _segment = cut.segments[cut.segments.length - 1];
	          _segment.b.x = this.position.x;
	          _segment.b.y = this.position.y;
	          this.lastSegment = hitted;
	          this.currentSegment = hitted;
	          this.direction.x = 0;
	          this.direction.y = 0;
	          console.log('cut.segments.length', cut.segments.length);
	          ground.remove(cut, this.firstSegment, this.lastSegment);
	          cut.segments = [];
	        }
	      } else if (!ground.inside(this)) {
	        console.log('outside');
	        this.direction.x = 0;
	        this.direction.y = 0;
	      } else if (cut.hitSegments(this, 3)) {
	        cut.reset(this);
	        this.direction.x = 0;
	        this.direction.y = 0;
	      } else {
	        cut.move(this);
	        this.currentSegment = cut.segments[cut.segments.length - 1];
	      }
	    } else {
	      hitted = ground.hit(this, 3);

	      if (hitted) {
	        this.firstSegment = hitted;
	        this.currentSegment = hitted;
	      } else {
	        this.direction.x = 0;
	        this.direction.y = 0;
	      }
	    }

	    this.position.x = this.nx;
	    this.position.y = this.ny;
	  };

	  return Player;
	}();

	var cache = {};
	var callbacks = [];

	var Resources = function () {
	  function Resources() {}

	  Resources.loadAssets = function loadAssets(assets) {
	    this.load(Object.keys(assets).map(function (k) {
	      return assets[k];
	    }));
	  };

	  Resources.load = function load(urlOrArr) {
	    if (urlOrArr instanceof Array) {
	      urlOrArr.forEach(function (url) {
	        Resources.loadUrl(url);
	      });
	    } else {
	      Resources.loadUrl(urlOrArr);
	    }
	  };

	  Resources.loadUrl = function loadUrl(url) {
	    if (cache[url]) {
	      return cache[url];
	    } else {
	      var image = new Image();

	      image.onload = function () {
	        cache[url] = image;

	        if (Resources.isReady()) {
	          callbacks.forEach(function (callback) {
	            callback();
	          });
	        }
	      };

	      cache[url] = false;
	      image.src = url;
	    }
	  };

	  Resources.get = function get(url) {
	    return cache[url];
	  };

	  Resources.isReady = function isReady() {
	    var ready = true;

	    for (var k in cache) {
	      if (cache.hasOwnProperty(k) && !cache[k]) {
	        ready = false;
	      }
	    }

	    return ready;
	  };

	  Resources.onReady = function onReady(callback) {
	    callbacks.push(callback);
	  };

	  return Resources;
	}();

	var Game = function () {
	  function Game() {
	    var _this = this;

	    var canvas = this.canvas = State.canvas = new Canvas();
	    var ground = this.ground = State.ground = new Ground();
	    var cut = this.cut = State.cut = new Cut();
	    var enemies = State.enemies = new Array(3).fill(0).map(function (x) {
	      return new Enemy();
	    });
	    var player = State.player = new Player();
	    var assets = State.assets = {
	      designer: './img/game/designer.jpg',
	      packaging: './img/game/packaging.jpg',
	      mouth: './img/game/mouth.png',
	      diamond: './img/game/diamond.png'
	    };
	    var resources = State.resources = Resources;
	    Resources.onReady(function () {
	      _this.init();
	    });
	    Resources.loadAssets(assets);
	  }

	  var _proto = Game.prototype;

	  _proto.init = function init() {
	    this.loop = this.loop.bind(this);
	    this.onKeydown = this.onKeydown.bind(this);
	    this.onKeyup = this.onKeyup.bind(this);
	    document.addEventListener("keydown", this.onKeydown);
	    document.addEventListener("keyup", this.onKeyup);
	    this.loop();
	  };

	  _proto.loop = function loop() {
	    {
	      if (!State.paused) {
	        State.canvas.update();
	        State.ground.update();
	        State.cut.update();
	        State.enemies.forEach(function (x) {
	          return x.update();
	        });
	        State.player.update();
	        requestAnimationFrame(this.loop);
	      }
	    }
	  };

	  _proto.toggle = function toggle() {
	    if (State.paused) {
	      State.paused = false;
	      this.loop();
	    } else {
	      State.paused = true;
	    }
	  };

	  _proto.onKeydown = function onKeydown(event) {
	    var keys = State.keys;
	    Object.keys(keys).forEach(function (key) {
	      keys[key] = false;
	    });
	    keys.shift = event.shiftKey;

	    switch (event.keyCode) {
	      case 32:
	        event.preventDefault();
	        keys.space = true;
	        break;

	      case 37:
	        event.preventDefault();
	        keys.left = true;
	        break;

	      case 38:
	        event.preventDefault();
	        keys.up = true;
	        break;

	      case 39:
	        event.preventDefault();
	        keys.right = true;
	        break;

	      case 40:
	        event.preventDefault();
	        keys.down = true;
	        break;

	      case 112:
	        this.toggle();
	        break;

	      case 80:
	        this.toggle();
	        break;
	    }
	  };

	  _proto.onKeyup = function onKeyup(event) {
	    var keys = State.keys;

	    switch (event.keyCode) {
	      case 32:
	        event.preventDefault();
	        keys.space = false;
	        break;

	      case 37:
	        event.preventDefault();
	        keys.left = false;
	        break;

	      case 38:
	        event.preventDefault();
	        keys.up = false;
	        break;

	      case 39:
	        event.preventDefault();
	        keys.right = false;
	        break;

	      case 40:
	        event.preventDefault();
	        keys.down = false;
	        break;
	    }
	  };

	  return Game;
	}();

	var game = new Game();

}());
//# sourceMappingURL=main.js.map
