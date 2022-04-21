/* eslint-disable no-undef */
import { getPreferredLocale } from '../getPreferredLocale';

test('Returns first matching app lang code according to browser languages priority', () => {
  expect(getPreferredLocale(['de-CH', 'en'], ['fr', 'en', 'de'])).toBe('de');
  expect(getPreferredLocale(['de', 'en'], ['fr', 'en', 'de-CH'])).toBe('de-CH');
  expect(getPreferredLocale(['fr', 'en'], ['en', 'fr'])).toBe('fr');
  expect(getPreferredLocale(['fr-FR', 'en'], ['en', 'fr-FR'])).toBe('fr-FR');
  expect(getPreferredLocale(['fr', 'en'], ['kr', 'en-US'])).toBe('en-US');
  expect(getPreferredLocale(['fr', 'kr'], ['kr', 'en-US'])).toBe('kr');
});

test('Returns falsy value if no lang code match', () => {
  expect(
    getPreferredLocale(['de-CH', 'en'], ['it-IT', 'kr', 'es'])
  ).toBeFalsy();
});
