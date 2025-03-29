from flask import Blueprint, render_template
from flask_login import current_user

ride = Blueprint('ride', __name__)

@ride.route('/quan-ly-so-du')
def quan_ly_so_du():
    return render_template("TaiXe/QLSD.html", logged_in=current_user.is_authenticated, loai_nguoi_dung="tai_xe")

@ride.route('/nhan-chuyen')
def nhan_chuyen():
    return render_template("TaiXe/GDNC.html")

@ride.route('/hoan-tat')
def hoan_tat():
    return render_template("TaiXe/GDDNC.html")
