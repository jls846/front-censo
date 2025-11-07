'use client';

import { useState, useEffect } from 'react';
import '../../styles/layout/pregunta1.scss';

// Tipos
type OsEntry = {
  os: string;
  count: string; // o number si la API devuelve números
  isTotal?: boolean;
};

type PlatformData = {
  [key: string]: OsEntry[];
};

// === DATOS TEMPORALES (mock) ===
const MOCK_DATA: PlatformData = {
  'pc-desktop': [
    { os: 'Windows 11', count: '408' },
    { os: 'Windows 10', count: '1171' },
    { os: 'Windows 7/8', count: '177' },
    { os: 'Windows XP/Vista', count: '43' },
    { os: 'Linux', count: '45' },
    { os: 'Total', count: '1844', isTotal: true },
  ],
  'apple-desktop': [
    { os: 'Mac OS X(13 - Ventura, 14 - Sonoma)', count: '205' },
    { os: 'Mac OS X(Mojave,Catalina,11 - Big Sur, 12 - Monterrey)', count: '180' },
    { os: 'Mac OS X(Yosemite,El Capitan,Sierra,High Sierra)', count: '95' },
    { os: 'Mac OS X(Snow Leopard,Mountain Lion,Mavericks)', count: '6' },
    { os: 'Total', count: '480', isTotal: true },
  ],
  'pc-laptop': [
    { os: 'Windows 11', count: '40' },
    { os: 'Windows 10', count: '171' },
    { os: 'Windows 7/8', count: '17' },
    { os: 'Windows XP/Vista', count: '3' },
    { os: 'Linux', count: '5' },
    { os: 'Total', count: '144', isTotal: true },
  ],
  'apple-laptop': [
    { os: 'Mac OS X(13 - Ventura, 14 - Sonoma)', count: '205' },
    { os: 'Mac OS X(Mojave,Catalina,11 - Big Sur, 12 - Monterrey)', count: '180' },
    { os: 'Mac OS X(Yosemite,El Capitan,Sierra,High Sierra)', count: '95' },
    { os: 'Mac OS X(Snow Leopard,Mountain Lion,Mavericks)', count: '6' },
    { os: 'Total', count: '480', isTotal: true },
  ],
  'servers': [
    { os: 'Linux (CentOs,Fedora,Ubuntu,Red Hat Enterprise,entre otros)', count: '120' },
    { os: 'Unix (AIX,MAC OS Server,Solaris,entre otros)', count: '80' },
    { os: 'Windows Server 2022/2023', count: '50' },
    { os: 'Windows Server 2016/2019', count: '80' },
    { os: 'Windows Server 2008/2012', count: '50' },
    { os: 'Windows Server 2000/2003', count: '12' },
    { os: 'Total', count: '250', isTotal: true },
  ],
};

const API_ENDPOINT = '/api/platform-stats'; // ← ¡Reemplaza esto cuando sepas la URL real!

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>('pc-desktop');
  const [data, setData] = useState<PlatformData>(MOCK_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // === DESCOMENTA ESTO CUANDO TENGAS LA API ===
        // const response = await fetch(API_ENDPOINT);
        // if (!response.ok) throw new Error('Error al cargar estadísticas');
        // const apiData: PlatformData = await response.json();
        // setData(apiData);
        // setLoading(false);

        // === POR AHORA: usa datos simulados (y simula un retraso si quieres) ===
        // await new Promise(resolve => setTimeout(resolve, 300));
        setData(MOCK_DATA);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('No se pudieron cargar las estadísticas. Usando datos temporales.');
        setData(MOCK_DATA); // fallback en caso de error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentData = data[activeTab] || [];

  // Si quisieras mostrar un estado de carga (opcional)
  // if (loading) return <div className="dashboardContainer"><p>Cargando...</p></div>;
  // if (error) console.warn(error); // o muestra un toast, etc.

  return (
    <div className="dashboardContainer">
      <div className="header">
        <h2>Estadísticas de Plataformas</h2>
      </div>

      <div className="scanView">
        <div className="container">
          <div className="header">
            Presione cada pestaña para ver la información de las plataformas.
          </div>

          <div className="main-content">
            <div className="tabs">
              {Object.entries({
                'pc-desktop': 'Computadoras de escritorio Plataforma PC',
                'apple-desktop': 'Computadoras de escritorio Plataforma Apple',
                'pc-laptop': 'Computadoras portatiles Plataforma PC',
                'apple-laptop': 'Computadoras portatiles Plataforma Apple',
                'servers': 'Servidores de alto rendimiento',
              }).map(([key, label]) => (
                <div
                  key={key}
                  className={`tab ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="data-table-wrapper">
              <div className="data-table">
                {currentData.map((item, index) => (
                  <div
                    key={index}
                    className={`data-row ${item.isTotal ? 'total-row' : ''}`}
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
    </div>
  );
};

export default Page;