/**
 * GENERATED SPEC
 * Module : E-Library
 * State  : Search smoke
 * Source : User-provided observed UI DOM and manual search result
 */
import { test, expect } from '@fixtures/elibrary.fixture';
import { env } from '@config/env';

test('TC_TKN_001 - Tìm kiếm tài liệu theo tên file', async ({
  eofficeLoginPage,
  elibrarySearchPage,
  evidence
}) => {
  test.skip(
    !env.elibrary.username || !env.elibrary.password,
    'Set ELIBRARY_USERNAME and ELIBRARY_PASSWORD in the local .env file.'
  );

  await evidence.runtime();

  await test.step('Đăng nhập eOffice và mở Thư viện điện tử', async () => {
    await eofficeLoginPage.open();
    await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
    await expect(eofficeLoginPage.libraryMenuLink).toBeVisible();
    await eofficeLoginPage.openLibrary();
    await expect(elibrarySearchPage.searchInput).toBeVisible();
  });

  await test.step('Tìm tên file tài liệu đã xác nhận có trong hệ thống', async () => {
    await elibrarySearchPage.search('PTSC_ThuVienDienTu_Guide.pdf');
    await expect(elibrarySearchPage.resultCount).toHaveText('1');
    await expect(elibrarySearchPage.firstResultTitle).toHaveText('HƯỚNG DẪN SỬ DỤNG');
    await evidence.screenshot('TC_TKN_001-search-result');
  });
});
test('TC_TKN_002 - Tìm kiếm từ khóa không dấu', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(
    !env.elibrary.username || !env.elibrary.password,
    'Cần điền tài khoản trong file .env'
  );

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();

  await elibrarySearchPage.search('Thu vien dien tu');

  // Xác nhận có kết quả và kết quả đầu tiên hiển thị
  await expect(elibrarySearchPage.resultCount).toHaveText(/^[1-9]\d*$/);
  await expect(elibrarySearchPage.resultCards.first()).toBeVisible();
});