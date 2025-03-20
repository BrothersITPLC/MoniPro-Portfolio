import React from "react";
import { Plus, X } from "lucide-react";
import type { UserFormData } from "../types";

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  initialData?: Partial<UserFormData>;
  onCancel: () => void;
}

export function UserForm({ onSubmit, initialData, onCancel }: UserFormProps) {
  const [formData, setFormData] = React.useState<UserFormData>({
    email: initialData?.email || "",
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    status: initialData?.status ?? true,
    permissions: {
      addVM: initialData?.permissions?.addVM || false,
      addUser: initialData?.permissions?.addUser || false,
      controlVM: initialData?.permissions?.controlVM || [],
      mediaTypes: {
        email: initialData?.permissions?.mediaTypes?.email || false,
        telegram: initialData?.permissions?.mediaTypes?.telegram || false,
      },
    },
  });

  const [newVM, setNewVM] = React.useState({
    name: "",
    type: "Process" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addVM = () => {
    if (!newVM.name) return;
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        controlVM: [
          ...formData.permissions.controlVM,
          { id: crypto.randomUUID(), ...newVM },
        ],
      },
    });
    setNewVM({ name: "", type: "Process" });
  };

  const removeVM = (vmId: string) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        controlVM: formData.permissions.controlVM.filter(
          (vm) => vm.id !== vmId
        ),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.checked })
            }
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            {formData.status ? "Active" : "Inactive"}
          </span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Permissions
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.permissions.addVM}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  permissions: {
                    ...formData.permissions,
                    addVM: e.target.checked,
                  },
                })
              }
            />
            <span className="text-sm text-gray-700">Add VM</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.permissions.addUser}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  permissions: {
                    ...formData.permissions,
                    addUser: e.target.checked,
                  },
                })
              }
            />
            <span className="text-sm text-gray-700">Add User</span>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Control VMs
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="VM Name"
            value={newVM.name}
            onChange={(e) => setNewVM({ ...newVM, name: e.target.value })}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            value={newVM.type}
            onChange={(e) =>
              setNewVM({
                ...newVM,
                type: e.target.value as "Process" | "System",
              })
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Process">Process VM</option>
            <option value="System">System VM</option>
          </select>
          <button
            type="button"
            onClick={addVM}
            className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {formData.permissions.controlVM.map((vm) => (
            <div
              key={vm.id}
              className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2"
            >
              <div>
                <span className="font-medium">{vm.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({vm.type} VM)
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeVM(vm.id)}
                className="text-gray-400 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Media Types
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.permissions.mediaTypes.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  permissions: {
                    ...formData.permissions,
                    mediaTypes: {
                      ...formData.permissions.mediaTypes,
                      email: e.target.checked,
                    },
                  },
                })
              }
            />
            <span className="text-sm text-gray-700">Email</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.permissions.mediaTypes.telegram}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  permissions: {
                    ...formData.permissions,
                    mediaTypes: {
                      ...formData.permissions.mediaTypes,
                      telegram: e.target.checked,
                    },
                  },
                })
              }
            />
            <span className="text-sm text-gray-700">Telegram</span>
          </label>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
}
