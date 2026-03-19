// Import des hooks React Query
import { Colors } from "@/constants/Colors";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// Endpoint principal de l'API Pokémon
// On va concaténer cet endpoint avec les paths de l'objet API
const endpoint = "https://pokeapi.co/api/v2";

// Type représentant les différentes routes de notre API
// Chaque clé correspond à un endpoint
// Chaque valeur correspond à la structure de la réponse JSON retournée
type API = {
  "/pokemon?limit=21": {
    count: number;
    next: string | null;
    results: { name: string; url: string }[];
  };
  "/pokemon/[id]": {
    id: number;
    name: string;
    url: string;
    weight: number;
    height: number;
    moves: { move: { name: string } }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    cries: {
      latest: string;
    };
    types: {
      type: {
        name: keyof (typeof Colors)["type"];
      };
    }[];
  };
  "/pokemon-species/[id]": {
    flavor_text_entries: {
      flavor_text: string;
      language: {
        name: string;
      };
    }[];
  };
};

// Hook générique pour récupérer des données
// T doit obligatoirement être une clé du type API
// Cela garantit que l'endpoint utilisé existe dans notre typage
export function useFetchQuery<T extends keyof API>(
  path: T,
  params?: Record<string, string | number>,
) {
  const localUrl =
    endpoint +
    Object.entries(params ?? {}).reduce(
      (acc, [key, value]) => acc.replaceAll(`[${key}]`, value),
      path,
    );
  return useQuery({
    // Clé unique utilisée par React Query pour mettre en cache la requête
    // Ici le cache est lié au path utilisé
    queryKey: [localUrl],

    // Fonction exécutée pour récupérer les données
    queryFn: async () => {
      // Petite pause artificielle pour simuler un délai réseau
      await wait(1);

      // Requête HTTP vers l'API
      // On concatène l'endpoint principal avec le path
      return (
        fetch(localUrl, {
          headers: {
            Accept: "application/json",
          },
        })
          // On convertit la réponse en JSON
          // Puis on indique à TypeScript que la réponse correspond
          // au type associé à la clé T dans l'objet API
          // Exemple :
          // si T = '/pokemon?limit=21'
          // alors API[T] = {count, next, results}
          .then((r) => r.json() as Promise<API[T]>)
      );
    },
  });
}

// Hook pour gérer une pagination infinie
// Même principe de typage que le hook précédent
// T doit être une clé du type API
export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
  return useInfiniteQuery({
    // Clé de cache React Query
    queryKey: [path],

    // URL de départ utilisée pour la première requête
    initialPageParam: endpoint + path,

    // Fonction appelée à chaque chargement de page
    // pageParam représente l'URL à appeler
    queryFn: async ({ pageParam }) => {
      // Simulation de latence réseau
      await wait(1);

      // Requête HTTP vers l'URL reçue
      return (
        fetch(pageParam, {
          headers: {
            Accept: "application/json",
          },
        })
          // On convertit la réponse en JSON
          // Puis on force le type pour dire que la réponse
          // correspond à la structure définie dans API[T]
          .then((r) => r.json()) as Promise<API[T]>
      );
    },

    // Cette fonction permet à React Query de savoir
    // quelle est l'URL de la page suivante
    getNextPageParam: (lastPage) => {
      // L'API PokeAPI retourne un champ "next"
      // contenant l'URL de la prochaine page
      if ("next" in lastPage) {
        // Si "next" existe, on renvoie cette URL
        return lastPage.next;
      }

      // Sinon on indique qu'il n'y a plus de page
      return null;
    },
  });
}

// Fonction utilitaire permettant d'attendre un certain temps
// Cela simule un délai réseau pour voir les états loading
function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}
