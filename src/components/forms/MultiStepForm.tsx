"use client";
import { formSchema, FormValues } from "@/lib/schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import { Form } from "../ui/form";
import JobDetailsStep from "./steps/JobDetailsStep";
import SkillsStep from "./steps/SkillsStep";
import EmergencyContactStep from "./steps/EmergencyContactStep";
import ReviewStep from "./steps/ReviewStep";

import Swal from "sweetalert2";

const steps = [
  { id: "personal", title: "Personal Info", component: PersonalInfoStep },
  { id: "job", title: "Job Details", component: JobDetailsStep },
  { id: "skills", title: "Skills & Preferences", component: SkillsStep },
  {
    id: "emergency",
    title: "Emergency Contact",
    component: EmergencyContactStep,
  },
  { id: "review", title: "Review & Submit", component: ReviewStep },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        dob: undefined,
        profilePicture: undefined,
      },
      jobDetails: {
        department: undefined,
        positionTitle: "",
        startDate: undefined,
        jobType: undefined,
        salary: 0,
        manager: "",
      },
      skills: {
        primarySkills: [],
        experience: {},
        workingHours: { start: "09:00", end: "17:00" },
        remotePreference: 0,
        extraNotes: "",
      },
      emergencyContact: {
        contactName: "",
        relationship: undefined,
        phone: "",
        guardianContact: undefined,
      },
      review: {},
    },
  });

  const CurrentStepComponent = steps[currentStep].component;

  const nextStep = async () => {
    // Map step IDs to form field names
    const stepToFieldMap: Record<string, keyof FormValues> = {
      personal: "personalInfo",
      job: "jobDetails",
      skills: "skills",
      emergency: "emergencyContact",
      review: "review",
    };

    const currentStepId = steps[currentStep].id;
    const fieldToValidate = stepToFieldMap[currentStepId];

    if (!fieldToValidate) {
      console.error("No matching form field for step:", currentStepId);
      return;
    }

    const isValid = await form.trigger(fieldToValidate);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Form submitted:", data);

      await Swal.fire({
        title: "Success!",
        text: "Your form has been submitted successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form and go back to step 1
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error("Form submission error:", error);
      // Show error message
      await Swal.fire({
        title: "Error!",
        text: "There was an error submitting your form",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Progress value={(currentStep + 1) * 20} className="mb-8" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CurrentStepComponent />

          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button type="button" onClick={prevStep}>
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!form.watch("review.confirmation")}
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
