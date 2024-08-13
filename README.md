1. run from `ticketing/auth` the command: `docker build -t [dockerHubId]/auth .` and
   then `docker push [dockerHubId]/auth`.
2. run from `ticketing/tickets` the command: `docker build -t [dockerHubId]/tickets .` and
   then `docker push [dockerHubId]/tickets`.
3. run from `ticketing` the command `skaffold dev`
4. On Win: Add the following to `C:\Windows\System32\drivers\etc\hosts` -> `127.0.0.1 ticketing.dev`
   and `127.0.0.1 rabbitmq.ticketing.dev`
5. run `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_secret`
6. On Browser Navigate to: `https://ticketing.dev/api/users/currentuser`
7. `**If you have unsecure issues just type: "thisisunsafe"`
8. On Chrome press on keyboard: `thisisunsafe` to remove the cert warning
9. run from `ticketing/client` the command: `docker build -t [dockerHubId]/client .`
10. run from `ticketing/client` the command: ` docker push [dockerHubId]/client`
11. Login RabbitMQ Dashboard: `https://rabbitmq.ticketing.dev`

### **If you have unsecure issues just type: "thisisunsafe"