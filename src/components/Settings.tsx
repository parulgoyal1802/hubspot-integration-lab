import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Key, Zap, Shield, Webhook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Settings() {
  const [apiKey, setApiKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [settings, setSettings] = useState({
    autoSync: true,
    enableWebhooks: false,
    dataValidation: true,
    debugMode: false,
  });

  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you'd store this securely
    localStorage.setItem("hubspot_api_key", apiKey);
    toast({
      title: "Success!",
      description: "API key saved successfully.",
    });
  };

  const handleSaveWebhook = () => {
    if (!webhookUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid webhook URL.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Webhook URL saved successfully.",
    });
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Configure your HubSpot integration</p>
      </div>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-primary" />
            <CardTitle>API Configuration</CardTitle>
          </div>
          <CardDescription>
            Manage your HubSpot API credentials and connection settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Private App Access Token</Label>
            <div className="flex space-x-2">
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="flex-1"
              />
              <Button onClick={handleSaveApiKey}>Save</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your private app access token from HubSpot. This will be stored securely.
            </p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Connection Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Last successful API call: 2 minutes ago
              </p>
            </div>
            <Button variant="outline">Test Connection</Button>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Webhook className="w-5 h-5 text-primary" />
            <CardTitle>Webhook Configuration</CardTitle>
          </div>
          <CardDescription>
            Set up webhooks to receive real-time updates from HubSpot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable Webhooks</Label>
              <p className="text-sm text-muted-foreground">
                Receive real-time notifications when data changes in HubSpot
              </p>
            </div>
            <Switch
              checked={settings.enableWebhooks}
              onCheckedChange={(value) => handleSettingChange("enableWebhooks", value)}
            />
          </div>

          {settings.enableWebhooks && (
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="webhookUrl"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-app.com/webhooks/hubspot"
                  className="flex-1"
                />
                <Button onClick={handleSaveWebhook}>Save</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <CardTitle>Integration Settings</CardTitle>
          </div>
          <CardDescription>
            Configure how your integration behaves
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto Sync</Label>
              <p className="text-sm text-muted-foreground">
                Automatically sync data every 15 minutes
              </p>
            </div>
            <Switch
              checked={settings.autoSync}
              onCheckedChange={(value) => handleSettingChange("autoSync", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Data Validation</Label>
              <p className="text-sm text-muted-foreground">
                Validate data before sending to HubSpot
              </p>
            </div>
            <Switch
              checked={settings.dataValidation}
              onCheckedChange={(value) => handleSettingChange("dataValidation", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Debug Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable detailed logging for troubleshooting
              </p>
            </div>
            <Switch
              checked={settings.debugMode}
              onCheckedChange={(value) => handleSettingChange("debugMode", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle>Security & Permissions</CardTitle>
          </div>
          <CardDescription>
            Review your app permissions and security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Granted Permissions</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">crm.objects.contacts.read</Badge>
                <Badge variant="secondary">crm.objects.contacts.write</Badge>
                <Badge variant="secondary">crm.schemas.custom.read</Badge>
                <Badge variant="secondary">crm.schemas.custom.write</Badge>
                <Badge variant="secondary">crm.objects.custom.read</Badge>
                <Badge variant="secondary">crm.objects.custom.write</Badge>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rate Limiting</p>
                <p className="text-sm text-muted-foreground">100 requests per 10 seconds</p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}