/**
 * GeoVerity 2026 i18n helpers.
 * Central source of truth for bilingual routing and labels.
 * DO NOT hardcode English/Spanish paths elsewhere.
 */

import enMessages from './locales/en.json';
import esMessages from './locales/es.json';

type Lang = 'en' | 'es';
type Messages = typeof enMessages;

const messages: Record<Lang, Messages> = {
  en: enMessages,
  es: esMessages
};

/**
 * Get translation for a key using dot notation
 * @example t('en', 'homepage.heroHeading')
 */
export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let value: any = messages[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key; // Fallback to key if not found
}

/**
 * Get all translations for a namespace
 * @example getNamespace('en', 'homepage')
 */
export function getNamespace(lang: Lang, namespace: string): Record<string, string> {
  const keys = namespace.split('.');
  let value: any = messages[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || {};
}

export function getPaths(slug: string) {
  // slug: "placeholder" -> { en: "/placeholder/", es: "/es/placeholder/" }
  const norm = slug.replace(/^\/+|\/+$/g, "");
  return {
    en: `/${norm}/`,
    es: `/es/${norm}/`
  };
}

export function languageSwitcherLabels() {
  return {
    en: "English",
    es: "Español"
  };
}
