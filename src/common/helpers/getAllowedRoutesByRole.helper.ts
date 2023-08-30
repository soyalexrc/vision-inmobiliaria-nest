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

  return routes;
}
