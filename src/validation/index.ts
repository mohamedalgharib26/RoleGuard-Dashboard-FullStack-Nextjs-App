import { z } from "zod";

export const addNewUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(5, "Name Must Be 5 char atleast"),
  email: z.string().email("Please Enter Valid Email"),
  role: z.string("Must Choose Role "),
  status: z.string("Choose Valid Status"),
});
export type AddNewUserInput = z.infer<typeof addNewUserSchema>;
