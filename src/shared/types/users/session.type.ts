// Basic type matching the database schema
export interface Session {
  id: string;
  userId: string;
  refreshToken: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: Date;
  revokedAt: Date | null;
  deviceName: string;
  lastSeenAt: Date;
  createdAt: Date;
}

// For inserting new sessions (omitting auto-generated fields)
export type CreateSession = Omit<
  Session,
  'id' | 'createdAt' | 'lastSeenAt' | 'revokedAt'
> & {
  createdAt?: Date;
  lastSeenAt?: Date;
  revokedAt?: Date | null;
};

// For updating sessions (all fields optional except id)
export type UpdateSession = Partial<Omit<Session, 'id'>> & {
  id: string;
};
