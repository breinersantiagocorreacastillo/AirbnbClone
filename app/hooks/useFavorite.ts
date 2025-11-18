import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../tipos/indexar";
import useLoginModal from "./UseLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

export default function useFavorite({ listingId, currentUser }: IUseFavorite) {
  const router = useRouter();
  const loginModal = useLoginModal();

  // Estado local para manejar el estado de favoritos sin recargar la página
  const [localHasFavorited, setLocalHasFavorited] = useState<boolean>(
    currentUser?.favoriteIds.includes(listingId) || false
  );

  // Usamos useMemo para optimizar el cálculo de si el usuario ya ha marcado el favorito
  const hasFavorited = useMemo(() => localHasFavorited, [localHasFavorited]);

  // Toggle de favorito con la prevención del flujo si el usuario no está autenticado
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        loginModal.onOpen();
        return; // Detener la ejecución si no hay un usuario logueado
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        // Ejecutar la solicitud para agregar o quitar el favorito
        await request;

        // Actualizar el estado local sin recargar la página
        setLocalHasFavorited(!hasFavorited);

        toast.success("Éxito");

      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status = error.response.status;
          if (status === 401) {
            toast.error("No estás autorizado. Por favor, inicia sesión.");
          } else {
            toast.error("Algo salió mal en la solicitud.");
          }
        } else {
          toast.error("Error desconocido.");
        }
        console.error("Error en toggleFavorite:", error);
      }
    },
    [currentUser, hasFavorited, listingId, loginModal]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
}
