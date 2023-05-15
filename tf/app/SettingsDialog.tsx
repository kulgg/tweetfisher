import { Icons } from "@/components/icons";
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

export function SettingsDialog() {
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="twitterTps" className="text-right">
                    Twitter.com
                  </Label>
                  <Input id="twitterTps" value="1.2" className="col-span-3" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Too high = 429 responses</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="archiveTps" className="text-right">
              Archive.org
            </Label>
            <Input id="archiveTps" value="3" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
