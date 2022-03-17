# ENSICAEN note parser

Ce projet a pour but de parser la page des notes de l'application scolarité de l'ENSICAEN.

## Production

1.Compiler l'application avec :
```
npm run build
```
2.Lancer l'application avec :
```
npm run server
```

## Mode développement

Lancer le serveur avec
```
npm run dev
```


### Récupérer le token

**URL :**

```
/auth/get-login-token/
```

**PARAMS :**

```
username : Identifiant du compte
password : Mot de passe du compte
```

**RESPONSE :** 

```
token : Token de connexion
```

## Récupérer les notes

**URL :**

```
/note/get-note
```

**PARAMS :**

```
token : Token de connexion
```

**RESPONSE :**

```
ues : Tableau de classe "UE" qui contiennent les matières (classe 'Matiere') et les notes (classe 'Note')
```
