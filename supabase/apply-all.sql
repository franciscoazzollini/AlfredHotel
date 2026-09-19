create table if not exists restaurants (
  id text primary key,
  name text not null,
  logo_url text,
  primary_color text default '#2563eb',
  locale text not null default 'en',
  links jsonb not null default '{}',
  edit_token text not null,
  tier text not null default 'free',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists restaurants_id_idx on restaurants(id);
alter table restaurants
  add column if not exists settings jsonb not null default '{}';
create table if not exists reservations (
  id text primary key,
  restaurant_id text not null references restaurants(id) on delete cascade,
  guest_name text not null,
  guest_phone text not null,
  reservation_date date not null,
  reservation_time time not null,
  party_size int not null check (party_size > 0 and party_size <= 50),
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz default now()
);

create index if not exists reservations_restaurant_id_idx on reservations(restaurant_id);
create index if not exists reservations_date_idx on reservations(restaurant_id, reservation_date);
create table if not exists page_views (
  id bigserial primary key,
  restaurant_id text not null references restaurants(id) on delete cascade,
  path text not null,
  created_at timestamptz default now()
);

create index if not exists page_views_restaurant_created_idx
  on page_views(restaurant_id, created_at desc);
-- Owner accounts and public slugs
alter table restaurants
  add column if not exists owner_id uuid references auth.users (id) on delete set null,
  add column if not exists slug text;

create unique index if not exists restaurants_slug_unique_idx
  on restaurants (slug)
  where slug is not null;

create index if not exists restaurants_owner_id_idx
  on restaurants (owner_id);

alter table restaurants enable row level security;

drop policy if exists restaurants_public_select on restaurants;
create policy restaurants_public_select
  on restaurants
  for select
  using (true);

drop policy if exists restaurants_owner_insert on restaurants;
create policy restaurants_owner_insert
  on restaurants
  for insert
  to authenticated
  with check (owner_id = auth.uid());

drop policy if exists restaurants_owner_update on restaurants;
create policy restaurants_owner_update
  on restaurants
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());
-- D'Sunset Beach pilot restaurant (no owner until they sign up via magic link)
-- Public: /r/dsunset-beach  |  Outside: /r/dsunset-beach/outside
-- Link to owner: UPDATE restaurants SET owner_id = '<uuid>' WHERE id = 'dsunset-beach';

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
  owner_id
) values (
  'dsunset-beach',
  'dsunset-beach',
  'D''Sunset Beach',
  '/demo/logo.jpg',
  '#e07a3a',
  'en',
  '{
    "menu": "https://example.com/menu.pdf",
    "googleMaps": "https://maps.google.com/?q=D+Sunset+Beach+Restaurant",
    "instagram": "https://instagram.com",
    "whatsapp": "https://wa.me/34600000000",
    "payment": "https://stripe.com",
    "tip": "https://buy.stripe.com/test_tip"
  }'::jsonb,
  '{
    "wifi": { "ssid": "DSunset_Guest", "password": "welcome2024" },
    "openingHours": {
      "mon": { "open": "12:00", "close": "23:00" },
      "tue": { "open": "12:00", "close": "23:00" },
      "wed": { "open": "12:00", "close": "23:00" },
      "thu": { "open": "12:00", "close": "23:00" },
      "fri": { "open": "12:00", "close": "00:00" },
      "sat": { "open": "11:00", "close": "00:00" },
      "sun": { "open": "11:00", "close": "22:00" }
    },
    "reservationsEnabled": true,
    "kitchenWhatsApp": "34600000000",
    "tableCount": 12,
    "customDomain": "dsunset.menuhub.app",
    "venueDirections": {
      "title": "How to find us",
      "steps": [
        "Locate the hotel main entrance on the street.",
        "Enter through the ground-floor supermarket (main public entrance).",
        "Take the elevator or stairs to the 1st floor.",
        "Follow the signs to D''Sunset Beach."
      ]
    }
  }'::jsonb,
  'dsunset-pilot-change-me',
  'pro',
  null
) on conflict (id) do nothing;
alter table restaurants
  add column if not exists vertical text not null default 'restaurant';

create index if not exists restaurants_vertical_idx on restaurants (vertical);
-- Guest requests from room QR portal
create table if not exists guest_requests (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references restaurants (id) on delete cascade,
  room text not null,
  type text not null,
  message text,
  items jsonb,
  status text not null default 'pending',
  created_at timestamptz default now()
);

create index if not exists guest_requests_hotel_id_idx on guest_requests (hotel_id);
create index if not exists guest_requests_created_at_idx on guest_requests (created_at desc);

alter table guest_requests enable row level security;

drop policy if exists guest_requests_public_insert on guest_requests;
create policy guest_requests_public_insert
  on guest_requests
  for insert
  with check (true);

drop policy if exists guest_requests_public_select on guest_requests;
create policy guest_requests_public_select
  on guest_requests
  for select
  using (true);
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
      ]
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
