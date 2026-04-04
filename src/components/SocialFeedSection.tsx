import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Facebook, Image, Video, X, Heart, ExternalLink, RefreshCw, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Tables } from "@/integrations/supabase/types";

type SocialPost = Tables<"social_posts">;

const filterTabs = [
  { key: "all", label: "All", icon: null },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "photo", label: "Photos", icon: Image },
  { key: "video", label: "Videos", icon: Video },
] as const;

type FilterKey = (typeof filterTabs)[number]["key"];

const SocialFeedSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["social-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_posts")
        .select("*")
        .eq("is_visible", true)
        .order("posted_at", { ascending: false });
      if (error) throw error;
      return data as SocialPost[];
    },
    refetchInterval: 5 * 60 * 1000, // refetch every 5 min
  });

  const { data: lastSync } = useQuery({
    queryKey: ["last-sync"],
    queryFn: async () => {
      const { data } = await supabase
        .from("social_sync_log")
        .select("synced_at")
        .order("synced_at", { ascending: false })
        .limit(1);
      return data?.[0]?.synced_at || null;
    },
  });

  const filtered = posts.filter((post) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "instagram" || activeFilter === "facebook")
      return post.platform === activeFilter;
    if (activeFilter === "photo") return post.media_type === "photo";
    if (activeFilter === "video") return post.media_type === "video";
    return true;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const timeSince = (dateStr: string) => {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <section id="social-feed" className="py-16 md:py-24 section-soft-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-3">
            Follow Our Journey
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stay updated with the latest from our Instagram and Facebook — events,
            achievements, and campus life.
          </p>
          {lastSync && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
              <RefreshCw className="w-3 h-3" /> Last synced: {timeSince(lastSync)}
            </p>
          )}
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveFilter(tab.key);
                setVisibleCount(12);
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-card border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Unable to load social feed right now. Please check back later.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Instagram className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground mb-2">Social feed coming soon!</p>
            <p className="text-sm text-muted-foreground">
              Once connected, posts from Instagram and Facebook will appear here automatically.
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && visible.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-card border cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.media_type === "video" ? (
                    <div className="w-full h-full bg-secondary/10 flex items-center justify-center">
                      <img
                        src={post.thumbnail_url || post.media_url}
                        alt={post.caption || "Video post"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-background/80 flex items-center justify-center">
                          <Video className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={post.media_url}
                      alt={post.caption || "Social post"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 text-center">
                    {post.caption && (
                      <p className="text-background text-xs line-clamp-3">
                        {post.caption}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-background/90 text-xs">
                      {post.likes_count != null && (
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {post.likes_count}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        {post.platform === "instagram" ? (
                          <Instagram className="w-3 h-3" />
                        ) : (
                          <Facebook className="w-3 h-3" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Platform badge */}
                  <div className="absolute top-2 right-2">
                    {post.platform === "instagram" ? (
                      <Instagram className="w-4 h-4 text-background drop-shadow" />
                    ) : (
                      <Facebook className="w-4 h-4 text-background drop-shadow" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((c) => c + 12)}
              className="gap-2"
            >
              <Loader2 className="w-4 h-4" />
              Load More
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedPost && (
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 bg-foreground/5 flex items-center justify-center min-h-[300px]">
                {selectedPost.media_type === "video" ? (
                  <video
                    src={selectedPost.media_url}
                    controls
                    autoPlay
                    className="w-full max-h-[70vh] object-contain"
                  />
                ) : (
                  <img
                    src={selectedPost.media_url}
                    alt={selectedPost.caption || "Post"}
                    className="w-full max-h-[70vh] object-contain"
                  />
                )}
              </div>
              <div className="w-full md:w-72 p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {selectedPost.platform === "instagram" ? (
                    <Instagram className="w-4 h-4 text-primary" />
                  ) : (
                    <Facebook className="w-4 h-4 text-primary" />
                  )}
                  <span className="capitalize">{selectedPost.platform}</span>
                  <span className="ml-auto">{timeSince(selectedPost.posted_at)}</span>
                </div>
                {selectedPost.caption && (
                  <p className="text-sm text-foreground leading-relaxed">
                    {selectedPost.caption}
                  </p>
                )}
                {selectedPost.likes_count != null && (
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4" /> {selectedPost.likes_count} likes
                  </p>
                )}
                {selectedPost.permalink && (
                  <a
                    href={selectedPost.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-auto"
                  >
                    <ExternalLink className="w-4 h-4" /> View original post
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SocialFeedSection;
