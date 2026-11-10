# Đăng bài viết (Decap CMS)

Bác sĩ đăng nhập tại `https://phantrungtieu.com/admin/`, viết bài trong trình soạn thảo, bấm **Publish**.
Decap lưu bài thành file Markdown trong `content/posts/` (commit vào `main`), GitHub Actions chạy
`npm run build` để tạo trang `<slug>.html` và thêm bài vào danh sách ở `kien-thuc.html`, rồi deploy
(khoảng 1-2 phút).

Các trang cũ (`omega-3-co-tac-dung-gi.html`, ...) không bị đụng tới. Chỉ bài mới đi qua build.

## Hai mục: Kiến thức và Câu chuyện

Trong admin có hai mục:

| Mục trong admin | Thư mục | Danh sách hiển thị ở |
|---|---|---|
| Bài viết (Kiến thức) | `content/posts/` | `kien-thuc.html` |
| Câu chuyện | `content/stories/` | `cau-chuyen.html` |

Cả hai dùng chung một mẫu trang và cách viết bài. Tên bài (slug) phải khác nhau giữa hai mục.
Muốn thêm mục mới: thêm một collection vào `admin/config.yml`, một dòng vào `SECTIONS` trong
`scripts/build.mjs`, và thêm cặp `<!-- POSTS:START -->` / `<!-- POSTS:END -->` vào trang danh sách.

## Cài đặt một lần

Decap cần một "OAuth proxy" để đăng nhập GitHub (GitHub Pages không có server). Dùng Cloudflare Worker miễn phí.

1. **GitHub OAuth App** (tài khoản `hoibui`): Settings → Developer settings → OAuth Apps → New.
   - Homepage URL: `https://phantrungtieu.com`
   - Authorization callback URL: `https://<tên-worker>.<subdomain>.workers.dev/callback`
   - Lưu lại **Client ID** và tạo **Client Secret**.
2. **Cloudflare Worker**: deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)
   (hoạt động với Decap). Đặt biến môi trường:
   - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (secret, không đưa vào repo)
   - `ALLOWED_DOMAINS` = `phantrungtieu.com`
3. **admin/config.yml**: thay `base_url: https://REPLACE-ME.workers.dev` bằng URL của Worker.
4. **Cấp quyền**: tài khoản GitHub của bác sĩ phải là *collaborator* (quyền Write) của repo `hoibui/bsi-tieu`.
   Decap ghi thẳng vào repo bằng quyền của người đăng nhập.

## Viết bài

- **Tiêu đề, Ngày đăng, Nội dung** là bắt buộc. Ảnh đại diện và mô tả ngắn có thể bỏ trống.
- Tên file/URL được tạo từ tiêu đề (bỏ dấu), ví dụ `Bé ăn dặm` → `/be-an-dam`.
  Không đặt trùng với trang có sẵn (`index`, `gioi-thieu`, ...): build sẽ báo lỗi thay vì ghi đè.
- Ảnh tải lên được lưu vào `upload/news/`.
- Tick **Ẩn bài (nháp)** để lưu mà chưa hiển thị.
- Xóa/sửa bài: dùng giao diện admin; trang được tạo lại ở lần deploy kế tiếp.

## Lưu ý kỹ thuật

- `templates/article.html` được tạo từ trang `omega-3-co-tac-dung-gi.html`. Nếu sửa header/footer của site,
  hãy sửa cả template này để bài mới đồng bộ.
- Trang sinh ra không được commit; chỉ tồn tại trong artifact deploy. Chạy `npm run build` ở máy sẽ
  tạo file `*.html` và sửa `kien-thuc.html`; đừng commit các thay đổi đó.
- Nội dung Markdown được render nguyên (cho phép HTML), nên chỉ cấp quyền Write cho người tin cậy.
- `npm test` chạy bộ test của script build; CI chạy nó trước khi deploy.
- Decap được khóa phiên bản `3.17.3` kèm SRI trong `admin/index.html`; khi nâng cấp phải cập nhật cả hai.
