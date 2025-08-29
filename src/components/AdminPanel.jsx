import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Settings,
  Save,
  RotateCcw,
  LogOut,
  Home,
  Phone,
  Users,
  Shield,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  Download,
  Upload,
  FileText,
  Clock,
} from "lucide-react";

export const AdminPanel = ({ isOpen, onClose }) => {
  const { data, updateData, resetData, exportData, importData, getBackupInfo } =
    useData();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("building");
  const [isSaving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState(data);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState(null);

  const handleSave = async () => {
    setSaving(true);

    // Simula um delay de salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateData(formData);
    setShowSuccess(true);
    setSaving(false);

    // Esconde mensagem de sucesso após 3 segundos
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    resetData();
    setFormData(data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const updateFormData = (path, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleExport = () => {
    try {
      exportData();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao exportar configurações:", error);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    try {
      await importData(file);
      setFormData(data); // Atualiza formData com os dados importados
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);
    } catch (error) {
      setImportError(error.message);
      setTimeout(() => setImportError(null), 5000);
    } finally {
      setIsImporting(false);
      // Limpa o input file
      event.target.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] sm:max-h-[90vh] w-[95vw] sm:w-full overflow-hidden p-4 sm:p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Settings className="h-5 w-5 text-blue-600" />
            Painel de Administração
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Edite as informações do condomínio que aparecem na landing page.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          {showSuccess && (
            <Alert className="flex-1 mr-4 border-green-500 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Alterações salvas com sucesso!
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 ml-auto">
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Resetar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              size="sm"
              className="gap-2 min-w-[100px]"
            >
              {isSaving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar
                </>
              )}
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 h-auto">
            <TabsTrigger
              value="building"
              className="gap-1 text-xs flex-col sm:flex-row sm:gap-2 sm:text-sm p-2"
            >
              <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:block">Edifício</span>
              <span className="sm:hidden">Ed.</span>
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="gap-1 text-xs flex-col sm:flex-row sm:gap-2 sm:text-sm p-2"
            >
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:block">Contatos</span>
              <span className="sm:hidden">Tel.</span>
            </TabsTrigger>
            <TabsTrigger
              value="salao"
              className="gap-1 text-xs flex-col sm:flex-row sm:gap-2 sm:text-sm p-2"
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:block">Salão</span>
              <span className="sm:hidden">Sal.</span>
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="gap-1 text-xs flex-col sm:flex-row sm:gap-2 sm:text-sm p-2"
            >
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:block">Regras</span>
              <span className="sm:hidden">Reg.</span>
            </TabsTrigger>
            <TabsTrigger
              value="newresident"
              className="gap-1 text-xs flex-col sm:flex-row sm:gap-2 sm:text-sm p-2"
            >
              <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:block">Cadastro</span>
              <span className="sm:hidden">Cad.</span>
            </TabsTrigger>
            <TabsTrigger
              value="backup"
              className="gap-1 text-xs flex-col sm:flex-row sm:gap-2 sm:text-sm p-2"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:block">Backup</span>
              <span className="sm:hidden">Bkp.</span>
            </TabsTrigger>
            <TabsTrigger
              value="texts"
              className="gap-1 text-xs flex-col sm:flex-row sm:gap-2 sm:text-sm p-2"
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:block">Textos</span>
              <span className="sm:hidden">Txt.</span>
            </TabsTrigger>
          </TabsList>

          <div className="max-h-[65vh] overflow-y-auto mt-4">
            <TabsContent value="building" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Edifício</CardTitle>
                  <CardDescription>
                    Configure as informações básicas que aparecem na página.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="building-name">Nome do Edifício</Label>
                    <Input
                      id="building-name"
                      value={formData.building.name}
                      onChange={(e) =>
                        updateFormData("building.name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="building-address">Endereço Completo</Label>
                    <Input
                      id="building-address"
                      value={formData.building.address}
                      onChange={(e) =>
                        updateFormData("building.address", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="welcome-message">
                      Mensagem de Boas-vindas
                    </Label>
                    <Textarea
                      id="welcome-message"
                      value={formData.building.welcomeMessage}
                      onChange={(e) =>
                        updateFormData(
                          "building.welcomeMessage",
                          e.target.value
                        )
                      }
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="footer-message">Frase do Rodapé</Label>
                    <Input
                      id="footer-message"
                      value={formData.building.footerMessage}
                      onChange={(e) =>
                        updateFormData("building.footerMessage", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contatos do Condomínio</CardTitle>
                  <CardDescription>
                    Atualize os números de telefone e informações de contato.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Portaria</h4>
                      <div>
                        <Label>Telefone</Label>
                        <Input
                          value={formData.contacts.portaria.phone}
                          onChange={(e) =>
                            updateFormData(
                              "contacts.portaria.phone",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>WhatsApp (apenas números)</Label>
                        <Input
                          value={formData.contacts.portaria.whatsapp}
                          onChange={(e) =>
                            updateFormData(
                              "contacts.portaria.whatsapp",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Administradora</h4>
                      <div>
                        <Label>Nome</Label>
                        <Input
                          value={formData.contacts.administradora.name}
                          onChange={(e) =>
                            updateFormData(
                              "contacts.administradora.name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Telefone</Label>
                        <Input
                          value={formData.contacts.administradora.phone}
                          onChange={(e) =>
                            updateFormData(
                              "contacts.administradora.phone",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>WhatsApp</Label>
                        <Input
                          value={formData.contacts.administradora.whatsapp}
                          onChange={(e) =>
                            updateFormData(
                              "contacts.administradora.whatsapp",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>E-mail</Label>
                        <Input
                          value={formData.contacts.administradora.email}
                          onChange={(e) =>
                            updateFormData(
                              "contacts.administradora.email",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">TCL/TLP</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome do Responsável</Label>
                        <Input
                          value={formData.contacts.tcl.name}
                          onChange={(e) =>
                            updateFormData("contacts.tcl.name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Telefone</Label>
                        <Input
                          value={formData.contacts.tcl.phone}
                          onChange={(e) =>
                            updateFormData("contacts.tcl.phone", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>WhatsApp</Label>
                        <Input
                          value={formData.contacts.tcl.whatsapp}
                          onChange={(e) =>
                            updateFormData(
                              "contacts.tcl.whatsapp",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>RITEx</Label>
                        <Input
                          value={formData.contacts.tcl.ritex}
                          onChange={(e) =>
                            updateFormData("contacts.tcl.ritex", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="salao" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Salão de Festas</CardTitle>
                  <CardDescription>
                    Configure preços e informações bancárias para reservas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Preço da Taxa (apenas valor)</Label>
                      <Input
                        value={formData.salaoFestas.price}
                        onChange={(e) =>
                          updateFormData("salaoFestas.price", e.target.value)
                        }
                        placeholder="50,00"
                      />
                    </div>
                    <div>
                      <Label>Prazo de Pagamento</Label>
                      <Input
                        value={formData.salaoFestas.paymentDeadline}
                        onChange={(e) =>
                          updateFormData(
                            "salaoFestas.paymentDeadline",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Dados Bancários</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Banco</Label>
                        <Input
                          value={formData.salaoFestas.bankAccount.bank}
                          onChange={(e) =>
                            updateFormData(
                              "salaoFestas.bankAccount.bank",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Agência</Label>
                        <Input
                          value={formData.salaoFestas.bankAccount.agency}
                          onChange={(e) =>
                            updateFormData(
                              "salaoFestas.bankAccount.agency",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Conta Corrente</Label>
                        <Input
                          value={formData.salaoFestas.bankAccount.account}
                          onChange={(e) =>
                            updateFormData(
                              "salaoFestas.bankAccount.account",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Chave PIX</Label>
                        <Input
                          value={formData.salaoFestas.bankAccount.pix}
                          onChange={(e) =>
                            updateFormData(
                              "salaoFestas.bankAccount.pix",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Regras do Condomínio</CardTitle>
                  <CardDescription>
                    Atualize as regras e orientações para os moradores.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Horário de Silêncio</Label>
                    <Input
                      value={formData.rules.silenceHours}
                      onChange={(e) =>
                        updateFormData("rules.silenceHours", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Regras para Animais de Estimação</Label>
                    <Textarea
                      value={formData.rules.petRequirements}
                      onChange={(e) =>
                        updateFormData("rules.petRequirements", e.target.value)
                      }
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Regras do Lixo</Label>
                    <Textarea
                      value={formData.rules.trashRules}
                      onChange={(e) =>
                        updateFormData("rules.trashRules", e.target.value)
                      }
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Regras de Mudança</Label>
                    <Textarea
                      value={formData.rules.movingRules}
                      onChange={(e) =>
                        updateFormData("rules.movingRules", e.target.value)
                      }
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Regras de Estacionamento</Label>
                    <Textarea
                      value={formData.rules.parkingRules}
                      onChange={(e) =>
                        updateFormData("rules.parkingRules", e.target.value)
                      }
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Regras de Segurança</Label>
                    <Textarea
                      value={formData.rules.securityRules}
                      onChange={(e) =>
                        updateFormData("rules.securityRules", e.target.value)
                      }
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="texts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Textos do Sistema - Salão de Festas</CardTitle>
                  <CardDescription>
                    Edite todos os textos que aparecem na seção do salão de
                    festas e churrasqueira.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título da Seção</Label>
                      <Input
                        value={formData.systemTexts?.salaoFestas?.title || ""}
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.salaoFestas.title",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Subtítulo</Label>
                      <Input
                        value={
                          formData.systemTexts?.salaoFestas?.subtitle || ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.salaoFestas.subtitle",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Título "Como Reservar"</Label>
                      <Input
                        value={
                          formData.systemTexts?.salaoFestas?.reservationTitle ||
                          ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.salaoFestas.reservationTitle",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>Título "Regras de Uso"</Label>
                      <Input
                        value={
                          formData.systemTexts?.salaoFestas?.rulesTitle || ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.salaoFestas.rulesTitle",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Passos da Reserva</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Passo 1 - Título</Label>
                          <Input
                            value={
                              formData.systemTexts?.salaoFestas?.step1Title ||
                              ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.salaoFestas.step1Title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Passo 1 - Descrição</Label>
                          <Textarea
                            value={
                              formData.systemTexts?.salaoFestas
                                ?.step1Description || ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.salaoFestas.step1Description",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Passo 3 - Título</Label>
                          <Input
                            value={
                              formData.systemTexts?.salaoFestas?.step3Title ||
                              ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.salaoFestas.step3Title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label>Passo 3 - Descrição</Label>
                          <Textarea
                            value={
                              formData.systemTexts?.salaoFestas
                                ?.step3Description || ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.salaoFestas.step3Description",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Regras de Limpeza</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Título das Regras de Chaves</Label>
                        <Input
                          value={
                            formData.systemTexts?.salaoFestas?.keyRulesTitle ||
                            ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.salaoFestas.keyRulesTitle",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Descrição das Chaves</Label>
                        <Textarea
                          value={
                            formData.systemTexts?.salaoFestas
                              ?.keyRulesDescription || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.salaoFestas.keyRulesDescription",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Título das Regras de Limpeza</Label>
                      <Input
                        value={
                          formData.systemTexts?.salaoFestas
                            ?.cleaningRulesTitle || ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.salaoFestas.cleaningRulesTitle",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div>
                      <Label>Descrição das Regras de Limpeza</Label>
                      <Textarea
                        value={
                          formData.systemTexts?.salaoFestas
                            ?.cleaningRulesDescription || ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.salaoFestas.cleaningRulesDescription",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Lista de Itens de Limpeza (um por linha)</Label>
                      <Textarea
                        value={
                          formData.systemTexts?.salaoFestas?.cleaningRules?.join(
                            "\n"
                          ) || ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.salaoFestas.cleaningRules",
                            e.target.value.split("\n")
                          )
                        }
                        rows={7}
                        placeholder="Limpo e organizado&#10;Mesas e cadeiras limpas e empilhadas&#10;Churrasqueira limpa&#10;..."
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Outros Textos</h4>
                    <div>
                      <Label>Mensagem de Aviso sobre Pagamento</Label>
                      <Textarea
                        value={
                          formData.systemTexts?.salaoFestas?.paymentWarning ||
                          ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.salaoFestas.paymentWarning",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Botão "Verificar Disponibilidade"</Label>
                        <Input
                          value={
                            formData.systemTexts?.salaoFestas
                              ?.verifyAvailabilityButton || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.salaoFestas.verifyAvailabilityButton",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Botão "Ligar para Portaria"</Label>
                        <Input
                          value={
                            formData.systemTexts?.salaoFestas
                              ?.callPortariaButton || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.salaoFestas.callPortariaButton",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Mensagem WhatsApp Padrão</Label>
                      <Textarea
                        value={
                          formData.systemTexts?.salaoFestas?.whatsappMessage ||
                          ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.salaoFestas.whatsappMessage",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Textos do Sistema - Outras Seções</CardTitle>
                  <CardDescription>
                    Edite títulos e textos das outras seções do site.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Seção de Contatos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Título da Seção</Label>
                        <Input
                          value={formData.systemTexts?.contacts?.title || ""}
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.contacts.title",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Subtítulo</Label>
                        <Input
                          value={formData.systemTexts?.contacts?.subtitle || ""}
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.contacts.subtitle",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Seção de Regras</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Título da Seção</Label>
                        <Input
                          value={formData.systemTexts?.rules?.title || ""}
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.rules.title",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Subtítulo</Label>
                        <Input
                          value={formData.systemTexts?.rules?.subtitle || ""}
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.rules.subtitle",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">
                      Botões da Página Inicial
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Botão "Ver Regras"</Label>
                        <Input
                          value={
                            formData.systemTexts?.hero?.viewRulesButton || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.hero.viewRulesButton",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Botão "Falar com Portaria"</Label>
                        <Input
                          value={
                            formData.systemTexts?.hero?.talkToPortariaButton ||
                            ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.hero.talkToPortariaButton",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Títulos das Seções</h4>
                    <div>
                      <Label>Título "Mensagem de Boas-Vindas"</Label>
                      <Input
                        value={formData.systemTexts?.welcome?.title || ""}
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.welcome.title",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Textos das Regras</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Texto "Visualizando X regras"</Label>
                        <Input
                          value={formData.systemTexts?.rules?.viewingText || ""}
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.rules.viewingText",
                              e.target.value
                            )
                          }
                          placeholder="Use {total} para o número"
                        />
                      </div>
                      <div>
                        <Label>Texto "X regras importantes"</Label>
                        <Input
                          value={
                            formData.systemTexts?.rules?.totalRulesText || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.rules.totalRulesText",
                              e.target.value
                            )
                          }
                          placeholder="Use {total} para o número"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Título - TCL/TLP</Label>
                      <Input
                        value={formData.systemTexts?.rules?.tclTitle || ""}
                        onChange={(e) =>
                          updateFormData(
                            "systemTexts.rules.tclTitle",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium text-xs text-gray-600">
                        Resumos das Regras
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>TCL - Resumo</Label>
                          <Textarea
                            value={
                              formData.systemTexts?.rules?.tclSummary || ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.rules.tclSummary",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Estacionamento - Resumo</Label>
                          <Textarea
                            value={
                              formData.systemTexts?.rules?.parkingSummary || ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.rules.parkingSummary",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Mudanças - Resumo</Label>
                          <Textarea
                            value={
                              formData.systemTexts?.rules?.movingSummary || ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.rules.movingSummary",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Lixo - Resumo</Label>
                          <Textarea
                            value={
                              formData.systemTexts?.rules?.trashSummary || ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.rules.trashSummary",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Pets - Resumo</Label>
                          <Textarea
                            value={
                              formData.systemTexts?.rules?.petsSummary || ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.rules.petsSummary",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Segurança - Resumo</Label>
                          <Textarea
                            value={
                              formData.systemTexts?.rules?.securitySummary || ""
                            }
                            onChange={(e) =>
                              updateFormData(
                                "systemTexts.rules.securitySummary",
                                e.target.value
                              )
                            }
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium text-xs text-gray-600">
                        Descrições Completas
                      </h5>

                      <div>
                        <Label>TCL - Descrição Completa</Label>
                        <Textarea
                          value={formData.systemTexts?.rules?.tclDetails || ""}
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.rules.tclDetails",
                              e.target.value
                            )
                          }
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label>Estacionamento - Descrição</Label>
                        <Textarea
                          value={
                            formData.systemTexts?.rules?.parkingDetails || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.rules.parkingDetails",
                              e.target.value
                            )
                          }
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Segurança - Descrição</Label>
                        <Textarea
                          value={
                            formData.systemTexts?.rules?.securityDetails || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.rules.securityDetails",
                              e.target.value
                            )
                          }
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-medium text-xs text-gray-600">
                        Mensagens WhatsApp
                      </h5>

                      <div>
                        <Label>TCL - Mensagem WhatsApp</Label>
                        <Textarea
                          value={
                            formData.systemTexts?.rules?.tclWhatsappMessage ||
                            ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.rules.tclWhatsappMessage",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label>Mudanças - Mensagem WhatsApp</Label>
                        <Textarea
                          value={
                            formData.systemTexts?.rules
                              ?.movingWhatsappMessage || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "systemTexts.rules.movingWhatsappMessage",
                              e.target.value
                            )
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Cadastro de Novos Moradores */}
            <TabsContent value="newresident" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Formulário de Cadastro de Novos Moradores
                  </CardTitle>
                  <CardDescription>
                    Configure o formulário de inscrição de novos moradores e
                    suas opções de envio.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Configurações Gerais */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="newresident-enabled">
                        Formulário Ativo
                      </Label>
                      <select
                        id="newresident-enabled"
                        className="w-full p-2 border rounded-lg"
                        value={
                          formData.newResidentForm?.enabled ? "true" : "false"
                        }
                        onChange={(e) =>
                          updateFormData(
                            "newResidentForm.enabled",
                            e.target.value === "true"
                          )
                        }
                      >
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="newresident-title">
                        Título do Formulário
                      </Label>
                      <Input
                        id="newresident-title"
                        value={formData.newResidentForm?.title || ""}
                        onChange={(e) =>
                          updateFormData(
                            "newResidentForm.title",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="newresident-subtitle">Subtítulo</Label>
                      <Textarea
                        id="newresident-subtitle"
                        value={formData.newResidentForm?.subtitle || ""}
                        onChange={(e) =>
                          updateFormData(
                            "newResidentForm.subtitle",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Configurações de Envio */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">
                      Configurações de Envio
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="whatsapp-number">
                          Número WhatsApp (Administração)
                        </Label>
                        <Input
                          id="whatsapp-number"
                          value={
                            formData.newResidentForm?.sendTo?.whatsapp || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "newResidentForm.sendTo.whatsapp",
                              e.target.value
                            )
                          }
                          placeholder="Ex: 21986505733"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Apenas números, sem +55
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="admin-email">
                          E-mail Administração
                        </Label>
                        <Input
                          id="admin-email"
                          type="email"
                          value={
                            formData.newResidentForm?.sendTo?.adminEmail || ""
                          }
                          onChange={(e) =>
                            updateFormData(
                              "newResidentForm.sendTo.adminEmail",
                              e.target.value
                            )
                          }
                          placeholder="admin@edificio.com.br"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="preferred-method">
                        Método Preferido de Envio
                      </Label>
                      <select
                        id="preferred-method"
                        className="w-full p-2 border rounded-lg"
                        value={
                          formData.newResidentForm?.sendTo?.preferredMethod ||
                          "whatsapp"
                        }
                        onChange={(e) =>
                          updateFormData(
                            "newResidentForm.sendTo.preferredMethod",
                            e.target.value
                          )
                        }
                      >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">E-mail</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensagem de Sucesso */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">Mensagens</h4>
                    <div>
                      <Label htmlFor="success-message">
                        Mensagem de Sucesso
                      </Label>
                      <Textarea
                        id="success-message"
                        value={
                          formData.newResidentForm?.messages?.success || ""
                        }
                        onChange={(e) =>
                          updateFormData(
                            "newResidentForm.messages.success",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Seções do Formulário */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-4">Seções do Formulário</h4>
                    <div className="space-y-4">
                      {Object.entries(
                        formData.newResidentForm?.fields || {}
                      ).map(([sectionKey, section]) => (
                        <div
                          key={sectionKey}
                          className="border rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex items-start space-x-3 mb-3">
                            <input
                              type="checkbox"
                              id={`section-${sectionKey}`}
                              checked={section.enabled || false}
                              onChange={(e) =>
                                updateFormData(
                                  `newResidentForm.fields.${sectionKey}.enabled`,
                                  e.target.checked
                                )
                              }
                              className="rounded mt-1"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor={`section-title-${sectionKey}`}
                                className="text-sm"
                              >
                                Título da Seção
                              </Label>
                              <Input
                                id={`section-title-${sectionKey}`}
                                value={section.title || ""}
                                onChange={(e) =>
                                  updateFormData(
                                    `newResidentForm.fields.${sectionKey}.title`,
                                    e.target.value
                                  )
                                }
                                className="mt-1"
                                placeholder="Ex: Informações Pessoais"
                              />
                            </div>
                          </div>

                          {/* Campos da seção */}
                          <div className="space-y-2">
                            <h6 className="text-xs font-medium text-gray-600">
                              Campos ({section.fields?.length || 0}):
                            </h6>
                            {section.fields?.map((field, fieldIndex) => (
                              <div
                                key={field.name}
                                className="flex items-center space-x-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  id={`field-${sectionKey}-${field.name}`}
                                  checked={field.enabled || false}
                                  onChange={(e) =>
                                    updateFormData(
                                      `newResidentForm.fields.${sectionKey}.fields.${fieldIndex}.enabled`,
                                      e.target.checked
                                    )
                                  }
                                  className="rounded"
                                />
                                <div className="flex-1">
                                  <Input
                                    value={field.label || ""}
                                    onChange={(e) =>
                                      updateFormData(
                                        `newResidentForm.fields.${sectionKey}.fields.${fieldIndex}.label`,
                                        e.target.value
                                      )
                                    }
                                    className="text-xs"
                                    placeholder="Label do campo"
                                  />
                                </div>
                                <span
                                  className={`px-2 py-1 text-xs rounded ${
                                    field.required
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {field.required ? "Obrigatório" : "Opcional"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Configure os títulos das seções, ative/desative seções e
                      campos conforme necessário.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Backup e Configurações */}
            <TabsContent value="backup" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Backup e Sincronização
                  </CardTitle>
                  <CardDescription>
                    Faça backup das suas configurações para não perdê-las ao
                    trocar de dispositivo ou navegador.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Status do Backup */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Status do Backup
                    </h4>
                    {(() => {
                      const backupInfo = getBackupInfo();
                      return (
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-700">
                              Último backup:
                            </span>
                            <span className="font-medium text-blue-900">
                              {backupInfo.backupDate || "Nunca"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-700">
                              Backup local disponível:
                            </span>
                            <span
                              className={`font-medium ${
                                backupInfo.hasBackup
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {backupInfo.hasBackup ? "✅ Sim" : "❌ Não"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-700">
                              Backup da sessão:
                            </span>
                            <span
                              className={`font-medium ${
                                backupInfo.hasSession
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {backupInfo.hasSession
                                ? "✅ Ativo"
                                : "❌ Inativo"}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Alertas de Status */}
                  {showSuccess && (
                    <Alert className="border-green-500 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        Backup exportado com sucesso! Arquivo baixado.
                      </AlertDescription>
                    </Alert>
                  )}

                  {importSuccess && (
                    <Alert className="border-green-500 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        Configurações importadas e aplicadas com sucesso!
                      </AlertDescription>
                    </Alert>
                  )}

                  {importError && (
                    <Alert className="border-red-500 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">
                        Erro ao importar: {importError}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Ações de Backup */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Download className="h-4 w-4 text-green-600" />
                        Exportar Configurações
                      </h4>
                      <p className="text-sm text-gray-600">
                        Baixe um arquivo JSON com todas as suas configurações
                        para fazer backup ou transferir para outro dispositivo.
                      </p>
                      <Button
                        onClick={handleExport}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Backup (.json)
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Upload className="h-4 w-4 text-blue-600" />
                        Importar Configurações
                      </h4>
                      <p className="text-sm text-gray-600">
                        Carregue um arquivo de backup para restaurar suas
                        configurações.
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="import-file" className="sr-only">
                          Arquivo de backup
                        </Label>
                        <input
                          id="import-file"
                          type="file"
                          accept=".json"
                          onChange={handleImport}
                          disabled={isImporting}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                        />
                        {isImporting && (
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                            Importando configurações...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Instruções */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-3">
                      💡 Dicas Importantes
                    </h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>
                        • <strong>Faça backup regularmente:</strong> Suas
                        configurações são salvas apenas no navegador local.
                      </li>
                      <li>
                        • <strong>Transfira entre dispositivos:</strong> Use
                        export/import para sincronizar configurações.
                      </li>
                      <li>
                        • <strong>Antes de limpar dados:</strong> Sempre exporte
                        suas configurações antes de limpar cache/dados do
                        navegador.
                      </li>
                      <li>
                        • <strong>Compartilhe configurações:</strong> O arquivo
                        de backup pode ser compartilhado com outros
                        administradores.
                      </li>
                    </ul>
                  </div>

                  {/* Informações Técnicas */}
                  <details className="bg-gray-50 p-4 rounded-lg">
                    <summary className="font-semibold text-gray-800 cursor-pointer">
                      🔧 Informações Técnicas
                    </summary>
                    <div className="mt-3 text-sm text-gray-600 space-y-2">
                      <p>
                        • As configurações são salvas em 3 locais: localStorage
                        principal, backup do localStorage e sessionStorage.
                      </p>
                      <p>
                        • O sistema tenta recuperar dados automaticamente se um
                        método falhar.
                      </p>
                      <p>
                        • O arquivo de backup inclui timestamp e versão para
                        compatibilidade futura.
                      </p>
                      <p>
                        • Configurações são mescladas com valores padrão para
                        evitar erros.
                      </p>
                    </div>
                  </details>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
