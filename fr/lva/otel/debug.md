# Debug en local avec opentelemetry

1 - Démarrer Jaeger

```
docker run -d --name jaeger \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 16686:16686 -p 4317:4317 -p 4318:4318 \
  jaegertracing/all-in-one:1.55

```
2 - 

2.1 - Pour un projet java rajouter la JVM option ``-javaagent:/Chemin/opentelemetry-javaagent.jar``

2.2 - Pour Keycloak rajouter ça 

```
JAVA_TOOL_OPTIONS="-javaagent:/Chemin/opentelemetry-javaagent.jar" \
OTEL_SERVICE_NAME=keycloak-local \
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 \
OTEL_EXPORTER_OTLP_PROTOCOL=grpc \
OTEL_TRACES_EXPORTER=otlp \
OTEL_METRICS_EXPORTER=none \
OTEL_LOGS_EXPORTER=none \
OTEL_TRACES_SAMPLER=parentbased_traceidratio \
OTEL_TRACES_SAMPLER_ARG=1.0 \
OTEL_PROPAGATORS=tracecontext,baggage \
OTEL_RESOURCE_ATTRIBUTES="deployment.environment=local,service.version=dev" \
bin/kc.sh start-dev --debug
```


Télécharger le jar depuis 
```
curl -L -o opentelemetry-javaagent.jar \
  https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

3 - Rajouter les vars d'env 

```
OTEL_SERVICE_NAME=keycloak-local \
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317 \
OTEL_EXPORTER_OTLP_PROTOCOL=grpc \
OTEL_TRACES_EXPORTER=otlp \
OTEL_METRICS_EXPORTER=none \
OTEL_LOGS_EXPORTER=none \
OTEL_TRACES_SAMPLER=parentbased_traceidratio \
OTEL_TRACES_SAMPLER_ARG=1.0 \
OTEL_PROPAGATORS=tracecontext,baggage \
OTEL_RESOURCE_ATTRIBUTES="deployment.environment=local,service.version=dev" \```
```

4 - Ouvrir http://localhost:16686