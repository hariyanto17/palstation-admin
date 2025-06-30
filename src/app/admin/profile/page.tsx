'use client'

import Button from '@/components/button'

const Profile = () => {
  const currentUser = {
    id: 'user-1',
    name: 'Admin Utama',
    username: 'admin',
    role: 'admin',
    status: 'active',
    createdAt: Date.now() - 86400000 * 30,
  }

  if (!currentUser) {
    return (
      <div className="rounded-lg bg-gray-800 p-6 text-center text-gray-300 shadow-lg">
        <h1 className="text-gradient mb-4 text-4xl font-bold">
          Profil Pengguna
        </h1>
        <p>Data profil tidak tersedia. Silakan login atau pilih pengguna.</p>
      </div>
    )
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-gradient mb-8 text-center text-4xl font-bold">
        Profil Pengguna
      </h1>

      <div className="card mx-auto flex max-w-2xl flex-col items-center gap-6 p-8 md:flex-row">
        <div className="flex-shrink-0">
          {/* Dummy Profile Picture */}
          <img
            src={`https://placehold.co/120x120/8e2de2/ffffff?text=${currentUser.name.split(' ')[0][0]}${currentUser.name.split(' ').length > 1 ? currentUser.name.split(' ')[1][0] : ''}`}
            alt="Profil Pengguna"
            className="h-32 w-32 rounded-full border-4 border-purple-500 object-cover"
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="mb-2 text-3xl font-bold text-white">
            {currentUser.name}
          </h2>
          <p className="mb-4 text-lg text-gray-300">@{currentUser.username}</p>

          <div className="grid grid-cols-1 gap-x-8 gap-y-3 text-gray-300 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-400">Role:</p>
              <p className="font-semibold capitalize">{currentUser.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Status:</p>
              <p
                className={`font-semibold capitalize ${currentUser.status === 'active' ? 'text-green-400' : 'text-red-400'}`}
              >
                {currentUser.status}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-400">Bergabung Sejak:</p>
              <p className="font-semibold">
                {formatTimestamp(currentUser.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Button
              onClick={() =>
                console.log('Edit Profile clicked for:', currentUser.id)
              }
              className="px-6 py-3"
            >
              Edit Profil
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
