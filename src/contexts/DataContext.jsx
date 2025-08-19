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
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    // Carrega dados salvos do localStorage
    const savedData = localStorage.getItem("panfleto_data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData({ ...defaultData, ...parsedData });
      } catch (error) {
        console.error("Erro ao carregar dados salvos:", error);
      }
    }
  }, []);

  const updateData = (newData) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("panfleto_data", JSON.stringify(updated));
      return updated;
    });
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.setItem("panfleto_data", JSON.stringify(defaultData));
  };

  const value = {
    data,
    updateData,
    resetData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
