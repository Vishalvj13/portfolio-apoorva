import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('apoorva-theme') === 'dark' ? 'dark' : 'light'; }
    catch { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('apoorva-theme', theme); } catch {}
  }, [theme]);
  return [theme, () => setTheme(current => current === 'dark' ? 'light' : 'dark')];
}

export function useTypewriter(words) {
  const [text, setText] = useState(words[0]);
  const key = words.join('|');
  useEffect(() => {
    const values = key.split('|');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let word = 0;
    let index = values[0].length;
    let deleting = true;
    function type() {
      const value = values[word];
      index += deleting ? -1 : 1;
      setText(value.slice(0, index));
      let delay = deleting ? 40 : 70;
      if (index === 0) { deleting = false; word = (word + 1) % values.length; delay = 300; }
      else if (index === value.length && !deleting) { deleting = true; delay = 1800; }
      timer = setTimeout(type, delay);
    }
    function syncMotion() {
      clearTimeout(timer);
      word = 0; index = values[0].length; deleting = true; setText(values[0]);
      if (!media.matches) timer = setTimeout(type, 2200);
    }
    syncMotion();
    media.addEventListener('change', syncMotion);
    return () => { clearTimeout(timer); media.removeEventListener('change', syncMotion); };
  }, [key]);
  return text;
}
