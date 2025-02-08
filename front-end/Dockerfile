# Etapa de construcción
FROM node:18 as build

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY ionic.config.json ./

# Instalar dependencias
RUN npm install -g @ionic/cli
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN ionic build --prod

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos
COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
