document.addEventListener("nav", () => {
  const tocElement = document.querySelector(".toc") as HTMLElement;
  const tocHeader = document.querySelector(".toc h3, .toc button") as HTMLElement;

  if (tocElement) {
    // 1. 목차 상단(제목 영역)을 누르면 active 클래스를 토글 (열고 닫기)
    if (tocHeader) {
      tocHeader.addEventListener("click", (e) => {
        e.stopPropagation();
        tocElement.classList.toggle("active");
      });
    } else {
      // 헤더 구분이 모호할 경우 박스 자체 터치 시 열기
      tocElement.addEventListener("click", (e) => {
        e.stopPropagation();
        tocElement.classList.toggle("active");
      });
    }

    // 2. 목차 내부의 링크(글자)를 누르면 부드럽게 이동한 뒤 목차 닫기
    const tocLinks = tocElement.querySelectorAll("a");
    tocLinks.forEach(link => {
      link.addEventListener("click", () => {
        tocElement.classList.remove("active");
      });
    });

    // 3. 목차 바깥의 본문 빈 곳을 누르면 목차 자동으로 닫기
    document.addEventListener("click", () => {
      tocElement.classList.remove("active");
    });
  }

  // 4. 맨 위로 가기 (Top) 버튼 동적 생성 및 기능
  if (!document.getElementById("scroll-top-btn")) {
    const topBtn = document.createElement("button");
    topBtn.id = "scroll-top-btn";
    topBtn.innerHTML = "↑";
    topBtn.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(topBtn);

    // 스크롤 위치에 따라 버튼 나타나기/숨기기
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    // 버튼 클릭 시 맨 위로 부드럽게 스크롤
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});