from . import db

class DanhGia(db.Model):
    __tablename__ = "DanhGia"
    ma_danh_gia = db.Column(db.String(10), primary_key=True)
    so_sao_danh_gia = db.Column(db.Float, nullable=False)
    noi_dung_binh_luan = db.Column(db.String(100))
    ma_chuyen_xe = db.Column(db.String(10), db.ForeignKey("ChuyenXe.ma_chuyen_xe"))

    chuyen_xe = db.relationship("ChuyenXe", back_populates="danh_gia")