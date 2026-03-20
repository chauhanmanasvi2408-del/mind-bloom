import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Shield } from "lucide-react";

interface Post {
  id: number;
  text: string;
  category: string;
  likes: number;
  liked: boolean;
  time: Date;
}

const categories = ["Anxiety", "Depression", "Overthinking", "Relationships", "Bad Habits", "Daily Struggles", "Decision Making"];

const initialPosts: Post[] = [
  { id: 1, text: "Some days I feel like I can't breathe from all the pressure. But I'm trying to take it one step at a time. You're not alone if you feel this way. 💚", category: "Anxiety", likes: 24, liked: false, time: new Date(Date.now() - 3600000) },
  { id: 2, text: "I've been overthinking every decision I make. Today I decided to just go with my gut feeling. Small wins matter.", category: "Overthinking", likes: 18, liked: false, time: new Date(Date.now() - 7200000) },
  { id: 3, text: "Broke my social media scrolling habit for 3 days now. It's hard but my mind feels clearer. If I can do it, so can you!", category: "Bad Habits", likes: 42, liked: false, time: new Date(Date.now() - 10800000) },
];

const SharingWall = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now(),
      text: newPost,
      category: selectedCategory,
      likes: 0,
      liked: false,
      time: new Date(),
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id: number) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const filteredPosts = filterCategory ? posts.filter(p => p.category === filterCategory) : posts;

  return (
    <section id="share" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/20 text-lavender-deep text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            Anonymous & Safe Space
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Share Your <span className="text-gradient-calm">Story</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            You're not alone. Share what you're going through anonymously and support others.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Post form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-2xl p-5 border border-border shadow-card mb-6"
          >
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Share anonymously..."
              className="w-full p-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-lg bg-muted text-foreground text-sm border-none focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={handlePost}
                disabled={!newPost.trim()}
                className="ml-auto flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-calm text-primary-foreground font-medium disabled:opacity-40 transition-opacity hover:opacity-90"
              >
                <Send className="h-4 w-4" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilterCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                !filterCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c === filterCategory ? null : c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterCategory === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-background rounded-2xl p-5 border border-border shadow-card"
                >
                  <span className="inline-block px-2.5 py-1 rounded-full bg-sage/15 text-sage-deep text-xs font-medium mb-3">
                    {post.category}
                  </span>
                  <p className="text-foreground leading-relaxed mb-4">{post.text}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        post.liked ? "text-accent" : "text-muted-foreground hover:text-accent"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                      {post.likes}
                    </button>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      Support
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {post.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharingWall;
