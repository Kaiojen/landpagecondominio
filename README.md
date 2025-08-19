# 🏢 Sistema de Boas-Vindas - Landing Page para Condomínio

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Landing page moderna + panfleto PDF para condomínios**

[🚀 Demo Online](#) • [📖 Documentação](README_PANFLETO.md) • [🎯 Guia Deploy](GUIA_RAPIDO_DEPLOY.md)

</div>

---

## ✨ Funcionalidades

### 🌐 **Landing Page Responsiva**
- **Design Moderno** com Tailwind CSS
- **Menu Responsivo** para mobile/desktop
- **CTAs Diretos** para WhatsApp, telefone e e-mail
- **Seções Interativas** organizadas

### 📄 **Panfleto PDF**
- **Layout Tríptico** profissional
- **Download Direto** com botão dedicado
- **Otimizado A4** para impressão

### 🔧 **Painel Admin**
- **Autenticação Simples** (admin/admin)
- **Editor Completo** de conteúdo
- **Gerenciamento de Dados** persistente
- **Interface Intuitiva** com abas

### 📱 **Integrações Automáticas**
- **WhatsApp** com mensagens pré-definidas
- **Ligações Diretas** pelos botões
- **E-mail** com contexto automático
- **QR Code** para acesso rápido

## 🚀 Início Rápido

### Instalação
```bash
# Clone o repositório
git clone https://github.com/Kaiojen/landpagecondominio.git
cd landpagecondominio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Build para Produção
```bash
# Gere os arquivos otimizados
npm run build

# Pré-visualize a versão de produção
npm run preview
```

## 🛠️ Stack Tecnológica

- **Frontend**: React 19 + Vite 6
- **Styling**: Tailwind CSS 4 + Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **State**: Context API + localStorage

## 📁 Estrutura do Projeto

```
├── src/
│   ├── components/          # Componentes React
│   │   ├── AdminPanel.jsx   # Painel administrativo
│   │   ├── LoginModal.jsx   # Modal de login
│   │   └── ui/             # Componentes de interface
│   ├── contexts/           # Contextos React
│   ├── assets/             # Imagens e recursos
│   └── App.jsx             # Componente principal
├── dist/                   # Build de produção
└── public/                 # Arquivos públicos
```

## 🌐 Deploy

### Netlify (Recomendado)
```bash
npm run build
# Arraste pasta dist/ para netlify.com
```

### Vercel
```bash
npm run build  
# Upload para vercel.com
```

### GitHub Pages
Configurado automaticamente via GitHub Actions

## 🔐 Credenciais Admin

- **Usuário**: `admin`
- **Senha**: `admin`

## 📱 Contatos Configurados

| Serviço | Telefone | WhatsApp | E-mail |
|---------|----------|----------|--------|
| Portaria | (21) 3489-6664 | ✅ | - |
| Administradora | (21) 2323-4423 | ✅ | atendimento.locacao@estasa.com.br |
| TCL/TLP | (91) 98406-3859 | ✅ | - |

## 🎨 Personalização

1. **Via Painel Admin**: Acesse o site → ⚙️ → Login admin/admin
2. **Via Código**: Edite `src/contexts/DataContext.jsx`
3. **Imagens**: Substitua arquivos em `src/assets/`

## 📖 Documentação Completa

- [📋 README Completo](../README_PANFLETO.md) - Documentação detalhada
- [🚀 Guia de Deploy](../GUIA_RAPIDO_DEPLOY.md) - Deploy passo a passo
- [🎯 Funcionalidades](../INSTRUCOES_LANDING_PAGE.md) - Recursos detalhados

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- 🐛 **Issues**: Reporte bugs no GitHub
- 💡 **Sugestões**: Abra uma issue com label `enhancement`
- 📧 **Contato**: Através das issues do projeto

---

<div align="center">

**⭐ Deixe uma star se este projeto te ajudou!**

Desenvolvido com ❤️ para facilitar a comunicação em condomínios

</div>