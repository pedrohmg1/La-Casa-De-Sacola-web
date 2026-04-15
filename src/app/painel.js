"use client";

import Link from "next/link";
import RotaAdmin from "../components/admin/rotaAdmin";
import { useState, useEffect } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox';
import { supabase } from "../lib/supabaseClient";
import { 
  Pencil2Icon, 
  CheckCircledIcon, 
  CheckIcon, 
  ExclamationTriangleIcon, 
  PlusIcon, 
  TrashIcon, 
  EyeClosedIcon 
} from "@radix-ui/react-icons";

export default function Painel() {
  const [sacolas, setSacolas] = useState([]);
  const [opcoesMaterial, setOpcoesMaterial] = useState([]);
  const [opcoesTamanho, setOpcoesTamanho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [sacolaEditandoId, setSacolaEditandoId] = useState(null);
  const [modalEnumAberto, setModalEnumAberto] = useState(false);
  const [enumAtual, setEnumAtual] = useState("");
  const [novoValorEnum, setNovoValorEnum] = useState("");
  const [mostrarSacolasAtivas, setMostrarSacolasAtivas] = useState(true);
  const [mostrarSacolasOcultas, setMostrarSacolasOcultas] = useState(false);

  const [novaSacola, setNovaSacola] = useState({
    nome_sac: '',
    tipo_sac: '',
    quantidademin_sac: '',
    precounitario_sac: '',
    tamanho_sac: '',
    peso_sac: '',
    status_sac: ''
  });

  useEffect(() => {
    carregarSacolas();
    carregarFiltros();
  }, []);

  const carregarSacolas = async () => {
    const { data, error } = await supabase.from('sacola').select('*');
    if (error) {
      console.error("Erro ao buscar as sacolas:", error);
    } else if (data) {
      setSacolas(data);
    }
  };

  const carregarFiltros = async () => {
    const { data: tipo } = await supabase.from('tipo').select('tipo_tip');
    if (tipo) setOpcoesMaterial(tipo.map(t => t.tipo_tip));

    const { data: tamanho } = await supabase.from('tamanho').select('tamanho_tam');
    if (tamanho) setOpcoesTamanho(tamanho.map(t => t.tamanho_tam));
  };

  const handleSalvarSacola = async (e) => {
    e.preventDefault();
    
    const dadosParaEnviar = {
      tipo_sac: novaSacola.tipo_sac,
      quantidademin_sac: parseInt(novaSacola.quantidademin_sac),
      precounitario_sac: parseFloat(novaSacola.precounitario_sac),
      tamanho_sac: novaSacola.tamanho_sac,
      peso_sac: novaSacola.peso_sac,
      nome_sac: novaSacola.nome_sac,
      status_sac: novaSacola.status_sac
    };

    if (sacolaEditandoId) {
      const { data, error } = await supabase
        .from('sacola')
        .update(dadosParaEnviar)
        .eq('id_sac', sacolaEditandoId)
        .select();

      if (!error && data) {
        setSacolas(sacolas.map(s => s.id_sac === sacolaEditandoId ? data[0] : s));
      }
    } else {
      const { data, error } = await supabase
        .from('sacola')
        .insert([dadosParaEnviar])
        .select();

      if (!error && data) {
        setSacolas([...sacolas, data[0]]);
      }
    }

    setModalAberto(false);
    setSacolaEditandoId(null);
    setNovaSacola({ nome_sac: '', tipo_sac: '', quantidademin_sac: '', precounitario_sac: '', tamanho_sac: '', peso_sac: '', status_sac: '' });
  };

  const handleOcultarSacola = async () => {
    const { error } = await supabase
      .from('sacola')
      .update({ status_sac: 'Oculto' })
      .eq('id_sac', sacolaEditandoId);

    if (!error) {
      setSacolas(sacolas.map(s => s.id_sac === sacolaEditandoId ? { ...s, status_sac: 'Oculto' } : s));
    }
    setModalAberto(false);
    setSacolaEditandoId(null);
  };

  const handleAdicionarValorEnum = async (e) => {
    e.preventDefault();
    if (!novoValorEnum.trim()) return;

    const tabelaAlvo = enumAtual === 'tipo' ? 'tipo' : 'tamanho';
    const nomeColuna = enumAtual === 'tipo' ? 'tipo_tip' : 'tamanho_tam';

    const { error } = await supabase
      .from(tabelaAlvo)
      .insert([{ [nomeColuna]: novoValorEnum.trim() }]);

    if (!error) {
      await carregarFiltros();
      setModalEnumAberto(false);
      setNovoValorEnum("");
    }
  };

  const sacolasFiltradas = sacolas.filter((sacola) => 
    sacola.status_sac === 'Oculto' ? mostrarSacolasOcultas : mostrarSacolasAtivas
  );

  const handleAbrirEdicao = (sacola) => {
    setNovaSacola(sacola);
    setSacolaEditandoId(sacola.id_sac);
    setModalAberto(true);
  };

  return (
    <RotaAdmin>
      <main className="p-5 m-auto bg-gray-100 h-screen flex flex-col">
        <title>Painel Administrador</title>

        <div className="mb-4">
          <h1 className="text-lg lg:text-xl font-extrabold text-[#264f41]">Painel Administrador</h1>
          <h2 className="text-md lg:text-lg text-gray-600">Gerencie seus produtos</h2>
        </div>

        <Dialog.Root open={modalAberto} onOpenChange={setModalAberto}>
          <div className="flex items-center mb-5 justify-between bg-white p-4 rounded-xl shadow-sm border border-[#e4f4ed]">
            <div className="flex flex-row flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 cursor-pointer">
                <Checkbox.Root
                  className="flex size-6 items-center justify-center rounded border-2 border-green-400 bg-white data-[state=checked]:bg-green-600 transition-colors"
                  id="chkAtivas"
                  checked={mostrarSacolasAtivas}
                  onCheckedChange={setMostrarSacolasAtivas}
                >
                  <Checkbox.Indicator className="text-white"><CheckIcon className="size-5" /></Checkbox.Indicator>
                </Checkbox.Root>
                <label className="text-sm font-medium flex items-center gap-1.5 cursor-pointer" htmlFor="chkAtivas">
                  <CheckCircledIcon className="size-5 text-green-600" /> Mostrar sacolas ativas
                </label>
              </div>

              <div className="flex items-center gap-2 cursor-pointer">
                <Checkbox.Root
                  className="flex size-6 items-center justify-center rounded border-2 border-red-400 bg-white data-[state=checked]:bg-red-600 transition-colors"
                  id="chkOcultas"
                  checked={mostrarSacolasOcultas}
                  onCheckedChange={setMostrarSacolasOcultas}
                >
                  <Checkbox.Indicator className="text-white"><CheckIcon className="size-5" /></Checkbox.Indicator>
                </Checkbox.Root>
                <label className="text-sm font-medium flex items-center gap-1.5 cursor-pointer" htmlFor="chkOcultas">
                  <TrashIcon className="size-5 text-red-600" /> Mostrar sacolas excluídas
                </label>
              </div>
            </div>

            <Dialog.Trigger asChild>
              <button 
                className="bg-[#292622] hover:bg-[#403c37] text-white px-5 py-2.5 rounded-xl font-bold transition shadow-md flex items-center gap-2"
                onClick={() => {
                  setSacolaEditandoId(null);
                  setNovaSacola({ nome_sac: '', tipo_sac: '', quantidademin_sac: '', precounitario_sac: '', tamanho_sac: '', peso_sac: '', status_sac: '' });
                }}
              >
                <PlusIcon className="size-5" /> Nova Sacola
              </button>
            </Dialog.Trigger>
          </div>

          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 fixed inset-0 backdrop-blur-sm z-40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl w-[min(92vw,40rem)] max-h-[90vh] z-[100] overflow-y-auto">
              <Dialog.Title className="text-xl font-extrabold mb-6 text-[#264f41]">
                {sacolaEditandoId ? 'Editar Sacola' : 'Adicionar Nova Sacola'}
              </Dialog.Title>

              <form onSubmit={handleSalvarSacola} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-sm text-gray-700">Nome de Exibição</label>
                  <input 
                    type="text"
                    className="border border-gray-300 p-3 rounded-xl outline-none focus:border-[#5ab58f] transition"
                    value={novaSacola.nome_sac}
                    onChange={(e) => setNovaSacola({ ...novaSacola, nome_sac: e.target.value })}
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-sm text-gray-700">Material</label>
                  <div className="flex gap-2">
                    <Select.Root value={novaSacola.tipo_sac} onValueChange={(v) => setNovaSacola({ ...novaSacola, tipo_sac: v })}>
                      <Select.Trigger className="flex flex-1 items-center justify-between border border-gray-300 p-3 rounded-xl bg-white focus:border-[#5ab58f] outline-none">
                        <Select.Value placeholder="Selecione o material..."/>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white rounded-xl shadow-2xl border border-gray-200 z-[110]">
                          <Select.Viewport className="p-2">
                            {opcoesMaterial.map((m) => (
                              <Select.Item key={m} value={m} className="p-3 rounded-lg outline-none cursor-pointer hover:bg-[#f0faf5] focus:bg-[#f0faf5] transition">
                                <Select.ItemText>{m}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                    <button type="button" onClick={() => { setEnumAtual('tipo'); setModalEnumAberto(true); }} className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50"><PlusIcon/></button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-sm text-gray-700">Qtd. Mínima</label>
                    <input type="number" className="border border-gray-300 p-3 rounded-xl outline-none focus:border-[#5ab58f]" value={novaSacola.quantidademin_sac} onChange={(e) => setNovaSacola({...novaSacola, quantidademin_sac: e.target.value})} required/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-sm text-gray-700">Preço Unit. (R$)</label>
                    <input type="number" step="0.01" className="border border-gray-300 p-3 rounded-xl outline-none focus:border-[#5ab58f]" value={novaSacola.precounitario_sac} onChange={(e) => setNovaSacola({...novaSacola, precounitario_sac: e.target.value})} required/>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-sm text-gray-700">Tamanho</label>
                  <div className="flex gap-2">
                    <Select.Root value={novaSacola.tamanho_sac} onValueChange={(v) => setNovaSacola({ ...novaSacola, tamanho_sac: v })}>
                      <Select.Trigger className="flex flex-1 items-center justify-between border border-gray-300 p-3 rounded-xl bg-white focus:border-[#5ab58f] outline-none">
                        <Select.Value placeholder="Selecione o tamanho..."/>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white rounded-xl shadow-2xl border border-gray-200 z-[110]">
                          <Select.Viewport className="p-2">
                            {opcoesTamanho.map((t) => (
                              <Select.Item key={t} value={t} className="p-3 rounded-lg outline-none cursor-pointer hover:bg-[#f0faf5] focus:bg-[#f0faf5] transition">
                                <Select.ItemText>{t}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                    <button type="button" onClick={() => { setEnumAtual('tamanho'); setModalEnumAberto(true); }} className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50"><PlusIcon/></button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-sm text-gray-700">Status</label>
                  <Select.Root value={novaSacola.status_sac} onValueChange={(v) => setNovaSacola({ ...novaSacola, status_sac: v })}>
                    <Select.Trigger className="flex items-center justify-between border border-gray-300 p-3 rounded-xl bg-white focus:border-[#5ab58f] outline-none">
                      <Select.Value placeholder="Status da sacola..."/>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="bg-white rounded-xl shadow-2xl border border-gray-200 z-[110]">
                        <Select.Viewport className="p-2">
                          <Select.Item value="Disponível" className="p-3 rounded-lg outline-none cursor-pointer hover:bg-[#f0faf5]">Disponível</Select.Item>
                          <Select.Item value="Fora de Estoque" className="p-3 rounded-lg outline-none cursor-pointer hover:bg-[#f0faf5]">Fora de Estoque</Select.Item>
                          {novaSacola.status_sac === 'Oculto' && <Select.Item value="Oculto" className="p-3 rounded-lg text-red-600 font-bold">Oculto</Select.Item>}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>

                <button type="submit" className="mt-4 bg-[#5ab58f] hover:bg-[#2e8f65] text-white p-4 rounded-xl font-bold transition shadow-lg">
                  {sacolaEditandoId ? 'Salvar Alterações' : 'Cadastrar Sacola'}
                </button>

                {sacolaEditandoId && novaSacola.status_sac !== 'Oculto' && (
                  <button type="button" onClick={handleOcultarSacola} className="flex items-center justify-center gap-2 text-red-500 font-bold hover:underline">
                    <TrashIcon className="size-5"/> Excluir e Ocultar Sacola
                  </button>
                )}
              </form>
              <Dialog.Close asChild>
                <button className="absolute top-5 right-5 text-gray-400 hover:text-black font-bold">✕</button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-[#e4f4ed] overflow-hidden">
          <div className="max-h-full overflow-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead className="sticky top-0 z-10 bg-[#292622] text-white">
                <tr>
                  <th className="p-4 font-semibold text-sm">Nome</th>
                  <th className="p-4 font-semibold text-sm">Material</th>
                  <th className="p-4 font-semibold text-sm text-center">Qtd. Mín</th>
                  <th className="p-4 font-semibold text-sm text-center">Preço (R$)</th>
                  <th className="p-4 font-semibold text-sm text-center">Tamanho</th>
                  <th className="p-4 font-semibold text-sm text-center">Status</th>
                  <th className="p-4 font-semibold text-sm text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sacolasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-gray-400">
                        <EyeClosedIcon className="size-12" />
                        <p className="text-lg font-bold">Nenhuma sacola encontrada</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sacolasFiltradas.map((sacola) => (
                    <tr key={sacola.id_sac} className="hover:bg-[#f0faf5] transition">
                      <td className="p-4 font-bold text-[#264f41]">{sacola.nome_sac}</td>
                      <td className="p-4 text-gray-600">{sacola.tipo_sac}</td>
                      <td className="p-4 text-center">{sacola.quantidademin_sac}</td>
                      <td className="p-4 text-center">R$ {Number(sacola.precounitario_sac).toFixed(2)}</td>
                      <td className="p-4 text-center font-medium">{sacola.tamanho_sac}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${sacola.status_sac === 'Disponível' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {sacola.status_sac}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleAbrirEdicao(sacola)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition inline-flex items-center gap-1 font-bold">
                          <Pencil2Icon/> Editar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal para novos valores de filtros (Tamanho/Material) */}
        <Dialog.Root open={modalEnumAberto} onOpenChange={setModalEnumAberto}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/40 fixed inset-0 z-[120]" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm z-[130]">
              <Dialog.Title className="text-lg font-extrabold mb-4 text-[#264f41]">
                Novo {enumAtual === 'tipo' ? 'Material' : 'Tamanho'}
              </Dialog.Title>
              <form onSubmit={handleAdicionarValorEnum} className="flex flex-col gap-4">
                <input 
                  type="text"
                  placeholder="Ex: Papel Kraft, 20x30..."
                  className="border border-gray-300 p-3 rounded-xl outline-none focus:border-[#5ab58f]"
                  value={novoValorEnum}
                  onChange={(e) => setNovoValorEnum(e.target.value)}
                  autoFocus
                />
                <div className="flex gap-3">
                  <Dialog.Close asChild>
                    <button type="button" className="flex-1 p-3 bg-gray-100 rounded-xl font-bold">Cancelar</button>
                  </Dialog.Close>
                  <button type="submit" className="flex-1 p-3 bg-[#5ab58f] text-white rounded-xl font-bold">Salvar</button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </main>
    </RotaAdmin>
  );
}