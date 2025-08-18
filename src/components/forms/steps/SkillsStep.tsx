"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { skillsByDepartment } from "@/lib/mockData";
import React from "react";
import { useWatch } from "react-hook-form";

type Department = keyof typeof skillsByDepartment;

export default function SkillsStep({ form }: { form: any }) {
  const department = useWatch({
    control: form.control,
    name: "jobDetails.department",
  }) as Department | undefined;

  const skills = department ? skillsByDepartment[department] || [] : [];

  return (
    <div className="space-y-6">
      {/* Primary Skills */}
      <FormField
        control={form.control}
        name="skills.primarySkills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Skills (Select at least 3)</FormLabel>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {skills.map((skill) => (
                <FormField
                  key={skill}
                  control={form.control}
                  name="skills.primarySkills"
                  render={({ field: { value = [], onChange } }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={value.includes(skill)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? onChange([...value, skill])
                              : onChange(
                                  value.filter((v: string) => v !== skill)
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{skill}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
