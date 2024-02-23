import { z } from "zod"

export const TenantSchema = z.object({
  id: z.string().uuid(), // UUIDのバリデーション
  createdAt: z.date(), // 日付のバリデーション
  updatedAt: z.date(), // 日付のバリデーション、updatedAtは自動的に更新されるため、入力時には省略可能にする場合もある
  name: z.string(), // 文字列のバリデーション
  subdomain: z.string(), // 文字列のバリデーション、実際にはユニーク性を保証するための追加のチェックが必要かもしれません
})

export type Tenant = z.infer<typeof TenantSchema>
