-- open the section pop-up (the labelled button beside the reader's heading) and pick a section
on findMenuButton(e)
	tell application "System Events"
		try
			set kids to UI elements of e
			set n to count of kids
			if n ≥ 2 and (role of item 1 of kids) is "AXButton" and (role of item 2 of kids) is "AXButton" then
				set d to value of attribute "AXDescription" of item 2 of kids
				if d is not missing value and (d as text) is not "" then return item 2 of kids
			end if
			repeat with c in kids
				set r to my findMenuButton(c)
				if r is not missing value then return r
			end repeat
		end try
	end tell
	return missing value
end findMenuButton
tell application "System Events"
	set b to my findMenuButton(window 1 of process "Runner")
	if b is missing value then return "no menu button"
	perform action "AXPress" of b
end tell
return "menu"
