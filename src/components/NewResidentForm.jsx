import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import {
  User,
  Home,
  Users,
  Phone,
  Car,
  Heart,
  FileText,
  Send,
  CheckCircle,
  AlertTriangle,
  X,
} from "lucide-react";

export const NewResidentForm = ({ isOpen, onClose }) => {
  const { data } = useData();
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const formConfig = data.newResidentForm;
  const enabledSections = Object.entries(formConfig.fields).filter(
    ([, section]) => section.enabled
  );

  const updateFormData = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateStep = (stepIndex) => {
    const [, section] = enabledSections[stepIndex];
    const stepErrors = {};
    let hasErrors = false;

    section.fields.forEach((field) => {
      if (field.enabled && field.required) {
        const value = formData[field.name];
        if (!value || value.toString().trim() === "") {
          stepErrors[field.name] = `${field.label} é obrigatório`;
          hasErrors = true;
        }
      }
    });

    setErrors(stepErrors);
    return !hasErrors;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, enabledSections.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const formatWhatsAppMessage = () => {
    let message = formConfig.messages.whatsappTemplate;

    // Replace all placeholders with actual values
    Object.entries(formData).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      message = message.replace(
        new RegExp(placeholder, "g"),
        value || "Não informado"
      );
    });

    return message;
  };

  const handleSubmit = async () => {
    // Validate all steps
    let allValid = true;
    for (let i = 0; i < enabledSections.length; i++) {
      if (!validateStep(i)) {
        allValid = false;
        setCurrentStep(i);
        break;
      }
    }

    if (!allValid) return;

    setIsSubmitting(true);

    try {
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const whatsappMessage = formatWhatsAppMessage();
      const whatsappNumber = formConfig.sendTo.whatsapp;
      const whatsappUrl = `https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");

      setShowSuccess(true);
      setFormData({});
      setCurrentStep(0);

      // Auto close success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.name,
      value: formData[field.name] || "",
      disabled: !field.enabled,
      className: errors[field.name] ? "border-red-500" : "",
    };

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "date":
      case "number":
        return (
          <Input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
            onChange={(e) => updateFormData(field.name, e.target.value)}
          />
        );

      case "textarea":
        return (
          <Textarea
            {...commonProps}
            placeholder={field.placeholder}
            onChange={(e) => updateFormData(field.name, e.target.value)}
            rows={3}
          />
        );

      case "select":
        return (
          <Select
            value={formData[field.name] || ""}
            onValueChange={(value) => updateFormData(field.name, value)}
            disabled={!field.enabled}
          >
            <SelectTrigger
              className={errors[field.name] ? "border-red-500" : ""}
            >
              <SelectValue
                placeholder={`Selecione ${field.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  };

  const getSectionIcon = (sectionKey) => {
    const icons = {
      personalInfo: <User className="w-5 h-5" />,
      residenceInfo: <Home className="w-5 h-5" />,
      familyInfo: <Users className="w-5 h-5" />,
      emergencyInfo: <Phone className="w-5 h-5" />,
      vehicleInfo: <Car className="w-5 h-5" />,
      additionalInfo: <FileText className="w-5 h-5" />,
    };
    return icons[sectionKey] || <FileText className="w-5 h-5" />;
  };

  if (!formConfig.enabled) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] sm:max-h-[90vh] w-[95vw] sm:w-full flex flex-col p-0" style={{
        overscrollBehavior: 'contain'
      }}>
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b bg-white shrink-0">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <User className="h-5 w-5 text-blue-600" />
            {formConfig.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {formConfig.subtitle}
          </DialogDescription>
        </DialogHeader>

        {showSuccess && (
          <Alert className="border-green-500 bg-green-50 mb-4">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {formConfig.messages.success}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col flex-1 overflow-hidden px-4 sm:px-6">
          {/* Progress indicator */}
          <div className="mb-4 sm:mb-6 shrink-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1">
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                Etapa {currentStep + 1} de {enabledSections.length}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                {Math.round(((currentStep + 1) / enabledSections.length) * 100)}
                % concluído
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentStep + 1) / enabledSections.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Current step content */}
          <div className="flex-1 overflow-y-auto min-h-0" style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}>
            {enabledSections.length > 0 && (
              <Card className="border-0 shadow-none sm:border sm:shadow-sm">
                <CardHeader className="px-0 sm:px-6 pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    {getSectionIcon(enabledSections[currentStep][0])}
                    {enabledSections[currentStep][1].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 sm:px-6 space-y-4 sm:space-y-6">
                  {enabledSections[currentStep][1].fields.map((field) => {
                    if (!field.enabled) return null;

                    return (
                      <div key={field.name} className="space-y-2">
                        <Label
                          htmlFor={field.name}
                          className="text-sm font-medium"
                        >
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </Label>
                        {renderField(field)}
                        {errors[field.name] && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-4 px-4 sm:px-6 pb-4 sm:pb-6 border-t bg-white gap-3 sm:gap-0 shrink-0">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="order-2 sm:order-1"
            >
              Anterior
            </Button>

            <div className="flex flex-col sm:flex-row gap-2 order-1 sm:order-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="sm:flex hidden"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>

              {/* Mobile cancel button */}
              <Button variant="outline" onClick={onClose} className="sm:hidden">
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>

              {currentStep === enabledSections.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Cadastro
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={nextStep} className="w-full sm:w-auto">
                  Próximo
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
