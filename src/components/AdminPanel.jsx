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
} from "lucide-react";

export const AdminPanel = ({ isOpen, onClose }) => {
  const { data, updateData, resetData } = useData();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("building");
  const [isSaving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState(data);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Painel de Administração
          </DialogTitle>
          <DialogDescription>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="building" className="gap-2">
              <Home className="h-4 w-4" />
              Edifício
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <Phone className="h-4 w-4" />
              Contatos
            </TabsTrigger>
            <TabsTrigger value="salao" className="gap-2">
              <Users className="h-4 w-4" />
              Salão
            </TabsTrigger>
            <TabsTrigger value="rules" className="gap-2">
              <Shield className="h-4 w-4" />
              Regras
            </TabsTrigger>
          </TabsList>

          <div className="max-h-[60vh] overflow-y-auto mt-4">
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
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
