#!/bin/bash -x
echo 'hello script at: $(date)' >> /var/workdir/test.log

echo $(ps -fe | grep -i mongod) >> /var/workdir/test.log
echo $@ >> /var/workdir/test.log

CMD=$(ps -fe | grep -i "mongod" | wc -l)
if [ $CMD -ne 0 ]; then
  echo "good!";
fi
