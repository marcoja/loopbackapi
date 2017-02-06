#!/bin/bash -x
echo "hello, I'm startup.sh at: $(date)" >> /var/workdir/test.log

#Setting default database server configuration file.
mongo < /var/workdir/dbSetup.js
echo "auth = true" >> /data/dbconfig/mongodb.conf
echo "logpath = /var/log/mongodb/mongod.log" >> /data/dbconfig/mongodb.conf
