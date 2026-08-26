(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const K="todo-h5:v1";function I(){return{tasks:[],tags:[]}}function Z(){if(typeof window>"u")return I();try{const e=window.localStorage.getItem(K);if(!e)return I();const t=JSON.parse(e);return{tasks:Array.isArray(t.tasks)?t.tasks.map(n=>({...n,dueAt:n.dueAt??null})):[],tags:Array.isArray(t.tags)?t.tags.filter(n=>typeof n=="string"):[]}}catch(e){return console.warn("[storage] 读取本地数据失败，已重置：",e),I()}}function Q(e){if(!(typeof window>"u"))try{window.localStorage.setItem(K,JSON.stringify(e))}catch(t){console.warn("[storage] 写入本地数据失败：",t)}}function tt(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,10)}`}class et{constructor(){this.listeners=new Set,this.state=Z()}getState(){return this.state}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}emit(){Q(this.state),this.listeners.forEach(t=>t(this.state))}addTask(t){const n=Date.now(),s={id:tt(),content:t.content.trim(),createdAt:n,completedAt:null,dueAt:t.dueAt??null,tags:O(t.tags),status:"todo",pinned:!1,pinnedAt:null};return this.state={...this.state,tasks:[s,...this.state.tasks]},this.syncTagsFromTasks(),this.emit(),s}updateTask(t,n){this.state={...this.state,tasks:this.state.tasks.map(s=>{if(s.id!==t)return s;const o={...s};return n.content!==void 0&&(o.content=n.content.trim()),n.tags!==void 0&&(o.tags=O(n.tags)),n.dueAt!==void 0&&(o.dueAt=n.dueAt),n.status!==void 0&&(o.status=n.status),o})},this.syncTagsFromTasks(),this.emit()}removeTask(t){this.state={...this.state,tasks:this.state.tasks.filter(n=>n.id!==t)},this.syncTagsFromTasks(),this.emit()}removeNonCurrentMonthTasks(){const t=new Date,n=t.getFullYear(),s=t.getMonth(),o=this.state.tasks.length;this.state={...this.state,tasks:this.state.tasks.filter(l=>{const i=new Date(l.createdAt);return i.getFullYear()===n&&i.getMonth()===s})};const a=o-this.state.tasks.length;return a>0&&(this.syncTagsFromTasks(),this.emit()),a}setStatus(t,n){this.state={...this.state,tasks:this.state.tasks.map(s=>{if(s.id!==t)return s;const o={...s,status:n};return n==="done"&&!o.completedAt&&(o.completedAt=Date.now()),n==="todo"&&(o.completedAt=null),o})},this.emit()}togglePin(t){this.state={...this.state,tasks:this.state.tasks.map(n=>{if(n.id!==t)return n;const s=!n.pinned;return{...n,pinned:s,pinnedAt:s?Date.now():null}})},this.emit()}addTag(t){const n=t.trim();return n?(this.state.tags.includes(n)||(this.state={...this.state,tags:[...this.state.tags,n]},this.emit()),n):null}renameTag(t,n){const s=t.trim(),o=n.trim();!s||!o||s===o||(this.state.tags.includes(o)?this.state={...this.state,tags:this.state.tags.filter(a=>a!==s),tasks:this.state.tasks.map(a=>({...a,tags:a.tags.map(l=>l===s?o:l).filter((l,i,u)=>u.indexOf(l)===i)}))}:this.state={...this.state,tags:this.state.tags.map(a=>a===s?o:a),tasks:this.state.tasks.map(a=>({...a,tags:a.tags.map(l=>l===s?o:l)}))},this.emit())}removeTag(t){this.state={...this.state,tags:this.state.tags.filter(n=>n!==t),tasks:this.state.tasks.map(n=>({...n,tags:n.tags.filter(s=>s!==t)}))},this.emit()}syncTagsFromTasks(){const t=new Set(this.state.tags);for(const n of this.state.tasks)for(const s of n.tags)t.add(s);this.state={...this.state,tags:Array.from(t)}}getPinned(t=3){return this.state.tasks.filter(n=>n.pinned).sort((n,s)=>(s.pinnedAt??0)-(n.pinnedAt??0)).slice(0,t)}countPinned(){return this.state.tasks.filter(t=>t.pinned).length}query(t,n,s){const o=this.state.tasks.filter(i=>!(i.pinned||t.status!=="all"&&i.status!==t.status||t.tag!=="all"&&!i.tags.includes(t.tag)||t.createdFrom!==null&&i.createdAt<t.createdFrom||t.createdTo!==null&&i.createdAt>t.createdTo||t.completedFrom!==null&&(!i.completedAt||i.completedAt<t.completedFrom)||t.completedTo!==null&&(!i.completedAt||i.completedAt>t.completedTo))),a=s==="asc"?1:-1,l="createdAt";return o.sort((i,u)=>R(i,u,n,l)*a),o}}function R(e,t,n,s){if(n==="tag"){const o=e.tags[0]??"",a=t.tags[0]??"";return o!==a?o.localeCompare(a,"zh-CN"):R(e,t,s,"createdAt")}if(n==="completedAt"){const o=e.completedAt??0,a=t.completedAt??0;return o!==a?o-a:R(e,t,s,"createdAt")}return e.createdAt-t.createdAt}function O(e){if(!e)return[];const t=new Set,n=[];for(const s of e){const o=s.trim();o&&!t.has(o)&&(t.add(o),n.push(o))}return n}const x=new et;function w(e){return e<10?`0${e}`:String(e)}function H(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function M(e){if(!e)return"";const t=new Date(e),n=new Date,s=new Date(n.getFullYear(),n.getMonth(),n.getDate()-1),o=`${w(t.getHours())}:${w(t.getMinutes())}`;return H(t,n)?o:H(t,s)?`昨天 ${o}`:`${w(t.getMonth()+1)}-${w(t.getDate())} ${o}`}function nt(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}-${w(t.getMonth()+1)}-${w(t.getDate())}T${w(t.getHours())}:${w(t.getMinutes())}`}function st(e){if(!e)return null;const t=new Date(e).getTime();return Number.isFinite(t)?t:null}function F(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}-${w(t.getMonth()+1)}-${w(t.getDate())}`}function T(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ot(e){return e==="todo"?"done":e==="done"?"cancelled":"todo"}function at(e){return e==="done"?'<span class="inline-flex items-center gap-1 text-done"><span style="width:6px;height:6px;border-radius:50%;background:var(--done);display:inline-block"></span>已完成</span>':e==="cancelled"?'<span class="inline-flex items-center gap-1 text-cancel"><span style="width:6px;height:6px;border-radius:50%;background:var(--cancel);display:inline-block"></span>已取消</span>':'<span class="inline-flex items-center gap-1 text-ink-soft"><span style="width:6px;height:6px;border-radius:50%;background:#d8cdba;display:inline-block"></span>未完成</span>'}function _(e){const t=e.status!=="todo"?"strike":"",n=e.status==="done"?"done":e.status==="cancelled"?"cancelled":"todo",s=e.status==="done"?'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="animate-check-draw" style="stroke-dasharray:24;stroke-dashoffset:0"><path d="M5 12.5l4.5 4.5L19 7"/></svg>':e.status==="cancelled"?'<span style="width:10px;height:2px;background:currentColor;border-radius:1px"></span>':"",o=e.tags.map(i=>`<span class="chip" style="padding:2px 8px;font-size:11px;line-height:1.5">#${T(i)}</span>`).join(""),a=[`<span class="tnum">创建 ${M(e.createdAt)}</span>`];e.dueAt&&a.push(`<span class="tnum">预计 ${M(e.dueAt)}</span>`),e.completedAt&&a.push(`<span class="tnum">完成 ${M(e.completedAt)}</span>`);const l=a.join('<span class="text-line">·</span>');return`
  <article class="card ${e.pinned?"card-pinned":""} p-3 flex gap-3 items-start animate-fade-up" data-id="${e.id}">
    <button class="status-dot ${n} mt-0.5" data-act="cycle-status" aria-label="切换状态">
      ${s}
    </button>
    <div class="flex-1 min-w-0" data-act="edit">
      <p class="text-[15px] leading-[1.5] break-words ${t}">${T(e.content)}</p>
      ${o?`<div class="flex flex-wrap gap-1.5 mt-2">${o}</div>`:""}
      <div class="flex items-center gap-2 mt-1.5 text-[11.5px] text-ink-soft">
        ${l}
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
      <span class="tnum">${M(e.createdAt)}</span>
    </div>
  </article>`}function V(e,t,n){const s=o=>{const a=o.target,l=a.closest("[data-id]");if(!l||!e.contains(l))return;const i=l.dataset.id,u=t(i);if(!u)return;const f=a.closest("[data-act]");if(!f)return;const h=f.dataset.act;h==="cycle-status"?n.onStatusToggle(i,ot(u.status)):h==="pin"?n.onTogglePin(i):h==="edit"&&n.onEdit(u)};return e.addEventListener("click",s),()=>e.removeEventListener("click",s)}const lt="modulepreload",it=function(e,t){return new URL(e,t).href},z={},ct=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){let f=function(h){return Promise.all(h.map(c=>Promise.resolve(c).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const l=document.getElementsByTagName("link"),i=document.querySelector("meta[property=csp-nonce]"),u=i?.nonce||i?.getAttribute("nonce");o=f(n.map(h=>{if(h=it(h,s),h in z)return;z[h]=!0;const c=h.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(s)for(let p=l.length-1;p>=0;p--){const v=l[p];if(v.href===h&&(!c||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${d}`))return;const r=document.createElement("link");if(r.rel=c?"stylesheet":lt,c||(r.as="script"),r.crossOrigin="",r.href=h,u&&r.setAttribute("nonce",u),document.head.appendChild(r),c)return new Promise((p,v)=>{r.addEventListener("load",p),r.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${h}`)))})}))}function a(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return o.then(l=>{for(const i of l||[])i.status==="rejected"&&a(i.reason);return t().catch(a)})};function q(e){const{task:t}=e,n=!!t;x.getState();let s=t?.content??"",o=new Set(t?.tags??[]),a=t?.dueAt??null;const l=t?.completedAt??null;let i=t?.pinned??!1;const u=document.createElement("div");u.className="backdrop";const f=document.createElement("div");f.className="sheet",f.innerHTML=`
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
        <span class="text-[13px] text-ink-soft mb-1.5 block">预计完成时间（可选）</span>
        <div class="flex gap-2 items-center">
          <input data-field="due-at" type="datetime-local" class="field" />
          <button data-act="clear-due" class="btn btn-ghost shrink-0" type="button">清除</button>
        </div>
        ${l?`<p class="text-[12px] text-ink-soft mt-1.5">实际完成：${T(M(l))}（标记完成时自动记录）</p>`:'<p class="text-[12px] text-ink-soft/80 mt-1.5">标记完成时会自动记录实际完成时间</p>'}
      </div>

      ${n?`<button data-act="toggle-pin" class="mt-4 w-full btn ${i?"btn-primary":"btn-ghost"} flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${i?"currentColor":"none"}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/></svg>
              <span>${i?"已置顶（点击取消）":"置顶此任务"}</span>
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
  `,document.body.appendChild(u),document.body.appendChild(f);const h=f.querySelector('[data-field="content"]'),c=f.querySelector('[data-region="tags"]'),d=f.querySelector('[data-field="new-tag"]'),r=f.querySelector('[data-field="due-at"]');h.value=s,r.value=nt(a);function p(){const g=x.getState().tags;if(g.length===0){c.innerHTML='<span class="text-[12.5px] text-ink-soft">还没有标签，在下方输入即可创建</span>';return}c.innerHTML=g.map(b=>`<button type="button" class="tag-pick ${o.has(b)?"selected":""}" data-tag="${T(b)}">#${T(b)}</button>`).join("")}p(),setTimeout(()=>h.focus(),50);function v(){u.remove(),f.remove(),e.onClose()}function L(){const g=h.value.trim();if(!g){h.focus(),h.style.borderColor="var(--danger)";return}const b=st(r.value),y=Array.from(o);n&&t?x.updateTask(t.id,{content:g,tags:y,dueAt:b}):x.addTask({content:g,tags:y,dueAt:b}),v()}f.addEventListener("click",g=>{const b=g.target.closest("[data-act],[data-tag]");if(!b)return;const y=b.dataset.act;if(y==="close"||y==="cancel")v();else if(y==="save")L();else if(y==="delete"&&t)confirm("确定删除这条任务？删除后无法恢复。")&&(x.removeTask(t.id),v());else if(y==="toggle-pin"&&t){x.togglePin(t.id),i=!i;const k=b;k.classList.toggle("btn-primary",i),k.classList.toggle("btn-ghost",!i),k.querySelector("svg").setAttribute("fill",i?"currentColor":"none"),k.querySelector("span").textContent=i?"已置顶（点击取消）":"置顶此任务"}else if(y==="clear-due")r.value="";else if(y==="manage-tags")ct(async()=>{const{openTagManager:k}=await import("./tag-manager-DthD1W4F.js");return{openTagManager:k}},[],import.meta.url).then(({openTagManager:k})=>{k({onChange:p})});else if(b.dataset.tag){const k=b.dataset.tag;o.has(k)?o.delete(k):o.add(k),p()}}),d.addEventListener("keydown",g=>{if(g.key==="Enter"){g.preventDefault();const b=d.value.trim();if(b){const y=x.addTag(b);y&&o.add(y),d.value="",p()}}}),h.addEventListener("input",()=>{h.style.borderColor=""}),u.addEventListener("click",v)}const dt=[{value:"all",label:"全部"},{value:"todo",label:"未完成"},{value:"done",label:"已完成"},{value:"cancelled",label:"已取消"}],ut=[{value:"createdAt",label:"创建时间"},{value:"completedAt",label:"完成时间"},{value:"tag",label:"标签"}];function pt(e){let t={...e.filter},n=e.sortKey,s=e.sortOrder;const o=document.createElement("div");o.className="backdrop";const a=document.createElement("div");a.className="sheet";function l(){const r=x.getState().tags;a.innerHTML=`
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
            ${r.map(p=>`<button type="button" data-tag="${T(p)}" class="tag-pick ${t.tag===p?"selected":""}">#${T(p)}</button>`).join("")}
            ${r.length===0?'<span class="text-[12.5px] text-ink-soft">暂无标签</span>':""}
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">创建时间</h3>
          <div class="grid grid-cols-2 gap-2">
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">起</span>
              <input type="date" data-field="created-from" class="field" value="${t.createdFrom?F(t.createdFrom):""}" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">止</span>
              <input type="date" data-field="created-to" class="field" value="${t.createdTo?F(t.createdTo):""}" />
            </label>
          </div>
        </section>

        <section>
          <h3 class="text-[13px] text-ink-soft mb-2">完成时间</h3>
          <div class="grid grid-cols-2 gap-2">
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">起</span>
              <input type="date" data-field="completed-from" class="field" value="${t.completedFrom?F(t.completedFrom):""}" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-[11.5px] text-ink-soft">止</span>
              <input type="date" data-field="completed-to" class="field" value="${t.completedTo?F(t.completedTo):""}" />
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
    `}function i(){o.remove(),a.remove()}function u(){e.onApply({filter:t,sortKey:n,sortOrder:s}),i()}function f(){t={status:"all",tag:"all",createdFrom:null,createdTo:null,completedFrom:null,completedTo:null},n="createdAt",s="desc",l(),d()}function h(r){if(!r)return null;const p=new Date(r+"T00:00:00").getTime();return Number.isFinite(p)?p:null}function c(r){if(!r)return null;const p=new Date(r+"T23:59:59").getTime();return Number.isFinite(p)?p:null}function d(){a.querySelectorAll("[data-status]").forEach(r=>{r.addEventListener("click",()=>{t={...t,status:r.dataset.status},l(),d()})}),a.querySelectorAll("[data-tag]").forEach(r=>{r.addEventListener("click",()=>{const p=r.dataset.tag;t={...t,tag:p==="all"?"all":p},l(),d()})}),a.querySelectorAll("[data-sort]").forEach(r=>{r.addEventListener("click",()=>{n=r.dataset.sort,l(),d()})}),a.querySelector('[data-act="toggle-order"]')?.addEventListener("click",()=>{s=s==="desc"?"asc":"desc",l(),d()}),a.querySelector('[data-field="created-from"]')?.addEventListener("change",r=>{t.createdFrom=h(r.target.value)}),a.querySelector('[data-field="created-to"]')?.addEventListener("change",r=>{t.createdTo=c(r.target.value)}),a.querySelector('[data-field="completed-from"]')?.addEventListener("change",r=>{t.completedFrom=h(r.target.value)}),a.querySelector('[data-field="completed-to"]')?.addEventListener("change",r=>{t.completedTo=c(r.target.value)}),a.querySelector('[data-act="close"]')?.addEventListener("click",i),a.querySelector('[data-act="cancel"]')?.addEventListener("click",i),a.querySelector('[data-act="apply"]')?.addEventListener("click",u),a.querySelector('[data-act="reset"]')?.addEventListener("click",f)}l(),d(),o.addEventListener("click",i),document.body.appendChild(o),document.body.appendChild(a)}function mt(e){const t=new Date(e),n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()}function B(e){return e.filter(t=>!mt(t.createdAt))}function ht(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function E(e){return e==="done"?"已完成":e==="cancelled"?"已取消":"未完成"}function P(e){const t=new Date(e),n=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds()),s=Date.UTC(1899,11,30);return(n-s)/864e5}const ft=(()=>{const e=new Array(256);for(let t=0;t<256;t++){let n=t;for(let s=0;s<8;s++)n=n&1?3988292384^n>>>1:n>>>1;e[t]=n>>>0}return e})();function gt(e){let t=4294967295;for(let n=0;n<e.length;n++)t=ft[(t^e[n])&255]^t>>>8;return(t^4294967295)>>>0}const Y=new TextEncoder;function xt(e){const t=e.map(c=>{const d=Y.encode(c.content);return{name:c.name,data:d,crc:gt(d),size:d.length,offset:0,nameBytes:Y.encode(c.name)}}),n=[];let s=0;for(const c of t){c.offset=s;const d=new Uint8Array(30+c.nameBytes.length),r=new DataView(d.buffer);r.setUint32(0,67324752,!0),r.setUint16(4,20,!0),r.setUint16(6,0,!0),r.setUint16(8,0,!0),r.setUint16(10,0,!0),r.setUint16(12,33,!0),r.setUint32(14,c.crc,!0),r.setUint32(18,c.size,!0),r.setUint32(22,c.size,!0),r.setUint16(26,c.nameBytes.length,!0),r.setUint16(28,0,!0),d.set(c.nameBytes,30),n.push(d,c.data),s+=d.length+c.data.length}const o=s;for(const c of t){const d=new Uint8Array(46+c.nameBytes.length),r=new DataView(d.buffer);r.setUint32(0,33639248,!0),r.setUint16(4,788,!0),r.setUint16(6,20,!0),r.setUint16(8,0,!0),r.setUint16(10,0,!0),r.setUint16(12,0,!0),r.setUint16(14,33,!0),r.setUint32(16,c.crc,!0),r.setUint32(20,c.size,!0),r.setUint32(24,c.size,!0),r.setUint16(28,c.nameBytes.length,!0),r.setUint16(30,0,!0),r.setUint16(32,0,!0),r.setUint16(34,0,!0),r.setUint16(36,0,!0),r.setUint32(38,0,!0),r.setUint32(42,c.offset,!0),d.set(c.nameBytes,46),n.push(d),s+=d.length}const a=s-o,l=new Uint8Array(22),i=new DataView(l.buffer);i.setUint32(0,101010256,!0),i.setUint16(4,0,!0),i.setUint16(6,0,!0),i.setUint16(8,t.length,!0),i.setUint16(10,t.length,!0),i.setUint32(12,a,!0),i.setUint32(16,o,!0),i.setUint16(20,0,!0),n.push(l);const u=n.reduce((c,d)=>c+d.length,0),f=new Uint8Array(u);let h=0;for(const c of n)f.set(c,h),h+=c.length;return f}function vt(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
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
</workbook>`}function wt(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>`}function kt(){return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
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
</styleSheet>`}function N(e){let t="";for(;e>0;){const n=(e-1)%26;t=String.fromCharCode(65+n)+t,e=Math.floor((e-1)/26)}return t}function $t(e){const t=[],n=new Map,s=l=>{const i=l??"",u=n.get(i);if(u!==void 0)return u;const f=t.length;return t.push(i),n.set(i,f),f},o=["序号","任务内容","状态","标签","创建时间","预计完成时间","完成时间","是否置顶"];for(const l of o)s(l);s(E("todo")),s(E("done")),s(E("cancelled")),s("是"),s("否");for(const l of e)s(l.content),s(l.tags.join(", ")),s(E(l.status)),s(l.pinned?"是":"否");return{xml:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${t.length}" uniqueCount="${t.length}">
${t.map(l=>`<si><t xml:space="preserve">${ht(l)}</t></si>`).join("")}
</sst>`,indexOf:s}}function S(e,t,n){return`<c r="${N(e)}${t}" t="s"><v>${n}</v></c>`}function U(e,t,n,s){return`<c r="${N(e)}${t}" s="${s}"><v>${n}</v></c>`}function W(e,t){return`<c r="${N(e)}${t}"/>`}function Tt(e,t){const s=["序号","任务内容","状态","标签","创建时间","预计完成时间","完成时间","是否置顶"].map((l,i)=>S(i+1,1,t(l))).join(""),o=e.map((l,i)=>{const u=i+2,f=[U(1,u,i+1,0),S(2,u,t(l.content)),S(3,u,t(E(l.status))),S(4,u,t(l.tags.join(", "))),U(5,u,P(l.createdAt),1),l.dueAt?U(6,u,P(l.dueAt),1):W(6,u),l.completedAt?U(7,u,P(l.completedAt),1):W(7,u),S(8,u,t(l.pinned?"是":"否"))];return`<row r="${u}">${f.join("")}</row>`}).join("");return`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="A1:H${e.length+1}"/>
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
    <col min="7" max="7" width="18" customWidth="1"/>
    <col min="8" max="8" width="10" customWidth="1"/>
  </cols>
  <sheetData>
    <row r="1">${s}</row>${o}
  </sheetData>
</worksheet>`}function St(e){const t=$t(e),n=[{name:"[Content_Types].xml",content:vt()},{name:"_rels/.rels",content:bt()},{name:"xl/workbook.xml",content:yt()},{name:"xl/_rels/workbook.xml.rels",content:wt()},{name:"xl/styles.xml",content:kt()},{name:"xl/sharedStrings.xml",content:t.xml},{name:"xl/worksheets/sheet1.xml",content:Tt(e,t.indexOf)}];return xt(n)}function At(e,t,n){const s=new Blob([t],{type:n}),o=URL.createObjectURL(s),a=document.createElement("a");a.href=o,a.download=e,a.style.display="none",document.body.appendChild(a),a.click(),setTimeout(()=>{document.body.removeChild(a),URL.revokeObjectURL(o)},0)}function Ct(e,t="tasks"){const n=new Date,s=`${n.getFullYear()}${w(n.getMonth()+1)}${w(n.getDate())}_${w(n.getHours())}${w(n.getMinutes())}${w(n.getSeconds())}`,o=`${t}_${s}.xlsx`,a=St(e);At(o,a,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}const Et={status:"all",tag:"all",createdFrom:null,createdTo:null,completedFrom:null,completedTo:null},X=10;function Mt(){const e=document.getElementById("app");if(!e){console.error("App element not found");return}let t="createdAt",n="desc",s={...Et},o=!1;const a=document.createElement("div");a.className="min-h-screen",e.appendChild(a);const l=document.createElement("div");l.className="fab-stack",l.innerHTML=`
    <button class="fab-mini" data-fab="to-top" aria-label="滚动到顶部" title="回到顶部">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
    <button class="fab-mini" data-fab="to-bottom" aria-label="滚动到底部" title="滚动到底部">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
    </button>
  `,e.appendChild(l);const i=l.querySelector('[data-fab="to-top"]'),u=l.querySelector('[data-fab="to-bottom"]');function f(){const d=window.scrollY||document.documentElement.scrollTop,r=window.innerHeight,p=document.documentElement.scrollHeight,v=r*.9,L=d>v;l.classList.toggle("is-visible",L);const g=p-d-r;u.classList.toggle("is-hidden",g<r*.4)}let h=!1;window.addEventListener("scroll",()=>{h||(window.requestAnimationFrame(()=>{f(),h=!1}),h=!0)},{passive:!0}),window.addEventListener("resize",f),i.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),u.addEventListener("click",()=>{window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})});function c(){const d=x.getState(),r=x.getPinned(3),p=x.countPinned(),v=x.query(s,t,n),g=B(d.tasks).length,b=Ut(s),y=Lt[t];a.innerHTML=`
      <header class="pt-[calc(env(safe-area-inset-top)+12px)] pb-3">
        <div class="shell">
          <div class="flex items-center justify-between gap-3">
            <div class="min-w-0 flex-1">
              <h1 class="text-[20px] font-semibold tracking-tight leading-tight">任务管理</h1>
              <p class="text-[12px] text-ink-soft mt-0.5 truncate">${Dt(d)}</p>
            </div>
            <button data-act="filter" class="relative btn btn-ghost !px-3 !py-2 shrink-0" aria-label="筛选与排序">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></svg>
              <span class="ml-1 text-[13px]">${y}</span>
              ${b>0?`<span class="absolute -top-1 -right-1 bg-accent text-white text-[10px] leading-none rounded-full min-w-[16px] h-[16px] inline-flex items-center justify-center px-1">${b}</span>`:""}
            </button>
          </div>
        </div>
      </header>

      <main class="shell pt-0 pb-[calc(80px+env(safe-area-inset-bottom))] space-y-4">        ${r.length>0?`<section>
                <div class="flex items-center justify-between mb-1.5 px-1">
                  <h2 class="text-[12.5px] text-ink-soft font-medium flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" class="text-accent"><path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/></svg>
                    置顶
                  </h2>
                  ${p>3?`<span class="text-[12px] text-ink-soft">还有 ${p-3} 条置顶</span>`:""}
                </div>
                ${p<=3?`<div class="space-y-2" data-region="pinned">${r.map(m=>_(m)).join("")}</div>`:`<div class="flex gap-2.5 overflow-x-auto no-scrollbar pb-1" data-region="pinned" style="margin-left:calc(-16px - env(safe-area-inset-left));margin-right:calc(-16px - env(safe-area-inset-right));padding-left:calc(16px + env(safe-area-inset-left));padding-right:calc(16px + env(safe-area-inset-right));">${r.map(m=>rt(m)).join("")}</div>`}
              </section>`:""}

        <section>
          <div class="flex items-center justify-between mb-1.5 px-1 gap-2">
            <h2 class="text-[12.5px] text-ink-soft font-medium min-w-0 truncate">
              ${Ft[s.status]??"全部任务"}
              <span class="text-ink-soft/70">· ${v.length}</span>
            </h2>
            <div class="flex items-center gap-1.5 shrink-0">
              <button data-act="download-history" class="btn-action ${g===0?"is-disabled":""}" type="button" aria-label="下载非本月任务" title="${g>0?`下载非本月任务（${g} 条）`:"暂无非本月任务可下载"}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>
                <span>下载</span>
                ${g>0?`<span class="btn-action-badge">${g}</span>`:""}
              </button>
              <button data-act="delete-history" class="btn-action btn-action-danger ${g===0?"is-disabled":""}" type="button" aria-label="删除非本月任务" title="${g>0?`删除非本月任务（${g} 条）`:"暂无非本月任务可删除"}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></svg>
                <span>删除</span>
                ${g>0?`<span class="btn-action-badge">${g}</span>`:""}
              </button>
            </div>
          </div>
          <div class="space-y-2" data-region="list">
            ${v.length>0?(o?v:v.slice(0,X)).map(m=>_(m)).join(""):It()}
          </div>
          ${v.length>X?`<button data-act="toggle-expand" class="mt-3 w-full btn btn-ghost !text-[13px] !text-ink-soft flex items-center justify-center gap-1">
                  ${o?`收起
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>`:`显示全部（${v.length}）
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`}
                </button>`:""}
        </section>
      </main>

      <button data-act="add" class="fab" aria-label="新建任务">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    `;const k=a.querySelector('[data-region="list"]'),D=a.querySelector('[data-region="pinned"]');V(k,m=>x.getState().tasks.find($=>$.id===m),{onStatusToggle:(m,$)=>x.setStatus(m,$),onTogglePin:m=>x.togglePin(m),onEdit:m=>q({task:m,onClose:()=>{}})}),D&&V(D,m=>x.getState().tasks.find($=>$.id===m),{onStatusToggle:(m,$)=>x.setStatus(m,$),onTogglePin:m=>x.togglePin(m),onEdit:m=>q({task:m,onClose:()=>{}})}),a.querySelector('[data-act="add"]')?.addEventListener("click",()=>{q({onClose:()=>{}})}),a.querySelector('[data-act="filter"]')?.addEventListener("click",()=>{pt({filter:s,sortKey:t,sortOrder:n,onApply:m=>{s=m.filter,t=m.sortKey,n=m.sortOrder,o=!1,c()},onClose:()=>{}})}),a.querySelector('[data-act="toggle-expand"]')?.addEventListener("click",()=>{o=!o,c(),o||a.querySelector('[data-region="list"]')?.scrollIntoView({behavior:"smooth",block:"start"})}),a.querySelector('[data-act="download-history"]')?.addEventListener("click",()=>{const m=B(x.getState().tasks);if(m.length===0){C("暂无非本月任务可下载");return}try{Ct(m,"历史任务"),C(`已导出 ${m.length} 条非本月任务`)}catch($){console.error("[export] 导出失败：",$),C("导出失败，请重试")}}),a.querySelector('[data-act="delete-history"]')?.addEventListener("click",()=>{const m=B(x.getState().tasks);if(m.length===0){C("暂无非本月任务可删除");return}const $=m.slice(0,3).map(j=>j.content).join(`
· `),G=m.length>3?`
· ……等共 ${m.length} 条任务`:"",J=`确定要删除 ${m.length} 条非本月任务吗？
删除后无法恢复，建议先点击「下载」备份。

涉及任务：
· ${$}${G}`;if(confirm(J)){const j=x.removeNonCurrentMonthTasks();C(`已删除 ${j} 条非本月任务`)}}),f()}x.subscribe(()=>c()),c()}const Lt={createdAt:"创建时间",completedAt:"完成时间",tag:"标签"},Ft={all:"全部任务",todo:"未完成",done:"已完成",cancelled:"已取消"};function Ut(e){let t=0;return e.status!=="all"&&t++,e.tag!=="all"&&t++,(e.createdFrom||e.createdTo)&&t++,(e.completedFrom||e.completedTo)&&t++,t}function Dt(e){const t=e.tasks.length,n=e.tasks.filter(a=>a.status==="done").length,s=e.tasks.filter(a=>a.status==="todo").length,o=e.tasks.filter(a=>jt(a.createdAt)).length;return`共 ${t} 条 · 待办 ${s} · 已完成 ${n} · 今日新增 ${o}`}function jt(e){const t=new Date(e),n=new Date;return t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate()}function It(){return`
    <div class="card py-12 flex flex-col items-center text-center px-6">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d8cdba" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 13l3-8h12l3 8v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z"/>
        <path d="M3 13h5l2 3h4l2-3h5"/>
      </svg>
      <p class="mt-3 text-[14px] text-ink-soft">这里还没有任务</p>
      <p class="mt-1 text-[12.5px] text-ink-soft/80">点击右下角 + 新建一条吧</p>
    </div>
  `}let A=null;function C(e){const t=document.getElementById("app-toast");t&&t.remove(),A!==null&&(window.clearTimeout(A),A=null);const n=document.createElement("div");n.id="app-toast",n.className="app-toast",n.textContent=e,document.body.appendChild(n),A=window.setTimeout(()=>{n.classList.add("is-leaving"),window.setTimeout(()=>{n.remove(),A=null},220)},1800)}Mt();export{T as e,x as s};
