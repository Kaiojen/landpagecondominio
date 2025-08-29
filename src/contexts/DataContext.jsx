import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData deve ser usado dentro de DataProvider");
  }
  return context;
};

const defaultData = {
  building: {
    name: "Edifício Marechal Castelo Branco",
    address:
      "Rua Felipe de Oliveira, 18 – Copacabana – Rio de Janeiro – CEP 22011-030",
    welcomeMessage:
      "É com grande alegria que a administração e os demais condôminos dão as boas-vindas a você e sua família. Estamos felizes por tê-los conosco na Rua Felipe de Oliveira, 18 – Copacabana – Rio de Janeiro – CEP 22011-030. Esperamos que se sintam em casa! Para garantir a boa convivência e a segurança de todos, preparamos este guia rápido com informações importantes.",
    footerMessage: "A convivência é a chave para um lar feliz!",
  },
  contacts: {
    portaria: {
      name: "Portaria",
      phone: "(21) 3489-6664",
      whatsapp: "2134896664",
      availability: "24 horas por dia",
    },
    administradora: {
      name: "Administradora Estasa",
      phone: "(21) 2323-4423",
      whatsapp: "21995844449",
      email: "atendimento.locacao@estasa.com.br",
      availability: "Segunda à Sexta, 8h-17h",
    },
    tcl: {
      name: "Cap Mantovani – Fiscal Administrativo",
      phone: "(91) 98406-3859",
      whatsapp: "91984063859",
      ritex: "800-7303",
    },
  },
  salaoFestas: {
    price: "50,00",
    paymentDeadline: "48h após solicitação",
    bankAccount: {
      bank: "Banco do Brasil",
      agency: "0597-5",
      account: "39840-3",
      pix: "34.989.255/0001-40",
    },
  },
  rules: {
    silenceHours: "Das 22h às 8h",
    petRequirements:
      "Devem circular com coleira e guia. Recolher sempre as fezes.",
    trashRules:
      "Todo lixo deve ser ensacado. O orgânico, além de ensacado, deve ser colocado no duto de lixo.",
    movingRules:
      "Devem ser agendadas com o síndico e seguir as normas municipais.",
    parkingRules: "Distribuídas por antiguidade dos militares.",
    securityRules: "Siga as orientações da portaria e avise sobre visitas.",
  },
  apartments: {
    101: "1.138.126-6",
    201: "1.138.127-4",
    202: "1.138.128-2",
    301: "1.138.129-0",
    302: "1.138.130-8",
    401: "1.138.131-6",
    402: "1.138.132-4",
    501: "1.138.133-2",
    502: "1.138.134-0",
    601: "1.138.135-7",
    602: "1.138.136-5",
    701: "1.138.137-3",
    702: "1.138.138-1",
    801: "1.138.139-9",
    802: "1.138.140-7",
    901: "1.138.141-5",
    902: "1.138.142-3",
    1001: "1.138.143-1",
    1002: "1.138.144-9",
    1101: "1.138.145-6",
    1102: "1.138.146-4",
    1201: "1.138.147-2",
    1202: "1.138.148-0",
  },
  newResidentForm: {
    title: "Cadastro de Novo Morador",
    subtitle:
      "Preencha as informações abaixo para se registrar como novo morador",
    enabled: true,
    sendTo: {
      whatsapp: "21986505733", // Número para teste
      adminEmail: "admin@edificio.com.br",
      preferredMethod: "whatsapp", // "whatsapp" ou "email"
    },
    fields: {
      personalInfo: {
        enabled: true,
        title: "Informações Pessoais",
        fields: [
          {
            name: "nomeCompleto",
            label: "Nome Completo",
            type: "text",
            required: true,
            enabled: true,
          },
          {
            name: "cpf",
            label: "CPF",
            type: "text",
            required: true,
            enabled: true,
          },
          {
            name: "rg",
            label: "RG",
            type: "text",
            required: true,
            enabled: true,
          },
          {
            name: "telefone",
            label: "Telefone",
            type: "tel",
            required: true,
            enabled: true,
          },
          {
            name: "email",
            label: "E-mail",
            type: "email",
            required: true,
            enabled: true,
          },
          {
            name: "dataNascimento",
            label: "Data de Nascimento",
            type: "date",
            required: false,
            enabled: true,
          },
        ],
      },
      residenceInfo: {
        enabled: true,
        title: "Informações da Residência",
        fields: [
          {
            name: "apartamento",
            label: "Número do Apartamento",
            type: "select",
            required: true,
            enabled: true,
            options: [
              "101",
              "201",
              "202",
              "301",
              "302",
              "401",
              "402",
              "501",
              "502",
              "601",
              "602",
              "701",
              "702",
              "801",
              "802",
              "901",
              "902",
              "1001",
              "1002",
              "1101",
              "1102",
              "1201",
              "1202",
            ],
          },
          {
            name: "tipoOcupacao",
            label: "Tipo de Ocupação",
            type: "select",
            required: true,
            enabled: true,
            options: ["Proprietário", "Locatário", "Cedido"],
          },
          {
            name: "dataEntrada",
            label: "Data de Entrada no Imóvel",
            type: "date",
            required: true,
            enabled: true,
          },
          {
            name: "numeroMoradores",
            label: "Número de Moradores",
            type: "number",
            required: true,
            enabled: true,
          },
        ],
      },
      familyInfo: {
        enabled: true,
        title: "Informações da Família",
        fields: [
          {
            name: "conjugeNome",
            label: "Nome do Cônjuge/Companheiro(a)",
            type: "text",
            required: false,
            enabled: true,
          },
          {
            name: "filhosNomes",
            label: "Nomes e Idades dos Filhos",
            type: "textarea",
            required: false,
            enabled: true,
            placeholder: "Ex: João - 10 anos, Maria - 5 anos",
          },
          {
            name: "outrosMoradores",
            label: "Outros Moradores",
            type: "textarea",
            required: false,
            enabled: true,
            placeholder: "Ex: Pais, parentes, empregados, etc.",
          },
        ],
      },
      emergencyInfo: {
        enabled: true,
        title: "Contato de Emergência",
        fields: [
          {
            name: "contatoEmergenciaNome",
            label: "Nome do Contato",
            type: "text",
            required: true,
            enabled: true,
          },
          {
            name: "contatoEmergenciaTelefone",
            label: "Telefone do Contato",
            type: "tel",
            required: true,
            enabled: true,
          },
          {
            name: "contatoEmergenciaParentesco",
            label: "Grau de Parentesco",
            type: "text",
            required: true,
            enabled: true,
          },
        ],
      },
      vehicleInfo: {
        enabled: true,
        title: "Informações de Veículos",
        fields: [
          {
            name: "possuiVeiculo",
            label: "Possui Veículo?",
            type: "select",
            required: true,
            enabled: true,
            options: ["Sim", "Não"],
          },
          {
            name: "marcaModelo",
            label: "Marca e Modelo",
            type: "text",
            required: false,
            enabled: true,
          },
          {
            name: "placa",
            label: "Placa",
            type: "text",
            required: false,
            enabled: true,
          },
          {
            name: "cor",
            label: "Cor",
            type: "text",
            required: false,
            enabled: true,
          },
        ],
      },
      additionalInfo: {
        enabled: true,
        title: "Informações Adicionais",
        fields: [
          {
            name: "possuiPets",
            label: "Possui Animais de Estimação?",
            type: "select",
            required: true,
            enabled: true,
            options: ["Sim", "Não"],
          },
          {
            name: "tiposPets",
            label: "Tipos e Nomes dos Pets",
            type: "textarea",
            required: false,
            enabled: true,
            placeholder: "Ex: 1 cão (Rex), 1 gato (Mimi)",
          },
          {
            name: "profissao",
            label: "Profissão",
            type: "text",
            required: false,
            enabled: true,
          },
          {
            name: "observacoes",
            label: "Observações",
            type: "textarea",
            required: false,
            enabled: true,
            placeholder: "Informações adicionais que julgar importantes",
          },
        ],
      },
    },
    messages: {
      success: "Cadastro enviado com sucesso! Entraremos em contato em breve.",
      whatsappTemplate: `🏢 *NOVO MORADOR - CADASTRO*

👤 *DADOS PESSOAIS*
• Nome: {nomeCompleto}
• CPF: {cpf}
• RG: {rg}
• Telefone: {telefone}
• E-mail: {email}
• Data de Nascimento: {dataNascimento}

🏠 *DADOS DA RESIDÊNCIA*
• Apartamento: {apartamento}
• Tipo de Ocupação: {tipoOcupacao}
• Data de Entrada: {dataEntrada}
• Número de Moradores: {numeroMoradores}

👨‍👩‍👧‍👦 *FAMÍLIA*
• Cônjuge: {conjugeNome}
• Filhos: {filhosNomes}
• Outros Moradores: {outrosMoradores}

🚨 *CONTATO DE EMERGÊNCIA*
• Nome: {contatoEmergenciaNome}
• Telefone: {contatoEmergenciaTelefone}
• Parentesco: {contatoEmergenciaParentesco}

🚗 *VEÍCULOS*
• Possui Veículo: {possuiVeiculo}
• Marca/Modelo: {marcaModelo}
• Placa: {placa}
• Cor: {cor}

🐕 *PETS*
• Possui Pets: {possuiPets}
• Tipos/Nomes: {tiposPets}

💼 *INFORMAÇÕES ADICIONAIS*
• Profissão: {profissao}
• Observações: {observacoes}

---
*Cadastro enviado via formulário online do Edifício Marechal Castelo Branco*`,
    },
  },
  systemTexts: {
    salaoFestas: {
      title: "🎉 Salão de Festas e Churrasqueira",
      subtitle: "Tudo que você precisa saber para reservar e usar o salão",
      reservationTitle: "Como Reservar",
      rulesTitle: "Regras de Uso",
      step1Title: "1. Verificar Disponibilidade",
      step1Description: "Consulte o livro da portaria ou a agenda do Drive",
      step2Title: "2. Pagamento",
      step2Description: "Taxa: R$ {price} - Prazo: {paymentDeadline}",
      step3Title: "3. Confirmação",
      step3Description: "Envie o comprovante para o subsíndico",
      keyRulesTitle: "Chaves",
      keyRulesDescription: "Retirar e devolver na portaria",
      cleaningRulesTitle: "Entrega do Espaço",
      cleaningRulesDescription: "O espaço deve ser entregue:",
      cleaningRules: [
        "Limpo e organizado",
        "Mesas e cadeiras limpas e empilhadas",
        "Churrasqueira limpa",
        "Materiais de churrasco limpos",
        "Lixo ensacado e recolhido",
        "Banheiro higienizado",
        "Geladeira desligada",
      ],
      paymentWarning:
        "⚠️ Importante: A falta de pagamento cancela automaticamente a reserva.",
      verifyAvailabilityButton: "Verificar Disponibilidade",
      callPortariaButton: "Ligar para Portaria",
      whatsappMessage:
        "Olá! Gostaria de verificar a disponibilidade do salão de festas para uma data específica.",
    },
    contacts: {
      title: "📞 Contatos Úteis",
      subtitle: "Tenha sempre à mão os contatos importantes",
      portariaTitle: "🏢 Portaria",
      callNowButton: "📞 Ligar Agora",
      whatsappButton: "💬 WhatsApp",
      emailButton: "✉️ E-mail",
      onlineStatus: "24h Online",
      businessHours: "Horário Comercial",
      moradorWhatsappMessage:
        "Olá! Sou morador do Edifício Marechal Castelo Branco.",
    },
    hero: {
      viewRulesButton: "Ver Regras Importantes",
      talkToPortariaButton: "Falar com Portaria",
    },
    welcome: {
      title: "Mensagem de Boas-Vindas",
    },
    rules: {
      title: "📋 Regras Importantes",
      subtitle: "Orientações essenciais para uma boa convivência",
      viewingText: "Visualizando 1 de {total} regras",
      totalRulesText: "{total} regras importantes",
      silenceTitle: "🤫 Horário de Silêncio",
      petsTitle: "🐕 Animais de Estimação",
      trashTitle: "🗑️ Descarte de Lixo",
      movingTitle: "📦 Mudanças",
      parkingTitle: "🚗 Vagas de Estacionamento",
      securityTitle: "🛡️ Segurança e Visitas",
      tclTitle: "💰 Taxa de Limpeza Pública (TCL/TLP)",
      // Summaries (resumos)
      tclSummary:
        "Responsabilidade do ocupante conforme Portaria C Ex nº 1846/2022",
      parkingSummary: "Distribuição por antiguidade dos militares",
      movingSummary: "Agendamento obrigatório com síndico",
      trashSummary: "Ensacar todo lixo, orgânico no duto",
      petsSummary: "Coleira, guia e recolher fezes",
      securitySummary: "Seguir orientações da portaria",
      // Details (descrições completas)
      tclDetails:
        "Conforme Portaria C Ex nº 1846/2022, o permissionário (ocupante) é responsável pelo pagamento da Taxa de Coleta de Lixo (TCL) e da Taxa de Limpeza Pública (TLP). A TLP é um tributo municipal destinado a remunerar os serviços de coleta e destinação de resíduos sólidos. O pagamento deve ser feito usando o número de inscrição do seu imóvel.",
      parkingDetails:
        "As vagas de estacionamento são distribuídas por antiguidade dos militares. Respeite sempre a vaga designada e não estacione em locais não autorizados.",
      securityDetails:
        "Siga sempre as orientações da portaria e avise sobre visitas. A segurança de todos depende da colaboração de cada morador.",
      // WhatsApp Messages
      tclWhatsappMessage:
        "Olá Cap Mantovani! Preciso de informações sobre TCL/TLP para meu apartamento no Edifício Marechal Castelo Branco.",
      movingWhatsappMessage:
        "Olá! Preciso agendar uma mudança no Edifício Marechal Castelo Branco.",
    },
  },
};

// Função utilitária para salvar dados com múltiplos backups
const saveDataWithBackup = (data) => {
  try {
    const dataString = JSON.stringify(data);
    const timestamp = new Date().toISOString();

    // Salva no localStorage principal
    localStorage.setItem("panfleto_data", dataString);

    // Salva backup com timestamp
    localStorage.setItem("panfleto_data_backup", dataString);
    localStorage.setItem("panfleto_data_timestamp", timestamp);

    // Salva backup em sessionStorage como fallback
    sessionStorage.setItem("panfleto_data_session", dataString);

    // Log para debug
    console.log("✅ Dados salvos com sucesso:", timestamp);

    return true;
  } catch (error) {
    console.error("❌ Erro ao salvar dados:", error);
    return false;
  }
};

// Função utilitária para carregar dados com fallbacks
const loadDataWithFallback = () => {
  try {
    // Tenta carregar do localStorage principal
    let savedData = localStorage.getItem("panfleto_data");

    // Se não encontrou, tenta o backup
    if (!savedData) {
      savedData = localStorage.getItem("panfleto_data_backup");
      console.log("🔄 Carregando do backup localStorage");
    }

    // Se ainda não encontrou, tenta sessionStorage
    if (!savedData) {
      savedData = sessionStorage.getItem("panfleto_data_session");
      console.log("🔄 Carregando do sessionStorage");
    }

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const timestamp = localStorage.getItem("panfleto_data_timestamp");
      console.log("✅ Dados carregados de:", timestamp);
      return parsedData;
    }
  } catch (error) {
    console.error("❌ Erro ao carregar dados:", error);
  }

  return null;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // Carrega dados salvos com sistema de fallback
    const savedData = loadDataWithFallback();
    if (savedData) {
      setData({ ...defaultData, ...savedData });
      const timestamp = localStorage.getItem("panfleto_data_timestamp");
      setLastSaved(timestamp);
    }
  }, []);

  const updateData = (newData) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      const success = saveDataWithBackup(updated);

      if (success) {
        setLastSaved(new Date().toISOString());
      }

      return updated;
    });
  };

  const resetData = () => {
    const success = saveDataWithBackup(defaultData);
    setData(defaultData);

    if (success) {
      setLastSaved(new Date().toISOString());
    }
  };

  const exportData = () => {
    try {
      const exportData = {
        data: data,
        timestamp: new Date().toISOString(),
        version: "1.0",
      };

      const dataString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `configuracoes-condominio-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log("✅ Configurações exportadas com sucesso");
      return true;
    } catch (error) {
      console.error("❌ Erro ao exportar configurações:", error);
      return false;
    }
  };

  const importData = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("Nenhum arquivo selecionado"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);

          // Valida a estrutura dos dados
          if (importedData.data && typeof importedData.data === "object") {
            const mergedData = { ...defaultData, ...importedData.data };
            const success = saveDataWithBackup(mergedData);

            if (success) {
              setData(mergedData);
              setLastSaved(new Date().toISOString());
              console.log("✅ Configurações importadas com sucesso");
              resolve(true);
            } else {
              reject(new Error("Erro ao salvar dados importados"));
            }
          } else {
            reject(new Error("Formato de arquivo inválido"));
          }
        } catch (error) {
          console.error("❌ Erro ao importar configurações:", error);
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error("Erro ao ler o arquivo"));
      };

      reader.readAsText(file);
    });
  };

  const getBackupInfo = () => {
    const timestamp = localStorage.getItem("panfleto_data_timestamp");
    const hasBackup = !!localStorage.getItem("panfleto_data_backup");
    const hasSession = !!sessionStorage.getItem("panfleto_data_session");

    return {
      lastSaved,
      timestamp,
      hasBackup,
      hasSession,
      backupDate: timestamp
        ? new Date(timestamp).toLocaleString("pt-BR")
        : null,
    };
  };

  const value = {
    data,
    updateData,
    resetData,
    exportData,
    importData,
    getBackupInfo,
    lastSaved,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
