export const CORES_PRINCIPAIS_PADRAO = [
  { nome: "Preto", hex: "#000000" },
  { nome: "Branco", hex: "#ffffff" },
  { nome: "Vermelho", hex: "#dc2626" },
  { nome: "Azul", hex: "#2563eb" },
  { nome: "Verde", hex: "#16a34a" },
  { nome: "Amarelo", hex: "#eab308" },
];

export function normalizarMaterial(valor) {
  return (valor || "").trim().toLowerCase();
}

export function obterCoresDoMaterial({ nomeMaterial, coresPorMaterial, coresPrincipais }) {
  const chave = normalizarMaterial(nomeMaterial);
  const cadastradas = coresPorMaterial[chave] || [];
  return cadastradas.length > 0 ? cadastradas : coresPrincipais;
}

export function adicionarCorLocal({
  nomeMaterial,
  novaCorNome,
  novaCorHex,
  coresPrincipais,
  coresPorMaterial,
}) {
  const materialNormalizado = normalizarMaterial(nomeMaterial);
  const nomeNormalizado = (novaCorNome || "").trim();

  if (!nomeNormalizado) {
    return { ok: false, mensagem: "Informe o nome da cor." };
  }

  if (!materialNormalizado) {
    const existeNaPrincipal = coresPrincipais.some(
      (cor) =>
        cor.nome.toLowerCase() === nomeNormalizado.toLowerCase() ||
        cor.hex.toLowerCase() === novaCorHex.toLowerCase()
    );

    if (existeNaPrincipal) {
      return { ok: false, mensagem: "Essa cor ja existe na lista principal." };
    }

    return {
      ok: true,
      tipo: "principal",
      coresPrincipaisAtualizadas: [...coresPrincipais, { nome: nomeNormalizado, hex: novaCorHex }],
    };
  }

  const baseAtual = coresPorMaterial[materialNormalizado] || coresPrincipais;
  const existeNoMaterial = baseAtual.some(
    (cor) =>
      cor.nome.toLowerCase() === nomeNormalizado.toLowerCase() ||
      cor.hex.toLowerCase() === novaCorHex.toLowerCase()
  );

  if (existeNoMaterial) {
    return { ok: false, mensagem: "Essa cor ja existe para este material." };
  }

  return {
    ok: true,
    tipo: "material",
    materialNormalizado,
    coresDoMaterialAtualizadas: [...baseAtual, { nome: nomeNormalizado, hex: novaCorHex }],
  };
}