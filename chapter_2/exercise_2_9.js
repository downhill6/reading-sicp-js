// 练习 2.9

// 证明：
// 设 a 的上下界分别为 Ua 和 La
// 则 a 的宽度 Wa = (Ua + La) / 2
// 同理： Wb = (Ub + Lb) / 2
// Wab = ((Ua + Ub) + (La + Lb)) / 2
// Wab =  (Ua + La) / 2 + (Ub + Lb) / 2
// Wab = Wa + Wb
// 证毕
// 减法同理，就是一个加法分配律

// 对于乘除
// a = [1, 5], Wa = 2
// b = [2, 10], Wa = 4
// a*b = [2, 50], Wab = 24
// Wab != Wa * Wb
