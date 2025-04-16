import { useState } from "react"
import { PlusCircle, Check, X, ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { useCreateTeamMutation } from "../api"
import { UserForm } from "./user-form"
import type { User, UserFormData } from "../types"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
// import { toast } from "@/hooks/use-toast"

function UserTable() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const teamMembers = useSelector((state: RootState) => state.team.members)
  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation()

  const toggleRow = (userId: string) => {
    const newExpandedRows = new Set(expandedRows)
    if (expandedRows.has(userId)) {
      newExpandedRows.delete(userId)
    } else {
      newExpandedRows.add(userId)
    }
    setExpandedRows(newExpandedRows)
  }

  const handleAddUser = async (data: UserFormData) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}")
      const organizationId = userData?.user_id

      if (!organizationId) {
        toast({
          title: "Error",
          description: "Organization ID not found",
          variant: "destructive",
        })
        return
      }

      await createTeam({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        organization: organizationId,
        username: data.username,
        // Add other fields as needed by your API
      }).unwrap()

      toast({
        title: "Success",
        description: selectedUser ? "User updated successfully" : "User created successfully",
      })

      setIsDialogOpen(false)
      setSelectedUser(null)
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${selectedUser ? "update" : "create"} user`,
        variant: "destructive",
      })
      console.error("Failed to handle user:", error)
    }
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    try {
      // Implement your delete API call here
      // await deleteTeamMember(userToDelete).unwrap()

      toast({
        title: "Success",
        description: "User deleted successfully",
      })

      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
      console.error("Failed to delete user:", error)
    }
  }

  const handleStatusChange = async (userId: string, currentStatus: boolean) => {
    try {
      // Implement your status change API call here
      // await updateUserStatus({ userId, status: !currentStatus }).unwrap()

      // toast({
      //   title: "Success",
      //   description: `User status changed to ${!currentStatus ? "active" : "inactive"}`,
      // })
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to update user status",
      //   variant: "destructive",
      // })
      console.error("Failed to update user status:", error)
    }
  }

  return (
    <div className="space-y-6 p-6  rounded-xl shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <Button
          onClick={() => {
            setSelectedUser(null)
            setIsDialogOpen(true)
          }}
          disabled={isCreating}
          className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-[var(--light)]">
            <TableRow>
              <TableHead className="w-[50px] text-center"></TableHead>
              <TableHead className="font-medium text-gray-700">Email</TableHead>
              <TableHead className="font-medium text-gray-700">First Name</TableHead>
              <TableHead className="font-medium text-gray-700">Last Name</TableHead>
              <TableHead className="font-medium text-gray-700">Status</TableHead>
              <TableHead className="font-medium text-gray-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.length === 0 ? (
              <TableRow>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  No team members found. Add your first user to get started.
                </td>
              </TableRow>
            ) : (
              teamMembers.map((member, index) => (
                <UserTableRowEnhanced
                  key={member.id}
                  user={{
                    id: String(member.id),
                    email: member.email,
                    firstName: member.first_name,
                    lastName: member.last_name,
                    status: true,
                    permissions: {
                      addVM: false,
                      addUser: false,
                      mediaTypes: {
                        email: false,
                        telegram: false,
                      },
                      controlVM: [],
                    },
                  }}
                  isExpanded={expandedRows.has(String(member.id))}
                  onToggleExpand={toggleRow}
                  onEdit={(user) => {
                    setSelectedUser(user)
                    setIsDialogOpen(true)
                  }}
                  onDelete={(userId) => {
                    setUserToDelete(userId)
                    setIsDeleteDialogOpen(true)
                  }}
                  onStatusChange={handleStatusChange}
                  isEven={index % 2 === 0}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* User Form Dialog */}
      <UserForm
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={selectedUser}
        onSubmit={handleAddUser}
        isEditing={!!selectedUser}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user and remove their data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function UserTableRowEnhanced({
  user,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onStatusChange,
  isEven,
}: {
  user: User
  isExpanded: boolean
  onToggleExpand: (userId: string) => void
  onEdit: (user: User) => void
  onDelete: (userId: string) => void
  onStatusChange: (userId: string, currentStatus: boolean) => void
  isEven: boolean
}) {
  return (
    <>
      <TableRow className={isEven ? "bg-white" : "bg-gray-50"}>
        <td className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpand(user.id)}
            className="h-8 w-8 p-0 text-gray-500"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </td>
        <td className="font-medium">{user.email}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>
          <Badge
            className={
              user.status
                ? "bg-green-100 text-green-800 hover:bg-green-100 cursor-pointer"
                : "bg-red-100 text-red-800 hover:bg-red-100 cursor-pointer"
            }
            onClick={() => onStatusChange(user.id, user.status)}
          >
            {user.status ? (
              <>
                <Check className="mr-1 h-3 w-3" /> Active
              </>
            ) : (
              <>
                <X className="mr-1 h-3 w-3" /> Inactive
              </>
            )}
          </Badge>
        </td>
        <td className="text-right">
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user)}
              className="h-8 border-gray-200 text-gray-700 hover:bg-[var(--light)] hover:text-[var(--secondary)] hover:border-[var(--acent)]"
            >
              <Edit className="h-3.5 w-3.5" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(user.id)}
              className="h-8 border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </td>
      </TableRow>
      {isExpanded && (
        <TableRow className={isEven ? "bg-[var(--light)]/30" : "bg-[var(--light)]/50"}>
          <td colSpan={6} className="p-4">
            <div className="rounded-lg bg-white p-4 shadow-sm border border-[var(--acent)]">
              <h4 className="font-medium text-[var(--secondary)] mb-3">User Permissions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">Access Control</h5>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${user.permissions.addVM ? "bg-[var(--secondary)]" : "bg-gray-300"}`}
                    ></div>
                    <span className="text-sm">Add VM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${user.permissions.addUser ? "bg-[var(--secondary)]" : "bg-gray-300"}`}
                    ></div>
                    <span className="text-sm">Add User</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">Media Types</h5>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${user.permissions.mediaTypes.email ? "bg-[var(--secondary)]" : "bg-gray-300"}`}
                    ></div>
                    <span className="text-sm">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${user.permissions.mediaTypes.telegram ? "bg-[var(--secondary)]" : "bg-gray-300"}`}
                    ></div>
                    <span className="text-sm">Telegram</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">VM Control</h5>
                  {user.permissions.controlVM.length > 0 ? (
                    user.permissions.controlVM.map((vm, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-[var(--secondary)]"></div>
                        <span className="text-sm">{vm}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No VM control permissions</p>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[var(--secondary)] border-[var(--acent)] hover:bg-[var(--light)] hover:border-[var(--acent)]"
                  onClick={() => onEdit(user)}
                >
                  Edit Permissions
                </Button>
              </div>
            </div>
          </td>
        </TableRow>
      )}
    </>
  )
}

export default UserTable

