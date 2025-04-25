
## 🚀 Características Principales
- **Transferencias seguras** entre usuarios con validación de saldo en tiempo real
- Historial completo de **transacciones** (enviadas/recibidas)
- Sistema de **comisiones** automático por transferencia
- Interfaz **responsive** construida con Bulma CSS
- Gestión de **contactos frecuentes**
- Visualización de **saldo disponible** con formato monetario
- **Modales interactivos** para confirmación de operaciones

## 🛠 Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 15.3.1 | Framework principal |
| React | 19 | Librería UI |
| TypeScript | 5 | Tipado estático |
| Bulma CSS | 1.0.4 | Estilos y componentes |
| Fetch API | - | Conexión con backend |

Instalar dependencias:

  npm install

## 🌱 Levantar el Proyecto Localmente

  npm run dev

## 📜 Comandos Útiles
  Iniciar el sistema en desarrollo:

  npm run dev

## 🏗 Endpoints API
/transacciones/transferir	POST	{ cuentaOrigenId, cuentaDestinoId, monto }	Realiza transferencia
/transacciones/realizadas/:id	GET	-	Obtiene transferencias enviadas
/transacciones/recibidas/:id	GET	-	Obtiene transferencias recibidas
/comisiones/historial/:id	GET	-	Obtiene historial de comisiones
/contactos	GET	-	Obtiene lista de contactos

## Aclaraciones
Como se trabajo en un entorno de desarollo el frontend solo funciona con este backend y ambos de forma local en modo desarollo  es decir localhost