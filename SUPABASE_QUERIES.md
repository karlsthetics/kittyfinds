# Supabase Database Setup & Queries - Kitty's Finds 🎀

This document contains all the SQL queries required to set up the backend database for the Kitty's Finds e-commerce application.

---

## 1. Core Tables Setup
Run these queries to create the necessary tables for products, categories, orders, and carts.

```sql
-- Profiles Table (User Information)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer',
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Categories Table
CREATE TABLE public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT
);

-- Products Table
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL NOT NULL,
  category TEXT REFERENCES public.categories(slug),
  image TEXT,
  sizes TEXT[],
  colors TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Carts Table (Persistent Storage)
CREATE TABLE public.carts (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  items JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Orders Table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  cart_id TEXT,
  items JSONB NOT NULL,
  customer_info JSONB,
  shipping_info JSONB,
  subtotal DECIMAL,
  tax DECIMAL,
  shipping DECIMAL,
  total DECIMAL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

---

## 2. User Automation (Triggers)
This logic automatically creates a profile entry whenever a new user signs up via Supabase Auth.

```sql
-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, is_admin)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''), 
    'customer',
    false
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run the function after every signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 3. Security & Access Control (RLS)
These commands manage the Row Level Security (RLS) to allow your backend server to process orders and manage users.

```sql
-- Disable RLS for internal management (Recommended for development)
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON public.orders(order_id);
```

---

## 4. Admin Management
How to manually promote a user to an Admin role.

```sql
-- Make a specific user an Admin
-- REPLACE 'your-email@example.com' with the actual email
UPDATE public.profiles 
SET role = 'admin', is_admin = true 
WHERE email = 'your-email@example.com';
```

---

## 5. Useful Select Queries for Testing
```sql
-- View all orders and their items
SELECT order_id, total, status, items FROM public.orders;

-- View all registered profiles and roles
SELECT email, full_name, role FROM public.profiles;

-- View all newsletter subscribers
SELECT * FROM public.newsletter_subscribers;
```
