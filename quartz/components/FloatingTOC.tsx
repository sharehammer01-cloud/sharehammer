import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/floatingToc.scss"

export default ((userOpts?: any) => {
  const FloatingTOC: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const toc = fileData.toc === undefined ? [] : fileData.toc

    if (toc.length === 0) {
      return null
    }

    return (
      <div class={`floating-toc ${displayClass ?? ""}`}>
        <button id="toc-toggle-btn" aria-label="Toggle Table of Contents">
          {/* 아이콘: 리스트 모양 SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="12" x2="9" y2="12"></line><line x1="21" y1="18" x2="7" y2="18"></line><path d="M3 12h.01"></path><path d="M3 18h.01"></path></svg>
        </button>
        <div id="toc-content" class="toc-hidden">
          <h3>목차</h3>
          <ul>
            {toc.map((tocItem) => (
              <li key={tocItem.anchor} class={`depth-${tocItem.depth}`}>
                <a href={`#${tocItem.anchor}`}>{tocItem.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // 버튼 클릭 시 목차를 켜고 끄는 스크립트
  FloatingTOC.afterDOMLoaded = `
    const btn = document.getElementById('toc-toggle-btn');
    const content = document.getElementById('toc-content');
    if (btn && content) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        content.classList.toggle('toc-hidden');
      });
      document.addEventListener('click', () => {
        content.classList.add('toc-hidden');
      });
      content.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  `

  FloatingTOC.css = style
  return FloatingTOC
}) satisfies QuartzComponentConstructor