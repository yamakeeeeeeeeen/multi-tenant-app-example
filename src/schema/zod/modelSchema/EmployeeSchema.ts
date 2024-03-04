import { z } from 'zod'

// NOTE: この正規表現はフォーマットの検証のみを行い、日付の有効性（例えば、2月30日が存在しないなど）は検証しません。
//  より厳密な日付検証が必要な場合は、追加のロジックを実装するか、日付処理ライブラリ（例：date-fnsやmoment.js）を使用することを検討してください。
const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '無効な日付フォーマットです。')
const PostalCodeSchema = z.string().regex(/^\d{3}-\d{4}$/, '無効な郵便番号フォーマットです。')

const EmployeeSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  kana: z.string(),
  gender: z.enum(['male', 'female']),
  color: z.string(),
  hireDate: DateSchema,
  contractEndDate: DateSchema.optional(),
  jobType: z.enum([
    // 管理者兼サビ管
    'manager_and_service_manager',
    // サービス責任者
    'service_supervisor',
    // 介護スタッフ
    'care_staff',
    // 看護師
    'nurse',
    // 事務員
    'clerk',
  ]),
  division1: z
    .enum([
      // 常勤
      'full_time',
      // 非常勤
      'part_time',
    ])
    .optional(),
  division2: z
    .enum([
      // 正社員
      'permanent_employee',
      // 時間給常勤
      'full_time_hourly_employee',
      // パート
      'part_time_employee',
      // 夜勤パート
      'night_shift_part_time_employee',
    ])
    .optional(),
  qualification: z
    .enum([
      // 介護福祉士
      'certified_care_worker',
      // 実務者研修
      'practical_training_course_graduate',
      // 初任者研修
      'beginner_training_course_graduate',
      // 重度訪問介護5
      'severe_in_home_care_level_5',
      // 介護士
      'caregiver',
    ])
    .optional(),
  payment: z.number(),
  carDriving: z.boolean(),
  move1hour: z.boolean(), // TODO: enumにする
  multipleAssignments: z.boolean(),
  postalCode: PostalCodeSchema,
  address: z.string(),
  addressDetail: z.string().optional(),
  phone: z.string(),
  email: z.string().email(),
  comment: z.string().optional(),
  tenantId: z.string(),
  accountId: z.string(),
})

export type Employee = z.infer<typeof EmployeeSchema>

export const EmployeeFormSchema = EmployeeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  tenantId: true,
  accountId: true,
})

export type EmployeeForm = z.infer<typeof EmployeeFormSchema>

export const JOB_TYPE_LABELS = {
  manager_and_service_manager: '管理者兼サビ管',
  service_supervisor: 'サービス責任者',
  care_staff: '介護スタッフ',
  nurse: '看護師',
  clerk: '事務員',
} as const

export const DIVISION1_LABELS = {
  full_time: '常勤',
  part_time: '非常勤',
} as const

export const DIVISION2_LABELS = {
  permanent_employee: '正社員',
  full_time_hourly_employee: '時間給常勤',
  part_time_employee: 'パート',
  night_shift_part_time_employee: '夜勤パート',
} as const

export const QUALIFICATION_LABELS = {
  certified_care_worker: '介護福祉士',
  practical_training_course_graduate: '実務者研修',
  beginner_training_course_graduate: '初任者研修',
  severe_in_home_care_level_5: '重度訪問介護5',
  caregiver: '介護士',
} as const
