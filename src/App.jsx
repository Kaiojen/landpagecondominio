import React, { useState, useEffect } from "react";
import "./App.css";
import corcovado from "./assets/cristo-redentor-foco.jpeg";
import familia from "./assets/familia-feliz.jpg";
import iconeCondominio from "./assets/icone-condominio.png";
import qrCode from "./assets/qr-code.png";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DataProvider, useData } from "./contexts/DataContext";
import { LoginModal } from "./components/LoginModal";
import { AdminPanel } from "./components/AdminPanel";
import {
  Home,
  Users,
  Shield,
  Clock,
  Car,
  Trash2,
  Heart,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Key,
  Sparkles,
  Menu,
  X,
  Download,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Wifi,
  WifiOff,
  Timer,
  Settings,
  Lock,
} from "lucide-react";

// Componente interno que pode usar os contextos
function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isPanfletoMode, setIsPanfletoMode] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const { isAuthenticated } = useAuth();
  const { data } = useData();

  // Scroll spy para detectar seção ativa
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "regras", "salao", "contatos"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleDownloadPDF = () => {
    setIsPanfletoMode(true);
    setTimeout(() => {
      // Configurações para melhor qualidade do PDF
      const printCSS = `
        @media print {
          * { -webkit-print-color-adjust: exact !important; }
          @page { size: A4; margin: 0.5cm; }
          img { image-rendering: high-quality !important; }
        }
      `;

      // Adicionar CSS temporário para impressão
      const style = document.createElement("style");
      style.textContent = printCSS;
      document.head.appendChild(style);

      // Abrir diálogo de impressão
      window.print();

      // Remover CSS temporário após impressão
      setTimeout(() => {
        document.head.removeChild(style);
      }, 1000);
    }, 500);
  };

  const handleWhatsAppContact = (number, message) => {
    const url = `https://wa.me/55${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setShowAdminPanel(true);
    } else {
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginModal(false);
      setShowAdminPanel(true);
    }
  }, [isAuthenticated]);

  // Modo Panfleto para impressão
  if (isPanfletoMode) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 print:p-0">
        <div className="max-w-7xl mx-auto">
          {/* Botão para voltar */}
          <div className="mb-4 print:hidden">
            <button
              onClick={() => setIsPanfletoMode(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Voltar para Landing Page
            </button>
          </div>

          {/* Panfleto Tríptico Original */}
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none print-no-break">
            <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[900px] print:min-h-[800px]">
              {/* CAPA - Painel Esquerdo */}
              <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white p-8 flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={corcovado}
                    alt="Cristo Redentor com foco"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10 text-center">
                  <div className="mb-6">
                    <img
                      src={iconeCondominio}
                      alt="Ícone Condomínio"
                      className="w-20 h-20 mx-auto mb-4 filter brightness-0 invert"
                    />
                  </div>
                  <h1 className="text-3xl font-bold mb-4 leading-tight">
                    🏢 Bem-Vindo ao
                    <br />
                    <span className="text-yellow-400">
                      {data.building.name}!
                    </span>
                  </h1>
                  <p className="text-xl text-blue-100 mb-4">
                    Olá, novo morador!
                  </p>
                  <p className="text-lg text-blue-200 mb-8">
                    Seu novo lar em Copacabana
                  </p>
                  <div className="w-16 h-1 bg-yellow-400 mx-auto"></div>
                </div>
              </div>

              {/* PAINEL CENTRAL - Conteúdo Principal */}
              <div className="p-6 bg-white overflow-y-auto">
                {/* Mensagem de Boas-Vindas */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Heart className="w-5 h-5 text-blue-900 mr-2" />
                    <h2 className="text-xl font-bold text-blue-900">
                      Mensagem de Boas-Vindas
                    </h2>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg relative">
                    <div className="absolute top-2 right-2 w-16 h-16 opacity-20">
                      <img
                        src={familia}
                        alt="Família Feliz"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {data.building.welcomeMessage}
                    </p>
                  </div>
                </div>

                {/* Regras e Dicas Importantes */}
                <div>
                  <div className="flex items-center mb-3">
                    <Shield className="w-5 h-5 text-blue-900 mr-2" />
                    <h2 className="text-xl font-bold text-blue-900">
                      📜 Regras e Dicas Importantes
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          💰 Taxa de Limpeza Pública (TCL/TLP)
                        </h3>
                        <p className="text-xs text-gray-600">
                          Conforme Portaria C Ex nº 1846/2022, o permissionário
                          (ocupante) é responsável pelo pagamento da Taxa de
                          Coleta de Lixo (TCL) e da Taxa de Limpeza Pública
                          (TLP). A TLP é um tributo municipal destinado a
                          remunerar os serviços de coleta e destinação de
                          resíduos sólidos. O pagamento deve ser feito usando o
                          número de inscrição do seu imóvel.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Car className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          🚗 Vagas de Estacionamento
                        </h3>
                        <p className="text-xs text-gray-600">
                          Distribuídas por antiguidade dos militares.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Home className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          📦 Mudanças
                        </h3>
                        <p className="text-xs text-gray-600">
                          Devem ser agendadas com o síndico e seguir as normas
                          municipais.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          🗑️ Lixo
                        </h3>
                        <p className="text-xs text-gray-600">
                          Todo lixo deve ser ensacado. O orgânico, além de
                          ensacado, deve ser colocado no duto de lixo.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          🔇 Horário de Silêncio
                        </h3>
                        <p className="text-xs text-gray-600">Das 22h às 8h.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Heart className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          🐾 Animais de Estimação
                        </h3>
                        <p className="text-xs text-gray-600">
                          Devem circular com coleira e guia. Recolher sempre as
                          fezes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          🛡️ Segurança
                        </h3>
                        <p className="text-xs text-gray-600">
                          Siga as orientações da portaria e avise sobre visitas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAINEL DIREITO - Salão de Festas e Contatos */}
              <div className="p-6 bg-gray-50 overflow-y-auto">
                {/* Uso do Salão de Festas */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Users className="w-5 h-5 text-blue-900 mr-2" />
                    <h2 className="text-lg font-bold text-blue-900">
                      🎉 Salão de Festas e Churrasqueira
                    </h2>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2 p-2 bg-white rounded-lg shadow-sm">
                      <Calendar className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          Agendamento
                        </h3>
                        <p className="text-xs text-gray-600">
                          Verificar disponibilidade no livro da portaria ou na
                          agenda do Drive. Fazer pré-agendamento no livro da
                          portaria.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 p-2 bg-white rounded-lg shadow-sm">
                      <DollarSign className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          Pagamento
                        </h3>
                        <p className="text-xs text-gray-600">
                          <strong>Taxa:</strong> R$ 50,00
                          <br />
                          <strong>Prazo:</strong> até 48h após solicitação
                          <br />
                          <strong>Banco do Brasil:</strong>
                          <br />
                          Agência: 0597-5 | C/C: 39840-3
                          <br />
                          <strong>Pix:</strong> 34.989.255/0001-40
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 p-2 bg-white rounded-lg shadow-sm">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          Confirmação
                        </h3>
                        <p className="text-xs text-gray-600">
                          Enviar comprovante para o subsíndico. Falta de
                          pagamento cancela a reserva.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 p-2 bg-white rounded-lg shadow-sm">
                      <Sparkles className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          Entrega do Espaço
                        </h3>
                        <p className="text-xs text-gray-600">
                          Limpo e organizado. Mesas e cadeiras limpas e
                          empilhadas. Churrasqueira limpa. Materiais de
                          churrasco limpos. Lixo ensacado e recolhido. Banheiro
                          higienizado. Geladeira desligada.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 p-2 bg-white rounded-lg shadow-sm">
                      <Key className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          Chaves
                        </h3>
                        <p className="text-xs text-gray-600">
                          Retirar e devolver na portaria.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contatos Úteis */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Phone className="w-5 h-5 text-blue-900 mr-2" />
                    <h2 className="text-lg font-bold text-blue-900">
                      📞 Contatos Úteis
                    </h2>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                        Portaria
                      </h3>
                      <p className="text-xs text-gray-600">(21) 3489-6664</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                        Administradora Estasa
                      </h3>
                      <p className="text-xs text-gray-600">
                        Tel.: (21) 2323-4423
                        <br />
                        WhatsApp: (21) 99584-4449
                        <br />
                        E-mail: atendimento.locacao@estasa.com.br
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                        TCL/TLP
                      </h3>
                      <p className="text-xs text-gray-600">
                        Cap Mantovani – Fiscal Administrativo
                        <br />
                        Tel.: (91) 98406-3859
                        <br />
                        RITEx: 800-7303
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="text-center">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <img
                      src={qrCode}
                      alt="QR Code para regras completas"
                      className="w-20 h-20 mx-auto mb-2"
                    />
                    <p className="text-xs text-gray-600">
                      Escaneie para acessar
                      <br />
                      as regras completas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTRACAPA - Rodapé */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                    "A convivência é a chave para um lar feliz!"
                  </h2>
                  <p className="text-blue-100 mb-2">
                    Em caso de dúvidas ou sugestões, procure a administração.
                  </p>
                  <p className="text-blue-100 mb-2">Seja muito bem-vindo!</p>
                  <p className="text-blue-200 text-sm mb-4">
                    Administração do Edifício Marechal Castelo Branco
                  </p>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <p className="text-blue-100 text-sm">
                      Rua Felipe de Oliveira, 18 - Copacabana - RJ
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 text-yellow-400">
                    📌 Inscrições dos Imóveis
                  </h3>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="bg-white/10 p-1 rounded">
                      101: 1.138.126-6
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      201: 1.138.127-4
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      202: 1.138.128-2
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      301: 1.138.129-0
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      302: 1.138.130-8
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      401: 1.138.131-6
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      402: 1.138.132-4
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      501: 1.138.133-2
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      502: 1.138.134-0
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      601: 1.138.135-7
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      602: 1.138.136-5
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      701: 1.138.137-3
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      702: 1.138.138-1
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      801: 1.138.139-9
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      802: 1.138.140-7
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      901: 1.138.141-5
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      902: 1.138.142-3
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      1001: 1.138.143-1
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      1002: 1.138.144-9
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      1101: 1.138.145-6
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      1102: 1.138.146-4
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      1201: 1.138.147-2
                    </div>
                    <div className="bg-white/10 p-1 rounded">
                      1202: 1.138.148-0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <img
            src={iconeCondominio}
            alt="Ícone Condomínio"
            className="w-16 h-16 mx-auto mb-4 filter brightness-0 invert animate-pulse"
          />
          <div className="text-white text-xl font-semibold mb-4">
            Carregando...
          </div>
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Modo Landing Page
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navegação */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src={iconeCondominio}
                alt="Ícone Condomínio"
                className="w-8 h-8 mr-3"
              />
              <h1 className="text-xl font-bold text-blue-900">
                {data.building.name}
              </h1>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex space-x-8">
              {[
                { id: "inicio", label: "Início" },
                { id: "regras", label: "Regras" },
                { id: "salao", label: "Salão de Festas" },
                { id: "contatos", label: "Contatos" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* CTAs Header */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={handleAdminAccess}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                title="Painel Admin"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF
              </button>
            </div>

            {/* Menu Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Menu Mobile Expandido */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Início
                </button>
                <button
                  onClick={() => scrollToSection("regras")}
                  className="text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Regras
                </button>
                <button
                  onClick={() => scrollToSection("salao")}
                  className="text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Salão de Festas
                </button>
                <button
                  onClick={() => scrollToSection("contatos")}
                  className="text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Contatos
                </button>
                <button
                  onClick={handleAdminAccess}
                  className="flex items-center py-2 text-gray-600 hover:text-gray-700 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center py-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-20">
          <img
            src={corcovado}
            alt="Cristo Redentor com foco"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <img
              src={iconeCondominio}
              alt="Ícone Condomínio"
              className="w-24 h-24 mx-auto mb-6 filter brightness-0 invert"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            🏢 Bem-Vindo ao
            <br />
            <span className="text-yellow-400">{data.building.name}!</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-6">
            Olá, novo morador!
          </p>
          <p className="text-lg md:text-xl text-blue-200 mb-12">
            Seu novo lar em Copacabana
          </p>

          {/* CTAs Hero */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("regras")}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Ver Regras Importantes
            </button>
            <button
              onClick={() =>
                handleWhatsAppContact(
                  "2134896664",
                  "Olá! Sou novo morador do Edifício Marechal Castelo Branco e gostaria de esclarecer algumas dúvidas."
                )
              }
              className="flex items-center bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar com Portaria
            </button>
          </div>
        </div>
      </section>

      {/* Mensagem de Boas-Vindas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-blue-900 mr-4" />
              <h2 className="text-3xl font-bold text-blue-900">
                Mensagem de Boas-Vindas
              </h2>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg relative">
              <div className="absolute top-4 right-4 w-20 h-20 opacity-30">
                <img
                  src={familia}
                  alt="Família Feliz"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.building.welcomeMessage}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regras e Dicas Importantes */}
      <section id="regras" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-900 mr-4" />
              <h2 className="text-3xl font-bold text-blue-900">
                📜 Regras e Dicas Importantes
              </h2>
            </div>
            <p className="text-gray-600">
              Clique em cada item para ver mais detalhes
            </p>
            <div className="mt-4 flex items-center justify-center">
              <div className="bg-blue-100 px-4 py-2 rounded-full">
                <span className="text-blue-800 font-semibold text-sm">
                  {expandedSection
                    ? `Visualizando 1 de 7 regras`
                    : "7 regras importantes"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: "tcl",
                icon: <DollarSign className="w-6 h-6 text-blue-600" />,
                title: "💰 Taxa de Limpeza Pública (TCL/TLP)",
                summary:
                  "Responsabilidade do ocupante conforme Portaria C Ex nº 1846/2022",
                details:
                  "Conforme Portaria C Ex nº 1846/2022, o permissionário (ocupante) é responsável pelo pagamento da Taxa de Coleta de Lixo (TCL) e da Taxa de Limpeza Pública (TLP). A TLP é um tributo municipal destinado a remunerar os serviços de coleta e destinação de resíduos sólidos. O pagamento deve ser feito usando o número de inscrição do seu imóvel.",
                cta: () =>
                  handleWhatsAppContact(
                    "919840638559",
                    "Olá Cap Mantovani! Preciso de informações sobre TCL/TLP para meu apartamento no Edifício Marechal Castelo Branco."
                  ),
              },
              {
                id: "estacionamento",
                icon: <Car className="w-6 h-6 text-blue-600" />,
                title: "🚗 Vagas de Estacionamento",
                summary: "Distribuição por antiguidade dos militares",
                details:
                  "As vagas de estacionamento são distribuídas por antiguidade dos militares. Respeite sempre a vaga designada e não estacione em locais não autorizados.",
              },
              {
                id: "mudancas",
                icon: <Home className="w-6 h-6 text-blue-600" />,
                title: "📦 Mudanças",
                summary: "Agendamento obrigatório com síndico",
                details:
                  "Todas as mudanças devem ser agendadas com o síndico e seguir as normas municipais. Entre em contato com a portaria para agendar sua mudança.",
                cta: () =>
                  handleWhatsAppContact(
                    "2134896664",
                    "Olá! Preciso agendar uma mudança no Edifício Marechal Castelo Branco."
                  ),
              },
              {
                id: "lixo",
                icon: <Trash2 className="w-6 h-6 text-blue-600" />,
                title: "🗑️ Descarte de Lixo",
                summary: "Ensacar todo lixo, orgânico no duto",
                details:
                  "Todo lixo deve ser ensacado. O lixo orgânico, além de ensacado, deve ser colocado no duto de lixo. Mantenha a área limpa e organize.",
              },
              {
                id: "silencio",
                icon: <Clock className="w-6 h-6 text-blue-600" />,
                title: "🔇 Horário de Silêncio",
                summary: "Das 22h às 8h",
                details:
                  "O horário de silêncio é das 22h às 8h. Durante este período, evite ruídos que possam incomodar os vizinhos.",
              },
              {
                id: "pets",
                icon: <Heart className="w-6 h-6 text-blue-600" />,
                title: "🐾 Animais de Estimação",
                summary: "Coleira, guia e recolher fezes",
                details:
                  "Animais de estimação devem circular sempre com coleira e guia. É obrigatório recolher sempre as fezes do seu animal.",
              },
              {
                id: "seguranca",
                icon: <Shield className="w-6 h-6 text-blue-600" />,
                title: "🛡️ Segurança",
                summary: "Seguir orientações da portaria",
                details:
                  "Siga sempre as orientações da portaria e avise sobre visitas. A segurança de todos depende da colaboração de cada morador.",
              },
            ].map((item, index) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-transparent hover:border-blue-500"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="flex items-start space-x-4">
                  {item.icon}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{item.summary}</p>

                    <button
                      onClick={() => toggleSection(item.id)}
                      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                    >
                      {expandedSection === item.id ? "Ver menos" : "Ver mais"}
                      {expandedSection === item.id ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </button>

                    {expandedSection === item.id && (
                      <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-blue-600 shadow-sm animate-fadeIn">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item.details}
                        </p>
                        {item.cta && (
                          <button
                            onClick={item.cta}
                            className="mt-3 flex items-center text-green-600 hover:text-green-700 transition-all duration-300 text-sm font-medium hover:scale-105"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            💬 Falar no WhatsApp
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salão de Festas */}
      <section id="salao" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-900 mr-4" />
              <h2 className="text-3xl font-bold text-blue-900">
                🎉 Salão de Festas e Churrasqueira
              </h2>
            </div>
            <p className="text-gray-600">
              Tudo que você precisa saber para reservar e usar o salão
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Como Reservar
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      1. Verificar Disponibilidade
                    </h4>
                    <p className="text-sm text-gray-600">
                      Consulte o livro da portaria ou a agenda do Drive
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      2. Pagamento
                    </h4>
                    <p className="text-sm text-gray-600">
                      Taxa: R$ 50,00 - Prazo: até 48h após solicitação
                    </p>
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs">
                      <strong>Banco do Brasil:</strong>
                      <br />
                      Agência: 0597-5 | C/C: 39840-3
                      <br />
                      <strong>Pix:</strong> 34.989.255/0001-40
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      3. Confirmação
                    </h4>
                    <p className="text-sm text-gray-600">
                      Envie o comprovante para o subsíndico
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col space-y-3">
                <button
                  onClick={() =>
                    handleWhatsAppContact(
                      "2134896664",
                      "Olá! Gostaria de verificar a disponibilidade do salão de festas para uma data específica."
                    )
                  }
                  className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Verificar Disponibilidade
                </button>
                <button
                  onClick={() => window.open("tel:+552134896664")}
                  className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Ligar para Portaria
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Regras de Uso
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Key className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Chaves</h4>
                    <p className="text-sm text-gray-600">
                      Retirar e devolver na portaria
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Entrega do Espaço
                    </h4>
                    <p className="text-sm text-gray-600">
                      O espaço deve ser entregue:
                    </p>
                    <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                      <li>Limpo e organizado</li>
                      <li>Mesas e cadeiras limpas e empilhadas</li>
                      <li>Churrasqueira limpa</li>
                      <li>Materiais de churrasco limpos</li>
                      <li>Lixo ensacado e recolhido</li>
                      <li>Banheiro higienizado</li>
                      <li>Geladeira desligada</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Importante:</strong> A falta de pagamento cancela
                  automaticamente a reserva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contatos */}
      <section id="contatos" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-blue-900 mr-4" />
              <h2 className="text-3xl font-bold text-blue-900">
                📞 Contatos Úteis
              </h2>
            </div>
            <p className="text-gray-600">
              Tenha sempre à mão os contatos importantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center border-2 border-blue-200 relative">
              <div className="absolute top-4 right-4 flex items-center">
                <Wifi className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600 font-semibold">
                  24h Online
                </span>
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">🏢 Portaria</h3>
              <p className="text-gray-700 font-semibold mb-2">(21) 3489-6664</p>
              <div className="flex items-center justify-center mb-4">
                <Timer className="w-4 h-4 text-gray-600 mr-1" />
                <span className="text-sm text-gray-600">24 horas por dia</span>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => window.open("tel:+552134896664")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  📞 Ligar Agora
                </button>
                <button
                  onClick={() =>
                    handleWhatsAppContact(
                      "2134896664",
                      "Olá! Sou morador do Edifício Marechal Castelo Branco."
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                >
                  💬 WhatsApp
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 relative">
              <div className="absolute top-4 right-4 flex items-center">
                <Timer className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-xs text-orange-600 font-semibold">
                  Horário Comercial
                </span>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                🏢 Administradora Estasa
              </h3>
              <div className="text-sm text-gray-600 mb-2">
                <p className="font-medium">Tel.: (21) 2323-4423</p>
                <p className="font-medium">WhatsApp: (21) 99584-4449</p>
                <p>atendimento.locacao@estasa.com.br</p>
              </div>
              <div className="flex items-center justify-center mb-4">
                <Timer className="w-4 h-4 text-gray-600 mr-1" />
                <span className="text-sm text-gray-600">
                  Segunda à Sexta, 8h-17h
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => window.open("tel:+552123234423")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  📞 Ligar
                </button>
                <button
                  onClick={() =>
                    handleWhatsAppContact(
                      "21995844449",
                      "Olá! Sou morador do Edifício Marechal Castelo Branco e preciso de suporte."
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                >
                  💬 WhatsApp
                </button>
                <button
                  onClick={() =>
                    window.open("mailto:atendimento.locacao@estasa.com.br")
                  }
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  ✉️ E-mail
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">TCL/TLP</h3>
              <div className="text-sm text-gray-600 mb-4">
                <p>Cap Mantovani – Fiscal Administrativo</p>
                <p>Tel.: (91) 98406-3859</p>
                <p>RITEx: 800-7303</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => window.open("tel:+5591984063859")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ligar
                </button>
                <button
                  onClick={() =>
                    handleWhatsAppContact(
                      "91984063859",
                      "Olá Cap Mantovani! Preciso de informações sobre TCL/TLP para meu apartamento no Edifício Marechal Castelo Branco."
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code e Inscrições */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Acesso Rápido
              </h3>
              <img
                src={qrCode}
                alt="QR Code para regras completas"
                className="w-32 h-32 mx-auto mb-4"
              />
              <p className="text-gray-600 mb-6">
                Escaneie o QR Code para acessar
                <br />
                as regras completas do condomínio
              </p>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                Baixar Panfleto PDF
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                📌 Inscrições dos Imóveis
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 p-2 rounded">101: 1.138.126-6</div>
                <div className="bg-gray-50 p-2 rounded">201: 1.138.127-4</div>
                <div className="bg-gray-50 p-2 rounded">202: 1.138.128-2</div>
                <div className="bg-gray-50 p-2 rounded">301: 1.138.129-0</div>
                <div className="bg-gray-50 p-2 rounded">302: 1.138.130-8</div>
                <div className="bg-gray-50 p-2 rounded">401: 1.138.131-6</div>
                <div className="bg-gray-50 p-2 rounded">402: 1.138.132-4</div>
                <div className="bg-gray-50 p-2 rounded">501: 1.138.133-2</div>
                <div className="bg-gray-50 p-2 rounded">502: 1.138.134-0</div>
                <div className="bg-gray-50 p-2 rounded">601: 1.138.135-7</div>
                <div className="bg-gray-50 p-2 rounded">602: 1.138.136-5</div>
                <div className="bg-gray-50 p-2 rounded">701: 1.138.137-3</div>
                <div className="bg-gray-50 p-2 rounded">702: 1.138.138-1</div>
                <div className="bg-gray-50 p-2 rounded">801: 1.138.139-9</div>
                <div className="bg-gray-50 p-2 rounded">802: 1.138.140-7</div>
                <div className="bg-gray-50 p-2 rounded">901: 1.138.141-5</div>
                <div className="bg-gray-50 p-2 rounded">902: 1.138.142-3</div>
                <div className="bg-gray-50 p-2 rounded">1001: 1.138.143-1</div>
                <div className="bg-gray-50 p-2 rounded">1002: 1.138.144-9</div>
                <div className="bg-gray-50 p-2 rounded">1101: 1.138.145-6</div>
                <div className="bg-gray-50 p-2 rounded">1102: 1.138.146-4</div>
                <div className="bg-gray-50 p-2 rounded">1201: 1.138.147-2</div>
                <div className="bg-gray-50 p-2 rounded">1202: 1.138.148-0</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-yellow-400">
                "A convivência é a chave para um lar feliz!"
              </h2>
              <p className="text-blue-100 mb-2">
                Em caso de dúvidas ou sugestões, procure a administração.
              </p>
              <p className="text-blue-100 mb-2">Seja muito bem-vindo!</p>
              <p className="text-blue-200 text-sm mb-4">
                Administração do Edifício Marechal Castelo Branco
              </p>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <p className="text-blue-100">
                  Rua Felipe de Oliveira, 18 - Copacabana - RJ - CEP 22011-030
                </p>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors mb-4"
              >
                <Download className="w-5 h-5 mr-2" />
                Baixar Panfleto PDF
              </button>
              <p className="text-blue-200 text-sm">
                Desenvolvido com ❤️ para nossos moradores
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modais */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  );
}

// Componente principal App com provedores
function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
