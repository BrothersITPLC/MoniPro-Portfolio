import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { useGetPlansQuery } from "@/components/Landing/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Calendar, CheckCircle2, ArrowRight, RefreshCcw, Clock } from "lucide-react"
import { useNavigate } from 'react-router-dom';


export function UpdateSubscription() {
  const navigate = useNavigate(); // Move inside component
  const selectedPlan = useSelector((state: RootState) => state.landing.SelectedPlane)

  const { data: plansData } = useGetPlansQuery()
  const currentPlan = plansData?.find((plan) => plan.id === selectedPlan)

  return (
    <div className="container mx-auto p-6 space-y-8">
      {selectedPlan !== 4 && (
        <Card className="overflow-hidden border-[#ddd6fe] shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="h-2 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]" />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold text-[#7c3aed]">Current Subscription</CardTitle>
                <CardDescription className="text-[#8b5cf6]">
                  Review and manage your current subscription plan
                </CardDescription>
              </div>
              <Badge className="bg-[#ddd6fe] text-[#7c3aed] hover:bg-[#f5f3ff]">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="p-4 rounded-lg bg-[#f5f3ff] border border-[#ddd6fe]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#7c3aed] text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#7c3aed]">{currentPlan?.name || "No Plan Selected"}</h3>
                    <p className="text-sm text-[#8b5cf6] font-medium">${currentPlan?.price}/month</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right text-sm text-[#8b5cf6]">
                    <p>Next billing date</p>
                    <p className="font-medium">May 15, 2025</p>
                  </div>
                  <CreditCard className="h-5 w-5 text-[#7c3aed]" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Button onClick={() => navigate('/home/update_pricingcycle')} className="bg-[#7c3aed] hover:bg-[#8b5cf6] text-white gap-2">
              Change Plan
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card className="overflow-hidden border-[#ddd6fe] shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="h-2 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]" />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold text-[#7c3aed]">Billing Cycle</CardTitle>
              <CardDescription className="text-[#8b5cf6]">Update your billing duration to save more</CardDescription>
            </div>
            <div className="p-2 rounded-full bg-[#f5f3ff] border border-[#ddd6fe]">
              <Calendar className="h-5 w-5 text-[#7c3aed]" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-[#f5f3ff] border border-[#ddd6fe]">
              <div className="p-2 rounded-full bg-[#ddd6fe]">
                <Clock className="h-5 w-5 text-[#7c3aed]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-[#7c3aed]">Current: Monthly Billing</h3>
                <p className="text-sm text-[#8b5cf6]">You are billed every month</p>
              </div>
            </div>

            <Separator className="bg-[#ddd6fe]" />

            <div className="flex items-center gap-4 p-4 rounded-lg border border-dashed border-[#ddd6fe] hover:bg-[#f5f3ff] transition-colors cursor-pointer">
              <div className="p-2 rounded-full bg-[#ddd6fe]">
                <RefreshCcw className="h-5 w-5 text-[#7c3aed]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-[#7c3aed]">Switch to Annual Billing</h3>
                <p className="text-sm text-[#8b5cf6]">Save 20% with annual billing</p>
              </div>
              <Badge className="bg-[#7c3aed]">Save 20%</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-2">
                    <Button onClick={() => navigate('/home/update_billingcycle')} className="bg-[#7c3aed] hover:bg-[#8b5cf6] text-white gap-2">
                      Update Billing Cycle
                      <ArrowRight className="h-4 w-4" />
                    </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
