from flask import Blueprint, render_template
from flask_login import current_user

feedback = Blueprint('feedback', __name__)

@feedback.route('/danh-gia')
def danh_gia():
    return render_template("./KhachHang/DanhGia.html", logged_in=current_user.is_authenticated)