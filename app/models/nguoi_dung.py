from . import db

class NguoiDung(db.Model):
    __tablename__ = "NguoiDung"
    ma_nguoi_dung = db.Column(db.String(10), primary_key=True)
    ho_ten = db.Column(db.String(100), nullable=False)
    so_dien_thoai = db.Column(db.String(10), unique=True, nullable=False)
    dia_chi = db.Column(db.String(255), nullable=True)
    gioi_tinh = db.Column(db.Boolean, nullable=False)
    ngay_sinh = db.Column(db.Date, nullable=False)
    loai_nguoi_dung = db.Column(db.String(20))
    __mapper_args__ = {"polymorphic_on": loai_nguoi_dung}

    tai_khoan = db.relationship("TaiKhoan", back_populates="nguoi_dung", uselist=False)

class KhachHang(NguoiDung):
    __tablename__ = "KhachHang"
    ma_khach_hang = db.Column(db.String(10), db.ForeignKey("NguoiDung.ma_nguoi_dung"), primary_key=True)
    __mapper_args__ = {"polymorphic_identity": "Khách hàng"}

    chuyen_xe = db.relationship("ChuyenXe", back_populates="khach_hang")

class TaiXe(NguoiDung):
    __tablename__ = "TaiXe"
    ma_tai_xe = db.Column(db.String(10), db.ForeignKey("NguoiDung.ma_nguoi_dung"), primary_key=True)
    danh_gia_trung_binh = db.Column(db.Float, nullable=False)
    so_du_vi = db.Column(db.Float, nullable=False)
    trang_thai_hoat_dong = db.Column(db.Boolean, nullable=False)
    __mapper_args__ = {"polymorphic_identity": "Tài xế"}

    chuyen_xe = db.relationship("ChuyenXe", back_populates="tai_xe")

    bien_so_xe = db.Column(db.String(10), db.ForeignKey("Xe.bien_so"), unique=True)
    xe = db.relationship("Xe", back_populates="tai_xe")