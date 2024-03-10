export const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'] as const
export type DayOfWeek = (typeof daysOfWeek)[number]
