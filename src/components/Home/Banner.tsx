import { useSelector } from "react-redux";
import { Building2, Globe, Phone, Clock, AlertCircle } from "lucide-react";
import { RootState } from "@/app/store";

export function Banner() {
  // Simulated user data
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="ml-3 text-red-700">
            Unable to load user data. Please try refreshing the page.    
          </p>
        </div>
      </div>
    );
  }

  return (

      <div className="container mx-auto space-y-8">
        <div className="rounded-xl shadow-lg border-2  overflow-hidden">
          <div className="p-6">
            <div className="flex  justify-between flex-wrap gap-4">

              <div>
                <h1 className="text-3xl font-bold text-[var(--secondary)]">
                  Welcome, {user.user_name}
                </h1>
                <div className="mt-2 text-lg flex items-center gap-2 text-gray-600">
                  <Building2 className="h-5 w-5 text-[var(--secondary)] " />
                  <p>
                    <span className="dark:text-white">{user.organization_name}</span>
                  </p>

                </div>
              </div>
              <div className="space-y-2 text-right">
                <span className="inline-block px-4 py-1.5 bg-[var(--acent)] text-[var(--secondary)] rounded-full text-lg font-medium dark:border-2 dark:bg-black dark:text-white">
                  {user.organization_payment_plan}
                </span>
                <div className="flex items-center gap-2 text-gray-500 justify-end ">
                  <Clock className="h-4 w-4 dark:text-[var(--secondary)]" />
                  <span className="capitalize dark:text-white">
                    {user.organization_payment_duration} Subscription
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 bg-[var(--light)]  p-3 rounded-lg dark:border-2  dark:bg-black ">
                <Phone className="h-5 w-5 text-[var(--secondary)] dark:text-[var(--secondary)]" />
                <span className="text-gray-700 dark:text-white dark:text-white">{user.organization_phone}</span>
              </div>
              <div className="flex items-center gap-3 bg-[var(--light)] p-3 rounded-lg  dark:border-2  dark:bg-black ">
                <Globe className="h-5 w-5 text-[var(--secondary)]  dark:text-[var(--secondary)]" />
                <a
                  href={user.organization_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--secondary)] dark:text-[var(--secondary)] hover:text-[var(--secondary)] hover:underline dark:text-white"
                >
                  {user.organization_website}
                </a>
              </div>
            </div>
            <div className="bg-[var(--light)] rounded-lg p-4  dark:border-2  dark:bg-black">
              <p className="text-gray-600 leading-relaxed dark:text-[var(--secondary)] dark:text-white">
                {user.organization_description}
              </p>
            </div>

          </div>
        </div>
      </div>
  
  );
}

