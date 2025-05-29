import { toast } from "@/components/ui/use-toast";

class ESP32Connection {
  private baseUrl: string = '';
  private isConnected: boolean = false;

  constructor(ipAddress: string = '192.168.4.1') {
    this.baseUrl = `http://${ipAddress}`;
  }

  async connect(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/status`);
      if (response.ok) {
        this.isConnected = true;
        toast({
          title: "Uspešno povezivanje",
          description: "Povezani ste sa ESP32 uređajem"
        });
        return true;
      }
      throw new Error('Povezivanje nije uspelo');
    } catch (error) {
      toast({
        title: "Greška pri povezivanju",
        description: "Nije moguće povezati se sa ESP32 uređajem",
        variant: "destructive"
      });
      return false;
    }
  }

  async sendCommand(command: string, value: any): Promise<boolean> {
    if (!this.isConnected) {
      toast({
        title: "Greška",
        description: "Niste povezani sa ESP32 uređajem",
        variant: "destructive"
      });
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command,
          value
        })
      });

      if (response.ok) {
        return true;
      }
      throw new Error('Slanje komande nije uspelo');
    } catch (error) {
      toast({
        title: "Greška",
        description: "Greška pri slanju komande",
        variant: "destructive"
      });
      return false;
    }
  }

  async getStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/status`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Dohvatanje statusa nije uspelo');
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nije moguće dohvatiti status uređaja",
        variant: "destructive"
      });
      return null;
    }
  }
}

export const esp32 = new ESP32Connection();