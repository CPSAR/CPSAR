-- Store each programme's ordered gallery as public Supabase Storage URLs.
alter table public.programmes
  add column if not exists gallery_images jsonb not null default '[]'::jsonb
  check (jsonb_typeof(gallery_images) = 'array');

-- Keep existing programme cover photos when the gallery feature is introduced.
update public.programmes
set gallery_images = jsonb_build_array(image_url)
where image_url is not null
  and image_url <> ''
  and gallery_images = '[]'::jsonb;
