import { z } from "zod";
import { departments, jobTypes } from "./mockData";

// Helper functions
const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;
const isWeekday = (date: Date) => {
  const day = date.getDay();
  return day !== 5 && day !== 6;
};
const isAtLeast18 = (dob: Date) => {
  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  return dob <= minAgeDate;
};

// Shared Schemas
const phoneSchema = z.string().regex(phoneRegex, {
  message: "Invalid phone format (e.g. +1-123-456-7890)",
});

const fileSchema = z
  .instanceof(File, { message: "Please upload a file" })
  .optional()
  .refine((file) => !file || ["image/jpeg", "image/png"].includes(file.type), {
    message: "Only JPEG and PNG files are allowed",
  })
  .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
    message: "File size must be less then 2MB",
  });

// Step 1: Personal Information Schema
const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(1)
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Must contain at least 2 words",
    }),
  email: z.string().email("Invalid email address"),
  phone: phoneSchema,
  dob: z.coerce.date().refine(isAtLeast18, {
    message: "Must be at least 18 years old",
  }),
  profilePicture: fileSchema,
});

// Step 2: Job Details Schema
const jobDetailsSchema = z
  .object({
    department: z.enum(departments, "Please select a department"),

    positionTitle: z.string().min(3, {
      message: "Minimum 3 characters required",
    }),

    startDate: z.coerce.date(),

    jobType: z.enum(jobTypes, "Please select a job type"),

    salary: z.number().positive("Salary must be a positive number"),

    manager: z.string().min(1, "Manager name is required"),
  })
  .superRefine((data, ctx) => {
    // Date validations
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    maxDate.setHours(23, 59, 59, 999);

    if (data.startDate < today) {
      ctx.addIssue({
        code: "custom",
        message: "Cannot be in the past",
        path: ["startDate"],
      });
    }

    if (data.startDate > maxDate) {
      ctx.addIssue({
        code: "custom",
        message: "Cannot be more than 90 days in the future",
        path: ["startDate"],
      });
    }

    // Department-specific validations
    if (
      ["HR", "Finance"].includes(data.department) &&
      !isWeekday(data.startDate)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Start date must be a weekday for HR and Finance departments",
        path: ["startDate"],
      });
    }

    // Salary validations
    if (data.jobType === "Contract") {
      if (data.salary < 50 || data.salary > 150) {
        ctx.addIssue({
          code: "custom",
          message: "Contract salary must be between 50 and 150 ",
          path: ["salary"],
        });
      }
    } else {
      if (data.salary < 30000 || data.salary > 200000) {
        ctx.addIssue({
          code: "custom",
          message: "Salary must be between 30000 and 200000",
          path: ["salary"],
        });
      }
    }
  });

// Step 3: Skills & Preferences

const skillsSchema = z
  .object({
    primarySkills: z
      .array(z.string())
      .min(3, "Select at least 3 primary skills"),

    experience: z.record(z.string(), z.number().min(0).max(50)),

    workingHours: z.object({
      start: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
      end: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
    }),

    remotePreference: z.number().min(0).max(100),
    managerApproved: z.boolean().optional(),
    extraNotes: z.string().max(500, "Maximum 500 characters").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.remotePreference > 50 && !data.managerApproved) {
      ctx.addIssue({
        code: "custom",
        message: "Manager approval is required for remote preference above 50%",
        path: ["managerApproved"],
      });
    }
  });


// Step 4: Emergency Contact Schema

// Main form schema
export const formSchema = z.object({
  personalInfo: personalInfoSchema,
  jobDetails: jobDetailsSchema,
  skills: skillsSchema,
  emergencyContact: emergencyContactSchema,
  review: reviewSchema,
});

// Type exports
export type FormValues = z.infer<typeof formSchema>;
export type Department = (typeof departments)[number];
export type JobType = (typeof jobTypes)[number];
