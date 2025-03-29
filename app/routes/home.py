from flask import Blueprint, render_template, flash, redirect, url_for
from flask_login import current_user

from app.models import TaiKhoan, db, NguoiDung

home = Blueprint('home', __name__)

@home.route('/')
def index():
    if current_user.is_authenticated:
        result = db.session.execute(
            db.select(NguoiDung, TaiKhoan)
            .join(TaiKhoan, NguoiDung.ma_nguoi_dung == TaiKhoan.nguoi_dung_id)
            .where(TaiKhoan.ma_tai_khoan == current_user.ma_tai_khoan)
        ).first()
        if result:
            nguoi_dung, tai_khoan = result

            if nguoi_dung.loai_nguoi_dung == "Tài xế":
                return render_template("./TaiXe/GDTX.html", logged_in=current_user.is_authenticated, loai_nguoi_dung="tai_xe")
            elif nguoi_dung.loai_nguoi_dung == "Khách hàng":
                return render_template("TrangChu.html", logged_in=current_user.is_authenticated, loai_nguoi_dung="khach_hang")
    else:
        return render_template("TrangChu.html", logged_in=current_user.is_authenticated)

