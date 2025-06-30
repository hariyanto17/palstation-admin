'use client'

import Button from '@/components/button'
import { useState, useEffect, useCallback } from 'react'

// Interface for Booking Data - UPDATED
interface Booking {
  id: string
  bookingDate: string //YYYY-MM-DD
  startTime: string // HH:mm
  totalHours: number
  psType: 'PS4' | 'PS5'
  tableNumber: number // NEW: Table number for booking
  bookerName: string
  whatsappNumber: string
  createdAt: number // timestamp
}

type BookingErrors = {
  [K in keyof Booking]?: string
}

const Booking = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const dummyBookings: Booking[] = [
      {
        id: 'book-1',
        bookingDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10), // Tomorrow
        startTime: '10:00',
        totalHours: 2,
        psType: 'PS5',
        tableNumber: 5, // Example table number
        bookerName: 'Andi Pratama',
        whatsappNumber: '081234567890',
        createdAt: Date.now() - 86400000 * 2,
      },
      {
        id: 'book-2',
        bookingDate: new Date(Date.now() + 86400000 * 2)
          .toISOString()
          .slice(0, 10), // Day after tomorrow
        startTime: '14:00',
        totalHours: 3,
        psType: 'PS4',
        tableNumber: 2, // Example table number
        bookerName: 'Bunga Citra',
        whatsappNumber: '087654321098',
        createdAt: Date.now() - 86400000 * 1,
      },
      {
        id: 'book-3',
        bookingDate: new Date().toISOString().slice(0, 10), // Today
        startTime: '19:00',
        totalHours: 1,
        psType: 'PS5',
        tableNumber: 6, // Example table number
        bookerName: 'Charlie Delta',
        whatsappNumber: '085000111222',
        createdAt: Date.now(),
      },
    ]
    return dummyBookings
  })

  // Helper to check for booking conflicts
  const checkBookingConflict = useCallback(
    (
      newBooking: Booking,
      existingBookings: Booking[],
      isEditing: boolean = false
    ) => {
      const newBookingStart = new Date(
        `${newBooking.bookingDate}T${newBooking.startTime}:00`
      ).getTime()
      const newBookingEnd =
        newBookingStart + newBooking.totalHours * 3600 * 1000

      for (const existingBook of existingBookings) {
        // If editing, skip checking against itself
        if (isEditing && existingBook.id === newBooking.id) {
          continue
        }

        // Check for same date and table number
        if (
          existingBook.bookingDate === newBooking.bookingDate &&
          existingBook.tableNumber === newBooking.tableNumber
        ) {
          const existingBookStart = new Date(
            `${existingBook.bookingDate}T${existingBook.startTime}:00`
          ).getTime()
          const existingBookEnd =
            existingBookStart + existingBook.totalHours * 3600 * 1000

          // Check for time overlap
          if (
            newBookingStart < existingBookEnd &&
            newBookingEnd > existingBookStart
          ) {
            return `Meja ${newBooking.tableNumber} sudah dipesan dari ${existingBook.startTime} selama ${existingBook.totalHours} jam pada tanggal ${new Date(existingBook.bookingDate).toLocaleDateString('id-ID')}.`
          }
        }
      }
      return true // No conflict
    },
    []
  )

  const onAddBooking = useCallback(
    (newBooking: Booking) => {
      const conflictError = checkBookingConflict(newBooking, bookings)
      if (conflictError !== true) {
        return conflictError
      }
      setBookings((prevBookings) => [
        ...prevBookings,
        { ...newBooking, id: `booking-${Date.now()}`, createdAt: Date.now() },
      ])
      return true
    },
    [bookings, checkBookingConflict]
  )

  const onEditBooking = useCallback(
    (updatedBooking: Booking) => {
      const conflictError = checkBookingConflict(updatedBooking, bookings, true) // Pass true for isEditing
      if (conflictError !== true) {
        return conflictError
      }
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === updatedBooking.id ? updatedBooking : booking
        )
      )
      return true
    },
    [bookings, checkBookingConflict]
  )

  const onDeleteBooking = useCallback((id: string) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    )
  }, [])

  const [showBookingForm, setShowBookingForm] = useState(false)
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null) // For editing
  const [formError, setFormError] = useState<string | null>(null) // For displaying conflict errors

  const handleAddClick = () => {
    setCurrentBooking(null) // Clear current booking for add mode
    setFormError(null) // Clear any previous form errors
    setShowBookingForm(true)
  }

  const handleEditClick = (booking: Booking) => {
    setCurrentBooking(booking) // Set current booking for edit mode
    setFormError(null) // Clear any previous form errors
    setShowBookingForm(true)
  }

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pemesanan ini?')) {
      // Use custom modal in real app
      onDeleteBooking(id)
    }
  }

  const handleFormSubmit = (booking: Booking) => {
    let result: string | true
    if (currentBooking) {
      result = onEditBooking(booking)
    } else {
      result = onAddBooking(booking)
    }

    if (result === true) {
      setShowBookingForm(false)
      setCurrentBooking(null)
      setFormError(null)
    } else {
      setFormError(result) // Display the error message from the validation
    }
  }

  const handleFormCancel = () => {
    setShowBookingForm(false)
    setCurrentBooking(null)
    setFormError(null)
  }

  const formatDateTime = (dateString: string, timeString: string) => {
    const date = new Date(dateString)
    const [hours, minutes] = timeString.split(':').map(Number)
    date.setHours(hours, minutes)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-gradient mb-8 text-center text-4xl font-bold">
        Daftar Pemesanan
      </h1>

      <div className="mb-6 flex justify-end">
        <Button onClick={handleAddClick} className="px-6 py-3">
          Tambah Pemesanan Baru
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-gray-800 shadow-lg">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="rounded-tl-lg p-4 text-sm font-semibold text-gray-300">
                Tanggal & Waktu
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">
                Total Jam
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">
                Jenis PS
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">Meja</th>{' '}
              {/* NEW: Table Number Column */}
              <th className="p-4 text-sm font-semibold text-gray-300">
                Nama Pemesan
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">
                WhatsApp
              </th>
              <th className="rounded-tr-lg p-4 text-sm font-semibold text-gray-300">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings
                .sort(
                  (a, b) =>
                    new Date(a.bookingDate).getTime() -
                      new Date(b.bookingDate).getTime() ||
                    a.startTime.localeCompare(b.startTime)
                )
                .map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-700 transition-colors duration-150 last:border-b-0 hover:bg-gray-700"
                  >
                    <td className="p-4 text-gray-200">
                      {formatDateTime(booking.bookingDate, booking.startTime)}
                    </td>
                    <td className="p-4 text-gray-200">
                      {booking.totalHours} Jam
                    </td>
                    <td className="p-4 text-gray-200">{booking.psType}</td>
                    <td className="p-4 text-gray-200">
                      Meja {booking.tableNumber}
                    </td>{' '}
                    {/* Display table number */}
                    <td className="p-4 text-gray-200">{booking.bookerName}</td>
                    <td className="p-4 text-gray-200">
                      {booking.whatsappNumber}
                    </td>
                    <td className="flex gap-2 p-4">
                      <button
                        onClick={() => handleEditClick(booking)}
                        className="text-blue-400 transition-colors duration-200 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(booking.id)}
                        className="text-red-400 transition-colors duration-200 hover:text-red-300"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-400">
                  Tidak ada pemesanan.
                </td>{' '}
                {/* Updated colspan */}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Booking Add/Edit Form Modal */}
      {showBookingForm && (
        <BookingForm
          booking={currentBooking}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          formError={formError} // Pass form error to the form
        />
      )}
    </div>
  )
}

// Booking Form Component (for Add/Edit) - UPDATED
interface BookingFormProps {
  booking: Booking | null // Null for add, Booking object for edit
  onSubmit: (booking: Booking) => void
  onCancel: () => void
  formError: string | null // New prop for displaying conflict errors
}

const BookingForm = ({
  booking,
  onSubmit,
  onCancel,
  formError,
}: BookingFormProps) => {
  const [formData, setFormData] = useState<Partial<Booking>>({
    bookingDate: booking?.bookingDate || new Date().toISOString().slice(0, 10),
    startTime: booking?.startTime || '09:00',
    totalHours: booking?.totalHours || 1,
    psType: booking?.psType || 'PS4',
    tableNumber: booking?.tableNumber || (booking?.psType === 'PS5' ? 5 : 1), // Default based on PS type
    bookerName: booking?.bookerName || '',
    whatsappNumber: booking?.whatsappNumber || '',
  })
  const [errors, setErrors] = useState<BookingErrors>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name as keyof Booking]: undefined })) // Clear error on change
  }

  // Generate table number options based on selected PS type
  const getTableOptions = () => {
    if (formData.psType === 'PS4') {
      return Array.from({ length: 4 }, (_, i) => i + 1) // Meja 1-4
    } else {
      return Array.from({ length: 4 }, (_, i) => i + 5) // Meja 5-8
    }
  }

  // Update table number if PS type changes and current table is invalid
  useEffect(() => {
    const validTables = getTableOptions()
    if (formData.tableNumber && !validTables.includes(formData.tableNumber)) {
      setFormData((prev) => ({ ...prev, tableNumber: validTables[0] })) // Set to first valid table
    } else if (!formData.tableNumber && validTables.length > 0) {
      setFormData((prev) => ({ ...prev, tableNumber: validTables[0] })) // Set default if not set
    }
  }, [formData.psType]) // Recalculate when psType changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: BookingErrors = {}
    if (!formData.bookingDate) newErrors.bookingDate = 'Tanggal wajib diisi'
    if (!formData.startTime) newErrors.startTime = 'Jam mulai wajib diisi'
    if (!formData.totalHours || formData.totalHours <= 0)
      newErrors.totalHours = 'Total jam harus lebih dari 0'
    if (!formData.psType) newErrors.psType = 'Jenis PS wajib dipilih'
    if (!formData.tableNumber)
      newErrors.tableNumber = 'Nomor meja wajib dipilih'
    if (!formData.bookerName) newErrors.bookerName = 'Nama pemesan wajib diisi'
    if (!formData.whatsappNumber)
      newErrors.whatsappNumber = 'Nomor WhatsApp wajib diisi'

    // Additional validation for table number based on PS type
    const validTablesForType = getTableOptions()

    if (
      formData.tableNumber &&
      !validTablesForType.includes(formData.tableNumber)
    ) {
      newErrors.tableNumber = `Meja ${formData.tableNumber} di jam ${formData.startTime} suda di booking`
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      ...booking, // Keep existing ID if editing
      id: booking?.id || `booking-${Date.now()}`, // Generate new ID if adding
      createdAt: booking?.createdAt || Date.now(), // Keep existing timestamp or set new
      ...formData,
    } as Booking) // Cast to Booking after ensuring all properties are there
  }

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div
        className="w-full max-w-md rounded-lg bg-gray-900 p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-gradient mb-6 text-center text-2xl font-bold">
          {booking ? 'Edit Pemesanan' : 'Tambah Pemesanan Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {formError && ( // Display conflict error if any
            <p className="mb-2 text-center text-sm text-red-400">{formError}</p>
          )}
          <div>
            <label
              htmlFor="bookingDate"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Tanggal:
            </label>
            <input
              type="date"
              id="bookingDate"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            />
            {errors.bookingDate && (
              <p className="mt-1 text-xs text-red-400">{errors.bookingDate}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="startTime"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Jam Mulai:
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            />
            {errors.startTime && (
              <p className="mt-1 text-xs text-red-400">{errors.startTime}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="totalHours"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Total Jam:
            </label>
            <input
              type="number"
              id="totalHours"
              name="totalHours"
              value={formData.totalHours}
              onChange={handleChange}
              min="1"
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            />
            {errors.totalHours && (
              <p className="mt-1 text-xs text-red-400">{errors.totalHours}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="psType"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Jenis PS:
            </label>
            <select
              id="psType"
              name="psType"
              value={formData.psType}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            >
              <option value="PS4">PS4</option>
              <option value="PS5">PS5</option>
            </select>
            {errors.psType && (
              <p className="mt-1 text-xs text-red-400">{errors.psType}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="tableNumber"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Nomor Meja:
            </label>
            <select
              id="tableNumber"
              name="tableNumber"
              value={formData.tableNumber}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            >
              {getTableOptions().map((num) => (
                <option key={num} value={num}>
                  Meja {num}
                </option>
              ))}
            </select>
            {errors.tableNumber && (
              <p className="mt-1 text-xs text-red-400">{errors.tableNumber}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="bookerName"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Nama Pemesan:
            </label>
            <input
              type="text"
              id="bookerName"
              name="bookerName"
              value={formData.bookerName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            />
            {errors.bookerName && (
              <p className="mt-1 text-xs text-red-400">{errors.bookerName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="whatsappNumber"
              className="mb-1 block text-sm font-medium text-gray-300"
            >
              Nomor WhatsApp:
            </label>
            <input
              type="text"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            />
            {errors.whatsappNumber && (
              <p className="mt-1 text-xs text-red-400">
                {errors.whatsappNumber}
              </p>
            )}
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
              {booking ? 'Simpan Perubahan' : 'Tambah Pemesanan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
