
install as a service

https://www.digitalocean.com/community/tutorials/como-configurar-una-aplicacion-de-node-js-para-produccion-en-ubuntu-18-04-es



BACKEND

### Initiate PM2 instance
```
pm2 start yarn --name "vision-backend" --interpreter bash -- start:prod
```

### deploy command
```
cd .. && cd home && cd vision-inmobiliaria-nest && yarn deploy
```


### Manual deploy command
```
yarn install && yarn build
pm2 stop nestjs
pm2 start nestjs
pm2 logs nestjs
```



