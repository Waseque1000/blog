import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://blog:17N13zUy3y4Hkwy0@cluster0.vvmbcal.mongodb.net/blog?retryWrites=true&w=majority";

const postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  image: String,
  author: String,
  category: String,
  status: String,
  featured: Boolean,
  likes: Number,
  views: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

const posts = [
  {
    title: "Apple iPhone Duo / iPhone 18 Pro: Event Recap",
    slug: "apple-iphone-duo-18-pro-recap",
    excerpt: "Apple's dual-device launch changed the landscape. Here’s everything you need to know about the iPhone Duo and the iPhone 18 Pro.",
    content: "<p>Apple’s latest September event brought the expected and the unprecedented. The headliner was undoubtedly the iPhone 18 Pro, which continues Apple's push into computational photography and on-device AI. But the surprise of the event was the iPhone Duo.</p><p>The Duo represents Apple's first serious foray into a dual-screen form factor, avoiding the mechanical hinge of traditional foldables in favor of two ultra-thin OLED panels joined by a microscopic smart-bezel. Critics are already debating its durability, but the software integration is undeniably slick.</p><p>Meanwhile, the iPhone 18 Pro introduces the A20 Bionic chip, offering a 40% boost in neural engine performance, laying the groundwork for Apple's upcoming agentic AI features.</p>",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2070&auto=format&fit=crop",
    author: "Tech Desk",
    category: "Technology",
    status: "published",
    featured: true,
    likes: 142,
    views: 1205
  },
  {
    title: "iOS 27 & iPadOS 27 Are Now Available: What's New?",
    slug: "ios-27-ipados-27-release",
    excerpt: "The latest operating systems from Apple are finally here, bringing massive AI integration and a completely overhauled home screen.",
    content: "<p>The wait is over. iOS 27 and iPadOS 27 have officially rolled out to compatible devices, and this might be the most significant update in a decade.</p><p>The standout feature is 'Dynamic Context,' an OS-level AI that learns your daily routines and automatically surfaces apps, widgets, and even specific documents exactly when you need them. iPadOS 27 also finally brings true, unconstrained windowing, making the iPad Pro feel more like a Mac than ever before.</p><p>However, early reports suggest battery drain issues on older models like the iPhone 15 and 16, so if you're holding onto legacy hardware, you might want to wait for the 27.0.1 patch.</p>",
    image: "https://images.unsplash.com/photo-1603921319765-b1a1005a3089?q=80&w=2070&auto=format&fit=crop",
    author: "Tech Desk",
    category: "Software",
    status: "published",
    featured: false,
    likes: 89,
    views: 940
  },
  {
    title: "Apple's $2,000 Foldable iPhone: Is It Worth the Hype?",
    slug: "apple-2000-foldable-iphone-debate",
    excerpt: "At $2,000, Apple's first true foldable phone is pushing the boundaries of consumer pricing. But is the tech actually worth it?",
    content: "<p>It's finally here—or at least, officially announced. Apple’s long-rumored foldable iPhone will hit shelves next month with an eye-watering price tag of $2,000.</p><p>While competitors like Samsung and Google have been in the foldable market for years, Apple claims they waited until they could 'perfect' the hinge mechanism and eliminate the dreaded screen crease. Early hands-on reviews suggest they might have actually done it. The device uses a proprietary poly-ceramic composite screen that feels like real glass but bends seamlessly.</p><p>The debate now shifts from technology to economics. In an era of economic tightening, can Apple convince consumers that a smartphone is worth the price of a used car? The early pre-order numbers suggest the answer is a resounding yes.</p>",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=2000&auto=format&fit=crop",
    author: "Sarah Jenkins",
    category: "Technology",
    status: "published",
    featured: false,
    likes: 210,
    views: 3400
  },
  {
    title: "Siri's AI Overhaul: Apple's Next Big Move",
    slug: "siri-ai-overhaul-apple",
    excerpt: "After years of falling behind, Siri has been completely rebuilt using Apple's new proprietary LLM architecture.",
    content: "<p>For years, Siri has been the butt of jokes in the voice assistant world. While Google Assistant and Alexa grew smarter, Siri struggled with basic contextual commands. That changes today.</p><p>With the release of Apple's new 'Apple Intelligence' framework, Siri has been entirely overhauled. It is no longer just a voice parser; it is a multimodal AI agent capable of understanding on-screen context, anticipating needs, and executing multi-step workflows across different apps.</p><p>For example, you can now say, 'Send the photos from yesterday's hike to mom, and add a note about the weather,' and Siri will perfectly execute the command without you ever touching the screen. It's a massive leap forward that finally puts Apple back in the AI race.</p>",
    image: "https://images.unsplash.com/photo-1528297506728-9533d2ac3fa4?q=80&w=2070&auto=format&fit=crop",
    author: "David Chen",
    category: "Software",
    status: "published",
    featured: true,
    likes: 340,
    views: 4120
  },
  {
    title: "Meta's Muse: A New Challenger in the AI Space",
    slug: "metas-muse-ai-product",
    excerpt: "Meta has unveiled 'Muse', a powerful new AI creative suite designed to challenge Midjourney and OpenAI's Sora.",
    content: "<p>Meta has officially stepped out of the shadows in the generative AI space with the launch of 'Muse', a fully integrated suite for generating images, video, and 3D assets.</p><p>What sets Muse apart isn't just its output quality—which is terrifyingly photorealistic—but its integration into the Meta ecosystem. Muse allows creators to instantly deploy AI-generated campaigns across Instagram, Facebook, and Horizon Worlds with a single click.</p><p>However, the launch has reignited debates around copyright. Meta claims Muse was trained on entirely licensed or open-source data, but independent researchers are already finding watermarks from stock photo agencies hidden in the latent noise of Muse's outputs.</p>",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
    author: "David Chen",
    category: "Technology",
    status: "published",
    featured: false,
    likes: 112,
    views: 890
  },
  {
    title: "OpenClaw: The Open-Source AI Agent Taking Over GitHub",
    slug: "openclaw-new-ai-agent-tool",
    excerpt: "A new open-source AI agent framework called OpenClaw is making waves in the developer community.",
    content: "<p>Move over AutoGPT. The developer world is currently obsessed with OpenClaw, a new open-source framework for building autonomous AI agents.</p><p>Unlike previous agent frameworks that struggled with infinite loops and hallucinated tasks, OpenClaw introduces a novel 'sanity check' architecture. It essentially uses a secondary, smaller LLM to constantly monitor and grade the primary model's actions against the user's original intent.</p><p>The result is an agent that can actually complete complex coding tasks, manage servers, and even scrape the web without needing constant human intervention. It's a massive step toward true autonomous software engineering.</p>",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop",
    author: "Tech Desk",
    category: "Programming",
    status: "published",
    featured: false,
    likes: 450,
    views: 2200
  },
  {
    title: "The Agentic AI Shift: Will Apps Become Obsolete?",
    slug: "agentic-ai-shift-replacing-apps",
    excerpt: "As AI agents become more capable, experts are wondering if the traditional 'app' is on its way out.",
    content: "<p>We are entering the era of Agentic AI. Instead of opening a weather app, checking a calendar app, and then opening a messaging app to schedule a lunch, you simply tell your AI agent: 'Find a time for lunch with Sarah next week and book a table outdoors.'</p><p>This shift from 'using software' to 'delegating to software' is threatening the traditional app ecosystem. If users no longer interact with an app's UI, how do developers monetize? How do brands maintain their identity?</p><p>While traditional apps won't disappear overnight, we are rapidly moving toward a world where the primary interface between humans and computers is conversational, not graphical.</p>",
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=2000&auto=format&fit=crop",
    author: "Sarah Jenkins",
    category: "Technology",
    status: "published",
    featured: true,
    likes: 560,
    views: 5100
  },
  {
    title: "The AI Doom Debate Continues: Safety vs. Progress",
    slug: "ai-doom-debate-safety",
    excerpt: "As AI models grow exponentially more powerful, the debate between 'doomers' and 'accelerationists' is reaching a boiling point.",
    content: "<p>The conversation around AI safety has moved from niche online forums to the halls of Congress and the United Nations. On one side are the 'doomers,' who argue that uncontrolled AGI (Artificial General Intelligence) poses an existential threat to humanity.</p><p>On the other side are the 'accelerationists,' who believe that slowing down AI development means delaying cures for diseases, climate change solutions, and economic abundance.</p><p>The current flashpoint is Senate Bill 104, which proposes mandatory safety audits for any model trained on more than 10^26 FLOPs. Tech giants argue this will stifle open-source development, while safety advocates say it doesn't go far enough.</p>",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2000&auto=format&fit=crop",
    author: "Tech Desk",
    category: "Culture",
    status: "published",
    featured: false,
    likes: 320,
    views: 2900
  },
  {
    title: "Windows Patch Tuesday: Critical Vulnerabilities Fixed",
    slug: "windows-patch-tuesday-vulnerabilities",
    excerpt: "Microsoft's latest Patch Tuesday addresses three zero-day vulnerabilities that were actively being exploited in the wild.",
    content: "<p>It's that time of the month again. Microsoft has released its monthly security update, and this one is a big deal. The update patches 84 vulnerabilities, including three critical zero-days that were already being exploited by state-sponsored actors.</p><p>The most severe vulnerability (CVE-2026-10492) allows for remote code execution via a flaw in the Windows Print Spooler service—yes, another one. Administrators are being urged to apply the patch immediately across all enterprise networks.</p><p>This patch cycle serves as a stark reminder that despite the hype around AI and next-gen tech, basic cybersecurity hygiene remains the most critical aspect of IT management.</p>",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2000&auto=format&fit=crop",
    author: "Tech Desk",
    category: "Software",
    status: "published",
    featured: false,
    likes: 85,
    views: 750
  },
  {
    title: "Meta's $18B Settlement: A Turning Point for Social Media",
    slug: "metas-18b-social-media-settlement",
    excerpt: "Meta has agreed to an unprecedented $18 billion settlement regarding the impact of its platforms on adolescent mental health.",
    content: "<p>In a historic legal decision, Meta has agreed to pay $18 billion to settle a massive class-action lawsuit brought by a coalition of 42 state attorneys general. The lawsuit alleged that the company knowingly designed its algorithms to addict children and teenagers, leading to a nationwide mental health crisis.</p><p>Beyond the financial penalty, the settlement requires Meta to radically alter how its algorithms serve content to users under 18. This includes disabling infinite scroll, removing numerical like counts, and implementing strict screen-time limits.</p><p>Legal experts believe this settlement will serve as a blueprint for future regulation against other platforms like TikTok and Snapchat, fundamentally altering the economics of the attention economy.</p>",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000&auto=format&fit=crop",
    author: "Sarah Jenkins",
    category: "Culture",
    status: "published",
    featured: true,
    likes: 890,
    views: 12000
  },
  {
    title: "Local AI vs. Frontier Models: The Battle for Privacy",
    slug: "local-ai-models-vs-frontier",
    excerpt: "Can small, on-device AI models compete with massive cloud-based frontier models? For many users, privacy is becoming the deciding factor.",
    content: "<p>When ChatGPT launched, the assumption was that AI would always live in the cloud, running on massive server farms. But a quiet revolution is happening on our laptops and smartphones: the rise of local AI.</p><p>Models like Llama-3-8B and Mistral can now run entirely locally on a MacBook or an iPhone, requiring no internet connection. While they can't match the raw reasoning power of GPT-5 or Claude 4, they are 'good enough' for 90% of daily tasks.</p><p>More importantly, local AI guarantees total privacy. For enterprise users handling sensitive code or legal documents, sending data to a cloud API is a non-starter. Local AI is proving that bigger isn't always better.</p>",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    author: "David Chen",
    category: "Technology",
    status: "published",
    featured: false,
    likes: 230,
    views: 1800
  },
  {
    title: "Data Centers and Climate Change: The Hidden Cost of AI",
    slug: "data-centers-climate-change-ai",
    excerpt: "The AI boom is driving an unprecedented demand for energy, putting tech companies' climate pledges to the test.",
    content: "<p>Generating an image with AI uses as much energy as charging your smartphone. Training a frontier model uses as much electricity as a small city does in a year. As the AI arms race accelerates, the environmental cost is becoming impossible to ignore.</p><p>Tech giants are scrambling to secure power for new data centers, often turning to natural gas or even reviving closed nuclear plants to meet the staggering energy demands of GPU clusters.</p><p>This has put companies like Microsoft and Google in a difficult position, as their emissions have spiked, jeopardizing their highly publicized 'carbon negative by 2030' pledges. The tech industry must figure out how to decouple computational growth from carbon emissions, or risk severe regulatory backlash.</p>",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop",
    author: "Sarah Jenkins",
    category: "Culture",
    status: "published",
    featured: false,
    likes: 410,
    views: 3100
  },
  {
    title: "GTA 6 Scams: Cybercriminals Exploit the Hype",
    slug: "gta-6-scams-cybercriminals",
    excerpt: "With the impending release of Grand Theft Auto 6, scammers are tricking eager fans into downloading malware disguised as 'early access' builds.",
    content: "<p>It is the most anticipated video game of the decade, and cybercriminals know it. As Rockstar Games prepares for the launch of Grand Theft Auto 6, a massive wave of scams has flooded the internet.</p><p>Hackers are setting up highly convincing fake websites and YouTube ads promising 'early beta access' or 'leaked PC builds.' Unsuspecting users who download these files are instead infecting their machines with sophisticated ransomware and credential stealers.</p><p>Cybersecurity experts advise gamers to only trust official communications from Rockstar Games and to be extremely wary of any links shared on social media promising early access.</p>",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop",
    author: "Tech Desk",
    category: "Software",
    status: "published",
    featured: false,
    likes: 150,
    views: 1500
  },
  {
    title: "Wearables and 'Health Age' Metrics: Are They Accurate?",
    slug: "wearables-health-age-metrics",
    excerpt: "Smartwatches are now telling us our 'biological age,' but medical professionals are raising concerns about the accuracy of these gamified health metrics.",
    content: "<p>Your chronological age is 35, but your smartwatch says your 'Health Age' is 28. It feels great, but is it scientifically accurate? </p><p>Companies like Apple, Garmin, and Oura are increasingly relying on aggregate metrics—like VO2 Max, resting heart rate, and sleep variability—to output a single 'Health Age' score. While these metrics are great for gamifying fitness and encouraging healthy habits, cardiologists warn they can be misleading.</p><p>The algorithms are proprietary, meaning independent scientists can't verify how these scores are calculated. Doctors worry that patients might ignore actual medical symptoms because their watch insists their 'Health Age' is excellent.</p>",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?q=80&w=2000&auto=format&fit=crop",
    author: "Sarah Jenkins",
    category: "Technology",
    status: "published",
    featured: false,
    likes: 205,
    views: 2100
  },
  {
    title: "The New Mac mini: A Tiny Powerhouse",
    slug: "new-mac-mini-update",
    excerpt: "Apple's latest Mac mini shrinks the footprint even further while packing the M4 Pro chip. It's the ultimate desktop for creators.",
    content: "<p>Apple has quietly updated the Mac mini, and it is a marvel of engineering. The new chassis is nearly 30% smaller than the previous generation, making it barely larger than an Apple TV. Yet, inside, it houses the wildly powerful M4 and M4 Pro chips.</p><p>Thermal management is handled by a completely redesigned acoustic venting system that pushes air through the bottom of the device, making it virtually silent even under heavy video rendering loads.</p><p>For developers and video editors who don't want to shell out for a Mac Studio, the M4 Pro Mac mini offers incredible price-to-performance value, further cementing Apple Silicon's dominance in the desktop market.</p>",
    image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=2000&auto=format&fit=crop",
    author: "David Chen",
    category: "Technology",
    status: "published",
    featured: true,
    likes: 540,
    views: 4800
  },
  {
    title: "Regulation Calls for AI: The 'Adversarial Clothing' Debate",
    slug: "regulation-calls-for-ai-adversarial-clothing",
    excerpt: "As facial recognition AI becomes ubiquitous, a new fashion trend of 'adversarial clothing' is sparking legislative debates.",
    content: "<p>How do you hide from a camera that sees everything? You confuse its brain. 'Adversarial clothing'—garments printed with specific geometric patterns designed to break facial recognition and object detection algorithms—is moving from cyber-punk fiction to reality.</p><p>Privacy advocates argue these garments are a necessary defense against unchecked corporate and state surveillance. However, lawmakers are pushing back. A proposed bill in the EU would ban the sale of 'algorithm-evading garments' in public spaces, citing security concerns.</p><p>The debate highlights a growing friction: as AI capabilities expand, the physical countermeasures everyday people use to protect their privacy are increasingly being criminalized.</p>",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000&auto=format&fit=crop",
    author: "Tech Desk",
    category: "Culture",
    status: "published",
    featured: false,
    likes: 310,
    views: 2750
  },
  {
    title: "CEDIA 2026: The Smart Home Finally Gets Smart",
    slug: "cedia-2026-smart-home-tech",
    excerpt: "Highlights from the CEDIA Expo, where local AI and spatial computing are redefining the concept of the smart home.",
    content: "<p>For years, the 'smart home' was just a collection of apps on your phone that occasionally failed to turn on a lightbulb. At CEDIA 2026, the industry finally grew up.</p><p>The overarching theme of the expo was 'invisible tech.' Thanks to ultra-wideband sensors and local LLMs running on home servers, houses can now anticipate needs without voice commands. Walk into a room, and the lighting, temperature, and ambient audio adjust to your specific preferences based on the time of day and your current heart rate (read from your wearable).</p><p>While the privacy implications of a house that literally watches you are profound, the sheer convenience showcased at CEDIA suggests consumers might gladly make the trade.</p>",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2000&auto=format&fit=crop",
    author: "David Chen",
    category: "Technology",
    status: "published",
    featured: false,
    likes: 180,
    views: 1600
  },
  {
    title: "Corporate Surveillance & Watermarking: The Privacy Debate",
    slug: "corporate-surveillance-watermarking",
    excerpt: "New techniques for invisibly watermarking AI-generated content are being repurposed for employee surveillance, sparking outrage.",
    content: "<p>Invisible cryptographic watermarking was originally designed to tag AI-generated images to fight misinformation. But enterprise software companies have found a new use for it: tracking employees.</p><p>New productivity suites are quietly embedding invisible watermarks into every document, screenshot, and email drafted by employees. If a document is leaked or screenshotted with a personal phone, the watermark traces exactly who was viewing it on their screen at that millisecond.</p><p>Labor unions and privacy advocates are furious, calling it an extreme overreach of corporate surveillance. The tech industry, however, argues it is a necessary evolution in data loss prevention (DLP).</p>",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
    author: "Sarah Jenkins",
    category: "Culture",
    status: "published",
    featured: false,
    likes: 420,
    views: 3900
  },
  {
    title: "Orbital Salvage Technology: Cleaning Up Low Earth Orbit",
    slug: "orbital-salvage-technology-space",
    excerpt: "With satellite mega-constellations crowding Low Earth Orbit, a new startup is launching autonomous 'salvage bots' to clean up space junk.",
    content: "<p>Low Earth Orbit (LEO) is getting crowded. Between SpaceX's Starlink, Amazon's Kuiper, and thousands of dead satellites, the risk of a catastrophic collision (Kessler Syndrome) is higher than ever.</p><p>Enter AstroScavenge, a new aerospace startup that just successfully deployed its first autonomous 'salvage bot.' Using a combination of lidar, computer vision, and a robotic capture net, the bot successfully de-orbited a defunct Soviet-era weather satellite.</p><p>This mission proves that active debris removal is technically feasible. The challenge now is economic: who pays to clean up space? AstroScavenge is hoping to turn salvaged aerospace-grade metals into a profitable recycling business.</p>",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop",
    author: "Tech Desk",
    category: "Science",
    status: "published",
    featured: true,
    likes: 670,
    views: 5800
  },
  {
    title: "Bill Gates on AI Risks: A Cautious Perspective",
    slug: "bill-gates-ai-risks-commentary",
    excerpt: "In a recent interview, Bill Gates outlined his biggest fears regarding the rapid advancement of Artificial Intelligence.",
    content: "<p>Bill Gates has always been a techno-optimist, but in a recent wide-ranging interview, the Microsoft co-founder struck a noticeably cautious tone regarding Artificial Intelligence.</p><p>While Gates reiterated his belief that AI will revolutionize medicine and education, his primary concern isn't a sci-fi 'Terminator' scenario. Instead, he fears the amplification of existing societal divides. 'If an AI tutor costs $100 a month, only wealthy districts will adopt it, instantly widening the education gap in a way we've never seen before,' Gates stated.</p><p>He also raised concerns about AI-generated bioterrorism and the sheer velocity at which the technology is moving, outpacing any government's ability to meaningfully regulate it.</p>",
    image: "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2000&auto=format&fit=crop",
    author: "David Chen",
    category: "Technology",
    status: "published",
    featured: false,
    likes: 890,
    views: 8100
  }
];

async function addPosts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    for (const postData of posts) {
      // Use findOneAndUpdate to avoid duplicates if run multiple times
      await Post.findOneAndUpdate(
        { slug: postData.slug },
        postData,
        { upsert: true, new: true }
      );
      console.log(`Added: ${postData.title}`);
    }

    console.log("All 20 posts added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding posts:", error);
    process.exit(1);
  }
}

addPosts();
