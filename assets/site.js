const videos = document.querySelectorAll('video');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

videos.forEach((video) => {
  if (reduce) {
    video.removeAttribute('autoplay');
    video.pause();
    video.controls = true;
  }
});

if (!reduce && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.2 });
  videos.forEach((video) => observer.observe(video));
}
