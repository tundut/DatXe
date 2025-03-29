from app.models import TaiKhoan, db, NguoiDung, KhachHang, Xe

from flask import Blueprint, request, flash, redirect, url_for, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        ho_ten = request.form.get("Name")
        so_dien_thoai = request.form.get("PhoneNumber")
        dia_chi = request.form.get("Address")
        gioi_tinh = request.form.get("Gender") == "Nam"
        ngay_sinh = datetime.strptime(request.form.get("Birthdate"), "%Y-%m-%d")
        ten_tai_khoan = request.form.get("newUsername")
        mat_khau = request.form.get("newPassword")
        bien_so = request.form.get("carNumber")
        loai_xe = request.form.get("carType")
        hang_xe = request.form.get("carCompany")
        mau_xe = request.form.get("carModel")
        loai_nguoi_dung = "Khách hàng"
        trang_thai = "Đang hoạt động"

        existing_user = TaiKhoan.query.filter_by(ten_tai_khoan=ten_tai_khoan).first()
        if existing_user:
            flash("Email đã được sử dụng!", "error")
            return redirect(url_for("auth.register"))

        if bien_so != "":
            loai_nguoi_dung = "Tài xế"
            trang_thai = "Chưa phê duyệt"
            new_xe = Xe(
                bien_so=bien_so,
                loai_xe=loai_xe,
                hang_xe=hang_xe,
                mau_xe=mau_xe
            )
            db.session.add(new_xe)

        hash_and_salted_password = generate_password_hash(
            mat_khau,
            method='pbkdf2:sha256',
            salt_length=8
        )
        ma_nguoi_dung = f"ND{db.session.query(NguoiDung).count() + 1}"
        ma_tai_khoan = f"TK{db.session.query(TaiKhoan).count() + 1}"

        new_khach_hang = KhachHang(
            ma_nguoi_dung=ma_nguoi_dung,
            ma_khach_hang=ma_nguoi_dung,
            ho_ten=ho_ten,
            so_dien_thoai=so_dien_thoai,
            dia_chi=dia_chi,
            gioi_tinh=gioi_tinh,
            ngay_sinh=ngay_sinh,
            loai_nguoi_dung=loai_nguoi_dung
        )

        new_tai_khoan = TaiKhoan(
            ma_tai_khoan=ma_tai_khoan,
            ten_tai_khoan=ten_tai_khoan,
            mat_khau=hash_and_salted_password,
            trang_thai_tai_khoan=trang_thai,
            nguoi_dung_id=ma_nguoi_dung
        )

        db.session.add(new_tai_khoan)
        db.session.add(new_khach_hang)

        db.session.commit()
        flash("Đăng ký thành công, vui lòng đăng nhập!")
        return redirect(url_for("auth.login"))

    return render_template("DangKy.html")



@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        ten_tai_khoan = request.form.get('username')
        mat_khau = request.form.get('password')

        result = db.session.execute(db.Select(TaiKhoan).where(TaiKhoan.ten_tai_khoan == ten_tai_khoan))
        user = result.scalar_one_or_none()
        if not user:
            flash("Email không tồn tại", "error")
            return redirect(url_for('auth.login'))
        elif not check_password_hash(user.mat_khau, mat_khau):
            flash('Sai mật khẩu, vui lòng thử lại', "error")
            return redirect(url_for('auth.login'))
        else:
            login_user(user)
            if getattr(current_user, "nguoi_dung_id", None):
                return redirect(url_for('home.index'))
            elif getattr(current_user, "quan_tri_vien_id", None):
                return redirect(url_for('manage.manage_user'))

    return render_template("DangNhap.html")

@auth.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    return render_template("QuenMatKhau.html")

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home.index'))