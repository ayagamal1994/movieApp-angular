import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export const languageStore = signalStore(
  { providedIn: 'root' },

  withState<{ lang: string }>({
    lang: 'en'
  }),

  withMethods((state) => ({
    setLanguage: (lang: string) => {
      patchState(state, { lang });
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
    },

    getLanguage: () => state.lang(),
  }))
);