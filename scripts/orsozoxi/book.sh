#!/bin/zsh
# book.sh out-dir — capture every section of the open book through its section pop-up
D=${0:a:h}; OUT=$1; mkdir -p $OUT; DONE=$OUT/done.txt; touch $DONE
labels() { osascript $D/walk.applescript | grep -o '\[AXDescription=[^]]*\]' | sed 's/\[AXDescription=//;s/\]$//'; }
osascript -e 'tell application "System Events" to set frontmost of process "Runner" to true'
stuck=0
while (( stuck < 3 )); do
  osascript $D/goto.applescript >/dev/null; sleep 1.2
  pick=""
  for s in 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
    pick=$(labels | grep -vxF -e 'قائمة منبثقة' -e 'رفض' | grep -vxF -f $DONE | head -1)
    [[ -n $pick ]] && break
    osascript -l JavaScript $D/scroll.js 720 500 -4 >/dev/null; sleep 0.8
  done
  if [[ -z $pick ]]; then osascript $D/tap.applescript 'رفض' >/dev/null; break; fi
  echo $pick >> $DONE
  r=$(osascript $D/tap.applescript "$pick"); sleep 2.5
  [[ $r == not* ]] && { stuck=$((stuck+1)); continue; }
  n=$(wc -l < $DONE | tr -d ' ')
  osascript $D/texts.applescript > $OUT/$n.txt
  echo "$n $pick"
done
