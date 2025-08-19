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
import { useFormContext } from "react-hook-form";

export default function EmergencyContactStep() {
  const form = useFormContext();
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
    </div>
  );
}
