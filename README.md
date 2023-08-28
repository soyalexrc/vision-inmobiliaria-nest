
install as a service

https://www.digitalocean.com/community/tutorials/como-configurar-una-aplicacion-de-node-js-para-produccion-en-ubuntu-18-04-es



BACKEND

pm2 start yarn --name "vision-backend" --interpreter bash -- start:prod

yarn install && yarn build
pm2 stop nestjs
pm2 start nestjs
pm2 logs nestjs
