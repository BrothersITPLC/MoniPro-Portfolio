"use client"

import { Building2, User } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

interface PlanSelectionStepProps {
  selectedPlanType: "false" | "true"
  setSelectedPlanType: (planType: "false" | "true") => void
  onNext: () => void
}

export function PlanSelectionStep({ selectedPlanType, setSelectedPlanType, onNext }: PlanSelectionStepProps) {
  return (
    <div className="max-w-3xl mx-auto py-10 mt-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Select Plan Type</h2>
        <p className="text-muted-foreground mt-2">Choose the type of plan that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card
          className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedPlanType === "false"
              ? "ring-2 ring-[var(--secondary)] bg-red-50"
              : "hover:border-[var(--secondary)]"
          }`}
          onClick={() => setSelectedPlanType("false")}
        >
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-lg">
                <Building2 className="w-8 h-8 text-[var(--secondary)]" />
              </div>
              <h3 className="text-xl font-semibold">Company Plan</h3>
            </div>
            <p className="text-muted-foreground">For businesses and organizations with multiple users</p>
            {selectedPlanType === "false" && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="w-6 h-6 text-[var(--secondary)]" />
              </div>
            )}
          </div>
        </Card>

        <Card
          className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedPlanType === "true"
              ? "ring-2 ring-[var(--secondary)] bg-red-50"
              : "hover:border-[var(--secondary)]"
          }`}
          onClick={() => setSelectedPlanType("true")}
        >
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-lg">
                <User className="w-8 h-8 text-[var(--secondary)]" />
              </div>
              <h3 className="text-xl font-semibold">Individual Plan</h3>
            </div>
            <p className="text-muted-foreground">For personal use with a single subscription</p>
            {selectedPlanType === "true" && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="w-6 h-6 text-[var(--secondary)]" />
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={onNext}
          disabled={!selectedPlanType}
          className="flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)] text-white"
        >
          Next Step
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
