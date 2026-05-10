import { env, getAccount } from '@config/env';

export const users = {
  selected: getAccount(env.ACCOUNT_PROFILE),
  admin: getAccount('admin'),
  ess: getAccount('ess')
} as const;
