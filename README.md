## My Ride API 

#### Documentation

#### Initialize environment
- Configure `.env` from `.env_`

#### set the following environment variables on cmd as they are required to initialize up
````shell script
SET DB=
SET DB_USER=
SET DB_PASS=
SET CLOUDINARY_URL=
````

#### install packages
````shell script
npm i
````

#### install sequelize cli if you haven't installed yet
````shell script
npm i -g sequelize-cli
````

#### create database on mysql
````shell script
mysql -u root -p
mysql> CREATE DATABSE IF NOT EXISTS my_ride
````

#### run migrations
````shell script
sequelize db:migrate
````


#### Testing
```shell script 
npm run test
```

#### Running on development
```shell script 
npm run dev
```

