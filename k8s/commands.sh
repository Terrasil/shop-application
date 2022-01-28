kubectl exec -it <nazwa_poda> -- /bin/bash
kubectl get secrets/db-user-pass --template='{{.data.password | base64decode }}'