"use client";

export default function CoresMaterialSection({
  show,
  nomesCores,
  coresSelecionadas,
  mostrarFormularioCor,
  novaCorNome,
  novaCorHex,
  onAbrirFormulario,
  onCancelarFormulario,
  onNomeChange,
  onHexChange,
  onSalvarCor,
  onToggleCor,
}) {
  if (!show) {
    return null;
  }

  return (
    <div className="mt-1 p-3 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-2">
      <p className="text-xs font-bold uppercase text-gray-500">Cores principais</p>

      <div className="max-h-40 overflow-auto custom-scrollbar border border-gray-200 rounded-lg bg-white divide-y divide-gray-100">
        {nomesCores.map((cor) => (
          <button
            key={`${cor.nome}-${cor.hex}`}
            type="button"
            onClick={() => onToggleCor(cor)}
            className={`w-full flex items-center gap-2 p-2 text-left transition ${
              coresSelecionadas.some((selecionada) => selecionada.nome === cor.nome && selecionada.hex === cor.hex)
                ? "bg-[#f0faf5]"
                : "hover:bg-gray-50"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-sm border shrink-0 ${
                coresSelecionadas.some((selecionada) => selecionada.nome === cor.nome && selecionada.hex === cor.hex)
                  ? "border-[#5ab58f] ring-2 ring-[#c8e3d5]"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: cor.hex }}
              aria-hidden
            />
            <span className="text-sm text-gray-700 font-medium">{cor.nome}</span>
            {coresSelecionadas.some((selecionada) => selecionada.nome === cor.nome && selecionada.hex === cor.hex) && (
              <span className="ml-auto text-xs font-bold text-[#5ab58f] uppercase">Selecionada</span>
            )}
          </button>
        ))}
      </div>

      {!mostrarFormularioCor ? (
        <button
          type="button"
          onClick={onAbrirFormulario}
          className="self-start text-sm font-bold text-[#264f41] hover:underline"
        >
          + Adicionar cor
        </button>
      ) : (
        <div className="p-2 border border-dashed border-gray-300 rounded-lg bg-white flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nome da cor"
            className="border border-gray-300 p-2 rounded-lg outline-none focus:border-[#5ab58f] text-sm"
            value={novaCorNome}
            onChange={(e) => onNomeChange(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={novaCorHex}
              onChange={(e) => onHexChange(e.target.value)}
              className="w-11 h-9 p-0 border border-gray-300 rounded cursor-pointer"
            />
            <span className="text-xs text-gray-500 font-mono">{novaCorHex}</span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSalvarCor}
              className="px-3 py-2 text-xs font-bold bg-[#5ab58f] hover:bg-[#489474] text-white rounded-lg transition"
            >
              Salvar cor
            </button>
            <button
              type="button"
              onClick={onCancelarFormulario}
              className="px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}