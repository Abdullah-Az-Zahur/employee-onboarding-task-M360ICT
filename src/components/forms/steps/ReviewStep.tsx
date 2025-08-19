import React from "react";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export default function ReviewStep() {
  const form = useFormContext();
  const formData = form.watch();

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p>{formData.personalInfo.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{formData.personalInfo.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p>{formData.personalInfo.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date of Birth</p>
            <p>
              {formData.personalInfo.dob
                ? format(new Date(formData.personalInfo.dob), "PPP")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Job Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Department</p>
            <p>{formData.jobDetails.department}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Position Title</p>
            <p>{formData.jobDetails.positionTitle}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p>
              {formData.jobDetails.startDate
                ? format(new Date(formData.jobDetails.startDate), "PPP")
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Job Type</p>
            <p>{formData.jobDetails.jobType}</p>
          </div>
        </div>
      </div>

      {/* Skills & Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Skills & Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary Skills */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Primary Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {formData.skills.primarySkills?.length > 0 ? (
                formData.skills.primarySkills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-muted rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm">N/A</p>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Experience
            </p>
            {Object.keys(formData.skills.experience || {}).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(formData.skills.experience || {}).map(
                  ([skill, years]) => {
                    // Assert the type of years
                    const yearsValue = years as number;

                    return (
                      <div
                        key={skill}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm">{skill}</span>
                        <span className="text-sm font-medium">
                          {yearsValue} {yearsValue === 1 ? "year" : "years"}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <p className="text-sm">N/A</p>
            )}
          </div>

          {/* Working Hours */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Working Hours
            </p>
            <p className="text-sm">
              {formData.skills.workingHours?.start} -{" "}
              {formData.skills.workingHours?.end}
            </p>
          </div>

          {/* Remote Preference */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Remote Preference
            </p>
            <div className="flex items-center gap-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${formData.skills.remotePreference}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {formData.skills.remotePreference}%
              </span>
            </div>
            {formData.skills.remotePreference > 50 && (
              <p className="text-xs text-muted-foreground mt-1">
                {formData.skills.managerApproved
                  ? "✓ Manager approved"
                  : "Manager approval required"}
              </p>
            )}
          </div>

          {/* Extra Notes */}
          {formData.skills.extraNotes && (
            <div className="md:col-span-2 space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Additional Notes
              </p>
              <p className="text-sm whitespace-pre-line">
                {formData.skills.extraNotes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Emergency Contact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Contact Name</p>
            <p>{formData.emergencyContact.contactName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Relationship</p>
            <p>{formData.emergencyContact.relationship}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p>{formData.emergencyContact.phone}</p>
          </div>
          {formData.emergencyContact.guardianContact && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">Guardian Name</p>
                <p>{formData.emergencyContact.guardianContact.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Guardian Phone</p>
                <p>{formData.emergencyContact.guardianContact.phone}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <FormField
        control={form.control}
        name="review.confirmation"
        render={({ field }) => (
          <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I confirm that all information provided is accurate
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
