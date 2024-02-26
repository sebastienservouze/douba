# Douba

Douba est un projet fullstack destiné à simplifier l'utilisation des plateformes de téléchargement. 

Il met à disposiation un site web permettant d'effectuer des recherches sur les plateformes de téléchargement et de télécharger les fichiers directement depuis le site. 

Il permet également de gérer les téléchargements en cours et de consulter leurs progressions.

## Fonctionnement

La partie backend 

## Installation

```npm run full-install```

## Utilisation

```npm run start```

Se rendre sur *localhost:4200* pour accéder à l'interface web.
Celle ci est également accessible sur le réseau local depuis l'adresse IP 
sur laquelle tourne le serveur.

## Plateformes supportées

- YggTorrent

## Configuration

Le fichier de configuration se trouve dans le dossier `config` et se nomme `config.ts`. Il permet de configurer les informations suivantes

```typescript
// Config.ts
export const Config = {
    apiPort: 3000,
    wssPort: 8080,
    basePath: 'D:/Douba',
}
```

Un second fichier de configuration permet de renseigner les identifiants de connexion aux plateformes de téléchargement. Il se trouve dans le dossier `config` et se nomme `credentials.ts`. 

**Attention** : Ce fichier n'est pas versionné et doit être créé manuellement.

```typescript
// Credential.ts
export const Credentials = {
    yggtorrent: {
        username: 'username',
        password: 'password'
    }
}
```