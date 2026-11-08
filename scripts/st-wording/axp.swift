// axp list | axp press <substring> [nth] : list/press Spirit & Truth's buttons by description
import Cocoa
import ApplicationServices
func attr(_ e: AXUIElement, _ a: String) -> AnyObject? { var v: AnyObject?; return AXUIElementCopyAttributeValue(e, a as CFString, &v) == .success ? v : nil }
func kids(_ e: AXUIElement) -> [AXUIElement] { (attr(e, kAXChildrenAttribute) as? [AXUIElement]) ?? [] }
let args = CommandLine.arguments
guard let app = NSWorkspace.shared.runningApplications.first(where: { $0.localizedName == "Spirit & Truth" }) else { print("not running"); exit(1) }
let axApp = AXUIElementCreateApplication(app.processIdentifier)
guard let wins = attr(axApp, kAXWindowsAttribute) as? [AXUIElement], let win = wins.first else { print("no window"); exit(1) }
var buttons: [(AXUIElement, String)] = []
func walk(_ e: AXUIElement) {
  for k in kids(e) {
    let role = attr(k, kAXRoleAttribute) as? String ?? ""
    if role == "AXButton" || role == "AXLink" || role == "AXGenericElement" || role == "AXCheckBox" || role == "AXTab" {
      var d = ""; for a in [kAXTitleAttribute, kAXDescriptionAttribute, kAXValueAttribute] { if let s = attr(k, a) as? String, !s.isEmpty { d = s; break } }
      buttons.append((k, role + " | " + d.replacingOccurrences(of: "\n", with: " / ")))
    }
    if role != "AXStaticText" { walk(k) }
  }
}
var area: AXUIElement? = nil
func findArea(_ e: AXUIElement) { for k in kids(e) { if area != nil { return }; if (attr(k, kAXRoleAttribute) as? String) == "AXScrollArea" { area = k; return }; findArea(k) } }
if args[1] == "scrollpress" {
  for _ in 0..<60 {
    buttons = []; walk(win)
    if let m = buttons.first(where: { $0.1.contains(args[2]) }) { let r = AXUIElementPerformAction(m.0, kAXPressAction as CFString); print(r == .success ? "pressed \(m.1)" : "fail"); exit(0) }
    area = nil; findArea(win); if let a = area { AXUIElementPerformAction(a, "AXScrollDownByPage" as CFString) }; usleep(400_000)
  }
  print("not found"); exit(2)
}
walk(win)
if args[1] == "list" { for b in buttons { print(b.1) } }
else if args[1] == "press" {
  let m = buttons.filter { $0.1.contains(args[2]) }
  let n = args.count > 3 ? Int(args[3])! : 0
  if m.count > n { let r = AXUIElementPerformAction(m[n].0, kAXPressAction as CFString); print(r == .success ? "pressed \(m[n].1)" : "fail \(r.rawValue)") } else { print("not found: \(args[2]) (\(m.count))"); exit(2) }
}
