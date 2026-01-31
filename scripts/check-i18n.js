const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadTranslations(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__TRANSLATIONS__ = TRANSLATIONS;\nthis.__ACH_TRANSLATIONS__ = ACHIEVEMENT_TRANSLATIONS;`, sandbox);
  return {
    translations: sandbox.__TRANSLATIONS__,
    achievementTranslations: sandbox.__ACH_TRANSLATIONS__
  };
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function compareObjects(label, a, b, errors, prefix = '') {
  const keysA = Object.keys(a || {});
  const keysB = Object.keys(b || {});

  const missingInB = keysA.filter(key => !keysB.includes(key));
  const missingInA = keysB.filter(key => !keysA.includes(key));

  missingInB.forEach((key) => {
    errors.push(`[${label}] Missing in second locale: ${prefix}${key}`);
  });

  missingInA.forEach((key) => {
    errors.push(`[${label}] Missing in first locale: ${prefix}${key}`);
  });

  keysA.filter(key => keysB.includes(key)).forEach((key) => {
    const valueA = a[key];
    const valueB = b[key];

    if (Array.isArray(valueA) && Array.isArray(valueB)) {
      if (valueA.length !== valueB.length) {
        errors.push(`[${label}] Array length mismatch at ${prefix}${key}: ${valueA.length} vs ${valueB.length}`);
      }
      return;
    }

    if (isPlainObject(valueA) && isPlainObject(valueB)) {
      compareObjects(label, valueA, valueB, errors, `${prefix}${key}.`);
      return;
    }

    if (isPlainObject(valueA) !== isPlainObject(valueB)) {
      errors.push(`[${label}] Type mismatch at ${prefix}${key}`);
    }
  });
}

function run() {
  const filePath = path.join(__dirname, '..', 'js', 'i18n.js');
  const { translations, achievementTranslations } = loadTranslations(filePath);

  const errors = [];

  if (!translations?.en || !translations?.de) {
    console.error('Missing en/de in TRANSLATIONS.');
    process.exit(1);
  }

  compareObjects('TRANSLATIONS', translations.en, translations.de, errors);

  if (!achievementTranslations?.en || !achievementTranslations?.de) {
    console.error('Missing en/de in ACHIEVEMENT_TRANSLATIONS.');
    process.exit(1);
  }

  compareObjects('ACHIEVEMENT_TRANSLATIONS', achievementTranslations.en, achievementTranslations.de, errors);

  if (errors.length > 0) {
    console.error('i18n check failed:');
    errors.forEach(err => console.error(`- ${err}`));
    process.exit(1);
  }

  console.log('i18n check passed.');
}

run();
