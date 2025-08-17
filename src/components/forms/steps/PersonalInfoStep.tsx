import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

export default function PersonalInfoStep() {
  return (
    <div>
      <FormField
        name="personalInfo.fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Please Enter  Your Full Name" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="personalInfo.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Please Enter Your Email" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="personalInfo.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="Please Enter Your Phone Number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="personalInfo.dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input
                type="date"
                placeholder="Please Enter Your Date of Birth"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="personalInfo.profilePicture"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Picture</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    field.onChange(e.target.files[0]);
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
