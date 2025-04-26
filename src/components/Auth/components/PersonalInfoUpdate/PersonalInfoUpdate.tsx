import { Card } from "@/components/ui/card";
import { OrganizationAdminGeneralInfoUpdate } from "@/components/Auth/components/PersonalInfoUpdate/OrganizationAdminGeneralInfoUpdate";
import { PasswordUpdate } from "@/components/Auth/components/PersonalInfoUpdate/PasswordUpdate";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { GeneralInfoUpdate } from "@/components/Auth/components/PersonalInfoUpdate/GeneralInfoUpdate";

export function PersonalInfoUpdate() {
  const organizationData = useSelector((state: RootState) => state.auth.user);
  console.log(organizationData);
  const [activeTab, setActiveTab] = useState<"general" | "password">("general");

  return (
    <div className="container ml-10 pb-10 ">
      <Card className="border-[var(--accent)] shadow-md overflow-hidden dark:border-2 dark:bg-[var(--black)] dark:text-[var(--white)]">
        <div className="flex border-b border-[var(--accent)]">
          <button
            onClick={() => setActiveTab("general")}
            className={`py-4 px-6 font-medium text-base transition-colors ${
              activeTab === "general"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--border-dark)]"
            }`}
          >
            General Information
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`py-4 px-6 font-medium text-base transition-colors ${
              activeTab === "password"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--border-dark)]"
            }`}
          >
            Password Settings
          </button>
        </div>

        <div className="p-0">
          {activeTab === "general" ? (
            !organizationData?.is_private && organizationData?.is_admin ? (
              <OrganizationAdminGeneralInfoUpdate />
            ) : (
              <GeneralInfoUpdate />
            )
          ) : (
            <PasswordUpdate />
          )}
        </div>
      </Card>
    </div>
  );
}
