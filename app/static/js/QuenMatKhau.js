const Accounts = [
    { name: "A", username: "user1", password: "123", role: "Khách hàng", phoneNumber: "0123456789" },
    { name: "B", username: "user2", password: "123", role: "Khách hàng", phoneNumber: "0987654321" },
    { name: "C", username: "user3", password: "123", role: "Khách hàng", phoneNumber: "0345678912" }
];

function sendResetCode() {
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const message = document.getElementById("message");

    if (!phoneNumber) {
        message.textContent = "Vui lòng nhập số điện thoại!";
        message.style.color = "red";
        return;
    }

    // Kiểm tra định dạng số điện thoại (giả định định dạng VN: 10 số, bắt đầu bằng 0)
    const phoneRegex = /^(0[1-9][0-9]{8})$/;
    if (!phoneRegex.test(phoneNumber)) {
        message.textContent = "Số điện thoại không hợp lệ!";
        message.style.color = "red";
        return;
    }

    // Kiểm tra số điện thoại có tồn tại không
    const foundAccount = Accounts.find(acc => acc.phoneNumber === phoneNumber);
    if (!foundAccount) {
        message.textContent = "Số điện thoại không tồn tại trong hệ thống!";
        message.style.color = "red";
        return;
    }

    // Gửi mã xác nhận (mặc định là 123456)
    setTimeout(() => {
        message.textContent = "Mã xác nhận đã được gửi! (123456)";
        message.style.color = "green";

        // Ẩn nhập số điện thoại và nút gửi
        document.getElementById("phoneNumber").style.display = "none";
        document.getElementById("resetPassword").style.display = "none";

        // Hiển thị form nhập mã xác nhận
        document.getElementById("verifySection").style.display = "block";
    }, 1500);
}

function verifyCode() {
    const verifyCode = document.getElementById("verifyCode").value.trim();
    const verifyMessage = document.getElementById("verifyMessage");

    if (verifyCode === "123456") {
        verifyMessage.textContent = "Xác nhận thành công!";
        verifyMessage.style.color = "green";

        // Ẩn phần nhập mã xác nhận
        setTimeout(() => {
            document.getElementById("verifySection").style.display = "none";

            // Hiển thị form đặt lại mật khẩu
            document.getElementById("resetSection").style.display = "block";
        }, 1000);
    } else {
        verifyMessage.textContent = "Mã xác nhận không đúng!";
        verifyMessage.style.color = "red";
    }
}

function resetPassword() {
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const resetMessage = document.getElementById("resetMessage");

    if (newPassword === "" || confirmPassword === "") {
        resetMessage.textContent = "Vui lòng nhập mật khẩu mới!";
        resetMessage.style.color = "red";
        return;
    }

    if (newPassword !== confirmPassword) {
        resetMessage.textContent = "Mật khẩu không khớp!";
        resetMessage.style.color = "red";
        return;
    }

    resetMessage.textContent = "Mật khẩu đã được đặt lại thành công!";
    resetMessage.style.color = "green";

    // Ẩn toàn bộ form sau khi hoàn thành
    setTimeout(() => {
        document.querySelector(".container").style.display = "none";
        window.location.href = "login"; // Chuyển hướng về trang đăng nhập
    }, 1500);
}

function closeForgotPassword() {
    document.querySelector(".container").style.display = "none"; // Ẩn form khi bấm đóng
    setTimeout(() => {
        window.location.href = "dangnhap.html"; // Quay lại trang đăng nhập sau 1 giây
    }, 1000);
}
