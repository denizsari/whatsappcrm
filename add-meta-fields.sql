-- Add Meta OAuth fields to Business table
ALTER TABLE "Business" 
ADD COLUMN IF NOT EXISTS "metaAccessToken" TEXT,
ADD COLUMN IF NOT EXISTS "metaTokenExpiry" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "metaBusinessAccounts" JSONB,
ADD COLUMN IF NOT EXISTS "metaWhatsAppAccounts" JSONB,
ADD COLUMN IF NOT EXISTS "metaConnected" BOOLEAN DEFAULT false;

-- Create index for Meta connected businesses
CREATE INDEX IF NOT EXISTS "Business_metaConnected_idx" ON "Business"("metaConnected");
