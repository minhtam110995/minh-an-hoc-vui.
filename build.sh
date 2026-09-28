#!/bin/sh
# Ghép các file trong src/ thành index.html
cd "$(dirname "$0")"
head -n 12 index.html > /tmp/_head.html
{ cat /tmp/_head.html; cat src/p1_head.html; echo '<script>'; cat src/p2_core.js src/p3_math.js src/p4_tv.js src/p5_en.js src/p6_dd.js src/p7_app.js; echo '</script>'; echo '</body></html>'; } > index.html.new && mv index.html.new index.html
echo "Đã tạo index.html"
