import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departments, mockManagers } from "@/lib/mockData";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function JobDetailsStep() {
  const form = useFormContext();
  const department = useWatch({
    control: form.control,
    name: "jobDetails.department",
  });

  const jobType = useWatch({
    control: form.control,
    name: "jobDetails.jobType",
  });

  const filteredManagers = mockManagers.filter(
    (m) => m.department === department
  );

  return (
    <div className="space-y-4">
      {/* Department Selection */}
      <FormField
        control={form.control}
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
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Position Title */}
      <FormField
        control={form.control}
        name="jobDetails.positionTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position Title</FormLabel>
            <FormControl>
              <Input placeholder="Position" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Start Date */}
      <FormField
        control={form.control}
        name="jobDetails.startDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <Input type="date" placeholder="YYYY-MM-DD" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Job Type */}
      <FormField
        control={form.control}
        name="jobDetails.jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                {["Full-time", "Part-time", "Contract"].map((type) => (
                  <FormItem key={type} className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value={type} />
                    </FormControl>
                    <FormLabel>{type}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Salary */}
      <FormField
        control={form.control}
        name="jobDetails.salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {jobType === "Contract"
                ? "Hourly Rate ($50-$150)"
                : "Annual Salary ($30k-$200k)"}
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter Salary"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Manager */}
      <FormField
        control={form.control}
        name="jobDetails.manager"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Manager</FormLabel>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Manager" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {filteredManagers.map((manager) => (
                  <SelectItem key={manager.id} value={manager.id}>
                    {manager.name}
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
