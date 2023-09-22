// 练习 2.45

// 使用 sourceacademy.org 提供的在线执行环境
// 地址 https://sourceacademy.org/playground

import {
  heart,
  stack,
  flip_vert,
  flip_horiz,
  quarter_turn_left,
  quarter_turn_right,
  turn_upside_down,
  beside,
  show,
} from 'rune';

const below = (x, y) => stack(y, x);

const rotate180 = x => turn_upside_down(x);

function square_of_four(tl, tr, bl, br) {
  return painter => {
    const top = beside(tl(painter), tr(painter));
    const bottom = beside(bl(painter), br(painter));
    return below(bottom, top);
  };
}

function identity(x) {
  return x;
}

function flipped_pairs(painter) {
  const combine4 = square_of_four(identity, flip_vert, identity, flip_vert);
  return combine4(painter);
}

function square_limit(painter, n) {
  const combine4 = square_of_four(flip_horiz, identity, rotate180, flip_vert);
}

function split(big_op, small_op) {
  function rec_split(painter, n) {
    if (n === 0) {
      return painter;
    } else {
      const smaller = rec_split(painter, n - 1);
      return big_op(painter, small_op(smaller, smaller));
    }
  }

  return rec_split;
}

const right_split = split(beside, below);
const up_split = split(below, beside);

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

show(corner_split(heart, 5));
