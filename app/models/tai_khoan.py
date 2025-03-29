from . import db
from flask_login import UserMixin

class TaiKhoan(db.Model, UserMixin):
    __tablename__ = "TaiKhoan"
    ma_tai_khoan = db.Column(db.String(10), primary_key=True)
    ten_tai_khoan = db.Column(db.String(50), unique=True, nullable=False)
    mat_khau = db.Column(db.String(255), nullable=False)
    trang_thai_tai_khoan = db.Column(db.String(20), nullable=False)

    nguoi_dung_id = db.Column(db.String(10), db.ForeignKey("NguoiDung.ma_nguoi_dung"), unique=True, nullable=True)
    nguoi_dung = db.relationship("NguoiDung", back_populates="tai_khoan")

    quan_tri_vien_id = db.Column(db.String(10), db.ForeignKey("QuanTriVien.ma_quan_tri_vien"), unique=True, nullable=True)
    quan_tri_vien = db.relationship("QuanTriVien", back_populates="tai_khoan")

    def get_id(self):
        return self.ma_tai_khoan