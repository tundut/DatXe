from enum import Enum

class TrangThaiChuyenXe(Enum):
    da_hoan_thanh = "Đã hoàn thành"
    dang_thuc_hien = "Đang thực hiện"

class TrangThaiTaiKhoan(Enum):
    dang_hoat_dong = "Đang hoạt động"
    dang_bi_khoa = "Đang bị khóa"
    chua_phe_duyet = "Chưa phê duyệt"

class LoaiNguoiDung(Enum):
    tai_xe = "Tài xế"
    khach_hang = "Khách hàng"