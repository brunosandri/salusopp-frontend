
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Link, Search, ExternalLink, Shield, Zap } from "lucide-react";

interface NFTLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NFTLinkModal = ({ isOpen, onClose }: NFTLinkModalProps) => {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [nftData, setNftData] = useState<any>(null);

  const handleSearch = async () => {
    if (!contractAddress || !tokenId) return;
    
    setIsSearching(true);
    // Simular busca de NFT
    setTimeout(() => {
      setNftData({
        name: "Casa Florida NFT #" + tokenId,
        image: "https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=NFT",
        description: "Premium real estate investment NFT",
        attributes: [
          { trait_type: "Property Type", value: "Residential" },
          { trait_type: "Location", value: "Florida, USA" },
          { trait_type: "Investment Share", value: "8%" },
          { trait_type: "Status", value: "Active" }
        ]
      });
      setIsSearching(false);
    }, 2000);
  };

  const handleLink = () => {
    // Lógica para vincular o NFT
    console.log("Vinculando NFT:", { contractAddress, tokenId });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Link className="w-6 h-6" />
              <span>Vincular Novo NFT</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Contract Input */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="contract">Endereço do Smart Contract</Label>
              <Input
                id="contract"
                placeholder="0x..."
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="tokenId">Token ID</Label>
              <Input
                id="tokenId"
                placeholder="Ex: 3"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <Button 
              onClick={handleSearch} 
              disabled={!contractAddress || !tokenId || isSearching}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Search className="w-4 h-4 mr-2" />
              {isSearching ? "Buscando..." : "Buscar NFT"}
            </Button>
          </div>

          {/* NFT Preview */}
          {nftData && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>NFT Encontrado</span>
              </h3>
              
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                  {/* NFT Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1 rounded-xl">
                      <div className="w-full h-full bg-slate-800 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">#{tokenId}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* NFT Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{nftData.name}</h4>
                      <p className="text-gray-600">{nftData.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {nftData.attributes.map((attr: any, index: number) => (
                        <div key={index} className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500">{attr.trait_type}</p>
                          <p className="font-semibold text-gray-900">{attr.value}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-green-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Contrato Verificado</span>
                    </div>
                  </div>
                </div>
                
                {/* Smart Contract Info */}
                <div className="mt-6 bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Informações do Smart Contract</span>
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Endereço:</span>
                      <span className="font-mono text-gray-900">{contractAddress.slice(0, 10)}...{contractAddress.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network:</span>
                      <span className="text-blue-600 font-medium">Ethereum Mainnet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Standard:</span>
                      <span className="text-purple-600 font-medium">ERC-721</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleLink} 
              disabled={!nftData}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Link className="w-4 h-4 mr-2" />
              Vincular NFT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NFTLinkModal;
