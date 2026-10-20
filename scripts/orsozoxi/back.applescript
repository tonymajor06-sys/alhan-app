-- press the button that sits next to the screen's heading (the back arrow)
on findHead(e)
	tell application "System Events"
		try
			repeat with c in (UI elements of e)
				if (role of c) is "AXHeading" then return e
				set r to my findHead(c)
				if r is not missing value then return r
			end repeat
		end try
	end tell
	return missing value
end findHead
tell application "System Events"
	set g to my findHead(window 1 of process "Runner")
	if g is missing value then return "no heading"
	repeat with c in (UI elements of g)
		if (role of c) is "AXButton" then
			perform action "AXPress" of c
			return "back"
		end if
	end repeat
	return "no back button"
end tell
