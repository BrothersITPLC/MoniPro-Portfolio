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
            <p className="mb-4">
              To enable monitoring for this{" "}
              {isVM ? "virtual machine" : "network device"}, the following
              actions are required:
            </p>
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
            <p className="mt-4">
              Do you want to proceed with these configurations?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-blue-500/30">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/30"
            onClick={onConfirm}
          >
            Proceed with Setup
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
