import{B as d,l as j,d as E,q as n,S as P}from"./styles-BvGVb6nR.js";const $="syl-panel-mock-kody-session";function F(e,t){if(!e)return!1;const r=e.username.trim().toLowerCase();return t.some(s=>{const i=s.trim();return i===e.userId||i.toLowerCase()===r})}function x(e){if(typeof e!="object"||e===null)return null;const{userId:t,username:r}=e;return typeof t!="string"||typeof r!="string"?null:{userId:t,username:r}}function D(e){if(e===null)return null;try{return x(JSON.parse(e))}catch{return null}}function K(e){const{storage:t,user:r}=e;return{async restore(){return D(t.getItem($))},async signIn(){return t.setItem($,JSON.stringify(r)),{...r}},async signOut(){t.removeItem($)}}}function V(){const e=new Map;return{getItem:t=>e.get(t)??null,setItem:(t,r)=>{e.set(t,r)},removeItem:t=>{e.delete(t)}}}function y(e){if(typeof e=="object"&&e!==null)return e;throw new d("server","Unexpected staff response.")}function b(e){return e==null?null:String(e)}function J(e){return e==null?null:Number(e)}function N(e){const t=y(e);return{code:String(t.code??""),status:t.status,nickname:b(t.nickname),kind:b(t.kind),discountPercent:Number(t.discount_percent??0),pricePerPerson:J(t.price_per_person),earnedAt:b(t.earned_at),usedAt:b(t.used_at)}}function q(e){const t=y(e);return{code:String(t.code),nickname:String(t.nickname),score:Number(t.score),kind:t.kind,referrals:Number(t.referrals),earnedAt:String(t.earned_at),usedAt:b(t.used_at)}}function W(e){const t=y(e);return{players:Number(t.players),codes:Number(t.codes),shareCodes:Number(t.share_codes),redeemed:Number(t.redeemed)}}function Q(e){const t=y(e);return{nickname:String(t.nickname),score:Number(t.score)}}async function z(e){const t=await e.text();if(t.length===0)return null;try{return JSON.parse(t)}catch{throw new d("server","Unexpected staff response.")}}function Y(e){if(e===401||e===403)throw new d("forbidden","Not signed in as staff.");if(e>=400)throw new d("server","Staff API failed.")}async function f(e,t){try{const r=await fetch(e,{credentials:"same-origin",...t,headers:{Accept:"application/json",...t?.body?{"Content-Type":"application/json"}:{},...t?.headers}}),s=await z(r);return Y(r.status),s}catch(r){throw r instanceof d?r:new d("network","Staff API is offline.")}}function G(){return{async check(e){return N(await f("/api/staff/check",{method:"POST",body:JSON.stringify({code:E(e)})}))},async redeem(e,t){const r=y(await f("/api/staff/redeem",{method:"POST",body:JSON.stringify({code:E(e),note:t??null})}));return{ok:!!r.ok,check:N(r.check)}},async listCodes(e,t){const r=`/api/staff/codes?limit=${e}&offset=${t}`,s=await f(r);if(!Array.isArray(s))throw new d("server","Bad list.");return s.map(q)},async stats(){return W(await f("/api/staff/stats"))},async hideNickname(e){return!!await f("/api/staff/hide-nickname",{method:"POST",body:JSON.stringify({nickname:e})})},async listTopRounds(e){const t=await f(`/api/staff/rounds?limit=${e}`);if(!Array.isArray(t))throw new d("server","Bad rounds.");return t.map(j)},async confirmReplay(){return!1},async getRoundLog(){return null}}}async function X(e){const t=y(await f("/api/staff/verify-round",{method:"POST",body:JSON.stringify({roundId:e})}));return{ok:!!t.ok,flags:Array.isArray(t.flags)?t.flags.map(r=>String(r)):[],replayedScore:Number(t.replayedScore),score:Number(t.score)}}async function Z(){const e=await f("/api/staff/ranking");if(!Array.isArray(e))throw new d("server","Bad ranking.");return e.map(Q)}const T=["check","list","ranking"];function ee(e){const{auth:t,allowList:r,render:s}=e,i=e.ranking??Z;let m={session:null,allowList:r,section:"check"};function o(a){m={...m,...a},s(m)}async function v(a){try{o({session:await a()})}catch{o({session:null})}}function h(a){return a instanceof d&&a.kind==="forbidden"?n.panelNoAccess:n.panelError}async function M(){if(e.staff){o({busy:!0,checkError:null});try{const[a,l]=await Promise.all([e.staff.listCodes(200,0),e.staff.stats()]);o({list:a,stats:l,busy:!1})}catch(a){o({busy:!1,checkError:h(a)})}}}async function k(){o({busy:!0,checkError:null});try{const a=await i();let l=[];e.staff?.listTopRounds&&(l=await e.staff.listTopRounds(20).catch(()=>[])),o({ranking:a,rounds:l,busy:!1})}catch(a){o({busy:!1,checkError:h(a)})}}return{start:()=>v(()=>t.restore()),signIn:()=>v(()=>t.signIn()),async signOut(){await t.signOut().catch(()=>{}),o({session:null,section:"check",check:null,checkError:null})},select(a){if(o({section:a,checkError:null,hidePending:null}),a==="list")return M();if(a==="ranking")return k()},setCheckQuery(a){o({checkQuery:a})},async check(a){if(!e.staff){o({checkError:n.panelError,check:null});return}o({busy:!0,checkQuery:a,checkError:null,check:null});try{o({check:await e.staff.check(a),busy:!1})}catch(l){o({busy:!1,check:null,checkError:h(l)})}},async redeem(){const a=m.check?.code;if(!(!e.staff||!a)){o({busy:!0,checkError:null});try{const l=await e.staff.redeem(a);o({check:l.check,busy:!1})}catch(l){o({busy:!1,checkError:h(l)})}}},setListKind(a){o({listKind:a})},setListUsed(a){o({listUsed:a})},askHide(a){o({hidePending:a})},cancelHide(){o({hidePending:null})},async verifyRound(a){o({busy:!0,checkError:null});try{await X(a),o({busy:!1}),await k()}catch(l){o({busy:!1,checkError:h(l)})}},async hideNickname(){const a=m.hidePending;if(!(!e.staff||!a)){o({busy:!0,checkError:null});try{await e.staff.hideNickname(a),o({hidePending:null,busy:!1}),await k()}catch(l){o({busy:!1,checkError:h(l)})}}}}}function te(e){return T.some(t=>t===e)}function ne(e){const t=e.list??[],r=e.listKind??"all",s=e.listUsed??"all";return t.filter(i=>!(r!=="all"&&i.kind!==r||s==="open"&&i.usedAt||s==="used"&&!i.usedAt))}function R(e){return e.endsWith(".kody.run")||e.endsWith(".kody.codes")}function A(e){return typeof e=="object"&&e!==null?e:null}function re(e,t){for(const r of t){const s=e[r];if(typeof s=="string"&&s.length>0)return s}return""}function L(e,t){for(const r of e){if(!r)continue;const s=re(r,t);if(s)return s}return""}function se(e){const t=A(e);if(!t)return null;const r=A(t.user)??t,s=L([r,t],["id","userId"]),i=L([r,t],["username","login"]);return!s||!i?null:{userId:s,username:i}}function ae(e){window.location.assign(e)}const oe={loginPath:"/-/auth/login?return_to=/panel/",logoutPath:"/-/auth/logout?return_to=/panel/",mePath:"/-/auth/me"};function ie(e={}){return{fetch,assign:ae,...oe,...e}}async function ce(e,t){try{const r=await e(t,{credentials:"same-origin"});return r.ok?se(await r.json()):null}catch{return null}}function le(e){const t=ie(e);return{restore:()=>ce(t.fetch,t.mePath),async signIn(){return t.assign(t.loginPath),null},async signOut(){t.assign(t.logoutPath)}}}const O={check:n.panelNavCheck,list:n.panelNavList,ranking:n.panelNavRanking},ue={valid:n.panelStatusValid,already_used:n.panelStatusUsed,unknown:n.panelStatusUnknown,expired:n.panelStatusExpired},de={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function c(e){return e.replace(/[&<>"']/g,t=>de[t]??t)}function C(e){return e==="share"?n.panelDiscountShare:e==="base"?n.panelDiscountBase:"—"}function I(e){if(!e)return"—";const t=new Date(e);return Number.isNaN(t.getTime())?c(e):c(t.toLocaleString("pl-PL",{dateStyle:"short",timeStyle:"short"}))}function S(){return`<h1 class="title">${n.panelTitle}</h1><p class="subtitle">${n.hotel}</p>`}function H(e){return`<p class="note">${n.panelSignedInAs}: <strong>${c(e.username)}</strong></p>`}function _(){return`<button type="button" class="btn secondary" id="logout">${n.panelSignOut}</button>`}function fe(){return`<section class="panel" data-screen="login">
    ${S()}
    <p class="how">${n.panelLoginHint}</p>
    <div class="actions">
      <button type="button" class="btn" id="login">${n.panelSignIn}</button>
    </div>
  </section>`}function he(e){return`<section class="panel" data-screen="denied">
    ${S()}
    <h2 class="lock">${n.panelNoAccess}</h2>
    <p class="how">${n.panelNoAccessHint}</p>
    ${H(e)}
    <div class="actions">${_()}</div>
  </section>`}function pe(e,t){return`<button type="button" class="btn secondary nav-item" data-section="${e}"${e===t?' aria-current="page"':""}>${O[e]}</button>`}function w(e){return e.checkError?`<p class="note staff-error" role="alert">${c(e.checkError)}</p>`:""}function ye(e){const t=e.status==="valid";return`<dl class="staff-result" data-status="${e.status}">
    <div><dt>${n.panelCodeLabel}</dt><dd>${c(e.code)}</dd></div>
    <div><dt>${n.panelStatus}</dt><dd>${ue[e.status]}</dd></div>
    <div><dt>${n.panelNick}</dt><dd>${c(e.nickname??"—")}</dd></div>
    <div><dt>${n.panelDiscount}</dt><dd>${C(e.kind)}</dd></div>
    <div><dt>${n.panelEarnedAt}</dt><dd>${I(e.earnedAt)}</dd></div>
  </dl>
  ${t?`<div class="actions"><button type="button" class="btn" id="redeem">${n.panelRedeem}</button></div>`:""}`}function me(e){const t=c(e.checkQuery??"");return`<form class="staff-form" id="check-form">
    <label class="staff-label" for="code-input">${n.panelCodeLabel}</label>
    <input class="staff-input" id="code-input" name="code" type="text" maxlength="16" autocomplete="off" placeholder="${n.panelCodePlaceholder}" value="${t}" />
    <div class="actions">
      <button type="submit" class="btn" id="check"${e.busy?" disabled":""}>${n.panelCheckAction}</button>
    </div>
  </form>
  ${e.check?ye(e.check):""}
  ${w(e)}`}function be(e){const t=e.stats;return t?`<ul class="staff-stats">
        <li>${n.panelPlayers}: <strong>${t.players}</strong></li>
        <li>${n.panelCodesIssued}: <strong>${t.codes}</strong></li>
        <li>${n.panelCodesUsed}: <strong>${t.redeemed}</strong></li>
      </ul>`:""}function p(e,t){return e===t?" selected":""}function ge(e){const t=e.listKind??"all",r=e.listUsed??"all";return`<div class="staff-filters">
      <label>${n.panelFilterKind}
        <select id="filter-kind">
          <option value="all"${p(t,"all")}>${n.panelFilterAll}</option>
          <option value="base"${p(t,"base")}>${n.panelDiscountBase}</option>
          <option value="share"${p(t,"share")}>${n.panelDiscountShare}</option>
        </select>
      </label>
      <label>${n.panelFilterStatus}
        <select id="filter-used">
          <option value="all"${p(r,"all")}>${n.panelFilterAll}</option>
          <option value="open"${p(r,"open")}>${n.panelStatusValid}</option>
          <option value="used"${p(r,"used")}>${n.panelStatusUsed}</option>
        </select>
      </label>
    </div>`}function ke(e){const t=ne(e);if(t.length===0)return`<p class="note">${n.panelEmptyList}</p>`;const r=t.map(s=>`<tr>
            <td>${c(s.code)}</td>
            <td>${c(s.nickname)}</td>
            <td>${C(s.kind)}</td>
            <td>${s.usedAt?n.panelStatusUsed:n.panelStatusValid}</td>
            <td>${I(s.earnedAt)}</td>
          </tr>`).join("");return`<table class="staff-table">
        <thead><tr>
          <th>${n.panelCodeLabel}</th>
          <th>${n.panelNick}</th>
          <th>${n.panelDiscount}</th>
          <th>${n.panelStatus}</th>
          <th>${n.panelEarnedAt}</th>
        </tr></thead>
        <tbody>${r}</tbody>
      </table>`}function $e(e){return`${be(e)}
    ${ge(e)}
    ${ke(e)}
    ${w(e)}`}function Se(e){return`<p class="note" role="alert">${n.panelHideConfirm} <strong>${c(e)}</strong></p>
       <div class="actions">
         <button type="button" class="btn" id="hide-ok">${n.panelHideOk}</button>
         <button type="button" class="btn secondary" id="hide-cancel">${n.panelHideCancel}</button>
       </div>`}function we(e){const t=e.ranking??[];if(t.length===0)return`<p class="note">${n.panelEmptyRanking}</p>`;const r=t.map(s=>`<tr>
            <td>${c(s.nickname)}</td>
            <td>${s.score}</td>
            <td><button type="button" class="btn secondary" data-hide="${c(s.nickname)}">${n.panelHideNick}</button></td>
          </tr>`).join("");return`<table class="staff-table">
        <thead><tr><th>${n.panelNick}</th><th>${n.score}</th><th></th></tr></thead>
        <tbody>${r}</tbody>
      </table>`}function ve(e){return e.length?e.join(", "):"—"}function Ee(e){return e===!0?n.panelReplayOk:e===!1?n.panelReplayBad:n.panelReplayPending}function Ne(e){const t=e.rounds??[];if(t.length===0)return`<p class="note">${n.panelEmptyRounds}</p>`;const r=t.map(s=>{const i=Math.round(s.wallMs/1e3);return`<tr>
            <td>${c(s.nickname)}</td>
            <td>${s.score}</td>
            <td>${i} s</td>
            <td>${c(ve(s.flags))}</td>
            <td>${c(Ee(s.replayOk))}</td>
            <td><button type="button" class="btn secondary" data-verify="${c(s.id)}">${n.panelVerify}</button></td>
          </tr>`}).join("");return`<h2>${n.panelRounds}</h2>
    <table class="codes">
      <thead><tr><th>${n.panelNick}</th><th>${n.score}</th><th>${n.panelWallTime}</th><th>${n.panelFlags}</th><th>${n.panelReplay}</th><th></th></tr></thead>
      <tbody>${r}</tbody>
    </table>`}function Ae(e){const t=e.hidePending?Se(e.hidePending):"";return`${we(e)}${Ne(e)}${t}${w(e)}`}function Le(e){return e.section==="list"?$e(e):e.section==="ranking"?Ae(e):me(e)}function Pe(e,t){const r=T.map(s=>pe(s,e.section)).join("");return`<section class="panel staff" data-screen="shell">
    <header class="staff-header">
      ${S()}
      ${H(t)}
      ${_()}
    </header>
    <nav class="actions staff-nav" aria-label="${n.panelTitle}">${r}</nav>
    <main class="staff-main" data-section="${e.section}">
      <h2 class="subtitle">${O[e.section]}</h2>
      ${Le(e)}
    </main>
  </section>`}function Te(e){const{session:t}=e;return t?F(t,e.allowList)?Pe(e,t):he(t):fe()}const U=document.querySelector("#app");if(!(U instanceof HTMLElement))throw new Error("The #app root is missing.");const g=U;document.title=`${n.panelTitle} — ${n.hotel}`;function Re(){try{return window.sessionStorage}catch{return V()}}function Oe(){if(R(window.location.hostname))return le();const e=new URLSearchParams(window.location.search).get("kodyUser")||P.mockUsername;return K({storage:Re(),user:{userId:`mock-${e}`,username:e}})}const B={auth:Oe(),allowList:P.allowList,render:e=>{g.innerHTML=Te(e)}};R(window.location.hostname)&&(B.staff=G());const u=ee(B);g.addEventListener("click",e=>{const t=e.target instanceof Element?e.target.closest("button"):null;if(!t)return;const r=t.dataset.section,s=t.dataset.hide,i=t.dataset.verify;t.id==="login"?u.signIn():t.id==="logout"?u.signOut():t.id==="redeem"?u.redeem():t.id==="hide-ok"?u.hideNickname():t.id==="hide-cancel"?u.cancelHide():s?u.askHide(s):i?u.verifyRound(i):te(r)&&u.select(r)});g.addEventListener("submit",e=>{if((e.target instanceof Element?e.target.closest("form"):null)?.id!=="check-form")return;e.preventDefault();const r=g.querySelector("#code-input"),s=r instanceof HTMLInputElement?r.value:"";u.check(s)});g.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLSelectElement){if(t.id==="filter-kind"){const r=t.value;(r==="all"||r==="base"||r==="share")&&u.setListKind(r)}if(t.id==="filter-used"){const r=t.value;(r==="all"||r==="open"||r==="used")&&u.setListUsed(r)}}});u.start();
