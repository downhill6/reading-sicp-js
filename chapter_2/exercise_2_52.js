// 练习 2.52
// 使用 draw.html

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

function for_each(fun, items) {
  if (!is_null(items)) {
    fun(head(items));
    for_each(fun, tail(items));
  }
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

// ============

const unit_origin = make_vect(0, 0);
const unit_edge_1 = make_vect(1, 0);
const unit_edge_2 = make_vect(0, 1);
const unit_frame = make_frame(unit_origin, unit_edge_1, unit_edge_2);

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

const frame_painter = segments_to_painter(
  list(
    make_segment(make_vect(0, 0), make_vect(0, 0.99)),
    make_segment(make_vect(0, 0.99), make_vect(0.99, 0.99)),
    make_segment(make_vect(0.99, 0.99), make_vect(0.99, 0)),
    make_segment(make_vect(0.99, 0), make_vect(0, 0)),
  ),
);

const wave_with_frame = frame => {
  wave(frame);
  frame_painter(frame);
};

// wave_with_frame(unit_frame);

// ============

function transform_painter(painter, origin, corner1, corner2) {
  return frame => {
    const m = frame_coord_map(frame);
    const new_origin = m(origin);
    return painter(
      make_frame(new_origin, sub_vect(m(corner1), new_origin), sub_vect(m(corner2), new_origin)),
    );
  };
}

function beside(painter1, painter2) {
  const split_point = make_vect(0.5, 0);
  const paint_left = transform_painter(painter1, make_vect(0, 0), split_point, make_vect(0, 1));
  const paint_right = transform_painter(painter2, split_point, make_vect(1, 0), make_vect(0.5, 1));
  return frame => {
    paint_left(frame);
    paint_right(frame);
  };
}

function below(painter1, painter2) {
  const split_point = make_vect(0, 0.5);
  const paint_upper = transform_painter(painter1, split_point, make_vect(1, 0.5), make_vect(0, 1));
  const paint_lower = transform_painter(painter2, make_vect(0, 0), make_vect(1, 0), split_point);
  return frame => {
    paint_upper(frame);
    paint_lower(frame);
  };
}
function right_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const smaller = right_split(painter, n - 1);
    return beside(painter, below(smaller, smaller));
  }
}

function up_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const smaller = up_split(painter, n - 1);
    return below(painter, beside(smaller, smaller));
  }
}

function corner_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const up = up_split(painter, n - 1);
    const right = right_split(painter, n - 1);
    const top_left = beside(up, up);
    const bottom_right = below(right, right);
    const corner = corner_split(painter, n - 1);
    return beside(below(painter, top_left), below(bottom_right, corner));
  }
}

// corner_split(wave, 3)(unit_frame);

// ============

function identity(x) {
  return x;
}

function rotate180(painter) {
  return transform_painter(
    painter,
    make_vect(1, 1), // new origin
    make_vect(0, 1), // new end of edge1
    make_vect(1, 0), // new end of edge2
  );
}

function flip_vert(painter) {
  return transform_painter(
    painter,
    make_vect(0, 1), // new origin
    make_vect(1, 1), // new end of edge1
    make_vect(0, 0), // new end of edge2
  );
}

function flip_horiz(painter) {
  return transform_painter(
    painter,
    make_vect(1, 0), // new origin
    make_vect(0, 0), // new end of edge1
    make_vect(1, 1), // new end of edge2
  );
}

function square_of_four(tl, tr, bl, br) {
  return painter => {
    const top = beside(tl(painter), tr(painter));
    const bottom = beside(bl(painter), br(painter));
    return below(bottom, top);
  };
}

function square_limit(painter, n) {
  const combine4 = square_of_four(flip_horiz, identity, rotate180, flip_vert);
  return combine4(corner_split(painter, n));
}

square_limit(wave, 3)(unit_frame);
