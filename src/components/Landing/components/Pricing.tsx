import { Shield, Zap, Database, Check, Crown } from "lucide-react";
// import { Shield, Zap, Database, Check, Crown, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlane } from "@/components/Landing/LandingSlice";
import { useGetPlansQuery } from "../api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";

import { setOrganization } from "../../Home/company/companySclice";
import type { OrganizationDataInfrence } from "../../Home/company/companySclice";

import { motion } from "framer-motion";

type Position = "center" | "left1" | "left" | "right" | "right1";

// Define the type for the image variants
type ImageVariants = {
  [key in Position]: {
    x: string;
    scale: number;
    zIndex: number;
  };
};

const icons = [
  {
    icon: <Shield className="w-12 h-12 text-[var(--primary)]" />,
  },
  {
    icon: <Zap className="w-12 h-12 text-[var(--primary)]" />,
  },
  {
    icon: <Database className="w-12 h-12 text-[var(--primary)]" />,
  },
  {
    icon: <Crown className="w-12 h-12 text-[var(--primary)]" />,
  },
];

interface PricingProps {
  showSelectedPlan?: boolean;
}

export function Pricing({ showSelectedPlan = false }: PricingProps) {
  // Type the state as an array of numbers
  const [positionIndexes, setPositionIndexes] = useState<number[]>([
    0, 1, 2, 3, 4,
  ]);

  const handleNext = (): void => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5
      );
      return updatedIndexes;
    });
  };

  const handleBack = (): void => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 4) % 5
      );
      return updatedIndexes;
    });
  };

  // Type the positions array
  const positions: Position[] = ["center", "left1", "left", "right", "right1"];

  // Type the imageVariants object
  const imageVariants: ImageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3 },
    left: { x: "-90%", scale: 0.5, zIndex: 2 },
    right: { x: "90%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 3 },
  };

  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );

  const dispatch = useDispatch();
  const {
    data: plansData,
    isLoading,
    refetch,
  } = useGetPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handlePlanSelect = (planId: number) => {
    dispatch(setSelectedPlane(planId));

    const selectedPlan = sortedPlansData.find((plan) => plan.id === planId);

    const type =
      selectedPlan?.name.toLowerCase() === "Individual plan".toLowerCase();

    console.log("selected plan: ", selectedPlan);
    console.log("type: ", type);

    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      is_private: type,
    };

    dispatch(setOrganization(updatedData));
    console.log("updated data: ", updatedData);
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || !plansData) {
    return <div className="text-center py-12 text-white">Loading plans...</div>;
  }

  const sortedPlansData = plansData.slice().sort((a, b) => a.price - b.price);

  return (
    <div
      id="pricing"
      className="py-20 border-b-[1px] justify-center overflow-hidden dark:border-b-slate-700"
    >
      <div className="max-w-max mx-auto">
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-white">
          Flexible Plans <br />
          for Every Need
        </h2>

        <div className="flex flex-row justify-center gap-8">
          {sortedPlansData
            .filter(
              (plan) =>
                !(
                  user?.is_private === false &&
                  plan.name.toLowerCase() === "individual plan"
                )
            )
            .map((plan, index) => (
              <motion.div
                key={index}
                className="rounded-[12px] shadow-lg"
                initial="center"
                animate={positions[positionIndexes[index]]}
                variants={imageVariants}
                transition={{ duration: 0.5 }}
                style={{ width: "30%", position: "absolute" }}
              >
                <Card
                  key={plan.id}
                  className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl border border-purple-500/20 transition-all duration-300 hover:scale-105  
                  ${
                    selectedPlan === plan.id && showSelectedPlan
                      ? "ring-2 ring-[var(--primary)]"
                      : ""
                  }
                  ${
                    !showSelectedPlan ? "hover:border-[var(--secondary)]" : ""
                  }`}
                  style={{
                    height: "80%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="relative pt-4">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        {icons[index % icons.length].icon}
                      </div>
                      <CardTitle className="text-white group-hover:text-purple-300 transition-colors duration-300">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-white group-hover:text-gray-300 transition-colors duration-300">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                  </div>

                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center text-white">
                        <span className="text-4xl font-bold">
                          ${plan.price}
                        </span>
                        <span className="ml-2">/month</span>
                      </div>
                      <div className="space-y-2 mt-4">
                        {plan.deduction.map((discount) => (
                          <Badge
                            key={discount.duration}
                            variant="secondary"
                            className="mr-2 bg-[var(--acent)] text-[var(--primary)] dark:bg-[var(--acent)]/30"
                          >
                            Save {discount.percentage}% on {discount.duration}{" "}
                            plan
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-[var(--primary)] mr-3" />
                          <span className="text-sm text-white">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {showSelectedPlan ? (
                      <Button
                        className={`w-full mt-6 bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all transform hover:scale-105 ${
                          selectedPlan === plan.id
                            ? "bg-[var(--secondary)]"
                            : ""
                        }`}
                        onClick={() => handlePlanSelect(plan.id)}
                      >
                        {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                      </Button>
                    ) : isAuthenticated ? (
                      <Button
                        className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all transform hover:scale-105"
                        onClick={() => handlePlanSelect(plan.id)}
                      >
                        Select Plan
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePlanSelect(plan.id)}
                        className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all transform hover:scale-105"
                        asChild
                      >
                        <Link to="/auth">Get Started</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>

        <div className="flex flex-row justify-between mt-150">
          <button
            className="text-white bg-indigo-400 rounded-md py-2 px-4"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="text-white bg-indigo-400 rounded-md py-2 px-4"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
