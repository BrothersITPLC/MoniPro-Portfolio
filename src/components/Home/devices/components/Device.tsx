import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { VMForm } from "./VMForm"
import { NetworkDeviceForm } from "./NetworkDeviceForm"
import { VMList } from "./VMList"
import { NetworkDeviceList } from "./NetworkDeviceList"
import { MonitoringConfirmationDialog } from "./MonitoringConfirmationDialog"
import type { VM, Network, VMFormData, NetworkFormData } from "../types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  useGetVmsQuery,
  useCreateVmMutation,
  useUpdateVmMutation,
  useDeleteVmMutation,
  useGetNetworksQuery,
  useCreateNetworkMutation,
  useUpdateNetworkMutation,
  useDeleteNetworkMutation,
} from "../api"
import { useDispatch } from "react-redux"
import { setVMs, setNetworks } from "../deviceSlice"
function Device() {
  const dispatch = useDispatch()
  // RTK Query hooks with skip option
  const {
    data: vmsData,
    isLoading: isLoadingVMs,
    error: vmsError,
    refetch: refetchVMs,
  } = useGetVmsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000, // Refetch every 30 seconds
  })
  const {
    data: networksData,
    isLoading: isLoadingNetworks,
    error: networksError,
    refetch: refetchNetworks,
  } = useGetNetworksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  })
  // Update state when data changes
  useEffect(() => {
    if (vmsData?.data) {
      dispatch(setVMs(vmsData.data))
    }
    if (networksData?.data) {
      dispatch(setNetworks(networksData.data))
    }
  }, [vmsData, networksData, dispatch])
  // Manual refetch on mount
  useEffect(() => {
    refetchVMs()
    refetchNetworks()
  }, [])
  // State for dialogs
  const [isVMFormOpen, setIsVMFormOpen] = useState(false)
  const [isNetworkFormOpen, setIsNetworkFormOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [confirmationType, setConfirmationType] = useState<"vm" | "network">("vm")
  const [pendingData, setPendingData] = useState<any>(null)
  const [editingVM, setEditingVM] = useState<VM | null>(null)
  const [editingNetworkDevice, setEditingNetworkDevice] = useState<Network | null>(null)
  // RTK Query hooks
  const [createVm, { isLoading: isCreatingVM }] = useCreateVmMutation()
  const [updateVm, { isLoading: isUpdatingVM }] = useUpdateVmMutation()
  const [deleteVm, { isLoading: isDeletingVM }] = useDeleteVmMutation()
  const [createNetwork, { isLoading: isCreatingNetwork }] = useCreateNetworkMutation()
  const [updateNetwork, { isLoading: isUpdatingNetwork }] = useUpdateNetworkMutation()
  const [deleteNetwork, { isLoading: isDeletingNetwork }] = useDeleteNetworkMutation()
  // Extract data from query results
  const vms: VM[] = vmsData?.data || []
  const networks: Network[] = networksData?.data || []
  // Show errors if any
  useEffect(() => {
    if (vmsError) {
      toast.error("Failed to load virtual machines")
    }
    if (networksError) {
      toast.error("Failed to load network devices")
    }
  }, [vmsError, networksError])
  // Handle VM form submission
  const handleVMSubmit = (data: VMFormData) => {
    setPendingData(data)
    setConfirmationType("vm")
    setIsConfirmationOpen(true)
    setIsVMFormOpen(false)
  }
  // Handle Network Device form submission
  const handleNetworkSubmit = (data: NetworkFormData) => {
    setPendingData(data)
    setConfirmationType("network")
    setIsConfirmationOpen(true)
    setIsNetworkFormOpen(false)
  }
  // Handle confirmation dialog confirmation
  const handleConfirmation = async () => {
    try {
      if (confirmationType === "vm") {
        if (editingVM) {
          // Update existing VM
          const response = await updateVm({
            id: editingVM.id,
            ...pendingData,
          }).unwrap()
          toast.success("Virtual machine updated successfully")
          setEditingVM(null)
        } else {
          // Add new VM
          const response = await createVm({
            ...pendingData,
            belong_to: pendingData.belong_to.toString(),
          }).unwrap()
          toast.success("Virtual machine added successfully")
        }
      } else {
        if (editingNetworkDevice) {
          // Update existing network device
          const response = await updateNetwork({
            id: editingNetworkDevice.id,
            ...pendingData,
          }).unwrap()
          toast.success("Network device updated successfully")
          setEditingNetworkDevice(null)
        } else {
          // Add new network device
          const response = await createNetwork(pendingData).unwrap()
          toast.success("Network device added successfully")
        }
      }
    } catch (error) {
      toast.error(
        `Failed to ${editingVM || editingNetworkDevice ? "update" : "add"} ${
          confirmationType === "vm" ? "virtual machine" : "network device"
        }`,
      )
    } finally {
      setIsConfirmationOpen(false)
      setPendingData(null)
    }
  }
  // Handle VM edit
  const handleEditVM = (vm: VM) => {
    setEditingVM(vm)
    setIsVMFormOpen(true)
  }
  // Handle VM delete
  const handleDeleteVM = async (id: string) => {
    try {
      await deleteVm(id).unwrap()
      toast.success("Virtual machine deleted successfully")
    } catch (error) {
      toast.error("Failed to delete virtual machine")
    }
  }
  // Handle Network Device edit
  const handleEditNetworkDevice = (device: Network) => {
    setEditingNetworkDevice(device)
    setIsNetworkFormOpen(true)
  }
  // Handle Network Device delete
  const handleDeleteNetworkDevice = async (id: string) => {
    try {
      await deleteNetwork(id).unwrap()
      toast.success("Network device deleted successfully")
    } catch (error) {
      toast.error("Failed to delete network device")
    }
  }
  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="vm" className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="border border-violet-500/20">
            <TabsTrigger value="vm" className="data-[state=active]:bg-violet-400  data-[state=active]:text-white">
              Virtual Machines
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-violet-400  data-[state=active]:text-white">
              Network Devices
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setEditingVM(null)
                setIsVMFormOpen(true)
              }}
              disabled={isCreatingVM || isUpdatingVM}
              className="bg-violet-500 hover:bg-violet-400 text-white"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add VM
            </Button>
            <Button
              onClick={() => {
                setEditingNetworkDevice(null)
                setIsNetworkFormOpen(true)
              }}
              disabled={isCreatingNetwork || isUpdatingNetwork}
              className="bg-violet-500 hover:bg-violet-400 text-white"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Network Device
            </Button>
          </div>
        </div>
        <TabsContent value="vm" className="mt-6  p-4 rounded-lg border border-gray-100 shadow-sm">
          {isLoadingVMs ? (
            <div className="text-center py-8 text-gray-950">Loading virtual machines...</div>
          ) : (
            <VMList vms={vms} onEdit={handleEditVM} onDelete={handleDeleteVM} />
          )}
        </TabsContent>
        <TabsContent value="network" className="mt-6 p-4 rounded-lg border border-gray-100 shadow-sm">
          {isLoadingNetworks ? (
            <div className="text-center py-8 text-gray-950">Loading network devices...</div>
          ) : (
            <NetworkDeviceList
              devices={networks}
              onEdit={handleEditNetworkDevice}
              onDelete={handleDeleteNetworkDevice}
            />
          )}
        </TabsContent>
      </Tabs>
      {/* VM Form Dialog */}
      <Dialog open={isVMFormOpen} onOpenChange={setIsVMFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
          </DialogHeader>
          <VMForm onSubmit={handleVMSubmit} initialData={editingVM || undefined} isEditing={!!editingVM} />
        </DialogContent>
      </Dialog>
      {/* Network Device Form Dialog */}
      <Dialog open={isNetworkFormOpen} onOpenChange={setIsNetworkFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
          </DialogHeader>
          <NetworkDeviceForm
            onSubmit={handleNetworkSubmit}
            initialData={editingNetworkDevice || undefined}
            isEditing={!!editingNetworkDevice}
          />
        </DialogContent>
      </Dialog>
      {/* Monitoring Confirmation Dialog */}
      <MonitoringConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        onConfirm={handleConfirmation}
        deviceType={confirmationType}
      />
    </div>
  )
}
export default Device

