#!/bin/bash
kubectl create secret generic mysql-secret --from-literal=MYSQL_ROOT_PASSWORD=admin