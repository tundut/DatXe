const Accounts = [
    {
        username: "tuanduc",
        role: "Khách Hàng",
        trangThai: "Đang hoạt động",
        name: "Nguyễn Phan Tuấn Đức",
        sdt: "0123456789",
        diaChi: "123 Đường ABC",
        gioiTinh: "Nam",
        ngaySinh: "2005-10-14"
    },
];

function getRandomAccount() {
    return Accounts[Math.floor(Math.random() * Accounts.length)];
}

function loadAccountInfo() {
    const account = getRandomAccount();
    
    document.getElementById("username").value = account.username;
    document.getElementById("accountType").value = account.role;
    document.getElementById("status").value = account.trangThai;
    document.getElementById("fullName").value = account.name || '';

    toggleFields();

    if (account.role === "KhachHang") {
        document.getElementById("customerPhone").value = account.sdt || '';
        document.getElementById("customerAddress").value = account.diaChi || '';
        document.getElementById("customerGender").value = account.gioiTinh || 'Nam';
        document.getElementById("customerDob").value = account.ngaySinh || '';
    } else if (account.role === "TaiXe") {
        document.getElementById("driverPhone").value = account.sdt || '';
        document.getElementById("driverAddress").value = account.diaChi || '';
        document.getElementById("driverGender").value = account.gioiTinh || 'Nam';
        document.getElementById("driverDob").value = account.ngaySinh || '';
        document.getElementById("driverRating").value = account.danhGiaTrungBinh || 0;
    }
}
function disableAllFields() {
    document.querySelectorAll("input, select").forEach(field => {
        field.disabled = true;
    });
}
document.getElementById("editAccountBtn").addEventListener("click", () => {
    enableAllFields(); // Mở khóa các trường nhập
});
function enableAllFields() {
    document.querySelectorAll("input, select").forEach(field => {
        field.disabled = false;
    });

    // Khóa lại accountType để tránh thay đổi vai trò
    document.getElementById("accountType").disabled = true;
    document.getElementById("status").disabled = true; // Khóa trạng thái
}


document.addEventListener("DOMContentLoaded", () => {
    loadAccountInfo();
    toggleFields();
    disableAllFields(); // Gọi hàm để vô hiệu hóa các ô nhập
});


function toggleFields() {
    const role = document.getElementById("accountType").value;
    document.getElementById("customerFields").style.display = (role === "KhachHang") ? "block" : "none";
    document.getElementById("driverFields").style.display = (role === "TaiXe") ? "block" : "none";
}

function updateAccount() {
    const username = document.getElementById("username").value;
    const account = Accounts.find(acc => acc.username === username);

    if (account) {
        account.trangThai = document.getElementById("status").value;
        account.name = document.getElementById("fullName").value;

        if (account.role === "KhachHang") {
            account.sdt = document.getElementById("customerPhone").value;
            account.diaChi = document.getElementById("customerAddress").value;
            account.gioiTinh = document.getElementById("customerGender").value;
            account.ngaySinh = document.getElementById("customerDob").value;
        } else if (account.role === "TaiXe") {
            account.sdt = document.getElementById("driverPhone").value;
            account.diaChi = document.getElementById("driverAddress").value;
            account.gioiTinh = document.getElementById("driverGender").value;
            account.ngaySinh = document.getElementById("driverDob").value;
            account.danhGiaTrungBinh = parseFloat(document.getElementById("driverRating").value);
        }
        alert("Cập nhật thành công!");
    }
}

function deleteAccount() {
    // Hiển thị form xác nhận xóa
    document.getElementById("deleteConfirmForm").style.display = "flex";
}

function closeDeleteForm() {
    // Đóng form xác nhận
    document.getElementById("deleteConfirmForm").style.display = "none";
}

function confirmDeleteAccount() {
    // Thực hiện xóa tài khoản (ở đây có thể gọi API nếu cần)
    closeDeleteForm(); // Đóng form trước khi chuyển hướng

    // Chuyển hướng về trang chủ sau khi xóa thành công
    window.location.href = "DangNhap.html"; 
}



document.addEventListener("DOMContentLoaded", () => {
    loadAccountInfo();
    toggleFields();
});
