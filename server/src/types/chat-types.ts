// src/types/ChatTypes.ts
import { Types } from 'mongoose';

export interface CreateChat {
  firstName: string;
  lastName: string;
  userId: string
}

export interface UpdateChat {
  firstName?: string;
  lastName?: string;
}
