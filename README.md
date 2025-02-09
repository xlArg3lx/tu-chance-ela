# Tu-Chance-Ela - Backend Laravel 10

## Configuración Inicial del Proyecto

### 1. Clonar el Repositorio

```bash
git clone https://github.com/xlArg3lx/tu-chance-ela.git
```

### 2. Ubicarse dentro de la carpeta backend

```bash
cd tu-chance-ela/backend
```

### 3. Construir las imágenes con Docker

```bash
docker-compose build --no-cache
```

### 4. Correr la aplicación con Docker

```bash
docker-compose up -d
```

### 5. Copiar el archivo .env

```bash
Comando para windows: copy .env.example .env
Comando para linux: cp .env.example .env
Comando para powerShell: Copy-Item .env.example .env
```

### 6. Instalar las dependencias de Laravel

```bash
docker-compose exec app composer install
```

### 7. Ejecutar migraciones y seeders

```bash
docker-compose exec app php artisan migrate --seed
```

### 8. Generar el JWT Secret

```bash
docker-compose exec app php artisan jwt:secret
```
