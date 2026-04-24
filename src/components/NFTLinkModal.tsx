import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Zap } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const NFTLinkModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [tokenId, setTokenId] = useState("");
  const [participacao, setParticipacao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");

  const handleSubmit = async () => {
    if (!tokenId || !participacao || !email) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    setMensagem("");

    try {
      const res = await fetch(`${API_BASE_URL}/vincular-nft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tokenId: Number.parseInt(tokenId, 10),
          participacao,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem("NFT vinculado com sucesso!");
        setTokenId("");
        setParticipacao("");
        onSuccess?.();
      } else {
        setMensagem(data.error || "Erro ao vincular NFT.");
      }
    } catch {
      setMensagem("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-indigo-600">
            <Zap className="w-5 h-5" />
            Vincular NFT
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            type="number"
          />
          <Input
            placeholder="Participação (%)"
            value={participacao}
            onChange={(e) => setParticipacao(e.target.value)}
          />

          {mensagem && (
            <p className="text-sm text-center text-gray-600">{mensagem}</p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Enviando..." : "Vincular"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NFTLinkModal;
