// Esto es culpa de emilio atentamente IO

export const SO_POR_EQUIPO: Record<
  string,
  { id_sistema_operativo: number; sistema_operativo: string }[]
> = {
  /*"ESCRITORIO PC"*/ 1: [
    { id_sistema_operativo: 1, sistema_operativo: "Windows 11" },
    { id_sistema_operativo: 2, sistema_operativo: "Windows 10" },
    { id_sistema_operativo: 3, sistema_operativo: "Windows 7/8" },
    { id_sistema_operativo: 4, sistema_operativo: "Windows XP/Vista" },
    { id_sistema_operativo: 5, sistema_operativo: "Linux" },
  ],
  /*"ESCRITORIO MAC OS"*/ 2: [
    {
      id_sistema_operativo: 6,
      sistema_operativo: "Mac OS (13 - Ventura, 14 - Sonoma)",
    },
    {
      id_sistema_operativo: 7,
      sistema_operativo:
        "Mac OS X (Mojave, Catalina, 11 - Big Sur, 12 - Monterrey)",
    },
    {
      id_sistema_operativo: 8,
      sistema_operativo: "Mac OS X (Yosemite, El Capitan, Sierra, High Sierra)",
    },
    {
      id_sistema_operativo: 9,
      sistema_operativo:
        "Mac OS X (Snow Leopard, Lion, Mountain Lion, Mavericks)",
    },
  ],
  /*"ESCRITORIO LINUX"*/ 3: [
    { id_sistema_operativo: 1, sistema_operativo: "Windows 11" },
    { id_sistema_operativo: 2, sistema_operativo: "Windows 10" },
    { id_sistema_operativo: 3, sistema_operativo: "Windows 7/8" },
    { id_sistema_operativo: 4, sistema_operativo: "Windows XP/Vista" },
    { id_sistema_operativo: 5, sistema_operativo: "Linux" },
  ],
  /*"PORTÁTILES WINDOWS"*/ 4: [
    { id_sistema_operativo: 1, sistema_operativo: "Windows 11" },
    { id_sistema_operativo: 2, sistema_operativo: "Windows 10" },
    { id_sistema_operativo: 3, sistema_operativo: "Windows 7/8" },
    { id_sistema_operativo: 4, sistema_operativo: "Windows XP/Vista" },
    { id_sistema_operativo: 10, sistema_operativo: "Chrome OS" },
  ],
  /*"PORTÁTILES CHROMEBOOK"*/ 5: [
    { id_sistema_operativo: 1, sistema_operativo: "Windows 11" },
    { id_sistema_operativo: 2, sistema_operativo: "Windows 10" },
    { id_sistema_operativo: 3, sistema_operativo: "Windows 7/8" },
    { id_sistema_operativo: 4, sistema_operativo: "Windows XP/Vista" },
    { id_sistema_operativo: 10, sistema_operativo: "Chrome OS" },
  ],
  /*"PORTÁTILES MAC OS"*/ 6: [
    {
      id_sistema_operativo: 6,
      sistema_operativo: "Mac OS (13 - Ventura, 14 - Sonoma)",
    },
    {
      id_sistema_operativo: 7,
      sistema_operativo:
        "Mac OS X (Mojave, Catalina, 11 - Big Sur, 12 - Monterrey)",
    },
    {
      id_sistema_operativo: 8,
      sistema_operativo: "Mac OS X (Yosemite, El Capitan, Sierra, High Sierra)",
    },
    {
      id_sistema_operativo: 9,
      sistema_operativo:
        "Mac OS X (Snow Leopard, Lion, Mountain Lion, Mavericks)",
    },
  ],
  /*SERVIDOR*/ 10: [
    {
      id_sistema_operativo: 12,
      sistema_operativo:
        "Linux (CentOS, Fedora, Ubuntu, Red Hat Enterprise, entre otros)",
    },
    {
      id_sistema_operativo: 13,
      sistema_operativo: "Unix (AIX, MAC OS Server, Solaris, entre otros)",
    },
    { id_sistema_operativo: 14, sistema_operativo: "Windows Server 2022/2023" },
    { id_sistema_operativo: 15, sistema_operativo: "Windows Server 2016/2019" },
    { id_sistema_operativo: 16, sistema_operativo: "Windows Server 2008/2012" },
    { id_sistema_operativo: 17, sistema_operativo: "Windows Server 2000/2003" },
  ],
};
