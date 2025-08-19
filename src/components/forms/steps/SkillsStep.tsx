"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { skillsByDepartment } from "@/lib/mockData";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

type Department = keyof typeof skillsByDepartment;

export default function SkillsStep() {
  const form = useFormContext();
  const department = useWatch({
    control: form.control,
    name: "jobDetails.department",
  }) as Department | undefined;
  const remotePreference = useWatch({
    control: form.control,
    name: "skills.remotePreference",
  });

  const skills = department ? skillsByDepartment[department] || [] : [];

  return (
    <div className="space-y-6">
      {/* Primary Skills (choose at least 3 using checkboxes) */}
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

      {/* Preferred Working Hours (time range: start - end)
       */}

      <FormField
        control={form.control}
        name="skills.experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Experience for Selected Skills (years)</FormLabel>
            <div className="space-y-4 mt-2">
              {form.watch("skills.primarySkills")?.map((skill: string) => (
                <FormField
                  key={skill}
                  control={form.control}
                  name={`skills.experience.${skill}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>{skill}</FormLabel>
                        <div className="flex items-center w-1/2 gap-4">
                          <FormControl>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              className="w-full p-2 border rounded"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <span>years</span>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FormItem>
        )}
      />

      {/* Remote Work Preference (slider 0% to 100%) */}
      <FormField
        control={form.control}
        name="skills.remotePreference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Remote Work Preference: {field.value}%</FormLabel>
            <FormControl>
              <Slider
                defaultValue={[field.value]}
                max={100}
                step={10}
                onValueChange={(vals) => field.onChange(vals[0])}
                className="mt-4"
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Manager Approved */}
      {remotePreference > 50 && (
        <FormField
          control={form.control}
          name="skills.managerApproved"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Manager Approved Remote Work</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Extra Notes (optional, max 500 characters) */}
      <FormField
        control={form.control}
        name="skills.extraNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any special requirements or preferences..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
