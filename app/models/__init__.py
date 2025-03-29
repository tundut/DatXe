from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .tai_khoan import TaiKhoan
from .nguoi_dung import NguoiDung, KhachHang, TaiXe
from .quan_tri_vien import QuanTriVien
from .chuyen_xe import ChuyenXe
from .xe import Xe
from .danh_gia import DanhGia
from .uu_dai import UuDai
from .hoa_don import HoaDon
