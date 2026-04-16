"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Se quiser adicionar ou remover a navbar de uma página
  //  basta adicionar aqui ou remover da lista.
  const rotasSemNavbar = ['/login', '/cadastro', '/painel'];
  const exibirNavbar = !rotasSemNavbar.includes(pathname);

  if (!exibirNavbar) return null;

  return <Navbar />;
}