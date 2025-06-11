import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ChefHat size={64} className="text-primary" />
          </div>
          <CardTitle className="font-headline text-5xl text-primary">Bocado de Barrio</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Tu cocina de barrio, ahora más conectada.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <p className="text-center">
            Bienvenido al panel de administración de Bocado de Barrio. Gestiona tus pedidos, productos y analiza tus ventas fácilmente.
          </p>
          <Button asChild size="lg" className="font-headline">
            <Link href="/summary">Acceder al Panel</Link>
          </Button>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Bocado de Barrio. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
