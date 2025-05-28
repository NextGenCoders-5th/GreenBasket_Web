"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wallet, ArrowUpRight, Clock, DollarSign, Download } from "lucide-react"

interface VendorBalanceProps {
  id: string
  updatedAt: string
  createdAt: string
  total_earnings: number
  available_balance: number
  withdrawn_amount: number
  pending_withdrawals: number
  vendorId: string
}

export default function VendorBalanceCard({
  total_earnings,
  available_balance,
  withdrawn_amount,
  pending_withdrawals,
}: VendorBalanceProps) {
  // Format currency in ETB (Ethiopian Birr)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate percentage of available balance from total earnings
  const availablePercentage = total_earnings > 0 ? (available_balance / total_earnings) * 100 : 0

  // Calculate percentage of withdrawn amount from total earnings
  const withdrawnPercentage = total_earnings > 0 ? (withdrawn_amount / total_earnings) * 100 : 0

  // Format last updated date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-accent-500 to-accent-600 text-white pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Vendor Balance
          </CardTitle>
          <Button size="sm" variant="ghost" className="text-white hover:bg-accent-500 hover:text-white">
            <Download className="h-4 w-4 mr-1" />
            Statement
          </Button>
        </div>
        <div className="mt-4">
          <div className="text-sm text-blue-100">Total Earnings</div>
          <div className="text-3xl font-bold mt-1">{formatCurrency(total_earnings)}</div>
        </div>
      </CardHeader>

      <div className="relative">
        <div className="absolute -top-6 left-6 right-6">
          <Card className="border shadow-md bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Available Balance</div>
                  <div className="text-2xl font-bold text-accent-600">{formatCurrency(available_balance)}</div>
                </div>
                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-accent-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CardContent className="pt-16 pb-6 px-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Withdrawn Amount</span>
              </div>
              <span className="text-sm font-semibold">{formatCurrency(withdrawn_amount)}</span>
            </div>
            <Progress value={withdrawnPercentage} className="h-2 bg-gray-100" style={{ backgroundColor: 'green' }} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Pending Withdrawals</span>
              </div>
              <span className="text-sm font-semibold">{formatCurrency(pending_withdrawals)}</span>
            </div>
            <Progress
              value={pending_withdrawals > 0 ? (pending_withdrawals / total_earnings) * 100 : 0}
              className="h-2 bg-gray-100"
              style={{
                backgroundColor: 'orange',
              }}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Balance Distribution</div>
            <div className="text-xs text-gray-400">Last updated: {formatDate(new Date().toISOString())}</div>
          </div>

          <div className="h-8 w-full rounded-full overflow-hidden bg-gray-100 flex">
            <div
              className="bg-accent-500 h-full"
              style={{ width: `${availablePercentage}%` }}
              title={`Available: ${formatCurrency(available_balance)}`}
            ></div>
            <div
              className="bg-green-500 h-full"
              style={{ width: `${withdrawnPercentage}%` }}
              title={`Withdrawn: ${formatCurrency(withdrawn_amount)}`}
            ></div>
            <div
              className="bg-amber-500 h-full"
              style={{ width: `${pending_withdrawals > 0 ? (pending_withdrawals / total_earnings) * 100 : 0}%` }}
              title={`Pending: ${formatCurrency(pending_withdrawals)}`}
            ></div>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-accent-500"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>Withdrawn</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center pt-2">
          <Button className="bg-accent-500 hover:bg-accent-600 text-white">Withdraw Funds</Button>
        </div> */}
      </CardContent>
    </Card>
  )
}
