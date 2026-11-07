-- Public website images are readable by visitors. Only active CPSAR admins can
-- upload, replace, or remove files from this bucket.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cpsar-images', 'cpsar-images', true, 8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read CPSAR content images" on storage.objects;
create policy "Public can read CPSAR content images"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'cpsar-images');

drop policy if exists "Site admins upload CPSAR content images" on storage.objects;
create policy "Site admins upload CPSAR content images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'cpsar-images' and (select public.is_site_admin()));

drop policy if exists "Site admins update CPSAR content images" on storage.objects;
create policy "Site admins update CPSAR content images"
  on storage.objects for update to authenticated
  using (bucket_id = 'cpsar-images' and (select public.is_site_admin()))
  with check (bucket_id = 'cpsar-images' and (select public.is_site_admin()));

drop policy if exists "Site admins delete CPSAR content images" on storage.objects;
create policy "Site admins delete CPSAR content images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'cpsar-images' and (select public.is_site_admin()));
