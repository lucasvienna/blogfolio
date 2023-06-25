import { describe, expect, it } from 'vitest';
import { formatDate } from './utils';

describe('formatDate', () => {
	it('should format a date string to a human readable date', () => {
		const date = '2021-01-01';
		const formattedDate = formatDate(date);
		expect(formattedDate).toBe('01.01.2021');
	});

	it('should respect the style parameter', () => {
		const date = '2021-01-01';
		const formattedDate = formatDate(date, 'short');
		expect(formattedDate).toBe('01.01.21');
	});
});
