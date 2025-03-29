from . import db

class ChuyenXe(db.Model):
    __tablename__ = "ChuyenXe"
    ma_chuyen_xe = db.Column(db.String(10), primary_key=True)
    thoi_gian_bat_dau = db.Column(db.Date)
    thoi_gian_ket_thuc = db.Column(db.Date)
    diem_don = db.Column(db.String(100), nullable=False)
    diem_den = db.Column(db.String(100), nullable=False)
    quang_duong = db.Column(db.Float, nullable=False)
    cuoc_phi = db.Column(db.Float, nullable=False)
    trang_thai_chuyen_xe = db.Column(db.String(20), nullable=False)

    ma_tai_xe_cho = db.Column(db.String(10), db.ForeignKey("TaiXe.ma_tai_xe"), nullable=False)
    tai_xe = db.relationship("TaiXe", back_populates="chuyen_xe")

    ma_khach_hang_di = db.Column(db.String(10), db.ForeignKey("KhachHang.ma_khach_hang"), nullable=False)
    khach_hang = db.relationship("KhachHang", back_populates="chuyen_xe")

    ma_uu_dai = db.Column(db.String(10), db.ForeignKey("UuDai.ma_uu_dai"))
    uu_dai = db.relationship("UuDai", back_populates="chuyen_xe")

    danh_gia = db.relationship("DanhGia", back_populates="chuyen_xe")

    hoa_don = db.relationship("HoaDon", back_populates="chuyen_xe")