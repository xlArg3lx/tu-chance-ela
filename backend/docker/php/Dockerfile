# FROM php:8.2-fpm

# ARG user
# ARG uid

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

# # En tu Dockerfile de PHP añade:
# RUN pecl install redis \
# && docker-php-ext-enable redis \
# && docker-php-ext-install opcache

# # Instalación manual de Composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# RUN useradd -G www-data,root -u $uid -d /home/$user $user
# RUN mkdir -p /home/$user/.composer && \
#     chown -R $user:$user /home/$user

# WORKDIR /var/www

# USER $user

FROM php:8.2-fpm

# Remove user and uid ARGs for CapRover simplicity
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

RUN pecl install redis \
    && docker-php-ext-enable redis \
    && docker-php-ext-install opcache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

# Copy application files
COPY . /var/www

# Install dependencies
RUN composer install --no-interaction --no-scripts

# Set permissions
RUN chown -R www-data:www-data /var/www/storage

# Expose port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
