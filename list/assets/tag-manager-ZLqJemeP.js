import{s as c,e as p}from"./index-BW2mKSFn.js";function f(u={}){const n=document.createElement("div");n.className="backdrop";const a=document.createElement("div");a.className="sheet";function d(){const t=c.getState().tags;a.innerHTML=`
      <div class="sheet-handle"></div>
      <div class="px-4 pt-2 pb-3 flex items-center justify-between">
        <h2 class="text-[17px] font-semibold">管理标签</h2>
        <button data-act="close" class="p-2 rounded-lg text-ink-soft" aria-label="关闭">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <div class="sheet-body">
        <div class="flex gap-2 mb-3">
          <input data-field="new-tag" type="text" class="field" placeholder="输入新标签名" maxlength="20" />
          <button data-act="add" class="btn btn-primary shrink-0" type="button">添加</button>
        </div>
        <div data-region="list" class="flex flex-col gap-2">
          ${t.length===0?'<div class="py-8 text-center text-[13px] text-ink-soft">还没有任何标签</div>':t.map(e=>`
                <div class="card p-2.5 flex items-center gap-2" data-tag-row="${p(e)}">
                  <span class="chip chip-active flex-1 justify-start" style="padding:6px 12px;font-size:13px">#${p(e)}</span>
                  <button data-act="rename" class="btn btn-ghost !py-1.5 !px-3 !text-[13px]" type="button">重命名</button>
                  <button data-act="delete" class="btn btn-danger !py-1.5 !px-3 !text-[13px]" type="button">删除</button>
                </div>`).join("")}
        </div>
        <p class="text-[12px] text-ink-soft mt-4 leading-relaxed">
          重命名会同步到所有任务；删除标签也会从所有任务中移除该标签。
        </p>
      </div>
    `}d(),document.body.appendChild(n),document.body.appendChild(a);function o(){n.remove(),a.remove(),u.onChange?.()}function l(){const t=a.querySelector('[data-field="new-tag"]'),e=t.value.trim();e&&(c.addTag(e),t.value="",d(),s())}function s(){a.querySelector('[data-act="close"]')?.addEventListener("click",o),a.querySelector('[data-act="add"]')?.addEventListener("click",l),a.querySelector('[data-field="new-tag"]')?.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),l())}),a.querySelectorAll("[data-tag-row]").forEach(t=>{const e=t.dataset.tagRow;t.querySelector('[data-act="rename"]')?.addEventListener("click",()=>{const r=prompt("重命名标签",e);if(r!==null){const i=r.trim();i&&i!==e&&(c.renameTag(e,i),d(),s())}}),t.querySelector('[data-act="delete"]')?.addEventListener("click",()=>{confirm(`确定删除标签「#${e}」？该标签会从所有任务中移除。`)&&(c.removeTag(e),d(),s())})})}s(),n.addEventListener("click",o)}export{f as openTagManager};
