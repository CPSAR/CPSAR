-- Publicly readable partner logo files; uploads and changes remain admin-only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cpsar-partner-logos', 'cpsar-partner-logos', true, 5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read CPSAR partner logos" on storage.objects;
create policy "Public can read CPSAR partner logos"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'cpsar-partner-logos');
drop policy if exists "Site admins upload CPSAR partner logos" on storage.objects;
create policy "Site admins upload CPSAR partner logos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'cpsar-partner-logos' and (select public.is_site_admin()));
drop policy if exists "Site admins update CPSAR partner logos" on storage.objects;
create policy "Site admins update CPSAR partner logos"
  on storage.objects for update to authenticated
  using (bucket_id = 'cpsar-partner-logos' and (select public.is_site_admin()))
  with check (bucket_id = 'cpsar-partner-logos' and (select public.is_site_admin()));
drop policy if exists "Site admins delete CPSAR partner logos" on storage.objects;
create policy "Site admins delete CPSAR partner logos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'cpsar-partner-logos' and (select public.is_site_admin()));

-- Seed the named official partners as editable draft records. Their official websites
-- can be reviewed and the records published by CPSAR staff in the admin area.
insert into public.partners (name, website, display_order, published)
select seed.name, seed.website, seed.display_order, true
from (values
  ('Israel Embassy in Rwanda', 'https://embassies.gov.il/rwanda/en', 1),
  ('RBC', 'https://rbc.gov.rw', 2),
  ('University of Rwanda', 'https://ur.ac.rw', 3),
  ('FIRAT', 'https://www.firat.edu.tr', 4),
  ('Solid Minds Counseling Clinic', 'https://solidminds.rw', 5)
) as seed(name, website, display_order)
where not exists (
  select 1 from public.partners existing
  where lower(btrim(existing.name)) = lower(btrim(seed.name))
);
