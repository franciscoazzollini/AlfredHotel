"use client";

import { useState } from "react";
import { Check, Copy, Wifi } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";

type WifiCardProps = {
  ssid: string;
  password: string;
};

export function WifiCard({ ssid, password }: WifiCardProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  async function copyPassword() {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success(t.common.copied);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="border-teal-200/60 bg-teal-50/50 dark:border-teal-900 dark:bg-teal-950/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Wifi className="size-4 text-teal-700 dark:text-teal-300" />
          {t.hub.wifiTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground">{t.hub.network}</span>
          <span className="font-medium">{ssid}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground">{t.hub.password}</span>
          <span className="font-mono font-medium">{password}</span>
        </div>
        <Button variant="outline" className="w-full" onClick={copyPassword}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {t.common.copy}
        </Button>
      </CardContent>
    </Card>
  );
}
