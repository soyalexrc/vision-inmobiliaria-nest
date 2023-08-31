export function getAllowedRoutesByRole(role: string) {
  let routes = [];
  if (role === 'Administrador') {
    routes = [
      'inicio',
      'clientes',
      'usuarios',
      'asesores-externos',
      'aliados',
      'propiedades',
      'administracion',
      'flujo-de-caja',
      'propietarios',
      'calculo-de-comisiones',
      'gestion-de-archivos',
    ];
  }

  if (role === 'Asesor inmobiliario vision') {
    routes = ['inicio', 'propiedades'];
  }

  if (role === 'Coordinador de servicios') {
    routes = ['inicio', 'propiedades', 'flujo-de-caja', 'clientes', 'calculo-de-comisiones'];
  }

  if (role === 'Administrador de empresa') {
    routes = ['inicio', 'administracion', 'flujo-de-caja', 'calculo-de-comisiones', 'gestion-de-archivos'];
  }

  if (role === 'Asistente operativo') {
    routes = ['inicio', 'gestion-de-archivos'];
  }

  return routes;
}
