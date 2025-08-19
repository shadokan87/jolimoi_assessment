import z from "zod"
export const submitNumberSchema = z.object({
    userInput: z.string()
        .regex(/^\d+$/, { message: "must be at least 1 digit and non negative" })
        .refine(val => {
            const num = Number(val);
            return num >= 1 && num <= 3999;
        }, { message: "must be a number between 1 and 3999" })
});

export type SubmitNumberSchema = z.infer<typeof submitNumberSchema>;