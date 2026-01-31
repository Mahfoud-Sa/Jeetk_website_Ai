import { useState, useRef, useEffect } from "react"
import { CircleDot, MapPin, Crosshair, Plus, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AppLayout } from "@/components/layout/AppLayout"
import { useLocations, useDeliveryRoute } from "@/hooks/useDeliveryData"

export default function DeliveryPrices() {
  const [selectedOrigin, setSelectedOrigin] = useState<string>("")
  const [selectedDestination, setSelectedDestination] = useState<string>("")
  const [distance, setDistance] = useState<string>("0.0")
  
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)

  // Fetch all locations for origin dropdown
  const { data: locations, isLoading: isLoadingLocations } = useLocations()
  
  // Fetch delivery route details when origin is selected
  // The selectedOrigin ID is used to call /DeliveryRoutes/:id
  const { data: routeDetails, isLoading: isLoadingRoute } = useDeliveryRoute(selectedOrigin || null)

  // Get available destinations from the route details response
  const availableDestinations = routeDetails?.locations || []

  // Mock Map Initialization
  useEffect(() => {
    if (mapRef.current && !map) {
      console.log("Map would be initialized here")
      setMap(null)
    }
  }, [mapRef, map])

  const handleOriginChange = (val: string) => {
    setSelectedOrigin(val)
    setSelectedDestination("") // Reset destination when origin changes
  }

  const handleDestinationChange = (val: string) => {
    setSelectedDestination(val)
    // Mock distance update
    setDistance((Math.random() * 10).toFixed(1))
  }

  return (
    <AppLayout title="حاسبة التوصيل">
      {/* Map Placeholder */}
      <div ref={mapRef} id="map" className="w-full h-full bg-[#E0E0E0] flex items-center justify-center text-[#666]">
        <div className="text-center">
          <MapPin size={48} className="mx-auto mb-2 opacity-30" />
          <p>خريطة جوجل ستظهر هنا</p>
        </div>
      </div>

      {/* Map Controls - positioned on the left (end) in RTL */}
      <div className="absolute top-5 end-5 flex flex-col gap-3 z-10 md:start-[468px] md:end-auto md:top-6">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-none h-11 w-11 rounded-lg text-[#333] hover:bg-gray-50"
        >
          <Crosshair size={20} />
        </Button>
        <div className="flex flex-col shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white border-none border-b border-[#eee] rounded-t-lg rounded-b-none h-11 w-11 text-[#333] hover:bg-gray-50"
          >
            <Plus size={20} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white border-none rounded-b-lg rounded-t-none h-11 w-11 text-[#333] hover:bg-gray-50"
          >
            <Minus size={20} />
          </Button>
        </div>
      </div>

      {/* Calculation Card */}
      <Card className="
        absolute bottom-0 start-0 end-0 
        bg-white border-none shadow-[0_-4px_20px_rgba(0,0,0,0.1)] 
        rounded-t-3xl !p-4 z-20 max-h-[80vh] overflow-y-auto
        md:top-6 md:start-6 md:bottom-6 md:end-auto md:w-[420px] md:rounded-3xl md:max-h-none
      ">
        {/* Pull bar for mobile */}
        <div className="w-10 h-1 bg-[#E0E0E0] rounded-full mx-auto -mt-2 mb-5 md:hidden" />
        
        <h2 className="text-xl font-bold mb-5 text-[#333]">احسب تكلفة التوصيل</h2>

        {/* Form Inputs */}
        <div className="!space-y-4">
          {/* Origin Select - Uses locations from /Locations API */}
          <div className="space-y-2">
            <Label className="text-sm text-[#666]">من (المصدر)</Label>
            <div className="relative">
              <CircleDot className="absolute end-3 top-1/2 -translate-y-1/2 text-[#2196F3] z-10" size={18} />
              <Select value={selectedOrigin} onValueChange={handleOriginChange} dir="rtl">
                <SelectTrigger className="pe-11 h-[52px] rounded-xl border-[#E0E0E0] focus:ring-[#2196F3] text-end text-base bg-white">
                  <SelectValue placeholder={isLoadingLocations ? "جاري تحميل المواقع..." : "اختر موقع المصدر"} />
                </SelectTrigger>
                <SelectContent>
                  {locations?.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id.toString()} className="text-end">
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Destination Select - Populated from /DeliveryRoutes/:id response */}
          <div className="space-y-2">
            <Label className="text-sm text-[#666]">إلى (الوجهة)</Label>
            <div className="relative">
              <MapPin className="absolute end-3 top-1/2 -translate-y-1/2 text-[#FF5252] z-10" size={18} />
              <Select 
                value={selectedDestination} 
                onValueChange={handleDestinationChange} 
                disabled={!selectedOrigin || isLoadingRoute || availableDestinations.length === 0}
                dir="rtl"
              >
                <SelectTrigger className="pe-11 h-[52px] rounded-xl border-[#E0E0E0] focus:ring-[#2196F3] text-end text-base bg-white disabled:bg-gray-100">
                  <SelectValue placeholder={
                    !selectedOrigin 
                      ? "اختر المصدر أولاً" 
                      : isLoadingRoute
                        ? "جاري التحميل..."
                        : availableDestinations.length === 0 
                          ? "لا توجد وجهات متاحة" 
                          : "اختر الوجهة"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {availableDestinations.map((dest) => (
                    <SelectItem key={dest.id} value={dest.id.toString()} className="text-end">
                      {dest.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cost Box */}
          <div className="bg-[#EBF5FF] rounded-xl p-5 mt-6 md:p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[#2196F3] text-xs font-bold uppercase tracking-wider block mb-1">التكلفة التقديرية</span>
                <div className="flex items-baseline">
                  <span className="text-[40px] md:text-[48px] font-bold text-[#333] leading-none">
                    ${isLoadingRoute ? "..." : (routeDetails?.deliveryPrice?.toFixed(2) || "0.00")}
                  </span>
                  <span className="text-sm text-[#666] ms-2 font-medium">دولار أمريكي</span>
                </div>
              </div>
              <div className="text-start">
                <span className="text-[11px] text-[#666] block">المسافة</span>
                <span className="text-base font-bold text-[#333]">{distance} كم</span>
              </div>
            </div>
            
            <div className="h-px bg-[#2196F3]/20 my-4" />

            <div className="flex justify-between text-[13px] text-[#666]">
              <span className="flex items-center gap-1">رسوم التوصيل الأساسية</span>
              <span>$0.00 (شاملة)</span>
            </div>
          </div>

          {/* Book Button */}
          <Button 
            className="w-full h-[56px] rounded-xl bg-[#2196F3] hover:bg-[#1976D2] text-lg font-semibold gap-3 transition-colors"
            onClick={() => console.log("Book delivery")}
          >
            احجز التوصيل الآن
            <ArrowRight size={20} className="-scale-x-100" />
          </Button>
        </div>
      </Card>
    </AppLayout>
  )
}
