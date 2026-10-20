// scroll.js x y lines — move the pointer to (x, y) and scroll by `lines` (negative = down)
ObjC.import('CoreGraphics');
function run(argv) {
  const x = +argv[0], y = +argv[1], lines = +argv[2];
  const p = $.CGPointMake(x, y);
  $.CGEventPost($.kCGHIDEventTap, $.CGEventCreateMouseEvent(null, $.kCGEventMouseMoved, p, 0));
  const step = lines < 0 ? -1 : 1;
  for (let i = 0; i < Math.abs(lines); i++) {
    $.CGEventPost($.kCGHIDEventTap, $.CGEventCreateScrollWheelEvent(null, 0, 1, step * 3));
    delay(0.02);
  }
  return 'scrolled';
}
