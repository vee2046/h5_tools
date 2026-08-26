(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const K="todo-h5:v1";function U(){return{tasks:[],tags:[]}}function Z(){if(typeof window>"u")return U();try{const e=window.localStorage.getItem(K);if(!e)return U();const t=JSON.parse(e);return{tasks:Array.isArray(t.tasks)?t.tasks:[],tags:Array.isArray(t.tags)?t.tags.filter(n=>typeof n=="string"):[]}}catch(e){return console.warn("[storage] 读取本地数据失败，已重置：",e),U()}}function Q(e){if(!(typeof window>"u"))try{window.localStorage.setItem(K,JSON.stringify(e))}catch(t){console.warn("[storage] 写入本地数据失败：",t)}}function tt(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,10)}`}class et{constructor(){this.listeners=new Set,this.state=Z()}getState(){return this.state}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}emit(){Q(this.state),this.listeners.forEach(t=>t(this.state))}addTask(t){const n=Date.now(),s={id:tt(),content:t.content.trim(),createdAt:n,completedAt:t.completedAt??null,tags:O(t.tags),status:"todo",pinned:!1,pinnedAt:null};return this.state={...this.state,tasks:[s,...this.state.tasks]},this.syncTagsFromTasks(),this.emit(),s}updateTask(t,n){this.state={...this.state,tasks:this.state.tasks.map(s=>{if(s.id!==t)return s;const o={...s};return n.content!==void 0&&(o.content=n.content.trim()),n.tags!==void 0&&(o.tags=O(n.tags)),n.completedAt!==void 0&&(o.completedAt=n.completedAt),n.status!==void 0&&(o.status=n.status),o})},this.syncTagsFromTasks(),this.emit()}removeTask(t){this.state={...this.state,tasks:this.state.tasks.filter(n=>n.id!==t)},this.syncTagsFromTasks(),this.emit()}removeNonCurrentMonthTasks(){const t=new Date,n=t.getFullYear(),s=t.getMonth(),o=this.state.tasks.length;this.state={...this.state,tasks:this.state.tasks.filter(r=>{const i=new Date(r.createdAt);return i.getFullYear()===n&&i.getMonth()===s})};const a=o-this.state.tasks.length;return a>0&&(this.syncTagsFromTasks(),this.emit()),a}setStatus(t,n){this.state={...this.state,tasks:this.state.tasks.map(s=>{if(s.id!==t)return s;const o={...s,status:n};return n==="done"&&!o.completedAt&&(o.completedAt=Date.now()),n==="todo"&&(o.completedAt=null),o})},this.emit()}togglePin(t){this.state={...this.state,tasks:this.state.tasks.map(n=>{if(n.id!==t)return n;const s=!n.pinned;return{...n,pinned:s,pinnedAt:s?Date.now():null}})},this.emit()}addTag(t){const n=t.trim();return n?(this.state.tags.includes(n)||(this.state={...this.state,tags:[...this.state.tags,n]},this.emit()),n):null}renameTag(t,n){const s=t.trim(),o=n.trim();!s||!o||s===o||(this.state.tags.includes(o)?this.state={...this.state,tags:this.state.tags.filter(a=>a!==s),tasks:this.state.tasks.map(a=>({...a,tags:a.tags.map(r=>r===s?o:r).filter((r,i,d)=>d.indexOf(r)===i)}))}:this.state={...this.state,tags:this.state.tags.map(a=>a===s?o:a),tasks:this.state.tasks.map(a=>({...a,tags:a.tags.map(r=>r===s?o:r)}))},this.emit())}removeTag(t){this.state={...this.state,tags:this.state.tags.filter(n=>n!==t),tasks:this.state.tasks.map(n=>({...n,tags:n.tags.filter(s=>s!==t)}))},this.emit()}syncTagsFromTasks(){const t=new Set(this.state.tags);for(const n of this.state.tasks)for(const s of n.tags)t.add(s);this.state={...this.state,tags:Array.from(t)}}getPinned(t=3){return this.state.tasks.filter(n=>n.pinned).sort((n,s)=>(s.pinnedAt??0)-(n.pinnedAt??0)).slice(0,t)}countPinned(){return this.state.tasks.filter(t=>t.pinned).length}query(t,n,s){const o=this.state.tasks.filter(i=>!(i.pinned||t.status!=="all"&&i.status!==t.status||t.tag!=="all"&&!i.tags.includes(t.tag)||t.createdFrom!==null&&i.createdAt<t.createdFrom||t.createdTo!==null&&i.createdAt>t.createdTo||t.completedFrom!==null&&(!i.completedAt||i.completedAt<t.completedFrom)||t.completedTo!==null&&(!i.completedAt||i.completedAt>t.completedTo))),a=s==="asc"?1:-1,r="createdAt";return o.sort((i,d)=>q(i,d,n,r)*a),o}}function q(e,t,n,s){if(n==="tag"){const o=e.tags[0]??"",a=t.tags[0]??"";return o!==a?o.localeCompare(a,"zh-CN"):q(e,t,s,"createdAt")}if(n==="completedAt"){const o=e.completedAt??0,a=t.completedAt??0;return o!==a?o-a:q(e,t,s,"createdAt")}return e.createdAt-t.createdAt}function O(e){if(!e)return[];const t=new Set,n=[];for(const s of e){const o=s.trim();o&&!t.has(o)&&(t.add(o),n.push(o))}return n}const v=new et;function $(e){return e<10?`0${e}`:String(e)}function H(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function B(e){if(!e)return"";const t=new Date(e),n=new Date,s=new Date(n.getFullYear(),n.getMonth(),n.getDate()-1),o=`${$(t.getHours())}:${$(t.getMinutes())}`;return H(t,n)?o:H(t,s)?`昨天 ${o}`:`${$(t.getMonth()+1)}-${$(t.getDate())} ${o}`}function nt(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}-${$(t.getMonth()+1)}-${$(t.getDate())}T${$(t.getHours())}:${$(t.getMinutes())}`}function st(e){if(!e)return null;const t=new Date(e).getTime();return Number.isFinite(t)?t:null}function L(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}-${$(t.getMonth()+1)}-${$(t.getDate())}`}function T(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ot(e){return e==="todo"?"done":e==="done"?"cancelled":"todo"}function at(e){return e==="done"?'<span class="inline-flex items-center gap-1 text-done"><span style="width:6px;height:6px;border-radius:50%;background:var(--done);display:inline-block"></span>已完成</span>':e==="cancelled"?'<span class="inline-flex items-center gap-1 text-cancel"><span style="width:6px;height:6px;border-radius:50%;background:var(--cancel);display:inline-block"></span>已取消</span>':'<span class="inline-flex items-center gap-1 text-ink-soft"><span style="width:6px;height:6px;border-radius:50%;background:#d8cdba;display:inline-block"></span>未完成</span>'}function _(e){const t=e.status!=="todo"?"strike":"",n=e.status==="done"?"done":e.status==="cancelled"?"cancelled":"todo",s=e.status==="done"?'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="animate-check-draw" style="stroke-dasharray:24;stroke-dashoffset:0"><path d="M5 12.5l4.5 4.5L19 7"/></svg>':e.status==="cancelled"?'<span style="width:10px;height:2px;background:currentColor;border-radius:1px"></span>':"",o=e.tags.map(r=>`<span class="chip" style="padding:2px 8px;font-size:11px;line-height:1.5">#${T(r)}</span>`).join(""),a=[`<span class="tnum">创建 ${B(e.createdAt)}</span>`,e.completedAt?`<span class="tnum">完成 ${B(e.completedAt)}</span>`:""].filter(Boolean).join('<span class="text-line">·</span>');return`
  <article class="card ${e.pinned?"card-pinned":""} p-3 flex gap-3 items-start animate-fade-up" data-id="${e.id}">
    <button class="status-dot ${n} mt-0.5" data-act="cycle-status" aria-label="切换状态">
      ${s}
    </button>
    <div class="flex-1 min-w-0" data-act="edit">
      <p class="text-[15px] leading-[1.5] break-words ${t}">${T(e.content)}</p>
      ${o?`<div class="flex flex-wrap gap-1.5 mt-2">${o}</div>`:""}
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
  </article>`}function rt(e){const t=e.status==="done"?"done":e.status==="cancelled"?"cancelled":"todo",n=e.status==="done"?'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>':e.status==="cancelled"?'<span style="width:8px;height:2px;background:currentColor;border-radius:1px"></span>':"",s=e.content.length>36?e.content.slice(0,36)+"…":e.content;return`
  <article class="card card-pinned p-3 w-[72%] shrink-0 animate-fade-up" data-id="${e.id}">
    <div class="flex items-start gap-2">
      <button class="status-dot ${t}" style="width:20px;height:20px" data-act="cycle-status" aria-label="切换状态">
        ${n}
      </button>
      <p class="flex-1 text-[14px] leading-snug break-words min-w-0 ${e.status!=="todo"?"strike":""}" data-act="edit">${T(s)}</p>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-accent shrink-0 mt-0.5">
        <path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/>
      </svg>
    </div>
    <div class="flex items-center gap-1.5 mt-2 text-[11px] text-ink-soft">
      ${at(e.status)}
      <span>·</span>
      <span class="tnum">${B(e.createdAt)}</span>
    </div>
  </article>`}function V(e,t,n){const s=o=>{const a=o.target,r=a.closest("[data-id]");if(!r||!e.contains(r))return;const i=r.dataset.id,d=t(i);if(!d)return;const g=a.closest("[data-act]");if(!g)return;const h=g.dataset.act;h==="cycle-status"?n.onStatusToggle(i,ot(d.status)):h==="pin"?n.onTogglePin(i):h==="edit"&&n.onEdit(d)};return e.addEventListener("click",s),()=>e.removeEventListener("click",s)}const lt="modulepreload",it=function(e,t){return new URL(e,t).href},z={},ct=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){let g=function(h){return Promise.all(h.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const r=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),d=i?.nonce||i?.getAttribute("nonce");o=g(n.map(h=>{if(h=it(h,s),h in z)return;z[h]=!0;const c=h.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(s)for(let p=r.length-1;p>=0;p--){const y=r[p];if(y.href===h&&(!c||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${u}`))return;const l=document.createElement("link");if(l.rel=c?"stylesheet":lt,c||(l.as="script"),l.crossOrigin="",l.href=h,d&&l.setAttribute("nonce",d),document.head.appendChild(l),c)return new Promise((p,y)=>{l.addEventListener("load",p),l.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${h}`)))})}))}function a(r){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=r,window.dispatchEvent(i),!i.defaultPrevented)throw r}return o.then(r=>{for(const i of r||[])i.status==="rejected"&&a(i.reason);return t().catch(a)})};function D(e){const{task:t}=e,n=!!t;v.getState();let s=t?.content??"",o=new Set(t?.tags??[]),a=t?.completedAt??null,r=t?.pinned??!1;const i=document.createElement("div");i.className="backdrop";const d=document.createElement("div");d.className="sheet",d.innerHTML=`
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

      ${n?`<button data-act="toggle-pin" class="mt-4 w-full btn ${r?"btn-primary":"btn-ghost"} flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${r?"currentColor":"none"}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/></svg>
              <span>${r?"已置顶（点击取消）":"置顶此任务"}</span>
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
  `,document.body.appendChild(i),document.body.appendChild(d);const g=d.querySelector('[data-field="content"]'),h=d.querySelector('[data-region="tags"]'),c=d.querySelector('[data-field="new-tag"]'),u=d.querySelector('[data-field="completed-at"]');g.value=s,u.value=nt(a);function l(){const k=v.getState().tags;if(k.length===0){h.innerHTML='<span class="text-[12.5px] text-ink-soft">还没有标签，在下方输入即可创建</span>';return}h.innerHTML=k.map(f=>`<button type="button" class="tag-pick ${o.has(f)?"selected":""}" data-tag="${T(f)}">#${T(f)}</button>`).join("")}l(),setTimeout(()=>g.focus(),50);function p(){i.remove(),d.remove(),e.onClose()}function y(){const k=g.value.trim();if(!k){g.focus(),g.style.borderColor="var(--danger)";return}const f=st(u.value),x=Array.from(o);if(n&&t)v.updateTask(t.id,{content:k,tags:x,completedAt:f});else if(v.addTask({content:k,tags:x,completedAt:f}),r){const b=v.getState().tasks[0];b&&b.content}p()}d.addEventListener("click",k=>{const f=k.target.closest("[data-act],[data-tag]");if(!f)return;const x=f.dataset.act;if(x==="close"||x==="cancel")p();else if(x==="save")y();else if(x==="delete"&&t)confirm("确定删除这条任务？删除后无法恢复。")&&(v.removeTask(t.id),p());else if(x==="toggle-pin"&&t){v.togglePin(t.id),r=!r;const b=f;b.classList.toggle("btn-primary",r),b.classList.toggle("btn-ghost",!r),b.querySelector("svg").setAttribute("fill",r?"currentColor":"none"),b.querySelector("span").textContent=r?"已置顶（点击取消）":"置顶此任务"}else if(x==="clear-completed")u.value="";else if(x==="manage-tags")ct(async()=>{const{openTagManager:b}=await import("./tag-manager-yErvbsvy.js");return{openTagManager:b}},[],import.meta.url).then(({openTagManager:b})=>{b({onChange:l})});else if(f.dataset.tag){const b=f.dataset.tag;o.has(b)?o.delete(b):o.add(b),l()}}),c.addEventListener("keydown",k=>{if(k.key==="Enter"){k.preventDefault();const f=c.value.trim();if(f){const x=v.addTag(f);x&&o.add(x),c.value="",l()}}}),g.addEventListener("input",()=>{g.style.borderColor=""}),i.addEventListener("click",p)}const dt=[{value:"all",label:"全部"},{value:"todo",label:"未完成"},{value:"done",label:"已完成"},{value:"cancelled",label:"已取消"}],ut=[{value:"createdAt",label:"创建时间"},{value:"completedAt",label:"完成时间"},{value:"tag",label:"标签"}];function pt(e){let t={...e.filter},n=e.sortKey,s=e.sortOrder;const o=document.createElement("div");o.className="backdrop";const a=document.createElement("div");a.className="sheet";function r(){const l=v.getState().tags;a.innerHTML=`
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
              ${ut.map(p=>`<button type="button" data-sort="${p.value}" class="${n===p.value?"on":""}">${p.label}</button>`).join("")}
            </div>
            <button data-act="toggle-order" class="btn btn-ghost shrink-0 !px-3" type="button" title="切换升降序">
              ${s==="desc"?"降序 ↓":"升序 ↑"}
            </button>
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">状态</h3>
          <div class="seg grid grid-cols-4 w-full">
            ${dt.map(p=>`<button type="button" data-status="${p.value}" class="${t.status===p.value?"on":""}">${p.label}</button>`).join("")}
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">标签</h3>
          <div class="flex flex-wrap gap-2">
            <button type="button" data-tag="all" class="tag-pick ${t.tag==="all"?"selected":""}">全部</button>
            ${l.map(p=>`<button type="button" data-tag="${T(p)}" class="tag-pick ${t.tag===p?"selected":""}">#${T(p)}</button>`).join("")}
            ${l.length===0?'<span class="text-[12.5px] text-ink-soft">暂无标签</span>':""}
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">创建时间</h3>
          <div class="grid grid-cols-2 gap-2">
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">起</span>
              <input type="date" data-field="created-from" class="field" value="${t.createdFrom?L(t.createdFrom):""}" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">止</span>
              <input type="date" data-field="created-to" class="field" value="${t.createdTo?L(t.createdTo):""}" />
            </label>
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">完成时间</h3>
          <div class="grid grid-cols-2 gap-2">
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">起</span>
              <input type="date" data-field="completed-from" class="field" value="${t.completedFrom?L(t.completedFrom):""}" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">止</span>
              <input type="date" data-field="completed-to" class="field" value="${t.completedTo?L(t.completedTo):""}" />
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
    `}function i(){o.remove(),a.remove()}function d(){e.onApply({filter:t,sortKey:n,sortOrder:s}),i()}function g(){t={status:"all",tag:"all",createdFrom:null,createdTo:null,completedFrom:null,completedTo:null},n="createdAt",s="desc",r(),u()}function h(l){if(!l)return null;const p=new Date(l+"T00:00:00").getTime();return Number.isFinite(p)?p:null}function c(l){if(!l)return null;const p=new Date(l+"T23:59:59").getTime();return Number.isFinite(p)?p:null}function u(){a.querySelectorAll("[data-status]").forEach(l=>{l.addEventListener("click",()=>{t={...t,status:l.dataset.status},r(),u()})}),a.querySelectorAll("[data-tag]").forEach(l=>{l.addEventListener("click",()=>{const p=l.dataset.tag;t={...t,tag:p==="all"?"all":p},r(),u()})}),a.querySelectorAll("[data-sort]").forEach(l=>{l.addEventListener("click",()=>{n=l.dataset.sort,r(),u()})}),a.querySelector('[data-act="toggle-order"]')?.addEventListener("click",()=>{s=s==="desc"?"asc":"desc",r(),u()}),a.querySelector('[data-field="created-from"]')?.addEventListener("change",l=>{t.createdFrom=h(l.target.value)}),a.querySelector('[data-field="created-to"]')?.addEventListener("change",l=>{t.createdTo=c(l.target.value)}),a.querySelector('[data-field="completed-from"]')?.addEventListener("change",l=>{t.completedFrom=h(l.target.value)}),a.querySelector('[data-field="completed-to"]')?.addEventListener("change",l=>{t.completedTo=c(l.target.value)}),a.querySelector('[data-act="close"]')?.addEventListener("click",i),a.querySelector('[data-act="cancel"]')?.addEventListener("click",i),a.querySelector('[data-act="apply"]')?.addEventListener("click",d),a.querySelector('[data-act="reset"]')?.addEventListener("click",g)}r(),u(),o.addEventListener("click",i),document.body.appendChild(o),document.body.appendChild(a)}function mt(e){const t=new Date(e),n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()}function j(e){return e.filter(t=>!mt(t.createdAt))}function ht(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function S(e){return e<10?`0${e}`:String(e)}function M(e){return e==="done"?"已完成":e==="cancelled"?"已取消":"未完成"}function Y(e){const t=Date.UTC(1899,11,30);return(e-t)/864e5}const ft=(()=>{const e=new Array(256);for(let t=0;t<256;t++){let n=t;for(let s=0;s<8;s++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function gt(e){let t=4294967295;for(let n=0;n<e.length;n++)t=ft[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}const X=new TextEncoder;function vt(e){const t=e.map(c=>{const u=X.encode(c.content);return{name:c.name,data:u,crc:gt(u),size:u.length,offset:0,nameBytes:X.encode(c.name)}}),n=[];let s=0;for(const c of t){c.offset=s;const u=new Uint8Array(30+c.nameBytes.length),l=new DataView(u.buffer);l.setUint32(0,67324752,!0),l.setUint16(4,20,!0),l.setUint16(6,0,!0),l.setUint16(8,0,!0),l.setUint16(10,0,!0),l.setUint16(12,33,!0),l.setUint32(14,c.crc,!0),l.setUint32(18,c.size,!0),l.setUint32(22,c.size,!0),l.setUint16(26,c.nameBytes.length,!0),l.setUint16(28,0,!0),u.set(c.nameBytes,30),n.push(u,c.data),s+=u.length+c.data.length}const o=s;for(const c of t){const u=new Uint8Array(46+c.nameBytes.length),l=new DataView(u.buffer);l.setUint32(0,33639248,!0),l.setUint16(4,788,!0),l.setUint16(6,20,!0),l.setUint16(8,0,!0),l.setUint16(10,0,!0),l.setUint16(12,0,!0),l.setUint16(14,33,!0),l.setUint32(16,c.crc,!0),l.setUint32(20,c.size,!0),l.setUint32(24,c.size,!0),l.setUint16(28,c.nameBytes.length,!0),l.setUint16(30,0,!0),l.setUint16(32,0,!0),l.setUint16(34,0,!0),l.setUint16(36,0,!0),l.setUint32(38,0,!0),l.setUint32(42,c.offset,!0),u.set(c.nameBytes,46),n.push(u),s+=u.length}const a=s-o,r=new Uint8Array(22),i=new DataView(r.buffer);i.setUint32(0,101010256,!0),i.setUint16(4,0,!0),i.setUint16(6,0,!0),i.setUint16(8,t.length,!0),i.setUint16(10,t.length,!0),i.setUint32(12,a,!0),i.setUint32(16,o,!0),i.setUint16(20,0,!0),n.push(r);const d=n.reduce((c,u)=>c+u.length,0),g=new Uint8Array(d);let h=0;for(const c of n)g.set(c,h),h+=c.length;return g}function xt(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
</Types>`}function bt(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`}function yt(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <workbookPr defaultThemeVersion="124226"/>
  <bookViews>
    <workbookView activeTab="0"/>
  </bookViews>
  <sheets>
    <sheet name="任务列表" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`}function kt(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>`}function wt(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="1">
    <numFmt numFmtId="164" formatCode="yyyy-mm-dd hh:mm"/>
  </numFmts>
  <fonts count="1">
    <font><sz val="11"/><name val="Microsoft YaHei"/></font>
  </fonts>
  <fills count="1">
    <fill><patternFill patternType="none"/></fill>
  </fills>
  <borders count="1">
    <border>
      <left/><right/><top/><bottom/><diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1"/>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyNumberFormat="1"/>
  </cellXfs>
  <cellStyles count="1">
    <cellStyle name="Normal" xfId="0" builtinId="0"/>
  </cellStyles>
</styleSheet>`}function P(e){let t="";for(;e>0;){const n=(e-1)%26;t=String.fromCharCode(65+n)+t,e=Math.floor((e-1)/26)}return t}function $t(e){const t=[],n=new Map,s=r=>{const i=r??"",d=n.get(i);if(d!==void 0)return d;const g=t.length;return t.push(i),n.set(i,g),g},o=["序号","任务内容","状态","标签","创建时间","完成时间","是否置顶"];for(const r of o)s(r);s(M("todo")),s(M("done")),s(M("cancelled")),s("是"),s("否");for(const r of e)s(r.content),s(r.tags.join(", ")),s(M(r.status)),s(r.pinned?"是":"否");return{xml:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${t.length}" uniqueCount="${t.length}">
${t.map(r=>`<si><t xml:space="preserve">${ht(r)}</t></si>`).join("")}
</sst>`,indexOf:s}}function E(e,t,n){return`<c r="${P(e)}${t}" t="s"><v>${n}</v></c>`}function I(e,t,n,s){return`<c r="${P(e)}${t}" s="${s}"><v>${n}</v></c>`}function Tt(e,t){return`<c r="${P(e)}${t}"/>`}function St(e,t){const s=["序号","任务内容","状态","标签","创建时间","完成时间","是否置顶"].map((r,i)=>E(i+1,1,t(r))).join(""),o=e.map((r,i)=>{const d=i+2,g=[I(1,d,i+1,0),E(2,d,t(r.content)),E(3,d,t(M(r.status))),E(4,d,t(r.tags.join(", "))),I(5,d,Y(r.createdAt),1),r.completedAt?I(6,d,Y(r.completedAt),1):Tt(6,d),E(7,d,t(r.pinned?"是":"否"))];return`<row r="${d}">${g.join("")}</row>`}).join("");return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="A1:G${e.length+1}"/>
  <sheetViews>
    <sheetView workbookViewId="0" showGridLines="1">
      <selection activeCell="A1" sqref="A1"/>
    </sheetView>
  </sheetViews>
  <sheetFormatPr defaultRowHeight="15"/>
  <cols>
    <col min="1" max="1" width="6" customWidth="1"/>
    <col min="2" max="2" width="40" customWidth="1"/>
    <col min="3" max="3" width="10" customWidth="1"/>
    <col min="4" max="4" width="20" customWidth="1"/>
    <col min="5" max="5" width="18" customWidth="1"/>
    <col min="6" max="6" width="18" customWidth="1"/>
    <col min="7" max="7" width="10" customWidth="1"/>
  </cols>
  <sheetData>
    <row r="1">${s}</row>${o}
  </sheetData>
</worksheet>`}function Et(e){const t=$t(e),n=[{name:"[Content_Types].xml",content:xt()},{name:"_rels/.rels",content:bt()},{name:"xl/workbook.xml",content:yt()},{name:"xl/_rels/workbook.xml.rels",content:kt()},{name:"xl/styles.xml",content:wt()},{name:"xl/sharedStrings.xml",content:t.xml},{name:"xl/worksheets/sheet1.xml",content:St(e,t.indexOf)}];return vt(n)}function Ct(e,t,n){const s=new Blob([t],{type:n}),o=URL.createObjectURL(s),a=document.createElement("a");a.href=o,a.download=e,a.style.display="none",document.body.appendChild(a),a.click(),setTimeout(()=>{document.body.removeChild(a),URL.revokeObjectURL(o)},0)}function At(e,t="tasks"){const n=new Date,s=`${n.getFullYear()}${S(n.getMonth()+1)}${S(n.getDate())}_${S(n.getHours())}${S(n.getMinutes())}${S(n.getSeconds())}`,o=`${t}_${s}.xlsx`,a=Et(e);Ct(o,a,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}const Mt={status:"all",tag:"all",createdFrom:null,createdTo:null,completedFrom:null,completedTo:null},W=10;function Lt(){const e=document.getElementById("app");if(!e){console.error("App element not found");return}let t="createdAt",n="desc",s={...Mt},o=!1;const a=document.createElement("div");a.className="min-h-screen",e.appendChild(a);const r=document.createElement("div");r.className="fab-stack",r.innerHTML=`
    <button class="fab-mini" data-fab="to-top" aria-label="滚动到顶部" title="回到顶部">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
    <button class="fab-mini" data-fab="to-bottom" aria-label="滚动到底部" title="滚动到底部">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
    </button>
  `,e.appendChild(r);const i=r.querySelector('[data-fab="to-top"]'),d=r.querySelector('[data-fab="to-bottom"]');function g(){const u=window.scrollY||document.documentElement.scrollTop,l=window.innerHeight,p=document.documentElement.scrollHeight,y=l*.9,k=u>y;r.classList.toggle("is-visible",k);const f=p-u-l;d.classList.toggle("is-hidden",f<l*.4)}let h=!1;window.addEventListener("scroll",()=>{h||(window.requestAnimationFrame(()=>{g(),h=!1}),h=!0)},{passive:!0}),window.addEventListener("resize",g),i.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),d.addEventListener("click",()=>{window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})});function c(){const u=v.getState(),l=v.getPinned(3),p=v.countPinned(),y=v.query(s,t,n),f=j(u.tasks).length,x=Dt(s),b=Ft[t];a.innerHTML=`
      <header class="pt-[calc(env(safe-area-inset-top)+12px)] pb-3">
        <div class="shell">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0 flex-1">
              <h1 class="text-[20px] font-semibold tracking-tight leading-tight">任务管理</h1>
              <p class="text-[12px] text-ink-soft mt-0.5 truncate">${jt(u)}</p>
            </div>
            <button data-act="filter" class="relative btn btn-ghost !px-3 !py-2 shrink-0" aria-label="筛选与排序">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>
              <span class="ml-1 text-[13px]">${b}</span>
              ${x>0?`<span class="absolute -top-1 -right-1 bg-accent text-white text-[10px] leading-none rounded-full min-w-[16px] h-[16px] inline-flex items-center justify-center px-1">${x}</span>`:""}
            </button>
          </div>
        </div>
      </header>

      <main class="shell pt-0 pb-[calc(80px+env(safe-area-inset-bottom))] space-y-4">        ${l.length>0?`<section>
                <div class="flex items-center justify-between mb-1.5 px-1">
                  <h2 class="text-[12.5px] text-ink-soft font-medium flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" class="text-accent"><path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/></svg>
                    置顶
                  </h2>
                  ${p>3?`<span class="text-[12px] text-ink-soft">还有 ${p-3} 条置顶</span>`:""}
                </div>
                ${p<=3?`<div class="space-y-2" data-region="pinned">${l.map(m=>_(m)).join("")}</div>`:`<div class="flex gap-2.5 overflow-x-auto no-scrollbar pb-1" data-region="pinned" style="margin-left:calc(-16px - env(safe-area-inset-left));margin-right:calc(-16px - env(safe-area-inset-right));padding-left:calc(16px + env(safe-area-inset-left));padding-right:calc(16px + env(safe-area-inset-right));">${l.map(m=>rt(m)).join("")}</div>`}
              </section>`:""}

        <section>
          <div class="flex items-center justify-between mb-1.5 px-1 gap-2">
            <h2 class="text-[12.5px] text-ink-soft font-medium min-w-0 truncate">
              ${Ut[s.status]??"全部任务"}
              <span class="text-ink-soft/70">· ${y.length}</span>
            </h2>
            <div class="flex items-center gap-1.5 shrink-0">
              <button data-act="download-history" class="btn-action ${f===0?"is-disabled":""}" type="button" aria-label="下载非本月任务" title="${f>0?`下载非本月任务（${f} 条）`:"暂无非本月任务可下载"}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>
                <span>下载</span>
                ${f>0?`<span class="btn-action-badge">${f}</span>`:""}
              </button>
              <button data-act="delete-history" class="btn-action btn-action-danger ${f===0?"is-disabled":""}" type="button" aria-label="删除非本月任务" title="${f>0?`删除非本月任务（${f} 条）`:"暂无非本月任务可删除"}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></svg>
                <span>删除</span>
                ${f>0?`<span class="btn-action-badge">${f}</span>`:""}
              </button>
            </div>
          </div>
          <div class="space-y-2" data-region="list">
            ${y.length>0?(o?y:y.slice(0,W)).map(m=>_(m)).join(""):qt()}
          </div>
          ${y.length>W?`<button data-act="toggle-expand" class="mt-3 w-full btn btn-ghost !text-[13px] !text-ink-soft flex items-center justify-center gap-1">
                  ${o?`收起
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>`:`显示全部（${y.length}）
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`}
                </button>`:""}
        </section>
      </main>

      <button data-act="add" class="fab" aria-label="新建任务">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    `;const R=a.querySelector('[data-region="list"]'),N=a.querySelector('[data-region="pinned"]');V(R,m=>v.getState().tasks.find(w=>w.id===m),{onStatusToggle:(m,w)=>v.setStatus(m,w),onTogglePin:m=>v.togglePin(m),onEdit:m=>D({task:m,onClose:()=>{}})}),N&&V(N,m=>v.getState().tasks.find(w=>w.id===m),{onStatusToggle:(m,w)=>v.setStatus(m,w),onTogglePin:m=>v.togglePin(m),onEdit:m=>D({task:m,onClose:()=>{}})}),a.querySelector('[data-act="add"]')?.addEventListener("click",()=>{D({onClose:()=>{}})}),a.querySelector('[data-act="filter"]')?.addEventListener("click",()=>{pt({filter:s,sortKey:t,sortOrder:n,onApply:m=>{s=m.filter,t=m.sortKey,n=m.sortOrder,o=!1,c()},onClose:()=>{}})}),a.querySelector('[data-act="toggle-expand"]')?.addEventListener("click",()=>{o=!o,c(),o||a.querySelector('[data-region="list"]')?.scrollIntoView({behavior:"smooth",block:"start"})}),a.querySelector('[data-act="download-history"]')?.addEventListener("click",()=>{const m=j(v.getState().tasks);if(m.length===0){A("暂无非本月任务可下载");return}try{At(m,"历史任务"),A(`已导出 ${m.length} 条非本月任务`)}catch(w){console.error("[export] 导出失败：",w),A("导出失败，请重试")}}),a.querySelector('[data-act="delete-history"]')?.addEventListener("click",()=>{const m=j(v.getState().tasks);if(m.length===0){A("暂无非本月任务可删除");return}const w=m.slice(0,3).map(F=>F.content).join(`
· `),G=m.length>3?`
· ……等共 ${m.length} 条任务`:"",J=`确定要删除 ${m.length} 条非本月任务吗？
删除后无法恢复，建议先点击「下载」备份。

涉及任务：
· ${w}${G}`;if(confirm(J)){const F=v.removeNonCurrentMonthTasks();A(`已删除 ${F} 条非本月任务`)}}),g()}v.subscribe(()=>c()),c()}const Ft={createdAt:"创建时间",completedAt:"完成时间",tag:"标签"},Ut={all:"全部任务",todo:"未完成",done:"已完成",cancelled:"已取消"};function Dt(e){let t=0;return e.status!=="all"&&t++,e.tag!=="all"&&t++,(e.createdFrom||e.createdTo)&&t++,(e.completedFrom||e.completedTo)&&t++,t}function jt(e){const t=e.tasks.length,n=e.tasks.filter(a=>a.status==="done").length,s=e.tasks.filter(a=>a.status==="todo").length,o=e.tasks.filter(a=>It(a.createdAt)).length;return`共 ${t} 条 · 待办 ${s} · 已完成 ${n} · 今日新增 ${o}`}function It(e){const t=new Date(e),n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate()}function qt(){return`
    <div class="card py-12 flex flex-col items-center text-center px-6">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d8cdba" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 13l3-8h12l3 8v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z"/>
        <path d="M3 13h5l2 3h4l2-3h5"/>
      </svg>
      <p class="mt-3 text-[14px] text-ink-soft">这里还没有任务</p>
      <p class="mt-1 text-[12.5px] text-ink-soft/80">点击右下角 + 新建一条吧</p>
    </div>
  `}let C=null;function A(e){const t=document.getElementById("app-toast");t&&t.remove(),C!==null&&(window.clearTimeout(C),C=null);const n=document.createElement("div");n.id="app-toast",n.className="app-toast",n.textContent=e,document.body.appendChild(n),C=window.setTimeout(()=>{n.classList.add("is-leaving"),window.setTimeout(()=>{n.remove(),C=null},220)},1800)}Lt();export{T as e,v as s};
