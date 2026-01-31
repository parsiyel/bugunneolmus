#!/bin/bash

# Renkler
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Bugün Ne Oldu? - Deployment Scripti Başlatılıyor...${NC}"

# 1. Klasör yapısını kontrol et
echo -e "${GREEN}Klasör yapısı kontrol ediliyor...${NC}"
mkdir -p nginx/conf.d
mkdir -p backend/app
mkdir -p pgdata

# 2. Port Temizliği (ÖNEMLİ: Çakışmaları önlemek için)
echo -e "${YELLOW}Port 80 (Web Sunucusu) temizleniyor...${NC}"
# Mevcut web sunucularını durdur
systemctl stop nginx || true
systemctl stop apache2 || true
# Port 80'i kullanan herhangi bir işlemi sonlandır
fuser -k 80/tcp || true

# 3. Docker imajlarını oluştur ve başlat
echo -e "${GREEN}Konteynerler oluşturuluyor ve başlatılıyor...${NC}"
docker compose up -d --build

# 4. Durumu kontrol et
echo -e "${GREEN}Servis durumu kontrol ediliyor...${NC}"
docker compose ps

# 5. Temizlik
echo -e "${GREEN}Gereksiz dosyalar temizleniyor...${NC}"
docker system prune -f
docker builder prune -f

echo -e "${GREEN}Kurulum Tamamlandı!${NC}"
echo "Frontend: http://localhost:80 (veya sunucu IP adresiniz)"
echo "Backend API: http://localhost:80/api/docs"
