// Arquivo: src/app/page.js
"use client";
export default function Home() {
  return (
    <>
  <meta charSet="UTF-8" />
  <title>Login</title>
  {/* Tailwind */}
  {/* Fonte */}
  <link
    href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    .login-bg {\n      background-position: center 58%;\n    }\n\n    .animated-page {\n      animation: fade-in 1500ms ease-out both;\n    }\n\n    .animated-card {\n      background-size: 180% 180%;\n      animation: slide-in-right 1800ms cubic-bezier(0.22, 1, 0.36, 1) both,\n                 wine-gradient-flow 22s ease-in-out infinite;\n    }\n\n    .reveal {\n      opacity: 0;\n      transform: translateY(16px);\n      animation: reveal-up 1200ms ease-out forwards;\n    }\n\n    .brand-title {\n      transition: transform 700ms ease, text-shadow 700ms ease, letter-spacing 700ms ease, color 700ms ease;\n      transform-origin: center;\n    }\n\n    .brand-title:hover {\n      transform: translateY(-2px) scale(1.02);\n      text-shadow: 0 10px 22px rgba(255, 255, 255, 0.35);\n      letter-spacing: 0.035em;\n      color: #ffffff;\n    }\n\n    .d-1 { animation-delay: 260ms; }\n    .d-2 { animation-delay: 520ms; }\n    .d-3 { animation-delay: 780ms; }\n    .d-4 { animation-delay: 1040ms; }\n    .d-5 { animation-delay: 1300ms; }\n    .d-6 { animation-delay: 1560ms; }\n\n    .form-control {\n      transition: box-shadow 520ms ease, transform 520ms ease, background-color 520ms ease;\n    }\n\n    .form-control:focus {\n      background-color: rgba(255, 255, 255, 0.95);\n      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.25);\n      transform: translateY(-1px);\n    }\n\n    .form-control:hover {\n      background-color: rgba(255, 255, 255, 0.96);\n      box-shadow: 0 8px 16px rgba(255, 255, 255, 0.18);\n      transform: translateY(-1px) scale(1.005);\n    }\n\n    .animated-btn {\n      transition: transform 620ms ease, box-shadow 620ms ease, background-color 620ms ease;\n    }\n\n    .animated-btn:hover {\n      transform: translateY(-1px) scale(1.015);\n      box-shadow: 0 8px 18px rgba(255, 255, 255, 0.22);\n    }\n\n    @keyframes fade-in {\n      from { opacity: 0; }\n      to { opacity: 1; }\n    }\n\n    @keyframes slide-in-right {\n      from {\n        opacity: 0;\n        transform: translateX(34px);\n      }\n      to {\n        opacity: 1;\n        transform: translateX(0);\n      }\n    }\n\n    @keyframes reveal-up {\n      from {\n        opacity: 0;\n        transform: translateY(16px);\n      }\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n\n    @keyframes wine-gradient-flow {\n      0% { background-position: 100% 100%; }\n      50% { background-position: 30% 30%; }\n      100% { background-position: 100% 100%; }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      .animated-page,\n      .animated-card,\n      .reveal {\n        animation: none !important;\n        opacity: 1 !important;\n        transform: none !important;\n      }\n\n      .form-control,\n      .animated-btn {\n        transition: none !important;\n      }\n    }\n\n    @media (min-width: 768px) {\n      .login-bg {\n        background-position: center 78%;\n      }\n    }\n  "
    }}
  />
  <main
    className="animated-page login-bg h-screen flex items-center justify-center bg-cover"
    style={{ backgroundImage: 'url("../img/img_login.png")' }}
  >
    {/* Overlay escuro */}
    <div className="absolute inset-0 bg-black/55" />
    {/* CARD */}
    <div className="animated-card absolute right-0 top-0 min-h-screen w-full md:h-screen md:w-1/2 flex items-center justify-center bg-gradient-to-tl from-black/75 via-zinc-900/55 to-black/20 backdrop-blur-xl rounded-none">
      <div className="p-6 sm:p-8 md:p-10 w-full max-w-md lg:max-w-xl mx-auto">
        {/* LOGO */}
        <h1
          className="reveal d-1 brand-title text-white text-3xl sm:text-4xl md:text-5xl text-center mb-8 md:mb-12 tracking-wide font-bold leading-tight whitespace-normal sm:whitespace-nowrap"
          style={{ fontFamily: '"Anton", sans-serif' }}
        >
          LA CASA <span className="bg-red-600 px-2 py-1 align-middle">DE</span>{" "}
          SACOLA
        </h1>
        {/* FORM */}
        <form className="flex flex-col w-full">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="reveal d-2 form-control w-full mb-5 md:mb-6 p-3 sm:p-4 text-base sm:text-lg rounded bg-white/80 outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          {/* SENHA */}
          <input
            type="password"
            placeholder="Senha"
            className="reveal d-3 form-control w-full mb-3 md:mb-4 p-3 sm:p-4 text-base sm:text-lg rounded bg-white/80 outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          {/* ESQUECI SENHA */}
          <a
            href="#"
            className="reveal d-4 text-sm sm:text-base text-gray-300 mb-6 md:mb-8 hover:text-red-400 text-right transition-colors duration-300"
          >
            Esqueci minha senha
          </a>
          {/* BOTÃO */}
          <button className="reveal d-5 animated-btn w-full bg-red-600 hover:bg-red-700 text-white p-3 sm:p-4 text-base sm:text-lg rounded transition duration-300 shadow-lg">
            Entrar
          </button>
        </form>
        {/* CADASTRO */}
        <p className="reveal d-6 text-gray-300 text-sm sm:text-base text-center mt-6 md:mt-8">
          Não tem conta?
          <a href="#" className="text-red-500 hover:underline">
            Criar conta
          </a>
        </p>
      </div>
    </div>
  </main>
</>

  )
}