# 🏗️ Project Description — SiteFlow (Construction SaaS, reboot)

> Tài liệu mô tả chi tiết dự án SiteFlow, **bám sát boilerplate** và **tiêu chuẩn SaaS** hiện có.
> Mục tiêu: khởi động lại dự án một cách “sạch – đúng – testable”, để giao cho Cursor AI thực thi theo các phase chuẩn.

---

## 1) Boilerplate & Tech Stack (rất cụ thể)

- **Boilerplate gốc**: ixartz/SaaS-Boilerplate (Next.js 14 App Router, TypeScript).
- **Thư viện chính**: Next 14, React 18, Tailwind + shadcn/ui (Radix), Clerk (Auth + Orgs), Drizzle ORM + PostgreSQL, Playwright (E2E), Vitest (unit/integration), Storybook, Sentry.
- **i18n**: `next-intl` (đa ngôn ngữ theo `[locale]`).
- **Scripts chuẩn trong repo**:
  - Dev: `pnpm dev` (chạy song song nhiều tiến trình)
  - Build/Start: `pnpm build`, `pnpm start`
  - Lint/Types: `pnpm lint`, `pnpm check-types`
  - Test: `pnpm test` (Vitest), `pnpm test:e2e` (Playwright)
  - Drizzle: `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:studio`
- **Đường dẫn Schema Drizzle (quan trọng)**: `./src/models/Schema.ts` (đúng theo `drizzle.config.ts`) → **giữ nguyên để tránh import sai**.
- **CI/CD + QA gate** (định hướng theo roadmap): lint, typecheck, build, test, e2e chạy trong GH Actions, bật branch protection cho PR.

> ✅ Ghi nhớ: **KHÔNG** đổi sang `src/db/schema.ts` trừ khi cập nhật luôn `drizzle.config.ts`. Mặc định dự án đang trỏ `src/models/Schema.ts`.

---

## 2) Mục tiêu sản phẩm (Business Objectives)

- Minh bạch tiến độ & chi phí dự án xây dựng (realtime).
- Nhật ký công trường chuẩn hóa (ảnh/video, nhân công, thời tiết).
- Chia sẻ cho chủ đầu tư qua link bảo mật (có thể ẩn tài chính).
- Nền tảng đa tổ chức (multi-tenant) qua **Clerk Orgs** + RLS Postgres.

---

## 3) Personas (vai trò người dùng)

- **Admin**: quản trị tenant, phân quyền.
- **PM (Project Manager)**: lập kế hoạch, duyệt nhật ký, giám sát budget/progress.
- **Engineer**: nhập nhật ký, upload media, cập nhật trạng thái task.
- **Accountant**: nhập/soát chi phí.
- **Chủ đầu tư (Viewer)**: xem tiến độ qua **public Share Link** (ẩn tài chính nếu cần).

---

## 4) Domain Model & Luồng nghiệp vụ

- Cấu trúc: **Project → Category (Hạng mục) → Task (Đầu việc)**.
- **DailyLog**: gắn với **1 Category**, **chọn nhiều Tasks** thuộc Category đó (ghi nhận tiến độ thực tế).
- **DailyLogTask**: lưu **trạng thái mới nhất** của từng Task trong log (WAITING / IN_PROGRESS / DONE).
- **MediaAsset**: ảnh/video đính kèm DailyLog.
- **Transaction**: ADVANCE / EXPENSE, phục vụ so khớp **Spend vs Budget**.
- **ShareLink**: link public có token, tùy chọn **ẩn tài chính**.

### Quy tắc tính tiến độ (Category & Project)
```
progress = (100 / N) * (#DONE + 0.5 * #IN_PROGRESS)
```
- `N` = tổng số Task trong Category.
- Lấy **status mới nhất** từ `daily_log_tasks` (nếu thiếu thì fallback `tasks.status`).

---

## 5) Data Model (bản tóm tắt thực thi)

- **Bảng chính**: `projects, categories, tasks, daily_logs, daily_log_tasks, media_assets, transactions, share_links`
- **Ràng buộc quan trọng**:
  - `tasks.categoryId` → FK `categories.id`
  - `daily_logs.categoryId`, `daily_logs.projectId`
  - `daily_log_tasks.dailyLogId` + `taskId` (unique/PK tùy thiết kế)
  - Enum Postgres: `project_status`, `task_status`, `log_task_status`, `media_kind`, `transaction_type`
  - **Org isolation**: `orgId` ở tất cả bảng; audit fields; soft delete (`deletedAt`)
  - Chỉ mục (indexes) đầy đủ cho truy vấn tiến độ & nhật ký.

> Ghi chú: các cảnh báo & bản vá trước đây (ENUM thật, unique token share_links, nhiều index/FK) đã được ghi nhận trong log Phase 1.

---

## 6) Bảo mật, Tổ chức & Phân quyền (RBAC + RLS)

- **Clerk Orgs + Roles**: `ADMIN`, `PM`, `ENGINEER`, `ACCOUNTANT`.
- **Middleware `withRole`** + helper `hasRole()` cho kiểm tra role và **set context org**.
- **Postgres RLS** trên 8 bảng, policy dạng `org_id = current_setting('app.current_org')::uuid`.
- **Endpoint** demo kiểm tra quyền: `/api/v1/_rbac-check`.

---

## 7) Chuẩn API v1

- **Đường dẫn**: `/api/v1/{entity}` (projects, categories, tasks, daily-logs, daily-log-tasks, transactions, share-links, cloudinary/sign).
- **Validation**: Zod; **Error**: RFC7807; **Pagination**: cursor-based; **Soft delete**: mặc định lọc `deletedAt IS NULL`.
- **Progress endpoints**:
  - `GET /api/v1/categories/:id/progress`
  - `GET /api/v1/projects/:id/progress`
- **Cloudinary**: `POST /api/v1/cloudinary/sign` để FE upload trực tiếp và lưu metadata qua `/api/v1/media-assets`.

---

## 8) Frontend Architecture & Routing (App Router)

- **Canonical routing** (URL công khai **không chứa** `(auth)`):
  - `src/app/[locale]/(auth)/dashboard/page.tsx` → `/{locale}/dashboard`
  - `src/app/[locale]/(auth)/projects/page.tsx` → `/{locale}/projects`
  - `src/app/[locale]/(auth)/projects/[id]/overview/page.tsx` → `/{locale}/projects/{id}/overview`
  - `src/app/[locale]/share/[token]/page.tsx` (public, **không** sidebar) → `/{locale}/share/{token}`
  (và các tab: tasks, daily-logs, finance, share-links).
- **Shared shell** (sidebar + header) tại layout của `(auth)`; public Share không dùng shell.
- **A11y & QA**: console-clean gate, axe serious/critical = 0 (chuẩn trước Phase 7).

---

## 9) Media & Upload

- FE dùng component upload (shadcn + Cloudinary direct upload).
- BE ký lên Cloudinary (`/api/v1/cloudinary/sign`), sau đó lưu **metadata** vào `media_assets`.

---

## 10) Finance (Budget vs Spend)

- `transactions` gồm **ADVANCE/EXPENSE**; tính **Spend vs Budget**; hiển thị cảnh báo **over-budget** ở Project Detail / Finance tab.

---

## 11) Share Links (Public Transparency)

- Tạo token → public page `/share/{token}`, có tuỳ chọn ẩn tài chính.
- Chỉ đọc: hiển thị progress hạng mục/dự án; không có sidebar.

---

## 12) Quốc tế hoá (i18n)

- Cấu trúc route `[locale]` + `next-intl`.
- Tối thiểu `vi`/`en`; các pages auth nằm dưới `(auth)` để giữ shell nhất quán.

---

## 13) Dev Workflow (chạy đúng boilerplate)

### Môi trường
- Tạo `.env.local`: `DATABASE_URL`, `CLERK_SECRET_KEY`, (E2E) `E2E_AUTH_BYPASS=1`.

### Lệnh chạy
- **Cài**: `pnpm install`
- **Dev**: `pnpm dev` (boilerplate đã cấu hình `run-p dev:*`)
- **DB**:
  - Gen migration: `pnpm db:generate`
  - Apply migration: `pnpm db:migrate`
  - Studio: `pnpm db:studio`
- **Test**:
  - Unit/Integration: `pnpm test`
  - E2E: `pnpm test:e2e`
- **Commit**: `pnpm commit` (Commitizen + Conventional Commits).

### Nguyên tắc merge
- Mỗi Phase → 1 branch/PR, CI phải xanh; console-clean; E2E smoke pass; a11y pass.

---

## 14) Definition of Done (MVP)

- Schema 8 bảng + audit/soft delete/orgId, migration-first.
- RBAC: Clerk Orgs + Roles + RLS, endpoint `_rbac-check`.
- API v1 CRUD full + Zod + RFC7807 + pagination + soft delete.
- Progress service đúng công thức, “latest status” từ `daily_log_tasks`.
- Media upload (Cloudinary) lưu metadata.
- UI: Dashboard + Project Detail (Overview, Tasks, Daily Logs, Finance, Share Links), Public Share.
- Finance cảnh báo over-budget.
- Tests (unit/integration/E2E) pass + CI xanh.

---

## 15) NFRs (phi chức năng) & chuẩn chất lượng

- **Security**: CSP, HSTS, Referrer-Policy, Permissions-Policy; secrets trong `.env`; không hardcode.
- **Performance**: truy vấn tiến độ <100ms (index hợp lý, view tối ưu).
- **Observability**: Sentry tích hợp để log lỗi prod.
- **A11y**: axe serious/critical = 0 ở các trang trọng yếu (Projects, Project Detail).

---

## 16) Lộ trình triển khai (tóm tắt)

- Phase 0: Setup & QA foundation.
- Phase 1: Schema & Migration.
- Phase 2: RBAC & RLS.
- Phase 3: API v1.
- Phase 4: Progress.
- Phase 5: Media Upload.
- Phase 6: UI đầy đủ + canonical routing.
- Phase 7: Testing & CI.
- Phase 8: Deploy & Monitoring.

## 17) Admin Panel UI (Shadcn Admin)

- **Chuẩn UI/UX tham chiếu**: [Shadcn Admin Demo](https://shadcn-admin.netlify.app/).
- **Áp dụng cho Phase 4.A.1 (Dashboard Refactor)**:
  - **ShellLayout**: Header + Sidebar (theo demo), tối ưu responsive (mobile-first).
  - **Sidebar**: canonical navigation (Dashboard, Projects, Tasks, Daily Logs, Finance, Settings).
  - **Header**: hiển thị thông tin user/org, nút create project, language switcher (i18n).
  - **Content**: layout grid + card KPI, bảng (table) danh sách, modal create project (RHF + Zod).
  - **Theme**: light/dark mode toggle, typography + spacing theo shadcn chuẩn.
- **Yêu cầu bắt buộc**:
  - Tuân thủ styleguide của boilerplate (Tailwind + shadcn/ui).
  - Mobile-first, responsive tốt.
  - KISS (Keep It Simple & Straightforward).
  - Tích hợp i18n (`next-intl`), mặc định `en`.
  - E2E bypass (fake user = OWNER) để không bị chặn auth trong dev.
- **Acceptance cho Phase 4.A.1**:
  - `/dashboard` load đúng shell như demo shadcn-admin.
  - Sidebar không bị mất spacing/gap, active state rõ ràng.
  - Header hiển thị đúng các thành phần.
  - Modal tạo project hoạt động (form validate bằng Zod).
  - Console clean, UI không vỡ ở mobile.

## 18) Project Members & User Sync

- **Vấn đề:** Dự án cần gán một hoặc nhiều thành viên (manager, member) từ Clerk Organization vào từng Project. Field `assignedTo` trong bảng `projects` không đủ để mở rộng.
- **Giải pháp:** Tách bảng phụ `project_members` và bảng `users` để quản lý quan hệ Project ↔ User, đồng thời sync dữ liệu user từ Clerk về DB.
- **Schema:**
  - `users`: cache thông tin user từ Clerk
    ```sql
    users (
      id uuid pk,
      clerk_user_id text unique not null,
      email text,
      name text,
      avatar_url text,
      created_at timestamptz default now()
    )
    ```
  - `project_members`: quan hệ N-N giữa projects và users
    ```sql
    project_members (
      id uuid pk,
      project_id uuid references projects(id),
      user_id text not null,            -- Clerk userId
      role enum('manager','member'),
      created_at timestamptz default now(),
      unique(project_id, user_id)
    )
    ```
- **Luồng Create Project:**
  1. Người dùng mở modal, chọn Manager (Clerk user).
  2. API tạo `projects`.
  3. Sync user vào bảng `users` (nếu chưa có).
  4. Insert record `project_members` với role=manager.
  5. Trả về project kèm manager info.
- **Sync Clerk Users:**
  - Webhook Clerk:
    * `organizationMembership.created` → insert vào `users`.
    * `user.updated` → update `users`.
    * `organizationMembership.deleted` → soft delete/inactive.
- **Acceptance:** Invite user mới → sync DB. Tạo project → project_members có manager. Dashboard hiển thị avatar manager.

## 19) Progress Service

- **Vấn đề:** Cần tính tiến độ realtime dựa trên tasks & daily_log_tasks.
- **Giải pháp:** Tạo Postgres views và service layer.
- **Schema/Views:**
  - `category_progress`:
    ```sql
    progress = (100 / N) * (#DONE + 0.5 * #IN_PROGRESS)
    ```
    - Lấy status mới nhất từ daily_log_tasks (fallback tasks.status).
  - `project_progress`: weighted average từ category_progress.
- **Service:** getCategoryProgress, getProjectProgress.
- **API:** `/api/v1/categories/:id/progress`, `/api/v1/projects/:id/progress`.
- **Acceptance:** API trả đúng % tiến độ, tested bằng seed data.

## 20) Project Metadata mở rộng

- **Bổ sung fields mới trong bảng projects:**
  - `thumbnail_url` (text, optional): ảnh đại diện/cover của project.
  - `end_date` (date, optional): estimated end date.
  - `description` (text, optional): mô tả chi tiết dự án.
- **Luồng Create Project:** Form modal đã có các trường này, API nhận & validate, DB lưu.
- **Acceptance:** Khi tạo project → lưu được thumbnailUrl, endDate, description. Hiển thị trong Dashboard.

## 21) Dev Bypass & Testing Helpers

- **E2E bypass:** Trong môi trường dev/test, có thể gán fake user = OWNER để bỏ qua auth Clerk. Header `x-e2e-bypass`, `x-e2e-user`, `x-e2e-org` đã được implement.
- **Dev Workflow:** Khi bật E2E bypass, có thể test API, Dashboard mà không cần login.
- **Acceptance:** Dashboard load được khi dev mode, API CRUD test chạy OK mà không cần auth Clerk.

## 22) Media Upload & Gallery

- **Vấn đề:** Dự án cần hỗ trợ upload nhiều ảnh (thumbnail cho project, ảnh daily logs) và hiển thị dạng gallery.
- **Giải pháp:**
  - Sử dụng **react-uploady** để xử lý phần upload (multi-file, preview, retry, queue).
  - Sử dụng **cloudinary-react** để hiển thị ảnh và transformation (thumbnail, gallery).
  - API backend `/api/v1/cloudinary/sign` để ký và upload trực tiếp lên Cloudinary.
  - Metadata ảnh lưu vào bảng `media_assets` (public_id, secure_url, width, height, kind='image', project_id).

- **Flow:**
  1. Người dùng chọn ảnh (1 hoặc nhiều) qua <UploadButton> hoặc dropzone.
  2. Ảnh upload trực tiếp lên Cloudinary qua signed URL.
  3. FE nhận secure_url → lưu vào backend (projects.thumbnailUrl hoặc daily log media).
  4. Gallery view: dùng cloudinary-react để render thumbnail, preview, zoom.

- **Acceptance:**
  - Upload thành công ảnh → DB lưu secure_url.
  - Project thumbnail hiển thị đúng trong Dashboard.
  - Daily log gallery hiển thị tất cả ảnh.
