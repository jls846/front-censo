"use client";

import { useState } from "react";
import styles from "./pregunta1.module.scss";

type OsEntry = {
  os: string;
  count: number;
  isTotal?: boolean;
};

type PlatformKey =
  | "pc-desktop"
  | "apple-desktop"
  | "pc-laptop"
  | "apple-laptop"
  | "servers";

type PlatformData = Record<PlatformKey, OsEntry[]>;

const MOCK_DATA: PlatformData = {
  "pc-desktop": [
    { os: "Windows 11", count: 408 },
    { os: "Windows 10", count: 1171 },
    { os: "Windows 7/8", count: 177 },
    { os: "Windows XP/Vista", count: 43 },
    { os: "Linux", count: 45 },
    { os: "Total", count: 1844, isTotal: true },
  ],
  "apple-desktop": [
    { os: "Mac OS X (13 - Ventura, 14 - Sonoma)", count: 205 },
    {
      os: "Mac OS X (Mojave, Catalina, 11 - Big Sur, 12 - Monterrey)",
      count: 180,
    },
    { os: "Mac OS X (Yosemite, El Capitan, Sierra, High Sierra)", count: 95 },
    { os: "Mac OS X (Snow Leopard, Mountain Lion, Mavericks)", count: 6 },
    { os: "Total", count: 480, isTotal: true },
  ],
  "pc-laptop": [
    { os: "Windows 11", count: 40 },
    { os: "Windows 10", count: 171 },
    { os: "Windows 7/8", count: 17 },
    { os: "Windows XP/Vista", count: 3 },
    { os: "Linux", count: 5 },
    { os: "Total", count: 236, isTotal: true },
  ],
  "apple-laptop": [
    { os: "Mac OS X (13 - Ventura, 14 - Sonoma)", count: 205 },
    {
      os: "Mac OS X (Mojave, Catalina, 11 - Big Sur, 12 - Monterrey)",
      count: 180,
    },
    { os: "Mac OS X (Yosemite, El Capitan, Sierra, High Sierra)", count: 95 },
    { os: "Mac OS X (Snow Leopard, Mountain Lion, Mavericks)", count: 6 },
    { os: "Total", count: 480, isTotal: true },
  ],
  servers: [
    {
      os: "Linux (CentOS, Fedora, Ubuntu, Red Hat Enterprise, entre otros)",
      count: 120,
    },
    { os: "Unix (AIX, Mac OS Server, Solaris, etc.)", count: 80 },
    { os: "Windows Server 2022/2023", count: 50 },
    { os: "Windows Server 2016/2019", count: 80 },
    { os: "Windows Server 2008/2012", count: 50 },
    { os: "Windows Server 2000/2003", count: 12 },
    { os: "Total", count: 392, isTotal: true },
  ],
};

const PLATFORM_LABELS: Record<PlatformKey, string> = {
  "pc-desktop": "Computadoras de escritorio Plataforma PC",
  "apple-desktop": "Computadoras de escritorio Plataforma Apple",
  "pc-laptop": "Computadoras portátiles Plataforma PC",
  "apple-laptop": "Computadoras portátiles Plataforma Apple",
  servers: "Servidores de alto rendimiento",
};

export default function Pregunta1() {
  const [activeTab, setActiveTab] = useState<PlatformKey>("pc-desktop");

  const currentData = MOCK_DATA[activeTab];

  return (
    <div className={styles.scanView_P1}>
      <div className={styles.container_P1}>
        <div className={styles.header_P1}>
          Presione cada pestaña para ver la información de las plataformas.
        </div>

        <div className={styles["main-content_P1"]}>
          {/* Tabs */}
          <div className={styles.tabs_P1}>
            {Object.entries(PLATFORM_LABELS).map(([key, label]) => (
              <button
                key={key}
                className={`${styles.tab_P1} ${
                  activeTab === key ? styles.active_P1 : ""
                }`}
                onClick={() => setActiveTab(key as PlatformKey)}
                aria-selected={activeTab === key}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Data Table */}
          <div className={styles["data-table-wrapper_P1"]}>
            <div className={styles["data-table_P1"]}>
              {currentData.map((item, index) => (
                <div
                  key={index}
                  className={`${styles["data-row_P1"]} ${
                    item.isTotal ? styles["total-row_P1"] : ""
                  }`}
                >
                  <div className={styles["os-name_P1"]}>{item.os}</div>
                  <div className={styles["count-box_P1"]}>{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
