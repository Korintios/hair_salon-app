# Usa una imagen base ligera con Node.js
FROM node:lts-alpine

# Instala OpenSSL
RUN apk add --no-cache openssl

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala todas las dependencias (producción y desarrollo)
RUN npm install --production

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Copiar variables de entorno (recomendado para desarrollo)
# COPY .env .env

# Genera el build de producción de Next.js
RUN npm run build

# Migrar las tablas a la base de datos
RUN npx prisma db push

# Establece el entorno de producción
ENV NODE_ENV=production

# Expone el puerto que usará Next.js
EXPOSE 3000

# Comando para iniciar la aplicación con depuración
CMD ["npm", "run", "start"]
