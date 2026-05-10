<#
.SYNOPSIS
    Script dọn dẹp các thư mục output của Workspace 2 (Spec to Gen TC Manual).
.DESCRIPTION
    Script này sẽ xóa sạch toàn bộ dữ liệu (files & folders) được sinh ra 
    trong thư mục production_artifacts và sau đó khởi tạo lại cấu trúc 
    thư mục trống ban đầu để sẵn sàng cho dự án mới.
#>

$script_dir = $PSScriptRoot
$workspace_dir = Split-Path $script_dir -Parent
$prod_artifacts = Join-Path $workspace_dir "production_artifacts"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Bắt đầu dọn dẹp Workspace: Spec to TC Manual" -ForegroundColor Yellow
Write-Host "Thư mục mục tiêu: $prod_artifacts" -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Cyan

if (Test-Path $prod_artifacts) {
    Write-Host "Đang xóa dữ liệu cũ trong production_artifacts..."
    Remove-Item -Path $prod_artifacts -Recurse -Force
}

# Danh sách các thư mục cần khởi tạo lại
$folders_to_recreate = @(
    "analysis",
    "coverage",
    "final_testcase_pack",
    "review",
    "testcases/UT",
    "testcases/IT",
    "testcases/USERCASE",
    "automation_input",
    "modules"
)

Write-Host "Đang tái tạo cấu trúc thư mục rỗng..."
foreach ($folder in $folders_to_recreate) {
    $full_path = Join-Path $prod_artifacts $folder
    New-Item -ItemType Directory -Force -Path $full_path | Out-Null
    Write-Host "  + Đã tạo: $folder" -ForegroundColor Green
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Hoàn tất dọn dẹp! Workspace đã sẵn sàng cho dự án mới." -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Pause
