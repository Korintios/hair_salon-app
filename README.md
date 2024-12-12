# Aplicacion de Peluqueria
Este repositorio alberga el código fuente de una aplicación de gestión de peluquería que incluye módulos clave como Recepción, Inventario, Gastos y Reportes. Nuestra aplicación simplifica la gestión de citas, seguimiento de inventario, control de gastos y generación de informes, proporcionando una solución integral para ayudarte a administrar tu salón de belleza de manera eficiente y efectiva. Optimiza tus operaciones y toma decisiones basadas en datos con esta aplicación diseñada específicamente para el sector de la peluquería.
<p align="center">
  <img src="videos/main.gif" alt="Menu Principal">
  <img src="videos/modals.gif" alt="Menu Principal">
</p>

## 🚀 Pasos de Inicializacion
Antes de realizar el primer comando primero asigna la ruta de la base de datos, del contario te dara error, tambien tener en cuenta los permisos del directorio donde asignes la base de datos.
```
npx prisma db push
npm install
npm run dev
```

## 🐋 Cómo usar esta aplicación con Docker
1. Clona este repositorio
```
git clone https://github.com/Korintios/hair_salon-app.git
cd tu-repositorio
```
2. Configura las variables de entorno
Crea un archivo .env en el directorio raíz con las siguientes variables:
```
DATABASE_URL="file:./data/app.db"
```
Esto configura la base de datos SQLite y el entorno de producción.

3. Construye la imagen de Docker
Ejecuta el siguiente comando para construir la imagen de Docker:
```
docker build -t nombre-imagen .
```

4. Ejecuta el contenedor
Inicia la aplicación en un contenedor Docker:
```
docker run -d -p 3000:3000 nombre-imagen
```

5. Accede a la aplicación
Abre tu navegador y visita: http://localhost:3000

<hr/>

## Informacion Principal
| Funcionalidad | Descripcion |
|----------|----------|
| Recepcion    | Este módulo se encarga de gestionar y supervisar el proceso de recepción de clientes, basandose en los servicios de tu sistema.   |
| Inventario    | El módulo de inventario en Cell 5 es fundamental para mantener un registro preciso de todos los productos, materiales o activos disponibles.   |
| Gastos    | El módulo de gastos se encarga de rastrear y controlar los gastos relacionados con tus productos. Permite registrar, eliminar y modificar.   |
| Reportes    | Generar informes y análisis detallados sobre diferentes aspectos de tu negocio o sistema. |

## Herramientas Utilizadas:
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JAVASCRIPT](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
