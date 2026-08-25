(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const B="todo-h5:v1";function E(){return{tasks:[],tags:[]}}function O(){if(typeof window>"u")return E();try{const e=window.localStorage.getItem(B);if(!e)return E();const t=JSON.parse(e);return{tasks:Array.isArray(t.tasks)?t.tasks:[],tags:Array.isArray(t.tags)?t.tags.filter(n=>typeof n=="string"):[]}}catch(e){return console.warn("[storage] 读取本地数据失败，已重置：",e),E()}}function N(e){if(!(typeof window>"u"))try{window.localStorage.setItem(B,JSON.stringify(e))}catch(t){console.warn("[storage] 写入本地数据失败：",t)}}function H(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,10)}`}class _{constructor(){this.listeners=new Set,this.state=O()}getState(){return this.state}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}emit(){N(this.state),this.listeners.forEach(t=>t(this.state))}addTask(t){const n=Date.now(),o={id:H(),content:t.content.trim(),createdAt:n,completedAt:t.completedAt??null,tags:C(t.tags),status:"todo",pinned:!1,pinnedAt:null};return this.state={...this.state,tasks:[o,...this.state.tasks]},this.syncTagsFromTasks(),this.emit(),o}updateTask(t,n){this.state={...this.state,tasks:this.state.tasks.map(o=>{if(o.id!==t)return o;const s={...o};return n.content!==void 0&&(s.content=n.content.trim()),n.tags!==void 0&&(s.tags=C(n.tags)),n.completedAt!==void 0&&(s.completedAt=n.completedAt),n.status!==void 0&&(s.status=n.status),s})},this.syncTagsFromTasks(),this.emit()}removeTask(t){this.state={...this.state,tasks:this.state.tasks.filter(n=>n.id!==t)},this.syncTagsFromTasks(),this.emit()}setStatus(t,n){this.state={...this.state,tasks:this.state.tasks.map(o=>{if(o.id!==t)return o;const s={...o,status:n};return n==="done"&&!s.completedAt&&(s.completedAt=Date.now()),n==="todo"&&(s.completedAt=null),s})},this.emit()}togglePin(t){this.state={...this.state,tasks:this.state.tasks.map(n=>{if(n.id!==t)return n;const o=!n.pinned;return{...n,pinned:o,pinnedAt:o?Date.now():null}})},this.emit()}addTag(t){const n=t.trim();return n?(this.state.tags.includes(n)||(this.state={...this.state,tags:[...this.state.tags,n]},this.emit()),n):null}renameTag(t,n){const o=t.trim(),s=n.trim();!o||!s||o===s||(this.state.tags.includes(s)?this.state={...this.state,tags:this.state.tags.filter(a=>a!==o),tasks:this.state.tasks.map(a=>({...a,tags:a.tags.map(l=>l===o?s:l).filter((l,r,u)=>u.indexOf(l)===r)}))}:this.state={...this.state,tags:this.state.tags.map(a=>a===o?s:a),tasks:this.state.tasks.map(a=>({...a,tags:a.tags.map(l=>l===o?s:l)}))},this.emit())}removeTag(t){this.state={...this.state,tags:this.state.tags.filter(n=>n!==t),tasks:this.state.tasks.map(n=>({...n,tags:n.tags.filter(o=>o!==t)}))},this.emit()}syncTagsFromTasks(){const t=new Set(this.state.tags);for(const n of this.state.tasks)for(const o of n.tags)t.add(o);this.state={...this.state,tags:Array.from(t)}}getPinned(t=3){return this.state.tasks.filter(n=>n.pinned).sort((n,o)=>(o.pinnedAt??0)-(n.pinnedAt??0)).slice(0,t)}countPinned(){return this.state.tasks.filter(t=>t.pinned).length}query(t,n,o){const s=this.state.tasks.filter(r=>!(r.pinned||t.status!=="all"&&r.status!==t.status||t.tag!=="all"&&!r.tags.includes(t.tag)||t.createdFrom!==null&&r.createdAt<t.createdFrom||t.createdTo!==null&&r.createdAt>t.createdTo||t.completedFrom!==null&&(!r.completedAt||r.completedAt<t.completedFrom)||t.completedTo!==null&&(!r.completedAt||r.completedAt>t.completedTo))),a=o==="asc"?1:-1,l="createdAt";return s.sort((r,u)=>L(r,u,n,l)*a),s}}function L(e,t,n,o){if(n==="tag"){const s=e.tags[0]??"",a=t.tags[0]??"";return s!==a?s.localeCompare(a,"zh-CN"):L(e,t,o,"createdAt")}if(n==="completedAt"){const s=e.completedAt??0,a=t.completedAt??0;return s!==a?s-a:L(e,t,o,"createdAt")}return e.createdAt-t.createdAt}function C(e){if(!e)return[];const t=new Set,n=[];for(const o of e){const s=o.trim();s&&!t.has(s)&&(t.add(s),n.push(s))}return n}const f=new _;function w(e){return e<10?`0${e}`:String(e)}function F(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function M(e){if(!e)return"";const t=new Date(e),n=new Date,o=new Date(n.getFullYear(),n.getMonth(),n.getDate()-1),s=`${w(t.getHours())}:${w(t.getMinutes())}`;return F(t,n)?s:F(t,o)?`昨天 ${s}`:`${w(t.getMonth()+1)}-${w(t.getDate())} ${s}`}function I(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}-${w(t.getMonth()+1)}-${w(t.getDate())}T${w(t.getHours())}:${w(t.getMinutes())}`}function R(e){if(!e)return null;const t=new Date(e).getTime();return Number.isFinite(t)?t:null}function S(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}-${w(t.getMonth()+1)}-${w(t.getDate())}`}function T(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function z(e){return e==="todo"?"done":e==="done"?"cancelled":"todo"}function U(e){return e==="done"?'<span class="inline-flex items-center gap-1 text-done"><span style="width:6px;height:6px;border-radius:50%;background:var(--done);display:inline-block"></span>已完成</span>':e==="cancelled"?'<span class="inline-flex items-center gap-1 text-cancel"><span style="width:6px;height:6px;border-radius:50%;background:var(--cancel);display:inline-block"></span>已取消</span>':'<span class="inline-flex items-center gap-1 text-ink-soft"><span style="width:6px;height:6px;border-radius:50%;background:#d8cdba;display:inline-block"></span>未完成</span>'}function j(e){const t=e.status!=="todo"?"strike":"",n=e.status==="done"?"done":e.status==="cancelled"?"cancelled":"todo",o=e.status==="done"?'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="animate-check-draw" style="stroke-dasharray:24;stroke-dashoffset:0"><path d="M5 12.5l4.5 4.5L19 7"/></svg>':e.status==="cancelled"?'<span style="width:10px;height:2px;background:currentColor;border-radius:1px"></span>':"",s=e.tags.map(l=>`<span class="chip" style="padding:2px 8px;font-size:11px;line-height:1.5">#${T(l)}</span>`).join(""),a=[`<span class="tnum">创建 ${M(e.createdAt)}</span>`,e.completedAt?`<span class="tnum">完成 ${M(e.completedAt)}</span>`:""].filter(Boolean).join('<span class="text-line">·</span>');return`
  <article class="card ${e.pinned?"card-pinned":""} p-3 flex gap-3 items-start animate-fade-up" data-id="${e.id}">
    <button class="status-dot ${n} mt-0.5" data-act="cycle-status" aria-label="切换状态">
      ${o}
    </button>
    <div class="flex-1 min-w-0" data-act="edit">
      <p class="text-[15px] leading-[1.5] break-words ${t}">${T(e.content)}</p>
      ${s?`<div class="flex flex-wrap gap-1.5 mt-2">${s}</div>`:""}
      <div class="flex items-center gap-2 mt-1.5 text-[11.5px] text-ink-soft">
        ${a}
      </div>
    </div>
    <button data-act="pin" class="p-1.5 rounded-lg ${e.pinned?"text-accent":"text-ink-soft hover:text-accent"}" aria-label="${e.pinned?"取消置顶":"置顶"}" style="margin-top:-2px">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="${e.pinned?"currentColor":"none"}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 17v5"/>
        <path d="M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/>
      </svg>
    </button>
  </article>`}function Y(e){const t=e.status==="done"?"done":e.status==="cancelled"?"cancelled":"todo",n=e.status==="done"?'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>':e.status==="cancelled"?'<span style="width:8px;height:2px;background:currentColor;border-radius:1px"></span>':"",o=e.content.length>36?e.content.slice(0,36)+"…":e.content;return`
  <article class="card card-pinned p-3 w-[72%] shrink-0 animate-fade-up" data-id="${e.id}">
    <div class="flex items-start gap-2">
      <button class="status-dot ${t}" style="width:20px;height:20px" data-act="cycle-status" aria-label="切换状态">
        ${n}
      </button>
      <p class="flex-1 text-[14px] leading-snug break-words min-w-0 ${e.status!=="todo"?"strike":""}" data-act="edit">${T(o)}</p>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-accent shrink-0 mt-0.5">
        <path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/>
      </svg>
    </div>
    <div class="flex items-center gap-1.5 mt-2 text-[11px] text-ink-soft">
      ${U(e.status)}
      <span>·</span>
      <span class="tnum">${M(e.createdAt)}</span>
    </div>
  </article>`}function q(e,t,n){const o=s=>{const a=s.target,l=a.closest("[data-id]");if(!l||!e.contains(l))return;const r=l.dataset.id,u=t(r);if(!u)return;const h=a.closest("[data-act]");if(!h)return;const p=h.dataset.act;p==="cycle-status"?n.onStatusToggle(r,z(u.status)):p==="pin"?n.onTogglePin(r):p==="edit"&&n.onEdit(u)};return e.addEventListener("click",o),()=>e.removeEventListener("click",o)}const K="modulepreload",V=function(e,t){return new URL(e,t).href},D={},G=function(t,n,o){let s=Promise.resolve();if(n&&n.length>0){let h=function(p){return Promise.all(p.map(m=>Promise.resolve(m).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const l=document.getElementsByTagName("link"),r=document.querySelector("meta[property=csp-nonce]"),u=r?.nonce||r?.getAttribute("nonce");s=h(n.map(p=>{if(p=V(p,o),p in D)return;D[p]=!0;const m=p.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(o)for(let c=l.length-1;c>=0;c--){const y=l[c];if(y.href===p&&(!m||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${g}`))return;const i=document.createElement("link");if(i.rel=m?"stylesheet":K,m||(i.as="script"),i.crossOrigin="",i.href=p,u&&i.setAttribute("nonce",u),document.head.appendChild(i),m)return new Promise((c,y)=>{i.addEventListener("load",c),i.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${p}`)))})}))}function a(l){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=l,window.dispatchEvent(r),!r.defaultPrevented)throw l}return s.then(l=>{for(const r of l||[])r.status==="rejected"&&a(r.reason);return t().catch(a)})};function A(e){const{task:t}=e,n=!!t;f.getState();let o=t?.content??"",s=new Set(t?.tags??[]),a=t?.completedAt??null,l=t?.pinned??!1;const r=document.createElement("div");r.className="backdrop";const u=document.createElement("div");u.className="sheet",u.innerHTML=`
    <div class="sheet-handle"></div>
    <div class="px-4 pt-2 pb-3 flex items-center justify-between">
      <h2 class="text-[17px] font-semibold">${n?"编辑任务":"新建任务"}</h2>
      <button data-act="close" class="p-2 rounded-lg text-ink-soft" aria-label="关闭">
        <span class="sr-only"></span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <div class="sheet-body">
      <label class="block">
        <span class="text-[13px] text-ink-soft mb-1.5 block">任务内容</span>
        <textarea data-field="content" rows="3" class="field" placeholder="今天要做什么？" maxlength="500"></textarea>
      </label>

      <div class="mt-4">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[13px] text-ink-soft">标签</span>
          <button data-act="manage-tags" class="text-[12.5px] text-accent flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            管理标签
          </button>
        </div>
        <div data-region="tags" class="flex flex-wrap gap-2"></div>
        <div class="flex gap-2 mt-2">
          <input data-field="new-tag" type="text" class="field" placeholder="新增标签，回车确认" maxlength="20" />
        </div>
      </div>

      <div class="mt-4">
        <span class="text-[13px] text-ink-soft mb-1.5 block">完成时间（可选）</span>
        <div class="flex gap-2 items-center">
          <input data-field="completed-at" type="datetime-local" class="field" />
          <button data-act="clear-completed" class="btn btn-ghost shrink-0" type="button">清除</button>
        </div>
      </div>

      ${n?`<button data-act="toggle-pin" class="mt-4 w-full btn ${l?"btn-primary":"btn-ghost"} flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${l?"currentColor":"none"}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/></svg>
              <span>${l?"已置顶（点击取消）":"置顶此任务"}</span>
            </button>`:""}

      <div class="mt-5 flex gap-2 ${n?"justify-between":"justify-end"}">
        ${n?`<button data-act="delete" class="btn btn-danger flex items-center gap-1.5" type="button">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></svg>
                删除
              </button>`:"<span></span>"}
        <div class="flex gap-2">
          <button data-act="cancel" class="btn btn-ghost" type="button">取消</button>
          <button data-act="save" class="btn btn-primary" type="button">${n?"保存":"创建"}</button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(r),document.body.appendChild(u);const h=u.querySelector('[data-field="content"]'),p=u.querySelector('[data-region="tags"]'),m=u.querySelector('[data-field="new-tag"]'),g=u.querySelector('[data-field="completed-at"]');h.value=o,g.value=I(a);function i(){const b=f.getState().tags;if(b.length===0){p.innerHTML='<span class="text-[12.5px] text-ink-soft">还没有标签，在下方输入即可创建</span>';return}p.innerHTML=b.map(v=>`<button type="button" class="tag-pick ${s.has(v)?"selected":""}" data-tag="${T(v)}">#${T(v)}</button>`).join("")}i(),setTimeout(()=>h.focus(),50);function c(){r.remove(),u.remove(),e.onClose()}function y(){const b=h.value.trim();if(!b){h.focus(),h.style.borderColor="var(--danger)";return}const v=R(g.value),k=Array.from(s);if(n&&t)f.updateTask(t.id,{content:b,tags:k,completedAt:v});else if(f.addTask({content:b,tags:k,completedAt:v}),l){const x=f.getState().tasks[0];x&&x.content}c()}u.addEventListener("click",b=>{const v=b.target.closest("[data-act],[data-tag]");if(!v)return;const k=v.dataset.act;if(k==="close"||k==="cancel")c();else if(k==="save")y();else if(k==="delete"&&t)confirm("确定删除这条任务？删除后无法恢复。")&&(f.removeTask(t.id),c());else if(k==="toggle-pin"&&t){f.togglePin(t.id),l=!l;const x=v;x.classList.toggle("btn-primary",l),x.classList.toggle("btn-ghost",!l),x.querySelector("svg").setAttribute("fill",l?"currentColor":"none"),x.querySelector("span").textContent=l?"已置顶（点击取消）":"置顶此任务"}else if(k==="clear-completed")g.value="";else if(k==="manage-tags")G(async()=>{const{openTagManager:x}=await import("./tag-manager-D-z3jS3q.js");return{openTagManager:x}},[],import.meta.url).then(({openTagManager:x})=>{x({onChange:i})});else if(v.dataset.tag){const x=v.dataset.tag;s.has(x)?s.delete(x):s.add(x),i()}}),m.addEventListener("keydown",b=>{if(b.key==="Enter"){b.preventDefault();const v=m.value.trim();if(v){const k=f.addTag(v);k&&s.add(k),m.value="",i()}}}),h.addEventListener("input",()=>{h.style.borderColor=""}),r.addEventListener("click",c)}const J=[{value:"all",label:"全部"},{value:"todo",label:"未完成"},{value:"done",label:"已完成"},{value:"cancelled",label:"已取消"}],W=[{value:"createdAt",label:"创建时间"},{value:"completedAt",label:"完成时间"},{value:"tag",label:"标签"}];function Z(e){let t={...e.filter},n=e.sortKey,o=e.sortOrder;const s=document.createElement("div");s.className="backdrop";const a=document.createElement("div");a.className="sheet";function l(){const i=f.getState().tags;a.innerHTML=`
      <div class="sheet-handle"></div>
      <div class="px-4 pt-2 pb-3 flex items-center justify-between">
        <h2 class="text-[17px] font-semibold">筛选与排序</h2>
        <button data-act="close" class="p-2 rounded-lg text-ink-soft" aria-label="关闭">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
      <div class="sheet-body space-y-5">
        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">排序</h3>
          <div class="flex items-center gap-2">
            <div class="seg flex-1 grid grid-cols-3">
              ${W.map(c=>`<button type="button" data-sort="${c.value}" class="${n===c.value?"on":""}">${c.label}</button>`).join("")}
            </div>
            <button data-act="toggle-order" class="btn btn-ghost shrink-0 !px-3" type="button" title="切换升降序">
              ${o==="desc"?"降序 ↓":"升序 ↑"}
            </button>
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">状态</h3>
          <div class="seg grid grid-cols-4 w-full">
            ${J.map(c=>`<button type="button" data-status="${c.value}" class="${t.status===c.value?"on":""}">${c.label}</button>`).join("")}
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">标签</h3>
          <div class="flex flex-wrap gap-2">
            <button type="button" data-tag="all" class="tag-pick ${t.tag==="all"?"selected":""}">全部</button>
            ${i.map(c=>`<button type="button" data-tag="${T(c)}" class="tag-pick ${t.tag===c?"selected":""}">#${T(c)}</button>`).join("")}
            ${i.length===0?'<span class="text-[12.5px] text-ink-soft">暂无标签</span>':""}
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">创建时间</h3>
          <div class="grid grid-cols-2 gap-2">
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">起</span>
              <input type="date" data-field="created-from" class="field" value="${t.createdFrom?S(t.createdFrom):""}" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">止</span>
              <input type="date" data-field="created-to" class="field" value="${t.createdTo?S(t.createdTo):""}" />
            </label>
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">完成时间</h3>
          <div class="grid grid-cols-2 gap-2">
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">起</span>
              <input type="date" data-field="completed-from" class="field" value="${t.completedFrom?S(t.completedFrom):""}" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">止</span>
              <input type="date" data-field="completed-to" class="field" value="${t.completedTo?S(t.completedTo):""}" />
            </label>
          </div>
        </section>

        <div class="flex justify-between gap-2 pt-2">
          <button data-act="reset" class="btn btn-ghost" type="button">重置</button>
          <div class="flex gap-2">
            <button data-act="cancel" class="btn btn-ghost" type="button">取消</button>
            <button data-act="apply" class="btn btn-primary" type="button">应用</button>
          </div>
        </div>
      </div>
    `}function r(){s.remove(),a.remove()}function u(){e.onApply({filter:t,sortKey:n,sortOrder:o}),r()}function h(){t={status:"all",tag:"all",createdFrom:null,createdTo:null,completedFrom:null,completedTo:null},n="createdAt",o="desc",l(),g()}function p(i){if(!i)return null;const c=new Date(i+"T00:00:00").getTime();return Number.isFinite(c)?c:null}function m(i){if(!i)return null;const c=new Date(i+"T23:59:59").getTime();return Number.isFinite(c)?c:null}function g(){a.querySelectorAll("[data-status]").forEach(i=>{i.addEventListener("click",()=>{t={...t,status:i.dataset.status},l(),g()})}),a.querySelectorAll("[data-tag]").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.tag;t={...t,tag:c==="all"?"all":c},l(),g()})}),a.querySelectorAll("[data-sort]").forEach(i=>{i.addEventListener("click",()=>{n=i.dataset.sort,l(),g()})}),a.querySelector('[data-act="toggle-order"]')?.addEventListener("click",()=>{o=o==="desc"?"asc":"desc",l(),g()}),a.querySelector('[data-field="created-from"]')?.addEventListener("change",i=>{t.createdFrom=p(i.target.value)}),a.querySelector('[data-field="created-to"]')?.addEventListener("change",i=>{t.createdTo=m(i.target.value)}),a.querySelector('[data-field="completed-from"]')?.addEventListener("change",i=>{t.completedFrom=p(i.target.value)}),a.querySelector('[data-field="completed-to"]')?.addEventListener("change",i=>{t.completedTo=m(i.target.value)}),a.querySelector('[data-act="close"]')?.addEventListener("click",r),a.querySelector('[data-act="cancel"]')?.addEventListener("click",r),a.querySelector('[data-act="apply"]')?.addEventListener("click",u),a.querySelector('[data-act="reset"]')?.addEventListener("click",h)}l(),g(),s.addEventListener("click",r),document.body.appendChild(s),document.body.appendChild(a)}const Q={status:"all",tag:"all",createdFrom:null,createdTo:null,completedFrom:null,completedTo:null},P=10;function X(){const e=document.getElementById("app");if(!e){console.error("App element not found");return}let t="createdAt",n="desc",o={...Q},s=!1;const a=document.createElement("div");a.className="min-h-screen",e.appendChild(a);const l=document.createElement("div");l.className="fab-stack",l.innerHTML=`
    <button class="fab-mini" data-fab="to-top" aria-label="滚动到顶部" title="回到顶部">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
    <button class="fab-mini" data-fab="to-bottom" aria-label="滚动到底部" title="滚动到底部">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
    </button>
  `,e.appendChild(l);const r=l.querySelector('[data-fab="to-top"]'),u=l.querySelector('[data-fab="to-bottom"]');function h(){const g=window.scrollY||document.documentElement.scrollTop,i=window.innerHeight,c=document.documentElement.scrollHeight,y=i*.9,b=g>y;l.classList.toggle("is-visible",b);const v=c-g-i;u.classList.toggle("is-hidden",v<i*.4)}let p=!1;window.addEventListener("scroll",()=>{p||(window.requestAnimationFrame(()=>{h(),p=!1}),p=!0)},{passive:!0}),window.addEventListener("resize",h),r.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),u.addEventListener("click",()=>{window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})});function m(){const g=f.getState(),i=f.getPinned(3),c=f.countPinned(),y=f.query(o,t,n),b=nt(o),v=tt[t];a.innerHTML=`
      <header class="pt-[calc(env(safe-area-inset-top)+12px)] pb-3">
        <div class="shell">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0 flex-1">
              <h1 class="text-[20px] font-semibold tracking-tight leading-tight">任务管理</h1>
              <p class="text-[12px] text-ink-soft mt-0.5 truncate">${st(g)}</p>
            </div>
            <button data-act="filter" class="relative btn btn-ghost !px-3 !py-2 shrink-0" aria-label="筛选与排序">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>
              <span class="ml-1 text-[13px]">${v}</span>
              ${b>0?`<span class="absolute -top-1 -right-1 bg-accent text-white text-[10px] leading-none rounded-full min-w-[16px] h-[16px] inline-flex items-center justify-center px-1">${b}</span>`:""}
            </button>
          </div>
        </div>
      </header>

      <main class="shell pt-0 pb-[calc(80px+env(safe-area-inset-bottom))] space-y-4">        ${i.length>0?`<section>
                <div class="flex items-center justify-between mb-1.5 px-1">
                  <h2 class="text-[12.5px] text-ink-soft font-medium flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" class="text-accent"><path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/></svg>
                    置顶
                  </h2>
                  ${c>3?`<span class="text-[12px] text-ink-soft">还有 ${c-3} 条置顶</span>`:""}
                </div>
                ${c<=3?`<div class="space-y-2" data-region="pinned">${i.map(d=>j(d)).join("")}</div>`:`<div class="flex gap-2.5 overflow-x-auto no-scrollbar pb-1" data-region="pinned" style="margin-left:calc(-16px - env(safe-area-inset-left));margin-right:calc(-16px - env(safe-area-inset-right));padding-left:calc(16px + env(safe-area-inset-left));padding-right:calc(16px + env(safe-area-inset-right));">${i.map(d=>Y(d)).join("")}</div>`}
              </section>`:""}

        <section>
          <div class="flex items-center justify-between mb-1.5 px-1">
            <h2 class="text-[12.5px] text-ink-soft font-medium">
              ${et[o.status]??"全部任务"}
              <span class="text-ink-soft/70">· ${y.length}</span>
            </h2>
          </div>
          <div class="space-y-2" data-region="list">
            ${y.length>0?(s?y:y.slice(0,P)).map(d=>j(d)).join(""):ot()}
          </div>
          ${y.length>P?`<button data-act="toggle-expand" class="mt-3 w-full btn btn-ghost !text-[13px] !text-ink-soft flex items-center justify-center gap-1">
                  ${s?`收起
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>`:`显示全部（${y.length}）
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`}
                </button>`:""}
        </section>
      </main>

      <button data-act="add" class="fab" aria-label="新建任务">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    `;const k=a.querySelector('[data-region="list"]'),x=a.querySelector('[data-region="pinned"]');q(k,d=>f.getState().tasks.find($=>$.id===d),{onStatusToggle:(d,$)=>f.setStatus(d,$),onTogglePin:d=>f.togglePin(d),onEdit:d=>A({task:d,onClose:()=>{}})}),x&&q(x,d=>f.getState().tasks.find($=>$.id===d),{onStatusToggle:(d,$)=>f.setStatus(d,$),onTogglePin:d=>f.togglePin(d),onEdit:d=>A({task:d,onClose:()=>{}})}),a.querySelector('[data-act="add"]')?.addEventListener("click",()=>{A({onClose:()=>{}})}),a.querySelector('[data-act="filter"]')?.addEventListener("click",()=>{Z({filter:o,sortKey:t,sortOrder:n,onApply:d=>{o=d.filter,t=d.sortKey,n=d.sortOrder,s=!1,m()},onClose:()=>{}})}),a.querySelector('[data-act="toggle-expand"]')?.addEventListener("click",()=>{s=!s,m(),s||a.querySelector('[data-region="list"]')?.scrollIntoView({behavior:"smooth",block:"start"})}),h()}f.subscribe(()=>m()),m()}const tt={createdAt:"创建时间",completedAt:"完成时间",tag:"标签"},et={all:"全部任务",todo:"未完成",done:"已完成",cancelled:"已取消"};function nt(e){let t=0;return e.status!=="all"&&t++,e.tag!=="all"&&t++,(e.createdFrom||e.createdTo)&&t++,(e.completedFrom||e.completedTo)&&t++,t}function st(e){const t=e.tasks.length,n=e.tasks.filter(a=>a.status==="done").length,o=e.tasks.filter(a=>a.status==="todo").length,s=e.tasks.filter(a=>at(a.createdAt)).length;return`共 ${t} 条 · 待办 ${o} · 已完成 ${n} · 今日新增 ${s}`}function at(e){const t=new Date(e),n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate()}function ot(){return`
    <div class="card py-12 flex flex-col items-center text-center px-6">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d8cdba" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 13l3-8h12l3 8v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z"/>
        <path d="M3 13h5l2 3h4l2-3h5"/>
      </svg>
      <p class="mt-3 text-[14px] text-ink-soft">这里还没有任务</p>
      <p class="mt-1 text-[12.5px] text-ink-soft/80">点击右下角 + 新建一条吧</p>
    </div>
  `}X();export{T as e,f as s};
