import { DictionaryService } from './core/dictionary.service';

function translateInit(ds: DictionaryService): Promise<void> {
  return ds.initLanguage();
}

export function appInit(
  ds: DictionaryService,
) {
  return () => translateInit(ds);
}