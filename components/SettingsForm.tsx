"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "@/lib/types";
import { settingsAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Form,
} from "@/components/ui/form";
import { Badge } from "./ui/badge";
import { toast } from "./ui/use-toast";

const schema = z.object({
  twitter_tps: z
    .string()
    .min(1, { message: "Required" })
    .regex(/^\d+[,\.]?\d*$/, {
      message: "Must be a number",
    }),
  archive_tps: z
    .string()
    .min(1, { message: "Required" })
    .regex(/^\d+[,\.]?\d*$/, {
      message: "Must be a number",
    }),
});

function SettingsForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [settings, setSettings] = useAtom(settingsAtom);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      twitter_tps: `${settings.tps_settings.twitter}`,
      archive_tps: `${settings.tps_settings.archive}`,
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const settings: Settings = {
      tps_settings: {
        twitter: parseFloat(values.twitter_tps),
        archive: parseFloat(values.archive_tps),
      },
    };

    setSettings(settings);
    setIsOpen(false);
    toast({
      title: `Settings saved!`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="my-6 space-y-3">
          <Badge
            variant={"default"}
            className="w-40 flex items-center justify-center"
          >
            Requests per second
          </Badge>
          <FormField
            control={form.control}
            name="twitter_tps"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Twitter</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    type="number"
                    step="0.1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="archive_tps"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Archive</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    type="number"
                    step="0.1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}

export default SettingsForm;
