1. run from `ticketing/auth` the command: `docker build -t orh87/auth .`
2. run from `ticketing` the command `skaffold dev`
3. On Win: Add the following to `C:\Windows\System32\drivers\etc\hosts` -> `127.0.0.1 ticketing.dev`
4. On Browser Navigate to: `https://ticketing.dev/api/users/currentuser`
5. On Chrome press on keyboard: `thisisunsafe` to remove the cert warning
6. run from `ticketing/client` the command: `docker build -t orh87/client .`
