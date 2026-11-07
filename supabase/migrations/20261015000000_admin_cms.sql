-- Complete the content CMS while keeping public reads limited to published records.

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.site_admins enable row level security;
revoke all on public.site_admins from anon, authenticated;
grant select on public.site_admins to authenticated;
drop policy if exists "Admins can read their own access record" on public.site_admins;
create policy "Admins can read their own access record"
  on public.site_admins for select to authenticated
  using (user_id = auth.uid());

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.site_admins
    where user_id = (select auth.uid()) and active = true
  );
$$;
revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to anon, authenticated;

alter table public.events
  add column if not exists body text not null default '',
  add column if not exists category text not null default 'Event',
  add column if not exists featured boolean not null default false;

alter table public.news_articles
  add column if not exists author text not null default '',
  add column if not exists category text not null default 'News',
  add column if not exists featured boolean not null default false;

alter table public.resources
  add column if not exists slug text,
  add column if not exists body text not null default '';
create unique index if not exists resources_slug_unique on public.resources(slug) where slug is not null;

alter table public.contact_messages
  add column if not exists read_at timestamptz,
  add column if not exists archived_at timestamptz;

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  summary text not null default '',
  website text,
  logo_url text,
  display_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  quote text not null,
  image_url text,
  display_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.alumni_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  graduation_year integer,
  "current_role" text not null default '',
  bio text not null default '',
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  content_table text;
begin
  foreach content_table in array array[
    'programmes', 'events', 'news_articles', 'resources', 'gallery_items',
    'leadership_members', 'partners', 'testimonials', 'alumni_members'
  ] loop
    execute format('grant select on public.%I to anon, authenticated', content_table);
    execute format('grant insert, update, delete on public.%I to authenticated', content_table);
    execute format('drop policy if exists "Public can read published %1$s" on public.%1$I', content_table);
    execute format(
      'create policy "Public can read published %1$s" on public.%1$I for select to anon, authenticated using (published = true)',
      content_table
    );
    execute format('drop policy if exists "Site admins manage %1$s" on public.%1$I', content_table);
    execute format(
      'create policy "Site admins manage %1$s" on public.%1$I for all to authenticated using ((select public.is_site_admin())) with check ((select public.is_site_admin()))',
      content_table
    );

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = content_table and column_name = 'updated_at'
    ) then
      execute format('drop trigger if exists set_updated_at on public.%I', content_table);
      execute format(
        'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',
        content_table
      );
    end if;
  end loop;
end;
$$;

grant select, update, delete on public.contact_messages to authenticated;
drop policy if exists "Site admins manage contact messages" on public.contact_messages;
create policy "Site admins manage contact messages"
  on public.contact_messages for all to authenticated
  using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));

grant select, update, delete on public.newsletter_subscribers to authenticated;
drop policy if exists "Site admins manage newsletter subscribers" on public.newsletter_subscribers;
create policy "Site admins manage newsletter subscribers"
  on public.newsletter_subscribers for all to authenticated
  using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cpsar-resources', 'cpsar-resources', true, 20971520,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read CPSAR documents" on storage.objects;
create policy "Public can read CPSAR documents"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'cpsar-resources');
drop policy if exists "Site admins upload CPSAR documents" on storage.objects;
create policy "Site admins upload CPSAR documents"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'cpsar-resources' and (select public.is_site_admin()));
drop policy if exists "Site admins update CPSAR documents" on storage.objects;
create policy "Site admins update CPSAR documents"
  on storage.objects for update to authenticated
  using (bucket_id = 'cpsar-resources' and (select public.is_site_admin()))
  with check (bucket_id = 'cpsar-resources' and (select public.is_site_admin()));
drop policy if exists "Site admins delete CPSAR documents" on storage.objects;
create policy "Site admins delete CPSAR documents"
  on storage.objects for delete to authenticated
  using (bucket_id = 'cpsar-resources' and (select public.is_site_admin()));
