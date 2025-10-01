# PHASE 4A2 TODO - Dashboard Data Plumbing End-to-End

## Checklist chi tiết

### BƯỚC 0 — TẠO TODO LIST ✅
- [x] Tạo file `docs/PHASE_4A2_TODO.md` liệt kê checklist chi tiết
- [x] In checklist vào console và link trong PHASE_4A2_LOG.md

### BƯỚC 1 — DB & SEED (đảm bảo có dữ liệu để hiển thị)
- [ ] Chạy `pnpm db:migrate`
- [ ] Chạy `pnpm tsx src/scripts/seed.ts`
- [ ] Seed tối thiểu 30 projects (đa dạng name/status/createdAt)
- [ ] Ghi `SELECT COUNT(*) FROM projects WHERE deleted_at IS NULL` vào log
- [ ] Dán output thực tế vào PHASE_4A2_LOG.md (phần "DB Verify")
- [ ] Thêm ảnh chụp từ Drizzle Studio/psql → `/public/_artifacts/phase4a2/db-count.png`

### BƯỚC 2 — API /api/v1/projects (cursor-based pagination THẬT)
- [ ] Chuẩn hóa endpoint: GET /api/v1/projects?limit=10&cursor=<string>&q=<string>&sort=name:asc|name:desc|createdAt:desc
- [ ] Response JSON: `{ "items": [...], "nextCursor": "<string|null>", "prevCursor": "<string|null>", "hasMore": true|false }`
- [ ] Lọc mặc định: deletedAt IS NULL
- [ ] Hỗ trợ q (name ILIKE), sort name asc/desc & createdAt desc
- [ ] Viết unit/integration tests xác nhận:
  - [ ] limit=10 trả chính xác 10 item
  - [ ] nextCursor khác null khi còn data
  - [ ] Trang 2 không trùng record trang 1
  - [ ] q & sort hoạt động
- [ ] Ghi mẫu request/response thật (trang 1 & trang 2) vào PHASE_4A2_LOG.md

### BƯỚC 3 — AUTH BYPASS XUYÊN SUỐT (header + cookie)
- [ ] Cập nhật middleware: khi `process.env.E2E_AUTH_BYPASS === '1'`:
  - [ ] Nếu có header `x-e2e-bypass=1` → set cookie `e2e-bypass=1; Path=/; HttpOnly`
  - [ ] Tự động cho phép /en/dashboard và mọi `/api/v1/*` khi cookie `e2e-bypass=1`
- [ ] Cập nhật API guard: hàm `isBypass()` trả true nếu:
  - [ ] header `x-e2e-bypass=1` hoặc cookie `e2e-bypass=1`
- [ ] Viết README đoạn "Dev Bypass (header+cookie)" với ví dụ curl & ảnh network

### BƯỚC 4 — FE TABLE: gọi API thật (không mock)
- [ ] Mở `src/components/admin/paginated-table.tsx`:
  - [ ] Thay fetch mock → dùng fetch(`/api/v1/projects?...`) server-side (RSC) hoặc client
  - [ ] Bảo toàn q & sort khi chuyển trang; page size 10
  - [ ] Empty state: "No projects found" khi items.length === 0
  - [ ] Loading: skeleton rõ ràng
- [ ] Thêm ảnh Network Tab chứng minh request → 200 + payload đúng
- [ ] Lưu vào `/public/_artifacts/phase4a2/network-projects-page1.png`

### BƯỚC 5 — E2E (đặt trong `e2e/` — KHÔNG ở nơi khác)
- [ ] File chính: `e2e/4a2/dashboard.spec.ts` (mở rộng từ bộ mẫu)
- [ ] Các kịch bản TỐI THIỂU:
  - [ ] **Dashboard render**: vào /dashboard (bypass ON) → thấy table & ≥1 dòng
  - [ ] **Pagination**: Next → có dòng khác trang 1; Prev → quay lại đúng
  - [ ] **Search**: nhập q → chỉ thấy record khớp; Next/Prev vẫn giữ q
  - [ ] **Sort**: chuyển asc/desc → thứ tự thay đổi rõ rệt
  - [ ] **CRUD**: Create (modal + Cloudinary) → record mới hiển thị; Edit → cập nhật; Delete (soft) → biến mất
  - [ ] **Responsive**: viewport 375x812 → sidebar/header/table không vỡ
  - [ ] **Console gate**: không còn warning controlled/uncontrolled
- [ ] Chạy: `pnpm test:e2e` → dán kết quả thật và ảnh UI vào log

### BƯỚC 6 — STATIC CHECKS & BUILD
- [ ] Chạy `pnpm lint`
- [ ] Chạy `pnpm check-types`
- [ ] Chạy `pnpm build`
- [ ] Sửa triệt để "19 problems (markdown parsing)" hoặc ignore có chủ đích
- [ ] Dán output cuối (PASS) vào PHASE_4A2_LOG.md

### BƯỚC 7 — BÁO CÁO & CAM KẾT
- [ ] Cập nhật `docs/PHASE_4A2_LOG.md` với cấu trúc:
  - [ ] I. Overview (branch, commit hash, cổng dev)
  - [ ] II. TODO (đã tick ✅ từng mục, kèm link đến `docs/PHASE_4A2_TODO.md`)
  - [ ] III. DB Verify (count trước/sau seed + ảnh)
  - [ ] IV. API Verify (mẫu request/response page1/page2 + ảnh Network)
  - [ ] V. FE Verify (screenshot UI chính)
  - [ ] VI. Tests (unit/integration/e2e output đầy đủ; ảnh pass)
  - [ ] VII. Console/A11y (không warning nghiêm trọng; nếu có, liệt kê & fix)
  - [ ] VIII. Kết luận & PR link

### BƯỚC 8 — COMMIT & PR
- [ ] Branch: `fix/4a2-dashboard-completion`
- [ ] Conventional commits:
  - [ ] feat(api): cursor pagination for projects with q/sort
  - [ ] fix(auth): e2e bypass via cookie fallback in middleware
  - [ ] feat(ui): connect paginated table to real API + empty/loading states
  - [ ] test(e2e): dashboard pagination/search/sort/crud scenarios
- [ ] Push + tạo PR, chèn link PR vào cuối PHASE_4A2_LOG.md

## ACCEPTANCE CRITERIA
- [ ] /dashboard hiển thị danh sách project thật (≥1 record) khi bypass ON; không redirect /sign-in
- [ ] /api/v1/projects trả đúng schema & cursor hoạt động (không trùng record giữa các trang; giữ q/sort)
- [ ] FE table gọi API thật (có bằng chứng Network + ảnh UI)
- [ ] E2E pass cho tất cả kịch bản
- [ ] Lint/Types/Build PASS. Console sạch (không lỗi/warning React form)
- [ ] Log + screenshots đầy đủ, có PR link
