import { VideoProject, GraphicProject } from './types';

export const PERSONAL_INFO = {
  name: 'Hm Lutfhur Sadhi',
  role: 'Video Editor & Visual Storyteller',
  email: 'hmlutfhursadhi715@gmail.com',
  whatsappNumber: '+8801700000000', // Default international format with custom msg link
  avatar: 'profile.jpg',
  bio: `I am a passionate video editor dedicated to the art of visual storytelling. Over the past several months, I have immersed myself in learning the ins and outs of editing—practicing daily, refining my pacing, and perfecting my sound design. While I don't claim decades of industry experience, I bring fresh creativity, high-energy dedication, and a modern aesthetic to every frame. Let's create something memorable together.`,
  location: 'Available Globally for Remote Projects',
};

export const FEATURED_VIDEO = {
  title: 'Featured Best Work & Showreel',
  youtubeId: 'u-ghZmTZX6c',
  embedUrl: 'https://www.youtube.com/embed/u-ghZmTZX6c?rel=0&modestbranding=1',
  tagline: 'Precision Pacing • Seamless Sound Design • Visual Rhythm',
};

export const PORTFOLIO_VIDEOS: VideoProject[] = [
  {
    id: 'vid-1',
    title: 'Cinematic Narrative & Visual Storytelling',
    youtubeId: '93vtX7N4ItI',
    category: 'Cinematic / Narrative',
    tags: ['Pacing', 'Color Grade', 'Atmosphere'],
    description: 'Focused on rhythmic storytelling, mood construction, and subtle emotional beats.',
  },
  {
    id: 'vid-2',
    title: 'High-Energy Short-Form Reel',
    youtubeId: 'u-ghZmTZX6c',
    category: 'Shorts / Reels',
    tags: ['Fast Pacing', 'Sound Design', 'Retention'],
    description: 'Engineered for maximum viewer retention with dynamic sound effects and sharp cuts.',
    isShort: true,
  },
  {
    id: 'vid-3',
    title: 'Visual Rhythm & Dynamic Transitions',
    youtubeId: 'gs23eCnNyfU',
    category: 'Creative Cut',
    tags: ['Seamless Transitions', 'Beat Sync', 'Sound FX'],
    description: 'Music-synchronized video editing showcasing timing accuracy and audio-visual punch.',
  },
  {
    id: 'vid-4',
    title: 'Dynamic Commercial & Promotional Edit',
    youtubeId: 'qnBjUjQ819w',
    category: 'Commercial / Promo',
    tags: ['Brand Voice', 'Motion Typography', 'Engagement'],
    description: 'Clean, punchy commercial presentation built to spotlight product highlights and messaging.',
  },
];

export const GRAPHIC_PROJECTS: GraphicProject[] = [
  {
    id: 'graphic-1',
    filename: 'graphic1.jpg',
    title: 'Bleu De Chanel Luxury Perfume',
    category: 'Commercial Product Poster',
    description: 'Atmospheric product advertisement highlighting luxury bottle reflections, ambient smoke spirals, and sleek dark aesthetic.',
    tools: ['Photoshop', 'Lighting Composite', 'Typography'],
  },
  {
    id: 'graphic-2',
    filename: 'graphic2.jpg',
    title: 'Noise Buds N1 Pro ANC Poster',
    category: 'Tech & Hardware Ad',
    description: 'High-impact product launch layout emphasizing 60H playtime, active noise cancellation badges, and metallic chrome green finish.',
    tools: ['Photoshop', 'Product Retouching', 'Infographic Badges'],
  },
  {
    id: 'graphic-3',
    filename: 'graphic3.jpg',
    title: 'Special Flavour Mint & Chocolate Promo',
    category: 'Food & Beverage Social Poster',
    description: 'Appetizing promotional poster with fresh mint leaf aesthetics, chocolate textures, and promotional offer callouts.',
    tools: ['Illustrator', 'Food Composition', 'Palette Styling'],
  },
  {
    id: 'graphic-4',
    filename: 'graphic4.jpg',
    title: 'Islamic Dawah Workshop Standee',
    category: 'Event Branding & Typography',
    description: 'Formal workshop event standee banner featuring balanced Bengali typography, traditional motifs, and realistic 3D perspective mockup.',
    tools: ['Photoshop Mockup', 'Calligraphy Layout', 'Print Ready'],
  },
  {
    id: 'graphic-5',
    filename: 'graphic5.jpg',
    title: 'High-CTR $10,000 AI YouTube Thumbnail',
    category: 'YouTube Thumbnail Design',
    description: 'High-converting YouTube thumbnail with saturated contrast, bold 3D gold typography, and strategic facial expression framing.',
    tools: ['Photoshop', 'Thumbnail Theory', 'Face Retouch'],
  },
  {
    id: 'graphic-6',
    filename: 'graphic6.jpg',
    title: 'যেদিন হিসাব কায়েম হবে (Surah Ibrahim: 41)',
    category: 'Arabic & Bengali Typographic Art',
    description: 'Spiritual typographic poster with warm horizon tones, clean geometric perspective road illustration, and Quranic verse citation.',
    tools: ['Illustrator', 'Vector Art', 'Custom Lettering'],
  },
];

export const SKILL_TAGS = [
  { name: 'Video Editing', level: 'Core Focus' },
  { name: 'Pacing & Retention', level: 'Specialty' },
  { name: 'Sound Design & Foley', level: 'Passionate' },
  { name: 'Color Correction & Grading', level: 'Practicing Daily' },
  { name: 'Short-Form Reels / TikTok', level: 'High Energy' },
  { name: 'YouTube Thumbnails', level: 'High CTR' },
  { name: 'Motion Titles & Lower Thirds', level: 'Clean & Modern' },
  { name: 'Graphic & Poster Design', level: 'Creative Visuals' },
];

export const SOFTWARE_TOOLS = [
  { name: 'Premiere Pro', role: 'Timeline & Narrative Editing', icon: 'Film' },
  { name: 'After Effects', role: 'Motion & Visual Enhancements', icon: 'Sparkles' },
  { name: 'Photoshop', role: 'Thumbnails & Graphic Posters', icon: 'Image' },
  { name: 'Illustrator', role: 'Vector Art & Typography', icon: 'PenTool' },
  { name: 'Audition', role: 'Sound Cleaning & Mix Mastering', icon: 'Headphones' },
];
