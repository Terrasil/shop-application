#!/bin/bash
kubectl apply -f mysql-pv.yaml
kubectl apply -f mysql-pvc.yaml
kubectl apply -f mysql-deploy.yaml
kubectl apply -f mysql-svc.yaml
mysql-secret.sh