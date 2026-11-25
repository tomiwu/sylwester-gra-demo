import{B as p,a as v,p as s,S as A}from"./styles-BUQ-vATm.js";const b="syl-panel-mock-kody-session";function R(e,t){if(!e)return!1;const n=e.username.trim().toLowerCase();return t.some(o=>{const i=o.trim();return i===e.userId||i.toLowerCase()===n})}function K(e){if(typeof e!="object"||e===null)return null;const{userId:t,username:n}=e;return typeof t!="string"||typeof n!="string"?null:{userId:t,username:n}}function M(e){if(e===null)return null;try{return K(JSON.parse(e))}catch{return null}}function j(e){const{storage:t,user:n}=e;return{async restore(){return M(t.getItem(b))},async signIn(){return t.setItem(b,JSON.stringify(n)),{...n}},async signOut(){t.removeItem(b)}}}function x(){const e=new Map;return{getItem:t=>e.get(t)??null,setItem:(t,n)=>{e.set(t,n)},removeItem:t=>{e.delete(t)}}}function g(e){if(typeof e=="object"&&e!==null)return e;throw new p("server","Unexpected staff response.")}function y(e){return e==null?null:String(e)}function D(e){return e==null?null:Number(e)}function E(e){const t=g(e);return{code:String(t.code??""),status:t.status,nickname:y(t.nickname),kind:y(t.kind),discountPercent:Number(t.discount_percent??0),pricePerPerson:D(t.price_per_person),earnedAt:y(t.earned_at),usedAt:y(t.used_at)}}function V(e){const t=g(e);return{code:String(t.code),nickname:String(t.nickname),score:Number(t.score),kind:t.kind,referrals:Number(t.referrals),earnedAt:String(t.earned_at),usedAt:y(t.used_at)}}function F(e){const t=g(e);return{players:Number(t.players),codes:Number(t.codes),shareCodes:Number(t.share_codes),redeemed:Number(t.redeemed)}}function J(e){const t=g(e);return{nickname:String(t.nickname),score:Number(t.score)}}async function q(e){const t=await e.text();if(t.length===0)return null;try{return JSON.parse(t)}catch{throw new p("server","Unexpected staff response.")}}async function h(e,t){let n;try{n=await fetch(e,{credentials:"same-origin",...t,headers:{Accept:"application/json",...t?.body?{"Content-Type":"application/json"}:{},...t?.headers}})}catch{throw new p("network","Staff API is offline.")}if(n.status===401||n.status===403)throw new p("forbidden","Not signed in as staff.");const o=await q(n);if(!n.ok)throw new p("server","Staff API failed.");return o}function Q(){return{async check(e){return E(await h("/api/staff/check",{method:"POST",body:JSON.stringify({code:v(e)})}))},async redeem(e,t){const n=g(await h("/api/staff/redeem",{method:"POST",body:JSON.stringify({code:v(e),note:t??null})}));return{ok:!!n.ok,check:E(n.check)}},async listCodes(e,t){const n=`/api/staff/codes?limit=${e}&offset=${t}`,o=await h(n);if(!Array.isArray(o))throw new p("server","Bad list.");return o.map(V)},async stats(){return F(await h("/api/staff/stats"))},async hideNickname(e){return!!await h("/api/staff/hide-nickname",{method:"POST",body:JSON.stringify({nickname:e})})}}}async function W(){const e=await h("/api/staff/ranking");if(!Array.isArray(e))throw new p("server","Bad ranking.");return e.map(J)}const L=["check","list","ranking"];function z(e){const{auth:t,allowList:n,render:o}=e,i=e.ranking??W;let l={session:null,allowList:n,section:"check"};function r(a){l={...l,...a},o(l)}async function f(a){try{r({session:await a()})}catch{r({session:null})}}function m(a){return a instanceof p&&a.kind==="forbidden"?s.panelNoAccess:s.panelError}async function B(){if(e.staff){r({busy:!0,checkError:null});try{const[a,d]=await Promise.all([e.staff.listCodes(200,0),e.staff.stats()]);r({list:a,stats:d,busy:!1})}catch(a){r({busy:!1,checkError:m(a)})}}}async function S(){r({busy:!0,checkError:null});try{r({ranking:await i(),busy:!1})}catch(a){r({busy:!1,checkError:m(a)})}}return{start:()=>f(()=>t.restore()),signIn:()=>f(()=>t.signIn()),async signOut(){await t.signOut().catch(()=>{}),r({session:null,section:"check",check:null,checkError:null})},select(a){if(r({section:a,checkError:null,hidePending:null}),a==="list")return B();if(a==="ranking")return S()},setCheckQuery(a){r({checkQuery:a})},async check(a){if(!e.staff){r({checkError:s.panelError,check:null});return}r({busy:!0,checkQuery:a,checkError:null,check:null});try{r({check:await e.staff.check(a),busy:!1})}catch(d){r({busy:!1,check:null,checkError:m(d)})}},async redeem(){const a=l.check?.code;if(!(!e.staff||!a)){r({busy:!0,checkError:null});try{const d=await e.staff.redeem(a);r({check:d.check,busy:!1})}catch(d){r({busy:!1,checkError:m(d)})}}},setListKind(a){r({listKind:a})},setListUsed(a){r({listUsed:a})},askHide(a){r({hidePending:a})},cancelHide(){r({hidePending:null})},async hideNickname(){const a=l.hidePending;if(!(!e.staff||!a)){r({busy:!0,checkError:null});try{await e.staff.hideNickname(a),r({hidePending:null,busy:!1}),await S()}catch(d){r({busy:!1,checkError:m(d)})}}}}}function Y(e){return L.some(t=>t===e)}function G(e){const t=e.list??[],n=e.listKind??"all",o=e.listUsed??"all";return t.filter(i=>!(n!=="all"&&i.kind!==n||o==="open"&&i.usedAt||o==="used"&&!i.usedAt))}function I(e){return e.endsWith(".kody.run")||e.endsWith(".kody.codes")}function N(e){return typeof e=="object"&&e!==null?e:null}function X(e){const t=N(e);if(!t)return null;const n=N(t.user)??t,o=typeof n.id=="string"&&n.id||typeof n.userId=="string"&&n.userId||typeof t.userId=="string"&&t.userId||"",i=typeof n.username=="string"&&n.username||typeof n.login=="string"&&n.login||typeof t.username=="string"&&t.username||"";return!o||!i?null:{userId:o,username:i}}function Z(e){const t=fetch,n=(r=>{window.location.assign(r)}),o="/-/auth/login?return_to=/panel/",i="/-/auth/logout?return_to=/panel/",l="/-/auth/me";return{async restore(){try{const r=await t(l,{credentials:"same-origin"});return r.ok?X(await r.json()):null}catch{return null}},async signIn(){return n(o),null},async signOut(){n(i)}}}const P={check:s.panelNavCheck,list:s.panelNavList,ranking:s.panelNavRanking},ee={valid:s.panelStatusValid,already_used:s.panelStatusUsed,unknown:s.panelStatusUnknown,expired:s.panelStatusExpired},te={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function c(e){return e.replace(/[&<>"']/g,t=>te[t]??t)}function C(e){return e==="share"?s.panelDiscountShare:e==="base"?s.panelDiscountBase:"—"}function O(e){if(!e)return"—";const t=new Date(e);return Number.isNaN(t.getTime())?c(e):c(t.toLocaleString("pl-PL",{dateStyle:"short",timeStyle:"short"}))}function $(){return`<h1 class="title">${s.panelTitle}</h1><p class="subtitle">${s.hotel}</p>`}function H(e){return`<p class="note">${s.panelSignedInAs}: <strong>${c(e.username)}</strong></p>`}function T(){return`<button type="button" class="btn secondary" id="logout">${s.panelSignOut}</button>`}function ne(){return`<section class="panel" data-screen="login">
    ${$()}
    <p class="how">${s.panelLoginHint}</p>
    <div class="actions">
      <button type="button" class="btn" id="login">${s.panelSignIn}</button>
    </div>
  </section>`}function se(e){return`<section class="panel" data-screen="denied">
    ${$()}
    <h2 class="lock">${s.panelNoAccess}</h2>
    <p class="how">${s.panelNoAccessHint}</p>
    ${H(e)}
    <div class="actions">${T()}</div>
  </section>`}function re(e,t){return`<button type="button" class="btn secondary nav-item" data-section="${e}"${e===t?' aria-current="page"':""}>${P[e]}</button>`}function w(e){return e.checkError?`<p class="note staff-error" role="alert">${c(e.checkError)}</p>`:""}function ae(e){const t=e.status==="valid";return`<dl class="staff-result" data-status="${e.status}">
    <div><dt>${s.panelCodeLabel}</dt><dd>${c(e.code)}</dd></div>
    <div><dt>${s.panelStatus}</dt><dd>${ee[e.status]}</dd></div>
    <div><dt>${s.panelNick}</dt><dd>${c(e.nickname??"—")}</dd></div>
    <div><dt>${s.panelDiscount}</dt><dd>${C(e.kind)}</dd></div>
    <div><dt>${s.panelEarnedAt}</dt><dd>${O(e.earnedAt)}</dd></div>
  </dl>
  ${t?`<div class="actions"><button type="button" class="btn" id="redeem">${s.panelRedeem}</button></div>`:""}`}function oe(e){const t=c(e.checkQuery??"");return`<form class="staff-form" id="check-form">
    <label class="staff-label" for="code-input">${s.panelCodeLabel}</label>
    <input class="staff-input" id="code-input" name="code" type="text" maxlength="16" autocomplete="off" placeholder="${s.panelCodePlaceholder}" value="${t}" />
    <div class="actions">
      <button type="submit" class="btn" id="check"${e.busy?" disabled":""}>${s.panelCheckAction}</button>
    </div>
  </form>
  ${e.check?ae(e.check):""}
  ${w(e)}`}function ie(e){const t=e.stats,n=t?`<ul class="staff-stats">
        <li>${s.panelPlayers}: <strong>${t.players}</strong></li>
        <li>${s.panelCodesIssued}: <strong>${t.codes}</strong></li>
        <li>${s.panelCodesUsed}: <strong>${t.redeemed}</strong></li>
      </ul>`:"",o=G(e),i=o.length===0?`<p class="note">${s.panelEmptyList}</p>`:`<table class="staff-table">
        <thead><tr>
          <th>${s.panelCodeLabel}</th>
          <th>${s.panelNick}</th>
          <th>${s.panelDiscount}</th>
          <th>${s.panelStatus}</th>
          <th>${s.panelEarnedAt}</th>
        </tr></thead>
        <tbody>${o.map(f=>`<tr>
            <td>${c(f.code)}</td>
            <td>${c(f.nickname)}</td>
            <td>${C(f.kind)}</td>
            <td>${f.usedAt?s.panelStatusUsed:s.panelStatusValid}</td>
            <td>${O(f.earnedAt)}</td>
          </tr>`).join("")}</tbody>
      </table>`,l=e.listKind??"all",r=e.listUsed??"all";return`${n}
    <div class="staff-filters">
      <label>${s.panelFilterKind}
        <select id="filter-kind">
          <option value="all"${l==="all"?" selected":""}>${s.panelFilterAll}</option>
          <option value="base"${l==="base"?" selected":""}>${s.panelDiscountBase}</option>
          <option value="share"${l==="share"?" selected":""}>${s.panelDiscountShare}</option>
        </select>
      </label>
      <label>${s.panelFilterStatus}
        <select id="filter-used">
          <option value="all"${r==="all"?" selected":""}>${s.panelFilterAll}</option>
          <option value="open"${r==="open"?" selected":""}>${s.panelStatusValid}</option>
          <option value="used"${r==="used"?" selected":""}>${s.panelStatusUsed}</option>
        </select>
      </label>
    </div>
    ${i}
    ${w(e)}`}function ce(e){const t=e.hidePending?`<p class="note" role="alert">${s.panelHideConfirm} <strong>${c(e.hidePending)}</strong></p>
       <div class="actions">
         <button type="button" class="btn" id="hide-ok">${s.panelHideOk}</button>
         <button type="button" class="btn secondary" id="hide-cancel">${s.panelHideCancel}</button>
       </div>`:"",n=e.ranking??[];return`${n.length===0?`<p class="note">${s.panelEmptyRanking}</p>`:`<table class="staff-table">
        <thead><tr><th>${s.panelNick}</th><th>${s.score}</th><th></th></tr></thead>
        <tbody>${n.map(i=>`<tr>
            <td>${c(i.nickname)}</td>
            <td>${i.score}</td>
            <td><button type="button" class="btn secondary" data-hide="${c(i.nickname)}">${s.panelHideNick}</button></td>
          </tr>`).join("")}</tbody>
      </table>`}${t}${w(e)}`}function le(e){return e.section==="list"?ie(e):e.section==="ranking"?ce(e):oe(e)}function ue(e,t){const n=L.map(o=>re(o,e.section)).join("");return`<section class="panel staff" data-screen="shell">
    <header class="staff-header">
      ${$()}
      ${H(t)}
      ${T()}
    </header>
    <nav class="actions staff-nav" aria-label="${s.panelTitle}">${n}</nav>
    <main class="staff-main" data-section="${e.section}">
      <h2 class="subtitle">${P[e.section]}</h2>
      ${le(e)}
    </main>
  </section>`}function de(e){const{session:t}=e;return t?R(t,e.allowList)?ue(e,t):se(t):ne()}const _=document.querySelector("#app");if(!(_ instanceof HTMLElement))throw new Error("The #app root is missing.");const k=_;document.title=`${s.panelTitle} — ${s.hotel}`;function fe(){try{return window.sessionStorage}catch{return x()}}function pe(){if(I(window.location.hostname))return Z();const e=new URLSearchParams(window.location.search).get("kodyUser")||A.mockUsername;return j({storage:fe(),user:{userId:`mock-${e}`,username:e}})}const U={auth:pe(),allowList:A.allowList,render:e=>{k.innerHTML=de(e)}};I(window.location.hostname)&&(U.staff=Q());const u=z(U);k.addEventListener("click",e=>{const t=e.target instanceof Element?e.target.closest("button"):null;if(!t)return;const n=t.dataset.section,o=t.dataset.hide;t.id==="login"?u.signIn():t.id==="logout"?u.signOut():t.id==="redeem"?u.redeem():t.id==="hide-ok"?u.hideNickname():t.id==="hide-cancel"?u.cancelHide():o?u.askHide(o):Y(n)&&u.select(n)});k.addEventListener("submit",e=>{if((e.target instanceof Element?e.target.closest("form"):null)?.id!=="check-form")return;e.preventDefault();const n=k.querySelector("#code-input"),o=n instanceof HTMLInputElement?n.value:"";u.check(o)});k.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLSelectElement){if(t.id==="filter-kind"){const n=t.value;(n==="all"||n==="base"||n==="share")&&u.setListKind(n)}if(t.id==="filter-used"){const n=t.value;(n==="all"||n==="open"||n==="used")&&u.setListUsed(n)}}});u.start();
