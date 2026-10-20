-- tap the first element whose description or value is the given label
on findIt(e, lbl)
	tell application "System Events"
		repeat with a in {"AXDescription", "AXValue", "AXTitle"}
			try
				set v to value of attribute a of e
				if v is not missing value and (v as text) is lbl then return e
			end try
		end repeat
		try
			repeat with c in (UI elements of e)
				set r to my findIt(c, lbl)
				if r is not missing value then return r
			end repeat
		end try
	end tell
	return missing value
end findIt
on run argv
	set lbl to item 1 of argv
	tell application "System Events"
		set w to window 1 of process "Runner"
		set e to my findIt(w, lbl)
		if e is missing value then return "not found: " & lbl
		try
			perform action "AXPress" of e
			return "pressed"
		on error
			set {x, y} to position of e
			set {ww, hh} to size of e
			click at {x + ww / 2, y + hh / 2}
			return "clicked"
		end try
	end tell
end run
