import { DesignStateType } from '@/store/modules/designStore/designStore.d';
import { LangStateType } from '@/store/modules/langStore/langStore.d';
import { ChartLayoutType } from '@/store/modules/chartLayoutStore/chartLayoutStore.d';

export interface allStore {
  useDesignStore: DesignStateType;
  useLangStore: LangStateType;
  useChartLayoutStore: ChartLayoutType;
}
