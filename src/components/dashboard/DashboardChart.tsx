"use client"

import { useState, useEffect, useMemo } from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { TrendingUp } from "lucide-react"

interface DashboardChartProps {
    data: {
        date: string
        fitrahUang: number
        fitrahBeras: number
        mal: number
    }[]
}

export function DashboardChart({ data }: DashboardChartProps) {
    const [mounted, setMounted] = useState(false)
    const [activeData, setActiveData] = useState<any>(null)
    const [activeCoordinate, setActiveCoordinate] = useState<{ x: number, y: number } | null>(null)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (data && data.length > 0) {
            setActiveData(data[data.length - 1])
        }
    }, [data])

    const handleMouseMove = (e: any) => {
        if (e && e.activePayload && e.activePayload.length > 0) {
            setActiveData(e.activePayload[0].payload)
            setActiveCoordinate(e.activeCoordinate)
            setIsHovering(true)
        }
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        setActiveCoordinate(null)
        if (data && data.length > 0) {
            setActiveData(data[data.length - 1])
        }
    }

    const CustomTooltipOverlay = useMemo(() => {
        if (!activeData) return null

        // Default position (when not hovering) - positioned at the end of chart
        const defaultStyle: React.CSSProperties = {
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: 50,
        }

        // Hover position
        const hoverStyle: React.CSSProperties = {
            position: 'absolute',
            left: activeCoordinate ? activeCoordinate.x : 0,
            top: activeCoordinate ? activeCoordinate.y : 0,
            transform: 'translate(-50%, -110%)', // Shift up to avoid cursor
            pointerEvents: 'none',
            zIndex: 50,
            transition: 'all 0.1s ease-out'
        }

        const style = isHovering ? hoverStyle : defaultStyle

        return (
            <div style={style} className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 min-w-[200px]">
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-3 border-b border-black/5 pb-2">
                    {activeData.date}
                </p>
                <div className="space-y-3">
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-500 shadow-sm" />
                            <span className="text-[10px] font-bold text-gray-600 uppercase">Total Fitrah Uang</span>
                        </div>
                        <span className="text-sm font-black text-emerald-600 pl-4">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(activeData.fitrahUang)}
                        </span>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-blue-500 shadow-sm" />
                            <span className="text-[10px] font-bold text-gray-600 uppercase">Total Fitrah Beras</span>
                        </div>
                        <span className="text-sm font-black text-blue-600 pl-4">
                            {activeData.fitrahBeras} Liter
                        </span>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-amber-500 shadow-sm" />
                            <span className="text-[10px] font-bold text-gray-600 uppercase">Total Mal</span>
                        </div>
                        <span className="text-sm font-black text-amber-600 pl-4">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(activeData.mal)}
                        </span>
                    </div>
                </div>
            </div>
        )
    }, [activeData, activeCoordinate, isHovering])

    return (
        <Card className="overflow-hidden border-0 shadow-premium bg-white group h-full">
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500" />
            <CardHeader className="p-6 sm:p-8 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-4">
                    <div className="size-10 sm:size-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm shrink-0">
                        <TrendingUp className="size-5 sm:size-6" />
                    </div>
                    <div>
                        <CardTitle className="text-lg sm:text-xl font-black text-emerald-950 tracking-tight">Tren Penerimaan</CardTitle>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">7 Hari Terakhir</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 pb-6 sm:pb-8">
                <div className="h-[300px] w-full px-4 sm:px-8 relative">
                    {mounted ? (
                        <>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={data}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <defs>
                                        <linearGradient id="colorFitrahUang" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorFitrahBeras" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorMal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                                        dy={10}
                                    />
                                    <YAxis hide />
                                    {/* Standard Tooltip removed to use custom overlay */}
                                    <Tooltip content={() => null} cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5' }} />
                                    <Area
                                        type="monotone"
                                        dataKey="fitrahUang"
                                        stackId="1"
                                        stroke="#10b981"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorFitrahUang)"
                                        animationDuration={1500}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="fitrahBeras"
                                        stackId="2"
                                        stroke="#3b82f6"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorFitrahBeras)"
                                        animationDuration={1500}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="mal"
                                        stackId="3"
                                        stroke="#f59e0b"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorMal)"
                                        animationDuration={1500}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#f59e0b' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                            {CustomTooltipOverlay}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50/50 rounded-xl" aria-hidden="true">
                            <div className="w-6 h-6 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
