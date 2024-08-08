1. run from `ticketing/auth` the command: `docker build -t [dockerHubId]/auth .`
2. run from `ticketing/auth` the command: ` docker push [dockerHubId]/auth`
3. run from `ticketing` the command `skaffold dev`
4. On Win: Add the following to `C:\Windows\System32\drivers\etc\hosts` -> `127.0.0.1 ticketing.dev`
5. On Browser Navigate to: `https://ticketing.dev/api/users/currentuser`
6. On Chrome press on keyboard: `thisisunsafe` to remove the cert warning
7. run from `ticketing/client` the command: `docker build -t [dockerHubId]/client .`
8. run from `ticketing/client` the command: ` docker push [dockerHubId]/client`
