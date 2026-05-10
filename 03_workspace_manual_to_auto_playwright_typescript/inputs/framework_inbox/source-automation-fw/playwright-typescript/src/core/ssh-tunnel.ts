/**
 * ssh-tunnel.ts
 *
 * Tạo SSH Local Port Forward để tunnel kết nối DB qua SSH server.
 * - Khi DB_HOST là IP nội bộ (Docker bridge) không accessible từ bên ngoài,
 *   helper này SSH vào server rồi forward port nội bộ ra localhost.
 *
 * Cấu hình (trong .env):
 *   SSH_TUNNEL_ENABLED=true
 *   SSH_HOST=tuanlm.ddns.net
 *   SSH_PORT=22
 *   SSH_USER=username
 *   SSH_PASSWORD=secret        (hoặc dùng SSH_PRIVATE_KEY_PATH)
 *   SSH_PRIVATE_KEY_PATH=/path/to/id_rsa
 *   SSH_LOCAL_PORT=13306       (port trên localhost để forward đến DB)
 *
 * Cách hoạt động:
 *   localhost:13306 → SSH tunnel → SSH server → DB_HOST:DB_PORT
 */

import { Client } from 'ssh2';
import * as net from 'net';
import * as fs from 'fs';
import { env } from '@config/env';

interface TunnelHandle {
  server: net.Server;
  sshClient: InstanceType<typeof Client>;
  localPort: number;
  close: () => Promise<void>;
}

let activeTunnel: TunnelHandle | null = null;

/**
 * Tạo SSH tunnel nếu SSH_TUNNEL_ENABLED=true.
 * Trả về local port để mysql2 connect vào.
 * Nếu không dùng tunnel, trả về null (dùng DB_HOST/DB_PORT trực tiếp).
 */
export async function openSshTunnel(): Promise<number | null> {
  const ssh = env.sshTunnel;

  if (!ssh.enabled) {
    return null;
  }

  if (activeTunnel) {
    console.log(`[SshTunnel] ♻️  Reusing existing tunnel on localhost:${activeTunnel.localPort}`);
    return activeTunnel.localPort;
  }

  if (!ssh.host) throw new Error('[SshTunnel] SSH_HOST is required when SSH_TUNNEL_ENABLED=true');
  if (!ssh.username) throw new Error('[SshTunnel] SSH_USER is required when SSH_TUNNEL_ENABLED=true');

  const dbHost = env.db.host;
  const dbPort = env.db.port;
  const localPort = ssh.localPort;

  console.log(`[SshTunnel] 🔐 Opening tunnel: localhost:${localPort} → ${ssh.host}:${ssh.port} → ${dbHost}:${dbPort}`);

  return new Promise((resolve, reject) => {
    const sshClient = new Client();

    const connectConfig: Parameters<typeof sshClient.connect>[0] = {
      host: ssh.host,
      port: ssh.port,
      username: ssh.username,
    };

    if (ssh.privateKeyPath && fs.existsSync(ssh.privateKeyPath)) {
      connectConfig.privateKey = fs.readFileSync(ssh.privateKeyPath);
    } else if (ssh.password) {
      connectConfig.password = ssh.password;
    } else {
      reject(new Error('[SshTunnel] SSH auth method not configured. Set SSH_PASSWORD or SSH_PRIVATE_KEY_PATH.'));
      return;
    }

    const server = net.createServer((localSocket) => {
      sshClient.forwardOut(
        '127.0.0.1', localPort,
        dbHost, dbPort,
        (err, stream) => {
          if (err) {
            console.error('[SshTunnel] ❌ forwardOut error:', err.message);
            localSocket.destroy();
            return;
          }
          localSocket.pipe(stream);
          stream.pipe(localSocket);

          stream.on('close', () => localSocket.destroy());
          localSocket.on('close', () => stream.destroy());
          localSocket.on('error', () => stream.destroy());
          stream.on('error', () => localSocket.destroy());
        }
      );
    });

    server.listen(localPort, '127.0.0.1', () => {
      sshClient.connect(connectConfig);
    });

    server.on('error', (err) => {
      reject(new Error(`[SshTunnel] Local server error: ${err.message}`));
    });

    sshClient.on('ready', () => {
      console.log(`[SshTunnel] ✅ Tunnel ready — mysql2 → 127.0.0.1:${localPort}`);

      activeTunnel = {
        server,
        sshClient,
        localPort,
        close: () => closeSshTunnel()
      };

      resolve(localPort);
    });

    sshClient.on('error', (err) => {
      server.close();
      reject(new Error(`[SshTunnel] SSH error: ${err.message}`));
    });
  });
}

/**
 * Đóng SSH tunnel và giải phóng local port.
 * Gọi trong globalTeardown hoặc sau khi test suite hoàn tất.
 */
export async function closeSshTunnel(): Promise<void> {
  if (!activeTunnel) return;

  console.log('[SshTunnel] 🔒 Closing SSH tunnel...');
  const { server, sshClient } = activeTunnel;
  activeTunnel = null;

  await new Promise<void>((resolve) => {
    server.close(() => resolve());
    sshClient.end();
  });

  console.log('[SshTunnel] ✅ SSH tunnel closed.');
}

/**
 * Lấy connection config cho mysql2/pg.
 * - Nếu SSH tunnel active: connect qua 127.0.0.1:localPort
 * - Nếu không: connect trực tiếp DB_HOST:DB_PORT
 */
export function getDbConnectionTarget(): { host: string; port: number } {
  if (activeTunnel) {
    return { host: '127.0.0.1', port: activeTunnel.localPort };
  }
  return { host: env.db.host, port: env.db.port };
}
