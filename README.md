# 💍 Ruleta de Recuerdos - Wedding Memory Roulette

An interactive wedding raffle app built with Next.js, TypeScript, and Framer Motion. This beautiful web application creates an engaging experience for wedding guests, featuring a roulette-style selection with animations, sounds, and confetti celebrations.

![Next.js](https://img.shields.io/badge/Next.js-14.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055)

## 🎯 Features

- **Beautiful Wedding Theme**: Ochre and blue color palette with elegant typography
- **CSV/JSON Upload**: Easy participant list management
- **Interactive Roulette**: 15-second spinning animation with sound effects
- **Winner Celebration**: Confetti animation and winner showcase
- **Fully Responsive**: Optimized for projection (1920x1080) but works on all devices
- **Keyboard Shortcuts**: Press ENTER to spin the roulette
- **Auto-progression**: Automatic flow through the entire participant list
- **Sound Effects**: Immersive audio experience (lever, spinning, winning)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn installed
- Git for version control

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ruleta-de-recuerdos.git
cd ruleta-de-recuerdos
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Add sound files to `public/sounds/`:
   - `lever.mp3` (0.3-0.6s lever sound)
   - `spin.mp3` (10-20s loopable spinning sound)
   - `win.mp3` (1-2s celebration fanfare)
   - `confetti.mp3` (optional, 0.2-0.5s pop sound)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 File Format

### JSON Format
```json
[
  {
    "name": "Guest Name",
    "memory": "A special memory or description about this guest",
    "imageURL": "https://example.com/image.jpg"
  }
]
```

### CSV Format
```csv
name,memory,imageURL
Guest Name,A special memory or description about this guest,https://example.com/image.jpg
```

Sample files are available in `/public/examples/`

## 🏗️ Project Structure

```
ruleta-de-recuerdos/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main app component with state management
│   └── globals.css       # Global styles and Tailwind imports
├── components/
│   ├── UploadList.tsx    # File upload component
│   ├── ParticipantsGrid.tsx # Grid display of participants
│   ├── RouletteLever.tsx # Animated lever button
│   ├── RouletteSpinner.tsx # Spinning animation component
│   ├── WinnerDisplay.tsx # Winner showcase with confetti
│   └── FinishedScreen.tsx # End game screen
├── hooks/
│   └── useAudioPlayer.ts # Custom hook for audio management
├── public/
│   ├── sounds/          # Audio files (add your own)
│   └── examples/        # Sample CSV and JSON files
├── types.ts             # TypeScript type definitions
└── package.json         # Project dependencies
```

## 🎮 How to Use

1. **Upload Participants**: Load a CSV or JSON file with guest information
2. **View Grid**: See all participants displayed in an elegant grid
3. **Spin the Roulette**: Click the lever or press ENTER to start the 15-second spin
4. **Celebrate Winner**: Watch the confetti celebration and read the memory
5. **Continue**: Automatically returns to the grid with remaining participants
6. **Finish**: When all participants are selected, see the final celebration screen
7. **Reset**: Load a new list to start again

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/ruleta-de-recuerdos.git
git push -u origin main
```

2. Go to [Vercel](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project"
5. Import your `ruleta-de-recuerdos` repository
6. Use default Next.js settings (Vercel auto-detects)
7. Click "Deploy"
8. Your app will be live at `https://ruleta-de-recuerdos.vercel.app`

### Deploy to Other Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### Self-Hosting
```bash
npm run build
npm start
# App runs on port 3000
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎨 Customization

### Colors
Edit the color palette in `tailwind.config.ts`:
```js
colors: {
  'wedding-blue': '#0B3C5D',
  'wedding-ochre': '#CFA15A',
  'wedding-ivory': '#F7F3EB',
}
```

### Wedding Initials
Change the initials in `components/UploadList.tsx` and `app/page.tsx`:
```tsx
<p className="font-playfair text-3xl text-wedding-ivory">
  H 💍 R  // Change to your initials
</p>
```

### Timing
Adjust the roulette spin duration in `app/page.tsx`:
```tsx
duration={15} // Change to desired seconds
```

## 🔊 Audio Notes

- Audio files must be added manually to `/public/sounds/`
- Autoplay is only enabled after first user interaction (browser policy)
- Volume is set to 50% by default (adjustable in `useAudioPlayer.ts`)
- Find royalty-free sounds at Freesound.org, Zapsplat.com, or Mixkit.co

## 📱 Browser Compatibility

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

## 🛠️ Tech Stack

- **Framework**: Next.js 14.1 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11.0
- **Confetti**: canvas-confetti 1.9
- **CSV Parsing**: Papa Parse 5.4
- **Fonts**: Playfair Display & Poppins (Google Fonts)

## 📝 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 💝 Credits

Created with love for H & R's wedding celebration.

---

**Note**: Remember to add the audio files before deploying to production. The app will work without them but the experience won't be complete.

## 🆘 Troubleshooting

### Audio not playing
- Ensure audio files are in `/public/sounds/`
- Check browser console for autoplay policy warnings
- User must interact with the page first (click/tap)

### Images not loading
- Verify imageURL paths are correct and accessible
- The app includes fallback avatars for broken images

### CSV parsing issues
- Ensure CSV is UTF-8 encoded
- Check that headers match exactly: `name,memory,imageURL`
- No special characters in headers

### Performance issues
- Optimize images (use compressed formats)
- Limit participants to ~100 for best performance
- Use production build (`npm run build`)

## 📧 Support

For issues or questions, please create an issue on GitHub or contact the development team.

---

Made with ❤️ for a special wedding day 🎊
