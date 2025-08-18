import z from "zod"

export const submitNumberSchema = z.object({
    userInput: z.string().regex(/^\d+$/, { message: "must be at least 1 digit and non negative" })
});

export type SubmitNumberSchema = z.infer<typeof submitNumberSchema>;