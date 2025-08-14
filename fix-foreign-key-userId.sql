-- 1. Drop existing foreign key constraint
ALTER TABLE "Business" DROP CONSTRAINT IF EXISTS "Business_userId_fkey";

-- 2. Drop the User table (we don't need it, using auth.users instead)
DROP TABLE IF EXISTS "User" CASCADE;

-- 3. Add new foreign key constraint from userId to auth.users.id
ALTER TABLE "Business" 
ADD CONSTRAINT "Business_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES auth.users(id) ON DELETE CASCADE;

-- 4. Create index for better performance
CREATE INDEX IF NOT EXISTS "Business_userId_idx" ON "Business"("userId");
