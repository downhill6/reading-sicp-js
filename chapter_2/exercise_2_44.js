// 练习 2.44

// 使用 sourceacademy.org 提供的在线执行环境
// 地址 https://sourceacademy.org/playground

import {heart, stack, beside, flip_vert, flip_horiz, show} from 'rune';

const below = (x, y) => stack(y, x);

function flipped_pairs(painter) {
  const painter2 = beside(painter, flip_vert(painter));
  return below(painter2, painter2);
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

function square_limit(painter, n) {
  const quarter = corner_split(painter, n);
  const half = beside(flip_horiz(quarter), quarter);
  return below(flip_vert(half), half);
}

show(corner_split(heart, 5));
