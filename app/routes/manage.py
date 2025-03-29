from werkzeug.utils import redirect

from app.models import db, TaiKhoan, NguoiDung

from flask import Blueprint, render_template, url_for, redirect
from flask_login import current_user

manage = Blueprint("manage", __name__)

@manage.route("/qtv")
def manage_user():
    if getattr(current_user, "quan_tri_vien_id", None):
        result = db.session.execute(db.select(NguoiDung, TaiKhoan).join(TaiKhoan, NguoiDung.ma_nguoi_dung == TaiKhoan.nguoi_dung_id))
        users = result.all()

        users_list = [
            {
                "ma_nguoi_dung": nguoi_dung.ma_nguoi_dung,
                "ho_ten": nguoi_dung.ho_ten,
                "so_dien_thoai": nguoi_dung.so_dien_thoai,
                "dia_chi": nguoi_dung.dia_chi,
                "gioi_tinh": "Nam" if nguoi_dung.gioi_tinh else "Nữ",
                "ngay_sinh": nguoi_dung.ngay_sinh.strftime("%d/%m/%Y"),
                "loai_nguoi_dung": nguoi_dung.loai_nguoi_dung,
                "trang_thai_tai_khoan": tai_khoan.trang_thai_tai_khoan,
                "ma_tai_khoan": tai_khoan.ma_tai_khoan
            }
            for nguoi_dung, tai_khoan in users
        ]

        return render_template("./QTV/QuanLy.html", users=users_list, loai_nguoi_dung="quan_tri_vien", logged_in=current_user.is_authenticated)

@manage.route("/qtv/toggle-lock/<string:ma_tai_khoan>", methods=['GET', 'POST'])
def toggle_lock(ma_tai_khoan):
    if getattr(current_user, "quan_tri_vien_id", None):
        tai_khoan = db.session.execute(db.select(TaiKhoan).filter_by(ma_tai_khoan=ma_tai_khoan)).scalar_one_or_none()

        if tai_khoan:
            if tai_khoan.trang_thai_tai_khoan == "Đang hoạt động":
                tai_khoan.trang_thai_tai_khoan = "Đang bị khóa"
            elif tai_khoan.trang_thai_tai_khoan == "Đang bị khóa":
                tai_khoan.trang_thai_tai_khoan = "Đang hoạt động"
            db.session.commit()

    return redirect(url_for('manage.manage_user'))

@manage.route("/quan-ly-thong-tin", methods=['GET', 'POST'])
def quan_ly_thong_tin():
    result = db.session.execute(
        db.select(NguoiDung, TaiKhoan)
        .join(TaiKhoan, NguoiDung.ma_nguoi_dung == TaiKhoan.nguoi_dung_id)
        .where(TaiKhoan.ma_tai_khoan == current_user.ma_tai_khoan)
    ).first()

    nguoi_dung, tai_khoan = result

    account = {
            "ho_ten": nguoi_dung.ho_ten,
            "so_dien_thoai": nguoi_dung.so_dien_thoai,
            "dia_chi": nguoi_dung.dia_chi,
            "gioi_tinh": "Nam" if nguoi_dung.gioi_tinh else "Nữ",
            "ngay_sinh": nguoi_dung.ngay_sinh.strftime("%d/%m/%Y"),
            "loai_nguoi_dung": nguoi_dung.loai_nguoi_dung,
        }

    return render_template('./KhachHang/QuanLyTTCN.html', logged_in=current_user.is_authenticated, account=account)