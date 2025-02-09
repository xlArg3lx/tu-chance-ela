# FROM php:8.2-fpm

# # Instalar dependencias del sistema
# RUN apt-get update && apt-get install -y \
#     git \
#     curl \
#     libpng-dev \
#     libonig-dev \
#     libxml2-dev \
#     zip \
#     unzip

# RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# RUN pecl install redis \
#     && docker-php-ext-enable redis \
#     && docker-php-ext-install opcache

# # Install Composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# WORKDIR /var/www

# # Copy application files
# COPY . /var/www

# # Crear directorios necesarios
# RUN mkdir -p /var/www/bootstrap/cache \
#     && mkdir -p /var/www/storage/framework/cache \
#     && mkdir -p /var/www/storage/framework/sessions \
#     && mkdir -p /var/www/storage/framework/testing \
#     && mkdir -p /var/www/storage/framework/views \
#     && mkdir -p /var/www/storage/logs

# # Configurar permisos
# RUN chown -R www-data:www-data /var/www \
#     && chmod -R 775 /var/www/storage \
#     && chmod -R 775 /var/www/bootstrap/cache

# # Cambiar a usuario www-data para instalar dependencias
# USER www-data

# # Instalar dependencias
# RUN composer install --no-interaction

# # Volver a usuario root para el CMD
# USER root

# EXPOSE 9000

# CMD ["php-fpm"]

FROM php:8.2-fpm

# Argumentos de construcción
ARG user=laravel
ARG uid=1000

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Limpiar cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Obtener Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Crear usuario del sistema
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Establecer directorio de trabajo
WORKDIR /var/www

# Copiar permisos de usuario existente
COPY --chown=$user:$user . /var/www

# Cambiar al usuario
USER $user
