export type DateInput = string | number | Date;

/** 将任意输入转为 Date 对象（UTC -> local 自动处理） */
export function toDate(input: DateInput): Date {
  const d = input instanceof Date ? input : new Date(input);
  return d;
}

/** 本地化日期格式（只显示日期） */
export function formatLocalDate(
  input: DateInput,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = toDate(input);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...options,
  }).format(date);
}

/** 本地化日期时间格式（显示日期+时间） */
export function formatLocalDateTime(
  input: DateInput,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = toDate(input);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    ...options,
  }).format(date);
}

/** 相对时间配置 */
interface RelativeTimeOptions {
  locale?: string;
  short?: boolean; // 是否使用短格式
}

/** 返回“刚刚 / xx 分钟前 / xx 小时前 ...” */
export function fromNow(
  input: DateInput,
  options: RelativeTimeOptions = {},
): string {
  const { locale = undefined } = options;

  const date = toDate(input);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 5)
    return new Intl.RelativeTimeFormat(locale).format(0, "second");
  if (diffSec < 60)
    return new Intl.RelativeTimeFormat(locale).format(-diffSec, "second");

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60)
    return new Intl.RelativeTimeFormat(locale).format(-diffMin, "minute");

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24)
    return new Intl.RelativeTimeFormat(locale).format(-diffHour, "hour");

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30)
    return new Intl.RelativeTimeFormat(locale).format(-diffDay, "day");

  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12)
    return new Intl.RelativeTimeFormat(locale).format(-diffMonth, "month");

  const diffYear = Math.floor(diffMonth / 12);
  return new Intl.RelativeTimeFormat(locale).format(-diffYear, "year");
}

/** 判断是否为今天 */
export function isToday(input: DateInput): boolean {
  const d = toDate(input);
  const t = new Date();
  return (
    d.getFullYear() === t.getFullYear() &&
    d.getMonth() === t.getMonth() &&
    d.getDate() === t.getDate()
  );
}

/** 判断是否为昨天 */
export function isYesterday(input: DateInput): boolean {
  const d = toDate(input);
  const t = new Date();
  const yesterday = new Date(t);
  yesterday.setDate(t.getDate() - 1);

  return (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  );
}

/** 判断是否为本周（周一为起点） */
export function isThisWeek(input: DateInput): boolean {
  const d = toDate(input);
  const t = new Date();

  const start = new Date(t);
  const day = t.getDay() === 0 ? 7 : t.getDay();
  start.setDate(t.getDate() - (day - 1));
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  return d >= start && d < end;
}

/** 加减日期（正数加，负数减） */
export function addDays(input: DateInput, days: number): Date {
  const d = toDate(input);
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

export function addHours(input: DateInput, hours: number): Date {
  const d = toDate(input);
  const result = new Date(d);
  result.setHours(result.getHours() + hours);
  return result;
}

export function addMinutes(input: DateInput, minutes: number): Date {
  const d = toDate(input);
  const result = new Date(d);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

/** 日期差值（返回毫秒 / 秒 / 分钟 / 小时 / 天） */
export const diff = {
  ms(a: DateInput, b: DateInput) {
    return toDate(a).getTime() - toDate(b).getTime();
  },
  sec(a: DateInput, b: DateInput) {
    return Math.floor(diff.ms(a, b) / 1000);
  },
  min(a: DateInput, b: DateInput) {
    return Math.floor(diff.sec(a, b) / 60);
  },
  hour(a: DateInput, b: DateInput) {
    return Math.floor(diff.min(a, b) / 60);
  },
  day(a: DateInput, b: DateInput) {
    return Math.floor(diff.hour(a, b) / 24);
  },
};
