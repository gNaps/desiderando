import { getLocaleDirection, registerLocaleData } from "@angular/common";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";

export type TDirection = "rtl" | "ltr";

@Injectable({
  providedIn: "root",
})
export class DictionaryService {
  themeDirection$: BehaviorSubject<TDirection> =
    new BehaviorSubject<TDirection>("ltr");

  lang$: BehaviorSubject<string> = new BehaviorSubject<string>("en");

  constructor(private ts: TranslateService) {}

  async initLanguage(): Promise<void> {
    const lang = this.getUserLanguage();
    this.ts.setDefaultLang(lang);
    this.changeLanguage(lang);
  }

  async changeLanguage(lang: string = this.ts.getBrowserLang()) {
    const langCode = lang.substr(0, 2);

    const module = await import(`@angular/common/locales/${langCode}.js`);

    document.documentElement.lang = langCode;

    registerLocaleData(module.default);

    import(`../../assets/i18n/${langCode}.json`).then((res) => {
      this.ts.setTranslation(langCode, res);
      this.ts.use(langCode);
      this.themeDirection$.next(getLocaleDirection(langCode));
      this.lang$.next(langCode);

      localStorage.setItem("language", langCode);
    });
  }

  private getUserLanguage(): string {
    return (
      localStorage.getItem("language") ||
      this.ts.getBrowserLang().substr(0, 2) ||
      "en"
    );
  }
}
