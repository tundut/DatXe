// Dữ liệu mẫu cho các chuyến xe
let ratedTrips = [
  { driverName: "Nguyễn Văn A", stars: 5, comment: "Tài xế rất thân thiện" },
  { driverName: "Trần Thị B", stars: 3, comment: "Tài xế cần cải thiện" }
];

let unratedTrips = [
  { driverName: "Phạm Văn D", stars: 0, comment: "Chưa có đánh giá" },
  { driverName: "Nguyễn Thị E", stars: 0, comment: "Chưa có đánh giá" }
];

// Hàm hiển thị danh sách đã đánh giá
function showRatedTrips() {
  const reviewSection = document.getElementById("reviewSection");
  reviewSection.innerHTML = ""; // Xóa nội dung hiện tại

  ratedTrips.forEach(trip => {
      const starsHTML = generateStars(trip.stars, false);
      reviewSection.innerHTML += `
          <div class="review-item">
              <h3>${trip.driverName}</h3>
              <div class="stars">${starsHTML}</div>
              <div class="placeholder">${trip.comment}</div>
          </div>
      `;
  });

  // Cập nhật trạng thái nút
  document.querySelectorAll(".list-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector("button[onclick='showRatedTrips()']").classList.add("active");
}

// Hàm hiển thị danh sách chưa đánh giá
function showUnratedTrips() {
  const reviewSection = document.getElementById("reviewSection");
  reviewSection.innerHTML = ""; // Xóa nội dung hiện tại

  unratedTrips.forEach((trip, index) => {
      const starsHTML = generateStars(trip.stars, true);
      reviewSection.innerHTML += `
          <div class="review-item">
              <h3>${trip.driverName}</h3>
              <div class="stars" id="stars-${index}">${starsHTML}</div>
              <textarea class="comment-input" id="comment-${index}" placeholder="Nhập nhận xét của bạn"></textarea>
              <button class="submit-btn" onclick="submitRating(${index})">Gửi đánh giá</button>
          </div>
      `;
  });

  // Thêm sự kiện cho các sao
  unratedTrips.forEach((_, index) => {
      const stars = document.querySelectorAll(`#stars-${index} span`);
      stars.forEach((star, starIndex) => {
          star.addEventListener("click", () => {
              unratedTrips[index].stars = starIndex + 1;
              updateStars(index);
          });
      });
  });

  // Cập nhật trạng thái nút
  document.querySelectorAll(".list-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelector("button[onclick='showUnratedTrips()']").classList.add("active");
}

// Hàm tạo HTML cho số sao
function generateStars(count, interactive) {
  let starsHTML = "";
  for (let i = 1; i <= 5; i++) {
      starsHTML += i <= count ? `<span${interactive ? ` class="interactive"` : ""}>★</span>` : `<span${interactive ? ` class="interactive"` : ""}>☆</span>`;
  }
  return starsHTML;
}

// Hàm cập nhật hiển thị sao sau khi người dùng chọn
function updateStars(index) {
  const starsContainer = document.getElementById(`stars-${index}`);
  starsContainer.innerHTML = generateStars(unratedTrips[index].stars, true);

  // Thêm lại sự kiện cho các sao mới
  const stars = starsContainer.querySelectorAll("span");
  stars.forEach((star, starIndex) => {
      star.addEventListener("click", () => {
          unratedTrips[index].stars = starIndex + 1;
          updateStars(index);
      });
  });
}

// Hàm gửi đánh giá
function submitRating(index) {
  const comment = document.getElementById(`comment-${index}`).value.trim();
  if (unratedTrips[index].stars === 0) {
      alert("Vui lòng chọn số sao để đánh giá!");
      return;
  }
  if (!comment) {
      alert("Vui lòng nhập nhận xét!");
      return;
  }

  // Chuyển chuyến xe từ danh sách chưa đánh giá sang đã đánh giá
  const trip = unratedTrips[index];
  trip.comment = comment;
  ratedTrips.push(trip);
  unratedTrips.splice(index, 1);

  // Cập nhật lại giao diện
  showUnratedTrips();
  alert("Đánh giá đã được gửi thành công!");
}

// Hiển thị danh sách đã đánh giá khi tải trang
window.onload = showRatedTrips;