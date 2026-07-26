# Questionnaires PROMs — SF-12 + Oxford hanche/genou

Site statique sans serveur, prêt à publier gratuitement sur GitHub Pages.

## Fonctionnalités

- saisie d’un identifiant ;
- choix initial genou ou hanche ;
- questionnaire SF-12 puis Oxford correspondant ;
- calcul local du SF-12 PCS et MCS ;
- calcul Oxford sur 0–48, 48 correspondant au meilleur état ;
- résumé final avec ID ;
- copie, impression et export CSV ;
- aucune donnée transmise ou sauvegardée par le site.

## Publication sur GitHub Pages

1. Créez un nouveau dépôt GitHub, par exemple `questionnaires-proms`.
2. Déposez `index.html`, `styles.css` et `app.js` à la racine du dépôt.
3. Dans GitHub : **Settings → Pages**.
4. Dans **Build and deployment**, sélectionnez **Deploy from a branch**.
5. Choisissez la branche `main`, dossier `/ (root)`, puis **Save**.
6. L’adresse publique apparaîtra dans la page GitHub Pages.

## Vérification rapide

- Toutes les meilleures réponses Oxford doivent produire `48/48`.
- Toutes les réponses SF-12 correspondant au meilleur état de chaque item produisent environ :
  - PCS `56.58`
  - MCS `60.76`

## Important : droits et validité des questionnaires

Les textes intégrés dans ce prototype sont des libellés abrégés et paraphrasés, destinés à tester le fonctionnement du site. Ils ne doivent pas être considérés comme une version linguistiquement validée.

Avant un usage clinique, institutionnel ou de recherche :

- obtenir l’autorisation/licence applicable pour le SF-12 ;
- obtenir l’autorisation/licence applicable pour l’Oxford Hip Score et l’Oxford Knee Score ;
- remplacer dans `app.js` les libellés par les versions françaises officielles autorisées, sans modifier l’ordre des réponses ;
- valider les résultats sur plusieurs cas tests avec un outil de référence ;
- vérifier les exigences RGPD et institutionnelles, particulièrement si l’identifiant permet de réidentifier un patient.

## Méthode de calcul

### Oxford

Chaque réponse est cotée de 4 à 0, de la meilleure à la plus mauvaise. Les 12 items sont additionnés : score total de 0 à 48.

### SF-12

Le site implémente l’algorithme SF-12 v1 normé sur la population américaine : chaque modalité contribue séparément au PCS et au MCS, puis les constantes 56.57706 et 60.75781 sont ajoutées. Une réponse est obligatoire à chacun des 12 items.

## Fichiers

- `index.html` : structure du site ;
- `styles.css` : présentation responsive et impression ;
- `app.js` : questionnaires, validation et calcul des scores.
