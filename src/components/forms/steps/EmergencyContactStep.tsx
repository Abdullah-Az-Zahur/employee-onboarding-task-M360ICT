import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { relationships } from "@/lib/mockData";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function EmergencyContactStep() {
  const form = useFormContext();
  const dob = useWatch({ control: form.control, name: "personalInfo.dob" });

  const age = dob ? new Date().getFullYear() - new Date(dob).getFullYear() : 0;
  const needGuardian = age < 21;

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <FormField
        control={form.control}
        name="emergencyContact.contactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Contact Name</FormLabel>
            <FormControl>
              <Input placeholder="Full Name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Relationship */}
      <FormField
        control={form.control}
        name="emergencyContact.relationship"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relationship</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Relationship" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {relationships.map((rel) => (
                  <SelectItem key={rel} value={rel}>
                    {" "}
                    {rel}{" "}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Phone Number */}
      <FormField
        control={form.control}
        name="emergencyContact.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Phone Number" type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Guardian Information (Required for under 21) */}

      {needGuardian && (
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">
            {" "}
            Guardian Information (Required for under 21)
          </h4>
          {/* Guardian Name */}
          <FormField
            control={form.control}
            name="emergencyContact.guardianContact.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Name</FormLabel>
                <FormControl>
                  <Input placeholder="Guardian Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Guardian Phone Number */}
          <FormField
            control={form.control}
            name="emergencyContact.guardianContact.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guardian Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Guardian Phone Number"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}
