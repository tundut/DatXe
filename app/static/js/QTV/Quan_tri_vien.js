function initializePage() {
    showSection('userManagement');
    renderOfferTable();
    renderUnapprovedDrivers()
}

function showSection(sectionId) {
    document.getElementById('userManagement').style.display = 'none';
    document.getElementById('offerManagement').style.display = 'none';
    document.getElementById('unapprovedDrivers').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

function toggleLock(ma_tai_khoan, button) {
    fetch(`/qtv/toggle-lock/${ma_tai_khoan}`, {
        method: "POST",
    })
    .then(() => location.reload())
}

function searchUser() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#userTable tr");

    rows.forEach(row => {
        let id = row.cells[0].textContent.toLowerCase();
        let name = row.cells[1].textContent.toLowerCase();
        let type = row.cells[2].textContent.toLowerCase();

        if (id.includes(input) || name.includes(input) || type.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function viewUser(ma_nguoi_dung) {
    let user = users.find(u => u.ma_nguoi_dung === ma_nguoi_dung);
    if (user) {
        document.getElementById("userName").innerText = user.ho_ten;
        document.getElementById("userPhone").innerText = user.so_dien_thoai || "Chưa có dữ liệu";
        document.getElementById("userAddress").innerText = user.dia_chi || "Chưa có dữ liệu";
        document.getElementById("userGender").innerText = user.gioi_tinh || "Chưa có dữ liệu";
        document.getElementById("userDOB").innerText = user.ngay_sinh || "Chưa có dữ liệu";
        document.getElementById("userType").innerText = user.loai_nguoi_dung;
        
        var userModal = new bootstrap.Modal(document.getElementById("userDetailModal"));
        userModal.show();
    }
}


// Danh sách tài xế chưa phê duyệt (lưu toàn cục)
let newusers = [
    { id: '1', name: "Nguyễn Văn An", type: "Tài xế", status: "Chưa phê duyệt" },
    { id: '2', name: "Lê Minh Hoàng", type: "Tài xế", status: "Chưa phê duyệt" },
    { id: '3', name: "Trần Quang Huy", type: "Tài xế", status: "Chưa phê duyệt" },
    { id: '4', name: "Vũ Đức Thắng", type: "Tài xế", status: "Chưa phê duyệt" },
    { id: '5', name: "Hoàng Thế Bảo", type: "Tài xế", status: "Chưa phê duyệt" }
];

users.push(...newusers);

// Render danh sách tài xế chưa phê duyệt
function renderUnapprovedDrivers() {
    let tableBody = document.getElementById("unapprovedDriverTable");
    tableBody.innerHTML = "";

    users.filter(user => user.status === "Chưa phê duyệt").forEach(user => {
        let row = `<tr onclick="showApprovalModal('${user.id}')">
            <td>${user.id}</td>
            <td>${user.name}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Hiển thị modal phê duyệt tài khoản
function showApprovalModal(userId) {
    let user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById("approveDriverName").innerText = user.name;
        document.getElementById("approveDriverId").value = user.id;

        // Hiển thị modal
        let approveModal = new bootstrap.Modal(document.getElementById("approveDriverModal"));
        approveModal.show();
    }
}

// Phê duyệt tài khoản tài xế
function approveDriver() {
    let userId = document.getElementById("approveDriverId").value;
    let user = users.find(u => u.id === userId);

    if (user) {
        user.status = "Đang hoạt động"; // Cập nhật trạng thái
        renderUnapprovedDrivers(); // Render lại danh sách

        // Ẩn modal sau khi cập nhật
        let approveModal = bootstrap.Modal.getInstance(document.getElementById("approveDriverModal"));
        if (approveModal) {
            approveModal.hide();
        }
    }
}

// Gọi render danh sách tài xế khi trang tải xong
document.addEventListener("DOMContentLoaded", renderUnapprovedDrivers);

let offers = [
{ id: 1, code: "OFF50", name: "New member", value: 50000, startDate: "2025-03-12", endDate: "2025-04-03", condition: "Đăng ký người dùng mới", quantity: 1000, status: "unactive" },
{ id: 2, code: "OFF20", name: "Ưu đãi học sinh, sinh viên", value: 20000, startDate: "2025-02-16", endDate: "2025-04-26", condition: "Là học sinh hoặc sinh viên", quantity: 500, status: "active" },
{ id: 3, code: "OFF30", name: "Ưu đãi mùa hè", value: 30000, startDate: "2025-06-01", endDate: "2025-06-30", condition: "Áp dụng cho mùa hè", quantity: 300, status: "unactive" },
{ id: 4, code: "OFF10", name: "Giảm giá đầu tuần", value: 10000, startDate: "2025-04-01", endDate: "2025-04-30", condition: "Đặt xe vào thứ 2, thứ 3", quantity: 200, status: "active" },
{ id: 5, code: "OFF15", name: "Ưu đãi khách hàng thân thiết", value: 15000, startDate: "2025-05-01", endDate: "2025-07-01", condition: "Dành cho khách hàng VIP", quantity: 400, status: "unactive" },
{ id: 6, code: "OFF25", name: "Giảm giá cuối tuần", value: 25000, startDate: "2025-03-15", endDate: "2025-04-20", condition: "Đặt xe vào thứ 7 & Chủ nhật", quantity: 500, status: "active" },
{ id: 7, code: "OFF40", name: "Khuyến mãi Back to School", value: 40000, startDate: "2025-08-15", endDate: "2025-09-30", condition: "Dành cho học sinh, sinh viên quay lại trường", quantity: 600, status: "active" }
];

// Tạo mã ưu đãi ngẫu nhiên
function generateOfferCode() {
    // Tạo mã ưu đãi ngẫu nhiên
    const code = "OFF" + Math.floor(1000 + Math.random() * 9000); // Ví dụ: OFF1234
    // Kiểm tra xem modal nào đang mở để cập nhật trường mã tương ứng
    if (document.getElementById("createOfferModal").classList.contains("show")) {
        document.getElementById("createOfferCode").value = code; // Đặt mã vào trường mã ưu đãi trong modal tạo
    } else if (document.getElementById("editOfferModal").classList.contains("show")) {
        document.getElementById("editOfferCode").value = code; // Đặt mã vào trường mã ưu đãi trong modal sửa
    }
}

let isEditing = false; // Biến để xác định chế độ (tạo hay sửa)

function showCreateOfferModal() {
    document.getElementById("createOfferForm").reset(); // Đặt lại form
    var createOfferModal = new bootstrap.Modal(document.getElementById("createOfferModal"));
    createOfferModal.show(); // Hiển thị modal
}

function showEditOfferModal(offerId) {
    let offer = offers.find(o => o.id === offerId);
    if (offer) {
        document.getElementById("editOfferId").value = offer.id;
        document.getElementById("editOfferCode").value = offer.code;
        document.getElementById("editOfferName").value = offer.name;
        document.getElementById("editOfferValue").value = offer.value;
        document.getElementById("editOfferStartDate").value = offer.startDate;
        document.getElementById("editOfferEndDate").value = offer.endDate;
        document.getElementById("editOfferCondition").value = offer.condition;
        document.getElementById("editOfferQuantity").value = offer.quantity;

        var editOfferModal = new bootstrap.Modal(document.getElementById("editOfferModal"));
        editOfferModal.show(); // Hiển thị modal
    }
}

// Kích hoạt ưu đãi
function activateOffer() {
    let offerId = document.getElementById("editOfferId").value;
    if (offerId) {
        let offer = offers.find(o => o.id === parseInt(offerId));
        if (offer) {
            offer.status = "active"; // Cập nhật trạng thái thành "Kích hoạt"
        }
    }
}

// Vô hiệu hóa ưu đãi
function deactivateOffer() {
    let offerId = document.getElementById("editOfferId").value;
    if (offerId) {
        let offer = offers.find(o => o.id === parseInt(offerId));
        if (offer) {
            offer.status = "inactive"; // Cập nhật trạng thái thành "Vô hiệu hóa"
        }
    }
}

function saveCreateOffer() {
    let offerData = {
        id: offers.length + 1,
        code: document.getElementById("createOfferCode").value,
        name: document.getElementById("createOfferName").value,
        value: document.getElementById("createOfferValue").value,
        startDate: document.getElementById("createOfferStartDate").value,
        endDate: document.getElementById("createOfferEndDate").value,
        condition: document.getElementById("createOfferCondition").value,
        quantity: document.getElementById("createOfferQuantity").value,
        status: document.getElementById("createOfferStatus").value,
    };

    offers.push(offerData); // Thêm ưu đãi mới vào danh sách
    renderOfferTable(); // Cập nhật bảng
    var createOfferModal = bootstrap.Modal.getInstance(document.getElementById("createOfferModal"));
    createOfferModal.hide(); // Ẩn modal
}

function saveEditOffer() {
    let offerId = document.getElementById("editOfferId").value;
    let offerData = {
        id: parseInt(offerId),
        code: document.getElementById("editOfferCode").value,
        name: document.getElementById("editOfferName").value,
        value: document.getElementById("editOfferValue").value,
        startDate: document.getElementById("editOfferStartDate").value,
        endDate: document.getElementById("editOfferEndDate").value,
        condition: document.getElementById("editOfferCondition").value,
        quantity: document.getElementById("editOfferQuantity").value,
        status: offers.find(o => o.id === parseInt(offerId)).status, // Giữ nguyên trạng thái
    };

    let index = offers.findIndex(o => o.id === parseInt(offerId));
    offers[index] = offerData; // Cập nhật ưu đãi
    renderOfferTable(); // Cập nhật bảng
    var editOfferModal = bootstrap.Modal.getInstance(document.getElementById("editOfferModal"));
    editOfferModal.hide(); // Ẩn modal
}

function renderOfferTable() {
    let tableBody = document.getElementById("offerTable");
    tableBody.innerHTML = ""; // Xóa nội dung cũ
    offers.forEach(offer => {
        let row = `<tr>
            <td>${offer.id}</td>
            <td>${offer.code}</td>
            <td>${offer.name}</td>
            <td>${offer.value}</td>
            <td>${offer.startDate}</td>
            <td>${offer.endDate}</td>
            <td>${offer.condition}</td>
            <td>${offer.quantity}</td>
            <td>${offer.status === "active" ? "Kích hoạt" : "Vô hiệu hóa"}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="showEditOfferModal(${offer.id})">Cập nhật</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row; // Thêm hàng vào bảng
    });
}


document.addEventListener("DOMContentLoaded", initializePage);