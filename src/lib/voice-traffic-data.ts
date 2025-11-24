export type VendorKey =
  | "overall"
  | "ericsson"
  | "huaweiCentral"
  | "nokiaNorth"
  | "nokiaSouth";

export const vendors: {
  key: VendorKey;
  name: string;
  short: string;
  color: string;
}[] = [
  {
    key: "overall",
    name: "W47 Network",
    short: "W47",
    color: "#2563eb",
  },
  {
    key: "ericsson",
    name: "Ericsson",
    short: "E///",
    color: "#f97316",
  },
  {
    key: "huaweiCentral",
    name: "Huawei Central",
    short: "Huawei-C",
    color: "#10b981",
  },
  {
    key: "nokiaNorth",
    name: "Nokia North",
    short: "Nokia-N",
    color: "#8b5cf6",
  },
  {
    key: "nokiaSouth",
    name: "Nokia South",
    short: "Nokia-S",
    color: "#ef4444",
  },
];

type TrafficEntry = {
  id: string;
  display: string;
  layer: "2G" | "3G";
  values: Record<VendorKey, number>;
};

export const voiceTrafficByBand: TrafficEntry[] = [
  {
    id: "24HRS_GSM-900",
    display: "24HRS GSM 900",
    layer: "2G",
    values: {
      overall: 255_138,
      ericsson: 126_914,
      huaweiCentral: 49_390,
      nokiaNorth: 39_443,
      nokiaSouth: 3_449,
    },
  },
  {
    id: "24HRS_DCS-1800",
    display: "24HRS DCS 1800",
    layer: "2G",
    values: {
      overall: 13_819,
      ericsson: 5_060,
      huaweiCentral: 234,
      nokiaNorth: 2_959,
      nokiaSouth: 3_449,
    },
  },
  {
    id: "24HRS_U-900",
    display: "24HRS U 900",
    layer: "3G",
    values: {
      overall: 239_289,
      ericsson: 77_680,
      huaweiCentral: 75_545,
      nokiaNorth: 29_149,
      nokiaSouth: 1_329,
    },
  },
  {
    id: "24HRS_U-2100-F1",
    display: "24HRS U 2100 F1",
    layer: "3G",
    values: {
      overall: 286_542,
      ericsson: 120_376,
      huaweiCentral: 31_598,
      nokiaNorth: 78_526,
      nokiaSouth: 291,
    },
  },
  {
    id: "24HRS_U-2100-F2",
    display: "24HRS U 2100 F2",
    layer: "3G",
    values: {
      overall: 99_223,
      ericsson: 54_086,
      huaweiCentral: 32_141,
      nokiaNorth: 11_583,
      nokiaSouth: 1_413,
    },
  },
];

export const totalVoiceTraffic = voiceTrafficByBand.reduce<Record<VendorKey, number>>(
  (acc, entry) => {
    for (const vendor of vendors) {
      acc[vendor.key] = (acc[vendor.key] ?? 0) + entry.values[vendor.key];
    }
    return acc;
  },
  { overall: 0, ericsson: 0, huaweiCentral: 0, nokiaNorth: 0, nokiaSouth: 0 },
);

export const totalsByLayer = voiceTrafficByBand.reduce<
  Record<"2G" | "3G", Record<VendorKey, number>>
>(
  (acc, entry) => {
    for (const vendor of vendors) {
      acc[entry.layer][vendor.key] += entry.values[vendor.key];
    }
    return acc;
  },
  {
    "2G": { overall: 0, ericsson: 0, huaweiCentral: 0, nokiaNorth: 0, nokiaSouth: 0 },
    "3G": { overall: 0, ericsson: 0, huaweiCentral: 0, nokiaNorth: 0, nokiaSouth: 0 },
  },
);

export const percentageShare = voiceTrafficByBand.map((entry) => {
  const { values } = entry;
  const percentages = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      values.overall === 0 ? 0 : (value / values.overall) * 100,
    ]),
  ) as Record<VendorKey, number>;

  return {
    id: entry.id,
    display: entry.display,
    layer: entry.layer,
    percentages,
  };
});

export const overallShare = Object.fromEntries(
  vendors.map((vendor) => [
    vendor.key,
    totalVoiceTraffic.overall === 0
      ? 0
      : (totalVoiceTraffic[vendor.key] / totalVoiceTraffic.overall) * 100,
  ]),
) as Record<VendorKey, number>;
