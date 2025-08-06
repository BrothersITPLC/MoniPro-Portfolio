import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Shield, Zap, Database, Check, Crown } from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedPlane } from "@/components/Landing/LandingSlice"
import { useGetPlansQuery } from "../api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { RootState } from "@/app/store"
import { setOrganization } from "../../Home/company/companySclice"
import type { OrganizationDataInfrence } from "../../Home/company/companySclice"
import { AnimatedBackground } from "./AnimatedBackground"

const icons = [
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
  },
  {
    icon: <Zap className="w-12 h-12 text-primary" />,
  },
  {
    icon: <Database className="w-12 h-12 text-primary" />,
  },
  {
    icon: <Crown className="w-12 h-12 text-primary" />,
  },
];


interface PricingProps {
  showSelectedPlan?: boolean
}

export function Pricing({ showSelectedPlan = false }: PricingProps) {
  const [currentIndex, setCurrentIndex] = useState(2)
  const [isAnimating, setIsAnimating] = useState(false)

  const organizationData = useSelector((state: RootState) => state.companyInfo.organizationData)
  const dispatch = useDispatch()
  const {
    data: plansData,
    isLoading,
    isError,
    refetch,
  } = useGetPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  console.log("those arePlans Data:", plansData)

  const selectedPlan = useSelector((state: RootState) => state.landing.SelectedPlane)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const handlePlanSelect = (planId: number) => {
    dispatch(setSelectedPlane(planId))
    const selectedPlan = sortedPlansData.find((plan) => plan.id === planId)
    const type = selectedPlan?.name.toLowerCase() === "Individual plan".toLowerCase()
    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      is_private: type,
    }
    dispatch(setOrganization(updatedData))
  }

  useEffect(() => {
    refetch()
  }, [])

  const sortedPlansData = plansData
    ? plansData
        .slice()
        .sort((a, b) => a.price - b.price)
        .filter((plan) => !(user?.is_private === false && plan.name.toLowerCase() === "individual plan"))
    : []

  // Set initial index to middle item when data loads
  useEffect(() => {
    if (sortedPlansData.length > 0 && currentIndex === 2) {
      setCurrentIndex(Math.floor(sortedPlansData.length / 2))
    }
  }, [sortedPlansData])

  const nextSlide = () => {
    if (isAnimating || !sortedPlansData?.length) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % sortedPlansData.length)
  }

  const prevSlide = () => {
    if (isAnimating || !sortedPlansData?.length) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + sortedPlansData.length) % sortedPlansData.length)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const absIndex = Math.abs(diff)

    if (absIndex > 2) {
      return {
        transform: `translateX(${diff > 0 ? "400px" : "-400px"}) translateZ(-200px) rotateY(${diff > 0 ? "-45deg" : "45deg"})`,
        opacity: 0,
        zIndex: 1,
      }
    }

    const translateX = diff * 320
    const translateZ = absIndex === 0 ? 0 : -100 - absIndex * 50
    const rotateY = diff * 25
    const scale = absIndex === 0 ? 1 : 0.8 - absIndex * 0.1
    const opacity = absIndex === 0 ? 1 : 0.6 - absIndex * 0.2

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(opacity, 0),
      zIndex: 10 - absIndex,
    }
  }

  if (isLoading || !plansData) {
    return (
      <div className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        <div className="relative z-10 text-center text-foreground">Loading plans...</div>
      </div>
    )
  }

  if (isError || !sortedPlansData || !sortedPlansData.length) {
    return (
      <div className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        <div className="relative z-10 text-center text-red-500">Failed to load plans</div>
      </div>
    )
  }

  return (
    <section
      id="pricing"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Background */}
      <AnimatedBackground />
      {/* Gradient overlays for depth - consistent with Hero and Footer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Pricing & Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Flexible Plans for Every Need</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan that scales with your infrastructure and monitoring requirements.
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[600px] flex items-center justify-center">
          <div
            className="relative w-full h-full"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "center center",
            }}
          >
            {sortedPlansData.map((plan: any, index: number) => {

              const cardStyle = getCardStyle(index)

              return (
                <div
                  key={plan.id}
                  className="absolute  left-1/2 top-1/2 w-90 h-152 -ml-40 -mt-58 transition-all duration-600 ease-out cursor-pointer"
                  style={cardStyle}
                  onClick={() => goToSlide(index)}
                >
                  <Card
                    className={`w-full h-full p-6  bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:scale-[1.02] hover:bg-card/80 group flex flex-col justify-between shadow-2xl hover:shadow-3xl
                       ${
                         selectedPlan === plan.id && showSelectedPlan
                           ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                           : ""
                       }`}
                  >
                    
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {icons[index % icons.length].icon}
                  </div>
                  <CardTitle className="text-foreground text-2xl group-hover:text-primary transition-colors duration-300">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                    <CardContent className="flex-grow flex flex-col justify-between pt-0">
                      <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center text-foreground">
                          <span className="text-5xl font-bold">${plan.price}</span>
                          <span className="ml-2 text-muted-foreground">/month</span>
                        </div>
                        <div className="space-x-2">
                          {plan.deduction?.map((discount: any) => (
                            <Badge
                              key={discount.duration}
                              variant="outline"
                              className="mt-2 bg-primary/10 text-primary border-primary/20"
                            >
                              Save {discount.percentage}% on {discount.duration} plan
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {plan.features?.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center">
                            <Check className="w-5 h-5 text-primary mr-3" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {showSelectedPlan ? (
                        <Button
                          size="lg"
                          className={`w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300 ${
                            selectedPlan === plan.id ? "bg-primary/80" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlanSelect(plan.id)
                          }}
                        >
                          {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                        </Button>
                      ) : isAuthenticated ? (
                        <Button
                          size="lg"
                          className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlanSelect(plan.id)
                          }}
                        >
                          Select Plan
                        </Button>
                      ) : (
                        <Button
                          size="lg"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlanSelect(plan.id)
                          }}
                          className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300"
                          asChild
                        >
                          <Link to="/auth">Get Started</Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-all duration-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-all duration-200 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-2 mt-22">
          {sortedPlansData.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
