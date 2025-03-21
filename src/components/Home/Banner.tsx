import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, Phone, Clock } from "lucide-react";

interface UserData {
  user_name: string;
  organization_name: string;
  organization_payment_plane: string;
  organization_payment_duration: string;
  organization_phone: string;
  organization_website: string;
  organization_description: string;
}

export function Banner() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!userData) return null;

  return (
    <div className="bg-gradient-to-b from-background to-secondary/20 p-6">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-primary">
                  Welcome, {userData.user_name}
                </CardTitle>
                <CardDescription className="mt-2 text-lg">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {userData.organization_name}
                  </span>
                </CardDescription>
              </div>
              <div className="space-y-2 text-right">
                <Badge variant="secondary" className="text-lg">
                  {userData.organization_payment_plane}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="capitalize">
                    {userData.organization_payment_duration} Plan
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>{userData.organization_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <a
                  href={userData.organization_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline"
                >
                  {userData.organization_website}
                </a>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-muted-foreground">
                {userData.organization_description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
