
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Shield, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const ModernDocumentsList = () => {
  const [checkedDocs, setCheckedDocs] = useState<number[]>([]);

  const documents = [
    { 
      id: 1,
      name: "Contrato de Investimento", 
      type: "PDF",
      size: "2.4 MB",
      date: "15 Jan 2024",
      status: "verified",
      description: "Contrato principal do investimento imobiliário"
    },
    { 
      id: 2,
      name: "Invoice #123", 
      type: "PDF",
      size: "1.8 MB",
      date: "22 Jan 2024",
      status: "pending",
      description: "Fatura referente aos serviços de construção"
    },
    { 
      id: 3,
      name: "Relatório Mensal", 
      type: "PDF",
      size: "3.2 MB",
      date: "01 Jun 2024",
      status: "verified",
      description: "Relatório de progresso e performance mensal"
    },
    { 
      id: 4,
      name: "Licenças de Construção", 
      type: "PDF",
      size: "1.5 MB",
      date: "10 Dez 2023",
      status: "verified",
      description: "Documentação legal para construção"
    }
  ];

  const toggleCheck = (docId: number) => {
    setCheckedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'from-green-50 to-green-100 border-green-200';
      case 'pending':
        return 'from-orange-50 to-orange-100 border-orange-200';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  return (
    <Card className="bg-white shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-slate-600 to-gray-700 text-white">
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-6 h-6" />
          <div>
            <span>Documentos do Projeto</span>
            <p className="text-sm text-gray-200 font-normal mt-1">
              {documents.length} documentos • {checkedDocs.length} revisados
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className={`bg-gradient-to-r ${getStatusColor(doc.status)} border rounded-xl p-4 transition-all duration-200 hover:shadow-lg`}
            >
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <div className="pt-1">
                  <div 
                    className={`w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center ${
                      checkedDocs.includes(doc.id)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-400 hover:border-blue-400'
                    }`}
                    onClick={() => toggleCheck(doc.id)}
                  >
                    {checkedDocs.includes(doc.id) && (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>

                {/* Document Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <h3 className="font-semibold text-gray-900 truncate">{doc.name}</h3>
                      {getStatusIcon(doc.status)}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span className="bg-gray-200 px-2 py-1 rounded-full">{doc.type}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Tamanho: {doc.size}</span>
                      <span>•</span>
                      <span>Atualizado: {doc.date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100">
                        <Download className="w-4 h-4 text-green-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800">Status dos Documentos</h4>
              <p className="text-sm text-gray-600">
                {documents.filter(d => d.status === 'verified').length} verificados • 
                {documents.filter(d => d.status === 'pending').length} pendentes
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((documents.filter(d => d.status === 'verified').length / documents.length) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Completo</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernDocumentsList;
