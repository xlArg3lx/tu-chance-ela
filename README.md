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

### 5. Instalar las dependencias de Laravel

```bash
docker-compose exec app composer install
```

### 6. Ejecutar migraciones y seeders

```bash
docker-compose exec app php artisan migrate --seed
```

### 7. Generar el JWT Secret

```bash
docker-compose exec app php artisan jwt:secret
```
