const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.join(__dirname, '..');

// Danh sách các file/thư mục cần dọn dẹp để chuẩn bị cho dự án mới
const TARGETS_TO_CLEAN = [
  // 1. Các file Output do AI sinh ra
  { path: 'production_artifacts', type: 'dir_contents' },
  { path: 'inputs/locator_packages', type: 'dir_contents' },
  { path: 'inputs/test_data_registry/modules', type: 'dir_contents' },
  { path: 'ai_debug', type: 'dir_contents' },
  
  // 2. Framework (Source Code Generator Output)
  { path: 'inputs/framework_inbox/source-automation-fw/playwright-typescript/tests/generated', type: 'dir_contents' },
  { path: 'inputs/framework_inbox/source-automation-fw/playwright-typescript/src/pages', type: 'subdirs_only' },
  { path: 'inputs/framework_inbox/source-automation-fw/playwright-typescript/src/locators', type: 'subdirs_only' },
  { 
    path: 'inputs/framework_inbox/source-automation-fw/playwright-typescript/src/fixtures', 
    type: 'files_match',
    match: (file) => file.endsWith('.fixture.ts') && file !== 'base.fixture.ts'
  },
  
  // 3. Playwright & Test Reports
  { path: 'inputs/framework_inbox/source-automation-fw/playwright-typescript/playwright-report', type: 'dir' },
  { path: 'inputs/framework_inbox/source-automation-fw/playwright-typescript/test-results', type: 'dir' },
  { path: 'inputs/framework_inbox/source-automation-fw/playwright-typescript/allure-results', type: 'dir' },
  { path: 'inputs/framework_inbox/source-automation-fw/playwright-typescript/allure-report', type: 'dir' },
  { path: 'inputs/framework_inbox/source-automation-fw/playwright-typescript/blob-report', type: 'dir' }
];

function deleteFolderRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

function clean() {
  console.log('🧹 Bắt đầu dọn dẹp workspace...\n');
  let hasError = false;

  TARGETS_TO_CLEAN.forEach(target => {
    const fullPath = path.join(WORKSPACE_ROOT, target.path);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`[Bỏ qua] Không tìm thấy: ${target.path}`);
      return;
    }

    try {
      if (target.type === 'dir') {
        deleteFolderRecursive(fullPath);
        console.log(`[Đã xóa] Thư mục: ${target.path}`);
      } 
      else if (target.type === 'dir_contents') {
        const files = fs.readdirSync(fullPath);
        for (const file of files) {
          const curPath = path.join(fullPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolderRecursive(curPath);
          } else {
            fs.unlinkSync(curPath);
          }
        }
        console.log(`[Đã dọn dẹp] Nội dung bên trong: ${target.path}`);
      }
      else if (target.type === 'subdirs_only') {
        const files = fs.readdirSync(fullPath);
        for (const file of files) {
          const curPath = path.join(fullPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolderRecursive(curPath);
          }
        }
        console.log(`[Đã dọn dẹp] Các thư mục con bên trong: ${target.path}`);
      }
      else if (target.type === 'files_match') {
        const files = fs.readdirSync(fullPath);
        let count = 0;
        for (const file of files) {
          if (target.match(file)) {
            fs.unlinkSync(path.join(fullPath, file));
            count++;
          }
        }
        console.log(`[Đã dọn dẹp] Đã xóa ${count} file trong: ${target.path}`);
      }
    } catch (error) {
      hasError = true;
      console.error(`[Lỗi] Không thể xử lý ${target.path}: ${error.message}`);
    }
  });

  if (hasError) {
    console.log('\n⚠️ Dọn dẹp hoàn tất nhưng có một số lỗi (xem log bên trên).');
  } else {
    console.log('\n✨ Dọn dẹp thành công! Workspace đã sẵn sàng cho dự án mới.');
  }
}

clean();
