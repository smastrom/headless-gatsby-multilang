/* eslint-disable no-undef */
import { getPreferredLang } from '../getPreferredLang';

test('Returns first matching app lang code according to browser languages priority', () => {
  expect(getPreferredLang(['de-CH', 'en'], ['fr', 'en', 'de'])).toBe('de');
  expect(getPreferredLang(['de', 'en'], ['fr', 'en', 'de-CH'])).toBe('de-CH');
  expect(getPreferredLang(['fr', 'en'], ['en', 'fr'])).toBe('fr');
  expect(getPreferredLang(['fr-FR', 'en'], ['en', 'fr-FR'])).toBe('fr-FR');
  expect(getPreferredLang(['fr', 'en'], ['kr', 'en-US'])).toBe('en-US');
  expect(getPreferredLang(['fr', 'kr'], ['kr', 'en-US'])).toBe('kr');
});

test('Returns falsy value if no lang code match', () => {
  expect(getPreferredLang(['de-CH', 'en'], ['it-IT', 'kr', 'es'])).toBeFalsy();
});
