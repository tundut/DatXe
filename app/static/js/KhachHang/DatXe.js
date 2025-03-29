let map, routeControl;

function initMap() {
  map = L.map("map").setView([10.7769, 106.6951], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}

function getCoordinates(address, callback) {
  let url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;

  $.getJSON(url, function (data) {
    if (data.length > 0) {
      let lat = parseFloat(data[0].lat);
      let lon = parseFloat(data[0].lon);
      callback({ lat, lon });
    } else {
      alert("Không tìm thấy địa chỉ: " + address);
    }
  });
}

function calculateFare() {
    let distance = parseFloat(document.getElementById("distance").value) || 0;
    let vehicleType = document.getElementById("vehicleType").value;
    let discountElement = document.getElementById("discount");
    let discount = parseFloat(discountElement.getAttribute("data-discount")) || 0;

    console.log("Distance:", distance);
    console.log("Vehicle Type:", vehicleType);
    console.log("Discount:", discount);

    let farePerKm = {
        bike: 5000,
        car: 10000,
        premium: 20000
    };

    let totalFare = distance * (farePerKm[vehicleType] || 0);

    if (discount > 0) {
        if (discount < 1) {
            totalFare *= (1 - discount);
        } else {
            totalFare = Math.max(totalFare - discount, 0);
        }
    }

    let amountElement = document.getElementById("amount");
    if (amountElement) {
        amountElement.value = totalFare.toLocaleString("vi-VN") + " VND";
    } else {
        console.error("Không tìm thấy phần tử 'amount'");
    }
}

function calculateRoute() {
  let from = $("#locationFrom").val();
  let to = $("#locationTo").val();
  let vehicleType = $("#vehicleType").val();

  if (!from || !to || !vehicleType) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  getCoordinates(from, function (startCoords) {
    getCoordinates(to, function (endCoords) {
      if (routeControl) {
        map.removeControl(routeControl);
      }

      routeControl = L.Routing.control({
        waypoints: [
          L.latLng(startCoords.lat, startCoords.lon),
          L.latLng(endCoords.lat, endCoords.lon),
        ],
        routeWhileDragging: true,
        show: false, // Ẩn bảng chỉ đường
      }).addTo(map);

      routeControl.on("routesfound", function (e) {
        let route = e.routes[0];
        let distance = (route.summary.totalDistance / 1000).toFixed(2);
        let duration = Math.ceil(route.summary.totalTime / 60);
        
        $("#distance").val(distance + " km");
        $("#duration").val(duration + " phút");
        calculateFare();
      });
    });
  });
}

window.onload = initMap;

function showDiscountModal() {
    var modal = new bootstrap.Modal(document.getElementById("discountModal"));
    modal.show();
}

let selectedDiscount = { value: 0, text: "Không có" };

function selectDiscount(element, discountValue, discountText) {
    // Xóa trạng thái chọn của tất cả mục
    document.querySelectorAll(".list-group-item").forEach(item => {
        item.classList.remove("active");
    });

    // Đánh dấu mục đang chọn
    element.classList.add("active");

    // Cập nhật giá trị ưu đãi được chọn
    selectedDiscount.value = discountValue;
    selectedDiscount.text = discountText;
}

function applyDiscount() {
    let discountElement = document.getElementById("discount");
    discountElement.value = selectedDiscount.text;
    discountElement.setAttribute("data-discount", selectedDiscount.value); // Cập nhật data-discount
    
    // Đóng modal
    $('#discountModal').modal('hide'); 
}
