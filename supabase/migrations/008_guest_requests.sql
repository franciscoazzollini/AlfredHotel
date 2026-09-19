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
