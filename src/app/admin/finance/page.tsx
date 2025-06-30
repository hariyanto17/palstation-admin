'use client'
import { useState, useEffect } from 'react'

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

const Finance = () => {
  const [payments] = useState<PaymentData[]>(() => {
    // Generate dummy data for the last 7 days
    const dummyPayments: PaymentData[] = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateString = date.toISOString().slice(0, 10)

      // Dummy cash payment for the day
      const cashAmount = Math.floor(Math.random() * 20 + 1) * 500000 // Random multiple of 500k, up to 10jt
      if (cashAmount > 0) {
        dummyPayments.push({
          id: `dummy-cash-${dateString}-${Math.random()}`,
          date: dateString,
          amount: cashAmount,
          paymentType: 'cash',
          psType: Math.random() > 0.5 ? 'PS4' : 'PS5',
          slotId: Math.floor(Math.random() * 10) + 1,
          timestamp: date.getTime() + Math.floor(Math.random() * 86400000), // Random time within the day
        })
      }

      // Dummy QRIS payment for the day
      const qrisAmount = Math.floor(Math.random() * 15 + 1) * 250000 // Random multiple of 250k, up to 3.75jt
      if (qrisAmount > 0) {
        dummyPayments.push({
          id: `dummy-qris-${dateString}-${Math.random()}`,
          date: dateString,
          amount: qrisAmount,
          paymentType: 'qris',
          psType: Math.random() > 0.5 ? 'PS4' : 'PS5',
          slotId: Math.floor(Math.random() * 10) + 1,
          timestamp: date.getTime() + Math.floor(Math.random() * 86400000),
        })
      }
    }
    return dummyPayments.sort((a, b) => a.timestamp - b.timestamp) // Sort by timestamp
  })

  const [dailyData, setDailyData] = useState<{
    [date: string]: { cash: number; qris: number; total: number }
  }>({})
  const [weeklyTotalCash, setWeeklyTotalCash] = useState(0)
  const [weeklyTotalQris, setWeeklyTotalQris] = useState(0)
  const [weeklyGrandTotal, setWeeklyGrandTotal] = useState(0)

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Normalize to start of day

    const oneWeekAgo = new Date(today)
    oneWeekAgo.setDate(today.getDate() - 6) // Data for today and last 6 days = 7 days

    const aggregatedData: {
      [date: string]: { cash: number; qris: number; total: number }
    } = {}
    let currentWeekCash = 0
    let currentWeekQris = 0

    // Initialize data for the last 7 days (including today)
    for (let i = 0; i < 7; i++) {
      const date = new Date(oneWeekAgo)
      date.setDate(oneWeekAgo.getDate() + i)
      const dateString = date.toISOString().slice(0, 10)
      aggregatedData[dateString] = { cash: 0, qris: 0, total: 0 }
    }

    // Aggregate actual payments within the last 7 days
    payments.forEach((payment) => {
      const paymentDate = new Date(payment.date)
      paymentDate.setHours(0, 0, 0, 0)

      // Check if payment falls within the last 7 days
      if (paymentDate >= oneWeekAgo && paymentDate <= today) {
        if (aggregatedData[payment.date]) {
          if (payment.paymentType === 'cash') {
            aggregatedData[payment.date].cash += payment.amount
            currentWeekCash += payment.amount
          } else if (payment.paymentType === 'qris') {
            aggregatedData[payment.date].qris += payment.amount
            currentWeekQris += payment.amount
          }
          aggregatedData[payment.date].total += payment.amount
        }
      }
    })

    setDailyData(aggregatedData)
    setWeeklyTotalCash(currentWeekCash)
    setWeeklyTotalQris(currentWeekQris)
    setWeeklyGrandTotal(currentWeekCash + currentWeekQris)
  }, [payments]) // Recalculate when payments change

  const sortedDates = Object.keys(dailyData).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-gradient mb-8 text-center text-4xl font-bold">
        Data Pemasukan
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card p-5 text-center">
          <p className="mb-2 text-sm text-gray-400">
            Pemasukan Tunai Minggu Ini
          </p>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(weeklyTotalCash)}
          </p>
        </div>
        <div className="card p-5 text-center">
          <p className="mb-2 text-sm text-gray-400">
            Pemasukan QRIS Minggu Ini
          </p>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(weeklyTotalQris)}
          </p>
        </div>
        <div className="card border-2 border-purple-600 p-5 text-center">
          <p className="mb-2 text-sm text-gray-400">
            Total Pemasukan Minggu Ini
          </p>
          <p className="text-gradient text-3xl font-bold">
            {formatCurrency(weeklyGrandTotal)}
          </p>
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-bold text-gray-200">
        Pemasukan 7 Hari Terakhir
      </h2>

      <div className="overflow-x-auto rounded-lg bg-gray-800 shadow-lg">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="rounded-tl-lg p-4 text-sm font-semibold text-gray-300">
                Tanggal
              </th>
              <th className="p-4 text-sm font-semibold text-gray-300">Tunai</th>
              <th className="p-4 text-sm font-semibold text-gray-300">QRIS</th>
              <th className="rounded-tr-lg p-4 text-sm font-semibold text-gray-300">
                Total Harian
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDates.map((dateString) => {
              const data = dailyData[dateString]
              const displayDate = new Date(dateString).toLocaleDateString(
                'id-ID',
                {
                  weekday: 'short',
                  day: '2-digit',
                  month: 'short',
                }
              )
              return (
                <tr
                  key={dateString}
                  className="border-b border-gray-700 transition-colors duration-150 last:border-b-0 hover:bg-gray-700"
                >
                  <td className="p-4 text-gray-200">{displayDate}</td>
                  <td className="p-4 text-gray-200">
                    {formatCurrency(data.cash)}
                  </td>
                  <td className="p-4 text-gray-200">
                    {formatCurrency(data.qris)}
                  </td>
                  <td className="p-4 font-semibold text-purple-400">
                    {formatCurrency(data.total)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Finance
