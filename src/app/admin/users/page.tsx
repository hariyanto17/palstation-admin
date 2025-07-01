'use client'

import Button from '@/components/button'
import { useState, useCallback } from 'react'

interface User {
  id: string
  name: string
  username: string
  role: 'admin' | 'employee'
  status: 'active' | 'inactive'
  createdAt: number // timestamp
}

const Users = () => {
  const [showUserForm, setShowUserForm] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null) // For editing

  const [users, setUsers] = useState<User[]>(() => {
    const dummyUsers: User[] = [
      {
        id: 'user-1',
        name: 'Admin Utama',
        username: 'admin',
        role: 'admin',
        status: 'active',
        createdAt: Date.now() - 86400000 * 30,
      },
      {
        id: 'user-2',
        name: 'Budi Karyawan',
        username: 'budi',
        role: 'employee',
        status: 'active',
        createdAt: Date.now() - 86400000 * 15,
      },
      {
        id: 'user-3',
        name: 'Siti Karyawan',
        username: 'siti',
        role: 'employee',
        status: 'active',
        createdAt: Date.now() - 86400000 * 10,
      },
      {
        id: 'user-4',
        name: 'Guest User',
        username: 'guest',
        role: 'employee',
        status: 'inactive',
        createdAt: Date.now() - 86400000 * 5,
      },
    ]
    return dummyUsers
  })

  const onAddUser = useCallback((newUser: User) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { ...newUser, id: `user-${Date.now()}`, createdAt: Date.now() },
    ])
  }, [])

  const onEditUser = useCallback((updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    )
  }, [])

  const onDeleteUser = useCallback((id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
  }, [])

  const handleAddClick = () => {
    setCurrentUser(null) // Clear current user for add mode
    setShowUserForm(true)
  }

  const handleEditClick = (user: User) => {
    setCurrentUser(user) // Set current user for edit mode
    setShowUserForm(true)
  }

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      // Use custom modal in real app
      onDeleteUser(id)
    }
  }

  const handleFormSubmit = (user: User) => {
    if (currentUser) {
      onEditUser(user)
    } else {
      onAddUser(user)
    }
    setShowUserForm(false)
    setCurrentUser(null)
  }

  const handleFormCancel = () => {
    setShowUserForm(false)
    setCurrentUser(null)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-gradient mb-8 text-center text-4xl font-bold">
        Manajemen Pengguna
      </h1>

      <div className="mb-6 flex justify-end">
        <Button onClick={handleAddClick} className="px-6 py-3">
          Tambah Pengguna Baru
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-gray-800 shadow-lg">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="rounded-tl-lg p-4 text-sm font-semibold text-gray-300">
                Nama
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">
                Username
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">Role</th>
              <th className="p-4 text-sm font-semibold text-gray-300">
                Status
              </th>
              <th className="rounded-tr-lg p-4 text-sm font-semibold text-gray-300">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 transition-colors duration-150 last:border-b-0 hover:bg-gray-700"
                >
                  <td className="p-4 text-gray-200">{user.name}</td>
                  <td className="p-4 text-gray-200">{user.username}</td>
                  <td className="p-4 text-gray-200 capitalize">{user.role}</td>
                  <td
                    className={`p-4 font-semibold ${user.status === 'active' ? 'text-green-400' : 'text-red-400'} capitalize`}
                  >
                    {user.status}
                  </td>
                  <td className="flex gap-2 p-4">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-blue-400 transition-colors duration-200 hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      className="text-red-400 transition-colors duration-200 hover:text-red-300"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  Tidak ada data pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Add/Edit Form Modal */}
      {showUserForm && (
        <UserForm
          user={currentUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  )
}

// User Form Component (for Add/Edit) - NEW
interface UserFormProps {
  user: User | null // Null for add, User object for edit
  onSubmit: (user: User) => void
  onCancel: () => void
}

const UserForm = ({ user, onSubmit, onCancel }: UserFormProps) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user?.name || '',
    username: user?.username || '',
    role: user?.role || 'employee',
    status: user?.status || 'active',
  })
  const [errors, setErrors] = useState<Partial<User>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name as keyof User]: undefined })) // Clear error on change
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<User> = {}
    if (!formData.name) newErrors.name = 'Nama wajib diisi'
    if (!formData.username) newErrors.username = 'Username wajib diisi'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      ...user, // Keep existing ID if editing
      id: user?.id || `user-${Date.now()}`, // Generate new ID if adding
      createdAt: user?.createdAt || Date.now(), // Keep existing timestamp or set new
      ...formData,
    } as User) // Cast to User after ensuring all properties are there
  }

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div
        className="w-full max-w-md rounded-lg bg-gray-900 p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-gradient mb-6 text-center text-2xl font-bold">
          {user ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Nama:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-400">{errors.username}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            >
              <option value="employee">Karyawan</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="status"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Non-aktif</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-600 px-4 py-2 text-gray-300 transition duration-200 hover:bg-gray-700"
            >
              Batal
            </button>
            <Button type="submit">
              {user ? 'Simpan Perubahan' : 'Tambah Pengguna'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Users
