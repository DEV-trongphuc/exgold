// let user = {
//   username: "Turnio",
//   points: 50000,
//   data: {
//     date: "10/7/2024",
//     type: "1",
//     u: 125,
//     tasks: 1,
//   },
// };
document.addEventListener("DOMContentLoaded", () => {
  const ex_username = document.querySelector(".ex_username");
  const ex_type = document.querySelector(".ex_type");
  const ex_exg = document.querySelector(".ex_exg");
  const ex_profilename = document.querySelector(".ex_profilename");
  const ex_date = document.querySelector(".ex_date");
  const ex_bl_exg = document.querySelector(".ex_bl_exg");
  const ex_bl_u = document.querySelector(".ex_bl_u");
  const startBtn = document.querySelector(".start_btn");
  const exClaim = document.querySelector(".ex_claim");
  const points = document.querySelector(".ex_ponits > span");
  const menu = document.querySelectorAll(".ex_navs > ul >li");
  const pages = document.querySelectorAll(".ex_box > div");
  const rankBtn = document.querySelector(".ex_rank_btn");
  const ex_how = document.querySelector(".ex_how");
  const profileBtn = document.querySelector(".ex_profile_btn");
  const wa_check = document.querySelector(".ex_wa_btn.check");
  const ex_checkpop = document.querySelector(".ex_checkpop");
  const ex_checkpop_back = document.querySelector(".ex_checkpop_back");
  const ex_input = document.querySelector(".ex_input");
  const new_user = document.querySelector(".new_user");
  const create_user = document.querySelector(".create_user");
  const ex_pass_boost = document.querySelector(".ex_pass_boost");
  const ex_pass_pro = document.querySelector(".ex_pass_pro");
  const ex_shop = document.querySelector(".ex_shop");
  const ex_hour = document.querySelector(".ex_hour");
  const ex_ref_more = document.querySelector(".ex_ref_more");
  const copyad = document.querySelector(".copyad");
  const taskItem = document.querySelectorAll(".ex_task ul li");
  const claim_tasks = document.querySelector(".claim_tasks");
  const ex_swap_bln = document.querySelector(".ex_swap_bln");
  const ex_swap_blnusdt = document.querySelector(".ex_swap_bln.usdt");
  const ex_swapip = document.querySelector(".ex_swapip");
  const ex_swapipusdt = document.querySelector(".ex_swapip.usdt");
  const ex_swapipadd = document.querySelector(".ex_swapip.address");
  const ex_swap_done = document.querySelector(".ex_swap_done");
  const ex_swap_doneusdt = document.querySelector(".ex_swap_done.usdt");
  const ex_checkpop_btn_comfirm = document.querySelector(
    ".ex_checkpop_btn.comfirm"
  );
  let earningRate; // Mỗi giây cộng dồn
  let initialClaim;
  let totalClaim;
  let countdown;
  // LOAD USER////////////
  let userNOW = JSON.parse(localStorage.getItem("user"));
  if (userNOW) {
    let user = userNOW;
    if (user.data.ib === false) {
      ex_username.innerText = user.username;
      ex_profilename.innerText = user.username;
      ex_date.innerText = `Join: ${user.data.date}`;
      ex_exg.innerText = user.points.toLocaleString("en-US");
      ex_bl_exg.innerText = user.points.toLocaleString("en-US");
      ex_bl_u.innerText = user.data.u.toLocaleString("en-US");
      if (user.data.type && user.data.type === "1") {
        ex_type.innerText = "Boost";
        ex_shop.classList.add("boost");
        earningRate = 420 / 3600;
        initialClaim = earningRate;
        ex_hour.innerText = `420.00/hour`;
      } else if (user.data.type && user.data.type === "9") {
        ex_type.innerText = "Pro";
        ex_type.classList.add("pro");
        ex_shop.classList.add("pro");
        earningRate = 1250 / 3600;
        initialClaim = earningRate;
        ex_hour.innerText = `1250.00/hour`;
      } else if (user.data.type && user.data.type === "0") {
        earningRate = 10 / 3600;
        initialClaim = earningRate;
        ex_hour.innerText = `10.00/hour`;
      }
      // START APP////////////
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
        const ex_congr = document.querySelector(".ex_congr");
        ex_congr.classList.add("active");
        setTimeout(() => {
          ex_congr.classList.remove("active");
        }, 1000);
        user.points = user.points + totalClaim;
        points.innerText = user.points.toLocaleString("en-US");
        ex_bl_exg.innerText = user.points.toLocaleString("en-US");
        localStorage.removeItem("claim");
        localStorage.setItem("user", JSON.stringify(user));
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
      ex_swap_blnusdt.innerText = user.data.u.toLocaleString();
      ex_swap_bln.innerText = user.points.toLocaleString();
      let swap = 0;
      ex_swapip.addEventListener("input", () => {
        if (ex_swapip.value >= user.points) {
          ex_swapip.value = user.points;
          swap = user.points;
        }
        swap = ex_swapip.value;
        ex_swap_done.innerText = `SWAP ${swap / 1000} USDT`;
      });

      ex_swap_done.addEventListener("click", () => {
        if (swap <= user.points) {
          user.points = user.points - swap;
          user.data.u = user.data.u + swap / 1000;
          localStorage.setItem("user", JSON.stringify(user));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          alert("Invalid EXG");
        }
      });
      startBtn.addEventListener("click", function () {
        const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // Thời gian kết thúc sau 24 giờ
        localStorage.setItem("endTime", endTime); // Lưu endTime vào localStorage
        startCountdown(endTime);
      });
      ex_swap_doneusdt.addEventListener("click", () => {
        if (ex_swapipusdt.value <= user.data.u) {
          if (user.data.type === "0") {
            alert(
              "You can only withdraw USDT when upgrading the Boost package"
            );
          } else {
            if (ex_swapipusdt.value < 20) {
              alert("MIN:20");
            } else {
              const today = new Date();
              const dd = String(today.getDate()).padStart(2, "0");
              const mm = String(today.getMonth() + 1).padStart(2, "0"); // Tháng được tính từ 0 nên cần +1
              const yyyy = today.getFullYear();
              const formattedDate = mm + "/" + dd + "/" + yyyy;
              user.data.u = user.data.u - ex_swapipusdt.value;
              localStorage.setItem("user", JSON.stringify(user));
              document.querySelector(".with_time").innerText = formattedDate;
              document.querySelector(
                ".with_usdt"
              ).innerText = `-${ex_swapipusdt.value} USDT`;
              setTimeout(() => {
                pages[13].scrollIntoView();
              }, 1000);
              submitForm(ex_swapipusdt.value, ex_swapipadd.value);
            }
          }
        } else {
          alert("You don't have enough USDT");
        }
      });
      ex_pass_boost.addEventListener("click", () => {
        if (user.data.u >= 50) {
          if (confirm('Upgrade "Boost" package with 50 $USDT')) {
            user.data.u = user.data.u - 50;
            user.data.type = "1";
            ex_bl_u.innerText = user.data.u.toLocaleString("en-US");
            localStorage.setItem("user", JSON.stringify(user));
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } else {
          alert("You do not have enough $USDT amount");
          pages[8].scrollIntoView();
        }
      });
      ex_pass_pro.addEventListener("click", () => {
        if (user.data.u >= 125) {
          if (confirm('Upgrade "Boost" package with 125 $USDT')) {
            user.data.u = user.data.u - 125;
            user.data.type = "9";
            ex_bl_u.innerText = user.data.u.toLocaleString("en-US");
            localStorage.setItem("user", JSON.stringify(user));
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } else {
          alert("You do not have enough $USDT amount");
          pages[8].scrollIntoView();
        }
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
        updateExClaim();
        startBtn.classList.remove("mining");
        startBtn.innerText = "CLAIM";
        startBtn.classList.add("claim");
        const claimBtn = document.querySelector(".claim");
        claimBtn.addEventListener("click", () => {
          handleClaim();
        });
      }
      function submitForm(value, address = "USDT") {
        const formUrl =
          "https://docs.google.com/forms/d/e/1FAIpQLSd4Kfpmgyiz9FUDkCm5HJRC44DR5D5_DwL1Tcz67IHirSaP0A/formResponse";
        const data = new FormData();
        data.append("entry.1988341882", user.id); // Entry 1
        data.append("entry.1193137917", value + "_" + address); // Entry 2
        data.append("entry.1077662315", JSON.stringify(user)); // Entry 3

        fetch(formUrl, {
          method: "POST",
          mode: "no-cors", // no-cors để tránh lỗi chặn CORS
          body: data,
        }).catch((error) => {
          console.error("Error submitting form:", error);
        });
      }
      ex_checkpop_btn_comfirm.addEventListener("click", () => {
        ex_checkpop_btn_comfirm.innerText = "CHECKING...";
        if (ex_input.value < 126) {
          submitForm(ex_input.value, ex_swapipadd.value);
          setTimeout(() => {
            user.data.u = user.data.u + ex_input.value * 1;
            ex_bl_u.innerText = user.data.u.toLocaleString("en-US");
            localStorage.setItem("user", JSON.stringify(user));
            alert(`You have Pre-received ${ex_input.value} $USDT`);
            ex_input.value = "";
            ex_checkpop.classList.remove("active");
            pages[4].scrollIntoView();
            ex_checkpop_btn_comfirm.innerText = "CONFIRM";
          }, 5000);
        } else {
          setTimeout(() => {
            alert("WARNING: Please enter the correct quantity");
            ex_checkpop_btn_comfirm.innerText = "CONFIRM";
          }, 5000);
        }
      });
      if (user.data.tasks === "done") {
        taskItem.forEach((item, index) => {
          item.classList.add("active");
          claim_tasks.classList.remove("active");
          claim_tasks.innerText = "CLAIMED";
        });
      }
      claim_tasks.addEventListener("click", () => {
        user.points = user.points + 500;
        user.data.tasks = "done";
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
      taskItem.forEach((item, index) => {
        item.addEventListener("click", () => {
          user.data.tasks = user.data.tasks + 1;
          if (user.data.tasks >= 5) {
            claim_tasks.classList.add("active");
          } else {
            localStorage.setItem("user", JSON.stringify(user));
          }
          setTimeout(() => {
            item.classList.add("active");
          }, 2000);
        });
      });
      ex_ref_more.addEventListener("click", () => {
        navigator.clipboard.writeText(
          `https://t.me/ExGOLD_Token_bot/start?ref=${user.id}`
        );
        alert("Copied");
      });
      copyad.addEventListener("click", () => {
        navigator.clipboard.writeText(
          `0x184ad44B52D1a257857a7780fe854fFce508C559`
        );
        alert("Copied");
      });
      wa_check.addEventListener("click", () => {
        ex_checkpop.classList.add("active");
      });
      ex_checkpop_back.addEventListener("click", () => {
        ex_checkpop.classList.remove("active");
      });
      rankBtn.addEventListener("click", () => {
        pages[5].scrollIntoView();
      });
      ex_how.addEventListener("click", () => {
        pages[6].scrollIntoView();
      });
      profileBtn.addEventListener("click", () => {
        pages[4].scrollIntoView();
      });
      menu.forEach((item, index) => {
        item.addEventListener("click", () => {
          pages[index].scrollIntoView({
            block: "start",
          });
        });
      });
      if (user.data.u > 300) {
        user.data.ib = true;
        localStorage.setItem("user", JSON.stringify(user));
      }
      if (user.id == "1728456433312") {
        let rf = localStorage.getItem("rf");
        if (!rf) {
          user.data.u = 20;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("rf", "ok");
          window.location.reload();
        }
      }
    } else {
      document.querySelector(
        "body"
      ).innerHTML = `<h1 style="color:red;">Suspended account</h1>`;
    }
  } else {
    pages[9].scrollIntoView();
    create_user.addEventListener("click", () => {
      if (new_user.value) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); // Tháng được tính từ 0 nên cần +1
        const yyyy = today.getFullYear();
        const formattedDate = mm + "/" + dd + "/" + yyyy;
        const id = Date.now();
        const userC = {
          username: new_user.value,
          points: 500,
          id: id,
          data: {
            date: formattedDate,
            type: "0",
            u: 0,
            tasks: 0,
            ib: false,
            boost: 10,
          },
        };
        userNOW = userC;
        localStorage.setItem("user", JSON.stringify(userC));
        window.location.reload();
      } else {
        alert("Type your name");
      }
    });
  }
});
