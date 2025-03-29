let prevScrollPos = window.pageYOffset;
      window.onscroll = function() {
          let currentScrollPos = window.pageYOffset;
          if (prevScrollPos > currentScrollPos) {
              document.getElementById("navbar").style.top = "0";
          } else {
              document.getElementById("navbar").style.top = "-100px";
          }
          prevScrollPos = currentScrollPos;
      }



document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const userMenu = document.createElement("div"); // Tạo menu nhỏ
    userMenu.id = "userMenu";
    userMenu.style.display = "none"; // Ẩn ban đầu
    userMenu.style.position = "absolute";
    userMenu.style.background = "#fff";
    userMenu.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
    userMenu.style.borderRadius = "5px";
    userMenu.style.padding = "10px";
    userMenu.style.zIndex = "1000";

    // Tạo các tùy chọn trong menu
    userMenu.innerHTML = `
        <a href="#" id="manageProfile" style="display:block; padding:5px; text-decoration:none; color:#333;" onclick="window.location.href='/quan-ly-thong-tin'">Quản lý thông tin cá nhân</a>
        <a href="#" id="logout" style="display:block; padding:5px; text-decoration:none; color:red;" onclick="window.location.href='/logout'">Đăng xuất</a>
    `;

    document.body.appendChild(userMenu); // Thêm vào trang

    if (current_user != null) {
        loginButton.href = "#"; // Vô hiệu hóa link đăng nhập

        // Khi nhấn vào tên, hiển thị menu
        loginButton.onclick = (event) => {
            event.preventDefault();
            userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
            const rect = loginButton.getBoundingClientRect();
            userMenu.style.top = `${rect.bottom + window.scrollY}px`;
            userMenu.style.left = `${rect.left + window.scrollX}px`;
        };
    }

    // Ẩn menu khi click ra ngoài
    document.addEventListener("click", function (event) {
        if (!loginButton.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.style.display = "none";
        }
    });
});