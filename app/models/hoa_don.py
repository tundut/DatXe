from . import db

class HoaDon(db.Model):
    __tablename__ = "HoaDon"
    ma_hoa_don = db.Column(db.String(10), primary_key=True)
    phuong_thuc_thanh_toan = db.Column(db.String(100), nullable=False)
    tong_tien = db.Column(db.Float, nullable=False)
    ma_chuyen_xe = db.Column(db.String(10), db.ForeignKey("ChuyenXe.ma_chuyen_xe"))

    chuyen_xe = db.relationship("ChuyenXe", back_populates="hoa_don")