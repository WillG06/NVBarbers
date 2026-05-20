
DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;

CREATE POLICY "Anyone can submit a valid booking"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name)  BETWEEN 1 AND 120
  AND length(email) BETWEEN 3 AND 200
  AND length(phone) BETWEEN 3 AND 40
  AND (notes IS NULL OR length(notes) <= 2000)
  AND coalesce(array_length(services, 1), 0) BETWEEN 1 AND 20
);
