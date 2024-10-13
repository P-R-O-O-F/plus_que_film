# 🎬 Plus Que Film

**Plus Que Film**  est une application web moderne et intuitive, permettant de rechercher des films, d'obtenir des informations détaillées sur les films populaires ou spécifiques, ainsi que sur le casting. Le projet est conçu pour être performant, ergonomique, et évolutif, en mettant un accent particulier sur l'expérience utilisateur.

## 🎯 Objectifs du projet

Le projet **Plus Que Film** a été réalisé dans le cadre d'un test technique afin de démontrer des compétences en développement Frontend et la manipulation d'APIs externes, comme celle de [The Movie Database (TMDb)](https://www.themoviedb.org/). L'application se concentre sur les fonctionnalités suivantes :

- **Recherche avancée de films** : Permet de rechercher des films en fonction du titre, du nom d'un acteur, d'un réalisateur, ou d'un studio de production.

- **Tri intelligent des résultats** : Les résultats sont triés pour prioriser ceux qui correspondent le mieux au terme de recherche, en affichant les films dont le titre est le plus proche du terme saisi.

- **Affichage détaillé des films** : Détails d'un film avec synopsis, note, durée, genres, et casting.

- **Panel de suggestions** : Suggestions de films similaires, basées sur les informations de TMDb.

- **Navigation fluide** : Expérience utilisateur optimisée avec scroll infini pour charger progressivement plus de résultats.

- **Gestion du cache de recherche** : Sauvegarde et récupération des termes de recherche précédents via sessionStorage.


## 🛠️ Technologies utilisées

- **React** : Bibliothèque JavaScript pour construire l'interface utilisateur.
- **Next.js** : Framework React pour le rendu côté serveur et les pages dynamiques.
- **TypeScript** : Langage de programmation typé pour améliorer la qualité du code et éviter les erreurs.
- **Tailwind CSS** : Framework CSS pour styliser rapidement et de manière efficace l'application.
- **Axios** : Librairie pour effectuer des requêtes HTTP à l'API TMDb.
- **API The Movie Database (TMDb)** : Utilisée pour récupérer les informations sur les films, leur casting, et les films populaires.

## 🚀 Fonctionnalités réalisées

 ### 1. Recherche avancée de films 
L'utilisateur peut saisir un titre de film, un nom d'acteur, de réalisateur ou un studio de production dans une barre de recherche unique. Grâce à une recherche combinée, le système renvoie tous les résultats pertinents (films en lien avec le titre, films où l'acteur/réalisateur est présent, ou produits par le studio). Les résultats sont triés selon la pertinence par rapport au terme de recherche pour que l'utilisateur puisse voir en priorité les résultats les plus proches du terme saisi.

### 2. Tri par pertinence
Les films sont triés en fonction de la proximité entre le terme de recherche et les titres des films. Par exemple, si l'utilisateur cherche "Harry", les films dont le titre contient "Harry" seront affichés en premier, suivis des films où l'acteur ou le réalisateur est pertinent.



### 3. Détails d'un film
En cliquant sur un film, l'utilisateur accède à une page détaillée contenant :

- Le poster du film.
- Le titre du film.
- La date de sortie.
- Une note sur 100, calculée à partir des notes des utilisateurs.
- Un synopsis détaillé, ainsi que les genres et le nom du créateur du film.
- Le casting, affiché de manière réactive selon la taille de l'écran.

### 4. Panel de suggestions
Un panel discret et réactif, affichant des films similaires, est accessible sur la page de détails du film. L'utilisateur peut cliquer sur un film pour accéder à sa page de détails.
### 5.Scroll infini 
 Implémentation du scroll infini pour permettre le chargement continu des films correspondant à la recherche sans devoir changer de page.
### 6. Sauvegarde du terme de recherche
 L'application conserve le terme de recherche dans le `sessionStorage` afin que l'utilisateur puisse revenir à sa recherche après avoir exploré les détails d'un film.

## 🔄 Méthodologie de travail 

### 1. Gestion des blocages et bugs

Durant le développement de ce projet, j'ai adopté une approche proactive pour résoudre les problèmes rencontrés :

- Stack Overflow : J'ai consulté cette plateforme pour comprendre et résoudre certains bugs spécifiques liés à l'intégration de l'API TMDb ou aux interactions entre les composants React.

- ChatGPT : J'ai utilisé cet outil pour obtenir des explications rapides sur des concepts complexes, ainsi que pour obtenir des exemples de code lorsque je rencontrais des blocages sur certaines fonctionnalités.

### 2. Documentation

J'ai régulièrement consulté les documentations officielles suivantes pour m'assurer de la bonne utilisation des technologies :

- Tailwind CSS : Pour m'assurer de l'implémentation correcte des styles réactifs et du design global de l'application.

- API TMDb : J'ai lu en détail la documentation et les FAQs de l'API TMDb pour comprendre les limitations, les paramètres des requêtes et les structures de réponses des endpoints utilisés.

### 3. Apprentissage supplémentaire

Afin de m'assurer de l'implémentation correcte de certaines fonctionnalités, notamment le scroll infini, j'ai visionné des tutoriels sur YouTube, ce qui m'a permis de m'assurer que ma mise en œuvre était performante et optimisée.

Cette approche m'a permis de surmonter rapidement les obstacles tout en garantissant une solution efficace et fiable.

## 🧩 Documentation technique

### 1. Structure des composants React
L'application Plus Que Film utilise une architecture modulaire basée sur des composants React, facilitant la réutilisabilité et la maintenance du code. Chaque fonctionnalité majeure est encapsulée dans un composant dédié. Voici un aperçu des principaux composants et de leur interaction :

**Composants principaux**

- `HomePage.tsx` : La page d'accueil de l'application qui affiche la barre de recherche, la liste des films et gère la logique de pagination.
- `SearchBar.tsx` : Un composant contrôlé pour saisir les termes de recherche. Il utilise des effets pour gérer le délai de déclenchement des recherches après la saisie de l'utilisateur.
- `MovieList.tsx` : Gère l'affichage des films, en passant chaque film en tant que props à un composant enfant MovieItem.
- `MovieItem.tsx` : Représente un film individuel avec ses informations principales (titre, poster, date de sortie, etc.) et est cliquable pour afficher les détails complets du film.
- `SuggestionPanel.tsx` : Un composant qui s'ouvre sur la page de détails d'un film pour afficher des suggestions de films similaires basées sur l'API de TMDb.

### 2. Gestion des états avec `useState` et `useEffect`
**Barre de recherche contrôlée**

Le composant `SearchBar.tsx` utilise l'état local via le hook `useState` pour suivre la valeur de l'input utilisateur en temps réel. L'usage d'un effet `useEffect` avec un délai permet d'éviter que chaque frappe déclenche une nouvelle recherche (implémentation du **debouncing**).

```ts
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.length >= 3 || inputValue === '') {
        onSearch(inputValue);  
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="border p-2 w-full mb-8 text-gray-900 bg-gray-100"
      placeholder="Tapez le titre d'un film..."
    />
  );
};
```

**Pagination et Scroll infini**

L'implémentation du scroll infini dans HomePage.tsx utilise les hooks useState et useEffect pour surveiller la position de défilement de l'utilisateur et charger davantage de films lorsque la fin de la page est atteinte.

```ts
useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
      if (hasMore && !isLoading) {
        setIsLoading(true);
        const nextPage = page + 1;
        setPage(nextPage);
        searchCombined(searchTerm, nextPage)
          .then(fetchedMovies => setMovies(prevMovies => [...prevMovies, ...fetchedMovies]))
          .catch(() => setError('Erreur lors du chargement des films supplémentaires'))
          .finally(() => setIsLoading(false));
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [searchTerm, page, hasMore, isLoading]);
```

**Gestion des effets avec `useEffect`**

Le hook `useEffect` est essentiel pour déclencher des recherches ou charger les films populaires lors du premier rendu ou à chaque fois que le terme de recherche change.

### 3. Service d'API externe avec Axios

Toutes les interactions avec l'API de TMDb sont gérées dans un fichier séparé appelé `movieService.ts`. Ce fichier regroupe les fonctions d'appel API telles que :

- `searchMovies` : Recherche des films en fonction d'un terme donné.
- `fetchPeople` : Recherche des films par acteur ou réalisateur.
- `fetchMoviesByStudio` : Recherche des films par studio de production.

En utilisant Axios, les fonctions d'appel API sont configurées pour envoyer les headers d'authentification requis avec chaque requête.

Exemple d'une fonction d'appel API :

```ts
export const searchMovies = async (searchTerm: string, page: number = 1) => {
  const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      query: searchTerm,
      language: 'fr-FR',
      page: page, 
    },
  });
  return response.data.results;
};
```

### 4. Tri des résultats par pertinence

Pour garantir une meilleure expérience utilisateur, les résultats sont triés en fonction de la **pertinence** du titre du film avec le terme de recherche. Une fonction de score de similarité est utilisée pour calculer la pertinence, et les résultats sont ensuite triés en conséquence.

```ts
const similarityScore = (searchTerm: string, movieTitle: string) => {
  const termWords = searchTerm.toLowerCase().split(' ');
  const titleWords = movieTitle.toLowerCase().split(' ');

  const matches = termWords.filter((word) => titleWords.includes(word));
  return matches.length / termWords.length;
};

export const searchCombined = async (searchTerm: string, page: number = 1) => {
  const [moviesByTitle, moviesByPeople, moviesByStudio] = await Promise.all([
    searchMovies(searchTerm, page),
    fetchPeople(searchTerm, page),
    fetchMoviesByStudio(searchTerm),
  ]);

  const allMovies = [...moviesByTitle, ...moviesByPeople, ...moviesByStudio];

  const uniqueMovies = Array.from(new Set(allMovies.map(movie => movie.id)))
    .map(id => allMovies.find(movie => movie.id === id));

  return uniqueMovies.sort((a, b) => similarityScore(searchTerm, b.title) - similarityScore(searchTerm, a.title));
};
```

## ⚙️ Installation et utilisation du projet

### 1. Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** : Version 16+ recommandée
- **npm** ou **yarn** : Gestionnaire de paquets JavaScript

### 2. Cloner le projet

Clonez ce dépôt GitHub sur votre machine locale en exécutant la commande suivante :

```bash
git clone https://github.com/P-R-O-O-F/plus_que_film.git
cd .\react_film\
```

### 3. Installation des dépendances

Installez les dépendances nécessaires au projet en exécutant :

```bash
npm install
```

ou avec yarn :

```bash
yarn install
```

### 4. Configuration de l'API TMDb

Le projet utilise l'API de The Movie Database (TMDb). Vous devez obtenir une clé API TMDb en vous inscrivant sur TMDb et en créant une nouvelle API Key.

Ensuite, créez un fichier **.env.local** à la racine du dossier **react_film** et ajoutez-y votre clé API :

```bash
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

### 5. Lancer l'application

Une fois les dépendances installées et la configuration API faite, vous pouvez lancer l'application en mode développement avec la commande suivante :

```bash
npm run dev
```

ou avec yarn :

```bash
yarn dev
```

L'application sera accessible à l'adresse http://localhost:3000.

### 6. Build pour la production

Pour compiler le projet en mode production, exécutez la commande suivante :

```bash
npm run build
```

Cela générera un dossier **/.next** contenant les fichiers prêts à être déployés.

### 7. Lancer les tests (à venir)

Pour lancer les tests, exécutez la commande suivante :

```bash
npm test
```

----

Ce fichier README vous donne une vue d'ensemble complète du projet Plus Que Film, des fonctionnalités développées, ainsi que des technologies utilisées. Le projet témoigne non seulement de mes compétences en développement frontend, mais aussi de ma capacité à résoudre les problèmes, à utiliser des ressources en ligne et à adapter des solutions aux besoins réels du projet.