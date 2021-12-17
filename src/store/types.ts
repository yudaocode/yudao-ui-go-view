import { DesignStateType } from '@/store/modules/designStore/designStore.d';
import { LangStateType } from '@/store/modules/langStore/langStore.d';

export interface allStore {
  useDesignStore: DesignStateType;
  useLangStore: LangStateType;
}
