const feed = document.getElementById("feed");

feed.addEventListener("scroll", () => {
  const maxScroll = feed.scrollHeight - feed.clientHeight;

  if (feed.scrollTop >= maxScroll - 5) {
    setTimeout(() => {
      feed.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 250);
  }
});
