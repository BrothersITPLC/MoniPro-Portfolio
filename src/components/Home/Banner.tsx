import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, Phone, Clock, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Banner() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Unable to load user data. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="from-background to-secondary/20 p-6">
      <div className="space-y-8">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-primary">
                  Welcome, {user.user_name}
                </CardTitle>
                <CardDescription className="mt-2 text-lg">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {user.organization_name}
                  </span>
                </CardDescription>
              </div>
              <div className="space-y-2 text-right">
                <Badge variant="secondary" className="text-lg">
                  {user.organization_payment_plane}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="capitalize">
                    {user.organization_payment_duration} Subscription
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>{user.organization_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <a
                  href={user.organization_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline"
                >
                  {user.organization_website}
                </a>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-muted-foreground">
                {user.organization_description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
