from . import db

class QuanTriVien(db.Model):
    __tablename__ = "QuanTriVien"
    ma_quan_tri_vien = db.Column(db.String(10), primary_key=True)
    ho_ten = db.Column(db.String(100), nullable=False)
    gioitinh = db.Column(db.Boolean, nullable=False)
    ngaysinh = db.Column(db.Date, nullable=False)

    tai_khoan = db.relationship("TaiKhoan", back_populates="quan_tri_vien")

    uu_dai = db.relationship("UuDai", back_populates="quan_tri_vien")

