interface Window {
  theme: {
    themeValue?: string;
    setPreference: (pref: string) => void;
    reflectPreference: () => void;
    getTheme?: () => string;
    setTheme?: (val: string) => void;
    getPreference?: () => string;
    resolveTheme?: (pref: string) => string;
  };
}
