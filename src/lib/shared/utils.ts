import { type ApiResult } from '$lib/client';
import dayjs from 'dayjs';

export const DATE_FORMATS = {
	DEFAULT: 'DD/MM/YYYY',
	DATE_TIME: 'DD/MM/YYYY HH:mm A',
	TIME: 'HH:mm',
	LONG: 'MMM D, YYYY h:mm A'
} as const;

export type DateValue = Date | number | string | null | undefined;

export const unwrap = <T>(r: PromiseSettledResult<ApiResult<T>>): ApiResult<T> =>
	r.status === 'fulfilled'
		? (r.value as ApiResult<T>)
		: {
				ok: false as const,
				error: {
					name: (r.reason as Error)?.name || 'Error',
					message: (r.reason as Error)?.message || String(r.reason),
					status: 0
				}
			};

export const formatDate = (dt: DateValue, format: string = DATE_FORMATS.DEFAULT) => {
	if (!dt) return '';
	const d = dayjs(dt);
	return d.isValid() ? d.format(format) : '';
};

export const formatDateTime = (dt: DateValue) => formatDate(dt, DATE_FORMATS.DATE_TIME);

export const formatters: Record<string, (value: DateValue) => string | undefined> = {
	date: (value: DateValue) => formatDate(value as string),
	dateTime: (value: DateValue) => formatDateTime(value as string),
	number: (value?: DateValue) => (value ? Number(value).toFixed(2).toLocaleString() : undefined),
	currency: (value?: DateValue) => (value ? `${Number(value).toLocaleString()}` : undefined)
};
