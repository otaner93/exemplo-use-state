import { useState } from "react";

const estadoInicial = {
  nome: "",
  email: "",
  telefone: "",
  area: "",
  senha: "",
  observacoes: "",
};

function App() {
  const [formulario, setFormulario] = useState(estadoInicial);
  const [cadastroEnviado, setCadastroEnviado] = useState(null);

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function enviarFormulario(event) {
    event.preventDefault();
    setCadastroEnviado(formulario);
  }

  function limparFormulario() {
    setFormulario(estadoInicial);
    setCadastroEnviado(null);
  }

  return (
    <main className="page">
      <header className="header">
        <h1>Formulário de cadastro</h1>
        <p>
          Projeto React simples usando <strong>useState</strong> para gerenciar o
          estado local de um formulário com inputs controlados.
        </p>
      </header>

      <section className="layout">
        <div className="panel">
          <form className="form" onSubmit={enviarFormulario}>
            <CampoTexto
              id="nome"
              label="Nome completo"
              name="nome"
              value={formulario.nome}
              onChange={atualizarCampo}
              placeholder="Ex.: Ana Souza"
              required
            />

            <CampoTexto
              id="email"
              label="E-mail"
              name="email"
              type="email"
              value={formulario.email}
              onChange={atualizarCampo}
              placeholder="ana@email.com"
              required
            />

            <CampoTexto
              id="telefone"
              label="Telefone"
              name="telefone"
              type="tel"
              value={formulario.telefone}
              onChange={atualizarCampo}
              placeholder="(11) 99999-9999"
            />

            <div className="field">
              <label htmlFor="area">Área de interesse</label>
              <select
                id="area"
                name="area"
                value={formulario.area}
                onChange={atualizarCampo}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="UX/UI Design">UX/UI Design</option>
                <option value="Dados">Dados</option>
              </select>
            </div>

            <CampoTexto
              id="senha"
              label="Senha"
              name="senha"
              type="password"
              value={formulario.senha}
              onChange={atualizarCampo}
              placeholder="Digite uma senha"
              minLength="6"
              required
            />

            <div className="field">
              <label htmlFor="observacoes">Observações</label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formulario.observacoes}
                onChange={atualizarCampo}
                placeholder="Conte algo importante para o cadastro"
              />
            </div>

            <div className="actions">
              <button className="primary" type="submit">
                Cadastrar
              </button>
              <button className="secondary" type="button" onClick={limparFormulario}>
                Limpar
              </button>
            </div>
          </form>

          <div className="result">
            <h2>Último envio</h2>
            {cadastroEnviado ? (
              <p className="success">
                Cadastro de {cadastroEnviado.nome} enviado com sucesso.
              </p>
            ) : (
              <p className="empty">Nenhum cadastro enviado ainda.</p>
            )}
          </div>
        </div>

        <aside className="panel preview" aria-live="polite">
          <h2>Preview do estado local</h2>
          <div className="preview-list">
            <PreviewItem titulo="Nome" valor={formulario.nome} />
            <PreviewItem titulo="E-mail" valor={formulario.email} />
            <PreviewItem titulo="Telefone" valor={formulario.telefone} />
            <PreviewItem titulo="Área" valor={formulario.area} />
            <PreviewItem titulo="Senha" valor={formulario.senha ? "******" : ""} />
            <PreviewItem titulo="Observações" valor={formulario.observacoes} />
          </div>
        </aside>
      </section>
    </main>
  );
}

function CampoTexto({ id, label, type = "text", ...props }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...props} />
    </div>
  );
}

function PreviewItem({ titulo, valor }) {
  return (
    <div className="preview-item">
      <span>{titulo}</span>
      <strong>{valor || "Ainda não informado"}</strong>
    </div>
  );
}

export default App;
