'use client'

import Button from '@/components/button'
import { useState, useRef, useEffect, useCallback } from 'react'

interface PlayStationCardProps {
  id: number
  type: 'PS4' | 'PS5'
  initialDurationHours: number
  onPaymentComplete: (payment: PaymentData) => void
}
// Interface for Payment Data
interface PaymentData {
  id: string // Unique ID for each transaction
  date: string // YYYY-MM-DD
  amount: number
  paymentType: 'cash' | 'qris'
  psType: 'PS4' | 'PS5'
  slotId: number
  timestamp: number // For sorting
}

const PlayStationCard = ({
  id,
  type,
  initialDurationHours,
  onPaymentComplete,
}: PlayStationCardProps) => {
  const [status, setStatus] = useState<'off' | 'on'>('off')
  const [runningTimeSeconds, setRunningTimeSeconds] = useState(0)
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState(0)
  const [currentPayment, setCurrentPayment] = useState(0) // Changed from totalPayment to currentPayment for clarity
  const [selectedDuration, setSelectedDuration] = useState<number | 'open'>(
    initialDurationHours === 0 ? 0 : initialDurationHours
  )
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qris'>('cash')

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const hourlyRate = type === 'PS4' ? 50000 : 75000 // Rp 50.000/jam for PS4, Rp 75.000/jam for PS5

  useEffect(() => {
    if (status === 'on') {
      intervalRef.current = setInterval(() => {
        setRunningTimeSeconds((prev) => prev + 1)
        setRemainingTimeSeconds((prev) => {
          if (prev <= 1 && prev !== Infinity) {
            clearInterval(intervalRef.current!)
            setStatus('off')
            // Automatically show payment form when time runs out
            setShowPaymentForm(true)
            return 0
          }
          return prev === Infinity ? Infinity : prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [status])

  useEffect(() => {
    if (runningTimeSeconds === 0 && status === 'off' && !showPaymentForm) {
      // Reset payment only if completely off and not in payment flow
      setCurrentPayment(0)
      return
    }

    const runningMinutes = runningTimeSeconds / 60
    const billedMinutes = Math.ceil(runningMinutes / 5) * 5
    const basePayment = (billedMinutes / 60) * hourlyRate
    const finalPayment = Math.ceil(basePayment / 5000) * 5000
    setCurrentPayment(finalPayment)
  }, [runningTimeSeconds, hourlyRate, status, showPaymentForm])

  const handleTurnOnOff = () => {
    if (status === 'on') {
      // If PS is ON, initiating turn OFF, show payment form
      setShowPaymentForm(true)
      if (intervalRef.current) {
        clearInterval(intervalRef.current) // Stop timer immediately
      }
    } else {
      // If PS is OFF, initiating turn ON
      if (selectedDuration !== 0) {
        setStatus('on')
        setRunningTimeSeconds(0)
        if (selectedDuration === 'open') {
          setRemainingTimeSeconds(Infinity)
        } else {
          setRemainingTimeSeconds(Number(selectedDuration) * 3600)
        }
        setCurrentPayment(0) // Reset current payment when starting new session
      } else {
        alert('Silakan pilih durasi untuk menyalakan PlayStation.')
      }
    }
  }

  const handleConfirmPayment = () => {
    const paymentDate = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    const paymentTimestamp = Date.now()
    const newPayment: PaymentData = {
      id: `${Date.now()}-${id}`,
      date: paymentDate,
      amount: currentPayment,
      paymentType: paymentMethod,
      psType: type,
      slotId: id,
      timestamp: paymentTimestamp,
    }
    onPaymentComplete(newPayment)

    // Reset card state after payment
    setStatus('off')
    setRunningTimeSeconds(0)
    setRemainingTimeSeconds(0)
    setCurrentPayment(0)
    setSelectedDuration(0)
    setShowPaymentForm(false)
    setPaymentMethod('cash') // Reset payment method to default
  }

  const handleCancelPayment = () => {
    // If payment is cancelled, reset state without saving
    setStatus('off')
    setRunningTimeSeconds(0)
    setRemainingTimeSeconds(0)
    setCurrentPayment(0)
    setSelectedDuration(0)
    setShowPaymentForm(false)
    setPaymentMethod('cash')
  }

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds === Infinity) return 'Tak Terbatas'
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return (
    <div className="card flex flex-col justify-between rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-xl">
      <div>
        <h3 className="mb-2 text-xl font-semibold text-white">
          {type} - Slot {id}
        </h3>
        <p
          className={`mb-3 text-sm font-bold ${status === 'on' ? 'text-green-400' : 'text-red-400'}`}
        >
          Status: {status === 'on' ? 'Aktif' : 'Non-aktif'}
        </p>

        <div className="mb-4 space-y-1 text-sm text-gray-300">
          <p>
            Waktu Berjalan:{' '}
            <span className="font-medium">
              {formatTime(runningTimeSeconds)}
            </span>
          </p>
          <p>
            Sisa Waktu:{' '}
            <span className="font-medium">
              {formatTime(remainingTimeSeconds)}
            </span>
          </p>
          <p>
            Pembayaran:{' '}
            <span className="font-medium">
              Rp {currentPayment.toLocaleString('id-ID')}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        {showPaymentForm ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Tipe Pembayaran:</label>
            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value as 'cash' | 'qris')
              }
              className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
            >
              <option value="cash">Tunai</option>
              <option value="qris">QRIS</option>
            </select>
            <label className="text-sm text-gray-300">Uang Diterima:</label>
            <input
              type="text"
              value={`Rp ${currentPayment.toLocaleString('id-ID')}`}
              readOnly
              className="w-full cursor-not-allowed rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200"
            />
            <Button onClick={handleConfirmPayment}>
              Konfirmasi Pembayaran
            </Button>
            <button
              onClick={handleCancelPayment}
              className="w-full rounded-lg border border-red-400 px-4 py-2 text-sm text-red-400 transition duration-200 hover:bg-red-900"
            >
              Batal
            </button>
          </div>
        ) : (
          <>
            {status === 'off' && (
              <select
                value={selectedDuration}
                onChange={(e) =>
                  setSelectedDuration(
                    e.target.value === 'open' ? 'open' : Number(e.target.value)
                  )
                }
                className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-gray-200 focus:border-purple-500 focus:outline-none"
              >
                <option value={0} disabled>
                  Pilih Durasi
                </option>
                <option value="open">Open</option>
                <option value={1 / 60}>1 menit</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Jam
                  </option>
                ))}
              </select>
            )}
            <Button onClick={handleTurnOnOff}>
              {status === 'on' ? 'Matikan' : 'Nyalakan'}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

const HomeComponent = () => {
  const playStations = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? 'PS4' : 'PS5',
    initialDurationHours: 0,
  }))

  const addPayment = useCallback((newPayment: PaymentData) => {
    console.log('newPayment', newPayment)
    // setPayments((prevPayments) =>
    //   [...prevPayments, newPayment].sort((a, b) => a.timestamp - b.timestamp)
    // )
  }, [])

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between">
        <h1 className="text-gradient mb-8 text-center text-3xl font-bold">
          Status PlayStation
        </h1>
        <h1 className="text-gradient mb-8 text-center text-3xl font-bold">
          Hallo: Hari
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {playStations.map((ps) => (
          <PlayStationCard
            key={ps.id}
            id={ps.id}
            type={ps.type as 'PS4' | 'PS5'}
            initialDurationHours={ps.initialDurationHours}
            onPaymentComplete={addPayment}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeComponent
