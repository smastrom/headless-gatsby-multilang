import { getPreferredLang } from '../getPreferredLang';

test('Returns first matching app lang code according to browser languages priority', () => {
  expect(preferredLang(['de-CH', 'en'], ['fr', 'en', 'de'])).toBe('de');
  expect(preferredLang(['de', 'en'], ['fr', 'en', 'de-CH'])).toBe('de-CH');
  expect(preferredLang(['fr', 'en'], ['en', 'fr'])).toBe('fr');
  expect(preferredLang(['fr-FR', 'en'], ['en', 'fr-FR'])).toBe('fr-FR');
  expect(preferredLang(['fr', 'en'], ['kr', 'en-US'])).toBe('en-US');
  expect(preferredLang(['fr', 'kr'], ['kr', 'en-US'])).toBe('kr');
});

test('Returns falsy value if no lang code match', () => {
  expect(preferredLang(['de-CH', 'en'], ['it-IT', 'kr', 'es'])).toBeFalsy();
});
