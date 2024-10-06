document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start_btn");
  const exClaim = document.querySelector(".ex_claim");
  const points = document.querySelector(".ex_ponits > span");
  const saveNumPoints = localStorage.getItem("points");
  if (saveNumPoints) {
    points.innerText = (saveNumPoints * 1).toLocaleString("en-US");
  } else {
    points.innerText = (500).toLocaleString("en-US");
  }
  const earningRate = 10 / 3600; // Mỗi giây cộng dồn
  const initialClaim = earningRate; // Giá trị khởi đầu của EXG
  let totalClaim = initialClaim;
  let countdown;
  function startCountdown(endTime) {
    clearInterval(countdown);
    startBtn.classList.add("mining");
    countdown = setInterval(() => {
      const now = new Date();
      const timeLeft = endTime - now;
      if (timeLeft <= 0) {
        clearInterval(countdown);
        localStorage.removeItem("endTime"); // Xóa thời gian khi đếm ngược xong
        localStorage.setItem("claim", "1"); // Xóa thời gian khi đếm ngược xong
        startBtn.classList.remove("mining");
        startBtn.innerText = "CLAIM";
        startBtn.classList.add("claim");
        const claimBtn = document.querySelector(".claim");
        claimBtn.addEventListener("click", () => {
          handleClaim();
        });
      } else {
        startBtn.innerText = formatTimeLeft(endTime);
        const elapsedSeconds = Math.floor(
          (24 * 60 * 60 * 1000 - timeLeft) / 1000
        );
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
  function handleClaim() {
    const saveNumPoints = localStorage.getItem("points");
    let numPoints;
    if (saveNumPoints) {
      numPoints = saveNumPoints * 1 + totalClaim;
    } else {
      numPoints = 500 + totalClaim;
    }
    points.innerText = numPoints.toLocaleString("en-US");
    localStorage.removeItem("claim");
    localStorage.setItem("points", numPoints.toString());
    totalClaim = 0;
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
  const saveClaim = localStorage.getItem("claim");
  if (savedEndTime && !saveClaim) {
    const endTime = new Date(savedEndTime);
    if (endTime > new Date()) {
      startCountdown(endTime); // Bắt đầu đếm ngược nếu còn thời gian
    } else {
      totalClaim = initialClaim * 24 * 60 * 60;

      updateExClaim(); // Cập nhật số tiền EXG mỗi giây
      localStorage.removeItem("endTime"); // Xóa thời gian khi đếm ngược xong
      localStorage.setItem("claim", "1"); // Xóa thời gian khi đếm ngược xong
      startBtn.classList.remove("mining");
      startBtn.innerText = "CLAIM";
      startBtn.classList.add("claim");
      const claimBtn = document.querySelector(".claim");
      claimBtn.addEventListener("click", () => {
        handleClaim();
      });
    }
  } else if (!savedEndTime && saveClaim) {
    totalClaim = initialClaim * 24 * 60 * 60;
    updateExClaim(); // Cập nhật số tiền EXG mỗi giây
    startBtn.classList.remove("mining");
    startBtn.innerText = "CLAIM";
    startBtn.classList.add("claim");
    const claimBtn = document.querySelector(".claim");
    claimBtn.addEventListener("click", () => {
      handleClaim();
    });
  }
  const menu = document.querySelectorAll(".ex_navs > ul >li");
  const pages = document.querySelectorAll(".ex_box > div");
  const rankBtn = document.querySelector(".ex_rank_btn");
  const profileBtn = document.querySelector(".ex_profile_btn");
  rankBtn.addEventListener("click", () => {
    pages[5].scrollIntoView({
      block: "start",
    });
  });
  profileBtn.addEventListener("click", () => {
    pages[6].scrollIntoView({
      block: "start",
    });
  });
  menu.forEach((item, index) => {
    item.addEventListener("click", () => {
      pages[index].scrollIntoView({
        block: "start",
      });
    });
  });
});
