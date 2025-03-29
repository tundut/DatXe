from . import db

class Xe(db.Model):
    __tablename__ = "Xe"
    bien_so = db.Column(db.String(10), primary_key=True)
    loai_xe = db.Column(db.String(50), nullable=False)
    hang_xe = db.Column(db.String(50), nullable=False)
    mau_xe = db.Column(db.String(30), nullable=False)

    tai_xe = db.relationship("TaiXe", back_populates="xe")