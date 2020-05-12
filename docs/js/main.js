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

	  return Canvas;
	}();

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var inheritsLoose = _inheritsLoose;

	// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
	// MIT License
	// Project Home: https://github.com/voidqk/polybooljs

	//
	// used strictly for logging the processing of the algorithm... only useful if you intend on
	// looking under the covers (for pretty UI's or debugging)
	//

	function BuildLog(){
		var my;
		var nextSegmentId = 0;
		var curVert = false;

		function push(type, data){
			my.list.push({
				type: type,
				data: data ? JSON.parse(JSON.stringify(data)) : void 0
			});
			return my;
		}

		my = {
			list: [],
			segmentId: function(){
				return nextSegmentId++;
			},
			checkIntersection: function(seg1, seg2){
				return push('check', { seg1: seg1, seg2: seg2 });
			},
			segmentChop: function(seg, end){
				push('div_seg', { seg: seg, pt: end });
				return push('chop', { seg: seg, pt: end });
			},
			statusRemove: function(seg){
				return push('pop_seg', { seg: seg });
			},
			segmentUpdate: function(seg){
				return push('seg_update', { seg: seg });
			},
			segmentNew: function(seg, primary){
				return push('new_seg', { seg: seg, primary: primary });
			},
			segmentRemove: function(seg){
				return push('rem_seg', { seg: seg });
			},
			tempStatus: function(seg, above, below){
				return push('temp_status', { seg: seg, above: above, below: below });
			},
			rewind: function(seg){
				return push('rewind', { seg: seg });
			},
			status: function(seg, above, below){
				return push('status', { seg: seg, above: above, below: below });
			},
			vert: function(x){
				if (x === curVert)
					return my;
				curVert = x;
				return push('vert', { x: x });
			},
			log: function(data){
				if (typeof data !== 'string')
					data = JSON.stringify(data, false, '  ');
				return push('log', { txt: data });
			},
			reset: function(){
				return push('reset');
			},
			selected: function(segs){
				return push('selected', { segs: segs });
			},
			chainStart: function(seg){
				return push('chain_start', { seg: seg });
			},
			chainRemoveHead: function(index, pt){
				return push('chain_rem_head', { index: index, pt: pt });
			},
			chainRemoveTail: function(index, pt){
				return push('chain_rem_tail', { index: index, pt: pt });
			},
			chainNew: function(pt1, pt2){
				return push('chain_new', { pt1: pt1, pt2: pt2 });
			},
			chainMatch: function(index){
				return push('chain_match', { index: index });
			},
			chainClose: function(index){
				return push('chain_close', { index: index });
			},
			chainAddHead: function(index, pt){
				return push('chain_add_head', { index: index, pt: pt });
			},
			chainAddTail: function(index, pt){
				return push('chain_add_tail', { index: index, pt: pt, });
			},
			chainConnect: function(index1, index2){
				return push('chain_con', { index1: index1, index2: index2 });
			},
			chainReverse: function(index){
				return push('chain_rev', { index: index });
			},
			chainJoin: function(index1, index2){
				return push('chain_join', { index1: index1, index2: index2 });
			},
			done: function(){
				return push('done');
			}
		};
		return my;
	}

	var buildLog = BuildLog;

	// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
	// MIT License
	// Project Home: https://github.com/voidqk/polybooljs

	//
	// provides the raw computation functions that takes epsilon into account
	//
	// zero is defined to be between (-epsilon, epsilon) exclusive
	//

	function Epsilon(eps){
		if (typeof eps !== 'number')
			eps = 0.0000000001; // sane default? sure why not
		var my = {
			epsilon: function(v){
				if (typeof v === 'number')
					eps = v;
				return eps;
			},
			pointAboveOrOnLine: function(pt, left, right){
				var Ax = left[0];
				var Ay = left[1];
				var Bx = right[0];
				var By = right[1];
				var Cx = pt[0];
				var Cy = pt[1];
				return (Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax) >= -eps;
			},
			pointBetween: function(p, left, right){
				// p must be collinear with left->right
				// returns false if p == left, p == right, or left == right
				var d_py_ly = p[1] - left[1];
				var d_rx_lx = right[0] - left[0];
				var d_px_lx = p[0] - left[0];
				var d_ry_ly = right[1] - left[1];

				var dot = d_px_lx * d_rx_lx + d_py_ly * d_ry_ly;
				// if `dot` is 0, then `p` == `left` or `left` == `right` (reject)
				// if `dot` is less than 0, then `p` is to the left of `left` (reject)
				if (dot < eps)
					return false;

				var sqlen = d_rx_lx * d_rx_lx + d_ry_ly * d_ry_ly;
				// if `dot` > `sqlen`, then `p` is to the right of `right` (reject)
				// therefore, if `dot - sqlen` is greater than 0, then `p` is to the right of `right` (reject)
				if (dot - sqlen > -eps)
					return false;

				return true;
			},
			pointsSameX: function(p1, p2){
				return Math.abs(p1[0] - p2[0]) < eps;
			},
			pointsSameY: function(p1, p2){
				return Math.abs(p1[1] - p2[1]) < eps;
			},
			pointsSame: function(p1, p2){
				return my.pointsSameX(p1, p2) && my.pointsSameY(p1, p2);
			},
			pointsCompare: function(p1, p2){
				// returns -1 if p1 is smaller, 1 if p2 is smaller, 0 if equal
				if (my.pointsSameX(p1, p2))
					return my.pointsSameY(p1, p2) ? 0 : (p1[1] < p2[1] ? -1 : 1);
				return p1[0] < p2[0] ? -1 : 1;
			},
			pointsCollinear: function(pt1, pt2, pt3){
				// does pt1->pt2->pt3 make a straight line?
				// essentially this is just checking to see if the slope(pt1->pt2) === slope(pt2->pt3)
				// if slopes are equal, then they must be collinear, because they share pt2
				var dx1 = pt1[0] - pt2[0];
				var dy1 = pt1[1] - pt2[1];
				var dx2 = pt2[0] - pt3[0];
				var dy2 = pt2[1] - pt3[1];
				return Math.abs(dx1 * dy2 - dx2 * dy1) < eps;
			},
			linesIntersect: function(a0, a1, b0, b1){
				// returns false if the lines are coincident (e.g., parallel or on top of each other)
				//
				// returns an object if the lines intersect:
				//   {
				//     pt: [x, y],    where the intersection point is at
				//     alongA: where intersection point is along A,
				//     alongB: where intersection point is along B
				//   }
				//
				//  alongA and alongB will each be one of: -2, -1, 0, 1, 2
				//
				//  with the following meaning:
				//
				//    -2   intersection point is before segment's first point
				//    -1   intersection point is directly on segment's first point
				//     0   intersection point is between segment's first and second points (exclusive)
				//     1   intersection point is directly on segment's second point
				//     2   intersection point is after segment's second point
				var adx = a1[0] - a0[0];
				var ady = a1[1] - a0[1];
				var bdx = b1[0] - b0[0];
				var bdy = b1[1] - b0[1];

				var axb = adx * bdy - ady * bdx;
				if (Math.abs(axb) < eps)
					return false; // lines are coincident

				var dx = a0[0] - b0[0];
				var dy = a0[1] - b0[1];

				var A = (bdx * dy - bdy * dx) / axb;
				var B = (adx * dy - ady * dx) / axb;

				var ret = {
					alongA: 0,
					alongB: 0,
					pt: [
						a0[0] + A * adx,
						a0[1] + A * ady
					]
				};

				// categorize where intersection point is along A and B

				if (A <= -eps)
					ret.alongA = -2;
				else if (A < eps)
					ret.alongA = -1;
				else if (A - 1 <= -eps)
					ret.alongA = 0;
				else if (A - 1 < eps)
					ret.alongA = 1;
				else
					ret.alongA = 2;

				if (B <= -eps)
					ret.alongB = -2;
				else if (B < eps)
					ret.alongB = -1;
				else if (B - 1 <= -eps)
					ret.alongB = 0;
				else if (B - 1 < eps)
					ret.alongB = 1;
				else
					ret.alongB = 2;

				return ret;
			},
			pointInsideRegion: function(pt, region){
				var x = pt[0];
				var y = pt[1];
				var last_x = region[region.length - 1][0];
				var last_y = region[region.length - 1][1];
				var inside = false;
				for (var i = 0; i < region.length; i++){
					var curr_x = region[i][0];
					var curr_y = region[i][1];

					// if y is between curr_y and last_y, and
					// x is to the right of the boundary created by the line
					if ((curr_y - y > eps) != (last_y - y > eps) &&
						(last_x - curr_x) * (y - curr_y) / (last_y - curr_y) + curr_x - x > eps)
						inside = !inside;

					last_x = curr_x;
					last_y = curr_y;
				}
				return inside;
			}
		};
		return my;
	}

	var epsilon = Epsilon;

	// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
	// MIT License
	// Project Home: https://github.com/voidqk/polybooljs

	//
	// simple linked list implementation that allows you to traverse down nodes and save positions
	//

	var LinkedList = {
		create: function(){
			var my = {
				root: { root: true, next: null },
				exists: function(node){
					if (node === null || node === my.root)
						return false;
					return true;
				},
				isEmpty: function(){
					return my.root.next === null;
				},
				getHead: function(){
					return my.root.next;
				},
				insertBefore: function(node, check){
					var last = my.root;
					var here = my.root.next;
					while (here !== null){
						if (check(here)){
							node.prev = here.prev;
							node.next = here;
							here.prev.next = node;
							here.prev = node;
							return;
						}
						last = here;
						here = here.next;
					}
					last.next = node;
					node.prev = last;
					node.next = null;
				},
				findTransition: function(check){
					var prev = my.root;
					var here = my.root.next;
					while (here !== null){
						if (check(here))
							break;
						prev = here;
						here = here.next;
					}
					return {
						before: prev === my.root ? null : prev,
						after: here,
						insert: function(node){
							node.prev = prev;
							node.next = here;
							prev.next = node;
							if (here !== null)
								here.prev = node;
							return node;
						}
					};
				}
			};
			return my;
		},
		node: function(data){
			data.prev = null;
			data.next = null;
			data.remove = function(){
				data.prev.next = data.next;
				if (data.next)
					data.next.prev = data.prev;
				data.prev = null;
				data.next = null;
			};
			return data;
		}
	};

	var linkedList = LinkedList;

	// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
	// MIT License
	// Project Home: https://github.com/voidqk/polybooljs

	//
	// this is the core work-horse
	//



	function Intersecter(selfIntersection, eps, buildLog){
		// selfIntersection is true/false depending on the phase of the overall algorithm

		//
		// segment creation
		//

		function segmentNew(start, end){
			return {
				id: buildLog ? buildLog.segmentId() : -1,
				start: start,
				end: end,
				myFill: {
					above: null, // is there fill above us?
					below: null  // is there fill below us?
				},
				otherFill: null
			};
		}

		function segmentCopy(start, end, seg){
			return {
				id: buildLog ? buildLog.segmentId() : -1,
				start: start,
				end: end,
				myFill: {
					above: seg.myFill.above,
					below: seg.myFill.below
				},
				otherFill: null
			};
		}

		//
		// event logic
		//

		var event_root = linkedList.create();

		function eventCompare(p1_isStart, p1_1, p1_2, p2_isStart, p2_1, p2_2){
			// compare the selected points first
			var comp = eps.pointsCompare(p1_1, p2_1);
			if (comp !== 0)
				return comp;
			// the selected points are the same

			if (eps.pointsSame(p1_2, p2_2)) // if the non-selected points are the same too...
				return 0; // then the segments are equal

			if (p1_isStart !== p2_isStart) // if one is a start and the other isn't...
				return p1_isStart ? 1 : -1; // favor the one that isn't the start

			// otherwise, we'll have to calculate which one is below the other manually
			return eps.pointAboveOrOnLine(p1_2,
				p2_isStart ? p2_1 : p2_2, // order matters
				p2_isStart ? p2_2 : p2_1
			) ? 1 : -1;
		}

		function eventAdd(ev, other_pt){
			event_root.insertBefore(ev, function(here){
				// should ev be inserted before here?
				var comp = eventCompare(
					ev  .isStart, ev  .pt,      other_pt,
					here.isStart, here.pt, here.other.pt
				);
				return comp < 0;
			});
		}

		function eventAddSegmentStart(seg, primary){
			var ev_start = linkedList.node({
				isStart: true,
				pt: seg.start,
				seg: seg,
				primary: primary,
				other: null,
				status: null
			});
			eventAdd(ev_start, seg.end);
			return ev_start;
		}

		function eventAddSegmentEnd(ev_start, seg, primary){
			var ev_end = linkedList.node({
				isStart: false,
				pt: seg.end,
				seg: seg,
				primary: primary,
				other: ev_start,
				status: null
			});
			ev_start.other = ev_end;
			eventAdd(ev_end, ev_start.pt);
		}

		function eventAddSegment(seg, primary){
			var ev_start = eventAddSegmentStart(seg, primary);
			eventAddSegmentEnd(ev_start, seg, primary);
			return ev_start;
		}

		function eventUpdateEnd(ev, end){
			// slides an end backwards
			//   (start)------------(end)    to:
			//   (start)---(end)

			if (buildLog)
				buildLog.segmentChop(ev.seg, end);

			ev.other.remove();
			ev.seg.end = end;
			ev.other.pt = end;
			eventAdd(ev.other, ev.pt);
		}

		function eventDivide(ev, pt){
			var ns = segmentCopy(pt, ev.seg.end, ev.seg);
			eventUpdateEnd(ev, pt);
			return eventAddSegment(ns, ev.primary);
		}

		function calculate(primaryPolyInverted, secondaryPolyInverted){
			// if selfIntersection is true then there is no secondary polygon, so that isn't used

			//
			// status logic
			//

			var status_root = linkedList.create();

			function statusCompare(ev1, ev2){
				var a1 = ev1.seg.start;
				var a2 = ev1.seg.end;
				var b1 = ev2.seg.start;
				var b2 = ev2.seg.end;

				if (eps.pointsCollinear(a1, b1, b2)){
					if (eps.pointsCollinear(a2, b1, b2))
						return 1;//eventCompare(true, a1, a2, true, b1, b2);
					return eps.pointAboveOrOnLine(a2, b1, b2) ? 1 : -1;
				}
				return eps.pointAboveOrOnLine(a1, b1, b2) ? 1 : -1;
			}

			function statusFindSurrounding(ev){
				return status_root.findTransition(function(here){
					var comp = statusCompare(ev, here.ev);
					return comp > 0;
				});
			}

			function checkIntersection(ev1, ev2){
				// returns the segment equal to ev1, or false if nothing equal

				var seg1 = ev1.seg;
				var seg2 = ev2.seg;
				var a1 = seg1.start;
				var a2 = seg1.end;
				var b1 = seg2.start;
				var b2 = seg2.end;

				if (buildLog)
					buildLog.checkIntersection(seg1, seg2);

				var i = eps.linesIntersect(a1, a2, b1, b2);

				if (i === false){
					// segments are parallel or coincident

					// if points aren't collinear, then the segments are parallel, so no intersections
					if (!eps.pointsCollinear(a1, a2, b1))
						return false;
					// otherwise, segments are on top of each other somehow (aka coincident)

					if (eps.pointsSame(a1, b2) || eps.pointsSame(a2, b1))
						return false; // segments touch at endpoints... no intersection

					var a1_equ_b1 = eps.pointsSame(a1, b1);
					var a2_equ_b2 = eps.pointsSame(a2, b2);

					if (a1_equ_b1 && a2_equ_b2)
						return ev2; // segments are exactly equal

					var a1_between = !a1_equ_b1 && eps.pointBetween(a1, b1, b2);
					var a2_between = !a2_equ_b2 && eps.pointBetween(a2, b1, b2);

					// handy for debugging:
					// buildLog.log({
					//	a1_equ_b1: a1_equ_b1,
					//	a2_equ_b2: a2_equ_b2,
					//	a1_between: a1_between,
					//	a2_between: a2_between
					// });

					if (a1_equ_b1){
						if (a2_between){
							//  (a1)---(a2)
							//  (b1)----------(b2)
							eventDivide(ev2, a2);
						}
						else {
							//  (a1)----------(a2)
							//  (b1)---(b2)
							eventDivide(ev1, b2);
						}
						return ev2;
					}
					else if (a1_between){
						if (!a2_equ_b2){
							// make a2 equal to b2
							if (a2_between){
								//         (a1)---(a2)
								//  (b1)-----------------(b2)
								eventDivide(ev2, a2);
							}
							else {
								//         (a1)----------(a2)
								//  (b1)----------(b2)
								eventDivide(ev1, b2);
							}
						}

						//         (a1)---(a2)
						//  (b1)----------(b2)
						eventDivide(ev2, a1);
					}
				}
				else {
					// otherwise, lines intersect at i.pt, which may or may not be between the endpoints

					// is A divided between its endpoints? (exclusive)
					if (i.alongA === 0){
						if (i.alongB === -1) // yes, at exactly b1
							eventDivide(ev1, b1);
						else if (i.alongB === 0) // yes, somewhere between B's endpoints
							eventDivide(ev1, i.pt);
						else if (i.alongB === 1) // yes, at exactly b2
							eventDivide(ev1, b2);
					}

					// is B divided between its endpoints? (exclusive)
					if (i.alongB === 0){
						if (i.alongA === -1) // yes, at exactly a1
							eventDivide(ev2, a1);
						else if (i.alongA === 0) // yes, somewhere between A's endpoints (exclusive)
							eventDivide(ev2, i.pt);
						else if (i.alongA === 1) // yes, at exactly a2
							eventDivide(ev2, a2);
					}
				}
				return false;
			}

			//
			// main event loop
			//
			var segments = [];
			while (!event_root.isEmpty()){
				var ev = event_root.getHead();

				if (buildLog)
					buildLog.vert(ev.pt[0]);

				if (ev.isStart){

					if (buildLog)
						buildLog.segmentNew(ev.seg, ev.primary);

					var surrounding = statusFindSurrounding(ev);
					var above = surrounding.before ? surrounding.before.ev : null;
					var below = surrounding.after ? surrounding.after.ev : null;

					if (buildLog){
						buildLog.tempStatus(
							ev.seg,
							above ? above.seg : false,
							below ? below.seg : false
						);
					}

					function checkBothIntersections(){
						if (above){
							var eve = checkIntersection(ev, above);
							if (eve)
								return eve;
						}
						if (below)
							return checkIntersection(ev, below);
						return false;
					}

					var eve = checkBothIntersections();
					if (eve){
						// ev and eve are equal
						// we'll keep eve and throw away ev

						// merge ev.seg's fill information into eve.seg

						if (selfIntersection){
							var toggle; // are we a toggling edge?
							if (ev.seg.myFill.below === null)
								toggle = true;
							else
								toggle = ev.seg.myFill.above !== ev.seg.myFill.below;

							// merge two segments that belong to the same polygon
							// think of this as sandwiching two segments together, where `eve.seg` is
							// the bottom -- this will cause the above fill flag to toggle
							if (toggle)
								eve.seg.myFill.above = !eve.seg.myFill.above;
						}
						else {
							// merge two segments that belong to different polygons
							// each segment has distinct knowledge, so no special logic is needed
							// note that this can only happen once per segment in this phase, because we
							// are guaranteed that all self-intersections are gone
							eve.seg.otherFill = ev.seg.myFill;
						}

						if (buildLog)
							buildLog.segmentUpdate(eve.seg);

						ev.other.remove();
						ev.remove();
					}

					if (event_root.getHead() !== ev){
						// something was inserted before us in the event queue, so loop back around and
						// process it before continuing
						if (buildLog)
							buildLog.rewind(ev.seg);
						continue;
					}

					//
					// calculate fill flags
					//
					if (selfIntersection){
						var toggle; // are we a toggling edge?
						if (ev.seg.myFill.below === null) // if we are a new segment...
							toggle = true; // then we toggle
						else // we are a segment that has previous knowledge from a division
							toggle = ev.seg.myFill.above !== ev.seg.myFill.below; // calculate toggle

						// next, calculate whether we are filled below us
						if (!below){ // if nothing is below us...
							// we are filled below us if the polygon is inverted
							ev.seg.myFill.below = primaryPolyInverted;
						}
						else {
							// otherwise, we know the answer -- it's the same if whatever is below
							// us is filled above it
							ev.seg.myFill.below = below.seg.myFill.above;
						}

						// since now we know if we're filled below us, we can calculate whether
						// we're filled above us by applying toggle to whatever is below us
						if (toggle)
							ev.seg.myFill.above = !ev.seg.myFill.below;
						else
							ev.seg.myFill.above = ev.seg.myFill.below;
					}
					else {
						// now we fill in any missing transition information, since we are all-knowing
						// at this point

						if (ev.seg.otherFill === null){
							// if we don't have other information, then we need to figure out if we're
							// inside the other polygon
							var inside;
							if (!below){
								// if nothing is below us, then we're inside if the other polygon is
								// inverted
								inside =
									ev.primary ? secondaryPolyInverted : primaryPolyInverted;
							}
							else { // otherwise, something is below us
								// so copy the below segment's other polygon's above
								if (ev.primary === below.primary)
									inside = below.seg.otherFill.above;
								else
									inside = below.seg.myFill.above;
							}
							ev.seg.otherFill = {
								above: inside,
								below: inside
							};
						}
					}

					if (buildLog){
						buildLog.status(
							ev.seg,
							above ? above.seg : false,
							below ? below.seg : false
						);
					}

					// insert the status and remember it for later removal
					ev.other.status = surrounding.insert(linkedList.node({ ev: ev }));
				}
				else {
					var st = ev.status;

					if (st === null){
						throw new Error('PolyBool: Zero-length segment detected; your epsilon is ' +
							'probably too small or too large');
					}

					// removing the status will create two new adjacent edges, so we'll need to check
					// for those
					if (status_root.exists(st.prev) && status_root.exists(st.next))
						checkIntersection(st.prev.ev, st.next.ev);

					if (buildLog)
						buildLog.statusRemove(st.ev.seg);

					// remove the status
					st.remove();

					// if we've reached this point, we've calculated everything there is to know, so
					// save the segment for reporting
					if (!ev.primary){
						// make sure `seg.myFill` actually points to the primary polygon though
						var s = ev.seg.myFill;
						ev.seg.myFill = ev.seg.otherFill;
						ev.seg.otherFill = s;
					}
					segments.push(ev.seg);
				}

				// remove the event and continue
				event_root.getHead().remove();
			}

			if (buildLog)
				buildLog.done();

			return segments;
		}

		// return the appropriate API depending on what we're doing
		if (!selfIntersection){
			// performing combination of polygons, so only deal with already-processed segments
			return {
				calculate: function(segments1, inverted1, segments2, inverted2){
					// segmentsX come from the self-intersection API, or this API
					// invertedX is whether we treat that list of segments as an inverted polygon or not
					// returns segments that can be used for further operations
					segments1.forEach(function(seg){
						eventAddSegment(segmentCopy(seg.start, seg.end, seg), true);
					});
					segments2.forEach(function(seg){
						eventAddSegment(segmentCopy(seg.start, seg.end, seg), false);
					});
					return calculate(inverted1, inverted2);
				}
			};
		}

		// otherwise, performing self-intersection, so deal with regions
		return {
			addRegion: function(region){
				// regions are a list of points:
				//  [ [0, 0], [100, 0], [50, 100] ]
				// you can add multiple regions before running calculate
				var pt1;
				var pt2 = region[region.length - 1];
				for (var i = 0; i < region.length; i++){
					pt1 = pt2;
					pt2 = region[i];

					var forward = eps.pointsCompare(pt1, pt2);
					if (forward === 0) // points are equal, so we have a zero-length segment
						continue; // just skip it

					eventAddSegment(
						segmentNew(
							forward < 0 ? pt1 : pt2,
							forward < 0 ? pt2 : pt1
						),
						true
					);
				}
			},
			calculate: function(inverted){
				// is the polygon inverted?
				// returns segments
				return calculate(inverted, false);
			}
		};
	}

	var intersecter = Intersecter;

	// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
	// MIT License
	// Project Home: https://github.com/voidqk/polybooljs

	//
	// converts a list of segments into a list of regions, while also removing unnecessary verticies
	//

	function SegmentChainer(segments, eps, buildLog){
		var chains = [];
		var regions = [];

		segments.forEach(function(seg){
			var pt1 = seg.start;
			var pt2 = seg.end;
			if (eps.pointsSame(pt1, pt2)){
				console.warn('PolyBool: Warning: Zero-length segment detected; your epsilon is ' +
					'probably too small or too large');
				return;
			}

			if (buildLog)
				buildLog.chainStart(seg);

			// search for two chains that this segment matches
			var first_match = {
				index: 0,
				matches_head: false,
				matches_pt1: false
			};
			var second_match = {
				index: 0,
				matches_head: false,
				matches_pt1: false
			};
			var next_match = first_match;
			function setMatch(index, matches_head, matches_pt1){
				// return true if we've matched twice
				next_match.index = index;
				next_match.matches_head = matches_head;
				next_match.matches_pt1 = matches_pt1;
				if (next_match === first_match){
					next_match = second_match;
					return false;
				}
				next_match = null;
				return true; // we've matched twice, we're done here
			}
			for (var i = 0; i < chains.length; i++){
				var chain = chains[i];
				var head  = chain[0];
				var head2 = chain[1];
				var tail  = chain[chain.length - 1];
				var tail2 = chain[chain.length - 2];
				if (eps.pointsSame(head, pt1)){
					if (setMatch(i, true, true))
						break;
				}
				else if (eps.pointsSame(head, pt2)){
					if (setMatch(i, true, false))
						break;
				}
				else if (eps.pointsSame(tail, pt1)){
					if (setMatch(i, false, true))
						break;
				}
				else if (eps.pointsSame(tail, pt2)){
					if (setMatch(i, false, false))
						break;
				}
			}

			if (next_match === first_match){
				// we didn't match anything, so create a new chain
				chains.push([ pt1, pt2 ]);
				if (buildLog)
					buildLog.chainNew(pt1, pt2);
				return;
			}

			if (next_match === second_match){
				// we matched a single chain

				if (buildLog)
					buildLog.chainMatch(first_match.index);

				// add the other point to the apporpriate end, and check to see if we've closed the
				// chain into a loop

				var index = first_match.index;
				var pt = first_match.matches_pt1 ? pt2 : pt1; // if we matched pt1, then we add pt2, etc
				var addToHead = first_match.matches_head; // if we matched at head, then add to the head

				var chain = chains[index];
				var grow  = addToHead ? chain[0] : chain[chain.length - 1];
				var grow2 = addToHead ? chain[1] : chain[chain.length - 2];
				var oppo  = addToHead ? chain[chain.length - 1] : chain[0];
				var oppo2 = addToHead ? chain[chain.length - 2] : chain[1];

				if (eps.pointsCollinear(grow2, grow, pt)){
					// grow isn't needed because it's directly between grow2 and pt:
					// grow2 ---grow---> pt
					if (addToHead){
						if (buildLog)
							buildLog.chainRemoveHead(first_match.index, pt);
						chain.shift();
					}
					else {
						if (buildLog)
							buildLog.chainRemoveTail(first_match.index, pt);
						chain.pop();
					}
					grow = grow2; // old grow is gone... new grow is what grow2 was
				}

				if (eps.pointsSame(oppo, pt)){
					// we're closing the loop, so remove chain from chains
					chains.splice(index, 1);

					if (eps.pointsCollinear(oppo2, oppo, grow)){
						// oppo isn't needed because it's directly between oppo2 and grow:
						// oppo2 ---oppo--->grow
						if (addToHead){
							if (buildLog)
								buildLog.chainRemoveTail(first_match.index, grow);
							chain.pop();
						}
						else {
							if (buildLog)
								buildLog.chainRemoveHead(first_match.index, grow);
							chain.shift();
						}
					}

					if (buildLog)
						buildLog.chainClose(first_match.index);

					// we have a closed chain!
					regions.push(chain);
					return;
				}

				// not closing a loop, so just add it to the apporpriate side
				if (addToHead){
					if (buildLog)
						buildLog.chainAddHead(first_match.index, pt);
					chain.unshift(pt);
				}
				else {
					if (buildLog)
						buildLog.chainAddTail(first_match.index, pt);
					chain.push(pt);
				}
				return;
			}

			// otherwise, we matched two chains, so we need to combine those chains together

			function reverseChain(index){
				if (buildLog)
					buildLog.chainReverse(index);
				chains[index].reverse(); // gee, that's easy
			}

			function appendChain(index1, index2){
				// index1 gets index2 appended to it, and index2 is removed
				var chain1 = chains[index1];
				var chain2 = chains[index2];
				var tail  = chain1[chain1.length - 1];
				var tail2 = chain1[chain1.length - 2];
				var head  = chain2[0];
				var head2 = chain2[1];

				if (eps.pointsCollinear(tail2, tail, head)){
					// tail isn't needed because it's directly between tail2 and head
					// tail2 ---tail---> head
					if (buildLog)
						buildLog.chainRemoveTail(index1, tail);
					chain1.pop();
					tail = tail2; // old tail is gone... new tail is what tail2 was
				}

				if (eps.pointsCollinear(tail, head, head2)){
					// head isn't needed because it's directly between tail and head2
					// tail ---head---> head2
					if (buildLog)
						buildLog.chainRemoveHead(index2, head);
					chain2.shift();
				}

				if (buildLog)
					buildLog.chainJoin(index1, index2);
				chains[index1] = chain1.concat(chain2);
				chains.splice(index2, 1);
			}

			var F = first_match.index;
			var S = second_match.index;

			if (buildLog)
				buildLog.chainConnect(F, S);

			var reverseF = chains[F].length < chains[S].length; // reverse the shorter chain, if needed
			if (first_match.matches_head){
				if (second_match.matches_head){
					if (reverseF){
						// <<<< F <<<< --- >>>> S >>>>
						reverseChain(F);
						// >>>> F >>>> --- >>>> S >>>>
						appendChain(F, S);
					}
					else {
						// <<<< F <<<< --- >>>> S >>>>
						reverseChain(S);
						// <<<< F <<<< --- <<<< S <<<<   logically same as:
						// >>>> S >>>> --- >>>> F >>>>
						appendChain(S, F);
					}
				}
				else {
					// <<<< F <<<< --- <<<< S <<<<   logically same as:
					// >>>> S >>>> --- >>>> F >>>>
					appendChain(S, F);
				}
			}
			else {
				if (second_match.matches_head){
					// >>>> F >>>> --- >>>> S >>>>
					appendChain(F, S);
				}
				else {
					if (reverseF){
						// >>>> F >>>> --- <<<< S <<<<
						reverseChain(F);
						// <<<< F <<<< --- <<<< S <<<<   logically same as:
						// >>>> S >>>> --- >>>> F >>>>
						appendChain(S, F);
					}
					else {
						// >>>> F >>>> --- <<<< S <<<<
						reverseChain(S);
						// >>>> F >>>> --- >>>> S >>>>
						appendChain(F, S);
					}
				}
			}
		});

		return regions;
	}

	var segmentChainer = SegmentChainer;

	// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
	// MIT License
	// Project Home: https://github.com/voidqk/polybooljs

	//
	// filter a list of segments based on boolean operations
	//

	function select(segments, selection, buildLog){
		var result = [];
		segments.forEach(function(seg){
			var index =
				(seg.myFill.above ? 8 : 0) +
				(seg.myFill.below ? 4 : 0) +
				((seg.otherFill && seg.otherFill.above) ? 2 : 0) +
				((seg.otherFill && seg.otherFill.below) ? 1 : 0);
			if (selection[index] !== 0){
				// copy the segment to the results, while also calculating the fill status
				result.push({
					id: buildLog ? buildLog.segmentId() : -1,
					start: seg.start,
					end: seg.end,
					myFill: {
						above: selection[index] === 1, // 1 if filled above
						below: selection[index] === 2  // 2 if filled below
					},
					otherFill: null
				});
			}
		});

		if (buildLog)
			buildLog.selected(result);

		return result;
	}

	var SegmentSelector = {
		union: function(segments, buildLog){ // primary | secondary
			// above1 below1 above2 below2    Keep?               Value
			//    0      0      0      0   =>   no                  0
			//    0      0      0      1   =>   yes filled below    2
			//    0      0      1      0   =>   yes filled above    1
			//    0      0      1      1   =>   no                  0
			//    0      1      0      0   =>   yes filled below    2
			//    0      1      0      1   =>   yes filled below    2
			//    0      1      1      0   =>   no                  0
			//    0      1      1      1   =>   no                  0
			//    1      0      0      0   =>   yes filled above    1
			//    1      0      0      1   =>   no                  0
			//    1      0      1      0   =>   yes filled above    1
			//    1      0      1      1   =>   no                  0
			//    1      1      0      0   =>   no                  0
			//    1      1      0      1   =>   no                  0
			//    1      1      1      0   =>   no                  0
			//    1      1      1      1   =>   no                  0
			return select(segments, [
				0, 2, 1, 0,
				2, 2, 0, 0,
				1, 0, 1, 0,
				0, 0, 0, 0
			], buildLog);
		},
		intersect: function(segments, buildLog){ // primary & secondary
			// above1 below1 above2 below2    Keep?               Value
			//    0      0      0      0   =>   no                  0
			//    0      0      0      1   =>   no                  0
			//    0      0      1      0   =>   no                  0
			//    0      0      1      1   =>   no                  0
			//    0      1      0      0   =>   no                  0
			//    0      1      0      1   =>   yes filled below    2
			//    0      1      1      0   =>   no                  0
			//    0      1      1      1   =>   yes filled below    2
			//    1      0      0      0   =>   no                  0
			//    1      0      0      1   =>   no                  0
			//    1      0      1      0   =>   yes filled above    1
			//    1      0      1      1   =>   yes filled above    1
			//    1      1      0      0   =>   no                  0
			//    1      1      0      1   =>   yes filled below    2
			//    1      1      1      0   =>   yes filled above    1
			//    1      1      1      1   =>   no                  0
			return select(segments, [
				0, 0, 0, 0,
				0, 2, 0, 2,
				0, 0, 1, 1,
				0, 2, 1, 0
			], buildLog);
		},
		difference: function(segments, buildLog){ // primary - secondary
			// above1 below1 above2 below2    Keep?               Value
			//    0      0      0      0   =>   no                  0
			//    0      0      0      1   =>   no                  0
			//    0      0      1      0   =>   no                  0
			//    0      0      1      1   =>   no                  0
			//    0      1      0      0   =>   yes filled below    2
			//    0      1      0      1   =>   no                  0
			//    0      1      1      0   =>   yes filled below    2
			//    0      1      1      1   =>   no                  0
			//    1      0      0      0   =>   yes filled above    1
			//    1      0      0      1   =>   yes filled above    1
			//    1      0      1      0   =>   no                  0
			//    1      0      1      1   =>   no                  0
			//    1      1      0      0   =>   no                  0
			//    1      1      0      1   =>   yes filled above    1
			//    1      1      1      0   =>   yes filled below    2
			//    1      1      1      1   =>   no                  0
			return select(segments, [
				0, 0, 0, 0,
				2, 0, 2, 0,
				1, 1, 0, 0,
				0, 1, 2, 0
			], buildLog);
		},
		differenceRev: function(segments, buildLog){ // secondary - primary
			// above1 below1 above2 below2    Keep?               Value
			//    0      0      0      0   =>   no                  0
			//    0      0      0      1   =>   yes filled below    2
			//    0      0      1      0   =>   yes filled above    1
			//    0      0      1      1   =>   no                  0
			//    0      1      0      0   =>   no                  0
			//    0      1      0      1   =>   no                  0
			//    0      1      1      0   =>   yes filled above    1
			//    0      1      1      1   =>   yes filled above    1
			//    1      0      0      0   =>   no                  0
			//    1      0      0      1   =>   yes filled below    2
			//    1      0      1      0   =>   no                  0
			//    1      0      1      1   =>   yes filled below    2
			//    1      1      0      0   =>   no                  0
			//    1      1      0      1   =>   no                  0
			//    1      1      1      0   =>   no                  0
			//    1      1      1      1   =>   no                  0
			return select(segments, [
				0, 2, 1, 0,
				0, 0, 1, 1,
				0, 2, 0, 2,
				0, 0, 0, 0
			], buildLog);
		},
		xor: function(segments, buildLog){ // primary ^ secondary
			// above1 below1 above2 below2    Keep?               Value
			//    0      0      0      0   =>   no                  0
			//    0      0      0      1   =>   yes filled below    2
			//    0      0      1      0   =>   yes filled above    1
			//    0      0      1      1   =>   no                  0
			//    0      1      0      0   =>   yes filled below    2
			//    0      1      0      1   =>   no                  0
			//    0      1      1      0   =>   no                  0
			//    0      1      1      1   =>   yes filled above    1
			//    1      0      0      0   =>   yes filled above    1
			//    1      0      0      1   =>   no                  0
			//    1      0      1      0   =>   no                  0
			//    1      0      1      1   =>   yes filled below    2
			//    1      1      0      0   =>   no                  0
			//    1      1      0      1   =>   yes filled above    1
			//    1      1      1      0   =>   yes filled below    2
			//    1      1      1      1   =>   no                  0
			return select(segments, [
				0, 2, 1, 0,
				2, 0, 0, 1,
				1, 0, 0, 2,
				0, 1, 2, 0
			], buildLog);
		}
	};

	var segmentSelector = SegmentSelector;

	// (c) Copyright 2017, Sean Connelly (@voidqk), http://syntheti.cc
	// MIT License
	// Project Home: https://github.com/voidqk/polybooljs

	//
	// convert between PolyBool polygon format and GeoJSON formats (Polygon and MultiPolygon)
	//

	var GeoJSON = {
		// convert a GeoJSON object to a PolyBool polygon
		toPolygon: function(PolyBool, geojson){

			// converts list of LineString's to segments
			function GeoPoly(coords){
				// check for empty coords
				if (coords.length <= 0)
					return PolyBool.segments({ inverted: false, regions: [] });

				// convert LineString to segments
				function LineString(ls){
					// remove tail which should be the same as head
					var reg = ls.slice(0, ls.length - 1);
					return PolyBool.segments({ inverted: false, regions: [reg] });
				}

				// the first LineString is considered the outside
				var out = LineString(coords[0]);

				// the rest of the LineStrings are considered interior holes, so subtract them from the
				// current result
				for (var i = 1; i < coords.length; i++)
					out = PolyBool.selectDifference(PolyBool.combine(out, LineString(coords[i])));

				return out;
			}

			if (geojson.type === 'Polygon'){
				// single polygon, so just convert it and we're done
				return PolyBool.polygon(GeoPoly(geojson.coordinates));
			}
			else if (geojson.type === 'MultiPolygon'){
				// multiple polygons, so union all the polygons together
				var out = PolyBool.segments({ inverted: false, regions: [] });
				for (var i = 0; i < geojson.coordinates.length; i++)
					out = PolyBool.selectUnion(PolyBool.combine(out, GeoPoly(geojson.coordinates[i])));
				return PolyBool.polygon(out);
			}
			throw new Error('PolyBool: Cannot convert GeoJSON object to PolyBool polygon');
		},

		// convert a PolyBool polygon to a GeoJSON object
		fromPolygon: function(PolyBool, eps, poly){
			// make sure out polygon is clean
			poly = PolyBool.polygon(PolyBool.segments(poly));

			// test if r1 is inside r2
			function regionInsideRegion(r1, r2){
				// we're guaranteed no lines intersect (because the polygon is clean), but a vertex
				// could be on the edge -- so we just average pt[0] and pt[1] to produce a point on the
				// edge of the first line, which cannot be on an edge
				return eps.pointInsideRegion([
					(r1[0][0] + r1[1][0]) * 0.5,
					(r1[0][1] + r1[1][1]) * 0.5
				], r2);
			}

			// calculate inside heirarchy
			//
			//  _____________________   _______    roots -> A       -> F
			// |          A          | |   F   |            |          |
			// |  _______   _______  | |  ___  |            +-- B      +-- G
			// | |   B   | |   C   | | | |   | |            |   |
			// | |  ___  | |  ___  | | | |   | |            |   +-- D
			// | | | D | | | | E | | | | | G | |            |
			// | | |___| | | |___| | | | |   | |            +-- C
			// | |_______| |_______| | | |___| |                |
			// |_____________________| |_______|                +-- E

			function newNode(region){
				return {
					region: region,
					children: []
				};
			}

			var roots = newNode(null);

			function addChild(root, region){
				// first check if we're inside any children
				for (var i = 0; i < root.children.length; i++){
					var child = root.children[i];
					if (regionInsideRegion(region, child.region)){
						// we are, so insert inside them instead
						addChild(child, region);
						return;
					}
				}

				// not inside any children, so check to see if any children are inside us
				var node = newNode(region);
				for (var i = 0; i < root.children.length; i++){
					var child = root.children[i];
					if (regionInsideRegion(child.region, region)){
						// oops... move the child beneath us, and remove them from root
						node.children.push(child);
						root.children.splice(i, 1);
						i--;
					}
				}

				// now we can add ourselves
				root.children.push(node);
			}

			// add all regions to the root
			for (var i = 0; i < poly.regions.length; i++){
				var region = poly.regions[i];
				if (region.length < 3) // regions must have at least 3 points (sanity check)
					continue;
				addChild(roots, region);
			}

			// with our heirarchy, we can distinguish between exterior borders, and interior holes
			// the root nodes are exterior, children are interior, children's children are exterior,
			// children's children's children are interior, etc

			// while we're at it, exteriors are counter-clockwise, and interiors are clockwise

			function forceWinding(region, clockwise){
				// first, see if we're clockwise or counter-clockwise
				// https://en.wikipedia.org/wiki/Shoelace_formula
				var winding = 0;
				var last_x = region[region.length - 1][0];
				var last_y = region[region.length - 1][1];
				var copy = [];
				for (var i = 0; i < region.length; i++){
					var curr_x = region[i][0];
					var curr_y = region[i][1];
					copy.push([curr_x, curr_y]); // create a copy while we're at it
					winding += curr_y * last_x - curr_x * last_y;
					last_x = curr_x;
					last_y = curr_y;
				}
				// this assumes Cartesian coordinates (Y is positive going up)
				var isclockwise = winding < 0;
				if (isclockwise !== clockwise)
					copy.reverse();
				// while we're here, the last point must be the first point...
				copy.push([copy[0][0], copy[0][1]]);
				return copy;
			}

			var geopolys = [];

			function addExterior(node){
				var poly = [forceWinding(node.region, false)];
				geopolys.push(poly);
				// children of exteriors are interior
				for (var i = 0; i < node.children.length; i++)
					poly.push(getInterior(node.children[i]));
			}

			function getInterior(node){
				// children of interiors are exterior
				for (var i = 0; i < node.children.length; i++)
					addExterior(node.children[i]);
				// return the clockwise interior
				return forceWinding(node.region, true);
			}

			// root nodes are exterior
			for (var i = 0; i < roots.children.length; i++)
				addExterior(roots.children[i]);

			// lastly, construct the approrpriate GeoJSON object

			if (geopolys.length <= 0) // empty GeoJSON Polygon
				return { type: 'Polygon', coordinates: [] };
			if (geopolys.length == 1) // use a GeoJSON Polygon
				return { type: 'Polygon', coordinates: geopolys[0] };
			return { // otherwise, use a GeoJSON MultiPolygon
				type: 'MultiPolygon',
				coordinates: geopolys
			};
		}
	};

	var geojson = GeoJSON;

	/*
	 * @copyright 2016 Sean Connelly (@voidqk), http://syntheti.cc
	 * @license MIT
	 * @preserve Project Home: https://github.com/voidqk/polybooljs
	 */








	var buildLog$1 = false;
	var epsilon$1 = epsilon();

	var PolyBool;
	PolyBool = {
		// getter/setter for buildLog
		buildLog: function(bl){
			if (bl === true)
				buildLog$1 = buildLog();
			else if (bl === false)
				buildLog$1 = false;
			return buildLog$1 === false ? false : buildLog$1.list;
		},
		// getter/setter for epsilon
		epsilon: function(v){
			return epsilon$1.epsilon(v);
		},

		// core API
		segments: function(poly){
			var i = intersecter(true, epsilon$1, buildLog$1);
			poly.regions.forEach(i.addRegion);
			return {
				segments: i.calculate(poly.inverted),
				inverted: poly.inverted
			};
		},
		combine: function(segments1, segments2){
			var i3 = intersecter(false, epsilon$1, buildLog$1);
			return {
				combined: i3.calculate(
					segments1.segments, segments1.inverted,
					segments2.segments, segments2.inverted
				),
				inverted1: segments1.inverted,
				inverted2: segments2.inverted
			};
		},
		selectUnion: function(combined){
			return {
				segments: segmentSelector.union(combined.combined, buildLog$1),
				inverted: combined.inverted1 || combined.inverted2
			}
		},
		selectIntersect: function(combined){
			return {
				segments: segmentSelector.intersect(combined.combined, buildLog$1),
				inverted: combined.inverted1 && combined.inverted2
			}
		},
		selectDifference: function(combined){
			return {
				segments: segmentSelector.difference(combined.combined, buildLog$1),
				inverted: combined.inverted1 && !combined.inverted2
			}
		},
		selectDifferenceRev: function(combined){
			return {
				segments: segmentSelector.differenceRev(combined.combined, buildLog$1),
				inverted: !combined.inverted1 && combined.inverted2
			}
		},
		selectXor: function(combined){
			return {
				segments: segmentSelector.xor(combined.combined, buildLog$1),
				inverted: combined.inverted1 !== combined.inverted2
			}
		},
		polygon: function(segments){
			return {
				regions: segmentChainer(segments.segments, epsilon$1, buildLog$1),
				inverted: segments.inverted
			};
		},

		// GeoJSON converters
		polygonFromGeoJSON: function(geojson$1){
			return geojson.toPolygon(PolyBool, geojson$1);
		},
		polygonToGeoJSON: function(poly){
			return geojson.fromPolygon(PolyBool, epsilon$1, poly);
		},

		// helper functions for common operations
		union: function(poly1, poly2){
			return operate(poly1, poly2, PolyBool.selectUnion);
		},
		intersect: function(poly1, poly2){
			return operate(poly1, poly2, PolyBool.selectIntersect);
		},
		difference: function(poly1, poly2){
			return operate(poly1, poly2, PolyBool.selectDifference);
		},
		differenceRev: function(poly1, poly2){
			return operate(poly1, poly2, PolyBool.selectDifferenceRev);
		},
		xor: function(poly1, poly2){
			return operate(poly1, poly2, PolyBool.selectXor);
		}
	};

	function operate(poly1, poly2, selector){
		var seg1 = PolyBool.segments(poly1);
		var seg2 = PolyBool.segments(poly2);
		var comb = PolyBool.combine(seg1, seg2);
		var seg3 = selector(comb);
		return PolyBool.polygon(seg3);
	}

	if (typeof window === 'object')
		window.PolyBool = PolyBool;

	var polybooljs = PolyBool;

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
	  score: 0
	};

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

	  _proto.boolean = function boolean(points) {
	    var poly1 = {
	      regions: [this.getPoints().map(function (p) {
	        return [p.x, p.y];
	      })]
	    };
	    var poly2 = {
	      regions: [points]
	    };
	    var operation = polybooljs.difference(poly1, poly2);
	    console.log('segments', this.segments);
	    var segments = [];
	    operation.regions.forEach(function (points) {
	      points.forEach(function (p, i) {
	        if (i < points.length - 2) {
	          segments.push(new Segment(p[0], p[1], points[i + 1][0], points[i + 1][1]));
	        } else {
	          segments.push(new Segment(p[0], p[1], points[0][0], points[0][1]));
	        }
	      });
	    });
	    this.segments = segments;
	    console.log('segments', segments);
	  };

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
	    return this.segments.reduce(function (p, c) {
	      return p || c.hit(actor, tolerance);
	    }, false);
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
	      segment = new Segment(actor.position.x - 1 * actor.direction.x, actor.position.y - 1 * actor.direction.y, actor.nx, actor.ny);
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
	    ctx.beginPath();
	    ctx.strokeStyle = "black";
	    ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
	    ctx.stroke();
	    ctx.fillStyle = "red";
	    ctx.fill();
	  };

	  _proto.checkCollision = function checkCollision() {
	    var ground = State.ground;
	    var cut = State.cut;
	    var nx = this.nx;
	    var ny = this.ny;
	    var segment = this.segment;
	    segment.a.set(this.position.x, this.position.y);
	    segment.b.set(nx, ny);

	    if (cut.hit(this, 5)) {
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

	  _proto.remove = function remove(polygon) {
	    if (polygon.segments.length) {
	      var i1 = this.segments.reduce(function (p, c, i) {
	        var s = polygon.segments[0];
	        var m = c.getIntersection(s);

	        if (m && m.intersectA) {
	          console.log('i1', i);
	          s.a.x = m.x;
	          s.a.y = m.y;
	          return i;
	        } else {
	          return p;
	        }
	      }, -1);
	      var i2 = this.segments.reduce(function (p, c, i) {
	        var s = polygon.segments[polygon.segments.length - 1];
	        var m = c.getIntersection(s);

	        if (m && m.intersectA) {
	          console.log('i2', i);
	          s.b.x = m.x;
	          s.b.y = m.y;
	          return i;
	        } else {
	          return p;
	        }
	      }, -1);

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
	    ctx.beginPath();
	    ctx.strokeStyle = "black";
	    ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
	    ctx.stroke();
	    ctx.fillStyle = "green";
	    ctx.fill();
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

	          this.lastSegment = hitted;
	          var _segment = cut.segments[cut.segments.length - 1];
	          nx = this.nx;
	          ny = this.ny;
	          _segment.b.x = nx;
	          _segment.b.y = ny;
	          this.direction.x = 0;
	          this.direction.y = 0;
	          console.log('cut.segments.length', cut.segments.length);
	          ground.remove(cut);
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
	      }
	    } else {
	      hitted = ground.hit(this, 3);
	      this.firstSegment = hitted;

	      if (!hitted) {
	        this.direction.x = 0;
	        this.direction.y = 0;
	      }
	    }

	    this.position.x = this.nx;
	    this.position.y = this.ny;
	  };

	  return Player;
	}();

	var Game = function () {
	  function Game() {
	    var canvas = this.canvas = State.canvas = new Canvas();
	    var ground = this.ground = State.ground = new Ground();
	    var cut = this.cut = State.cut = new Cut();
	    var enemies = State.enemies = new Array(3).fill(0).map(function (x) {
	      return new Enemy();
	    });
	    var player = State.player = new Player();
	    this.init();
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
