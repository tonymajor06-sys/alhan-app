-- every static text's description, separated by a marker line
on walk(e, acc)
	tell application "System Events"
		try
			if (role of e) is "AXStaticText" then
				set v to value of attribute "AXDescription" of e
				if v is not missing value then set acc to acc & (v as text) & linefeed & "<<<>>>" & linefeed
			end if
		end try
		try
			repeat with c in (UI elements of e)
				set acc to my walk(c, acc)
			end repeat
		end try
	end tell
	return acc
end walk
tell application "System Events" to set w to window 1 of process "Runner"
return my walk(w, "")
