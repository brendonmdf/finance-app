import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
})

export const registerSchema = z.object({
  full_name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
})

export const transactionSchema = z.object({
  title: z.string().min(1, {
    message: "O título é obrigatório.",
  }),
  amount: z.number().min(0.01, {
    message: "O valor deve ser maior que zero.",
  }),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, {
    message: "A categoria é obrigatória.",
  }),
  payment_method: z.string().min(1, {
    message: "O método de pagamento é obrigatório.",
  }),
  date: z.string().min(1, {
    message: "A data é obrigatória.",
  }),
  description: z.string().optional(),
})

export const categorySchema = z.object({
  name: z.string().min(1, {
    message: "O nome da categoria é obrigatório.",
  }),
  type: z.enum(["income", "expense"]),
  color: z.string().min(1, {
    message: "A cor é obrigatória.",
  }),
  icon: z.string().min(1, {
    message: "O ícone é obrigatório.",
  }),
})

export const accountSchema = z.object({
  name: z.string().min(1, {
    message: "O nome da conta é obrigatório.",
  }),
  type: z.enum(["checking", "savings", "credit", "investment"]),
  balance: z.number(),
  currency: z.string().min(1, {
    message: "A moeda é obrigatória.",
  }),
})
