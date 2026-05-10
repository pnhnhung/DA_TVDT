import fs from 'node:fs';
import path from 'node:path';
import * as dotenv from 'dotenv';

export type TestEnvironment = 'dev' | 'stg' | 'uat' | 'prod' | string;
export type AccountProfile = 'admin' | 'recruiter' | 'viewer' | string;
export type DbClient = 'mysql' | 'mariadb' | 'postgres';

const rootDir = process.cwd();

// Load root .env first so TEST_ENV / ENV_FILE can be selected locally.
dotenv.config({ path: path.resolve(rootDir, '.env'), override: false });

const selectedEnv = process.env.TEST_ENV || 'dev';
const selectedEnvFile = process.env.ENV_FILE || `config/environments/${selectedEnv}.env`;
const selectedEnvPath = path.resolve(rootDir, selectedEnvFile);

if (fs.existsSync(selectedEnvPath)) {
  dotenv.config({ path: selectedEnvPath, override: false });
}

function readEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;
  if (value === undefined || value === '') {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Check .env or ${selectedEnvFile}. Do not commit real secrets.`
    );
  }
  return value;
}

function readOptionalEnv(name: string, defaultValue = ''): string {
  return process.env[name] ?? defaultValue;
}

function readNumberEnv(name: string, defaultValue: number): number {
  const raw = process.env[name];
  if (!raw) return defaultValue;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Environment variable ${name} must be a number. Received: ${raw}`);
  }
  return parsed;
}

function readBooleanEnv(name: string, defaultValue: boolean): boolean {
  const raw = process.env[name];
  if (!raw) return defaultValue;
  return ['1', 'true', 'yes', 'y', 'on'].includes(raw.toLowerCase());
}

const dbEnabled = readBooleanEnv('DB_ENABLED', false);

export const env = {
  TEST_ENV: selectedEnv as TestEnvironment,
  ENV_FILE: selectedEnvFile,
  ENV_FILE_LOADED: fs.existsSync(selectedEnvPath),
  ENVIRONMENT_NAME: readOptionalEnv('ENVIRONMENT_NAME', selectedEnv),
  ACCOUNT_PROFILE: readOptionalEnv('ACCOUNT_PROFILE', 'admin') as AccountProfile,

  APP_DOMAIN: readOptionalEnv('APP_DOMAIN'),
  BASE_URL: readEnv('BASE_URL', 'https://opensource-demo.orangehrmlive.com'),
  API_BASE_URL: readOptionalEnv('API_BASE_URL'),

  accounts: {
    admin: {
      username: readEnv('ADMIN_USERNAME', 'Admin'),
      password: readEnv('ADMIN_PASSWORD', 'admin123')
    },
    recruiter: {
      username: readOptionalEnv('RECRUITER_USERNAME', readEnv('ADMIN_USERNAME', 'Admin')),
      password: readOptionalEnv('RECRUITER_PASSWORD', readEnv('ADMIN_PASSWORD', 'admin123'))
    },
    viewer: {
      username: readOptionalEnv('VIEWER_USERNAME', readEnv('ADMIN_USERNAME', 'Admin')),
      password: readOptionalEnv('VIEWER_PASSWORD', readEnv('ADMIN_PASSWORD', 'admin123'))
    },
    ess: {
      username: readOptionalEnv('ESS_USERNAME'),
      password: readOptionalEnv('ESS_PASSWORD')
    }
  },

  db: {
    enabled: dbEnabled,
    client: readOptionalEnv('DB_CLIENT', 'mysql') as DbClient,
    host: dbEnabled ? readEnv('DB_HOST') : readOptionalEnv('DB_HOST', '127.0.0.1'),
    port: readNumberEnv('DB_PORT', readOptionalEnv('DB_CLIENT', 'mysql') === 'postgres' ? 5432 : 3306),
    database: dbEnabled ? readEnv('DB_NAME') : readOptionalEnv('DB_NAME'),
    username: dbEnabled ? readEnv('DB_USERNAME') : readOptionalEnv('DB_USERNAME'),
    password: dbEnabled ? readEnv('DB_PASSWORD') : readOptionalEnv('DB_PASSWORD'),
    ssl: readBooleanEnv('DB_SSL', false)
  },

  sshTunnel: {
    enabled: readBooleanEnv('SSH_TUNNEL_ENABLED', false),
    host: readOptionalEnv('SSH_HOST'),
    port: readNumberEnv('SSH_PORT', 22),
    username: readOptionalEnv('SSH_USER'),
    password: readOptionalEnv('SSH_PASSWORD'),
    privateKeyPath: readOptionalEnv('SSH_PRIVATE_KEY_PATH'),
    localPort: readNumberEnv('SSH_LOCAL_PORT', 13306)
  },

  keys: {
    apiKey: readOptionalEnv('API_KEY'),
    clientId: readOptionalEnv('CLIENT_ID'),
    clientSecret: readOptionalEnv('CLIENT_SECRET'),
    encryptionKey: readOptionalEnv('ENCRYPTION_KEY')
  },

  DEFAULT_TIMEOUT_MS: readNumberEnv('DEFAULT_TIMEOUT_MS', 10_000),
  EXPECT_TIMEOUT_MS: readNumberEnv('EXPECT_TIMEOUT_MS', 10_000),
  ACTION_TIMEOUT_MS: readNumberEnv('ACTION_TIMEOUT_MS', 15_000),
  NAVIGATION_TIMEOUT_MS: readNumberEnv('NAVIGATION_TIMEOUT_MS', 30_000)
} as const;

export function getAccount(profile: AccountProfile = env.ACCOUNT_PROFILE) {
  const account = env.accounts[profile as keyof typeof env.accounts];
  if (!account) {
    throw new Error(`Unknown ACCOUNT_PROFILE: ${profile}`);
  }
  return account;
}

export function redactedRuntimeInfo() {
  return {
    testEnv: env.TEST_ENV,
    envFile: env.ENV_FILE,
    envFileLoaded: env.ENV_FILE_LOADED,
    accountProfile: env.ACCOUNT_PROFILE,
    baseUrl: env.BASE_URL,
    apiBaseUrl: env.API_BASE_URL,
    db: {
      enabled: env.db.enabled,
      client: env.db.client,
      host: env.db.host,
      port: env.db.port,
      database: env.db.database,
      ssl: env.db.ssl
    },
    keys: {
      apiKeyConfigured: Boolean(env.keys.apiKey),
      clientIdConfigured: Boolean(env.keys.clientId),
      clientSecretConfigured: Boolean(env.keys.clientSecret),
      encryptionKeyConfigured: Boolean(env.keys.encryptionKey)
    }
  };
}
