#!/bin/bash -x
echo "hello, I'm startup.sh at: $(date)" >> /var/workdir/test.log

mongo < /var/workdir/dbSetup.js
echo "auth = true" >> /data/dbconfig/mongodb.conf
