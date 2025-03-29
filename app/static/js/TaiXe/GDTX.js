let isOnline = false;
function toggleStatus() {
    isOnline = !isOnline;
    document.getElementById("statusBtn").textContent = isOnline ? "🟢 Đang Trực Tuyến" : "🔴 Đang Ngoại Tuyến";
}

function navigateToDestination() {
    let destinationLat = 10.7769;
    let destinationLng = 106.7009;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`, '_blank');
}

function editProfile() {
    alert("Chỉnh sửa thông tin cá nhân");
}

// Khởi tạo bản đồ với Leaflet.js
var map = L.map('map').setView([10.7769, 106.7009], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Thêm marker vào bản đồ
var marker = L.marker([10.7769, 106.7009]).addTo(map);
marker.bindPopup("Bạn đang ở đây").openPopup();

function chuyenTrang() {
    window.location.href = "/quan-ly-so-du"; // Thay bằng đường dẫn trang cần chuyển
}
    
// Định vị người dùng
function locateUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            map.setView([lat, lng], 14);
            marker.setLatLng([lat, lng]).bindPopup("Vị trí hiện tại của bạn").openPopup();
        }, function(error) {
            alert("Định vị thành công");
        });
    } else {
        alert("Trình duyệt không hỗ trợ định vị.");
    }
}
function GDNC() {
    window.location.href = "/nhan-chuyen"; // Thay bằng đường dẫn trang cần chuyển
}
function GDDNC() {
    window.location.href = "/hoan-tat"; // Thay bằng đường dẫn trang cần chuyển
}

function toggleActivity() {
    setTimeout(function() {
        // Gọi hàm GDNC() sau 2 giây
        GDNC();
    }, 2000);
}




function thaydoitrangthai() {
    document.getElementById("statusPopup").style.display = "flex";
}

// Function to close the popup
function dongpopup() {
    document.getElementById("statusPopup").style.display = "none";
}


