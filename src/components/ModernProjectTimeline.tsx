import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Hammer } from "lucide-react";

type Etapa = {
  titulo: string;
  descricao: string;
  progresso?: number; // ← novo campo
};

type Props = {
  etapas: Etapa[];
};

const ModernProjectTimeline = ({ etapas }: Props) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <Hammer className="w-6 h-6" />
          <span>Andamento da Obra</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {etapas.length === 0 && (
          <p className="text-gray-500 text-sm">Nenhuma etapa cadastrada.</p>
        )}

        {etapas.map((etapa, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {etapa.titulo}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{etapa.descricao}</p>
              </div>
            </div>

            {typeof etapa.progresso === "number" && (
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${etapa.progresso}%` }}
                  />
                </div>
                <p className="text-right text-xs text-gray-500 mt-1">
                  {etapa.progresso}%
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ModernProjectTimeline;
