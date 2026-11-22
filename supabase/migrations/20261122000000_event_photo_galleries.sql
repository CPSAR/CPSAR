-- Allow campaigns, outreaches, and other events to have their own public photo gallery.
alter table public.events
  add column if not exists gallery_images jsonb not null default '[]'::jsonb
  check (jsonb_typeof(gallery_images) = 'array');

-- Keep existing event cover images visible in their new gallery.
update public.events
set gallery_images = jsonb_build_array(image_url)
where image_url is not null
  and image_url <> ''
  and gallery_images = '[]'::jsonb;
