docker build -t harbor.mereith.com/ai/draw .
docker push harbor.mereith.com/ai/draw
kubectl rollout restart deployment aidraw -n tools