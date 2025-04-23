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
    <div className="container ml-10 pb-10">
      <Card className="border-[var(--accent)] shadow-md overflow-hidden">
        <div className="flex border-b border-[var(--accent)]">
          <button
            onClick={() => setActiveTab("general")}
            className={`py-4 px-6 font-medium text-base transition-colors ${
              activeTab === "general"
                ? "bg-[var(--light)] text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            General Information
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`py-4 px-6 font-medium text-base transition-colors ${
              activeTab === "password"
                ? "bg-[var(--light)] text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-gray-600 hover:bg-gray-50"
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

//   {
//     "user_id": 1,
//     "user_name": "Aman Card",
//     "user_email": "amancard6@gmail.com",
//     "first_name": "Aman",
//     "last_name": "Card",
//     "phone": "0999999999",
//     "is_private": false,
//     "is_admin": true,
//     "organization_info_completed": true,
//     "user_have_zabbix_credentials": false,
//     "user_have_zabbix_user": false,
//     "organization_id": 1,
//     "organization_name": "Brothers IT PLC",
//     "organization_phone": "0999999999",
//     "organization_website": "https://chat.deepseek.com/",
//     "organization_description": "hi",
//     "organization_payment_plan": "Basic Plan",
//     "organization_payment_duration": "yearly"
// }

// {
//     "user_id": 4,
//     "user_name": "",
//     "user_email": "lonima5380@f5url.com",
//     "first_name": null,
//     "last_name": null,
//     "phone": "0777345678",
//     "profile_picture": "http://localhost:8000/media/profile_pictures/new_company_1_lonima5380f5url.com_20250422115324.jpg",
//     "is_private": false,
//     "is_admin": false,
//     "organization_info_completed": true,
//     "user_have_zabbix_credentials": true,
//     "user_have_zabbix_user": true,
//     "organization_id": 3,
//     "organization_name": "new company 1",
//     "organization_phone": "0777345678",
//     "organization_website": "https://chat.deepseek.com/",
//     "organization_description": "it is daynamic company",
//     "organization_payment_plan": "Basic Plan",
//     "organization_payment_duration": "yearly"
// }
