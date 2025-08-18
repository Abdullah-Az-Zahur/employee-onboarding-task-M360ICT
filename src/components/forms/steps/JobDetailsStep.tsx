import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments } from "@/lib/mockData";
import React from "react";

export default function JobDetailsStep() {
  return (
    <div>
      <FormField
        name="jobDetails.department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {/* Position Title */}

      <FormField
        name="jobDetails.jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Type</FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
}
