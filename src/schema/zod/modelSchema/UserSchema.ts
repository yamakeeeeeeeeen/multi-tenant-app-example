import { z } from "zod"

// NOTE: この正規表現はフォーマットの検証のみを行い、日付の有効性（例えば、2月30日が存在しないなど）は検証しません。
//  より厳密な日付検証が必要な場合は、追加のロジックを実装するか、日付処理ライブラリ（例：date-fnsやmoment.js）を使用することを検討してください。
const BirthdaySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "無効な誕生日フォーマットです。")
const PostalCodeSchema = z.string().regex(/^\d{3}-\d{4}$/, "無効な郵便番号フォーマットです。")
const CareLevelSchema = z.enum(["moderate", "severe", "wheelchair"])

const UserSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  kana: z.string(),
  birthday: BirthdaySchema,
  gender: z.enum(["male", "female"]),
  postalCode: PostalCodeSchema,
  address: z.string(),
  addressDetail: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  careLevel: CareLevelSchema,
  comment: z.string().optional(),
  isDeleted: z.boolean().default(false),
  tenantId: z.string(),
  userAccountId: z.string(),
})

export type User = z.infer<typeof UserSchema>

export const UserFormSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isDeleted: true,
  tenantId: true,
  userAccountId: true,
})

export type UserForm = z.infer<typeof UserFormSchema>
