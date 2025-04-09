import { User, Globe, Phone, FileText, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface PersonalInfoStepProps {
  form: UseFormReturn<any>
  onPrevious: () => void;
  onSubmit: (values: any) => void
}

export function PersonalInfoStep({ form, onPrevious, onSubmit }: PersonalInfoStepProps) {
  return (
    <div className="max-w-3xl mx-auto py-10 mt-10">
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1">
          {/* <CardTitle className="text-2xl font-bold">Personal Information</CardTitle> */}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base">
                        <User className="h-5 w-5 text-muted-foreground" />
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/20 h-11 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base">
                        <User className="h-5 w-5 text-muted-foreground" />
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/20 h-11 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Phone Number
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
                <FormField
                  control={form.control}
                  name="personal_website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                         Personal Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourwebsite.com "
                          type="description"
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
                name="description "
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="account description"
                        type="description"
                        {...field}
                        className="border-border/60 focus-visible:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={onPrevious}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Step
                </Button>

                <Button
                  type="submit"
                  className="flex text-white items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)]"
                >
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
