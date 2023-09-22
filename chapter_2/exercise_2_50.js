// 练习 2.50
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

function transform_painter(painter, origin, corner1, corner2) {
  return frame => {
    const m = frame_coord_map(frame);
    const new_origin = m(origin);
    return painter(
      make_frame(new_origin, sub_vect(m(corner1), new_origin), sub_vect(m(corner2), new_origin)),
    );
  };
}

function flip_vert(painter) {
  return transform_painter(
    painter,
    make_vect(0, 1), // new origin
    make_vect(1, 1), // new end of edge1
    make_vect(0, 0), // new end of edge2
  );
}

function shrink_to_upper_right(painter) {
  return transform_painter(painter, make_vect(0.5, 0.5), make_vect(1, 0.5), make_vect(0.5, 1));
}

// ============

function flip_horiz(painter) {
  return transform_painter(
    painter,
    make_vect(1, 0), // new origin
    make_vect(0, 0), // new end of edge1
    make_vect(1, 1), // new end of edge2
  );
}

function rotate90(painter) {
  return transform_painter(painter, make_vect(1, 0), make_vect(1, 1), make_vect(0, 0));
}

function rotate180(painter) {
  return transform_painter(
    painter,
    make_vect(1, 1), // new origin
    make_vect(0, 1), // new end of edge1
    make_vect(1, 0), // new end of edge2
  );
}

function rotate270(painter) {
  return transform_painter(
    painter,
    make_vect(0, 1), // new origin
    make_vect(0, 0), // new end of edge1
    make_vect(1, 0), // new end of edge2
  );
}
