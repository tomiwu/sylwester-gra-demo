import{B as d,a as E,p as r,S as P}from"./styles-BLTh1s8S.js";const b="syl-panel-mock-kody-session";function M(e,t){if(!e)return!1;const n=e.username.trim().toLowerCase();return t.some(s=>{const c=s.trim();return c===e.userId||c.toLowerCase()===n})}function j(e){if(typeof e!="object"||e===null)return null;const{userId:t,username:n}=e;return typeof t!="string"||typeof n!="string"?null:{userId:t,username:n}}function D(e){if(e===null)return null;try{return j(JSON.parse(e))}catch{return null}}function K(e){const{storage:t,user:n}=e;return{async restore(){return D(t.getItem(b))},async signIn(){return t.setItem(b,JSON.stringify(n)),{...n}},async signOut(){t.removeItem(b)}}}function x(){const e=new Map;return{getItem:t=>e.get(t)??null,setItem:(t,n)=>{e.set(t,n)},removeItem:t=>{e.delete(t)}}}function k(e){if(typeof e=="object"&&e!==null)return e;throw new d("server","Unexpected staff response.")}function y(e){return e==null?null:String(e)}function V(e){return e==null?null:Number(e)}function N(e){const t=k(e);return{code:String(t.code??""),status:t.status,nickname:y(t.nickname),kind:y(t.kind),discountPercent:Number(t.discount_percent??0),pricePerPerson:V(t.price_per_person),earnedAt:y(t.earned_at),usedAt:y(t.used_at)}}function J(e){const t=k(e);return{code:String(t.code),nickname:String(t.nickname),score:Number(t.score),kind:t.kind,referrals:Number(t.referrals),earnedAt:String(t.earned_at),usedAt:y(t.used_at)}}function q(e){const t=k(e);return{players:Number(t.players),codes:Number(t.codes),shareCodes:Number(t.share_codes),redeemed:Number(t.redeemed)}}function Q(e){const t=k(e);return{nickname:String(t.nickname),score:Number(t.score)}}async function W(e){const t=await e.text();if(t.length===0)return null;try{return JSON.parse(t)}catch{throw new d("server","Unexpected staff response.")}}function z(e){if(e===401||e===403)throw new d("forbidden","Not signed in as staff.");if(e>=400)throw new d("server","Staff API failed.")}async function h(e,t){try{const n=await fetch(e,{credentials:"same-origin",...t,headers:{Accept:"application/json",...t?.body?{"Content-Type":"application/json"}:{},...t?.headers}}),s=await W(n);return z(n.status),s}catch(n){throw n instanceof d?n:new d("network","Staff API is offline.")}}function Y(){return{async check(e){return N(await h("/api/staff/check",{method:"POST",body:JSON.stringify({code:E(e)})}))},async redeem(e,t){const n=k(await h("/api/staff/redeem",{method:"POST",body:JSON.stringify({code:E(e),note:t??null})}));return{ok:!!n.ok,check:N(n.check)}},async listCodes(e,t){const n=`/api/staff/codes?limit=${e}&offset=${t}`,s=await h(n);if(!Array.isArray(s))throw new d("server","Bad list.");return s.map(J)},async stats(){return q(await h("/api/staff/stats"))},async hideNickname(e){return!!await h("/api/staff/hide-nickname",{method:"POST",body:JSON.stringify({nickname:e})})}}}async function G(){const e=await h("/api/staff/ranking");if(!Array.isArray(e))throw new d("server","Bad ranking.");return e.map(Q)}const C=["check","list","ranking"];function X(e){const{auth:t,allowList:n,render:s}=e,c=e.ranking??G;let p={session:null,allowList:n,section:"check"};function o(a){p={...p,...a},s(p)}async function w(a){try{o({session:await a()})}catch{o({session:null})}}function m(a){return a instanceof d&&a.kind==="forbidden"?r.panelNoAccess:r.panelError}async function F(){if(e.staff){o({busy:!0,checkError:null});try{const[a,u]=await Promise.all([e.staff.listCodes(200,0),e.staff.stats()]);o({list:a,stats:u,busy:!1})}catch(a){o({busy:!1,checkError:m(a)})}}}async function v(){o({busy:!0,checkError:null});try{o({ranking:await c(),busy:!1})}catch(a){o({busy:!1,checkError:m(a)})}}return{start:()=>w(()=>t.restore()),signIn:()=>w(()=>t.signIn()),async signOut(){await t.signOut().catch(()=>{}),o({session:null,section:"check",check:null,checkError:null})},select(a){if(o({section:a,checkError:null,hidePending:null}),a==="list")return F();if(a==="ranking")return v()},setCheckQuery(a){o({checkQuery:a})},async check(a){if(!e.staff){o({checkError:r.panelError,check:null});return}o({busy:!0,checkQuery:a,checkError:null,check:null});try{o({check:await e.staff.check(a),busy:!1})}catch(u){o({busy:!1,check:null,checkError:m(u)})}},async redeem(){const a=p.check?.code;if(!(!e.staff||!a)){o({busy:!0,checkError:null});try{const u=await e.staff.redeem(a);o({check:u.check,busy:!1})}catch(u){o({busy:!1,checkError:m(u)})}}},setListKind(a){o({listKind:a})},setListUsed(a){o({listUsed:a})},askHide(a){o({hidePending:a})},cancelHide(){o({hidePending:null})},async hideNickname(){const a=p.hidePending;if(!(!e.staff||!a)){o({busy:!0,checkError:null});try{await e.staff.hideNickname(a),o({hidePending:null,busy:!1}),await v()}catch(u){o({busy:!1,checkError:m(u)})}}}}}function Z(e){return C.some(t=>t===e)}function ee(e){const t=e.list??[],n=e.listKind??"all",s=e.listUsed??"all";return t.filter(c=>!(n!=="all"&&c.kind!==n||s==="open"&&c.usedAt||s==="used"&&!c.usedAt))}function I(e){return e.endsWith(".kody.run")||e.endsWith(".kody.codes")}function A(e){return typeof e=="object"&&e!==null?e:null}function te(e,t){for(const n of t){const s=e[n];if(typeof s=="string"&&s.length>0)return s}return""}function L(e,t){for(const n of e){if(!n)continue;const s=te(n,t);if(s)return s}return""}function ne(e){const t=A(e);if(!t)return null;const n=A(t.user)??t,s=L([n,t],["id","userId"]),c=L([n,t],["username","login"]);return!s||!c?null:{userId:s,username:c}}function re(e){window.location.assign(e)}const se={loginPath:"/-/auth/login?return_to=/panel/",logoutPath:"/-/auth/logout?return_to=/panel/",mePath:"/-/auth/me"};function ae(e={}){return{fetch,assign:re,...se,...e}}async function oe(e,t){try{const n=await e(t,{credentials:"same-origin"});return n.ok?ne(await n.json()):null}catch{return null}}function ie(e){const t=ae(e);return{restore:()=>oe(t.fetch,t.mePath),async signIn(){return t.assign(t.loginPath),null},async signOut(){t.assign(t.logoutPath)}}}const O={check:r.panelNavCheck,list:r.panelNavList,ranking:r.panelNavRanking},ce={valid:r.panelStatusValid,already_used:r.panelStatusUsed,unknown:r.panelStatusUnknown,expired:r.panelStatusExpired},le={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function i(e){return e.replace(/[&<>"']/g,t=>le[t]??t)}function T(e){return e==="share"?r.panelDiscountShare:e==="base"?r.panelDiscountBase:"—"}function H(e){if(!e)return"—";const t=new Date(e);return Number.isNaN(t.getTime())?i(e):i(t.toLocaleString("pl-PL",{dateStyle:"short",timeStyle:"short"}))}function $(){return`<h1 class="title">${r.panelTitle}</h1><p class="subtitle">${r.hotel}</p>`}function _(e){return`<p class="note">${r.panelSignedInAs}: <strong>${i(e.username)}</strong></p>`}function U(){return`<button type="button" class="btn secondary" id="logout">${r.panelSignOut}</button>`}function ue(){return`<section class="panel" data-screen="login">
    ${$()}
    <p class="how">${r.panelLoginHint}</p>
    <div class="actions">
      <button type="button" class="btn" id="login">${r.panelSignIn}</button>
    </div>
  </section>`}function de(e){return`<section class="panel" data-screen="denied">
    ${$()}
    <h2 class="lock">${r.panelNoAccess}</h2>
    <p class="how">${r.panelNoAccessHint}</p>
    ${_(e)}
    <div class="actions">${U()}</div>
  </section>`}function fe(e,t){return`<button type="button" class="btn secondary nav-item" data-section="${e}"${e===t?' aria-current="page"':""}>${O[e]}</button>`}function S(e){return e.checkError?`<p class="note staff-error" role="alert">${i(e.checkError)}</p>`:""}function he(e){const t=e.status==="valid";return`<dl class="staff-result" data-status="${e.status}">
    <div><dt>${r.panelCodeLabel}</dt><dd>${i(e.code)}</dd></div>
    <div><dt>${r.panelStatus}</dt><dd>${ce[e.status]}</dd></div>
    <div><dt>${r.panelNick}</dt><dd>${i(e.nickname??"—")}</dd></div>
    <div><dt>${r.panelDiscount}</dt><dd>${T(e.kind)}</dd></div>
    <div><dt>${r.panelEarnedAt}</dt><dd>${H(e.earnedAt)}</dd></div>
  </dl>
  ${t?`<div class="actions"><button type="button" class="btn" id="redeem">${r.panelRedeem}</button></div>`:""}`}function pe(e){const t=i(e.checkQuery??"");return`<form class="staff-form" id="check-form">
    <label class="staff-label" for="code-input">${r.panelCodeLabel}</label>
    <input class="staff-input" id="code-input" name="code" type="text" maxlength="16" autocomplete="off" placeholder="${r.panelCodePlaceholder}" value="${t}" />
    <div class="actions">
      <button type="submit" class="btn" id="check"${e.busy?" disabled":""}>${r.panelCheckAction}</button>
    </div>
  </form>
  ${e.check?he(e.check):""}
  ${S(e)}`}function me(e){const t=e.stats;return t?`<ul class="staff-stats">
        <li>${r.panelPlayers}: <strong>${t.players}</strong></li>
        <li>${r.panelCodesIssued}: <strong>${t.codes}</strong></li>
        <li>${r.panelCodesUsed}: <strong>${t.redeemed}</strong></li>
      </ul>`:""}function f(e,t){return e===t?" selected":""}function ye(e){const t=e.listKind??"all",n=e.listUsed??"all";return`<div class="staff-filters">
      <label>${r.panelFilterKind}
        <select id="filter-kind">
          <option value="all"${f(t,"all")}>${r.panelFilterAll}</option>
          <option value="base"${f(t,"base")}>${r.panelDiscountBase}</option>
          <option value="share"${f(t,"share")}>${r.panelDiscountShare}</option>
        </select>
      </label>
      <label>${r.panelFilterStatus}
        <select id="filter-used">
          <option value="all"${f(n,"all")}>${r.panelFilterAll}</option>
          <option value="open"${f(n,"open")}>${r.panelStatusValid}</option>
          <option value="used"${f(n,"used")}>${r.panelStatusUsed}</option>
        </select>
      </label>
    </div>`}function ge(e){const t=ee(e);if(t.length===0)return`<p class="note">${r.panelEmptyList}</p>`;const n=t.map(s=>`<tr>
            <td>${i(s.code)}</td>
            <td>${i(s.nickname)}</td>
            <td>${T(s.kind)}</td>
            <td>${s.usedAt?r.panelStatusUsed:r.panelStatusValid}</td>
            <td>${H(s.earnedAt)}</td>
          </tr>`).join("");return`<table class="staff-table">
        <thead><tr>
          <th>${r.panelCodeLabel}</th>
          <th>${r.panelNick}</th>
          <th>${r.panelDiscount}</th>
          <th>${r.panelStatus}</th>
          <th>${r.panelEarnedAt}</th>
        </tr></thead>
        <tbody>${n}</tbody>
      </table>`}function ke(e){return`${me(e)}
    ${ye(e)}
    ${ge(e)}
    ${S(e)}`}function be(e){return`<p class="note" role="alert">${r.panelHideConfirm} <strong>${i(e)}</strong></p>
       <div class="actions">
         <button type="button" class="btn" id="hide-ok">${r.panelHideOk}</button>
         <button type="button" class="btn secondary" id="hide-cancel">${r.panelHideCancel}</button>
       </div>`}function $e(e){const t=e.ranking??[];if(t.length===0)return`<p class="note">${r.panelEmptyRanking}</p>`;const n=t.map(s=>`<tr>
            <td>${i(s.nickname)}</td>
            <td>${s.score}</td>
            <td><button type="button" class="btn secondary" data-hide="${i(s.nickname)}">${r.panelHideNick}</button></td>
          </tr>`).join("");return`<table class="staff-table">
        <thead><tr><th>${r.panelNick}</th><th>${r.score}</th><th></th></tr></thead>
        <tbody>${n}</tbody>
      </table>`}function Se(e){const t=e.hidePending?be(e.hidePending):"";return`${$e(e)}${t}${S(e)}`}function we(e){return e.section==="list"?ke(e):e.section==="ranking"?Se(e):pe(e)}function ve(e,t){const n=C.map(s=>fe(s,e.section)).join("");return`<section class="panel staff" data-screen="shell">
    <header class="staff-header">
      ${$()}
      ${_(t)}
      ${U()}
    </header>
    <nav class="actions staff-nav" aria-label="${r.panelTitle}">${n}</nav>
    <main class="staff-main" data-section="${e.section}">
      <h2 class="subtitle">${O[e.section]}</h2>
      ${we(e)}
    </main>
  </section>`}function Ee(e){const{session:t}=e;return t?M(t,e.allowList)?ve(e,t):de(t):ue()}const R=document.querySelector("#app");if(!(R instanceof HTMLElement))throw new Error("The #app root is missing.");const g=R;document.title=`${r.panelTitle} — ${r.hotel}`;function Ne(){try{return window.sessionStorage}catch{return x()}}function Ae(){if(I(window.location.hostname))return ie();const e=new URLSearchParams(window.location.search).get("kodyUser")||P.mockUsername;return K({storage:Ne(),user:{userId:`mock-${e}`,username:e}})}const B={auth:Ae(),allowList:P.allowList,render:e=>{g.innerHTML=Ee(e)}};I(window.location.hostname)&&(B.staff=Y());const l=X(B);g.addEventListener("click",e=>{const t=e.target instanceof Element?e.target.closest("button"):null;if(!t)return;const n=t.dataset.section,s=t.dataset.hide;t.id==="login"?l.signIn():t.id==="logout"?l.signOut():t.id==="redeem"?l.redeem():t.id==="hide-ok"?l.hideNickname():t.id==="hide-cancel"?l.cancelHide():s?l.askHide(s):Z(n)&&l.select(n)});g.addEventListener("submit",e=>{if((e.target instanceof Element?e.target.closest("form"):null)?.id!=="check-form")return;e.preventDefault();const n=g.querySelector("#code-input"),s=n instanceof HTMLInputElement?n.value:"";l.check(s)});g.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLSelectElement){if(t.id==="filter-kind"){const n=t.value;(n==="all"||n==="base"||n==="share")&&l.setListKind(n)}if(t.id==="filter-used"){const n=t.value;(n==="all"||n==="open"||n==="used")&&l.setListUsed(n)}}});l.start();
