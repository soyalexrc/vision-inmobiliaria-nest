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

  if (role === 'Asesor inmobiliario') {
    routes = ['inicio', 'propiedades', 'clientes'];
  }

  if (role === 'Coordinador de servicios') {
    routes = [
      'inicio',
      'propiedades',
      'clientes',
      'calculo-de-comisiones',
      'propietarios',
      'asesores-externos',
      'gestion-de-archivos',
      'usuarios',
      'aliados',
    ];
  }

  if (role === 'Administrador de empresa') {
    routes = ['inicio', 'administracion', 'flujo-de-caja', 'calculo-de-comisiones', 'gestion-de-archivos'];
  }

  if (role === 'Asistente operativo') {
    routes = ['inicio', 'gestion-de-archivos'];
  }

  if (role === 'Asesor inmobiliario vision') {
    routes = ['propiedades', 'clientes', 'aliados', 'propietarios'];
  }

  return routes;
}
