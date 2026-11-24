/* ============================================================
   CONFIGURAÇÃO DA TOPPS BURGER — edite SOMENTE este arquivo
   para mudar WhatsApp, preços, produtos, taxas e pagamentos.
   ============================================================ */
const CONFIG = {
  nome: "TOPPS BURGER",
  whatsapp: "5584996554600",          // formato internacional
  telefone: "(84) 99655-4600",
  endereco: "Avenida Felix Rodrigues, Nº 314",
  cidade: "Pendências",
  estado: "RN",

  // Chave Pix ou instruções (deixe "" até ser informada; o site NÃO inventa chave)
  pix: "",

  // Formas de pagamento (mantenha os nomes "Pix" e "Dinheiro" para ativar chave/troco)
  pagamentos: ["Pix", "Dinheiro", "Cartão de crédito", "Cartão de débito"],

  // Taxas por bairro. taxa: número, ou null = "a confirmar". ativo:false = não entrega.
  // Exemplo (remova as // para usar):
  // { bairro: "Centro", taxa: 5, ativo: true },
  taxas: [],

  // Adicionais (a duplicidade do Catupiry foi mantida como no cardápio)
  adicionais: [
    { id: "cat1", nome: "Queijo Catupiry", preco: 2 },
    { id: "cat2", nome: "Queijo Catupiry", preco: 2 },
    { id: "coa",  nome: "Queijo Coalho",   preco: 2 },
    { id: "fra",  nome: "Frango",          preco: 3 },
    { id: "cal",  nome: "Calabresa",       preco: 3 },
    { id: "sol",  nome: "Carne de Sol",    preco: 4 },
    { id: "bac",  nome: "Bacon",           preco: 4 }
  ],

  // "extras" = adicionais disponíveis na categoria (pode ser sobrescrito por produto)
  categorias: [
    { id: "burgers",    nome: "Hambúrgueres",  icone: "🍔", extras: ["cat1","cat2","coa","fra","cal","sol","bac"] },
    { id: "sucos",      nome: "Sucos",         icone: "🧃" },
    { id: "vitaminas",  nome: "Vitaminas",     icone: "🥛" },
    { id: "refris",     nome: "Refrigerantes", icone: "🥤" }
  ],

  // Campos: cat, nome, preco, ing (ingredientes), desc, sabores, extras, dest (destaque)
  produtos: [
    { cat:"burgers", nome:"Burguer", preco:9, ing:"Pão, hambúrguer, salada, queijo, presunto, molho especial" },
    { cat:"burgers", nome:"Burguer Completo", preco:10, ing:"Pão, hambúrguer, ovo, salada, queijo, presunto, molho especial" },
    { cat:"burgers", nome:"X-Frango", preco:13, ing:"Pão, frango, ovo, salada, queijo, presunto, molho especial" },
    { cat:"burgers", nome:"X-Calabresa", preco:14, ing:"Pão, calabresa, ovo, salada, queijo, presunto, molho especial" },
    { cat:"burgers", nome:"X-Bacon", preco:14, ing:"Pão, bacon, ovo, salada, queijo, presunto, molho especial" },
    { cat:"burgers", nome:"Sertanejo", preco:14, dest:1, ing:"Pão, carne de sol, ovo, salada, queijo, presunto, molho especial" },
    { cat:"burgers", nome:"Fran-Catupiry", preco:14, ing:"Pão, frango, catupiry, ovo, salada, queijo, presunto, molho especial" },
    { cat:"burgers", nome:"Frango e Cheddar", preco:14, ing:"Pão, frango, cheddar, ovo, salada, queijo, presunto, molho especial" },
    { cat:"burgers", nome:"Double", preco:16, dest:1, ing:"Pão, milho, batata palha, 2 hambúrgueres, 2 ovos, 2 queijos, 2 presuntos, salada, molho especial" },
    { cat:"burgers", nome:"Fran-Bacon", preco:17, dest:1, ing:"Pão, frango, bacon, ovo, salada, queijo, presunto, molho especial" },
    { cat:"burgers", nome:"Matuto", preco:18, dest:1, ing:"Pão, carne de sol, bacon, queijo coalho, cebola assada, catupiry, presunto, molho especial" },

    { cat:"sucos", nome:"Suco (Acerola, Goiaba ou Cajá)", preco:6, desc:"Escolha o sabor.", sabores:["Acerola","Goiaba","Cajá"] },
    { cat:"sucos", nome:"Suco (Uva ou Maracujá)", preco:6, desc:"Escolha o sabor.", sabores:["Uva","Maracujá"] },
    { cat:"vitaminas", nome:"Vitamina (Acerola, Goiaba ou Cajá)", preco:8, desc:"Escolha o sabor.", sabores:["Acerola","Goiaba","Cajá"] },
    { cat:"vitaminas", nome:"Vitamina (Uva ou Maracujá)", preco:10, desc:"Escolha o sabor.", sabores:["Uva","Maracujá"] },

    { cat:"refris", nome:"Refrigerante Lata 350 ml", preco:7, desc:"Informe o sabor nas observações." },
    { cat:"refris", nome:"Guaraná 1 L", preco:9, desc:"Garrafa 1 litro." },
    { cat:"refris", nome:"Pepsi 1 L", preco:9, desc:"Garrafa 1 litro." },
    { cat:"refris", nome:"Coca-Cola 1 L", preco:10, desc:"Garrafa 1 litro." },
    { cat:"refris", nome:"Coca-Cola 2 L", preco:15, desc:"Garrafa 2 litros." },
    { cat:"refris", nome:"Guaraná 2 L", preco:13, desc:"Garrafa 2 litros." },
    { cat:"refris", nome:"Laranja 2 L", preco:13, desc:"Garrafa 2 litros." },
    { cat:"refris", nome:"Uva 2 L", preco:13, desc:"Garrafa 2 litros." }
  ]
};
