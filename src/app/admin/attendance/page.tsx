'use client'

import Button from '@/components/button'
import { useState, useEffect, useCallback } from 'react'

interface AttendanceRecord {
  id: string
  employeeName: string // Dummy name for now
  clockInTime: string // HH:mm:ss
  isLate: boolean
  reason?: string // Only if late
  photoUrl: string // URL to the dummy photo
  date: string // YYYY-MM-DD
  timestamp: number // For sorting
  shiftType: 'morning' | 'night' // Added shift type
}

// Employee Attendance Component - UPDATED
interface EmployeeAttendanceProps {
  onClockIn: (record: AttendanceRecord) => void
}

const EmployeeAttendance = ({ onClockIn }: EmployeeAttendanceProps) => {
  const [reason, setReason] = useState('')
  const [photoTaken, setPhotoTaken] = useState<string | null>(null) // Stores photo URL
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLate, setIsLate] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedShift, setSelectedShift] = useState<'morning' | 'night'>(
    'morning'
  ) // Default to morning

  const shiftTimeLimits = {
    morning: { hours: 10, minutes: 30 }, // 10:30 AM
    night: { hours: 18, minutes: 30 }, // 06:30 PM
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Update time every second

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const now = new Date()
    let limitHours, limitMinutes

    if (selectedShift === 'morning') {
      limitHours = shiftTimeLimits.morning.hours
      limitMinutes = shiftTimeLimits.morning.minutes
    } else {
      // selectedShift === 'night'
      limitHours = shiftTimeLimits.night.hours
      limitMinutes = shiftTimeLimits.night.minutes
    }

    const limit = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      limitHours,
      limitMinutes,
      0
    )
    setIsLate(now > limit)
  }, [selectedShift, shiftTimeLimits])

  const handleTakePhoto = () => {
    // Simulate taking a photo from camera
    // In a real app, you'd use navigator.mediaDevices.getUserMedia
    const dummyPhotoUrl = `https://placehold.co/150x150/8e2de2/ffffff?text=Foto+Absen`
    setPhotoTaken(dummyPhotoUrl)
    setMessage('Foto berhasil diambil!')
  }

  const handleClockIn = () => {
    if (!photoTaken) {
      alert('Harap ambil foto terlebih dahulu.') // Use custom modal in real app
      return
    }
    if (!selectedShift) {
      alert('Harap pilih shift terlebih dahulu.')
      return
    }

    const now = new Date()
    const clockInTime = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    const attendanceDate = now.toISOString().slice(0, 10) // YYYY-MM-DD

    const newRecord: AttendanceRecord = {
      id: `attendance-${Date.now()}`,
      employeeName: 'Karyawan Dummy', // Replace with actual user data from login
      clockInTime: clockInTime,
      isLate: isLate,
      reason: isLate ? reason : undefined,
      photoUrl: photoTaken,
      date: attendanceDate,
      timestamp: now.getTime(),
      shiftType: selectedShift, // Add shift type to the record
    }

    onClockIn(newRecord)
    setMessage('Absensi berhasil dicatat!')
    setReason('')
    setPhotoTaken(null)
    setIsLate(false) // Reset for next clock-in
  }

  return (
    <div className="card mx-auto max-w-md rounded-lg p-6 shadow-lg">
      <h2 className="text-gradient mb-4 text-center text-2xl font-bold">
        Absensi Karyawan
      </h2>
      <p className="mb-4 text-center text-gray-300">
        Waktu Saat Ini: {currentTime.toLocaleTimeString('id-ID')}
      </p>

      <div className="mb-4">
        <label
          htmlFor="shiftSelect"
          className="mb-1 block text-sm font-medium text-gray-300"
        >
          Pilih Shift:
        </label>
        <select
          id="shiftSelect"
          value={selectedShift}
          onChange={(e) =>
            setSelectedShift(e.target.value as 'morning' | 'night')
          }
          className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
        >
          <option value="morning">Pagi (09:00 - 10:30)</option>
          <option value="night">Malam (17:00 - 18:30)</option>
        </select>
      </div>

      {isLate && (
        <div className="bg-opacity-30 mb-4 rounded-md border border-red-700 bg-red-900 p-3 text-red-300">
          <p className="font-semibold">Anda terlambat!</p>
          <p className="text-sm">
            Jam masuk {selectedShift === 'morning' ? 'pagi' : 'malam'} adalah{' '}
            {selectedShift === 'morning' ? '10:30' : '18:30'} WIB.
          </p>
          <label
            htmlFor="reason"
            className="mt-3 mb-1 block text-sm font-medium text-gray-300"
          >
            Alasan Keterlambatan:
          </label>
          <textarea
            id="reason"
            rows={3}
            className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Jelaskan alasan keterlambatan Anda..."
          ></textarea>
        </div>
      )}

      <div className="mb-6 flex flex-col items-center gap-4">
        {photoTaken ? (
          <img
            src={photoTaken}
            alt="Foto Absen"
            className="h-32 w-32 rounded-full border-2 border-purple-500 object-cover"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-700 text-xs text-gray-400">
            [Image of Placeholder for Photo]
          </div>
        )}
        <Button onClick={handleTakePhoto} className="w-auto px-6 py-2">
          Ambil Foto
        </Button>
      </div>

      <Button
        onClick={handleClockIn}
        disabled={!photoTaken}
        className="text-lg"
      >
        Absen Sekarang
      </Button>

      {message && <p className="mt-4 text-center text-green-400">{message}</p>}
    </div>
  )
}

// Admin Attendance View Component - UPDATED
interface AdminAttendanceViewProps {
  attendanceRecords: AttendanceRecord[]
}

const AdminAttendanceView = ({
  attendanceRecords,
}: AdminAttendanceViewProps) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  ) // Default to today
  const [filteredRecords, setFilteredRecords] = useState<AttendanceRecord[]>([])
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)

  useEffect(() => {
    const recordsForDate = attendanceRecords.filter(
      (record) => record.date === selectedDate
    )
    setFilteredRecords(recordsForDate.sort((a, b) => a.timestamp - b.timestamp)) // Sort by time
  }, [attendanceRecords, selectedDate])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  const handlePhotoClick = (photoUrl: string) => {
    setPreviewPhoto(photoUrl)
  }

  const closePreview = () => {
    setPreviewPhoto(null)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-gradient mb-8 text-center text-4xl font-bold">
        Data Absensi Karyawan
      </h1>

      <div className="mb-6 flex items-center justify-center gap-4">
        <label htmlFor="attendanceDate" className="text-lg text-gray-300">
          Pilih Tanggal:
        </label>
        <input
          type="date"
          id="attendanceDate"
          value={selectedDate}
          onChange={handleDateChange}
          className="rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto rounded-lg bg-gray-800 shadow-lg">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="rounded-tl-lg p-4 text-sm font-semibold text-gray-300">
                Nama Karyawan
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">Shift</th>
              <th className="p-4 text-sm font-semibold text-gray-300">
                Jam Absen
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">
                Status
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">Foto</th>
              <th className="rounded-tr-lg p-4 text-sm font-semibold text-gray-300">
                Alasan (Jika Terlambat)
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-700 transition-colors duration-150 last:border-b-0 hover:bg-gray-700"
                >
                  <td className="p-4 text-gray-200">{record.employeeName}</td>
                  <td className="p-4 text-gray-200">
                    {record.shiftType === 'morning' ? 'Pagi' : 'Malam'}
                  </td>
                  {/* Display Shift */}
                  <td className="p-4 text-gray-200">{record.clockInTime}</td>
                  <td
                    className={`p-4 font-semibold ${record.isLate ? 'text-red-400' : 'text-green-400'}`}
                  >
                    {record.isLate ? 'Terlambat' : 'Tepat Waktu'}
                  </td>
                  <td className="p-4">
                    <img
                      src={record.photoUrl}
                      alt={`Foto Absen ${record.employeeName}`}
                      className="h-12 w-12 cursor-pointer rounded-md object-cover transition-opacity hover:opacity-80"
                      onClick={() => handlePhotoClick(record.photoUrl)}
                    />
                  </td>
                  <td className="p-4 text-gray-200">{record.reason || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  Tidak ada data absensi untuk tanggal ini.
                </td>{' '}
                {/* Updated colspan */}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <div
          className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          onClick={closePreview}
        >
          <div
            className="relative max-h-full max-w-lg overflow-auto rounded-lg bg-gray-900 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-300 hover:text-white"
            >
              &times;
            </button>
            <img
              src={previewPhoto}
              alt="Preview Foto Absen"
              className="max-h-[80vh] max-w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >(() => {
    const dummyRecords: AttendanceRecord[] = []
    const today = new Date()
    const employeeNames = [
      'Budi Santoso',
      'Siti Aminah',
      'Joko Susilo',
      'Dewi Lestari',
      'Agus Salim',
    ]

    for (let i = 0; i < 7; i++) {
      // Generate data for last 7 days
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateString = date.toISOString().slice(0, 10)

      employeeNames.forEach((name) => {
        const shiftType: 'morning' | 'night' =
          Math.random() > 0.5 ? 'morning' : 'night' // Randomly assign shift
        const isLate = Math.random() > 0.5 // 50% chance of being late
        let clockInHour, clockInMinute
        let reason = undefined

        if (shiftType === 'morning') {
          clockInHour = 9
          clockInMinute = 0
          if (isLate) {
            clockInHour = 10
            clockInMinute = 30 + Math.floor(Math.random() * 30) // 10:30 to 10:59
            reason =
              Math.random() > 0.5
                ? 'Terjebak macet pagi'
                : 'Ada urusan mendadak pagi'
          } else {
            clockInMinute = Math.floor(Math.random() * 30) // 09:00 to 09:29
          }
        } else {
          // night shift
          clockInHour = 17
          clockInMinute = 0
          if (isLate) {
            clockInHour = 18
            clockInMinute = 30 + Math.floor(Math.random() * 30) // 18:30 to 18:59
            reason =
              Math.random() > 0.5
                ? 'Terjebak macet malam'
                : 'Ada urusan mendadak malam'
          } else {
            clockInMinute = 0 + Math.floor(Math.random() * 30) // 17:00 to 17:29
          }
        }

        const clockInTime = `${String(clockInHour).padStart(2, '0')}:${String(clockInMinute).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
        const timestamp = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          clockInHour,
          clockInMinute,
          Math.floor(Math.random() * 60)
        ).getTime()

        dummyRecords.push({
          id: `att-${dateString}-${name}-${Math.random()}`,
          employeeName: name,
          clockInTime: clockInTime,
          isLate: isLate,
          reason: reason,
          photoUrl: `https://placehold.co/150x150/8e2de2/ffffff?text=${name.split(' ')[0]}`,
          date: dateString,
          timestamp: timestamp,
          shiftType: shiftType, // Assign the shift type
        })
      })
    }
    return dummyRecords.sort((a, b) => a.timestamp - b.timestamp)
  })

  const addAttendanceRecord = useCallback((newRecord: AttendanceRecord) => {
    setAttendanceRecords((prevRecords) =>
      [...prevRecords, newRecord].sort((a, b) => a.timestamp - b.timestamp)
    )
  }, [])

  const [viewMode, setViewMode] = useState<'employee' | 'admin'>('employee') // Default view

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex justify-center gap-4">
        <button
          onClick={() => setViewMode('employee')}
          className={`rounded-lg px-6 py-3 font-semibold transition-colors duration-200 ${viewMode === 'employee' ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          Absen Karyawan
        </button>
        <button
          onClick={() => setViewMode('admin')}
          className={`rounded-lg px-6 py-3 font-semibold transition-colors duration-200 ${viewMode === 'admin' ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          Lihat Absensi Admin
        </button>
      </div>

      {viewMode === 'employee' ? (
        <EmployeeAttendance onClockIn={addAttendanceRecord} />
      ) : (
        <AdminAttendanceView attendanceRecords={attendanceRecords} />
      )}
    </div>
  )
}

export default Attendance
