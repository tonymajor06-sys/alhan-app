// axpages <out.jsonl> : saves the rows Spirit & Truth shows (and keeps just above and below the screen) for every
// page of the open text, from the top, one JSON list per page; stitch.py joins the pages into the whole text,
// keeping repeated rows (a second "People:" or "Amen."), which st-wording's ax skips.
import Cocoa
func attr(_ e: AXUIElement, _ a: String) -> AnyObject? { var v: AnyObject?; return AXUIElementCopyAttributeValue(e, a as CFString, &v) == .success ? v : nil }
func kids(_ e: AXUIElement) -> [AXUIElement] { (attr(e, kAXChildrenAttribute) as? [AXUIElement]) ?? [] }
guard let app = NSWorkspace.shared.runningApplications.first(where: { $0.localizedName == "Spirit & Truth" }) else { print("not running"); exit(1) }
let win = (attr(AXUIElementCreateApplication(app.processIdentifier), kAXWindowsAttribute) as! [AXUIElement])[0]
var area: AXUIElement?
func page() -> [String] {
  var rows: [String] = []
  func walk(_ e: AXUIElement) {
    for k in kids(e) {
      let role = attr(k, kAXRoleAttribute) as? String ?? ""
      if role == "AXScrollArea" && area == nil { area = k }
      if role == "AXStaticText" { for a in [kAXDescriptionAttribute, kAXValueAttribute, kAXTitleAttribute] { if let s = attr(k, a) as? String, !s.isEmpty { rows.append(s); break } } }
      else { walk(k) }
    }
  }
  area = nil; walk(win); return rows
}
func scroll(_ action: String) { if let a = area { AXUIElementPerformAction(a, action as CFString) } }
// to the top
var last: [String] = []
for _ in 0..<500 { let p = page(); if p == last { break }; last = p; scroll("AXScrollUpByPage"); usleep(200_000) }
var lines: [String] = []
var same = 0
last = []
for _ in 0..<3000 {
  let p = page()
  if p == last { same += 1; if same >= 10 { break }; usleep(600_000) } else { same = 0
    let json = try! JSONSerialization.data(withJSONObject: p)
    lines.append(String(data: json, encoding: .utf8)!)
    try? lines.joined(separator: "\n").write(toFile: CommandLine.arguments[1], atomically: true, encoding: .utf8)
  }
  last = p
  scroll("AXScrollDownByPage"); usleep(350_000)
}
print("pages \(lines.count)")
