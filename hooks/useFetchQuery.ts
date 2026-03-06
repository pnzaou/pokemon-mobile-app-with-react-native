// Import des hooks React Query
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

// Endpoint principal de l'API Pokémon
const endpoint = "https://pokeapi.co/api/v2"

//1:00:00


// Hook simple pour récupérer des données
export function useFetchQuery(path: string) {

    return useQuery({

        // Clé unique du cache React Query
        queryKey: [path],

        // Fonction exécutée pour récupérer les données
        queryFn: async () => {

            // Petite pause artificielle pour simuler un délai réseau
            await wait(1)

            // Appel API
            return fetch(endpoint + path).then(r => r.json())
        }
    })
}



// Hook pour gérer une pagination infinie
export function useInfiniteFetchQuery(path: string) {

    return useInfiniteQuery({

        // Clé du cache
        queryKey: [path],

        // URL de départ
        initialPageParam: endpoint + path,

        // Fonction appelée à chaque requête
        queryFn: async ({pageParam}) => {

            // Simulation de latence
            await wait(1);

            // Requête HTTP
            return fetch(pageParam, {

                headers: {
                    Accept: 'application/json'
                }

            }).then(r => r.json())
        },

        // Permet de dire à React Query quelle est la page suivante
        getNextPageParam: (lastPage) => {

            // L'API PokeAPI retourne un champ "next"
            if("next" in lastPage) {
                return lastPage.next
            }

            // Sinon on arrête la pagination
            return null;
        }
    })
}



// Fonction utilitaire permettant d'attendre un certain temps
// (simulation de chargement réseau)
function wait (duration: number) {

    return new Promise(resolve => 
        setTimeout(resolve, duration * 1000)
    )
}