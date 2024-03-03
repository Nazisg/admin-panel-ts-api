import * as z from "zod";

export const createEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required" }),
  lastName: z.string().min(1, { message: "Lastname is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  mail: z
    .string()
    .email({ message: "Must be a valid email" })
    .min(1, { message: "Email is required" })
    .refine((value) => value.endsWith("@crocusoft.com"), {
      message: "Email must end with @crocusoft.com",
    }),
  teamId: z.number(),
  role: z.number(),
});

export const createTeamSchema = z.object({
  teamName: z.string().min(1, { message: "Team name is required" }),
});

export const resetEmployeeSchema = z.object({
  password: z.string(),
  newConfirimPassword: z.string(),
});

export const updateEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: "Firstname is required" }),
  lastName: z.string().min(1, { message: "Lastname is required" }),
  email: z
    .string()
    .email({ message: "Must be a valid email" })
    .min(1, { message: "Email is required" })
    .refine((value) => value.endsWith("@crocusoft.com"), {
      message: "Email must end with @crocusoft.com",
    }),
  teamId: z.number(),
  roleId: z.number(),
});

export const createProjectSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required" }),
});

export const createReportSchema = z.object({
  projectId: z.number().min(1, { message: "Project name is required" }),
  reportText: z.string().min(1, { message: "Report text is required" }),
});

export const changePasswordEmployeeSchema = z.object({
  oldpassword: z.string().min(1, { message: "Old Password is required" }),
  newPassword: z.string().min(1, { message: "New Password is required" }),
  newConfirimPassword: z
    .string()
    .min(1, { message: "New Confirim Password is required" }),
});

export const filterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  status: z.string(),
  teamId: z.array(z.number()),
  projectIds: z.array(z.number()),
});

export const mailSchema = z.object({
  email: z.string(),
});

export const otpSchema = z.object({
  otp: z.array(z.string()),
});
export const confirmPasswordSchema = z.object({
  newPassword: z.string(),
  confirmNewPassword: z.string(),
});
