import { ProcessConfig } from './Process/index'
import { RadarConfig } from './Radar/index'
import { FunnelConfig } from './Funnel/index'
import { HeatmapConfig } from './Heatmap/index'
import { WaterPoloConfig } from './WaterPolo/index'
import { TreeMapConfig } from './TreeMap/index'
import {MoreInstrumentConfig} from "./MoreInstrument/index";
import { BarLineCommonConfig } from '@/packages/components/Charts/Mores/BarLineCommon/index'
import {BiaxLineCommonConfig} from "@/packages/components/Charts/Mores/BiaxLineCommon/index";
import {GroupedStackedRoseChartCommonConfig} from "@/packages/components/Charts/Mores/GroupedStackedRoseChartCommon/index";
import {PolarCoordinateAxisCommonConfig} from "@/packages/components/Charts/Mores/PolarCoordinateAxisCommon/index";
import {WeatherConfig} from "@/packages/components/Charts/Mores/Weather/index";
import {GroundGlassConfig} from "@/packages/components/Charts/Mores/GroundGlass/index";

import { DialConfig } from './Dial/index'
import { SankeyConfig } from './Sankey/index'
import { GraphConfig } from './Graph/index'

export default [
    ProcessConfig,
    RadarConfig,
    FunnelConfig,
    HeatmapConfig,
    WaterPoloConfig,
    TreeMapConfig,
    GraphConfig,
    SankeyConfig,
    DialConfig,
    MoreInstrumentConfig,
    BarLineCommonConfig,
    BiaxLineCommonConfig,
    GroupedStackedRoseChartCommonConfig,
    PolarCoordinateAxisCommonConfig,
    WeatherConfig,
    GroundGlassConfig
]
