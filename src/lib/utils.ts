type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

/**
 * Format a date string to a human readable date
 * @param date Date string
 * @param dateStyle Date style
 * @param locales Locales
 * @returns
 */
export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'de') {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(date));
}
