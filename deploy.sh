#!/bin/bash

# Renkler
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Bugün Ne Oldu? - Deployment Scripti Başlatılıyor...${NC}"

# 1. Docker kontrolü
if ! command -v docker &> /dev/null
then
    echo "Docker bulunamadı! Lütfen önce Docker'ı kurun."
    exit 1
fi

# 2. Klasörleri oluştur (Yoksa)
echo "Klasör yapısı kontrol ediliyor..."
mkdir -p nginx/conf.d
mkdir -p backend/app/scrapers
mkdir -p backend/app/models

# 3. İzinleri ayarla (Opsiyonel ama güvenli)
chmod +x backend/main.py

# 4. Docker Compose'u çalıştır
echo -e "${GREEN}Konteynerler oluşturuluyor ve başlatılıyor...${NC}"
docker compose down --remove-orphans # Temiz başlangıç
docker compose up -d --build

# 5. Durumu kontrol et
echo -e "${GREEN}Servis durumu kontrol ediliyor...${NC}"
docker compose ps

# 6. Temizlik (Opsiyonel ama önerilir)
echo -e "${GREEN}Gereksiz dosyalar temizleniyor...${NC}"
docker system prune -f # Sadece dangling (boşta kalan) imajları siler
docker builder prune -f # Build önbelleğini temizler

echo -e "${GREEN}Kurulum Tamamlandı!${NC}"
echo "Frontend: http://localhost:80 (veya sunucu IP adresiniz)"
echo "Backend API: http://localhost:80/api/docs"
