-- Create razorpay_orders table
CREATE TABLE IF NOT EXISTS public.razorpay_orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'INR',
  receipt_id text NOT NULL,
  status text NOT NULL DEFAULT 'created',
  payment_id text,
  payment_signature text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.razorpay_orders ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own orders
CREATE POLICY "Users can view their own orders"
  ON public.razorpay_orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own orders
CREATE POLICY "Users can insert their own orders"
  ON public.razorpay_orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own orders
CREATE POLICY "Users can update their own orders"
  ON public.razorpay_orders
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add GIN index for faster querying
CREATE INDEX IF NOT EXISTS razorpay_orders_user_id_idx ON public.razorpay_orders (user_id);
CREATE INDEX IF NOT EXISTS razorpay_orders_status_idx ON public.razorpay_orders (status);

-- Add trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.razorpay_orders
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();