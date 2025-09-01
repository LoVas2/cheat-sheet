# 📅 Migration ECS Fargate → EC2 Spot (Spoteet)

## ✨ Objectif

Migrer l'exécution des microservices (3 backends + nginx) de **ECS Fargate** vers une **instance EC2 Spot** afin de réduire drastiquement les coûts (\~199 \$ → \~5 \$/mois).

---

## Ὄb Contexte initial ECS

* **Architecture** :

    * 1 tâche ECS (Fargate) avec 4 containers :
        * `dev-spoteet-nginx`
        * `dev-spoteet-auth`
        * `dev-spoteet-events`
        * `dev-spoteet-content`
    * Déployée avec `assignPublicIp: ENABLED` ⚠ **obligatoire** sinon la tâche ne peut pas sortir sur internet et récupérer les fichiers de conf depuis S3
    * Exposition via un **Application Load Balancer (ALB)**
* **Rôles IAM attachés** :

    * `ecsTaskExecutionRole` incluant :
        * `AmazonS3ReadOnlyAccess`
        * `AmazonEC2ContainerRegistryReadOnly`
        * `SecretsManagerReadWrite`
        * `MediaConvert` + `iam:PassRole`

---

## 🚀 Migration vers EC2 Spot

### 1. Lancement de l'instance Spot

* Name : *dev-spoteet-backend*
* AMI : `Amazon Linux 2023`
* Architecture : `ARM64`
* Type : `t4g.small` (2 vCPU / 2 GB RAM)
* Key pair : `dev-spoteet-*`
* Subnet : public avec IP publique
* Auto assign public IP : `true`
* SG *dev-spoteet-backend-sg* :
    * Port 22 ouvert (SSH)
    * Port 80 ouvert (pour ALB)
* Adanced detail : 
  * IAM instance profile : `dev-spoteet-ec2-ssm-role`
    * Permissions :
        * `AmazonSSMManagedInstanceCore`
        * `AmazonEC2ContainerRegistryReadOnly`
        * `AmazonS3ReadOnlyAccess`
        * `SecretsManagerReadWrite`
  * Purchasing option: `Spot instances`

⚠️ Autoriser le nouveau SG à contacter le SG de la DB sur le port 3306

---

### 2. Installation de Docker et lancement des applis

```bash
sudo yum update -y
sudo yum install -y docker
sudo systemctl enable --now docker
docker ps
sudo usermod -aG docker ec2-user
sudo su - ec2-user
docker ps
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-aarch64" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose version
mkdir spoteet && cd spoteet/
aws s3 cp s3://dev-spoteet/project-conf/auth-conf.dev.env ./auth.env
aws s3 cp s3://dev-spoteet/project-conf/content-conf.dev.env ./content.env
aws s3 cp s3://dev-spoteet/project-conf/events-conf.dev.env ./events.env

```

### 3. Authentification à ECR

```bash
aws ecr get-login-password --region eu-west-3 | \
  docker login --username AWS --password-stdin 314146336046.dkr.ecr.eu-west-3.amazonaws.com
```

---

## ⚙️ Déploiement applicatif avec Docker Compose

### docker-compose.yml (extrait)

```yaml
services:
  nginx:
    image: 314146336046.dkr.ecr.eu-west-3.amazonaws.com/spoteet-nginx:latest
    ports:
      - "80:80"
    depends_on:
      - auth

  auth:
    image: 314146336046.dkr.ecr.eu-west-3.amazonaws.com/spoteet-auth:latest
    ports:
      - "8080:8080"
    env_file:
      - ./auth.env
```

---
