/* TOPPS BURGER — lógica do site (JavaScript puro, sem backend). Dados em config.js */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const R = v => "R$ " + v.toFixed(2).replace(".", ",");
const nz = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
const E = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const P = n => CONFIG.produtos.find(p => p.nome === n), X = id => CONFIG.adicionais.find(a => a.id === id), C = id => CONFIG.categorias.find(c => c.id === id);
const exOf = p => p.extras || C(p.cat).extras || [];
const zapLink = t => `https://wa.me/${CONFIG.whatsapp}` + (t ? "?text=" + encodeURIComponent(t) : "");
const f = $("#f");
let cart = [], oid = "", cur = "", mq = 1;
try { cart = (JSON.parse(localStorage.getItem("topps_cart")) || []).filter(i => P(i.n)).map(i => ({ ...i, ex: i.ex.filter(X) })); } catch (e) { cart = []; }

const unit = i => P(i.n).preco + i.ex.reduce((s, id) => s + X(id).preco, 0);
const sub = () => cart.reduce((s, i) => s + unit(i) * i.q, 0);
const linhas = i => [i.sb && "Sabor: " + i.sb, i.sem.length && "Sem: " + i.sem.join(", "), i.ex.length && "Adicionais: " + i.ex.map(id => X(id).nome).join(", "), i.ob && "Obs: " + i.ob].filter(Boolean);
const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("on"); setTimeout(() => t.classList.remove("on"), 1800); };
const save = () => { try { localStorage.setItem("topps_cart", JSON.stringify(cart)); } catch (e) {} render(); };

/* ---------- Taxa de entrega por bairro ---------- */
function taxa() {
  if (f.tipo.value === "retirada") return { v: 0, t: "Retirada no local: sem taxa de entrega." };
  const b = nz(f.bairro.value), t = CONFIG.taxas.find(x => nz(x.bairro) === b);
  if (!b) return { v: null, t: "Informe o bairro para calcular a entrega." };
  if (!t) return { v: null, t: "Taxa de entrega a confirmar com o estabelecimento." };
  if (!t.ativo) return { v: null, off: 1, t: "Infelizmente não entregamos neste bairro." };
  if (t.taxa == null) return { v: null, t: "Taxa de entrega a confirmar com o estabelecimento." };
  return { v: t.taxa, t: "Taxa de entrega: " + R(t.taxa) };
}
function totHtml(full) {
  const s = sub(), t = full ? taxa() : { v: null }, v = t.v;
  return `<div><span>Subtotal</span><b>${R(s)}</b></div>` +
    (full ? `<div><span>Entrega</span><b>${v != null ? R(v) : "a confirmar"}</b></div>` : "") +
    `<div class="gt"><span>Total</span><b>${R(s + (v || 0))}${full && v == null ? " + entrega" : ""}</b></div>`;
}

/* ---------- Cardápio ---------- */
const card = p => `<article class="card"><h3>${p.nome}</h3><p>${p.desc || p.ing}</p><b class="price">${R(p.preco)}</b><button class="btn sm" data-n="${p.nome}">+ Adicionar</button></article>`;

document.title = CONFIG.nome + " — Hamburgueria e Delivery";
$("#zap").href = zapLink("Olá! Gostaria de fazer um pedido.");
$("#gDest").innerHTML = CONFIG.produtos.filter(p => p.dest).map(card).join("");
const cats = [...CONFIG.categorias, { id: "extras", icone: "➕", nome: "Acréscimos" }];
$("#tabs").innerHTML = cats.map(c => `<button class="cat" data-cat="${c.id}"><span>${c.icone}</span>${c.nome}</button>`).join("");
function showCat(id, rolar) {
  $$("#tabs .cat").forEach(b => b.classList.toggle("on", b.dataset.cat === id));
  $("#gMenu").innerHTML = id === "extras"
    ? `<div class="grid">${CONFIG.adicionais.map(a => `<article class="card"><h3>${a.nome}</h3><b class="price">${R(a.preco)}</b></article>`).join("")}</div><p class="note">Escolha os acréscimos ao adicionar o hambúrguer.</p>`
    : `<div class="grid">${CONFIG.produtos.filter(p => p.cat === id).map(card).join("")}</div>`;
  if (rolar) $("#gMenu").scrollIntoView({ behavior: "smooth", block: "start" });
}
$("#tabs").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) showCat(b.dataset.cat, 1); });
showCat(CONFIG.categorias[0].id);
$("#addr").textContent = `📍 ${CONFIG.endereco}, ${CONFIG.cidade}/${CONFIG.estado}`;
$("#info").innerHTML = `🛵 <b>Peça por Delivery</b> ou retire no local.<br>📍 ${CONFIG.endereco}, ${CONFIG.cidade}/${CONFIG.estado}<br>📞 <a href="${zapLink()}" target="_blank" rel="noopener">${CONFIG.telefone}</a> (WhatsApp)<br>💸 Taxa de entrega informada no pedido, conforme o bairro.`;
$("#rodape").innerHTML = `${CONFIG.nome} • ${CONFIG.endereco}, ${CONFIG.cidade}/${CONFIG.estado} • ${CONFIG.telefone}`;

/* ---------- Modal de personalização ---------- */
function abrir(n) {
  const p = P(n), ex = exOf(p), rem = p.ing ? p.ing.split(", ").filter(x => nz(x) !== "pão") : [];
  cur = n; mq = 1;
  $("#sheet").innerHTML = `<button class="x" data-close aria-label="Fechar">✕</button><h3>${p.nome}</h3><p class="note">${p.desc || p.ing}</p>
${p.sabores ? `<h4>Sabor</h4><select id="mSb">${p.sabores.map(s => `<option>${s}</option>`).join("")}</select>` : ""}
${rem.length ? `<h4>Remover ingredientes</h4>${rem.map(r => `<label class="chk"><input type="checkbox" class="mSem" value="${r}"> Sem ${r}</label>`).join("")}` : ""}
${ex.length ? `<h4>Adicionais</h4>${ex.map(id => `<label class="chk"><input type="checkbox" class="mEx" value="${id}"> ${X(id).nome} <em>+ ${R(X(id).preco)}</em></label>`).join("")}` : ""}
<h4>Observações</h4><textarea id="mOb" rows="2" placeholder="Ex.: molho à parte, bem passado..."></textarea>
<div class="qty"><button data-q="-1">−</button><b id="mQ">1</b><button data-q="1">+</button></div><button class="btn" id="mAdd"></button>`;
  mUpd(); $("#modal").hidden = false; document.body.style.overflow = "hidden";
}
function mUpd() {
  const s = $$(".mEx:checked").reduce((a, c) => a + X(c.value).preco, 0);
  $("#mQ").textContent = mq; $("#mAdd").textContent = `Adicionar ${mq}x • ${R((P(cur).preco + s) * mq)}`;
}
function fechar() { $$(".ov").forEach(o => o.hidden = true); document.body.style.overflow = ""; }
$("#sheet").addEventListener("change", mUpd);

/* ---------- Carrinho ---------- */
function render() {
  const n = cart.reduce((s, i) => s + i.q, 0);
  $$(".cnt").forEach(e => e.textContent = n);
  $("#fabTot").textContent = n ? R(sub()) : "";
  $("#lista").innerHTML = cart.length ? cart.map((i, k) => `<div class="it"><div><b>${i.q}x ${i.n}</b>${linhas(i).map(l => `<small>${E(l)}</small>`).join("")}</div>
<div class="r"><b>${R(unit(i) * i.q)}</b><div class="qty s"><button data-c="${k}" data-d="-1">−</button><button data-c="${k}" data-d="1">+</button><button data-c="${k}" data-d="0" aria-label="Remover">🗑</button></div></div></div>`).join("") : `<p class="note">Seu carrinho está vazio. Escolha algo no cardápio!</p>`;
  $("#tot1").innerHTML = totHtml(0);
}
function step(n) {
  [1, 2, 3].forEach(i => $("#s" + i).hidden = i !== n);
  $("#tot1").innerHTML = totHtml(0); if (n === 3) $("#tot3").innerHTML = totHtml(1);
  $("#panel .sheet").scrollTop = 0;
}

/* ---------- Formulário ---------- */
$("#pags").innerHTML = CONFIG.pagamentos.map(p => `<label><input type="radio" name="pag" value="${p}"> ${p}</label>`).join("");
$("#bairros").innerHTML = CONFIG.taxas.filter(t => t.ativo).map(t => `<option value="${t.bairro}">`).join("");
f.cidade.value = CONFIG.cidade;
function upd() {
  $("#end").hidden = f.tipo.value !== "entrega";
  $("#troco").hidden = f.pag.value !== "Dinheiro";
  $("#pixInfo").hidden = f.pag.value !== "Pix";
  $("#pixInfo").textContent = CONFIG.pix ? "Chave Pix: " + CONFIG.pix : "A chave Pix será enviada pelo estabelecimento na conversa do WhatsApp.";
  $("#taxaInfo").textContent = taxa().t;
}
f.addEventListener("input", upd); f.addEventListener("change", upd);
f.cep.addEventListener("input", () => f.cep.value = f.cep.value.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2"));

f.addEventListener("submit", e => {
  e.preventDefault();
  const er = [], v = n => f[n].value.trim(), ent = f.tipo.value === "entrega", t = taxa(), tot = sub() + (t.v || 0);
  if (!cart.length) er.push("Seu carrinho está vazio.");
  if (v("nome").split(/\s+/).length < 2) er.push("Informe seu nome completo.");
  if (v("tel").replace(/\D/g, "").length < 10) er.push("Informe um telefone válido com DDD.");
  if (ent) {
    [["rua", "a rua"], ["num", "o número"], ["bairro", "o bairro"], ["cidade", "a cidade"]].forEach(([n, l]) => v(n) || er.push("Informe " + l + "."));
    if (t.off) er.push(t.t);
  }
  if (!f.pag.value) er.push("Escolha a forma de pagamento.");
  if (f.pag.value === "Dinheiro" && f.precisaTroco.checked) {
    const tv = parseFloat(v("trocoPara").replace(",", "."));
    if (!(tv >= tot)) er.push("O valor para troco deve ser igual ou maior que " + R(tot) + ".");
  }
  $("#err").innerHTML = er.join("<br>");
  if (er.length) return;
  oid = "TB" + Date.now().toString(36).slice(-5).toUpperCase();
  $("#msg").textContent = mensagem(); step(3);
});

/* ---------- Mensagem do WhatsApp ---------- */
function mensagem() {
  const v = n => f[n].value.trim(), ent = f.tipo.value === "entrega", t = taxa(), s = sub();
  const L = [`*NOVO PEDIDO - ${CONFIG.nome}*`, `Pedido: #${oid}`, "", `*Cliente:* ${v("nome")}`, `*Telefone:* ${v("tel")}`, "", "*Itens:*"];
  cart.forEach(i => L.push(`• ${i.q}x ${i.n} — ${R(unit(i) * i.q)}`, ...linhas(i).map(x => "   ▪ " + x)));
  L.push("");
  if (ent) {
    L.push("*Entrega no endereço:*", `${v("rua")}, ${v("num")}${v("comp") ? " - " + v("comp") : ""}`, `${v("bairro")} - ${v("cidade")}/${CONFIG.estado}`);
    if (v("cep")) L.push("CEP: " + v("cep"));
    if (v("ref")) L.push("Referência: " + v("ref"));
    if (v("obsE")) L.push("Obs. para o entregador: " + v("obsE"));
  } else L.push("*Retirada no estabelecimento*");
  L.push("", "*Pagamento:* " + f.pag.value);
  if (f.pag.value === "Dinheiro") L.push(f.precisaTroco.checked ? "Troco para: R$ " + v("trocoPara") : "Não precisa de troco");
  if (f.pag.value === "Pix") L.push(CONFIG.pix ? "Chave Pix: " + CONFIG.pix : "(aguardo a chave Pix)");
  L.push("", `Subtotal: ${R(s)}`, `Entrega: ${t.v != null ? R(t.v) : "a confirmar"}`, `*Total: ${R(s + (t.v || 0))}${t.v == null ? " + entrega" : ""}*`);
  return L.join("\n");
}

/* ---------- Eventos ---------- */
document.addEventListener("click", e => {
  const t = e.target;
  if (t.classList.contains("ov") || t.closest("[data-close]")) return fechar();
  if (t.closest(".open-cart")) { $("#panel").hidden = false; document.body.style.overflow = "hidden"; step(1); return; }
  const b = t.closest("button"); if (!b) return;
  if (b.dataset.n) abrir(b.dataset.n);
  if (b.dataset.q) { mq = Math.max(1, mq + +b.dataset.q); mUpd(); }
  if (b.dataset.c !== undefined) {
    const k = +b.dataset.c, d = +b.dataset.d;
    if (d) { cart[k].q += d; if (cart[k].q < 1) cart.splice(k, 1); } else cart.splice(k, 1);
    save();
  }
  if (b.id === "mAdd") {
    const it = { n: cur, q: mq, sem: $$(".mSem:checked").map(c => c.value), ex: $$(".mEx:checked").map(c => c.value), sb: $("#mSb") ? $("#mSb").value : "", ob: $("#mOb").value.trim() };
    const k = x => JSON.stringify([x.n, x.sem, x.ex, x.sb, x.ob]), m = cart.find(x => k(x) === k(it));
    m ? m.q += it.q : cart.push(it);
    save(); fechar(); toast("✔ Adicionado ao carrinho");
  }
});
$("#clear").onclick = () => { if (cart.length && confirm("Esvaziar o carrinho?")) { cart = []; save(); } };
$("#irForm").onclick = () => cart.length ? (upd(), step(2)) : toast("Adicione um item primeiro");
$("#vCart").onclick = () => step(1);
$("#vForm").onclick = () => step(2);
$("#send").onclick = () => { const u = zapLink($("#msg").textContent); window.open(u, "_blank") || (location.href = u); };

render(); upd();
