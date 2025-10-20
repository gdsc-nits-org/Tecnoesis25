# Tron Ares Bike Position Adjustment Guide 🏍️

## Quick Start

To adjust the bike position, edit this file:
```
src/components/robotron/hero/BikePositionConfig.css
```

## How to Move the Bike

### 📱 **Mobile (Phones)**
Edit these variables in `BikePositionConfig.css`:

```css
/* Move bike DOWN on mobile */
--bike-margin-bottom-mobile: 0rem;  /* or 1rem, 2rem */

/* Move bike UP on mobile */
--bike-margin-bottom-mobile: -6rem;  /* or -7rem, -8rem */

/* Move bike RIGHT */
--bike-margin-left-mobile: 2rem;

/* Move bike LEFT */
--bike-margin-left-mobile: -3rem;
```

### 📱 **Tablet (640px - 767px)**
```css
/* Move bike DOWN on tablet */
--bike-margin-bottom-tablet: -1rem;  /* or 0rem, 1rem */

/* Move bike UP on tablet */
--bike-margin-bottom-tablet: -6rem;  /* or -7rem, -8rem */
```

### 💻 **Desktop (768px+)**
```css
/* Move bike DOWN on desktop */
--bike-margin-bottom-desktop: -2rem;  /* or 0rem, 1rem */

/* Move bike UP on desktop */
--bike-margin-bottom-desktop: -8rem;  /* or -9rem, -10rem */
```

---

## Common Adjustments

### Example 1: Move bike DOWN by 2rem on all devices
```css
:root {
  --bike-margin-bottom-mobile: -1rem;   /* was -3rem */
  --bike-margin-bottom-tablet: -2rem;   /* was -4rem */
  --bike-margin-bottom-desktop: -3rem;  /* was -5rem */
  --bike-margin-bottom-lg: -3rem;       /* was -5rem */
}
```

### Example 2: Move bike UP by 2rem on mobile only
```css
:root {
  --bike-margin-bottom-mobile: -5rem;  /* was -3rem */
  /* Leave others unchanged */
}
```

### Example 3: Make bike bigger on mobile
```css
:root {
  --bike-width-mobile: 85%;   /* was 70% */
  --bike-height-mobile: 50%;  /* was 40% */
}
```

### Example 4: Move bike to the right on all devices
```css
:root {
  --bike-margin-left-mobile: 1rem;    /* was -1rem */
  --bike-margin-left-tablet: 2rem;    /* was -1.5rem */
  --bike-margin-left-desktop: 3rem;   /* was -2rem */
  --bike-margin-left-lg: 3rem;        /* was -2rem */
}
```

---

## Understanding the Values

### Margin Bottom (Vertical Position)
- **Negative values** (e.g., `-5rem`): Bike goes UP (overlaps more with content above)
- **Zero** (`0rem`): Bike sits at the bottom edge
- **Positive values** (e.g., `2rem`): Bike goes DOWN (more space from bottom)

### Margin Left (Horizontal Position)
- **Negative values** (e.g., `-2rem`): Bike goes LEFT (off-screen or edge)
- **Zero** (`0rem`): Bike aligns with left edge
- **Positive values** (e.g., `2rem`): Bike goes RIGHT (more centered)

### Size (Width/Height)
- **Smaller %** (e.g., `40%`): Smaller bike
- **Larger %** (e.g., `80%`): Bigger bike

---

## Screen Size Breakpoints

| Device | Screen Width | Variable Suffix |
|--------|--------------|-----------------|
| Mobile | < 640px | `-mobile` |
| Tablet | 640px - 767px | `-tablet` |
| Desktop | 768px - 1023px | `-desktop` |
| Large Desktop | 1024px+ | `-lg` |

---

## Testing Your Changes

1. Edit `BikePositionConfig.css`
2. Save the file
3. Refresh the browser at `http://localhost:3001/robotron`
4. Test on different screen sizes:
   - Mobile: Use Chrome DevTools (F12) → Toggle device toolbar
   - Tablet: Resize browser window to ~700px width
   - Desktop: Full screen

---

## Tips & Best Practices

1. **Start with mobile** - Adjust mobile first, then tablet, then desktop
2. **Use consistent increments** - Change by 1rem or 2rem at a time
3. **Test on real devices** - Emulators are good, but real devices are better
4. **Keep notes** - Document your changes if you find a perfect position
5. **Backup values** - Keep the original values commented out

---

## Current Default Values

```css
/* Mobile */
--bike-margin-bottom-mobile: -2rem;
--bike-margin-left-mobile: -1rem;
--bike-width-mobile: 70%;
--bike-height-mobile: 40%;

/* Tablet */
--bike-margin-bottom-tablet: -3rem;
--bike-margin-left-tablet: -1.5rem;
--bike-width-tablet: 55%;
--bike-height-tablet: 42%;

/* Desktop */
--bike-margin-bottom-desktop: -5rem;
--bike-margin-left-desktop: -2rem;
--bike-width-desktop: 45%;
--bike-height-desktop: 45%;

/* Large Desktop */
--bike-margin-bottom-lg: -5rem;
--bike-margin-left-lg: -2rem;
--bike-width-lg: 45%;
--bike-height-lg: 45%;
```

---

## Need Help?

If the bike isn't moving as expected:
1. Check that you saved `BikePositionConfig.css`
2. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser console for CSS errors
4. Verify the file is imported in `Hero.tsx`

**Happy adjusting! 🏍️✨**
