function initFloatingFeatures() {
  const tocElement = document.querySelector(".toc") as HTMLElement;
  // 화살표나 제목이 있는 헤더 부분을 명확히 타겟팅
  const tocHeader = document.querySelector(".toc h3, .toc button, .toc-title, .toc > border") as HTMLElement;

  if (tocElement) {
    // 기존에 걸려있을지 모르는 이벤트를 초기화하기 위해 토글 함수 분리
    const toggleTOC = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      tocElement.classList.toggle("active");
    };

    // 모바일 터치와 PC 클릭 모두 대응
    if (tocHeader) {
      tocHeader.addEventListener("click", toggleTOC);
      tocHeader.addEventListener("touchstart", toggleTOC, { passive: false });
    } else {
      // 헤더를 못 찾으면 박스 상단 영역 클릭 시 토글
      tocElement.addEventListener("click", toggleTOC);
    }

    // 목차 내부 링크 클릭 시 이동 후 닫기
    const tocLinks = tocElement.querySelectorAll(".toc a");
    tocLinks.forEach(link => {
      const closeTOC = () => {
        tocElement.classList.remove("active");
      };
      link.addEventListener("click", closeTOC);
      link.addEventListener("touchstart", closeTOC);
    });

    // 바깥 영역 터치 시 닫기
    const closeAll = () => tocElement.classList.remove("active");
    document.addEventListener("click", closeAll);
    document.addEventListener("touchstart", closeAll);
    
    // 목차 내부를 터치할 때는 바깥 영역 터치 이벤트가 발동하지 않도록 방어
    tocElement.addEventListener("click", (e) => e.stopPropagation());
    tocElement.addEventListener("touchstart", (e) => e.stopPropagation());
  }

  // 맨 위로 가기(Top) 버튼 생성 및 바인딩
  if (!document.getElementById("scroll-top-btn")) {
    const topBtn = document.createElement("button");
    topBtn.id = "scroll-top-btn";
    topBtn.innerHTML = "↑";
    topBtn.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });

    const scrollToTop = (e: Event) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    topBtn.addEventListener("click", scrollToTop);
    topBtn.addEventListener("touchstart", scrollToTop, { passive: false });
  }
}

// Quartz의 모든 페이지 전환 이벤트 리스너에 등록
document.addEventListener("nav", initFloatingFeatures);
document.addEventListener("DOMContentLoaded", initFloatingFeatures);