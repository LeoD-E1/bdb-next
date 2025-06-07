import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="font-headline text-4xl mb-8 text-primary">Configuración</h1>
      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center mb-2">
            <MessageCircle className="h-8 w-8 mr-3 text-primary" />
            <CardTitle className="font-headline text-2xl">Integración con WhatsApp</CardTitle>
          </div>
          <CardDescription>
            Información sobre cómo conectar Bocado de Barrio con WhatsApp Business.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Para recibir notificaciones de pedidos directamente en WhatsApp, necesitarás configurar la API de WhatsApp Business.
          </p>
          <p>
            Esta aplicación está diseñada para procesar las notificaciones de pedidos una vez que la integración con la API de WhatsApp Business esté activa y configurada para enviar datos a un endpoint específico (que esta aplicación escucharía).
          </p>
          <h3 className="font-semibold text-lg mt-4">Pasos generales (fuera de esta app):</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Registra un número de teléfono con la API de WhatsApp Business.</li>
            <li>Configura un webhook en tu cuenta de WhatsApp Business Manager para que apunte al servidor de esta aplicación (esto requeriría un backend no incluido en este scaffold).</li>
            <li>Asegúrate de que los mensajes de pedidos entrantes estén formateados de una manera que esta aplicación pueda interpretar.</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Nota: La implementación de la escucha de webhooks y la conexión directa a la API de WhatsApp Business no forma parte de este panel de administración base. Esta sección es informativa.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
