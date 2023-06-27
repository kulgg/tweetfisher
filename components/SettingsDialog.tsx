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
import { useAtom } from "jotai";
import { useState } from "react";
import SettingsForm from "./SettingsForm";
import { DialogClose } from "@radix-ui/react-dialog";

export function SettingsDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(x) => setIsOpen(x)}>
      {/* <DialogTrigger asChild>
        <Button
          variant={"default"}
          size="sm"
          className="gap-1 flex items-center"
        >
          <Icons.settings className="w-4 h-4" /> Settings
        </Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Adjust the throttling as needed</DialogDescription>
        </DialogHeader>
        <SettingsForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
