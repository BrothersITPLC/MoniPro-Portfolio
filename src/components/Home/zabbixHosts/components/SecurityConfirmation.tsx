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

interface SecurityConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  type: "vm" | "network";
}

export function SecurityConfirmation({
  open,
  onOpenChange,
  onConfirm,
  type,
}: SecurityConfirmationProps) {
  const requirements = type === "vm" ? [
    "Install monitoring agent",
    "Configure SSH access",
    "Open port 10050 for Zabbix agent",
    "Enable performance metrics collection"
  ] : [
    "Enable SNMP monitoring",
    "Configure read-only access",
    "Open required monitoring ports",
    "Set up syslog forwarding"
  ];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Security Configuration Required</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-4">
              Before adding this {type === "vm" ? "virtual machine" : "network device"},
              please ensure the following requirements are met:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}