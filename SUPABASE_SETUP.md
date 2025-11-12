# Supabase Security Setup

This document outlines the security measures to implement if/when integrating Supabase for user-generated content and analytics.

### Problem

- Potential
### Solution
- Enables user tracking across sessions
- Reveals internal user identifiers
- Potential for enumeration attacks

### Solution
Use **public views** with pseudonymous IDs for all public-facing data.

---

## Database Schema Setup

### 1) Add Public IDs to Profiles

```sql
-- Ensure RLS on the base table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add pseudonymous public_id column
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS public_id UUID;

-- Populate existing records
UPDATE public.profiles
SET public_id = gen_random_uuid()
WHERE public_id IS NULL;



-- Optional: control what content appe





SELECT

  t.ta
  p.public_id AS author_public_id
JOIN public.profiles p ON p.use
```
**K

- ✅ Pseudonymous author I

```sql

-- Gra
```
### 5) Row-Level Security Policies
Owner-
```sql
DROP POLI
  ON public.tran

DROP POLICY IF EXISTS "insert own translations" ON public.translations;
  ON public.translations FOR INSE

DROP POLICY IF EXISTS "update own translations"
  ON public.translations 
  W

**Key privacy features:**
- ✅ No `user_id` exposed
- ✅ Timestamps rounded to the hour
- ✅ Only public content visible
- ✅ Pseudonymous author ID

### 4) Grant Permissions

```sql
-- Revoke direct access to base table
REVOKE ALL ON TABLE public.translations FROM anon;

-- Grant read-only access to public view
GRANT SELECT ON public.translations_public TO anon, authenticated;
```

### 5) Row-Level Security Policies

Owner-only access to base table:

```sql
-- SELECT: Users can only read their own translations
DROP POLICY IF EXISTS "select own translations" ON public.translations;
CREATE POLICY "select own translations"
  ON public.translations FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: Users can only create their own translations
DROP POLICY IF EXISTS "insert own translations" ON public.translations;
CREATE POLICY "insert own translations"
  ON public.translations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own translations
DROP POLICY IF EXISTS "update own translations" ON public.translations;
CREATE POLICY "update own translations"
  ON public.translations FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own translations
DROP POLICY IF EXISTS "delete own translations" ON public.translations;
CREATE POLICY "delete own translations"
  ON public.translations FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
```

---

## Edge Function Security

### Config: `supabase/config.toml`

```toml
[functions.analyze-data]
verify_jwt = true  # Enforce authentication
```

### Function Code Pattern

```typescript
// supabase/functions/analyze-data/index.ts
import { createClient } from '@supabase/supabase-js'

Deno.serve(async (req) => {
  // Get auth token from request
  const authHeader = req.headers.get('Authorization')
  
  // Create authenticated client
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: authHeader ?? '' }
      }
    }
  )

  // Query PUBLIC VIEW (not base table)
  const { data: translations, error } = await supabaseClient
    .from('translations_public')
    .select('id, text, source_lang, target_lang, created_at, author_public_id')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Process and return data
  return new Response(
    JSON.stringify({ data: translations }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

---

## Client-Side Integration

### Reading Public Feed

```typescript
// For unauthenticated public feed
const { data, error } = await supabase
  .from('translations_public')
  .select('id, text, source_lang, target_lang, created_at, author_public_id')
  .order('created_at', { ascending: false })
  .limit(20)
```

### User's Own Content

```typescript
// For authenticated user's own content
const { data: myTranslations, error } = await supabase
  .from('translations')
  .select('*')
  .eq('user_id', user.id)
```

### Realtime Considerations

⚠️ **Important**: You cannot subscribe to views with Realtime.

**Solution**: Create a mirrored table for public feed:

```sql
-- Public feed table (anonymized copy)
CREATE TABLE public.public_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  translation_id UUID NOT NULL,
  text TEXT NOT NULL,
  source_lang TEXT NOT NULL,
  target_lang TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  author_public_id UUID NOT NULL
);

-- Trigger to populate on insert
CREATE OR REPLACE FUNCTION mirror_to_public_feed()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_public = true THEN
    INSERT INTO public.public_feed (
      translation_id,
      text,
      source_lang,
      target_lang,
      created_at,
      author_public_id
    )
    SELECT
      NEW.id,
      NEW.text,
      NEW.source_lang,
      NEW.target_lang,
      DATE_TRUNC('hour', NEW.created_at),
      p.public_id
    FROM public.profiles p
    WHERE p.user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER mirror_public_translations
  AFTER INSERT ON public.translations
  FOR EACH ROW EXECUTE FUNCTION mirror_to_public_feed();
```

Then subscribe to `public_feed` instead:

```typescript
const subscription = supabase
  .channel('public-feed')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'public_feed'
  }, (payload) => {
    console.log('New public translation:', payload.new)
  })
  .subscribe()
```

---

## Environment Variables

### Supabase Dashboard
**Project Settings → Functions → Environment Variables**

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
LOVABLE_API_KEY=your-api-key-here
```

### GitHub Secrets (for build-time vars)
**Repo → Settings → Secrets and variables → Actions → Variables**

```

2. Deploy public views
4. 

---

- [



















































