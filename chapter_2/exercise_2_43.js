// 练习 2.43

function queens(board_size) {
  function queen_cols(k) {
    return k === 0
      ? list(empty_board)
      : filter(
          positions => is_safe(k, positions),
          flatmap(
            new_row =>
              map(rest_of_queens => adjoin_position(new_row, k, rest_of_queens), queen_cols(k - 1)),
            enumerate_interval(1, board_size),
          ),
        );
  }
  return queen_cols(board_size);
}

// Louis Reasoner 把 queen_cols(k - 1) 放在内部，导致重复运行
// 需要时间在 n^nT
