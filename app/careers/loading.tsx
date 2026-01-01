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

                {/* Search Skeleton */}
                <div className="mb-6 animate-pulse">
                    <div className="h-12 bg-white/5 border border-white/10 rounded-lg mb-4"></div>
                    <div className="flex gap-3">
                        <div className="h-10 bg-white/5 border border-white/10 rounded-lg w-32"></div>
                        <div className="h-10 bg-white/5 border border-white/10 rounded-lg w-32"></div>
                        <div className="h-10 bg-white/5 border border-white/10 rounded-lg w-32"></div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Job Cards Skeleton */}
                    <div className="md:col-span-2 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl animate-pulse">
                                <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
                                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                                <div className="h-4 bg-white/10 rounded w-5/6"></div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="space-y-6">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl animate-pulse">
                            <div className="h-6 bg-white/10 rounded w-2/3 mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-white/10 rounded w-full"></div>
                                <div className="h-4 bg-white/10 rounded w-5/6"></div>
                                <div className="h-4 bg-white/10 rounded w-4/5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
