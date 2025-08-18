import { z } from "zod";

const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

// Step 1: Personal Information Schema
const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(1)
    .refine(
      (val) => val.split(" ").length >= 2,
      "Must contain at least 2 words"
    ),
  email: z.string().email(),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone format (e.g. +1-123-456-7890)"),
  dob: z.date().refine((dob) => {
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return dob <= minAgeDate;
  }, "Must be at least 18 years old"),
  profilePicture: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
      "Only JPEG and PNG files are allowed"
    )
    .refine(
      (file) => !file || file.size <= 2 * 1024 * 1024,
      "File size must be less than 2MB"
    ),
});

// Step 2: Job Details Schema
const jobDetailsSchema = z.object({
  department: z.enum(["HR", "Engineering", "Sales", "HR", "Finance"]),
});

export const formSchema = z.object({
  personalInfo: personalInfoSchema,
  jobDetails: jobDetailsSchema,
});
