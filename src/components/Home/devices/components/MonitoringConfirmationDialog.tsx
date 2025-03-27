import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MonitoringConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  deviceType: "vm" | "network";
}

export function MonitoringConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  deviceType,
}: MonitoringConfirmationDialogProps) {
  const isVM = deviceType === "vm";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gradient-to-b from-gray-900 to-black border-2 border-blue-500/30 shadow-xl shadow-blue-500/20">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
            Monitoring Setup Required
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            {/* Remove the wrapping <p> tag and just keep the text and className */}
            <span className="mb-4 block">
              To enable monitoring for this{" "}
              {isVM ? "virtual machine" : "network device"}, the following
              actions are required:
            </span>
            <ul className="list-disc pl-5 space-y-2">
              {isVM ? (
                <>
                  <li>Install monitoring agent on the virtual machine</li>
                  <li>Open ports 9100-9105 for metrics collection</li>
                  <li>Configure SSH access for remote management</li>
                  <li>Enable performance counters for resource monitoring</li>
                </>
              ) : (
                <>
                  <li>Enable SNMP on the device</li>
                  <li>Configure read-only community string</li>
                  <li>Open port 161/162 for SNMP traffic</li>
                  <li>Set up syslog forwarding to central server</li>
                </>
              )}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white border-0">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            Confirm Setup
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
