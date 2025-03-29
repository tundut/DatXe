from . import db, QuanTriVien

class UuDai(db.Model):
    __tablename__ = "UuDai"
    ma_uu_dai = db.Column(db.String(10), primary_key=True)
    ten_uu_dai = db.Column(db.String(50), nullable=False)
    gia_tri_uu_dai = db.Column(db.Integer, nullable=False)
    ngay_bat_dau = db.Column(db.Date, nullable=False)
    ngay_ket_thuc = db.Column(db.Date, nullable=False)
    dieu_kien_su_dung = db.Column(db.String(255), nullable=True)
    so_luong = db.Column(db.Integer, nullable=False)
    trang_thai_uu_dai = db.Column(db.Boolean, nullable=False)
    quan_tri_vien_id = db.Column(db.String(10), db.ForeignKey("QuanTriVien.ma_quan_tri_vien"), nullable=False)

    quan_tri_vien = db.relationship("QuanTriVien", back_populates="uu_dai")

    chuyen_xe = db.relationship("ChuyenXe", back_populates="uu_dai")