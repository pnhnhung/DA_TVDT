#!/usr/bin/env bash

# Lấy đường dẫn thư mục chứa script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"
PROD_ARTIFACTS="$WORKSPACE_DIR/production_artifacts"

echo -e "\033[1;36m=============================================\033[0m"
echo -e "\033[1;33mBắt đầu dọn dẹp Workspace: Spec to TC Manual\033[0m"
echo -e "\033[1;33mThư mục mục tiêu: $PROD_ARTIFACTS\033[0m"
echo -e "\033[1;36m=============================================\033[0m"

if [ -d "$PROD_ARTIFACTS" ]; then
    echo "Đang xóa dữ liệu cũ trong production_artifacts..."
    rm -rf "$PROD_ARTIFACTS"
fi

# Danh sách các thư mục cần khởi tạo lại
FOLDERS_TO_RECREATE=(
    "analysis"
    "coverage"
    "final_testcase_pack"
    "review"
    "testcases/UT"
    "testcases/IT"
    "testcases/USERCASE"
    "automation_input"
    "modules"
)

echo "Đang tái tạo cấu trúc thư mục rỗng..."
for folder in "${FOLDERS_TO_RECREATE[@]}"; do
    FULL_PATH="$PROD_ARTIFACTS/$folder"
    mkdir -p "$FULL_PATH"
    echo -e "  \033[1;32m+ Đã tạo: $folder\033[0m"
done

echo -e "\033[1;36m=============================================\033[0m"
echo -e "\033[1;32mHoàn tất dọn dẹp! Workspace đã sẵn sàng cho dự án mới.\033[0m"
echo -e "\033[1;36m=============================================\033[0m"
