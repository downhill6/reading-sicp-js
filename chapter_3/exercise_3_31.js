// 练习 3.31
// accept_action_function 是 add_action 触发的。当用线路连接 or_gate、and_gate、inverter 这些基本元件时，会调用 add-action!，从而触发 accept_action_function。
// 原来的 accept_action_function 实现中，调用了一次 fun, 会调用 after_delay, 在延迟一段时间后，将线路的值初始化。这样在连接各基本元件时，信号传递，将整个电路都自动初始化了。
// 假如 accept_action_function 不调用 fun, 线路并不会被正确初始化。
// 于是半加器中，当 A = 1, B = 0 时，调用 propagate 后下面的第一个 and_gate 输出仍然为 0，不会触发 inverter 输出改变。E 线路仍然错误地停留在没有初始好的值 0。但实际上 E 线路的值应该为 1。
