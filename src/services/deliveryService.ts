import { useQuery } from "@tanstack/react-query";
import { Location, DeliveryRoute } from "../types";
import apiClient from "../apiClient";

export const fetchLocations = async (): Promise<Location[]> => {
  const response = await apiClient.get(`/Locations`);
  if (Array.isArray(response)) return response;
  if (response && typeof response === 'object' && Array.isArray((response as any).data)) return (response as any).data;
  return [];
};

export const fetchDeliveryRoute = async (
  routeId: string | null,
): Promise<DeliveryRoute> => {
  return (await apiClient.get(
    `/DeliveryRoutes/${routeId}`,
  )) as unknown as Promise<DeliveryRoute>;
};

// Fetch all locations for the origin dropdown
export function useLocations() {
  return useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: () => fetchLocations(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export const fetchDeliveryRoutesByOrigin = async (
  originId: string | null,
): Promise<DeliveryRoute[]> => {
  const response = await apiClient.get(`/DeliveryRoutes/origin/${originId}`);
  if (Array.isArray(response)) return response;
  if (response && typeof response === 'object' && Array.isArray((response as any).data)) return (response as any).data;
  return [];
};

// Fetch delivery route details by origin ID
export function useDeliveryRoute(originId: string | null) {
  return useQuery<DeliveryRoute[]>({
    queryKey: ["deliveryRoutes", originId],
    queryFn: () => fetchDeliveryRoutesByOrigin(originId),
    enabled: !!originId,
  });
}

// Mutation functions for Dashboard
export const createLocation = async (location: Omit<Location, 'id'>): Promise<Location> => {
  return apiClient.post(`/Locations`, location) as unknown as Promise<Location>;
};

export const updateLocation = async (id: string, location: Partial<Location>): Promise<Location> => {
  return apiClient.put(`/Locations/${id}`, location) as unknown as Promise<Location>;
};

export const deleteLocation = async (id: string): Promise<void> => {
  return apiClient.delete(`/Locations/${id}`) as unknown as Promise<void>;
};

export const createDeliveryRoute = async (route: Omit<DeliveryRoute, 'id'>): Promise<DeliveryRoute> => {
  return apiClient.post(`/DeliveryRoutes`, route) as unknown as Promise<DeliveryRoute>;
};

export const updateDeliveryRoute = async (id: string, route: Partial<DeliveryRoute>): Promise<DeliveryRoute> => {
  return apiClient.put(`/DeliveryRoutes/${id}`, route) as unknown as Promise<DeliveryRoute>;
};

export const deleteDeliveryRoute = async (id: string): Promise<void> => {
  return apiClient.delete(`/DeliveryRoutes/${id}`) as unknown as Promise<void>;
};

// Keep old hook for backward compatibility
export function useRouteDetails(routeId: string | null) {
  return useDeliveryRoute(routeId);
}
