import { useQuery } from "@tanstack/react-query"
import { Location, DeliveryRoute } from "@/types/delivery"
import apiClient from "../apiClient"


export const locations = async (): Promise<Location[]> => {
  return apiClient.get(`/Locations`) as unknown as Promise<Location[]>
}

export const deliveryRoute = async (routeId: string | null): Promise<DeliveryRoute> => {
  return await apiClient.get(`/DeliveryRoutes/${routeId}`) as unknown as Promise<DeliveryRoute>
}

// Fetch all locations for the origin dropdown
export function useLocations() {
  return useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn:()=>locations(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Fetch delivery route details by ID - returns locations for destination dropdown
export function useDeliveryRoute(routeId: string | null) {
  console.log("routeId", routeId)
  return useQuery<DeliveryRoute>({
    queryKey: ["deliveryRoute", routeId],
    queryFn: () => deliveryRoute(routeId),
    enabled: !!routeId,
  })
}

// Keep old hook for backward compatibility
export function useRouteDetails(routeId: string | null) {
  return useDeliveryRoute(routeId)
}
