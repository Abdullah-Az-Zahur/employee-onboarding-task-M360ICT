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
    },
  });

  const CurrentStepComponent = steps[currentStep].component;

  const nextStep = async () => {
    const stepId = steps[currentStep].id;
    const isValid = await form.trigger(stepId as any);
    if (isValid) setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Progress value={(currentStep + 1) * 20} className="mb-8" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CurrentStepComponent form={form} />

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
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
