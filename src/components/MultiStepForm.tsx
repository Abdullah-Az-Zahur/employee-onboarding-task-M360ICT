"use client";
import { formSchema } from "@/lib/schema";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

const steps = [
  { id: "personal", title: "Personal Information" },
  { id: "job", title: "Job Details" },
  { id: "skills", title: "Skills & Preferences" },
  { id: "emergency", title: "Emergency Contact" },
  { id: "review", title: "Review & Submit" },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullname: "",
        email: "",
        phone: "",
        dob: new Date(),
        profilePicture: undefined,
      },
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const nextStep = async () => {
    const stepId = steps[currentStep].id;
    const isValid = await form.trigger(stepId);
    if (isValid) setCurrentStep((prev) => prev);
  };

  const preStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2>Form</h2>
      <Progress value={(currentStep + 1) * 20} className="mb-8" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button type="button" onClick={preStep}>
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
