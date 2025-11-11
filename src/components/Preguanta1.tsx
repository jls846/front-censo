"use client";

import { useState } from "react";
import "../app/styles/layout/pregunta1.scss";

type OsEntry = {
  os: string;
  count: string;
  isTotal?: boolean;
};

const MOCK_DATA = {
  "pc-desktop": [
    { os: "Windows 11", count: "408" },
    { os: "Windows 10", count: "1171" },
    { os: "Windows 7/8", count: "177" },
    { os: "Windows XP/Vista", count: "43" },
    { os: "Linux", count: "45" },
    { os: "Total", count: "1844", isTotal: true },
  ],
  "apple-desktop": [
    { os: "Mac OS X(13 - Ventura, 14 - Sonoma)", count: "205" },
    {
      os: "Mac OS X(Mojave,Catalina,11 - Big Sur, 12 - Monterrey)",
      count: "180",
    },
    { os: "Mac OS X(Yosemite,El Capitan,Sierra,High Sierra)", count: "95" },
    { os: "Mac OS X(Snow Leopard,Mountain Lion,Mavericks)", count: "6" },
    { os: "Total", count: "480", isTotal: true },
  ],
  "pc-laptop": [
    { os: "Windows 11", count: "40" },
    { os: "Windows 10", count: "171" },
    { os: "Windows 7/8", count: "17" },
    { os: "Windows XP/Vista", count: "3" },
    { os: "Linux", count: "5" },
    { os: "Total", count: "236", isTotal: true }, // corregido
  ],
  "apple-laptop": [
    { os: "Mac OS X(13 - Ventura, 14 - Sonoma)", count: "205" },
    {
      os: "Mac OS X(Mojave,Catalina,11 - Big Sur, 12 - Monterrey)",
      count: "180",
    },
    { os: "Mac OS X(Yosemite,El Capitan,Sierra,High Sierra)", count: "95" },
    { os: "Mac OS X(Snow Leopard,Mountain Lion,Mavericks)", count: "6" },
    { os: "Total", count: "480", isTotal: true },
  ],
  servers: [
    {
      os: "Linux (CentOs,Fedora,Ubuntu,Red Hat Enterprise,entre otros)",
      count: "120",
    },
    { os: "Unix (AIX,MAC OS Server,Solaris,entre otros)", count: "80" },
    { os: "Windows Server 2022/2023", count: "50" },
    { os: "Windows Server 2016/2019", count: "80" },
    { os: "Windows Server 2008/2012", count: "50" },
    { os: "Windows Server 2000/2003", count: "12" },
    { os: "Total", count: "392", isTotal: true }, // corregido también
  ],
};

const PLATFORM_LABELS: Record<string, string> = {
  "pc-desktop": "Computadoras de escritorio Plataforma PC",
  "apple-desktop": "Computadoras de escritorio Plataforma Apple",
  "pc-laptop": "Computadoras portátiles Plataforma PC",
  "apple-laptop": "Computadoras portátiles Plataforma Apple",
  servers: "Servidores de alto rendimiento",
};

const Pregunta1 = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof MOCK_DATA>("pc-desktop");
  const currentData = MOCK_DATA[activeTab];

  return (
    <div className="scanView">
      <div className="container">
        <div className="header">
          Presione cada pestaña para ver la información de las plataformas.
        </div>

        <div className="main-content">
          <div className="tabs">
            {Object.entries(PLATFORM_LABELS).map(([key, label]) => (
              <button
                key={key}
                className={`tab ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key as keyof typeof MOCK_DATA)}
                aria-selected={activeTab === key}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="data-table-wrapper">
            <div className="data-table">
              {currentData.map((item, index) => (
                <div
                  key={index}
                  className={`data-row ${item.isTotal ? "total-row" : ""}`}
                >
                  <div className="os-name">{item.os}</div>
                  <div className="count-box">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pregunta1;
