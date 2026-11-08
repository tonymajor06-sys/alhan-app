// ax <outPath> <maxPages> [stopAt] : reads every static text of Spirit & Truth's window, scrolling page by page
import Cocoa
import ApplicationServices

func attr(_ e: AXUIElement, _ a: String) -> AnyObject? {
  var v: AnyObject?; return AXUIElementCopyAttributeValue(e, a as CFString, &v) == .success ? v : nil
}
func kids(_ e: AXUIElement) -> [AXUIElement] { (attr(e, kAXChildrenAttribute) as? [AXUIElement]) ?? [] }
let args = CommandLine.arguments
let outPath = args[1], maxPages = Int(args[2]) ?? 300, stopAt = args.count > 3 ? args[3] : ""
guard let app = NSRunningApplication.runningApplications(withBundleIdentifier: "org.lacopts.spiritAndTruth").first ?? NSWorkspace.shared.runningApplications.first(where: { $0.localizedName == "Spirit & Truth" }) else { print("not running"); exit(1) }
let axApp = AXUIElementCreateApplication(app.processIdentifier)
guard let wins = attr(axApp, kAXWindowsAttribute) as? [AXUIElement], let win = wins.first else { print("no window"); exit(1) }
var seen = Set<String>(); var out: [String] = []
func text(_ e: AXUIElement) -> String? {
  for a in [kAXTitleAttribute, kAXValueAttribute, kAXDescriptionAttribute] { if let s = attr(e, a) as? String, !s.isEmpty, s != "text" { return s } }
  return nil
}
var area: AXUIElement? = nil
func walk(_ e: AXUIElement) {
  for k in kids(e) {
    let role = attr(k, kAXRoleAttribute) as? String ?? ""
    if role == "AXScrollArea" && area == nil { area = k }
    if role == "AXStaticText" { if let s = text(k), !seen.contains(s) { seen.insert(s); out.append(s) } }
    else { walk(k) }
  }
}
var same = 0, page = 0
while page < maxPages {
  let before = out.count
  area = nil; walk(win)
  try? out.joined(separator: "\n=====\n").write(toFile: outPath, atomically: true, encoding: .utf8)
  if !stopAt.isEmpty && out.contains(where: { $0.contains(stopAt) }) { break }
  same = out.count == before ? same + 1 : 0
  if same >= 12 { break }
  if let a = area { AXUIElementPerformAction(a, "AXScrollDownByPage" as CFString) }
  usleep(UInt32(ProcessInfo.processInfo.environment["AXDELAY"] ?? "250000")!)
  page += 1
}
print("pages \(page), pieces \(out.count)")
