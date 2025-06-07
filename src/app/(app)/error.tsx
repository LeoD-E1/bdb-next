'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.16))] p-4"> {/* Adjust min-h based on header height */}
      <Card className="w-full max-w-lg text-center shadow-xl">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle size={48} className="text-destructive" />
          </div>
          <CardTitle className="font-headline text-3xl text-destructive">¡Ups! Algo salió mal</CardTitle>
          <CardDescription>
            Ocurrió un error inesperado en la aplicación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">Detalles del error:</p>
          <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto text-left">
            {error.message || 'Error desconocido'}
            {error.digest && ` (Digest: ${error.digest})`}
          </pre>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Intentar de nuevo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
