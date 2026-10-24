-- Public forms may submit new rows. No public role can read or modify stored data.
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) between 3 and 254),
  subject text not null check (subject in (
    'General Enquiry', 'Membership', 'Programmes & Events',
    'Research Collaboration', 'Partnerships & Sponsorship', 'Media & Press', 'Other'
  )),
  message text not null check (char_length(message) between 10 and 500),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from anon, authenticated;
grant insert (name, email, subject, message) on public.contact_messages to anon;
grant usage on sequence public.contact_messages_id_seq to anon;
drop policy if exists "Visitors can submit contact messages" on public.contact_messages;
create policy "Visitors can submit contact messages"
  on public.contact_messages for insert to anon with check (true);

create table if not exists public.newsletter_subscribers (
  email text primary key check (char_length(email) between 3 and 254),
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
revoke all on public.newsletter_subscribers from anon, authenticated;
grant insert (email) on public.newsletter_subscribers to anon;
drop policy if exists "Visitors can subscribe to the newsletter" on public.newsletter_subscribers;
create policy "Visitors can subscribe to the newsletter"
  on public.newsletter_subscribers for insert to anon with check (true);

-- Website-managed content tables are reserved for trusted administrators.
create table if not exists public.programmes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  body text not null default '',
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  location text not null default '',
  starts_at timestamptz,
  ends_at timestamptz,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  body text not null default '',
  image_url text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null default '',
  resource_url text,
  category text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text not null default '',
  caption text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.leadership_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null default '',
  image_url text,
  display_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Content is private until authenticated admin access and public read policies are designed.
alter table public.programmes enable row level security;
alter table public.events enable row level security;
alter table public.news_articles enable row level security;
alter table public.resources enable row level security;
alter table public.gallery_items enable row level security;
alter table public.leadership_members enable row level security;

revoke all on public.programmes, public.events, public.news_articles,
  public.resources, public.gallery_items, public.leadership_members
  from anon, authenticated;
