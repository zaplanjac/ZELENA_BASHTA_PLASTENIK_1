import { toast } from "@/components/ui/use-toast";

class ESP32Connection {
  private baseUrl: string = '';
  private isConnected: boolean = false;
  private maxRetries: number = 3;
  private retryDelay: number = 2000; // 2 seconds
  private connectionMode: 'AP' | 'STA' = 'AP';

  constructor(ipAddress: string = '192.168.4.1') {
    // In AP mode, use default IP. In STA mode, use provided IP
    this.baseUrl = `http://${ipAddress}`;
  }

  async connect(): Promise<boolean> {
    // Reset connection state before attempting to connect
    this.isConnected = false;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // First check if device is in AP mode
        const isAP = await this.checkAPMode();
        this.connectionMode = isAP ? 'AP' : 'STA';

        const response = await fetch(`${this.baseUrl}/api/status`, {
          timeout: 5000, // 5 second timeout
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          this.isConnected = true;
          toast({
            title: "Uspešno povezivanje",
            description: `Povezani ste sa ESP32 uređajem (${this.connectionMode} mod)`
          });
          return true;
        }
        
        throw new Error(`Server responded with status: ${response.status}`);
      } catch (error) {
        console.error(`Connection attempt ${attempt} failed:`, error);
        
        if (attempt === this.maxRetries) {
          let errorMessage = "Proverite da li je ESP32 uključen i u dometu WiFi mreže. ";
          if (this.connectionMode === 'AP') {
            errorMessage += "Uverite se da ste povezani na ESP32 Access Point mrežu.";
          } else {
            errorMessage += "Proverite da li su ESP32 i računar na istoj mreži.";
          }
          
          toast({
            title: "Greška pri povezivanju",
            description: errorMessage,
            variant: "destructive"
          });
          return false;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }
    return false;
  }

  async sendCommand(command: string, value: any): Promise<boolean> {
    if (!this.isConnected) {
      try {
        // Attempt to reconnect if not connected
        const reconnected = await this.connect();
        if (!reconnected) {
          toast({
            title: "Greška",
            description: "Nije moguće uspostaviti vezu sa ESP32 uređajem. Proverite mrežnu konekciju.",
            variant: "destructive"
          });
          return false;
        }
      } catch (error) {
        console.error("Reconnection failed:", error);
        return false;
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          command,
          value
        }),
        timeout: 5000
      });

      if (response.ok) {
        return true;
      }
      throw new Error(`Command failed with status: ${response.status}`);
    } catch (error) {
      console.error("Command failed:", error);
      this.isConnected = false; // Reset connection state on error
      toast({
        title: "Greška",
        description: "Greška pri slanju komande. Proverite konekciju sa ESP32.",
        variant: "destructive"
      });
      return false;
    }
  }

  async getStatus(): Promise<any> {
    if (!this.isConnected) {
      try {
        const reconnected = await this.connect();
        if (!reconnected) {
          return null;
        }
      } catch (error) {
        console.error("Reconnection failed:", error);
        return null;
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/status`, {
        headers: {
          'Accept': 'application/json',
        },
        timeout: 5000
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`Status check failed with status: ${response.status}`);
    } catch (error) {
      console.error("Status check failed:", error);
      this.isConnected = false; // Reset connection state on error
      toast({
        title: "Greška",
        description: "Nije moguće dohvatiti status uređaja. Proverite konekciju sa ESP32.",
        variant: "destructive"
      });
      return null;
    }
  }

  // Helper method to check if device is in AP mode
  private async checkAPMode(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/mode`, {
        timeout: 3000
      });
      if (!response.ok) return true; // Default to AP mode if can't determine
      const data = await response.json();
      return data.mode === 'AP';
    } catch {
      return true; // Default to AP mode if request fails
    }
  }

  // Public method to get current connection mode
  getConnectionMode(): 'AP' | 'STA' {
    return this.connectionMode;
  }
}

// Export a singleton instance with the default AP mode IP
export const esp32 = new ESP32Connection();