import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Hammer } from "lucide-react";

type Etapa = {
  titulo: string;
  descricao: string;
  imagem?: string;
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
              {etapa.imagem && (
                <img
                  src={etapa.imagem}
                  alt={etapa.titulo}
                  className="w-24 h-16 object-cover rounded-md shadow"
                />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ModernProjectTimeline;
