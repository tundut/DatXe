from flask import Blueprint, render_template
from flask_login import current_user

book = Blueprint('book', __name__)

@book.route('/dat-xe')
def dat_xe():
    return render_template("./KhachHang/DatXe.html", logged_in=current_user.is_authenticated)