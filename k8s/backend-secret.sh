#!/bin/bash
kubectl create secret generic backend-secret --from-literal=DB_PASSWORD=hUUT*hd --from-literal=DB_USER=user01 --from-literal=DB_NAME=db
