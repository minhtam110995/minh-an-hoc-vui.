# Minh An Học Vui

App học lớp 1 cho bé: **Toán, Tiếng Việt, Đạo đức** (bộ Kết nối tri thức) và **Tiếng Anh 1 Global Success**.
Mỗi bài có 3 bước: Học → Luyện tập → Thử thách ngoài đời. Tích sao để đổi buổi đi chơi, đi ăn.

## Luật sao
- Bài luyện tập đạt từ 80% trở lên: **+3 sao**; dưới 80%: **−1 sao** (không trừ dưới 0).
- Mỗi bài chỉ nhận sao 1 lần mỗi ngày. Bài làm dở được lưu, mở lại làm tiếp.
- Thử thách ngoài đời: bố mẹ xác nhận bằng mã PIN (mặc định `1234`, đổi trong Khu bố mẹ).
- Phần thưởng 5 mốc: 20 · 40 · 70 · 120 · 250 sao, đổi lại được nhiều lần.

## Chạy
Chỉ cần mở `index.html` trong trình duyệt. Không cần cài đặt gì. Dữ liệu lưu trong trình duyệt của máy.

## Đưa lên web
- **Vercel**: Import repo này trên vercel.com → Deploy (không cần cấu hình).
- **GitHub Pages**: Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.

## Sửa nội dung
Nội dung nằm trong `src/`: `p3_math.js` (Toán), `p4_tv.js` (Tiếng Việt), `p5_en.js` (Tiếng Anh), `p6_dd.js` (Đạo đức), `p7_app.js` (giao diện, sao, phần thưởng), `p8_games.js` (khu vui chơi).
Sửa xong chạy `sh build.sh` để ghép lại `index.html`.
