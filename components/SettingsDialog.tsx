"use client";
import { Icons } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { archiveTpsAtom, twitterTpsAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useState } from "react";

export function SettingsDialog() {
  const [twitterTps, setTwitterTps] = useAtom(twitterTpsAtom);
  const [archiveTps, setArchiveTps] = useAtom(archiveTpsAtom);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          size="sm"
          className="gap-1 flex items-center"
        >
          <Icons.settings className="w-4 h-4" /> Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Adjust the throttling as needed</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Badge
            variant={"default"}
            className="w-40 flex items-center justify-center"
          >
            Requests per second
          </Badge>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="twitterTps" className="text-right">
              Twitter.com
            </Label>
            <Input
              id="twitterTps"
              value={twitterTps}
              type="number"
              className="col-span-3"
              onChange={(e) => setTwitterTps(parseFloat(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="archiveTps" className="text-right">
              Archive.org
            </Label>
            <Input
              id="archiveTps"
              value={archiveTps}
              type="number"
              className="col-span-3"
              onChange={(e) => setArchiveTps(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
