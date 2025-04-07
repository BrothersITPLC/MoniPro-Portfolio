import { Building2, Globe, Phone, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface CompanyInfoStepProps {
  form: UseFormReturn<any>
  onSubmit: (values: any) => void
}

export function CompanyInfoStep({ form, onSubmit }: CompanyInfoStepProps) {
  return (
    <div className="max-w-3xl mx-auto py-10 mt-10">
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1">
          {/* <CardTitle className="text-2xl font-bold">Company Information</CardTitle> */}
          
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="organization_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization name"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/20 h-11 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Apply the same changes to other form fields */}
                <FormField
                  control={form.control}
                  name="organization_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Company Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 09123456789"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="organization_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      Company Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://yourcompany.com"
                        {...field}
                        className="border-border/60 focus-visible:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Company Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your company, products, and services..."
                        className="min-h-[120px] border-border/60 focus-visible:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2 flex justify-end">
                <Button type="submit"  className="flex text-white items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)]">
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

