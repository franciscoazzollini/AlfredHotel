-- Alfred Hotel demo property (B&B / hotel vertical)
insert into restaurants (
  id,
  slug,
  name,
  logo_url,
  primary_color,
  locale,
  links,
  settings,
  edit_token,
  tier,
  vertical,
  owner_id
) values (
  'alfred-hotel',
  'alfred-hotel',
  'Alfred Hotel',
  null,
  '#0f766e',
  'es',
  '{
    "googleMaps": "https://maps.google.com/?q=Alfred+Hotel",
    "whatsapp": "https://wa.me/5491112345678",
    "spa": "https://example.com/spa",
    "localGuide": "https://example.com/guia",
    "emergency": "tel:911"
  }'::jsonb,
  '{
    "wifi": { "ssid": "Alfred_Guest", "password": "alfred2026" },
    "receptionWhatsApp": "5491112345678",
    "roomCount": 24,
    "checkInOut": { "checkIn": "15:00", "checkOut": "11:00" },
    "receptionHours": {
      "mon": { "open": "00:00", "close": "23:59" },
      "tue": { "open": "00:00", "close": "23:59" },
      "wed": { "open": "00:00", "close": "23:59" },
      "thu": { "open": "00:00", "close": "23:59" },
      "fri": { "open": "00:00", "close": "23:59" },
      "sat": { "open": "00:00", "close": "23:59" },
      "sun": { "open": "00:00", "close": "23:59" }
    },
    "breakfastHours": {
      "mon": { "open": "07:00", "close": "10:30" },
      "tue": { "open": "07:00", "close": "10:30" },
      "wed": { "open": "07:00", "close": "10:30" },
      "thu": { "open": "07:00", "close": "10:30" },
      "fri": { "open": "07:00", "close": "10:30" },
      "sat": { "open": "07:30", "close": "11:00" },
      "sun": { "open": "07:30", "close": "10:30" }
    },
    "houseRules": {
      "title": "Normas del hotel",
      "rules": [
        "Horario de silencio 22:00 – 08:00",
        "Prohibido fumar en habitaciones",
        "Visitas hasta las 23:00 con registro en recepción"
      ]
    },
    "hotelPortal": {
      "tagline": "Tu estadía, simplificada desde el QR de la habitación",
      "logoEmoji": "🏨",
      "receptionPhone": "+5491112345678",
      "demoRooms": ["305", "406", "512"],
      "menu": [
        {
          "id": "desayuno",
          "name": "Desayuno en habitación",
          "items": [
            {
              "id": "continental",
              "name": "Desayuno continental",
              "description": "Croissant, mermelada, jugo y café",
              "price": 8500,
              "tags": ["Popular"]
            },
            {
              "id": "fitness",
              "name": "Bowl fitness",
              "description": "Yogur, granola, frutas frescas",
              "price": 9200
            }
          ]
        },
        {
          "id": "comidas",
          "name": "Comidas",
          "items": [
            {
              "id": "burger",
              "name": "Burger Alfred",
              "description": "Carne angus, cheddar, papas rústicas",
              "price": 14500,
              "tags": ["Best seller"]
            },
            {
              "id": "salmon",
              "name": "Salmón grillado",
              "description": "Verduras de estación y limón",
              "price": 18900
            }
          ]
        },
        {
          "id": "bebidas",
          "name": "Bebidas",
          "items": [
            { "id": "agua", "name": "Agua mineral", "description": "500 ml", "price": 2500 },
            { "id": "vino", "name": "Copa de vino", "description": "Malbec de la casa", "price": 6500 }
          ]
        }
      ],
      "facilities": [
        {
          "id": "pool",
          "name": "Piscina climatizada",
          "description": "Toallas en recepción. Ideal para relajarse.",
          "hours": "09:00 – 21:00",
          "location": "Planta baja, jardín",
          "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
        },
        {
          "id": "spa",
          "name": "Spa Alfred",
          "description": "Masajes, sauna y sala de relax.",
          "hours": "10:00 – 20:00",
          "location": "Nivel -1",
          "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
        },
        {
          "id": "gym",
          "name": "Gimnasio",
          "description": "Equipamiento completo, agua y toallas incluidas.",
          "hours": "06:00 – 22:00",
          "location": "Primer piso",
          "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
        }
      ],
      "events": [
        {
          "id": "yoga",
          "title": "Yoga matinal",
          "description": "Sesión guiada en la terraza.",
          "date": "Domingo 21 sep",
          "time": "08:00",
          "location": "Terraza solarium"
        },
        {
          "id": "wine",
          "title": "Cata de vinos",
          "description": "Degustación con sommelier.",
          "date": "Viernes 26 sep",
          "time": "19:30",
          "location": "Salón Alfred"
        }
      ],
      "gallery": [
        {
          "id": "lobby",
          "title": "Lobby Alfred",
          "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
          "category": "Hotel"
        },
        {
          "id": "room",
          "title": "Habitación superior",
          "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
          "category": "Habitaciones"
        }
      ],
      "stay": {
        "checkInDate": "2026-09-19",
        "checkOutDate": "2026-09-22",
        "guestName": "Huésped demo"
      },
      "cleaningSchedule": {
        "timezone": "America/Argentina/Buenos_Aires",
        "weekly": {
          "mon": { "enabled": true, "time": "10:00" },
          "tue": { "enabled": true, "time": "10:00" },
          "wed": { "enabled": true, "time": "10:00" },
          "thu": { "enabled": true, "time": "10:00" },
          "fri": { "enabled": true, "time": "10:00" },
          "sat": { "enabled": false, "time": "11:00" },
          "sun": { "enabled": false, "time": "11:00" }
        },
        "exceptions": [
          {
            "id": "2026-09-21-skip",
            "date": "2026-09-21",
            "type": "skip",
            "note": "Do not disturb"
          }
        ]
      },
      "roomMap": {
        "floor": "3",
        "building": "Torre Alfred",
        "directionsUrl": "https://www.google.com/maps/dir/?api=1&destination=Av.+Corrientes+1234,+Buenos+Aires",
        "mapImage": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
        "steps": [
          "Desde recepción, tomá el ascensor al 3er piso",
          "Salí a la derecha y seguí el pasillo azul",
          "La habitación está al final del pasillo, lado ventana"
        ]
      }
    }
  }'::jsonb,
  'alfred-demo-token-change-me',
  'pro',
  'bab',
  null
) on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  primary_color = excluded.primary_color,
  locale = excluded.locale,
  links = excluded.links,
  settings = excluded.settings,
  tier = excluded.tier,
  vertical = excluded.vertical,
  updated_at = now();
