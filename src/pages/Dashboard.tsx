import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Plus, TrendingUp, Wallet } from "lucide-react";
import ModernNFTCard from "@/components/ModernNFTCard";
import ModernProjectTimeline from "@/components/ModernProjectTimeline";
import ModernDocumentsList from "@/components/ModernDocumentsList";
import NFTLinkModal from "@/components/NFTLinkModal";
import { API_BASE_URL } from "@/lib/api";

type NFT = {
  tokenId: number;
  participacao: string;
  valorinv: string;
  valorcapt: string;
};

type Documento = {
  nome: string;
  url: string;
  email: string;
  status?: "verified" | "pending" | "default";
  tipo?: string;
  tamanho?: string;
  data?: string;
  descricao?: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isNFTModalOpen, setIsNFTModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token");

    if (!storedEmail || !storedToken) {
      navigate("/login");
      return;
    }

    setEmail(storedEmail);
    setToken(storedToken);
  }, [navigate]);

  const fetchDashboardData = useCallback(async () => {
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      const [nftsRes, docsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/nfts/${encodeURIComponent(email)}`),
        fetch(`${API_BASE_URL}/documentos/${encodeURIComponent(email)}`),
      ]);

      if (!nftsRes.ok || !docsRes.ok) {
        throw new Error("Falha ao carregar dados do painel.");
      }

      const [nftsData, docsData] = await Promise.all([nftsRes.json(), docsRes.json()]);
      setNFTs(Array.isArray(nftsData) ? nftsData : []);
      setDocumentos(
        Array.isArray(docsData)
          ? docsData.map((doc) => ({
              ...doc,
              email: doc?.email || email,
            }))
          : []
      );
    } catch (fetchError) {
      console.error(fetchError);
      setError("Não foi possível carregar os dados. Tente novamente em instantes.");
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  useEffect(() => {
    void fetchDashboardData();
  }, [fetchDashboardData]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!email || !token || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando painel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Salus//Opp
              </h1>
              <p className="text-sm text-gray-500">Painel do Investidor</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsNFTModalOpen(true)}
              className="border-blue-200 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Vincular NFT
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Atualizado em tempo real</span>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-4 py-3">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-1 space-y-4">
            {nfts.map((nft) => (
              <ModernNFTCard
                key={nft.tokenId}
                tokenId={nft.tokenId}
                participacao={nft.participacao}
                valorinv={nft.valorinv}
                valorcapt={nft.valorcapt}
                imagem="/imagens/nftimagem.jpg"
                smartContractUrl="https://gold-pawpaw-0be.notion.site/SalusOppNFT-sol-229f529207c280d28ae4ca3bed602762?source=copy_link"
              />
            ))}
          </div>

          <div className="xl:col-span-3">
            <ModernProjectTimeline />
          </div>
        </div>

        <div>
          <ModernDocumentsList docs={documentos} />
        </div>
      </main>

      <NFTLinkModal
        isOpen={isNFTModalOpen}
        onClose={() => setIsNFTModalOpen(false)}
        onSuccess={() => {
          void fetchDashboardData();
        }}
      />
    </div>
  );
};

export default Dashboard;
