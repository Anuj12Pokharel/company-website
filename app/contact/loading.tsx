export default function Loading() {
    return (
        <div className="min-h-screen pt-8 pb-16 relative z-10">
            <div className="container mx-auto px-4 md:px-12 relative z-10">
                {/* Header Skeleton */}
                <div className="mb-12 animate-pulse">
                    <div className="h-8 bg-white/10 rounded w-48 mb-4"></div>
                    <div className="h-12 bg-white/10 rounded w-96 mb-4"></div>
                    <div className="h-6 bg-white/10 rounded w-full max-w-2xl"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info Skeleton */}
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl animate-pulse">
                                <div className="h-6 bg-white/10 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>

                    {/* Form Skeleton */}
                    <div className="p-8 bg-white/5 border border-white/10 rounded-xl animate-pulse">
                        <div className="space-y-4">
                            <div className="h-12 bg-white/10 rounded"></div>
                            <div className="h-12 bg-white/10 rounded"></div>
                            <div className="h-12 bg-white/10 rounded"></div>
                            <div className="h-32 bg-white/10 rounded"></div>
                            <div className="h-12 bg-primary/20 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
