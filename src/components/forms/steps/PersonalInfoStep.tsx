import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

export default function PersonalInfoStep() {
  return (
    <div>
      <FormField
        name="personalInfo.fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Please Enter  Your Full Name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
