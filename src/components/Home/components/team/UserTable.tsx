import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { Modal } from './components/Modal';
import { UserForm } from './components/UserForm';
import type { User, UserFormData } from './types';

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [newVM, setNewVM] = useState({ name: '', type: 'Process' as const });

  const toggleRow = (userId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(userId)) {
      newExpandedRows.delete(userId);
    } else {
      newExpandedRows.add(userId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleAddUser = (data: UserFormData) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      ...data,
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (data: UserFormData) => {
    if (!selectedUser) return;
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, ...data } : user
    );
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map((user) =>
      user.id === userId ? { ...user, status: !user.status } : user
    ));
  };

  const updateUserPermission = (userId: string, permission: keyof User['permissions'], value: boolean) => {
    setUsers(users.map((user) =>
      user.id === userId
        ? {
            ...user,
            permissions: {
              ...user.permissions,
              [permission]: value,
            },
          }
        : user
    ));
  };

  const updateUserMediaType = (userId: string, mediaType: keyof User['permissions']['mediaTypes'], value: boolean) => {
    setUsers(users.map((user) =>
      user.id === userId
        ? {
            ...user,
            permissions: {
              ...user.permissions,
              mediaTypes: {
                ...user.permissions.mediaTypes,
                [mediaType]: value,
              },
            },
          }
        : user
    ));
  };

  const addVMToUser = (userId: string) => {
    if (!newVM.name) return;
    setUsers(users.map((user) =>
      user.id === userId
        ? {
            ...user,
            permissions: {
              ...user.permissions,
              controlVM: [
                ...user.permissions.controlVM,
                { id: crypto.randomUUID(), ...newVM },
              ],
            },
          }
        : user
    ));
    setNewVM({ name: '', type: 'Process' });
  };

  const removeVMFromUser = (userId: string, vmId: string) => {
    setUsers(users.map((user) =>
      user.id === userId
        ? {
            ...user,
            permissions: {
              ...user.permissions,
              controlVM: user.permissions.controlVM.filter((vm) => vm.id !== vmId),
            },
          }
        : user
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
          >
            <PlusCircle size={20} />
            Add User
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 px-6 py-3"></th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  <tr className="group transition-colors duration-150 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleRow(user.id)}
                        className="text-gray-400 transition-colors duration-150 hover:text-gray-600"
                      >
                        {expandedRows.has(user.id) ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.firstName}</td>
                    <td className="px-6 py-4">{user.lastName}</td>
                    <td className="px-6 py-4">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={user.status}
                          onChange={() => toggleUserStatus(user.id)}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditModalOpen(true);
                          }}
                          className="text-gray-400 transition-colors duration-150 hover:text-blue-600"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-gray-400 transition-colors duration-150 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRows.has(user.id) && (
                    <tr>
                      <td colSpan={6} className="bg-gray-50 px-8 py-6">
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <div className="mb-6">
                              <div className="mb-4 flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-gray-900">
                                  Control VMs
                                </h4>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    placeholder="Add new VM..."
                                    value={newVM.name}
                                    onChange={(e) => setNewVM({ ...newVM, name: e.target.value })}
                                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                  <button
                                    onClick={() => addVMToUser(user.id)}
                                    className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white transition-all duration-150 hover:bg-blue-700 hover:shadow-md"
                                  >
                                    <Plus size={16} />
                                    Add VM
                                  </button>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                {user.permissions.controlVM.map((vm) => (
                                  <div
                                    key={vm.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-150 hover:border-gray-300 hover:shadow-md"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <span className="text-xs font-medium">VM</span>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-900">{vm.name}</span>
                                        <span className="ml-2 text-sm text-gray-500">
                                          ({vm.type} VM)
                                        </span>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => removeVMFromUser(user.id, vm.id)}
                                      className="rounded-full p-1 text-gray-400 transition-colors duration-150 hover:bg-red-50 hover:text-red-600"
                                    >
                                      <X size={18} />
                                    </button>
                                  </div>
                                ))}
                                {user.permissions.controlVM.length === 0 && (
                                  <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
                                    No VMs added yet
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="mb-3 text-lg font-semibold text-gray-900">
                                Permissions
                              </h4>
                              <div className="space-y-3">
                                <label className="flex items-center space-x-3 rounded-md p-2 transition-colors duration-150 hover:bg-gray-100">
                                  <input
                                    type="checkbox"
                                    checked={user.permissions.addVM}
                                    onChange={(e) => updateUserPermission(user.id, 'addVM', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 transition-colors duration-150 focus:ring-blue-500"
                                  />
                                  <span className="text-sm font-medium text-gray-700">Add VM</span>
                                </label>
                                <label className="flex items-center space-x-3 rounded-md p-2 transition-colors duration-150 hover:bg-gray-100">
                                  <input
                                    type="checkbox"
                                    checked={user.permissions.addUser}
                                    onChange={(e) => updateUserPermission(user.id, 'addUser', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 transition-colors duration-150 focus:ring-blue-500"
                                  />
                                  <span className="text-sm font-medium text-gray-700">Add User</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-3 text-lg font-semibold text-gray-900">
                              Media Types
                            </h4>
                            <div className="space-y-3">
                              <label className="flex items-center space-x-3 rounded-md p-2 transition-colors duration-150 hover:bg-gray-100">
                                <input
                                  type="checkbox"
                                  checked={user.permissions.mediaTypes.email}
                                  onChange={(e) => updateUserMediaType(user.id, 'email', e.target.checked)}
                                  className="h-4 w-4 rounded border-gray-300 text-blue-600 transition-colors duration-150 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Email</span>
                              </label>
                              <label className="flex items-center space-x-3 rounded-md p-2 transition-colors duration-150 hover:bg-gray-100">
                                <input
                                  type="checkbox"
                                  checked={user.permissions.mediaTypes.telegram}
                                  onChange={(e) => updateUserMediaType(user.id, 'telegram', e.target.checked)}
                                  className="h-4 w-4 rounded border-gray-300 text-blue-600 transition-colors duration-150 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Telegram</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Add New User</h2>
          <UserForm
            onSubmit={handleAddUser}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>

        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Edit User</h2>
          <UserForm
            initialData={selectedUser || undefined}
            onSubmit={handleEditUser}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
}

export default UserTable;