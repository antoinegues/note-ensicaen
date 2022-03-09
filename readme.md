#Ensicaen note parser

Ce projet a pour but de parser la page des notes de l'application de note de l'ENSICAEN.


##Utilisation

1.Compiler l'application avec :
```
    npm run compil
```
2.Lancer l'application avec : 
```
npm run server
```
3.Appeler l'api avec L'URL et les paramètres suivants :
```
curl -d "username=[username]&password=[password]" -X POST http://[ip_du_serveur]:3000/getNote 
```

## Structures des données 

### Note
```ts
class Note {
    note: number;
    bareme: number;
    name: string;
    coef: number;
}
```

### Matière
```ts
class Matiere {
    name: string;
    code: string;
    notes: Note[];
}
```

### UE

```ts
class UE {
    name: string;
    matieres: Matiere[];
}
```

### Mode développement 

Lancer le serveur avec 
```
npm run dev
```
