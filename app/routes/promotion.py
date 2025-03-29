from flask import Blueprint, render_template
from flask_login import current_user

promotion = Blueprint('promotion', __name__)

@promotion.route('/uu-dai')
def uu_dai():
    return render_template("./KhachHang/UuDai.html", logged_in=current_user.is_authenticated)