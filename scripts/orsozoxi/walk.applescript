on walk(e, d, acc)
	tell application "System Events"
		set t to ""
		try
			set t to (role of e) as text
		end try
		set s to ""
		repeat with a in {"AXTitle", "AXDescription", "AXValue", "AXLabel"}
			try
				set v to value of attribute a of e
				if v is not missing value and (v as text) is not "" then set s to s & " [" & a & "=" & (v as text) & "]"
			end try
		end repeat
		set acc to acc & d & t & s & linefeed
		try
			repeat with c in (UI elements of e)
				set acc to my walk(c, d & "  ", acc)
			end repeat
		end try
	end tell
	return acc
end walk
tell application "System Events" to set w to window 1 of process "Runner"
return my walk(w, "", "")
