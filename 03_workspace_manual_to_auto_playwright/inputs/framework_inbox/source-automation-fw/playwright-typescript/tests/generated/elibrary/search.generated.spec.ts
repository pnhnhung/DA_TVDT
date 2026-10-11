/**
 * GENERATED SPEC
 * Module : E-Library
 * State  : Search
 * Source : User-provided test cases and observed E-Library UI
 */
import { test, expect } from '@fixtures/elibrary.fixture';
import { env } from '@config/env';

test('TC_TKN_001 - Tìm theo tên tài liệu, tên file và từ khóa gần đúng', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(!env.elibrary.username || !env.elibrary.password, 'Cần cấu hình tài khoản trong file .env');

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();
  await elibrarySearchPage.search('HƯỚNG DẪN SỬ DỤNG');
  await expect(elibrarySearchPage.resultCount).toHaveText(/^[1-9]\d*$/);
  await expect(elibrarySearchPage.firstResultTitle).toHaveText('HƯỚNG DẪN SỬ DỤNG');

  await elibrarySearchPage.search('PTSC_ThuVienDienTu_Guide.pdf');
  await expect(elibrarySearchPage.resultCount).toHaveText('1');
  await expect(elibrarySearchPage.firstResultTitle).toHaveText('HƯỚNG DẪN SỬ DỤNG');

  await elibrarySearchPage.search('PTSC Thu Vien Dien Tu Guide');
  await expect(elibrarySearchPage.resultCount).toHaveText(/^[1-9]\d*$/);
  await expect(elibrarySearchPage.firstResultTitle).toHaveText('HƯỚNG DẪN SỬ DỤNG');
});

test('TC_TKN_002 - Mở giao diện tìm kiếm bằng giọng nói', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(!env.elibrary.username || !env.elibrary.password, 'Cần cấu hình tài khoản trong file .env');

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();

  // Phần phát file âm thanh và xác nhận phiên âm sẽ bổ sung khi có audio fixture phù hợp.
  await expect(elibrarySearchPage.voiceSearchButton).toBeVisible();
  await expect(elibrarySearchPage.voiceSearchButton).toHaveAttribute('aria-pressed', 'false');
  await elibrarySearchPage.voiceSearchButton.click();
  await expect(elibrarySearchPage.voiceSearchButton).toHaveAttribute('aria-pressed', 'true');
  await expect(elibrarySearchPage.voiceSearchPrompt).toBeVisible();
});

test('TC_TKN_003 - Tìm kiếm khi không có kết quả', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(!env.elibrary.username || !env.elibrary.password, 'Cần cấu hình tài khoản trong file .env');

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();
  await elibrarySearchPage.search('xyzabc123notexist');

  await expect(elibrarySearchPage.noResultsMessage).toBeVisible();
  await expect(elibrarySearchPage.resultCards).toHaveCount(0);
});

test('TC_TKN_004 - Không gửi tìm kiếm khi để trống từ khóa', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(!env.elibrary.username || !env.elibrary.password, 'Cần cấu hình tài khoản trong file .env');

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();
  await expect(elibrarySearchPage.searchInput).toHaveValue('');

  if (await elibrarySearchPage.searchButton.isDisabled()) return;

  await elibrarySearchPage.searchButton.click();
  await expect(elibrarySearchPage.searchInput).toHaveValue('');
  await expect(elibrarySearchPage.searchForm).toHaveAttribute('aria-busy', 'false');
});

test('TC_TKN_005 - Hiển thị thông tin tổng quan do AI tạo', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(!env.elibrary.username || !env.elibrary.password, 'Cần cấu hình tài khoản trong file .env');

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();
  await elibrarySearchPage.search('quy trình');

  await expect(elibrarySearchPage.resultCount).toHaveText(/^[1-9]\d*$/);
  await expect(elibrarySearchPage.aiOverviewHeading).toBeVisible();
  await expect(elibrarySearchPage.aiOverviewLoadingStatus).toBeHidden();
  await expect(elibrarySearchPage.aiOverviewMoreButton).toBeVisible();
});

test('TC_TKN_006 - Tô vàng từ khóa khớp theo nội dung, tên tài liệu và tên file', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(!env.elibrary.username || !env.elibrary.password, 'Cần cấu hình tài khoản trong file .env');

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();
  await elibrarySearchPage.search('hợp đồng');

  await expect(elibrarySearchPage.resultCount).toHaveText(/^[1-9]\d*$/);
  await elibrarySearchPage.firstResultMatchDetailsButton.click();
  await expect
    .poll(() => elibrarySearchPage.firstResultHasYellowHighlightsFor('hợp đồng'))
    .toBe(true);

  for (const query of ['HƯỚNG DẪN SỬ DỤNG', 'PTSC_ThuVienDienTu_Guide.pdf']) {
    await elibrarySearchPage.search(query);
    await expect(elibrarySearchPage.resultCount).toHaveText(/^[1-9]\d*$/);
    if (await elibrarySearchPage.firstResultMatchDetailsButton.isVisible()) {
      await elibrarySearchPage.firstResultMatchDetailsButton.click();
    }
    await expect
      .poll(() => elibrarySearchPage.firstResultHasYellowHighlightsFor(query))
      .toBe(true);
  }
});

test('TC_TKN_007 - Tìm kiếm và kiểm tra thông tin tài liệu', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(!env.elibrary.username || !env.elibrary.password, 'Cần cấu hình tài khoản trong file .env');

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();
  await elibrarySearchPage.search('HƯỚNG DẪN SỬ DỤNG');

  await expect(elibrarySearchPage.resultCount).toHaveText(/^[1-9]\d*$/);
  await expect(elibrarySearchPage.firstResultTitle).toHaveText('HƯỚNG DẪN SỬ DỤNG');
  // DOM đã được cung cấp cho thấy mã, tóm tắt, trạng thái và đường dẫn.
  // Năm và trạng thái mượn chưa có trong DOM hiện tại để kiểm tra trực tiếp.
  await expect(elibrarySearchPage.firstResultMetadataPreview).toContainText(/Mã tài liệu tự sinh/);
  await expect(elibrarySearchPage.firstResultMetadataPreview).toContainText(/Tóm tắt tài liệu/);
  await expect(elibrarySearchPage.firstResultStoragePath).toBeVisible();
  await expect(elibrarySearchPage.resultCards.first()).toContainText('Hiện hành');
});

test('TC_TKN_008 - Tìm kiếm không phân biệt dấu và chữ hoa, chữ thường', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(!env.elibrary.username || !env.elibrary.password, 'Cần cấu hình tài khoản trong file .env');

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();

  await elibrarySearchPage.search('HƯỚNG DẪN');
  await expect(elibrarySearchPage.resultSummary).toContainText('HƯỚNG DẪN');
  const uppercaseCount = await elibrarySearchPage.resultCount.innerText();
  const uppercaseTitles = await elibrarySearchPage.resultCards.locator('h1,h2,h3,h4').allInnerTexts();
  expect(Number(uppercaseCount)).toBeGreaterThan(0);

  await elibrarySearchPage.search('hướng dẫn');
  await expect(elibrarySearchPage.resultSummary).toContainText('hướng dẫn');
  await expect(elibrarySearchPage.resultCount).toHaveText(uppercaseCount);
  await expect(elibrarySearchPage.resultCards.locator('h1,h2,h3,h4').allInnerTexts()).resolves.toEqual(uppercaseTitles);

  await elibrarySearchPage.search('Huong dan su dung');
  await expect(elibrarySearchPage.resultCount).toHaveText(/^[1-9]\d*$/);
});

test('TC_TKN_009 - Xử lý từ khóa chứa ký tự đặc biệt', async ({
  eofficeLoginPage,
  elibrarySearchPage
}) => {
  test.skip(!env.elibrary.username || !env.elibrary.password, 'Cần cấu hình tài khoản trong file .env');

  await eofficeLoginPage.open();
  await eofficeLoginPage.login(env.elibrary.username, env.elibrary.password);
  await eofficeLoginPage.openLibrary();

  await expect(elibrarySearchPage.searchInput).toBeVisible();
  await elibrarySearchPage.searchInput.fill('@#$%&*()');
  await expect(elibrarySearchPage.searchButton).toBeEnabled();
  await elibrarySearchPage.searchButton.click();
  await expect(elibrarySearchPage.searchForm).toHaveAttribute('aria-busy', 'false');
});

