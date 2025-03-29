let selectedAccountType = "";

// Chọn loại tài khoản (khách hàng hoặc tài xế)
function selectAccount(type) {
    selectedAccountType = type;

    // Ẩn màn hình chọn tài khoản, hiển thị form đăng ký
    document.getElementById("accountSelection").style.display = "none";
    document.getElementById("registerForm").style.display = "block";

    // Nếu là tài xế, hiển thị các trường bổ sung
    if (type === "driver") {
        document.getElementById("driverFields").style.display = "block";
    } else {
        document.getElementById("driverFields").style.display = "none";
    }
}

// Xử lý đăng ký
document.getElementById("submitRegister").addEventListener("click", function () {
    let name = document.getElementById("Name").value.trim();
    let phoneNumber = document.getElementById("PhoneNumber").value.trim();
    let address = document.getElementById("Address").value.trim();
    let gender = document.getElementById("Gender").value.trim();
    let birthdate = document.getElementById("Birthdate").value.trim();
    let username = document.getElementById("newUsername").value.trim();
    let password = document.getElementById("newPassword").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let carNumber = document.getElementById("carNumber") ? document.getElementById("carNumber").value.trim() : "";
    let carType = document.getElementById("carType") ? document.getElementById("carType").value.trim() : "";

    // Kiểm tra mật khẩu có khớp không
    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Nếu là tài xế, kiểm tra thông tin xe
    if (selectedAccountType === "driver") {
        if (!carNumber || !carType) {
            alert("Vui lòng nhập biển số xe và loại xe!");
            return;
        }
        submitForm()
        alert("Đã gửi Form cho quản trị viên - Chờ xét duyệt.");
    } else {
        submitForm()
        alert("Đăng ký thành công!");
        window.location.href = "/login";
    }
});

function submitForm(){
    let formData = new FormData();
    formData.append("Name", document.getElementById("Name").value);
    formData.append("PhoneNumber", document.getElementById("PhoneNumber").value);
    formData.append("Address", document.getElementById("Address").value);
    formData.append("Gender", document.getElementById("Gender").value);
    formData.append("Birthdate", document.getElementById("Birthdate").value);
    formData.append("newUsername", document.getElementById("newUsername").value);
    formData.append("newPassword", document.getElementById("newPassword").value);
    formData.append("carNumber", document.getElementById("carNumber")?.value || "");
    formData.append("carType", document.getElementById("carType")?.value || "");
    formData.append("carCompany", document.getElementById("carCompany")?.value || "");
    formData.append("carModel", document.getElementById("carModel")?.value || "");


    fetch("/register", {
        method: "POST",
        body: formData
    }).then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
}

// Hàm quay lại trang đăng nhập
function goBack() {
    window.location.href = "/login";
}
