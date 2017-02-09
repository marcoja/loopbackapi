build:
	@docker build -t img_mongo dbContainer/.
run:
		@docker run -p 49000:27017 --name=server-test -d img_mongo --storageEngine wiredTiger --config /data/dbconfig/mongodb.conf
setlog:
		@mkdir appLogs
		@touch appLogs/appLog.log
setup: setlog
	@docker exec server-test /bin/bash /var/workdir/startup.sh
	@docker stop server-test
	@docker start server-test
start:
	@docker start server-test
restart:
	@docker stop server-test
	@docker start server-test
stop:
	@docker stop server-test
clean:	stop
	@docker rm -v -f server-test
shell:
	@docker exec -it server-test /bin/bash
mongoshell:
	@mongo --host 127.0.0.1:49000 appdb -u appAdmin -p
