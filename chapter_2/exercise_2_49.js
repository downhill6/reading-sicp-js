// 练习 2.49
// 使用 draw.html 绘制图形

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function make_vect(xcor_vect, ycor_vect) {
  return pair(xcor_vect, ycor_vect);
}

function xcor_vect(vect) {
  return head(vect);
}

function ycor_vect(vect) {
  return tail(vect);
}

function add_vect(vect1, vect2) {
  return make_vect(xcor_vect(vect1) + xcor_vect(vect2), ycor_vect(vect1) + ycor_vect(vect2));
}

function scale_vect(s, vect) {
  return make_vect(s * xcor_vect(vect), s * ycor_vect(vect));
}

function sub_vect(vect1, vect2) {
  return make_vect(xcor_vect(vect1) - xcor_vect(vect2), ycor_vect(vect1) - ycor_vect(vect2));
}

function make_frame(origin, edge1, edge2) {
  return list(origin, edge1, edge2);
}

function origin_frame(frame) {
  return list_ref(frame, 0);
}

function edge1_frame(frame) {
  return list_ref(frame, 1);
}

function edge2_frame(frame) {
  return list_ref(frame, 2);
}

function make_segment(v_start, v_end) {
  return pair(v_start, v_end);
}

function start_segment(segment) {
  return head(segment);
}

function end_segment(segment) {
  return tail(segment);
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function list_ref(items, n) {
  return n === 0 ? head(items) : list_ref(tail(items), n - 1);
}

function is_null(val) {
  return val === null;
}

function display(n) {
  console.log(n);
}

function for_each(fun, items) {
  if (!is_null(items)) {
    fun(head(items));
    for_each(fun, tail(items));
  }
}

function frame_coord_map(frame) {
  return v =>
    add_vect(
      origin_frame(frame),
      add_vect(
        scale_vect(xcor_vect(v), edge1_frame(frame)),
        scale_vect(ycor_vect(v), edge2_frame(frame)),
      ),
    );
}
function segments_to_painter(segment_list) {
  return frame =>
    for_each(segment => {
      return draw_line(
        frame_coord_map(frame)(start_segment(segment)),
        frame_coord_map(frame)(end_segment(segment)),
      );
    }, segment_list);
}

function draw_line(start, end) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const scale = 100;

  ctx.beginPath();
  ctx.moveTo(start[0] * scale, start[1] * scale);
  ctx.lineTo(end[0] * scale, end[1] * scale);
  ctx.stroke();
}

// ==========

function make_outline_painter() {
  const v1 = make_vect(0, 0);
  const v2 = make_vect(0, 1);
  const v3 = make_vect(1, 0);
  const v4 = make_vect(1, 1);
  const s1 = make_segment(v1, v2);
  const s2 = make_segment(v2, v4);
  const s3 = make_segment(v4, v3);
  const s4 = make_segment(v3, v1);
  return segments_to_painter(list(s1, s2, s3, s4));
}

const unit_origin = make_vect(0, 0);
const unit_edge_1 = make_vect(1, 0);
const unit_edge_2 = make_vect(0, 1);
const unit_frame = make_frame(unit_origin, unit_edge_1, unit_edge_2);

const outline_painter = make_outline_painter();
// outline_painter(unit_frame);

// // ==========

function make_x_painter() {
  const v1 = make_vect(0, 0);
  const v2 = make_vect(0, 1);
  const v3 = make_vect(1, 0);
  const v4 = make_vect(1, 1);
  const s1 = make_segment(v1, v4);
  const s2 = make_segment(v2, v3);
  return segments_to_painter(list(s1, s2));
}

const x_painter = make_x_painter();
// x_painter(unit_frame);

// ==========

function make_diamond_painter() {
  const v1 = make_vect(0, 0.5);
  const v2 = make_vect(0.5, 1);
  const v3 = make_vect(1, 0.5);
  const v4 = make_vect(0.5, 0);
  const s1 = make_segment(v1, v2);
  const s2 = make_segment(v2, v3);
  const s3 = make_segment(v3, v4);
  const s4 = make_segment(v4, v1);
  return segments_to_painter(list(s1, s2, s3, s4));
}

const diamond_painter = make_diamond_painter();
// diamond_painter(unit_frame);

// ==========

const wave = segments_to_painter(
  list(
    make_segment(make_vect(0.25, 0), make_vect(0.35, 0.5)),
    make_segment(make_vect(0.35, 0.5), make_vect(0.3, 0.6)),
    make_segment(make_vect(0.3, 0.6), make_vect(0.15, 0.4)),
    make_segment(make_vect(0.15, 0.4), make_vect(0, 0.65)),
    make_segment(make_vect(0, 0.65), make_vect(0, 0.85)),
    make_segment(make_vect(0, 0.85), make_vect(0.15, 0.6)),
    make_segment(make_vect(0.15, 0.6), make_vect(0.3, 0.65)),
    make_segment(make_vect(0.3, 0.65), make_vect(0.4, 0.65)),
    make_segment(make_vect(0.4, 0.65), make_vect(0.35, 0.85)),
    make_segment(make_vect(0.35, 0.85), make_vect(0.4, 1)),
    make_segment(make_vect(0.4, 1), make_vect(0.6, 1)),
    make_segment(make_vect(0.6, 1), make_vect(0.65, 0.85)),
    make_segment(make_vect(0.65, 0.85), make_vect(0.6, 0.65)),
    make_segment(make_vect(0.6, 0.65), make_vect(0.75, 0.65)),
    make_segment(make_vect(0.75, 0.65), make_vect(1, 0.35)),
    make_segment(make_vect(1, 0.35), make_vect(1, 0.15)),
    make_segment(make_vect(1, 0.15), make_vect(0.6, 0.45)),
    make_segment(make_vect(0.6, 0.45), make_vect(0.75, 0)),
    make_segment(make_vect(0.75, 0), make_vect(0.6, 0)),
    make_segment(make_vect(0.6, 0), make_vect(0.5, 0.3)),
    make_segment(make_vect(0.5, 0.3), make_vect(0.4, 0)),
    make_segment(make_vect(0.4, 0), make_vect(0.25, 0)),
  ),
);
wave(unit_frame);
