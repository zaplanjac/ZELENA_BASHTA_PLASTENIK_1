import React, { useState } from 'react';
import { Wifi, WifiOff, Lock, Eye, EyeOff, RefreshCw, CheckCircle, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WiFiNetwork {
  ssid: string;
  strength: number;
  secured: boolean;
  connected: boolean;
  security?: 'WPA' | 'WPA2' | 'WEP' | 'OPEN';
}

const WiFiManager = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [securityMode, setSecurityMode] = useState<'WPA' | 'WPA2' | 'WEP' | 'OPEN'>('WPA2');
  
  const [networks, setNetworks] = useState<WiFiNetwork[]>([
    { ssid: 'SmartGarden_Network', strength: 95, secured: true, connected: true, security: 'WPA2' },
    { ssid: 'Home_WiFi_5G', strength: 78, secured: true, connected: false, security: 'WPA' },
    { ssid: 'TP-Link_2024', strength: 65, secured: true, connected: false, security: 'WPA2' },
    { ssid: 'GuestNetwork', strength: 45, secured: false, connected: false, security: 'OPEN' },
    { ssid: 'ESP32_Network', strength: 90, secured: true, connected: false, security: 'WPA' }
  ]);

  const handleLogin = () => {
    if (loginUsername === 'admin' && loginPassword === 'admin') {
      setIsLoggedIn(true);
      toast({
        title: "Uspešna prijava",
        description: "Dobrodošli u sistem za upravljanje WiFi mrežom",
      });
    } else {
      toast({
        title: "Greška pri prijavi",
        description: "Pogrešno korisničko ime ili lozinka",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUsername('');
    setLoginPassword('');
  };

  const getSignalStrengthColor = (strength: number) => {
    if (strength >= 70) return 'text-green-600';
    if (strength >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSignalBars = (strength: number) => {
    if (strength >= 80) return '▇▇▇▇';
    if (strength >= 60) return '▇▇▇▁';
    if (strength >= 40) return '▇▇▁▁';
    if (strength >= 20) return '▇▁▁▁';
    return '▁▁▁▁';
  };

  const handleScan = async () => {
    setIsScanning(true);
    setTimeout(() => {
      toast({
        title: "Skeniranje završeno",
        description: `Pronađeno je ${networks.length} WiFi mreža`,
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleNetworkSelect = (network: WiFiNetwork) => {
    if (network.connected) return;
    
    setSelectedNetwork(network);
    setPassword('');
    setUsername('');
    setSecurityMode(network.security || 'WPA2');
    if (network.secured) {
      setIsDialogOpen(true);
    } else {
      handleConnect(network, '', '');
    }
  };

  const handleConnect = async (network: WiFiNetwork, pwd: string, user: string) => {
    setIsConnecting(true);
    
    setTimeout(() => {
      const updatedNetworks = networks.map(n => ({
        ...n,
        connected: n.ssid === network.ssid
      }));
      setNetworks(updatedNetworks);
      
      toast({
        title: "Uspešno povezano",
        description: `Povezani ste na mrežu ${network.ssid}`,
      });
      
      setIsConnecting(false);
      setIsDialogOpen(false);
      setPassword('');
      setUsername('');
    }, 3000);
  };

  const handleDisconnect = (network: WiFiNetwork) => {
    const updatedNetworks = networks.map(n => ({
      ...n,
      connected: false
    }));
    setNetworks(updatedNetworks);
    
    toast({
      title: "Prekinuta veza",
      description: `Prekinuta je veza sa mrežom ${network.ssid}`,
      variant: "destructive"
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">Prijava na sistem</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Korisničko ime
              </label>
              <Input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Unesite korisničko ime"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lozinka
              </label>
              <div className="relative">
                <Input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Unesite lozinku"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button
              onClick={handleLogin}
              className="w-full"
            >
              Prijavi se
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Wifi className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">WiFi upravljanje</h2>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={handleScan} 
            disabled={isScanning}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Skeniram...' : 'Skeniraj'}
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
          >
            Odjavi se
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {networks.map((network) => (
          <div 
            key={network.ssid}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              network.connected 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
            onClick={() => handleNetworkSelect(network)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {network.connected ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : network.secured ? (
                    <Lock className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Wifi className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="font-medium text-gray-900">{network.ssid}</span>
                  {network.connected && (
                    <span className="text-xs text-green-600 font-medium">Povezano</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {network.security && (
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                      {network.security}
                    </span>
                  )}
                  <span className={`text-sm font-mono ${getSignalStrengthColor(network.strength)}`}>
                    {getSignalBars(network.strength)}
                  </span>
                  <span className="text-sm text-gray-600">{network.strength}%</span>
                </div>
                
                {network.connected && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDisconnect(network);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Prekini vezu
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Povezivanje na {selectedNetwork?.ssid}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tip zaštite
              </label>
              <Select
                value={securityMode}
                onValueChange={(value: 'WPA' | 'WPA2' | 'WEP' | 'OPEN') => setSecurityMode(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Izaberite tip zaštite" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA</SelectItem>
                  <SelectItem value="WPA2">WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="OPEN">Otvorena mreža</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(securityMode === 'WPA' || securityMode === 'WPA2') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Korisničko ime (opciono)
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Unesite korisničko ime"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lozinka za WiFi mrežu
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Unesite lozinku"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isConnecting}
              >
                Otkaži
              </Button>
              <Button
                onClick={() => selectedNetwork && handleConnect(selectedNetwork, password, username)}
                disabled={isConnecting || !password.trim()}
              >
                {isConnecting ? 'Povezujem...' : 'Poveži se'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WiFiManager;