document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start_btn");
  const exClaim = document.querySelector(".ex_claim");
  const initialClaim = 0.0; // Giá trị khởi đầu của EXG
  const earningRate = 1250 / 3600; // Mỗi giây cộng dồn
  let totalClaim = initialClaim;

  function startCountdown(endTime) {
    startBtn.classList.add("mining");
    const countdown = setInterval(() => {
      const now = new Date();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        localStorage.removeItem("endTime"); // Xóa thời gian khi đếm ngược xong
        startBtn.classList.remove("mining");
        startBtn.innerText = "Starting";
      } else {
        startBtn.innerText = formatTimeLeft(endTime);
        // Tính toán tổng số EXG dựa trên thời gian đã trôi qua
        const elapsedSeconds = Math.floor(
          (24 * 60 * 60 * 1000 - timeLeft) / 1000
        ); // Tổng số giây đã trôi qua
        totalClaim = initialClaim + elapsedSeconds * earningRate; // Cập nhật totalClaim
        updateExClaim(); // Cập nhật số tiền EXG mỗi giây
      }
    }, 1000);
  }

  function formatTimeLeft(endTime) {
    const now = new Date();
    const timeLeft = endTime - now;

    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }

  function updateExClaim() {
    // Định dạng số với dấu . cho phần thập phân và dấu , cho phần ngàn
    exClaim.innerText =
      totalClaim.toLocaleString("en-US", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }) + " $EXG";
  }

  startBtn.addEventListener("click", function () {
    const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Thời gian kết thúc sau 24 giờ
    localStorage.setItem("endTime", endTime); // Lưu endTime vào localStorage
    startCountdown(endTime);
  });

  // Kiểm tra xem có endTime trong localStorage không
  const savedEndTime = localStorage.getItem("endTime");
  if (savedEndTime) {
    const endTime = new Date(savedEndTime);
    if (endTime > new Date()) {
      startCountdown(endTime); // Bắt đầu đếm ngược nếu còn thời gian
    } else {
      localStorage.removeItem("endTime"); // Xóa nếu thời gian đã hết
      startBtn.innerText = "Starting";
    }
  }
  const menu = document.querySelectorAll(".ex_navs > ul >li");
  const pages = document.querySelectorAll(".ex_box > div");
  menu.forEach((item, index) => {
    item.addEventListener("click", () => {
      pages[index].scrollIntoView({
        block: "start",
      });
    });
  });
});
