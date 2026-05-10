# ==============================================================================
# Playwright TypeScript AI-Automation Framework — Makefile
# ==============================================================================
#
# ╔══════════════════════════════════════════════════════════════════╗
# ║  Lưu ý: Makefile hoạt động tốt trên macOS và Linux.            ║
# ║  Trên Windows, dùng lệnh npm tương đương (liệt kê bên dưới).   ║
# ╚══════════════════════════════════════════════════════════════════╝
#
# ── Tác vụ thường dùng ────────────────────────────────────────────
#   make setup            → Cài đặt lần đầu (install deps + browsers)
#   make install          → Chỉ cài npm deps
#   make install-browsers → Chỉ cài Playwright browsers
#
# ── Dọn dẹp (cross-platform qua rimraf) ──────────────────────────
#   make clean-reports    → Xóa kết quả test cũ (giữ node_modules)
#   make clean-all        → Xóa toàn bộ kết quả + file rác (giữ node_modules)
#   make clean-hard       → Xóa TOÀN BỘ kể cả node_modules (cần make install lại)
#   [Windows]: npm run clean:reports / npm run clean:all / npm run clean:hard
#
# ── Chạy test ─────────────────────────────────────────────────────
#   make test-dev                           → Chạy toàn bộ trên dev
#   make test-module MODULE=admin           → Chạy 1 module
#   make test-file FILE=tests/generated/admin/users_crud.generated.spec.ts → Chạy 1 file
#   make test-headed MODULE=admin           → Chạy 1 module, mở browser
#   make test-seq MODULE=admin              → Chạy tuần tự 1 module
#   make test-debug FILE=tests/...spec.ts   → Debug từng step
#   make test-grep GREP="TC_IT_USR_05"      → Lọc test theo tên/tag
#
# ── Báo cáo ───────────────────────────────────────────────────────
#   make report           → Mở HTML report
#   make report-allure    → Mở Allure report
#
# ── Chất lượng code ───────────────────────────────────────────────
#   make validate         → Validate generated specs (anti-pattern check)
#   make lint             → ESLint
#   make format           → Prettier format
#
# ── Tạo module mới ────────────────────────────────────────────────
#   make gen-module MODULE=<tên_module>
#
# Windows không hỗ trợ Makefile mặc định.
# Cài GNU Make: winget install GnuWin32.Make
# Hoặc dùng các lệnh npm tương đương được ghi chú bên dưới mỗi target.
# ==============================================================================

.PHONY: setup install install-browsers \
        clean-reports clean-all \
        test test-dev test-stg test-uat test-prod \
        test-module test-file test-headed test-seq test-debug test-grep \
        test-smoke test-regression test-generated test-ui \
        report report-allure \
        validate lint format lint-fix \
        gen-module gen-spec help

# ── Cài đặt ───────────────────────────────────────────────────────

install:
	npm ci

install-browsers:
	npx playwright install --with-deps

setup: install install-browsers
	@echo "✅ Setup hoàn tất. Hãy copy .env.example → .env và điền thông tin môi trường."

# ── Dọn dẹp (cross-platform, dùng rimraf qua npm) ────────────────
# Xóa kết quả test cũ — GIỮ LẠI node_modules
# [Windows]: npm run clean:reports

clean-reports:
	@echo "🧹 Đang xóa kết quả test cũ..."
	npm run clean:reports
	@echo "✅ Đã xóa. Framework sẵn sàng để chạy test mới."

# Xóa toàn bộ kết quả + file rác — GIỮ LẠI node_modules
# [Windows]: npm run clean:all
clean-all:
	@echo "🧹 Đang xóa kết quả test, báo cáo và file rác..."
	npm run clean:all
	@echo "✅ Dọn dẹp hoàn tất. node_modules vẫn còn, sẵn sàng chạy test mới."

# Xóa TOÀN BỘ kể cả node_modules — dùng khi cần reset hoàn toàn
# Sau lệnh này phải chạy 'make install' hoặc 'npm install' để cài lại
# [Windows]: npm run clean:hard
clean-hard:
	@echo "🧹 Đang xóa toàn bộ kể cả node_modules..."
	npm run clean:hard
	@echo "✅ Reset hoàn tất. Hãy chạy 'make install' để cài lại deps."

# ── Workflow thường dùng nhất ─────────────────────────────────────
# Xóa kết quả cũ và chạy lại module trên dev (headed để quan sát)
# Usage: make run-fresh MODULE=admin
# [Windows]: npm run clean:reports && npx cross-env TEST_ENV=dev npx playwright test tests/generated/<MODULE>/ --project=chromium --headed --workers=1
run-fresh:
	@if [ -z "$(MODULE)" ]; then echo "❌ Usage: make run-fresh MODULE=<tên_module>"; exit 1; fi
	@$(MAKE) clean-reports
	@echo "🚀 Đang chạy module [$(MODULE)] trên dev..."
	cross-env TEST_ENV=dev npx playwright test tests/generated/$(MODULE)/ --project=chromium --headed --workers=1

# ── Chạy test ─────────────────────────────────────────────────────
# [Windows]: npm run test:dev
test-dev:
	npm run test:dev

# [Windows]: npm run test:stg
test-stg:
	npm run test:stg

# [Windows]: npm run test:uat
test-uat:
	npm run test:uat

# [Windows]: npm run test:prod:smoke
test-prod:
	npm run test:prod:smoke

# Chạy toàn bộ module (song song, mặc định)
# Usage: make test-module MODULE=admin [ENV=dev]
# [Windows]: npx cross-env TEST_ENV=dev npx playwright test tests/generated/admin/ --project=chromium
test-module:
	@if [ -z "$(MODULE)" ]; then echo "❌ Usage: make test-module MODULE=<tên_module> [ENV=dev]"; exit 1; fi
	cross-env TEST_ENV=$(or $(ENV),dev) npx playwright test tests/generated/$(MODULE)/ --project=chromium

# Chạy một file spec cụ thể
# Usage: make test-file FILE=tests/generated/admin/users_crud.generated.spec.ts [ENV=dev]
# [Windows]: npx cross-env TEST_ENV=dev npx playwright test tests/generated/admin/... --project=chromium
test-file:
	@if [ -z "$(FILE)" ]; then echo "❌ Usage: make test-file FILE=<đường_dẫn_file> [ENV=dev]"; exit 1; fi
	cross-env TEST_ENV=$(or $(ENV),dev) npx playwright test $(FILE) --project=chromium

# Chạy module có mở browser (headed), tuần tự để quan sát
# Usage: make test-headed MODULE=admin [ENV=dev]
# [Windows]: npx cross-env TEST_ENV=dev npx playwright test tests/generated/admin/ --project=chromium --headed --workers=1
test-headed:
	@if [ -z "$(MODULE)" ]; then echo "❌ Usage: make test-headed MODULE=<tên_module> [ENV=dev]"; exit 1; fi
	cross-env TEST_ENV=$(or $(ENV),dev) npx playwright test tests/generated/$(MODULE)/ --project=chromium --headed --workers=1

# Chạy module tuần tự (không mở browser, dành cho CI)
# Usage: make test-seq MODULE=admin [ENV=dev]
# [Windows]: npx cross-env TEST_ENV=dev npx playwright test tests/generated/admin/ --project=chromium --workers=1
test-seq:
	@if [ -z "$(MODULE)" ]; then echo "❌ Usage: make test-seq MODULE=<tên_module> [ENV=dev]"; exit 1; fi
	cross-env TEST_ENV=$(or $(ENV),dev) npx playwright test tests/generated/$(MODULE)/ --project=chromium --workers=1

# Debug từng step — mở Playwright Inspector
# Usage: make test-debug FILE=tests/generated/admin/users_crud.generated.spec.ts [ENV=dev]
# [Windows]: npx cross-env TEST_ENV=dev npx playwright test tests/... --project=chromium --debug
test-debug:
	@if [ -z "$(FILE)" ]; then echo "❌ Usage: make test-debug FILE=<đường_dẫn_file> [ENV=dev]"; exit 1; fi
	cross-env TEST_ENV=$(or $(ENV),dev) npx playwright test $(FILE) --project=chromium --debug

# Lọc và chạy test theo tên hoặc tag
# Usage: make test-grep GREP="TC_IT_USR_05" [ENV=dev]
# Usage: make test-grep GREP="@smoke" [ENV=dev]
# [Windows]: npx cross-env TEST_ENV=dev npx playwright test --grep "TC_IT_USR_05" --project=chromium
test-grep:
	@if [ -z "$(GREP)" ]; then echo "❌ Usage: make test-grep GREP=<tên_hoặc_tag> [ENV=dev]"; exit 1; fi
	cross-env TEST_ENV=$(or $(ENV),dev) npx playwright test --grep "$(GREP)" --project=chromium

# [Windows]: npm run test:smoke
test-smoke:
	npm run test:smoke

# [Windows]: npm run test:regression
test-regression:
	npm run test:regression

# [Windows]: npm run test:generated
test-generated:
	npm run test:generated

# [Windows]: npm run test:ui
test-ui:
	npm run test:ui

# ── Báo cáo ───────────────────────────────────────────────────────
# [Windows]: npx playwright show-report
report:
	npm run report

# [Windows]: npm run report:allure
report-allure:
	npm run report:allure

# ── Chất lượng code ───────────────────────────────────────────────
# [Windows]: npm run validate:ai
validate:
	npm run validate:ai

# [Windows]: npm run lint
lint:
	npm run lint

# [Windows]: npm run lint:fix
lint-fix:
	npm run lint:fix

# [Windows]: npm run format
format:
	npm run format

# ── Scaffold Module Mới ───────────────────────────────────────────
# Usage: make gen-module MODULE=<tên_module>
# [Windows]: node tools/create-module.mjs <tên_module>
gen-module:
	@if [ -z "$(MODULE)" ]; then echo "❌ Usage: make gen-module MODULE=<tên_module>"; exit 1; fi
	node tools/create-module.mjs $(MODULE)

# Generate spec từ JSON
# Usage: make gen-spec INPUT=inputs/manual-testcases/login.json
gen-spec:
	@if [ -z "$(INPUT)" ]; then echo "❌ Usage: make gen-spec INPUT=<đường_dẫn_json>"; exit 1; fi
	node tools/gen-from-json.mjs $(INPUT)

# ── Help ──────────────────────────────────────────────────────────

help:
	@echo ""
	@echo "📖 Playwright AI Framework — Danh sách lệnh"
	@echo "════════════════════════════════════════════════════════"
	@echo ""
	@echo "  🔧 CÀI ĐẶT"
	@echo "  make setup                           → Cài đặt lần đầu"
	@echo "  make install                         → npm ci"
	@echo "  make install-browsers                → Cài Playwright browsers"
	@echo ""
	@echo "  🧹 DỌN DẸP (cross-platform)"
	@echo "  make clean-reports                   → Xóa kết quả test cũ"
	@echo "  make clean-all                       → Xóa cả node_modules + kết quả"
	@echo ""
	@echo "  🚀 CHẠY TEST (THƯỜNG DÙNG)"
	@echo "  make run-fresh MODULE=<tên>          → Xóa cũ + chạy headed tuần tự"
	@echo "  make test-dev                        → Chạy toàn bộ trên dev"
	@echo "  make test-module MODULE=<tên>        → Chạy 1 module [ENV=dev]"
	@echo "  make test-file FILE=<path>           → Chạy 1 file spec [ENV=dev]"
	@echo "  make test-headed MODULE=<tên>        → Chạy có mở browser [ENV=dev]"
	@echo "  make test-seq MODULE=<tên>           → Chạy tuần tự [ENV=dev]"
	@echo "  make test-grep GREP=<tên/tag>        → Lọc theo tên hoặc tag [ENV=dev]"
	@echo "  make test-debug FILE=<path>          → Debug từng step [ENV=dev]"
	@echo ""
	@echo "  📊 BÁO CÁO"
	@echo "  make report                          → Mở HTML report"
	@echo "  make report-allure                   → Mở Allure report"
	@echo ""
	@echo "  ✅ CHẤT LƯỢNG"
	@echo "  make validate                        → Validate AI-generated specs"
	@echo "  make lint                            → ESLint check"
	@echo "  make format                          → Prettier format"
	@echo ""
	@echo "  🏗  SCAFFOLD"
	@echo "  make gen-module MODULE=<tên>         → Tạo module mới"
	@echo "  make gen-spec INPUT=<path>           → Tạo spec từ JSON"
	@echo ""
	@echo "  [Windows]: dùng lệnh npm tương đương ghi chú trong Makefile"
	@echo ""
